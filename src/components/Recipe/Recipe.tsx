import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

export interface IRecipe {
	id: string;
	title: string;
	image: string;
	likes: number;
}

const Recipe = ({ recipe }: { recipe: IRecipe }) => {
	return (
		<Card style={{ margin: "10px", maxHeight: "400px" }}>
			<Image src={recipe.image} wrapped ui={false} />
			<Card.Content>
				<Card.Header>{recipe.title}</Card.Header>
				{/* <Card.Meta>
                    <span className='date'>0 <Icon name='like' onClick={() => alert("to-do")} /></span>
                </Card.Meta> */}
			</Card.Content>
			<Card.Content extra>
				<Link to={`/recipes/${recipe.id}`}>
					<Icon name='send' />
					Go to recipe
				</Link>
			</Card.Content>
		</Card>
	);
};

export default Recipe;
