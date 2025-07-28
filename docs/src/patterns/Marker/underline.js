import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Underline() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="underline">tatva</tatva-marker>
      </Heading>
    </VStack>
  );
}

// @meta-start
Underline.meta = {
  title: 'Underline',
  name: 'Underline',
  category: 'Marker',
  path: '/Marker/underline',
};
// @meta-end

export default Underline;