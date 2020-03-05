import _ from 'lodash';
import {EQUIPMENT_PATH } from 'tools/Constants'
import {Url, Header,Arraify} from 'tools/Utils';
import {success, error} from 'tools/Message';
import { isNationalCodeLoading } from './org_persons';
import { makeTemplate } from './common';
import {TYPES} from 'tools/Constants'
let type=TYPES.EQUIPMENT
let exports=makeTemplate(TYPES.EQUIPMENT,EQUIPMENT_PATH)

export default {
    ...exports
}