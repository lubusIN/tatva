import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Marker4() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="double-underline">tatva</tatva-marker>
      </Heading>
    </VStack>
  );
}

// @meta-start
Marker4.meta = {
  title: 'Double Underline',
  name: 'Marker4',
  category: 'Marker',
  path: '/Marker/marker4',
};
// @meta-end

export default Marker4;