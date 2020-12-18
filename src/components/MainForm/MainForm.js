import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../actions/index';
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom';


const MainForm = () => {
    const loading = useSelector(state => state.recipes.loading);
    const recipesArray = useSelector(state => state.recipes.recipesArray);
    const dispatch = useDispatch();

    const [numberInputs, setNumberInputs] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        let arrayInputs = [...e.target.childNodes].map(inp => inp.value).filter(Boolean);
        let query = arrayInputs.join(',');
        dispatch(getRecipes(query));
    };

    if (loading) return (<h1>Loading...</h1>)
    return (
        <main>
            <form action="get" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {Array(numberInputs).fill(
                    <>
                        Ingredient:
                       <input style={{ textAlign: 'center', margin: '5px', width: '20%' }} type="text" required />
                    </>
                )}
                <div style={{ margin: '10px' }}>
                    <Button variant="outlined" color="primary" style={{ margin: '5px' }} onClick={() => setNumberInputs(prev => (prev + 1) > 5 ? prev : (prev + 1))}>
                        +
                    </Button>
                    <Button variant="outlined" color="primary" style={{ margin: '5px' }} onClick={() => setNumberInputs(prev => (prev - 1) || 1)}>
                        -
                </Button>
                </div>
                <Button color="secondary" variant="contained" type="submit" value="" style={{ width: '30%' }}>GET RECIPES</Button>
            </form>

            {!!recipesArray.length && <Redirect to='/recipes' />}
        </main>
    )
};

export default MainForm;
