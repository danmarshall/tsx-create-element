import { mount } from '../dist/es6/index';
import { App } from './app';

let count = 0;

const buttonClick = () => {
    count++;
    update();
};

function update() {
    mount(App({ title: "tsx-create-element test app", count, buttonClick }), document.getElementById('app'));
}

update();
