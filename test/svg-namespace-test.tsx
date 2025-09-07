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
            </svg>
            
            <p><strong>All elements above should use SVG namespace (http://www.w3.org/2000/svg)</strong></p>
            <p>Before the fix: overlapping tags like &lt;a&gt;, &lt;title&gt;, &lt;style&gt; would use HTML namespace</p>
            <p>After the fix: all elements inside &lt;svg&gt; automatically use SVG namespace</p>
        </div>
    );
}