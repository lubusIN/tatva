/**
 * External dependencies.
 */
import { Link } from "react-router-dom";

/**
 * WordPress dependencies.
 */
import {
    Card,
    __experimentalVStack as VStack,
    __experimentalText as Text,
    __experimentalHeading as Heading,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import './style.scss'

/**
 * Render Category Card 
 */
function CategoryCard({ thumbnail: Thumbnail, title, path }) {
    return (
        <VStack className="tatva-preview">
            <Link className="tatva-card-link" to={path}>
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
                            {title}
                        </Heading>
                    </VStack>
                </VStack>
            </Link>
        </VStack>
    );
}

export default CategoryCard;