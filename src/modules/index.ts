import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({

});

export type rootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [],
    devTools: true,
});