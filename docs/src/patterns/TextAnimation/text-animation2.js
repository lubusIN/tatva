import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack
} from "@wordpress/components";
import '../../../../src/index';

function TextAnimation2() {
  return (
    <VStack
      align="center"
      style={{
        height: '100vh',
        justifyContent: 'center',
      }}>
      <Heading size={25}>
        <tatva-text-animation
          animation-type="flyin"
          words="Hello Lubus !" />
      </Heading>
    </VStack>
  );
}

// @meta-start
TextAnimation2.meta = {
  title: 'Flyin',
  name: 'TextAnimation2',
  category: 'TextAnimation',
  path: '/TextAnimation/text-animation2',
};
// @meta-end

export default TextAnimation2;