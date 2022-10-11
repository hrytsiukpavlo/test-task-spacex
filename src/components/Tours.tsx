import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { SvgButton } from "./Buttons/SvgButton";
import arrowLeft from "../assets/icons/LeftArrow.svg";
import arrowRight from "../assets/icons/RightArrow.svg";
import { useLocation } from "react-router-dom";
import { Card } from "./Card";
import { useQuery } from "@apollo/client";
import { ALL_HISTORIES } from "../apollo/histories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { favItemsState } from "../state";
import { useRecoilState, useRecoilValue } from "recoil";
import { ICard } from "../state";

type Props = {
	pathname: string;
	favItems: ICard[];
};

type Flight = {
	links: {
		flickr_images: string[];
	};
	mission_name: string;
};

type Histories = {
	flight: Flight;
	id: string;
	title: string;
};

type SpacexData = {
	histories: Array<Histories>;
};

const CardsContainer = styled.div<Props>`
	width: 100%;
	height: 720px;
	margin: 100px 0;
	padding: 0 70px;

	.header {
		display: flex;
		justify-content: ${(props) =>
			props.pathname === "/" ? "space-between" : props.favItems.length > 0 ? "flex-end" : "center"};

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
		margin-bottom: 40px;
		position: relative;
		display: grid;
		justify-items: center;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: auto;
		grid-gap: 1rem;

		${(props) =>
			props.pathname === "/" &&
			css`
				display: flex;
				flex-wrap: "nowrap";
				justify-content: space-between;
			`}

		.mySwiper {
			height: 700px;
		}

		.swiper-slide {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.swiper-pagination {
			display: flex;
			align-items: center;
			justify-content: center;

			.swiper-pagination-bullet {
				border: 1px solid black;
				background: transparent;
				height: 24px;
				width: 24px;
				opacity: 1;

				&:hover {
					cursor: pointer;
				}
			}

			.swiper-pagination-bullet-active {
				width: 24px;
				height: 24px;
				padding: 10px;

				&:after {
					content: "";
					position: absolute;
					width: 12px;
					height: 12px;
					border-radius: 50%;
					background-color: black;
					transform: translate(-50%, -40%);
				}
			}
		}
	}

	.cards > div {
		margin-top: ${(props) => (props.pathname === "/" ? "0" : "40px")};
	}
`;

export const Tours: React.FC = () => {
	const { loading, error, data } = useQuery<SpacexData>(ALL_HISTORIES);

	if (error) {
		console.log(error);
	}

	const { pathname } = useLocation();
	const sliderRef = useRef(null) as any;
	const favItems = useRecoilValue<ICard[]>(favItemsState);
	const [items, setItems] = useRecoilState(favItemsState);

	function handleClearClick() {
		setItems([]);
	}

	return (
		<CardsContainer pathname={pathname} id="tours" favItems={favItems}>
			{pathname === "/" ? (
				<div className="header">
					<h1>Popular tours</h1>
					<div className="sliderButtons">
						<div onClick={() => sliderRef.current.slidePrev()}>
							<SvgButton icon={arrowLeft} dimensions="24px" enabled={false} />
						</div>

						<div onClick={() => sliderRef.current.slideNext()}>
							<SvgButton icon={arrowRight} dimensions="24px" enabled={false} />
						</div>
					</div>
				</div>
			) : (
				<div className="header">
					{favItems.length > 0 ? (
						<button className="clearButton" onClick={handleClearClick}>
							Clear all
						</button>
					) : (
						<span>No favourites</span>
					)}
				</div>
			)}
			<div className="cards">
				{pathname === "/" ? (
					loading ? (
						<span>Loading...</span>
					) : (
						<>
							{console.log(data)}
							<Swiper
								slidesPerView={3}
								slidesPerGroup={3}
								loop={true}
								pagination={{
									clickable: true,
								}}
								modules={[Pagination]}
								className="mySwiper"
								onSwiper={(swiper) => {
									sliderRef.current = swiper;
								}}
							>
								{data?.histories.map((item: Histories) => {
									if (item && item?.flight?.links.flickr_images.length > 0) {
										return (
											<SwiperSlide key={item.id}>
												<Card
													image={item?.flight.links.flickr_images[0]}
													title={item.title}
													subtitle={item?.flight.mission_name}
													id={item.id}
												/>
											</SwiperSlide>
										);
									}
									return null;
								})}
							</Swiper>
						</>
					)
				) : (
					<>
						{favItems.map((el: ICard) => (
							<Card
								image={el.image}
								title={el.title}
								subtitle={el.subtitle}
								id={el.id}
								key={el.id}
							/>
						))}
					</>
				)}
			</div>
		</CardsContainer>
	);
};
