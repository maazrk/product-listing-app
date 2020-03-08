import  React from 'react';
import '../assets/stylesheets/Product.css'
function Product(props) {
  let bgOpacity = props.selected ? "opacity-50" : "opacity-0"
  return (
    <div className="Handle-Hover mx-4 bg-white shadow-sm text-grey-500 transition duration-500 hover:shadow-lg" onClick={() => props.clickHandler(props.productData.id)}>
      <div className="py-12 relative">
        <img className="h-48 p-6 block mx-auto" src={require('../assets/' + props.productData.image) }/>
        <div className={`Image absolute inset-0 bg-green-500 ${bgOpacity} transition duration-500 hover:opacity-50`}></div>
        <div className="Absolute-Center w-32 text-center bg-white text-green-500 transition duration-500 text-white font-bold py-2 px-4 absolute"> { props.selected ? "REMOVE" : "COMPARE" }</div>
      </div>

      <div className="p-4">
        <div className="flex justify-between">
          <span className="Name"> {props.productData.name} </span>
          <span className="text-green-500 font-bold"> {props.productData.price} </span>
        </div>
        <span className="Description"> {props.productData.description} </span>
      </div>
    </div>
  );
}

export default Product;