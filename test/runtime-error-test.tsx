import { createElement, StatelessComponent } from '../dist/es6/index';

// Test component to test null props handling
export const NullPropsTest: StatelessComponent<{}> = (props) => {
    return (
        <div>
            <h3>Null Props Test</h3>
            <p>Props received: {JSON.stringify(props)}</p>
            <p>Children: {Array.isArray(props.children) ? props.children.join(', ') : 'none'}</p>
        </div>
    );
};

// Test for the runtime error fix
export const RuntimeErrorTest = () => {
    return (
        <div>
            <h2>Runtime Error Fix Test</h2>
            <p>Testing component with null props but children provided:</p>
            
            {/* This used to cause "Cannot set property 'children' of null" */}
            {(createElement as any)(NullPropsTest, null, 'Child 1', 'Child 2', 'Child 3')}
            
            <p>If you can see the content above, the null props issue is fixed!</p>
        </div>
    );
};