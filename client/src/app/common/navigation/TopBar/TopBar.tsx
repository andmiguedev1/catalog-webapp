import { Link } from 'react-router-dom'
import {
	AppBar,
	Toolbar,
	Typography,
	FormGroup,
	FormControlLabel,
	Switch,
	Box,
	IconButton,
	Badge,
} from '@mui/material'
import { LightMode, DarkMode, ShoppingCart } from '@mui/icons-material'

import { useAppSelector } from '../../../store/appStore'
import { updateCartQuantity } from '../../../utils'
import { ChangeEvent } from 'react'

interface Props {
	themeMode: boolean
	toggleTheme: (event: ChangeEvent<HTMLInputElement>) => void
}

function TopBar({ themeMode, toggleTheme }: Props) {
	const { cart: shoppingCart } = useAppSelector(state => state.cart)
	const customerCart = updateCartQuantity(shoppingCart)

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' sx={{ marginBottom: 4 }}>
				<Toolbar>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						Online Catalog
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ paddingInline: 1 }} />
					{!themeMode ? (
						<LightMode htmlColor='#000' />
					) : (
						<DarkMode htmlColor='#fff' />
					)}

					<FormGroup sx={{ paddingInline: 1 }}>
						<FormControlLabel
							control={<Switch checked={themeMode} onChange={toggleTheme} />}
							label=''
						/>
					</FormGroup>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size='large' color='inherit' component={Link} to='/cart'>
							<Badge badgeContent={customerCart} color='error'>
								<ShoppingCart />
							</Badge>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default TopBar
