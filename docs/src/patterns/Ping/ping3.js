import '../../../../src/index';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Ping3() {
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
Ping3.meta = {
  title: 'Size + Color',
  name: 'Ping3',
  category: 'Ping',
  path: '/Ping/ping3',
};
// @meta-end

export default Ping3;