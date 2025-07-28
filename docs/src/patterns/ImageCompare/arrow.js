import '../../../../src/index';

function Arrow() {
  return (
    <div>
      <tatva-image-compare
        class="w-[400px]"
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
        handle="arrow"
      ></tatva-image-compare>
    </div>
  );
}

// @meta-start
Arrow.meta = {
  title: 'Arrow',
  name: 'Arrow',
  category: 'ImageCompare',
  path: '/ImageCompare/arrow',
};
// @meta-end

export default Arrow;