/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
    Button,
    __experimentalHeading as Heading,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalText as Text,
} from "@wordpress/components";
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { RiCalendarScheduleLine } from "react-icons/ri";

/**
 * Internal dependencies.
 */
import './style.scss'
import { LubusLogo } from '@tatva/components';

/**
 * Render Footer
 */
function Footer() {
    return (
        <footer className="tatva-footer">
            <VStack className="footer-content" spacing={0}>
                <VStack alignment="center" spacing={4}>
                    <Heading level={2} align='center' weight={600} size={45} color='white' style={{ margin: 0 }}>
                        Open-source DNA,
                        <br />
                        <Text level={2} weight={600} size={45} color='#5D5D5D' style={{ margin: 0 }}>
                            Product-driven thinking
                        </Text>
                    </Heading>
                    <Text size={16} align="center" weight={400} lineHeight={1.5} color='#A4A4A4' style={{ maxWidth: '600px' }}>
                        We build and deliver scalable solutions shaped by years of hands-on product and
                        open-source experience. We’re passionate about driving positive business impact.
                    </Text>
                    <Button className='footer_btn' href='https://cal.com/lubus' icon={RiCalendarScheduleLine}>
                        Schedule a Call
                    </Button>
                </VStack>
                <HStack className={'footer_bottom'} justify='space-between'>
                    <Link className="footer-logo" to={'https://lubus.in/'} target="_blank">
                        <LubusLogo />
                    </Link>
                    <Text className={'copyright'} color='#A4A4A4'>Copyright © 2025 LUBUS. All rights reserved</Text>
                    <HStack className="social-icons" spacing={0} expanded={false}>
                        <Button icon={FaGithub} iconSize={18} variant='link' href="https://github.com/lubusin" target="_blank" />
                        <Button icon={FaXTwitter} iconSize={18} variant='link' href="https://x.com/lubusIN" target="_blank" />
                        <Button icon={FaLinkedin} iconSize={18} variant='link' href="https://www.linkedin.com/company/lubus/" target="_blank" />
                        <Button icon={FaFacebook} iconSize={18} variant='link' href="https://www.facebook.com/lubusonline/" target="_blank" />
                        <Button icon={FaInstagram} iconSize={18} variant='link' href="https://www.instagram.com/lubusin/" target="_blank" />
                    </HStack>
                </HStack>
            </VStack>
        </footer>
    );
};

export default Footer;