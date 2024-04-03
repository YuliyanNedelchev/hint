"use client";

import React, { useContext } from "react";
import MyForm from "../components/MyForm";
import LoaderContext from "../context/LoaderContext";
import AppLoader from "@/components/AppLoader";

const App = () => {
	const loaderCtx = useContext(LoaderContext);

	return (
		<>
			{console.log(loaderCtx.loader)}
			<MyForm />
			{loaderCtx.loader && <AppLoader />}
		</>
	);
};

export default App;
