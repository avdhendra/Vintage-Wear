import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  addCollectionAndDocument,
  getCategoriesAndDocuments,
} from "../firebase/firebase.utils";
import CategoriesPreview from "../Routes/categories-preview/categories-preview.component";
import Category from "../Routes/category/category.component";
import SHOP_DATA from "../shop-data";
import { fetchCategories, setCategories } from "../Slice/categoriesSlice";

import "./shop.style.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
   addCollectionAndDocument("categories", SHOP_DATA);

    //// const getCategoriesMap = async () => {
    //   // const categoriesArray = await getCategoriesAndDocuments();
    //   // console.log(categoriesArray);
    ////   dispatch();
    //// };

    ////getCategoriesMap();

    dispatch(fetchCategories())
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;

/**
 *   <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        return (<Fragment key={title.key}>
          <h2>{title.toLocaleUpperCase()}</h2>
          <div className="products-container">
            {categoriesMap[title].map((product) => (
              <ProductCard key={product.key} product={product} />
            ))}
          </div>
        </Fragment>)
      })}
    </Fragment>
 */
