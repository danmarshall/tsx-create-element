# tsx-create-element
Use TypeScript TSX without React

Love the efficiency of TypeScript TSX syntax, but you have a small project that doesn't use React? This library may help.

## Usage

### createElement
First, set your `tsconfig.json` file with these settings:
```json
{
    "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "createElement"
    }
}
```

Then create a file with the .tsx extension:
```js
//yourcomponent.tsx
import { createElement, StatelessProps } from 'tsx-create-element';

interface YourProps {
    yourText: string;
}

export const YourComponent = (props: StatelessProps<YourProps>) => {
    return <div>{props.yourText}</div>;
}
```

### mount ( jsxElement: JSX.Element, container: HTMLElement )
This is analogous to [ReactDOM.render](https://reactjs.org/docs/react-dom.html#render). Typically your app will only `mount` one component which contains your entire tree. You will need to call `mount` anytime your props change. No React = no virtual DOM.

```js
import { createElement, mount } from 'tsx-create-element';
import { YourComponent } from './yourcomponent';
mount(YourComponent({yourText:"hello world"}), document.getElementById('your-div-ID'));
```

## Example code
See the [test folder](https://github.com/danmarshall/tsx-create-element/tree/master/test) for an example of component composition.

## Caveats
1. This will only render stateless components. No React = no React lifecycle.
1. Everytime `mount` is called, the DOM subtree is obliterated. You may lose state in stateful elements such as textboxes. You will need to manage this yourself, prior to calling `mount`.
1. You may also lose focus when `mount` is called. There is a [simplistic heuristic](https://github.com/danmarshall/tsx-create-element/blob/master/src/index.ts#L119) which tries to map the position of the [activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement).
1. A technique for maintaing stateful textboxes is found in [test/index.tsx](https://github.com/danmarshall/tsx-create-element/blob/master/test/index.tsx).

## Test
To see the test page, run:

```
npm start
```

## Similar work
* https://yetawf.com/BlogEntry/Title/TypeScript%20and%20JSX%20without%20React/?BlogEntry=1034
* https://holtwick.de/blog/jsx-without-react
* https://www.meziantou.net/2018/05/28/write-your-own-dom-element-factory-for-typescript
* https://github.com/dtkerr/jsx-no-react
