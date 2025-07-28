import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack
} from "@wordpress/components";
import '../../../../src/index';

function TextAnimation1() {
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
TextAnimation1.meta = {
  title: 'Typing',
  name: 'TextAnimation1',
  category: 'TextAnimation',
  path: '/TextAnimation/text-animation1',
};
// @meta-end

export default TextAnimation1;