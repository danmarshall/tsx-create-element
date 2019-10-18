import { createElement } from '../dist/es6';
import { SubComponent } from './subcomponent';

export interface Props {
    title: string;
    count: number;
    buttonClick: () => void;
    onTitleInputRef: (input: HTMLInputElement) => void;
    subComponentText: string[];
    onSubComponentTextareaRef: (textarea: HTMLTextAreaElement, i: number) => void;
}

export const App = (props: Props) => {
    return (
        <div>
            <h1 className="foo">{props.title}</h1>
            <input ref={input => props.onTitleInputRef(input)} type="text" value={props.title} spellCheck={false} />
            <div>count is: {props.count}</div>
            <button onClick={() => props.buttonClick()}>add</button>
            <button onClick={() => props.buttonClick()} style={{ marginLeft: "1em" }}>I also add</button>
            <button onClick={() => props.buttonClick()} disabled={true} style={{ marginLeft: "1em" }}>this is disabled</button>
            {props.subComponentText.map((t, i) => (
                <SubComponent someText={t} onTextareaRef={ta => props.onSubComponentTextareaRef(ta, i)}>
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
        </div>
    );
}
