import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Marker6() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="strikethrough">tatva</tatva-marker>
      </Heading>
    </VStack>

  );
}

// @meta-start
Marker6.meta = {
  title: 'Strikethrough',
  name: 'Marker6',
  category: 'Marker',
  path: '/Marker/marker6',
};
// @meta-end

export default Marker6;