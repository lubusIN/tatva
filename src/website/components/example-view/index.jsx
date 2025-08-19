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
import { ExampleCode } from '@tatva/components';;
import './style.scss';

function ExampleView({ title, component: Example, rawComponent }) {
    const [view, setView] = useState("preview");

    return (
        <VStack spacing={4} className="example-view">
            <HStack>
                <Heading className="head" level={4} weight={500}>
                    {title}
                </Heading>

                <ToggleGroupControl
                    className="tatva-view-toggle"
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
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

            {/* Single Card- toggle inner content */}
            <Card className={`${view} variation-card`} variant='dotted' >
                {view === "preview" ? <Example /> : <ExampleCode rawComponent={rawComponent} />}
            </Card>
        </VStack>
    );
}

export default ExampleView;