import React from 'react';
import '../../src/elements/index.js';
import { CategoryCard } from './index.js';
import {
    __experimentalGrid as Grid,
} from "@wordpress/components";

// Import all stories to get counts
import * as markerStories from '../../src/stories/tatva-marker.stories.js';
import * as pulseStories from '../../src/stories/tatva-pulse.stories.js';
import * as textAnimationStories from '../../src/stories/tatva-text-animation.stories.js';
import * as imageCompareStories from '../../src/stories/tatva-image-compare.stories.js';

// Helper function to get story count (excluding default export)
const getStoryCount = (stories) => Object.keys(stories).filter(key => key !== 'default').length - 1;


const categories = [
  {
    title: 'Marker',
    count: getStoryCount(markerStories),
    path: `/?path=/docs/examples-marker--docs`,
    thumbnail: () => <tatva-marker type="underline" color="#dc143c">Highlighted</tatva-marker>,
  },
  { 
    title: 'Pulse', 
    count: getStoryCount(pulseStories), 
    path: `/?path=/docs/examples-pulse--docs`,
    thumbnail: () => <tatva-pulse size="0.75rem" color="#1e90ff" gap="8px" superscript-offset="-0.5em">Pro</tatva-pulse>,
  },
  { 
    title: 'Text Animation', 
    count: getStoryCount(textAnimationStories), 
    path: `/?path=/docs/examples-text-animation--docs`,
    thumbnail: () => <tatva-text-animation effect="slide-up" duration="800">Smooth text</tatva-text-animation>,
  },
  { 
    title: 'Image Compare', 
    count: getStoryCount(imageCompareStories), 
    path: `/?path=/docs/examples-image-compare--docs`,
    thumbnail: () => <tatva-image-compare handle="line" > <img slot="before-image" src="assets/before.png" alt="Before" /><img slot="after-image" src="assets/after.png" alt="After" /></tatva-image-compare>,
  },
];

const CategorieSection = () => (
  <div style={{padding: '20px'}}>
            <h2 style={{ fontSize: 20, borderBottom: 'none' }}>Web Components</h2>
            <Grid alignment="bottom"
                spacing={5}
                columns={[1, 2, 3]}
                columnGap={35}
                rowGap={25}>

                {categories.map((c, i) => (
                    <CategoryCard 
                    key={i} 
                    title={c.title} 
                    count={c.count} 
                    path={c.path}
                    thumbnail={c.thumbnail}
                     />
                ))}

            </Grid>
    </div> 
);

export default CategorieSection;


