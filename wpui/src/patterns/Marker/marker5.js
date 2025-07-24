import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../Tatva';

function Marker5() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="underline-zigzag">tatva</tatva-marker>
      </Heading>
    </VStack>
  );
}

// @meta-start
Marker5.meta = {
  title: 'Underline Zigzag',
  name: 'Marker5',
  category: 'Marker',
  path: '/Marker/marker5',
};
// @meta-end

export default Marker5;