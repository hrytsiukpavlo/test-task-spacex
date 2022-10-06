import React from "react";
import styled from "styled-components";
import imgHome from "../assets/Home1.jpg";
import imgFavourites from "../assets/Home3.jpg";
import { ReactComponent as DownArrow } from "../assets/DownArrow.svg";
import { useLocation } from "react-router-dom";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
	path: any;
};

const BannerElement = styled.div<Props>`
	width: 100%;
	height: ${(props) => (props.path.pathname === "/" ? "740px" : "500px")};
	background: rgba(0, 0, 0, 0.5)
		url(${(props) => (props.path.pathname === "/" ? imgHome : imgFavourites)});
	background-blend-mode: darken;
	background-position: ${(props) => (props.path.pathname === "/" ? "center" : "top")};
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SpanElement = styled.span<Props>`
	color: white;
	text-transform: uppercase;
	position: absolute;
	top: ${(props) => (props.path.pathname === "/" ? "30%" : "50%")};
	font-size: 48px;
	font-style: normal;
	font-weight: 800;
	line-height: 58px;
`;

const YouSpanElement = styled(SpanElement)`
	font-size: 310px;
	top: 50%;
`;

const DotsContainer = styled.div`
	position: absolute;
	display: flex;
	top: 30%;
	left: 41.5%;
`;

const Dot = styled.div`
	height: 24px;
	width: 24px;
	border: 1px solid white;
	border-radius: 100%;
	margin: 0 5px;
`;

const ScrollElement = styled.div`
	position: absolute;
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
	let location = useLocation();
	return (
		<BannerElement path={location}>
			{location.pathname === "/" ? (
				<>
					<SpanElement path={location}>The space is waiting for</SpanElement>
					<YouSpanElement path={location}>
						You
						<DotsContainer>
							<Dot />
							<Dot />
							<Dot />
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
