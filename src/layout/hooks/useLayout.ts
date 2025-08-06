import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { routerArrays } from "../types";
import { useGlobal } from "@pureadmin/utils";
import { useMultiTagsStore } from "@/store/modules/multiTags";

export function useLayout() {
  const { $storage, $config } = useGlobal<GlobalPropertiesApi>();

  const initStorage = () => {
    /** Routing */
    if (
      useMultiTagsStore().multiTagsCache &&
      (!$storage.tags || $storage.tags.length === 0)
    ) {
      $storage.tags = routerArrays;
    }
    /** Internationalization */
    if (!$storage.locale) {
      $storage.locale = { locale: $config?.Locale ?? "zh" };
      useI18n().locale.value = $config?.Locale ?? "zh";
    }
    /** Navigation */
    if (!$storage.layout) {
      $storage.layout = {
        layout: $config?.Layout ?? "vertical",
        theme: $config?.Theme ?? "light",
        darkMode: $config?.DarkMode ?? false,
        sidebarStatus: $config?.SidebarStatus ?? true,
        epThemeColor: $config?.EpThemeColor ?? "#409EFF",
        themeColor: $config?.Theme ?? "light",
        overallStyle: $config?.OverallStyle ?? "light"
      };
    }
    /** Gray mode, color-blind mode, hidden tabs */
    if (!$storage.configure) {
      $storage.configure = {
        grey: $config?.Grey ?? false,
        weak: $config?.Weak ?? false,
        hideTabs: $config?.HideTabs ?? false,
        hideFooter: $config.HideFooter ?? true,
        showLogo: $config?.ShowLogo ?? true,
        showModel: $config?.ShowModel ?? "smart",
        multiTagsCache: $config?.MultiTagsCache ?? false,
        stretch: $config?.Stretch ?? false
      };
    }
  };

  /** After clearing the cache, read the default configuration from platform-config.json and assign it to storage */
  const layout = computed(() => {
    return $storage?.layout.layout;
  });

  const layoutTheme = computed(() => {
    return $storage.layout;
  });

  return {
    layout,
    layoutTheme,
    initStorage
  };
}
