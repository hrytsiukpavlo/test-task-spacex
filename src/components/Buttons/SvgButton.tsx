import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { favItemsState } from "../../state";

type Props = {
	icon: string;
	dimensions: string;
	bgColor?: boolean;
	enabled?: boolean;
	image?: string;
	title?: string;
	subtitle?: string;
	id?: number;
	path?: any;
	favItems?: any;
};

const SvgButtonElement = styled.div<Props>`
	width: 40px;
	height: 40px;
	background-color: ${(props) =>
		props.path.pathname === "/"
			? props.favItems.find((el: any) => el.id === props.id)
				? "#DD377D"
				: "#ececec"
			: props.bgColor
			? "#DD377D"
			: "#ececec"};
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

export const SvgButton: React.FC<Props> = ({
	icon,
	dimensions,
	bgColor,
	enabled,
	image,
	title,
	subtitle,
	id,
}) => {
	let location = useLocation();
	const setFavsItem = useSetRecoilState(favItemsState);
	const [items, setItems] = useRecoilState(favItemsState);
	function handleFavClick(image: string, title: string, subtitle: string, id: number) {
		setFavsItem((oldFavs) => {
			return [...oldFavs, { image, title, subtitle, id }];
		});
	}
	function handleDelClick() {
		const newItems = items.filter((item) => item.id !== id);
		setItems(newItems);
	}
	const favItems = useRecoilValue<any>(favItemsState);
	return (
		<SvgButtonElement
			path={location}
			id={id as any}
			favItems={favItems}
			dimensions={dimensions}
			icon={icon}
			bgColor={bgColor}
			onClick={
				location.pathname === "/"
					? enabled
						? () =>
								handleFavClick(image as string, title as string, subtitle as string, id as number)
						: () => null
					: () => handleDelClick()
			}
		>
			<img src={icon} alt={location.pathname === "/" ? "heart" : "delete"} />
		</SvgButtonElement>
	);
};
