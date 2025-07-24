import { 
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,

 } from "@wordpress/components";
import '../../Tatva';

function Marker7() {
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
Marker7.meta = {
  title: 'Cross',
  name: 'Marker7',
  category: 'Marker',
  path: '/Marker/marker7',
};
// @meta-end

export default Marker7;