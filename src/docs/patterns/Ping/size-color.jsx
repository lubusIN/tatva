import { __experimentalVStack as VStack } from "@wordpress/components";

function SizeColor() {
  return (
    <VStack
      align="center"
      style={{
        height: '100%',
        justifyContent: 'center',
      }}>
      {/* @code-start */}
      <tatva-ping 
        color="#3858e9" 
        size="1.2rem" 
      />
      {/* @code-end */}
    </VStack>
  );
}

SizeColor.meta = {
  title: 'Size + Color',
  name: 'SizeColor',
  category: 'Ping',
  path: '/Ping/size-color',
};

export default SizeColor;