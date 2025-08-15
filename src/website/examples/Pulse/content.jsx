import { __experimentalVStack as VStack } from "@wordpress/components";

function Content() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      {/* @code-start */}
      <tatva-pulse
        color="#008710"
        size="1.4rem">
        New
      </tatva-pulse>
      {/* @code-end */}
    </VStack>
  );
}

Content.meta = {
  title: 'Content',
  name: 'Content',
  category: 'Pulse',
  path: '/Pulse/content',
};

export default Content;