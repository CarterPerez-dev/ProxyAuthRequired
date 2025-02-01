// src/components/pages/store/ShopPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopItems, purchaseItem } from './shopSlice';
import './ShopPage.css';

function ShopPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.shop);
  const { coins } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchShopItems());
  }, [dispatch]);

  const handlePurchase = (itemId) => {
    dispatch(purchaseItem({ itemId, userId: localStorage.getItem('userId') }))
      .unwrap()
      .then((purchasedItem) => {
        alert(`You bought: ${purchasedItem.name}!`);
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (status === 'loading') return <p>Loading shop items...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="shop-container">
      <h1>Shop</h1>
      <p>Your coins: {coins}</p>
      <div className="shop-items">
        {items.map(item => (
          <div key={item._id} className="shop-item">
            <h3>{item.name}</h3>
            <p>Cost: {item.cost}</p>
            <p className="shop-description">{item.description}</p>
            <button onClick={() => handlePurchase(item._id)}>
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;

