/**
 * External dependencies.
 */
import {
    __experimentalText as Text,
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
    __experimentalHStack as HStack,
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
            <VStack alignment="left" className='tatva-hero-card'>
                <VStack className='tatva-hero-cont' spacing={4}>
                    <Text className='tatva-lubus' align="left"  color="white">From the house of LUBUS</Text>
                    <Heading className='head_title' size={40} align="left" color="white !important" lineHeight={1.3} weight={600} >
                        Bring Your Web to Life.
                    </Heading>
                    <Text size={16} align="left" color="#DCFCE6" lineHeight={1.5} style={{ maxWidth: '500px' }}>
                        A lightweight library of custom elements ready to drop into your project with simple tags.
                    </Text>
                </VStack>
            </VStack>
        </div>
    );
}

export default Banner;