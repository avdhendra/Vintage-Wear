
import {Routes,Route} from "react-router-dom"
import Header from "./Components/navigation/Header";
import Authentication from "./Components/auth/authetication.component";
import Home from "./Routes/home/home.component";
import Shop from "./shop/shop.component";
import CheckOut from "./Components/checkout/checkout.component";
import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./firebase/firebase.utils";
import { useDispatch } from "react-redux";

import { setUser } from "./Slice/userSlice";




function App() {
  const dispatch=useDispatch()
  
 
   useEffect(() => {
    //when ever the auth state change i want to log the user
    const unsubcribe = onAuthStateChangedListener((user) => {
      // console.log(user)
      if (user) {
        createUserDocumentFromAuth(user);
      }

       dispatch(setUser(user)) //if user logout it will called and set the user to be null and if some one login it will set user some value
    });
    return unsubcribe;
  }, [dispatch]);
  return (
    <Routes>
    <Route path='/' element={<Header/>}>
    <Route index element={<Home/>}/>
    <Route path='shop/*' element={<Shop/>}/>
    <Route path="auth" element={<Authentication/>}/>
    <Route path='checkout' element={<CheckOut/>}/>

    </Route>
    </Routes>
  );
}

export default App;

//Redux Persist library  is to store the state in local storage of browser so that if we refresh it stay in browser
