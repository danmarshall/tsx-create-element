import { createElement, StatelessComponent, StatelessProps } from '../dist/es6/index';

interface Props {
    someText: string;
}

export const SubComponent: StatelessComponent<Props> = (props: StatelessProps<Props>) => {
    return (
        <div style={{ border: "1px solid black", margin: "0.5em 0", padding: "0.5em" }}>
            <div>Text is: {props.someText}</div>
            <div>Children: {props.children}</div>
        </div>
    );
}
