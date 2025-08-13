import type { Directive } from "vue";
import type { CopyEl, OptimizeOptions, RippleOptions } from "@/directives";

declare module "vue" {
  export interface ComponentCustomProperties {
    /** `Loading` animation directive, see: https://element-plus.org/en-US/component/loading.html#directive */
    vLoading: Directive<Element, boolean>;
    /** Button permission directive (determined by the `auths` field in route `meta`) */
    vAuth: Directive<HTMLElement, string | Array<string>>;
    /** Text copy directive (double-click to copy by default) */
    vCopy: Directive<CopyEl, string>;
    /** Long press directive */
    vLongpress: Directive<HTMLElement, Function>;
    /** Debounce and throttle directive */
    vOptimize: Directive<HTMLElement, OptimizeOptions>;
    /** Button permission directive (determined by the `permissions` field returned from the login API) */
    vPerms: Directive<HTMLElement, string | Array<string>>;
    /**
     * `v-ripple` directive, usage is as follows:
     * 1. `v-ripple` enables the basic `ripple` functionality
     * 2. `v-ripple="{ class: 'text-red' }"` represents customizing the `ripple` color, supports `tailwindcss`, the effective style is `color`
     * 3. `v-ripple.center` means to spread from the center
     */
    vRipple: Directive<HTMLElement, RippleOptions>;
  }
}

export {};
