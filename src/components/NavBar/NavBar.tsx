import React from "react";
import logo from "../../assets/images/logo.png";
import { useHistory } from "react-router-dom";

function NavBar() {
	const history = useHistory();

	return (
		<header
			style={{ height: "10vh", display: "flex", width: "80%", margin: "auto" }}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "0 10px",
				}}
			>
				<span className='navbar-item' style={{ padding: "0 10px" }}>
					ABOUT US
				</span>
				<span className='navbar-item' style={{ padding: "0 10px" }}>
					HELP
				</span>
			</div>
			<div
				onClick={() => {
					console.log(history);
					history.push("/");
				}}
			>
				<img
					src={logo}
					alt='logo'
					style={{
						position: "absolute",
						left: "50%",
						transform: "translate(-50%)",
						cursor: "pointer",
					}}
				/>
			</div>
		</header>
	);
}

export default NavBar;
