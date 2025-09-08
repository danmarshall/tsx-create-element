import { createElement, StatelessComponent, StatelessProps } from '../dist/es6/index';

interface Props {
    someText: string;
    textAreaChange: (value: HTMLTextAreaElement) => void;
}

export const SubComponent: StatelessComponent<Props> = (props: StatelessProps<Props>) => {
    const textChangeHandler = (e: KeyboardEvent) => props.textAreaChange(e.currentTarget as HTMLTextAreaElement);
    return (
        <div style={{ border: "1px solid black", margin: "0.5em 0", padding: "0.5em" }}>
            <div>Text is: {props.someText}</div>
            <div>Children:
                <div>{props.children}</div>
            </div>
            {/* 
            The following textarea gets recreated every render pass.
            Althought we are able to save its selectionrange, it loses the ability to use ctrl-z  
            */}
            <textarea onKeyPress={textChangeHandler} onKeyUp={textChangeHandler} onKeyDown={textChangeHandler} spellCheck={false}>{props.someText}</textarea>
        </div>
    );
}
