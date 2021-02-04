import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import { Redirect } from "react-router-dom";
import Loader from "./../Loader/Loader";
import { IRecipe } from "../Recipe/Recipe";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const Recipes = () => {
	const loading = useSelector((state: RootStateOrAny) => state.recipes.loading);
	const recipesArray = useSelector(
		(state: RootStateOrAny) => state.recipes.recipesArray
	);
	const dispatch = useDispatch();

	if (loading) return <Loader />;

	if (!recipesArray.length && !loading) return <Redirect to='/' />;

	return (
		<main className='container'>
			<ArrowBackIcon
				className='arrow-icon'
				onClick={() => dispatch({ type: "CLEAN_RECIPES" })}
			/>
			{recipesArray.map((recipe: IRecipe) => (
				<Recipe key={recipe.id} recipe={recipe} />
			))}
		</main>
	);
};
