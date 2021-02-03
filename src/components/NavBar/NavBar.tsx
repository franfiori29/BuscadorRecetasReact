import React from "react";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<header>
			<div
				className='items-container'
				// style={{
				// 	display: "flex",
				// 	alignItems: "center",
				// 	justifyContent: "center",
				// 	padding: "0 10px",
				// }}
			>
				<span className='navbar-item'>ABOUT US</span>
				<span className='navbar-item'>HELP</span>
			</div>
			<div
				style={{
					position: "absolute",
					left: "50%",
					transform: "translate(-50%)",
					cursor: "pointer",
				}}
			>
				<img
					src={logo}
					alt='logo'
					onClick={() => {
						history.push("/");
						dispatch({ type: "CLEAN_RECIPES" });
					}}
				/>
			</div>
		</header>
	);
}

export default NavBar;
