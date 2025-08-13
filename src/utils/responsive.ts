// Responsive storage
import type { App } from "vue";
import Storage from "responsive-storage";
import { routerArrays } from "@/layout/types";
import { responsiveStorageNameSpace } from "@/config";

export const injectResponsiveStorage = (app: App, config: PlatformConfigs) => {
  const nameSpace = responsiveStorageNameSpace();
  const configObj = Object.assign(
    {
      // Internationalization, default to Chinese 'zh'
      locale: Storage.getData("locale", nameSpace) ?? {
        locale: config.Locale ?? "zh"
      },
      // Layout mode and theme
      layout: Storage.getData("layout", nameSpace) ?? {
        layout: config.Layout ?? "vertical",
        theme: config.Theme ?? "light",
        darkMode: config.DarkMode ?? false,
        sidebarStatus: config.SidebarStatus ?? true,
        epThemeColor: config.EpThemeColor ?? "#409EFF",
        themeColor: config.Theme ?? "light", // Theme color (corresponds to the theme color in system settings, unlike 'theme' it's not affected by light/dark mode switching, only changes when manually clicking theme colors)
        overallStyle: config.OverallStyle ?? "light" // Overall style (light: light, dark: dark, auto: system)
      },
      // System configuration - Interface display
      configure: Storage.getData("configure", nameSpace) ?? {
        grey: config.Grey ?? false,
        weak: config.Weak ?? false,
        hideTabs: config.HideTabs ?? false,
        hideFooter: config.HideFooter ?? true,
        showLogo: config.ShowLogo ?? true,
        showModel: config.ShowModel ?? "smart",
        multiTagsCache: config.MultiTagsCache ?? false,
        stretch: config.Stretch ?? false
      }
    },
    config.MultiTagsCache
      ? {
          // Show top-level menu tag by default
          tags: Storage.getData("tags", nameSpace) ?? routerArrays
        }
      : {}
  );

  app.use(Storage, { nameSpace, memory: configObj });
};
