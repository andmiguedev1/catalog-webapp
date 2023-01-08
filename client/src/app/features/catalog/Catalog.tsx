import { Container } from '@mui/material';

import { StoreProducts } from '../../models/product';

import CatalogList from './CatalogList';

function Catalog({products}: StoreProducts) {
   return (
      <Container>
         <CatalogList products={products} />
      </Container>
   )
}

export default Catalog
