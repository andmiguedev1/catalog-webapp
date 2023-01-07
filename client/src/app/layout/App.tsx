import { useState, useEffect } from 'react';
import { Product } from '../models/product';

import { Container, Typography } from '@mui/material';
import Catalog from '../features/catalog/Catalog';

import './App.css';

function App() {
      const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  return (
    <Container>
      <Typography variant='h4'>Catalog</Typography>
        <Catalog products={products} />
    </Container>
  );
}

export default App;
