
const initialState = {
    recipes: {
        loading: false,
        recipesArray: [],
        error: false
    },
    recipeDetail: {
        details: {},
        loading: false,
        error: false
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_SEARCH":
            return {
                ...state,
                recipes: { ...state.recipes, loading: true }
            }
        case "LOADING_DETAIL":
            return {
                ...state,
                recipeDetail: { loading: true, detail: {} }
            }
        case "GET_RECIPES":
            return {
                ...state,
                recipes: {
                    loading: false,
                    recipesArray: action.payload
                }
            }
        case "GET_DETAIL":
            return {
                ...state,
                recipeDetail: {
                    loading: false,
                    details: action.payload
                }
            }
        default:
            return state
    }
}