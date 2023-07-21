var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _App_subscribers, _App_eventSubs;
export class App {
    constructor(value) {
        this.value = value;
        this.makeEmitCb = (type) => (data) => this.emit(type, data);
        this.makeEmitEventCb = (type) => (data) => this.emit(type, data);
        this.requestProvider = () => __awaiter(this, void 0, void 0, function* () {
            this.emit("requestedProvider");
            try {
                this.value.webln = yield window.WebLN.requestProvider();
                this.emit("got-provider");
            }
            catch (error) {
                this.emit("no-provider");
            }
        });
        _App_subscribers.set(this, new Map());
        _App_eventSubs.set(this, new Map());
        this.appendTo = (to, element) => {
            var _a;
            if (to === "body") {
                this.value.window.document
                    .getElementsByTagName(to)[0]
                    .appendChild(element);
            }
            else {
                (_a = this.value.window.document.getElementById(to)) === null || _a === void 0 ? void 0 : _a.appendChild(element);
            }
        };
        this.appendToBody = (element) => {
            return this.appendTo("body", element);
        };
        this.setBodyClassName = (className) => {
            const body = this.value.window.document
                .getElementsByTagName("body")
                .item(0);
            if (body) {
                body.className = className;
            }
        };
        const mkcb = this.makeEmitCb;
        const mkecb = this.makeEmitEventCb;
        this.value.userAgent = new App.UserAgent.UserAgentInfo(this.value.window);
        this.value.isWebln = App.WebLN.isWebLN(this.value.window);
        this.value.window.addEventListener("load", mkecb("load"));
        this.themeQuery.addEventListener("change", mkcb("themeChange"));
        this.orientationQuery.addEventListener("change", mkcb("orientationChange"));
        this.value.isMinWIth768 = this.minWidth768Query.matches;
        this.minWidth768Query.addEventListener("change", mkcb("minWidth768"));
    }
    get themeQuery() {
        return App.getThemeQuery(this.value.window);
    }
    get orientationQuery() {
        return App.getOrientation(this.value.window);
    }
    get minWidth768Query() {
        return App.getMinWith768(this.value.window);
    }
    set themeHandler(handler) {
        // @ts-expect-error
        this.themeQuery.addEventListener("change", handler);
    }
    set orientationHandler(handler) {
        // @ts-expect-error
        this.orientationQuery.addEventListener("change", handler);
    }
    set minIdth768Handler(handler) {
        // @ts-expect-error
        this.minWidth768Query.addEventListener("change", handler);
    }
    emit(type, data = undefined) {
        console.log("called");
        if (data) {
            if ("matches" in data) {
                const subscribers = __classPrivateFieldGet(this, _App_subscribers, "f").get(type);
                if (subscribers) {
                    subscribers.forEach((e) => {
                        e(this, data);
                    });
                }
                else
                    throw new Error(`no subscriber for this event: ${type}`);
            }
            else {
                const subscribers = __classPrivateFieldGet(this, _App_eventSubs, "f").get(type);
                if (subscribers) {
                    subscribers.forEach((e) => {
                        e(this, data);
                    });
                }
                else
                    throw new Error(`no subscriber for this event: ${type}`);
            }
        }
        else {
            const subscribers = __classPrivateFieldGet(this, _App_subscribers, "f").get(type);
            if (subscribers) {
                subscribers.forEach((e) => {
                    e(this, undefined);
                });
            }
            else
                throw new Error(`no subscriber for this event: ${type}`);
        }
    }
    on(type, subscriber) {
        const subscribers = __classPrivateFieldGet(this, _App_subscribers, "f").get(type);
        const eventSub = __classPrivateFieldGet(this, _App_eventSubs, "f").get(type);
        if (type === "load") {
            if (eventSub) {
                eventSub.push(subscriber);
            }
            else
                __classPrivateFieldGet(this, _App_eventSubs, "f").set(type, [subscriber]);
        }
        else {
            if (subscribers)
                subscribers.push(subscriber);
            else
                __classPrivateFieldGet(this, _App_subscribers, "f").set(type, [subscriber]);
        }
        return this;
    }
    get() {
        const string = `body/layout`;
        const obj = {};
        string.split("/");
    }
}
_App_subscribers = new WeakMap(), _App_eventSubs = new WeakMap();
(function (App) {
    let events;
    (function (events) {
        events["load"] = "load";
        events["no-provider"] = "no-provider";
        events["got-provider"] = "got-provider";
        events["themeChange"] = "themeChange";
        events["orientationChange"] = "orientationChange";
        events["requestedProvider"] = "requestedProvider";
        events["minWidth768"] = "minWidth768";
    })(events = App.events || (App.events = {}));
    App.getThemeQuery = (window) => checkMediaQuery(window)("(prefers-color-scheme: dark)");
    App.getOrientation = (window) => checkMediaQuery(window)("(orientation: landscape)");
    App.getMinWith768 = (window) => checkMediaQuery(window)("(min-width: 768px)");
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
