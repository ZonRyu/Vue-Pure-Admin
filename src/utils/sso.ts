import { removeToken, setToken, type DataInfo } from "./auth";
import { subBefore, getQueryMap } from "@pureadmin/utils";

/**
 * Simplified frontend single sign-on (SSO), customize according to actual business needs.
 * After the platform starts, you can test with this link: http://localhost:8848/#/permission/page/index?username=sso&roles=admin&accessToken=eyJhbGciOiJIUzUxMiJ9.admin
 * 
 * Key points:
 * Determine if it's an SSO login, if not, return directly without further processing.
 * Below is the logic after SSO login:
 * 1. Clear old local information;
 * 2. Get important parameters from URL and save them locally using setToken;
 * 3. Remove parameters that don't need to be displayed in the URL;
 * 4. Use window.location.replace to navigate to the correct page
 */
(function () {
  // Get parameters from URL
  const params = getQueryMap(location.href) as DataInfo<Date>;
  const must = ["username", "roles", "accessToken"];
  const mustLength = must.length;
  if (Object.keys(params).length !== mustLength) return;

  // Only consider it as SSO login if URL parameters contain all values in 'must' array, to avoid infinite page refresh loop during non-SSO login
  let sso = [];
  let start = 0;

  while (start < mustLength) {
    if (Object.keys(params).includes(must[start]) && sso.length <= mustLength) {
      sso.push(must[start]);
    } else {
      sso = [];
    }
    start++;
  }

  if (sso.length === mustLength) {
    // Determined as SSO login

    // Clear old local information
    removeToken();

    // Save new information locally
    setToken(params);

    // Remove parameters that don't need to be displayed in the URL
    delete params.roles;
    delete params.accessToken;

    const newUrl = `${location.origin}${location.pathname}${subBefore(
      location.hash,
      "?"
    )}?${JSON.stringify(params)
      .replace(/["{}]/g, "")
      .replace(/:/g, "=")
      .replace(/,/g, "&")}`;

    // Replace history entry
    window.location.replace(newUrl);
  } else {
    return;
  }
})();
