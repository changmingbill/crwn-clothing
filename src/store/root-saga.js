import {all, call} from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';

export function* rootSage() {
    yield all([call(categoriesSaga)]);
}