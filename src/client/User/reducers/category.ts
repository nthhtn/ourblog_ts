import { CategoryActionTypes, LIST_CATEGORIES } from "../types/actions";
import Category from '../types/Category';

const list: Category[] = [];

export default function (state = { list }, action: CategoryActionTypes) {
	switch (action.type) {
		case LIST_CATEGORIES: return { ...state, list: action.list };
		default: return state;
	}
};
