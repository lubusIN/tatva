/**
 * External dependencies.
 */
import { useState } from "react";
/**
 * WordPress dependencies.
 */
import {
    Card,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalHeading as Heading,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
/**
 * Internal dependencies.
 */
import { PatternCode } from "../index";
import './style.scss';

function PatternView({ title, path, component: Pattern }) {
    const [view, setView] = useState("preview");

    return (
        <VStack spacing={4} className="pattern-view">
            <HStack>
                <HStack>
                    <Heading className="head" level={4} weight={500}>
                        {title}
                    </Heading>
                </HStack>
            
                <HStack justify="right">
                    <ToggleGroupControl
                        className="tatva-view-toggle"
                        hideLabelFromVision
                        value={view}
                        onChange={(value) => setView(value)}
                    >
                        {["Preview", "Code"].map((label, index) => (
                            <ToggleGroupControlOption
                                key={index}
                                value={label.toLowerCase()}
                                label={label}
                                className={`tatva-toggle-button ${view === label.toLowerCase() ? "active" : ""
                                    }`}
                            />
                        ))}
                    </ToggleGroupControl>
                </HStack>
            </HStack>

            {/* Single Card- toggle inner content */}
            <Card className="variation-card">
                {view === "preview" ? <Pattern /> : <PatternCode path={path} />}
            </Card>
        </VStack>
    );
}

export default PatternView;