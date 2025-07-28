/**
 * External dependencies.
 */
import { Link } from "react-router-dom";

/**
 * WordPress dependencies.
 */
import {
    Card,
    Button,
    CardBody,
    __experimentalText as Text,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import './style.scss';

/**
 * Render Banner
 */
function Banner() {
    return (
        <Card className="wpui-hero-Section" isBorderless>
            <CardBody className="wpui-hero-cont">
                <VStack spacing={12} className='wpui-hero-card'>
                    <VStack spacing={5}>
                        <Text className='wpui-lubus' size={15} align="left" color="white">Custom elements from the house of lubus</Text>
                        <Heading size={40} align="left" color="white" lineHeight={1.3} weight={500}>
                            Craft blazing fast UI with Tatva custom elements.

                        </Heading>
                        <Text size={16} align="left" color="white" lineHeight={1.5}>
                            Welcome to the era of custom HTML elements with Tatva.
                        </Text>
                    </VStack>
                    <HStack className='wpui-hero-cta' alignment="center" justify="left">
                        <Link to="getting-started">
                            <Button variant="primary">
                                Getting started
                            </Button>
                        </Link>
                        <Button
                            variant="secondary"
                            style={{ borderColor: '#ffffff' }}
                            href='https://github.com/lubusIN/wpui/discussions'
                        >
                            Join discussion
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
}

export default Banner;
