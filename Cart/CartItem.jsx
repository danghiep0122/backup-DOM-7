import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState } from 'react'

import addONItem from '../../data/addOnItem.json'
import CartSuggestion from './CartSuggestion'
import {
  onPlus,
  onMinus,
  onRemove,
  onCheckOut,
} from '../../feature/cartItem/cartItemSlice'
import { XtimesIcon } from '../../icons/Icons'
import { formatVND } from '../../ultilities/format'

export function CartItems() {
  const [popupMessage, setPopupMessage] = useState(false)

  const cartList = useRef()

  const handlePlusItem = () => {
    setPopupMessage(true)
    setTimeout(() => {
      setPopupMessage(false)
    }, 2000)
  }

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.CART_ITEM.value)
  const itemsPrice = cartItems.reduce(
    (a, b) => (a = a + b.qty * b.priceSelected),
    0
  )
  const taxPrice = Math.floor(itemsPrice * 0.1)
  const totalPrice = itemsPrice + taxPrice

  return (
    <div className="cart-page-wrapper">
      {popupMessage && (
        <div className="success-popup-message">✅ Add to cart successfully</div>
      )}
      <div ref={cartList} className="cart-message">
        <h4>Your Cart</h4>
        <h4>{cartItems.length} items</h4>
      </div>
      <ul className="cart-wrapper">
        {cartItems.map((item) => {
          const itemPrice = item.priceSelected * item.qty
          return (
            <li key={item.id} className="cart-item">
              <div
                onClick={() => dispatch(onRemove(item))}
                className="delete-cart-btn-mobile"
              >
                <XtimesIcon height="17px" width="17px" />
              </div>
              <div className="cart-item-mobile">
                <div className="cart-item-image-wrapper">
                  <img src={item.imgUrl} alt="cart-item-img"></img>
                </div>
                <div className="cart-item-description">
                  <h3>{item.title}</h3>
                  <p> {item.size}</p>
                  <p> {item.baseThickness}</p>
                  <div className="adjust-delete-btn-wrapper">
                    <button onClick={() => alert('developing')}>Adjust</button>
                    <button onClick={() => dispatch(onRemove(item))}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="cart-item-price-quantity">
                <div className="cart-item-price-wrapper">
                  <h3>{formatVND(itemPrice)}</h3>
                  <div className="cart-item-group-quantity">
                    <button
                      className={item.qty === 1 ? 'disable' : 0}
                      onClick={() => dispatch(onMinus(item))}
                    >
                      --
                    </button>
                    <input
                      type="text"
                      value={item.qty}
                      readOnly
                      className="cart-item-input"
                    />
                    <button onClick={() => dispatch(onPlus(item))}>+</button>
                  </div>
                </div>
                {item.promotion && (
                  <div className="cart-item-promotion">
                    <p>Buy as Promotion</p>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <section className="checkout-wrapper">
        <div className="checkout-body">
          <div className="checkout-promotion-code-wrapper">
            <input placeholder="Enter promotion code" />
            <button>Apply</button>
          </div>
          <div className="checkout-total-fixed">
            <div className="checkout-total-row">
              <p>Total</p>
              <span>{formatVND(totalPrice)}</span>
            </div>
            <div className="checkout-discount-row">
              <p>Discount Promotion</p>
              <span>{formatVND(taxPrice)}</span>
            </div>
            <div className="checkout-discount-row">
              <p>Discount Voucher</p>
              <span>{formatVND(0)}</span>
            </div>
            <div className="checkout-shipping-fee-row">
              <p>Shipping Fee</p>
              <span>{formatVND(0)}</span>
            </div>
            <button
              onClick={() => dispatch(onCheckOut())}
              className="checkout-btn"
            >
              <span style={{ marginRight: '.8rem' }}>Check out</span>
              <span>{formatVND(totalPrice)}</span>
            </button>
          </div>
        </div>
      </section>
      <section className="more-item">
        <h4>Maybe you will like this</h4>
        <div>
          <CartSuggestion
            handlePlusItem={handlePlusItem}
            cartList={cartList}
            product={addONItem}
          />
        </div>
      </section>
    </div>
  )
}
