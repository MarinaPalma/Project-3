import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import UpdateComment from "../components/UpdateComment";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

const [showComments, setShowComments] = useState(false)
const [showEdit, setShowEdit] = useState(false)

const toggleShow = () =>{
setShowComments(!showComments)
}

const toggleEdit = () =>{
   
    setShowEdit(!showEdit)
    }


  const getUser = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/profile/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      
      setCurrentUser(response.data);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      setErrorMessage(error.response);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
      <>
      <Navbar/>
    <div>
      {user && (
        <>
          <img src={user.imageProfile} alt="profile" />
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </>
      )}

{user && user.role ==="user" &&(
  <>
    <h3>Favourites</h3>


  {currentUser &&
      currentUser.favourites.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <img src={restaurant.imageCover} alt="restaurant" />
            <h3>{restaurant.name}</h3>
          </div>
        );
      })}

  {currentUser && !currentUser.favourites.length && <p>No favourites yet</p>
      }


    <h3>Reviews</h3>
    <button onClick={toggleShow}>{showComments ? 'Show' : 'Hide'}</button>

    {showComments && currentUser &&
    
      currentUser.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <p>{comment.restaurant}</p>
            <p>{comment.content}</p>
            <button onClick= {toggleEdit}>Edit comment</button>
            {showEdit && <UpdateComment/>}
            <button>Delete comment</button>
          </div>
        );
      })}
      </>
      )}

      {user && user.role ==="admin" &&(
          <>
          <Link to="/restaurants/add"><button type="submit">Add a new Taska</button></Link>
          <Link to="/restaurants/edit/"><button type="submit">Edit a Taska</button></Link>
          </>
      )}


    </div>
    </>
  );
}

export default ProfilePage;



