declare module "App" {
  interface EventHandler {
    <T extends Event | MediaQueryListEvent>(ev: T): void;
  }
}
export interface iApp {
  window: Window;
  userAgent: App.UserAgent.UserAgentInfo;
  theme: "light" | "dark" | "no-preference";
  isWebln: boolean;
}
export class App implements App {
  constructor(public value: iApp) {
    this.value.userAgent = new App.UserAgent.UserAgentInfo(this.value.window);
    this.value.isWebln = App.WebLN.isWebLN(this.value.window);
  }
  get themeQuery(): MediaQueryList {
    return App.getThemeQuery(this.value.window);
  }
  get orientationQuery(): MediaQueryList {
    return App.getOrientation(this.value.window);
  }
  set onLoadHander(handler: EventHandler) {
    window.addEventListener("load", handler);
  }
  set themeHandler(handler: EventHandler) {
    this.themeQuery.addEventListener("change", handler);
  }
  set orientationHandler(handler: EventHandler) {
    this.orientationQuery.addEventListener("change", handler);
  }
  requestProvider = async () => {
    console.log(await (window as any).WebLN.requestProvider());
  };
}
export namespace App {
  export const getThemeQuery = (window: Window) =>
    checkMediaQuery(window)("(prefers-color-scheme: dark)");
  export const getOrientation = (window: Window) =>
    checkMediaQuery(window)("(orientation: landscape)");
  const checkMediaQuery = (window: Window) => (string: string) =>
    window.matchMedia(string);

  export namespace WebLN {
    interface iWindow extends Window {
      WebLN?: any;
    }
    export const isWebLN = (window: iWindow) => (window.WebLN ? true : false);
  }

  export namespace UserAgent {
    type useragent = string;
    type device = string;
    type operatingSystem = string;
    type webKitVersion = string;
    type layoutEngine = string;
    type browser_browserVersion = string;
    export interface iUserAgentInfo {
      userAgent: string;
      device: string;
      operatingSystem: string;
      webKitVersion: string;
      layoutEngine: string;
      browser: string;
      browserVersion: string;
    }
    export class UserAgentInfo {
      #userAgent: string;
      value: iUserAgentInfo;
      constructor(window: Window) {
        this.#userAgent = window.navigator.userAgent;
        this.value = this.#makeUserAgentInfos(this.#userAgent);
      }
      get isMobile() {
        return UserAgent.isMobile(this.#userAgent);
      }
      #parseUserAgent(userAgent: string): any {
        return userAgent
          .split("(")
          .map((e) => e.trim())
          .map((e) => e.split(")"))
          .flat()
          .map((e) => e.trim())
          .map((e) => e.split(";"))
          .flat()
          .map((e) => e.trim());
      }
      #makeUserAgentInfos(userAgent: string): iUserAgentInfo {
        const arr: [
          useragent,
          device,
          operatingSystem,
          webKitVersion,
          layoutEngine,
          browser_browserVersion
        ] = this.#parseUserAgent(userAgent);
        const obj: iUserAgentInfo = {
          userAgent: arr[0],
          device: arr[1],
          operatingSystem: arr[2],
          webKitVersion: arr[3],
          layoutEngine: arr[4],
          browser: arr[5].split("/")[0],
          browserVersion: arr[5].split("/")[1],
        };
        return obj;
      }
    }
    export const isMobile = (userAgent: string) =>
      /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
        userAgent
      );
  }
}
