import { UserActionTypes, GET_MY_PROFILE } from "../types/actions";
import User from '../types/User'

const me: User = null;

export default function (state = { me }, action: UserActionTypes) {
	switch (action.type) {
		case GET_MY_PROFILE: return { ...state, me: action.result };
		default: return state;
	}
};
