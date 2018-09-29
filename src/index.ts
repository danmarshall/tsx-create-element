import * as _decamelize from 'decamelize';

//handle es6 / bundling
const decamelize = (_decamelize['default'] || _decamelize) as typeof _decamelize;

export type StatelessProps<T> = T & { children?: (JSX.Element | Content) | (JSX.Element | Content)[] };

export interface StatelessComponent<T> {
    (props: StatelessProps<T>): JSX.Element;
}

export type Content = string | boolean | number;

export interface AttributeMap {
    [key: string]: Content | Function;
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
        const el: HTMLElement = document.createElement(tag as string);
        const map = attrs as AttributeMap;
        for (let name in map) {
            if (name && map.hasOwnProperty(name)) {
                let value = map[name];
                if (name === 'className' && value !== void 0) {
                    el.setAttribute('class', value.toString());
                } else if (value === false || value === null || value === undefined) {
                    continue;
                } else if (value === true) {
                    el.setAttribute(name, name);
                } else if (typeof value === 'function') {
                    el[name.toLowerCase()] = value;
                } else if (typeof value === 'object') {
                    el.setAttribute(name, flatten(value));
                } else {
                    el.setAttribute(name, value.toString());
                }
            }
        }
        if (children && children.length > 0) {
            appendChildren(el, children);
        }
        return el;
    }
}

function flatten(o: object) {
    const arr: string[] = [];
    for (let prop in o) arr.push(`${decamelize(prop, '-')}:${o[prop]}`);
    return arr.join(';');
}

function addChild(parentElement: HTMLElement, child: Element | Content | JSX.Element | (Element | Content)[]) {
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

function appendChildren(parentElement: HTMLElement, children: (Element | Content)[]) {
    children.forEach(child => addChild(parentElement, child));
}

function isElement(el: Element | JSX.Element | any) {
    //nodeType cannot be zero https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    return !!(el as Element).nodeType;
}

export function mount(jsxElement: JSX.Element, container: HTMLElement) {
    const activeChildPositions = getActiveChildPositions(container);
    container.innerHTML = '';
    if (jsxElement) {
        addChild(container, jsxElement);
        if (activeChildPositions) focusChildAtPosition(container, activeChildPositions);
    }
}

function focusChildAtPosition(element: Element, childPositions: number[]) {
    while (element && childPositions.length) element = element.children.item(childPositions.shift());
    if (element) (element as HTMLElement).focus();
}

function getActiveChildPositions(containerElement: HTMLElement) {
    var active = document.activeElement;
    var childPositions: number[] = [];
    while (active !== document.body && active !== containerElement) {
        childPositions.unshift(childPosition(active));
        active = active.parentElement;
    }
    if (active === containerElement && childPositions.length) return childPositions;
}

function childPosition(element: Element) {
    let i = 0;
    while (element = element.previousElementSibling) i++;
    return i;
}
