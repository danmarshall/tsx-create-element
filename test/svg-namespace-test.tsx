import { createElement } from '../dist/es6/index';

// Test for SVG namespace fix with overlapping tags
export const SvgNamespaceTest = () => {
    return (
        <div>
            <h2>SVG Namespace Test</h2>
            <p>Testing overlapping HTML/SVG tags inside SVG elements:</p>
            <svg width="300" height="200" style={{ border: '1px solid black' }}>
                {/* SVG-only elements */}
                <rect x="10" y="10" width="80" height="80" fill="red" />
                <circle cx="150" cy="50" r="30" fill="blue" />
                <line x1="10" y1="100" x2="100" y2="100" stroke="green" strokeWidth="2" />
                
                {/* Overlapping tags that were problematic */}
                <a href="#test">
                    <title>SVG Title Element</title>
                    <text x="10" y="130" fill="purple">Clickable SVG Text</text>
                </a>
                
                {/* Additional overlapping tags */}
                <style>{`.svg-style { fill: orange; }`}</style>
                
                {/* More <a> elements to test the fix */}
                <a href="#link1">
                    <text x="10" y="170" fill="red">SVG Link 1</text>
                </a>
                <a href="#link2">
                    <text x="150" y="170" fill="blue">SVG Link 2</text>
                </a>
            </svg>
            
            <p><strong>All elements above should use SVG namespace (http://www.w3.org/2000/svg)</strong></p>
            
            <h3>HTML Elements (for comparison)</h3>
            <p>Compare with HTML elements which use HTML namespace:</p>
            <a href="#html-link1">HTML Link 1</a>
            <a href="#html-link2">HTML Link 2</a>
            <a href="#html-link3">HTML Link 3</a>
            
            <p>Before the fix: overlapping tags like &lt;a&gt;, &lt;title&gt;, &lt;style&gt; would use HTML namespace</p>
            <p>After the fix: all elements inside &lt;svg&gt; automatically use SVG namespace</p>
        </div>
    );
}