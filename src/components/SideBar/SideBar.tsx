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
	}, []);

	if (!recipes.length) return <aside>Loading....</aside>;

	return (
		<aside>
			<Link to='/' onClick={() => dispatch({ type: "CLEAN_RECIPES" })}>
				<h1 style={{ textAlign: "center" }}>HOME</h1>
			</Link>
			{recipes.map((recipe: IRecipe) => (
				<Link to={`/recipes/${recipe.id}`} key={recipe.id}>
					<div
						style={{
							width: "100%",
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							margin: "10px 0",
						}}
					>
						<img
							style={{ width: "60%" }}
							src={recipe.image}
							alt={recipe.title}
						/>
						<span
							style={{
								fontSize: "20px",
								marginTop: "10px",
								textAlign: "center",
								width: "80%",
							}}
						>
							{recipe.title}
						</span>
						<span>
							{recipe.likes} <Icon name='like' />
						</span>
					</div>
				</Link>
			))}
		</aside>
	);
};

export default SideBar;
