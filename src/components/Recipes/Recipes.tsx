import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import { Redirect } from "react-router-dom";
import Loader from "./../Loader/Loader";
import { IRecipe } from "../Recipe/Recipe";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

export const Recipes = () => {
	const loading = useSelector((state: RootStateOrAny) => state.recipes.loading);
	const recipesArray = useSelector(
		(state: RootStateOrAny) => state.recipes.recipesArray
	);
	const history = useHistory();

	if (loading) return <Loader />;

	if (!recipesArray.length && !loading) return <Redirect to='/' />;

	return (
		<main className='container'>
			<ArrowBackIcon
				style={{ position: "absolute", top: 0, left: 0 }}
				onClick={() => history.goBack()}
			/>
			{recipesArray.map((recipe: IRecipe) => (
				<Recipe key={recipe.id} recipe={recipe} />
			))}
		</main>
	);
};
