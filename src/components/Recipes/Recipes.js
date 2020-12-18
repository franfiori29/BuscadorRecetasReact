import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../Recipe/Recipe';
import { Redirect } from 'react-router-dom';
import Loader from './../Loader/Loader';

export const Recipes = () => {
	const loading = useSelector(state => state.recipes.loading);
	const recipesArray = useSelector(state => state.recipes.recipesArray);
	const dispatch = useDispatch();

	if (loading) return <Loader />;

	if (!recipesArray.length && !loading) return <Redirect to="/" />

	return (
		<main className="container">
			{recipesArray.map(recipe => <Recipe key={recipe.id} recipe={recipe} />)}
		</main>
	)
}
