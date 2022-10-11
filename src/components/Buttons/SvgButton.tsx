import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { favItemsState } from "../../state";
import { ICard } from "../../state";

type Props = {
	icon: string;
	dimensions: string;
	bgColor?: boolean;
	enabled?: boolean;
	image?: string;
	title?: string;
	subtitle?: string;
	id?: string;
	pathname?: string;
	favItems?: ICard[];
};

const SvgButtonElement = styled.div<Props>`
	width: 40px;
	height: 40px;
	background-color: ${(props) =>
		props.pathname === "/"
			? props?.favItems?.find((el: ICard) => el.id === props.id)
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
	const { pathname } = useLocation();
	const setFavsItem = useSetRecoilState(favItemsState);
	const [items, setItems] = useRecoilState(favItemsState);

	function handleFavClick(image: string, title: string, subtitle: string, id: string) {
		setFavsItem((oldFavs) => {
			return [...oldFavs, { image, title, subtitle, id }];
		});
	}

	function handleDelClick() {
		const newItems = items.filter((item) => item.id !== id);
		setItems(newItems);
	}

	const favItems = useRecoilValue<ICard[]>(favItemsState);

	return (
		<SvgButtonElement
			pathname={pathname}
			id={id}
			favItems={favItems}
			dimensions={dimensions}
			icon={icon}
			bgColor={bgColor}
			onClick={
				pathname === "/"
					? enabled
						? () =>
								favItems.find((el: ICard) => el.id === id)
									? handleDelClick()
									: handleFavClick(
											image as string,
											title as string,
											subtitle as string,
											id as string,
									  )
						: () => null
					: () => handleDelClick()
			}
		>
			<img src={icon} alt={pathname === "/" ? "heart" : "delete"} />
		</SvgButtonElement>
	);
};
