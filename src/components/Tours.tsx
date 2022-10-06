import React from "react";
import styled from "styled-components";
import { SvgButton } from "./Buttons/SvgButton";
import arrowLeft from "../assets/icons/LeftArrow.svg";
import arrowRight from "../assets/icons/RightArrow.svg";
import { useLocation } from "react-router-dom";
import { Card } from "./Card";
import card1 from "../assets/Home1.jpg";
import card2 from "../assets/Home2.jpg";
import card3 from "../assets/Home3.jpg";

type Props = {
	path: any;
};

const CardsContainer = styled.div<Props>`
	width: 100%;
	height: 720px;
	margin: 100px 0;
	padding: 0 70px;

	.header {
		display: flex;
		justify-content: ${(props) => (props.path.pathname === "/" ? "space-between" : "flex-end")};

		h1 {
			font-style: normal;
			font-weight: 800;
			font-size: 32px;
			text-transform: uppercase;
		}

		.sliderButtons {
			display: flex;
			justify-content: space-between;
		}

		.clearButton {
			font-family: "Lato", sans-serif;
			font-weight: 300;
			font-size: 24px;
			border: 0;
			background-color: transparent;
			color: #556b84;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.cards {
		margin: 40px 0;
		display: flex;
		justify-content: space-between;
	}

	.circles {
		display: flex;
		justify-content: center;

		div {
			border: 1px solid black;
			width: 24px;
			height: 24px;
			border-radius: 100%;
			margin-right: 10px;
		}
	}
`;

export const Tours: React.FC = () => {
	let location = useLocation();
	return (
		<CardsContainer path={location} id="tours">
			{location.pathname === "/" ? (
				<div className="header">
					<h1>Popular tours</h1>
					<div className="sliderButtons">
						<SvgButton icon={arrowLeft} altText="arrow" dimensions="24px" />
						<SvgButton icon={arrowRight} altText="arrow" dimensions="24px" />
					</div>
				</div>
			) : (
				<div className="header">
					<button className="clearButton">Clear all</button>
				</div>
			)}
			<div className="cards">
				{location.pathname === "/" ? (
					<>
						<Card image={card1} altText="Tour" />
						<Card image={card2} altText="Tour" />
						<Card image={card3} altText="Tour" />
					</>
				) : (
					<Card image={card1} altText="Tour" />
				)}
			</div>
			{location.pathname === "/" && (
				<div className="circles">
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
		</CardsContainer>
	);
};
