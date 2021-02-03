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
		<div
			className='recipe-card'
			style={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid black",
				width: "300px",
				height: "320px",
				alignItems: "center",
				objectFit: "contain",
			}}
		>
			{/* <div style={{ width: "300px", height: "300px" }}> */}
			<Link to={`/recipes/${recipe.id}`}>
				<img
					src={recipe.image}
					alt='recipe'
					style={{
						width: "300px",
						height: "200px",
						outline: "1px solid black",
						outlineOffset: "-1px",
					}}
					onClick={() => window.scrollTo(0, 0)}
				/>
			</Link>
			{/* </div> */}

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
