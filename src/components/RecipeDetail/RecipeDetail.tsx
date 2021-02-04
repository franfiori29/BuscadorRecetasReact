import React, { useEffect, useState } from "react";
import "./RecipeDetail.css";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setDetailLikes, getDetailLikes } from "../../actions";
import axios from "axios";
import { Icon, Label, List } from "semantic-ui-react";
import "./RecipeDetail.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import TimerIcon from "@material-ui/icons/Timer";
import FavoriteIcon from "@material-ui/icons/Favorite";
const { REACT_APP_BACK } = process.env;

interface IRecipeDetail {
	id: string;
	title: string;
	image: string;
	likes: number;
	diets: Array<string>;
	extendedIngredients: Array<object>;
	instructions: string;
	servings: string;
	readyInMinutes: string;
	summary: string;
}

export default function RecipeDetail({
	id,
	recipe,
	chart,
}: {
	id: string;
	recipe: IRecipeDetail;
	chart: string;
}) {
	const dispatch = useDispatch();
	const detail = useSelector(
		(state: RootStateOrAny) => state.recipeDetail.details
	);

	const [hover, setHover] = useState<string>("");

	useEffect(() => {
		if (chart) eval(chart);
	}, [chart]);

	useEffect(() => {
		axios.get(`${REACT_APP_BACK}`).then((data) => {
			dispatch({ type: "GET_ASIDE", payload: data.data });
		});
		typeof detail.likes === "number" ||
			axios.get(`${REACT_APP_BACK}${id}`).then((res) => {
				dispatch(getDetailLikes(res.data));
			});
	}, [detail, dispatch, id]);

	const handleClick = async () => {
		try {
			const likes = JSON.parse(localStorage.getItem("likes") as string);
			if (likes[recipe.id]) delete likes[recipe.id];
			else likes[recipe.id] = true;
			localStorage.setItem("likes", JSON.stringify(likes));

			let like = JSON.parse(localStorage.getItem("likes") as string)[recipe.id];
			dispatch(
				setDetailLikes({
					id: recipe.id,
					title: recipe.title,
					image: recipe.image,
					likes: like ? 1 : 0,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	if (Object.keys(recipe).length < 4) {
		return <Loader />;
	}

	return (
		<div className='recipe-detail-container'>
			<Link to='/recipes'>
				<ArrowBackIcon style={{ position: "absolute", left: 0 }} />
			</Link>

			<div className='recipe-detail-primary'>
				<img src={recipe.image} alt='' />
				<List
					style={{
						fontSize: "15px",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						flex: 1,
						// paddingLeft: "80px",
					}}
				>
					<h1 className='recipe-detail-title'>
						{recipe.title.toUpperCase()}
						<br />
						{recipe &&
							recipe.diets.map((rec: string, i: number) => (
								<span className='recipe-label' key={i}>
									{rec.toUpperCase()}
								</span>
							))}
					</h1>
					<div className='recipe-divider'></div>
					<div className='recipe-info-container'>
						<span className='recipe-servings'>
							<RestaurantIcon
								style={{ color: "grey" }}
								className='recipe-icon'
							/>
							{recipe.servings} SERVINGS
						</span>
						<span className='recipe-servings'>
							<TimerIcon style={{ color: "grey" }} className='recipe-icon' />
							{recipe.readyInMinutes} MINUTES
						</span>
						<span className='recipe-servings recipe-likes'>
							<FavoriteIcon
								className={`${hover} recipe-icon`}
								onMouseOver={() => setHover("red")}
								onMouseOut={() => setHover("grey")}
								onClick={handleClick}
								style={{
									color: JSON.parse(localStorage.getItem("likes") as string)?.[
										recipe.id
									]
										? "red"
										: "grey",
									cursor: "pointer",
								}}
							/>
							{recipe.likes}
						</span>
					</div>
					<div className='recipe-ingredients-container'>
						<p className='recipe-ingredients-title'>INGREDIENTS</p>
						{recipe.extendedIngredients.map((ing: any, i: number) => (
							<ul className='recipe-ingredients-list' key={i}>
								<li className='recipe-ingredient-item'>
									□ {ing.original.toUpperCase()}
								</li>
							</ul>
						))}
					</div>
				</List>
				<br />
			</div>
			{/* <div style={{ display: "flex", justifyContent: "center" }}>
				<p style={{ fontSize: "20px", margin: "10px 5px" }}>
					Servings: {recipe.servings} <Icon name='food' size='big' />
				</p>
				<p style={{ fontSize: "20px", margin: "10px 5px" }}>
					Minutes: {recipe.readyInMinutes} <Icon name='stopwatch' size='big' />
				</p>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Icon
						name='like'
						className={hover}
						onMouseOver={() => setHover("red")}
						onMouseOut={() => setHover("")}
						color={
							JSON.parse(localStorage.getItem("likes") as string)?.[recipe.id]
								? "red"
								: "black"
						}
						onClick={handleClick}
						style={{ cursor: "pointer" }}
						size='big'
					/>
					<span style={{ fontSize: "30px" }}>{recipe.likes}</span>
				</div>
			</div> */}
			{/* <p
				id='chart'
				style={{ fontSize: "20px" }}
				dangerouslySetInnerHTML={{ __html: `${recipe.summary}` }}
			></p> */}
			{recipe.instructions && <h1>INSTRUCTIONS</h1>}
			<p style={{ fontSize: "24px" }}>{recipe.instructions}</p>
			{/* <List bulleted style={{ fontSize: '15px' }}>
                <List.Header />
                {recipe.extendedIngredients.map(ing => (
                    <List.Item>{ing.original.toUpperCase()}</List.Item>
                ))}
            </List> */}
			{/* <canvas id='taste-visualization'></canvas> */}
		</div>
	);
}
