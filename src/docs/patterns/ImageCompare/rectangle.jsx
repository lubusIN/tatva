function Rectangle() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
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