import React, { useRef } from "react";
import styled from "styled-components";
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
		margin-bottom: 40px;
		display: flex;
		justify-content: space-between;
		position: relative;

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
				// background-color: black;
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
`;

export const Tours: React.FC = () => {
	const { loading, error, data } = useQuery(ALL_HISTORIES);
	if (error) {
		console.log(error);
	}
	let location = useLocation();
	const sliderRef = useRef(null) as any;
	return (
		<CardsContainer path={location} id="tours">
			{location.pathname === "/" ? (
				<div className="header">
					<h1>Popular tours</h1>
					<div className="sliderButtons">
						<div onClick={() => sliderRef.current.slidePrev()}>
							<SvgButton icon={arrowLeft} altText="arrow" dimensions="24px" />
						</div>

						<div onClick={() => sliderRef.current.slideNext()}>
							<SvgButton icon={arrowRight} altText="arrow" dimensions="24px" />
						</div>
					</div>
				</div>
			) : (
				<div className="header">
					<button className="clearButton">Clear all</button>
				</div>
			)}
			<div className="cards">
				{location.pathname === "/" ? (
					loading ? (
						<span>Loading...</span>
					) : (
						<>
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
								{data.histories.map((_: any, index: number) => {
									if (data.histories[index].flight?.links.flickr_images.length > 0) {
										return (
											<SwiperSlide key={data.histories[index].id}>
												<Card
													image={data.histories[index].flight.links.flickr_images[0]}
													title={data.histories[index].title}
													subtitle={data.histories[index].flight.mission_name}
												/>
											</SwiperSlide>
										);
									}
								})}
							</Swiper>
						</>
					)
				) : (
					<Card
						image={data.histories[1].flight.links.flickr_images[0]}
						title="123"
						subtitle="123"
					/>
				)}
			</div>
		</CardsContainer>
	);
};
