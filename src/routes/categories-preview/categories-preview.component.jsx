import { useContext, Fragment} from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap, selectIsCategoriesLoading } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);
    
    return (
        <Fragment>
            {   isLoading ? <Spinner/> : 
                //Object.keys(object) => keys array
                Object.keys(categoriesMap).map(title => {
                  const products =  categoriesMap[title]; 
             
                 return <CategoryPreview  key={title} title={title} products={products}/>
                
                })
            }
            
        </Fragment>
    )
}

export default CategoriesPreview;