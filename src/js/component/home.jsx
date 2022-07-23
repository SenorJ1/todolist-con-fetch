import React, { useState, useEffect } from "react";
import { Todo } from "./todo.jsx";

const Home = () => {
	const [todos, setTodos] = useState([]);

	const [newTodo, setNewTodo] = useState("");

	const handleClick = async (newTodo) => {
		if (newTodo.label === "") return;
		var requestOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([...todos, newTodo]),
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/JavierSibilla",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));

		setTodos([...todos, newTodo]);
	};

	//const result = words.filter(word => word.length > 6);
	const eliminate = (index) => {
		const filteredTodos = todos.filter((newString, i) => i !== index);
		setTodos(filteredTodos);

		var requestOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(filteredTodos),
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/JavierSibilla",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/JavierSibilla",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result.msg) {
					return;
				} else {
					setTodos(result);
				}
			})
			.catch((error) => console.log("error", error));
	}, []);

	return (
		<div className="to-do text-center border border-danger">
			<div>
				<h1 id="title"> To-Do list</h1>

				<input
					className="rounded-start"
					placeholder="Agrega una tarea"
					onChange={(e) =>
						setNewTodo({ label: e.target.value, done: false })
					}
				/>

				<button
					className="rounded-end"
					onClick={() => handleClick(newTodo)}>
					<i className="fas fa-check"></i>
				</button>

				{todos.length > 0 ? (
					todos.map((todo, index) => {
						return (
							<Todo
								key={index}
								todo={todo}
								eliminate={eliminate}
								index={index}
							/>
						);
					})
				) : (
					<h1>No hay mas tareas</h1>
				)}
			</div>
		</div>
	);
};

export default Home;