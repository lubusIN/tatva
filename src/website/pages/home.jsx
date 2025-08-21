/**
 * External dependencies.
 */
import {
    __experimentalGrid as Grid,
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
} from "@wordpress/components";

/**
 * Internal dependencies.
 */
import { Banner, CategoryCard } from "@tatva/components";
import { getDefaultCategories } from '@tatva/examples';

/**
 * Render Component Menu
 */
function Home() {
    const categories = getDefaultCategories();

    return (
        <>
            <Banner />
            <VStack className="tatva-lcont" spacing={5}>
                <Heading className="tatva-heading">Web Components</Heading>
                <Grid
                    className="tatva-column"
                    alignment="bottom"
                    columns={[1, 2, 3]}
                    columnGap={30}
                    rowGap={25}
                >
                    {
                        categories.map((category, index) => {
                            const { path, variants } = category.meta;
                            return (
                                <CategoryCard
                                    key={index}
                                    thumbnail={category}
                                    title={category.meta.category}
                                    path={path}
                                    count={variants.length}
                                />
                            )
                        })
                    }
                </Grid>
            </VStack>
        </>
    );
};

export default Home;