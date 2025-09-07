import { createElement } from '../dist/es6';
import { SubComponent } from './subcomponent';
import { SvgNamespaceTest } from './svg-namespace-test';

export interface Props {
    title: string;
    count: number;
    buttonClick: () => void;
    input: JSX.Element;
    subComponentText: string[];
    textAreaChange: (index: number, value: HTMLTextAreaElement) => void;
}

export const Layout = (props: Props) => {
    return (
        <div>
            <h1 className="foo">{props.title}</h1>
            {props.input}
            <div>count is: {props.count}</div>
            <button onClick={() => props.buttonClick()}>add</button>
            <button onClick={() => props.buttonClick()} style={{ marginLeft: "1em" }}>I also add</button>
            <button onClick={() => props.buttonClick()} disabled={true} style={{ marginLeft: "1em" }}>this is disabled..</button>
            <button onClick={() => props.buttonClick()} disabled={false} style={{ marginLeft: "1em" }}>disabled = false</button>
            {props.subComponentText.map((t, i) => (
                <SubComponent someText={t} textAreaChange={v => props.textAreaChange(i, v)}>
                    component {i} content
                </SubComponent>
            ))}
            namespaced element (svg):
            <div>
                <svg width="100" height="100">
                    <rect width="100%" height="100%" style={{ fill: 'none', strokeWidth: 1, stroke: 'red' }} />
                    <line x1="0" y1="0" x2="100%" y2="100%" style={{ strokeWidth: 1, stroke: 'red' }} />
                    <line x1="0" y1="100%" x2="100%" y2="0" style={{ strokeWidth: 1, stroke: 'red' }} />
                </svg>
            </div>
            <SvgNamespaceTest />
        </div>
    );
}
