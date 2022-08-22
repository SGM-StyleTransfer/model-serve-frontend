import cv2
import glob
import mediapipe as mp
from PIL import Image
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_face_mesh = mp.solutions.face_mesh

def cut_frame(video) :#비디오를 frame으로 바꿔주는 함수 정의하기
  cap = cv2.VideoCapture(video)
  idx = 0
  while(cap.isOpened()) :
    ret, frame = cap.read()

    if ret : #images 파일 안에 넣어놓기
      cv2.imwrite("./images/frame{0}.jpg".format(idx), frame)
      if cv2.waitKey(1) & 0xFF == ord('q') :
        break
    else :
      break
    idx+=1
  cap.release()

# For static images:
video = "sample_video.mp4" #비디오 경로설정
cut_frame(video)
IMAGE_FILES = glob.glob('./images/*.jpg')
print("IMAGE FILES : ", IMAGE_FILES)
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
with mp_face_mesh.FaceMesh(
    static_image_mode=True,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5) as face_mesh:
  for idx, file in enumerate(IMAGE_FILES):
    image = cv2.imread(file)
    # Convert the BGR image to RGB before processing.
    results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    # Print and draw face mesh landmarks on the image.
    if not results.multi_face_landmarks:
      continue
    annotated_image = image.copy()
    keyframe = image.copy()
    for face_landmarks in results.multi_face_landmarks:
      #print('face_landmarks:', face_landmarks)
      mp_drawing.draw_landmarks(
          image=annotated_image,
          landmark_list=face_landmarks,
          connections=mp_face_mesh.FACEMESH_TESSELATION,
          landmark_drawing_spec=None,
          connection_drawing_spec=mp_drawing_styles
          .get_default_face_mesh_tesselation_style())
      mp_drawing.draw_landmarks(
          image=annotated_image,
          landmark_list=face_landmarks,
          connections=mp_face_mesh.FACEMESH_CONTOURS,
          landmark_drawing_spec=None,
          connection_drawing_spec=mp_drawing_styles
          .get_default_face_mesh_contours_style())
      mp_drawing.draw_landmarks(
          image=annotated_image,
          landmark_list=face_landmarks,
          connections=mp_face_mesh.FACEMESH_IRISES,
          landmark_drawing_spec=None,
          connection_drawing_spec=mp_drawing_styles
          .get_default_face_mesh_iris_connections_style())
    cv2.imwrite('./tmp/frame' + str(idx) + '.png', annotated_image)
    cv2.imwrite('./tmp/keyframe' + '.png', keyframe)
    break