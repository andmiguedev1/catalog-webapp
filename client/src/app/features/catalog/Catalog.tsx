import CatalogList from './CatalogList';

import { StoreProducts } from '../../models/product';

function Catalog({products}: StoreProducts) {
   return (
      <>
         <CatalogList products={products} />
      </>
   )
}

export default Catalog
