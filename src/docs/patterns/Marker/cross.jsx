import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,

} from "@wordpress/components";
import '../../../elements';

function Cross() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="cross">
          tatva
        </tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

Cross.meta = {
  title: 'Cross',
  name: 'Cross',
  category: 'Marker',
  path: '/Marker/cross',
};

export default Cross;