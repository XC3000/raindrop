/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../components/login/loginform.css";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../axios/instance";
import qs from "qs";

export default function WaitlistRegister({ setFlag }) {
	const [loading, setLoading] = useState(false);

	const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
		useFormik({
			initialValues: { firstname: "", lastname: "", email: "" },
			validationSchema: Yup.object({
				firstname: Yup.string().required("First name is required."),
				email: Yup.string().email().required("Email is required"),
			}),
			async onSubmit(values) {
				// console.log(values, errors);
				setLoading(!loading);
				const res = await API.post(
					"Raindrop/administration.php?apicall=raindropwaitlist",
					qs.stringify(values),
				);
				console.log(res);
				if (res?.data?.E) {
					setLoading(!loading);
					console.log(res?.data?.E);
				} else {
					setLoading(!loading);
					setFlag(true);
				}
			},
		});

	return (
		<div className="formBody">
			<div className="input__container">
				<div className="login--text">Register</div>
				<div className="form--inputs">
					<label>First name</label>
					<br />
					<input
						type="text"
						name="firstname"
						value={values.firstname}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</div>
				{/* ----------------------------error--------------------- */}
				<div
					style={{
						color: "#ff5238",
						fontSize: "12px",
						lineHeight: "2px",
						marginTop: "3px",
					}}
				>
					{" "}
					{touched.firstname && errors.firstname ? errors.firstname : null}
				</div>
				<div className="form--inputs">
					<label>Last Name</label>
					<br />
					<input
						type="text"
						name="lastname"
						value={values.lastname}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</div>
				<div className="form--inputs">
					<label>Email</label>
					<br />
					<input
						type="email"
						name="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</div>
				{/* ----------------------------error--------------------- */}
				<div
					style={{
						color: "#ff5238",
						fontSize: "12px",
						lineHeight: "2px",
						marginTop: "3px",
					}}
				>
					{" "}
					{touched.email && errors.email ? errors.email : null}
				</div>

				<div className="login__button">
					<Button type="submit" onClick={handleSubmit}>
						Register{" "}
						{loading && (
							<CircularProgress
								color={"white"}
								size={15}
								style={{ marginLeft: "8px" }}
							/>
						)}
					</Button>
				</div>
			</div>
			<div className="formBody__footer">
				Have an account?{" "}
				<span className="register-now">
					<Link to="/login">Login</Link>
				</span>
			</div>
		</div>
	);
}
