import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MediaState = {
    videoUrl: string;
    imageUrls: string[];
    selectedImageIdx?: number;
};

const initialSate: MediaState = {
    videoUrl: '',
    imageUrls: [],
    selectedImageIdx: 0,
};

export const media = createSlice({
    initialState: initialSate,
    name: 'media',
    reducers: {
        setVideoUrl: (state, action: PayloadAction<string>) => {
            return {...state, videoUrl: action.payload};
        },
        setImageUrls: (state, action: PayloadAction<string[]> ) => {
            return {...state, imageUrls: action.payload};
        },
        setSelectedImageIdx: (state, action: PayloadAction<number>) => {
            return {...state, selectedImageIdx: action.payload};
        },
    },
});

export const mediaActions = media.actions;
export const mediaReducer = media.reducer;
