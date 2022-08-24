import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mediaReducer } from './media'

const rootReducer = combineReducers({
    media: mediaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: [],
    devTools: true,
});