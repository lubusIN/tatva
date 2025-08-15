import { __experimentalVStack as VStack } from "@wordpress/components";

function Color() {
  return (
    <VStack
      align="center" // horizontal
      style={{
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {/* @code-start */}
      <tatva-pulse color="#e14d43" />
      {/* @code-end */}
    </VStack>
  );
}

Color.meta = {
  title: 'Color',
  name: 'Color',
  category: 'Pulse',
  path: '/Pulse/color',
};

export default Color;