/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
    Card,
    CardBody,
    Button,
    __experimentalHeading as Heading,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalText as Text,
} from "@wordpress/components";
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

/**
 * Internal dependencies.
 */
import './style.scss'
import { LubusLogo } from '..';

/**
 * Render Footer
 */
function Footer() {
    return (
        <Card className="tatva-footer" size="large" isBorderless isRounded={false}>
            <CardBody>
                <HStack className="footer-content" justify="space-between" alignment='flex-start' spacing={4} direction='row-reverse'>
                    {/* Left Content */}
                    <VStack spacing={3} className="footer-left">
                        <Heading level={2} weight={600} size={24} style={{ color: 'white', margin: 0 }}>
                            Open-source DNA,Product-driven thinking
                        </Heading>
                        <Text size={14} weight={400} lineHeight={1.6} color="#A0A0A0" style={{ maxWidth: '600px' }}>
                            We build and deliver scalable solutions shaped by years of hands-on product and <br/>
                            open-source experience. We’re passionate about driving positive business impact.
                        </Text>
                        <Button className='footer_btn' href='https://cal.com/lubus'>
                            Schedule a Call
                        </Button>
                    </VStack>

                    {/* Right Content */}
                    <VStack spacing={4} justify="flex-end">
                       <VStack spacing={2}>
                            <Link className="footer-logo" to={'https://lubus.in/'} target="_blank">
                                <LubusLogo/> 
                            </Link>
                            <Text size={16} weight={400} color="#A0A0A0">
                                Friendly Solutions
                            </Text>
                        </VStack> 
                        {/* Social Links with Icons */}
                        <HStack className="social-icons" spacing={4}>
                            <Button variant='link' href="https://www.facebook.com/lubusonline/" target="_blank">
                                <FaFacebook size={22} color="white" />
                            </Button>
                            <Button variant='link' href="https://github.com/lubusin" target="_blank">
                                <FaGithub size={22} color="white" />
                            </Button>
                            <Button variant='link' href="https://www.linkedin.com/company/lubus/" target="_blank">
                                <FaLinkedin size={22} color="white" />
                            </Button>
                            <Button variant='link' href="https://www.instagram.com/lubusin/" target="_blank">
                                <FaInstagram size={22} color="white" />
                            </Button>
                            <Button variant='link' href="https://x.com/lubusIN" target="_blank">
                                <FaXTwitter size={22} color="white" />
                            </Button>
                        </HStack>
                    </VStack>
                </HStack>
            </CardBody>
        </Card>
    );
};

export default Footer;