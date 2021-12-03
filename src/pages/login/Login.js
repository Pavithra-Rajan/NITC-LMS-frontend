import sigINImng from "./signIN.jpg";
import sigUPImng from "./signUP.jpg";
import "./Login.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import BookLoaderComponent from "../../components/Loaders/BookLoader";
import { AuthContext } from "../../AuthContext";

const SignUP = ({ toggleForm }) => {
	const [selectedOption, setSelectedOption] = useState(null);
	const initialData = {
		userID: null,
		userName: null,
		password: null,
		phoneNo: null,
		email: null,
		dept: null,
		role: null,
		programme: null,
		validity: null,
		tFlag: null,
	};
	const [data, setData] = useState(initialData);
	const [error, setError] = useState(null);
	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setData({ ...data, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);
		axios({
			method: "post",
			url: "/auth/register",
			data: data,
		})
			.then((resp) => {
				return <SignIN />;
			})
			.catch((err) => {
				setError(err.response);
			});
	};
	return (
		<div className='user signupBx'>
			<div className='formBx'>
				<form action=''>
					<h2>Registration</h2>
					<input
						type='text'
						minLength='9'
						maxLength='9'
						name='userID'
						placeholder='Roll Number/Employee ID'
						value={data.userID}
						onChange={(e) => {
							e.target.value = e.target.value.toUpperCase();
							handleChange(e);
						}}
						required
					/>
					<input
						onChange={handleChange}
						type='text'
						name='userName'
						placeholder='Username'
						required
					/>
					<input
						onChange={handleChange}
						type='password'
						name='password'
						placeholder='Password'
						required
					/>
					<input
						onChange={handleChange}
						type='tel'
						minLength='10'
						maxLength='10'
						name='phoneNo'
						placeholder='Phone'
						required
					/>
					<input
						onChange={handleChange}
						type='email'
						name='email'
						placeholder='Email Address'
						required
					/>

					<select
						name='role'
						onChange={(e) => {
							handleChange(e);
							setSelectedOption(e.target.value);
						}}
						required
					>
						<option selected>Role</option>
						<option value='student'>Student</option>
						<option value='librarian'>Librarian</option>
						<option value='staff'>Staff</option>
					</select>

					<br />
					{selectedOption === "student" && (
						<div>
							<input
								onChange={handleChange}
								name='dept'
								placeholder='Department'
								list='dept'
								required
							/>
							<datalist id='dept'>
								<option>Department of Architecture</option>
								<option>Department of Chemical Engineering</option>
								<option>Department of Chemistry</option>
								<option>Department of Civil Engineering</option>
								<option>Department of Computer Science and Engineering</option>
								<option>Department of Electrical Engineering</option>
								<option>
									Department of Electronics and Communication Engineering
								</option>
								<option>Department of Mathematics</option>
								<option>Department of Mechanical Engineering</option>
								<option>Department of Physics</option>
								<option>School of Bio-technology</option>
								<option>School of Management Studies</option>
								<option>School of Nano Science and Technology</option>
							</datalist>
							<input
								onChange={handleChange}
								name='programme'
								placeholder='Programme'
								list='prog'
								required
							/>
							<datalist id='prog'>
								<option>B.Tech</option>
								<option>M.Tech</option>
								<option>Ph.D.</option>
								<option>MSc</option>
								<option>MCA</option>
							</datalist>
							<input
								onChange={handleChange}
								id='validity'
								placeholder='validity'
								type='date'
								class='required'
								name='validity'
								required
							/>
						</div>
					)}

					{selectedOption === "staff" && (
						<div>
							<input
								onChange={handleChange}
								name='dept'
								placeholder='Department'
								list='dept'
								required
							/>
							<datalist id='dept'>
								<option>Department of Architecture</option>
								<option>Department of Chemical Engineering</option>
								<option>Department of Chemistry</option>
								<option>Department of Civil Engineering</option>
								<option>Department of Computer Science and Engineering</option>
								<option>Department of Electrical Engineering</option>
								<option>
									Department of Electronics and Communication Engineering
								</option>
								<option>Department of Mathematics</option>
								<option>Department of Mechanical Engineering</option>
								<option>Department of Physics</option>
								<option>School of Bio-technology</option>
								<option>School of Management Studies</option>
								<option>School of Nano Science and Technology</option>
							</datalist>
							<input
								onChange={handleChange}
								name='tFlag'
								placeholder='Teaching/Non-Teaching'
								list='Tflag'
								required
							/>
							<datalist id='Tflag'>
								<option>Teaching</option>
								<option>Non-teaching</option>
							</datalist>
						</div>
					)}

					<input
						type='submit'
						onClick={handleSubmit}
						name=''
						value='Register'
					/>
					{error && (
						<Alert variant='filled' severity='error'>
							{error}
						</Alert>
					)}
					<p className='signup'>
						Already have an account ?
						<a href='#' onClick={toggleForm}>
							Log In.
						</a>
					</p>
				</form>
			</div>
			<div className='imgBx'>
				<img src={sigUPImng} alt='' />
			</div>
		</div>
	);
};

const SignIN = ({ toggleForm }) => {
	const initialData = {
		userID: "",
		password: "",
	};
	const [data, setData] = useState(initialData);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setData({ ...data, [name]: value });
	};
	const handleSubmit = (e) => {
		setIsLoading(true);
		e.preventDefault();
		axios({
			method: "post",
			url: "/auth/login",
			data: data,
		})
			.then((resp) => {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
				console.log(resp);
				const userLoggedIn = resp.data;
				if (userLoggedIn) {
					localStorage.setItem("user", JSON.stringify(userLoggedIn));
					if (userLoggedIn.admin) history.push("/admin");
					else history.push("/dashboard");
				}
			})
			.catch((err) => {
				if (!err.response) {
					history.push("/error");
				} else {
					if (err.response.data) {
						console.log(err.response.data.message);
					} else {
						console.log(err.response);
					}
				}
				// console.log(err.response.data.message);
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			});
	};
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent home />
			) : (
				<div className='user signinBx'>
					<div className='imgBx'>
						<img src={sigINImng} alt='' />
					</div>
					<div className='formBx'>
						<form action=''>
							<h2>Log In</h2>
							<input
								type='text'
								minLength='9'
								maxLength='9'
								name='userID'
								value={data.userID}
								onChange={(e) => {
									e.target.value = e.target.value.toUpperCase();
									handleChange(e);
								}}
								placeholder='Roll Number/Employee ID'
							/>
							<input
								type='password'
								name='password'
								value={data.password}
								onChange={handleChange}
								placeholder='Password'
							/>
							<input
								type='submit'
								onClick={handleSubmit}
								name=''
								value='Login'
							/>
							{error && (
								<Alert variant='filled' severity='error'>
									{error}
								</Alert>
							)}
							<p className='signup'>
								Don't have an account?
								<a href='#' onClick={toggleForm}>
									Register.
								</a>
							</p>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

const Login = () => {
	const toggleForm = () => {
		const container = document.querySelector(".container");
		container.classList.toggle("active");
	};
	return (
		<section>
			<div className='container'>
				<SignIN toggleForm={toggleForm} />
				<SignUP toggleForm={toggleForm} />
			</div>
		</section>
	);
};

export default Login;
