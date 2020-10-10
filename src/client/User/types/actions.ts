import Article from "./Article";

export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const LIST_ARTICLE = 'LIST_ARTICLE';

export interface ListArticleAction {
	type: typeof LIST_ARTICLE;
	list: Article[];
};

export interface CreateArticleAction {
	type: typeof CREATE_ARTICLE;
	article: Article;
};

export type ArticleActionTypes = ListArticleAction | CreateArticleAction;

export type AppActions = ArticleActionTypes;
