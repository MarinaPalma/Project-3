import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AddComment from '../components/AddComment';
import UpdateComment from '../components/UpdateComment';
import AddFavouriteBtn from '../components/AddFavouriteBtn';

function RestaurantDetailsPage() {

const [restaurant, setRestaurant] = useState(null)
const {restaurantId} = useParams();


const getRestaurant = async () => {

  try {
    const getToken = localStorage.getItem("authToken");
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    console.log(response.data)
    setRestaurant(response.data);
    

  } catch (error) {
    console.log(error)
  }

  
};

useEffect(() => {
  getRestaurant();
}, []);

  return (
    
    <div>
    <h1>Restaurant details</h1>

    <AddFavouriteBtn restaurantId={restaurantId}/>

  {restaurant && (
<>
  <h2>{restaurant.name}</h2>
  <img src={restaurant.imageCover} alt="" />
  <p>{restaurant.city}</p>
  <p>{restaurant.address}</p>
  <p>{restaurant.contact}</p>
  <p>{restaurant.averagePrice}€</p>

  <Link to="???"><button>Write a review</button></Link>
</>
    )}

    <div style={{"width": "10px"}}>
 {restaurant && (
   restaurant.comments.map((comment)=> {
     return (
      <div width ="10px" key={comment._id}>
              <h3>{comment.author}</h3>
              <p>{comment.createdAt}</p>
              <h4>Description:</h4>
              <p>{comment.content}</p>
  
              <Link to="???"><button>Edit comment</button></Link>
              <Link to="???"><button>Delete comment</button></Link>
      </div>
     )
   })
 )}   

</div>

 <Link to="/restaurants">
        <button>See all Taskas</button>
      </Link>
    
    </div>
  )
}

export default RestaurantDetailsPage