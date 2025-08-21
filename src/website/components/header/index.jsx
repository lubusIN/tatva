/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Button,
    __experimentalHStack as HStack,
} from "@wordpress/components";
import { FaGithub, FaBook } from "react-icons/fa";

/**
 * Internal dependencies.
 */
import './style.scss';
import { TatvaLogo } from '@tatva/components';

/**
 * Render Header Component
 */
function Header() {
    const { pathname } = useLocation();
    const headerClass = pathname === '/' ? 'sticky' : '';

    return (
        <header className={`tatva-header ${headerClass}`}>
            <HStack className="header_cont">
                <Link to={"/"} className='tatva-site-logo'>
                    <TatvaLogo />
                </Link>
                <HStack expanded={false} className={`tatva-header-button`}>
                    <Button icon={FaBook} iconSize={18} style={{ gap: '8px' }} href="https://github.com/lubusIN/tatva/wiki">
                        Documentation
                    </Button>
                    <Button
                        icon={FaGithub} iconSize={18}
                        style={{ gap: '8px' }}
                        href='https://github.com/lubusIN/tatva/discussions'
                    >
                        Join discussion
                    </Button>
                </HStack>
            </HStack>
        </header>
    );
};

export default Header;
