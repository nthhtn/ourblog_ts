import { Dispatch } from "redux";

import Article from "../types/Article";
import { AppActions, LIST_ARTICLES, GET_ARTICLE_BY_TITLE, SEARCH_ARTICLES, LIST_ARTICLES_BY_CATEGORY } from "../types/actions";

function listArticlesSuccess(list: Article[], page: number, count: number): AppActions {
	return { type: LIST_ARTICLES, list, page, count };
};

export function listArticles(page = 1, limit = 10) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles?page=${page}&limit=${limit}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listArticlesSuccess(responseJson.result, page, responseJson.count));
	};
};

function getArticleByTitleSuccess(article: Article): AppActions {
	return { type: GET_ARTICLE_BY_TITLE, article };
};

export function getArticleByTitle(title: string) {
	return async (dispatch: Dispatch<AppActions>) => {
		console.log(title);
		const response = await fetch(`/api/articles/title/${title}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(getArticleByTitleSuccess(responseJson.result));
	};
};

function listArticlesByCategorySuccess(list: Article[], page: number, count: number): AppActions {
	return { type: LIST_ARTICLES_BY_CATEGORY, list, page, count };
};

export function listArticlesByCategory(category: string, page = 1, limit = 10) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles/category/${category}?page=${page}&limit=${limit}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(listArticlesByCategorySuccess(responseJson.result, page, responseJson.count));
	};
};

function searchArticlesSuccess(list: Article[], page: number, count: number): AppActions {
	return { type: SEARCH_ARTICLES, list, page, count };
};

export function searchArticles(keyword: string, category: string, page = 1, limit = 10) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles/search?keyword=${keyword}&category=${category}&page=${page}&limit=${limit}`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(searchArticlesSuccess(responseJson.result, page, responseJson.count));
	};
};
