/**
 * External dependencies.
 */
import { Link } from "react-router-dom";

/**
 * WordPress dependencies.
 */
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
import PatternView from "@tatva/components/pattern-view";

/**
 * Render Patterns Page
 */
function Patterns({ patterns }) {

    const categoryTitle = patterns?.[Object.keys(patterns)[0]]?.meta?.category ?? "Tatva UI";

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
                            {categoryTitle}
                        </span>
                    </div>
                </Link>
            </HStack>

            <Grid
                alignment="bottom"
                columns={[1, 2]}
                columnGap={30}
                rowGap={25}>
                {Object.values(patterns).map((Pattern, index) => {
                    const { title, name, category, path } = Pattern.meta;
                    return (
                        <div key={index}>
                            <PatternView
                                title={title}
                                name={name}
                                category={category}
                                path={path}
                                component={Pattern}
                            />
                        </div>
                    );
                })}
            </Grid>
        </VStack>
    );
};

export default Patterns;