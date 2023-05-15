import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Card({ productID, name, description, price}) {

  var ud = JSON.parse(localStorage.getItem('userData'))

  var userId = ud['userid']
  console.log (productID)

  const handleOrder = async event => {
    event.preventDefault();
    await axios.post('http://127.0.0.1:5000/add_order', { userId , productID })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log (error)
      });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title"><Link to = 'https://th.bing.com/th/id/OIP.mvxIbDuSk9lfkmDkHbiMlQAAAA?pid=ImgDet&rs=1' onClick = {handleOrder}>{name}</Link></h2>
        <p className="card-description">{description}</p>
        <p className="card-price">{price}</p>
      </div>
    </div>
  );
}

function CardContainer({ cards }) {
  try {
    console.log(cards.results)
  return (
    <div className="card-container">
      {cards.results.map(card => (
        <Card
          key={card.product_id}
          productID = {card.product_id}
          name={card.name}
          description={card.description}
          price={card.price}
        />
      ))}
    </div>
  );
  }
  catch{
    return(<></>)
  }
}
export default CardContainer;