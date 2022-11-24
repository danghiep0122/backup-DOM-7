import './styles.scss'
import { formatVND } from '../../../ultilities/format'
import PizzaModal from '../PizzaModal'
import { useState } from 'react'

const ItemCard = (data) => {
  const [itemClick, setItemClick] = useState([])
  const [onPizzaModal, setOnPizzaModal] = useState(false)

  const handleClick = (item) => {
    setOnPizzaModal(true)
    setItemClick(item)
  }
  return (
    <div className="product-items-wrap">
      {onPizzaModal && (
        <PizzaModal toggleModal={setOnPizzaModal} data={itemClick} />
      )}
      {data.data.map((item) => (
        <div key={item.id} className="product-item">
          <div className="product-img-wrap">
            <img
              onClick={() => handleClick(item)}
              loading="auto"
              src={item.imgUrl}
              alt={item.title}
              className="product-img"
            />
          </div>
          <div className="product-info-wrap">
            <div className="product-title">
              <div className="product-title-ellipsis">
                <p onClick={() => handleClick(item)} className="product-name">
                  {item.title}
                </p>
              </div>
            </div>
            <div className="product-price">
              {formatVND(item.price7 || item.price9)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ItemCard
