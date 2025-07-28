import '../../../../src/index';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Default() {
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
Default.meta = {
  title: 'Default',
  name: 'Default',
  category: 'Ping',
  path: '/Ping/default',
};
// @meta-end

export default Default;