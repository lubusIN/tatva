import '../../../../src/index';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Ping4() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <tatva-ping class="flex" color="green" size="1.4rem">New</tatva-ping>
    </VStack>
  );
}

// @meta-start
Ping4.meta = {
  title: 'Content',
  name: 'Ping4',
  category: 'Ping',
  path: '/Ping/ping4',
};
// @meta-end

export default Ping4;