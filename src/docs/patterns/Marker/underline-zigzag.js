import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function UnderlineZigzag() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="underline-zigzag">tatva</tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

UnderlineZigzag.meta = {
  title: 'Underline Zigzag',
  name: 'UnderlineZigzag',
  category: 'Marker',
  path: '/Marker/underline-zigzag',
};

export default UnderlineZigzag;