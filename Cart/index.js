import { useSelector } from 'react-redux'

import { EmptyCart } from './EmptyCart'
import { CartItems } from './CartItems'
import CommonLayout from '../../layouts/commonLayout/CommonLayout'
import './styles.scss'

function Cart() {
  const cartList = useSelector((state) => state.CART_ITEM.value)

  return (
    <CommonLayout>
      <section className="cart-page">
        <div className="cart-page-container">
          {cartList.length === 0 ? <EmptyCart /> : <CartItems />}
        </div>
      </section>
    </CommonLayout>
  )
}

export default Cart
