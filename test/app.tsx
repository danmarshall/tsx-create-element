import { createElement } from '../dist/es6';
import { SubComponent } from './subcomponent';

export interface Props {
    title: string;
    count: number;
    buttonClick: () => void;
}

export const App = (props: Props) => {
    return (
        <div>
            <h1 className="foo">{props.title}</h1>
            <div>count is: {props.count}</div>
            <button onClick={() => props.buttonClick()}>add</button>
            <button onClick={() => props.buttonClick()} disabled={true} style={{marginLeft: "1em"}}>this is disabled</button>
            <SubComponent someText="a component">
                component 1 content
            </SubComponent>
            <SubComponent someText="another component" >
                component 2 content
                <span>...and more content</span>
            </SubComponent>
        </div>
    );
}
