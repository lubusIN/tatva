import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../elements';

function Curly() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="curly">tatva</tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

Curly.meta = {
  title: 'Curly',
  name: 'Curly',
  category: 'Marker',
  path: '/Marker/curly',
};

export default Curly;