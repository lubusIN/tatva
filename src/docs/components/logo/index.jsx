/**
 * External dependencies.
 */
import React from 'react';
import TatvaLogo from '../../img/tatva-logo.svg';

/**
 * Render Logo
 */
function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={TatvaLogo} alt="Tatva Logo" height="38"/>
        </div>
    );
}

export default Logo;