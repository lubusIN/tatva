/**
 * External dependencies.
 */
import { Link } from "react-router-dom";
import { __ } from '@wordpress/i18n';
import {
    chevronRight,
} from "@wordpress/icons";
import {
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    __experimentalGrid as Grid,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import ExampleView from "@tatva/components/example-view";

/**
 * Render Examples Page
 */
function Examples({ examples }) {

    const categoryTitle = examples?.[Object.keys(examples)[0]]?.meta?.category ?? "Tatva UI";

    return (
        <VStack className="tatva-com-page" spacing={8}>
            <HStack className="tatva-back-button" alignment="left" spacing={0}>
                <Link to="/" style={{ boxShadow: 'none', textDecoration: 'none' }}>
                    <div>
                        <span className="home" style={{ display: "flex" }}>
                            Home
                            <div style={{ width: '20px', height: '20px' }}>
                                {chevronRight}
                            </div>
                        </span>
                    </div>
                </Link>
                <span>{categoryTitle}</span>
            </HStack>

            <Grid
                alignment="bottom"
                columns={[1, 2, 3]}
                columnGap={35}
                rowGap={35}>
                {Object.values(examples).map((Example, index) => {
                    const { title, name, category, path } = Example.meta;
                    return (
                        <div key={index}>
                            <ExampleView
                                title={title}
                                name={name}
                                category={category}
                                path={path}
                                component={Example}
                            />
                        </div>
                    );
                })}
            </Grid>
        </VStack>
    );
};

export default Examples;