/**
 * External dependencies.
 */
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

    const handleClick = () => {
        if (path) {
           window.parent.location = path;
        }
    };

    return (
        <VStack className="tatva-preview">
            <div className="tatva-card-link" onClick={handleClick} style={{ cursor: path ? 'pointer' : 'default' }}>
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
                            style={{ margin: 0 }}
                        >
                            {title || <span>&nbsp;</span>}
                        </Heading>
                        <Text color="gray" size={14}>{`${count} examples`}</Text>
                    </VStack>
                </VStack>
            </div>
        </VStack>
    );
}

export default CategoryCard;