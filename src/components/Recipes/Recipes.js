import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../Recipe/Recipe';
import recipes from './Recipes.module.css';

export const Recipes = () => {
	const loading = useSelector(state => state.recipes.loading);
	const recipesArray = useSelector(state => state.recipes.recipesArray);
	const dispatch = useDispatch();

	if (loading) return <h1>Loading...</h1>;

	return (
		<div className={recipes.container}>
			{recipesArray.map(recipe => <Recipe key={recipe.id} recipe={recipe} />)}
		</div>
	)
}
