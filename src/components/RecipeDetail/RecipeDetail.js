import React from 'react';

export default function RecipeDetail({ recipe }) {
    const handleClick = async () => {
        const recipeVote = await fetch("http://localhost:4000", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                likes: 1
            })
        })
        console.log(recipeVote);
    }

    return (
        <div>
            <button onClick={handleClick}>LIKES</button>
        </div>
    )
}
