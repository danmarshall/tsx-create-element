# tsx-create-element
Use TypeScript TSX without React

Love the efficiency of TypeScript TSX / JSX syntax? Got a project that doesn't use React? This library may help.

## Usage

### createElement
This is used implicity, when you set your `tsconfig.json` file with these settings:
```json
{
    "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "createElement"
    }
}
```

### mount ( jsxElement: JSX.Element, container: HTMLElement )
This is analagous to [ReactDOM.render](https://reactjs.org/docs/react-dom.html#render). Typically your app will only `mount` one component which contains your entire tree. You will need to call `mount` anytime your props change. No React = no virtual DOM.

```js
//remember your file should have .tsx extension to use TSX syntax
import { createElement, mount } from 'tsx-create-element';
mount(<div>hello world</div>, document.getElementById('your-div-ID'));
```

## Example code
See the [test folder](https://github.com/danmarshall/tsx-create-element/tree/master/test) for an example of component composition.

## Caveats
1. This will only render [stateless components](https://github.com/danmarshall/tsx-create-element/blob/master/test/subcomponent.tsx#L8). No React = no React lifecycle.
1. Everytime `mount` is called, the DOM subtree is obliterated. You may lose state in stateful elements such as textboxes. You will need to manage this yourself, prior to calling `mount`.
1. You may also lose focus when `mount` is called. There is a [simplistic heuristic](https://github.com/danmarshall/tsx-create-element/blob/master/src/index.ts#L104) which tries to map the position of the [activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement).

## Test
To see the test page, install [parcel](https://www.npmjs.com/package/parcel) globally:

```
npm i -g parcel
```

Then run this command:

```
parcel serve ./test/index.html
```

## Similar work
* https://yetawf.com/BlogEntry/Title/TypeScript%20and%20JSX%20without%20React/?BlogEntry=1034
* https://holtwick.de/blog/jsx-without-react
* https://www.meziantou.net/2018/05/28/write-your-own-dom-element-factory-for-typescript
* https://github.com/dtkerr/jsx-no-react
