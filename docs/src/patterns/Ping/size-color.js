import '../../../../src/index';
import { __experimentalVStack as VStack } from "@wordpress/components";

function SizeColor() {
  return (
    <VStack
      align="center" 
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <tatva-ping color="blue" size="1.2rem"></tatva-ping>
    </VStack>
  );
}

// @meta-start
SizeColor.meta = {
  title: 'Size + Color',
  name: 'SizeColor',
  category: 'Ping',
  path: '/Ping/size-color',
};
// @meta-end

export default SizeColor;