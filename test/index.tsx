import { createElement, mount, getActiveElementInfo, focusActiveElement, findElementByChildPositions, setActiveElement } from '../dist/es6/index';
import { Layout } from './layout';

let count = 0;
let title = "tsx-create-element test app";

const buttonClick = () => {
    count++;
    updateRetainFocus();
};

//this textbox is created here, and is an example of a textbox that is reused across every render pass
//which means it has its own state, and the user can use ctrl-z etc.
const input = (
    <input
        ref={input => {
            input.onkeypress = input.onkeydown = input.onkeyup = input.onchange = () => {
                //do not invoke mount() directly within this handler,
                //otherwise the element will not be disposed,
                //so wrap it within requestAnimationFrame 
                requestAnimationFrame(() => {
                    //additionally, the .value is not available until the handler exits
                    //so get the value inside requestAnimationFrame  
                    title = input.value;
                    updateRetainFocus();
                });
            }
        }}
        type="text"
        value={title}
        spellCheck={false}
    />);

const textAreaChange = (index: number, textArea: HTMLTextAreaElement) => {
    //pass the entire textarea so we can get it's value by reference after the next tick
    requestAnimationFrame(() => {
        subComponentText[index] = textArea.value;
        updateRetainFocus();
    });
}

const subComponentText = [
    'a component',
    'another component'
];

function updateRetainFocus() {
    //get the focused element's position and selectionrange
    const a = getActiveElementInfo();
    update();
    //re-set the focus and selectionrange after the update
    setActiveElement(a);
}

function update() {
    mount(
        //note: the layout will detach and append our input above, so it loses its focus and selectionrange.
        //make sure to call getActiveElementInfo prior to calling App
        Layout({ title, count, buttonClick, input, subComponentText, textAreaChange }),
        document.getElementById('app')
    );
}

update();
