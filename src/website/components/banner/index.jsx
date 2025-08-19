/**
 * External dependencies.
 */
import { Link } from "react-router-dom";
import {
    Card,
    Button,
    CardBody,
    __experimentalText as Text,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
    Icon
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
        <Card className="tatva-hero-Section" isBorderless>
            <CardBody className="tatva-hero-cont" style={{padding: '0px'}}>
                <VStack spacing={8} className='tatva-hero-card'>
                    <VStack spacing={5}>
                        <Text className='tatva-lubus' size={15} align="left" color="white">From the house of LUBUS</Text>
                        <Heading size={40} align="left" color="white" lineHeight={1.3} weight={500}>
                            Bring Your Web to Life.
                        </Heading>
                        <Text size={16} align="left" color="white" lineHeight={1.5} style={{maxWidth: '500px'}}>
                            A lightweight library of custom elements ready to drop into your project with simple tags.
                        </Text>
                    </VStack>
                    <HStack className='tatva-hero-cta' alignment="center" justify="left">
                        <Link to="getting-started">
                            <Button style={{ gap: '8px' }}>
                                <Icon icon={FaBook} />
                                Documentation
                            </Button>
                        </Link>
                        <Button
                            style={{ gap: '8px' }}
                            href='https://github.com/lubusIN/tatva/discussions'
                        >
                            <Icon icon={FaGithub} />
                            Join discussion
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
}

export default Banner;
