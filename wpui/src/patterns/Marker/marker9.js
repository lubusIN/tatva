import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../Tatva';

function Marker9() {
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
Marker9.meta = {
  title: 'Double',
  name: 'Marker9',
  category: 'Marker',
  path: '/Marker/marker9',
};
// @meta-end

export default Marker9;