/**
 * External dependencies.
 */
import {
    Button,
    __experimentalText as Text,
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
    __experimentalHStack as HStack,
} from "@wordpress/components";
import { FaGithub, FaBook } from "react-icons/fa";
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
            <VStack spacing={8} className='tatva-hero-card'>
                <VStack className='tatva-hero-cont' spacing={5}>
                    <Text className='tatva-lubus' size={15} align="left" color="white">From the house of LUBUS</Text>
                    <Heading size={40} align="left" color="white !important" lineHeight={1.3} weight={500} style={{ borderBottom: 'none' }}>
                        Bring Your Web to Life.
                    </Heading>
                    <Text size={16} align="left" color="#A4A4A4" lineHeight={1.5} style={{ maxWidth: '500px' }}>
                        A lightweight library of custom elements ready to drop into your project with simple tags.
                    </Text>
                    <HStack justify="left" className={`tatva-header-button`}>
                    <Button icon={FaBook} iconSize={18} style={{ gap: '8px', display: 'flex' }} href="https://github.com/lubusIN/tatva/wiki">
                        Documentation
                    </Button>
                    <Button
                        icon={FaGithub} iconSize={18}
                        style={{ gap: '8px', display: 'flex' }}
                        href='https://github.com/lubusIN/tatva/discussions'
                    >
                        Join discussion
                    </Button>
                </HStack>
                </VStack>
            </VStack>
        </div>
    );
}

export default Banner;