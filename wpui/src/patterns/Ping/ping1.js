import '../../Tatva';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Ping1() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <tatva-ping></tatva-ping>
    </VStack>
  );
}

// @meta-start
Ping1.meta = {
  title: 'Default',
  name: 'Ping1',
  category: 'Ping',
  path: '/Ping/ping1',
};
// @meta-end

export default Ping1;