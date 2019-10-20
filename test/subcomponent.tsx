import { createElement, StatelessComponent, StatelessProps } from '../dist/es6/index';

interface Props {
    someText: string;
    textAreaChange: (value: HTMLTextAreaElement) => void;
}

export const SubComponent: StatelessComponent<Props> = (props: StatelessProps<Props>) => {
    const textChangeHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>)=> props.textAreaChange(e.currentTarget);
    return (
        <div style={{ border: "1px solid black", margin: "0.5em 0", padding: "0.5em" }}>
            <div>Text is: {props.someText}</div>
            <div>Children:
                <div>{props.children}</div>
            </div>
            <textarea onKeyPress={textChangeHandler} onKeyUp={textChangeHandler} onKeyDown={textChangeHandler} spellCheck={false}>{props.someText}</textarea>
        </div>
    );
}
