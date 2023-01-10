import { useState, useEffect } from 'react';
import { Container } from '@mui/material';

import { Product } from '../../models/product';

import Layout from '../../layout/Layout';
import ProductsList from '../../components/products/ProductsList';

function Catalog() {
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
   }, []);


   return (
     <Layout>     
         <Container>
            <ProductsList products={products} />
         </Container>
      </Layout>
   )
}

export default Catalog
