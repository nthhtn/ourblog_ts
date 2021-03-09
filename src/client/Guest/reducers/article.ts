import { ArticleActionTypes, LIST_ARTICLES, GET_ARTICLE_BY_TITLE, LIST_ARTICLES_BY_CATEGORY } from "../types/actions";
import Article from '../types/Article';

const list: Article[] = [];
const current: Article = null;
const page: number = 1;
const count: number = 0;

export default function (state = { list, current, page, count }, action: ArticleActionTypes) {
	switch (action.type) {
		case LIST_ARTICLES: return { ...state, list: action.list, page: action.page, count: action.count };
		case GET_ARTICLE_BY_TITLE: return { ...state, current: action.article };
		case LIST_ARTICLES_BY_CATEGORY: return {...state, list:action.list, page:action.page, count:action.count};
		default: return state;
	}
};
