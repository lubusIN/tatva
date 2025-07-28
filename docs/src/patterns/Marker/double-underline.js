import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function DoubleUnderline() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        <tatva-marker type="double-underline">tatva</tatva-marker>
      </Heading>
    </VStack>
  );
}

// @meta-start
DoubleUnderline.meta = {
  title: 'Double Underline',
  name: 'DoubleUnderline',
  category: 'Marker',
  path: '/Marker/double-underline',
};
// @meta-end

export default DoubleUnderline;