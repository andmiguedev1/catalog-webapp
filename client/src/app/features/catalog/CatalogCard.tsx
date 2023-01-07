import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

import { Product } from '../../models/product';

interface Props {
   product: Product
}

function CatalogCard({product}: Props) {
   return (
      <ListItem key={product.id}>
         <ListItemAvatar>
            <Avatar src={product.image} />
            </ListItemAvatar>
         <ListItemText>
            {product.name} - ${product.price}
         </ListItemText>
      </ListItem>
   )
}

export default CatalogCard
