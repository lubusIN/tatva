function Rectangle() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/before.png"
        after="assets/after.png"
        handle="rectangle"
      />
      {/* @code-end */}
    </div>
  );
}

Rectangle.meta = {
  title: 'Rectangle Handle',
  name: 'Rectangle',
  category: 'ImageCompare',
  path: '/ImageCompare/rectangle',
};

export default Rectangle;