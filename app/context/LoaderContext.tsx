"use client";
import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext({
	loader: false,
	showLoader: () => {},
	hideLoader: () => {},
});
export const LoaderContextProvider = (props: any) => {
	const [loader, setLoader] = useState(false);
	const showLoaderHandler = () => {
		setLoader(true);
	};
	const hideLoaderHandler = () => {
		setLoader(false);
	};
	const context = {
		loader: loader,
		showLoader: showLoaderHandler,
		hideLoader: hideLoaderHandler,
	};
	return (
		<LoaderContext.Provider value={context}>
			{props.children}
		</LoaderContext.Provider>
	);
};
export const useLoader = () => {
	const loaderCtx = useContext(LoaderContext);
	const show = () => {
		loaderCtx.showLoader();
	};

	const hide = () => {
		loaderCtx.hideLoader();
	};
	return {
		show,
		hide,
	};
};
export default LoaderContext;
