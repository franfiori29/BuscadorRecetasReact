import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

export function loadingSearch() {
	return {
		type: "LOADING_SEARCH",
	};
}

export function loadingDetail() {
	return {
		type: "LOADING_DETAIL",
	};
}

export const getRecipes = (data) => {
	return (dispatch) => {
		dispatch(loadingSearch());
		axios({
			method: "GET",
			params: { apiKey: REACT_APP_API_KEY },
			url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${data}&number=20`,
		})
			.then((res) => {
				dispatch({ type: "GET_RECIPES", payload: res.data });
			})
			.catch((err) => console.log(err));
	};
};
//https://api.spoonacular.com/recipes/{id}

export const getDetail = (id) => {
	return (dispatch) => {
		dispatch(loadingDetail());
		axios({
			method: "GET",
			params: { apiKey: REACT_APP_API_KEY },
			url: `https://api.spoonacular.com/recipes/${id}/information`,
		})
			.then((res) => dispatch({ type: "GET_DETAIL", payload: res.data }))
			.catch((err) => console.log(err));
	};
};

export const setDetailLikes = (body) => {
	return async (dispatch) => {
		fetch("http://localhost:4000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body,
		})
			.then((data) => data.json())
			.then((data) => dispatch({ type: "SET_DETAIL_LIKES", payload: data }));
	};
};

export const getDetailLikes = (payload) => {
	return {
		type: "GET_DETAIL_LIKES",
		payload,
	};
};
