import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Strike() {
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
Strike.meta = {
  title: 'Strike',
  name: 'Strike',
  category: 'Marker',
  path: '/Marker/strike',
};
// @meta-end

export default Strike;