import '../../../../src/index';

function Circle() {
  return (
    <div>
      <tatva-image-compare
        class="w-[400px]"
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
        handle="circle"
      ></tatva-image-compare>
    </div>
  );
}

// @meta-start
Circle.meta = {
  title: 'Circle',
  name: 'Circle',
  category: 'ImageCompare',
  path: '/ImageCompare/circle',
};
// @meta-end

export default Circle;