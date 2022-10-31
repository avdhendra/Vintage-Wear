import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../Components/context/categories.context";
import ProductCard from "../../Components/ProductCard/ProductCard.component";

import "./category.style.scss";
function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
    return (
      <Fragment>
        <h2 className="category-title">{category.toUpperCase()}</h2>
        <div className="categories-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Fragment>
    );
}

export default Category;
