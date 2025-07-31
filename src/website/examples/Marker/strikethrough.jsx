import {
  __experimentalHeading as Heading,
  __experimentalVStack as VStack,
} from "@wordpress/components";
function Strikethrough() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      <Heading size={'45px'} align="center">
        {/* @code-start */}
        <tatva-marker type="strikethrough">
          tatva
        </tatva-marker>
        {/* @code-end */}
      </Heading>
    </VStack>

  );
}

Strikethrough.meta = {
  title: 'Strikethrough',
  name: 'Strikethrough',
  category: 'Marker',
  path: '/Marker/strikethrough',
};

export default Strikethrough;