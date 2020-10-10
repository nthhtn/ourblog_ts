import { Dispatch } from "redux";

import Article from "../types/Article";
import { LIST_ARTICLE, CREATE_ARTICLE, AppActions } from "../types/actions";

function listArticleSuccess(list: Article[]): AppActions {
	return { type: LIST_ARTICLE, list };
};

export function listArticle(page = 1, limit = 10) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listArticleSuccess(responseJson.result));
	};
};

function createArticleSuccess(article: Article): AppActions {
	return { type: CREATE_ARTICLE, article };
};

export function createArticle(article: { title: string; content: string }) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(article)
		});
		const responseJson = await response.json();
		return dispatch(createArticleSuccess(responseJson.result));
	};
};
