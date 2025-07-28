import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Marker1() {
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
Marker1.meta = {
  title: 'Circle',
  name: 'Marker1',
  category: 'Marker',
  path: '/Marker/marker1',
};
// @meta-end

export default Marker1;