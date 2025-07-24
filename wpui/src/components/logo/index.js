/**
 * External dependencies.
 */
import React from 'react';
import TatvaLogo from '../../img/tatav.svg';

/**
 * Render Logo
 */
function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={TatvaLogo} alt="Tatva Logo" width="90" height="58"/>
        </div>
    );
}

export default Logo;