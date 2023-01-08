import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import { Product } from '../models/product';

import Catalog from '../features/catalog/Catalog';
import TopBar from '../common/navigation/TopBar/TopBar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteToggle = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteToggle,
      primary: {
        main: paletteToggle === 'light' ? '#d8d8d8' : '#182747',
      },
      secondary: {
        main: paletteToggle === 'light' ? '#50577a' : '#62728e'
      },
      background: {
        default: paletteToggle === 'light' ? '#f5f5f5' : '#434242'
      }
    }
  });

  function toggleThemeMode() {
    setDarkMode(!darkMode);
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar darkMode={darkMode} toggleThemeMode={toggleThemeMode} />
        <Catalog products={products} />
      </ThemeProvider>
    </>
  );
}

export default App;
