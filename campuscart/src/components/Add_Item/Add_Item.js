import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Add_Item.css';
import axios from 'axios';

function AddItem() {
  console.log ("rendered")
  var ud = JSON.parse(localStorage.getItem('userData'))
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);
  const [reviewlist, setReviewList] = useState(null)
  
  useEffect(() => {
    const handleSubmit = async () => {
      var ud = JSON.parse(localStorage.getItem('userData'))
      const link = 'http://127.0.0.1:5000/order-history/' + ud.userid.toString();
      await axios.post(link, {  })
        .then(response => {
          console.log(response.data)
          setOrderHistory(response.data.order_history);
        })
        .catch(error => {
          setError(error);
        });
    }
    handleSubmit();
  }, []);

  useEffect(() => {
    const handleSubmit1 = async () => {
      var ud = JSON.parse(localStorage.getItem('userData'))
      const link = 'http://127.0.0.1:5000/user-reviews/' + ud.userid.toString();
      await axios.post(link, {  })
        .then(response => {
          console.log(response.data)
          setReviewList(response.data.user_reviews);
        })
        .catch(error => {
          setError(error);
        });
    }
    handleSubmit1();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    var sellerid = JSON.parse(localStorage.getItem('userData')).userid
    await axios.post('http://127.0.0.1:5000/add_product', { productName, description, price , sellerid})
      .then(response => { 
        console.log(response.data);
        
      })
      .catch(error => {
        setError(error);
      });
  }

    
  const RatingInput = ({ product_id }) => {
    const [review, setReview] = useState('')
    const [reviewVal, setReviewVal] = useState(null)

    const handleRatingChange = async event => {
      event.preventDefault();
      var ud = JSON.parse(localStorage.getItem('userData'))
      var user_id = ud['userid']
      await axios.post('http://127.0.0.1:5000/rate_review', { user_id, product_id, reviewVal, review })
      .then(response => {
      })
      .catch(error => {
        setError(error);
      });
    };

    return (<>
      <select value = {reviewVal} onChange={(e) => setReviewVal(e.target.value)}>
        <option value="">--</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
       <textarea className="form-control" id="description" key = 'review' name = 'review_description'  onChange={(e) => setReview(e.target.value)}></textarea>
       <button type='submit' onClick={handleRatingChange}>Submit Review</button>
       </>
    );
  };

  if (ud.role === 'Buyer'){
  return (
    <div className="container">
      <h1 className = 'mainh1'>Profile</h1>
      <h2 className='mainh2'>Order History</h2>
      <div className='table'>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Date Ordered</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
        {orderHistory && orderHistory.map(order => (
            <tr>
              <td>{order.product_name}</td>
              <td>{order.order_date}</td>
              <td>
                <RatingInput
                  value={order.rating}
                  product_id={order.productid}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          
      </div>
    </div>
  );}
  else{return(<div className='container'>
  <h1 className = 'mainh1'>Profile</h1>
      <h2 className='mainh2'>Order History</h2>
      <div className='table'>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Date Ordered</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
        {orderHistory && orderHistory.map(order => (
            <tr>
              <td>{order.product_name}</td>
              <td>{order.order_date}</td>
              <td>
                <RatingInput
                  value={order.rating}
                  product_id={order.productid}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          
      </div>
    <h2 className='mainh2'>Add Item</h2>
    <form onSubmit={handleSubmit} className='inp'>
      <div className="form-group">
        <label htmlFor="productName" className='lab'>Product Name</label>
        <input type="text" key = 'name'  className="form-control tex" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)}  name= 'product_name' required />
      </div>
      <div className="form-group">
        <label htmlFor="description" className='lab'>Description</label>
        <textarea className="form-control" key = 'desc' id="description" value={description} onChange={(e) => setDescription(e.target.value)} required name = 'product_description'></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="price" className='lab'>Price</label>
        <input type="number" className="form-control" key = 'pri' id="price" value={price} onChange={(e) => setPrice(e.target.value)} required  name = 'product_price'/>
      </div>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>

    <h2 className='mainh2'>See Reviews</h2>
    <div className='review_man table'>
    <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Comment</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
    {reviewlist && reviewlist.map(order => (
        <tr>
          <td>{order.product_name}</td>
          <td>{order.comment}</td>
          <td>{order.rating}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
    </div>);
  }
}

export default AddItem;
