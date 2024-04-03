"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define a type for your search result
interface Result {
	title: string;
	description: string;
	summary: string;
	wish: string;
	link: string;
}

// Define a type for the context value
interface ResultContextType {
	results: Result[];
	setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

// Create the context with an undefined default value
export const ResultContext = createContext<ResultContextType | undefined>(
	undefined
);

// Define a type for the provider props
interface ResultProviderProps {
	children: ReactNode;
}

// Create a provider component
export const ResultProvider: React.FC<ResultProviderProps> = ({ children }) => {
	const [results, setResults] = useState<Result[]>([]);

	return (
		<ResultContext.Provider value={{ results, setResults }}>
			{children}
		</ResultContext.Provider>
	);
};

// Custom hook to use the search context
export const useResult = (): ResultContextType => {
	const context = useContext(ResultContext);
	if (context === undefined) {
		throw new Error("useResult must be used within a ResultProvider");
	}
	return context;
};
