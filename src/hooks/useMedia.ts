import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@modules/index"
import { mediaActions } from "@modules/media";


export function useMedia() {
    const videoUrl = useSelector((state: RootState) => state.media.videoUrl);
    const imageUrls = useSelector((state: RootState) => state.media.imageUrls);
    const selectedImageIdx = useSelector((state: RootState) => state.media.selectedImageIdx);

    const dispatch = useDispatch();
    const setVideoUrl = useCallback(
        (videoUrl: string) => { dispatch(mediaActions.setVideoUrl(videoUrl)) }, 
        [dispatch],
    );
    const setImageUrls = useCallback(
        (imageUrls: string[]) => { dispatch(mediaActions.setImageUrls(imageUrls)) }, 
        [dispatch],
    );
    const addImageUrl = useCallback(
        (imageUrl: string) => { dispatch(mediaActions.addImageUrl(imageUrl)) }, 
        [dispatch],
    );
    const setSelectedImageIdx = useCallback(
        (idx: number) => { dispatch(mediaActions.setSelectedImageIdx(idx)) }, 
        [dispatch],
    );

    return {
        videoUrl,
        imageUrls,
        selectedImageIdx,

        setVideoUrl,
        setImageUrls,
        addImageUrl,
        setSelectedImageIdx,
    }
}