! function() {
    "use strict";
    var u = !0,
        n = "_MeiTuanALogObject",
        p = 1,
        r = "dianping_nova",
        h = "waimai",
        m = "group",
        c = "demo",
        _ = "4.19.0",
        g = "lxcuid",
        y = "uuid",
        w = "msid",
        v = "cityid",
        q = "utm",
        t = "utm_source",
        e = "utm_medium",
        i = "utm_content",
        o = "utm_term",
        a = "utm_campaign",
        b = "uid",
        s = "scene",
        S = "userid",
        k = "dpid",
        x = "appnm",
        f = "union_id",
        O = "web_env",
        I = "wxmp_env",
        d = "wxid",
        A = "_lx_validcode",
        j = "pd_data",
        C = /^(([^? \r\n]*)\?)?([^?# \r\n]+)(#\S+)?$/,
        D = setTimeout,
        l = clearTimeout,
        T = 1,
        E = 2,
        N = 3,
        M = 4,
        F = 5,
        R = 6,
        P = 20,
        B = 7;

    function L(t) { var n = t; return t && t.code && (n = t.code), n === T ? "E_TIME_OUT" : n === E ? "E_NO_JSBRIDGE" : n === N ? "E_KNB_FAIL" : n === M ? "E_KNB_CB_FAIL" : n === F ? "E_KNB_NOT_EXIST" : n === P ? "ERR_PARAMS" : n === R ? "E_KNB_METHOD_NOT_SUPPORT" : "unknown error: " + n }
    var V = 200,
        U = 500,
        W = -1,
        J = "PV",
        K = "PD",
        $ = "MC",
        Q = "SC",
        X = "MV",
        z = "MVL",
        H = "ME",
        G = "BO",
        Z = "BP",
        Y = "event_type",
        tt = "val_act",
        nt = "val_cid",
        et = "index",
        rt = "element_id",
        it = "lx_inner_data",
        ot = "pageView",
        at = "systemCheck",
        ut = "moduleClick",
        ct = "order",
        st = "order_id",
        ft = 1e3,
        dt = 2,
        lt = 0,
        vt = -1,
        pt = 0,
        ht = 1,
        mt = 10080,
        gt = 1576800,
        _t = 30,
        yt = "_lx_utm",
        wt = "_lxsdk",
        bt = "_lxsdk_cuid",
        St = "_lxsdk_dpid",
        kt = "_lxsdk_s",
        xt = "latlng",
        Ot = "_lxsdk_rr",
        It = "_lxsdk_rc",
        At = "msid",
        qt = "ms",
        jt = "category",
        Ct = "c",
        Dt = "login_type",
        Tt = "lt",
        Et = "locate_city_id",
        Nt = "lci",
        Mt = "sdk_ver",
        Ft = "sv",
        Rt = "lxcuid",
        Pt = "lxid",
        Bt = "val_lab",
        Lt = "val_bid",
        Vt = "val_val",
        Ut = "sf",
        Wt = "sdk_env",
        Jt = "online",
        Kt = "offline",
        $t = "__$lx_beacon_",
        Qt = "_lx_urltag",
        Xt = { category: u, union_id: u, lxcuid: u, app: u, sdk_ver: u, appnm: u, ch: u, lch: u, ct: u, did: u, dm: u, ua: u, msid: u, uuid: u, lat: u, log: u, net: u, os: u, idfa: u, pushid: u, subcid: u, mac: u, imsi: u, uid: u, logintype: u, cityid: u, apn: u, mno: u, pushSetting: u, wifi: u, bht: u, ip: u, vendorid: u, geohash: u, dtk: u, sns: u, android_id: u, version_code: u, brand: u, utm: u },
        zt = "post",
        Ht = "__lxvalidation",
        Gt = "postreport.meituan.com",
        Zt = "wreport1.meituan.net",
        Yt = "hreport.meituan.com",
        tn = -3,
        nn = function() {},
        en = "pageLeave";

    function rn() { return window }

    function on() { return rn().XMLHttpRequest }
    var an, un, cn = (an = on(), un = an && "withCredentials" in new an, function() { return un }),
        sn = /__lxvalidation=([\w.]+)/i,
        fn = 10,
        dn = !1,
        ln = void 0,
        vn = void 0,
        pn = {};

    function hn(t) {
        var n, e = 0 === Re().indexOf("http:") ? "http:" : "https:",
            r = e + "//" + t + "/",
            i = Hn.search.match(sn) || [],
            o = function() { var t = ke.get(Ht); if (t) { var n = t.split("|"); return { mis: n[0], env: n[1] || "" } } return t || {} }();
        return (n = i && i[1] || o.mis || "") && (ke.top(Ht, n + "|", fn), r = e + "//" + t + "/?mis=" + n, mn.debug = n), r
    }
    var mn = { noHeadless: !0, nt: lt, inWXMP: !1, pageValLab: null, pageEnv: null, use_post: !1, cid: null, appnm: null, quit: null, useQR: !1, onWebviewAppearAutoPV: !0, nativeAutoPD: !0, positiveLab: !0, nativeSDKVer: null, cacheRetryMinutes: 5, debug: !1, autoPD: !0, sessionScope: "top", isDev: !1, reportDelay: 500 },
        gn = [];
    mn.on = function(t, n) { gn.push({ name: t, fn: n }) };
    var _n = {
        MVL: !(mn.emit = function(r, i, o, a, u) {
            ye.each(gn, function(t) {
                var n = t.name,
                    e = t.fn;
                n === r && e(i, o, a, u)
            })
        }),
        QR: !1,
        getReqId: !1
    };

    function yn(t) { return !!_n[t] }
    var wn = void 0;

    function bn() { return wn }
    var Sn = {
        path: location.href.replace(/^(.+\/\/[^?#]+).*$/, "$1"),
        isHeadless: function() {
            if (0 <= Qe) return Qe;
            var t = navigator.userAgent;
            Qe = 0, /HeadlessChrome/.test(t) && (Qe += 1);
            navigator.webdriver && (Qe += 10);
            window.chrome || (Qe += 100);
            navigator.plugins && 0 !== navigator.plugins.length || (Qe += 1e3);
            /mtdp-searchspider/.test(t) && (Qe += 1e4);
            /spider/.test(t) && (Qe += 1e5);
            t && "" !== t || (Qe += 1e6);
            return Qe
        }(),
        labv: 10006,
        cv: "prod",
        web: 1,
        proxy: "function" == typeof window.Proxy && /native code/.test(window.Proxy.toString()) ? 1 : 0
    };

    function kn(t, n) { t && null == n ? delete Sn[t] : Sn[t] = n }

    function xn(t) { return t ? Sn[t] : Sn }

    function On(t, n) { he.isStr(t) && (pn[t] = n) }

    function In(t) { dn = t }

    function An() { return dn === p }

    function qn(t) { return ln && !t || (ln = hn(Gt)), ln }
    var jn = [Zt, "wreport2.meituan.net"],
        Cn = 0;

    function Dn(t) {
        if (!vn || t) {
            var n = jn[parseInt(Cn++ % 12 / 6)];
            vn = hn(n)
        }
        return vn
    }
    var Tn = void 0;

    function En() { if (ne !== Tn) return Tn; var t = Gn.getElementsByTagName("meta"); return Tn = "off" === je(t, "lx:native-report") }
    var Nn = lt;

    function Mn() { return Nn }

    function Fn(t) { En() || (Nn = t) }
    var Rn = !1;

    function Pn(t) { Rn = !!t }
    var Bn = 5e3,
        Ln = 50,
        Vn = { MVL: {} },
        Un = void 0,
        Wn = void 0;

    function Jn(t, n, e, r) {
        r = r || {};
        var i = n.category,
            o = e.req_id,
            a = e.val_cid,
            u = e.val_bid,
            c = r.tag;
        if (Vn[t] && he.isStr(t) && he.isStr(i) && he.isStr(o) && he.isStr(a) && he.isStr(u)) {
            var s = i + "_" + o + "_" + a + "_" + u,
                f = Vn[t];
            he.isObj(f[s]) || (f[s] = { env: me(!0, {}, n), evs: e, lab: [] }), he.isObj(c) && (f[s].evs.tag = c);
            var d = me(!0, e.val_lab, { _seq: e.seq, _tm: e.tm });
            f[s].lab.push(d),
                function() {
                    var t = 0;
                    for (var n in Vn) {
                        var e = Vn[n];
                        for (var r in e) {
                            var i = e[r].lab;
                            t += i.length || 0
                        }
                    }
                    Ln < t && Qn()
                }()
        }
    }

    function Kn(t, n) {
        var e = (n || {}).withUnload,
            r = Vn[t];
        if (he.isObj(r)) {
            var i = [];
            for (var o in r) {
                var a = r[o],
                    u = !1;
                if (a.lab && a.lab.length) {
                    var c = a.env,
                        s = a.evs,
                        f = { mv_list: a.lab, custom: { _withUnload: !!e } };
                    s.val_lab = f;
                    for (var d = 0, l = i.length; d < l; d++) { var v = i[d]; if (!$n(v, c)) { v.evs.push(s), u = !0; break } }
                    u || (c.evs = [s], i.push(c))
                }
            }
            i.length && Wn.send(i), Vn[t] = {}
        }
    }

    function $n(t, n) {
        var e = 0,
            r = 0;
        for (var i in t) t.hasOwnProperty(i) && e++;
        for (var o in n) n.hasOwnProperty(o) && r++;
        var a = r < e ? t : n,
            u = e <= r ? t : n;
        for (var c in a) {
            if (!(-1 < "evs|".indexOf(c + "|")))
                if (he.isObj(a[c]) && he.isObj(u[c])) { if ($n(a[c], u[c])) return !0 } else if (a[c] !== u[c]) return !0
        }
        return !1
    }

    function Qn(t) { var n = (t || {}).withUnload; for (var e in Vn) Kn(e, { withUnload: n }) }
    D(function t() { clearTimeout(Un); try { Qn() } catch (t) {} finally { Mn() === lt ? Un = D(t, Bn) : clearTimeout(Un) } }, 100);
    var Xn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
        zn = rn(),
        Hn = location,
        Gn = document,
        Zn = Gn.domain,
        Yn = navigator,
        te = Yn.userAgent.toString(),
        ne = void 0,
        ee = Array.prototype,
        re = Object.prototype,
        ie = decodeURIComponent,
        oe = encodeURIComponent,
        ae = le(),
        ue = re.toString,
        ce = re.hasOwnProperty;

    function se() {}

    function fe(t) { return void 0 === t ? "undefined" : Xn(t) }

    function de(t, n) { return fe(t) === n }

    function le() { return +new Date }

    function ve() { return Math.random() }

    function pe(t) { return de(t, "number") }
    var he = {};

    function me(t, e, r) {
        var i = void 0,
            o = !0 === t;
        return o || (r = e, e = t), e && he.isObj(e) || (e = {}), r && he.isObj(r) || (r = {}), ye.each(r, function(t, n) { o && he.isObj(r[n]) ? (i = e[n], e[n] = he.isObj(i) ? i : {}, me(o, e[n], r[n])) : e[n] = r[n] }), e
    }
    he.trim = function(t) { return t.replace(/^[\s\uFEFF\xA0\u3000]+|[\s\uFEFF\xA0\u3000]+$/g, "") }, he.now = le, he.rnd = ve, he.hasOwn = function(t, n) { return ce.call(t, n) };
    var ge = function(t) { return t && "[object Object]" === ue.call(t) };
    he.isObj = ge;
    var _e = function(t) { return de(t, "string") };
    he.isStr = _e, he.isFunc = function(t) { return de(t, "function") }, he.attr = function(t, n) { return t.getAttribute(n) }, he.parseQuery = function(t) {
        var i = {};
        if (t) {
            var n = t.replace(C, function(t, n, e, r) { return r || "" }).split("&");
            return ye.each(n, function(t) {
                var n = t.split("="),
                    e = n[0],
                    r = n.slice(1).join("") || "";
                e && !ce.call(i, e) && (i[e] = ie(r))
            }), i
        }
    }, he.stringifyQuery = function(t) {
        var r = [];
        return he.isObj(t) && ye.each(t, function(t, n) {
            var e;
            he.isFunc(t) || (ne !== t && ((e = t) || !de(e, "object")) || (t = t || ""), r.push(oe(n) + "=" + oe(t)))
        }), r.join("&")
    }, he.genReqId = function() { return "" + 1e3 * le() + parseInt(1e3 * ve()) }, he.run = function(t, n) { we(t) ? ye.each(t, n) : n(t) }, he.on = function(t, n, e) { t.addEventListener ? t.addEventListener(n, e, !1) : t.attachEvent && t.attachEvent("on" + n, e) }, he.off = function(t, n, e) { t.removeEventListener ? t.removeEventListener(n, e, !1) : t.detachEvent && t.detachEvent("on" + n, e) };
    var ye = { isArray: function(t) { return "[object Array]" === ue.call(t) } },
        we = function(t) { if (!t) return !1; var n = t.length; return !!ye.isArray(t) || !!(t && pe(n) && 0 <= n) && (!he.isObj(t) || (!(1 < n) || n - 1 in t)) };
    ye.isArrayLike = we, ye.find = function(e, r, i) { var o = void 0; return we(e) && ye.each(e, function(t, n) { if (!0 === r.call(i, t, n, e)) return o = t, !1 }), o }, ye.filter = function(e, r, i) { var o = []; return we(e) && ye.each(e, function(t, n) { r.call(i, t, n, e) && o.push(t) }), o }, ye.toArray = function(t, n, e) { var r = []; return we(t) && ye.each(t, function(t) { r.push(n ? n.call(e, t) : t) }, e), r };
    var be = function(t, n, e) {
        if (t) {
            var r = void 0,
                i = void 0,
                o = void 0;
            if (we(t))
                for (i = 0, o = t.length; i < o && !1 !== n.call(e, t[i], i, t); i++);
            else
                for (r in t)
                    if (he.hasOwn(t, r) && !1 === n.call(e, t[r], r, t)) break
        }
    };
    ye.each = be;
    var Se = function(t, n, e) {
        if (t) {
            for (var r = [], i = 0, o = t.length; i < o; i++) {
                var a = n.call(e, t[i], i, t);
                r.push(a)
            }
            return r
        }
    };
    ye.slice = function(t, n, e) { return ee.slice.call(ye.toArray(t), n, e) }, ye.reduce = function(t, n) {
        if (we(t) && he.isFunc(n)) {
            var e = t,
                r = e.length >>> 0,
                i = 0,
                o = void 0,
                a = arguments;
            if (3 === a.length) o = a[2];
            else {
                for (; i < r && !(i in e);) i++;
                if (r <= i) return;
                o = e[i++]
            }
            for (; i < r;) i in e && (o = n(o, e[i], i, e)), i++;
            return o
        }
    };
    var ke = {};

    function xe(t) {
        var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            e = void 0,
            r = void 0,
            i = void 0,
            o = void 0,
            a = void 0,
            u = 0,
            c = 0,
            s = "",
            f = [];
        if (!t) return t;
        for (t = Oe(t); e = (a = t.charCodeAt(u++) << 16 | t.charCodeAt(u++) << 8 | t.charCodeAt(u++)) >> 18 & 63, r = a >> 12 & 63, i = a >> 6 & 63, o = 63 & a, f[c++] = n.charAt(e) + n.charAt(r) + n.charAt(i) + n.charAt(o), u < t.length;);
        switch (s = f.join(""), t.length % 3) {
            case 1:
                s = s.slice(0, -2) + "==";
                break;
            case 2:
                s = s.slice(0, -1) + "="
        }
        return s
    }

    function Oe(t) {
        var n, e = "",
            r = void 0,
            i = void 0,
            o = void 0;
        for (r = i = 0, n = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, o = 0; o < n; o++) {
            var a = t.charCodeAt(o),
                u = null;
            a < 128 ? i++ : u = 127 < a && a < 2048 ? String.fromCharCode(a >> 6 | 192, 63 & a | 128) : String.fromCharCode(a >> 12 | 224, a >> 6 & 63 | 128, 63 & a | 128), null !== u && (r < i && (e += t.substring(r, i)), e += u, r = i = o + 1)
        }
        return r < i && (e += t.substring(r, t.length)), e
    }
    ke.del = function(t, n) {
        var e = t + "=;path=/;domain=" + n,
            r = new Date;
        return r.setFullYear(1970), e += ";expires=" + r.toUTCString(), Gn.cookie = e, !0
    }, ke.get = function(t) { var n = Gn.cookie.match(new RegExp("(?:^|;)\\s*" + t + "=([^;]+)")); return ie(n ? n[1] : "") }, ke.set = function(t, n, e, r) {
        r = r || Gn.domain;
        var i = void 0,
            o = void 0,
            a = void 0,
            u = t + "=" + oe(n) + ";path=/;domain=" + r;
        ne === e || isNaN(e) || (i = new Date, o = 60 * parseInt(e, 10) * 1e3, a = i.getTime() + o, i.setTime(a), u += ";expires=" + i.toUTCString());
        try { return Gn.cookie = u, !0 } catch (t) { return !1 }
    }, ke.top = function(t, n, e) {
        var r = Gn.domain,
            i = r.split("."),
            o = i.length,
            a = o - 1,
            u = void 0,
            c = !1;
        for (n = "" + n; !c && 0 <= a && (r = i.slice(a, o).join("."), ke.set(t, n, e, r), u = ke.get(t), ne !== u && (c = u === n), a--, !c););
    }, ke.del = function(t) { return ke.top(t, "", -100) };
    var Ie = window.btoa,
        Ae = xe;
    kn("btoa", !!window.btoa), kn("atob", !!window.atob);
    try { he.isFunc(Ie) && Ie(Oe(te)) === xe(te) && (Ae = function(t) { return Ie(Oe(t)) }) } catch (t) {}
    var qe = Ae;

    function je(t, n) {
        var e = void 0,
            r = ye.find(t, function(t) { return he.attr(t, "name") === n });
        return r && (e = he.attr(r, "content")), e
    }

    function Ce() { var t = zn[n]; return zn[t] }
    var De, Te = (De = void 0, { update: function(t) { De = t }, get: function() { return De } });

    function Ee(t) {
        var n = t || le(),
            e = Ce();
        Te.update(n), ae = n, e && (e.l = n)
    }

    function Ne() {
        var t = {
                duration: function() {
                    var t = void 0,
                        n = Te.get(),
                        e = le();
                    if (n) t = n, Te.update(e);
                    else {
                        var r = Ce(),
                            i = zn.performance && zn.performance.timing;
                        (t = i && i.requestStart) || (t = r ? r.l : ae), Te.update(e)
                    }
                    return e - t
                }()
            },
            n = void 0,
            e = mn.quit;
        return he.isFunc(e) && (n = e() || {}), t = me(t, n || {})
    }

    function Me(t, n) { n[st] }
    var Fe = 2032;

    function Re() { return Hn.protocol }
    /trident/i.test(te) || /msie/i.test(te) || !/mozilla.+webkit.+chrome.+/i.test(te) || (Fe = 6e3);
    var Pe = 0;

    function Be(t, n) {
        var e = /^((\d+\.)+\d+).*$/;
        if ("string" !== fe(t) || "string" !== fe(n)) return NaN;
        if (!e.test(t) || !e.test(n)) return NaN;
        for (var r = t.replace(e, "$1").split("."), i = n.replace(e, "$1").split("."), o = 0, a = Math.max(r.length, i.length); o < a; o++) {
            if (!r[o] || !i[o])(!r[o] && r || !i[o] && i).push("0");
            var u = r[o].toString().length,
                c = i[o].toString().length;
            if (u !== c) {
                var s = c < u ? i : r;
                s[o] = Array(Math.abs(u - c) + 1).join("0") + s[o].toString()
            }
        }
        var f = parseInt(r.join("")),
            d = parseInt(i.join(""));
        return f == d ? 0 : d < f ? 1 : -1
    }

    function Le(e, r, i, o, a, u, c) {
        return function(t) {
            if (Ze(en), mn.autoPD && !e) {
                e = !0;
                try {
                    if (r && new Date - i < 50) return;
                    if (o) return;
                    if (o = !1, !c()) {
                        var n = Ne();
                        a("pageDisappear", n, { isAuto: 6, shouldStore: !0 })
                    }
                    Qn({ withUnload: !0 })
                } catch (t) {}
                u && u(t)
            }
        }
    }
    var Ve = 4,
        Ue = "",
        We = function(t) { Ve = t },
        Je = function() { return Ue && 3 === Ve },
        Ke = function(t) { Ue = t },
        $e = function() { return Ue },
        Qe = -1;
    var Xe = void 0;
    try { Xe = zn.sessionStorage } catch (t) { Xe = null }
    var ze = void 0;
    ze = he.isFunc(zn.atob) ? zn.atob : function(t) { return t };
    var He = {},
        Ge = function(t, n) { var e = n || "fn_" + parseInt(1e6 * ve()); return He[e] = t, e },
        Ze = function(t, n) { if (He[t]) try { He[t](n), D(function() { delete He[t] }, 0) } catch (t) {} },
        Ye = te,
        tr = [{ n: c, r: /lingxi\/demo\/\d+/i, v: Ye }, { n: r, r: /dp\/com\.dianping\.[\w.]+\/([\d.]+)/i, v: Ye }, { n: h, r: /\bmeituanwaimai-c\/\d+\./i, v: Ye }, { n: "moviepro", r: /\bmoviepro/i, v: Ye }, { n: "movie", r: /\bmaoyan\b/i, v: Ye }, { n: m, r: /\bmeituan \d+|meituangroup\/\d+\./i, v: Ye }],
        nr = /android/i.test(Ye),
        er = "",
        rr = nr,
        ir = !1,
        or = !1,
        ar = "www",
        ur = !1;
    if (/\bandroid|mobile\b|\bhtc\b/i.test(Ye)) {
        ar = "i", rr = !0, ye.each(tr, function(t) { if (t.r.test(t.v)) return er = t.n, !1 }), /\btitans(no){0,1}x\b/i.test(Ye) && (ir = !0);
        var cr = /iphone/i.test(Ye),
            sr = /ipad/i.test(Ye);
        (cr || sr) && (or = !0), er && (cr ? ar = "iphone" : /android/i.test(Ye) ? ar = "android" : sr && (ar = "ipad"))
    } else {
        var fr = Ye.match(/(msie) (\d+)|Trident\/(d+)/i);
        fr && (ur = !0, fr && parseInt(fr[2], 10))
    }
    var dr, lr, vr, pr, hr = zn.screen.width + "*" + zn.screen.height,
        mr = !/Chrome/.test(Ye) && !ur && /Mozilla.+AppleWebKit.+Version.+Safari.+/.test(Ye),
        gr = /firefox/i.test(Ye),
        _r = te.replace(/^.*Titans(No)?X\/([\w.]+)\s.*$/i, "$2"),
        yr = !(!rr || !/\sMMP\//.test(Ye)),
        wr = !(!/\sMicroMessenger/.test(Ye) || yr),
        br = ir || / knb\/\d+/i.test(te),
        Sr = function() { return rr && br && !wr && !yr },
        kr = zn.JSON;
    kr || (kr = { parse: function(t) { return new Function("return (" + t + ")")() }, stringify: (dr = ye.isArray, lr = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t" }, vr = function(t) { return lr[t] || "\\u" + (t.charCodeAt(0) + 65536).toString(16).substr(1) }, pr = /[\\"\u0000-\u001F\u2028\u2029]/g, function t(n) { if (null == n) return "null"; if (de(n, "number")) return isFinite(n) ? n.toString() : "null"; if (de(n, "boolean")) return n.toString(); if (de(n, "object")) { if ("function" === fe(n.toJSON)) return t(n.toJSON()); if (dr(n)) { for (var e = "[", r = 0; r < n.length; r++) e += (r ? ", " : "") + t(n[r]); return e + "]" } if (he.isObj(n)) { var i = []; for (var o in n) n.hasOwnProperty(o) && i.push(t(o) + ": " + t(n[o])); return "{" + i.join(", ") + "}" } } return '"' + n.toString().replace(pr, vr) + '"' }) });
    var xr = kr;

    function Or(t) { return t }

    function Ir(t) { try { t(Tr(this, qr), Tr(this, Ar)) } catch (t) { if (this._state === jr) return Nr(new Ir(Or), Ar, t) } }
    Ir.prototype.then = function(t, n) {
        return function(t, n, e, r) {
            fe(e) === Cr && (n._onFulfilled = e);
            fe(r) === Cr && (n._onRejected = r);
            t._state === jr ? t[t._pCount++] = n : Er(t, n);
            return n
        }(this, new Ir(Or), t, n)
    }, Ir.all = function(l) {
        return new Ir(function(r, e) {
            for (var t, n, i, o = 0, a = l.length, u = [], c = 0, s = void 0, f = function(e) {
                    return function(t) {
                        if (e.value = t, e.state = qr, ++c === e.len && !s) {
                            var n = function(t) { var n = []; for (o = 0; o < a; o++) n.push(t[o] ? t[o].value : void 0); return n }(u);
                            r(n)
                        }
                    }
                }, d = function(n) { return function(t) { n.value = t, n.state = Ar, c++, s || (s = !0, e(t)) } }; o < a; o++) n = t = void 0, n = l[o], i = { value: null, index: o, state: null, len: a }, u.push(i), t = i, n.then ? n.then(f(t), d(t)) : Ir.resolve(n).then(f(t), d(t))
        })
    }, Ir.resolve = function(n) { if (n instanceof Ir) return n; if (he.isFunc(n.then)) { var e = n.then.bind(n); return new Ir(function(t, n) { e(t, n) }) } return new Ir(function(t) { t(n) }) }, Ir.reject = function(e) { return new Ir(function(t, n) { n(e) }) };
    var Ar = 0,
        qr = 1,
        jr = 2,
        Cr = "function",
        Dr = "object";

    function Tr(n, e) { return function(t) { return Nr(n, e, t) } }

    function Er(e, r) {
        return setTimeout(function() {
            var t = void 0,
                n = e._state ? r._onFulfilled : r._onRejected;
            if (void 0 !== n) {
                try { t = n(e._value) } catch (t) { return void Nr(r, Ar, t) }
                Mr(r, t)
            } else Nr(r, e._state, e._value)
        })
    }

    function Nr(t, n, e) { if (t._state === jr) { t._state = n, t._value = e; for (var r = 0, i = t._pCount; r < i;) Er(t, t[r++]); return t } }

    function Mr(n, t) {
        if (t !== n || !t) {
            var e = void 0,
                r = fe(t);
            if (null === t || r !== Cr && r !== Dr) Nr(n, qr, t);
            else {
                try { e = t.then } catch (t) { return void Nr(n, Ar, t) }
                fe(e) === Cr ? function(n, e, t) { try { t.call(e, function(t) { e && (e = null, Mr(n, t)) }, function(t) { e && (e = null, Nr(n, Ar, t)) }) } catch (t) { e && (Nr(n, Ar, t), e = null) } }(n, t, e) : Nr(n, qr, t)
            }
            return n
        }
        Nr(n, Ar, new Error("promise_circular_chain"))
    }
    Ir.prototype._state = jr, Ir.prototype._pCount = 0;
    var Fr, Rr = !mr && !ur && zn.indexedDB,
        Pr = zn.IDBFactory,
        Br = Rr && he.isFunc(Rr.open) && Rr.constructor === Pr,
        Lr = !1,
        Vr = void 0,
        Ur = void 0,
        Wr = void 0,
        Jr = 60 * (parseInt(mn.cacheRetryMinutes) || 5),
        Kr = !1,
        $r = 0;

    function Qr() {
        return new Ir(function(n, e) {
            if (ir || gr) return e();
            if (!Br) return e();
            if (Lr) return n();
            try {
                (Vr = Rr.open("_lxsdk_db", 1e3)).onsuccess = function(t) { Lr = !0, Ur = t.target.result, n() }, Vr.onupgradeneeded = function(t) { Ur = t.target.result, (Wr = Ur.createObjectStore("cache", { keyPath: "id", autoIncrement: !0 })).createIndex("evs", "evs", { unique: !1 }), Wr.createIndex("type", "type", { unique: !1 }) }
            } catch (t) { Lr = !1, e() }
        })
    }

    function Xr() {
        Qr().then(function() {
            var e = Ur.transaction(["cache"], "readwrite").objectStore("cache"),
                t = e.openCursor(),
                r = [];
            t.onsuccess = function(t) {
                var n = t.target.result;
                n ? (r.push(n.value), n.continue()) : ($r = r.length, r.forEach(function(t) {
                    ! function(t) {
                        if ("get" === t.type) {
                            var n = document.createElement("img"),
                                e = Math.random();
                            n.src = "//" + Zt + "/?d=" + qe("[" + t.evs + "]") + "&t=1&r=" + e + "&_lxsdk_rnd=" + e, n.id = e, window["img_" + e] = n
                        } else try { window.navigator.sendBeacon("//" + Gt, JSON.stringify(t)) } catch (t) {}
                    }(t), e.delete(t.id)
                }))
            }
        })
    }
    Qr();
    var zr = {
            add: function(t, e) {
                Qr().then(function() {
                    var n = Ur.transaction(["cache"], "readwrite").objectStore("cache");
                    100 < $r && n.clear(), t.forEach(function(t) { t.evs.forEach(function(t) { t[it] = t[it] || {}, t[it].fc = 1 }), n.add({ type: e, evs: JSON.stringify(t) }) })
                })
            },
            check: Xr,
            startPoll: function() {
                !Kr && Br && (Kr = !0, Fr = +new Date, Qr().then(function() {
                    setTimeout(function t() {
                        var n = "_lxsdk_rc_img",
                            e = zn[n] = new Image;
                        e.onload = function() { Xr(), Kr = !1, zn[n] = null }, e.onabort = e.onerror = function() {+new Date - Fr > 1e3 * Jr || (setTimeout(t, 6e3), zn[n] = null) }, e.src = "//" + Zt + "/?r=" + Math.random()
                    }, 6e3)
                }))
            }
        },
        Hr = 3,
        Gr = 150,
        Zr = 5e3,
        Yr = 3500,
        ti = !1,
        ni = [],
        ei = [],
        ri = 0,
        ii = [],
        oi = [],
        ai = void 0,
        ui = 0,
        ci = !mn.use_post,
        si = nr && /baiduboxapp\//.test(Ye) || /Mozilla.+AppleWebKit.+Chrome.+Safari.+/i.test(Ye) && !rr,
        fi = !ur && he.isFunc(Yn.sendBeacon);

    function di(t, n, e, r, i) {
        if (!(0 <= te.indexOf("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0"))) {
            var o = [{ project: "com.sankuai.analytics.web4", pageUrl: Hn.href, resourceUrl: t, category: i ? "jsError" : "ajaxError", sec_category: "prod_" + n, level: "error", unionId: e, timestamp: he.now(), content: "" + r || "" }],
                a = yi("//catfront.dianping.com/api/log?v=1", zt, "application/x-www-form-urlencoded");
            a && (a.onerror = a.onreadystatechange = function() {}, a.send("c=" + encodeURIComponent(xr.stringify(o))))
        }
    }

    function li() {
        if (!(0 <= te.indexOf("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0") || (t = 100, Math.ceil(Math.random() * t) !== t))) {
            var t, n = { kvs: { initTimes: [1] }, tags: {}, ts: parseInt((new Date).getTime() / 1e3) },
                e = yi("https://catfront.dianping.com/api/metric?p=com.sankuai.analytics.web4&v=1", zt, "application/x-www-form-urlencoded");
            e && (e.onerror = e.onreadystatechange = function() {}, e.send("data=" + encodeURIComponent(xr.stringify(n))))
        }
    }

    function vi() {
        if (ai) {
            var t = oi.concat([]);
            clearTimeout(ai), ii.length && pi(function(n) {
                try {
                    var i = [],
                        o = void 0;
                    return be(n, function(t) {
                        var n = t.evs;
                        delete t.evs;
                        var e = xr.stringify(t);
                        if (e === o) {
                            var r = i.length - 1;
                            i[r].evs = (i[r].evs || []).concat(n)
                        } else t.evs = n, i.push(t), o = e
                    }), i
                } catch (t) { return di(Hn.href, "", "", t.stack || t.message, !0), n }
            }(ii), {
                cb: function() {
                    var n = arguments;
                    ye.each(t, function(t) { t.apply(ne, n) })
                }
            }), ai = null, ii = [], oi = []
        }
    }

    function pi(t, n) {
        if (Hr <= ui) return !1;
        n = me({ cb: se }, n || {});
        var e = qn();
        ci = !mr && !mn.use_post;
        try {
            n.useBeacon && fi ? hi(e, t) : ci ? function(e, t) {
                var r = (t = t || {}).cb,
                    n = le().toString(16) + ri++,
                    i = qn(),
                    o = !1,
                    a = !1,
                    u = void 0,
                    c = void 0,
                    s = (f = e, d = [], l = [{ l: Mt, s: Ft }, { l: At, s: qt }, { l: jt, s: Ct }, { l: Dt, s: Tt }, { l: Rt, s: Pt }, { l: Et, s: Nt }], ye.each(f, function(t) {
                        var n = me(!0, {}, t);
                        ye.each(l, function(t) { wi(n, t.l, t.s) });
                        var r = [];
                        ye.each(t.evs, function(e) { e = me(!0, {}, e), ye.each(e, function(t, n) {-1 < n.indexOf("val_") && (e[n.replace("val_", "")] = e[n], delete e[n]), wi(e, "refer_url", "urlr") }), r.push(e) }), n.evs = r, n[Pt] === n.uuid && delete n.uuid;
                        var e = n[Ct];
                        e && (n[Ct] = e.replace("data_sdk_", "")), delete n.ua, d.push(n)
                    }), d);
                var f, d, l;
                if (ye.each(s, function(t) { c = t.uuid || t.lxid, delete t.ua }), ! function(t) { for (var n = t.length, e = n, r = 0; r < n; r++) 127 < t.charCodeAt(r) && e++; return 1.5 * e < Fe }(u = xr.stringify(s))) return ye.each(e, function(t) {
                    ye.each(t.evs, function(t) {
                        var n = t.val_lab;
                        t.val_lab = me(!0, { custom: { _s: 1 } }, n || {})
                    })
                }), gi(i, e, {
                    cb: function(t, n) {
                        try { r(t, n, "ajax-post") } catch (t) {}
                        t !== V && (!o && fi && (o = !0, hi(i, e)), a || (a = !0, di(location.host + location.pathname, "ajax-post-" + t + "-" + n, c, u)))
                    }
                });
                var v = qe(u),
                    p = oe(v),
                    h = Dn(!0);
                h += -1 < h.indexOf("?") ? "&d=" + p : "?d=" + p, p.length, h = h + "&t=1&r=" + n, si ? gi(h, null, {
                    method: "get",
                    cb: function(t, n) {
                        try { r(t, n, "ajax-get") } catch (t) {}
                        t !== V && (!o && fi && (o = !0, hi(i, e), zr.add(s, "get"), zr.startPoll()), a || (a = !0, di(location.host + location.pathname, "ajax-get-" + t + "-" + n, c, u)))
                    }
                }) : function t(n, e, r) {
                    var i = void 0,
                        o = $t + Pe++;
                    if (e = e || {}, !(2 < (r = r || 0))) return zn[o] = i = new Image, i.onload = function() { he.isFunc(e.cb) && e.cb(!0), zn[o] = null }, i.onabort = i.onerror = function() { zn[o] = null, D(function() { t(n, e, ++r) }, 100) }, i.src = n, i;
                    he.isFunc(e.cb) && e.cb(!1)
                }(h, { cb: function(t) { if (t) try { r(V, 200, "image-get") } catch (t) {} else { try { r(tn, 0, "ajax-get-to-image-get") } catch (t) {}!o && fi && (o = !0, hi(i, e), zr.add(s, "get"), zr.startPoll()), a || (a = !0, di(location.host + location.pathname, "image-get-500-0", c, u)) } } })
            }(t, n) : gi(e, t, n) || ur && mi(e, t, n) || hi(e, t) && n.cb(V)
        } catch (t) { return di(Hn.path, "report-ajax", 0, t.message, !0), !1 }
        return !0
    }

    function hi(t, n) { var e = Yn.sendBeacon; return !!e && (ye.each(n, function(t) { ye.each(t.evs, function(t) { t[it] = me(!0, {}, t[it]), t[it].beacon = "1" }) }), t = _i(t), e && e.call(Yn, t, xr.stringify(n))) }

    function mi(t, n, e, r) {
        if (!zn.XDomainRequest) return !1;
        try {
            var i = new XDomainRequest;
            return i.open(zt, _i(t), !0), i.onload = function() { ui = 0, e && e.cb(V, 200, "IEXDR-post"), ni = [] }, i.onerror = function() { ui++, e && e.cb(U, 0, "IEXDR-post") }, i.ontimeout = function() {
                ui++, r || (! function(t, n, e, r) {
                    ni = ni.concat(n);
                    var i = void 0,
                        o = ye.reduce(ni, function(t, n) { return n.evs = t.evs.concat(n.evs), i = n.evs.length, Gr < i && ye.slice(n.evs, i - Gr, i), n });
                    if (ni = [o], ei.push(r), !ti) var a = setInterval(function() {
                        if (Hr <= ui) return clearInterval(a), !1;
                        e(t, ni, function(n) { clearInterval(a), ti = !1, ye.each(ei, function(t) { t && t(n) }) }, !0)
                    }, Yr)
                }(t, n, mi, e), ti = !0)
            }, i.timeout = Zr, i.send(xr.stringify(n)), !0
        } catch (t) { return !1 }
    }

    function gi(n, e, r, i) {
        if (!cn()) return !1;
        try {
            var o = r && r.method || zt,
                a = he.isFunc(r.cb) && r.cb || nn,
                u = yi(n, o, "text/plain");
            return u.onreadystatechange = function() {
                if (4 === u.readyState) {
                    var t = u.status;
                    200 <= t && t < 400 ? (ui = 0, a(V, u.status, "ajax-" + o), ni = []) : i ? a(W, u.status, "ajax-" + o) : gi(n, e, r, !0), u.onreadystatechange = null
                }
            }, u.onerror = function() { a(U, u.status, "ajax-" + o) }, u.send(o === zt && xr.stringify(e) || null), !0
        } catch (t) { return di(n, "runtime", 0, t.stack || t.message), !1 }
    }

    function _i(t) { var n = "_lxsdk_rnd=" + (le().toString(16) + ri); return -1 === t.indexOf("?") ? t + "?" + n : t + "&" + n }

    function yi(t, n, e) { var r = new(on()); return r.open(n || zt, _i(t), !0), r.timeout = Zr, r.setRequestHeader("Content-Type", e), r }

    function wi(t, n, e) { return ce.call(t, n) && t[n] && (t[e] = t[n], delete t[n]), t }
    Ge(vi, "pageDisappear"), Ge(function() {!0, vi() }, en);
    var bi = "performance",
        Si = "getEntries",
        ki = "pvid-" + parseInt(1e7 * he.rnd()) + "-" + parseInt(1e7 * he.rnd());
    if (zn && zn[bi] && zn[bi][Si] && he.isFunc(zn[bi][Si]) && /\[native code\]/.test(zn[bi][Si].toString())) {
        var xi = zn[bi][Si]();
        be(xi, function(t) { try { t && "script" === t.initiatorType && /(lx|analytics)\.meituan\.net/.test(t.name) && (kn("stime", t.duration || t.responseEnd - t.startTime), kn("pvid", ki)) } catch (t) { di(Hn.href, "", ki, t.stack || t.message, !0) } })
    }
    var Oi = q + "_source",
        Ii = q + "_medium",
        Ai = q + "_term",
        qi = q + "_campaign",
        ji = q + "_content",
        Ci = void 0,
        Di = !1;

    function Ti(t) {
        if (!t) return ne;
        var e = ne,
            r = /^utm_(source|medium|term|content|campaign)$/;
        return ye.each(t, function(t, n) { r.test(n) && (!e && (e = {}), e[n] = t) }), e
    }

    function Ei(t) { if (t) { Ci = t; var n = he.stringifyQuery(t); return ke.del(yt, Zn), ke.top(yt, n, mt, Zn), !0 } return !1 }

    function Ni(t, n) {
        var o, e, r, i, a;
        return (!Ci && !Di || t) && (t = t || Hn.href, n = n || Gn.referrer, a = t, (Ci = Ti(he.parseQuery(a)) || function(t) {
            var n = ne,
                e = t.match(/^[\w-]+:\/\/([^/]+)(?:\/([^?]+)?)?/),
                a = e && e[1];
            if (a) {
                var u = he.parseQuery(t),
                    r = "daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q cnn:query virgilio:qs baidu:wd baidu:word alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT search.smt.docomo:MT onet:qt onet:q kvasir:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q centrum.cz:q 360.cn:q sogou:query tut.by:query globo:q ukr:q so.com:q haosou.com:q auone:q m.baidu:word wap.baidu:word baidu:word Baidu:bs www.soso:w wap.soso:key www.sogou:query wap.sogou:keyword m.so:q m.sogou:keyword so.com:pq youdao:q sm.cn:q sm.cn:keyword haosou:q".split(" "),
                    c = "",
                    s = "";
                ye.each(r, function(t) {
                    var n = t.split(":"),
                        e = n[0],
                        r = n[1],
                        i = u[r],
                        o = -1 < e.indexOf(".") ? e : "." + e + ".";
                    if (-1 < a.indexOf(o.toLowerCase()) && (s = e, c = i)) return !1
                }), s && ((n = {})[Oi] = s, n[Ii] = "organic", c && (n[Ai] = c))
            }
            return n
        }(n)) ? Ei(Ci) : (i = ke.get(yt), Ci = C.test(i) ? Ti(he.isStr(i) ? he.parseQuery(i) : null) : Ci), Ci || (o = void 0, e = ke.get("__utmz"), (r = e && e.match(/(utmc(tr|sr|cn|md|ct))=([^|()]+)/g)) && ye.each(r, function(t) {
            var n = t.split("="),
                e = n[0],
                r = void 0,
                i = n[1] || "";
            "utmcsr" === e ? r = Oi : "utmccn" === e ? r = qi : "utmcmd" === e ? r = Ii : "utmcct" === e ? r = ji : "utmctr" === e && (r = Ai), r && ((o = o || {})[r] = i)
        }), Ei(Ci = o)), Di = u), Ci
    }
    var Mi = "__lxsdk_",
        Fi = void 0;
    try { Fi = zn.localStorage } catch (t) { Fi = null }

    function Ri(t) { return Mi + t }

    function Pi() {
        return {
            length: 0,
            _data: {},
            setItem: function(t, n) { return this.length++, this._data[t] = String(n) },
            getItem: function(t) { return this._data.hasOwnProperty(t) ? this._data[t] : ne },
            removeItem: function(t) { return this.length--, delete this._data[t] },
            clear: function() { return this.length = 0, this._data = {} },
            key: function(t) {
                var n = [],
                    e = this._data;
                return ye.each(e, function(t) { he.hasOwn(e, t) && n.push(t) }), n[t]
            }
        }
    }
    var Bi = { get: function(t) { t = Ri(t); var n = Fi.getItem(t); return n = ne !== n ? xr.parse(n) : n }, set: function(t, n) { Bi.del(t); try { return Fi.setItem(Ri(t), xr.stringify(n)) } catch (t) {} }, keys: function() { for (var t = [], n = void 0, e = 0; e < Fi.length; e++) 0 === (n = Fi.key(e)).indexOf(Mi) && t.push(n.replace(Mi, "")); return t }, del: function(t) { try { return Fi.removeItem(Ri(t)) } catch (t) {} }, clear: function() { for (var t = this.keys(), n = 0; n < t.length; n++) this.del(t[n]) } };
    if (Fi) {
        if (Fi) {
            var Li = "___lxtest";
            Bi.nt = !0;
            try { Bi.set(Li, 1), 1 !== Bi.get(Li) ? Bi.clear() : Bi.del(Li) } catch (t) { try { Bi.clear(), Fi.setItem(Li, 1), Fi.removeItem(Li) } catch (t) { Fi = Pi(), Bi.nt = !1 } }
        }
    } else Fi = Pi(), Bi.nt = !1;
    var Vi = "tag",
        Ui = 18e5;

    function Wi(t, n, e, r, i, o) {
        var a = {};
        a.c = t, a.k = n, a.v = e, a.t = r || +new Date, a.u = i || "", a.r = o || "", this.toJSON = function() { return me(!0, {}, a) }
    }
    var Ji = {
        set: function(t, n, e) {
            var r = void 0,
                i = [],
                o = Bi.get(Vi) || [];
            if (!he.isStr(n) || "" === n) return !1;
            for (var a = 0, u = o.length; a < u; a++) Ki(r = o[a]) || (t === r.c ? n !== r.k && i.push(r) : i.push(r));
            return r = new Wi(t, n, e, +new Date), i.push(r.toJSON()), Bi.set(Vi, i), !0
        },
        get: function(t, n) {
            var e = void 0,
                r = Bi.get(Vi);
            if (r && r.length) return e = {}, ye.each(r, function(t) {
                var n = {};
                n[t.k] = t.v, Ki(t) || (e[t.c] = me(!0, e[t.c] || {}, n))
            }), t && n ? e[t] && e[t][n] : t ? e[t] : e
        },
        getAll: function(t) {
            var n = Bi.get(Vi),
                e = bn() || Bi.get(Qt),
                r = {},
                i = void 0;
            return !t && e && (r = me(i = !0, r, e)), ye.each(n, function(t) { var n = void 0;!Ki(t) && t.v && (i = !0, (n = {})[t.k] = t.v, r[t.c] = me(!0, r[t.c], n)) }), i && r
        },
        clear: function(n, e) {
            if (Bi.set(Qt, []), wn = {}, !n) return Bi.set(Vi, []);
            if (he.isStr(n)) {
                var t = Bi.get(Vi),
                    r = [];
                ye.each(t, function(t) {
                    (e !== ne && t.k !== e || n !== t.c) && r.push(t)
                }), Bi.set(Vi, r)
            }
        }
    };

    function Ki(t) { var n = he.now(); return Ui < n - t.t }
    var $i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
        Qi = function() {
            var t = !("undefined" == typeof window || !window.navigator || !window.navigator.userAgent);

            function r() { return t ? navigator.userAgent.toLowerCase() : "" }

            function o(t) {
                for (var n = {}, e = t.replace(/\([^)]+\)/g, "").split(/\s+/), r = "", i = 0; i < e.length; i += 1) {
                    var o = e[i],
                        a = o.lastIndexOf("/");
                    if (a < 0) r = o;
                    else {
                        var u = o.slice(0, a);
                        r && (u = r + " " + u, r = ""), n[u] = o.slice(a - o.length + 1)
                    }
                }
                return n
            }

            function c(t) {
                var n = t || "0",
                    e = n.match(/^(\d*)/);
                return e ? Number(e[1]) : 0
            }

            function a(t, n) {
                for (var e = "string" == typeof t ? t.split(".") : ["0"], r = "string" == typeof n ? n.split(".") : ["0"], i = Math.max(e.length, r.length), o = 0; o < i; o += 1) {
                    var a = c(e[o]),
                        u = c(r[o]);
                    if (u < a) return 1;
                    if (a < u) return -1
                }
                return 0
            }

            function u(t) {
                var n = -1,
                    e = document.createElement("iframe");

                function r() {
                    if (clearTimeout(n), e) {
                        var t = e.parentNode;
                        t && t.removeChild(e), e.onload = null, e.onerror = null, e = null
                    }
                }
                e.style.display = "none", e.onload = r, e.onerror = r, e.src = t, document.documentElement.appendChild(e), n = setTimeout(r, 3e3)
            }

            function s(t, n, e, r) { try { window.webkit.messageHandlers.titans.postMessage({ method: n, args: e, callbackId: r }) } catch (error) { u(t) } }

            function f(t) {
                if (window.KNBTitansX && window.KNBTitansX.sendMessage) window.KNBTitansX.sendMessage(t);
                else {
                    if (10240 < t.length) throw new Error("too large bridge data");
                    window.prompt(t)
                }
            }

            function d(t) {
                if (10240 < t.length) throw new Error("too large bridge data");
                window.prompt(t)
            }
            var n, e = {
                    getDefaultSender: function() {
                        var i = Function.prototype,
                            t = r(),
                            n = o(t),
                            e = n.titansx || n.titansnox || "0";
                        return /ios|iphone|ipod|ipad/.test(t) ? i = 0 <= a(e, "11.26") ? s : u : /android/.test(t) && (i = 0 < a(n.android, "4.2.0") ? f : d),
                            function(t, n, e) {
                                var r = "js://_?method=" + t + "&callbackId=" + e + "&args=" + encodeURIComponent(n);
                                i(r, t, n, e)
                            }
                    },
                    compareVersion: a,
                    parseUserAgent: o,
                    canUseSlot: (n = o(r()), 0 <= a(n.titansx || n.titansnox, "11.13"))
                },
                i = e.getDefaultSender,
                l = e.compareVersion,
                v = e.parseUserAgent,
                p = e.canUseSlot,
                h = "function" == typeof Symbol && "symbol" === $i(Symbol.iterator) ? function(t) { return void 0 === t ? "undefined" : $i(t) } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : $i(t) },
                m = { sender: null };

            function g(t) { return "DPApp_callback_" + t }

            function _(t, n) {
                var e = g(t),
                    r = window[e];
                r && (r(n), r.isSafeDelete && (window[e] = void 0))
            }

            function y(t) {
                var n = t || "DPApp";
                if (!window[n] || !window[n].KNBCore) {
                    var e = { dequeue: window[n] && window[n].dequeue || Function.prototype, KNBCore: !0, callback: _ };
                    window[n] = function(t, n) { if (t && "object" === (void 0 === t ? "undefined" : h(t))) { var e = t; return Object.keys(n).forEach(function(t) { e[t] = n[t] }), e } return n }(window[n], e)
                }
            }
            var w, b = {
                bindSender: function(t) { "function" == typeof t && (m.sender = t) },
                sendMessage: function(t, n, e, r, i) {
                    var o = p && r ? "KNBSlot" + r : void 0;
                    y(o);
                    var a = function(t) { if (!/^[a-zA-Z0-9]*$/.test(t)) throw new Error("illegal slot name"); if ("undefined" == typeof window) throw new Error("[KNB-Core Error] window is not defined"); if (window.__TITANS_COUNT = window.__TITANS_COUNT || 1, "number" != typeof window.__TITANS_COUNT) throw new Error("[KNB-Core Error] __TITANS_COUNT invalid!"); return ++window.__TITANS_COUNT + (t ? "_" + t : "") }(o),
                        u = g(a),
                        c = e || {},
                        s = setTimeout(function() { "function" == typeof window[u] && window[u]({ status: "timeout" }) }, i || 2e3);
                    if (window[u] = function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                            clearTimeout(s);
                            var n = t.status,
                                e = "action" === n ? "handle" : n;
                            "0" === String(e) && (e = "success"), "handle" !== e && "success" !== e && "timeout" !== e && (e = "fail");
                            var r = c[e] || Function.prototype;
                            if ("function" == typeof r) return r(t)
                        }, c.handle || c.timeout || (window[u].isSafeDelete = !0), m.sender) try { m.sender(t || "", JSON.stringify(n || {}), a) } catch (error) { window[u]({ status: "fail", errorMsg: error.message, errorCode: error.code || 21 }) }
                },
                fireCallback: _,
                compareVersion: l,
                parseUserAgent: v
            };
            return w = b, "undefined" != typeof window && (m.sender = i(), window.KNBCore || (window.KNBCore = w)), b
        }(),
        Xi = !1,
        zi = [],
        Hi = void 0,
        Gi = void 0;

    function Zi(t) {
        Sr() ? c === er ? t(ne, Gi) : Xi ? t(Hi, Gi) : (zi.push(t), Xi ? t(ne, Gi) : new Promise(function(t) { t({ ready: function(t) { return t() }, use: function(t, n) { n = n || {}, Qi.sendMessage(t, { data: n.data || {} }, n, "LXAnalyticsSDK") } }), Xi = !0 }).then(function(t) {
            var n, e, r = Gi = t;
            n = Hi, e = r, ye.each(zi, function(t) { t(n, e) }), zi = []
        })) : t(F, Gi)
    }
    var Yi = 500,
        to = "getUserInfo";

    function no() {
        return new Ir(function(o, r) {
            Zi(function(t, n) {
                var e = zn.DPApp,
                    i = D(function() { o({}) }, Yi);
                n ? n.ready(function() {
                    n.use(to, {
                        success: function(t) {
                            var n, e, r;
                            l(i), o((e = {}, (r = (n = t)[k]) && "0" !== r || "dp" !== n.type ? n[k] && (e[k] = n[k]) : e[k] = n[y], "dp" !== n.type && n[y] && (e[y] = n[y]), n.unionId && (e.unionId = n.unionId), n.userId && (e.userId = n.userId), e))
                        },
                        fail: function(t) { l(i), r({ code: N }) }
                    })
                }) : e && e[to] ? e.ready(function() {
                    e[to]({
                        success: function(t) {
                            l(i);
                            var n = {};
                            (t.dpid || t.userId) && (n.dpid = t.dpid, n.userId = t.userId, n.unionId = t.unionId), o(n)
                        },
                        fail: function(t) { l(i), r({ code: E, res: t }) }
                    })
                }) : r({ code: E })
            })
        })
    }
    var eo, ro = void 0,
        io = (eo = function() { for (var t = 1 * new Date, n = 0; t === 1 * new Date && n < 200;) n++; return t.toString(16) + n.toString(16) }, function() {
            var t = (screen.height * screen.width).toString(16);
            return eo() + "-" + Math.random().toString(16).replace(".", "") + "-" + function() {
                var t = Ye,
                    n = void 0,
                    e = void 0,
                    i = [],
                    r = 0;

                function o(t, n) {
                    var e = void 0,
                        r = 0;
                    for (e = 0; e < n.length; e++) r |= i[e] << 8 * e;
                    return t ^ r
                }
                for (n = 0; n < t.length; n++) e = t.charCodeAt(n), i.unshift(255 & e), 4 <= i.length && (r = o(r, i), i = []);
                return 0 < i.length && (r = o(r, i)), r.toString(16)
            }() + "-" + t + "-" + eo()
        });

    function oo() {
        var t = { mem: ro, cookie: ke.get(bt), ls: Bi.get(bt), ss: Xe && Xe.getItem(bt) },
            n = void 0;
        for (var e in t) t[e] && (n = t[e]);
        for (var r in n || (n = io()), t)
            if (!t[r]) switch (r) {
                case "mem":
                    ro = n;
                    break;
                case "cookie":
                    ke.top(bt, n, gt);
                    break;
                case "ls":
                    try { Bi.set(bt, n) } catch (t) { di(location.href, "", n, t.stack || t.message, !0) }
                    break;
                case "ss":
                    try { Xe && Xe.setItem(bt, n) } catch (t) { di(location.href, "", n, t.stack || t.message, !0) }
            }
        return n
    }

    function ao() { return Math.floor(1 + 65535 * he.rnd()).toString(16).substring(1) }

    function uo() {
        var t = [],
            n = +new Date;
        return t.push(n.toString(16)), t.push(ao()), t.push(ao()), t.push(ao()), t.join("-")
    }

    function co(t) {
        var n = t.match(/(\d+)(?:\.(\d+)(?:\.(\d+))?)?/),
            e = [];
        if (n)
            for (var r = 1; r < n.length; r++) e.push(parseInt(n[r] || 0));
        return e
    }

    function so(t, n) {
        var e = co(t),
            r = co(n);
        return !(e[0] < r[0]) && (!(e[0] === r[0] && e[1] < r[1]) && !(e[0] === r[0] && e[1] === r[1] && e[2] < r[2]))
    }
    var fo = 100,
        lo = !1,
        vo = void 0,
        po = !1,
        ho = !1,
        mo = !1,
        go = [],
        _o = 0,
        yo = void 0,
        wo = he.now();

    function bo(t) { var n = (t._opts || {}).nativeOptions || {}; return { cb: "_lx" + (100 * he.now() + _o++), mn: t._mn, cn: t._cn, data: t._d || {}, options: n, ver: 4 } }

    function So(t, n, e, r, i) {
        i = i || {};
        var o = this;
        o._cn = t, o._mn = n, o._d = e, o._cb = r, o._opts = i
    }

    function ko() { return po }
    So.prototype.send = function(e) {
        var r = this,
            i = bo(r),
            t = "statistics://_lx/?data=" + oe(xr.stringify(i)),
            n = he.now();
        yo && 5e3 < n - wo && "getEnv" === r._mn && fo === V ? (r._mn, e(0, yo)) : (r._mn, i.cb, function(i, o, a) {
            if (er !== c || !window.JavaScriptBridge) return Zi(function(t, n) {
                if (t) return a(t);
                var e = !1,
                    r = D(function() { e = !0, a(T) }, 5e3);
                n.use(i, {
                    data: o,
                    success: function(t) {
                        if (l(r), !e)
                            if ("success" === t.status) { var n = t.data || {}; try { he.isStr(n) && (n = xr.parse(n)), a(ne, n.data ? n.data : t) } catch (t) { a(t) } } else a(M)
                    },
                    fail: function() { l(r), e || a(M) }
                })
            });
            window.JavaScriptBridge.log(o, function(t) { var n = t.data; try { he.isStr(n) && (n = xr.parse(n)), a(ne, n.data ? n.data : n) } catch (t) { a(t) } })
        }("lxlog", t, function(t, n) { t ? (r._mn, i.cb, new Date, L(t)) : (r._mn, i.cb, new Date), e(t, n) }))
    }, vo = function(t, n, e, r, i) {
        if ("setEvs" !== n || function(t, n) {
                var e = !0;
                _e(t) || (e = !1);
                var r = n.web_cid,
                    i = n.val_bid,
                    o = n.val_lab;
                (r && !_e(r) || i && !_e(i) || o && !ge(o)) && (e = !1);
                if (!e) {
                    var a = me(!0, {}, Oo || {}),
                        u = "toNative-paramError-" + a[x];
                    di(Hn.href, u, a[y] || a[g], xr.stringify({ cn: t, evs: n }), !0)
                }
                return e
            }(t, e[0])) {
            if (U === fo || 600 === fo) return r(fo);
            var o = new So(t, n, e, nn, i);
            if (V === fo) o.send(function(t, n) { r(t, n) });
            else if (100 === fo) {
                if (go.push([o, r]), !lo) {
                    lo = !0;
                    new Date;
                    new So(t, "getEnv", {}).send(function(r, t) {
                        if (new Date, r && L(r), r) fo = U;
                        else {
                            if (fo = V, Fn(dt), he.isStr(t)) try { t = xr.parse(t) } catch (t) {}
                            var n = (yo = t).sdk_ver || "";
                            po = so(n, "4.0.0"), ho = so(n, "4.3.0"), mo = !so(n, "4.8.0")
                        }
                        ye.each(go, function(t) {
                            var n = t[0],
                                e = t[1];
                            r ? (L(r), e(r)) : n.send(function(t, n) { e(t, n) })
                        })
                    })
                }
            } else r(W)
        }
    };
    var xo = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t },
        Oo = {},
        Io = vt,
        Ao = [],
        qo = null,
        jo = !1,
        Co = { tag: "tag", s: w, l: g, a: x, w: d, lch: "lch", u: { us: t, um: e, uc: i, ucp: a, ut: o }, se: Wt, sc: s, v: A, uni: f, di: k, ui: y, wxi: "wxunionid" },
        Do = ["tag", w, g, x, d, "lch", Wt, s, A, f, k, y, "wxunionid", "v"],
        To = [t, e, i, a, o],
        Eo = "_lxsdk_wxenv_",
        No = ["sdk_ver", "ua"];

    function Mo(t) {
        var n = /(^\w+-\w+-\w+-\w+-\w+)/;
        if (n.test(t)) {
            var e = t.match(n);
            ke.top(wt, e[1], gt)
        } else t && !/(^\w+\.\d+\.\d+\.\d+\.\d+)/.test(t) && t.length < 100 ? ke.top(wt, t, gt) : ke.top(wt, "", -1)
    }
    var Fo = 0,
        Ro = 1,
        Po = 2,
        Bo = "|";

    function Lo() { var t = Gn.domain; return "sub" === mn.sessionScope ? kt + "_" + t : kt }

    function Vo(t) {
        var n = Lo(),
            e = ke.get(n);
        return e ? e.split(Bo)[t] : ""
    }

    function Uo(t, n, e) {
        var r, i, o, a = Lo();
        ke.top(a, (r = n, i = e, (o = []).push(t || Wo()), o.push(r || Jo()), o.push(i || Ko()), o.join(Bo)), _t)
    }

    function Wo() { return Vo(Fo) }

    function Jo() { return Vo(Ro) }

    function Ko() {
        var t = 0,
            n = Vo(Po);
        return isNaN(n) || (t = parseInt(n)), t < 0 ? 0 : t
    }
    var $o, Qo = void 0,
        Xo = ($o = "_lxsdk_test", ke.set($o, "1"), !(-1 < Gn.cookie.indexOf($o) && (ke.del($o), 1)));

    function zo() { if (Xo) return Qo = Qo || 0, ++Qo; var t = Ko(); return t = t || 0, Uo(ne, ne, ++t), t }

    function Ho(t) {
        var n, e = {};
        if (C.test(t)) {
            var r = he.parseQuery(t);
            if (r._lx_tag) try {
                var i = r._lx_tag.replace(/\*/g, "+").replace(/_/, "/").replace(/\./g, "=");
                n = JSON.parse(function(t) { for (var n = "", e = 0, r = 0, i = 0, o = 0; e < t.length;)(r = t.charCodeAt(e)) < 128 ? (n += String.fromCharCode(r), e++) : 191 < r && r < 224 ? (o = t.charCodeAt(e + 1), n += String.fromCharCode((31 & r) << 6 | 63 & o), e += 2) : (o = t.charCodeAt(e + 1), i = t.charCodeAt(e + 2), n += String.fromCharCode((15 & r) << 12 | (63 & o) << 6 | 63 & i), e += 3); return n }(ze(i))), wn = me(!0, {}, n)
            } catch (t) {}
            if (r[y] && (e[y] = r[y]), r[v] && (e[v] = r[v]), r[S] && (e[b] = r[S]), r.__lxsdk_params) {
                var o = r._lx_ver,
                    a = {};
                try {
                    if (o) {
                        var u = decodeURIComponent(decodeURIComponent(r.__lxsdk_params)),
                            c = ze(u.replace(/\*/g, "+").replace(/_/, "/").replace(/\./g, "=")).split(";"),
                            s = void 0;
                        ye.each(c, function(t) {
                            var n = t.split(":"),
                                e = n.shift(),
                                r = n.join(":");
                            if (r)
                                if (0 <= To.indexOf(e))(s = s || {})[e] = r;
                                else {
                                    if (Do.indexOf(e) < 0) try { r = ze(r) } catch (t) {} else "v" === e && (e = A);
                                    a[e] = r
                                }
                        }), s && (a[q] = s), a[Wt] || (a[Wt] = Jt)
                    } else {
                        jo = !0;
                        var f = decodeURIComponent(decodeURIComponent(r.__lxsdk_params)).split(";"),
                            d = Co.u,
                            l = void 0;
                        ye.each(f, function(t) {
                            var n = t.split(":"),
                                e = n.shift(),
                                r = n.join(":");
                            if (r)
                                if (d[e])(l = l || {})[d[e]] = r;
                                else {
                                    if (!Co[e]) try { r = ze(r) } catch (t) {}
                                    a[e] = r
                                }
                        }), l && (a[q] = l), a.se || (a.se = "online")
                    }
                } catch (t) { di(Hn.href, "urlinfo-error", 0, t.stack || t.message, !0) }
                e[I] = a
            }
            return e
        }
        return e
    }

    function Go(t, c, s) {
        return s = s || {}, new Ir(function(a, u) {
            D(function() { u({ code: T }) }, 3e3), vo(t, "getEnv", {}, function(t, n) {
                if (t) u(t);
                else if (qo = mn.nativeSDKVer = n.sdk_ver, o = mn.nativeSDKVer, he.isStr(o) && (_n.MVL = -1 < Be(o, "4.14.0"), _n.QR = -1 < Be(o, "4.14.0"), _n.getReqId = -1 < Be(o, "4.12.0")), s.origin) a(n);
                else {
                    var e = { uuid: y, msid: w, uid: b, dpid: k, appnm: x, union_id: f };
                    for (var r in c = c || {}, e) {
                        var i = e[r];
                        n[r] && (c[i] = n[r])
                    }
                    a(c)
                }
                var o
            })
        })
    }

    function Zo() {
        var t = ke.get(xt);
        if (t) {
            var n = t.split(","),
                e = /^\d+\.\d{5,}$/;
            return 3 !== n.length ? null : e.test(n[0]) && e.test(n[1]) ? { lat: n[0], lng: n[1], tm: n[2] } : null
        }
        return null
    }

    function Yo(t) { return me(!0, {}, t) }

    function ta(t) {
        var n = Gn.getElementsByTagName("meta"),
            e = je(n, "lx:appnm"),
            r = je(n, "lx:defaultAppnm"),
            i = er,
            o = Gn.domain,
            a = Mn();
        return On("appnm", e), On("defaultAppnm", r), rr && Ke(er || e || r || o), ir ? e || (2 === a ? t : i || (r || o)) : e || (i || (r || o))
    }

    function na() {
        var t, n, e, r, i, o, a = er === m || er === h || wr || yr,
            u = (t = ke.get(wt), n = ke.get("iuuid") || ke.get("uuid") || t, e = Wo(), r = Jo(), i = ke.get(St) || ke.get(k), o = {}, n && (o[y] = n), e && (o[w] = e), t && (o[g] = t), r && (o[b] = r), i && (o[k] = i), o),
            c = void 0,
            s = {};
        a && (s = Ho(Hn.href)), er === m && (s[y] ? (u[y] ? s[y] !== u[y] ? kn("uuidState", "2") : kn("uuidState", "3") : (u[y] = s[y], kn("uuidState", "1")), delete s[y]) : kn("uuidState", "0")), (c = me(u, s)).ct = ar;
        var f = Ni();
        f && (c[q] = f);
        var d = oo();
        c[g] = d, c[y] || (c[y] = d), c[w] || (c[w] = uo(), Uo(c[w], c.uid || "")), c[y] && Mo(c[y]);
        var l = ta();
        he.isStr(l) && (c[x] = l);
        var v, p = (v = te.replace(/^.*([A-Za-z-]+)\/com\.(sankuai(?!\.meituan\.)|meituan(?!\.sankuai\.)|dianping|sankuai\.meituan|meituan\.sankuai)\.([.A-Za-z0-9-]+)\/(\d+[.\d]+).*$/, "$4"), /^\d+(\.\d+)+$/.test(v) ? v : null);
        return p && (c.app = p), c
    }

    function ea(n) { return function(t) { var e = t; return n !== t && (e = me(n, t)), e.dpid && e.uid ? e : no().then(function(t) { var n = {}; return t.dpid && (n.dpid = t.dpid, t.userId && (n.uid = "" + t.userId), t.unionId && (n.union_id = t.unionId)), e = me(e, n) }, function(t) { return L(t), e }) } }
    var ra = function(t) {
        hn();
        var a = na();
        if (Sr()) {
            var n = Go(t, a);
            return r === er && (n = n.then(ea(a), function(t) { return L(t), ea(a)() })), n.then(function(t) {
                var n = ta(t[x]),
                    e = t[k],
                    r = t[y],
                    i = t[f],
                    o = t;
                return t !== a && (o = me(a, t)), he.isStr(n) && (o[x] = n), r && Mo(r), e && ke.top(St, e, gt), i && ke.top("_lxsdk_unoinid", i, gt), o
            }, function(t) { return t && L(t), a })
        }
        var e, u = Yo(a),
            c = u[I];
        return (e = he.now(), new Ir(function(t) {
            if (wr || yr)
                if (/miniProgram/i.test(te)) t(!0);
                else if (zn.WeixinJSBridge && zn.WeixinJSBridge.invoke) t("miniprogram" === zn.__wxjs_environment);
            else {
                var n = setTimeout(function() { mn.wx_t = he.now() - e, t(!1) }, 5e3);
                Gn.addEventListener("WeixinJSBridgeReady", function() { clearTimeout(n), mn.wx_t = he.now() - e, t("miniprogram" === zn.__wxjs_environment) })
            } else t(!1)
        })).then(function(t) {
            if (mn.inWXMP = t) {
                if (mn.nt = yr ? 7 : 6, "object" === (void 0 === Xe ? "undefined" : xo(Xe)) && !he.isObj(c))
                    for (var n in c = {}, Xe)
                        if (0 === n.indexOf(Eo)) {
                            var e = n.slice(Eo.length),
                                r = Xe[n];
                            if (e === q) try { c[q] = JSON.parse(r) } catch (t) {} else c[e] = r
                        }
                var i = function(t) {
                    var n = t;
                    jo && (n = Co[n] || n);
                    var e = c[t];
                    e && (u[O] = u[O] || {}, u[n] && (u[O][n] = u[n]), ye.find(No, function(t) { return t === n }) || (u[n] = e));
                    try { Xe.setItem(Eo + n, ge(e) ? JSON.stringify(e) : e) } catch (t) {}
                };
                for (var o in c) i(o)
            } else mn.nt = lt;
            return delete u[I], Ir.resolve(u)
        })
    };

    function ia(t) {
        return ht === Io ? Ir.resolve(Yo(Oo)) : pt === Io ? new Ir(function(n) {
            var t;
            t = function(t) { n(t) }, Ao.push(t)
        }) : (Io = pt, ra(t).then(function(e) { return Oo = me(!0, {}, e || {}), (wr || yr) && (mn._isWXDev = Oo[Wt] === Kt), Io = ht, ye.each(Ao, function(t, n) { he.isFunc(t) && Ao[n](e) }), e }))
    }
    var oa = /([a-fA-F0-9-]+)(\.\d+)/,
        aa = "_hc.v",
        ua = 525600,
        ca = "",
        sa = /(dper|dianping|51ping)\.com/.test(Zn);

    function fa() {
        return function() {
            function t() { return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) }
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        }() + "." + Math.round(+new Date / 1e3)
    }

    function da() { return !ca && sa && (ca = function() { var t = ke.get(aa); if (t || (t = fa(), ke.top(aa, t, ua)), t) { var n = t.match(oa); return n ? n[1] : "" } return "" }()), ca }
    var la = function() {
        var t = void 0;
        try {
            var n = document;
            if (n.querySelectorAll) {
                var e = n.querySelectorAll("head script"),
                    r = n.querySelectorAll("body script"),
                    i = [];
                ye.each(e, function(t) { i.push(t) }), ye.each(r, function(t) { i.push(t) });
                for (var o = 0; o < i.length; o++) { var a = i[o].innerHTML.match(/\[['"]\s*_setPageId\s*['"]\s*,\s*(\d+)\s*\]/); if (a) { t = a[1]; break } }
            }
        } catch (t) {}
        return function() { return t }
    }();

    function va(t) {
        var n = this;
        n.s = t;
        var e = void 0,
            r = Bi.get(Ut) || { s: t, d: n.d };
        r.s !== t ? (Bi.del(Ut), e = n.d = []) : e = n.d = r.d || [], n.l = e && e.length || 0
    }
    var pa = null;

    function ha() { return pa }

    function ma(t) { return Xe && he.isFunc(Xe.getItem) ? Xe.getItem(t) : ke.get(t) }

    function ga(t, n) { return Xe && he.isFunc(Xe.setItem) ? Xe.setItem(t, n) : ke.top(t, n, _t) }

    function _a(t) { ga(It, t) }

    function ya() { var t = ma(It); return t || "" }

    function wa(t) { ga(Ot, t) }

    function ba() { var t = ma(Ot); return t || "" }
    var Sa = "QR",
        ka = 20480 / 30,
        xa = 2592e5,
        Oa = {},
        Ia = void 0,
        Aa = !(va.prototype = {
            constructor: va,
            set: function(t, n, e) {
                var r = this,
                    i = r.l,
                    o = r.d,
                    a = r.indexOf(t),
                    u = { scid: 0 < i ? o[i - 1].scid + 1 : 0, cid: t, bid: n, sf: e }; - 1 < a ? o.splice(a, i - a, u) : o.push(u), r.l = o.length, Bi.set(Ut, { s: r.s, d: o })
            },
            indexOf: function(t) { for (var n = this.d || [], e = 0, r = n.length; e < r; e++) { if (n[e].cid === t) return e } return -1 },
            toJSON: function() { var t = this.d; return t && t.length ? t : null }
        }),
        qa = [],
        ja = !1,
        Ca = ["ua"].join("|") + "|",
        Da = ["lxcuid", "category", "sdk_ver", "utm", "uuid", "msid", "ct", "appnm"],
        Ta = ["utm", "seq", "tm", "nm", "val_ref", "lng", "val_lab", "req_id", "lat", "s_from", "val_cid", "val_bid"];

    function Ea() {
        if (!Aa) {
            var t = le(),
                n = [Ia.opts.cid],
                e = 0,
                r = function(t, n) {
                    if (!t) try {
                        var e = n;
                        if (he.isObj(n) || (e = JSON.parse(n)), 0 === e.code)(function t(n) {
                            var e = 0,
                                r = 0;
                            var i = [];
                            var o = le() - xa;
                            for (var a in n) e += n[a].bids.length, r += n[a].bids.length;
                            if (!r) return;
                            for (var u in Oa) e += Oa[u].bids.length, Oa[u].tm < o && i.push(u);
                            ka < e && (i.length ? (ye.each(i, function(t) { delete Oa[t] }), t(n)) : Oa = {});
                            Oa = me(Oa, n);
                            setTimeout(function() { Bi.set(Sa, Oa) }, 10)
                        })(function(t) {
                            if (!he.isObj(t)) return;
                            var i = {},
                                o = le();
                            return ye.each(t, function(n, r) {
                                i[r] = i[r] || { cid: r, tm: o, bids: [], envInfo: (n.envInfo || {}).quickReport || [], evsInfo: (n.evsInfo || {}).quickReport || [] }, delete n.envInfo, delete n.evsInfo;
                                var t = function(e) {
                                    var t = n[e].quickReport || [];
                                    ye.each(t, function(t) {
                                        var n = { tp: e, id: t };
                                        i[r].bids.push(n)
                                    })
                                };
                                for (var e in n) t(e)
                            }), i
                        }(e.data)), Aa = !0;
                        else {
                            if (304 !== e.code) return void e.message;
                            Aa = !0
                        }
                    } catch (t) {}
                };
            for (var i in Oa) e++, t = Math.min(Oa[i].tm, t);
            0 === e && (t = 0);
            var o = ("https://ocean.sankuai.com/delivery/api/web-configFile?\n                timestamp=" + t + "\n                &cidList=" + n.join(",") + "\n                &rnd=" + Math.random()).replace(/\s/g, "");
            "https" === Re() && gi(o, {}, { cb: r }) || function(t, n, e, r) {
                var i = void 0,
                    o = (r = r || {}).outTime || 5e3,
                    a = "__lxsdk_jsonp_callback_" + Math.random().toString(16).slice(2, 10);
                /^([^?]+)\?/.test(t) ? t = t.replace(/^([^?]+)\?/, "$1?" + n + "=" + a + "&") : /^([^#]+)#/.test(t) ? t = t.replace(/^([^#]+)#/, "$1?" + n + "=" + a + "#") : t += "?" + n + "=" + a;
                var u = Gn.createElement("script");
                u.src = t, zn[a] = function(t) {
                    clearTimeout(i);
                    try { e(ne, t) } catch (t) {}
                    delete window[a]
                }, u.type = "application/javascript", u.charset = "utf-8", u.setAttribute("async", "true"), Gn.body.appendChild(u), i = D(function() {
                    try { e("timeout") } catch (t) {}
                    delete window[a]
                }, o), D(function() { Gn.body.removeChild(u) }, 0)
            }(o, "callback", r)
        }
    }

    function Na(t, n, e) { if (!mn.useQR) return !1; if (!Oa[n]) return !1; for (var r = Oa[n].bids, i = 0, o = r.length; i < o; i++) { var a = r[i]; if (a.tp == t) { if (t === J && a.id == n) return !0; if (a.id == e) return !0 } } return !1 }

    function Ma(t, n, e) {
        var r = {},
            i = {};
        if (t && Oa[t]) {
            var o = Da.concat(Oa[t].envInfo || []),
                a = Ta.concat(Oa[t].evsInfo || []);
            ye.each(o, function(t) { n.hasOwnProperty(t) && n[t] && (i[t] = n[t]) }), ye.each(a, function(t) { e.hasOwnProperty(t) && Ca.indexOf(t + "|") < 0 && (r["evs." + t] = e[t]) });
            var u = me(!0, i, r);
            qa.push(u), l(ja), ja = setTimeout(function() { gi("https://" + Yt + "/?rnd=" + Math.random(), qa, { nm: e.nm, cb: nn }), qa = [] }, 0)
        }
    }! function() {
        var t = Bi.get(Sa);
        if (t) try {
            var n = void 0;
            n = he.isObj(t) ? t : JSON.parse(t), Oa = me(!0, Oa, n)
        } catch (t) {}
    }(),
    function n() { var e = Ju(); return new Ir(function(t) { e ? t(e) : setTimeout(function() { n().then(t) }, 100) }) }().then(function(t) { Ia = t, mn.useQR && (Re(), Ea()) }), window._lxsdk_ms = window._lxsdk_ms || "mem_" + uo(), window._lxsdk_seq = window._lxsdk_seq || 0, kn("m_msid", window._lxsdk_ms);
    var Fa = "category",
        Ra = "setEvs",
        Pa = 5e3,
        Ba = { overlen_cutoff: 1 },
        La = { code: 200, status: 200, type: "native-report" },
        Va = { code: tn, status: 200, type: "native-report" },
        Ua = "val_bid",
        Wa = "page",
        Ja = "s_from",
        Ka = "lat",
        $a = "lng",
        Qa = .95 < he.rnd() && !ur,
        Xa = [],
        za = Gn.referrer,
        Ha = [],
        Ga = void 0,
        Za = void 0,
        Ya = {},
        tu = 0,
        nu = 0,
        eu = function(t, n, e) {
            if (e) {
                var r = {},
                    i = { custom: r };
                r[n] = e, t = me(!0, t || {}, i)
            }
            return t
        },
        ru = function(t, n) { var e = Ge(t); return D(function() { Ze(e, { code: -1, status: 408, type: "overtime" }) }, pe(n) && n || 2500), e };

    function iu(t, n) {
        var e = this;
        e.env = n || {}, e.currentEvs = {}, e.opts = me(!0, {}, t), Xa.push(e), Wn = e
    }
    var ou = iu.prototype;

    function au(t) { return 6 === t._ptpvs }

    function uu() { return !tu }

    function cu(t) { return (t = t || {}) && !he.isObj(t) && (t = { cid: "" + t }), t }

    function su(e, r, i, o, a) {
        var u = this,
            c = ru((a = a || {}).callback, a.callbackTimeout),
            t = a,
            n = t.isLeave,
            s = t.currentPageInfo,
            f = t.mvDelay,
            d = t.sf,
            l = he.isStr(a.category) && "" !== a.category,
            v = Na(e, r, i);
        if (Mn() === lt) {
            var p = mu(u),
                h = Ji.getAll(),
                m = _u(e, r, i, o, null, a),
                g = [m],
                _ = bu(p, g, h, a);
            if (v && Ma(r, p, m), e === X) {
                if (f && !l) return m[it] && (m[it].md = f), Ha.push(m), void D(function() {
                    if (Ha.length) {
                        var t = bu(p, Ha, h, a);
                        u.send(t, { cbkey: c, nodelay: !0 }), Ha = []
                    }
                }, f * ft)
            } else {
                if (e === z) return void Jn.call(u, z, p, m, { tag: h });
                if (e === $) {
                    if (s && be(_.evs, function(t) { t[Bt] = t[Bt] || {}, t[Bt][Wa] = u._cpi }), _ = bu(p, g, h, a), n) {
                        var y = Ne(),
                            w = _u(K, r, ne, y);
                        _.evs.push(w), _a(r), wa(Ga)
                    }
                    rr && d && ha().set(r, i, d)
                }
            }
            u.send(_, { nm: e, cbkey: c })
        } else {
            var b = u.env,
                S = void 0,
                k = gu({ isQuickReport: v }),
                x = [wu.call(u, e, r, i, o)];
            if (e === $ && (S = { sf: d }, u._cpi && (S.cpi = u._cpi), x = [wu.call(u, e, r, i, o, null, S)], n)) {
                var O = Ne(),
                    I = wu.call(u, K, r, null, O);
                x.push(I), _a(r), wa(Ga)
            }
            b[q] && (x = function(t, n) { if (!ye.isArray(t) || !t.length) return t; if (!he.isObj(t[0][Bt])) return t[0][Bt] = { page: { utm: n[q] } }, t; if (!he.isObj(t[0][Bt][Wa])) return t[0][Bt][Wa] = { utm: n[q] }, t; return t[0][Bt][Wa] = me(!0, t[0][Bt][Wa], { utm: n[q] }), t }(x, b));
            var A = he.isStr(a.category) && a.category || b[Fa];
            new Date;
            vo(hu(A), Ra, x, function(t, n) { t ? (Fn(lt), L(t), new Date, Ze(c, Va), su.call(u, e, r, i, o, a)) : (Ze(c, La), new Date) }, { nativeOptions: k })
        }
    }

    function fu() { return Ga || (Ga = lu()), Ga }

    function du(t) { var n = Bi.get(j); return n && t && Bi.del(j), n }

    function lu() { return he.now().toString(16) + "-" + Math.floor(65535 * he.rnd()) + "-" + Math.floor(65535 * he.rnd()) }

    function vu(t) {
        var n, e, r = t.nm;
        J === r ? (t.nm = "mpt", t.val_act = "pageview") : K === r ? (t.nm = "report", t.val_act = "quit") : (t.nm = "mge", t.event_type = (n = r, (e = {})[G] = "order", e[Z] = "pay", e[$] = "click", e[H] = "return", e[X] = "view", e[Q] = "click", e[n] || r)), t.nt = 0, t.isauto = 8
    }

    function pu(t) { var n = "data_sdk_"; return 0 !== t.indexOf(n) && (t = n + t), t }

    function hu(t) { var n = "data_sdk_"; return 0 === t.indexOf(n) && (t = t.replace(n, "")), t }

    function mu(t) {
        var n = me(!0, {}, t.env);
        n[Fa] = pu(n[Fa]);
        var e = Wo();
        e || Uo(e = uo(), n.uid || ""), mn.inWXMP && he.isObj(n[O]) && he.isObj(t.env[O]) ? n[O][w] = t.env[O][w] = e : n[w] = t.env[w] = e;
        var r = n.utm,
            i = { ua: Ye, sdk_ver: _, ch: r && r.utm_source ? r.utm_source : "web", sc: hr };
        i[Mt] = _, mn.debug && (i._misid = mn.debug);
        var o = me(!0, i, n);
        return mn.isDev || mn._isWXDev ? o[Wt] = Kt : o[Wt] = Jt, ir && !En() && delete o.ch, o
    }

    function gu(t) { return (t = t || {}).isQuickReport = yn("QR") && !!t.isQuickReport, t }

    function _u(t, n, e, r, i, o) {
        i = i || B, o = o || {};
        var a, u, c, s = zo(),
            f = Zo(),
            d = he.isObj(r) && r.custom || {},
            l = void 0,
            v = J === t,
            p = G === t,
            h = Z === t,
            m = { nm: t, tm: he.now(), nt: mn.nt, isauto: i, val_cid: n, req_id: fu(), seq: s, lx_inner_data: me(!0, {}, xn()) };
        if (m[it].m_seq = ++window._lxsdk_seq, v) {
            var g = Hn.href;
            m.url = g, (l = za) && (m.refer_url = l), i === B && (za = g)
        }(p || v || h) && rr && (a = m, (u = ha().toJSON()) && (a[Ja] = u), m = a), r = eu(r, "_hguid", da()), (c = r) && c.custom && "v3" === c.custom._api && !n && (m.val_cid = Gn.title || Hn.pathname, r = eu(r, "_cid", 1)), he.isObj(d) && "v3" === d._api && (m[it]._api = "v3", delete d._api), rr && o.sf && (m[it].use_sfrom = 1);
        try { m[it].ht = En() } catch (t) {}
        if (v && (r = eu(r, "_hpid", la()), r = eu(r, "_lx_cv", "prod"), mn.wx_t && (r = eu(r, "_wx_t", mn.wx_t))), e && (m[Ua] = e), mn.geo ? (m[Ka] = mn.geo.lat, m[$a] = mn.geo.lng) : f && (m[Ka] = f.lat, m[$a] = f.lng), r) {
            var _ = JSON.stringify(r).length;
            Pa <= _ && ((r = Ba).overlen_length = _), (m[Bt] = r).lat && r.lng && (m[Ka] = r.lat, m[$a] = r.lng)
        }
        return m
    }

    function yu(t) { return or ? t : nr && !mo ? t : oe(t) }

    function wu(t, n, e, r, i, o) {
        i = i || B;
        var a = (o = o || {}).fromWA,
            u = this.env.appnm,
            c = Zo(),
            s = !Rn,
            f = void 0,
            d = { nm: t, tm: he.now(), nt: dt, isauto: i, val_cid: n, shouldCover: s, lx_inner_data: me(!0, {}, xn()) };
        d = me(!0, d, Ya), Za && (d.req_id = Za), o.sf && (d[it].use_sfrom = 1, d._sf = o.sf);
        var l = void 0,
            v = me(!0, {}, r || {}),
            p = J === t;
        if (p) {
            var h = yu(Hn.href);
            l = { ua: Ye, url: h, _fromWA: !!a };
            var m = Ni();
            m && m.utm_source && (l.utm = m), (f = za) && (l.refer_url = yu(f)), i === B && (za = h)
        } else l = {};
        if (d = me(d, { web_cid: n, web_req_id: fu(), web_refer_cid: ya(), web_refer_req_id: ba(), web_first_pv: !!(nu <= 1 && zn.history && 1 === zn.history.length) }), ye.each({ web_req_id: fu(), web_sdk_ver: _, lxcuid: oo(), web_appnm: u }, function(t, n) { he.isStr(t) && (l[n] = t) }), he.isObj(v.custom) && "v3" === v.custom._api && (l.web_appnm = function(t) { if (he.isStr(t)) return t && pn[t] || pn }("appnm"), d[it]._api = "v3", delete v.custom._api), o.cpi && !v.page && (v.page = o.cpi), v.custom = me(!0, v.custom, l), v = eu(v, "_hguid", da()), p && (v = eu(v, "_hpid", la())), t !== Q || ho ? ko() || vu(d) : ko() ? d.nm = $ : vu(d), c && (d[Ka] = c.lat, d[$a] = c.lng), e && (d[Ua] = e), v) {
            var g = JSON.stringify(v).length;
            Pa <= g && ((v = Ba).overlen_length = g)
        }
        return d[Bt] = v, p && !ko() && (d.val_val = v, delete d[Bt]), d
    }

    function bu(t, n, e, r) { var i = (r = r || {}).category; return ye.isArrayLike(n) || (n = [n]), he.run(n, function(t) { t && e && (t.tag = e) }), t.evs = n, he.isStr(i) && (t[Fa] = pu(i)), t }

    function Su(t, n) { var e = {}; return e[st] = n, me(e, t) }

    function ku(e, t, n, r) {
        var i, o, a, u, c = (i = t, o = n, a = r, u = null, !he.isStr(i) || o || a ? he.isObj(i) && he.isStr(o) && !a && (u = o, o = null) : (u = i, i = null), u && (a = me({ cid: u }, a || {})), { lab: i, env: o, opts: a }),
            s = c.lab,
            f = c.env;
        r = cu(c.opts), r = me({ cid: e.opts.cid = r.cid || e.opts.cid }, r), f && he.isObj(f) && ye.each(f, function(t, n) { e._dt.set(n, t, ne, !0) }), e._dt.pageView(s, r)
    }

    function xu(t, n) { this.env = t || {}, this.opts = n || {}, this._t = [] }
    ou.set = function(t, n, e, r) {
        var i = this,
            o = i.env,
            a = mn.inWXMP && he.isObj(o[O]);
        if (he.isObj(t)) be(t, function(t, n) { i.set(n, t) });
        else if ((t !== Fa || n) && t !== Wt)
            if (!r && a && o[O][t] ? o[O][t] = n : o[t] = n, t === Fa && (mn.c = n), "utm" === t && he.isObj(n) && !a && Ei(n), On(t, n), x === t && Ke(n), dt !== Mn() || Xt[t]) he.isFunc(e) && e(o, i);
            else {
                var u = {},
                    c = hu(o[Fa]);
                u[t] = n, vo(c, "setEnv", u, function() { he.isFunc(e) && e(o, i) })
            }
    }, ou.get = function(t, n) { he.isFunc(n) && n(this.env[t], this) }, ou.pageView = function(e, r) {
        r = cu(r) || {};
        var t = void 0,
            i = this,
            n = r.fromWA,
            o = r.withlab,
            a = ru(r.callback, r.callbackTimeout),
            u = i.opts.cid,
            c = r.cid || u,
            s = r.isauto || B,
            f = r.isAutoInit,
            d = r.reportStatus,
            l = u && !(au(i) || f) && !uu(),
            v = d === lt || lt === Mn(),
            p = i.env;
        if (n && o ? (s = 6, e = this._cpi || {}) : this._cpi = e, l && !An()) {
            var h = Ne();
            t = v ? _u(K, u, null, h) : wu.call(i, K, u, null, h), _a(u), wa(Ga)
        }
        if (In(0), u && (au(i) || uu()) || (Ga = lu()), (i.opts.cid = c) || !n) {
            var m = Na(J, c);
            if (v) {
                var g = mu(i),
                    _ = Ji.getAll(),
                    y = _u(J, c, null, e, s),
                    w = [y];
                l && t && w.unshift(t);
                var b = bu(g, w, _, r);
                m && Ma(c, g, y), this.send(b, { nm: J, cbkey: a }), nu++, f || tu++
            } else {
                var S = gu({ isQuickReport: m, shouldCoverCid: !0, needCachePD: mn.nativeAutoPD }),
                    k = [wu.call(i, J, c, null, e, s, { fromWA: n })];
                l && t && k.push(t);
                var x = he.isStr(r.category) && r.category || p[Fa];
                vo(hu(x), Ra, k, function(t, n) { t ? (Fn(lt), Ze(a, Va), i.pageView(e, r), di(Hn.href, "native-report-error", i.env.union_id, L(t))) : (nu++, f || tu++, Ze(a, La)) }, { nativeOptions: S })
            }
            i.currentEvs = { cid: c, req_id: fu(), refer_cid: ya(), refer_req_id: ba() }, i._ptpvs = f ? 6 : B, Ee()
        }
    }, ou.pageDisappear = function(e, r) {
        if (0 !== nu) {
            r = me({}, r);
            var i = this,
                t = r.cid || i.opts.cid,
                n = r.shouldStore;
            In(p);
            var o = Ne();
            if (e = me(o, e), _a(t), wa(Ga), lt === Mn()) {
                var a = mu(i),
                    u = _u(K, t, null, e, r.isAuto),
                    c = bu(a, Ha.concat(u), Ji.getAll(), r);
                if (Ha = [], rr && n && Bi.nt) {
                    Je() && (mn.inWXMP && he.isObj(c[O]) && c[O][x] ? c[O][x] = $e() : c[x] = $e());
                    var s = du() || [];
                    ye.isArray(s) ? Bi.set(j, s.concat(c)) : Bi.set(j, [c])
                } else i.send(c)
            } else {
                var f = this.env,
                    d = gu(),
                    l = [wu.call(i, K, t, null, e)],
                    v = he.isStr(r.category) && r.category || f[Fa];
                vo(hu(v), Ra, l, function(t, n) { t && (Fn(lt), i.pageDisappear(e, r)) }, { nativeOptions: d })
            }
            Qn(), Ze(en)
        }
    }, ou.systemCheck = function(e, r, i) {
        i = me({}, i);
        var o = this,
            t = i.cid || o.opts.cid,
            n = !!i.isLXLog;
        if (lt === Mn()) {
            var a = mu(o),
                u = bu(a, [_u(Q, t, e, r)], Ji.getAll(), i);
            n && (a.category = "others"), this.send(u, i)
        } else {
            var c = o.env,
                s = gu(),
                f = [wu.call(o, Q, t, e, r)],
                d = he.isStr(i.category) && i.category || c[Fa];
            n && (d = "others"), vo(hu(d), Ra, f, function(t, n) { t && (Fn(lt), o.systemCheck(e, r, i)) }, { nativeOptions: s })
        }
    }, ou.moduleView = function(t, n, e) {
        var r = (e = me({}, e)).cid || this.opts.cid;
        e.mvDelay = this.opts.mvDelay || e.delay, su.call(this, X, r, t, n, e)
    }, ou.moduleViewList = function(t, n, e) {
        var r = (e = me({}, e)).cid || this.opts.cid;
        e.mvDelay = this.opts.mvDelay || e.delay;
        var i = yn("MVL");
        Mn() !== dt || i ? su.call(this, z, r, t, n, e) : su.call(this, X, r, t, n, e)
    }, ou.moduleClick = function(t, n, e) {
        var r = (e = me({}, e)).cid || this.opts.cid;
        e && e.isLeave && In(p), e.currentPageInfo = e.withPageInfo && he.isObj(this._cpi) ? this._cpi : ne, su.call(this, $, r, t, n, e)
    }, ou.moduleEdit = function(t, n, e) {
        var r = (e = me({}, e)).cid || this.opts.cid;
        su.call(this, H, r, t, n, e)
    }, ou.order = function(e, r, i) {
        i = me({}, i);
        var o = this,
            a = ru(i.callback, i.callbackTimeout),
            t = i.cid || o.opts.cid;
        Me(0, r);
        var n = Na(G, t, e);
        if (lt === Mn()) {
            var u = mu(this),
                c = _u(G, t, e, r),
                s = [c],
                f = Ji.getAll(),
                d = bu(u, s, f, i);
            n && Ma(t, u, c), this.send(d, { cbkey: a, nodelay: !0 })
        } else {
            var l = this.env,
                v = gu({ isQuickReport: n }),
                p = [wu.call(o, G, t, e, r)],
                h = he.isStr(i.category) && i.category || l[Fa];
            vo(hu(h), Ra, p, function(t, n) { t ? (Fn(lt), Ze(a, Va), o.order(e, r, i)) : Ze(a, La) }, { nativeOptions: v })
        }
    }, ou.pay = function(e, r, i) {
        i = me({}, i);
        var o = this,
            a = ru(i.callback, i.callbackTimeout),
            t = i.cid || o.opts.cid;
        Me(0, r);
        var n = Na(Z, t, e);
        if (lt === Mn()) {
            var u = mu(o),
                c = _u(Z, t, e, r),
                s = [c],
                f = Ji.getAll(),
                d = bu(u, s, f, i);
            n && Ma(t, u, c), this.send(d, { nodelay: !0, cb: function(t, n, e) { Ji.clear(), Ze(a, { code: t, status: n, type: e }) } }), o.clearTag()
        } else {
            var l = this.env,
                v = gu({ isQuickReport: n }),
                p = [wu.call(o, Z, t, e, r)],
                h = he.isStr(i.category) && i.category || l[Fa];
            vo(hu(h), Ra, p, function(t, n) { t ? (Fn(lt), Ze(a, Va), o.pay(e, r, i)) : Ze(a, La) }, { nativeOptions: v })
        }
    }, ou.tag = function(e, t, n, i) {
        var r = void 0,
            o = void 0,
            a = this.env,
            u = arguments,
            c = [],
            s = function(t) {
                if (!he.isObj(t)) return t;
                for (var n = t, e = 0, r = c.length; e < r; e++) {
                    if (!n) return n;
                    n = n[c[e]]
                }
                return n
            },
            f = function() {
                ye.each(u, function(t) {
                    if (!he.isStr(t)) return !1;
                    c.push(t)
                })
            },
            d = function(t, n, e) {
                var r = {};
                r[t] = n, o = hu(a[Fa]), vo(o, "setTag", r, function(t, n) { i && (e && f(), i(t, s(n), !0)) })
            },
            l = function(t) {
                var n = Ji.getAll();
                t || f(), i && i(0, s(n), !1)
            };
        if (ye.each(u, function(t) { he.isFunc(t) && (i = t) }), he.isObj(e)) {
            var v = this;
            ye.each(e, function(t, n) { v.tag(n, t) })
        } else he.isStr(e) && he.isObj(t) ? lt !== Mn() ? d(e, r = t, !0) : (be(t, function(t, n) { Ji.set(e, n, t) }), l(!0)) : (he.isObj(n) || he.isStr(n)) && function(t) { if (!he.isStr(t) && !t.length) return !1; return !0 }(e) && he.isStr(t) ? lt !== Mn() ? ((r = {})[t] = n, d(e, r, !0)) : (Ji.set(e, t, n), l(!0)) : he.isFunc(e) || he.isFunc(t) || he.isStr(e) && he.isStr(t) && he.isFunc(n) ? lt !== Mn() ? (f(), o = hu(a[Fa]), vo(o, "getTag", {}, function(t, n) { i && i(t, s(n), !0) })) : l() : i && i(-1)
    }, ou.clearTag = function(t, n, e) {
        var r = 0;
        lt === Mn() ? (he.isFunc(t) && (e = t, t = ne), Ji.clear(t, n), e && e(0)) : r = -1, e && e(r)
    }, ou.sfrom = function(r) {
        var i = void 0,
            t = void 0,
            n = this.env;
        lt !== Mn() ? (t = hu(n[Fa]), vo(t, "getSFrom", {}, function(t, n) {
            if (n) {
                var e = n.data ? n.data : n;
                i = he.isStr(e) ? JSON.parse(e) : e, r(t, i)
            }
        })) : r(1, [])
    }, ou.send = function(t, r) {
        var n = [];
        r = me({ cb: function(t, n, e) { r.cbkey && Ze(r.cbkey, { code: t, status: n, type: e }) } }, r), he.run(t, function(t) { Je() && (mn.inWXMP && he.isObj(t[O]) && t[O][x] ? t[O][x] = $e() : t[x] = $e()), n.push(t) });
        var e = du(!0);
        e && ye.isArray(e) && (n = e.concat(n)), ("data_sdk_saaspay" === (n[0] && n[0][Fa]) && "menuorder-new-rms-h5" === zn.__appName__ || Qa) && (r.useBeacon = !0), r.nodelay ? pi(n, r) : pi(n, r)
    }, ou.getAll = function() { return Xa };
    var Ou = xu.prototype;
    Ou.create = function(t, n) {
        var e = me({}, this.env);
        e = me(e, { category: t });
        var r = me({ isDefault: !1 }, this.opts),
            i = new iu(r = me(r, n || {}), e);
        return this._t.push(i), n.isDefault && (this._dt = i), i
    }, Ou.config = function(t, n) { if ("isDev" !== t || !mn._lockSDKENV) return ne !== t && (mn[t] = n), "cid" === t && _e(n) && (this.opts.cid = n), mn[t] }, Ou._initPV = function(t, n) { ku(this, this.config("pageValLab"), t = me(t, this.config("pageEnv")), { isauto: 6, cid: n, isAutoInit: !0 }) }, Ou.pageView = function(t, n, e) { ku(this, t, n, e) }, Ou.moduleView = function(t, n, e) { this._dt.moduleView(t, n, e) }, Ou.moduleViewList = function(t, n, e) { this._dt.moduleViewList(t, n, e) }, Ou.systemCheck = function(t, n, e) { this._dt.systemCheck(t, n, e) }, Ou.moduleClick = function(t, n, e) { this._dt.moduleClick(t, n, e) }, Ou.moduleEdit = function(t, n, e) { this._dt.moduleEdit(t, n, e) }, Ou.order = function(t, n, e, r) { this._dt.order(t, Su(e, n), r) }, Ou.pay = function(t, n, e, r) { this._dt.pay(t, Su(e, n), r) }, Ou.pageDisappear = function(t, n) { this._dt.pageDisappear(t, n) }, Ou.tag = function(t, n, e, r) { this._dt.tag(t, n, e, r) }, Ou.getBase64WebTag = function(t, n) {
        var e = (n = n || {}).full,
            r = me(!0, {}, Ji.getAll(!e)),
            i = qe(JSON.stringify(r));
        i = i.replace(/\+/g, "*").replace(/\//, "_").replace(/=/g, "."), he.isFunc(t) && t(i)
    }, Ou.sfrom = function(t) { this._dt.sfrom(t) }, Ou.clearTag = function(t, n, e) { this._dt.clearTag(t, n, e) }, Ou.setGeoLocation = function(t, n) {
        if (null !== t) {
            if (pe(t) && pe(n)) n = n.toString(), t = t.toString();
            else if (!/^\d+\.\d+$/.test(t) || !/^\d+\.\d+$/.test(n)) return;
            mn.geo = { lat: n, lng: t }
        } else mn.geo = null
    }, Ou.getAll = function(t) { t && t(this._t) }, Ou.getTracker = function(n, t) {
        var e = ye.find(this._t, function(t) { return t.env.category === n });
        t && t(e)
    }, Ou.get = function(t, n) { this._dt.get(t, n) }, Ou.getNative = function(e, r) {
        var i = this;
        ir ? Go(mn.c, ne, { origin: !0 }).then(function(t) {
            var n = _e(e) ? t[e] : t;
            r(n, i._dt)
        }, function() { r() }) : r()
    }, Ou.set = function(t, n, e) { this._dt.set(t, n, e) }, Ou._setRequestID = function(t) { Za = t }, Ou._setNativeEvsData = function(t, n) {
        var e;
        e = n, Ya[t] = e
    };
    var Iu = void 0,
        Au = !0,
        qu = function() {
            var n;
            if (!!!mn.onWebviewAppearAutoPV) return n = mn.c, void Ju().getTracker(n, function(t) {
                if (t && t.currentEvs) {
                    var e = me({ refer_cid: ya(), refer_req_id: ba() }, t.currentEvs);
                    ye.each(e, function(t, n) { e["web_" + n] = t, delete e[n] }), vo(n, "setWebPageData", e, function(t, n) {})
                }
            });
            Ee(), Ku(), Iu.pageView(ne, ne, { fromWA: !0, withlab: !!mn.positiveLab }), In(0)
        },
        ju = function() {!!mn.onWebviewAppearAutoPV && (An() || (In(p), Iu.pageDisappear({}))) },
        Cu = function() { Au = !0, qu() },
        Du = function() { Au = !1, ju(), Qn() },
        Tu = function() { Au && qu() },
        Eu = function() { Au && (ju(), Qn()) },
        Nu = void 0,
        Mu = !!/\d+\.\d+\.\d+/.test(_r) && 0 <= Be(_r, "11.3.0");

    function Fu(t, n) { he.isStr(t) && (n = he.isFunc(n) && n || function() {}, "on" + t in zn || "KNB:" + t in zn ? he.on(window, t, function(t) { n(t) }) : (Nu = window.KNB) && he.isFunc(Nu.subscribe) && Nu.subscribe({ action: t, handle: function() { n() }, success: function() {}, fail: function(t) {} })) }
    var Ru = {
            hook: function() {
                try { Fu("appear", Cu), Fu("disappear", Du), Mu && (Fu("foreground", Tu), Fu("background", Eu)) } catch (t) { di("sdk", "api-error", "", t.stack, !0) }
                Iu = Ju()
            }
        },
        Pu = ["setGeoLocation"].join("|"),
        Bu = [],
        Lu = vt,
        Vu = void 0,
        Uu = void 0;

    function Wu(t, n) { return { cb: t, cmd: n } }

    function Ju() { return Vu }

    function Ku() {
        var n, r;
        Pn(!1), (n = Uu, r = { none: !0 }, new Ir(function(e) { try { var t = Be(qo, "4.12.0");!qo || !pe(t) || t < 0 ? e(r) : n && er || Sr() ? vo(n, "getReqId", {}, function(t, n) { e(t ? r : n) }) : e(r) } catch (t) { e(r), di("sdk", "api-error", "", t.stack, !0) } })).then(function(t) {
            var n = t || {},
                e = n.val_ref,
                r = n.req_id,
                i = n.refer_req_id,
                o = !!(r || e || i);
            r && Vu._setRequestID(r), e && Vu._setNativeEvsData("val_ref", e), i && Vu._setNativeEvsData("refer_req_id", i), Pn(o)
        })
    }

    function $u(t, n) {
        if (ht === Lu) t && t(Vu);
        else if (pt === Lu) t && Bu.push(Wu(t, n));
        else {
            he.now();
            Bu = Bu.concat(Wu(t, n));
            var e = Gn.getElementsByTagName("meta"),
                a = je(e, "lx:cid") || mn.cid;
            if (!(Uu = mn.c = je(e, "lx:category"))) return void(Lu = vt);
            Lu = pt;
            var u = je(e, "lx:mvDelay");
            u = isNaN(u) ? 0 : parseInt(u, 10);
            var c = "off" !== je(e, "lx:autopv");
            mn.autoPV = c, D(Ku, 1e3), Ir.all([ia(Uu)]).then(function(t) {
                var n, r = t[0],
                    e = r.appnm,
                    i = bn();
                !he.isStr(e) || Gn.domain, Vu = new xu(r, { cid: a, isDefault: !0, mvDelay: u }), Uu && Vu.create(Uu, { isDefault: !0 }), r = me(!0, Vu._dt.env, r), Vu._dt.env = r, he.now();
                try {
                    var o = [];
                    ye.each(Bu, function(t) {
                        var n = t.cb,
                            e = t.cmd;
                        "config" === e || "set" === e || -1 < Pu.indexOf(e) ? n(Vu, r) : o.push(t)
                    }), rr && (n = r.msid, pa || (pa = new va(n))), i && Bi.set(Qt, i), c && Uu && a && a && Vu._initPV(r, a), Ru.hook(function() {}), ye.each(o, function(t) { t && t.cb && t.cb(Vu, r) })
                } catch (t) {}
            }).then(function() { Lu = ht, zr.check() }, function(t) { throw Lu = ht, t })
        }
    }
    var Qu = [
            ["click", ut],
            ["tap", ut],
            ["view", "moduleView"],
            ["return", "moduleEdit"],
            ["order", ct],
            ["pay", "pay"]
        ],
        Xu = ye.reduce(Qu, function(t, n) { return t[n[0]] = n[1], t }, {}),
        zu = [
            ["mpt", ot],
            ["report", "pageDisappear"]
        ],
        Hu = ye.reduce(zu, function(t, n) { return t[n[0]] = n[1], t }, {}),
        Gu = ye.reduce(["config", "event", "send", "use"], function(t, n) { return t[n] = !0, t }, {}),
        Zu = function(t, n) {
            var e = Gn.getElementsByTagName("head")[0],
                r = Gn.createElement("meta");
            r.setAttribute("name", t), r.setAttribute("from", "v3api"), r.setAttribute("content", n), e.appendChild(r)
        },
        Yu = function(e, t) { return e = e || {}, be(t, function(t, n) { 1 === { act: 1, cid: 1, val: 1, lab: 1, bid: 1 }[n] ? e["val_" + n] = t : e[n] = t }), e },
        tc = function(t, n, e) {
            (t && !ge(t) && (t = { custom: { _lab: t } }), !t && e && (t = {}), e) && ((t.custom = t.custom || {})[n] = e);
            return t
        },
        nc = function(t, n, e) { return t && !ge(t) && (t = { custom: { _lab: t } }), t && (t[n] = e), t },
        ec = function(t, n) {
            var e = t[Bt],
                r = t[Vt];
            if (e && e === r && (r = me(!0, {}, r)), n && (r || e)) {
                var i = e;
                e = r || {}, i && (e = tc(e || {}, "_lab", i))
            } else if (!n && (r || e)) {
                if (_e(r) && (r = { analyse_val: r }), _e(e)) e = { val_lab: e };
                r && (e = nc(e || {}, "page", r))
            }
            return ne !== t[tt] && (e = tc(e || {}, "_act", t[tt])), ne !== t[Y] && (e = tc(e || {}, "_et", t[Y])), ne !== t[et] && (e = nc(e || {}, et, t[et])), ne !== t[rt] && (e = tc(e || {}, "_el_id", t[rt])), e
        };

    function rc(t) {
        var n, e, r, i = (e = (n = t).split("."), r = void 0, 2 === e.length && (n = e[1], r = e[0]), [n, r]),
            o = void 0;
        return i[1] && (o = i[1]), [t = i[0], o]
    }
    var ic = function n(e, t) {
            var r = rc(e);
            e = r[0];
            var i = r[1],
                o = t[0],
                a = t[1];
            if (ye.isArray(o)) return Se(o, function(t) { return n(i ? i + "." + e : e, [t, a]) });
            var u, c, s = (o.nm || "mge").toLowerCase();
            o.nm = s, (c = (u = o).val) && (Yu(u, c), delete u.val), o = u;
            var f = "mge" === s;
            if ("mpt" === s) return function(t) { t = Yu(t, t.val); var n = ec(t, !0); return [ot, n, null, t[nt]] }.apply(null, t);
            var d, l, v = ct === s,
                p = "pay" === s,
                h = o[Y],
                m = o[tt],
                g = ec(o, !1);
            v || p || h || !f || !m ? p || v ? e = s : (l = h, e = "mge" === (d = s) ? l ? Xu[l] || at : ut : "mpt" === d || "report" === d ? Hu[d] : at, f || (g = tc(g || {}, "_nm", s))) : e = ut;
            var _ = o[nt];
            return _ && ((a = a || {}).cid = _), i && tc(g, "_logchannel", i), tc(g = g || {}, "_api", "v3"), e === ct || "pay" === e ? [e, o[Lt], g.order_id, g, a] : [e, o[Lt], g, a]
        },
        oc = function t() { if (!t.f) { Zu("lx:autopv", "off"), t.f = !0 } },
        ac = function(t) {
            if (!t || !t.length) return t;
            try {
                var n = t[0];
                (function(t) { if (he.isFunc(t)) return !1; var n = t.indexOf("."); return 0 < n && (t = t.substr(n + 1)), !!Gu[t] })(n) && (t = ye.slice(t, 1), uc(n) ? (We(3), oc(), t = ic(n, t)) : cc(n) ? (We(3), oc(), t = function(t, n) {
                    var e = rc(t)[1];
                    t = ot;
                    var r = n[1],
                        i = n[2],
                        o = e ? { custom: { _logchannel: e } } : ne,
                        a = {};
                    if (_e(r)) ge(i) ? o = i : _e(i) && (o = tc({}, "analyse_val", i));
                    else if (ge(r)) {
                        i = (a = Yu(a, r))[Vt], _e(i) && (i = tc({}, "analyse_val", i)), o = i;
                        var u = a[Bt];
                        u && tc(o, "_lab", u), r = a[nt]
                    }
                    var c = void 0;
                    return r && ((c = {}).cid = r), [t, o = tc(o, "_api", "v3"), ne, c]
                }(n, t)) : sc(n) ? (We(3), oc(), t = function(t, n) {
                    var e = n[0],
                        r = n[1];
                    if (e && (e = e.replace(/^data_sdk_/i, ""), Zu("lx:category", e)), ge(r)) return ["set", r]
                }(0, t)) : fc(n, t[0], t[1]) ? (oc(), e = n, r = t[0], i = t[1], t = "appnm" === r && _e(i) ? void Zu("lx:appnm", i) : ("cid" === r && _e(i) && Zu("lx:cid", i), [e, r, i])) : t.unshift(n))
            } catch (t) {}
            var e, r, i;
            return t
        },
        uc = function(t) { if (he.isFunc(t)) return !1; var n = t.indexOf("."); return 0 < n && (t = t.substr(n + 1)), "event" === t },
        cc = function(t) { var n = t.indexOf("."); return 0 < n && (t = t.substr(n + 1)), "send" === t },
        sc = function(t) { return "use" === t },
        fc = function(t, n) { var e = !1; return "cid" !== n && "appnm" !== n || (We(3), e = !0), "config" === t && e };
    if (!ir) try { 1 != localStorage.getItem("__lxsdk_beacon_flag") && (he.isFunc(navigator.sendBeacon) ? (localStorage.setItem("__lxsdk_beacon_flag", 1), kn("sbc", 1), setTimeout(function() { hc("systemCheck", "b_techportal_1bpzttec_sc", null, { category: "techportal", cid: "c_techportal_1sg882yp", useBeacon: !0 }) }, 500)) : kn("sbc", 2)) } catch (t) {}
    var dc = void 0,
        lc = void 0;

    function vc(t, n, e, r, i) {
        if (he.isFunc(n)) n.call(t, t, r, i);
        else if (!i && he.isStr(n)) { if (he.isFunc(t[n])) return t[n].apply(t, e); if ("onLoad" === n) try { e[0](me(!0, {}, r)) } catch (t) {} }
    }

    function pc() {
        if (!lc) {
            lc = !0;
            var r = void 0;
            ur && he.on(Gn, "mouseup", function(t) {
                var n = t.target || t.srcElement,
                    e = n.tagName + n.href;
                e = e.toLocaleLowerCase(), 1 === n.nodeType && /^ajavascript:/i.test(e) && (r = new Date)
            });
            var t = zn.onbeforeunload;
            rr && or ? zn.addEventListener("pagehide", Le(!1, ur, r, void 0, hc, ne, An)) : zn.onbeforeunload = Le(!1, ur, r, void 0, hc, t, An)
        }
    }

    function hc(r) {
        try {
            var t = document.getElementById("__lxsdk_devltool_message_node");
            if (t) {
                var n = new CustomEvent("lxsdk", { detail: { args: JSON.stringify(arguments) } });
                t.dispatchEvent(n)
            }
        } catch (t) {}
        var e = arguments;
        if (e.length) { var i = ye.slice(e, 1, e.length); try { dc ? vc(dc, r, i, dc._dt ? dc._dt.env : null) : $u(function(t, n, e) { vc(dc = t, r, i, n, e), pc() }, r) } catch (t) { try { var o = t.stack.split(/\n\s*at\s/m)[1].replace(/^.*\(([^)]+)\).*$/, "$1"); if (!/\/(lx|analytics)\.js/.test(o)) return } catch (t) {} finally { di("sdk", "api-error", "", t.message + "\n" + t.stack, !0) } } }
    }
    window._lxsdk_isDOMReady || (window._lxsdk_isDOMReady = !0, function() {
        var s = !0,
            f = !1,
            d = function() {
                var t = Ce();
                t && (t.q.push = function n(t) { try { var e, r = (e = ac(t)) ? e[0] : ""; if (ye.isArray(r)) return void be(e, function(t) { n(t) }); "start" === r ? (s = !0, f || l(d)) : !1 === s ? e && d.push(e) : hc.apply(ne, e) } catch (t) { try { di("sdk", "api-error", "", t.stack, !0) } catch (t) {} } });
                for (var n = void 0, e = void 0, r = [], i = [], o = [], a = t && ye.isArray(t.q) ? t.q : [], u = 0, c = a.length; u < c; u++) "config" === (e = a[u][0]) ? i.push(a[u]) : n || "use" !== e ? o.push(a[u]) : (r.push(a[u]), n = !0);
                return a = i.concat(r.concat(o))
            }();

        function l(t) {
            f || (t && ye.each(t, function(t) {
                var n, e = (n = ac(t)) ? n[0] : "";
                ye.isArray(e) ? be(n, function(t) { hc.apply(ne, t) }) : e ? hc.apply(ne, n) : t && t && t[0]
            }), hc(function() { pc() }), f = !0)
        }
        if (0 === d.length) $u(function(t) { dc = t, pc() });
        else try {
            d = Se(d, function(t) {
                var n;
                if ("config" === ((n = ac(t)) ? n[0] : "")) {
                    var e = n[1],
                        r = n[2];
                    "autoStart" === e && !1 === r && (s = !1)
                }
                return n
            }), s && l(d)
        } catch (t) {}
        li()
    }())
}();