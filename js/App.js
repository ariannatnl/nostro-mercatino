var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
export class App {
    constructor(value) {
        this.value = value;
        this.requestProvider = () => __awaiter(this, void 0, void 0, function* () {
            console.log(yield window.WebLN.requestProvider());
        });
        this.value.userAgent = new App.UserAgent.UserAgentInfo(this.value.window);
        this.value.isWebln = App.WebLN.isWebLN(this.value.window);
    }
    get themeQuery() {
        return App.getThemeQuery(this.value.window);
    }
    get orientationQuery() {
        return App.getOrientation(this.value.window);
    }
    set onLoadHander(handler) {
        window.addEventListener("load", handler);
    }
    set themeHandler(handler) {
        this.themeQuery.addEventListener("change", handler);
    }
    set orientationHandler(handler) {
        this.orientationQuery.addEventListener("change", handler);
    }
}
(function (App) {
    App.getThemeQuery = (window) => checkMediaQuery(window)("(prefers-color-scheme: dark)");
    App.getOrientation = (window) => checkMediaQuery(window)("(orientation: landscape)");
    const checkMediaQuery = (window) => (string) => window.matchMedia(string);
    let WebLN;
    (function (WebLN) {
        WebLN.isWebLN = (window) => (window.WebLN ? true : false);
    })(WebLN = App.WebLN || (App.WebLN = {}));
    let UserAgent;
    (function (UserAgent) {
        var _UserAgentInfo_instances, _UserAgentInfo_userAgent, _UserAgentInfo_parseUserAgent, _UserAgentInfo_makeUserAgentInfos;
        class UserAgentInfo {
            constructor(window) {
                _UserAgentInfo_instances.add(this);
                _UserAgentInfo_userAgent.set(this, void 0);
                __classPrivateFieldSet(this, _UserAgentInfo_userAgent, window.navigator.userAgent, "f");
                this.value = __classPrivateFieldGet(this, _UserAgentInfo_instances, "m", _UserAgentInfo_makeUserAgentInfos).call(this, __classPrivateFieldGet(this, _UserAgentInfo_userAgent, "f"));
            }
            get isMobile() {
                return UserAgent.isMobile(__classPrivateFieldGet(this, _UserAgentInfo_userAgent, "f"));
            }
        }
        _UserAgentInfo_userAgent = new WeakMap(), _UserAgentInfo_instances = new WeakSet(), _UserAgentInfo_parseUserAgent = function _UserAgentInfo_parseUserAgent(userAgent) {
            return userAgent
                .split("(")
                .map((e) => e.trim())
                .map((e) => e.split(")"))
                .flat()
                .map((e) => e.trim())
                .map((e) => e.split(";"))
                .flat()
                .map((e) => e.trim());
        }, _UserAgentInfo_makeUserAgentInfos = function _UserAgentInfo_makeUserAgentInfos(userAgent) {
            const arr = __classPrivateFieldGet(this, _UserAgentInfo_instances, "m", _UserAgentInfo_parseUserAgent).call(this, userAgent);
            const obj = {
                userAgent: arr[0],
                device: arr[1],
                operatingSystem: arr[2],
                webKitVersion: arr[3],
                layoutEngine: arr[4],
                browser: arr[5].split("/")[0],
                browserVersion: arr[5].split("/")[1],
            };
            return obj;
        };
        UserAgent.UserAgentInfo = UserAgentInfo;
        UserAgent.isMobile = (userAgent) => /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(userAgent);
    })(UserAgent = App.UserAgent || (App.UserAgent = {}));
})(App || (App = {}));
