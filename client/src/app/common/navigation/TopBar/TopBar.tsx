
import { AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch, } from '@mui/material';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode'

interface Props {
   darkMode: boolean;
   toggleThemeMode: () => void; 
}

function TopBar({ darkMode, toggleThemeMode}: Props)  {
 
   return (
      <AppBar position='static' sx={{ marginBottom: 4}}>
         <Toolbar>
            <Typography variant='h6' sx={{ paddingRight: 2 }}>CATALOG</Typography>

            {!darkMode ? (
               <LightMode htmlColor='#000' />
            ): (
               <DarkMode htmlColor='#fff' />
            )}
            <FormGroup sx={{ paddingInline: 1 }}>
               <FormControlLabel
                  control={
                     <Switch checked={darkMode} onChange={toggleThemeMode} />
                  }
                  label={darkMode ? 'dark mode' : 'light mode'}
               />

            </FormGroup>
         </Toolbar>
      </AppBar>
   )
}

export default TopBar
