/**
 * External dependencies.
 */
import React from "react"
import ReactDom from "react-dom/client"
import { BrowserRouter } from "react-router-dom";

/**
 * WordPress dependencies.
 */
import '@wordpress/components/build-style/style.css';

/**
 * Internal dependencies.
 */
import '@tatva/app.scss';
import App from '@tatva/app';
import * as Patterns from '@tatva/patterns'

const queryParams = new URLSearchParams(window.location.search)
const mode = queryParams.get("mode");
const category = queryParams.get("category");
const pattern = queryParams.get("pattern");

const root = ReactDom.createRoot(document.getElementById('root'))

if (mode) {
    const Pattern = Patterns[category][pattern];
    const embedStyle = category !== 'Shells' ? { marginTop: '1px', marginLeft: '1px', marginRight: '1px' } : {};

    root.render(
        <div className="tatva-pattern-embed" style={embedStyle}>
            <Pattern />
        </div>
    )
} else {
    root.render(
        <React.StrictMode>
            <BrowserRouter> 
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
}
