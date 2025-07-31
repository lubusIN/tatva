function Arrow() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/before.png"
        after="assets/after.png"
        handle="arrow"
      />
      {/* @code-end */}
    </div>
  );
}

Arrow.meta = {
  title: 'Arrow Handle',
  name: 'Arrow',
  category: 'ImageCompare',
  path: '/ImageCompare/arrow',
};

export default Arrow;