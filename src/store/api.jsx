import { createAction } from '@reduxjs/toolkit';

export const apiCallStart = createAction('api/apiCallStart');
export const apiCallSuccess = createAction('api/apiCallSuccess');
export const apiCallFailed = createAction('api/apiCallFailed');
