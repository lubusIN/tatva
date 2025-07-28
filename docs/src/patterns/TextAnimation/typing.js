import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack
} from "@wordpress/components";
import '../../../../src/index';

function Typing() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={25}>
        <tatva-text-animation
          animation-type="typing"
          words='["Hello Lubus", "Welcome to Tatva"]' />
      </Heading>
    </VStack>
  );
}

// @meta-start
Typing.meta = {
  title: 'Typing',
  name: 'Typing',
  category: 'TextAnimation',
  path: '/TextAnimation/typing',
};
// @meta-end

export default Typing;