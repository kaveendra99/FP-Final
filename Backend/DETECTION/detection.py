import torch.cuda as cuda
from ultralytics import YOLO
from settings import Settings
from error import DetectionInitializationError, DetectionError


class DETECTION:
    def __init__(self, settings: Settings) -> None:
        try:
            if cuda.is_available():
                self.deviceType = 0
            else:
                self.deviceType = "cpu"
            self.model = YOLO(settings.MODEL_PATH)
            self.model.to(self.deviceType)
            self.model_class_names = self.model.names
        except Exception as e:
            print(e)
            raise DetectionInitializationError()

    def detect(self, image, settings: Settings) -> dict:
        try:
            result = self.model(
                source=image, conf=settings.DETECT_CONFIDENCE, device=self.deviceType
            )
            result_plotted = result[0].plot()
            conf_list = result[0].boxes.conf.tolist()
            detect_xy_list = result[0].boxes.xyxy.tolist()

            cls_id_list = result[0].boxes.cls.tolist()
            class_list = [self.model_class_names[int(cls_id)] for cls_id in cls_id_list]
            return {
                settings.IMAGE: result_plotted,
                settings.CONF_LIST: conf_list,
                settings.DETECT_LIST: detect_xy_list,
                settings.CLS_LIST: class_list,
            }
        except Exception as e:
            print(e)
            raise DetectionError()
