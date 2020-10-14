import Article from "./Article";

export const LIST_ARTICLES = 'LIST_ARTICLES';
export const GET_ARTICLE = 'GET_ARTICLE';

export interface listArticlesAction {
	type: typeof LIST_ARTICLES;
	list: Article[];
};

export interface GetArticleAction {
	type: typeof GET_ARTICLE;
	article: Article;
};

export type ArticleActionTypes = listArticlesAction | GetArticleAction;

export type AppActions = ArticleActionTypes;
