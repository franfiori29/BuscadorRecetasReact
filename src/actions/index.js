import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

export function loadingSearch() {
    return {
        type: "LOADING_SEARCH"
    }
}

export function loadingDetail() {
    return {
        type: "LOADING_DETAIL"
    }
}

export const getRecipes = (data) => {
    return dispatch => {
        dispatch(loadingSearch());
        axios({
            method: 'GET',
            params: { 'apiKey': REACT_APP_API_KEY },
            url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${data}&number=3`
        })
            .then(res => {
                dispatch({ type: "GET_RECIPES", payload: res.data })
            })
            .catch(err => console.log(err))
    }
}
//https://api.spoonacular.com/recipes/{id}

export const getDetail = (id) => {
    return dispatch => {
        dispatch(loadingDetail())
        axios({
            method: 'GET',
            params: { 'apiKey': REACT_APP_API_KEY },
            url: `https://api.spoonacular.com/recipes/${id}/information`
        })
            .then(res => dispatch({ type: "GET_DETAIL", payload: res.data }))
            .catch(err => console.log(err))
    }
}
