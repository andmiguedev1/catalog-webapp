import { Theme } from '@mui/material/styles';
import Card from './Card';

function ThemeComponents(theme: Theme) {
   return Object.assign(
      Card(theme)
   )
}

export default ThemeComponents
