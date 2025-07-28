import '../../Tatva';

function ImageCompare4() {
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
ImageCompare4.meta = {
  title: 'Arrow',
  name: 'ImageCompare4',
  category: 'ImageCompare',
  path: '/ImageCompare/image-compare4',
};
// @meta-end

export default ImageCompare4;