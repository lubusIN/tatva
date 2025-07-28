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
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={25}>
        {/* @code-start */}
        <tatva-text-animation
          animation-type="flyin"
          words="Hello Lubus !" />
        {/* @code-end */}
      </Heading>
    </VStack>
  );
}

Flyin.meta = {
  title: 'Flyin',
  name: 'Flyin',
  category: 'TextAnimation',
  path: '/TextAnimation/flyin',
};

export default Flyin;