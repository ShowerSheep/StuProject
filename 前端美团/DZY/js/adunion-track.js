! function() {
    function n() { return !!window.navigator && /titans(no)?x/.test(window.navigator.userAgent.toLowerCase()) }

    function t() { var n = (new Date).getTime(); return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) { var o = (n + 16 * Math.random()) % 16 | 0; return n = Math.floor(n / 16), ("x" == t ? o : 3 & o | 8).toString(16) }) }

    function o() { return (new Date).getTime() }

    function e() { return window.screen.width + "*" + window.screen.height }

    function i() {
        function n() { return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) }
        return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n()
    }

    function r(n, t) { return (n || "").replace(new RegExp("(?:^|&)" + t + "=[^&=?]*", "ig"), "") }

    function u(n) { window.console && console.log(n) }

    function c(n, t, o, e, i) {
        var r = new Date;
        r.setTime(r.getTime() + 24 * o * 60 * 60 * 1e3);
        var u = n + "=" + t,
            c = "expires=" + r.toUTCString(),
            i = "path=" + i,
            e = "domain=" + e;
        document.cookie = [u, c, e, i].join(";")
    }

    function a(n) {
        var t = new RegExp("(?:[\\s;]|^)" + n + "=([^=;]*)", "i"),
            o = t.exec(document.cookie);
        return o && o[1]
    }

    function m() { var n = document.cookie.match(/_hc.v=([^;]+)/); return n ? n[1] : null }

    function d() { return i() + "." + Math.round(+new Date / 1e3) }

    function f() {
        for (var n = document.domain.split("."); n.length > 2;) n.shift();
        var t = "." + n.join("."),
            o = d();
        u("hippo:setHCV", o), c("_hc.v", o, 365, t, "/")
    }

    function s() { var n = document.cookie.match(/iuuid=([^;]+)/); return n ? n[1] : null }

    function p(n) {
        var t = window.location.href,
            o = t.split("?"),
            e = "";
        o.forEach(function(n, t) { t > 0 && (e += "&" + n) });
        var i = e.match(new RegExp("[?&]" + n + "=([^&]+)", "i"));
        return null == i || i.length < 1 ? "" : i[1]
    }

    function x(n) {
        var t = {};
        return n ? (n.split("&").forEach(function(n) {
            var o = n.split("=");
            t[o[0]] = o[1]
        }), t) : t
    }

    function l(n) { if (!n) return ""; var t = []; for (var o in n) t.push(o + "=" + n[o]); return t.join("&") }

    function g(n) {
        if (!n) return {};
        var t = n.split(","),
            o = {};
        return t.forEach(function(n) {
            var t = n.split(":");
            o[t[0]] = t[1]
        }), o
    }

    function w(n) { if ("object" == typeof Owl && "function" == typeof Owl.addError) try { Owl.addError({ name: "MidasError", msg: n }) } catch (n) {} }

    function h(t) {
        var i = p("_fb_");
        if (i) {
            var u, c = p("openid"),
                m = p("agency"),
                d = p("utm"),
                f = a("_lx_utm"),
                w = "";
            d ? (u = g(decodeURIComponent(decodeURIComponent(d))), w = l(u)) : f && (u = x(f), w = l(u)), u || (u = {});
            var h = p("utm_source") || u.utm_source,
                v = p("utm_medium") || u.utm_medium,
                _ = p("utm_campaign") || u.utm_campaign,
                y = p("utm_content") || u.utm_content,
                O = p("utm_term") || u.utm_term,
                C = window.location.host,
                R = "",
                k = "";
            R = C.indexOf("dianping.com") > -1 ? /^ppe/.test(C) ? "https://mlog.51ping.com/log" : "https://mlog.dianping.com/log" : C.indexOf("meituan.com") > -1 ? /^test/.test(C) ? "https://mlog.test.meituan.com/log" : "https://mlog.meituan.com/log" : "https://mlog.51ping.com/log", /(%253d|%253D)/.test(i) && (i = decodeURIComponent(i)), k = /^(http|https)/.test(i) ? decodeURIComponent(i) : R + "?" + decodeURIComponent(i), k = r(k, "act"), k += "&act=4&adClient=h5";
            var E = window.location.pathname;
            t && E.indexOf("/adunion/") > -1 && n() && (C.indexOf("dianping.com") > -1 || C.indexOf("51ping.com") > -1 ? k = k + "&dpid=" + t : (C.indexOf("meituan.com") > -1 || C.indexOf("sankuai.com") > -1) && (k = k + "&mtdpid=" + t)), c && (k = k + "&openid=" + c), m && (k = k + "&agency=" + m), s() && (k += "&iuuid=" + s()), E.indexOf("/adunion/") > -1 && (k += "&join_key=" + window.midasJoinKey, k += "&reach_time=" + o(), k += "&screen_resolution=" + e()), h && (k = k + "&utm_source=" + h), v && (k = k + "&utm_medium=" + v), _ && (k = k + "&utm_campaign=" + _), O && (k = k + "&utm_term=" + O), w && (k = k + "&utm=" + encodeURIComponent(w)), y && (k = k + "&utm_content=" + encodeURIComponent(y));
            var I = new Image(1, 1);
            I.onload = I.onerror = function() { I = null }, I.src = k
        }
    }
    window.midasJoinKey = function() { try { return t() + "-" + o() } catch (n) { return "" } }(),
        function(n) { try { n() } catch (n) { w("js error: " + JSON.stringify({ name: n.name || "no value", message: n.message || "no value", stack: n.stack || "no value" })) } }(function() { m() || f(), h() }), window.midasAduTrack = function() {
            var t = window.location.search;
            window.location.pathname.indexOf("/adunion/") > -1 && t.indexOf("_fb_") > -1 && n() && window.KNB && window.KNB.ready(function() { window.KNB.getUserInfo({ success: function(n) { h(n.uuid || n.dpid) } }) })
        }
}();
//# sourceMappingURL=adunion-track.min.js.map