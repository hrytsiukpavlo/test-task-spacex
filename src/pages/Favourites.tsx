import React from "react";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { Tours } from "../components/Tours";

export const Favourites = () => {
	return (
		<>
			<Header isHome={false} />
			<Banner isHome={false} />
			<Tours isHome={false} />
		</>
	);
};
