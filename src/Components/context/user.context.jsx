import {createContext,useState,useEffect} from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../../firebase/firebase.utils'

//as the actual value u want to access
export const UserContext=createContext({
currentUser:null,
setCurrentUser:()=>null

})

export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null)
    const value={currentUser,setCurrentUser}
    useEffect(()=>{
        //when ever the auth state change i want to log the user
        const unsubcribe=onAuthStateChangedListener((user)=>{
            // console.log(user)
            if(user){
                 createUserDocumentFromAuth(user)
            }
            
setCurrentUser(user) //if user logout it will called and set the user to be null and if some one login it will set user some value


        }) 
        return unsubcribe  
       },[])
return <UserContext.Provider value={value}>{
        children
    }</UserContext.Provider>
}