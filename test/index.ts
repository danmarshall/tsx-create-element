import { mount } from '../dist/es6/index';
import { render } from './app';

mount(document.getElementById('app'), render({ title: "tsx-create-element test app" }));
