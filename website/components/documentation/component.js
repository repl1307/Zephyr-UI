import { UI, Box, Link } from '@repl1307/zephyr-ui';
import markdownit from 'markdown-it';
import markdownItAnchor  from 'markdown-it-anchor';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/atom-one-dark.css';
import './component.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);



export default class Documentation extends Box {
    // mdFilepath -- the filepath to the md file the element will use as reference
    constructor(filePath){
        super();
        this.container = new Box().addClass('documentation-container');
        this.cover = new Box().addClass('cover');

        this.container.append(this);
        this.append(this.cover);
        this.addClass('documentation');
        this.generateDocs(filePath);
    }

    // generate docs from md file path as Zephyr UI elements
    async generateDocs(filePath){
        const elems = await this.parseMDFile(filePath);
        elems.forEach(elem => this.append(elem));
        this.cover.addClass('slide-out');
        setTimeout(() => this.cover.setStyle('display', 'none'), 250);
    }

    // Given file path, convert markdown to zephyr ui elements
    async parseMDFile(filePath){
        //getting file, and splitting into lines
        const res = await fetch(filePath);
        const fileText = await res.text();
        const isHTML = res.headers.get('Content-Type') == 'text/html';

        if(isHTML){
            this.cover.setText('Error - 404 - Doc does not exist');
            return null;
        }
        const elems = await MarkdownToZephyr(fileText);
        return elems;
    }
}

async function MarkdownToZephyr(text){
    const md = markdownit({
        html: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang }).value + '</code></pre>';
              } catch (err) {
                throw new Error('hljs code highlighting failed :(');
              }
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    }).use(markdownItAnchor);
    const htmlString = md.render(text);
    const body = UI.parse(htmlString);

    /** @param {HTMLElement} html */
    const convertToZephyr = (html) => {
        const shouldParse = !JSON.parse(html.getAttribute('data-zephyr-parse'));
        const isBody = html.tagName == 'BODY';
        const tagName = isBody? 'div' : html.tagName.toLowerCase();
        let elem;

        if(tagName == 'a')
            elem = new Link(html.href);
        else
            elem = new UI(tagName);
        
        for(const attribute of html.attributes){
            elem.setAttribute(attribute.name, attribute.value)
        }

        if(!shouldParse){
            elem.setInnerHtml(html.innerHTML);
            return elem;
        }

        // loop through child nodes, if text node append as span, otherwise append node as element
        for (const child of html.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                const span = new UI('span').setText(child.textContent);
                elem.append(span);
            } else {
                const childElem = convertToZephyr(child);
                elem.append(childElem);
            }
        }

        // if no children, just set text content
        if(html.children.length == 0){
            elem.setText(html.textContent);
        }

        return elem;
    };

    return convertToZephyr(body).children;
}