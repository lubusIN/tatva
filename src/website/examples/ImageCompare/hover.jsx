function Hover() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
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