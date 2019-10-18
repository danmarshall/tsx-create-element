import * as htmlTags from 'html-tags';
import * as svgTags from 'svg-tags';

/**
 * Decamelizes a string with/without a custom separator (underscore by default).
 * from: https://ourcodeworld.com/articles/read/608/how-to-camelize-and-decamelize-strings-in-javascript
 * 
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
function decamelize(str, separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;

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

interface ChildPosition {
    childIndex: number;
    scrollTop: number;
    selectionStart: number;
    selectionEnd: number;
    selectionDirection: string;
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

function addChild(parentElement: Element, child: Element | Content | JSX.Element | (Element | Content)[]) {
    if (child === null || child === undefined || typeof child === "boolean") {
        return;
    } else if (Array.isArray(child)) {
        appendChildren(parentElement, child);
    } else if (isElement(child)) {
        parentElement.appendChild(child as Element);
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
    const activeChildPositions = getActiveChildPositions(container);
    container.innerHTML = '';
    if (element) {
        addChild(container, element);
        if (activeChildPositions) focusChildAtPosition(container, activeChildPositions);
    }
}

function focusChildAtPosition(element: Element, childPositions: ChildPosition[]) {
    let childPosition: ChildPosition;
    while (element && childPositions.length) {
        childPosition = childPositions.shift()
        element = element.children.item(childPosition.childIndex);
    }
    if (element) {
        const el = element as HTMLInputElement; //cast to input or textarea
        el.focus();
        if (childPosition && childPosition.selectionStart != null && childPosition.selectionEnd != null) {
            el.setSelectionRange(childPosition.selectionStart, childPosition.selectionEnd, childPosition.selectionDirection as SelectionDirection);
            el.scrollTop = childPosition.scrollTop;
        }
    };
}

function getActiveChildPositions(containerElement: HTMLElement) {
    let active = document.activeElement;
    const childPositions: ChildPosition[] = [];
    while (active && active !== document.body && active !== containerElement) {
        childPositions.unshift(childPosition(active));
        active = active.parentElement;
    }
    if (active === containerElement && childPositions.length) return childPositions;
}

function childPosition(element: Element): ChildPosition {
    const el = element as HTMLInputElement;
    const { scrollTop, selectionDirection, selectionEnd, selectionStart } = el;
    let childIndex = 0;
    while (element = element.previousElementSibling) childIndex++;
    return { childIndex, selectionStart, selectionEnd, selectionDirection, scrollTop };
}

function tagNamespace(tag: string) {
    //issue: this won't disambiguate certain tags which exist in both svg and html: <a>, <title> ...
    if (tag === 'svg' || (svgTags.default.indexOf(tag) >= 0 && !(htmlTags.default.indexOf(tag) >= 0))) {
        return "http://www.w3.org/2000/svg";
    }
}
