import React from "react";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
export const Loader = () => {
	return (
		<Box
			sx={{
				width: 1200,
				display: "flex",
				justifyContent: "center",
				py: 3,
				transition: "1px solid 1s",
			}}
		>
			<CircularProgress />
		</Box>
	);
};
