import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../firebase/firebase.utils";
import { setCategoriesError, setCategoriesStart, setCategoriesSuccess } from "../Slice/SagaReducers/categories.Saga.Slice";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(setCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(setCategoriesError(error));
        //put in place of dispatch
    }
}
export function* onFetchCategories() {
    yield takeLatest(setCategoriesStart, fetchCategoriesAsync)
    //takeLatest take the action we take same action again again gave me the latest one 
    
}
export function* categoriesSaga() {
   yield all([call(onFetchCategories)])
}
