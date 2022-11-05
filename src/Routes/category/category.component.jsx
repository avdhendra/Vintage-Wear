import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../../Components/ProductCard/ProductCard.component";
import Spinner from "../../Components/spinner/spinner";
import { selectCategoriesLoading, selectCategoriesMap } from "../../Slice/memoized_selectors/category.selector";

import "./category.style.scss";
function Category() {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);
 const isLoading=useSelector(selectCategoriesLoading)
  const [products, setProducts] = useState(categoriesMap[category]);



  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading === "loading" ? (
        <Spinner />
      ) : (
        <div className="categories-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
}

export default Category;
