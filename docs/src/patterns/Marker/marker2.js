import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../Tatva';

function Marker2() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="curly">tatva</tatva-marker>
      </Heading>
    </VStack>
  );
}

// @meta-start
Marker2.meta = {
  title: 'Curly',
  name: 'Marker2',
  category: 'Marker',
  path: '/Marker/marker2',
};
// @meta-end

export default Marker2;