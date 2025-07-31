/**
 * WordPress dependencies.
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
import { categories } from '@tatva/categories';

/**
 * Render Component Menu
 */
function Home() {
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
                            const { title, path } = category.meta;
                            return (
                                <CategoryCard
                                    key={`${index}-${path}`}
                                    thumbnail={category}
                                    title={title}
                                    path={path}
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