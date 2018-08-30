import { createElement, StatelessComponent, StatelessProps } from '../dist/es6/index';

interface Props {
    count: number;
    text: string;
}

export const SubComponent: StatelessComponent<Props> = (props: StatelessProps<Props>) => {
    return (
        <div>
            Text is {props.text}, count is {props.count}
        </div>
    );
}
