import { useReducer } from 'react'
import {createContext,useEffect} from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../../firebase/firebase.utils'
import { createAction } from '../../utils/reducer_utils/reducer.utils'

//as the actual value u want to access
export const UserContext=createContext({
currentUser:null,
setCurrentUser:()=>null

})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER:'SET_CURRENT_USER',
}
const userReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,currentUser:payload
            }
        default:
            throw new Error(`Unhandled Type ${type} in userReducer`)
    }
}
const INITIAL_STATE = {
    currentUser:null
}

export const UserProvider=({children})=>{
   // const [currentUser,setCurrentUser]=useState(null)
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user))
    }
    
    const value = { currentUser, setCurrentUser }
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