export interface ICamera {
  id: string;
}

export interface IServer {
  id: string;
  cameras?: ICamera[];
}

export interface IRigStatus {
  id: string;
  name: string;
  status: "ready" | "recording" | "error";
  framerate: 5 | 15 | 30;
  capture_servers?: IServer[]
}