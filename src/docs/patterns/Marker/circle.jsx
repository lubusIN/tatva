import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../elements';

function Circle() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="circle">tatva</tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

Circle.meta = {
  title: 'Circle',
  name: 'Circle',
  category: 'Marker',
  path: '/Marker/circle',
};

export default Circle;