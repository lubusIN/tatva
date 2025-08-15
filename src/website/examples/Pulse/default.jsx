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
      <tatva-pulse />
      {/* @code-end */}
    </VStack>
  );
}

Default.meta = {
  title: 'Default',
  name: 'Default',
  category: 'Pulse',
  path: '/Pulse/default',
};

export default Default;