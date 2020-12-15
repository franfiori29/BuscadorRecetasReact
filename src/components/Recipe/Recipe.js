import React from 'react';
import { Link } from 'react-router-dom';
import heart from "../../heart.svg";
import { Card, Icon, Image } from 'semantic-ui-react'
import { Recipes } from '../Recipes/Recipes';




const Recipe = ({ recipe }) => {
    return (
        <Card style={{ margin: '10px' }}>
            <Image src={recipe.image} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{recipe.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>0 <Icon name='like' onClick={() => alert("to-do")} /></span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
      </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to={`/recipes/${recipe.id}`}>
                    <Icon name='send' />
        Go to recipe
      </Link>
            </Card.Content>
        </Card>
    )
}

export default Recipe;
