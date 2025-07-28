import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack
} from "@wordpress/components";
import '../../../../src/index';

function Flyin() {
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
Flyin.meta = {
  title: 'Flyin',
  name: 'Flyin',
  category: 'TextAnimation',
  path: '/TextAnimation/flyin',
};
// @meta-end

export default Flyin;