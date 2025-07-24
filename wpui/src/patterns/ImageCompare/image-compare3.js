import '../../Tatva';

function ImageCompare3() {
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
ImageCompare3.meta = {
  title: 'Rectangle',
  name: 'ImageCompare3',
  category: 'ImageCompare',
  path: '/ImageCompare/image-compare3',
};
// @meta-end

export default ImageCompare3;