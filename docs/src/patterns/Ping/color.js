import '../../../../src/index';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Color() {
  return (
   <VStack
      align="center" // horizontal
      style={{
        height: '100vh',              
        justifyContent: 'center',
      }}
    >
      <tatva-ping color="red"></tatva-ping>
    </VStack>
  );
}

// @meta-start
Color.meta = {
  title: 'Color',
  name: 'Color',
  category: 'Ping',
  path: '/Ping/color',
};
// @meta-end

export default Color;