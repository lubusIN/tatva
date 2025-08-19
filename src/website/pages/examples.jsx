/**
 * External dependencies.
 */
import { Link } from "react-router-dom";
import { __ } from '@wordpress/i18n';
import {
    Icon,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalGrid as Grid,
} from "@wordpress/components";
import { GoChevronRight } from "react-icons/go";

/**
 * Internal dependencies.
 */
import { ExampleView } from "@tatva/components";

/**
 * Render Examples Page
 * This component renders a page displaying a list of example components.
 * 
 * @param {Object} props - Component properties.
 * @param {Array} props.examples - List of example components to render.
 * @returns {JSX.Element} Rendered examples page.
 */
function Examples({ examples }) {

    const category = examples.find(example => example.category)?.category || __('Examples', 'tatva');

    return (
        <VStack className="tatva-com-page" spacing={8}>
            <HStack className="tatva-back-button" alignment="topLeft" spacing={0}>
                <Link to="/">
                    Home
                </Link>
                <Icon icon={GoChevronRight} size={18} />
                <span>{category}</span>
            </HStack>
            <Grid
                alignment="bottom"
                columns={[1, 2, 3]}
                columnGap={35}
                rowGap={35}>
                {Object.values(examples).map((Example, index) => {
                    const { title, category, component, rawComponent } = Example;
                    return (
                        <ExampleView
                            key={index}
                            title={title}
                            category={category}
                            component={component}
                            rawComponent={rawComponent}
                        />
                    );
                })}
            </Grid>
        </VStack>
    );
};

export default Examples;