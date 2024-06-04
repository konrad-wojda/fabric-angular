export interface Drawing {
  id_drawing: number;
  drawing: string;
}

export interface CanvasSize {
  WIDTH: number;
  HEIGHT: number;
}

export const canvasSize: CanvasSize = {
  WIDTH: 400,
  HEIGHT: 400,
};

export enum drawingRedirect {
  redirect = 'Redirect',
}
