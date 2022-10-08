import { atom } from "recoil";

type Card = {
	image: string;
	title: string;
	subtitle: string;
	id: number;
};

export const favItemsState = atom({
	key: "flightsState",
	default: [] as Card[],
});
