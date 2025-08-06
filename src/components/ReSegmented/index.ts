import reSegmented from "./src/index";
import { withInstall } from "@pureadmin/utils";

/** Segmentation controller component */
export const ReSegmented = withInstall(reSegmented);

export default ReSegmented;
export type { OptionsType } from "./src/type";
