"""
Use like:
    uvicorn main:app --reload
    curl -X POST http://0.0.0.0:8000 -H "Content-Type: application/json" -d '{<body>}'

where body matches RigStatus below:
{
    "id": "1",
    "name": "Test Rig",
    "status": "ready",
    "framerate": 15,
    "capture_servers": [
        {"id": "cs1",
         "cameras": [{"id": "cs1-cam1"}, {"id": "cs1-cam2"}]
         },
        {"id": "cs2",
         "cameras": [{"id": "cs2-cam1"}, {"id": "cs2-cam2"}]}
    ]
}

Min body =
{
    "id": "1",
    "name": "Test Rig",
    "status": "ready",
    "framerate": 15
}

"""

import asyncio
from typing import Literal, List, Optional

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from websockets.exceptions import ConnectionClosedOK

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_queue = asyncio.Queue()


class Camera(BaseModel):
    id: str


class Server(BaseModel):
    id: str
    cameras: Optional[List[Camera]]


class RigStatus(BaseModel):
    id: str
    name: str
    status: Literal["ready", "recording", "error"]
    framerate: Literal[5, 15, 30]
    capture_servers: Optional[List[Server]]


DEFAULT_RIG = {
    "id": "1",
    "name": "Test Rig",
    "status": "ready",
    "framerate": 15,
    "capture_servers": [
        {"id": "cs1",
         "cameras": [{"id": "cs1-cam1"}, {"id": "cs1-cam2"}]
         },
        {"id": "cs2",
         "cameras": [{"id": "cs2-cam1"}, {"id": "cs2-cam2"}]}
    ]
}


@app.get("/")
def read_root():
    default_rig = jsonable_encoder(DEFAULT_RIG)
    return JSONResponse(content=default_rig)


@app.post("/")
def put_rig(rig: RigStatus):
    print("Received:", rig)
    json_rig = jsonable_encoder(rig)
    data_queue.put_nowait(json_rig)
    return JSONResponse(content=json_rig)


@app.websocket_route("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await data_queue.get()
            await websocket.send_json(data)
    except (ConnectionClosedOK, WebSocketDisconnect):
        print("Client disconnected")
