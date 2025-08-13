import type { VNode } from "vue";
import { isFunction } from "@pureadmin/utils";
import { type MessageHandler, ElMessage } from "element-plus";

type messageStyle = "el" | "antd";
type messageTypes = "info" | "success" | "warning" | "error";

interface MessageParams {
  /** Message type, optional `info`, `success`, `warning`, `error`, defaults to `info` */
  type?: messageTypes;
  /** Whether to use solid color, default `false` */
  plain?: boolean;
  /** Custom icon, this will override the icon from `type` */
  icon?: any;
  /** Whether to treat the `message` property as an `HTML` fragment, default `false` */
  dangerouslyUseHTMLString?: boolean;
  /** Message style, optional `el`, `antd`, defaults to `antd` */
  customClass?: messageStyle;
  /** Display duration in milliseconds. Set to `0` to prevent auto-close, `element-plus` default is `3000`, platform default is `2000` */
  duration?: number;
  /** Whether to show close button, default `false` */
  showClose?: boolean;
  /** Offset from the top of the viewport for `Message`, default `16` */
  offset?: number;
  /** Set the root element for the component, default `document.body` */
  appendTo?: string | HTMLElement;
  /** Merge messages with the same content, does not support `VNode` type messages, default `false` */
  grouping?: boolean;
  /** Repeat count, similar to `Badge`. When used with `grouping` property, used as initial count, default `1` */
  repeatNum?: number;
  /** Callback when closed, with the closed `message` instance as parameter */
  onClose?: Function | null;
}

/** Very simple to use, refer to src/views/components/message/index.vue file */

/**
 * `Message` notification function
 */
const message = (
  message: string | VNode | (() => VNode),
  params?: MessageParams
): MessageHandler => {
  if (!params) {
    return ElMessage({
      message,
      customClass: "pure-message"
    });
  } else {
    const {
      icon,
      type = "info",
      plain = false,
      dangerouslyUseHTMLString = false,
      customClass = "antd",
      duration = 2000,
      showClose = false,
      offset = 16,
      appendTo = document.body,
      grouping = false,
      repeatNum = 1,
      onClose
    } = params;

    return ElMessage({
      message,
      icon,
      type,
      plain,
      dangerouslyUseHTMLString,
      duration,
      showClose,
      offset,
      appendTo,
      grouping,
      repeatNum,
      // Search globally for pure-message to find the style location
      customClass: customClass === "antd" ? "pure-message" : "",
      onClose: () => (isFunction(onClose) ? onClose() : null)
    });
  }
};

/**
 * Close all `Message` notifications
 */
const closeAllMessage = (): void => ElMessage.closeAll();

export { message, closeAllMessage };
