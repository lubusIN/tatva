import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../elements';

function DoubleUnderline() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="double-underline">
          tatva
          </tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

DoubleUnderline.meta = {
  title: 'Double Underline',
  name: 'DoubleUnderline',
  category: 'Marker',
  path: '/Marker/double-underline',
};

export default DoubleUnderline;