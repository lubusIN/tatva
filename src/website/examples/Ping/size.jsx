import { __experimentalVStack as VStack } from "@wordpress/components";

function Size() {
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

Size.meta = {
  title: 'Size',
  name: 'Size',
  category: 'Ping',
  path: '/Ping/size',
};

export default Size;