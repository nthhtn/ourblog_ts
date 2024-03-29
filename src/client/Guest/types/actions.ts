// ARTICLE

import Article from "./Article";

export const LIST_ARTICLES = 'LIST_ARTICLES';
export const GET_ARTICLE_BY_TITLE = 'GET_ARTICLE_BY_TITLE';
export const LIST_ARTICLES_BY_CATEGORY = 'LIST_ARTICLES_BY_CATEGORY';
export const SEARCH_ARTICLES = 'SEARCH_ARTICLES';

export interface listArticlesAction {
	type: typeof LIST_ARTICLES;
	list: Article[];
	page: number;
	count: number;
};

export interface getArticleByTitleAction {
	type: typeof GET_ARTICLE_BY_TITLE;
	article: Article;
};

export interface listArticlesByCategoryAction {
	type: typeof LIST_ARTICLES_BY_CATEGORY;
	list: Article[];
	page: number;
	count: number;
};

export interface searchArticlesAction {
	type: typeof SEARCH_ARTICLES;
	list: Article[];
	page: number;
	count: number;
}

export type ArticleActionTypes = listArticlesAction | getArticleByTitleAction | listArticlesByCategoryAction | searchArticlesAction;

// USER

import User from './User';

export const GET_MY_PROFILE = 'GET_MY_PROFILE';

export interface getMyProfile {
	type: typeof GET_MY_PROFILE;
	result: User;
};

export type UserActionTypes = getMyProfile;

// CATEGORY

import Category from './Category';

export const LIST_CATEGORIES = 'LIST_CATEGORIES';

export interface ListCategoriesAction {
	type: typeof LIST_CATEGORIES;
	list: Category[];
};

export type CategoryActionTypes = ListCategoriesAction;

export type AppActions = ArticleActionTypes | UserActionTypes | CategoryActionTypes;
