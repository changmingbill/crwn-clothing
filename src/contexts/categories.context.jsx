import { createContext, useState, useEffect} from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import PRODUCTS from '../shop-data.json';
// import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); upload data that only need to execute once
    const getCategoriesMap = async () => {
        const  categoryMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoryMap);
    };
    useEffect(() => {
        getCategoriesMap();
    },[]);
    const value = {categoriesMap}
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}