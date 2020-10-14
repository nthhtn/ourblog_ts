import { ArticleActionTypes, LIST_ARTICLES, CREATE_ARTICLE, GET_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from "../types/actions";
import Article from '../types/Article';

const list: Article[] = [];
const current: Article = null;

export default function (state = { list, current }, action: ArticleActionTypes) {
	switch (action.type) {
		case CREATE_ARTICLE: return { ...state, list: [action.article, ...state.list] };
		case LIST_ARTICLES: return { ...state, list: action.list };
		case GET_ARTICLE: return { ...state, current: action.article };
		case UPDATE_ARTICLE: return {
			...state,
			list: state.list.map((item) => (item._id === action.article._id ? action.article : item))
		};
		case DELETE_ARTICLE: return {
			...state,
			list: state.list.filter((item) => (item._id != action.articleId))
		};
		default: return state;
	}
};
