import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {//root state
    return state.categories;
}

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categories
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    }
);

export const selectIsCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.isLoading
    }
);

/* (state) => {
    console.log('selector fired');
    return state.categories.categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
}; */