function Default() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/before.png"
        after="assets/after.png"
      />
      {/* @code-end */}
    </div>
  );
}

Default.meta = {
  title: 'Default Handle',
  name: 'Default',
  category: 'ImageCompare',
  path: '/ImageCompare/default',
};

export default Default;