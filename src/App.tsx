import React from "react";
import { Routes, Route } from "react-router-dom";
import { Favourites } from "./pages/Favourites";
import { Home } from "./pages/Home";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favourites" element={<Favourites />} />
				<Route path="*" element={<div>Not found</div>} />
			</Routes>
		</>
	);
}

export default App;
