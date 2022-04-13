# Using Python 3.10

Install with `pip install -r req.txt`

Use like:
    - `python main.py`
    - or `uvicorn main:app --reload`

# Using docker

```
$ docker build -t be .
$ docker run -p 8000:8000 --rm be
```

# Sending requests

Send requests like:
`curl -X POST http://0.0.0.0:8000 -H "Content-Type: application/json" -d '{<body>}'`

where body matches RigStatus below:
```{
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
}```

Min body =
```{
    "id": "1",
    "name": "Test Rig",
    "status": "ready",
    "framerate": 15
}```