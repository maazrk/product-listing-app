import  React from 'react';
function Compare(props) {
  return (
    <div className={`md-5 grid grid-cols-${Math.max(3, props.selectedCount - 1)} m-4 shadow-md`}>
      { props.compareTable }
    </div>
  );
}

export default Compare;