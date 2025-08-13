from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import numpy as np
from io import BytesIO
import cv2, base64, json, os
import uvicorn

from ultralytics import YOLO

app = FastAPI()
model = YOLO(os.getcwd() + "/LogoScan/TrainResultV1/weights/best.pt")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

photo_memo = {}
current_user = ""
users_info = {}
class StringRequest(BaseModel):
    content: str
    
class DictRequest(BaseModel):
    content: dict

@app.post("/receive_info")
async def receiveDict(req: DictRequest):
    d = req.content
    users_info[d['username']] = {
        "id": d['id'],
    }
    global current_user
    current_user = d['username']
    if current_user not in photo_memo:
        photo_memo[current_user] = []
    print(f'{d['username']} signed in')
    return {"processed_img": "GOT DATA"}

@app.post("/invert_image")
async def invertImage(req: StringRequest):
    image_data = base64.b64decode(req.content)
    image = Image.open(BytesIO(image_data))
    img_array = np.array(image)
    
    processed_img = np.fliplr(img_array)
    
    _, img_encoded = cv2.imencode('.jpg', cv2.cvtColor(processed_img, cv2.COLOR_RGB2BGR))
    img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')
    return json.dumps({"processed_img": img_base64})

@app.post("/process_image")
async def processImage(req: StringRequest):
    # Decode base64 image
    image_data = base64.b64decode(req.content)
    image = Image.open(BytesIO(image_data)).convert("RGB")
    img_array = np.array(image)

    # Run YOLOv8 inference
    results = model(img_array)[0]
    boxes = results.boxes

    brand = "Unknown"
    annotated = img_array.copy()

    if boxes:
        confs = boxes.conf.cpu().numpy()
        best_idx = int(np.argmax(confs))

        for i in range(len(boxes)):
            box = boxes.xyxy[i].cpu().numpy().astype(int)
            cls = int(boxes.cls[i])
            label = model.names[cls]
            color = (0, 255, 0) if i == best_idx else (150, 0, 0)  # green if best, red otherwise

            # Draw rectangle
            cv2.rectangle(annotated, box[:2], box[2:], color, 2)

            # Draw label
            cv2.putText(
                annotated,
                label,
                (box[0], box[1] - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                color,
                2
            )

        brand = model.names[int(boxes.cls[best_idx])]
    
    # Encode image to base64
    _, img_encoded = cv2.imencode('.jpg', cv2.cvtColor(annotated, cv2.COLOR_RGB2BGR))
    img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')

    return {"brand": brand, "image": img_base64}

@app.post("/save_img")
async def saveImage(req: StringRequest):
    image_data = base64.b64decode(req.content)
    image = Image.open(BytesIO(image_data))
    img_array = np.array(image)
    
    # Convert RGB to BGR for correct color encoding
    img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    
    img_base64 = base64.b64encode(cv2.imencode('.jpg', img_bgr)[1]).decode('utf-8')
    global current_user
    photo_memo[current_user].append(img_base64)
    return {"processed_img": "RESPONSE"}

@app.get("/fetch_img")
async def fetchImage():
    global current_user
    return photo_memo[current_user]

@app.get("/fetch_current_user")
async def fetchCurrentUser():
    return users_info[current_user]

@app.delete("/delete_img")
async def fetchImage(req: StringRequest):
    idx = int(base64.b64decode(req.content))
    print("Deleted", idx)
    photo_memo[current_user].pop(idx)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3500)