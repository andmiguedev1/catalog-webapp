import { Product } from '../../models/product';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

interface Props {
   products: Product[]
}

function Catalog({products}: Props) {
   return (
      <>
         <List>
            {products.map((product) => (
               <ListItem key={product.id}>
                  <ListItemAvatar>
                     <Avatar src={product.image} />
                  </ListItemAvatar>
                  <ListItemText>
                     {product.name} - ${product.price}
                  </ListItemText>
               </ListItem>
            ))}
         </List>
    </>
   )
}

export default Catalog
