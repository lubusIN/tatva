import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Marker8() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="strike">tatva</tatva-marker>
      </Heading>
    </VStack>

  );
}

// @meta-start
Marker8.meta = {
  title: 'Strike',
  name: 'Marker8',
  category: 'Marker',
  path: '/Marker/marker8',
};
// @meta-end

export default Marker8;