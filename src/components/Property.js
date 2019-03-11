import React from 'react';

const Property = ({ data, formatCamelCase }) => {
  let displayData = data;

  const allLis = [];

  for (let key in displayData){
    allLis.push(<li key={key}>{formatCamelCase(key)}: {data[key]}</li>)
  }

  return (
    <ul>
    {allLis}
    </ul>
  )
};

export default Property;
