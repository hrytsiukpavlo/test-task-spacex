import { atom } from "recoil";

export interface ICard {
	image: string;
	title: string;
	subtitle: string;
	id: string;
}

export const favItemsState = atom({
	key: "flightsState",
	default: [] as ICard[],
});
