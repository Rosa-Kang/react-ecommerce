import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  
  //cart state
  const [cart, setCart] = useState([]);

  //amount(quantity) state
  const [itemAmount, setItemAmount] = useState(0);

  //price state
  const [total, setTotal] = useState(0);

  //update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, curr) => {
        return acc + curr.amount
      }, 0);
      setItemAmount(amount);
    }
    
  }, [cart])

  //update total price
  useEffect(() => {
    if (cart) {
      const price = cart.reduce((acc, curr) => {
        return acc + curr.price * curr.amount
      }, 0);
      setTotal(price);
    }
  })

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item.id === id;
    })

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  }

  const clearCart = () => {
    setCart([]);
  }

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  }

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 }
        } else {
          return item;
        }
      });
      setCart(newCart);
    } 
    
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  }

  return <CartContext.Provider
    value={{
      addToCart,
      cart,
      removeFromCart,
      clearCart,
      increaseAmount, 
      decreaseAmount,
      itemAmount,
      total
  }}>{children}</CartContext.Provider>;
};

export default CartProvider;
