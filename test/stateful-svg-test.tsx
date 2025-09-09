import { createElement } from '../dist/es6/index';

export interface StatefulSvgTestProps {
    count: number;
    buttonClick: () => void;
}

// Test for SVG namespace fix with stateful functionality
export const StatefulSvgTest = (props: StatefulSvgTestProps) => {
    // Create circles based on count, arranged in a grid
    const circles = [];
    for (let i = 0; i < props.count; i++) {
        const x = 30 + (i % 8) * 40; // 8 circles per row
        const y = 30 + Math.floor(i / 8) * 40; // New row every 8 circles
        const hue = (i * 30) % 360; // Different color for each circle
        
        circles.push(
            <circle 
                key={i}
                cx={x} 
                cy={y} 
                r="15" 
                fill={`hsl(${hue}, 70%, 60%)`}
                stroke="black"
                strokeWidth="1"
            />
        );
    }

    return (
        <div>
            <h2>Stateful SVG Test</h2>
            <p>Click the links below to add more circles (count: {props.count}):</p>
            <svg width="350" height="200" style={{ border: '1px solid black' }}>
                {/* Background grid */}
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ddd" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Dynamic circles based on count */}
                {circles}
                
                {/* Interactive SVG links that call buttonClick */}
                <a href="#" onClick={(e) => { e.preventDefault(); props.buttonClick(); }}>
                    <rect x="10" y="160" width="60" height="25" fill="lightblue" stroke="blue" strokeWidth="1" rx="5"/>
                    <text x="40" y="175" textAnchor="middle" fill="blue" fontSize="12">Add One</text>
                </a>
                
                <a href="#" onClick={(e) => { e.preventDefault(); props.buttonClick(); }}>
                    <rect x="80" y="160" width="60" height="25" fill="lightgreen" stroke="green" strokeWidth="1" rx="5"/>
                    <text x="110" y="175" textAnchor="middle" fill="green" fontSize="12">Add More</text>
                </a>
                
                <text x="175" y="175" fill="black" fontSize="12">Count: {props.count}</text>
            </svg>
            
            <p><strong>Demonstrates:</strong></p>
            <ul>
                <li>SVG namespace working with stateful components</li>
                <li>Interactive SVG links calling React-style event handlers</li>
                <li>Dynamic rendering based on state (circles increase with count)</li>
                <li>All SVG elements properly namespaced despite overlapping HTML tag names (&lt;a&gt;, &lt;text&gt;, etc.)</li>
            </ul>
        </div>
    );
};