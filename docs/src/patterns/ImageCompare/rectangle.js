import '../../../../src/index';

function Rectangle() {
  return (
    <div>
      <tatva-image-compare
        class="w-[400px]"
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
        handle="rectangle"
      ></tatva-image-compare>
    </div>
  );
}

// @meta-start
Rectangle.meta = {
  title: 'Rectangle',
  name: 'Rectangle',
  category: 'ImageCompare',
  path: '/ImageCompare/rectangle',
};
// @meta-end

export default Rectangle;