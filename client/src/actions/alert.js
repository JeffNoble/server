import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types'

//thunk middleware
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });

    setTimeout(() => ({ type: REMOVE_ALERT, payload: id }), 5000);
};
