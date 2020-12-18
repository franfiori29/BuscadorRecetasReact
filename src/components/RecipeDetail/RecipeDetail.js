import React, { useEffect } from 'react';
import './RecipeDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDetailLikes, getDetailLikes } from '../../actions';
import axios from 'axios';

export default function RecipeDetail({ id, recipe }) {

    const dispatch = useDispatch();
    const detail = useSelector(state => state.recipeDetail.details)

    useEffect(() => {
        axios.get('http://localhost:4000')
            .then(data => {
                dispatch({ type: "GET_ASIDE", payload: data.data })
            })
        typeof detail.likes === 'number' ||
            axios.get(`http://localhost:4000/${id}`)
                .then(res => {
                    dispatch(getDetailLikes(res.data))
                })
    }, [detail])

    console.log(recipe)

    const handleClick = async () => {
        try {
            if (localStorage.getItem(recipe.id)) {
                localStorage.removeItem(recipe.id);
            } else localStorage.setItem(recipe.id, true);
            let like = localStorage.getItem(recipe.id);

            dispatch(setDetailLikes(JSON.stringify({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                likes: like ? 1 : 0
            })))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>

            <button onClick={handleClick} className="likes">{recipe.likes}</button>
        </div>
    )
}
