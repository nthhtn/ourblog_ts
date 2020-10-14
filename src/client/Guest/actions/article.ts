import { Dispatch } from "redux";

import Article from "../types/Article";
import { AppActions, LIST_ARTICLES, GET_ARTICLE } from "../types/actions";

function listArticlesSuccess(list: Article[]): AppActions {
	return { type: LIST_ARTICLES, list };
};

export function listArticles(page = 1, limit = 10) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listArticlesSuccess(responseJson.result));
	};
};

function getArticleSuccess(article: Article): AppActions {
	return { type: GET_ARTICLE, article };
};

export function getArticle(id: string) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles/${id}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(getArticleSuccess(responseJson.result));
	};
};
