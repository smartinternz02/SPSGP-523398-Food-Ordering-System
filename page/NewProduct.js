import React, { useState } from 'react';
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from './Utility/ImagetoBase64';
const NewProduct = () => {
  const [data,setData] = useState({
    name:"",
    category : "",
    image :"",
    price : "",
    description :"",
    
  } )
  const [responseMessage, setResponseMessage] = useState("");

  const handleonChange =(e) => {
    const {name,value} =e.target
    setData((prev)=>({
        ...prev,
        [name] :value
      }
    ));
  };

  const uploadImage = async (e) => {
  
    //console.log(data)
    setData((preve)=>{
      return{
        ...preve,
        image : e.target.files[0]
      }
    })  
   }

   const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    console.log(data);
    const requestBody = {
      name: data.name,
      description: data.description,
      category: data.category,
      image: await convertImageToBase64(data.image), // Convert image to Base64 string
      price: data.price
    };

    const url = 'http://localhost:8080/foodOrdering/food/addNewFoodProduct'; // Replace with your API endpoint URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      

      if (response.ok) {
        console.log('Product adding successful');
        const responseData = await response.text();
        setResponseMessage(responseData);
        // Handle successful signup if needed
      } else {
        console.log('Product adding failed');
        setResponseMessage("Product adding failed");
        // Handle failed signup if needed
      }
    } catch (error) {
      console.log('Error:', error);
      // Handle any network or fetch API errors
    }
  }


 
  return (
    <div className='p-4 '>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' className='bg-slate-200 p-1 my-1' onChange={handleonChange} value={data.name}/>
        <label htmlFor='Category'>Category</label>   
        <select className='bg-slate-200 p-1 my-1' id='Category' name='category' onChange={handleonChange} value={data.category}>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Ice Cream</option>
          <option>Dosa</option>
          <option>Pizza</option>
          <option>rice</option>
          <option>Cake</option>
          <option>Burger</option>
          <option>Panner</option>
          <option>Sandwich</option>
        </select>
        <label htmlFor='image'>Image
         <div className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer ' >
          {
            data.image ? <img src={data.image}  className='h-full' name='image'/> : <span className='text-5xl'><BsCloudUpload /></span>
          }
          
          
          <input type="file"  id='image' onChange={uploadImage} name='image' className='hidden'/>
         </div>
         </label>
         <label htmlFor='Price'className='my-1'>Price</label>
         <input type='text'className='bg-slate-200 p-1 my-1' name='price' onChange={handleonChange} value={data.price}/>
         
         <label htmlFor='Description'>Description</label>
         <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none'name='description' onChange={handleonChange} value={data.description}></textarea>

         <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow my-2' >Save</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}

export default NewProduct;