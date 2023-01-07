import { List } from '@mui/material';

import { StoreProducts } from '../../models/product';

import CatalogCard from './CatalogCard';

function CatalogList({products}: StoreProducts) {
   return (
      <List>
            {products.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
         </List>
   )
}

export default CatalogList
