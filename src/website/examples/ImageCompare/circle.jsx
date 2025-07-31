function Circle() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/before.png"
        after="assets/after.png"
        handle="circle"
      />
      {/* @code-end */}
    </div>
  );
}

Circle.meta = {
  title: 'Circle Handle',
  name: 'Circle',
  category: 'ImageCompare',
  path: '/ImageCompare/circle',
};

export default Circle;