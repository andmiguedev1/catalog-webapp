import { useState, useEffect } from 'react';

import { CssBaseline } from '@mui/material';

import { Product } from '../models/product';

import Catalog from '../features/catalog/Catalog';
import TopBar from '../common/navigation/TopBar/TopBar';

function App() {
      const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  return (
    <>
      <CssBaseline />
      <TopBar />
      <Catalog products={products} />
    </>
  );
}

export default App;
