import '../../Tatva';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Ping2() {
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
Ping2.meta = {
  title: 'Color',
  name: 'Ping2',
  category: 'Ping',
  path: '/Ping/ping2',
};
// @meta-end

export default Ping2;