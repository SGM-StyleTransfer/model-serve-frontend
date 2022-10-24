import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@modules/index"
import { mediaActions, MediaState } from "@modules/media";


export function useMedia() {
    const videoUrl = useSelector((state: RootState) => state.media.videoUrl);
    const videoFile = useSelector((state: RootState) => state.media.videoFile);
    const videoWidth = useSelector((state: RootState) => state.media.videoWidth);
    const videoHeight = useSelector((state: RootState) => state.media.videoHeight);
    const frameUrls = useSelector((state: RootState) => state.media.frameUrls);
    const keyFrameIdx = useSelector((state: RootState) => state.media.keyFrameIdx);
    const refImgUrl = useSelector((state: RootState) => state.media.refImgUrl);
    const refImgFile = useSelector((state: RootState) => state.media.refImgFile);
    const maskImgUrl = useSelector((state: RootState) => state.media.maskImgUrl);
    const maskImgFile = useSelector((state: RootState) => state.media.maskImgFile);
    const outputVideoURL = useSelector((state: RootState) => state.media.outputVideoURL);

    const dispatch = useDispatch();
    const setVideo = useCallback(
        (video: Pick<MediaState, 'videoUrl' | 'videoFile'> ) => { dispatch(mediaActions.setVideo(video)) }, 
        [dispatch],
    );
    const setVideoSize = useCallback(
        (videoSize: Pick<MediaState, 'videoHeight' | 'videoWidth'>) => { dispatch(mediaActions.setVideoSize(videoSize)) },
        [dispatch],
    )
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
    const setOutputVideoUrl = useCallback(
        (outputVideoURL: Pick<MediaState, 'outputVideoURL'>) => {dispatch(mediaActions.setOutputVideoUrl(outputVideoURL))},
        [dispatch],
    )

    return {
        videoUrl,
        videoFile,
        videoHeight,
        videoWidth,
        frameUrls,
        keyFrameIdx,
        refImgUrl,
        refImgFile,
        maskImgUrl,
        maskImgFile,
        outputVideoURL,

        setVideo,
        setVideoSize,
        setFrameUrls,
        addFrameUrl,
        selectKeyFrameIdx,
        setRefImg,
        setMaskImg,
        setOutputVideoUrl,
    }
}