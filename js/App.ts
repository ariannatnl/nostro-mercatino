import { requestProvider } from "../node_modules/webln/lib/client";
import { WebLNProvider } from "../node_modules/webln/lib/provider";

declare module "App" {
  interface Callback<T> {
    (arg: T): void;
  }
  interface EventHandler extends Callback<Event | MediaQueryListEvent> {}
  interface EmitHandler extends Callback<undefined> {}
  interface iWindow extends Window {
    WebLN?: { requestProvider: typeof requestProvider };
  }
}
export interface iApp {
  window: Window;
  userAgent: App.UserAgent.UserAgentInfo;
  theme: "light" | "dark" | "no-preference";
  isWebln: boolean;
  webln: WebLNProvider;
}
export class App implements App {
  constructor(public value: iApp) {
    const mkcb = this.makeEmitCb;
    this.value.userAgent = new App.UserAgent.UserAgentInfo(this.value.window);
    this.value.isWebln = App.WebLN.isWebLN(this.value.window);
    this.value.window.addEventListener("load", mkcb("load"));
    this.themeQuery.addEventListener("change", mkcb("themeChange"));
    this.orientationQuery.addEventListener("change", mkcb("orientationChange"));
  }
  get themeQuery(): MediaQueryList {
    return App.getThemeQuery(this.value.window);
  }
  get orientationQuery(): MediaQueryList {
    return App.getOrientation(this.value.window);
  }
  set themeHandler(handler: EventHandler) {
    this.themeQuery.addEventListener("change", handler);
  }
  set orientationHandler(handler: EventHandler) {
    this.orientationQuery.addEventListener("change", handler);
  }
  makeEmitCb = (type: keyof typeof App.events) => () => this.emit(type);
  requestProvider = async () => {
    this.emit("requestedProvider");
    try {
      this.value.webln = await (window as iWindow).WebLN!.requestProvider();
      this.emit("got-provider");
    } catch (error) {
      this.emit("no-provider");
    }
  };
  #subscribers = new Map<keyof typeof App.events, EmitHandler[]>();
  emit(type: keyof typeof App.events) {
    const subscribers = this.#subscribers.get(type);
    if (subscribers) subscribers.forEach((e) => e(undefined));
    else throw new Error("no subscriber for this event");
  }
  on(type: keyof typeof App.events, subscriber: EmitHandler) {
    const subscribers = this.#subscribers.get(type);
    if (subscribers) subscribers.push(subscriber);
    else this.#subscribers.set(type, [subscriber]);
    return this;
  }
  appendTo = (to: "body" | "layout", element: HTMLElement) => {
    if (to === "body") {
      this.value.window.document
        .getElementsByTagName(to)[0]
        .appendChild(element);
    } else {
      this.value.window.document.getElementById(to)?.appendChild(element);
    }
  };
  appendToBody = (element: HTMLElement) => {
    return this.appendTo("body", element);
  };
  setBodyClassName = (className: string) => {
    const body = this.value.window.document
      .getElementsByTagName("body")
      .item(0);
    if (body) {
      body.className = className;
    }
  };
}
export namespace App {
  export enum events {
    load = "load",
    ["no-provider"] = "no-provider",
    ["got-provider"] = "got-provider",
    themeChange = "themeChange",
    orientationChange = "orientationChange",
    requestedProvider = "requestedProvider",
  }
  export const getThemeQuery = (window: Window) =>
    checkMediaQuery(window)("(prefers-color-scheme: dark)");
  export const getOrientation = (window: Window) =>
    checkMediaQuery(window)("(orientation: landscape)");
  const checkMediaQuery = (window: Window) => (string: string) =>
    window.matchMedia(string);

  export namespace WebLN {
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
