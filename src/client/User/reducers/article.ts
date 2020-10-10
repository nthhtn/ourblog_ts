import { ArticleActionTypes } from "../types/actions";

const initialState = {};

export default function (state = initialState, action: ArticleActionTypes) {
	switch (action.type) {
		default: return state;
	}
};
