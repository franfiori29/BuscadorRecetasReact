import React from "react";
import { Link } from "react-router-dom";

export interface IRecipe {
	id: string;
	title: string;
	image: string;
	likes: number;
	missedIngredientCount: number;
	usedIngredientCount: number;
}

const Recipe = ({ recipe }: { recipe: IRecipe }) => {
	return (
		<div className='recipe-card'>
			<Link to={`/recipes/${recipe.id}`}>
				<img
					src={recipe.image}
					alt='recipe'
					onClick={() => window.scrollTo(0, 0)}
				/>
			</Link>

			<p className='card-title'>
				{recipe.title.length > 25
					? `${recipe.title.substring(0, 22)}...`
					: recipe.title}
			</p>
			<p className='card-sub'>
				{recipe.missedIngredientCount + recipe.usedIngredientCount} INGREDIENTS
			</p>
		</div>
	);
};

export default Recipe;
