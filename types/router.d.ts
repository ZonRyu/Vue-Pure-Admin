// Global route type declarations

import type { RouteComponent, RouteLocationNormalized } from "vue-router";
import type { FunctionalComponent } from "vue";

declare global {
  interface ToRouteType extends RouteLocationNormalized {
    meta: CustomizeRouteMeta;
  }

  /**
   * @description Complete child route's `meta` configuration table
   */
  interface CustomizeRouteMeta {
    /** Menu name (supports both internationalized and non-internationalized. If using internationalization, must add corresponding entry in `locales` folder in root directory) `Required` */
    title: string;
    /** 菜单图标 `可选` */
    icon?: string | FunctionalComponent;
    /** Additional icon on the right side of menu name */
    extraIcon?: string | FunctionalComponent;
    /** 是否在菜单中显示（默认`true`）`可选` */
    showLink?: boolean;
    /** Whether to show parent menu `Optional` */
    showParent?: boolean;
    /** Page level permission settings `Optional` */
    roles?: Array<string>;
    /** Button level permission settings `Optional` */
    auths?: Array<string>;
    /** Route component cache (enable `true`, disable `false`) `Optional` */
    keepAlive?: boolean;
    /** Embedded `iframe` link `Optional` */
    frameSrc?: string;
    /** Whether to enable first load animation for `iframe` pages (default `true`) `Optional` */
    frameLoading?: boolean;
    /** Page loading animation (two modes, second mode has higher priority. First mode uses Vue's built-in `transitions`, second mode uses `animate.css` for enter/leave animations. Platform recommends second mode as it has `animate.css` built-in, just write the animation name) `Optional` */
    transition?: {
      /**
       * @description Current route animation effect
       * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
       * @see animate.css {@link https://animate.style}
       */
      name?: string;
      /** Enter animation */
      enterTransition?: string;
      /** Leave animation */
      leaveTransition?: string;
    };
    /** Prevent current menu name or custom info from being added to tabs (default `false`) */
    hiddenTag?: boolean;
    /** Whether the current menu name is fixed in the tab and cannot be closed (default `false`) */
    fixedTag?: boolean;
    /** Maximum number of dynamic routes that can be opened `Optional` */
    dynamicLevel?: number;
    /** Activate a specific menu
     * (Mainly used for routes that pass parameters via `query` or `params`. When they are configured with `showLink: false` and not shown in the menu,
     * no menu will be highlighted. By setting `activePath` to specify the active menu, you can get the highlight. `activePath` is the `path` of the specified active menu)
     */
    activePath?: string;
  }

  /**
   * @description Complete child route configuration table
   */
  interface RouteChildrenConfigsTable {
    /** Child route path `Required` */
    path: string;
    /** Route name (must be unique, should match the component's `name`) `Required` */
    name?: string;
    /** Route redirect `Optional` */
    redirect?: string;
    /** Lazy load component `Optional` */
    component?: RouteComponent;
    meta?: CustomizeRouteMeta;
    /** Child route configuration */
    children?: Array<RouteChildrenConfigsTable>;
  }

  /**
   * @description Overall route configuration table (including complete child routes)
   */
  interface RouteConfigsTable {
    /** Route path `Required` */
    path: string;
    /** Route name (must be unique) `Optional` */
    name?: string;
    /** `Layout` component `Optional` */
    component?: RouteComponent;
    /** Route redirect `Optional` */
    redirect?: string;
    meta?: {
      /** Menu name (supports both internationalized and non-internationalized. If using internationalization, must add corresponding entry in `locales` folder in root directory) `Required` */
      title: string;
      /** Menu icon `Optional` */
      icon?: string | FunctionalComponent;
      /** Whether to show in menu (default `true`) `Optional` */
      showLink?: boolean;
      /** Menu ascending sort, higher values are sorted later (only for top-level routes) `Optional` */
      rank?: number;
    };
    /** Child route configuration */
    children?: Array<RouteChildrenConfigsTable>;
  }
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module "vue-router" {
  // eslint-disable-next-line
  interface RouteMeta extends CustomizeRouteMeta {}
}
