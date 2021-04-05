import { Dispatch } from "redux";

import User from "../types/User";
import { AppActions, GET_MY_PROFILE } from "../types/actions";

function getMyProfileSuccess(result: User): AppActions {
	return { type: GET_MY_PROFILE, result };
};

export function getMyProfile() {
	return async (dispatch: Dispatch<AppActions>) => {
		const response = await fetch(`/api/users/me`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		return dispatch(getMyProfileSuccess(responseJson.result));
	};
};
