import allPizza from '../../../data/allPizza.json'
import ItemCard from '../ItemCard'
import './styles.scss'

function Promotion() {
  const randomPizza = () =>
    [...allPizza].sort(() => 0.5 - Math.random()).slice(0, 4)

  let data = randomPizza()
  return (
    <div className="all-products-wrap">
      <div className="all-promotions-title">
        <h2>What's new today?</h2>
        <div className="promotions-tab">
          <h4 className="promotion-title">Daily Promotion</h4>
          <h4 className="promotion-title active">Best Sellers</h4>
        </div>
      </div>
      <div className="all-item-card">
        <ItemCard data={data} />
      </div>
      <div className="see-more-btn-wrapper">
        <button onClick={() => alert('Developing')} className="see-more-btn">
          See More
        </button>
      </div>
    </div>
  )
}

export default Promotion


// layouts > components > Promotion > index.js
