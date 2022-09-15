import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@modules/index"
import { mediaActions, MediaState } from "@modules/media";


export function useMedia() {
    const videoUrl = useSelector((state: RootState) => state.media.videoUrl);
    const videoFile = useSelector((state: RootState) => state.media.videoFile);
    const frameUrls = useSelector((state: RootState) => state.media.frameUrls);
    const keyFrameIdx = useSelector((state: RootState) => state.media.keyFrameIdx);
    const refImgUrl = useSelector((state: RootState) => state.media.refImgUrl);
    const refImgFile = useSelector((state: RootState) => state.media.refImgFile);
    const maskImgUrl = useSelector((state: RootState) => state.media.maskImgUrl);
    const maskImgFile = useSelector((state: RootState) => state.media.maskImgFile);

    const dispatch = useDispatch();
    const setVideo = useCallback(
        (video: Pick<MediaState, 'videoUrl' | 'videoFile'> ) => { dispatch(mediaActions.setVideo(video)) }, 
        [dispatch],
    );
    const setFrameUrls = useCallback(
        (imageUrls: string[]) => { dispatch(mediaActions.setFrameUrls(imageUrls)) }, 
        [dispatch],
    );
    const addFrameUrl = useCallback(
        (imageUrl: string) => { dispatch(mediaActions.addFrameUrl(imageUrl)) }, 
        [dispatch],
    );
    const selectKeyFrameIdx = useCallback(
        (idx: number) => { dispatch(mediaActions.selectKeyFrameIdx(idx)) }, 
        [dispatch],
    );
    const setRefImg = useCallback(
        (refImg: Pick<MediaState, 'refImgUrl' | 'refImgFile'>) => { dispatch(mediaActions.setRefImg(refImg)) }, 
        [dispatch],
    );
    const setMaskImg = useCallback(
        (maskImg: Pick<MediaState, 'maskImgUrl' | 'maskImgFile'>) => { dispatch(mediaActions.setMaskImg(maskImg)) }, 
        [dispatch],
    );

    return {
        videoUrl,
        videoFile,
        frameUrls,
        keyFrameIdx,
        refImgUrl,
        refImgFile,
        maskImgUrl,
        maskImgFile,

        setVideo,
        setFrameUrls,
        addFrameUrl,
        selectKeyFrameIdx,
        setRefImg,
        setMaskImg,
    }
}