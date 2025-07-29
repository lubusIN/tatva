import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Double() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="double">tatva</tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>

  );
}

Double.meta = {
  title: 'Double',
  name: 'Double',
  category: 'Marker',
  path: '/Marker/double',
};

export default Double;