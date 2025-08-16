import { __experimentalVStack as VStack } from "@wordpress/components";

function Size() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      {/* @code-start */}
      <tatva-pulse
        color="#3858e9"
        size="1.2rem"
      />
      {/* @code-end */}
    </VStack>
  );
}

Size.meta = {
  title: 'Size',
  name: 'Size',
  category: 'Pulse',
  path: '/Pulse/size',
};

export default Size;