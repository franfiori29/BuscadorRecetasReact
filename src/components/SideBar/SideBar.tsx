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
		<section>
			<h1 className='section-header'>MOST LIKED RECIPES</h1>
			<div className='section-recipes-container'>
				{recipes.map((recipe: IRecipe) => (
					<Link
						to={`/recipes/${recipe.id}`}
						key={recipe.id}
						className='section-link'
						onClick={() => {
							window.scrollTo(0, 0);
						}}
					>
						<div className='section-recipe'>
							<img
								style={{ width: "100%" }}
								src={recipe.image}
								alt={recipe.title}
							/>
							<span className='section-recipe-title'>
								{recipe.title.length > 36
									? recipe.title.substring(0, 30).toUpperCase() + "..."
									: recipe.title.toUpperCase()}
							</span>
							<span className='section-recipe-likes'>
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
