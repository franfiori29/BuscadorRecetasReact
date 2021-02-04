import React from "react";

function Footer() {
	return (
		<footer
			style={{
				fontSize: "20px",
				height: "150px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<p>© Copyright 2021 Recipe Finder. All Rights Reserved.</p>
			<div>
				<span style={{ marginRight: "20px" }}>Terms of Service</span>
				<span style={{ marginLeft: "20px" }}>Privacy Policy</span>
			</div>
		</footer>
	);
}

export default Footer;
