import React, { useEffect, useState } from "react";
import "./RecipeDetail.css";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { setDetailLikes, getDetailLikes } from "../../actions";
import axios from "axios";
import { Icon, Label, List } from "semantic-ui-react";
import "./RecipeDetail.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

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
		axios.get("http://localhost:4000").then((data) => {
			dispatch({ type: "GET_ASIDE", payload: data.data });
		});
		typeof detail.likes === "number" ||
			axios.get(`http://localhost:4000/${id}`).then((res) => {
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
		<div
			style={{
				width: "100%",
				margin: "0 auto",
				position: "relative",
				fontFamily: "Aristotelica",
				color: "#868686",
			}}
		>
			<Link to='/recipes'>
				<Icon
					color='black'
					style={{ position: "absolute", left: 0 }}
					name='arrow left'
					size='big'
				/>
			</Link>
			{/* <h1 style={{ fontSize: "40px" }}>{recipe.title}</h1>
			{recipe &&
				recipe.diets.map((rec: string, i: number) => (
					<Label color='teal' key={i}>
						{rec.toUpperCase()}
					</Label>
				))}{" "}
			<br /> */}
			<div
				style={{ display: "flex", flexWrap: "wrap", padding: "80px 0 20px" }}
			>
				<img
					style={{
						flex: 1,
						maxWidth: "100%",
						outline: "1px solid black",
						outlineOffset: "-1px",
					}}
					src={recipe.image}
					alt=''
				/>
				<List
					style={{
						fontSize: "15px",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						flex: 1,
						paddingLeft: "80px",
					}}
				>
					<h1
						style={{
							fontWeight: 600,
							fontSize: "30px",
							color: "black",
						}}
					>
						{recipe.title.toUpperCase()}
						<br />
						{recipe &&
							recipe.diets.map((rec: string, i: number) => (
								<Label color='grey' key={i}>
									{rec.toUpperCase()}
								</Label>
							))}
					</h1>
					<div
						style={{
							height: "1px",
							backgroundColor: "#868686",
							width: "25%",
							margin: "40px 0 20px",
						}}
					></div>
					<div style={{ marginBottom: "40px", fontFamily: "fantasy" }}>
						<p
							style={{
								fontSize: "16px",
								margin: "20px 5px",
								display: "inline-block",
								letterSpacing: "2px",
							}}
						>
							<Icon name='food' size='big' color='grey' />
							{recipe.servings} SERVINGS
						</p>
						<p
							style={{
								fontSize: "15px",
								margin: "10px 5px",
								display: "inline-block",
								letterSpacing: "2px",
							}}
						>
							<Icon name='stopwatch' size='big' color='grey' />
							{recipe.readyInMinutes} MINUTES
						</p>
						<Icon
							name='like'
							className={hover}
							onMouseOver={() => setHover("red")}
							onMouseOut={() => setHover("")}
							color={
								JSON.parse(localStorage.getItem("likes") as string)?.[recipe.id]
									? "red"
									: "grey"
							}
							onClick={handleClick}
							style={{ cursor: "pointer", marginLeft: "10px" }}
							size='large'
						/>
						<span style={{ marginLeft: "10px", fontSize: "20px" }}>
							{recipe.likes}
						</span>
					</div>
					<div>
						<p style={{ fontSize: "22px", fontWeight: 600 }}>INGREDIENTS</p>
						{recipe.extendedIngredients.map((ing: any, i: number) => (
							<ul key={i} style={{ listStyleType: "none", paddingLeft: 0 }}>
								<li
									style={{ fontSize: "16px", margin: "5px 0", fontWeight: 800 }}
								>
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
			<p style={{ fontSize: "20px" }}>{recipe.instructions}</p>
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
