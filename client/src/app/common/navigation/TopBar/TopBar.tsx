import { AppBar, Toolbar, Typography } from '@mui/material';

function TopBar() {
   return (
      <AppBar position='static' sx={{ marginBottom: 4}}>
         <Toolbar>
            <Typography variant='h6'>CATALOG</Typography>
         </Toolbar>
      </AppBar>
   )
}

export default TopBar
