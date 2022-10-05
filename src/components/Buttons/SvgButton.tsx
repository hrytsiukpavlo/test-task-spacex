import React from "react";
import styled from "styled-components";

type Props = {
	icon: string;
	altText: string;
	dimensions: string;
	bgColor?: boolean;
};

const SvgButtonElement = styled.div<Props>`
	width: 40px;
	height: 40px;
	background-color: ${(props) => (props.bgColor ? "#DD377D" : "#ececec")};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 15px;

	img {
		width: ${(props) => props.dimensions} !important;
		height: ${(props) => props.dimensions} !important;
	}

	&:hover {
		cursor: pointer;
	}
`;

export const SvgButton: React.FC<Props> = ({ icon, altText, dimensions, bgColor }) => {
	return (
		<>
			<SvgButtonElement dimensions={dimensions} icon={icon} altText={altText} bgColor={bgColor}>
				<img src={icon} alt={altText} />
			</SvgButtonElement>
		</>
	);
};
