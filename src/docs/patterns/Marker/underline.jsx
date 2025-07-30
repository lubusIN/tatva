import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../elements';

function Underline() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="underline">
          tatva
        </tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

Underline.meta = {
  title: 'Underline',
  name: 'Underline',
  category: 'Marker',
  path: '/Marker/underline',
};

export default Underline;