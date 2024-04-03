import React from 'react'
import {Backdrop, CircularProgress} from '@mui/material'

const AppLoader = () => {
	return (
		<Backdrop
			sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1600}}
			open={true}
		>
			<CircularProgress size={50} disableShrink />
		</Backdrop>
	)
}
export default AppLoader
