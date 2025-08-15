function Custom() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        handle="arrow"
        hover="true"
      >
        <svg slot="arrow-left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
        </svg>
        <svg slot="arrow-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
      </tatva-image-compare>
      {/* @code-end */}
    </div>
  );
}

Custom.meta = {
  title: 'Custom Handle',
  name: 'Custom',
  category: 'ImageCompare',
  path: '/ImageCompare/custom',
};

export default Custom;