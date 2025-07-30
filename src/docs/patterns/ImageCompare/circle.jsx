function Circle() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
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