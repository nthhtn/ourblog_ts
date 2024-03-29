// ARTICLE

import Article from "./Article";

export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const LIST_ARTICLES = 'LIST_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export interface listArticlesAction {
	type: typeof LIST_ARTICLES;
	list: Article[];
	page: number;
	count: number;
};

export interface CreateArticleAction {
	type: typeof CREATE_ARTICLE;
	article: Article;
};

export interface GetArticleAction {
	type: typeof GET_ARTICLE;
	article: Article;
};

export interface UpdateArticleAction {
	type: typeof UPDATE_ARTICLE;
	article: Article;
};

export interface DeleteArticleAction {
	type: typeof DELETE_ARTICLE;
	articleId: string;
}

export type ArticleActionTypes = listArticlesAction | CreateArticleAction | GetArticleAction | UpdateArticleAction | DeleteArticleAction;

// CATEGORY

import Category from './Category';

export const LIST_CATEGORIES = 'LIST_CATEGORIES';

export interface ListCategoriesAction {
	type: typeof LIST_CATEGORIES;
	list: Category[];
};

export type CategoryActionTypes = ListCategoriesAction;


// USER

import User from './User';

export const GET_MY_PROFILE = 'GET_MY_PROFILE';

export interface getMyProfile {
	type: typeof GET_MY_PROFILE;
	result: User;
};

export type UserActionTypes = getMyProfile;

export type AppActions = ArticleActionTypes | CategoryActionTypes | UserActionTypes;
