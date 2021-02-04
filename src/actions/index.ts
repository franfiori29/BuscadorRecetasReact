import axios from "axios";
import { Dispatch } from "react";
const { REACT_APP_API_KEY, REACT_APP_BACK } = process.env;

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

export const getRecipes = (data: string) => {
	return (dispatch: Dispatch<any>) => {
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

export const getDetail = (id: number) => {
	return (dispatch: Dispatch<any>) => {
		dispatch(loadingDetail());
		// dispatch(getChart(id));
		axios({
			method: "GET",
			params: { apiKey: REACT_APP_API_KEY },
			url: `https://api.spoonacular.com/recipes/${id}/information`,
		})
			.then((res) => dispatch({ type: "GET_DETAIL", payload: res.data }))
			.catch((err) => console.log(err));
	};
};

// export const getChart = (id: number) => {
// 	return (dispatch: Dispatch<any>) => {
// 		dispatch(loadingDetail());
// 		axios({
// 			method: "GET",
// 			params: { apiKey: REACT_APP_API_KEY },
// 			url: `https://api.spoonacular.com/recipes/${id}/tasteWidget`,
// 		})
// 			.then((res) => {
// 				let first = res.data.indexOf("<script>") + 8;
// 				let last = res.data.lastIndexOf("</script>");
// 				try {
// 					dispatch({
// 						payload: res.data
// 							.substring(first, last)
// 							.replace(/(\r\n|\n|\r)/gm, ""),
// 						type: "GET_CHART",
// 					});
// 				} catch (err) {
// 					console.log(err);
// 				}
// 			})
// 			.catch((err) => console.log(err));
// 	};
// };
export interface detailLikesBody {
	id: string;
	title: string;
	image: string;
	likes: number;
}

export const setDetailLikes = (body: detailLikesBody) => {
	return async (dispatch: Dispatch<any>) => {
		axios
			.post(`${REACT_APP_BACK}`, body)
			.then((data) =>
				dispatch({ type: "SET_DETAIL_LIKES", payload: data.data })
			);
	};
};

export const getDetailLikes = (payload: number) => {
	return {
		type: "GET_DETAIL_LIKES",
		payload,
	};
};
