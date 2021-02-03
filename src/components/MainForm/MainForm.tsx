import React, { useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { getRecipes } from "../../actions/index";
import { Redirect } from "react-router-dom";
import Loader from "./../Loader/Loader";
import homeImage from "../../assets/images/home.jpeg";
import SearchIcon from "@material-ui/icons/Search";
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
	const dispatch = useDispatch();

	const [input, setInput] = useState<string>("");
	const [suggestions, setSuggestions] = useState<Ingredient[]>([]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		let query = input.trim().split(" ").join(",");
		dispatch(getRecipes(query));
	};

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
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
			<div className='homeDiv' style={{ marginRight: "100px" }}>
				<img src={homeImage} alt='home' />
			</div>
			<div className='homeDiv'>
				<div>
					<h1
						style={{
							textAlign: "center",
							margin: "30px 0 50px 0",
							fontFamily: "Aristotelica",
							fontWeight: 500,
							color: "#333333",
						}}
					>
						SELECT THE INGRIDIENTS YOU HAVE ON YOUR FRIDGE
					</h1>

					<form
						onSubmit={handleSubmit}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<input
							style={{
								textAlign: "center",
								margin: "5px",
								height: "40px",
								width: "60%",
								fontSize: "18px",
								fontFamily: "Aristotelica",
							}}
							type='text'
							required
							placeholder='Example: CHOCOLATE STRAWBERRY'
							value={input}
							onChange={handleChange}
						/>
						<button
							type='submit'
							style={{
								backgroundColor: "#333333",
								borderRadius: "30px",
								color: "white",
								borderWidth: 0,
								width: "50px",
								height: "50px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginLeft: "15px",
							}}
							onClick={handleSubmit}
						>
							<SearchIcon />
						</button>
					</form>

					<div style={{ marginTop: "50px" }}>
						<h3
							style={{
								textAlign: "center",
								color: "#868686",
							}}
						>
							SUGGESTIONS
						</h3>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								textAlign: "center",
								color: "#868686",
							}}
						>
							{suggestions.length !== 0
								? suggestions.map((el) => (
										<span
											key={el.id}
											className='suggestion-item'
											style={{
												border: "2px solid #868686",
												padding: "5px 2px",
												flexBasis: "120px",
												textAlign: "center",
												margin: "5px",
												fontFamily: "Aristotelica",
											}}
										>
											{el.name}
										</span>
								  ))
								: ["BANANA", "WINE", "TOMATO"].map((el, i) => (
										<span
											key={i}
											className='suggestion-item'
											style={{
												border: "2px solid #868686",
												padding: "5px 2px",
												flexBasis: "120px",
												margin: "5px",
												fontFamily: "Aristotelica",
											}}
										>
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
