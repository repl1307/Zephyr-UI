export class Theme {
  constructor(def){

  }
}
class ElementTheme {
  constructor(classes=[], style={}){
    this.classes = classes;
    this.style = style;
  }
}
//default theme
const def = new Theme();
def.default = new ElementTheme(['uijs-theme-default']);
def.div = new ElementTheme(['uijs-theme-default-div']);;
def.button = new ElementTheme(['uijs-theme-default-button']);
export const Themes = {
  default: def
};

