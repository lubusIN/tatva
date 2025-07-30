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
import * as categories from '@tatva/categories';

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
                        Object.values(categories)
                            .sort((a, b) => {
                                // Move Coming Soon to the bottom
                                if (a.meta.title === 'Coming Soon') return 1;
                                if (b.meta.title === 'Coming Soon') return -1;
                                return 0;
                            }).map((category, index) => {
                            const { title, path, patterns } = category.meta;
                            return (
                                <CategoryCard
                                    key={`${index}-${path}`}
                                    thumbnail={
                                    category.meta.patterns && Object.keys(category.meta.patterns).length > 0
                                        ? category.meta.patterns[Object.keys(category.meta.patterns)[0]]
                                        : category
                                    }            
                                    title={title}
                                    path={path}
                                    patterns={patterns}
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