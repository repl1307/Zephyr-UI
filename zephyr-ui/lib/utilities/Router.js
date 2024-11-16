class Router {
  static instance = null
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
    this.routes = [];
    this.currentRoute = null;
    this.main = main;
  }

  createRoute(path, createElemsFunc){
    const oldRoute = this.routes.find(route => route.matchesPath(path));
    if(oldRoute)
      this.routes.splice(this.routes.indexOf(oldRoute));
    this.routes.push(new Route(path, createElemsFunc, this));
    this.routes.at(-1).main = this.main;
  }
  async setRoute(path){
    const route = this.routes.find(route => route.matchesPath(path));
    if(route)
      await route.activate(path);
    else
      console.error("Route not found: "+path);
  }
  async autoRoute(){
    const path = window.location.pathname;
    console.log('Auto route');
    console.log(path);
    await this.setRoute(path);
  }
}

class Route {
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
  activate = async (path) => {
    //remove old elements
    for(let i = 0; i < this.main.children.length; i++){
      const child = this.main.children[i];
      if(!child.preserveOnRerender){
        this.main.removeChild(i);
        i--;
      }
    }
    //add new elements
    const elems = await this.createElems(this.router);
    for(const elem of elems)
      this.main.append(elem);

    //parse url for subpaths and query params
    const subpaths = path.split('/');
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
    this.router.currentRoute = this.path;

  }
}

export { Router, Route };