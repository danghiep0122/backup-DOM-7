import { useDispatch } from 'react-redux'

import Slider, { RecommendPrdct } from './RecommendPrdct'
import './styles.scss'
import { onPlus } from '../../../feature/cartItem/cartItemSlice'
import { formatVND } from '../../../ultilities/format'

function CartSuggestion({ product, cartList, handlePlusItem }) {
  const dispatch = useDispatch()

  const handleClick = (item) => {
    cartList.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    dispatch(onPlus(item))
    handlePlusItem()
  }

  return (
    <ul className="cart-sugg-wrapper">
      <Slider>
        {product.map((item) => {
          return (
            <RecommendPrdct key={item.id}>
              <li className="cart-sugg-item">
                <div className="cart-sugg-picture-wrapper">
                  <img alt="product-suggestion-img" src={item.imgUrl} />
                </div>
                <div className="cart-sugg-description">
                  <h3>{item.title}</h3>
                  <div className="cart-sugg-price-and-btn-wrapper">
                    <p>{formatVND(item.priceSelected)}</p>
                    <button value={item.id} onClick={() => handleClick(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            </RecommendPrdct>
          )
        })}
      </Slider>
    </ul>
  )
}

export default CartSuggestion
