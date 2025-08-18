/**
 * External dependencies.
 */
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Internal dependencies.
 */
import '../elements';
import { getDefaultCategories } from '@tatva/examples';
import { Home, Examples, GettingStarted } from '@tatva/pages'
import { Footer, Header } from '@tatva/components';

/**
 * Render App
 */
function App() {
    const categories = getDefaultCategories();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='tatva_container'>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} style={{ overflowX: 'visible' }} />
                <Route path="/getting-started" element={<GettingStarted />} style={{ overflowX: 'visible' }} />
                {/* Render elements category routes */}
                {categories.map((category, index) => {
                    const { path, variants } = category.meta;
                    return (
                        <Route key={index} path={path} element={<Examples examples={variants} />} />
                    )
                })}
            </Routes >

            <Footer />
        </div>
    );
};

export default App;