/**
 * External dependencies.
 */
import { useState } from "react";
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
import { ExampleCode } from 'src/website/components';;
import './style.scss';

function ExampleView({ title, path, component: Example }) {
    const [view, setView] = useState("preview");

    return (
        <VStack spacing={4} className="example-view">
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
            <Card className="variation-card" variant='dotted' >
                {view === "preview" ? <Example /> : <ExampleCode path={path} />}
            </Card>
        </VStack>
    );
}

export default ExampleView;