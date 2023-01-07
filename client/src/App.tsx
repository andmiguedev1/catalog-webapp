import { useState, useEffect } from 'react';
import { Product } from './models/product';

import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <ol >
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ol>
      </header>
    </div>
  );
}

export default App;
