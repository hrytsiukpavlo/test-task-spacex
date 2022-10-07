import React, { useRef, useState } from "react";
import styled from "styled-components";
import Home1 from "../assets/Home1.jpg";
import Home2 from "../assets/Home2.jpg";
import Home3 from "../assets/Home3.jpg";
import { ReactComponent as DownArrow } from "../assets/icons/DownArrow.svg";
import { useLocation } from "react-router-dom";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
	path: any;
};

const BannerElement = styled.div<Props>`
	width: 100%;
	height: ${(props) => (props.path.pathname === "/favourites" ? "500px" : "740px")};
	background: rgba(0, 0, 0, 0.5) url(${(props) => props.path.pathname === "/favourites" && Home3});
	background-blend-mode: darken;
	background-position: ${(props) => props.path.pathname === "/favourites" && "top"};
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	.mySwiper {
		width: 100%;
		height: 100%;
		position: absolute;

		.swiper-wrapper {
			position: absolute;
			display: flex;

			.swiper-slide {
				img {
					width: 100vw;
					height: 740px;
					filter: brightness(50%);
				}
			}
		}

		.swiper-pagination {
			display: none;
		}
	}
`;

const SpanElement = styled.span<Props>`
	color: white;
	text-transform: uppercase;
	position: absolute;
	z-index: 5;
	top: ${(props) => (props.path.pathname === "/" ? "30%" : "50%")};
	font-size: 48px;
	font-style: normal;
	font-weight: 800;
	line-height: 58px;
`;

const YouSpanElement = styled(SpanElement)`
	font-size: 310px;
	top: 50%;
	color: white;
	position: absolute;
	z-index: 5;
	user-select: none;
`;

const DotsContainer = styled.div`
	position: absolute;
	display: flex;
	top: 30%;
	left: 41.5%;

	button {
		border: 1px solid white;
		background: transparent;
		color: white;
		border-radius: 100%;
		height: 24px;
		width: 24px;
		margin: 0 5px;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			cursor: pointer;
		}

		.carouselItem {
			width: 12px;
			height: 12px;
			background-color: white;
			border-radius: 100%;
		}

		.dot-active {
		}
	}
`;

const ScrollElement = styled.div`
	position: absolute;
	z-index: 5;
	color: white;
	bottom: 0;
	margin-bottom: 30px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	text-align: center;

	&:hover {
		cursor: pointer;
	}
`;

const SpanScrollElement = styled.div`
	font-family: "Lato", sans-serif;
	font-style: normal;
	font-weight: 300;
	font-size: 32px;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	-webkit-text-stroke: 0.5px black;
`;

SwiperCore.use([Pagination]);

export const Banner: React.FC = () => {
	const [slideIndex, setSlideIndex] = useState(1);
	let location = useLocation();
	const sliderRef = useRef(null) as any;
	const sliderItems = [1, 2, 3];

	const moveDot = (index: number) => {
		setSlideIndex(index);
	};
	return (
		<BannerElement path={location}>
			{location.pathname === "/" ? (
				<>
					<Swiper
						pagination={{
							clickable: true,
						}}
						onSwiper={(swiper) => {
							sliderRef.current = swiper;
						}}
						className="mySwiper"
					>
						<SwiperSlide>
							<img src={Home1} alt="Banner" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={Home2} alt="Banner" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={Home3} alt="Banner" />
						</SwiperSlide>
					</Swiper>
					<SpanElement path={location}>The space is waiting for</SpanElement>
					<YouSpanElement path={location}>
						<span>You</span>
						<DotsContainer>
							{sliderItems.map((it, index) => {
								return (
									<button
										key={it}
										className={slideIndex === index + 1 ? "dot-active" : "dot"}
										onClick={() => {
											sliderRef.current?.slideTo(it - 1);
											moveDot(index + 1);
										}}
									>
										<div className={slideIndex === index + 1 ? "carouselItem" : ""}></div>
									</button>
								);
							})}
						</DotsContainer>
					</YouSpanElement>
					<ScrollElement onClick={() => window.location.replace("/#tours")}>
						<SpanScrollElement>Explore tours</SpanScrollElement>
						<DownArrow />
					</ScrollElement>
				</>
			) : (
				<SpanElement path={location}>Favourites</SpanElement>
			)}
		</BannerElement>
	);
};
