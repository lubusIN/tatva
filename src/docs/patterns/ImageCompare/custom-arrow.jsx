function CustomArrow() {
  return (
    <div>
      {/* @code-start */}
      <tatva-image-compare
        before="assets/before.png"
        after="assets/after.png"
        handle="arrow"
        hover="true"
        arrowLeft='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>' 
        arrowRight='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"  
                    </svg>' 
       />
      {/* @code-end */}
    </div>
  );
}

CustomArrow.meta = {
  title: 'Custom Arrow Handle',
  name: 'CustomArrow',
  category: 'ImageCompare',
  path: '/ImageCompare/custom-arrow',
};

export default CustomArrow;