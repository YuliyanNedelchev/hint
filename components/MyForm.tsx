"use client";

import React from "react";
import { Formik, Form } from "formik";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from "../app/page.module.css";
import { useRouter } from "next/navigation";
import { useResult } from "../app/context/ResultsContext";
import { useLoader } from "@/app/context/LoaderContext";

interface FormValues {
	country: string;
	budget: string;
	gender: string;
	occasion: string;
	interest: string[];
	additionalInfo: string;
	date: Date | null;
}

const initialValues: FormValues = {
	country: "",
	budget: "",
	gender: "",
	occasion: "",
	interest: [],
	additionalInfo: "",
	date: null,
};

const MyForm = () => {
	const router = useRouter();
	const { setResults } = useResult();
	const loader = useLoader();

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(false);

					loader.show();
					const response = await fetch("/api", {
						method: "POST",
						body: JSON.stringify(values),
					});
					const results = await response.json();
					setResults(results);
					loader.hide();
					router.push(`/results`);
				}}
			>
				{({ values, handleChange, setFieldValue, handleSubmit }) => (
					<Box className={styles.wrapper}>
						<Form className={styles.container}>
							<TextField
								select
								label="Country"
								name="country"
								value={values.country}
								onChange={handleChange}
								fullWidth
							>
								<MenuItem value="bulgaria">Bulgaria</MenuItem>
								<MenuItem value="england">England</MenuItem>
								<MenuItem value="germany">Germany</MenuItem>
							</TextField>

							<TextField
								fullWidth
								select
								label="Budget"
								name="budget"
								value={values.budget}
								onChange={handleChange}
							>
								<MenuItem value="1-100">$1-100</MenuItem>
								<MenuItem value="100-500">$100-500</MenuItem>
								<MenuItem value="500+">$500+</MenuItem>
							</TextField>

							<TextField
								fullWidth
								select
								label="Gender"
								name="gender"
								value={values.gender}
								onChange={handleChange}
							>
								<MenuItem value="male">Male</MenuItem>
								<MenuItem value="female">Female</MenuItem>
								<MenuItem value="other">Other</MenuItem>
							</TextField>

							<TextField
								fullWidth
								select
								label="Occasion"
								name="occasion"
								value={values.occasion}
								onChange={handleChange}
							>
								{[
									"Birthday",
									"Wedding",
									"Graduation",
									"Anniversary",
									"Christmas",
									"Valentine's day",
									"Mother's day",
									"Father's day",
								].map((occasion) => (
									<MenuItem key={occasion} value={occasion}>
										{occasion}
									</MenuItem>
								))}
							</TextField>

							<DatePicker
								label="Select Date"
								value={values.date}
								sx={{ width: "100%" }}
								onChange={(value) =>
									setFieldValue("date", value)
								}
								renderInput={(params) => (
									<TextField {...params} />
								)}
							/>
							<FormControl fullWidth>
								<InputLabel id="interests-label">
									Interests
								</InputLabel>
								<Select
									labelId="interest-label"
									fullWidth
									multiple
									id="interest"
									name="interest"
									label="Interests"
									value={values.interest}
									onChange={handleChange}
								>
									{[
										"Reading",
										"Traveling",
										"Cooking",
										"Gardening",
										"Photography",
										"Painting",
										"Writing",
										"Cycling",
										"Hiking",
										"Gaming",
										"Music",
										"Dancing",
										"Yoga",
										"Meditation",
										"Knitting",
										"DIY Projects",
										"Surfing",
										"Rock Climbing",
										"Astronomy",
										"Bird Watching",
										"Collecting",
										"Fashion Design",
										"Baking",
										"Filmmaking",
										"Podcasting",
										"Volunteering",
										"Language Learning",
										"Martial Arts",
										"Chess",
										"Stand-up Comedy",
									].map((interest) => (
										<MenuItem
											key={interest}
											value={interest}
										>
											{interest}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								fullWidth
								label="Additional Information"
								name="additionalInfo"
								multiline
								rows={4}
								value={values.additionalInfo}
								onChange={handleChange}
							/>

							<Button
								variant="contained"
								onClick={() => handleSubmit()}
							>
								Submit
							</Button>
						</Form>
					</Box>
				)}
			</Formik>
		</LocalizationProvider>
	);
};

export default MyForm;
