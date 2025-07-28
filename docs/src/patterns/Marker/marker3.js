import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Marker3() {
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
Marker3.meta = {
  title: 'Underline',
  name: 'Marker3',
  category: 'Marker',
  path: '/Marker/marker3',
};
// @meta-end

export default Marker3;