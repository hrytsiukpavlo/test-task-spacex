import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Syne', sans-serif;
    scroll-behavior: smooth;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<>
		<Global />
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</>,
);
