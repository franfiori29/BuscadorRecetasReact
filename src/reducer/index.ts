import { detailLikesBody } from "../actions";

const initialState = {
	recipes: {
		loading: false,
		recipesArray: [],
		error: false,
	},
	recipeDetail: {
		details: {},
		loading: false,
		error: false,
	},
	asideRecipes: {
		loading: false,
		asideArray: [],
		error: false,
	},
	chart: "",
};

interface IAction {
	type: string;
	payload: number | detailLikesBody | Array<any>;
}

const reducer = (state = initialState, action: IAction) => {
	switch (action.type) {
		case "LOADING_SEARCH":
			return {
				...state,
				recipes: { ...state.recipes, loading: true },
			};
		case "LOADING_DETAIL":
			return {
				...state,
				recipeDetail: { loading: true, details: {}, error: false },
			};
		case "GET_RECIPES":
			return {
				...state,
				recipes: {
					loading: false,
					recipesArray: action.payload,
					error: false,
				},
			};
		case "CLEAN_RECIPES":
			return {
				...state,
				recipes: {
					loading: false,
					recipesArray: [],
					error: false,
				},
			};
		case "GET_DETAIL":
			return {
				...state,
				recipeDetail: {
					loading: false,
					details: { ...(action.payload as object) },
					error: false,
				},
			};
		case "SET_DETAIL_LIKES":
			return {
				...state,
				recipeDetail: {
					loading: false,
					error: false,
					details: {
						...state.recipeDetail.details,
						likes: (action.payload as detailLikesBody).likes,
					},
				},
			};
		case "GET_DETAIL_LIKES":
			return {
				...state,
				recipeDetail: {
					loading: false,
					error: false,
					details: {
						...state.recipeDetail.details,
						likes: action.payload,
					},
				},
			};
		case "GET_ASIDE":
			return {
				...state,
				asideRecipes: {
					loading: false,
					asideArray: action.payload,
					error: false,
				},
			};
		case "GET_CHART":
			return {
				...state,
				chart: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
