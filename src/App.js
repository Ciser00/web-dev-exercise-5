import React, {useEffect, useState} from "react"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import './App.css';
//page imports
import Login from "./pages/Login";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import UserProfile from "./pages/UserProfile";
import FirebaseConfig from "./components/FirebaseConfig"

function App() {

  //track if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  //check to see if loading
  const [loading, setLoading] = useState(true);
  //store user info in state
  const [userInformation, setUserInformation] = useState({});
  const [appInitialized, setAppInitialized] = useState(false);

  //Ensure app us ubutuakuzed wgeb ut us ready to be
  useEffect(() => {
    //initialize firebaseapp
    initializeApp(FirebaseConfig);
    setAppInitialized(true);
  }, []);

  // check to see if user is logged in
  //user loads page, check status
  //set state acordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user){
          //user is signed
          setUserInformation(user);
          setLoggedIn(true);
        }else{
          //user is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
      });
      setLoading(false);
    }
  }, [appInitialized]);

  function logout(){
    const auth = getAuth();
    signOut(auth).then(() =>{
      setUserInformation({});
      setLoggedIn(false);
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  if (loading) return null;
  return(
    <>
      <Header logout={logout} loggedIn={loggedIn}/>
      <Router>
        <Routes>
          <Route
            path="/user/:id"
            element={loggedIn ? <UserProfile userInformation={userInformation}/> : <Navigate to="/" />}
          />
          <Route
            path="/create"
            loggedIn
            element={
              !loggedIn ? (
                <CreateUser
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/:${userInformation.uid}`} />
              )
            }
          />
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to={`/user/:${userInformation.uid}`} />
              )
            }
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;
