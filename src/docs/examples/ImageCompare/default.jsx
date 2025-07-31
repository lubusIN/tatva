function Default() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/after.png"
        after="assets/before.png"
      />
      {/* @code-end */}
    </div>
  );
}

Default.meta = {
  title: 'Default',
  name: 'Default',
  category: 'ImageCompare',
  path: '/ImageCompare/default',
};

export default Default;