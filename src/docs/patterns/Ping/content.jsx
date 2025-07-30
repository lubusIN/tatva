import '../../../elements';
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
      <tatva-ping
        class="flex"
        color="#008710"
        size="1.4rem">
        New
      </tatva-ping>
      {/* @code-end */}
    </VStack>
  );
}

Content.meta = {
  title: 'Content',
  name: 'Content',
  category: 'Ping',
  path: '/Ping/content',
};

export default Content;