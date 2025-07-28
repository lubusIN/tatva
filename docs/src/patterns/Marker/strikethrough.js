import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Strikethrough() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="strikethrough">tatva</tatva-marker>
      </Heading>
    </VStack>

  );
}

// @meta-start
Strikethrough.meta = {
  title: 'Strikethrough',
  name: 'Strikethrough',
  category: 'Marker',
  path: '/Marker/strikethrough',
};
// @meta-end

export default Strikethrough;