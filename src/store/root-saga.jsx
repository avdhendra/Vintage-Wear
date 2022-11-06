import {  all, call } from "redux-saga/effects";
import { categoriesSaga } from "../sagas/category.saga";


//generator Function
export function* rootSaga() {
    yield all([call(categoriesSaga)])
}