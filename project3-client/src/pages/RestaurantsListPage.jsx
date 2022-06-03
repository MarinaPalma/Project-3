import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RestaurantsListPage() {
  const [restaurants, setRestaurants] = useState([])


const getAllRestaurants = async() => {
  try {
    const getToken = localStorage.getItem("authToken");
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/`,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    setRestaurants(response.data);
    console.log(response.data);

  } catch (error) {
    console.log(error)
  }
};

useEffect(() => {
  getAllRestaurants();
}, []);





  return (

    <div className="ProjectListPage">
    <h1>Restaurants</h1>
   
    {restaurants.map((restaurant) => {
      return (
        <div key={restaurant._id}>
        <img src={restaurant.imageCover} alt="restaurant" />
        <h3>{restaurant.name}</h3>
          <Link to={`/restaurants/${restaurant._id}`}>
            <button type='submit'>See Details</button>
          </Link>
        </div>
      );
    })}
  </div>
);
}





//     <div>
//     <h1>Restaurants</h1>



//     </div>
//   )
// }

export default RestaurantsListPage