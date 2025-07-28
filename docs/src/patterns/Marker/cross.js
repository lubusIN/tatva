import { 
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,

 } from "@wordpress/components";
import '../../../../src/index';

function Cross() {
  return (
    <VStack
      align="center" 
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="cross">tatva</tatva-marker>
      </Heading>
      </VStack>
  );
}

// @meta-start
Cross.meta = {
  title: 'Cross',
  name: 'Cross',
  category: 'Marker',
  path: '/Marker/cross',
};
// @meta-end

export default Cross;