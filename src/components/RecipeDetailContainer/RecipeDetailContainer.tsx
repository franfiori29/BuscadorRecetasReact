import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getDetail } from "../../actions/index";
import RecipeDetail from "./../RecipeDetail/RecipeDetail";
import Loader from "../Loader/Loader";

export default function RecipeDetailContainer() {
	const { id }: { id: string } = useParams();
	const recipe = useSelector(
		(state: RootStateOrAny) => state.recipeDetail.details
	);
	const loading = useSelector(
		(state: RootStateOrAny) => state.recipeDetail.loading
	);
	const chart = useSelector((state: RootStateOrAny) => state.chart);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetail(+id));
	}, [id, dispatch]);

	if (Object.keys(recipe).length < 4) return <Loader />;

	return (
		<main>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<RecipeDetail id={id} recipe={recipe} chart={chart} />
			)}
		</main>
	);
}
