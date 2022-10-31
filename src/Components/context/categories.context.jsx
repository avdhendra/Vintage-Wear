import { useState } from 'react'
import { useEffect } from 'react'
import {createContext} from 'react'
import {  getCategoriesAndDocuments } from '../../firebase/firebase.utils.jsx'
// import SHOP_DATA from '../../shop-data.js'

import DirectoryJSON from "../../DirectoryJSON";
import {
  addCollectionAndDocument,
  getDirectoryDocument,
} from "../../firebase/firebase.utils";

export const CategoriesContext=createContext({
    categoriesMap: {},
    directories:{}

})

export const CategoriesProvider=({children})=>{
    const [categoriesMap, setcategoriesMap] = useState({})
   const [directories, setDirectoryItem] = useState({});
  
    useEffect(() => {
     //  addCollectionAndDocument('categories',SHOP_DATA)
        
         addCollectionAndDocument("directory", DirectoryJSON);
        
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            console.log(categoryMap)
            setcategoriesMap(categoryMap)
        }

        const getDirectoryMap = async () => {
             const directoryMap = await getDirectoryDocument();
              console.log('zer',directoryMap);
             setDirectoryItem(directoryMap);
        }
        getCategoriesMap()
        getDirectoryMap()
        
    }, [])
    const value={categoriesMap,directories}
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}