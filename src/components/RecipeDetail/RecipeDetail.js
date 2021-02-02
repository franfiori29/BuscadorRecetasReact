import React, { useEffect, useState } from "react";
import "./RecipeDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { setDetailLikes, getDetailLikes } from "../../actions";
import axios from "axios";
import { Icon, Label, List } from "semantic-ui-react";
import "./RecipeDetail.css";
import { Link } from "react-router-dom";

export default function RecipeDetail({ id, recipe }) {
	const dispatch = useDispatch();
	const detail = useSelector((state) => state.recipeDetail.details);

	const [hover, setHover] = useState("");

	useEffect(() => {
		axios.get("http://localhost:4000").then((data) => {
			dispatch({ type: "GET_ASIDE", payload: data.data });
		});
		typeof detail.likes === "number" ||
			axios.get(`http://localhost:4000/${id}`).then((res) => {
				dispatch(getDetailLikes(res.data));
			});
	}, [detail]);

	const handleClick = async () => {
		try {
			const likes = JSON.parse(localStorage.getItem("likes"));
			if (likes[recipe.id]) delete likes[recipe.id];
			else likes[recipe.id] = true;
			localStorage.setItem("likes", JSON.stringify(likes));

			let like = JSON.parse(localStorage.getItem("likes"))[recipe.id];
			dispatch(
				setDetailLikes(
					JSON.stringify({
						id: recipe.id,
						title: recipe.title,
						image: recipe.image,
						likes: like ? 1 : 0,
					})
				)
			);
		} catch (err) {
			console.log(err);
		}
	};

	if (Object.keys(recipe).length < 4) {
		<h1>Loading</h1>;
	}

	return (
		<div
			style={{
				textAlign: "center",
				width: "80%",
				margin: "0 auto",
				position: "relative",
			}}
		>
			<Link to='/recipes'>
				<Icon
					color='black'
					style={{ position: "absolute", left: "10px" }}
					name='arrow left'
					size='big'
				/>
			</Link>
			<h1 style={{ fontSize: "40px" }}>{recipe.title}</h1>
			{recipe &&
				recipe.diets.map((rec, i) => (
					<Label color='teal' key={i}>
						{rec.toUpperCase()}
					</Label>
				))}{" "}
			<br />
			<div style={{ display: "flex", flexWrap: "wrap", margin: "20px 0" }}>
				<img style={{ flex: 1, maxWidth: "100%" }} src={recipe.image} alt='' />
				<List
					style={{
						fontSize: "15px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						flex: 1,
					}}
				>
					<List.Header
						content='INGREDIENTS'
						style={{ fontWeight: "700", fontSize: "30px", margin: "50px 0" }}
					/>
					{recipe.extendedIngredients.map((ing, i) => (
						<List.Item key={i} style={{ fontSize: "20px", margin: "5px 0" }}>
							<List.Header>{ing.original.toUpperCase()}</List.Header>
						</List.Item>
					))}
				</List>{" "}
				<br />
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
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
							JSON.parse(localStorage.getItem("likes"))[recipe.id] ? "red" : ""
						}
						onClick={handleClick}
						style={{ cursor: "pointer" }}
						size='big'
					/>
					<span style={{ fontSize: "30px" }}>{recipe.likes}</span>
				</div>
			</div>
			<p
				id='chart'
				style={{ fontSize: "20px" }}
				// dangerouslySetInnerHTML={{ __html: `${recipe.summary}` }}
			></p>
			{recipe.instructions && <h1>INSTRUCTIONS</h1>}
			<p style={{ fontSize: "20px" }}>{recipe.instructions}</p>
			{/* <List bulleted style={{ fontSize: '15px' }}>
                <List.Header />
                {recipe.extendedIngredients.map(ing => (
                    <List.Item>{ing.original.toUpperCase()}</List.Item>
                ))}
            </List> */}
		</div>
	);
}
