import React, { useState, useEffect } from 'react';

const AddedProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:8080/foodOrdering/food/getAllFoodProducts');
      const data = await response.json();

      const updatedProducts = data.map((product) => {
        return { ...product, quantity: 1, initialPrice: product.price };
      });

      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const incrementQuantity = (productId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          const updatedQuantity = product.quantity + 1;
          const updatedPrice = product.initialPrice * updatedQuantity;
          return { ...product, quantity: updatedQuantity, price: updatedPrice };
        }
        return product;
      });
    });
  };

  const decrementQuantity = (productId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          const updatedQuantity = product.quantity - 1;
          const updatedPrice = product.initialPrice * updatedQuantity;
          return { ...product, quantity: updatedQuantity, price: updatedPrice };
        }
        return product;
      });
    });
  };

  const getTotalPrice = () => {
    const totalPrice = products.reduce((total, product) => {
      return total + product.price;
    }, 0);

    return totalPrice;
  };

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className='bg-slate-200 p-2 flex gap-4 rounded border-slate-300'
        >
          <div className='p-3 bg-white rounded overflow-hidden'>
            {product.image.startsWith('http') ? (
              <img
                src={product.image}
                alt={product.name}
                className='w-32 h-32 object-cover'
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className='w-32 h-32 object-cover'
              />
            )}
          </div>
          <div className='flex flex-col justify-between'>
            <div>
              <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>
                {product.name}
              </h3>
              <p className='text-slate-500 font-medium'>{product.category}</p>
              <p className='font-bold text-base'>
                <span className='text-red-500'>₹</span>
                <span>{product.initialPrice * product.quantity}</span>
              </p>
            </div>
            <div className='flex gap-3 items-center'>
              <button
                className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1'
                onClick={() => incrementQuantity(product.id)}
              >
                +
              </button>
              <p className='font-semibold p-1'>{product.quantity}</p>
              <button
                className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1'
                onClick={() => decrementQuantity(product.id)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className='mt-4'>
        <h3 className='font-semibold text-lg'>Total Price:</h3>
        <p className='font-bold text-base'>
          <span className='text-red-500'>₹</span>
          <span>{getTotalPrice()}</span>
        </p>
      </div>
    </div>
  );
};

export default AddedProduct;
