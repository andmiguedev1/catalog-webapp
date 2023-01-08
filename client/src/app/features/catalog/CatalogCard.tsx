import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';

import { Product } from '../../models/product';

interface Props {
   product: Product
}

function CatalogCard({product}: Props) {
   return (
      <>
      <Card>
         <CardHeader
            avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
               title={product.name}
         />
         <CardMedia
            sx={{ height: 240, width: 'auto' }}
            image={product.image}
            title={product.name}
            />
         <CardContent>
               <Typography gutterBottom color='secondary' variant='h5'>${(product.price).toFixed(2)}</Typography>  
               <Typography variant='body2' color='text.secondary'>{product.brand} / {product.type}</Typography>       
            </CardContent>
            <CardActions>
               <Button size='small' variant='contained' fullWidth={true}>Add to cart</Button>
               <Button size='small' variant='outlined'>View</Button>
            </CardActions>
      </Card>
      </>
   )
}

export default CatalogCard
