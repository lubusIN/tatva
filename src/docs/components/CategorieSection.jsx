import React from 'react';
import '../../elements/index.js';
import { CategoryCard } from './index.js';
import {
  __experimentalGrid as Grid,
} from "@wordpress/components";

// Import all stories to get counts
import * as markerStories from '../../stories/tatva-marker.stories.js';
import * as pulseStories from '../../stories/tatva-pulse.stories.js';
import * as textAnimationStories from '../../stories/tatva-text-animation.stories.js';
import * as imageCompareStories from '../../stories/tatva-image-compare.stories.js';
import * as infoTipStories from '../../stories/tatva-infotip.stories.js';

// Helper function to get story count (excluding default export)
const getStoryCount = (stories) => Object.keys(stories).filter(key => key !== 'default').length - 1;


const categories = [
  {
    title: 'Marker',
    count: getStoryCount(markerStories),
    path: `/?path=/docs/examples-marker--docs`,
    thumbnail: () => <tatva-marker type="underline" color="#dc143c" style={{ fontSize: '32px', fontWeight: '800' }}>Highlighted</tatva-marker>,
  },
  {
    title: 'Pulse',
    count: getStoryCount(pulseStories),
    path: `/?path=/docs/examples-pulse--docs`,
    thumbnail: () => <tatva-pulse size="1.75rem" color="#dc143c" gap="8px" superscript-offset="-0.5em" style={{ fontSize: '32px', fontWeight: '800' }}>Pro</tatva-pulse>,
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
    thumbnail: () => <tatva-image-compare handle="line" hover='true'> <img slot="before-image" src="assets/before.png" alt="Before" /><img slot="after-image" src="assets/after.png" alt="After" /></tatva-image-compare>,
  },
  {
    title: 'Info Tip',
    count: getStoryCount(infoTipStories),
    path: `/?path=/docs/examples-infotip--docs`,
    thumbnail: () => <tatva-infotip content="This is helpful information that appears in the tooltip" underline="false" icon-enabled="true" icon-position="left" icon-type="info" icon-color="#000000" offset="6" overlay-placement="top" overlay-text-color="#ffffff" overlay-background-color="#000000">Hover or focus for info</tatva-infotip>
  },
];

const CategorieSection = () => (
  <div style={{ padding: '20px 10px', maxWidth: '1200px', margin: '0 auto' }}>
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


