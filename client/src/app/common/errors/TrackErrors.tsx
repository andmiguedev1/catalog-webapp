import { Alert, AlertTitle, List, ListItem, ListItemText } from '@mui/material'

interface Props {
	invalidErrors?: string[]
}

function TrackErrors({ invalidErrors }: Props) {
	return (
		<Alert severity='error'>
			<AlertTitle>An error has occurred!</AlertTitle>
			<List>
				{invalidErrors?.map(error => (
					<ListItem key={error}>
						<ListItemText>{error}</ListItemText>
					</ListItem>
				))}
			</List>
		</Alert>
	)
}

export default TrackErrors
