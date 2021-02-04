import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainForm from "./components/MainForm/MainForm";
import RecipeDetailContainer from "./components/RecipeDetailContainer/RecipeDetailContainer";
import { Recipes } from "./components/Recipes/Recipes";
// import "semantic-ui-css/semantic.min.css";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
	React.useEffect(() => {
		if (!localStorage.getItem("likes"))
			localStorage.setItem("likes", JSON.stringify({}));
	}, []);

	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path='/'>
				<MainForm />
			</Route>
			<Route exact path='/recipes'>
				<Recipes />
			</Route>
			<Route path='/recipes/:id'>
				<RecipeDetailContainer />
			</Route>
			<SideBar />
			<Footer />
		</BrowserRouter>
	);
};

export default App;
