import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Curly() {
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
Curly.meta = {
  title: 'Curly',
  name: 'Curly',
  category: 'Marker',
  path: '/Marker/Curly',
};
// @meta-end

export default Curly;