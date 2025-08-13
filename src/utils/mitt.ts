import type { Emitter } from "mitt";
import mitt from "mitt";

/** Global public events should have their types defined here */
type Events = {
  openPanel: string;
  tagOnClick: string;
  logoChange: boolean;
  tagViewsChange: string;
  changLayoutRoute: string;
  tagViewsShowModel: string;
  imageInfo: {
    img: HTMLImageElement;
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

export const emitter: Emitter<Events> = mitt<Events>();
