/**
 * External dependencies.
 */
import {
    __experimentalText as Text,
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
        <div className="tatva-hero-Section">
            <VStack spacing={8} className='tatva-hero-card tatva-hero-cont'>
                <VStack spacing={5}>
                    <Text className='tatva-lubus' size={15} align="left" color="white">From the house of LUBUS</Text>
                    <Heading size={40} align="left" color="white" lineHeight={1.3} weight={500}>
                        Craft blazing fast UI with Tatva custom elements.
                    </Heading>
                </VStack>
            </VStack>
        </div>
    );
}

export default Banner;
