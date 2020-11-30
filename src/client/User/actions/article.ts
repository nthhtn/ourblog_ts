import { Dispatch } from "redux";

import Article from "../types/Article";
import { AppActions, LIST_ARTICLES, CREATE_ARTICLE, GET_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from "../types/actions";

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

function createArticleSuccess(article: Article): AppActions {
	return { type: CREATE_ARTICLE, article };
};

export function createArticle(article: { title: string; content: string; file: File, categoryId: string }) {
	return async (dispatch: Dispatch<AppActions>) => {
		let formdata = new FormData();
		Object.keys(article).map((key) => formdata.append(key, article[key]));
		const response = await fetch(`/api/articles`, {
			credentials: 'same-origin',
			method: 'post',
			body: formdata
		});
		const responseJson = await response.json();
		return dispatch(createArticleSuccess(responseJson.result));
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

function updateArticleSuccess(article: Article): AppActions {
	return { type: UPDATE_ARTICLE, article };
};

export function updateArticle(id: string, article: { title: string; content: string }) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(article)
		});
		const responseJson = await response.json();
		return dispatch(updateArticleSuccess(responseJson.result));
	};
};

function deleteArticleSuccess(articleId: string): AppActions {
	return { type: DELETE_ARTICLE, articleId };
};

export function deleteArticle(id: string, article: { title: string; content: string }) {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/articles/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(article)
		});
		const responseJson = await response.json();
		return dispatch(deleteArticleSuccess(id));
	};
};
