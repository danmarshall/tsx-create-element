import { mount } from '../dist/es6/index';
import { render } from './app';

mount(render({ title: "tsx-create-element test app" }), document.getElementById('app'));
