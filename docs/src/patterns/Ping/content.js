import '../../../../src/index';
import { __experimentalVStack as VStack } from "@wordpress/components";

function Content() {
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
Content.meta = {
  title: 'Content',
  name: 'Content',
  category: 'Ping',
  path: '/Ping/content',
};
// @meta-end

export default Content;