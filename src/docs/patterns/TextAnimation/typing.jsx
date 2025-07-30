import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack
} from "@wordpress/components";
import '../../../elements';

function Typing() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={25}>
        {/* @code-start */}
        <tatva-text-animation
          animation-type="typing"
          words='[
            "Hello Lubus", 
            "Welcome to Tatva"
          ]'
        />
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

Typing.meta = {
  title: 'Typing',
  name: 'Typing',
  category: 'TextAnimation',
  path: '/TextAnimation/typing',
};

export default Typing;