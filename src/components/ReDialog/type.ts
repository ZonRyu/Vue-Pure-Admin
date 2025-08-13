import type { CSSProperties, VNode, Component } from "vue";

type DoneFn = (cancel?: boolean) => void;
type EventType =
  | "open"
  | "close"
  | "openAutoFocus"
  | "closeAutoFocus"
  | "fullscreenCallBack";
type ArgsType = {
  /** `cancel` when clicking the cancel button, `sure` when clicking the confirm button, `close` when clicking the close button in the top-right corner, the mask, or pressing ESC */
  command: "cancel" | "sure" | "close";
};
type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "text";

/** https://element-plus.org/zh-CN/component/dialog.html#attributes */
type DialogProps = {
  /** Show or hide the Dialog */
  visible?: boolean;
  /** Dialog title */
  title?: string;
  /** Dialog width, default `50%` */
  width?: string | number;
  /** Whether to display the dialog in fullscreen mode (remains fullscreen until closed), default `false`. If both `fullscreen` and `fullscreenIcon` are provided, only `fullscreen` will take effect */
  fullscreen?: boolean;
  /** Whether to show the fullscreen toggle icon, default `false`. If both `fullscreen` and `fullscreenIcon` are provided, only `fullscreen` will take effect */
  fullscreenIcon?: boolean;
  /** `margin-top` value in Dialog CSS, default `15vh` */
  top?: string;
  /** Whether a mask is needed, default `true` */
  modal?: boolean;
  /** Whether to append the dialog to the `body` element. Nested dialogs must set this to `true`, default `false` */
  appendToBody?: boolean;
  /** Whether to lock body scroll when dialog appears, default `true` */
  lockScroll?: boolean;
  /** Custom class name for Dialog */
  class?: string;
  /** Custom styles for Dialog */
  style?: CSSProperties;
  /** Delay before opening the dialog in milliseconds, default `0` */
  openDelay?: number;
  /** Delay before closing the dialog in milliseconds, default `0` */
  closeDelay?: number;
  /** Whether the dialog can be closed by clicking the mask, default `true` */
  closeOnClickModal?: boolean;
  /** Whether the dialog can be closed by pressing `ESC`, default `true` */
  closeOnPressEscape?: boolean;
  /** Whether to show the close button, default `true` */
  showClose?: boolean;
  /** Callback before dialog closes, which will pause the dialog closing. The dialog will only close when the `done` function is called inside the callback */
  beforeClose?: (done: DoneFn) => void;
  /** Enable draggable functionality for the dialog, default `false` */
  draggable?: boolean;
  /** Whether to center the dialog header and footer, default `false` */
  center?: boolean;
  /** Whether to align the dialog both horizontally and vertically, default `false` */
  alignCenter?: boolean;
  /** Whether to destroy elements in dialog when closed, default `false` */
  destroyOnClose?: boolean;
};

//element-plus.org/zh-CN/component/popconfirm.html#attributes
type Popconfirm = {
  /** Title */
  title?: string;
  /** Confirm button text */
  confirmButtonText?: string;
  /** Cancel button text */
  cancelButtonText?: string;
  /** Confirm button type, default `primary` */
  confirmButtonType?: ButtonType;
  /** Cancel button type, default `text` */
  cancelButtonType?: ButtonType;
  /** Custom icon, default `QuestionFilled` */
  icon?: string | Component;
  /** Icon color, default `#f90` */
  iconColor?: string;
  /** Whether to hide the icon, default `false` */
  hideIcon?: boolean;
  /** Delay before closing in milliseconds, default `200` */
  hideAfter?: number;
  /** Whether to append the dropdown to body, default `true` */
  teleported?: boolean;
  /** Whether the popover will be destroyed when it's not triggered for a while and `persistent` is `false`, default `false` */
  persistent?: boolean;
  /** Popup width, minimum width `150px`, default `150` */
  width?: string | number;
};

type BtnClickDialog = {
  options?: DialogOptions;
  index?: number;
};
type BtnClickButton = {
  btn?: ButtonProps;
  index?: number;
};
/** https://element-plus.org/zh-CN/component/button.html#button-attributes */
type ButtonProps = {
  /** 按钮文字 */
  label: string;
  /** 按钮尺寸 */
  size?: "large" | "default" | "small";
  /** 按钮类型 */
  type?: "primary" | "success" | "warning" | "danger" | "info";
  /** 是否为朴素按钮，默认 `false` */
  plain?: boolean;
  /** 是否为文字按钮，默认 `false` */
  text?: boolean;
  /** 是否显示文字按钮背景颜色，默认 `false` */
  bg?: boolean;
  /** 是否为链接按钮，默认 `false` */
  link?: boolean;
  /** 是否为圆角按钮，默认 `false` */
  round?: boolean;
  /** 是否为圆形按钮，默认 `false` */
  circle?: boolean;
  /** 确定按钮的 `Popconfirm` 气泡确认框相关配置 */
  popconfirm?: Popconfirm;
  /** 是否为加载中状态，默认 `false` */
  loading?: boolean;
  /** 自定义加载中状态图标组件 */
  loadingIcon?: string | Component;
  /** 按钮是否为禁用状态，默认 `false` */
  disabled?: boolean;
  /** 图标组件 */
  icon?: string | Component;
  /** 是否开启原生 `autofocus` 属性，默认 `false` */
  autofocus?: boolean;
  /** 原生 `type` 属性，默认 `button` */
  nativeType?: "button" | "submit" | "reset";
  /** 自动在两个中文字符之间插入空格 */
  autoInsertSpace?: boolean;
  /** 自定义按钮颜色, 并自动计算 `hover` 和 `active` 触发后的颜色 */
  color?: string;
  /** `dark` 模式, 意味着自动设置 `color` 为 `dark` 模式的颜色，默认 `false` */
  dark?: boolean;
  /** Custom element tag */
  tag?: string | Component;
  /** Callback triggered after clicking the button */
  btnClick?: ({
    dialog,
    button
  }: {
    /** Current dialog information */
    dialog: BtnClickDialog;
    /** Current button information */
    button: BtnClickButton;
  }) => void;
};

interface DialogOptions extends DialogProps {
  /** Props for the content area component, can be received through `defineProps` */
  props?: any;
  /** 是否隐藏 `Dialog` 按钮操作区的内容 */
  hideFooter?: boolean;
  /** 确定按钮的 `Popconfirm` 气泡确认框相关配置 */
  popconfirm?: Popconfirm;
  /** 点击确定按钮后是否开启 `loading` 加载动画 */
  sureBtnLoading?: boolean;
  /**
   * @description 自定义对话框标题的内容渲染器
   * @see {@link https://element-plus.org/zh-CN/component/dialog.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%B4%E9%83%A8}
   */
  headerRenderer?: ({
    close,
    titleId,
    titleClass
  }: {
    close: Function;
    titleId: string;
    titleClass: string;
  }) => VNode | Component;
  /** 自定义内容渲染器 */
  contentRenderer?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => VNode | Component;
  /** 自定义按钮操作区的内容渲染器，会覆盖`footerButtons`以及默认的 `取消` 和 `确定` 按钮 */
  footerRenderer?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => VNode | Component;
  /** 自定义底部按钮操作 */
  footerButtons?: Array<ButtonProps>;
  /** `Dialog` 打开后的回调 */
  open?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** `Dialog` 关闭后的回调（只有点击右上角关闭按钮或空白页或按下了esc键关闭页面时才会触发） */
  close?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** `Dialog` 关闭后的回调。 `args` 返回的 `command` 值解析：`cancel` 点击取消按钮、`sure` 点击确定按钮、`close` 点击右上角关闭按钮或空白页或按下了esc键  */
  closeCallBack?: ({
    options,
    index,
    args
  }: {
    options: DialogOptions;
    index: number;
    args: any;
  }) => void;
  /** 点击全屏按钮时的回调 */
  fullscreenCallBack?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** 输入焦点聚焦在 `Dialog` 内容时的回调 */
  openAutoFocus?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** 输入焦点从 `Dialog` 内容失焦时的回调 */
  closeAutoFocus?: ({
    options,
    index
  }: {
    options: DialogOptions;
    index: number;
  }) => void;
  /** 点击底部取消按钮的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeCancel?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DialogOptions;
      index: number;
    }
  ) => void;
  /** 点击底部确定按钮的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeSure?: (
    done: Function,
    {
      options,
      index,
      closeLoading
    }: {
      options: DialogOptions;
      index: number;
      /** Close the loading animation of the confirm button */
      closeLoading: Function;
    }
  ) => void;
}

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions };
