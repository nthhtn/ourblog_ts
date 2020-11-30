import { Dispatch } from "redux";

import Category from "../types/Category";
import { AppActions, LIST_CATEGORIES } from "../types/actions";

function listCategoriesSuccess(list: Category[]): AppActions {
	return { type: LIST_CATEGORIES, list };
};

export function listCategories() {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/categories`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listCategoriesSuccess(responseJson.result));
	};
};