import {createAction} from 'redux-actions'

export const GET_SIMPLE_USER_DETAILS='GET_SIMPLE_USER_DETAILS'
export const GET_ADMIN_USER_DETAILS='GET_ADMIN_USER_DETAILS';


export const fetchSimpleUserDetails=createAction(GET_SIMPLE_USER_DETAILS)
export const fetchAdminUserDetails=createAction(GET_ADMIN_USER_DETAILS)
