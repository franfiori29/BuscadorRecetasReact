import React, { useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getRecipes } from "../../actions/index";
import { Redirect } from "react-router-dom";
import Loader from "./../Loader/Loader";
import homeImage from "../../assets/images/home.jpeg";
import SearchIcon from "@material-ui/icons/Search";
import ErrorIcon from "@material-ui/icons/Error";

import Axios from "axios";
const { REACT_APP_API_KEY } = process.env;

type Ingredient = {
	id: number;
	name: string;
};

const MainForm = () => {
	const loading = useSelector((state: RootStateOrAny) => state.recipes.loading);
	const recipesArray = useSelector(
		(state: RootStateOrAny) => state.recipes.recipesArray
	);
	const error: boolean = useSelector(
		(state: RootStateOrAny) => state.recipes.error
	);
	const dispatch = useDispatch();

	const [input, setInput] = useState<string>("");
	const [suggestions, setSuggestions] = useState<Ingredient[]>([]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		window.scrollTo(0, 0);
		let query = input.trim().split(" ").join(",");
		dispatch(getRecipes(query));
	};

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (error) dispatch({ type: "CLEAN_ERROR" });
		let value = e.currentTarget.value;
		if (value.slice(-2) === "  ")
			setInput(value.substring(0, value.length - 1));
		else setInput(value);

		// if (!(value.slice(-1) === " ")) {
		// 	Axios({
		// 		method: "GET",
		// 		params: { apiKey: REACT_APP_API_KEY },
		// 		url: `https://api.spoonacular.com/food/ingredients/search?query=${value}&number=10`,
		// 	}) //    https://api.spoonacular.com/food/ingredients/search
		// 		.then((res) => {
		// 			setSuggestions(res.data.results);
		// 		})
		// 		.catch((err) => console.log(err));
		// }
	};

	if (loading) return <Loader />;
	return (
		<main className='mainform'>
			<div className='home-div image-front'>
				<img src={homeImage} alt='home' />
			</div>
			<div className='home-div'>
				<div>
					<h1 className='form-title'>
						SELECT THE INGRIDIENTS YOU HAVE ON YOUR FRIDGE
					</h1>

					<form onSubmit={handleSubmit}>
						{error && (
							<ErrorIcon
								className='error-icon'
								// style={{ color: "red", position: "absolute", right: 0 }}
							/>
						)}
						<input
							type='text'
							required
							placeholder='BACON EGG BREAD'
							value={input}
							onChange={handleChange}
						/>
						<button type='submit' onClick={handleSubmit}>
							<SearchIcon />
						</button>
					</form>

					<div className='suggestions-container'>
						<h3>SUGGESTIONS</h3>
						<div className='suggestions-items-container'>
							{suggestions.length !== 0
								? suggestions.map((el) => (
										<span key={el.id} className='suggestion-item'>
											{el.name}
										</span>
								  ))
								: ["BANANA", "WINE", "TOMATO"].map((el, i) => (
										<span key={i} className='suggestion-item'>
											{el}
										</span>
								  ))}
						</div>
					</div>
				</div>
				{!!recipesArray.length && <Redirect to='/recipes' />}
			</div>
		</main>
	);
};

export default MainForm;
