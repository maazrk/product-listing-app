import React, { useState, useEffect } from 'react';
import Product from './Product';
import FilterAttribute from './FilterAttribute';
import Compare from './Compare';
import productData from '../product_data.json'
function ProductView() {
  const [productStates, setProductStates] = useState(Array(productData.length).fill(false))
  const [attributesList] = useState(Object.keys(productData[0]).filter(e => !["id", "name", "image"].includes(e)))
  const [searchAttributes, setSearchAttributes] = useState(attributesList || []);
  const [attributeStates, setAttributeStates] = useState({});
  const [compareTable, setCompareTable] = useState([]);
  const [selectedCount, setSelectedCount] = useState(2);
  const [showFilter, toggleFilter] = useState(false);
  useEffect(() => {
    if (attributesList) {
      let obj = {};
      for (let i = 0; i < attributesList.length; i++) {
        obj[attributesList[i]] = true;
      }

      setAttributeStates(obj);
    }
    
  }, [attributesList])

  useEffect(() => {


    createComparison();
  }, [productStates, attributeStates])

  const handleSelection = (id) => {
    let selectLimit = 11;
    let index = parseInt(id) - 1
    for (let i = 0; i < productStates.length; i++) {
      if (productStates[i] == true) {
        selectLimit--;
        if (selectLimit == 0 && productStates[index] == false) {
          return;
        }
      }
    }
    let newState = productStates.slice();
    newState[index] = !newState[index];
    setProductStates(newState);
    let count = selectedCount;
    if (newState[index])  {
      count++;
    }
    else {
      count--;
    }
    setSelectedCount(count);
  }
  
  const createProducts = props => {
    let products = []

    // Outer loop to create parent
    for (let i = 0; i < productData.length; i++) {
      products.push(<Product key={productData[i].id} productData={productData[i]} selected={productStates[i]} clickHandler={handleSelection}/>)
    }
    return products
  };

  const listAttributes = props => {
    let attributeElements = []

    // Outer loop to create parent
    for (let i = 0; i < searchAttributes.length; i++) {
      attributeElements.push(<div key={i} className="Attribute-Box flex items-center ">
      <input type="checkbox" className="form-checkbox mx-8 my-2 p-2" name={searchAttributes[i]} checked={attributeStates[searchAttributes[i]] ? true : false} onChange={e => {handleAttributeChange(e)}}/>
      <p className="Attribute-Name text-sm capitalize">{searchAttributes[i]}</p>
      </div>)
    }
    return attributeElements;
  };

  const handleSearchInput = props => {
    let searchInput =  props.toLowerCase();
    let newList = [];
    console.log(searchInput.length)
    if (searchInput.length > 0) {
      for (let i = 0; i < attributesList.length; i++) {
        if (attributesList[i].includes(searchInput)) {
          newList.push(attributesList[i])
        }
      }
    }
    else {
      newList = Object.keys(productData[0]).filter(e => !["id", "name", "image"].includes(e))
    }

    setSearchAttributes(newList);
  };

  const createComparison = props => {
    let table = [];
    let attributes = [];
    let activeAttributes = [];
    for (let i = 0; i < attributesList.length; i++) {
      if (attributeStates[attributesList[i]]) {
        activeAttributes.push(attributesList[i]);
      }
    }

    attributes.push(<div key={"Name"} className="p-4 border-b border-solid border-gray-300 text-white">NAME</div>)
    for (let i = 0; i < activeAttributes.length; i ++) {
      attributes.push(<div key={i} className="p-4 bg-gray-100 border-b border-solid border-gray-300"> {activeAttributes[i]} </div>)
    }
    table.push(<div key={"Headers"} className="bg-white capitalize">{attributes}</div>)

    let products = [];
    for (let i = 0; i < productStates.length; i++) {
      if (productStates[i]) {
        let attribute = [];
        attribute.push(<div className="p-4 border-b border-solid border-gray-300"> {productData[i].name} </div>);
        for (let j = 0; j < activeAttributes.length; j++) {
          let attributeValue = productData[i][activeAttributes[j]]
          if (activeAttributes[j] === "colors") {
            let colors = [];
            for (let k = 0; k < attributeValue.length; k ++) {
              colors.push(<div className={`rounded-full h-4 w-4 m-1 bg-${attributeValue[k]}-500`}> </div>)
            }
            attribute.push(<div className="p-4 mx-auto border-b border-solid border-gray-300"> <div className= "flex justify-center">{colors} </div> </div>)
          }
          else if (activeAttributes[j] === "condition") {
            let color = attributeValue === "Fresh" ? "bg-green-500" : "bg-red-500";
            attribute.push(<div className={`p-4 text-white border-b border-solid border-gray-300 ${color}`}> {attributeValue} </div>)
          }
          else if (activeAttributes[j] === "vendors") {
            attribute.push(<div className=" p-4 border-b border-solid border-gray-300 w-full"> {attributeValue.join(", ")} </div>)
          }
          else {
            attribute.push(<div className="p-4 border-b border-solid border-gray-300"> {attributeValue} </div>)
          }
        }
        products.push(<div className="bg-white text-center ">{attribute}</div>);
      }
    }
    table.push(...products);
    setCompareTable(table);
  }

  const toggleAllAttributes = props => {
    let state = props.target.checked;

    let newState = {...attributeStates};
    const keys = Object.keys(attributeStates);
    for (let i=0; i < keys.length; i++) {
      newState[keys[i]] = state;
    }
    setAttributeStates(newState);

  }
  
  const handleAttributeChange = props => {
    const name = props.target.name;

    let newState = {...attributeStates};
    const keys = Object.keys(attributeStates);
    newState[name] = !newState[name];
    setAttributeStates(newState);
  }

  
  return (
      <div className="container mx-auto">
        <header className="flex justify-between">
          <h2 className="p-4 text-xl lg:text-2xl">Compare Products</h2>
          <button className="bg-white flex justify-between items-center px-2 py-1 rounded m-2 border border-solid font-bold mx-4" onClick={()=> toggleFilter(!showFilter)}>
            <svg class="h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg> 
            <p className="text-sm">Edit Attributes</p>
          </button>
        </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      { createProducts() }
      </div>
      {compareTable.length > 1 && (
        <Compare compareTable={compareTable} selectedCount={selectedCount}/>
      )}
      {showFilter && (
      <FilterAttribute listAttributes={listAttributes} handleSearchInput={handleSearchInput} toggleFilter={toggleFilter} toggleAllAttributes={toggleAllAttributes}/>
    )}</div>
  );
}

export default ProductView;