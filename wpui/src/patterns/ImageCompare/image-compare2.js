import '../../Tatva';

function ImageCompare2() {
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
ImageCompare2.meta = {
  title: 'Circle',
  name: 'ImageCompare2',
  category: 'ImageCompare',
  path: '/ImageCompare/image-compare2',
};
// @meta-end

export default ImageCompare2;