import React from "react";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Tours } from "../components/Tours";

export const Home = () => {
	return (
		<>
			<Header />
			<Banner />
			<Tours />
		</>
	);
};
