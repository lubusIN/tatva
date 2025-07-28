import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Double() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="double">tatva</tatva-marker>
      </Heading>
    </VStack>

  );
}

// @meta-start
Double.meta = {
  title: 'Double',
  name: 'Double',
  category: 'Marker',
  path: '/Marker/double',
};
// @meta-end

export default Double;