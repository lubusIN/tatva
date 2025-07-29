import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import '../../../../src/index';

function Strike() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="strike">tatva</tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>

  );
}

Strike.meta = {
  title: 'Strike',
  name: 'Strike',
  category: 'Marker',
  path: '/Marker/strike',
};

export default Strike;