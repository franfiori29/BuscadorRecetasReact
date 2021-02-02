import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../actions/index";
import RecipeDetail from "./../RecipeDetail/RecipeDetail";
import Loader from "../Loader/Loader.js";

export default function RecipeDetailContainer() {
	const { id } = useParams();
	const recipe = useSelector((state) => state.recipeDetail.details);
	const loading = useSelector((state) => state.recipeDetail.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetail(id));
	}, [id, dispatch]);

	if (Object.keys(recipe).length < 4) return <Loader />;

	return (
		<main>
			{loading ? <h1>Loading...</h1> : <RecipeDetail id={id} recipe={recipe} />}
		</main>
	);
}
