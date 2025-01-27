import { UI, Box, Link } from '@repl1307/zephyr-ui';
import markdownit from 'markdown-it'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './component.css';

export default class Documentation extends Box {
    // Given file path, convert markdown to zephyr ui elements
    static async parseMDFile(filePath){
        //getting file, and splitting into lines
        const res = await fetch(filePath);
        const fileText = await res.text();
        const elems = await MarkdownToZephyr(fileText);
        return elems;
    }

    // mdFilepath -- the filepath to the md file the element will use as reference
    constructor(filePath){
        super();
        this.container = new Box().addClass('documentation-container');
        this.container.append(this);
        this.addClass('documentation');
        this.generateDocs(filePath);
    }

    async generateDocs(filePath){
        const elems = await Documentation.parseMDFile(filePath);
        elems.forEach(elem => this.append(elem));
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
    })
    const htmlString = md.render(text);
    const body = UI.parse(htmlString);

    /** @param {HTMLElement} html */
    const convertToZephyr = (html) => {
        const shouldParse = JSON.parse(html.getAttribute('data-zephyr-parse'));
        const isBody = html.tagName === 'BODY';
        const tagName = isBody? 'div' : html.tagName.toLowerCase();

        if(!shouldParse){
            const elem = new UI(tagName);
            elem.setInnerHtml(html.innerHTML)
            return elem;
        }

        const elem = new UI(tagName);

        for (const child of html.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                const span = new UI('span').setText(child.textContent);
                elem.append(span);
            } else {
                const childElem = convertToZephyr(child);
                elem.append(childElem);
            }
        }

        if(html.children.length == 0){
            elem.setText(html.textContent);
        }

        return elem;
    };

    return convertToZephyr(body).children;
}