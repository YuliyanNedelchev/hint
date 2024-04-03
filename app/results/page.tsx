"use client";
import React from "react";
import { useResult } from "../../context/ResultsContext";
import { Box, Card, CardContent, Typography } from "@mui/material";

const Results = () => {
	const { results } = useResult();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{results.map((result, index) => (
				<Card sx={{ marginBottom: 5, width: "60%" }} key={index}>
					<CardContent>
						<Typography variant="h4">{result.title}</Typography>
						<Typography>
							Description: {result.description}
						</Typography>
						<Typography>Summary: {result.summary}</Typography>
						<Typography>Wish: {result.wish}</Typography>
						<a href={result.link}>Link</a>
					</CardContent>
				</Card>
			))}
		</Box>
	);
};

export default Results;
