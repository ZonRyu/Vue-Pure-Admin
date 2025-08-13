import Cookies from "js-cookie";
import { useUserStoreHook } from "@/store/modules/user";
import { storageLocal, isString, isIncludeAllChildren } from "@pureadmin/utils";

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** Expiration time of `accessToken` (timestamp) */
  expires: T;
  /** Token required when calling the refresh accessToken API */
  refreshToken: string;
  /** Avatar */
  avatar?: string;
  /** Username */
  username?: string;
  /** Nickname */
  nickname?: string;
  /** Current logged-in user's roles */
  roles?: Array<string>;
  /** Current logged-in user's button-level permissions */
  permissions?: Array<string>;
}

export const userKey = "user-info";
export const TokenKey = "authorized-token";
/**
 * Determine if the user is already logged in by checking if `multiple-tabs` exists in `cookie`,
 * which supports opening multiple tabs of the logged-in system without requiring re-login.
 * After the browser is completely closed, `multiple-tabs` will be automatically removed from `cookie`,
 * and the user will need to log in again when reopening the browser
 */
export const multipleTabsKey = "multiple-tabs";

/** Get `token` */
export function getToken(): DataInfo<number> {
  // Same as `TokenKey`, this writing solves the error when `TokenKey` does not exist in `Cookies` during initialization
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey);
}

/**
 * @description Set `token` and some necessary information and adopt a seamless token refresh solution
 * Seamless refresh: The backend returns `accessToken` (token used to access APIs), `refreshToken` (token required when calling the refresh `accessToken` API, the expiration time of `refreshToken` (e.g., 30 days) should be longer than that of `accessToken` (e.g., 2 hours)), and `expires` (expiration time of `accessToken`)
 * Store `accessToken`, `expires`, and `refreshToken` in a cookie with key 'authorized-token' (automatically destroyed when expired)
 * Store `avatar`, `username`, `nickname`, `roles`, `permissions`, `refreshToken`, and `expires` in localStorage with key 'user-info' (automatically destroyed when the browser is completely closed using `multipleTabsKey`)
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();
  expires = new Date(data.expires).getTime(); // If the backend directly sets a timestamp, change this code to expires = data.expires, and change DataInfo<Date> above to DataInfo<number>
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  Cookies.set(
    multipleTabsKey,
    "true",
    isRemembered
      ? {
          expires: loginDay
        }
      : {}
  );

  function setUserKey({ avatar, username, nickname, roles, permissions }) {
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_NICKNAME(nickname);
    useUserStoreHook().SET_ROLES(roles);
    useUserStoreHook().SET_PERMS(permissions);
    storageLocal().setItem(userKey, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles,
      permissions
    });
  }

  if (data.username && data.roles) {
    const { username, roles } = data;
    setUserKey({
      avatar: data?.avatar ?? "",
      username,
      nickname: data?.nickname ?? "",
      roles,
      permissions: data?.permissions ?? []
    });
  } else {
    const avatar =
      storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "";
    const username =
      storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "";
    const nickname =
      storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "";
    const roles =
      storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
    const permissions =
      storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [];
    setUserKey({
      avatar,
      username,
      nickname,
      roles,
      permissions
    });
  }
}

/** Delete `token` and localStorage information with key 'user-info' */
export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove(multipleTabsKey);
  storageLocal().removeItem(userKey);
}

/** Format token (JWT format) */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};

/** Check if there is button-level permission (determined by the `permissions` field returned from the login API) */
export const hasPerms = (value: string | Array<string>): boolean => {
  if (!value) return false;
  const allPerms = "*:*:*";
  const { permissions } = useUserStoreHook();
  if (!permissions) return false;
  if (permissions.length === 1 && permissions[0] === allPerms) return true;
  const isAuths = isString(value)
    ? permissions.includes(value)
    : isIncludeAllChildren(value, permissions);
  return isAuths ? true : false;
};
