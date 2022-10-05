import React from "react";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { SvgButton } from "./Buttons/SvgButton";
import heart from "../assets/Heart.svg";
import darkHeart from "../assets/DarkHeart.svg";

type Props = {
	isHome: boolean;
};

const HeaderElement = styled.div<Props>`
	position: absolute;
	color: white;
	height: 80px;
	width: 100%;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 80px;
	background-color: rgba(0, 0, 0, ${(props) => (props.isHome ? 0.4 : 1)});

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const LogoElement = styled.img`
	&:hover {
		cursor: pointer;
	}
`;

const NavigationElement = styled.nav`
	ul {
		display: flex;
		list-style: none;

		li {
			margin: 0 32px;
			font-family: "Lato", sans-serif;
			font-weight: 500;
			font-size: 16px;
			text-transform: uppercase;

			&:hover {
				cursor: pointer;
			}

			&:after {
				display: block;
				content: "";
				border-bottom: 1px solid white;
				transform: scaleX(0);
				transform-origin: 0%;
				transition: transform 0.5s ease-in-out;
			}

			&:hover:after {
				transform: scaleX(1);
				transform-origin: 0%;
			}
		}
	}
`;

export const Header: React.FC<Props> = ({ isHome }) => {
	return (
		<HeaderElement isHome={isHome}>
			<LogoElement src={logo} alt="Logo" />
			{isHome && (
				<NavigationElement>
					<ul>
						<li>Home</li>
						<li>Tours</li>
						<li>About</li>
						<li>Help</li>
					</ul>
				</NavigationElement>
			)}
			<div className="buttons">
				<SvgButton
					icon={isHome ? darkHeart : heart}
					altText="heart"
					dimensions="20px"
					bgColor={!isHome}
				/>
				<PrimaryButton width="160px" children="Sign in" />
			</div>
		</HeaderElement>
	);
};
