import React from "react";
import styled from "styled-components";

type Props = {
	width: string;
	children: string;
};

const PrimaryButtonElement = styled.div<Props>`
	width: ${(props) => props.width};
	height: 40px;
	background-color: #d3eaff;
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: black;
	font-style: normal;
	font-weight: 600;
	font-size: 22px;
	text-transform: uppercase;
	margin-right: 20px;

	&:hover {
		cursor: pointer;
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const PrimaryButton: React.FC<Props> = ({ width, children }) => {
	return <PrimaryButtonElement width={width}>{children}</PrimaryButtonElement>;
};
