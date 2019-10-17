import { mount } from '../dist/es6/index';
import { App } from './app';

let count = 0;
let title = "tsx-create-element test app";

const buttonClick = () => {
    count++;
    update();
};

const onTitleInputRef = (input: HTMLInputElement) => {
    input.onkeyup = input.onkeydown = input.onchange = () => {
        title = input.value;
        update();
    }
};

const onSubComponentTextareaRef = (textarea: HTMLTextAreaElement, i: number) => {
    textarea.onkeyup = textarea.onkeydown = textarea.onchange = () => {
        subComponentText[i] = textarea.value;
        update();
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
