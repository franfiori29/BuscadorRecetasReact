import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import { Redirect } from "react-router-dom";
import Loader from "./../Loader/Loader";
import { IRecipe } from "../Recipe/Recipe";

export const Recipes = () => {
	const loading = useSelector((state: RootStateOrAny) => state.recipes.loading);
	const recipesArray = useSelector(
		(state: RootStateOrAny) => state.recipes.recipesArray
	);

	if (loading) return <Loader />;

	if (!recipesArray.length && !loading) return <Redirect to='/' />;

	return (
		<main className='container'>
			{recipesArray.map((recipe: IRecipe) => (
				<Recipe key={recipe.id} recipe={recipe} />
			))}
		</main>
	);
};
