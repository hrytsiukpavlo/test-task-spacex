import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { SvgButton } from "./Buttons/SvgButton";
import darkHeart from "../assets/icons/DarkHeart.svg";
import trash from "../assets/icons/Delete.svg";
import { useLocation } from "react-router-dom";

type Props = {
	image: string;
	title: string;
	subtitle: string;
};

const CardWrapper = styled.div`
	width: 400px;
	height: 550px;
	border: 1px solid #d3eaff;
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 400px;
		height: 280px;
	}

	.description {
		margin-top: 30px;
		text-align: center;

		h4 {
			font-weight: 700;
			font-size: 24px;
			text-transform: uppercase;
		}

		p {
			font-family: "Lato", sans-serif;
			font-weight: 300;
			font-size: 24px;
			margin-top: 15px;
			color: #556b84;
		}
	}

	.buttons {
		margin-top: 65px;
		display: flex;
		justify-content: space-between;
	}
`;

export const Card: React.FC<Props> = ({ image, title, subtitle }) => {
	let location = useLocation();
	return (
		<CardWrapper>
			<img src={image} alt="Tour" />
			<div className="description">
				<h4>{title}</h4>
				<p>{subtitle}</p>
			</div>
			<div className="buttons">
				<PrimaryButton width="280px" children="Buy" />
				<SvgButton
					icon={location.pathname === "/" ? darkHeart : trash}
					altText="heart"
					dimensions="20px"
				/>
			</div>
		</CardWrapper>
	);
};
