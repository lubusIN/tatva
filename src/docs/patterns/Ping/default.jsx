import '../../../elements';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Default() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      {/* @code-start */}
      <tatva-ping></tatva-ping>
      {/* @code-end */}
    </VStack>
  );
}

Default.meta = {
  title: 'Default',
  name: 'Default',
  category: 'Ping',
  path: '/Ping/default',
};

export default Default;