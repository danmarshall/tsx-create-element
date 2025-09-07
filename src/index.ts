import * as htmlTags from 'html-tags';
import * as svgTags from 'svg-tags';

const htmlTagArray: string[] = htmlTags.default || htmlTags;
const svgTagArray: string[] = svgTags.default || svgTags;

/**
 * Decamelizes a string with/without a custom separator (hyphen by default).
 * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 * 
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
function decamelize(str: string, separator: string = '-') {
    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}

export type StatelessProps<T> = T & { children?: (JSX.Element | Content) | (JSX.Element | Content)[] };

export interface StatelessComponent<T> {
    (props: StatelessProps<T>): JSX.Element;
}

export type Content = string | boolean | number;

export interface AttributeMap {
    [key: string]: Content | Function;
}

type SelectionDirection = "forward" | "backward" | "none";

export interface ActiveElementInfo {
    childPositions: number[];
    scrollTop?: number;
    selectionStart?: number;
    selectionEnd?: number;
    selectionDirection?: string;
}

export function createElement<T>(tag: StatelessComponent<T>, attrs: StatelessProps<T>, ...children: JSX.Element[]);
export function createElement(tag: string, attrs: AttributeMap, ...children: (Element | Content)[]);
export function createElement(tag: any, attrs: any, ...children: any[]) {
    if (typeof tag === 'function') {
        const fn = tag as StatelessComponent<{}>;
        const props = attrs as StatelessProps<{}>;
        props.children = children;
        return fn(props);
    } else {
        const ns = tagNamespace(tag);
        const el: Element = ns ? document.createElementNS(ns, tag) : document.createElement(tag as string);
        const map = attrs as AttributeMap;
        let ref: (el: HTMLElement) => void;
        for (let name in map) {
            if (name && map.hasOwnProperty(name)) {
                let value = map[name];
                if (name === 'className' && value !== void 0) {
                    setAttribute(el, ns, 'class', value.toString());
                } else if (name === 'disabled' && !value) {
                    //do nothhing, omit this attribute
                } else if (value === null || value === undefined) {
                    continue;
                } else if (value === true) {
                    setAttribute(el, ns, name, name);
                } else if (typeof value === 'function') {
                    if (name === 'ref') {
                        ref = value as (el: HTMLElement) => void;
                    } else {
                        el[name.toLowerCase()] = value;
                    }
                } else if (typeof value === 'object') {
                    setAttribute(el, ns, name, flatten(value));
                } else {
                    setAttribute(el, ns, name, value.toString());
                }
            }
        }
        if (children && children.length > 0) {
            appendChildren(el, children);
        }
        if (ref) {
            ref(el as HTMLElement);
        }
        return el;
    }
}

function setAttribute(el: Element, ns: string, name: string, value: string) {
    if (ns) {
        el.setAttributeNS(null, name, value);
    } else {
        el.setAttribute(name, value);
    }
}

function flatten(o: object) {
    const arr: string[] = [];
    for (let prop in o) arr.push(`${decamelize(prop, '-')}:${o[prop]}`);
    return arr.join(';');
}

function isInsideForeignObject(element: Element): boolean {
    let current = element;
    while (current) {
        if (current.tagName.toLowerCase() === 'foreignobject') {
            return true;
        }
        current = current.parentElement;
    }
    return false;
}

function recreateWithSvgNamespace(element: Element): Element {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", element.tagName);
    
    // Copy attributes
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        svgElement.setAttributeNS(null, attr.name, attr.value);
    }
    
    // Copy children recursively
    for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
            svgElement.appendChild(recreateWithSvgNamespace(child as Element));
        } else {
            svgElement.appendChild(child.cloneNode(true));
        }
    }
    
    return svgElement;
}

export function addChild(parentElement: Element, child: Element | Content | JSX.Element | (Element | Content)[]) {
    if (child === null || child === undefined || typeof child === "boolean") {
        return;
    } else if (Array.isArray(child)) {
        appendChildren(parentElement, child);
    } else if (isElement(child)) {
        const childEl = child as Element;
        // If parent is SVG and child was created with wrong namespace, recreate it
        // Exception: don't recreate elements inside foreignObject as they should remain HTML
        if (parentElement.namespaceURI === "http://www.w3.org/2000/svg" && 
            childEl.namespaceURI !== "http://www.w3.org/2000/svg" &&
            childEl.tagName.toLowerCase() !== 'foreignobject' &&
            !isInsideForeignObject(parentElement)) {
            const recreated = recreateWithSvgNamespace(childEl);
            parentElement.appendChild(recreated);
        } else {
            parentElement.appendChild(childEl);
        }
    } else {
        parentElement.appendChild(document.createTextNode(child.toString()));
    }
}

function appendChildren(parentElement: Element, children: (Element | Content)[]) {
    children.forEach(child => addChild(parentElement, child));
}

function isElement(el: Element | JSX.Element | any) {
    //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    return !!(el as Element).nodeType;
}

export function mount(element: Element | JSX.Element, container: HTMLElement) {
    container.innerHTML = '';
    if (element) {
        addChild(container, element);
    }
}

export function findElementByChildPositions(childPositions: number[], container?: Element) {
    let element = container || document.body;
    let childPosition: number;
    while (element && childPositions.length) {
        childPosition = childPositions.shift()
        element = element.children.item(childPosition);
    }
    if (element) {
        return element as HTMLElement;
    };
}

export function focusActiveElement(element: HTMLElement, activeElementInfo: ActiveElementInfo) {
    element.focus();
    element.scrollTop = activeElementInfo.scrollTop;
    const input = element as HTMLInputElement | HTMLTextAreaElement
    if (input.setSelectionRange && activeElementInfo && activeElementInfo.selectionStart != null && activeElementInfo.selectionEnd != null) {
        input.setSelectionRange(activeElementInfo.selectionStart, activeElementInfo.selectionEnd, activeElementInfo.selectionDirection as SelectionDirection);
    }
}

export function setActiveElement(activeElementInfo: ActiveElementInfo, container?: Element) {
    if (activeElementInfo) {
        const element = findElementByChildPositions(activeElementInfo.childPositions, container);
        if (element) {
            focusActiveElement(element, activeElementInfo);
        }
    }
}

export function getActiveElementInfo(container?: HTMLElement) {
    let element = document.activeElement;
    const { scrollTop, selectionDirection, selectionEnd, selectionStart } = element as HTMLInputElement;
    const activeElementInfo: ActiveElementInfo = {
        childPositions: [],
        scrollTop,
        selectionDirection,
        selectionEnd,
        selectionStart
    };
    while (element && element !== document.body && element !== container) {
        activeElementInfo.childPositions.unshift(getChildPosition(element));
        element = element.parentElement;
    }
    if ((element === document.body || element === container) && activeElementInfo.childPositions.length) return activeElementInfo;
}

function getChildPosition(element: Element): number {
    let childPosition = 0;
    while (element = element.previousElementSibling) childPosition++;
    return childPosition;
}

function tagNamespace(tag: string) {
    //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
    if (tag === 'svg' || (svgTagArray.indexOf(tag) >= 0 && !(htmlTagArray.indexOf(tag) >= 0))) {
        return "http://www.w3.org/2000/svg";
    }
}
