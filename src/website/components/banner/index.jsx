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
                        Bring Your Web to Life.
                    </Heading>
                    <Text size={16} align="left" color="#A4A4A4" lineHeight={1.5} style={{ maxWidth: '500px' }}>
                        A lightweight library of custom elements ready to drop into your project with simple tags.
                    </Text>
                </VStack>
            </VStack>
        </div>
    );
}

export default Banner;
