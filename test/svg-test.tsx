import { createElement } from '../dist/es6/index';

// Simple test for SVG namespace issue
export const SvgTest = () => {
    return (
        <div>
            <h2>SVG Test - Current Behavior</h2>
            <svg width="200" height="200" style={{ border: '1px solid black' }}>
                <rect width="100" height="100" fill="red" />
                <a href="#test">
                    <title>This is a title</title>
                    <text x="10" y="130" fill="blue">Click me</text>
                </a>
            </svg>
            <div id="namespace-test"></div>
        </div>
    );
}