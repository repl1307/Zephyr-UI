export default class Loader {
  static loadCSS(filePath){
    const link = document.createElement('link');
    link.type = 'text/css';
    link.href = filePath;
    document.head.appendChild(link);
  }
}