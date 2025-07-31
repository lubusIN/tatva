function Hover() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/before.png"
        after="assets/after.png"
        handle="arrow"
        hover="true"
      />
      {/* @code-end */}
    </div>
  );
}

Hover.meta = {
  title: 'Hover Handle',
  name: 'Hover',
  category: 'ImageCompare',
  path: '/ImageCompare/hover',
};

export default Hover;