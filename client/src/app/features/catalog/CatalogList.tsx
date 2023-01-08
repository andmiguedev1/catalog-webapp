import { Grid } from '@mui/material';

import { StoreProducts } from '../../models/product';

import CatalogCard from './CatalogCard';

function CatalogList({products}: StoreProducts) {
   return (
      <Grid container spacing={3}>
         {products.map((product) => (
            <Grid item xs={6} sm={3} key={product.id}>
               <CatalogCard product={product} />
            </Grid>
         ))}
      </Grid>
   )
}

export default CatalogList;
