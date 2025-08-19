/**
 * External dependencies.
 */
import { Link } from "react-router-dom";
import {
    Card,
    __experimentalText as Text,
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import './style.scss'

/**
 * Render Category Card 
 * 
 * @param {Object} props - The properties for the component.
 * @param {JSX.Element} props.thumbnail - The thumbnail component to display.
 * @param {string} props.title - The title of the category.
 * @param {string} props.path - The path to navigate to when the card is clicked.
 * @returns {JSX.Element} - The rendered Category Card component.
 */
function CategoryCard({ thumbnail: Thumbnail, title, path, count }) {
    const Wrapper = path ? Link : 'div';
    return (
        <VStack className="tatva-preview">
            <Wrapper className="tatva-card-link" to={path}>
                <VStack>
                    <Card className="tatva-card-preview" size="large" isBorderless >
                        <Thumbnail />
                    </Card>
                    <VStack spacing={0}>
                        <Heading
                            adjustLineHeightForInnerControls="small"
                            align="left"
                            level={3}
                            weight={500}
                        >
                            {title || <span>&nbsp;</span>}
                        </Heading>
                        <Text color="gray" size={14}>{`${count} examples`}</Text>
                    </VStack>
                </VStack>
            </Wrapper>
        </VStack>
    );
}

export default CategoryCard;