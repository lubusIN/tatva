import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Circle() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="circle">tatva</tatva-marker>
      </Heading>
    </VStack>
  );
}

// @meta-start
Circle.meta = {
  title: 'Circle',
  name: 'Circle',
  category: 'Marker',
  path: '/Marker/circle',
};
// @meta-end

export default Circle;