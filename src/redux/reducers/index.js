import { combineReducers } from 'redux';
import * as user from './user';
import * as basicInfo from './common'

import realPersons from './real_persons'
import orgPersons from './org_persons'
import commodity from './commodity'
import equipment from './equipment'

export default combineReducers({
    ...basicInfo,
    ...user,

    ...realPersons,
    ...orgPersons,
    ...commodity,
    ...equipment,
});