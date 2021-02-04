import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				marginTop: "200px",
				flex: 1,
				color: "#525252",
				minHeight: "100vh",
			}}
		>
			<CircularProgress
				color='inherit'
				style={{ width: "100px", height: "100px" }}
			/>
		</div>
	);
}
