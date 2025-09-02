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
            <VStack spacing={8}  alignment="center" className='tatva-hero-card'>
                <VStack className='tatva-hero-cont' spacing={4}>
                    <Text className='tatva-lubus' color="white">From the house of LUBUS</Text>
                    <Heading className='head_title' size={40} align="center" color="white !important" lineHeight={1.3} weight={600} >
                        Bring Your Web to Life.
                    </Heading>
                    <Text size={16} align="center" color="#DCFCE6" lineHeight={1.5} style={{ maxWidth: '500px' }}>
                        A lightweight library of custom elements ready to drop into your project with simple tags.
                    </Text>
                    <HStack justify="center" align='center' className={`tatva-header-button`}>
                    <Button icon={FaBook} iconSize={18}  href="https://github.com/lubusIN/tatva/wiki">
                        Documentation
                    </Button>
                    <Button icon={FaGithub} iconSize={18} href='https://github.com/lubusIN/tatva/discussions'>
                        Join discussion
                    </Button>
                </HStack>
                </VStack>
            </VStack>
        </div>
    );
}

export default Banner;