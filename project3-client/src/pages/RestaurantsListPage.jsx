import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from "../context/auth.context";

function RestaurantsListPage() {
  const { user } = useContext(AuthContext);
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

    <div>
     <Navbar/>
    <h1>Restaurants</h1>
   
    {restaurants.map((restaurant) => {
      return (
        <div key={restaurant._id}>
        <img src={restaurant.imageCover} alt="restaurant" />
        <h3>{restaurant.name}</h3>
          <Link to={`/restaurants/${restaurant._id}`}>
            <button type='submit'>See Details</button>
          </Link>
          {user && user.role ==="admin" &&(      
          <Link to={`/restaurants/edit/${restaurant._id}`}><button type="submit">Edit</button></Link>
          )}
        </div>
      );
    })}
  </div>
);
}




export default RestaurantsListPage