import React from "react";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { SvgButton } from "./Buttons/SvgButton";
import heart from "../assets/icons/Heart.svg";
import darkHeart from "../assets/icons/DarkHeart.svg";
import { Link, useLocation } from "react-router-dom";

type Props = {
	pathname: string;
};

const HeaderElement = styled.div<Props>`
	position: absolute;
	color: white;
	height: 80px;
	width: 100%;
	z-index: 4;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 80px;
	background-color: rgba(0, 0, 0, ${(props) => (props.pathname === "/" ? 0.4 : 1)});

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const LogoElement = styled.img`
	width: 230px;
	height: 32px;
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

export const Header: React.FC = () => {
	const { pathname } = useLocation();
	return (
		<HeaderElement pathname={pathname}>
			<Link to="/">
				<LogoElement src={logo} alt="Logo" />
			</Link>

			<NavigationElement>
				<ul>
					<li>Home</li>
					<li>Tours</li>
					<li>About</li>
					<li>Help</li>
				</ul>
			</NavigationElement>

			<div className="buttons">
				<Link to="/favourites">
					<SvgButton
						icon={pathname === "/" ? darkHeart : heart}
						dimensions="20px"
						bgColor={pathname === "/" ? false : true}
					/>
				</Link>
				<PrimaryButton width="160px" children="Sign in" />
			</div>
		</HeaderElement>
	);
};
