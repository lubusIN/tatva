/**
 * External dependencies.
 */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { __ } from '@wordpress/i18n';
import {
    Card,
    Button,
    __experimentalHStack as HStack,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import './style.scss';
import { Logo } from '@tatva/components';

/**
 * Render Header
 */
function Header() {
    const { pathname } = useLocation();
    const [showButtons, setShowButton] = useState('none');
    const headerClass = pathname === '/' ? 'tatva-header' : 'not-sticky';

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const showButtons = entries[0].isIntersecting;
            setShowButton(showButtons ? 'none' : '');
        });

        if (pathname === '/') {
            setShowButton('none');

            const target = document.querySelector('.tatva-hero-card');

            // 🛑 Add this null check
            if (target) {
                observer.observe(target);
            }

            // ✅ Clean up observer when component unmounts or path changes
            return () => {
                if (target) observer.unobserve(target);
            };
        } else {
            setShowButton('');
        }
    }, [pathname]);

    return (
        <Card className={headerClass} isBorderless>
            <HStack className="header_cont">
                <Link to={"/"} className='tatva-site-logo'>
                    <Logo />
                </Link>
                <HStack expanded={false} className={`tatva-header-button ${showButtons}`}>
                    <Link to="getting-started">
                        <Button variant="primary" style={{ backgroundColor: 'crimson' }}>
                            Getting started
                        </Button>
                    </Link>
                    <Button
                        style={{ border: '1.5px solid #ffffff', color: 'white' }}
                        href='https://github.com/lubusIN/tatva/discussions'
                    >
                        Join discussion
                    </Button>
                </HStack>
            </HStack>
        </Card>
    );
};

export default Header;
