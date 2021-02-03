import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { IRecipe } from "../Recipe/Recipe";

const SideBar = () => {
	const dispatch = useDispatch();
	const recipes = useSelector(
		(state: RootStateOrAny) => state.asideRecipes.asideArray
	);

	useEffect(() => {
		axios.get("http://localhost:4000").then((data) => {
			dispatch({ type: "GET_ASIDE", payload: data.data });
		});
	}, [dispatch]);

	if (!recipes.length) return <aside>Loading....</aside>;

	return (
		<section
			style={{
				margin: "30px 0",
				color: "white",
				backgroundColor: "#2c2e2e",
				paddingTop: "30px",
			}}
		>
			<h1
				style={{
					textAlign: "center",
					marginBottom: "30px",
					fontFamily: "Aristotelica",
					fontWeight: 600,
					fontSize: "24px",
				}}
			>
				MOST LIKED RECIPES
			</h1>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
				}}
			>
				{recipes.map((recipe: IRecipe) => (
					<Link
						to={`/recipes/${recipe.id}`}
						key={recipe.id}
						style={{ width: "400px", margin: "10px 20px" }}
						onClick={() => {
							window.scrollTo(0, 0);
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<img
								style={{ width: "100%" }}
								src={recipe.image}
								alt={recipe.title}
							/>
							<span
								style={{
									fontSize: "18px",
									textAlign: "center",
									marginTop: "20px",
									color: "#f5f3f3",
									fontFamily: "Aristotelica",
									fontWeight: 600,
								}}
							>
								{recipe.title.toUpperCase()}
							</span>
							<span
								style={{
									fontSize: "16px",
									textAlign: "center",
									marginTop: "10px",
									fontFamily: "Baron Neue",
									fontWeight: 400,
									color: "#e9e9e9",
								}}
							>
								{recipe.likes} LIKES <Icon name='like' />
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default SideBar;
