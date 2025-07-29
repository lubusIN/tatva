import '../../../../src/index';

function Arrow() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
        handle="arrow"
      ></tatva-image-compare>
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