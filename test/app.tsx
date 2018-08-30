import { createElement } from '../dist/es6';
import { SubComponent } from './subcomponent';

export interface Props {
    title: string;
}

export const render = (props: Props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <SubComponent text="a component" count={1} />
            <SubComponent text="another component" count={2} />
        </div>
    );
}
