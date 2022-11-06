import { Fragment, } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../Components/category-preview/category-preview.component";
import Spinner from "../../Components/spinner/spinner";
import { selectCategoriesLoadingSaga, selectCategoriesMapSaga } from "../../Slice/SagaReducers/memoized_saga_selector/category.saga.selector";
//import { selectCategoriesLoading, selectCategoriesMap } from "../../Slice/memoized_selectors/category.selector";





const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMapSaga)
 const isLoading=useSelector(selectCategoriesLoadingSaga)
  return (
    <Fragment>
      {isLoading === 'loading' ? (<Spinner />) : (
        Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        console.log("kid",products)
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      }))}
      
    </Fragment>
  );
};
export default CategoriesPreview;
