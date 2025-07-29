import '../../../elements';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Color() {
  return (
    <VStack
      align="center" // horizontal
      style={{
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {/* @code-start */}
      <tatva-ping color="red"></tatva-ping>
      {/* @code-end */}
    </VStack>
  );
}

Color.meta = {
  title: 'Color',
  name: 'Color',
  category: 'Ping',
  path: '/Ping/color',
};

export default Color;