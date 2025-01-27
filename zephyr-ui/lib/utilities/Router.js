import Root from "../core/Root";
import UI from "../UI";
import Link from "../core/Link";

/**
 * Enables route handling on clientside, only one router may exist at any point
 * @class Router
 * @memberof utilities
 */
class Router {
  static instance = null

  /** 
   * Handles anchor link for provided element or id
   * @param {UI|string} link - Either the link element that is to be triggerd or the ID of the anchor
   */
  static handleAnchor = link => {
    if(typeof link == 'string'){
      if(link.includes('#'))
        link = link.replace('#', '');
      const anchor = document.getElementById(link);
      anchor.scrollIntoView({behavior: 'smooth'});
      return;
    }
    link.onClick(e => {
        e.preventDefault();
        const anchor = document.getElementById(link.html.href.split('#')[1]);
        anchor.scrollIntoView({behavior: 'smooth'});
    });
  }
  /**
   * @param {Root} main - The base UI element of the entire page
   * @returns this
   */
  constructor(main){
    if(Router.instance != null){
      console.error('A Router has already been instantiated!');
      delete this;
      return;
    }
    Router.instance = this;
    window.addEventListener('popstate', e => {
      if(e.state == null)
        this.autoRoute();
    });
    /**
     * List of all routes
     * @type {Route[]}
     */
    this.routes = [];
    /**
     * The current route that is being used
     * @type {Route}
     */
    this.currentRoute = null;
    this.currentPath = "";
    /**
     * The base UI element for the entire page
     * @type {UI}
     */
    this.main = main;
  }

  /**
   * Given the path name and a function that returns a list of UI elements, create a route
   * @param {string} path - The path name as a string (ex: '/home'). For route parameters, just prefix with ":", (ex: '/home/:id')
   * @param {function(string[]?):UI[]} createElemsFunc - Function that takes optional array of route parameters and returns an array of UI elements
   */
  createRoute(path, createElemsFunc){
    const oldRoute = this.routes.find(route => route.matchesPath(path));
    if(oldRoute)
      this.routes.splice(this.routes.indexOf(oldRoute));
    this.routes.push(new Route(path, createElemsFunc, this));
    this.routes.at(-1).main = this.main;
  }
  /**
   * Change the route to the specified path.
   * @param {string} path - The pathname to route to 
   */
  async setRoute(path){
    const route = this.routes.find(route => route.matchesPath(path));
    if(route){
      const url = new URL(window.location.href);
      url.pathname = path;
      await route.activate(url);
    }
    else
      console.error("Route not found: "+path);
  }

  /** auto set route based off of page url */
  async autoRoute(){
    const path = window.location.pathname;
    console.log('Auto route: '+path);

    const url = new URL(window.location.href);
 
    if(url.hash != ''){
      console.log('Is an anchor');
      // if the current path is the same as the new path, just move to anchor
      if(this.currentPath == path){
        Router.handleAnchor(url.hash);
      } 
      // otherwise, just visit new path then handle anchor
      else {
        await this.setRoute(path);
        Router.handleAnchor(url.hash);
      }
      return;
    }
    await this.setRoute(path);
  }
}
/**
 * Class for storing a route
 * @class
 */
class Route {
  /**
   * @param {string} path - The path name as a string (ex: '/home'). For route parameters, just prefix with ":", (ex: '/home/:id')
   * @param {function(string?):UI[]} createElemsFunc - Function that takes optional array of route parameters and returns an array of UI elements
   * @param {Router} router - The router that will store the route
   */
  constructor(path, createElemFunc, router){
    this.path = path.trim();
    this.pathStructure = this.generatePathStructure();
    this.createElems = createElemFunc;
    this.elems = [];
    this.router = router;
    this.param = {}; // stores actual param data from current url
    this.query = {}; // stores query data from current url
  }
  //break down path {string} into array of objects containing subpath values and whether they are static or not
  generatePathStructure(){
    const pathStructure = [];
    const subpaths = this.path.split('/');
    for(const subpath of subpaths){
      if(subpath == '') continue;
      pathStructure.push({
        value: subpath,
        isStatic: !subpath.startsWith(':')
      });
    }
    return pathStructure;
  }

  //gets if url path matches path structure of this route
  matchesPath(path){
    console.log(`Getting Match Path: ${path}`);
    const subpaths = path.trim().split('/');
    for(let i = 0; i < subpaths.length; i++){
      const s = subpaths[i];
      if(s == ''){
        subpaths.splice(subpaths.indexOf(s), 1);
        i--;
      }
    }
    if(subpaths.length == 0 && this.pathStructure.length == 0){
        return true;
    }
    if(subpaths.length != this.pathStructure.length){
        return false;
    }
    for(let i = 0; i < subpaths.length; i++){
      if(subpaths[i] != this.pathStructure[i].value && this.pathStructure[i].isStatic)
        return false;
    }
    console.log('Match Found!');
    return true;
  }

  //activate route
  /** @param {URL} url */
  activate = async (url) => {
    console.log('Activating path: '+url)

    //remove old elements
    for(let i = 0; i < this.main.children.length; i++){
      const child = this.main.children[i];
      if(!child.preserveOnRerender){
        this.main.removeChild(i);
        i--;
      }
    }

    //parse url for subpaths and query params
    const subpaths = url.pathname.split('/');
    for(const s of subpaths){
      if(s == '')
        subpaths.splice(subpaths.indexOf(''), 1);
    }

    let fullPath = "";
    for(const subpath of subpaths){
      fullPath += "/"+subpath;
    }
    for(let i = 0; i < subpaths; i++){
        fullPath = fullPath.replace(s.value, subpaths[i]);
    }

    //update url
    const currentURL = window.location.href;
    const baseURL = currentURL.split("/").slice(0, 3).join("/");
    history.pushState(null, null, baseURL+fullPath)
    this.router.currentPath = fullPath;
    this.router.currentRoute = this;
    this.getPathParams(url.pathname);

    //add new elements
    const elems = await this.createElems(this.router);
    for(const elem of elems)
      this.main.append(elem);

  }

  // get path param values
  getPathParams(path){
    const subpaths = path.split('/');
    for(const s of subpaths){
      if(s == '')
        subpaths.splice(subpaths.indexOf(''), 1);
    }

    for(let i = 0; i < this.pathStructure.length; i++){
      const structure = this.pathStructure[i];
      if(!structure.isStatic){
        this.param[structure.value.replace(':', '')] = subpaths[i];
      }
    }
  }
}

class RouterLink extends Link {
  constructor(href){
    super(href);
    this.onClick = e => Router.instance?.autoRoute();
  }
}
export { Router, Route };