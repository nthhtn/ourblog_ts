import { ArticleActionTypes, LIST_ARTICLES, GET_ARTICLE } from "../types/actions";
import Article from '../types/Article';

const list: Article[] = [];
const current: Article = null;

export default function (state = { list, current }, action: ArticleActionTypes) {
	switch (action.type) {
		case LIST_ARTICLES: return { ...state, list: action.list };
		case GET_ARTICLE: return { ...state, current: action.article };
		default: return state;
	}
};
