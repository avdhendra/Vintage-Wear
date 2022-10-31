import { Fragment, useContext } from "react";
import CategoryPreview from "../../Components/category-preview/category-preview.component";
import { CategoriesContext } from "../../Components/context/categories.context";



const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        console.log("kid",products)
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
