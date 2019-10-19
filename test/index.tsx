import { mount } from '../dist/es6/index';
import { App } from './app';

let count = 0;
let title = "tsx-create-element test app";

const buttonClick = () => {
    count++;
    update();
};

const onTitleInputRef = (input: HTMLInputElement) => {
    input.onkeypress = input.onkeydown = input.onkeyup = input.onchange = () => {
        //do not invoke mount() directly within this handler,
        //otherwise the element will be orphaned
        //so wrap it within requestAnimationFrame 
        requestAnimationFrame(() => {
            title = input.value;
            update();
        });
    }
};

const onSubComponentTextareaRef = (textarea: HTMLTextAreaElement, i: number) => {
    textarea.onkeypress = textarea.onkeydown = textarea.onkeyup = textarea.onchange = () => {
        requestAnimationFrame(() => {
            subComponentText[i] = textarea.value;
            update();
        });
    }
};

const subComponentText = [
    'a component',
    'another component'
];

function update() {
    mount(
        App({ title, count, buttonClick, onTitleInputRef, subComponentText, onSubComponentTextareaRef }),
        document.getElementById('app')
    );
}

update();
