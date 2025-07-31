/**
 * External dependencies.
 */
import { Routes, Route } from "react-router-dom";

/**
 * Internal dependencies.
 */
import '../elements';
import { categories } from 'src/website/categories';
import { Home, Examples, GettingStarted } from 'src/website/pages'
import { Footer, Header, ScrollToTop } from 'src/website/components';

/**
 * Render App
 */
function App() {
    return (
        <ScrollToTop>
            <div className='tatva_container'>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} style={{ overflowX: 'visible' }} />
                    <Route path="/getting-started" element={<GettingStarted />} style={{ overflowX: 'visible' }} />
                    {/* Render elements category routes */}
                    {categories.map((category, index) => {
                        const { title, path, examples } = category.meta;
                        return (
                            <Route key={index} title={title} path={path} element={<Examples examples={examples} />} />
                        )
                    })}
                </Routes >

                <Footer />
            </div>
        </ScrollToTop>
    );
};

export default App;