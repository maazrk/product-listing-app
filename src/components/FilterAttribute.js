import  React, { useState } from 'react';
import '../assets/stylesheets/FilterAttribute.css';
function FilterAttribute(props) {

  return [
      <div className="FilterAttribute w-11/12 lg:w-5/12 rounded bg-white shadow fixed top-0 left-0 z-10 ">
        <h2 className="p-4 border-b border-solid text-lg font-bold">Add/Remove Attributes</h2>
        <input type="text" className="form-input w-11/12 block mx-auto my-4" placeholder="Search Attributes" onInput={ e => {props.handleSearchInput(e.target.value)}}/>
        <div className="Select-All-Box border-b border-solid flex items-center py-2">
          <input className="form-checkbox p-2 inline-block mx-8 my-2 font-bold" type="checkbox" name="Select All" onChange={e => {props.toggleAllAttributes(e)}}/>
          <p className="Select-All-Text text-sm font-bold">Select All</p>
        </div>
        <div className="Attributes-List">
          {props.listAttributes()}
        </div>
        <div className="flex justify-end border-t border-solid">
          <button className=" px-4 py-2 rounded bg-blue-500 m-2 text-white bold-text" onClick={()=> props.toggleFilter((filter) => !filter)}>Close</button>
        </div>
    </div>,
    <div className="bg-black fixed inset-0 opacity-75 overflow-hidden"> </div>

  ]
}

export default FilterAttribute;