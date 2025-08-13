from ultralytics import YOLO
import ultralytics
import kagglehub

class Train:
    def __init__(self):
        ultralytics.checks()
        self.model = YOLO("yolo11n.pt")
    
    def train1(self): # First 100 epochs
        results = self.model.train(data="/kaggle/input/universallogos/UniversalLogoDataset/data.yaml", 
                                   epochs=100, device=0)

    def train2(self): # More epochs if time allows
        self.model = YOLO("/kaggle/working/runs/detect/train4/weights/last.pt")
        results = self.model.train(data="/kaggle/input/universallogos/UniversalLogoDataset/data.yaml", 
                                    epochs=100, device=0)
    
    def resume_train(self):
        results = self.model.train(resume=True)
    
    def load_dataset(self):
        path = kagglehub.dataset_download("thisisdaniel12345/universallogos/versions/4")
        print("Path to dataset files:", path)
