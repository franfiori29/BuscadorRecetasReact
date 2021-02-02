import React, { useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getRecipes } from "../../actions/index";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Loader from "./../Loader/Loader";

const MainForm = () => {
	const loading = useSelector((state: RootStateOrAny) => state.recipes.loading);
	const recipesArray = useSelector(
		(state: RootStateOrAny) => state.recipes.recipesArray
	);
	const dispatch = useDispatch();

	const [numberInputs, setNumberInputs] = useState(1);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let arrayInputs = [...e.currentTarget.childNodes].map((inp) => inp.value);
		let query = arrayInputs.join(",");
		dispatch(getRecipes(query));
	};

	if (loading) return <Loader />;
	return (
		<main className='mainform'>
			<h1 style={{ textAlign: "center", margin: "30px 0 50px 0" }}>
				RECIPE FINDER
			</h1>
			<form
				action='get'
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative",
				}}
			>
				<h1>Ingredients:</h1>
				{Array(numberInputs).fill(
					<input
						style={{ textAlign: "center", margin: "5px", width: "20%" }}
						type='text'
						key={Math.floor(Math.random() * 1000) + 1}
						required
					/>
				)}
				<div style={{ margin: "10px" }}>
					<Button
						variant='outlined'
						color='primary'
						style={{ margin: "5px" }}
						onClick={() =>
							setNumberInputs((prev) => (prev + 1 > 4 ? prev : prev + 1))
						}
					>
						+
					</Button>
					<Button
						variant='outlined'
						color='primary'
						style={{ margin: "5px" }}
						onClick={() => setNumberInputs((prev) => prev - 1 || 1)}
					>
						-
					</Button>
				</div>

				<Button
					color='secondary'
					variant='contained'
					type='submit'
					value=''
					style={{ width: "30%" }}
				>
					GET RECIPES
				</Button>
			</form>

			{!!recipesArray.length && <Redirect to='/recipes' />}
		</main>
	);
};

export default MainForm;
