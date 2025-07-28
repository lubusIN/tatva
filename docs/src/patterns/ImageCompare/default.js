import '../../../../src/index';

function Default() {
  return (
    <div >
    <tatva-image-compare
        class="tatva-responsive-compare"
        before="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-4.jpg"
        after="https://d-themes.com/wordpress/udesign/elements/wp-content/uploads/sites/3/2021/08/comparison-3.jpg"
      ></tatva-image-compare>
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