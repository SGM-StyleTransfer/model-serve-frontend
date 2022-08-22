import cv2
def cut_frame(video) :#비디오를 frame으로 바꿔주는 함수 정의하기
  #frames = []
  cap = cv2.VideoCapture(video)
  idx = 0
  while(cap.isOpened()) :
    ret, frame = cap.read()

    if ret : #images 파일 안에 넣어놓기
      if idx == 0 :
      # frames.append(frame)
        cv2.imwrite("./images/frame{0}.jpg".format(idx), frame)
      else :
        break
    else :
      break
    idx+=1

  cap.release()

cut_frame("sample_video.mp4")
