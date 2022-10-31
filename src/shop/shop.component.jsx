
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../Routes/categories-preview/categories-preview.component";
import Category from "../Routes/category/category.component";

import "./shop.style.scss";

const Shop = () => {
  
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
        <Route path=':category' element={<Category/> } />
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