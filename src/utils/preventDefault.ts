import { useEventListener } from "@vueuse/core";

/** Check if the element is an `img` tag */
function isImgElement(element) {
  return typeof HTMLImageElement !== "undefined"
    ? element instanceof HTMLImageElement
    : element.tagName.toLowerCase() === "img";
}

// Import and call this in src/main.ts: import { addPreventDefault } from "@/utils/preventDefault"; addPreventDefault();
export const addPreventDefault = () => {
  // Prevent opening browser developer tools using F12 key
  useEventListener(
    window.document,
    "keydown",
    ev => ev.key === "F12" && ev.preventDefault()
  );
  // Prevent default browser context menu (does not affect custom right-click events)
  useEventListener(window.document, "contextmenu", ev => ev.preventDefault());
  // Prevent text selection on the page
  useEventListener(window.document, "selectstart", ev => ev.preventDefault());
  // Browser images are draggable by default and can be opened in new tabs/windows or dragged to other applications. This disables that behavior
  useEventListener(
    window.document,
    "dragstart",
    ev => isImgElement(ev?.target) && ev.preventDefault()
  );
};
