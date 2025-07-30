/**
 * External dependencies.
 */
import { Routes, Route } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { categories } from '@tatva/categories';
import { Home, Patterns, GettingStarted } from '@tatva/pages'
import { Footer, Header, ScrollToTop } from '@tatva/components';

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
                    {/* Render pattern category routes */}
                    {categories.map((category, index) => {
                        const { title, path, patterns } = category.meta;
                        return (
                            <Route key={index} title={title} path={path} element={<Patterns patterns={patterns} />} />
                        )
                    })}
                </Routes >

                <Footer />
            </div>
        </ScrollToTop>
    );
};

export default App;