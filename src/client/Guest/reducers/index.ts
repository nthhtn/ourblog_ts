import { combineReducers } from 'redux';

import article from './article';
import user from './user';

export default combineReducers({ article, user });
