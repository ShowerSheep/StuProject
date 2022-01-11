;
var App =
    webpackJsonpApp([16], {

        /***/
        117:
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.getAreaSuggest = exports.getSuggest = void 0;

            var _request = __webpack_require__(14);

            var SUGGEST_URL = '//www.meituan.com/ptapi/suggest';
            var AREA_SUGGEST_URL = '//apimobile.meituan.com/group/v1/area/search/';
            /**
             * @typedef {{MACaddress?:string,strength?:number,name?:string,isConnected?:boolean}} MTWifi
             * @typedef {{input:string,cityid:number,uuid:string,lat:number,lng:number,utmMedium:string,utmTerm:string,reqid:number,userid:number,cateid?:string,limit?:number,traceid?:string,wifi:Array<MTWifi>,exData:{}}} MTSuggestRequest
             * @typedef {{editorWord:string,query:string,trackInfo:string,count:number,distance?:number,icon?:string,poiid?:string,url?:string,recType?:number,exData:{}}} SecondSuggestItem
             * @typedef {{editorWord:string,query:string,trackInfo:string,count:number,distance?:number,icon?:string,poiid?:string,url?:string,secSugItems:Array<SecondSuggestItem>,recType?:number,exData:{}}} MTSuggestItem
             * @typedef {{exData:{},suggestItems:Array<MTSuggestItem>,globalid:string}} MTSuggestResponse
             */

            /**
             * 搜索关键词建议接口
             * 参考文档： <https://wiki.sankuai.com/pages/viewpage.action?pageId=879347343>
             * @export
             * @see SUGGEST_URL
             * @example ?mock=mock/suggest.json&demo=demo/suggest.js
             * @param {{keyword: string}} param
             * @returns {Promise<{ code: number, data: MTSuggestResponse }>} 传入组件后，可得到施加参数后的高阶组件。
             */

            var getSuggest = function getSuggest(param) {
                return _request.fetchRequest.getCORS(SUGGEST_URL, param);
            };
            /**
             * 地域建议接口
             * @export
             * @see SUGGEST_URL
             * @example ?mock=mock/area-suggest.json&demo=demo/area-suggest.js
             * @param {string} keyword
             * @returns {Promise<{data:{districtName:string,districtId:number,cityId:number,cityName:string,name:string,cityAcronym:string}[]}>} 传入组件后，可得到施加参数后的高阶组件。
             */


            exports.getSuggest = getSuggest;

            var getAreaSuggest = function getAreaSuggest(keyword) {
                return _request.fetchRequest.getCORSWithoutCookie(AREA_SUGGEST_URL + encodeURIComponent(keyword));
            };

            exports.getAreaSuggest = getAreaSuggest;

            /***/
        }),

        /***/
        14:
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.fetchRequest = exports.APIRequest = void 0;

            var _stringify = _interopRequireDefault(__webpack_require__(16));

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var RETRY_TIMES = 1;

            var injectCsrfHeader = function injectCsrfHeader(headers) {
                if (window.AppData.csrf) {
                    Object.assign(headers, window.AppData.csrf);
                }

                return headers;
            };

            var APIRequest = function APIRequest(requestLib) {
                var _this = this;

                _classCallCheck(this, APIRequest);

                this.postJSON = function(url) {
                    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : JSON.stringify(param);
                    var retry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RETRY_TIMES;
                    var headers = injectCsrfHeader({
                        'Content-Type': 'application/json'
                    });
                    return _this._request(url, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: headers,
                        body: body
                    }).then(function(response) {
                        return response.json();
                    }).catch(function(err) {
                        if (retry) {
                            return _this.postJSON(url, null, body, retry - 1);
                        }

                        console.error(err);
                        return {
                            code: -1,
                            error: 1
                        };
                    });
                };

                this.getCORS = function(url, param) {
                    var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _stringify.default)(param);
                    var retry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RETRY_TIMES;
                    return _this._request(url + (query ? "?".concat(query) : ''), {
                        method: 'GET',
                        credentials: 'include' // 同域下自动发送cookie

                    }).then(function(response) {
                        return response.json();
                    }).catch(function(err) {
                        if (retry) {
                            return _this.getCORS(url, null, query, retry - 1);
                        }

                        throw err;
                    });
                };

                this.getCORSWithoutCookie = function(url, param) {
                    var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _stringify.default)(param);
                    var retry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RETRY_TIMES;
                    return _this._request(url + (query ? "?".concat(query) : ''), {
                        method: 'GET'
                    }).then(function(response) {
                        return response.json();
                    }).catch(function(err) {
                        if (retry) {
                            return _this.getCORSWithoutCookie(url, null, query, retry - 1);
                        }

                        throw err;
                    });
                };

                this.getJSON = function(url, param) {
                    var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _stringify.default)(param);
                    var retry = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RETRY_TIMES;
                    return _this._request(url + (query ? "?".concat(query) : ''), {
                        method: 'GET',
                        headers: injectCsrfHeader({
                            'Cache-Control': 'no-cache',
                            // for IE cache issue
                            'Pragma': 'no-cache',
                            //eslint-disable-line
                            'Content-Type': 'application/json'
                        }),
                        credentials: 'same-origin' // 同域下自动发送cookie

                    }).then(function(response) {
                        return response.json();
                    }).catch(function(err) {
                        if (retry) {
                            return _this.getJSON(url, null, query, retry - 1);
                        }

                        throw err;
                    });
                };

                this._request = requestLib;
            };

            exports.APIRequest = APIRequest;
            var fetchRequest = new APIRequest(window && window.fetch ? window.fetch.bind(window) : function() {});
            exports.fetchRequest = fetchRequest;

            /***/
        }),

        /***/
        149:
        /***/
            (function(module, exports, __webpack_require__) {

            var apply = Function.prototype.apply;

            // DOM APIs, for completeness

            exports.setTimeout = function() {
                return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
            };
            exports.setInterval = function() {
                return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
            };
            exports.clearTimeout =
                exports.clearInterval = function(timeout) {
                    if (timeout) {
                        timeout.close();
                    }
                };

            function Timeout(id, clearFn) {
                this._id = id;
                this._clearFn = clearFn;
            }
            Timeout.prototype.unref = Timeout.prototype.ref = function() {};
            Timeout.prototype.close = function() {
                this._clearFn.call(window, this._id);
            };

            // Does not start the time, just sets up the members needed.
            exports.enroll = function(item, msecs) {
                clearTimeout(item._idleTimeoutId);
                item._idleTimeout = msecs;
            };

            exports.unenroll = function(item) {
                clearTimeout(item._idleTimeoutId);
                item._idleTimeout = -1;
            };

            exports._unrefActive = exports.active = function(item) {
                clearTimeout(item._idleTimeoutId);

                var msecs = item._idleTimeout;
                if (msecs >= 0) {
                    item._idleTimeoutId = setTimeout(function onTimeout() {
                        if (item._onTimeout)
                            item._onTimeout();
                    }, msecs);
                }
            };

            // setimmediate attaches itself to the global object
            __webpack_require__(196);
            exports.setImmediate = setImmediate;
            exports.clearImmediate = clearImmediate;


            /***/
        }),

        /***/
        16:
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = stringify;

            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.
            // for browser usage
            function stringifyPrimitive(v) {
                if (typeof v === 'string') return v;
                if (typeof v === 'number' && isFinite(v)) return "".concat(v);
                if (typeof v === 'boolean') return v ? 'true' : 'false';
                return '';
            }

            function stringify(obj, sep, eq) {
                sep = sep || '&';
                eq = eq || '=';
                var encode = encodeURIComponent;

                if (obj !== null && _typeof(obj) === 'object') {
                    var keys = Object.keys(obj);
                    var len = keys.length;
                    var flast = len - 1;
                    var fields = '';

                    for (var i = 0; i < len; ++i) {
                        var k = keys[i];
                        var v = obj[k];
                        var ks = encode(stringifyPrimitive(k)) + eq;

                        if (Array.isArray(v)) {
                            var vlen = v.length;
                            var vlast = vlen - 1;

                            for (var j = 0; j < vlen; ++j) {
                                fields += ks + encode(stringifyPrimitive(v[j]));
                                if (j < vlast) fields += sep;
                            }

                            if (vlen && i < flast) fields += sep;
                        } else {
                            fields += ks + encode(stringifyPrimitive(v));
                            if (i < flast) fields += sep;
                        }
                    }

                    return fields;
                }

                return '';
            }

            exports.stringify = stringify;

            /***/
        }),

        /***/
        192:
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            var _HeaderBar = _interopRequireDefault(__webpack_require__(193));

            var _Header = _interopRequireDefault(__webpack_require__(194));

            var _jsCookie = _interopRequireDefault(__webpack_require__(61));

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var webloc = __webpack_require__(195);

            var headerBar = new _HeaderBar.default({
                dom: '.header-bar'
            }, _jsCookie.default);
            var header = new _Header.default({
                dom: '.com-header'
            });
            var positionDom = document.querySelector('.header-bar .header-bar-position');

            function getLocation() {
                webloc.getCurrentPosition({
                    project: 'mtpc',
                    timeout: 1000,
                    city: true
                }, function(err, result) {
                    if (err) {
                        // 定位失败
                        positionDom.style.display = 'block';
                        return;
                    } // 定位成功


                    if (result.city && result.city.id) {
                        var cityDom = document.querySelector('.header-bar .current-city');
                        var nearCitys = document.querySelector('.header-bar .near-citys');

                        _jsCookie.default.set('ci', result.city.id, {
                            expires: 60,
                            domain: '.meituan.com'
                        });

                        fetch("/ptapi/getHeaderCityInfoById?id=".concat(result.city.id), {
                            method: 'GET',
                            credentials: 'include' // 同域下自动发送cookie

                        }).then(function(response) {
                            return response.json();
                        }).then(function(json) {
                            if (!json.currentCity || !json.currentCity.name) {
                                throw new Error('no city');
                            }

                            if (cityDom.textContent) {
                                cityDom.textContent = json.currentCity.name;
                            } else {
                                cityDom.innerText = json.currentCity.name;
                            }

                            if (json.nearCitys.length > 0) {
                                var nearcitysHtml = json.nearCitys.map(function(city) {
                                    return "<a class=\"city-guess\" href=\"https://".concat(city.acronym, ".meituan.com\">").concat(city.name, "</a>");
                                }).join('');
                                nearCitys.innerHTML = "[".concat(nearcitysHtml, "]");
                            }

                            header.setCity(json.currentCity);
                        }).catch(function() {
                            if (cityDom.textContent) {
                                cityDom.textContent = result.city.name;
                            } else {
                                cityDom.innerText = result.city.name;
                            }
                        }).then(function() {
                            positionDom.style.display = 'block';
                        });
                    }
                });
            }

            if (!_jsCookie.default.get('ci')) {
                getLocation();
            } else {
                positionDom.style.display = 'block';
            }

            /***/
        }),

        /***/
        193:
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = void 0;

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            var HeaderBar =
                /*#__PURE__*/
                function() {
                    function HeaderBar() {
                        var _this = this;

                        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                            dom: '.header-bar'
                        };
                        var cookie = arguments[1];
                        var barTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '美团主页';

                        _classCallCheck(this, HeaderBar);

                        this.dom = document.querySelector(props.dom);
                        this.events = {};
                        var hasChild = this.dom.getElementsByClassName('has-child'); // let pageTitle = document.createElement('p');
                        // pageTitle.innerHTML = 'barTitle';
                        // hasChild.before(pageTitle);

                        for (var i = 0; i < hasChild.length; i++) {
                            hasChild[i].addEventListener('mouseenter', function(e) {
                                e.target.querySelector('.header-nav-second').style.display = 'block';
                            });
                            hasChild[i].addEventListener('mouseleave', function(e) {
                                e.target.querySelector('.header-nav-second').style.display = 'none';
                            });
                        }

                        var MSIE = /MSIE/g;
                        var MSIE11 = /trident/g;

                        if (!MSIE.test(window.navigator.userAgent) && !MSIE11.test(window.navigator.userAgent.toLocaleLowerCase())) {
                            var nickName = cookie.get('unc');

                            if (cookie.get('unc')) {
                                cookie.set('firstTime', new Date().getTime(), {
                                    domain: '.meituan.com'
                                });
                                this.timer = setInterval(function() {
                                    return _this.testOverTime(cookie);
                                }, 5 * 60 * 1000);
                                this.setUserUi({
                                    nickName: nickName
                                }, cookie);
                                return;
                            }

                            fetch('//www.meituan.com/ptapi/getLoginedUserInfo', {
                                method: 'GET',
                                credentials: 'include' // 同域下自动发送cookie

                            }).then(function(response) {
                                return response.json();
                            }).then(function(json) {
                                if (Object.keys(json).length !== 0) {
                                    cookie.set('firstTime', new Date().getTime(), {
                                        domain: '.meituan.com'
                                    });
                                    _this.timer = setInterval(function() {
                                        return _this.testOverTime(cookie);
                                    }, 5 * 60 * 1000);
                                }

                                _this.setUserUi(json, cookie);
                            }).catch(function(e) {
                                console.log(e);
                            });
                        }
                    }

                    _createClass(HeaderBar, [{
                        key: "setUserUi",
                        value: function setUserUi(userData, cookie) {
                            this.dom.querySelector('.user-entry').style.display = 'inline-block';
                            var growthBtn = this.dom.querySelector('.growth-entry');
                            var extraBtn = this.dom.querySelector('.extra-entry');

                            if (userData && userData.nickName) {
                                if (cookie) {
                                    cookie.set('unc', userData.nickName, {
                                        domain: '.meituan.com'
                                    });
                                }

                                growthBtn.href = 'https://www.meituan.com/account/userinfo/';
                                extraBtn.href = 'https://passport.meituan.com/account/signout';

                                if (growthBtn.textContent) {
                                    growthBtn.textContent = userData.nickName;
                                    extraBtn.textContent = '退出';
                                } else {
                                    growthBtn.innerText = userData.nickName;
                                    extraBtn.innerText = '退出';
                                }

                                extraBtn.addEventListener('click', function(event) {
                                    if (cookie) {
                                        cookie.remove('unc', {
                                            domain: '.meituan.com'
                                        });
                                        cookie.remove('uav', {
                                            domain: '.meituan.com'
                                        });
                                        cookie.remove('u', {
                                            domain: '.meituan.com'
                                        });
                                        cookie.remove('ulv', {
                                            domain: '.meituan.com'
                                        });
                                    }
                                });
                            } else {
                                growthBtn.href = "https://passport.meituan.com/account/unitivelogin?service=www&continue=".concat(encodeURIComponent('https://www.meituan.com/account/settoken?continue=' + encodeURIComponent(location.href)));
                                extraBtn.href = "https://passport.meituan.com/account/unitivesignup?service=www&continue=".concat(encodeURIComponent('https://www.meituan.com/account/settoken?continue=' + encodeURIComponent(location.href)));
                            }
                        }
                    }, {
                        key: "testOverTime",
                        value: function testOverTime(cookie) {
                            var firstTime = cookie && cookie.get('firstTime');
                            var timeOut = 2 * 60 * 60 * 1000;
                            var currentTime = new Date().getTime();

                            if (currentTime - firstTime > timeOut) {
                                this.doOverTimeLogout(cookie);
                                clearInterval(this.timer);
                            }
                        }
                    }, {
                        key: "doOverTimeLogout",
                        value: function doOverTimeLogout(cookie) {
                            if (cookie) {
                                cookie.remove('unc', {
                                    domain: '.meituan.com'
                                });
                                cookie.remove('uav', {
                                    domain: '.meituan.com'
                                });
                                cookie.remove('u', {
                                    domain: '.meituan.com'
                                });
                                cookie.remove('ulv', {
                                    domain: '.meituan.com'
                                });
                            }

                            window.location.href = 'https://passport.meituan.com/account/signout';
                        }
                    }]);

                    return HeaderBar;
                }();

            exports.default = HeaderBar;

            /***/
        }),

        /***/
        194:
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.default = void 0;

            var _util = __webpack_require__(8);

            var _suggest = __webpack_require__(117);

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            var _window$comPtData$hea = window.comPtData.header,
                _window$comPtData$hea2 = _window$comPtData$hea.currentCity,
                currentCity = _window$comPtData$hea2 === void 0 ? {
                    acronym: 'www'
                } : _window$comPtData$hea2,
                _window$comPtData$hea3 = _window$comPtData$hea.searchKey,
                searchKey = _window$comPtData$hea3 === void 0 ? '' : _window$comPtData$hea3;

            var Header =
                /*#__PURE__*/
                function() {
                    function Header() {
                        var _this = this;

                        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                            dom: '.com-header'
                        };

                        _classCallCheck(this, Header);

                        this.dom = document.querySelector(props.dom);
                        this.events = {};
                        var categorys = this.dom.querySelector('.header-categorys-block');
                        var suggestBlock = this.dom.querySelector('.header-search-suggest');
                        var searchBtn = this.dom.querySelector('.header-search-btn');
                        var searchInput = this.dom.querySelector('.header-search-input'); // const noinputBlock = this.dom.querySelector('.header-search-noinput');
                        // const hasinputBlock = this.dom.querySelector('.header-search-hasinput');

                        var cleanSearch = this.dom.querySelector('.header-search-clean');
                        this.viewHistory();

                        if (categorys) {
                            categorys.addEventListener('mouseenter', function() {
                                categorys.querySelector('.header-categorys-list').style.display = 'block';
                            });
                            categorys.addEventListener('mouseleave', function() {
                                categorys.querySelector('.header-categorys-list').style.display = 'none';
                            });
                        }

                        searchBtn.addEventListener('click', function() {
                            _this.search();
                        });
                        searchInput.value = searchKey || '';
                        searchInput.addEventListener('keyup', function(event) {
                            if (event.keyCode === 13) {
                                _this.search();
                            } else {
                                _this.viewSuggest(searchInput.value);
                            }
                        });
                        searchInput.addEventListener('focus', function() {
                            _this.viewSuggest(searchInput.value);

                            suggestBlock.style.display = 'block';
                        });
                        searchInput.addEventListener('blur', function() {
                            setTimeout(function() {
                                suggestBlock.style.display = 'none';
                            }, 200);
                        });
                        cleanSearch.addEventListener('click', function() {
                            _this.cleanHistory();
                        }); // const viewGA = new ViewGA();
                        // const dotList = [];
                        // dotList.push({
                        //     top: searchInput.offsetTop,
                        //     bottom: searchInput.offsetTop + searchInput.offsetHeight,
                        //     bid: (searchInput.dataset && searchInput.dataset.bid) || searchInput.getAttribute('data-bid')
                        // });
                        // const hotwordDom =  document.querySelector('.com-header .header-search-hotword');
                        // dotList.push({
                        //     top: hotwordDom.offsetTop,
                        //     bottom: hotwordDom.offsetTop + hotwordDom.offsetHeight,
                        //     bid: (hotwordDom.dataset && hotwordDom.dataset.bid) || hotwordDom.getAttribute('data-bid')
                        // });
                        // viewGA.addDots(dotList);
                        // viewGA.init();
                    }

                    _createClass(Header, [{
                        key: "getUrl",
                        value: function getUrl(sword) {
                            return "https://".concat(currentCity.acronym, ".meituan.com/s/").concat(encodeURI(sword), "/");
                        }
                    }, {
                        key: "setCity",
                        value: function setCity(obj) {
                            currentCity = obj;
                            this.viewHistory();
                        }
                    }, {
                        key: "search",
                        value: function search() {
                            var sword = this.dom.querySelector('.header-search-input').value;

                            if (!sword) {
                                return;
                            }

                            if (window.localStorage) {
                                this.searchHistory = this.searchHistory.filter(function(key) {
                                    return key !== sword;
                                });
                                this.searchHistory.unshift(sword);
                                this.searchHistory = this.searchHistory.slice(0, 10);
                                window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
                            }

                            window.location.href = this.getUrl(sword);
                        }
                    }, {
                        key: "cleanHistory",
                        value: function cleanHistory() {
                            if (window.localStorage) {
                                window.localStorage.removeItem('searchHistory'); // console.log(window.localStorage.getItem('searchHistory'));

                                this.viewHistory();
                            }
                        }
                    }, {
                        key: "viewHistory",
                        value: function viewHistory() {
                            var _this2 = this;

                            this.searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || [];
                            var historyBlock = this.dom.querySelector('.header-search-history');
                            historyBlock.style.display = this.searchHistory && this.searchHistory.length > 0 ? 'block' : 'none';
                            historyBlock.querySelector('ul').innerHTML = this.searchHistory.map(function(searchHistoryItem) {
                                return "<li><a href=\"".concat(_this2.getUrl(searchHistoryItem), "\">").concat((0, _util.htmlEscape)(searchHistoryItem), "</a></li>");
                            }).join('');
                        }
                    }, {
                        key: "viewSuggest",
                        value: function viewSuggest(keyword) {
                            var _this3 = this;

                            if (keyword && !this.suggestShow) {
                                var suggestBlock = this.dom.querySelector('.header-search-suggest');
                                suggestBlock.classList.add('hasinput');
                                this.suggestShow = true;
                            } else if (!keyword && this.suggestShow) {
                                var _suggestBlock = this.dom.querySelector('.header-search-suggest');

                                _suggestBlock.classList.remove('hasinput');

                                this.suggestShow = false;
                            }

                            if (keyword) {
                                (0, _suggest.getSuggest)({
                                    keyword: keyword
                                }).then(function(response) {
                                    if (response.code === 0) {
                                        return response.data && response.data.suggestItems || [];
                                    }

                                    return [];
                                }).then(function(suggestItems) {
                                    _this3.dom.querySelector('.header-search-hasinput ul').innerHTML = suggestItems.map(function(item) {
                                        return "<li><a href=\"".concat(_this3.getUrl(item.query), "\">").concat((0, _util.htmlEscape)(item.query), "</a></li>");
                                    }).join('');
                                }).catch(function(e) {
                                    console.log(e);
                                });
                            }
                        }
                    }]);

                    return Header;
                }();

            exports.default = Header;

            /***/
        }),

        /***/
        195:
        /***/
            (function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(setImmediate, clearImmediate) {
                ! function(e, t) { true ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.webloc = t() : e.webloc = t() }(this, function() {
                    return function(e) {
                        function t(i) { if (n[i]) return n[i].exports; var o = n[i] = { i: i, l: !1, exports: {} }; return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports }
                        var n = {};
                        return t.m = e, t.c = n, t.d = function(e, n, i) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 30)
                    }([function(e, t) {
                        function n() { throw new Error("setTimeout has not been defined") }

                        function i() { throw new Error("clearTimeout has not been defined") }

                        function o(e) { if (l === setTimeout) return setTimeout(e, 0); if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0); try { return l(e, 0) } catch (t) { try { return l.call(null, e, 0) } catch (t) { return l.call(this, e, 0) } } }

                        function a(e) { if (d === clearTimeout) return clearTimeout(e); if ((d === i || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e); try { return d(e) } catch (t) { try { return d.call(null, e) } catch (t) { return d.call(this, e) } } }

                        function r() { f && p && (f = !1, p.length ? h = p.concat(h) : v = -1, h.length && s()) }

                        function s() {
                            if (!f) {
                                var e = o(r);
                                f = !0;
                                for (var t = h.length; t;) {
                                    for (p = h, h = []; ++v < t;) p && p[v].run();
                                    v = -1, t = h.length
                                }
                                p = null, f = !1, a(e)
                            }
                        }

                        function c(e, t) { this.fun = e, this.array = t }

                        function u() {}
                        var l, d, m = e.exports = {};
                        ! function() { try { l = "function" == typeof setTimeout ? setTimeout : n } catch (e) { l = n } try { d = "function" == typeof clearTimeout ? clearTimeout : i } catch (e) { d = i } }();
                        var p, h = [],
                            f = !1,
                            v = -1;
                        m.nextTick = function(e) {
                            var t = new Array(arguments.length - 1);
                            if (arguments.length > 1)
                                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                            h.push(new c(e, t)), 1 !== h.length || f || o(s)
                        }, c.prototype.run = function() { this.fun.apply(null, this.array) }, m.title = "browser", m.browser = !0, m.env = {}, m.argv = [], m.version = "", m.versions = {}, m.on = u, m.addListener = u, m.once = u, m.off = u, m.removeListener = u, m.removeAllListeners = u, m.emit = u, m.prependListener = u, m.prependOnceListener = u, m.listeners = function(e) { return [] }, m.binding = function(e) { throw new Error("process.binding is not supported") }, m.cwd = function() { return "/" }, m.chdir = function(e) { throw new Error("process.chdir is not supported") }, m.umask = function() { return 0 }
                    }, function(e, t, n) {
                        function i() { return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 }

                        function o() {
                            var e = arguments,
                                n = this.useColors;
                            if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), !n) return e;
                            var i = "color: " + this.color;
                            e = [e[0], i, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                            var o = 0,
                                a = 0;
                            return e[0].replace(/%[a-z%]/g, function(e) { "%%" !== e && (o++, "%c" === e && (a = o)) }), e.splice(a, 0, i), e
                        }

                        function a() { return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments) }

                        function r(e) { try { null == e ? t.storage.removeItem("debug") : t.storage.debug = e } catch (e) {} }

                        function s() { var e; try { e = t.storage.debug } catch (e) {} return e }
                        t = e.exports = n(102), t.log = a, t.formatArgs = o, t.save = r, t.load = s, t.useColors = i, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() { try { return window.localStorage } catch (e) {} }(), t.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], t.formatters.j = function(e) { return JSON.stringify(e) }, t.enable(s())
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = n(104)
                    }, function(e, t, n) {
                        "use strict";
                        var i = /dp\/com\.dianping\.[\w\.]+\/([\d\.]+)/,
                            o = function(e) {
                                var t = /MApi/,
                                    n = e.match(i);
                                return n ? n[1] : t.test(e) ? "7.0.0" : "web"
                            },
                            a = function(e) {
                                var t = /android/i,
                                    n = /ipad|iphone/i;
                                return t.test(e) ? "android" : n.test(e) ? "ios" : void 0
                            },
                            r = function(e) {
                                if (e.match(i)) {
                                    var t = /adapter\/([\d\.]+)/,
                                        n = e.match(t);
                                    if (n) return n[1]
                                }
                            },
                            s = function(e) { return r(e) || o(e) },
                            c = o(navigator.userAgent),
                            u = a(navigator.userAgent);
                        e.exports = { appVersion: c, getAppVersion: o, osName: u, getOSName: a, getWebviewVersion: s, actionMapping: function(e) { return function(t) { this._send(e, t) } } }
                    }, function(e, t, n) {
                        function i() {
                            var e = (navigator.userAgent + "").toLowerCase(),
                                t = "([0-9][0-9.a-zA-Z_]+)",
                                n = function(e) { return new RegExp(e, "i") },
                                i = function(e) { return "string" == typeof e },
                                o = location.href,
                                r = a.parse((location.search || "").slice(1)),
                                s = { dianping: [/com\.dianping\.ba.\w+/, /com\.dianping\.\w+/], meituan: ["meituangroup", /com.meituan.imeituan-?\w+/], maoyanpro: ["moviepro", "moviepro/android"], maoyan: ["movie"], moma: ["moma"], daxiang: ["xm"], wechat: ["micromessenger"], qq: ["qq"], unknown: ["never_match_anything"] },
                                c = function() {
                                    for (var t = Object.keys(s), o = 0; o < t.length; o++)
                                        for (var a = s[t[o]], r = 0; r < a.length; r++)
                                            if (i(a[r]) ? n("\\W" + a[r] + "\\W").test(e) : a[r].test(e)) return t[o];
                                    return "unknown"
                                }(),
                                u = function() {
                                    for (var o = s[c], a = 0; a < o.length; a++) {
                                        var r = i(o[a]) ? o[a] : o[a].source,
                                            u = e.match(n(r + " " + t)) || e.match(n(r + "/" + t));
                                        if (u) return u[1]
                                    }
                                    return "0"
                                }(),
                                l = function() { return /android/.test(e) ? "android" : /ios|iphone|ipod|ipad/.test(e) ? "ios" : /macintosh/.test(e) ? "mac" : /windows/.test(e) ? "windows" : "unknown" }(),
                                d = function() { var i; return "android" === l && (i = e.match(n("android " + t)) || e.match(n("android/" + t))), "ios" === l && (i = e.match(n(t + " like Mac OS X")) || e.match(n("iOS/" + t))), (i ? i[1] : "0").replace(/_/g, ".") }(),
                                m = n("(KNB)/" + t + " (\\w+)/" + t + " (\\w+)/" + t),
                                p = n("(KNB)/" + t + " (\\w+)/" + t + " ([a-z1-9A-Z_.-]+/[a-z1-9A-Z_.-]+)/" + t),
                                h = e.match(m) || e.match(p),
                                f = h && h[2];
                            return "unknown" === c && h && (c = h[5], u = h[6]), "unknown" === c && (o.indexOf("wm_ctype=") > -1 && (c = "waimai"), /iphone|ipod|ipad|android/.test(o) && ((r.utm_campaign || "").indexOf("Agroup") > -1 && (c = "meituan"), u = r.version_name)), { appName: c, appVersion: u, osName: l, osVersion: d, _knbVersion: f }
                        }

                        function o(e) {
                            var t = e.success;
                            t && t(i())
                        }
                        var a = n(18);
                        o.internal = i, e.exports = o
                    }, function(e, t) {
                        e.exports = function(e, t, n, i, o, a) {
                            var r = [t, n, i, o, a].filter(Boolean),
                                s = e || {};
                            return r.forEach(function(e) { for (var t in e) e.hasOwnProperty(t) && (s[t] = e[t]) }), s
                        }
                    }, function(e, t, n) {
                        "use strict";
                        (function(e) {
                            var i;
                            "production" !== e.env.NODE_ENV && (i = n(1)("hbnb:invoke:env")), t.isHBNBWebview = !1, t.platform = "h5", t.appVersion = void 0, t.supportPrompt = void 0, t.HBNBReady = !1;
                            var o = n(13),
                                a = n(108),
                                r = function() {
                                    var e = /android/i,
                                        n = /iPhone|iPad/i,
                                        i = /\biHotel\/(\d+(?:\.\d+)*)\b/i,
                                        a = /mt_trip_biz/i,
                                        r = navigator.userAgent || "",
                                        s = r.match(i);
                                    s && (n.test(r) ? (t.platform = "ios", t.appVersion = s[1], t.isHBNBWebview = !0) : e.test(r) && (t.platform = "android", t.appVersion = s[1], t.isHBNBWebview = !0, t.supportPrompt = a.test(r) || Boolean(o(t.appVersion, "6.0") >= 0)))
                                };
                            ! function() { r(), a() }(), "production" !== e.env.NODE_ENV && i("env = %j", t)
                        }).call(t, n(0))
                    }, function(e, t) { e.exports = "1.4.3" }, function(e, t, n) {
                        "use strict";

                        function i() {}

                        function o(e) { try { return e.then } catch (e) { return g = e, T } }

                        function a(e, t) { try { return e(t) } catch (e) { return g = e, T } }

                        function r(e, t, n) { try { e(t, n) } catch (e) { return g = e, T } }

                        function s(e) {
                            if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                            if ("function" != typeof e) throw new TypeError("Promise constructor's argument is not a function");
                            this._40 = 0, this._65 = 0, this._55 = null, this._72 = null, e !== i && f(e, this)
                        }

                        function c(e, t, n) {
                            return new e.constructor(function(o, a) {
                                var r = new s(i);
                                r.then(o, a), u(e, new h(t, n, r))
                            })
                        }

                        function u(e, t) {
                            for (; 3 === e._65;) e = e._55;
                            if (s._37 && s._37(e), 0 === e._65) return 0 === e._40 ? (e._40 = 1, void(e._72 = t)) : 1 === e._40 ? (e._40 = 2, void(e._72 = [e._72, t])) : void e._72.push(t);
                            l(e, t)
                        }

                        function l(e, t) {
                            v(function() {
                                var n = 1 === e._65 ? t.onFulfilled : t.onRejected;
                                if (null === n) return void(1 === e._65 ? d(t.promise, e._55) : m(t.promise, e._55));
                                var i = a(n, e._55);
                                i === T ? m(t.promise, g) : d(t.promise, i)
                            })
                        }

                        function d(e, t) {
                            if (t === e) return m(e, new TypeError("A promise cannot be resolved with itself."));
                            if (t && ("object" == typeof t || "function" == typeof t)) { var n = o(t); if (n === T) return m(e, g); if (n === e.then && t instanceof s) return e._65 = 3, e._55 = t, void p(e); if ("function" == typeof n) return void f(n.bind(t), e) }
                            e._65 = 1, e._55 = t, p(e)
                        }

                        function m(e, t) { e._65 = 2, e._55 = t, s._87 && s._87(e, t), p(e) }

                        function p(e) {
                            if (1 === e._40 && (u(e, e._72), e._72 = null), 2 === e._40) {
                                for (var t = 0; t < e._72.length; t++) u(e, e._72[t]);
                                e._72 = null
                            }
                        }

                        function h(e, t, n) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n }

                        function f(e, t) {
                            var n = !1,
                                i = r(e, function(e) { n || (n = !0, d(t, e)) }, function(e) { n || (n = !0, m(t, e)) });
                            n || i !== T || (n = !0, m(t, g))
                        }
                        var v = n(25),
                            g = null,
                            T = {};
                        e.exports = s, s._37 = null, s._87 = null, s._61 = i, s.prototype.then = function(e, t) { if (this.constructor !== s) return c(this, e, t); var n = new s(i); return u(this, new h(e, t, n)), n }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) {
                            if (i.loaded || (i.loaded = {}), i.loaded[e]) return t(null);
                            var n = document.createElement("script");
                            n.src = e, n.async = !0, n.onload = function() { i.loaded[e] = !0, t(null), document.head.removeChild(n) }, n.onerror = function(e) { t(new Error("load script error")) }, document.head.appendChild(n)
                        }

                        function o(e, t) {
                            var n = "webloc" + Date.now(),
                                i = document.createElement("script");
                            i.src = -1 === e.indexOf("?") ? e + "?callback=" + n : e + "&callback=" + n, i.async = !0, window[n] = function(e) { delete window[n], document.head.removeChild(i), t(e) }, document.head.appendChild(i)
                        }

                        function a(e) { return /mobile|mobi|android|ios|phone/i.test(e) }

                        function r(e) { return "function" == typeof e }

                        function s(e) { return /bot|spider|crawler/i.test(e) }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.loadScript = i, t.jsonp = o, t.isMobile = a, t.isFunction = r, t.isCrawler = s;
                        t.cookie = {
                            getItem: function(e) { return e ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null },
                            setItem: function(e, t, n, i, o, a) {
                                if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                                var r = "";
                                if (n) switch (n.constructor) {
                                    case Number:
                                        r = n === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
                                        break;
                                    case String:
                                        r = "; expires=" + n;
                                        break;
                                    case Date:
                                        r = "; expires=" + n.toUTCString()
                                }
                                return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + r + (o ? "; domain=" + o : "") + (i ? "; path=" + i : "") + (a ? "; secure" : ""), !0
                            }
                        }
                    }, function(e, t) {
                        var n;
                        n = function() { return this }();
                        try { n = n || Function("return this")() || (0, eval)("this") } catch (e) { "object" == typeof window && (n = window) }
                        e.exports = n
                    }, function(e, t, n) {
                        var i = n(90);
                        e.exports = function(e, t) {
                            if (!(Math.random() >= .1)) {
                                for (var n, o = ["dianping.com", "meituan.com", "sankuai.com", "meituan.net", "maoyan.com", "m-zl-st.cfcmu.cn", "m-zl.mucfc.com"], a = ["localhost", "51ping.com", "alpha.dp"], r = 0; r < o.length; r++)
                                    if (-1 !== location.href.indexOf(o[r])) { n = "m.dianping.com"; break }
                                if (!n)
                                    for (var s = 0; s < a.length; s++) - 1 !== location.href.indexOf(a[s]) && (n = "m.51ping.com");
                                n && i({ url: "//" + n + "/mtnb/api/statistics", data: { version: t, type: e } })
                            }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            /*!
                             * The buffer module from node.js, for the browser.
                             *
                             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
                             * @license  MIT
                             */
                            function i(e, t) {
                                if (e === t) return 0;
                                for (var n = e.length, i = t.length, o = 0, a = Math.min(n, i); o < a; ++o)
                                    if (e[o] !== t[o]) { n = e[o], i = t[o]; break }
                                return n < i ? -1 : i < n ? 1 : 0
                            }

                            function o(e) { return t.Buffer && "function" == typeof t.Buffer.isBuffer ? t.Buffer.isBuffer(e) : !(null == e || !e._isBuffer) }

                            function a(e) { return Object.prototype.toString.call(e) }

                            function r(e) { return !o(e) && ("function" == typeof t.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer)))) }

                            function s(e) {
                                if (S.isFunction(e)) {
                                    if (C) return e.name;
                                    var t = e.toString(),
                                        n = t.match(H);
                                    return n && n[1]
                                }
                            }

                            function c(e, t) { return "string" == typeof e ? e.length < t ? e : e.slice(0, t) : e }

                            function u(e) { if (C || !S.isFunction(e)) return S.inspect(e); var t = s(e); return "[Function" + (t ? ": " + t : "") + "]" }

                            function l(e) { return c(u(e.actual), 128) + " " + e.operator + " " + c(u(e.expected), 128) }

                            function d(e, t, n, i, o) { throw new E.AssertionError({ message: n, actual: e, expected: t, operator: i, stackStartFunction: o }) }

                            function m(e, t) { e || d(e, !0, t, "==", E.ok) }

                            function p(e, t, n, s) {
                                if (e === t) return !0;
                                if (o(e) && o(t)) return 0 === i(e, t);
                                if (S.isDate(e) && S.isDate(t)) return e.getTime() === t.getTime();
                                if (S.isRegExp(e) && S.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
                                if (null !== e && "object" == typeof e || null !== t && "object" == typeof t) {
                                    if (r(e) && r(t) && a(e) === a(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === i(new Uint8Array(e.buffer), new Uint8Array(t.buffer));
                                    if (o(e) !== o(t)) return !1;
                                    s = s || { actual: [], expected: [] };
                                    var c = s.actual.indexOf(e);
                                    return -1 !== c && c === s.expected.indexOf(t) || (s.actual.push(e), s.expected.push(t), f(e, t, n, s))
                                }
                                return n ? e === t : e == t
                            }

                            function h(e) { return "[object Arguments]" == Object.prototype.toString.call(e) }

                            function f(e, t, n, i) {
                                if (null === e || void 0 === e || null === t || void 0 === t) return !1;
                                if (S.isPrimitive(e) || S.isPrimitive(t)) return e === t;
                                if (n && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
                                var o = h(e),
                                    a = h(t);
                                if (o && !a || !o && a) return !1;
                                if (o) return e = w.call(e), t = w.call(t), p(e, t, n);
                                var r, s, c = M(e),
                                    u = M(t);
                                if (c.length !== u.length) return !1;
                                for (c.sort(), u.sort(), s = c.length - 1; s >= 0; s--)
                                    if (c[s] !== u[s]) return !1;
                                for (s = c.length - 1; s >= 0; s--)
                                    if (r = c[s], !p(e[r], t[r], n, i)) return !1;
                                return !0
                            }

                            function v(e, t, n) { p(e, t, !0) && d(e, t, n, "notDeepStrictEqual", v) }

                            function g(e, t) { if (!e || !t) return !1; if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e); try { if (e instanceof t) return !0 } catch (e) {} return !Error.isPrototypeOf(t) && !0 === t.call({}, e) }

                            function T(e) { var t; try { e() } catch (e) { t = e } return t }

                            function b(e, t, n, i) {
                                var o;
                                if ("function" != typeof t) throw new TypeError('"block" argument must be a function');
                                "string" == typeof n && (i = n, n = null), o = T(t), i = (n && n.name ? " (" + n.name + ")." : ".") + (i ? " " + i : "."), e && !o && d(o, n, "Missing expected exception" + i);
                                var a = "string" == typeof i,
                                    r = !e && S.isError(o),
                                    s = !e && o && !n;
                                if ((r && a && g(o, n) || s) && d(o, n, "Got unwanted exception" + i), e && o && n && !g(o, n) || !e && o) throw o
                            }
                            var S = n(105),
                                y = Object.prototype.hasOwnProperty,
                                w = Array.prototype.slice,
                                C = function() { return "foo" === function() {}.name }(),
                                E = e.exports = m,
                                H = /\s*function\s+([^\(\s]*)\s*/;
                            E.AssertionError = function(e) {
                                this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = l(this), this.generatedMessage = !0);
                                var t = e.stackStartFunction || d;
                                if (Error.captureStackTrace) Error.captureStackTrace(this, t);
                                else {
                                    var n = new Error;
                                    if (n.stack) {
                                        var i = n.stack,
                                            o = s(t),
                                            a = i.indexOf("\n" + o);
                                        if (a >= 0) {
                                            var r = i.indexOf("\n", a + 1);
                                            i = i.substring(r + 1)
                                        }
                                        this.stack = i
                                    }
                                }
                            }, S.inherits(E.AssertionError, Error), E.fail = d, E.ok = m, E.equal = function(e, t, n) { e != t && d(e, t, n, "==", E.equal) }, E.notEqual = function(e, t, n) { e == t && d(e, t, n, "!=", E.notEqual) }, E.deepEqual = function(e, t, n) { p(e, t, !1) || d(e, t, n, "deepEqual", E.deepEqual) }, E.deepStrictEqual = function(e, t, n) { p(e, t, !0) || d(e, t, n, "deepStrictEqual", E.deepStrictEqual) }, E.notDeepEqual = function(e, t, n) { p(e, t, !1) && d(e, t, n, "notDeepEqual", E.notDeepEqual) }, E.notDeepStrictEqual = v, E.strictEqual = function(e, t, n) { e !== t && d(e, t, n, "===", E.strictEqual) }, E.notStrictEqual = function(e, t, n) { e === t && d(e, t, n, "!==", E.notStrictEqual) }, E.throws = function(e, t, n) { b(!0, e, t, n) }, E.doesNotThrow = function(e, t, n) { b(!1, e, t, n) }, E.ifError = function(e) { if (e) throw e };
                            var M = Object.keys || function(e) { var t = []; for (var n in e) y.call(e, n) && t.push(n); return t }
                        }).call(t, n(10))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:invoke:version-compare"));
                            var o = function(e, n) {
                                var o = String(e).split("."),
                                    a = String(n).split("."),
                                    r = Math.min(o.length, a.length) + 1;
                                "production" !== t.env.NODE_ENV && (i("a is %j", o), i("b is %j", a));
                                for (var s = 0; s < r; ++s) {
                                    var c = Number(o[s]),
                                        u = Number(a[s]);
                                    if (c > u) return 1;
                                    if (u > c) return -1;
                                    if (!isNaN(c) && isNaN(u)) return 1;
                                    if (isNaN(c) && !isNaN(u)) return -1
                                }
                                return 0
                            };
                            e.exports = o
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        function i(e) { return "[object Array]" === Object.prototype.toString.call(e) ? [] : {} }
                        var o = "undefined" != typeof window ? window : {},
                            a = n(5),
                            r = o.Promise || n(15),
                            s = n(17);
                        e.exports = function(e) { e.getPromiseInstance || (e.getPromiseInstance = function() { var t = {}; return s.forEach(function(n) { "config" !== n && (t[n] = function(t) { return new r(function(o, r) { e[n](a(i(t), t, { success: o, fail: r })) }) }) }), t.use = function(t, n) { return new r(function(o, r) { e.use(t, a(i(n), n, { success: o, fail: r })) }) }, t.all = function(e) { return r.all(e) }, t }) }
                    }, function(e, t, n) {
                        "use strict";
                        (function(t, n) {
                            function i() {
                                for (var e = 0; e < E.length; e++) E[e][0](E[e][1]);
                                E = [], v = !1
                            }

                            function o(e, t) { E.push([e, t]), v || (v = !0, C(i, 0)) }

                            function a(e, t) {
                                function n(e) { c(t, e) }

                                function i(e) { l(t, e) }
                                try { e(n, i) } catch (e) { i(e) }
                            }

                            function r(e) {
                                var t = e.owner,
                                    n = t._state,
                                    i = t._data,
                                    o = e[n],
                                    a = e.then;
                                if ("function" == typeof o) { n = b; try { i = o(i) } catch (e) { l(a, e) } }
                                s(a, i) || (n === b && c(a, i), n === S && l(a, i))
                            }

                            function s(e, t) { var n; try { if (e === t) throw new TypeError("A promises callback cannot return that same promise."); if (t && ("function" == typeof t || "object" == typeof t)) { var i = t.then; if ("function" == typeof i) return i.call(t, function(i) { n || (n = !0, t === i ? u(e, i) : c(e, i)) }, function(t) { n || (n = !0, l(e, t)) }), !0 } } catch (t) { return n || l(e, t), !0 } return !1 }

                            function c(e, t) { e !== t && s(e, t) || u(e, t) }

                            function u(e, t) { e._state === g && (e._state = T, e._data = t, o(m, e)) }

                            function l(e, t) { e._state === g && (e._state = T, e._data = t, o(p, e)) }

                            function d(e) { e._then = e._then.forEach(r) }

                            function m(e) { e._state = b, d(e) }

                            function p(e) { e._state = S, d(e), !e._handled && w && t.process.emit("unhandledRejection", e._data, e) }

                            function h(e) { t.process.emit("rejectionHandled", e) }

                            function f(e) {
                                if ("function" != typeof e) throw new TypeError("Promise resolver " + e + " is not a function");
                                if (this instanceof f == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                                this._then = [], a(e, this)
                            }
                            var v, g = "pending",
                                T = "settled",
                                b = "fulfilled",
                                S = "rejected",
                                y = function() {},
                                w = void 0 !== t && void 0 !== t.process && "function" == typeof t.process.emit,
                                C = void 0 === n ? setTimeout : n,
                                E = [];
                            f.prototype = { constructor: f, _state: g, _then: null, _data: void 0, _handled: !1, then: function(e, t) { var n = { owner: this, then: new this.constructor(y), fulfilled: e, rejected: t }; return !t && !e || this._handled || (this._handled = !0, this._state === S && w && o(h, this)), this._state === b || this._state === S ? o(r, n) : this._then.push(n), n.then }, catch: function(e) { return this.then(null, e) } }, f.all = function(e) {
                                if (!Array.isArray(e)) throw new TypeError("You must pass an array to Promise.all().");
                                return new f(function(t, n) {
                                    for (var i, o = [], a = 0, r = 0; r < e.length; r++) i = e[r], i && "function" == typeof i.then ? i.then(function(e) {
                                        return a++,
                                            function(n) { o[e] = n, --a || t(o) }
                                    }(r), n) : o[r] = i;
                                    a || t(o)
                                })
                            }, f.race = function(e) { if (!Array.isArray(e)) throw new TypeError("You must pass an array to Promise.race()."); return new f(function(t, n) { for (var i, o = 0; o < e.length; o++) i = e[o], i && "function" == typeof i.then ? i.then(t, n) : t(i) }) }, f.resolve = function(e) { return e && "object" == typeof e && e.constructor === f ? e : new f(function(t) { t(e) }) }, f.reject = function(e) { return new f(function(t, n) { n(e) }) }, e.exports = f
                        }).call(t, n(10), n(48).setImmediate)
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(52),
                            o = n(66),
                            a = n(3),
                            r = function() {};
                        e.exports = new i({
                            hippoPrefix: "dpapp",
                            getTypeFromUA: a.getWebviewVersion,
                            apis: [],
                            allowBeforeReady: ["getRequestId"],
                            isOldVersion: function() { return "6.9.x" == this.uaType() },
                            cache: {},
                            Share: { WECHAT_FRIENDS: 0, WECHAT_TIMELINE: 1, QQ: 2, SMS: 3, WEIBO: 4, QZONE: 5, EMAIL: 6, COPY: 7 },
                            _tidyUrlParams: function(e) {
                                var t = e.split("?"),
                                    n = t[1],
                                    i = [];
                                return n ? (n.split("&").forEach(function(e) { /^(newtoken|token|product)$/.test(e.split("=")[0]) || i.push(e) }), [t[0], i.join("&")].join("?")) : t[0]
                            },
                            _getEnv: function(e) {
                                var t = this;
                                this._doSendMessage("getEnv", {}, function(n) { t.cache.env = n, e.call(this, n) })
                            },
                            _captal: function(e) { return e.slice(0, 1).toUpperCase() + e.slice(1) },
                            _getBizName: function(e) {
                                var t = e.fail,
                                    n = this._cfg.bizname;
                                return n || (t && t('use `DPApp.config({bizname:"<your-bizname>"})` first'), !1)
                            },
                            isStatusOK: r,
                            did_handle_callback: r,
                            _doSendMessage: function(e, t, n) {
                                var i = n && "function" == typeof n;
                                this.log("调用方法", e, t);
                                var o = i ? this._generateCallbackId() : 0,
                                    a = this._generateCallbackName(o);
                                i && (window[a] = n), t && "object" == typeof t || (t = {}), t.callbackId = o, t = JSON.stringify(t);
                                var r = (window._DPApp, "js://_?method=" + e + "&args=" + encodeURIComponent(t) + "&callbackId=" + o);
                                this._sendMessage2Native(r)
                            },
                            _sendByPrompt: function(e) { this.log("[Prompt] message: " + e), window.prompt(e) },
                            _sendByIframe: function(e) { this.log("[Iframe] message: " + e), this._createIframe(e) },
                            _sendMessage2Native: function(e) { this.Semver.gte(a.appVersion, "8.0.6") && "android" === a.osName ? this._sendByPrompt(e) : this._sendByIframe(e) },
                            _send: function(e, t) {
                                t = t || {};
                                var n = this,
                                    i = t.success,
                                    o = t.fail,
                                    a = t.handle,
                                    r = function(t) { n.log("调用失败 " + e, t), o && o.call(n, t) },
                                    s = function(t) { n.log("调用成功 " + e, t), i && i.call(n, t) },
                                    c = function(t) { n.log("回调 " + e, t), a && a.call(n, t) },
                                    u = i || o || a ? function(e) { var t = e.status; "next" != e.result && delete e.result, "success" == t ? s && s(e) : "action" == t ? c && c(e) : r && r(e) } : null;
                                this._sendMessage(e, t, u)
                            },
                            callback: function(e, t) {
                                var n = window,
                                    i = this._generateCallbackName(e),
                                    o = window[i];
                                o && (this.log("[Callback] Id: " + e), setTimeout(function() { o && o.call(self, t) }), "complete" != t.result && "error" != t.result || (n[i] = null, delete n[i]))
                            },
                            merge: function(e, t) { return "npm" === e.__type__ || "cortex" === e.__type__ ? (console.warn("引入了多个DPApp,目前DPApp版本是", e.__version__, ", 后续引入的DPApp无法生效"), e) : (console.warn("引入了多个DPApp,正在进行mixin形式的合并"), o(e, t)) }
                        })
                    }, function(e, t) { e.exports = ["config", "isApiSupported", "getApisVersion", "getUA", "Semver", "checkAuthorization", "getFingerprint", "getUserInfo", "login", "logout", "sendSMS", "getContactList", "pickContact", "getCity", "getLocationCity", "getLocation", "getNetworkType", "pickCity", "share", "configShare", "openWebview", "closeWebview", "jumpWebview", "setTitle", "setNavButtons", "setNavigationBarHidden", "setBackgroundColor", "setBouncesEnabled", "setStatusBarStyle", "setPullDown", "stopPullDown", "setLLButton", "setSearchBar", "scanQRCode", "store", "retrieve", "alert", "confirm", "prompt", "chooseImage", "previewImage", "uploadImage", "downloadImage", "publish", "subscribe", "unsubscribe", "setResult"] }, function(e, t, n) {
                        "use strict";
                        t.decode = t.parse = n(46), t.encode = t.stringify = n(47)
                    }, function(e, t) { e.exports = function(e) { return /^http:|^https:|^\/\//i.test(e) } }, function(e, t) { e.exports = function(e) { return e || (e = ""), e.replace(/^http:\/\/(p0|p1|img)\.meituan\.net\//, "https://img.meituan.net/") } }, function(e, t) {
                        e.exports = {
                            eq: function(e, t) { return e === t },
                            gt: function(e, t) {
                                var n = e ? e.split(".") : [],
                                    i = t ? t.split(".") : [];
                                return [0, 1, 2].forEach(function(e) { n[e] = n[e] || 0, i[e] = i[e] || 0 }), +n[0] != +i[0] ? +n[0] > +i[0] : +n[1] != +i[1] ? +n[1] > +i[1] : +n[2] > +(i[2] || 0)
                            },
                            lt: function(e, t) { return !this.gte(e, t) },
                            gte: function(e, t) { return this.eq(e, t) || this.gt(e, t) },
                            lte: function(e, t) { return this.eq(e, t) || this.lt(e, t) }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(e, t, n) {
                            t || (t = {}), n || (n = i);
                            var o = Object.assign({ url: e, data: "", method: "GET", headers: {}, xhr: new XMLHttpRequest }, t);
                            o.xhr.open(o.method, o.url, !0), "GET" === o.method || o.headers["Content-type"] || o.xhr.setRequestHeader("Content-type", "application/json");
                            for (var a in o.headers) o.xhr.setRequestHeader(a, o.headers[a]);
                            o.xhr.onload = function() { o.xhr.status >= 200 && o.xhr.status < 300 ? n(null, o.xhr.responseText) : n(new Error(o.xhr.status + " " + o.xhr.statusText), o.xhr.responseText) }, o.xhr.onerror = function() { n(new Error("network error")) }, o.xhr.ontimeout = function() { n(new Error("timeout")) }, o.xhr.send("GET" === o.method ? null : o.data)
                        };
                        var i = function() {}
                    }, function(e, t) {
                        function n() {
                            var e = "undefined" != typeof window ? window : {},
                                t = "undefined" != typeof location ? location.href : "",
                                n = "undefined" != typeof navigator ? navigator.userAgent : "",
                                i = /ios|iphone|ipad|ipod/i.test(n);
                            if (e._KNB_CUSTOM_ENV) return { isWX: !!e._KNB_WX, isMTNB: !!e._KNB_MTNB, isTitans: !!e._KNB_TITANS, isHBNB: !!e._KNB_HBNB, isDPApp: !!e._KNB_DPAPP };
                            var o = e._KNB_REGDP || /dp\/com\.dianping\.[\w\.]+\/([\d\.]+)/i,
                                a = e._KNB_REGMT || /moviepro|MTNB|Meituan|MOMA/i,
                                r = e._KNB_REGHB || /iHotel|HBNB/i,
                                s = e._KNB_REGWX || /micromessenger/i,
                                c = e._KNB_REGTITANS || /TitansX/i,
                                u = s.test(n),
                                l = o.test(n),
                                d = a.test(n) || /f=(iphone|ipad|ipod|android)/.test(t),
                                m = r.test(n) && !e._MTNB,
                                p = function() { return t.indexOf("knb_force_use_titans") > -1 || (i ? !!e._TitansX : c.test(n)) }();
                            return /titansnox/i.test(n) && l && (p = m = u = d = !1), u && (p = m = l = d = !1), p && (l = u = d = m = !1), m && (p = u = l = d = !1), d && (p = u = l = m = !1), l && (p = u = d = m = !1), { isWX: u, isTitans: p, isHBNB: m, isDPApp: l, isMTNB: d }
                        }
                        e.exports = n(), e.exports.getENV = n
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = n(56)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            function n(e) { r.length || (a(), s = !0), r[r.length] = e }

                            function i() {
                                for (; c < r.length;) {
                                    var e = c;
                                    if (c += 1, r[e].call(), c > u) {
                                        for (var t = 0, n = r.length - c; t < n; t++) r[t] = r[t + c];
                                        r.length -= c, c = 0
                                    }
                                }
                                r.length = 0, c = 0, s = !1
                            }

                            function o(e) {
                                return function() {
                                    function t() { clearTimeout(n), clearInterval(i), e() }
                                    var n = setTimeout(t, 0),
                                        i = setInterval(t, 50)
                                }
                            }
                            e.exports = n;
                            var a, r = [],
                                s = !1,
                                c = 0,
                                u = 1024,
                                l = void 0 !== t ? t : self,
                                d = l.MutationObserver || l.WebKitMutationObserver;
                            a = "function" == typeof d ? function(e) {
                                var t = 1,
                                    n = new d(e),
                                    i = document.createTextNode("");
                                return n.observe(i, { characterData: !0 }),
                                    function() { t = -t, i.data = t }
                            }(i) : o(i), n.requestFlush = a, n.makeRequestCallFromTimer = o
                        }).call(t, n(10))
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3);
                        e.exports = {
                            appVersion: "7.0",
                            _parseFeed: function(e) { var t; return e ? e.constructor.toString().indexOf("Array") >= 0 ? (t = [0, 0, 0, 0, 0, 0, 0, 0], e.forEach(function(e) { t[e] = 1 }), parseInt(t.join(""), 2)) : void 0 : 255 },
                            share: function(e) { e.feed = this._parseFeed(e.feed), e.url = this._tidyUrlParams(e.url), this._sendMessage("share", e) },
                            initShare: function(e) {
                                var t = e.success,
                                    n = e.fail,
                                    i = "dpshare://_?content=";
                                i += encodeURIComponent(JSON.stringify({ title: e.title, desc: e.desc, image: e.image, feed: this._parseFeed(e.feed), url: e.url })), this.shareCallback = function(e) { "success" == e.status ? t && t(e) : n && n(e) }, this._createIframe(i)
                            },
                            getUA: function(e) {
                                var t = e && e.success,
                                    n = navigator.userAgent.match(/MApi\s[\w\.]+\s\([\w\.\d]+\s([\d\.]+)/)[1],
                                    i = { platform: "dpapp", appName: "dianping", appVersion: n, osName: this._osUA.name, osVersion: this._osUA.version };
                                return t && t(i), i
                            },
                            ready: function(e) { this._isReady = !0, e() },
                            uploadImage: function(e) {
                                var t = e.fail,
                                    n = e.handle;
                                this._sendMessage("uploadImage", e, function(e) {
                                    if ("fail" == e.status) return void(t && t(e));
                                    n && n(e)
                                })
                            },
                            ajax: function(e) {
                                e = this._sanitizeAjaxOpts(e);
                                var t = e.success;
                                e.success = function(n) {
                                    var i = JSON.parse(n.mapiResult);
                                    i = this._transModel(e.keys, i), t(i)
                                }, this._send("mapi", e)
                            },
                            getCX: i.actionMapping("getCX"),
                            getContactList: i.actionMapping("getContactList"),
                            getRequestId: i.actionMapping("getRequestId"),
                            closeWindow: i.actionMapping("close_web"),
                            getUserInfo: i.actionMapping("getUserInfo"),
                            getCity: i.actionMapping("getCityId"),
                            getCityId: i.actionMapping("getCityId"),
                            getLocation: i.actionMapping("getLocation")
                        }
                    }, function(e, t, n) {
                        var i = n(91),
                            o = n(93),
                            a = n(5),
                            r = n(21),
                            s = n(7),
                            c = n(4),
                            u = n(28),
                            l = c.internal(),
                            d = l._knbVersion,
                            m = function() {},
                            p = {
                                __version__: s,
                                apiList: [],
                                _eventQueue: {},
                                _subscriptionMap: {},
                                _cfg: {},
                                config: function(e) { this._cfg = a(this._cfg, e), i.config(e) },
                                setBridge: function(e) { return i.setBridge(e) },
                                getBizName: function() { return this._cfg.bizname },
                                ready: function(e) { return i.ready(e) },
                                log: i.log.bind(i),
                                loadAPIs: function(e) {
                                    var t = e.type;
                                    void 0 === t && (t = "base");
                                    var n = e.apis;
                                    void 0 === n && (n = []);
                                    var o = this;
                                    n.filter(Boolean).forEach(function(e) { var n = e.name || e.message; if (!n) return console.warn("[LoadAPI] fail", JSON.stringify(e)); "base" === t && e.version && r.lt(d, e.version) || "base" !== t && e.version && r.lt(l.appVersion, e.version) || e.os && e.os !== l.osName || (o.apiList.push(n), "function" == typeof o[n] && i.log("[API] ", n, " overwrite default implementation"), o[n] = function(t) { var n = e.mapper || function(e) { return e }; if (t = n.call(o, t || {})) return e.handler ? e.handler.call(o, t) : e.fallback ? o._isApiSupported(e.message, function(n) { return n ? i.callNative(e.message, t) : e.fallback(t) }) : i.callNative(e.message, t) }, o[n].$MESSAGE = e.message, o[n].$FALLBACK = e.fallback, Object.keys(e.statics || {}).forEach(function(t) { return o[n][t] = e.statics[t] })) })
                                },
                                _isApiSupported: function(e, t) {
                                    return this.checkVersion({
                                        apis: [e],
                                        success: function(n) {
                                            var i = n.infos || n.data.infos || {};
                                            t("0" !== String(i[e]))
                                        },
                                        fail: function() { return t(!1) }
                                    })
                                },
                                isApiSupported: function(e) {
                                    var t = e.apiName,
                                        n = e.success;
                                    if (void 0 === n && (n = m), "function" == typeof this[t]) { var i = this[t].$MESSAGE; return i ? this[t].$FALLBACK ? n(!0) : this._isApiSupported(i, n) : n(!0) }
                                    return this._isApiSupported(t, n)
                                },
                                use: function(e, t) { return void 0 === t && (t = {}), "function" == typeof this[e] ? this[e](t) : i.callNative(e, t) },
                                pureUse: function(e, t) { return void 0 === t && (t = {}), i.callNative(e, t) }
                            };
                        p.loadAPIs({ type: "base", apis: o }), "android" === l.osName && p.setBridge({ name: "prompt", delay: 200 }), p.util = u, e.exports = p
                    }, function(e, t) {
                        e.exports = {
                            tidyUrlParams: function(e) {
                                var t = e.split("?"),
                                    n = t[1],
                                    i = [];
                                return n ? (n.split("&").forEach(function(e) {
                                    var t = e.split("="),
                                        n = t[0],
                                        o = t.length ? t[1] : void 0;
                                    /^(newtoken|token)$/.test(n) || "product" === n && "dpapp" === o || i.push(e)
                                }), [t[0], i.join("&")].join("?")) : t[0]
                            },
                            sanitizeAjaxOpts: function(e) {
                                e.method = e.method || "get", e.data = e.data || "";
                                var t = e.url,
                                    n = e.data;
                                if ("get" == e.method) {
                                    var i = [];
                                    for (var o in n) n.hasOwnProperty(o) && (n[o] || 0 === n[o]) && i.push(o + "=" + encodeURIComponent(n[o]));
                                    i.length && (t += -1 == t.indexOf("?") ? "?" : "&", t += i.join("&")), e.url = t, delete e.data
                                }
                                return e
                            },
                            parseFeed: function(e) { var t; return e ? e.constructor.toString().indexOf("Array") >= 0 ? (t = [0, 0, 0, 0, 0, 0, 0, 0], e.forEach(function(e) { t[7 - e] = 1 }), parseInt(t.join(""), 2)) : void 0 : 255 },
                            transModel: function(e, t) {
                                function n(e) { var t = function(e) { var t, n, i, o = 0; if (0 == e.length) return o; for (t = 0, i = e.length; t < i; t++) n = e.charCodeAt(t), o = (o << 5) - o + n, o |= 0; return o }(e); return "0x" + (65535 & t ^ t >>> 16).toString(16) }

                                function i(e) { return "[object Array]" == Object.prototype.toString.call(e) }

                                function o(e) { return "[object Object]" == Object.prototype.toString.call(e) }

                                function a(e) {
                                    if (o(e)) {
                                        delete e.__name;
                                        for (var t in e) {
                                            var n;
                                            r[t] && (n = e[r[t]] = e[t], a(n), delete e[t])
                                        }
                                    } else i(e) && e.forEach(function(e) { a(e) });
                                    return e
                                }
                                if (!e) return t;
                                var r = {};
                                return e.forEach(function(e) { r[n(e)] = e }), a(t)
                            },
                            capital: function(e) { return e.slice(0, 1).toUpperCase() + e.slice(1) }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:invoke:build-uri"));
                            var o = 0,
                                a = function(e) {
                                    var n = (new Date).getTime() + "_" + ++o,
                                        i = "HBNB_CALLBACK_" + n;
                                    return window[i] = function(e, t) { return function() {!1 !== e.apply(null, arguments) && delete window[t] } }(e, i), t.env.NODE_ENV, i
                                },
                                r = function(e, t) { return "function" == typeof t ? a(t) : t },
                                s = function(e, n, o, a) { "production" !== t.env.NODE_ENV && (i("protocol = %s", e), i("module = %s", n), i("method = %s", o), i("before process, parameters is %j", a)); var s = encodeURIComponent(JSON.stringify(a, r)); "production" !== t.env.NODE_ENV && i("after encode, parameters is %s", s); var c = e + "//" + n + "/" + o + "?params=" + s; return "production" !== t.env.NODE_ENV && i("uri = %s", c), c };
                            e.exports = s, e.exports.processParams = r
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { return e && e.__esModule ? e : { default: e } }

                        function o(e, t) {
                            if (e.debug && console.log("---------- START getCurrentPosition ----------"), (0, a.isCrawler)(navigator.userAgent)) return t(new Error("Detect crawler."));
                            var n = Object.assign({}, p, e),
                                i = (0, c.generateScheme)(n),
                                o = new s.default(n.logger);
                            (0, l.default)({
                                scheme: i,
                                config: n,
                                finish: function(e, i) {
                                    if (e) return t(n.debug ? e : new Error("Cannot get current location."));
                                    if (!n.city) return t(null, { geo: i });
                                    var a = Date.now();
                                    (0, m.default)(n.cityType, i, function(e, r) {
                                        if (o.api("city", !e, Date.now() - a, e && e.message), o.metric("request", { scheme: "city", status: !e, version: n.version, project: n.project }, 1), e) return t(n.debug ? e : new Error("Cannot get city info."), { geo: i });
                                        t(null, { geo: i, city: r })
                                    })
                                },
                                hook: function(e) {
                                    var t = e.scheme,
                                        i = e.status,
                                        a = e.duration,
                                        r = e.data,
                                        s = e.error;
                                    if (n.debug && console.log("[" + t + "] status: " + i + ", duration: " + a + ", data: " + JSON.stringify(r) + ", error: " + s), "wx" !== t || "Not in weixin environment." !== s) {
                                        o.api("geolocate-" + t, i, a, s);
                                        var c = { scheme: t, status: i, version: n.version, project: n.project };
                                        o.metric("request", c, 1), o.metric("duration", c, a), i && "all" === t && o.loc(r, a)
                                    }
                                }
                            })
                        }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.getCurrentPosition = o;
                        var a = n(9),
                            r = n(31),
                            s = i(r),
                            c = n(37),
                            u = n(38),
                            l = i(u),
                            d = n(214),
                            m = i(d),
                            p = { version: "0.1.3", project: "default", env: "production", debug: !1, timeout: 1e4, geotype: "wgs84", city: !1, cityType: "meituan", disable: [], enable: [], urlMatchGroup: ["latitude", "longitude", "geotype"], cache: !0, logger: {} }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { return e && e.__esModule ? e : { default: e } }

                        function o(e) {
                            o._owl || (o._owl = (0, r.default)()), this.owl = new o._owl.OWL(Object.assign({}, d, e));
                            var t = (0, l.ua)();
                            this.uaTags = { browser: t.browser.name, os: t.os.name }
                        }
                        Object.defineProperty(t, "__esModule", { value: !0 });
                        var a = n(32),
                            r = i(a),
                            s = n(9),
                            c = n(22),
                            u = i(c),
                            l = n(33),
                            d = { devMode: !1, project: "mars-webloc", resource: { sampleApi: 1, combo: !1 }, error: { sample: 1, combo: !1 }, metric: { sample: 1, combo: !1 } };
                        o.prototype.api = function(e, t, n, i) { this.owl.addApi({ name: "webloc-api-" + e, statusCode: t ? 200 : 500, responseTime: n, content: t ? "" : i }), this.owl.sendApis() }, o.prototype.metric = function(e, t, n) { this.owl.metricManager.setMetric(e, n), this.owl.metricManager.setTags(Object.assign({}, this.uaTags, t)), this.owl.metricManager.report() }, o.prototype.error = function(e, t) { this.owl.addError({ name: "webloc-error-" + e, msg: t }) }, o.prototype.loc = function(e, t) {
                            var n = { model: "h5", reqid: 1, lastloc: { accu: e.accuracy || -1, age: t, lat: e.latitude, lon: e.longitude, altitude: e.altitude || -1, coordtype: /wgs84/i.test(e.geotype) ? 0 : 1 }, version: "2.1.0", address_language: "", appname: "mars-webloc", request_address: !0, auth_key: "mQMvWzZ31G1woVJ9Wx17SBkOyhDoIZA3", osver: "", nettype: "Mobile", deviceid: s.cookie.getItem("_hc.v"), refer: navigator.userAgent || "" },
                                i = location.protocol + "//apimobile.meituan.com/locate/v2/sdk/loc?ci=mars-webloc",
                                o = { method: "POST", headers: { "Content-Type": "application/json" }, data: JSON.stringify(n) };
                            (0, u.default)(i, o)
                        }, t.default = o
                    }, function(e, t, n) {
                        "use strict";
                        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };
                        e.exports = function(e) {
                            function t(i) { if (n[i]) return n[i].exports; var o = n[i] = { i: i, l: !1, exports: {} }; return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports }
                            var n = {};
                            return t.m = e, t.c = n, t.d = function(e, n, i) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 9)
                        }([function(e, t, n) { e.exports = { log: console.log.bind(window.console), warn: console.warn.bind(window.console), error: console.error.bind(window.console), ignore: function() {} } }, function(e, t, n) {
                            var i = window,
                                o = i.XMLHttpRequest,
                                a = n(5),
                                r = n(0),
                                s = function() {};
                            ! function() {
                                if (o && !("_owl" in o)) {
                                    o._owl = !0;
                                    if ("file:" !== i.location.protocol) {
                                        var e = o.prototype.open,
                                            t = o.prototype.send;
                                        o.prototype.open = function(t, n) { return this.url = n, this._startTime = +new Date, e.apply(this, arguments) }, o.prototype.send = function() {
                                            var e = this,
                                                n = function(t) {
                                                    if (t) {
                                                        var n = +new Date - self._startTime;
                                                        if (t.duration = n, /catfront.(dianping|51ping).com/.test(e.url)) {
                                                            var i = void 0;
                                                            try {-1 !== e.getAllResponseHeaders("content-type").indexOf("application/json") && (i = t.currentTarget.response, i = JSON.parse(i)) } catch (e) { r.ignore(e) }
                                                            200 === t.currentTarget.status ? e.success && e.success(i) : e.fail && e.fail(i)
                                                        } else a.trigger("ajaxCall", t)
                                                    }
                                                };
                                            if ("addEventListener" in this) this.addEventListener("load", n), this.addEventListener("error", n), this.addEventListener("abort", n);
                                            else {
                                                var i = this.onreadystatechange;
                                                this.onreadystatechange = function(e) { 4 === this.readyState && n(e), i && i.apply(this, arguments) }
                                            }
                                            return t.apply(this, arguments)
                                        }
                                    }
                                }
                            }(), e.exports = function(e) {
                                if (e) {
                                    var t = window.navigator.userAgent,
                                        n = window.navigator.appName,
                                        i = -1 !== n.indexOf("Microsoft Internet Explorer") && (-1 !== t.indexOf("MSIE 8.0") || -1 !== t.indexOf("MSIE 9.0")),
                                        o = i && window.XDomainRequest,
                                        a = void 0;
                                    if (a = o ? new XDomainRequest : new XMLHttpRequest, a.open(e.type || "GET", e.url, !0), a.success = e.success || s, a.fail = e.fail || s, "POST" === e.type) {
                                        if (e.header && !o)
                                            for (var r in e.header) e.header.hasOwnProperty(r) && a.setRequestHeader(r, e.header[r]);
                                        a.send(e.data)
                                    } else a.send()
                                }
                            }
                        }, function(e, t, n) {
                            e.exports = function(e, t) {
                                var n = {},
                                    i = void 0;
                                for (i in e) n[i] = e[i];
                                for (i in t) t.hasOwnProperty(i) && void 0 !== t[i] && (n[i] = t[i]);
                                return n
                            }
                        }, function(e, t, n) { t.version = "1.5.13" }, function(e, t, n) { e.exports = { SCRIPT: "jsError", AJAX: "ajaxError", RESOURCE: "resourceError" } }, function(e, t, n) {
                            e.exports = {
                                on: function(e, t) {
                                    if (e) {
                                        this._events_ || (this._events_ = {});
                                        var n = this._events_;
                                        n[e] || (n[e] = []), n[e].push(t)
                                    }
                                },
                                trigger: function(e) {
                                    var t = this._events_;
                                    if (e && t && t[e])
                                        for (var n = t[e], i = n.length, o = Array.prototype.slice.call(arguments, 1), a = 0; a < i; a++) n[a].apply(this, o)
                                }
                            }
                        }, function(e, t, n) { e.exports = function() { try { localStorage.setItem("local_test", 1), localStorage.removeItem("local_test") } catch (e) { return !1 } return !0 } }, function(e, t, n) {
                            function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var o = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                a = n(2),
                                r = n(14),
                                s = n(4),
                                c = ["project", "pageUrl", "realUrl", "resourceUrl", "category", "sec_category", "level", "timestamp", "content"],
                                u = function() {
                                    function e(t) {
                                        if (i(this, e), t) {
                                            var n = void 0;
                                            for (n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
                                            this.parse(t)
                                        }
                                    }
                                    return o(e, [{ key: "parse", value: function() { this.category || (this.category = s.SCRIPT), this.level || (this.level = r.ERROR), this.timestamp || (this.timestamp = +new Date) } }, { key: "isEqual", value: function(e) { return this.sec_category === e.sec_category && this.resourceUrl === e.resourceUrl && this.colNum === e.colNum && this.rowNum === e.rowNum && this.content === e.content } }, { key: "update", value: function(e) { for (var t in e) void 0 !== e[t] && (this[t] = e[t]); return this } }, { key: "updateTags", value: function(e) { var t = a(this.tags || {}, e); return this.tags = t, this } }, {
                                        key: "toJson",
                                        value: function() {
                                            var e = this,
                                                t = this.rowNum,
                                                n = this.colNum,
                                                i = {};
                                            return c.map(function(t) { void 0 !== e[t] && (i[t] = e[t]) }), i.category === s.SCRIPT && t && n && (i.dynamicMetric = { rowNum: t, colNum: n }), this.tags && (i.dynamicMetric = a(i.dynamicMetric || {}, this.tags)), i
                                        }
                                    }]), e
                                }();
                            u.LEVEL = r, u.CATEGORY = s, e.exports = u
                        }, function(e, t, n) { e.exports = { stringify: function(e, t) { if (!t) return e; var n = []; for (var i in t) t.hasOwnProperty(i) && n.push(i + "=" + t[i]); return ~e.indexOf("?") ? e + "&" + n.join("&") : e + "?" + n.join("&") } } }, function(e, t, n) {
                            function i() { return n(10) }
                            e.exports = i
                        }, function(e, t, n) {
                            function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var o = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                a = n(11),
                                r = n(12),
                                s = n(7),
                                c = n(15),
                                u = n(17),
                                l = n(19),
                                d = n(20),
                                m = n(21),
                                p = n(22),
                                h = n(23),
                                f = n(24),
                                v = n(3).version,
                                g = n(4),
                                T = n(0),
                                b = !1;
                            try {
                                var S = window.navigator || {},
                                    y = S.userAgent; - 1 !== S.appName.indexOf("Microsoft Internet Explorer") && -1 !== y.indexOf("MSIE 8.0") && (b = !0)
                            } catch (e) { b = !0, T.ignore(e) }
                            var w = void 0;
                            if (b) T.warn("owl无法在当前环境运行"), w = { start: function() {} };
                            else {
                                var C = function() {
                                    function e(t, n) {
                                        i(this, e);
                                        var o = new a(t);
                                        this.errManager = new c(o, this), this.pageManager = new l(o), this.resManager = new u(o, this.errManager), this.metricManager = new d(o), this.cfgManager = o, this.init(), n && n.noFilter || r(this.cfgManager)
                                    }
                                    return o(e, [{ key: "init", value: function() { this.cfgManager.set({ ext: f.getExt() }) } }, { key: "config", value: function(e) { this.cfgManager.set(e) } }, { key: "addError", value: function(e, t) { t && !1 === t.combo ? this.errManager.report(e, t) : !1 === this.cfgManager.get("error").combo ? this.errManager.report(e, t) : this.errManager.push(e, t) } }, { key: "sendErrors", value: function() { this.errManager.report() } }, { key: "addPoint", value: function(e) { this.pageManager.push(e) } }, { key: "sendPoints", value: function() { this.pageManager.setUserReady(), this.pageManager.report() } }, {
                                        key: "addApi",
                                        value: function(e) {
                                            if (e) {
                                                var t = { resourceUrl: e.name, statusCode: "|" + e.statusCode, responsetime: e.responseTime };
                                                e.content && (t.firstCategory = g.AJAX, t.secondCategory = e.secondCategory || e.name, t.logContent = e.content), this.resManager.pushApi(t)
                                            }
                                        }
                                    }, { key: "reportApi", value: function() { this.addApi.apply(this, arguments) } }, { key: "sendApis", value: function() { this.resManager.report() } }, { key: "updateFilter", value: function(e, t) { void 0 === t ? this.cfgManager.removeFilter(e) : this.cfgManager.addFilter(e, t) } }, { key: "wrap", value: function(e, t, n) { if ("function" != typeof e) return e; try { if (e.__owl_wrapped__) return e; if (e.__owl_wrapper__) return e.__owl_wrapper__ } catch (t) { return e } var i = function() { try { return e.apply(t, arguments) } catch (e) { w.addError(e, n) } }; for (var o in e) e.prototype.hasOwnProperty(o) && (i[o] = e[o]); return i.prototype = e.prototype, e.__owl_wrapper__ = i, i.__owl_wrapper__ = !0, i } }]), e
                                }();
                                w = new C({}, { noFilter: !0 }), w.OWL = C, w.__version__ = v, w.errorModel = s, w.start = function(e) {
                                    if (-1 !== window.navigator.userAgent.indexOf("Baiduspider")) return T.warn("当前环境被判断为百度爬虫，监控功能关闭");
                                    if (!this.isStarted) {
                                        this.isStarted = !0, w.cfgManager.set({ pageUrl: window.location.href }), e && (w.cfgManager.set(e), w.cfgManager.checkUpdate()), r(this.cfgManager), h(w.pageManager), m(w.errManager), p(w.resManager, w.errManager);
                                        var t = e.preLoadName || "_Owl_";
                                        if (window[t]) {
                                            window[t].isReady = !0;
                                            var i = window[t],
                                                o = i.config,
                                                a = i.preTasks,
                                                s = i.dataSet;
                                            w.cfgManager.set({ autoCatch: o }), a && a.length && (a.forEach(function(e) { w[e.api].apply(w, e.data) }), window[t].preTasks = []), setTimeout(function() { s && s.length && s.forEach(function(e) { e && "jsError" === e.type ? w.errManager.parseWindowError.apply(w.errManager, e.data) : "resError" === e.type ? w.resManager.parseResError.apply(w.resManager, e.data) : "resTime" === e.type ? w.resManager.parseRes.apply(w.resManager, e.data) : "pageTime" === e.type && w.pageManager.parsePageTime.apply(w.pageManager, e.data) }), window[t].dataSet = [] }, 0)
                                        }
                                        w.errManager.checkCache();
                                        n(26)("owl_sdk", w)
                                    }
                                }
                            }
                            e.exports = w
                        }, function(e, t, n) {
                            function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var a = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function(e) { return void 0 === e ? "undefined" : i(e) } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : i(e) },
                                r = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                s = n(2),
                                c = n(6)(),
                                u = n(1),
                                l = n(0),
                                d = window.location.protocol ? window.location.protocol : "http:",
                                m = d + "//catfront.dianping.com",
                                p = d + "//catfront.51ping.com",
                                h = function() {
                                    function e(t) { o(this, e), this.url = m, this.filters = [], this._config = { devMode: !1, project: "", pageUrl: "", disabledFilters: [], noScriptError: !0, ignoreList: { js: [], ajax: ["https?://report.meituan.com/"], resource: ["https?://hls.dianping.com/"] }, ext: {}, resourceReg: /(.51ping|.dianping|.dpfile|.meituan|.sankuai|.maoyao|.kuxun)/, disableCache: !1, invalid: { ajax: !0 }, autoCatch: { page: !0, ajax: !0, js: !0, resource: !0 }, timeout: { flag: !1, ajax: 2e3, image: 5e3 }, resource: { sample: .1, sampleApi: .1, combo: !0, delay: 1e3 }, page: { auto: !0, sample: .5 }, error: { sample: 1, delay: 1e3, combo: !1 }, metric: { sample: .5, combo: !0, delay: 1500 } }, this.userConfig = {}, this.config = {}, t && this.set(t) }
                                    return r(e, [{ key: "removeFilter", value: function(e) { for (var t = 0; t < this.filters.length; t++) { if (this.filters[t].key === e) return void this.filters.splice(t, 1) } } }, {
                                        key: "addFilter",
                                        value: function(e, t) {
                                            if (e && t instanceof Function && -1 === this.config.disabledFilters.indexOf(e)) {
                                                for (var n = -1, i = 0; i < this.filters.length; i++) {
                                                    var o = this.filters[i];
                                                    o.key === e && (n = i, o.fn = t)
                                                } - 1 === n && this.filters.push({ key: e, fn: t })
                                            }
                                        }
                                    }, { key: "get", value: function(e) { return e ? this.config[e] : this.config } }, {
                                        key: "set",
                                        value: function(e) {
                                            for (var t in e)
                                                if (e.hasOwnProperty(t)) {
                                                    if ("devMode" === t && (e[t] ? this.url = p : this.url = m), "resourceReg" === t) try { this.userConfig[t] = new RegExp(e[t]) } catch (e) { l.warn(e) }
                                                    "object" !== a(e[t]) || e[t] instanceof RegExp || e[t] instanceof Array ? this.userConfig[t] = e[t] : this.userConfig[t] = s(this.userConfig[t], e[t])
                                                }
                                            this.update()
                                        }
                                    }, { key: "update", value: function() { this.config = this._config; for (var e in this.userConfig) { var t = this.userConfig[e]; "object" != (void 0 === t ? "undefined" : a(t)) || t instanceof RegExp || t instanceof Array ? this.config[e] = t : this.config[e] = s(this.config[e], this.userConfig[e]) } } }, { key: "reset", value: function() { this.config = this._config } }, { key: "_setDefault", value: function(e) { e && (e.resourceReg && (e.resourceReg = new RegExp(e.resourceReg)), this._config = s(this._config, e), this.update()) } }, { key: "checkUpdate", value: function() { var e = this; try { var t = this.initFromCache(); if (t) { var n = t.delay || 36e5; + new Date - t.ts > n || 0 === Object.keys(t).length ? u({ url: this.url + "/api/config", success: function(t) { t ? (e.updateCache(t.config, t.md5, t.delay), e._setDefault(t.config)) : e.clearCache() }, fail: function() { e._setDefault(t.config) } }) : this._setDefault(t.config) } } catch (e) { l.warn(e) } } }, { key: "updateCache", value: function(e, t, n) { if (e) { var i = { config: e, ts: +new Date, md5: t, delay: n || 36e5 }; if (c) try { window.localStorage.setItem("owl_config", JSON.stringify(i)) } catch (e) { l.warn(e) } } } }, { key: "clearCache", value: function() { if (c) try { window.localStorage.removeItem("owl_config") } catch (e) { l.warn(e) } } }, {
                                        key: "initFromCache",
                                        value: function() {
                                            var e = void 0;
                                            if (c) try { e = window.localStorage.getItem("owl_config"), e = e ? JSON.parse(e) : {} } catch (t) { e = {}, l.warn(t) }
                                            return e
                                        }
                                    }]), e
                                }();
                            e.exports = h
                        }, function(e, t, n) {
                            var i = n(13),
                                o = window.navigator.userAgent;
                            e.exports = function(e) { e.get("devMode") || (e.addFilter("base", i.base), /MicroMessenger/.test(o) ? e.addFilter("weixin", i.weixin) : /dp\/com\.dianping/.test(o) && e.addFilter("dianping", i.dianping)) }
                        }, function(e, t, n) { e.exports = { base: function(e) { return !e.resourceUrl || /\.(dpfile|dianping|51ping|meituan)\.(com|net)/.test(e.resourceUrl) }, weixin: function(e) { return !/(WeixinJSBridge|_WXJS|WebViewJavascriptBridge)/.test(e.sec_category) }, dianping: function(e) { return !/document.elementFromPoint/.test(e.sec_category) } } }, function(e, t, n) { e.exports = { ERROR: "error", INFO: "info", WARN: "warn", DEBUG: "debug" } }, function(e, t, n) {
                            function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var a = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function(e) { return void 0 === e ? "undefined" : i(e) } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : i(e) },
                                r = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                s = n(1),
                                c = n(2),
                                u = n(7),
                                l = n(16),
                                d = n(3).version,
                                m = n(4),
                                p = n(0),
                                h = function(e) {
                                    var t = e.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 9).join("@").replace(/\?[^:]+/gi, ""),
                                        n = e.toString();
                                    return t.indexOf(n) < 0 && (t = n + "@" + t), t
                                },
                                f = "/api/log?v=1&sdk" + d,
                                v = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    e && e.data && (e.beforeSend && e.beforeSend(), s({ type: "POST", url: e.url, header: { "Content-Type": "application/x-www-form-urlencoded" }, data: "c=" + encodeURIComponent(JSON.stringify(e.data)), success: e.success, fail: e.fail }))
                                },
                                g = function() {
                                    function e(t, n) { o(this, e), this.parent = n, this.cfgManager = t, this.cache = [], this.comboTimeout = 0, this.detectLeave() }
                                    return r(e, [{
                                        key: "_handleError",
                                        value: function(e) {
                                            try {
                                                var t = this.cfgManager.get("onErrorPush");
                                                if (t instanceof Function && (e = t(e)), e instanceof u || void 0 === e) return e;
                                                p.warn("onErrorPush方法返回结果有误")
                                            } catch (t) { return p.warn("onErrorPush方法处理有误", t), e }
                                        }
                                    }, { key: "parseWindowError", value: function(e, t, n, i, o) { try { o && o.stack ? this.push(o) : "string" == typeof e && this._push({ category: m.SCRIPT, sec_category: e, resourceUrl: t, rowNum: n, colNum: i }) } catch (e) { this.reportSystemError(e) } } }, {
                                        key: "detectLeave",
                                        value: function() {
                                            var e = this,
                                                t = arguments,
                                                n = window.onbeforeunload;
                                            window.onbeforeunload = function() { e.cfgManager.get("disableCache") || l.add(e.cache), n && n.apply(e, t) }
                                        }
                                    }, {
                                        key: "checkCache",
                                        value: function() {
                                            var e = this,
                                                t = l.get();
                                            t && t.length && setTimeout(function() { v({ url: e.cfgManager.url + f, data: t, success: function() { l.clear() } }) }, 1500)
                                        }
                                    }, { key: "reportSystemError", value: function(e) { e && e.stack && (this.cache.push(new u({ project: "owl", pageUrl: "default", realUrl: window.location.href, sec_category: e.msg || e.name || "parseError", content: JSON.stringify(e.stack) })), this.send(!0)) } }, {
                                        key: "_processError",
                                        value: function(e) {
                                            var t = function(e) { var t = "object" === (void 0 === e ? "undefined" : a(e)) ? JSON.stringify(e) : e; return { category: m.SCRIPT, sec_category: "Invalid_Error", content: t } };
                                            try {
                                                return function(e) {
                                                    var n = e.line,
                                                        i = e.column,
                                                        o = e.message || e.name || "";
                                                    if (e.stack) {
                                                        var a = e.stack.match("https?://[^\n]+");
                                                        a = a ? a[0] : "";
                                                        var r = /https?:\/\/(\S)*\.js/,
                                                            s = "";
                                                        r.test(a) && (s = a.match(r)[0]);
                                                        var c = a.match(":(\\d+):(\\d+)");
                                                        c || (c = [0, 0, 0]);
                                                        var u = h(e);
                                                        return { category: m.SCRIPT, sec_category: o, content: u, rowNum: void 0 !== n ? n : c[1], colNum: void 0 !== i ? i : c[2], resourceUrl: s }
                                                    }
                                                    return t(e)
                                                }(e)
                                            } catch (n) { return this.reportSystemError(e), t(e) }
                                        }
                                    }, { key: "_push", value: function(e) { e = this.parse(e), this.push(new u(e)) } }, {
                                        key: "_pushResource",
                                        value: function(e) {
                                            var t = this.cfgManager.get("resource").sample;
                                            Math.random() > t || this._push(e)
                                        }
                                    }, { key: "parse", value: function(e) { return e.project || (e.project = this.cfgManager.get("project")), e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || "default"), e.realUrl = window.location.href, e } }, {
                                        key: "push",
                                        value: function(e) {
                                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                                n = this.cfgManager;
                                            if (e && !(Math.random() > n.get("error").sample)) {
                                                e instanceof u || (e instanceof Error ? e = this._processError(e) : "string" == typeof e ? e = { sec_category: e } : "object" === (void 0 === e ? "undefined" : a(e)) && (e = { sec_category: e.name, content: e.msg }), e = this.parse(e), e = new u(e)), e.update({ level: t.level, category: t.category, tags: t.tags });
                                                var i = n.filters,
                                                    o = !0;
                                                if (this.cfgManager.get("noScriptError") && 0 === e.sec_category.indexOf("Script error")) return o = !1;
                                                if (i && i.length)
                                                    for (var r = 0; r < i.length; r++) { var s = i[r]; if (!s.fn(e)) return o = !1 }
                                                var c = n.get("ignoreList").js;
                                                if (c && c.length)
                                                    for (var l = 0; l < c.length; l++) { var d = c[l]; if (0 === e.sec_category.indexOf(d)) return o = !1 }
                                                o && (this.isExist(e) || (this.onPush && this.onPush(e), (e = this._handleError(e)) && (this.cache.push(e), this.send())))
                                            }
                                        }
                                    }, { key: "isExist", value: function(e) { for (var t = 0; t < this.cache.length; t++) { var n = this.cache[t]; if (n instanceof u || (n = new u(n)), n.isEqual(e)) return !0 } return !1 } }, { key: "report", value: function() { this.push.apply(this, arguments), this.send(!0) } }, {
                                        key: "send",
                                        value: function(e) {
                                            var t = this,
                                                n = this.cfgManager,
                                                i = this.comboTimeout,
                                                o = function() {
                                                    if (t.cache.length) {
                                                        clearTimeout(i), i = 0, t.onSubmit && t.onSubmit(t.cache);
                                                        var e = t.getCache();
                                                        v({ url: t.cfgManager.url + f, data: e, beforeSend: function() { t.nextCache = e, t.cache = [] }, success: function() { t.nextCache = [] }, fail: function() { t.cfgManager.get("disableCache") || l.add(t.nextCache) } })
                                                    }
                                                },
                                                a = n.get("error").delay;
                                            e ? o() : i || -1 === a || (i = setTimeout(o, a))
                                        }
                                    }, {
                                        key: "getCache",
                                        value: function() {
                                            var e = this.cfgManager,
                                                t = this.cache,
                                                n = [],
                                                i = e.get("ext");
                                            if (t && t.length) {
                                                for (var o = 0; o < t.length; o++) {
                                                    var r = t[o];
                                                    i && "object" === (void 0 === i ? "undefined" : a(i)) && (r = c(r.toJson(), i)), n.push(r)
                                                }
                                                return n
                                            }
                                        }
                                    }]), e
                                }();
                            e.exports = g
                        }, function(e, t, n) {
                            var i = n(6),
                                o = n(0);
                            e.exports = {
                                isSupport: i(),
                                get: function() {
                                    if (this.isSupport) {
                                        var e = [];
                                        try {
                                            var t = localStorage.getItem("owl_cache");
                                            t && (e = JSON.parse(t))
                                        } catch (e) { o.warn(e) }
                                        return e
                                    }
                                },
                                add: function(e) {
                                    if (this.isSupport && e instanceof Array) {
                                        var t = this.get();
                                        e = e.concat(t);
                                        try { localStorage.setItem("owl_cache", JSON.stringify(e)) } catch (e) { o.warn(e) }
                                    }
                                },
                                clear: function() { if (this.isSupport) try { localStorage.removeItem("owl_cache") } catch (e) { o.warn(e) } }
                            }
                        }, function(e, t, n) {
                            function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var o = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                a = n(1),
                                r = n(18),
                                s = n(3).version,
                                c = n(4),
                                u = n(5),
                                l = n(0),
                                d = { region: 1, operator: 2, network: 3, container: 4, os: 5 },
                                m = window.performance && void 0 !== window.performance.getEntries,
                                p = function(e) { var t = e.split("//"); if (t && t.length > 1) return t[0] + "//" + t[1].split("/")[0] + "/images" },
                                h = function() {
                                    function e(t, n) { i(this, e), this.cfgManager = t, this.errManager = n, this.cache = [], this.comboTimeout = 0 }
                                    return o(e, [{
                                        key: "parseAjax",
                                        value: function(e) {
                                            var t = void 0,
                                                n = void 0,
                                                i = void 0,
                                                o = void 0,
                                                a = void 0;
                                            try { t = e.type, n = e.currentTarget.responseURL || e.currentTarget.url, i = e.duration, o = e.total, a = e.currentTarget.status } catch (e) { return e }
                                            var r = "load" === t || "readystatechange" === t && 200 === a;
                                            0 === n.indexOf("//") ? n = window.location.protocol + n : 0 === n.indexOf("/") && (n = window.location.origin + n), a = (r ? 200 : 500) + "|";
                                            var s = this.cfgManager,
                                                u = !0;
                                            try {
                                                var d = s.get("ignoreList").ajax;
                                                if (d)
                                                    for (var m = 0; m < d.length; m++) {
                                                        var p = d[m],
                                                            h = new RegExp(p);
                                                        if (h.test(n)) return void(u = !1)
                                                    }
                                            } catch (e) { l.warn(e) }
                                            if (u) { s.get("devMode") || s.get("resourceReg").test(n) ? !s.get("timeout").flag || i < s.get("timeout").ajax ? this.pushApi({ resourceUrl: n, responsetime: i, responsebyte: o, statusCode: a, firstCategory: r ? "" : c.AJAX }) : this.errManager.push({ name: "TIMEOUT_AJAX", msg: n }, { category: c.AJAX }) : s.get("invalid").ajax && Math.random() < .1 && this.errManager.push({ name: "INVALID_AJAX", msg: n }, { category: c.AJAX }) }
                                        }
                                    }, {
                                        key: "parseRes",
                                        value: function() {
                                            var e = this;
                                            try {
                                                if (m) {
                                                    var t = window.performance.getEntries(),
                                                        n = t,
                                                        i = [],
                                                        o = function(t, n) {
                                                            for (var o = e.cfgManager, a = 0; a < t.length; a++) {
                                                                var r = t[a],
                                                                    s = r.name,
                                                                    u = o.get("ignoreList").resource,
                                                                    d = !0;
                                                                try { for (var m = 0; m < u.length; m++) { var h = u[m]; if (new RegExp(h).test(s)) return void(d = !1) } } catch (e) { l.warn(e) }
                                                                if (!d) return;
                                                                if (o.get("devMode") || o.get("resourceReg").test(s)) { i.push(s); "link" === r.initiatorType || "script" === r.initiatorType ? e.push({ resourceUrl: s, responsebyte: r.transferSize, responsetime: r.duration, statusCode: "200|" }) : "img" !== r.initiatorType && "css" !== r.initiatorType || (!o.get("timeout").flag || r.duration < o.get("timeout").image ? (s = p(s)) && e.push({ resourceUrl: s, responsebyte: 0, responsetime: r.duration, statusCode: "200|" }) : e.errManager.push({ name: "TIMEOUT_IMAGE", msg: s }, { category: c.RESOURCE })) }
                                                            }
                                                            n && n.report && e.report()
                                                        };
                                                    o(t, { report: !0 }), u.on("ajaxCall", function() {
                                                        setTimeout(function() {
                                                            var t = window.performance.getEntries();
                                                            if (t.length === n.length) return e.report();
                                                            if (t.length > n.length) {
                                                                for (var a = [], r = 0; r < t.length; r++) - 1 === i.indexOf(t[r].name) && a.push(t[r]);
                                                                n = t, o(a)
                                                            }
                                                        }, 1500)
                                                    })
                                                }
                                            } catch (e) { this.errManager.reportSystemError(e) }
                                        }
                                    }, {
                                        key: "parseResError",
                                        value: function(e) {
                                            var t = this,
                                                n = e.target || e.srcElement;
                                            if (!(n instanceof Window || e.error)) try {
                                                ! function() {
                                                    var e = n.src || n.href,
                                                        i = n.nodeName;
                                                    if (i && (i = i.toLowerCase()), 0 !== window.location.href.indexOf(e)) { var o = e; "img" === i && (o = p(e)), o && (m ? t.pushApi({ resourceUrl: o, responsetime: 0, responsebyte: 0, statusCode: "500|", firstCategory: c.RESOURCE, secondCategory: i, logContent: e }) : t.errManager._pushResource({ category: c.RESOURCE, sec_category: i, content: e })) }
                                                }()
                                            } catch (e) { this.errManager.reportSystemError(e) }
                                        }
                                    }, {
                                        key: "_stringify",
                                        value: function() {
                                            var e = this.cache;
                                            if (e && e.length) {
                                                var t = [],
                                                    n = this.cfgManager.get("ext"),
                                                    i = [];
                                                for (var o in n) n.hasOwnProperty(o) && (i[d[o]] = n[o]);
                                                n = "S\t" + i.join("\t"), t.push(n);
                                                for (var a = 0; a < e.length; a++) {
                                                    var r = e[a];
                                                    t.push(r.stringify())
                                                }
                                                return this.cache = [], t = t.join("\n")
                                            }
                                        }
                                    }, {
                                        key: "_push",
                                        value: function(e) {
                                            e = this.parse(e);
                                            var t = new r(e);
                                            this.onPush && this.onPush(t), this.cache.push(t)
                                        }
                                    }, {
                                        key: "push",
                                        value: function(e) {
                                            var t = this.cfgManager;
                                            Math.random() > t.get("resource").sample || (this._push(e), this.cache.length >= 10 && this.report())
                                        }
                                    }, { key: "parse", value: function(e) { return e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl")), e.project || (e.project = this.cfgManager.get("project")), e } }, {
                                        key: "pushApi",
                                        value: function(e) {
                                            var t = this.cfgManager;
                                            Math.random() > t.get("resource").sampleApi || (this._push(e), this.doReport())
                                        }
                                    }, { key: "report", value: function() { this.doReport(!0) } }, {
                                        key: "doReport",
                                        value: function(e) {
                                            var t = this,
                                                n = this.cfgManager;
                                            if (this.cache.length) {
                                                var i = function() { clearTimeout(t.comboTimeout), t.comboTimeout = 0, t.onSubmit && t.onSubmit(t.cache), t.send() },
                                                    o = n.get("resource").delay;
                                                e ? this.send() : this.comboTimeout || -1 === o || (this.comboTimeout = setTimeout(i, o))
                                            }
                                        }
                                    }, {
                                        key: "send",
                                        value: function() {
                                            this.onSubmit && this.onSubmit(this.cache);
                                            var e = this._stringify();
                                            if (e) {
                                                var t = this.cfgManager.url + "/api/batch?v=1&sdk=" + s;
                                                a({ type: "POST", url: t, header: { "Content-Type": "application/x-www-form-urlencoded" }, data: "c=" + encodeURIComponent(e) }), this.cache = []
                                            }
                                        }
                                    }]), e
                                }();
                            e.exports = h
                        }, function(e, t, n) {
                            function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var o = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                a = ["resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent"],
                                r = function() {
                                    function e(t) {
                                        var n = this;
                                        i(this, e), a.forEach(function(e) { n[e] = t[e] }), this.parse()
                                    }
                                    return o(e, [{ key: "parse", value: function() { this.timestamp || (this.timestamp = +new Date), this.requestbyte || (this.requestbyte = 0), this.responsebyte || (this.responsebyte = 0) } }, { key: "stringify", value: function() { var e = this; return a.map(function(t) { return e[t] }).join("\t") } }]), e
                                }();
                            e.exports = r
                        }, function(e, t, n) {
                            function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var o = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                a = n(1),
                                r = n(8),
                                s = n(2),
                                c = n(3).version,
                                u = function() {
                                    function e(t) { i(this, e), this.points = [], this.pointsCustom = [], this.cfgManager = t }
                                    return o(e, [{ key: "setUserReady", value: function() { this.cfgManager.set({ page: { auto: !0 } }) } }, { key: "getUserReady", value: function() { return this.cfgManager.get("page").auto } }, { key: "setReady", value: function() { this.isReady = !0 } }, { key: "getReady", value: function() { return this.isReady } }, {
                                        key: "parsePageTime",
                                        value: function(e) {
                                            if (!e) return this.setReady();
                                            var t = e.navigationStart,
                                                n = { unloadEventStart: 1, unloadEventEnd: 2, redirectStart: 3, redirectEnd: 4, fetchStart: 5, domainLookupStart: 6, domainLookupEnd: 7, connectStart: 8, connectEnd: 9, requestStart: 10, responseStart: 11, responseEnd: 12, domLoading: 13, domInteractive: 14, domContentLoadedEventStart: 15, domContentLoadedEventEnd: 16, domComplete: 17, loadEventStart: 18, loadEventEnd: 19 },
                                                i = void 0;
                                            for (i in e) 0 === e[i] ? this.points[n[i]] = e[i] : this.points[n[i]] = e[i] - t;
                                            this.points[20] = e.domainLookupEnd - e.domainLookupStart, this.points[21] = e.connectEnd - e.connectStart, this.points[22] = e.responseEnd - e.requestStart;
                                            for (var o = 0; o < this.points.length; o++) isNaN(this.points[o]) && (this.points[o] = 0);
                                            this.setReady(), this.report()
                                        }
                                    }, { key: "push", value: function(e) { this.onPush && this.onPush(e), e && "number" == typeof e.position && (e.position < 0 || e.position > 31 || (this.pointsCustom[e.position] = e.duration)) } }, {
                                        key: "report",
                                        value: function() {
                                            var e = this.cfgManager;
                                            if (this.getReady() && this.getUserReady() && (this.points.length || this.pointsCustom.length) && !(Math.random() > e.get("page").sample)) {
                                                this.onSubmit && this.onSubmit(this.points, this.pointsCustom);
                                                var t = e.url + "/api/speed?v=1",
                                                    n = e.get("ext");
                                                n = s({ project: e.get("project"), pageurl: encodeURIComponent(e.get("pageUrl")), speed: this.points.join("|"), customspeed: this.pointsCustom.join("|"), timestamp: +new Date, sdk: c }, n), delete n.unionId, t = r.stringify(t, n), a({ method: "GET", url: t }), this.points = [], this.pointsCustom = []
                                            }
                                        }
                                    }]), e
                                }();
                            e.exports = u
                        }, function(e, t, n) {
                            function i(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
                            var o = function() {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var i = t[n];
                                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                        }
                                    }
                                    return function(t, n, i) { return n && e(t.prototype, n), i && e(t, i), t }
                                }(),
                                a = n(2),
                                r = n(1),
                                s = n(0),
                                c = function() {
                                    function e(t) { i(this, e), this.cfgManager = t, this.tags = {}, this.kvs = {}, this.random = Math.random() }
                                    return o(e, [{ key: "setTags", value: function(e) { this.tags = a(this.tags, e) } }, { key: "getTags", value: function(e) { return e ? this.tags[e] : this.tags } }, {
                                        key: "setMetric",
                                        value: function(e, t) {
                                            var n = this;
                                            if ("string" != typeof e) return s.warn("metric名称必须是string类型");
                                            if ("number" != typeof t) return s.warn("metric值必须是number类型,当前为" + e + "-" + t);
                                            this.kvs[e] || (this.kvs[e] = []), this.kvs[e].push(t);
                                            try { this.cfgManager.get("metric").combo && (this.timeout && (clearTimeout(this.timeout), this.timeout = null), this.timeout = setTimeout(function() { n.report() }, this.cfgManager.get("metric").delay || 1500)) } catch (e) { throw e }
                                        }
                                    }, { key: "getMetric", value: function(e) { return e ? this.kvs[e] : this.kvs } }, { key: "clearMetric", value: function() { this.kvs = {} } }, { key: "_rollbackMetric", value: function(e) { for (var t in e) e.hasOwnProperty(t) && (this.kvs[t] = e[t].concat(this.kvs[t] || [])) } }, {
                                        key: "report",
                                        value: function() {
                                            var e = this;
                                            if (!(this.random > this.cfgManager.get("metric").sample)) {
                                                var t = this.cfgManager,
                                                    n = t.get("project");
                                                if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                                                    var i = { kvs: this.kvs, tags: this.tags, ts: parseInt(+new Date / 1e3) },
                                                        o = this.kvs;
                                                    this.clearMetric(), r({ type: "POST", url: t.url + "/api/metric?v=1&p=" + n, header: { "Content-Type": "application/x-www-form-urlencoded" }, data: "data=" + encodeURIComponent(JSON.stringify(i)), fail: function() { e._rollbackMetric(o) } })
                                                }
                                            }
                                        }
                                    }]), e
                                }();
                            e.exports = c
                        }, function(e, t, n) { e.exports = function(e) { var t = window.onerror; if (e) {!1 !== e.cfgManager.get("autoCatch").js && (window.onerror = function() { e.parseWindowError.apply(e, arguments), t && t.apply(window, arguments) }) } } }, function(e, t, n) {
                            var i = n(5);
                            e.exports = function(e) {
                                var t = e.cfgManager;
                                t.get("autoCatch").ajax && i.on("ajaxCall", function() { e.parseAjax.apply(e, arguments) });
                                var n = window.addEventListener || window.attachEvent;
                                t.get("autoCatch").resource && (n("load", function() { e.parseRes.apply(e, arguments) }), n("error", function(t) { t && e.parseResError.apply(e, arguments) }, !0))
                            }
                        }, function(e, t, n) {
                            e.exports = function(e) {
                                e.cfgManager.get("autoCatch").page && !e.getReady() && (window.addEventListener || window.attachEvent)("load", function() {
                                    var t = window.performance && window.performance.timing;
                                    e.parsePageTime(t)
                                })
                            }
                        }, function(e, t, n) {
                            var i = n(25);
                            e.exports = {
                                getExt: function() {
                                    var e = i("network");
                                    if (!e) {
                                        var t = navigator.userAgent,
                                            n = /NetType\/([a-zA-Z0-9]+)/;
                                        t && n.test(t) && (e = t.match(n)[1])
                                    }
                                    var o = i("dpid") || i("_hc.v"),
                                        a = {};
                                    return e && (a.network = e), o && (a.unionId = o), a
                                }
                            }
                        }, function(e, t, n) {
                            e.exports = function(e) {
                                for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
                                    for (var o = n[i];
                                        " " == o.charAt(0);) o = o.substring(1, o.length);
                                    if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
                                }
                                return null
                            }
                        }, function(e, t, n) {
                            var i = n(1),
                                o = n(8),
                                a = n(3).version,
                                r = n(0);
                            e.exports = function(e, t) {
                                if (e && t && !(Math.random() > .01)) {
                                    if (! function(e, t) { try { e = e.split(".").map(function(e) { return parseInt(e) }), t = t.split(".").map(function(e) { return parseInt(e) }); return (e[0] !== t[0] ? e[0] - t[0] : e[1] !== t[1] ? e[1] - t[1] : e[2] - t[2]) >= 0 } catch (e) { return r.ignore(e), !1 } }(t.cfgManager.get("version"), a)) {
                                        var n = { v: 1, rate: .01, project: e, version: "v_" + a, pageurl: encodeURIComponent(window.location.href), count: 1 },
                                            s = t.cfgManager.url + "/api/version";
                                        s = o.stringify(s, n), setTimeout(function() { i({ type: "GET", url: s }) }, 1500)
                                    }
                                }
                            }
                        }])
                    }, function(e, t, n) {
                        "use strict";

                        function i() { return new a.default(navigator.userAgent) }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.ua = i;
                        var o = n(34),
                            a = function(e) { return e && e.__esModule ? e : { default: e } }(o)
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = n(35)
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(36);
                        e.exports = function(e) {
                            var t, n, o = new i(e);
                            if ("mobile" === o.device.type || "tablet" === o.device.type) {
                                if ((t = e.match(/(ZTE|Samsung|Motorola|HTC|Coolpad|Huawei|Lenovo|LG|Sony Ericsson|Oppo|TCL|Vivo|Sony|Meizu|Nokia)/i)) && (o.device.manufacturer = t[1], o.device.model && o.device.model.indexOf(t[1]) >= 0 && (o.device.model = o.device.model.replace(t[1], ""))), t = e.match(/(iPod|iPad|iPhone)/i)) o.device.manufacturer = "Apple", o.device.model = t[1];
                                else if (t = e.match(/[-\s](Galaxy[\s-_]nexus|Galaxy[\s-_]\w*[\s-_]\w*|Galaxy[\s-_]\w*|SM-\w*|GT-\w*|s[cgp]h-\w*|shw-\w*|ATIV|i9070|omnia|s7568|A3000|A3009|A5000|A5009|A7000|A7009|A8000|C101|C1116|C1158|E400|E500F|E7000|E7009|G3139D|G3502|G3502i|G3508|G3508J|G3508i|G3509|G3509i|G3558|G3559|G3568V|G3586V|G3589W|G3606|G3608|G3609|G3812|G388F|G5108|G5108Q|G5109|G5306W|G5308W|G5309W|G550|G600|G7106|G7108|G7108V|G7109|G7200|G720NO|G7508Q|G7509|G8508S|G8509V|G9006V|G9006W|G9008V|G9008W|G9009D|G9009W|G9198|G9200|G9208|G9209|G9250|G9280|I535|I679|I739|I8190N|I8262|I879|I879E|I889|I9000|I9060|I9082|I9082C|I9082i|I9100|I9100G|I9108|I9128|I9128E|I9128i|I9152|I9152P|I9158|I9158P|I9158V|I9168|I9168i|I9190|I9192|I9195|I9195I|I9200|I9208|I9220|I9228|I9260|I9268|I9300|I9300i|I9305|I9308|I9308i|I939|I939D|I939i|I9500|I9502|I9505|I9507V|I9508|I9508V|I959|J100|J110|J5008|J7008|N7100|N7102|N7105|N7108|N7108D|N719|N750|N7505|N7506V|N7508V|N7509V|N900|N9002|N9005|N9006|N9008|N9008S|N9008V|N9009|N9100|N9106W|N9108V|N9109W|N9150|N916|N9200|P709|P709E|P729|S6358|S7278|S7278U|S7562C|S7562i|S7898i|b9388)[\s\)]/i)) o.device.manufacturer = "Samsung", o.device.model = t[1].replace(/Galaxy S VI/i, "Galaxy S6").replace(/Galaxy S V/i, "Galaxy S5").replace(/Galaxy S IV/i, "Galaxy S4").replace(/Galaxy s III/i, "Galaxy S3").replace(/Galaxy S II/i, "Galaxy S2").replace(/Galaxy S I/i, "Galaxy S1").replace(/([a-z]+[0-9]{3})[0-9]?[a-z]*/i, "$1");
                                else if (o.device.manufacturer && "samsung" === o.device.manufacturer.toLowerCase() && o.device.model) o.device.model = o.device.model.replace(/Galaxy S VI/i, "Galaxy S6").replace(/Galaxy S V/i, "Galaxy S5").replace(/Galaxy S IV/i, "Galaxy S4").replace(/Galaxy s III/i, "Galaxy S3").replace(/Galaxy S II/i, "Galaxy S2").replace(/Galaxy S I/i, "Galaxy S1").replace(/([a-z]+[0-9]{3})[0-9]?[a-z]*/i, "$1");
                                else if (t = e.match(/(Huawei[\s-_](\w*[-_]?\w*)|\s(7D-\w*|ALE-\w*|ATH-\w*|CHE-\w*|CHM-\w*|Che1-\w*|Che2-\w*|D2-\w*|G616-\w*|G620S-\w*|G621-\w*|G660-\w*|G750-\w*|GRA-\w*|Hol-\w*|MT2-\w*|MT7-\w*|PE-\w*|PLK-\w*|SC-\w*|SCL-\w*|H60-\w*|H30-\w*)[\s\)])/i)) o.device.manufacturer = "Huawei", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3]), (t = o.device.model.match(/(\w*)[\s-_]+[a-z0-9]+/i)) && (o.device.model = t[1]);
                                else if (t = e.match(/;\s(mi|m1|m2|m3|m4|hm)(\s*\w*)[\s\)]/i))(n = e.match(/(meitu|MediaPad)/i)) ? (o.device.manufacturer = n[1], o.device.model = "") : t[2].length > 0 && !/\s/.test(t[2]) ? (n = t[2].match(/(\d)/i)) && (o.device.model = t[1] + "-" + n[1]) : (o.device.manufacturer = "Xiaomi", t[2] && t[2].length > 0 ? (t[2] = t[2].replace(/\s/, ""), o.device.model = (t[1].substr(t[1].length - 2) + "-" + t[2]).replace(/m(\d)-/i, "MI-$1")) : o.device.model = t[1].substr(t[1].length - 2).replace(/m(\d)/i, "MI-$1"), /(mi|hm)(-\d)/i.test(o.device.model) && ((t = o.device.model.match(/(mi|hm)(-\ds)/i)) ? o.device.model = t[1] + t[2] : (t = o.device.model.match(/(mi|hm)(-\d{2})/i)) ? o.device.model = t[1] : (t = o.device.model.match(/(mi|hm)(-\d)[A-Z]/i)) && (o.device.model = t[1] + t[2])), (t = o.device.model.match(/(mi|hm)(-\dg)/i)) && (o.device.model = t[1]));
                                else if (/build\/HM\d{0,7}\)/i.test(e)) o.device.manufacturer = "Xiaomi", o.device.model = "HM";
                                else if (t = e.match(/redmi\s?(\d+)?/i)) o.device.manufacturer = "Xiaomi", o.device.model = "HM-" + t[1];
                                else if (o.device.manufacturer && "xiaomi" === o.device.manufacturer.toLowerCase() && o.device.model)(t = o.device.model.match(/mi-one/i)) ? o.device.model = "MI-1" : (t = o.device.model.match(/mi-two/i)) ? o.device.model = "MI-2" : (t = o.device.model.match(/\d{6}/i)) ? o.device.model = "" : (t = o.device.model.match(/redmi/i)) ? o.device.model = o.device.model.toUpperCase().replace(/redmi/i, "HM") : (t = o.device.model.match(/(m\d)[\s-_](s?)/i)) ? o.device.model = t[1].replace(/m/, "MI-") + t[2] : (t = o.device.model.match(/(hm|mi)[\s-_](\d?)[a-rt-z]/i)) ? (n = o.device.model.match(/(mi|hm)[\s-_](note|pad)(\d?s?)/i)) ? o.device.model = n[1] + "-" + n[2] + n[3] : o.device.model = t[2] ? t[1] + "-" + t[2] : t[1] : (t = o.device.model.match(/hm/i)) && ((t = o.device.model.match(/(hm)[\s-_](\d{2})/i)) ? o.device.model = "HM" : (t = o.device.model.match(/(hm)[\s-_](\ds)/i)) ? o.device.model = "HM-" + t[2] : (t = o.device.model.match(/(hm)[\s-_](\d)[a-z]/i)) ? o.device.model = "HM-" + t[2] : o.device.model = "HM", /hm-\dg/.test(o.device.model) && (o.device.model = "HM"));
                                else if (t = e.match(/(vivo[\s-_](\w*)|\s(E1\w?|E3\w?|E5\w?|V1\w?|V2\w?|S11\w?|S12\w?|S1\w?|S3\w?|S6\w?|S7\w?|S9\w?|X1\w?|X3\w?|X520\w?|X5\w?|X5Max|X5Max+|X5Pro|X5SL|X710F|X710L|Xplay|Xshot|Xpaly3S|Y11\w?|Y11i\w?|Y11i\w?|Y13\w?|Y15\w?|Y17\w?|Y18\w?|Y19\w?|Y1\w?|Y20\w?|Y22\w?|Y22i\w?|Y23\w?|Y27\w?|Y28\w?|Y29\w?|Y33\w?|Y37\w?|Y3\w?|Y613\w?|Y622\w?|Y627\w?|Y913\w?|Y923\w?|Y927\w?|Y928\w?|Y929\w?|Y937\w?)[\s\)])/i)) o.device.manufacturer = "Vivo", o.device.model = t[1], o.device.model = o.device.model.replace(/(viv[\s-_]|vivo[\s-_]|bbg[\s-_])/i, ""), (t = o.device.model.match(/([a-z]+[0-9]+)i?[a-z]?[\s-_]?/i)) && (o.device.model = t[1]);
                                else if (t = e.match(/(Oppo[\s-_](\w*)|\s(1100|1105|1107|3000|3005|3007|6607|A100|A103|A105|A105K|A109|A109K|A11|A113|A115|A115K|A121|A125|A127|A129|A201|A203|A209|A31|A31c|A31t|A31u|A51kc|A520|A613|A615|A617|E21W|Find|Mirror|N5110|N5117|N5207|N5209|R2010|R2017|R6007|R7005|R7007|R7c|R7t|R8000|R8007|R801|R805|R807|R809T|R8107|R8109|R811|R811W|R813T|R815T|R815W|R817|R819T|R8200|R8205|R8207|R821T|R823T|R827T|R830|R830S|R831S|R831T|R833T|R850|Real|T703|U2S|U521|U525|U529|U539|U701|U701T|U705T|U705W|X9000|X9007|X903|X905|X9070|X9077|X909|Z101|R829T)[\s\)])/i)) o.device.manufacturer = "Oppo", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3]), (t = o.device.model.match(/([a-z]+[0-9]+)-?(plus)/i)) ? o.device.model = t[1] + "-" + t[2] : (t = o.device.model.match(/(\w*-?[a-z]+[0-9]+)/i)) && (o.device.model = t[1]);
                                else if (o.device.manufacturer && "oppo" === o.device.manufacturer.toLowerCase() && o.device.model)(t = o.device.model.match(/([a-z]+[0-9]+)-?(plus)/i)) ? o.device.model = t[1] + "-" + t[2] : (t = o.device.model.match(/(\w*-?[a-z]+[0-9]+)/i)) && (o.device.model = t[1]);
                                else if (t = e.match(/(Lenovo[\s-_](\w*[-_]?\w*)|\s(A3580|A3860|A5500|A5600|A5860|A7600|A806|A800|A808T|A808T-I|A936|A938t|A788t|K30-E|K30-T|K30-W|K50-T3s|K50-T5|K80M|K910|K910e|K920|S90-e|S90-t|S90-u|S968T|X2-CU|X2-TO|Z90-3|Z90-7)[\s\)])/i)) o.device.manufacturer = "Lenovo", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3]), (t = o.device.model.match(/([a-z]+[0-9]+)/i)) && (o.device.model = t[1]);
                                else if (t = e.match(/(Coolpad[\s-_](\w*)|\s(7295C|7298A|7620L|8908|8085|8970L|9190L|Y80D)[\s\)])/i)) o.device.manufacturer = "Coolpad", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3]), (t = o.device.model.match(/([a-z]?[0-9]+)/i)) && (o.device.model = t[1]);
                                else if (o.device.manufacturer && "coolpad" === o.device.manufacturer.toLowerCase() && o.device.model)(t = o.device.model.match(/([a-z]?[0-9]+)/i)) && (o.device.model = t[1]);
                                else if (t = e.match(/\s(mx\d*\w*|mz-(\w*))\s(\w*)\s*\w*\s*build/i)) {
                                    o.device.manufacturer = "Meizu";
                                    var a = t[2] ? t[2] : t[1];
                                    t[3] ? o.device.model = a + "-" + t[3] : o.device.model = a + ""
                                } else(t = e.match(/M463C|M35\d/i)) ? (o.device.manufacturer = "Meizu", o.device.model = t[1]) : (t = e.match(/(Htc[-_\s](\w*)|\s(601e|606w|608t|609d|610t|6160|619d|620G|626d|626s|626t|626w|709d|801e|802d|802t|802w|809D|816d|816e|816t|816v|816w|826d|826s|826t|826w|828w|901e|919d|A310e|A50AML|A510e|A620d|A620e|A620t|A810e|A9191|Aero|C620d|C620e|C620t|D316d|D516d|D516t|D516w|D820mt|D820mu|D820t|D820ts|D820u|D820us|E9pt|E9pw|E9sw|E9t|HD7S|M8Et|M8Sd|M8St|M8Sw|M8d|M8e|M8s|M8si|M8t|M8w|M9W|M9ew|Phablet|S510b|S510e|S610d|S710d|S710e|S720e|S720t|T327t|T328d|T328t|T328w|T329d|T329t|T329w|T528d|T528t|T528w|T8698|WF5w|X315e|X710e|X715e|X720d|X920e|Z560e|Z710e|Z710t|Z715e)[\s\)])/)) ? (o.device.manufacturer = "Htc", o.device.model = t[1]) : (t = e.match(/(Gionee[\s-_](\w*)|\s(GN\d+\w*)[\s\)])/i)) ? (o.device.manufacturer = "Gionee", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3])) : (t = e.match(/(LG[-_](\w*)|\s(D728|D729|D802|D855|D856|D857|D858|D859|E985T|F100L|F460|H778|H818|H819|P895|VW820)[\s\)])/i)) ? (o.device.manufacturer = "Lg", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3])) : (t = e.match(/(Tcl[\s-_](\w*)|\s(H916T|P588L|P618L|P620M|P728M)[\s\)])/)) ? (o.device.manufacturer = "Tcl", o.device.model = t[1]) : (t = e.match(/(V9180|N918)/i)) ? (o.device.manufacturer = "Zte", o.device.model = t[1]) : o.device.manufacturer && "zte" === o.device.manufacturer.toLowerCase() && o.device.model ? (t = o.device.model.match(/([a-z]?[0-9]+)/i)) && (o.device.model = t[1]) : (t = e.match(/(UIMI\w*|umi\w*)[\s-_](\w*)\s*\w*\s*build/i)) ? (o.device.manufacturer = "Uimi", t[2] ? o.device.model = t[1] + "-" + t[2] : o.device.model = t[1] + "") : (t = e.match(/eton[\s-_](\w*)/i)) ? (o.device.manufacturer = "Eton", o.device.model = t[1]) : (t = e.match(/(SM705|SM701|YQ601|YQ603)/i)) ? (o.device.manufacturer = "Smartisan", o.device.model = { SM705: "T1", SM701: "T1", YQ601: "U1", YQ603: "U1" }[t[1]] || t[1]) : (t = e.match(/(Asus[\s-_](\w*)|\s(A500CG|A500KL|A501CG|A600CG|PF400CG|PF500KL|T001|X002|X003|ZC500TG|ZE550ML|ZE551ML)[\s\)])/i)) ? (o.device.manufacturer = "Asus", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3])) : (t = e.match(/(Nubia[-_\s](\w*)|(NX501|NX505J|NX506J|NX507J|NX503A|nx\d+\w*)[\s\)])/i)) ? (o.device.manufacturer = "Nubia", t[2] ? o.device.model = t[2] : t[3] && (o.device.model = t[3])) : (t = e.match(/(HT-\w*)|Haier[\s-_](\w*-?\w*)/i)) ? (o.device.manufacturer = "Haier", t[1] ? o.device.model = t[1] : t[2] && (o.device.model = t[2])) : (t = e.match(/K-Touch[\s-_](tou\s?ch\s?(\d)|\w*)/i)) ? (o.device.manufacturer = "K-Touch", t[2] ? o.device.model = "Ktouch" + t[2] : o.device.model = t[1]) : (t = e.match(/Doov[\s-_](\w*)/i)) ? (o.device.manufacturer = "Doov", o.device.model = t[1]) : /koobee/i.test(e) ? o.device.manufacturer = "koobee" : /C69/i.test(e) ? o.device.manufacturer = "Sony" : /N787|N818S/i.test(e) ? o.device.manufacturer = "Haojixing" : (t = e.match(/(hs-|Hisense[\s-_])(\w*)/i)) && (o.device.manufacturer = "Hisense", o.device.model = t[2]);
                                o.device.manufacturer && (o.device.manufacturer = o.device.manufacturer.substr(0, 1).toUpperCase() + o.device.manufacturer.substr(1).toLowerCase()), o.device.model && (o.device.model = o.device.model.toUpperCase().replace(/-+|_+|\s+/g, " "), o.device.model = o.device.model.match(/\s*(\w*\s*\w*)/)[1].replace(/\s+/, "-"), "Samsung" === o.device.manufacturer ? o.device.model = { "SCH-I95": "GT-I950", "SCH-I93": "GT-I930", "SCH-I86": "GT-I855", "SCH-N71": "GT-N710", "SCH-I73": "GT-S789", "SCH-P70": "GT-I915" }[o.device.model] || o.device.model : "Huawei" === o.device.manufacturer && (o.device.model = { CHE1: "CHE", CHE2: "CHE", G620S: "G621", C8817D: "G621" }[o.device.model] || o.device.model)), o.device.manufacturer && "Xiaomi" === o.device.manufacturer && ((t = o.device.model.match(/(hm|mi)-(note)/i)) ? o.device.model = t[1] + "-" + t[2] : (t = o.device.model.match(/(hm|mi)-(\ds?)/i)) ? o.device.model = t[1] + "-" + t[2] : (t = o.device.model.match(/(hm|mi)-(\d)[a-rt-z]/i)) && (o.device.model = t[1] + "-" + t[2]))
                            }
                            if ("desktop" === o.device.type ? (t = /360se(?:[ \/]([\w.]+))?/i.exec(e)) ? (o.browser.name = "360 security Explorer", o.browser.version = { original: t[1] }) : (t = /the world(?:[ \/]([\w.]+))?/i.exec(e)) ? (o.browser.name = "the world", o.browser.version = { original: t[1] }) : (t = /tencenttraveler ([\w.]+)/i.exec(e)) ? (o.browser.name = "tencenttraveler", o.browser.version = { original: t[1] }) : (t = /LBBROWSER/i.exec(e)) && (o.browser.name = "LBBROWSER") : "mobile" !== o.device.type && "tablet" !== o.device.type || ((t = /BaiduHD\s+([\w.]+)/i.exec(e)) ? (o.browser.name = "BaiduHD", o.browser.version = { original: t[1] }) : (t = /360.s*aphone\s*browser\s*\(version\s*([\w.]+)\)/i.exec(e)) ? (o.browser.name = "360 Browser", o.browser.version = { original: t[1] }) : (t = /flyflow\/([\w.]+)/i.exec(e)) ? (o.browser.name = "Baidu Browser", o.browser.version = { original: t[1] }) : (t = /baiduhd ([\w.]+)/i.exec(e)) ? (o.browser.name = "Baidu HD", o.browser.version = { original: t[1] }) : (t = /baidubrowser\/([\d\.]+)\s/i.exec(e)) ? (o.browser.name = "baidubrowser", o.browser.version = { original: t[1] }) : (t = /LieBaoFast\/([\w.]+)/i.exec(e)) ? (o.browser.name = "LieBao Fast", o.browser.version = { original: t[1] }) : (t = /LieBao\/([\w.]+)/i.exec(e)) ? (o.browser.name = "LieBao", o.browser.version = { original: t[1] }) : (t = /Sogou\w+\/([0-9\.]+)/i.exec(e)) ? (o.browser.name = "SogouMobileBrowser", o.browser.version = { original: t[1] }) : (t = /bdbrowser\w+\/([0-9\.]+)/i.exec(e)) ? (o.browser.name = "百度国际", o.browser.version = { original: t[1] }) : "Android" === o.os.name && /safari/i.test(e) && (t = /chrome\/([0-9\.]+)/i.exec(e)) ? (n = e.match(/\s+(\w+Browser)\/?([\d\.]*)/)) ? (o.browser.name = n[1], n[2] ? o.browser.version = { original: n[2] } : o.browser.version = { original: t[1] }) : (o.browser.name = "Android Chrome", o.browser.version = { original: t[1] }) : "Android" === o.os.name && /safari/i.test(e) && (t = /version\/([0-9\.]+)/i.exec(e)) ? (n = e.match(/\s+(\w+Browser)\/?([\d\.]*)/)) ? (o.browser.name = n[1], n[2] ? o.browser.version = { original: n[2] } : o.browser.version = { original: t[1] }) : (o.browser.name = "Android Browser", o.browser.version = { original: t[1] }) : /(ipad|iphone).* applewebkit\/.* mobile/i.test(e) && (o.browser.name = "Safari")), (t = e.match(/baiduboxapp\/?([\d\.]*)/i)) ? (o.browser.name = "百度框", t[1] && (o.browser.version = { original: t[1] })) : /BaiduLightAppRuntime/i.test(e) ? o.browser.name = "轻应用runtime" : /Weibo/i.test(e) ? o.browser.name = "微博" : /MQQ/i.test(e) ? o.browser.name = "手机QQ" : /hao123/i.test(e) && (o.browser.name = "hao123"), t = /MicroMessenger\/([\w.]+)/i.exec(e)) {
                                o.browser.name = "微信";
                                var r = t[1].replace(/_/g, ".");
                                n = /(\d+\.\d+\.\d+\.\d+)/.exec(r), n && (r = n[1]), o.browser.version = { original: r }
                            }
                            return (t = /UCBrowser\/([\w.]+)/i.exec(e)) && (o.browser.name = "UC Browser", o.browser.version = { original: t[1] }), (t = /OPR\/([\w.]+)/i.exec(e)) ? (o.browser.name = "Opera", o.browser.version = { original: t[1] }) : (t = /OPiOS\/([\w.]+)/i.exec(e)) ? (o.browser.name = "Opera", o.browser.version = { original: t[1] }) : /Trident\/7/i.test(e) && /rv:11/i.test(e) ? (o.browser.name = "Internet Explorer", o.browser.version = { major: "11", original: "11" }) : /Edge\/12/i.test(e) && /Windows Phone|Windows NT/i.test(e) ? (o.browser.name = "Microsoft Edge", o.browser.version = { major: "12", original: "12" }) : (t = /miuibrowser\/([\w.]+)/i.exec(e)) && (o.browser.name = "miui browser", o.browser.version = { original: t[1] }), o.browser.name || (t = /Safari\/([\w.]+)/i.exec(e) && /Version/i.test(e)) && (o.browser.name = "Safari"), o.browser.name && !o.browser.version && (t = /Version\/([\w.]+)/i.exec(e)) && (o.browser.version = { original: t[1] }), "Windows" === o.os.name || /Windows/i.test(e) ? (o.os.name = "Windows", /NT 6.3/i.test(e) ? o.os.version = { alias: "8.1", original: "8.1" } : (/NT 6.4/i.test(e) || /NT 10.0/i.test(e)) && (o.os.version = { alias: "10", original: "10" })) : "Mac OS X" === o.os.name ? (o.os.name = "Mac OS X", (t = /Mac OS X[\s\_\-\/](\d+[\.\-\_]\d+[\.\-\_]?\d*)/i.exec(e)) ? o.os.version = { alias: t[1].replace(/_/g, "."), original: t[1].replace(/_/g, ".") } : o.os.version = { alias: "", original: "" }) : /Android/i.test(o.os.name) && (t = e.match(/Android[\s\_\-\/i686]?[\s\_\-\/](\d+[\.\-\_]\d+[\.\-\_]?\d*)/i)) && (o.os.version = { alias: t[1], original: t[1] }), o
                        }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }
                        e.exports = function() {
                            function e(e) { return e = void 0 === e ? "" : e, e = e.replace(/_TD$/, ""), e = e.replace(/_CMCC$/, ""), e = e.replace(/_/g, " "), e = e.replace(/^\s+|\s+$/g, ""), e = e.replace(/\/[^\/]+$/, ""), e = e.replace(/\/[^\/]+ Android\/.*/, ""), e = e.replace(/^tita on /, ""), e = e.replace(/^Android on /, ""), e = e.replace(/^Android for /, ""), e = e.replace(/^ICS AOSP on /, ""), e = e.replace(/^Full AOSP on /, ""), e = e.replace(/^Full Android on /, ""), e = e.replace(/^Full Cappuccino on /, ""), e = e.replace(/^Full MIPS Android on /, ""), e = e.replace(/^Full Android/, ""), e = e.replace(/^Acer ?/i, ""), e = e.replace(/^Iconia /, ""), e = e.replace(/^Ainol /, ""), e = e.replace(/^Coolpad ?/i, "Coolpad "), e = e.replace(/^ALCATEL /, ""), e = e.replace(/^Alcatel OT-(.*)/, "one touch $1"), e = e.replace(/^YL-/, ""), e = e.replace(/^Novo7 ?/i, "Novo7 "), e = e.replace(/^GIONEE /, ""), e = e.replace(/^HW-/, ""), e = e.replace(/^Huawei[ -]/i, "Huawei "), e = e.replace(/^SAMSUNG[ -]/i, ""), e = e.replace(/^SonyEricsson/, ""), e = e.replace(/^Lenovo Lenovo/, "Lenovo"), e = e.replace(/^LNV-Lenovo/, "Lenovo"), e = e.replace(/^Lenovo-/, "Lenovo "), e = e.replace(/^(LG)[ _\/]/, "$1-"), e = e.replace(/^(HTC.*)\s(?:v|V)?[0-9.]+$/, "$1"), e = e.replace(/^(HTC)[-\/]/, "$1 "), e = e.replace(/^(HTC)([A-Z][0-9][0-9][0-9])/, "$1 $2"), e = e.replace(/^(Motorola[\s|-])/, ""), e = e.replace(/^(Moto|MOT-)/, ""), e = e.replace(/-?(orange(-ls)?|vodafone|bouygues)$/i, ""), e = e.replace(/http:\/\/.+$/i, ""), e = e.replace(/^\s+|\s+$/g, "") }

                            function t(e) {
                                e = e.toString();
                                var t = e.split("."),
                                    n = t.shift();
                                return parseFloat(n + "." + t.join(""))
                            }
                            var n, o = { SAMSUNG: { "GT-S3370C": ["Samsung", "Corby 3G"], "GT-S3650": ["Samsung", "Corby"], "GT-S3653": ["Samsung", "Corby"], "GT-S3850": ["Samsung", "Corby II"], "GT-S5230": ["Samsung", "Star"], "GT-S5230W": ["Samsung", "Star"], "GT-S5233": ["Samsung", "Star"], "GT-S5260": ["Samsung", "Star II"], "GT-S5560": ["Samsung", "Marvel"], "GT-S5620": ["Samsung", "Monte"], "GT-S7550": ["Samsung", "Blue Earth"], "GT-S8000": ["Samsung", "Jet"], "GT-S8003": ["Samsung", "Jet"], "SGH-F480": ["Samsung", "Tocco"], "SGH-T528g": ["Samsung", "Straight Talk"], "GT-B3410": ["Samsung", "Star Qwerty"], "GT-B5310": ["Samsung", "Corby Pro"], "GT-B7722": ["Samsung", "Star Duos"], "GT-C6712": ["Samsung", "Star II Duos"] } },
                                a = { SAMSUNG: { "GT- S5250": ["Samsung", "Wave 525"], "GT-S5250": ["Samsung", "Wave 525"], "GT-S5253": ["Samsung", "Wave 525"], "GT-S5330": ["Samsung", "Wave 533"], "GT-S5380": ["Samsung", "Wave Y"], "GT-S5380D": ["Samsung", "Wave Y"], "GT-S5380K": ["Samsung", "Wave Y"], "GT-S5750E": ["Samsung", "Wave 575"], "GT-S5753E": ["Samsung", "Wave 575"], "GT-S7230B": ["Samsung", "Wave 723"], "GT-S7230E": ["Samsung", "Wave 723"], "GT-S7233E": ["Samsung", "Wave 723"], "GT-S7250": ["Samsung", "Wave M"], "GT-S7250D": ["Samsung", "Wave M"], "GT-S8500": ["Samsung", "Wave"], "GT-S8500C": ["Samsung", "Wave"], "GT-S8500R": ["Samsung", "Wave"], "GT-S8500T": ["Samsung", "Wave"], "GT-S8530": ["Samsung", "Wave II"], "GT-S8600": ["Samsung", "Wave 3"], "SHW-M410": ["Samsung", "Wave 3"] } },
                                r = { SAMSUNG: { "GT-I9500": ["Samsung", "GT-I9500"] } },
                                s = { "Coolpad D508": ["Coolpad", "D508"], "Coolpad E600": ["Coolpad", "E600"], "SCH-F839": ["Samsung", "SCH-F839"] },
                                c = { DX900: ["Acer", "Tempo DX900"], F900: ["Acer", "Tempo F900"], "Coolpad F800": ["Coolpad", "F800"], "garmin-asus-Nuvifone-M10": ["Garmin-Asus", "Nuvifone M10"], "HP iPAQ 510": ["HP", "iPAQ 510"], "HD mini T5555": ["HTC", "HD mini"], "HTC HD mini": ["HTC", "HD mini"], "HTC HD mini T5555": ["HTC", "HD mini"], "HTC HD2": ["HTC", "HD2"], "HTC HD2 T8585": ["HTC", "HD2"], "HD2 T8585": ["HTC", "HD2"], "T-Mobile LEO": ["HTC", "HD2"], dopodT5588: ["HTC", "Hengshan"], "HTC Mega-T3333": ["HTC", "Mega"], "HTC Snap S521": ["HTC", "Snap"], "HTC Touch2 T3320": ["HTC", "Touch 2"], "HTC Touch2 T3333": ["HTC", "Touch 2"], "HTC Touch2 T3335": ["HTC", "Touch 2"], "HTC P3700": ["HTC", "Touch Diamond"], "HTC Touch Diamond2 T5353": ["HTC", "Touch Diamond 2"], "HTC Touch HD T8282": ["HTC", "Touch HD"], "HTC Touch HD T8283": ["HTC", "Touch HD"], "HTC Touch HD2 T8585": ["HTC", "Touch HD2"], "HTC Touch Pro2 T7373": ["HTC", "Touch Pro 2"], T7380: ["HTC", "Touch Pro 2"], "HTC TyTN II": ["HTC", "TyTN II"], "GT-B7300": ["Samsung", "Omnia Lite"], "GT-B7610": ["Samsung", "Omnia Pro"], "GT-i8000": ["Samsung", "Omnia 2"], "GT-I8000": ["Samsung", "Omnia 2"], "GT-I8000U": ["Samsung", "Omnia 2"], M1i: ["Sony Ericsson", "M1i Aspen"] },
                                u = { Acer: { Allegro: ["Acer", "Allegro"], M310: ["Acer", "Allegro"] }, Asus: { Galaxy6: ["Asus", "Galaxy 6"] }, DELL: { "Venue Pro": ["Dell", "Venue Pro"] }, FujitsuToshibaMobileCommun: { IS12T: ["Fujitsu Toshiba", "IS12T"] }, HTC: { "7 Mozart": ["HTC", "7 Mozart"], "7 Mozart T8698": ["HTC", "7 Mozart"], T8697: ["HTC", "7 Mozart"], T8698: ["HTC", "7 Mozart"], PD67100: ["HTC", "7 Mozart"], "Mozart T8698": ["HTC", "7 Mozart"], Mozart: ["HTC", "7 Mozart"], "USCCHTC-PC93100": ["HTC", "Arrive"], Gold: ["HTC", "Gold "], HD2: ["HTC", "HD2"], HD7: ["HTC", "HD7"], "HD7 T9292": ["HTC", "HD7"], T9295: ["HTC", "HD7"], T9296: ["HTC", "HD7"], "HD7 Infinity": ["HTC", "HD7"], T7575: ["HTC", "7 Pro"], "7 Pro T7576": ["HTC", "7 Pro"], mwp6985: ["HTC", "Trophy"], "7 Trophy T8686": ["HTC", "Trophy"], "7 Trophy": ["HTC", "Trophy"], PC40100: ["HTC", "Trophy"], "Touch-IT Trophy": ["HTC", "Trophy"], Radar: ["HTC", "Radar"], "Radar 4G": ["HTC", "Radar"], "Radar C110e": ["HTC", "Radar"], Mazaa: ["HTC", "Mazaa"], Mondrian: ["HTC", "Mondrian"], Schubert: ["HTC", "Schubert"], "7 Schubert T9292": ["HTC", "Schubert"], Spark: ["HTC", "Spark"], T8788: ["HTC", "Surround"], "TITAN X310e": ["HTC", "Titan"], X310e: ["HTC", "Titan"], PI39100: ["HTC", "Titan"], PI86100: ["HTC", "Titan II"], Ultimate: ["HTC", "Ultimate"] }, LG: { GW910: ["LG", "Optimus 7"], "LG E-900": ["LG", "Optimus 7 E900"], "LG-E900": ["LG", "Optimus 7 E900"], "LG-E900h": ["LG", "Optimus 7 E900"], "LG-C900": ["LG", "Optimus 7Q"], "LG-C900B": ["LG", "Quantum"], "LG-C900k": ["LG", "Quantum"] }, nokia: { SeaRay: ["Nokia", "Lumia 800"], "800C": ["Nokia", "Lumia 800"] }, NOKIA: { 710: ["Nokia", "Lumia 710"], "Nokia 710": ["Nokia", "Lumia 710"], "Lumia 710": ["Nokia", "Lumia 710"], "Lumia 719": ["Nokia", "Lumia 719"], "Lumia 800": ["Nokia", "Lumia 800"], 800: ["Nokia", "Lumia 800"], "Lumia 900": ["Nokia", "Lumia 900"], XXX: ["Nokia", "prototype"] }, SAMSUNG: { "GT-I8350": ["Samsung", "Omnia W"], "GT-I8350T": ["Samsung", "Omnia W"], "SGH-i677": ["Samsung", "Focus Flash"], "SGH-i707": ["Samsung", "Taylor"], "SGH-i917": ["Samsung", "Omnia 7"], "SGH-I917": ["Samsung", "Omnia 7"], "SGH-i917.": ["Samsung", "Focus"], "SGH-i917R": ["Samsung", "Focus"], "SGH-i937": ["Samsung", "Focus S"], OMNIA7: ["Samsung", "Omnia 7"], OMINA7: ["Samsung", "Omnia 7"], Taylor: ["Samsung", "Taylor"] }, TOSHIBA: { TSUNAGI: ["Toshiba", "Tsunagi"] } },
                                l = (n = { Android: [null, null], "google sdk": [null, null], sdk: [null, null], generic: [null, null], "generic x86": [null, null], "amd brazos": ["AMD", "Fusionbased device"], "Amlogic M1 reference board": ["Amlogic", "M1 reference board"], AML8726M: ["Amlogic", "AML8726-Mbased device"], "vexpress a9": ["ARM", "Versatile Express development platform"], bcm7231: ["Broadcom", "BCM7231based device", "television"], bcm7425: ["Broadcom", "BCM7425based device", "television"], bcm7429: ["Broadcom", "BCM7429based device", "television"], "imx50 rdp": ["Freescale", "i.MX50based device"], "imx51 bbg": ["Freescale", "i.MX51based device"], "imx53 loco": ["Freescale", "i.MX53based device"], "imx53 mp204f3": ["Freescale", "i.MX53based device"], "imx53 smd": ["Freescale", "i.MX53based device"], "imx53 yeagle": ["Freescale", "i.MX53based device"], imx6q: ["Freescale", "i.MX6Qbased device"], "ODROID-A": ["Hardkernel", "ODROID-A developer tablet", "tablet"], "mfld dv10": ["Intel", "Medfieldbased device"], "mfld dv20": ["Intel", "Medfieldbased device"], "mfld lw00": ["Intel", "Medfieldbased device"], "mfld pr2": ["Intel", "Medfieldbased device"], "mfld pr3": ["Intel", "Medfieldbased device"], "berlin bg2": ["Marvell", "Armada 1000based device", "television"], "MStar Amber3": ["MStar", "Amber3based device"], "Konka Amber3": ["MStar", "Amber3based device"], mt5396: ["Mediatek", "MT5396based device", "television"], bird75v2: ["Mediatek", "MT6575based device"], "eagle75v1 2": ["Mediatek", "MT6575based device"], "MBX DVBT reference board (c03ref)": ["MXB", "DVBT reference board", "television"], NS2816: ["Nufront", "NuSmart 2816based device"], Ventana: ["nVidia", "Tegra Ventana development kit"], Cardhu: ["nVidia", "Tegra 3based device"], Panda: ["Pandaboard", "Development Kit"], pandaboard: ["Pandaboard", "Development Kit"], PandaBoard: ["Pandaboard", "Development Kit"], MSM: ["Qualcomm", "Snapdragonbased device"], "msm7227 ffa": ["Qualcomm", "Snapdragon S1based device"], "msm7627 surf": ["Qualcomm", "Snapdragon S1based device"], msm7627a: ["Qualcomm", "Snapdragon S1based device"], "msm7627a sku1": ["Qualcomm", "Snapdragon S1based device"], "msm7627a sku3": ["Qualcomm", "Snapdragon S1based device"], "msm7630 fusion": ["Qualcomm", "Snapdragon S2based device"], "msm7630 surf": ["Qualcomm", "Snapdragon S2based device"], "msm8660 cougar": ["Qualcomm", "Snapdragon S3based device"], "msm8660 surf": ["Qualcomm", "Snapdragon S3based device"], msm8960: ["Qualcomm", "Snapdragon S4based device"], rk2808sdk: ["Rockchip", "RK2808based device"], RK2818: ["Rockchip", "RK2818based device"], rk2818sdk: ["Rockchip", "RK2818based device"], "Android-for-Rockchip-2818": ["Rockchip", "RK2818based device"], rk29sdk: ["Rockchip", "RK29based device"], Rk29sdk: ["Rockchip", "RK29based device"], rk30sdk: ["Rockchip", "RK30based device"], s3c6410: ["Samsung", "S3C6410based device"], smdk6410: ["Samsung", "S3C6410based device"], SMDKC110: ["Samsung", "Exynos 3110based device"], SMDKV210: ["Samsung", "Exynos 4210based device"], S5PV210: ["Samsung", "Exynos 4210based device"], "sec smdkc210": ["Samsung", "Exynos 4210based device"], SMDK4x12: ["Samsung", "Exynos 4212 or 4412based device"], smp86xx: ["Sigma", "SMP86xxbased device", "television"], sv8860: ["Skyviia", "SV8860based device", "television"], "ste u8500": ["ST Ericsson", "Novathor U8500based device"], "Telechips M801 Evaluation Board": ["Telechips", "M801based device", "television"], "Telechips TCC8900 Evaluation Board": ["Telechips", "TCC8900based device", "television"], "TCC8920 STB EV": ["Telechips", "TCC8920based device", "television"], OMAP: ["Texas Instruments", "OMAPbased device"], "OMAP SS": ["Texas Instruments", "OMAPbased device"], "LogicPD Zoom2": ["Texas Instruments", "OMAPbased device"], omap3evm: ["Texas Instruments", "OMAP3based device"], Omap5sevm: ["Texas Instruments", "OMAP5based device"], "pnx8473 kiryung": ["Trident", "PNX8473based device", "television"], crespo: ["Google", "Nexus S"], Crespo: ["Google", "Nexus S"], Crespo4G: ["Google", "Nexus S"], Passion: ["Google", "Nexus One"], Bravo: ["HTC", "Desire"], dream: ["HTC", "Dream"], Vogue: ["HTC", "Touch"], "Vendor Optimus": ["LG", "Optimus"], Stingray: ["Motorola", "XOOM", "tablet"], Wingray: ["Motorola", "XOOM", "tablet"], maguro: ["Samsung", "Galaxy Nexus"], Maguro: ["Samsung", "Galaxy Nexus"], "Toro-VZW": ["Samsung", "Galaxy Nexus"], blaze: ["Texas Instruments", "Blaze Tablet", "tablet"], Blaze: ["Texas Instruments", "Blaze Tablet", "tablet"], "Blaze Tablet": ["Texas Instruments", "Blaze Tablet", "tablet"], BlueStacks: ["BlueStacks", "App Player", "desktop"], "youwave custom": ["Youwave", "Android on PC", "desktop"], A100: ["Acer", "Iconia Tab A100", "tablet"], A101: ["Acer", "Iconia Tab A101", "tablet"], A200: ["Acer", "Iconia Tab A200", "tablet"], A500: ["Acer", "Iconia Tab A500", "tablet"], A501: ["Acer", "Iconia Tab A501", "tablet"], A510: ["Acer", "Iconia Tab A510", "tablet"], A511: ["Acer", "Iconia Tab A511", "tablet"], A700: ["Acer", "Iconia Tab A700", "tablet"], "Acer A800": ["Acer", "Iconia Tab A800", "tablet"], E110: ["Acer", "beTouch E110"], E120: ["Acer", "beTouch E120"], E130: ["Acer", "beTouch E130"], E140: ["Acer", "beTouch E140"], E210: ["Acer", "beTouch E210"], E310: ["Acer", "Liquid mini"], E320: ["Acer", "Liquid Express"], E330: ["Acer", "Liquid Glow"], E400: ["Acer", "beTouch E400"], G100W: ["Acer", "G100W"], S100: ["Acer", "Liquid"], S110: ["Acer", "Stream"], S120: ["Acer", "Liquid mt"], S300: ["Acer", "Iconia Smart"], S500: ["Acer", "CloudMobile"], TD600: ["Acer", "beTouch TD600"], Liquid: ["Acer", "Liquid"], "Liquid E": ["Acer", "Liquid E"], "Liquid Mt": ["Acer", "Liquid mt"], "Liquid MT": ["Acer", "Liquid mt"], "Liquid Metal": ["Acer", "Liquid mt"], Stream: ["Acer", "Stream"], N700: ["aigo", "N700", "tablet"], M801: ["aigo", "M801", "tablet"], Novo7: ["Ainovo", "Novo7", "tablet"], "Novo7 Aurora": ["Ainovo", "Novo7 Aurora", "tablet"], "Novo7 Advanced": ["Ainovo", "Novo7 Advanced", "tablet"], "Novo7 Advanced2": ["Ainovo", "Novo7 Advanced 2", "tablet"], "Novo7 Basic": ["Ainovo", "Novo7 Basic", "tablet"], "Novo7 ELF": ["Ainovo", "Novo7 Elf", "tablet"], "Novo7 PALADIN": ["Ainovo", "Novo7 Paladin", "tablet"], "Novo8 Advanced": ["Ainovo", "Novo8 Advanced", "tablet"], "one touch 890": ["Alcatel", "One Touch 890"], "one touch 890D": ["Alcatel", "One Touch 890"], "one touch 891": ["Alcatel", "One Touch 891"], "ONE TOUCH 903": ["Alcatel", "One Touch 903SHV-E170K"], "one touch 906": ["Alcatel", "One Touch 906"], "one touch 908": ["Alcatel", "One Touch 908"], "one touch 908F": ["Alcatel", "One Touch 908"], "one touch 908S": ["Alcatel", "One Touch 908"], "one touch 910": ["Alcatel", "One Touch 910"], "one touch 918": ["Alcatel", "One Touch 918"], "one touch 918D": ["Alcatel", "One Touch 918"], "ONE TOUCH 918D": ["Alcatel", "One Touch 918"], "one touch 918M": ["Alcatel", "One Touch 918"], "one touch 918N": ["Alcatel", "One Touch 918"], "one touch 980": ["Alcatel", "One Touch 980"], "one touch 980A": ["Alcatel", "One Touch 980"], "one touch 981A": ["Alcatel", "One Touch 981"], "one touch 986": ["Alcatel", "One Touch 986"], "one touch 990": ["Alcatel", "One Touch 990"], "one touch 990A": ["Alcatel", "One Touch 990"], "one touch 991": ["Alcatel", "One Touch 991"], "one touch 991D": ["Alcatel", "One Touch 991"], "ONE TOUCH 993": ["Alcatel", "One Touch 993"], "one touch 995": ["Alcatel", "One Touch 995"], "Telenor OneTouch": ["Alcatel", "One Touch 990"], "OT 918": ["Alcatel", "One Touch 918"], Venture: ["Alcatel", "Venture"], "Allwinner A10": ["AllWinner", "A10", "tablet"], "97FC": ["AllWinner", "A10 97FC", "tablet"], "Kindle Fire": ["Amazon", "Kindle Fire", "tablet"], "Amazon Kindle Fire": ["Amazon", "Kindle Fire", "tablet"], AMD120: ["AnyDATA", "AnyTAB AMD120", "tablet"], MW0811: ["AOC", "Breeze MW0811", "tablet"], "MW0821 V2.0": ["AOC", "Breeze MW0821", "tablet"], MW0922: ["AOC", "Breeze MW0922", "tablet"], "Apanda A60": ["Apanda", "A60"], "apanda-A60": ["Apanda", "A60"], A80KSC: ["Archos", "Arnova 8", "tablet"], AN7CG2: ["Archos", "Arnova 7", "tablet"], A101B: ["Archos", "Arnova 10", "tablet"], AN10BG2DT: ["Archos", "Arnova 10 B", "tablet"], AN10G2: ["Archos", "Arnova 10 G2", "tablet"], A32: ["Archos", "32", "media"], A35DE: ["Archos", "35 Smart Home Phone"], A43: ["Archos", "43", "media"], Archos5: ["Archos", "5", "media"], A70H: ["Archos", "7", "tablet"], A70HB: ["Archos", "7", "tablet"], A70BHT: ["Archos", "7", "tablet"], A70CHT: ["Archos", "7C", "tablet"], A70S: ["Archos", "70", "tablet"], A7EB: ["Archos", "70B", "tablet"], "ARCHOS 70it2": ["Archos", "70 IT 2", "tablet"], "ARCHOS 80G9": ["Archos", "80 G9", "tablet"], "ARCHOS 101G9": ["Archos", "101 G9", "tablet"], A101IT: ["Archos", "101 IT", "tablet"], ASTRI: ["ASTRI", "e-reader", "ereader"], eeepc: ["Asus", "Eee Pc"], "asus laptop": ["Asus", "Eee Pc"], ME171: ["Asus", "Eee Pad MeMO", "tablet"], "Slider SL101": ["Asus", "Eee Pad Slider", "tablet"], EPAD: ["Asus", "Eee Pad Transformer", "tablet"], TF101: ["Asus", "Eee Pad Transformer", "tablet"], "Transformer TF101": ["Asus", "Eee Pad Transformer", "tablet"], "Transformer TF101G": ["Asus", "Eee Pad Transformer", "tablet"], TF201: ["Asus", "Eee Pad Transformer Prime", "tablet"], "Transformer Prime TF201": ["Asus", "Eee Pad Transformer Prime", "tablet"], "Transformer Prime": ["Asus", "Eee Pad Transformer Prime", "tablet"], "Transformer Pad TF300T": ["Asus", "Transformer Pad 300", "tablet"], "ASUS Transformer TF300T": ["Asus", "Transformer Pad 300", "tablet"], "ASUS Transformer Pad TF300T": ["Asus", "Transformer Pad 300", "tablet"], "ASUS Transformer Pad TF300TG": ["Asus", "Transformer Pad 300", "tablet"], "ASUS Transformer Pad TF700T": ["Asus", "Transformer Pad Infinity 700", "tablet"], "ASUS Transformer Pad TF700K": ["Asus", "Transformer Pad Infinity 700", "tablet"], "ASUS Transformer TF700K": ["Asus", "Transformer Pad Infinity 700", "tablet"], PadFone: ["Asus", "Padfone", "tablet"], "OMS TTD": ["Asus", "Eee Pc T10"], "ASUS T20": ["Asus", "Eee Pc T20"], ETBW11AA: ["Asus", "Tough"], "AUX V900": ["AUX", "V900"], M910A: ["AUX", "M910"], "PICOpad-QGN": ["Axioo", "Picopad QGN", "tablet"], NOOK: ["Barnes & Noble", "NOOK", "ereader"], NookColor: ["Barnes & Noble", "NOOK Color", "ereader"], "NOOK BNRV200": ["Barnes & Noble", "NOOK Color", "ereader"], "NOOK BNRV300": ["Barnes & Noble", "NOOK Color", "ereader"], NookTablet: ["Barnes & Noble", "NOOK Tablet", "ereader"], "Nook Tablet": ["Barnes & Noble", "NOOK Tablet", "ereader"], "NOOK BNTV250": ["Barnes & Noble", "NOOK Tablet", "ereader"], "NOOK BNTV250A": ["Barnes & Noble", "NOOK Tablet", "ereader"], BNTV250: ["Barnes & Noble", "NOOK Tablet", "ereader"], BNTV250A: ["Barnes & Noble", "NOOK Tablet", "ereader"], "NOOK Slate": ["Barnes & Noble", "NOOK Tablet", "ereader"], "BenWee 5100": ["BenWee", "5100"], CA907AAC0G: ["Besta", "CA907AAC0G"], BM999: ["Bmorn", "BM999", "tablet"], V11: ["Bmorn", "V11", "tablet"], V99: ["Bmorn", "V99", "tablet"], "bq DaVinci": ["bq", "DaVinci", "tablet"], CT704: ["Carrefour", "CT704", "tablet"], CT1002: ["Carrefour", "CT1002", "tablet"], "Camangi-Mangrove7": ["Camangi", "Mangrove 7", "tablet"], WS171: ["Camangi", "WebStation", "tablet"], IS11CA: ["Casio", "GzOne IS11CA"], C771: ["Casio", "GzOne Commando"], "CAT NOVA": ["Cat", "NOVA", "tablet"], ARMM3V: ["chinaleap", "ARMM3V", "tablet"], "CIUS-7": ["Cisco", "Cius", "tablet"], "CIUS-7-AT": ["Cisco", "Cius", "tablet"], "CSL Spice MI300": ["CSL", "Spice MI300"], "CSL-MI410": ["CSL", "Spice MI410"], MID1024: ["Coby", "Kyros MID1024", "tablet"], MID1125: ["Coby", "Kyros MID1125", "tablet"], MID1126: ["Coby", "Kyros MID1126", "tablet"], MID7010: ["Coby", "Kyros MID7010", "tablet"], MID7012: ["Coby", "Kyros MID7012", "tablet"], MID7015: ["Coby", "Kyros MID7015", "tablet"], MID7015A: ["Coby", "Kyros MID7015", "tablet"], MID7016: ["Coby", "Kyros MID7016", "tablet"], MID7020: ["Coby", "Kyros MID7020", "tablet"], MID7022: ["Coby", "Kyros MID7022", "tablet"], MID7024: ["Coby", "Kyros MID7024", "tablet"], MID7025: ["Coby", "Kyros MID7025", "tablet"], MID7127: ["Coby", "Kyros MID7127", "tablet"], MID8024: ["Coby", "Kyros MID8024", "tablet"], MID8125: ["Coby", "Kyros MID8125", "tablet"], MID8127: ["Coby", "Kyros MID8127", "tablet"], Z71: ["Commtiva", "Z71"], "V-T100": ["Commtiva", "V-T100"], "FIH-FB0": ["Commtiva", "HD700"], "Coolpad D510": ["Coolpad", "D510"], "Coolpad 8020": ["Coolpad", "8020"], D530: ["Coolpad", "D530"], "Coolpad D530": ["Coolpad", "D530"], D539: ["Coolpad", "D539"], "Coolpad D539": ["Coolpad", "D539"], E239: ["Coolpad", "E239"], "Coolpad E239": ["Coolpad", "E239"], "Coolpad N930": ["Coolpad", "N930"], N930: ["Coolpad", "N930"], "Coolpad W706": ["Coolpad", "W706"], "Coolpad W706+": ["Coolpad", "W706"], "Coolpad W708": ["Coolpad", "W708"], W711: ["Coolpad", "W711"], "Coolpad 5010": ["Coolpad", "5010"], "Coolpad 5210": ["Coolpad", "5210"], "Coolpad 5820": ["Coolpad", "5820"], 5832: ["Coolpad", "5832"], "Coolpad 5832": ["Coolpad", "5832"], 5855: ["Coolpad", "5855"], "Coolpad 5860": ["Coolpad", "5860"], "Coolpad 5860+": ["Coolpad", "5860"], "Coolpad 5860s": ["Coolpad", "5860"], 5860: ["Coolpad", "5860"], "5860A": ["Coolpad", "5860"], "Coolpad 5870": ["Coolpad", "5870"], 5870: ["Coolpad", "5870"], "Coolpad 7005": ["Coolpad", "7005"], 7260: ["Coolpad", "7260"], "Coolpad 7019": ["Coolpad", "7019"], "Coolpad 7260": ["Coolpad", "7260"], "Coolpad 8013": ["Coolpad", "8013"], "Coolpad 8809": ["Coolpad", "8809"], "Coolpad 8810": ["Coolpad", "8810"], 8810: ["Coolpad", "8810"], 8150: ["Coolpad", "8150"], "Coolpad 8150D": ["Coolpad", "8150"], "Coolpad 8811": ["Coolpad", "8811"], "Coolpad 9900": ["Coolpad", "9900"], "Coolpad 8050": ["Coolpad", "8050"], ZiiO7: ["Creative", "ZiiO 7", "tablet"], "ZiiLABS ZiiO7": ["Creative", "ZiiO 7", "tablet"], "ZiiLABS ZiiO10 ": ["Creative", "ZiiO 10", "tablet"], "CUBE K8GT A": ["Cube", "K8GT A", "tablet"], "CUBE K8GT B": ["Cube", "K8GT B", "tablet"], "K8GT C": ["Cube", "K8GT C", "tablet"], "K8GT H": ["Cube", "K8GT H", "tablet"], "CUBE K8GT H": ["Cube", "K8GT H", "tablet"], "K8GT W": ["Cube", "K8GT W", "tablet"], "CUBE U8GT": ["Cube", "U8GT", "tablet"], "CUBE U9GT": ["Cube", "U9GT", "tablet"], "CUBE U9GT 2": ["Cube", "U9GT 2", "tablet"], "Cube U9GT2": ["Cube", "U9GT 2", "tablet"], U9GT: ["Cube", "U9GT", "tablet"], "U9GT2 From moage.com": ["Cube", "U9GT 2", "tablet"], "N90 From moage.com": ["Cube", "U9GT 2", "tablet"], "U9GT S": ["Cube", "U9GT S", "tablet"], "U9GT S A": ["Cube", "U9GT SA", "tablet"], "U9GTS A": ["Cube", "U9GT SA", "tablet"], "U10GT 2": ["Cube", "U10GT 2", "tablet"], "U10GT S": ["Cube", "U10GT S", "tablet"], "U30GT-H": ["Cube", "U30GT H", "tablet"], "CUBE Q7PRO": ["Cube", "Q7 Pro", "tablet"], "CUBE Q7PRO J": ["Cube", "Q7 Pro", "tablet"], "Cydle M7 (v0005.04.03.12.ko)": ["Cydle", "M7 MultiPAD", "tablet"], "Dell Aero": ["Dell", "Aero"], "Dell M01M": ["Dell", "Mini 5", "tablet"], "Dell Streak": ["Dell", "Streak", "tablet"], "001DL": ["Dell", "Streak", "tablet"], "101DL": ["Dell", "Streak Pro", "tablet"], GS01: ["Dell", "Streak Pro", "tablet"], "Dell Streak Pro": ["Dell", "Streak Pro", "tablet"], streak7: ["Dell", "Streak 7", "tablet"], "Dell Streak 7": ["Dell", "Streak 7", "tablet"], "Dell Streak 10 Pro": ["Dell", "Streak 10 Pro", "tablet"], "Dell V04B": ["Dell", "Streak V04B", "tablet"], "Dell Venue": ["Dell", "Venue"], "Dell XCD35": ["Dell", "XCD35"], XCD35: ["Dell", "XCD35"], iDx7: ["Digma", "iDx7", "tablet"], iDx10: ["Digma", "iDx10", "tablet"], "iDx10 3G": ["Digma", "iDx10", "tablet"], DM009SH: ["Disney Mobile", "DM009SH"], DM010SH: ["Disney Mobile", "DM010SH"], DM012SH: ["Disney Mobile", "DM012SH"], "F-08D": ["Disney Mobile", "F-08D"], "P-05D": ["Disney Mobile", "P-05D"], "Tablet-P27": ["DracoTek", "P27 Tablet", "tablet"], edgejr: ["EnTourage", "Pocket eDGe", "tablet"], l97D: ["EPad", "l97D", "tablet"], M4301: ["Eston", "MID M4301", "media"], P10AN: ["Exper", "Easypad P10AN", "tablet"], "FIH-F0X": ["FIH", "F0X"], "Fly IQ260": ["Fly", "IQ260 BlackBird"], ISW11F: ["Fujitsu", "Arrows Z"], ISW13F: ["Fujitsu", "Arrows Z"], IS12F: ["Fujitsu", "Arrows ES"], "F-01D": ["Fujitsu", "Arrows Tab LTE", "tablet"], "F-03D": ["Fujitsu", "Arrows Kiss"], "F-05D": ["Fujitsu", "Arrows X LTE"], "F-07D": ["Fujitsu", "Arrows Ã�Â¼"], "F-10D": ["Fujitsu", "Arrows X F-10D"], "F-12C": ["Fujitsu", "Globetrotter"], f12arc: ["Fujitsu", "F12arc"], M532: ["Fujitsu", "Stylistic M532", "tablet"], Garminfone: ["Garmin-Asus", "Garminfone"], "Garmin-Asus A10": ["Garmin-Asus", "Nuvifone A10"], "Garmin-Asus A50": ["Garmin-Asus", "Nuvifone A50"], TPA60W: ["Gateway", "TPA60W", "tablet"], "Geeksphone ZERO": ["Geeksphone", "ZERO"], "gemei G2": ["Gemei", "G2", "tablet"], "Gemei G2": ["Gemei", "G2", "tablet"], "gemei G3": ["Gemei", "G3", "tablet"], "Gemei G9": ["Gemei", "G9", "tablet"], "GSmart G1317D": ["Gigabyte", "GSmart G1317D"], "Gigabyte TB100": ["Gigabyte", "TB100", "tablet"], GN100: ["Gionee", "GN100"], GN105: ["Gionee", "GN105"], GN106: ["Gionee", "GN106"], GN200: ["Gionee", "GN200"], GN205: ["Gionee", "GN205"], GN700W: ["Gionee", "GN700W"], GN708W: ["Gionee", "GN708W"], "Google Ion": ["Google", "Ion"], "Nexus One": ["Google", "Nexus One"], NexusOne: ["Google", "Nexus One"], "HTC Nexus One": ["Google", "Nexus One"], "Nexus S": ["Google", "Nexus S"], "Google Nexus S": ["Google", "Nexus S"], "Nexus S 4G": ["Google", "Nexus S 4G"], "Dooderbutt-4.0.3-v1": ["Google", "Nexus S 4G"], "Nexus 7": ["Google", "Nexus 7", "tablet"], "Haier HW-W910": ["Haier", "HW-W910"], SN10T1: ["HANNspree", "HANNSpad SN10T1", "tablet"], SN10T2: ["HANNspree", "HANNSpad SN10T2", "tablet"], HannsComb: ["HANNspree", "HANNSpad", "tablet"], X1: ["HCL", "ME X1", "tablet"], "MID Serails": ["Herotab", "C8", "tablet"], "MID Serials": ["Herotab", "C8", "tablet"], "COSMO DUO": ["Hiscreen", "Cosmo DUO", "tablet"], "HS-U8": ["Hisense", "U8"], "HS-T92": ["Hisense", "T92"], "HS-E860": ["Hisense", "E860"], "HS-E910": ["Hisense", "E910"], "HS-E926": ["Hisense", "E926"], "HS-EG900": ["Hisense", "EG900"], "HS-ET919": ["Hisense", "ET919"], EG968B: ["Hisense", "EG968B"], "HKPHONE H8-3G": ["HKPhone", "H8 3G"], "HOSIN U2": ["Hosin", "U2"], Touchpad: ["HP", "TouchPad", "tablet"], "HP Touchpad": ["HP", "TouchPad", "tablet"], "cm tenderloin": ["HP", "TouchPad", "tablet"], "aokp tenderloin": ["HP", "TouchPad", "tablet"], "HTC Amaze 4G": ["HTC", "Amaze 4G"], "HTC Ruby": ["HTC", "Amaze 4G"], "HTC Amaze 4G(Ruby)": ["HTC", "Amaze 4G"], "Amaze 4G": ["HTC", "Amaze 4G"], "HTC Aria": ["HTC", "Aria"], "HTC Aria A6380": ["HTC", "Aria"], "HTC Liberty A6380": ["HTC", "Aria"], "HTC Liberty": ["HTC", "Aria"], "HTC A6366": ["HTC", "Aria"], "HTC Bee": ["HTC", "Bee"], "HTC ChaCha": ["HTC", "ChaCha"], "HTC ChaCha A810e": ["HTC", "ChaCha"], "HTC ChaChaCha A810e": ["HTC", "ChaCha"], "HTC A810e": ["HTC", "ChaCha"], "HTC A9188": ["HTC", "Tianxi"], "HTC Bravo": ["HTC", "Desire"], "HTC Desire": ["HTC", "Desire"], "HTC Desire A8181": ["HTC", "Desire"], "HTC Desire A8183": ["HTC", "Desire"], "HTC Desire Beats A8181": ["HTC", "Desire"], "HTC Desire CDMA": ["HTC", "Desire"], "HTC Desire SMS": ["HTC", "Desire"], "HTC Desire S.M.S": ["HTC", "Desire"], "HTC Desire C": ["HTC", "Desire C"], "HTC DesireHD": ["HTC", "Desire HD"], "HTC DesireHD A9191": ["HTC", "Desire HD"], "HTC DesireHD A9192": ["HTC", "Desire HD"], "HTC Desire HD A9191": ["HTC", "Desire HD"], "HTC A9191": ["HTC", "Desire HD"], "HTC A9191 for AT&T": ["HTC", "Desire HD"], "HTC A9192": ["HTC", "Desire HD"], "HTC Desire HD": ["HTC", "Desire HD"], "HTC Desire HD with Beats Audio": ["HTC", "Desire HD"], "HTC Desire S": ["HTC", "Desire S"], "HTC DesireS": ["HTC", "Desire S"], "HTC DesiresS": ["HTC", "Desire S"], "HTC DesireS S510e": ["HTC", "Desire S"], "HTC DesireS S510b": ["HTC", "Desire S"], "HTC Desire S S510e": ["HTC", "Desire S"], "HTC S510e": ["HTC", "Desire S"], "HTC Desire Saga": ["HTC", "Desire S"], "HTC Desire V": ["HTC", "Desire V"], "HTC T328w": ["HTC", "Desire V"], "HTC Desire VC": ["HTC", "Desire VC"], "HTC T328d": ["HTC", "Desire VC"], "HTC T328t": ["HTC", "Desire VT"], "HTC Desire Z": ["HTC", "Desire Z"], "HTC DesireZ": ["HTC", "Desire Z"], "HTC DesireZ A7272": ["HTC", "Desire Z"], "HTC Desire Z A7272": ["HTC", "Desire Z"], "HTC Vision": ["HTC", "Desire Z"], "HTC A7275": ["HTC", "Desire Z"], "HTC Dream": ["HTC", "Dream"], "HTC S710d": ["HTC", "Droid Incredible 2"], "HTC Incredible 2": ["HTC", "Droid Incredible 2"], "HTC X515d": ["HTC", "EVO 3D"], "HTC X515m": ["HTC", "EVO 3D"], "HTC X515C": ["HTC", "EVO 3D"], "HTC Evo 3D": ["HTC", "EVO 3D"], "HTC EVO 3D": ["HTC", "EVO 3D"], "HTC EVO 3D GSM": ["HTC", "EVO 3D"], "HTC EVO 3D X515a": ["HTC", "EVO 3D"], "HTC EVO 3D GSM X515m": ["HTC", "EVO 3D"], "HTC EVO 3D X515m": ["HTC", "EVO 3D"], "HTC EVO 3D X515M": ["HTC", "EVO 3D"], "HTC EVO3D X515a": ["HTC", "EVO 3D"], "HTC EVO3D X515m": ["HTC", "EVO 3D"], "HTC Evo 3D X515m": ["HTC", "EVO 3D"], "HTC Evo 3D with Beats Audio X515m": ["HTC", "EVO 3D"], "HTC Evo 4G": ["HTC", "EVO 4G"], "HTC EVO 4G": ["HTC", "EVO 4G"], "HTC X515E": ["HTC", "EVO 4G+"], "HTC EVO 4G+ For Sprint": ["HTC", "EVO 4G+"], "HTC EVO 4G++ For Sprint": ["HTC", "EVO 4G+"], "HTC C715c": ["HTC", "EVO Design 4G"], "HTC Design 4G": ["HTC", "EVO Design 4G"], "HTC EVO design 4G": ["HTC", "EVO Design 4G"], "HTC EVO Design 4G": ["HTC", "EVO Design 4G"], "HTC Evo Shift": ["HTC", "EVO Shift"], "HTC EVO Shift 4G": ["HTC", "EVO Shift"], "HTC A310e": ["HTC", "Explorer"], "HTC Explorer": ["HTC", "Explorer"], "HTC Explorer A310b": ["HTC", "Explorer"], "HTC Explorer A310e": ["HTC", "Explorer"], "HTC P510e": ["HTC", "Flyer", "tablet"], "HTC Flyer": ["HTC", "Flyer", "tablet"], "HTC Flyer P510e": ["HTC", "Flyer", "tablet"], "HTC Flyer P512": ["HTC", "Flyer", "tablet"], "HTC Flyer P512 NA": ["HTC", "Flyer", "tablet"], "HTC P515E": ["HTC", "Flyer 4G", "tablet"], "HTC Gratia A6380": ["HTC", "Gratia"], "HTC HD": ["HTC", "HD"], "HTC HD2": ["HTC", "HD2"], "HTC HD2 T8585": ["HTC", "HD2"], "HTC HD2(Leo)": ["HTC", "HD2"], "HTC HD7": ["HTC", "HD7"], "HTC T9299+": ["HTC", "HD7"], "HTC HD7 for Sprint": ["HTC", "HD7"], "HTC HD7 4G T9299 For AT&T": ["HTC", "HD7"], "HTC HD7 4G T9299+ For AT&T": ["HTC", "HD7"], "HTC T9299+ For AT&T": ["HTC", "HD7"], "HTC HD7S T9399+": ["HTC", "HD7s"], "HTC HD7S T9899+": ["HTC", "HD7s"], "HTC T9899+ For AT&T": ["HTC", "HD7s"], "VitMod ExtraLite 1.6.5.fullodex for HTC HD7 Pro": ["HTC", "HD7 Pro"], "HTC Hero": ["HTC", "Hero"], "HTC HERO": ["HTC", "Hero"], "HTC Hero CDMA": ["HTC", "Hero"], "HTC HERO CDMA": ["HTC", "Hero"], "HTC HERO200": ["HTC", "Hero 200"], "HTC Hero S": ["HTC", "Hero S"], "HTC IMAGIO": ["HTC", "Imagio"], "HTC Incredible": ["HTC", "Incredible"], "HTC Incredible S710E": ["HTC", "Incredible S"], "HTC S710e": ["HTC", "Incredible S"], "HTC Incredible S": ["HTC", "Incredible S"], "HTC Incredible S S710e": ["HTC", "Incredible S"], "HTC Incredible S s710e": ["HTC", "Incredible S"], "HTC IncredibleS S710e": ["HTC", "Incredible S"], "HTC Incredible S with Beats Audio": ["HTC", "Incredible S"], "HTC Vivo": ["HTC", "Incredible S"], "HTC Innovation": ["HTC", "Innovation"], "HTC Inspire 4G": ["HTC", "Inspire 4G"], "HTC HD7 Inspire 4G For Vodafone": ["HTC", "Inspire 4G"], "HTC P715a": ["HTC", "Jetstream", "tablet"], "HTC Legend": ["HTC", "Legend"], "HTC Magic": ["HTC", "Magic"], "HTC Sapphire": ["HTC", "Magic"], "HTC Lexikon": ["HTC", "Merge"], "HTC One S": ["HTC", "One S"], "HTC Z520e": ["HTC", "One S"], "HTC One V": ["HTC", "One V"], "HTC T320e": ["HTC", "One V"], "HTC One X": ["HTC", "One X"], "HTC S720e": ["HTC", "One X"], "HTC Endeavour-LS": ["HTC", "One X"], "HTC One XL": ["HTC", "One XL"], "HTC X710a": ["HTC", "Raider 4G"], "HTC Raider": ["HTC", "Raider 4G"], "HTC Raider X710e": ["HTC", "Raider 4G"], "HTC Raider X710s": ["HTC", "Raider 4G"], "HTC Raider 4G X710e": ["HTC", "Raider 4G"], "HTC PH39100": ["HTC", "Raider 4G"], "HTC Holiday": ["HTC", "Raider 4G"], "HTC Velocity 4G X710s": ["HTC", "Raider 4G"], "HTC Rezound": ["HTC", "Rezound"], "HTC Rhyme S510b": ["HTC", "Rhyme"], "HTC S510b": ["HTC", "Rhyme"], "HTC Bliss": ["HTC", "Rhyme"], "HTC Bliss S510b": ["HTC", "Rhyme"], "HTC Salsa C510e": ["HTC", "Salsa"], "HTC C510e": ["HTC", "Salsa"], "HTC Z710a": ["HTC", "Sensation"], "HTC Z710e": ["HTC", "Sensation"], "HTC Z710t": ["HTC", "Sensation"], "HTC Sensation": ["HTC", "Sensation"], "HTC Sensation Z710": ["HTC", "Sensation"], "HTC Sensation Z710a": ["HTC", "Sensation"], "HTC Sensation Z710e": ["HTC", "Sensation"], "HTC Sensation Z710E": ["HTC", "Sensation"], "HTC Sensation Z710e For AT&T": ["HTC", "Sensation"], "HTC Sensation Z710e with Beats Audio": ["HTC", "Sensation"], "HTC Sensation with Beats Audio Z710e": ["HTC", "Sensation"], "HTC Sensation with Beats Audio": ["HTC", "Sensation"], "HTC Sensation Taste": ["HTC", "Sensation"], "HTC Pyramid": ["HTC", "Sensation"], "HTC Pyramid Z710a": ["HTC", "Sensation"], "HTC Pyramid Z710e": ["HTC", "Sensation"], "HTC Sensation 4G": ["HTC", "Sensation"], "HTC Sensation 4G with Beats Audio": ["HTC", "Sensation"], "HTC Sensation G14": ["HTC", "Sensation"], "HTC Sensation G14 for AT&T": ["HTC", "Sensation"], "HTC G14 sensation": ["HTC", "Sensation"], "HTC Z715e": ["HTC", "Sensation XE"], "HTC Sensation Z715e": ["HTC", "Sensation XE"], "HTC SensationXE Beats": ["HTC", "Sensation XE"], "HTC SensationXE Beats Z715a": ["HTC", "Sensation XE"], "HTC SensationXE Beats Z715e": ["HTC", "Sensation XE"], "HTC Sensation XE": ["HTC", "Sensation XE"], "HTC Sensation XE Z715e": ["HTC", "Sensation XE"], "HTC SensationXE Z715e": ["HTC", "Sensation XE"], "HTC Sensation XE Beats": ["HTC", "Sensation XE"], "HTC SensationXE with Beats Audio": ["HTC", "Sensation XE"], "HTC Sensation XE with Beats Audio": ["HTC", "Sensation XE"], "HTC Sensation XE with Beats Audio Z715a": ["HTC", "Sensation XE"], "HTC Sensation Juredroid XE Beats Audio": ["HTC", "Sensation XE"], "HTC Sensation XE with Beats Audio Z715e": ["HTC", "Sensation XE"], "HTC Sensation XE With Beats Audio Z715e": ["HTC", "Sensation XE"], "HTC Sensation 4G XE with Beats Audio": ["HTC", "Sensation XE"], "HTC Sensation with Beats Audio Z715e": ["HTC", "Sensation XE"], "HTC X315E": ["HTC", "Sensation XL"], "HTC SensationXL Beats X315b": ["HTC", "Sensation XL"], "HTC SensationXL Beats X315e": ["HTC", "Sensation XL"], "HTC Sensation XL with Beats Audio X315b": ["HTC", "Sensation XL"], "HTC Sensation XL with Beats Audio X315e": ["HTC", "Sensation XL"], "HTC Runnymede": ["HTC", "Sensation XL"], "HTC G21": ["HTC", "Sensation XL"], "HTC PH06130": ["HTC", "Status"], "HTC Status": ["HTC", "Status"], "HTC Tattoo": ["HTC", "Tattoo"], "HTC TATTOO A3288": ["HTC", "Tattoo"], "HTC click": ["HTC", "Tattoo"], "HTC X310e": ["HTC", "Titan"], "HTC T7373": ["HTC", "Touch Pro II"], "HTC ThunderBolt": ["HTC", "ThunderBolt"], "HTC Mecha": ["HTC", "ThunderBolt"], "HTC Velocity 4G": ["HTC", "Velocity 4G"], "HTC Wildfire": ["HTC", "Wildfire"], "HTC Wildfire A3333": ["HTC", "Wildfire"], "HTC A3366": ["HTC", "Wildfire"], "HTC A3380": ["HTC", "Wildfire"], "HTC WildfireS": ["HTC", "Wildfire S"], "HTC Wildfire S": ["HTC", "Wildfire S"], "Htc Wildfire s": ["HTC", "Wildfire S"], "HTC Wildfire S A510e": ["HTC", "Wildfire S"], "HTC Wildfire S A510b": ["HTC", "Wildfire S"], "HTC WildfireS A510e": ["HTC", "Wildfire S"], "HTC WildfireS A510b": ["HTC", "Wildfire S"], "htc wildfire s a510e": ["HTC", "Wildfire S"], "HTC Wildfire S A515c": ["HTC", "Wildfire S"], "HTC A510a": ["HTC", "Wildfire S"], "HTC A510e": ["HTC", "Wildfire S"], "HTC A510c": ["HTC", "Wildfire S"], HTCX06HT: ["HTC", "Desire"], "HTC A6390": ["HTC", "A6390"], "HTC A8180": ["HTC", "A8180"], "HTC PG762": ["HTC", "PG762"], "HTC S715e": ["HTC", "S715e"], "HTC S720t": ["HTC", "S720t"], "HTC Z510d": ["HTC", "Z510d"], "HTC Z560e": ["HTC", "Z560e"], "HTC VLE U": ["HTC", "One S"], "HTC VLE#U": ["HTC", "One S"], "HTC VIE U": ["HTC", "One S"], "HTC EVA UL": ["HTC", "One V"], "HTC ENR U": ["HTC", "One X"], "ENR U": ["HTC", "One X"], EndeavorU: ["HTC", "One X"], Liberty: ["HTC", "Aria"], Desire: ["HTC", "Desire"], "Desire A8181": ["HTC", "Desire"], "desire hd": ["HTC", "Desire HD"], "Desire HD": ["HTC", "Desire HD"], "Dedire HD": ["HTC", "Desire HD"], "Desire Hd (ace)": ["HTC", "Desire HD"], "Desire S": ["HTC", "Desire S"], DesireS: ["HTC", "Desire S"], "Desire Saga": ["HTC", "Desire S"], "Desire Z": ["HTC", "Desire Z"], Dream: ["HTC", "Dream"], "Droid Incredible": ["HTC", "Droid Incredible"], EVO: ["HTC", "EVO"], "Evo HD2": ["HTC", "EVO HD"], "Evo 3D Beats X515m": ["HTC", "EVO 3D"], "Evo 3D GSM": ["HTC", "EVO 3D"], "EVO 3D X515m": ["HTC", "EVO 3D"], "EVO3D X515m": ["HTC", "EVO 3D"], "Evo 4G": ["HTC", "EVO 4G"], "EVO 4G": ["HTC", "EVO 4G"], photon: ["HTC", "HD mini"], "GinDream/GinMagic": ["HTC", "Dream"], HD2: ["HTC", "HD2"], "HD7  Pro": ["HTC", "HD7 Pro"], Hero: ["HTC", "Hero"], "HERO CDMA": ["HTC", "Hero"], HERO200: ["HTC", "Hero 200"], Incredible: ["HTC", "Droid Incredible"], "Incredible 2": ["HTC", "Droid Incredible 2"], "Incredible S": ["HTC", "Incredible S"], "IncredibleS S710e": ["HTC", "Incredible S"], IncredibleS: ["HTC", "Incredible S"], "Inspire HD": ["HTC", "Inspire 4G"], "Inspire 4G": ["HTC", "Inspire 4G"], Legend: ["HTC", "Legend"], NexusHD2: ["HTC", "HD2"], "Nexus HD2": ["HTC", "HD2"], "Docomo HT-03A": ["HTC", "Magic"], "MIUI.us Sensation 4G": ["HTC", "Sensation 4G"], "SiRF Dream": ["HTC", "Dream"], Pyramid: ["HTC", "Sensation"], Sensation: ["HTC", "Sensation"], "Sensation Z710e": ["HTC", "Sensation"], "Sensation 4G": ["HTC", "Sensation"], "Sensation 4g": ["HTC", "Sensation"], "TripNiCE Pyramid": ["HTC", "Sensation"], "SensationXE Beats Z715e": ["HTC", "Sensation XE"], "SensationXL Beats X315e": ["HTC", "Sensation XL"], Click: ["HTC", "Tattoo"], Wildfire: ["HTC", "Wildfire"], "Wildfire S": ["HTC", "Wildfire S"], "Wildfire S A510e": ["HTC", "Wildfire S"], "Sprint APX515CKT": ["HTC", "EVO 3D"], "Sprint APA9292KT": ["HTC", "EVO 4G"], "Sprint APA7373KT": ["HTC", "EVO Shift 4G"], "Sprint APC715CKT": ["HTC", "EVO Design 4G"], A3380: ["HTC", "Wildfire"], A6277: ["HTC", "Hero"], a7272: ["HTC", "Desire Z"], "A7272+(HTC DesireZ)": ["HTC", "Desire Z"], S31HT: ["HTC", "Aria"], S710d: ["HTC", "Droid Incredible 2"], S710D: ["HTC", "Droid Incredible 2"], X06HT: ["HTC", "Desire"], "001HT": ["HTC", "Desire HD"], X325a: ["HTC", "One X"], Z520m: ["HTC", "One S"], Z710: ["HTC", "Sensation"], Z710e: ["HTC", "Sensation"], T9199h: ["HTC", "T9199h"], "HTC S610d": ["HTC", "S610d"], ADR6200: ["HTC", "Droid Eris"], ADR6300: ["HTC", "Droid Incredible"], ADR6325VW: ["HTC", "Merge"], ADR6330VW: ["HTC", "Rhyme"], ADR6350: ["HTC", "Droid Incredible 2"], ADR6400L: ["HTC", "Thunderbolt 4G"], "ADR6400L 4G": ["HTC", "Thunderbolt 4G"], "ADR6410LVW 4G": ["HTC", "Fireball"], ADR6425LVW: ["HTC", "Rezound"], "ADR6425LVW 4G": ["HTC", "Rezound"], "Coquettish Red": ["HTC", "Rezound"], PB99400: ["HTC", "Droid Incredible"], pcdadr6350: ["HTC", "Droid Incredible 2"], PC36100: ["HTC", "EVO 4G"], PG06100: ["HTC", "EVO Shift 4G"], PG41200: ["HTC", "EVO View 4G", "tablet"], PG86100: ["HTC", "EVO 3D"], PG8610000: ["HTC", "EVO 3D"], PH44100: ["HTC", "EVO Design 4G"], PJ83100: ["HTC", "One X"], ISW11HT: ["HTC", "EVO 4G"], ISW12HT: ["HTC", "EVO 3D"], ISW13HT: ["HTC", "J"], "USCCADR6275US Carrier ID 45": ["HTC", "Desire"], USCCADR6285US: ["HTC", "Hero S"], "USCCADR6325US Carrier ID 45": ["HTC", "Merge"], MediaPad: ["Huawei", "MediaPad", "tablet"], "Huawei MediaPad": ["Huawei", "MediaPad", "tablet"], "HUAWEI MediaPad": ["Huawei", "MediaPad", "tablet"], "Huawei S7-312u": ["Huawei", "MediaPad", "tablet"], "MediaPad 10 FHD": ["Huawei", "MediaPad", "tablet"], "Huawei C8500": ["Huawei", "C8500"], "Huawei C8500S": ["Huawei", "C8500"], "Huawei C8600": ["Huawei", "C8600"], "Huawei C8650": ["Huawei", "C8650"], "Huawei C8650+": ["Huawei", "C8650"], "Huawei C8800": ["Huawei", "IDEOS X5"], "Huawei C8810": ["Huawei", "Ascend G300"], "Huawei C8812": ["Huawei", "Ascend C8812"], "Huawei C8812E": ["Huawei", "Ascend C8812"], "Huawei C8825D": ["Huawei", "Ascend C8825D"], "Huawei C8860E": ["Huawei", "Honor"], "Huawei M835": ["Huawei", "M835"], "Huawei M860": ["Huawei", "Ascend"], "Huawei M921": ["Huawei", "M921"], "Huawei S8520": ["Huawei", "S8520"], "Huawei S8600": ["Huawei", "S8600"], "Huawei T8300": ["Huawei", "T8300"], "Huawei T8600": ["Huawei", "T8600"], "Huawei T8830": ["Huawei", "T8830"], T8830: ["Huawei", "T8830"], T8620: ["Huawei", "T8620"], "Huawei T8828": ["Huawei", "T8828"], "Huawei U8220": ["Huawei", "U8220"], "Huawei u8500": ["Huawei", "IDEOS X2"], "Huawei U8815": ["Huawei", "Ascend G300"], "Huawei U8825D": ["Huawei", "Ascend G330D"], "Huawei U8850": ["Huawei", "Vision"], "Huawei U8652": ["Huawei", "Sonic"], "Huawei U8800-51": ["Huawei", "IDEOS X5"], "Huawei U8818": ["Huawei", "Ascend G300"], "Huawei U9000": ["Huawei", "Ascend X"], "Huawei IDEOS U8500": ["Huawei", "IDEOS X2"], "Huawei IDEOS U8650": ["Huawei", "Sonic"], "Huawei IDEOS X3": ["Huawei", "IDEOS X3"], "Huawei Ideos X5": ["Huawei", "IDEOS X5"], "Huawei Ideos X5 1.12.9(ret4rt)": ["Huawei", "IDEOS X5"], "Huawei SONIC": ["Huawei", "Sonic"], "Huawei 8100-9": ["Huawei", "U8100"], FUSIONideos: ["Huawei", "IDEOS"], "Gnappo Ideos": ["Huawei", "IDEOS"], Ideos: ["Huawei", "IDEOS"], "IDEOS X5": ["Huawei", "IDEOS X5"], "Ideos S7": ["Huawei", "IDEOS S7", "tablet"], "IDEOS S7": ["Huawei", "IDEOS S7", "tablet"], "IDEOS S7 Slim": ["Huawei", "IDEOS S7", "tablet"], "Huawei S7": ["Huawei", "IDEOS S7", "tablet"], SONIC: ["Huawei", "Sonic"], "Kyivstar Aqua": ["Huawei", "Sonic"], "Lucky Ultra Sonic U8650": ["Huawei", "Sonic"], "Turkcell T20": ["Huawei", "Sonic"], "MTC 950": ["Huawei", "U8160"], "MTC 955": ["Huawei", "Sonic"], "MTC Evo": ["Huawei", "C8500"], "MTC Android": ["Huawei", "U8110"], S31HW: ["Huawei", "Pocket WiFi S"], S41HW: ["Huawei", "Pocket WiFi S II"], "007HW": ["Huawei", "Vision"], UM840: ["Huawei", "Evolution"], M860: ["Huawei", "Ascend"], M865: ["Huawei", "Ascend II"], M886: ["Huawei", "Glory"], C8150: ["Huawei", "IDEOS"], c8500: ["Huawei", "C8500"], C8500: ["Huawei", "C8500"], C8500S: ["Huawei", "C8500"], C8600: ["Huawei", "C8600"], c8650: ["Huawei", "C8650"], C8650: ["Huawei", "C8650"], c8800: ["Huawei", "C8800"], C8800: ["Huawei", "C8800"], c8810: ["Huawei", "Ascend G300C"], C8812: ["Huawei", "Ascend C8812"], S8600: ["Huawei", "S8600"], U8100: ["Huawei", "U8100"], U8110: ["Huawei", "U8110"], u8120: ["Huawei", "U8120"], U8120: ["Huawei", "U8120"], U8180: ["Huawei", "IDEOS X1"], U8220: ["Huawei", "Pulse"], U8300: ["Huawei", "U8300"], U8350: ["Huawei", "Boulder"], U8150: ["Huawei", "IDEOS"], U8160: ["Huawei", "U8160"], U8500: ["Huawei", "IDEOS X2"], "U8500 HiQQ": ["Huawei", "U8500 HiQQ Edition"], U8510: ["Huawei", "IDEOS X3"], u8650: ["Huawei", "Sonic"], U8650: ["Huawei", "Sonic"], "U8650-1": ["Huawei", "Sonic"], U8660: ["Huawei", "Sonic"], u8800: ["Huawei", "IDEOS X5"], U8800: ["Huawei", "IDEOS X5"], "U8800+": ["Huawei", "IDEOS X5"], U8800X: ["Huawei", "IDEOS X5"], U8800pro: ["Huawei", "IDEOS X5 Pro"], U8800PRO: ["Huawei", "IDEOS X5 Pro"], U8800Pro: ["Huawei", "IDEOS X5 Pro"], u8800pro: ["Huawei", "IDEOS X5 Pro"], "U8800 Pro": ["Huawei", "IDEOS X5 Pro"], U8818: ["Huawei", "Ascend G300"], U8850: ["Huawei", "Vision"], u8860: ["Huawei", "Honor"], U8860: ["Huawei", "Honor"], U9000: ["Huawei", "Ascend X"], U9200: ["Huawei", "Ascend P1"], "U9200-1": ["Huawei", "Ascend P1"], U9500: ["Huawei", "Ascend D1"], U9501L: ["Huawei", "Ascend D LTE"], U9510: ["Huawei", "Ascend D quad"], U9510E: ["Huawei", "Ascend D quad"], Comet: ["Huawei", "Comet"], GS02: ["Huawei", "Honor"], GS03: ["Huawei", "Ascend P1"], "DroniX-0.5": ["Huawei", "U8180"], "MTS-SP101": ["Huawei", "C8511"], TSP21: ["Huawei", "U8110"], "HYUNDAI H6": ["Hyundai", "Storm H6"], "iBall Slide i7011": ["iBall", "Slide i7011"], "NetTAB RUNE": ["IconBit", "NetTab Rune", "tablet"], D70W: ["Icoo", "D70W", "tablet"], D80: ["Icoo", "D80", "tablet"], "INFOBAR A01": ["iida", "INFOBAR A01"], M009F: ["Infotmic", "M009F"], AZ210A: ["Intel", "AZ210A"], AZ210B: ["Intel", "AZ210B"], AZ510: ["Intel", "AZ510"], greenridge: ["Intel", "Green Ridge", "tablet"], "INQ Cloud Touch": ["INQ", "Cloud Touch"], "ILT-MX100": ["iRiver", "Tab", "tablet"], IVIO_DE38: ["Ivio", "DE38"], "JY-G2": ["Jiayu", "G2"], "JXD S601WIFI": ["JXD", "S601 WIFI", "media"], A2: ["KakaTech", "A2"], D91: ["KK", "D91", "tablet"], K080: ["Kobo", "K080", "ereader"], A106: ["koobee", "A160"], "KPT A9": ["KPT", "A9"], "EV-S100": ["Kttech", "Take EV-S100"], "KM-S120": ["Kttech", "Take 2 KM-S120"], "KM-S200": ["TAKE", "Janus KM-S200"], "KM-S220": ["Kttech", "Take Tachy KM-S220"], "Kyobo mirasol eReader": ["Kyobo", "eReader", "ereader"], ISW11K: ["Kyocera", "Digno"], "JC-KSP8000": ["Kyocera", "Echo"], KSP8000: ["Kyocera", "Echo"], Zio: ["Kyocera", "Zio"], C5155: ["Kyocera", "C5155"], C5170: ["Kyocera", "C5170"], M9300: ["Kyocera", "M9300"], E800: ["K-Touch", "E800"], W606: ["K-Touch", "W606"], "K-Touch T619": ["K-Touch", "T619"], "K-Touch W619": ["K-Touch", "W619"], "K-Touch W650": ["K-Touch", "W650"], W700: ["K-Touch", "W700"], W800: ["K-Touch", "W800"], W806: ["K-Touch", "W806"], W808: ["K-Touch", "W808"], W810: ["K-Touch", "W810"], X900: ["Lava", "XOLO X900"], "Lenovo A798t": ["Lenovo", "A798t"], "LENOVO-Lenovo-A288t": ["Lenovo", "LePhone A288"], "ThinkPad Tablet": ["Lenovo", "ThinkPad Tablet", "tablet"], K1: ["Lenovo", "IdeaPad K1", "tablet"], "Ideapad S10-3T": ["Lenovo", "IdeaPad S10-3T", "tablet"], "S2005A-H": ["Lenovo", "S2005A"], "IdeaTab S2007A-D": ["Lenovo", "IdeaTab S2007A", "tablet"], IdeaTabV2007A: ["Lenovo", "IdeaTab V2007A", "tablet"], "IdeaTabV2007A-D-I": ["Lenovo", "IdeaTab V2007A", "tablet"], IdeaTabV2010A: ["Lenovo", "IdeaTab V2010A", "tablet"], "IdeaTab A2107A-H": ["Lenovo", "IdeaTab V2107A", "tablet"], "A1 07": ["Lenovo", "LePad", "tablet"], "lepad 001b": ["Lenovo", "LePad", "tablet"], "lepad 001n": ["Lenovo", "LePad", "tablet"], "3GC101": ["Lenovo", "LePhone 3GC101"], "Lenovo 3GC101": ["Lenovo", "LePhone 3GC101"], "3GW100": ["Lenovo", "LePhone 3GW100"], "Lenovo 3GW100": ["Lenovo", "LePhone 3GW100"], "3GW101": ["Lenovo", "LePhone 3GW101"], "Lenovo 3GW101": ["Lenovo", "LePhone 3GW101"], "Lephone 3GW101": ["Lenovo", "LePhone 3GW101"], "Lenovo A1-32AB0": ["Lenovo", "LePhone A1-32AB0"], "Lenovo S1-37AH0": ["Lenovo", "LePhone S1-37AH0"], "S1 37AHO": ["Lenovo", "LePhone S1-37AH0"], "Lenovo S2-38AH0": ["Lenovo", "LePhone S2-38AH0"], "Lenovo S2-38AT0": ["Lenovo", "LePhone S2-38AT0"], "Lenovo A288t": ["Lenovo", "LePhone A288"], "Lenovo A366t": ["Lenovo", "LePhone A366"], "Lenovo A390e": ["Lenovo", "LePhone A390"], "Lenovo A500": ["Lenovo", "LePhone A500"], "Lenovo A520": ["Lenovo", "LePhone A520"], "Lenovo A560e": ["Lenovo", "A560"], "Lenovo A668t": ["Lenovo", "LePhone A668"], "Lenovo A698t": ["Lenovo", "LePhone A698"], "Lenovo A750": ["Lenovo", "LePhone A750"], "Lenovo A780": ["Lenovo", "LePhone A780"], "Lenovo A789": ["Lenovo", "LePhone A789"], "Lenovo A790e": ["Lenovo", "LePhone A790"], "Lenovo P70": ["Lenovo", "LePhone P70"], "Lenovo P700": ["Lenovo", "LePhone P700"], "Lenovo S850e": ["Lenovo", "S850"], "Lenovo S880": ["Lenovo", "S880"], "Lenovo K860": ["Lenovo", "K860"], A30t: ["Lenovo", "A30t"], "Lenovo A60": ["Lenovo", "A60"], "Lenovo A65": ["Lenovo", "A65"], "Lenovo A66t": ["Lenovo", "A66t"], "Lenovo A68e": ["Lenovo", "A68e"], "Lenovo K800": ["Lenovo", "K800"], "IDEA TV T100": ["Lenovo", "IDEA TV", "television"], "IDEA TV K91": ["Lenovo", "IDEA TV", "television"], TC970: ["Le Pan", "TC970", "tablet"], LePanII: ["Le Pan", "II", "tablet"], "LG-C555": ["LG", "Optimus Chat"], "LG-C555-parrot": ["LG", "Optimus Chat"], "LG-C660h": ["LG", "Optimus Pro"], "LG-C729": ["LG", "DoublePlay"], "LG-C800G": ["LG", "Eclypse"], "LG-CX670": ["LG", "Optimus 3G"], "LG-E400": ["LG", "Optimus L3"], "LG-E400f": ["LG", "Optimus L3"], "LG-E510": ["LG", "Optimus Hub"], "LG-E510f": ["LG", "Optimus Hub"], "LG-E510g": ["LG", "Optimus Hub"], "LG-E610": ["LG", "Optimus L5"], "LG-E612": ["LG", "Optimus L5"], "LG-E612g": ["LG", "Optimus L5"], "LG-E615F": ["LG", "E615"], "LG-E617G": ["LG", "E617"], "LG-E720": ["LG", "Optimus Chic"], "LG-E720b": ["LG", "Optimus Chic"], "LG-E730": ["LG", "Optimus Sol"], "LG-E970": ["LG", "Shine"], "LG-F100L": ["LG", "Optimus Vu"], "LG-F100S": ["LG", "Optimus Vu"], "LG-F120K": ["LG", "Optimus LTE Tag"], "LG-F120L": ["LG", "Optimus LTE Tag"], "LG-F120S": ["LG", "Optimus LTE Tag"], "LG-F160K": ["LG", "Optimus LTE II"], "LG-F160L": ["LG", "Optimus LTE II"], "LG-F160S": ["LG", "Optimus LTE II"], "LG-F180L": ["LG", "F180L"], "LG-GT540": ["LG", "Optimus"], "LG-GT540f": ["LG", "Optimus"], "LG-GT540 Swift": ["LG", "Optimus"], "LG-GW620": ["LG", "GW620"], "LG-KH5200": ["LG", "Andro-1"], "LG-KU3700": ["LG", "Optimus One"], "LG-KU5400": ["LG", "PRADA 3.0"], "LG-KU5900": ["LG", "Optimus Black"], "LG-L40G": ["LG", "L40G"], "LG-LG855": ["LG", "Marquee"], "LG-LS670": ["LG", "Optimus S"], "LG-LS696": ["LG", "Optimus Elite"], "LG-LS840": ["LG", "Viper 4G"], "LG-LS855": ["LG", "Marquee"], "LG-LS860": ["LG", "'Cayenne'"], "LG-LS970": ["LG", "'Eclipse'"], "LG-LU3000": ["LG", "Optimus Mach"], "LG-LU3100": ["LG", "Optimus Chic"], "LG-LU3700": ["LG", "Optimus One"], "LG-LU5400": ["LG", "PRADA 3.0"], "LG-LU6200": ["LG", "Optimus Q2"], "LG-lu6200": ["LG", "Optimus Q2"], "LG-LU6500": ["LG", "Optimus Note"], "LG-LU6800": ["LG", "Optimus Big"], "LG-LU8300": ["LG", "Optimus Pad LTE"], "LG-LW690": ["LG", "Optimus C"], "LG-LW770": ["LG", "LW770"], "LG-MS690": ["LG", "Optimus M"], "LG-MS770": ["LG", "MS770"], "LG-MS840": ["LG", "Connect 4G"], "LG-MS910": ["LG", "Esteem"], "LG-MS695": ["LG", "Optimus M+"], "LG P350": ["LG", "Optimus Me"], "LG-P350": ["LG", "Optimus Me"], "LG-P350f": ["LG", "Optimus Me"], "LG-P350g": ["LG", "Optimus Me"], "LG-P355": ["LG", "P355"], "LG-P500": ["LG", "Optimus One"], "LG-P500h": ["LG", "Optimus One"], "LG-P500h-parrot": ["LG", "Optimus One"], "LG-P503": ["LG", "Optimus One"], "LG-P504": ["LG", "Optimus One"], "LG-P505": ["LG", "Phoenix"], "LG-P505R": ["LG", "Phoenix"], "LG-P506": ["LG", "Thrive"], "LG-P509": ["LG", "Optimus T"], "LG-P690": ["LG", "Optimus Net"], "LG-P693": ["LG", "P693"], "LG-P698": ["LG", "Optimus Net"], "LG-P698f": ["LG", "Optimus Net"], "LG-P700": ["LG", "Optimus L7"], "LG-P705": ["LG", "Optimus L7"], "LG-P705f": ["LG", "Optimus L7"], "LG-P705g": ["LG", "Optimus L7"], "LG-P708g": ["LG", "P708"], "LG-P720": ["LG", "Optimus Chic"], "LG-P720h": ["LG", "Optimus Chic"], "LG-P725": ["LG", "Optimus 3D Max"], "LG-P760": ["LG", "P760"], "LG-P769": ["LG", "P769"], "LG-P860": ["LG", "P860"], "LG-P870": ["LG", "P870"], "LG-P870F": ["LG", "P870"], "LG-P880": ["LG", "X3"], "LG-P880g": ["LG", "X3"], "LG-P895": ["LG", "P895"], "LG-P920": ["LG", "Optimus 3D"], "LG-P920h": ["LG", "Optimus 3D"], "LG-P925": ["LG", "Thrill"], "LG-P925g": ["LG", "Thrill"], "LG-P930": ["LG", "Nitro HD"], "LG-P936": ["LG", "Optimus LTE"], "LG-P940": ["LG", "PRADA 3.0"], "LG-P970": ["LG", "Optimus Black"], "LG-P970h": ["LG", "Optimus Black"], "LG-P990": ["LG", "Optimus 2X Speed"], "LG-P990h": ["LG", "Optimus 2X Speed"], "LG-P990hN": ["LG", "Optimus 2X Speed"], "LG-P990H": ["LG", "Optimus 2X Speed"], "LG-P993": ["LG", "Optimus 2X"], "LG-SU540": ["LG", "PRADA 3.0"], "LG-SU640": ["LG", "Optimus LTE"], "LG-SU660": ["LG", "Optimus 2X"], "LG-SU760": ["LG", "Optimus 3D"], "LG-SU760-Kust": ["LG", "Optimus 3D"], "LG-SU870": ["LG", "Optimus 3D Cube"], "LG-SU880": ["LG", "Optimus EX"], "LG-US670": ["LG", "Optimus U"], "LG-US730": ["LG", "US730"], "LG-V900": ["LG", "Optimus Pad", "tablet"], "LG-V905R": ["LG", "Optimus G-Slate", "tablet"], "LG-V909": ["LG", "Optimus G-Slate", "tablet"], "LG-VM670": ["LG", "Optimus V"], "LG-VM696": ["LG", "Optimus Elite"], "LG-VM701": ["LG", "Optimus Slider"], "LG-VS660": ["LG", "Vortex"], "LG-VS700": ["LG", "Enlighten"], "LG-VS740": ["LG", "Ally"], "LG-VS840": ["LG", "Connect 4G"], "LG-VS910": ["LG", "Revolution"], "lgp-970": ["LG", "Optimus Black"], E900: ["LG", "Optimus 7"], GT540: ["LG", "Optimus GT540"], GW620: ["LG", "GW620"], KU9500: ["LG", "Optimus Z"], LGC660: ["LG", "Optimus Pro"], LGL45C: ["LG", "Optimus Net"], LGL55C: ["LG", "Optimus Q"], LU2300: ["LG", "Optimus Q"], LS670: ["LG", "Optimus S"], P940: ["LG", "PRADA 3.0"], P990: ["LG", "Optimus 2X Speed"], "USCC-US730": ["LG", "US730"], "USCC-US760": ["LG", "Genesis"], VM670: ["LG", "Optimus V"], "VS840 4G": ["LG", "Connect 4G"], "VS900-4G": ["LG", "VS900"], "VS910 4G": ["LG", "Revolution 4G"], "VS920 4G": ["LG", "Spectrum 4G"], "VS930 4G": ["LG", "VS930"], "VS950 4G": ["LG", "VS950"], "L-01D": ["LG", "Optimus LTE"], "L-02D": ["LG", "PRADA phone"], "L-04C": ["LG", "Optimus Chat"], "L-05D": ["LG", "Optimus it"], "L-06C": ["LG", "Optimus Pad", "tablet"], "L-06D": ["LG", "Optimus Vu"], "L-07C": ["LG", "Optimus Bright"], "LG-Eve": ["LG", "Eve"], "LG-Optimus One P500": ["LG", "Optimus One"], "LG-Optimus 2X": ["LG", "Optimus 2X"], "LG-GT540 Optimus": ["LG", "Optimus"], "LG-Optimus Black": ["LG", "Optimus Black"], Ally: ["LG", "Ally"], Optimus: ["LG", "Optimus"], "Optimus Me": ["LG", "Optimus Me"], "optimus me p350": ["LG", "Optimus Me"], "Optimus 2X": ["LG", "Optimus 2X"], "Optimus 2x": ["LG", "Optimus 2X"], IS11LG: ["LG", "Optimus X"], Vortex: ["LG", "Vortex"], "LDK-ICK v1.4": ["LG", "Esteem"], T6: ["Malata", "Zpad T6", "tablet"], "Malata SMBA1002": ["Malata", "Tablet SMB-A1002", "tablet"], STM712HCZ: ["Mediacom", "SmartPad 712c", "tablet"], STM803HC: ["Mediacom", "SmartPad 810c", "tablet"], "Mediacom 810C": ["Mediacom", "SmartPad 810c", "tablet"], Smartpad810c: ["Mediacom", "SmartPad 810c", "tablet"], SmartPad810c: ["Mediacom", "SmartPad 810c", "tablet"], MP810C: ["Mediacom", "SmartPad 810c", "tablet"], MP907C: ["Mediacom", "SmartPad 907c", "tablet"], MTK6516: ["Mediatek", "MTK6516"], "LIFETAB S9512": ["Medion", "Lifetab S9512", "tablet"], "LIFETAB P9514": ["Medion", "Lifetab P9514", "tablet"], "MD LIFETAB P9516": ["Medion", "Lifetab P9516", "tablet"], "MEDION LIFE P4310": ["Medion", "Life P4310"], M8: ["Meizu", "M8"], M9: ["Meizu", "M9"], M040: ["Meizu", "M040"], "M9-unlocked": ["Meizu", "M9"], "meizu m9": ["Meizu", "M9"], "MEIZU M9": ["Meizu", "M9"], "MEIZU MX": ["Meizu", "MX"], M030: ["Meizu", "MX M030"], M031: ["Meizu", "MX M031"], M032: ["Meizu", "MX M032"], Slidepad: ["Memup", "Slidepad", "tablet"], A45: ["Micromax", "A45 Punk"], "Micromax A50": ["Micromax", "A50 Ninja"], "Micromax A60": ["Micromax", "Andro A60"], "Micromax A70": ["Micromax", "Andro A70"], "P300(Funbook)": ["Micromax", "Funbook P300", "tablet"], AT735: ["Moinstone", "AT735", "tablet"], A853: ["Motorola", "Milestone"], A953: ["Motorola", "Milestone 2"], A1680: ["Motorola", "MOTO A1680"], ET1: ["Motorola", "ET1 Enterprise Tablet", "tablet"], MB200: ["Motorola", "CLIQ"], MB300: ["Motorola", "BACKFLIP"], MB501: ["Motorola", "CLIQ XT"], MB502: ["Motorola", "CHARM"], MB511: ["Motorola", "FLIPOUT"], MB520: ["Motorola", "BRAVO"], MB525: ["Motorola", "DEFY"], "MB525+": ["Motorola", "DEFY"], "MB525 for me": ["Motorola", "DEFY"], MB526: ["Motorola", "DEFY+"], MB611: ["Motorola", "CLIQ 2"], MB612: ["Motorola", "XPRT"], MB632: ["Motorola", "PRO+"], MB855: ["Motorola", "PHOTON 4G"], MB860: ["Motorola", "ATRIX"], MB861: ["Motorola", "ATRIX"], mb861: ["Motorola", "ATRIX"], MB865: ["Motorola", "ATRIX 2"], MB870: ["Motorola", "Droid X2"], MB886: ["Motorola", "DINARA"], ME501: ["Motorola", "CLIQ XT"], ME511: ["Motorola", "FLIPOUT"], me525: ["Motorola", "MOTO ME525"], Me525: ["Motorola", "MOTO ME525"], ME525: ["Motorola", "MOTO ME525"], "ME525+": ["Motorola", "MOTO ME525"], ME600: ["Motorola", "BACKFLIP"], ME632: ["Motorola", "PRO+"], ME722: ["Motorola", "Milestone 2"], ME811: ["Motorola", "Droid X"], ME860: ["Motorola", "ATRIX"], ME863: ["Motorola", "Milestone 3"], ME865: ["Motorola", "ATRIX 2"], MT620: ["Motorola", "MOTO MT620"], MT620t: ["Motorola", "MOTO MT620"], MT716: ["Motorola", "MOTO MT716"], MT810: ["Motorola", "MOTO MT810"], MT870: ["Motorola", "MOTO MT870"], MT917: ["Motorola", "MT917"], MZ505: ["Motorola", "XOOM Family Edition", "tablet"], MZ600: ["Motorola", "XOOM 4G LTE", "tablet"], MZ601: ["Motorola", "XOOM 3G", "tablet"], MZ602: ["Motorola", "XOOM 4G LTE", "tablet"], MZ603: ["Motorola", "XOOM 3G", "tablet"], MZ604: ["Motorola", "XOOM WiFi", "tablet"], MZ605: ["Motorola", "XOOM 3G", "tablet"], MZ606: ["Motorola", "XOOM WiFi", "tablet"], MZ607: ["Motorola", "XOOM 2 WiFi Media Edition", "tablet"], MZ609: ["Motorola", "Droid XYBOARD 8.2", "tablet"], "MZ609 4G": ["Motorola", "Droid XYBOARD 8.2", "tablet"], MZ615: ["Motorola", "XOOM 2 WiFi", "tablet"], MZ617: ["Motorola", "Droid XYBOARD 10.1", "tablet"], "MZ617 4G": ["Motorola", "Droid XYBOARD 10.1", "tablet"], WX435: ["Motorola", "TRIUMPH WX435"], WX445: ["Motorola", "CITRUS WX445"], XT300: ["Motorola", "SPICE"], XT301: ["Motorola", "MOTO XT301"], XT311: ["Motorola", "FIRE"], XT316: ["Motorola", "MOTO XT316"], XT319: ["Motorola", "MOTO XT319"], XT390: ["Motorola", "MOTO XT390"], XT320: ["Motorola", "DEFY Mini"], XT321: ["Motorola", "DEFY Mini"], XT500: ["Motorola", "MOTO XT500"], "xt-500": ["Motorola", "MOTO XT500"], XT502: ["Motorola", "QUENCH XT5"], XT530: ["Motorola", "FIRE XT"], XT531: ["Motorola", "FIRE XT"], XT532: ["Motorola", "XT532"], XT535: ["Motorola", "DEFY"], XT550: ["Motorola", "XT550"], XT556: ["Motorola", "XT556"], XT603: ["Motorola", "ADMIRAL"], XT610: ["Motorola", "Droid Pro"], XT615: ["Motorola", "MOTO XT615"], XT626: ["Motorola", "MOTO XT626"], XT681: ["Motorola", "MOTO XT681"], XT682: ["Motorola", "Droid 3"], XT685: ["Motorola", "MOTO XT685"], XT687: ["Motorola", "ATRIX TV"], XT701: ["Motorola", "XT701"], XT702: ["Motorola", "MOTO XT702"], XT711: ["Motorola", "MOTO XT711"], XT720: ["Motorola", "Milestone"], XT875: ["Motorola", "Droid Bionic"], XT800: ["Motorola", "MOTO XT800"], "XT800+": ["Motorola", "MOTO XT800"], XT800W: ["Motorola", "MOTO Glam"], XT806: ["Motorola", "MOTO XT806"], XT860: ["Motorola", "Milestone 3"], XT862: ["Motorola", "Droid 3"], XT882: ["Motorola", "MOTO XT882"], XT883: ["Motorola", "Milestone 3"], XT889: ["Motorola", "XT889"], XT897: ["Motorola", "Droid 4"], XT901: ["Motorola", "RAZR"], XT910: ["Motorola", "RAZR"], XT910K: ["Motorola", "RAZR"], XT910S: ["Motorola", "RAZR"], "XT910 4G": ["Motorola", "RAZR"], XT912: ["Motorola", "Droid RAZR"], XT923: ["Motorola", "Droid RAZR HD"], XT925: ["Motorola", "Droid RAZR HD"], XT926: ["Motorola", "Droid RAZR"], "XT926 4G": ["Motorola", "Droid RAZR"], XT928: ["Motorola", "XT928"], "Atrix 2": ["Motorola", "ATRIX 2"], "Atrix 4g": ["Motorola", "ATRIX 4G"], "Atrix 4G": ["Motorola", "ATRIX 4G"], "Atrix 4G ME860": ["Motorola", "ATRIX 4G"], CLIQ: ["Motorola", "CLIQ"], "CLIQ XT": ["Motorola", "CLIQ XT"], CLIQ2: ["Motorola", "CLIQ 2"], Corvair: ["Motorola", "Corvair", "tablet"], DEFY: ["Motorola", "DEFY"], "Defy+": ["Motorola", "DEFY+"], "Defy Plus": ["Motorola", "DEFY+"], Devour: ["Motorola", "Devour"], Dext: ["Motorola", "Dext"], Droid: ["Motorola", "Droid"], DROID: ["Motorola", "Droid"], DROID2: ["Motorola", "Droid 2"], "DROID2 GLOBAL": ["Motorola", "Droid 2"], "DROID2 Global": ["Motorola", "Droid 2"], Droid2Global: ["Motorola", "Droid 2"], "DROID 2": ["Motorola", "Droid 2"], DROID3: ["Motorola", "Droid 3"], DROID4: ["Motorola", "Droid 4"], "DROID4 4G": ["Motorola", "Droid 4"], "DROID Pro": ["Motorola", "Droid Pro"], "DROID BIONIC": ["Motorola", "Droid Bionic"], "DROID BIONIC 4G": ["Motorola", "Droid Bionic"], "DROID BIONIC XT875 4G": ["Motorola", "Droid Bionic"], DROIDRAZR: ["Motorola", "Droid RAZR"], "Droid Razr": ["Motorola", "Droid RAZR"], "DROID RAZR": ["Motorola", "Droid RAZR"], "DROID RAZR 4G": ["Motorola", "Droid RAZR"], "DROID SPYDER": ["Motorola", "Droid RAZR"], "DROID RAZR HD": ["Motorola", "Droid RAZR HD"], "DROID RAZR HD 4G": ["Motorola", "Droid RAZR HD"], DroidX: ["Motorola", "Droid X"], DROIDX: ["Motorola", "Droid X"], "droid x": ["Motorola", "Droid X"], "Droid X": ["Motorola", "Droid X"], "DROID X": ["Motorola", "Droid X"], "DROID X2": ["Motorola", "Droid X2"], Electrify: ["Motorola", "Electrify"], "Milestone XT720": ["Motorola", "Milestone"], "Milestone Xt720": ["Motorola", "Milestone"], Milestone: ["Motorola", "Milestone"], "A853 Milestone": ["Motorola", "Milestone"], "Milestone X": ["Motorola", "Milestone X"], "Milestone X2": ["Motorola", "Milestone X2"], MotoroiX: ["Motorola", "Droid X"], "Moto Backflip": ["Motorola", "BACKFLIP"], RAZR: ["Motorola", "RAZR"], Triumph: ["Motorola", "TRIUMPH"], "Opus One": ["Motorola", "i1"], Photon: ["Motorola", "PHOTON"], "Photon 4G": ["Motorola", "PHOTON 4G"], XOOM: ["Motorola", "XOOM", "tablet"], Xoom: ["Motorola", "XOOM", "tablet"], "XOOM 2": ["Motorola", "XOOM 2", "tablet"], "XOOM 2 ME": ["Motorola", "XOOM 2", "tablet"], "XOOM MZ606": ["Motorola", "XOOM WiFi", "tablet"], ISW11M: ["Motorola", "PHOTON"], IS12M: ["Motorola", "RAZR"], MOTWX435KT: ["Motorola", "TRIUMPH"], "X3-Ice MIUI XT720 Memorila Classics": ["Motorola", "Milestone"], "NABI-A": ["Nabi", "Kids tablet", "tablet"], Newpad: ["Newsmy", "Newpad", "tablet"], "Newpad-K97": ["Newsmy", "Newpad K97", "tablet"], "Newpad P9": ["Newsmy", "Newpad P9", "tablet"], "M-PAD N8": ["Newsmy", "M-pad N8", "tablet"], "LT-NA7": ["NEC", "LT-NA7"], "N-01D": ["NEC", "MEDIAS PP N-01D"], "N-04C": ["NEC", "MEDIAS N-04C"], "N-04D": ["NEC", "MEDIAS LTE N-04D"], "N-05D": ["NEC", "MEDIAS ES N-05D"], "N-06C": ["NEC", "MEDIAS WP N-06C"], "N-06D": ["NEC", "MEDIAS Tab N-06D", "tablet"], "N-07D": ["NEC", "MEDIAS X N-07D"], "101N": ["NEC", "MEDIAS CH Softbank 101N"], IS11N: ["NEC", "MEDIAS BR IS11N"], "Nexian NX-A890": ["Nexian", "Journey"], "NX-A891": ["Nexian", "Ultra Journey"], M726HC: ["Nextbook", "Premium 7", "ereader"], NXM726HN: ["Nextbook", "Premium 7", "ereader"], NXM803HD: ["Nextbook", "Premium 8", "ereader"], DATAM803HC: ["Nextbook", "Premium 8", "ereader"], NXM901: ["Nextbook", "Next 3", "ereader"], "NGM Vanity Smart": ["NGM", "Vanity Smart"], "Nokia N9": ["Nokia", "N9"], "Nokia N900": ["Nokia", "N900"], Lumia800: ["Nokia", "Lumia 800"], "Lumia 900": ["Nokia", "Lumia 900"], "Notion Ink ADAM": ["Notion Ink", "ADAM", "tablet"], "P4D SIRIUS": ["Nvsbl", "P4D SIRIUS", "tablet"], "P4D Sirius": ["Nvsbl", "P4D SIRIUS", "tablet"], EFM710A: ["Oblio", "Mint 7x", "tablet"], "ODYS-Xpress": ["Odys", "Xpress", "tablet"], "Olivetti Olipad 100": ["Olivetti", "Olipad 100", "tablet"], OP110: ["Olivetti", "Olipad 110", "tablet"], "ONDA MID": ["Onda", "MID", "tablet"], VX580A: ["Onda", "VX580A", "tablet"], VX610A: ["Onda", "VX610A", "tablet"], TQ150: ["Onda", "TQ150"], N2T: ["ONN", "N2T", "tablet"], Renesas: ["Opad", "Renesas", "tablet"], "renesas emev": ["Opad", "Renesas", "tablet"], X903: ["Oppo", "Find Me X903"], X905: ["Oppo", "Find 3 X905"], R805: ["Oppo", "R805"], R801: ["Oppo", "R801"], R811: ["Oppo", "R811"], X909: ["Oppo", "X909"], OPPOR801: ["Oppo", "R801"], OPPOX905: ["Oppo", "Find 3 X905"], OPPOX907: ["Oppo", "Find 3 X907"], X907: ["Oppo", "Find 3 X907"], X9015: ["Oppo", "Find X9015"], OPPOX9017: ["Oppo", "Finder X9017"], OPPOU701: ["Oppo", "OPPOU701"], OPPOR807: ["Oppo", "Real R807"], OPPOR805: ["Oppo", "Real R805"], R807: ["Oppo", "Real R807"], OPPOT703: ["Oppo", "T703"], "P-01D": ["Panasonic", "P-01D"], "P-02D": ["Panasonic", "Lumix Phone"], "P-04D": ["Panasonic", "Eluga"], "P-07C": ["Panasonic", "P-07C"], dL1: ["Panasonic", "Eluga dL1"], "101P": ["Panasonic", "Lumix Phone"], "JT-H580VT": ["Panasonic", "BizPad 7", "tablet"], "JT-H581VT": ["Panasonic", "BizPad 10", "tablet"], "FZ-A1A": ["Panasonic", "Toughpad", "tablet"], pandigital9hr: ["Pandigital", "9HR", "tablet"], pandigital9hr2: ["Pandigital", "9HR2", "tablet"], pandigitalopc1: ["Pandigital", "OPC1", "tablet"], pandigitalopp1: ["Pandigital", "OPP1", "tablet"], pandigitalp1hr: ["Pandigital", "p1hr", "tablet"], "IM-A600S": ["Pantech", "SIRIUS Ã�Â±"], "IM-A630K": ["Pantech", "SKY Izar"], "IM-A690L": ["Pantech", "SKY"], "IM-A690S": ["Pantech", "SKY"], "IM-A710K": ["Pantech", "SKY Vega Xpress"], "IM-A720L": ["Pantech", "SKY Vega Xpress"], "IM-A725L": ["Pantech", "SKY Vega X+"], "IM-A730s": ["Pantech", "SKY Vega S"], "IM-A730S": ["Pantech", "SKY Vega S"], "IM-A750K": ["Pantech", "SKY Mirach A"], "IM-A760S": ["Pantech", "SKY Vega Racer"], "IM-A770K": ["Pantech", "SKY Vega Racer"], "IM-A780L": ["Pantech", "SKY Vega Racer"], "IM-A800S": ["Pantech", "SKY Vega LTE"], "IM-A810K": ["Pantech", "SKY Vega LTE M"], "IM-A810S": ["Pantech", "SKY Vega LTE M"], "IM-A820L": ["Pantech", "SKY Vega LTE EX"], "IM-A830K": ["Pantech", "SKY Vega Racer 2"], "IM-A830L": ["Pantech", "SKY Vega Racer 2"], "IM-A830S": ["Pantech", "SKY Vega Racer 2"], "IM-A840S": ["Pantech", "SKY Vega S5"], "IM-A850K": ["Pantech", "IM-A850K"], "IM-T100K": ["Pantech", "SKY Vega No. 5", "tablet"], IS06: ["Pantech", "SIRIUS Ã�Â±"], ADR8995: ["Pantech", "Breakout"], "ADR8995 4G": ["Pantech", "Breakout"], "ADR910L 4G": ["Pantech", "ADR910L"], PantechP4100: ["Pantech", "Element", "tablet"], PantechP8000: ["Pantech", "Crossover"], PantechP8010: ["Pantech", "P8010"], PantechP9060: ["Pantech", "Pocket"], PantechP9070: ["Pantech", "Burst"], "SKY IM-A600S": ["Pantech", "SIRIUS Ã�Â±"], "SKY IM-A630K": ["Pantech", "SKY Izar"], "SKY IM-A650S": ["Pantech", "SKY Vega"], IS11PT: ["Pantech", "Mirach IS11PT"], PAT712W: ["Perfeo", "PAT712W", "tablet"], X7G: ["Pearl", "Touchlet X7G", "tablet"], FWS810: ["PHICOMM", "FWS810"], "Philips PI5000": ["Philips", "PI5000", "tablet"], PI7000: ["Philips", "PI7000", "tablet"], "Philips W626": ["Philips", "W626"], "Philips W632": ["Philips", "W632"], MOMO: ["Ployer", "MOMO", "tablet"], MOMO15: ["Ployer", "MOMO15", "tablet"], "PocketBook A7": ["PocketBook", "A7", "tablet"], "PocketBook A10": ["PocketBook", "A10", "tablet"], "Mobii 7": ["Point Of View", "Mobii 7", "tablet"], PMP3384BRU: ["Prestigio", "Multipad 3384", "tablet"], TB07FTA: ["Positivo", "TB07FTA", "tablet"], "QW TB-1207": ["Qware", "Pro3", "tablet"], "W6HD ICS": ["Ramos", "W6HD", "tablet"], w10: ["Ramos", "W10", "tablet"], W10: ["Ramos", "W10", "tablet"], "w10 v2.0": ["Ramos", "W10 v2.0", "tablet"], "W10 V2.0": ["Ramos", "W10 v2.0", "tablet"], T11AD: ["Ramos", "T11AD", "tablet"], "T11AD.FE": ["Ramos", "T11AD", "tablet"], PlayBook: ["RIM", "BlackBerry PlayBook", "tablet"], "RBK-490": ["Ritmix", "RBK-490", "tablet"], A8HD: ["Saayi", "Dropad A8HD", "tablet"], "GT-S7568": ["Samsung", "S7568"], "Galaxy Nexus": ["Samsung", "Galaxy Nexus"], "GT-B5330": ["Samsung", "GT-B5330"], "GT-B5510": ["Samsung", "Galaxy Y Pro"], "GT-B5510B": ["Samsung", "Galaxy Y Pro"], "GT-B5510L": ["Samsung", "Galaxy Y Pro"], "GT-B5512": ["Samsung", "Galaxy Y Pro Duos"], "GT-B7510": ["Samsung", "Galaxy Pro"], "GT-B7510L": ["Samsung", "Galaxy Pro"], "GT-I5500": ["Samsung", "Galaxy 5"], "GT-I5500B": ["Samsung", "Galaxy 5"], "GT-I5500L": ["Samsung", "Galaxy 5"], "GT-I5500M": ["Samsung", "Galaxy 5"], "GT-I5500-MR3": ["Samsung", "Galaxy 5"], "GT-I5503": ["Samsung", "Galaxy 5"], "GT-I5508": ["Samsung", "Galaxy 5"], "GT-I5510": ["Samsung", "Galaxy 551"], "GT-I5510L": ["Samsung", "Galaxy 551"], "GT-I5510M": ["Samsung", "Galaxy 551"], "GT-I5510T": ["Samsung", "Galaxy 551"], "GT-I5700": ["Samsung", "Galaxy Spica"], "GT-I5700L": ["Samsung", "Galaxy Spica"], "GT-I5800": ["Samsung", "Galaxy Apollo"], "GT-I5800D": ["Samsung", "Galaxy Apollo"], "GT-I5800L": ["Samsung", "Galaxy Apollo"], "GT-I5801": ["Samsung", "Galaxy Apollo"], "GT-I6500U": ["Samsung", "Saturn"], "GT-I8000": ["Samsung", "Omnia 2"], "GT-I8150": ["Samsung", "Galaxy W"], "GT-I8150B": ["Samsung", "Galaxy W"], "GT-I8160": ["Samsung", "Galaxy Ace 2"], "GT-I8160L": ["Samsung", "Galaxy Ace 2"], "GT-I8160P": ["Samsung", "Galaxy Ace 2"], "GT-I8320": ["Samsung", "H1"], "GT-I8520": ["Samsung", "Galaxy Beam"], "GT-I8530": ["Samsung", "Galaxy Beam"], "GT-I8250": ["Samsung", "Galaxy Beam"], "GT-i9000": ["Samsung", "Galaxy S"], "GT-I9000": ["Samsung", "Galaxy S"], "GT-I9000B": ["Samsung", "Galaxy S"], "GT-I9000M": ["Samsung", "Galaxy S Vibrant"], "GT-I9000T": ["Samsung", "Galaxy S"], "GT-I9001": ["Samsung", "Galaxy S Plus"], "GT-I9003": ["Samsung", "Galaxy SL"], "GT-I9003L": ["Samsung", "Galaxy SL"], "GT-I9008": ["Samsung", "Galaxy S"], "GT-I9008L": ["Samsung", "Galaxy S"], "GT-I9010": ["Samsung", "Galaxy S Giorgio Armani"], "GT-I9018": ["Samsung", "Galaxy GT-I9018"], "GT-I9070": ["Samsung", "Galaxy S Advance"], "GT-I9070P": ["Samsung", "Galaxy S Advance"], "GT-I9082": ["Samsung", "Galaxy Grand DUOS"], "GT-I9088": ["Samsung", "Galaxy S"], "GT-i9100": ["Samsung", "Galaxy S II"], "GT-I9100": ["Samsung", "Galaxy S II"], "GT-I9100G": ["Samsung", "Galaxy S II"], "GT-I9100M": ["Samsung", "Galaxy S II"], "GT-I9100T": ["Samsung", "Galaxy S II"], "GT-I9100P": ["Samsung", "Galaxy S II"], "GT-I9103": ["Samsung", "Galaxy R"], "GT-I9108": ["Samsung", "Galaxy S II"], "GT-I9210": ["Samsung", "Galaxy S II LTE"], "GT-I9210T": ["Samsung", "Galaxy S II LTE"], "GT-I9220": ["Samsung", "Galaxy Note"], "GT-I9228": ["Samsung", "Galaxy Note"], "GT-I9250": ["Samsung", "Galaxy Nexus"], "GT-I9250 EUR XX": ["Samsung", "Galaxy Nexus"], "GT-I9260": ["Samsung", "Galaxy Premier"], "GT-I9300": ["Samsung", "Galaxy S III"], "GT-I9300T": ["Samsung", "Galaxy S III"], "GT-I9303T": ["Samsung", "Galaxy S III"], "GT-I9308": ["Samsung", "Galaxy S III"], "GT-I9500": ["Samsung", "Galaxy GT-I9500"], "GT-I9800": ["Samsung", "Galaxy GT-I9800"], "GT-N7000": ["Samsung", "Galaxy Note"], "GT-N7000B": ["Samsung", "Galaxy Note"], "GT-N7100": ["Samsung", "Galaxy Note II"], "GT-N7102": ["Samsung", "Galaxy Note II"], "GT-N8000": ["Samsung", "Galaxy Note 10.1"], "GT-N8010": ["Samsung", "Galaxy Note 10.1"], "GT-P1000": ["Samsung", "Galaxy Tab", "tablet"], "GT-P1000L": ["Samsung", "Galaxy Tab", "tablet"], "GT-P1000M": ["Samsung", "Galaxy Tab", "tablet"], "GT-P1000N": ["Samsung", "Galaxy Tab", "tablet"], "GT-P1000T": ["Samsung", "Galaxy Tab", "tablet"], "GT-P1000 Tablet": ["Samsung", "Galaxy Tab", "tablet"], "GT-P1010": ["Samsung", "Galaxy Tab", "tablet"], "GT-P3100": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"], "GT-P3100B": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"], "GT-P3110": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"], "GT-P3113": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"], "GT-P5100": ["Samsung", "Galaxy Tab 2 (10.1)", "tablet"], "GT-P5110": ["Samsung", "Galaxy Tab 2 (10.1)", "tablet"], "GT-P5113": ["Samsung", "Galaxy Tab 2 (10.1)", "tablet"], "GT-P6200": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"], "GT-P6200L": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"], "GT-P6201": ["Samsung", "Galaxy Tab 7.0 Plus N", "tablet"], "GT-P6210": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"], "GT-P6211": ["Samsung", "Galaxy Tab 7.0 Plus N", "tablet"], "GT-P6800": ["Samsung", "Galaxy Tab 7.7", "tablet"], "GT-P6810": ["Samsung", "Galaxy Tab 7.7", "tablet"], "GT-P7100": ["Samsung", "Galaxy Tab 10.1V", "tablet"], "GT-P7300": ["Samsung", "Galaxy Tab 8.9", "tablet"], "GT-P7300B": ["Samsung", "Galaxy Tab 8.9", "tablet"], "GT-P7310": ["Samsung", "Galaxy Tab 8.9", "tablet"], "GT-P7320": ["Samsung", "Galaxy Tab 8.9", "tablet"], "GT-P7320T": ["Samsung", "Galaxy Tab 8.9", "tablet"], "GT-P7500": ["Samsung", "Galaxy Tab 10.1", "tablet"], "GT-P7500D": ["Samsung", "Galaxy Tab 10.1", "tablet"], "GT-P7500R": ["Samsung", "Galaxy Tab 10.1", "tablet"], "GT-P7500V": ["Samsung", "Galaxy Tab 10.1", "tablet"], "GT-P7501": ["Samsung", "Galaxy Tab 10.1N", "tablet"], "GT-P7510": ["Samsung", "Galaxy Tab 10.1", "tablet"], "GT-P7511": ["Samsung", "Galaxy Tab 10.1N", "tablet"], "GT-S5300": ["Samsung", "Galaxy Pocket"], "GT-S5360": ["Samsung", "Galaxy Y"], "GT-S5360B": ["Samsung", "Galaxy Y"], "GT-S5360L": ["Samsung", "Galaxy Y"], "GT-S5363": ["Samsung", "Galaxy Y"], "GT-S5367": ["Samsung", "Galaxy Y TV"], "GT-S5368": ["Samsung", "GT-S5368"], "GT-S5369": ["Samsung", "Galaxy Y"], "GT-S5570": ["Samsung", "Galaxy Mini"], "GT-S5570B": ["Samsung", "Galaxy Mini"], "GT-S5570I": ["Samsung", "Galaxy Mini"], "GT-S5570L": ["Samsung", "Galaxy Mini"], "GT-S5578": ["Samsung", "Galaxy Mini"], "GT-S5660": ["Samsung", "Galaxy Gio"], "GT-S5660M": ["Samsung", "Galaxy Gio"], "GT-S5660V": ["Samsung", "Galaxy Gio"], "GT-S5670": ["Samsung", "Galaxy Fit"], "GT-S5670B": ["Samsung", "Galaxy Fit"], "GT-S5670L": ["Samsung", "Galaxy Fit"], "GT-S5690": ["Samsung", "Galaxy Xcover"], "GT-S5690L": ["Samsung", "Galaxy Xcover"], "GT-S5820": ["Samsung", "Galaxy Ace"], "GT-S5830": ["Samsung", "Galaxy Ace"], "GT-S5830B": ["Samsung", "Galaxy Ace"], "GT-S5830C": ["Samsung", "Galaxy Ace"], "GT-S5830D": ["Samsung", "Galaxy Ace"], "GT-S5830D-parrot": ["Samsung", "Galaxy Ace"], "GT-S5830i": ["Samsung", "Galaxy Ace"], "GT-S5830L": ["Samsung", "Galaxy Ace"], "GT-S5830M": ["Samsung", "Galaxy Ace"], "GT-S5830T": ["Samsung", "Galaxy Ace"], "GT-S5838": ["Samsung", "Galaxy Ace"], "GT-S5839i": ["Samsung", "Galaxy Ace"], "GT-S6102": ["Samsung", "Galaxy Y Duos"], "GT-S6102B": ["Samsung", "Galaxy Y Duos"], "GT-S6500": ["Samsung", "Galaxy Mini 2"], "GT-S6500D": ["Samsung", "Galaxy Mini 2"], "GT-S6702": ["Samsung", "GT-S6702"], "GT-S6802": ["Samsung", "Galaxy Ace Duos"], "GT-S7500": ["Samsung", "Galaxy Ace Plus"], "GT-S7500L": ["Samsung", "Galaxy Ace Plus"], "GT-S7500W": ["Samsung", "Galaxy Ace Plus"], "GT-T959": ["Samsung", "Galaxy S Vibrant"], "SCH-i509": ["Samsung", "Galaxy Y"], "SCH-i559": ["Samsung", "Galaxy Pop"], "SCH-i569": ["Samsung", "Galaxy Gio"], "SCH-i579": ["Samsung", "Galaxy Ace"], "SCH-i589": ["Samsung", "Galaxy Ace Duos"], "SCH-i705 4G": ["Samsung", "Galaxy Tab 2 (7.0)", "tablet"], "SCH-i809": ["Samsung", "SCH-i809"], "SCH-i889": ["Samsung", "Galaxy Note"], "SCH-i909": ["Samsung", "Galaxy S"], "SCH-i919": ["Samsung", "SCH-i919"], "SCH-i929": ["Samsung", "SCH-i929"], "SCH-I100": ["Samsung", "Gem"], "SCH-I110": ["Samsung", "Illusion"], "SCH-I400": ["Samsung", "Continuum"], "SCH-I405": ["Samsung", "Stratosphere"], "SCH-I405 4G": ["Samsung", "Stratosphere"], "SCH-I500": ["Samsung", "Fascinate"], "SCH-I510": ["Samsung", "Stealth V"], "SCH-I510 4G": ["Samsung", "Droid Charge"], "SCH-I515": ["Samsung", "Galaxy Nexus"], "SCH-I535": ["Samsung", "Galaxy S III"], "SCH-I535 4G": ["Samsung", "Galaxy S III"], "SCH-I619": ["Samsung", "SCH-I619"], "SCH-I699": ["Samsung", "SCH-I699"], "SCH-I779": ["Samsung", "SCH-I779"], "SCH-I800": ["Samsung", "Galaxy Tab 7.0", "tablet"], "SCH-I815": ["Samsung", "Galaxy Tab 7.7", "tablet"], "SCH-I815 4G": ["Samsung", "Galaxy Tab 7.7", "tablet"], "SCH-I905": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SCH-I905 4G": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SCH-I909": ["Samsung", "Galaxy S"], "SCH-I915": ["Samsung", "SCH-I915"], "SCH-I939": ["Samsung", "Galaxy S III"], "SCH-M828C": ["Samsung", "Galaxy Precedent"], "SCH-M828Carray(9096483449)": ["Samsung", "Galaxy Precedent"], "SCH-R530U": ["Samsung", "Galaxy S III"], "SCH-R680": ["Samsung", "Repp"], "SCH-R720": ["Samsung", "Admire"], "SCH-R730": ["Samsung", "Transfix"], "SCH-R760": ["Samsung", "Galaxy S II"], "SCH-R820": ["Samsung", "SCH-R820"], "SCH-R880": ["Samsung", "Acclaim"], "SCH-R910": ["Samsung", "Galaxy Indulge 4G"], "SCH-R915": ["Samsung", "Galaxy Indulge"], "SCH-R920": ["Samsung", "Galaxy Attain 4G"], "SCH-R930": ["Samsung", "Galaxy S Aviator"], "SCH-R940": ["Samsung", "Galaxy S Lightray"], "SCH-S720C": ["Samsung", "Galaxy Proclaim"], "SCH-S735C": ["Samsung", "SCH-S735"], "SCH-W899": ["Samsung", "SCH-W899"], "SCH-W999": ["Samsung", "SCH-W999"], "SGH-I547": ["Samsung", "SGH-I547"], "SGH-I717": ["Samsung", "Galaxy Note"], "SGH-I717D": ["Samsung", "Galaxy Note"], "SGH-I717M": ["Samsung", "Galaxy Note"], "SGH-I717R": ["Samsung", "Galaxy Note"], "SGH-I727": ["Samsung", "Galaxy S II Skyrocket"], "SGH-i727R": ["Samsung", "Galaxy S II"], "SGH-I727R": ["Samsung", "Galaxy S II"], "SGH-I747": ["Samsung", "Galaxy S III"], "SGH-I747M": ["Samsung", "Galaxy S III"], "SGH-I748": ["Samsung", "Galaxy S III"], "SGH-I757": ["Samsung", "Galaxy S II Skyrocket HD"], "SGH-I777": ["Samsung", "Galaxy S II"], "SGH-I9777": ["Samsung", "Galaxy S II"], "SGH-I896": ["Samsung", "Captivate"], "SGH-I897": ["Samsung", "Captivate"], "SGH-I927": ["Samsung", "Captivate Glide"], "SGH-I927R": ["Samsung", "Captivate Glide"], "SGH-I957": ["Samsung", "Galaxy Tab 8.9", "tablet"], "SGH-I957D": ["Samsung", "Galaxy Tab 8.9", "tablet"], "SGH-I957M": ["Samsung", "Galaxy Tab 8.9", "tablet"], "SGH-I957R": ["Samsung", "Galaxy Tab 8.9", "tablet"], "SGH-I987": ["Samsung", "Galaxy Tab 7.0", "tablet"], "SGH-I997": ["Samsung", "Infuse 4G"], "SGH-I997R": ["Samsung", "Infuse 4G"], "SGH-I9000": ["Samsung", "Galaxy S"], "SGH-S730G": ["Samsung", "SGH-S730"], "SGH-T499": ["Samsung", "Dart"], "SGH-T499V": ["Samsung", "Galaxy Mini"], "SGH-T499Y": ["Samsung", "Galaxy Mini"], "SGH-T589": ["Samsung", "Gravity Smart"], "SGH-T589R": ["Samsung", "Gravity Smart"], "SGH-T679": ["Samsung", "Exhibit II 4G"], "SGH-T679M": ["Samsung", "Exhibit II 4G"], "SGH-T759": ["Samsung", "Exhibit 4G"], "SGH-T769": ["Samsung", "Galaxy S Blaze 4G"], "SGH-T839": ["Samsung", "T-Mobile Sidekick"], "SGH-T849": ["Samsung", "Galaxy Tab 7.0", "tablet"], "SGH-T859": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SGH-T869": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"], "SGH-T879": ["Samsung", "Galaxy Note"], "SGH-T959": ["Samsung", "Vibrant"], "SGH-T959D": ["Samsung", "Galaxy S Fascinate 3G+"], "SGH-T959P": ["Samsung", "Galaxy S Fascinate 4G"], "SGH-T959V": ["Samsung", "Galaxy S 4G"], "SGH-T989": ["Samsung", "Galaxy S II"], "SGH-T989D": ["Samsung", "Galaxy S II X"], "SGH-T999": ["Samsung", "Galaxy S Blaze 4G"], "SGH-T999V": ["Samsung", "Galaxy S Blaze 4G"], "SHV-E120K": ["Samsung", "Galaxy S II HD LTE"], "SHV-E120L": ["Samsung", "Galaxy S II HD LTE"], "SHV-E120S": ["Samsung", "Galaxy S II HD LTE"], "SHV-E110S": ["Samsung", "Galaxy S II LTE"], "SHV-E140S": ["Samsung", "Galaxy Tab 8.9", "tablet"], "SHV-E150S": ["Samsung", "Galaxy Tab 7.7", "tablet"], "SHV-E160K": ["Samsung", "Galaxy Note"], "SHV-E160L": ["Samsung", "Galaxy Note LTE"], "SHV-E160S": ["Samsung", "Galaxy Note LTE"], "SHV-E170K": ["Samsung", "SHV-E170K"], "SHV-E170L": ["Samsung", "SHV-E170L"], "SHV-E210K": ["Samsung", "Galaxy S III"], "SHV-E210L": ["Samsung", "Galaxy S III"], "SHV-E210S": ["Samsung", "Galaxy S III"], "SHW-M100S": ["Samsung", "Galaxy A"], "SHW-M110S": ["Samsung", "Galaxy S"], "SHW-M130L": ["Samsung", "Galaxy U"], "SHW-M130K": ["Samsung", "Galaxy K"], "SHW-M180K": ["Samsung", "Galaxy Tab", "tablet"], "SHW-M180L": ["Samsung", "Galaxy Tab", "tablet"], "SHW-M180S": ["Samsung", "Galaxy Tab", "tablet"], "SHW-M180W": ["Samsung", "Galaxy Tab", "tablet"], "SHW-M185S": ["Samsung", "Galaxy Tab", "tablet"], "SHW-M190S": ["Samsung", "Galaxy S Hoppin"], "SHW-M220L": ["Samsung", "Galaxy Neo"], "SHW-M240S": ["Samsung", "Galaxy Ace"], "SHW-M250K": ["Samsung", "Galaxy S II"], "SHW-M250L": ["Samsung", "Galaxy S II"], "SHW-M250S": ["Samsung", "Galaxy S II"], "SHW-M300W": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SHW-M305W": ["Samsung", "Galaxy Tab 8.9", "tablet"], "SHW-M340S": ["Samsung", "Galaxy M Style"], "SHW-M380K": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SHW-M380S": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SHW-M380W": ["Samsung", "Galaxy Tab 10.1", "tablet"], "SHW-M440S": ["Samsung", "Galaxy S III"], "SMT-i9100": ["Samsung", "SMT-I9100", "tablet"], "SPH-D600": ["Samsung", "Conquer 4G"], "SPH-D700": ["Samsung", "Epic 4G"], "SPH-D705": ["Samsung", "Epic 4G 2"], "SPH-D710": ["Samsung", "Epic 4G Touch"], "SPH-L700": ["Samsung", "Galaxy Nexus"], "SPH-L710": ["Samsung", "Galaxy S III"], "SPH-M820": ["Samsung", "Galaxy Prevail"], "SPH-M820-BST": ["Samsung", "Galaxy Prevail"], "SPH-M580": ["Samsung", "Replenish"], "SPH-M900": ["Samsung", "Moment"], "SPH-M910": ["Samsung", "Intercept"], "SPH-M920": ["Samsung", "Transform"], "SPH-M930": ["Samsung", "Transform Ultra"], "SPH-M930BST": ["Samsung", "Transform Ultra"], "SPH-P100": ["Samsung", "Galaxy Tab", "tablet"], "YP-GB1": ["Samsung", "Galaxy Player", "media"], "YP-GB70": ["Samsung", "Galaxy Player 70", "media"], "YP-GB70D": ["Samsung", "Galaxy Player 70 Plus", "media"], "YP-GS1": ["Samsung", "Galaxy S WiFi 3.6", "media"], "YP-G1": ["Samsung", "Galaxy S WiFi 4.0", "media"], "YP-GI1": ["Samsung", "Galaxy S WiFi 4.2", "media"], "YP-G50": ["Samsung", "Galaxy Player", "media"], "YP-G70": ["Samsung", "Galaxy S WiFi 5.0", "media"], GT9100: ["Samsung", "Galaxy S II"], I897: ["Samsung", "Captivate"], I7500: ["Samsung", "Galaxy"], I9000: ["Samsung", "Galaxy S"], T959: ["Samsung", "Galaxy S Vibrant"], "Captivate-I897": ["Samsung", "Captivate"], Galaxy: ["Samsung", "Galaxy"], "Galaxy Note": ["Samsung", "Galaxy Note"], GalaxyS: ["Samsung", "Galaxy S"], "Galaxy S II": ["Samsung", "Galaxy S II"], "Galaxy X": ["Samsung", "Galaxy X"], "Galaxy Spica": ["Samsung", "Galaxy Spica"], "GALAXY Tab": ["Samsung", "Galaxy Tab", "tablet"], "GALAXY NEXUS": ["Samsung", "Galaxy Nexus"], Vibrantmtd: ["Samsung", "Vibrant"], "SC-01C": ["Samsung", "Galaxy Tab", "tablet"], "SC-01D": ["Samsung", "Galaxy Tab 10.1 LTE", "tablet"], "SC-02B": ["Samsung", "Galaxy S"], "SC-02C": ["Samsung", "Galaxy S II"], "SC-02D": ["Samsung", "Galaxy Tab 7.0 Plus", "tablet"], "SC-03D": ["Samsung", "Galaxy S II LTE"], "SC-04D": ["Samsung", "Galaxy Nexus"], "SC-05D": ["Samsung", "Galaxy Note LTE"], "SC-06D": ["Samsung", "Galaxy S III"], ISW11SC: ["Samsung", "Galaxy S II WiMAX"], "GT-S7562": ["Samsung", "GT-S7562"], "GT-S7562i": ["Samsung", "GT-S7562i"], A01SH: ["Sharp", "A01SH"], IS01: ["Sharp", "IS01"], IS03: ["Sharp", "IS03"], IS05: ["Sharp", "IS05"], IS11SH: ["Sharp", "Aquos IS11SH"], IS12SH: ["Sharp", "Aquos IS12SH"], IS13SH: ["Sharp", "Aquos IS13SH"], IS14SH: ["Sharp", "Aquos IS14SH"], ISW16SH: ["Sharp", "Aquos ISW16SH"], "EB-W51GJ": ["Sharp", "EB-W51GJ"], SBM003SH: ["Sharp", "Galapagos"], SBM005SH: ["Sharp", "Galapagos"], SBM006SH: ["Sharp", "Aquos"], SBM007SH: ["Sharp", "Aquos 007SH"], SBM009SH: ["Sharp", "Aquos 009SH"], SBM102SH: ["Sharp", "Aquos 102SH"], SBM103SH: ["Sharp", "Aquos 103SH"], SBM104SH: ["Sharp", "Aquos 104SH"], SBM107SH: ["Sharp", "Aquos 107SH"], SBM107SHB: ["Sharp", "Aquos 107SH"], "SH-01D": ["Sharp", "Aquos SH-01D"], "SH-02D": ["Sharp", "Aquos slider SH-02D"], "SH-03C": ["Sharp", "Lynx 3D"], "SH-06D": ["Sharp", "Aquos SH-06D"], "SH-09D": ["Sharp", "Aquos Zeta SH-09D"], "SH-10B": ["Sharp", "Lynx"], "SH-12C": ["Sharp", "Aquos"], "SH-13C": ["Sharp", "Aquos f SH-13C"], SH80F: ["Sharp", "Aquos SH80F"], SH72x8U: ["Sharp", "SH72x8U"], SH8118U: ["Sharp", "SH8118U"], SH8128U: ["Sharp", "SH8128U"], SH8158U: ["Sharp", "SH8158U"], SH8188U: ["Sharp", "SH8188U"], SH8268U: ["Sharp", "SH8268U"], "INFOBAR C01": ["Sharp", "INFOBAR C01"], "SPX-5": ["Simvalley", "SPX-5"], "SPX-5 3G": ["Simvalley", "SPX-5 3G"], "SmartQ G7": ["SmartQ", "G7", "tablet"], SmartQT7: ["SmartQ", "T7", "tablet"], SmartQT10: ["SmartQ", "T10", "tablet"], SmartQT15: ["SmartQ", "T15", "tablet"], SmartQT19: ["SmartQ", "T19", "tablet"], SmartQT20: ["SmartQ", "T20", "tablet"], "OMS1 6": ["Sony Ericsson", "A8i"], E10a: ["Sony Ericsson", "Xperia X10 Mini"], E10i: ["Sony Ericsson", "Xperia X10 Mini"], E10iv: ["Sony Ericsson", "Xperia X10 Mini"], E15: ["Sony Ericsson", "Xperia X8"], E15a: ["Sony Ericsson", "Xperia X8"], E15i: ["Sony Ericsson", "Xperia X8"], E15iv: ["Sony Ericsson", "Xperia X8"], "E15i-o": ["Sony Ericsson", "Xperia X8"], E16i: ["Sony Ericsson", "W8 Walkman"], LT11i: ["Sony Ericsson", "Xperia Neo V"], LT15: ["Sony Ericsson", "Xperia Arc"], LT15a: ["Sony Ericsson", "Xperia Arc"], LT15i: ["Sony Ericsson", "Xperia Arc"], LT15iv: ["Sony Ericsson", "Xperia Arc"], "LT15i-o": ["Sony Ericsson", "Xperia Arc"], LT18a: ["Sony Ericsson", "Xperia Arc S"], LT18i: ["Sony Ericsson", "Xperia Arc S"], LT18iv: ["Sony Ericsson", "Xperia Arc S"], "LT18i-o": ["Sony Ericsson", "Xperia Arc S"], LT22i: ["Sony", "Xperia P"], LT26i: ["Sony", "Xperia S"], LT26ii: ["Sony", "Xperia S"], "LT26i-o": ["Sony", "Xperia S"], LT28at: ["Sony", "Xperia Ion"], LT28h: ["Sony", "Xperia Ion"], LT28i: ["Sony", "Xperia Ion"], LT29i: ["Sony", "Xperia GX"], SonyLT29i: ["Sony", "Xperia GX"], SonyLT30a: ["Sony", "Xperia Mint"], SonyLT30p: ["Sony", "Xperia Mint"], MK16a: ["Sony Ericsson", "Xperia Pro"], MK16i: ["Sony Ericsson", "Xperia Pro"], MT11a: ["Sony Ericsson", "Xperia Neo V"], MT11i: ["Sony Ericsson", "Xperia Neo V"], MT11iv: ["Sony Ericsson", "Xperia Neo V"], "MT11i-o": ["Sony Ericsson", "Xperia Neo V"], MT15a: ["Sony Ericsson", "Xperia Neo"], MT15i: ["Sony Ericsson", "Xperia Neo"], MT15iv: ["Sony Ericsson", "Xperia Neo"], "MT15i-o": ["Sony Ericsson", "Xperia Neo"], MT25i: ["Sony", "Xperia Neo L"], MT27i: ["Sony", "Xperia Sola"], R800a: ["Sony Ericsson", "Xperia Play"], R800i: ["Sony Ericsson", "Xperia Play"], R800iv: ["Sony Ericsson", "Xperia Play"], R800at: ["Sony Ericsson", "Xperia Play"], R800x: ["Sony Ericsson", "Xperia Play"], SK17a: ["Sony Ericsson", "Xperia Mini Pro"], SK17i: ["Sony Ericsson", "Xperia Mini Pro"], SK17iv: ["Sony Ericsson", "Xperia Mini Pro"], "SK17i-o": ["Sony Ericsson", "Xperia Mini Pro"], ST15a: ["Sony Ericsson", "Xperia Mini"], ST15i: ["Sony Ericsson", "Xperia Mini"], ST17a: ["Sony Ericsson", "Xperia Active"], ST17i: ["Sony Ericsson", "Xperia Active"], ST18a: ["Sony Ericsson", "Xperia Ray"], ST18i: ["Sony Ericsson", "Xperia Ray"], ST18iv: ["Sony Ericsson", "Xperia Ray"], ST18av: ["Sony Ericsson", "Xperia Ray"], SonyST21: ["Sony", "'Tapioca'"], SonyST21i: ["Sony", "'Tapioca'"], SonyST21a2: ["Sony", "'Tapioca'"], ST21: ["Sony", "'Tapioca'"], ST21i: ["Sony", "'Tapioca'"], SonyST23i: ["Sony", "'Tapioca DS'"], ST25i: ["Sony", "Xperia U"], ST27i: ["Sony", "Xperia Go"], U20a: ["Sony Ericsson", "Xperia X10 Mini Pro"], U20i: ["Sony Ericsson", "Xperia X10 Mini Pro"], U20iv: ["Sony Ericsson", "Xperia X10 Mini Pro"], WT13i: ["Sony Ericsson", "Mix Walkman"], WT18i: ["Sony Ericsson", "Walkman"], WT19a: ["Sony Ericsson", "Live with Walkman"], WT19i: ["Sony Ericsson", "Live with Walkman"], WT19iv: ["Sony Ericsson", "Live with Walkman"], X8: ["Sony Ericsson", "Xperia X8"], X10: ["Sony Ericsson", "Xperia X10"], X10a: ["Sony Ericsson", "Xperia X10"], X10i: ["Sony Ericsson", "Xperia X10"], X10iv: ["Sony Ericsson", "Xperia X10"], X10S: ["Sony Ericsson", "Xperia X10"], X10mini: ["Sony Ericsson", "Xperia X10 Mini"], "X10 Mini": ["Sony Ericsson", "Xperia X10 Mini"], "X10 Mini Pro": ["Sony Ericsson", "Xperia X10 Mini Pro"], Z1i: ["Sony Ericsson", "Xperia Play"], S51SE: ["Sony Ericsson", "Xperia Mini"], IS11S: ["Sony Ericsson", "Xperia Acro"], IS12S: ["Sony Ericsson", "Xperia Acro HD"], "SO-01B": ["Sony Ericsson", "Xperia X10"], "SO-01C": ["Sony Ericsson", "Xperia Arc"], "SO-01D": ["Sony Ericsson", "Xperia Play"], "SO-02C": ["Sony Ericsson", "Xperia Acro"], "SO-02D": ["Sony Ericsson", "Xperia NX"], "SO-03C": ["Sony Ericsson", "Xperia Ray"], "SO-03D": ["Sony Ericsson", "Xperia Acro HD"], "SO-04D": ["Sony", "Xperia GX"], "SO-05D": ["Sony", "Xperia SX"], "XPERIA X8": ["Sony Ericsson", "Xperia X8"], "Xperia X8": ["Sony Ericsson", "Xperia X8"], "Xperia X10": ["Sony Ericsson", "Xperia X10"], "Xperia ray": ["Sony Ericsson", "Xperia Ray"], "Xperia Ray": ["Sony Ericsson", "Xperia Ray"], "Xperia Arc": ["Sony Ericsson", "Xperia Arc"], "Xperia Mini": ["Sony Ericsson", "Xperia Mini"], "Xperia neo": ["Sony Ericsson", "Xperia Neo"], "Xperia Neo": ["Sony Ericsson", "Xperia Neo"], "XPERIA NEO": ["Sony Ericsson", "Xperia Neo"], "Xperia NeoV": ["Sony Ericsson", "Xperia Neo V"], "Xperia Neo V": ["Sony Ericsson", "Xperia Neo V"], "Xperia Play": ["Sony Ericsson", "Xperia Play"], "Sony Ericsson Xperia X1": ["Sony Ericsson", "Xperia X1"], SonyHayabusa: ["Sony", "Xperia Ion"], Hayabusa: ["Sony", "Xperia Ion"], nozomi: ["Sony", "Xperia S"], "Sony Tablet P": ["Sony", "Tablet P", "tablet"], "Sony Tablet S": ["Sony", "Tablet S", "tablet"], "NWZ-Z1000Series": ["Sony", "Walkman Z", "media"], "NW-Z1000Series": ["Sony", "Walkman Z", "media"], "Spice Mi280": ["Spice", "Mi-280"], "Spice Mi300": ["Spice", "Mi-300"], "Spice Mi-310": ["Spice", "Mi-310"], "Spice Mi-425": ["Spice", "Mi-425"], "SPICE Mi-720": ["Spice", "Mi-720"], "A7272+": ["Star", "A7272+"], "e1109 v73 gq1002 ctp": ["Star", "X18i"], TS1004T: ["Surf 3Q", "TS1004T", "tablet"], "SYTABEX7-2": ["Sylvania", "SYTABEX7", "tablet"], "TCL A860": ["TCL", "A860"], "TCL A906": ["TCL", "A906"], "TCL A909": ["TCL", "A909"], "TCL A919": ["TCL", "A919"], "TCL A990": ["TCL", "A990"], "TCL A996": ["TCL", "A996"], "TCL A998": ["TCL", "A998"], "TCL GENESEE E708": ["TCL", "Genesee E708"], "A10t(5DM3)": ["Teclast", "A10T", "tablet"], P72: ["Teclast", "P72", "tablet"], P76TI: ["Teclast", "P76Ti", "tablet"], P81HD: ["Teclast", "P81HD", "tablet"], "P85(R8A1)": ["Teclast", "P85", "tablet"], "T720 SE": ["Teclast", "T720", "tablet"], "T760 from moage.com": ["Teclast", "T760", "tablet"], tegav2: ["Tegatech", "TEGA v2", "tablet"], "TM-7025": ["teXet", "TM-7025", "tablet"], MoFing: ["Thomson", "MoFing", "tablet"], Ultimate10: ["Tomtec", "Ultimate10", "tablet"], "Thl V7": ["THL", "V7"], "ThL V7": ["THL", "V7"], "ThL V8": ["THL", "V8"], "ThL V9": ["THL", "V9"], "ThL V11": ["THL", "V11"], "TSB CLOUD COMPANION;TOSHIBA AC AND AZ": ["Toshiba", "Dynabook AZ", "desktop"], "TOSHIBA AC AND AZ": ["Toshiba", "Dynabook AZ", "desktop"], "TOSHIBA FOLIO AND A": ["Toshiba", "Folio 100", "tablet"], "T-01C": ["Toshiba", "Regza T-01C"], "T-01D": ["Toshiba", "Regza T-01D"], IS04: ["Toshiba", "Regza IS04"], IS11T: ["Toshiba", "Regza IS11T"], AT1S0: ["Toshiba", "Regza AT1S0"], Tostab03: ["Toshiba", "Regza AT100", "tablet"], AT100: ["Toshiba", "Regza AT100", "tablet"], AT200: ["Toshiba", "Regza AT200", "tablet"], AT470: ["Toshiba", "Regza AT470", "tablet"], AT570: ["Toshiba", "Regza AT570", "tablet"], AT830: ["Toshiba", "Regza AT830", "tablet"], "Folio 100": ["Toshiba", "Folio 100", "tablet"], folio100: ["Toshiba", "Folio 100", "tablet"], THRiVE: ["Toshiba", "THRiVE", "tablet"], "Fantastic T3": ["TWM", "Fantastic T3"], M70014: ["United Star Technology", "M70014", "tablet"], PS47: ["Velocity Micro", "Cruz PS47", "tablet"], T301: ["Velocity Micro", "Cruz T301", "tablet"], "Vibo-A688": ["FIH", "Vibo A688"], "Videocon-V7500": ["Videocon", "V7500"], GTablet: ["ViewSonic", "gTablet", "tablet"], GtabComb: ["ViewSonic", "gTablet", "tablet"], "TeamDRH ICS for GTablet": ["ViewSonic", "gTablet", "tablet"], ViewPad7: ["ViewSonic", "ViewPad 7", "tablet"], "ViewPad 10e": ["ViewSonic", "ViewPad 10e", "tablet"], VTAB1008: ["Vizio", "VTAB1008", "tablet"], VTAB3010: ["Vizio", "VTAB3010", "tablet"], "VOTO W5300": ["VOTO", "W5300"], "xPAD-70": ["WayteQ", "xPAD-70", "tablet"], "xTAB-70": ["WayteQ", "xTAB-70", "tablet"], "WellcoM-A99": ["WellcoM", "A99"], N12: ["Window", "N12", "tablet"], N12R: ["Window", "N12R", "tablet"], N50: ["Window", "N50", "tablet"], N50DT: ["Window", "N50DT", "tablet"], N50GT: ["Window", "N50GT", "tablet"], "N50GT A": ["Window", "N50GT-A", "tablet"], N70: ["Window", "N70", "tablet"], "N70 DUAL CORE": ["Window", "N70 Dual Core", "tablet"], N80: ["Window", "N80", "tablet"], N90: ["Window", "N90", "tablet"], "N90 DUAL CORE2 V12": ["Window", "N90 Dual Core", "tablet"], N612: ["Wishway", "N612"], "AT-AS43D": ["Wolfgang", "AT-AS43D"], M12: ["Wopad", "M12", "tablet"], WM8650: ["WonderMedia", "WM8650", "tablet"], "MI-ONE": ["Xiaomi", "MI-ONE"], "MI-ONE C1": ["Xiaomi", "MI-ONE C1"], "MI-ONE Plus": ["Xiaomi", "MI-ONE Plus"], "MI 1S": ["Xiaomi", "MI-ONE Plus"], "MI 1SC": ["Xiaomi", "MI-ONE 1SC"], "mione plus": ["Xiaomi", "MI-ONE Plus"], "MI-TWO": ["Xiaomi", "MI-TWO"], "MI 2": ["Xiaomi", "MI-TWO"], "MI 2S": ["Xiaomi", "MI-TWO Plus"], "MI 2SC": ["Xiaomi", "MI-TWO Plus"], Q07CL01: ["XVision", "Q07", "tablet"], N6: ["Yarvik", "210 Tablet", "tablet"], EMR1879: ["Yidong", "EMR1879", "tablet"], "yusun W702": ["Yusun", "W702"], "YX-YUSUN E80": ["Yusun", "E80"], zt180: ["Zenithink", "ZT-180", "tablet"], Jaguar7: ["ZiiLabs", "Jaguar 7", "tablet"], "Ziss Ranger HD": ["Ziss", "Ranger HD"], "ZTE Libra": ["ZTE", "Libra"], "ZTE-T T9": ["ZTE", "Light Tab T9", "tablet"], V9: ["ZTE", "Light Tab V9", "tablet"], "V9e+": ["ZTE", "Light Tab 2", "tablet"], V9A: ["ZTE", "Light Tab 2", "tablet"], "Light Tab 2W": ["ZTE", "Light Tab 2", "tablet"], "Light Tab 2": ["ZTE", "Light Tab 2", "tablet"], V9C: ["ZTE", "Light Tab 3", "tablet"], V55: ["ZTE", "Optik", "tablet"], Acqua: ["ZTE", "Acqua"], Blade: ["ZTE", "Blade"], "Blade-V880": ["ZTE", "Blade"], "ZTE-U V880": ["ZTE", "Blade"], "Blade-opda": ["ZTE", "Blade"], "ZTE-BLADE": ["ZTE", "Blade"], "ZTE Blade": ["ZTE", "Blade"], "ZTE V880": ["ZTE", "Blade"], "ZTE-U(V)880+": ["ZTE", "Blade"], V880: ["ZTE", "Blade"], a5: ["ZTE", "Blade"], Blade2: ["ZTE", "Blade 2"], "Blade S": ["ZTE", "Blade S"], X500: ["ZTE", "Score"], "ZTE-X500": ["ZTE", "Score"], Skate: ["ZTE", "Skate"], "ZTE Skate": ["ZTE", "Skate"], "ZTE-Skate": ["ZTE", "Skate"], "ZTE-SKATE": ["ZTE", "Skate"], "ZTE-V960": ["ZTE", "Skate"], "ZTE-U V960": ["ZTE", "Skate"], "ZTE Racer": ["ZTE", "Racer"], "ZTE-RACER": ["ZTE", "Racer"], "MTC 916": ["ZTE", "Racer"], Racer: ["ZTE", "Racer"], RacerII: ["ZTE", "Racer 2"], RACERII: ["ZTE", "Racer 2"], "ZTE Roamer": ["ZTE", "Roamer"], N860: ["ZTE", "Warp"], N880: ["ZTE", "Blade"], "ZTE-T U802": ["ZTE", "T-U802"], "ZTE-T U806": ["ZTE", "T-U806"], "ZTE-T U812": ["ZTE", "T-U812"], "ZTE-T U830": ["ZTE", "T-U830"], "ZTE-T U880": ["ZTE", "T-U880"], "ZTE T U880": ["ZTE", "T-U880"], "ZTE-TU880": ["ZTE", "T-U880"], "ZTE-TU900": ["ZTE", "T-U900"], "ZTE-T U960": ["ZTE", "T-U960"], "ZTE-TU960s": ["ZTE", "T-U960"], "ZTE-T U960s": ["ZTE", "T-U960"], "ZTE U N720": ["ZTE", "U-N720"], "ZTE-U V856": ["ZTE", "U-V856"], "ZTE-U V857": ["ZTE", "U-V857"], "ZTE-U V881": ["ZTE", "U-V881"], "ZTE-U X850": ["ZTE", "U-X850"], "ZTE-U X876": ["ZTE", "U-X876"], "ZTE-X876": ["ZTE", "U-X876"], "ZTE-C R750": ["ZTE", "C-R750"], "ZTE-C N600": ["ZTE", "C-N600"], "ZTE-C N600+": ["ZTE", "C-N600"], "ZTE-C N606": ["ZTE", "C-N606"], "ZTE-C N700": ["ZTE", "C-N700"], "ZTE-C N760": ["ZTE", "C-N760"], "ZTE-C N880": ["ZTE", "C-N880"], "ZTE-C N880S": ["ZTE", "C-N880"], "ZTE-C N880s": ["ZTE", "C-N880"], "ZTE-C X500": ["ZTE", "C-X500"], "ZTE-C X920": ["ZTE", "C-X920"], "ZXY-ZTE-C X920": ["ZTE", "C-X920"], "ZTE GV821": ["ZTE", "G-V821"], "ZTE N880E": ["ZTE", "N880E"], "ZTE-N880E": ["ZTE", "N880E"], "MIUI N880S": ["ZTE", "N880S"], "ZTE N882E": ["ZTE", "N882E"], "ZTE N855D": ["ZTE", "N855D"], "ZTE-N910": ["ZTE", "N910"], E810: ["ZTE", "E810"], u880: ["ZTE", "U880"], "ZTE U880E": ["ZTE", "U880E"], U880: ["ZTE", "U880"], "ZTE U970": ["ZTE", "U970"], "ZTE V768": ["ZTE", "V768"], "ZTE-V856": ["ZTE", "V856"], "ZTE V877b": ["ZTE", "V877"], "ZTE V889D": ["ZTE", "V889"], "ZTE-Z990": ["ZTE", "Z990"], ZTEU790: ["ZTE", "U790"], "003Z": ["ZTE", "Softbank 003Z"], "008Z": ["ZTE", "Softbank 008Z"], "009Z": ["ZTE", "Softbank Star7"], "i-mobile i691": ["i-Mobile", "i691"], "i-mobile i695": ["i-Mobile", "i695"], "i-mobile i858": ["i-Mobile", "i858"], "i-mobile 3G 8500": ["i-Mobile", "3G 8500"], "i-mobile I-Note": ["i-Mobile", "i-Note", "tablet"], "Optimus Boston": ["Optimus", "Boston"], "Optimus San Francisco": ["Optimus", "San Francisco"], "Optimus Monte Carlo": ["Optimus", "Monte Carlo"], "Orange Boston": ["Orange", "Boston"], "Orange Monte Carlo": ["Orange", "Monte Carlo"], "San Francisco": ["Orange", "San Francisco"], "San Francisco for Orange": ["Orange", "San Francisco"], "Orange San Francisco": ["Orange", "San Francisco"], MOVE: ["T-Mobile", "MOVE"], "T-Mobile G1": ["T-Mobile", "G1"], "T-Mobile G2": ["T-Mobile", "G2"], "T-Mobile G2 Touch": ["T-Mobile", "G2"], "LG-P999": ["T-Mobile", "G2x"], "LG-E739": ["T-Mobile", "myTouch"], "T-Mobile myTouch 3G": ["T-Mobile", "myTouch 3G"], "T-Mobile myTouch 3G Slide": ["T-Mobile", "myTouch 3G Slide"], "T-Mobile Espresso": ["T-Mobile", "myTouch 3G Slide"], "HTC myTouch 3G Slide": ["T-Mobile", "myTouch 3G Slide"], "T-Mobile myTouch 4G": ["T-Mobile", "myTouch 4G"], "HTC Glacier": ["T-Mobile", "myTouch 4G"], "HTC Panache": ["T-Mobile", "myTouch 4G"], myTouch4G: ["T-Mobile", "myTouch 4G"], "My Touch 4G": ["T-Mobile", "myTouch 4G"], "HTC Mytouch 4G": ["T-Mobile", "myTouch 4G"], "HTC My Touch 4G": ["T-Mobile", "myTouch 4G"], "HTC mytouch4g": ["T-Mobile", "myTouch 4G"], "HTC myTouch 4G Slide": ["T-Mobile", "myTouch 4G Slide"], "myTouch 4G Slide": ["T-Mobile", "myTouch 4G Slide"], "T-Mobile myTouch Q": ["T-Mobile", "myTouch Q"], "LG-C800": ["T-Mobile", "myTouch Q"], "Pulse Mini": ["T-Mobile", "Pulse Mini"], "Vodafone 845": ["Vodafone", "845 Nova"], "Vodafone 858": ["Vodafone", "858 Smart"], "Vodafone 945": ["Vodafone", "945"], "Vodafone Smart II": ["Vodafone", "Smart II"], SmartTab10: ["Vodafone", "SmartTab 10", "tablet"], "SCH-N719": ["Samsung", "Galaxy Note II"], "Coolpad 8190": ["Coolpad", "8190"], U705T: ["Oppo", "Ulike2"], "Coolpad 8020+": ["Coolpad", "8020"], "Huawei Y310-5000": ["Huawei", "Y310"], "GT-S7572": ["Samsung", "Galaxy Trend Duos II"], "Lenovo A278t": ["Lenovo", "A278t"], "Lenovo A690": ["Lenovo", "A690"], "GT-I8262D": ["Samsung", "LePhone I8262D"] }, i(n, "Lenovo A278t", ["Lenovo", "A278t"]), i(n, "MI 2C", ["Xiaomi", "MI-TWO"]), i(n, "Coolpad 8070", ["Coolpad", "8070"]), i(n, "R813T", ["Oppo", "R813T"]), i(n, "ZTE U930", ["ZTE", "U930"]), i(n, "Lenovo A360", ["Lenovo", "LePhone A360"]), i(n, "SCH-N719", ["Samsung", "Galaxy Note II"]), i(n, "Coolpad 8010", ["Coolpad", "8010"]), i(n, "LENOVO-Lenovo-A288t", ["Lenovo", "A288t"]), i(n, "U701T", ["Oppo", "U701T"]), i(n, "ZTEU795", ["Coolpad", "U795"]), i(n, "Haier-HT-I617", ["Haier", "I617"]), i(n, "ZTEU880s", ["ZTE", "T-U880"]), i(n, "GT-S6352", ["Samsung", "GT-S6352"]), i(n, "GT-S7568", ["Samsung", "GT-S7568"]), i(n, "K-Touch T619+", ["K-Touch", "T619"]), i(n, "MI 2A", ["Xiaomi", "MI-TWO A"]), i(n, "GT-N7108", ["Samsung", "Galaxy Note II"]), i(n, "K-Touch T621", ["K-Touch", "T621"]), i(n, "LENOVO-Lenovo-A298t", ["Lenovo", "A298"]), i(n, "Coolpad 8150", ["Coolpad", "8150"]), i(n, "5860S", ["Coolpad", "5860"]), i(n, "ZTEU807", ["ZTE", "U807"]), i(n, "SCH-I739", ["Samsung", "SCH-I739"]), i(n, "SCH-I829", ["Samsung", "SCH-I829"]), i(n, "HS-E830", ["Hisense", "E830"]), i(n, "HS-E920", ["Hisense", "E920"]), i(n, "Lenovo S720", ["Lenovo", "S720"]), i(n, "MI 2C", ["Xiaomi", "MI-TWO"]), i(n, "OPPO R813T", ["Oppo", "R813"]), i(n, "SCH-I879", ["Samsung", "Galaxy Note"]), i(n, "GT-S6102E", ["Samsung", "Galaxy Y Duos"]), n),
                                d = { 9600: "Bold", 9650: "Bold", 9700: "Bold", 9780: "Bold", 9790: "Bold", 9900: "Bold", 9930: "Bold", 8300: "Curve", 8310: "Curve", 8320: "Curve", 8330: "Curve", "8350i": "Curve", 8520: "Curve", 8530: "Curve", 8900: "Curve", 9220: "Curve", 9300: "Curve", 9330: "Curve", 9350: "Curve", 9360: "Curve", 9370: "Curve", 9380: "Curve", 8100: "Pearl", 8110: "Pearl", 8120: "Pearl", 8130: "Pearl", 8220: "Pearl", 8230: "Pearl", 9100: "Pearl", 9105: "Pearl", 9530: "Storm", 9550: "Storm", 9670: "Style", 9800: "Torch", 9810: "Torch", 9850: "Torch", 9860: "Torch", 9630: "Tour", 9981: "Porsche P" },
                                m = function() { this.initialize.apply(this, Array.prototype.slice.call(arguments)) };
                            m.prototype = { initialize: function(e) { this.original = e.value || null, this.alias = e.alias || null } };
                            var p = function() { this.initialize.apply(this, arguments) };
                            return p.prototype = {
                                initialize: function(e, t) { this.options = { useFeatures: t && t.useFeatures || !1, detectCamouflage: t && t.detectCamouflage || !0 }, this.browser = { stock: !0, hidden: !1, channel: "" }, this.engine = {}, this.os = {}, this.device = { type: "desktop", identified: !1 }, this.camouflage = !1, this.features = [], this.detect(e) },
                                detect: function(n) {
                                    var i;
                                    if (n.match("Unix") && (this.os.name = "Unix"), n.match("FreeBSD") && (this.os.name = "FreeBSD"), n.match("OpenBSD") && (this.os.name = "OpenBSD"), n.match("NetBSD") && (this.os.name = "NetBSD"), n.match("SunOS") && (this.os.name = "Solaris"), n.match("Linux") && (this.os.name = "Linux", n.match("CentOS") && (this.os.name = "CentOS", (i = /CentOS\/[0-9\.\-]+el([0-9_]+)/.exec(n)) && (this.os.version = new m({ value: i[1].replace(/_/g, ".") }))), n.match("Debian") && (this.os.name = "Debian"), n.match("Fedora") && (this.os.name = "Fedora", (i = /Fedora\/[0-9\.\-]+fc([0-9]+)/.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match("Gentoo") && (this.os.name = "Gentoo"), n.match("Kubuntu") && (this.os.name = "Kubuntu"), n.match("Mandriva Linux") && (this.os.name = "Mandriva", (i = /Mandriva Linux\/[0-9\.\-]+mdv([0-9]+)/.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match("Mageia") && (this.os.name = "Mageia", (i = /Mageia\/[0-9\.\-]+mga([0-9]+)/.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match("Red Hat") && (this.os.name = "Red Hat", (i = /Red Hat[^\/]*\/[0-9\.\-]+el([0-9_]+)/.exec(n)) && (this.os.version = new m({ value: i[1].replace(/_/g, ".") }))), n.match("Slackware") && (this.os.name = "Slackware"), n.match("SUSE") && (this.os.name = "SUSE"), n.match("Turbolinux") && (this.os.name = "Turbolinux"), n.match("Ubuntu") && (this.os.name = "Ubuntu", (i = /Ubuntu\/([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })))), n.match("iPhone( Simulator)?;") || n.match("iPad;") || n.match("iPod;") || n.match(/iPhone\s*\d*s?[cp]?;/i) ? (this.os.name = "iOS", this.os.version = new m({ value: "1.0" }), (i = /OS (.*) like Mac OS X/.exec(n)) && (this.os.version = new m({ value: i[1].replace(/_/g, ".") })), n.match("iPhone Simulator;") ? this.device.type = "emulator" : n.match("iPod;") ? (this.device.type = "media", this.device.manufacturer = "Apple", this.device.model = "iPod Touch") : n.match("iPhone;") || n.match(/iPhone\s*\d*s?[cp]?;/i) ? (this.device.type = "mobile", this.device.manufacturer = "Apple", this.device.model = "iPhone") : (this.device.type = "tablet", this.device.manufacturer = "Apple", this.device.model = "iPad"), this.device.identified = !0) : n.match("Mac OS X") && (this.os.name = "Mac OS X", (i = /Mac OS X (10[0-9\._]*)/.exec(n)) && (this.os.version = new m({ value: i[1].replace(/_/g, ".") }))), n.match("Windows")) {
                                        if (this.os.name = "Windows", i = /Windows NT ([0-9]\.[0-9])/.exec(n)) switch (this.os.version = t(i[1]), i[1]) {
                                            case "6.2":
                                                this.os.version = new m({ value: i[1], alias: "8" });
                                                break;
                                            case "6.1":
                                                this.os.version = new m({ value: i[1], alias: "7" });
                                                break;
                                            case "6.0":
                                                this.os.version = new m({ value: i[1], alias: "Vista" });
                                                break;
                                            case "5.2":
                                                this.os.version = new m({ value: i[1], alias: "Server 2003" });
                                                break;
                                            case "5.1":
                                                this.os.version = new m({ value: i[1], alias: "XP" });
                                                break;
                                            case "5.0":
                                                this.os.version = new m({ value: i[1], alias: "2000" });
                                                break;
                                            default:
                                                this.os.version = new m({ value: i[1], alias: "NT " + this.os.version })
                                        }
                                        if ((n.match("Windows 95") || n.match("Win95") || n.match("Win 9x 4.00")) && (this.os.version = new m({ value: "4.0", alias: "95" })), (n.match("Windows 98") || n.match("Win98") || n.match("Win 9x 4.10")) && (this.os.version = new m({ value: "4.1", alias: "98" })), (n.match("Windows ME") || n.match("WinME") || n.match("Win 9x 4.90")) && (this.os.version = new m({ value: "4.9", alias: "ME" })), (n.match("Windows XP") || n.match("WinXP")) && (this.os.name = new m({ value: "5.1", alias: "XP" })), n.match("WP7") && (this.os.name = "Windows Phone", this.os.version = new m({ value: "7.0", details: 2 }), this.device.type = "mobile", this.browser.mode = "desktop"), (n.match("Windows CE") || n.match("WinCE") || n.match("WindowsCE")) && (n.match(" IEMobile") ? (this.os.name = "Windows Mobile", n.match(" IEMobile 8") && (this.os.version = new m({ value: "6.5", details: 2 })), n.match(" IEMobile 7") && (this.os.version = new m({ value: "6.1", details: 2 })), n.match(" IEMobile 6") && (this.os.version = new m({ value: "6.0", details: 2 }))) : (this.os.name = "Windows CE", (i = /WindowsCEOS\/([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1], details: 2 })), (i = /Windows CE ([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1], details: 2 }))), this.device.type = "mobile"), n.match("Windows Mobile") && (this.os.name = "Windows Mobile", this.device.type = "mobile"), (i = /WindowsMobile\/([0-9.]*)/.exec(n)) && (this.os.name = "Windows Mobile", this.os.version = new m({ value: i[1], details: 2 }), this.device.type = "mobile"), n.match("Windows Phone [0-9]") && (this.os.name = "Windows Mobile", this.os.version = new m({ value: n.match(/Windows Phone ([0-9.]*)/)[1], details: 2 }), this.device.type = "mobile"), n.match("Windows Phone OS")) {
                                            this.os.name = "Windows Phone", this.os.version = new m({ value: n.match(/Windows Phone OS ([0-9.]*)/)[1], details: 2 }), this.os.version < 7 && (this.os.name = "Windows Mobile"), (i = /IEMobile\/[^;]+; ([^;]+); ([^;]+)[;|\)]/.exec(n)) && (this.device.manufacturer = i[1], this.device.model = i[2]), this.device.type = "mobile";
                                            var p = this.device.manufacturer,
                                                h = e(this.device.model);
                                            void 0 !== u[p] && void 0 !== u[p][h] && (this.device.manufacturer = u[p][h][0], this.device.model = u[p][h][1], this.device.identified = !0), "Microsoft" === p && "XDeviceEmulator" === h && (this.device.manufacturer = null, this.device.model = null, this.device.type = "emulator", this.device.identified = !0)
                                        }
                                    }
                                    if (n.match("Android")) {
                                        if (this.os.name = "Android", this.os.version = null, (i = /Android(?: )?(?:AllPhone_|CyanogenMod_)?(?:\/)?v?([0-9.]+)/.exec(n.replace("-update", "."))) && (this.os.version = new m({ value: i[1], details: 3 })), n.match("Android Eclair") && (this.os.version = new m({ value: "2.0", details: 3 })), this.device.type = "mobile", this.os.version >= 3 && (this.device.type = "tablet"), this.os.version >= 4 && n.match("Mobile") && (this.device.type = "mobile"), (i = /Eclair; (?:[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?) Build\/([^\/]*)\//.exec(n)) ? this.device.model = i[1] : (i = /; ([^;]*[^;\s])\s+Build/.exec(n)) ? this.device.model = i[1] : (i = /[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?; ([^;]*[^;\s]);\s+Build/.exec(n)) ? this.device.model = i[1] : (i = /\(([^;]+);U;Android\/[^;]+;[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(n)) ? this.device.model = i[1] : (i = /;\s?([^;]+);\s?[0-9]+\*[0-9]+;\s?CTC\/2.0/.exec(n)) ? this.device.model = i[1] : (i = /zh-cn;\s*(.*?)(\/|build)/i.exec(n)) ? this.device.model = i[1] : (i = /Android [^;]+; (?:[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?; )?([^)]+)\)/.exec(n)) ? n.match(/[a-zA-Z][a-zA-Z](?:[-_][a-zA-Z][a-zA-Z])?/) || (this.device.model = i[1]) : (i = /^(.+?)\/\S+/i.exec(n)) && (this.device.model = i[1]), this.device.model && "Android" === this.device.model.substring(0, 7) && (this.device.model = null), this.device.model) {
                                            var h = e(this.device.model);
                                            void 0 !== l[h] && (this.device.manufacturer = l[h][0], this.device.model = l[h][1], void 0 !== l[h][2] && (this.device.type = l[h][2]), this.device.identified = !0), "Emulator" !== h && "x86 Emulator" !== h && "x86 VirtualBox" !== h && "vm" !== h || (this.device.manufacturer = null, this.device.model = null, this.device.type = "emulator", this.device.identified = !0)
                                        }
                                        n.match("HP eStation") && (this.device.manufacturer = "HP", this.device.model = "eStation", this.device.type = "tablet", this.device.identified = !0), n.match("Pre/1.0") && (this.device.manufacturer = "Palm", this.device.model = "Pre", this.device.identified = !0), n.match("Pre/1.1") && (this.device.manufacturer = "Palm", this.device.model = "Pre Plus", this.device.identified = !0), n.match("Pre/1.2") && (this.device.manufacturer = "Palm", this.device.model = "Pre 2", this.device.identified = !0), n.match("Pre/3.0") && (this.device.manufacturer = "HP", this.device.model = "Pre 3", this.device.identified = !0), n.match("Pixi/1.0") && (this.device.manufacturer = "Palm", this.device.model = "Pixi", this.device.identified = !0), n.match("Pixi/1.1") && (this.device.manufacturer = "Palm", this.device.model = "Pixi Plus", this.device.identified = !0), n.match("P160UN?A?/1.0") && (this.device.manufacturer = "HP", this.device.model = "Veer", this.device.identified = !0)
                                    }
                                    if (n.match("GoogleTV") && (this.os.name = "Google TV", n.match("Chrome/5.") && (this.os.version = new m({ value: "1" })), n.match("Chrome/11.") && (this.os.version = new m({ value: "2" })), this.device.type = "television"), n.match("WoPhone") && (this.os.name = "WoPhone", (i = /WoPhone\/([0-9\.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), this.device.type = "mobile"), n.match("BlackBerry") && (this.os.name = "BlackBerry OS", n.match("Opera") ? this.device.model = "BlackBerry" : ((i = /BlackBerry([0-9]*)\/([0-9.]*)/.exec(n)) && (this.device.model = i[1], this.os.version = new m({ value: i[2], details: 2 })), (i = /; BlackBerry ([0-9]*);/.exec(n)) && (this.device.model = i[1]), (i = /Version\/([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1], details: 2 })), this.os.version >= 10 && (this.os.name = "BlackBerry"), void 0 !== this.device.model ? void 0 !== d[this.device.model] ? this.device.model = "BlackBerry " + d[this.device.model] + " " + this.device.model : this.device.model = "BlackBerry " + this.device.model : this.device.model = "BlackBerry"), this.device.manufacturer = "RIM", this.device.type = "mobile", this.device.identified = !0), n.match("RIM Tablet OS") ? (this.os.name = "BlackBerry Tablet OS", this.os.version = new m({ value: n.match(/RIM Tablet OS ([0-9.]*)/)[1], details: 2 }), this.device.manufacturer = "RIM", this.device.model = "BlackBerry PlayBook", this.device.type = "tablet", this.device.identified = !0) : n.match("PlayBook") && (i = /Version\/(10[0-9.]*)/.exec(n)) && (this.os.name = "BlackBerry", this.os.version = new m({ value: i[1], details: 2 }), this.device.manufacturer = "RIM", this.device.model = "BlackBerry PlayBook", this.device.type = "tablet", this.device.identified = !0), n.match("(?:web|hpw)OS") && (this.os.name = "webOS", this.os.version = new m({ value: n.match(/(?:web|hpw)OS\/([0-9.]*)/)[1] }), n.match("tablet") ? this.device.type = "tablet" : this.device.type = "mobile", this.device.manufacturer = n.match("hpwOS") ? "HP" : "Palm", n.match("Pre/1.0") && (this.device.model = "Pre"), n.match("Pre/1.1") && (this.device.model = "Pre Plus"), n.match("Pre/1.2") && (this.device.model = "Pre2"), n.match("Pre/3.0") && (this.device.model = "Pre3"), n.match("Pixi/1.0") && (this.device.model = "Pixi"), n.match("Pixi/1.1") && (this.device.model = "Pixi Plus"), n.match("P160UN?A?/1.0") && (this.device.model = "Veer"), n.match("TouchPad/1.0") && (this.device.model = "TouchPad"), (n.match("Emulator/") || n.match("Desktop/")) && (this.device.type = "emulator", this.device.manufacturer = null, this.device.model = null), this.device.identified = !0), (n.match("Symbian") || n.match("Series[ ]?60") || n.match("S60")) && (this.os.name = "Series60", n.match("SymbianOS/9.1") && !n.match("Series60") && (this.os.version = new m({ value: "3.0" })), (i = /Series60\/([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), (i = /Nokia([^\/;]+)[\/|;]/.exec(n)) && "Browser" !== i[1] && (this.device.manufacturer = "Nokia", this.device.model = i[1], this.device.identified = !0), (i = /Vertu([^\/;]+)[\/|;]/.exec(n)) && (this.device.manufacturer = "Vertu", this.device.model = i[1], this.device.identified = !0), (i = /Symbian; U; ([^;]+); [a-z][a-z]\-[a-z][a-z]/i.exec(n)) && (this.device.manufacturer = "Nokia", this.device.model = i[1], this.device.identified = !0), (i = /Samsung\/([^;]*);/.exec(n)) && (this.device.manufacturer = "Samsung", this.device.model = i[1], this.device.identified = !0), this.device.type = "mobile"), n.match("Series40") && (this.os.name = "Series40", (i = /Nokia([^\/]+)\//.exec(n)) && (this.device.manufacturer = "Nokia", this.device.model = i[1], this.device.identified = !0), this.device.type = "mobile"), n.match("MeeGo") && (this.os.name = "MeeGo", this.device.type = "mobile", (i = /Nokia([^\)]+)\)/.exec(n)) && (this.device.manufacturer = "Nokia", this.device.model = i[1], this.device.identified = !0)), n.match("Maemo") && (this.os.name = "Maemo", this.device.type = "mobile", (i = /(N[0-9]+)/.exec(n)) && (this.device.manufacturer = "Nokia", this.device.model = i[1], this.device.identified = !0)), n.match("Tizen") && (this.os.name = "Tizen", (i = /Tizen[\/ ]([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), this.device.type = "mobile", (i = /\(([^;]+); ([^\/]+)\//.exec(n)) && "Linux" !== i[1] && (this.device.manufacturer = i[1], this.device.model = i[2], void 0 !== r[this.device.manufacturer] && void 0 !== r[this.device.manufacturer][this.device.model]))) {
                                        var p = this.device.manufacturer,
                                            h = e(this.device.model);
                                        this.device.manufacturer = r[p][h][0], this.device.model = r[p][h][1], this.device.identified = !0
                                    }
                                    if (n.match("[b|B]ada") && (this.os.name = "Bada", (i = /[b|B]ada\/([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), this.device.type = "mobile", (i = /\(([^;]+); ([^\/]+)\//.exec(n)) && (this.device.manufacturer = i[1], this.device.model = e(i[2])), void 0 !== a[this.device.manufacturer] && void 0 !== a[this.device.manufacturer][this.device.model])) {
                                        var p = this.device.manufacturer,
                                            h = e(this.device.model);
                                        this.device.manufacturer = a[p][h][0], this.device.model = a[p][h][1], this.device.identified = !0
                                    }
                                    if ((n.match(/BREW/i) || n.match("BMP; U")) && (this.os.name = "Brew", this.device.type = "mobile", (i = /BREW; U; ([0-9.]*)/i.exec(n)) ? this.os.version = new m({ value: i[1] }) : (i = /;BREW\/([0-9.]*)/i.exec(n)) && (this.os.version = new m({ value: i[1] })), (i = /\(([^;]+);U;REX\/[^;]+;BREW\/[^;]+;(?:.*;)?[0-9]+\*[0-9]+;CTC\/2.0\)/.exec(n)) && (this.device.model = i[1]), this.device.model)) {
                                        var h = e(this.device.model);
                                        void 0 !== s[h] && (this.device.manufacturer = s[h][0], this.device.model = s[h][1], this.device.identified = !0)
                                    }
                                    if (n.match(/\(MTK;/) && (this.os.name = "MTK", this.device.type = "mobile"), n.match("CrOS") && (this.os.name = "Chrome OS", this.device.type = "desktop"), n.match("Joli OS") && (this.os.name = "Joli OS", this.device.type = "desktop", (i = /Joli OS\/([0-9.]*)/i.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match("Haiku") && (this.os.name = "Haiku", this.device.type = "desktop"), n.match("QNX") && (this.os.name = "QNX", this.device.type = "mobile"), n.match("OS/2; Warp") && (this.os.name = "OS/2 Warp", this.device.type = "desktop", (i = /OS\/2; Warp ([0-9.]*)/i.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match("Grid OS") && (this.os.name = "Grid OS", this.device.type = "tablet", (i = /Grid OS ([0-9.]*)/i.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match(/AmigaOS/i) && (this.os.name = "AmigaOS", this.device.type = "desktop", (i = /AmigaOS ([0-9.]*)/i.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match(/MorphOS/i) && (this.os.name = "MorphOS", this.device.type = "desktop", (i = /MorphOS ([0-9.]*)/i.exec(n)) && (this.os.version = new m({ value: i[1] }))), n.match("Kindle") && !n.match("Fire") && (this.os.name = "", this.device.manufacturer = "Amazon", this.device.model = "Kindle", this.device.type = "ereader", n.match("Kindle/2.0") && (this.device.model = "Kindle 2"), n.match("Kindle/3.0") && (this.device.model = "Kindle 3 or later"), this.device.identified = !0), n.match("nook browser") && (this.os.name = "Android", this.device.manufacturer = "Barnes & Noble", this.device.model = "NOOK", this.device.type = "ereader", this.device.identified = !0), n.match("bookeen/cybook") && (this.os.name = "", this.device.manufacturer = "Bookeen", this.device.model = "Cybook", this.device.type = "ereader", n.match("Orizon") && (this.device.model = "Cybook Orizon"), this.device.identified = !0), n.match("EBRD1101") && (this.os.name = "", this.device.manufacturer = "Sony", this.device.model = "Reader", this.device.type = "ereader", this.device.identified = !0), n.match("Iriver ;") && (this.os.name = "", this.device.manufacturer = "iRiver", this.device.model = "Story", this.device.type = "ereader", n.match("EB07") && (this.device.model = "Story HD EB07"), this.device.identified = !0), n.match("Nintendo Wii") && (this.os.name = "", this.device.manufacturer = "Nintendo", this.device.model = "Wii", this.device.type = "gaming", this.device.identified = !0), n.match("Nintendo DSi") && (this.os.name = "", this.device.manufacturer = "Nintendo", this.device.model = "DSi", this.device.type = "gaming", this.device.identified = !0), n.match("Nintendo 3DS") && (this.os.name = "", this.device.manufacturer = "Nintendo", this.device.model = "3DS", this.device.type = "gaming", (i = /Version\/([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), this.device.identified = !0), n.match("PlayStation Portable") && (this.os.name = "", this.device.manufacturer = "Sony", this.device.model = "Playstation Portable", this.device.type = "gaming", this.device.identified = !0), n.match("PlayStation Vita") && (this.os.name = "", (i = /PlayStation Vita ([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), this.device.manufacturer = "Sony", this.device.model = "PlayStation Vita", this.device.type = "gaming", this.device.identified = !0), n.match(/PlayStation 3/i) && (this.os.name = "", (i = /PLAYSTATION 3;? ([0-9.]*)/.exec(n)) && (this.os.version = new m({ value: i[1] })), this.device.manufacturer = "Sony", this.device.model = "Playstation 3", this.device.type = "gaming", this.device.identified = !0), n.match("Viera") && (this.os.name = "", this.device.manufacturer = "Panasonic", this.device.model = "Smart Viera", this.device.type = "television", this.device.identified = !0), (n.match("AQUOSBrowser") || n.match("AQUOS-AS")) && (this.os.name = "", this.device.manufacturer = "Sharp", this.device.model = "Aquos TV", this.device.type = "television", this.device.identified = !0), n.match("SMART-TV") && (this.os.name = "", this.device.manufacturer = "Samsung", this.device.model = "Smart TV", this.device.type = "television", this.device.identified = !0, (i = /Maple([0-9]*)/.exec(n)) && (this.device.model += " " + i[1])), n.match("SonyDTV|SonyBDP|SonyCEBrowser") && (this.os.name = "", this.device.manufacturer = "Sony", this.device.model = "Internet TV", this.device.type = "television", this.device.identified = !0), n.match("NETTV/") && (this.os.name = "", this.device.manufacturer = "Philips", this.device.model = "Net TV", this.device.type = "television", this.device.identified = !0), (i = /LG NetCast\.(?:TV|Media)-([0-9]*)/.exec(n)) && (this.os.name = "", this.device.manufacturer = "LG", this.device.model = "NetCast TV " + i[1], this.device.type = "television", this.device.identified = !0), (i = /LGSmartTV/.exec(n)) && (this.os.name = "", this.device.manufacturer = "LG", this.device.model = "Smart TV", this.device.type = "television", this.device.identified = !0), (n.match("Toshiba_?TP/") || n.match("TSBNetTV/")) && (this.os.name = "", this.device.manufacturer = "Toshiba", this.device.model = "Smart TV", this.device.type = "television", this.device.identified = !0), (i = /mbxtWebKit\/([0-9.]*)/.exec(n)) && (this.os.name = "", this.browser.name = "MachBlue XT", this.browser.version = new m({ value: i[1], details: 2 }), this.device.type = "television"), (i = /\(ADB; ([^\)]+)\)/.exec(n)) && (this.os.name = "", this.device.manufacturer = "ADB", this.device.model = ("Unknown" !== i[1] ? i[1].replace("ADB", "") + " " : "") + "IPTV receiver", this.device.type = "television", this.device.identified = !0), n.match(/Mstar;OWB/) && (this.os.name = "", this.device.manufacturer = "MStar", this.device.model = "PVR", this.device.type = "television", this.device.identified = !0, this.browser.name = "Origyn Web Browser"), (i = /\TechniSat ([^;]+);/.exec(n)) && (this.os.name = "", this.device.manufacturer = "TechniSat", this.device.model = i[1], this.device.type = "television", this.device.identified = !0), (i = /\Technicolor_([^;]+);/.exec(n)) && (this.os.name = "", this.device.manufacturer = "Technicolor", this.device.model = i[1], this.device.type = "television", this.device.identified = !0), (i = /Winbox Evo2/.exec(n)) && (this.os.name = "", this.device.manufacturer = "Winbox", this.device.model = "Evo2", this.device.type = "television", this.device.identified = !0), i = /^Roku\/DVP-([0-9]+)/.exec(n)) {
                                        switch (this.device.manufacturer = "Roku", this.device.type = "television", i[1]) {
                                            case "2000":
                                                this.device.model = "HD";
                                                break;
                                            case "2050":
                                                this.device.model = "XD";
                                                break;
                                            case "2100":
                                                this.device.model = "XDS";
                                                break;
                                            case "2400":
                                                this.device.model = "LT";
                                                break;
                                            case "3000":
                                                this.device.model = "2 HD";
                                                break;
                                            case "3050":
                                                this.device.model = "2 XD";
                                                break;
                                            case "3100":
                                                this.device.model = "2 XS"
                                        }
                                        this.device.identified = !0
                                    }
                                    if (i = /HbbTV\/1.1.1 \([^;]*;\s*([^;]*)\s*;\s*([^;]*)\s*;/.exec(n)) {
                                        var f = i[1].trim(),
                                            v = i[2].trim();
                                        if (!this.device.manufacturer && "" !== f && "vendorName" !== f) {
                                            switch (f) {
                                                case "LGE":
                                                    this.device.manufacturer = "LG";
                                                    break;
                                                case "TOSHIBA":
                                                    this.device.manufacturer = "Toshiba";
                                                    break;
                                                case "smart":
                                                    this.device.manufacturer = "Smart";
                                                    break;
                                                case "tv2n":
                                                    this.device.manufacturer = "TV2N";
                                                    break;
                                                default:
                                                    this.device.manufacturer = f
                                            }
                                            if (!this.device.model && "" !== v && "modelName" !== v) {
                                                switch (v) {
                                                    case "GLOBAL_PLAT3":
                                                        this.device.model = "NetCast TV";
                                                        break;
                                                    case "SmartTV2012":
                                                        this.device.model = "Smart TV 2012";
                                                        break;
                                                    case "videoweb":
                                                        this.device.model = "Videoweb";
                                                        break;
                                                    default:
                                                        this.device.model = v
                                                }
                                                "Humax" === f && (this.device.model = this.device.model.toUpperCase()), this.device.identified = !0, this.os.name = ""
                                            }
                                        }
                                        this.device.type = "television"
                                    }
                                    if (n.match("InettvBrowser") && (this.device.type = "television"), n.match("MIDP") && (this.device.type = "mobile"), !this.device.model && !this.device.manufacturer) {
                                        var g = [];
                                        n.match(/^(Mozilla|Opera)/) || (i = /^(?:MQQBrowser\/[0-9\.]+\/)?([^\s]+)/.exec(n)) && (i[1] = i[1].replace(/_TD$/, ""), i[1] = i[1].replace(/_CMCC$/, ""), i[1] = i[1].replace(/[_ ]Mozilla$/, ""), i[1] = i[1].replace(/ Linux$/, ""), i[1] = i[1].replace(/ Opera$/, ""), i[1] = i[1].replace(/\/[0-9].*$/, ""), g.push(i[1])), (i = /[0-9]+x[0-9]+; ([^;]+)/.exec(n)) && g.push(i[1]), (i = /[0-9]+X[0-9]+ ([^;\/\(\)]+)/.exec(n)) && g.push(i[1]), (i = /Windows NT 5.1; ([^;]+); Windows Phone/.exec(n)) && g.push(i[1]), (i = /\) PPC; (?:[0-9]+x[0-9]+; )?([^;\/\(\)]+)/.exec(n)) && g.push(i[1]), (i = /\(([^;]+); U; Windows Mobile/.exec(n)) && g.push(i[1]), (i = /Vodafone\/1.0\/([^\/]+)/.exec(n)) && g.push(i[1]), (i = /\ ([^\s]+)$/.exec(n)) && g.push(i[1]);
                                        for (var T = 0; T < g.length; T++) {
                                            if (!this.device.model && !this.device.manufacturer) {
                                                var h = e(g[T]),
                                                    b = !1;
                                                "Android" === this.os.name && void 0 !== l[h] && (this.device.manufacturer = l[h][0], this.device.model = l[h][1], void 0 !== l[h][2] && (this.device.type = l[h][2]), this.device.identified = !0, b = !0), this.os.name && "Windows" !== this.os.name && "Windows Mobile" !== this.os.name && "Windows CE" !== this.os.name || void 0 !== c[h] && (this.device.manufacturer = c[h][0], this.device.model = c[h][1], this.device.type = "mobile", this.device.identified = !0, "Windows Mobile" !== this.os.name && (this.os.name = "Windows Mobile", this.os.version = null), b = !0)
                                            }
                                            if (!b && ((i = /^GIONEE-([^\s]+)/.exec(g[T])) && (this.device.manufacturer = "Gionee", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), (i = /^HTC_?([^\/_]+)(?:\/|_|$)/.exec(g[T])) && (this.device.manufacturer = "HTC", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), (i = /^HUAWEI-([^\/]*)/.exec(g[T])) && (this.device.manufacturer = "Huawei", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), (i = /(?:^|\()LGE?(?:\/|-|_|\s)([^\s]*)/.exec(g[T])) && (this.device.manufacturer = "LG", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), (i = /^MOT-([^\/_]+)(?:\/|_|$)/.exec(g[T])) && (this.device.manufacturer = "Motorola", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), (i = /^Motorola_([^\/_]+)(?:\/|_|$)/.exec(g[T])) && (this.device.manufacturer = "Motorola", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), (i = /^Nokia([^\/]+)(?:\/|$)/.exec(g[T])) && (this.device.manufacturer = "Nokia", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0, this.os.name || (this.os.name = "Series40")), (i = /^SonyEricsson([^\/_]+)(?:\/|_|$)/.exec(g[T])) && (this.device.manufacturer = "Sony Ericsson", this.device.model = e(i[1]), this.device.type = "mobile", this.device.identified = !0), i = /^SAMSUNG-([^\/_]+)(?:\/|_|$)/.exec(g[T])))
                                                if (this.device.manufacturer = "Samsung", this.device.model = e(i[1]), this.device.type = "mobile", "Bada" === this.os.name) {
                                                    var p = "SAMSUNG",
                                                        h = e(this.device.model);
                                                    void 0 !== a[p] && void 0 !== a[p][h] && (this.device.manufacturer = a[p][h][0], this.device.model = a[p][h][1], this.device.identified = !0)
                                                } else if (i = /Jasmine\/([0-9.]*)/.exec(n)) {
                                                var S = i[1],
                                                    p = "SAMSUNG",
                                                    h = e(this.device.model);
                                                void 0 !== o[p] && void 0 !== o[p][h] && (this.device.manufacturer = o[p][h][0], this.device.model = o[p][h][1], this.device.identified = !0, this.os.name = "Touchwiz", this.os.version = new m({ value: "2.0" }))
                                            } else if (i = /Dolfin\/([0-9.]*)/.exec(n)) {
                                                var S = i[1],
                                                    p = "SAMSUNG",
                                                    h = e(this.device.model);
                                                if (void 0 !== a[p] && void 0 !== a[p][h]) switch (this.device.manufacturer = a[p][h][0], this.device.model = a[p][h][1], this.device.identified = !0, this.os.name = "Bada", S) {
                                                    case "2.0":
                                                        this.os.version = new m({ value: "1.0" });
                                                        break;
                                                    case "2.2":
                                                        this.os.version = new m({ value: "1.2" });
                                                        break;
                                                    case "3.0":
                                                        this.os.version = new m({ value: "2.0" })
                                                }
                                                if (void 0 !== o[p] && void 0 !== o[p][h]) switch (this.device.manufacturer = o[p][h][0], this.device.model = o[p][h][1], this.device.identified = !0, this.os.name = "Touchwiz", S) {
                                                    case "1.0":
                                                        this.os.version = new m({ value: "1.0" });
                                                        break;
                                                    case "1.5":
                                                        this.os.version = new m({ value: "2.0" });
                                                        break;
                                                    case "2.0":
                                                        this.os.version = new m({ value: "3.0" })
                                                }
                                            }
                                        }
                                    }
                                    if ((i = /\((?:LG[-|\/])(.*) (?:Browser\/)?AppleWebkit/.exec(n)) && (this.device.manufacturer = "LG", this.device.model = i[1], this.device.type = "mobile", this.device.identified = !0), (i = /^Mozilla\/5.0 \((?:Nokia|NOKIA)(?:\s?)([^\)]+)\)UC AppleWebkit\(like Gecko\) Safari\/530$/.exec(n)) && (this.device.manufacturer = "Nokia", this.device.model = i[1], this.device.type = "mobile", this.device.identified = !0, this.os.name = "Series60"), n.match("Safari") && ("iOS" === this.os.name && (this.browser.stock = !0, this.browser.hidden = !0, this.browser.name = "Safari", this.browser.version = null), "Mac OS X" !== this.os.name && "Windows" !== this.os.name || (this.browser.name = "Safari", this.browser.stock = "Mac OS X" === this.os.name, (i = /Version\/([0-9\.]+)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), n.match(/AppleWebKit\/[0-9\.]+\+/) && (this.browser.name = "WebKit Nightly Build", this.browser.version = null))), n.match("MSIE") && (this.browser.name = "Internet Explorer", (n.match("IEMobile") || n.match("Windows CE") || n.match("Windows Phone") || n.match("WP7")) && (this.browser.name = "Mobile Internet Explorer"), (i = /MSIE ([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match(/Opera/i) && (this.browser.stock = !1, this.browser.name = "Opera", (i = /Opera[\/| ]([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), (i = /Version\/([0-9.]*)/.exec(n)) && (parseFloat(i[1]) >= 10 ? this.browser.version = new m({ value: i[1] }) : this.browser.version = null), this.browser.version && n.match("Edition Labs") && (this.browser.version.type = "alpha", this.browser.channel = "Labs"), this.browser.version && n.match("Edition Next") && (this.browser.version.type = "alpha", this.browser.channel = "Next"), n.match("Opera Tablet") && (this.browser.name = "Opera Mobile", this.device.type = "tablet"), n.match("Opera Mobi") && (this.browser.name = "Opera Mobile", this.device.type = "mobile"), (i = /Opera Mini;/.exec(n)) && (this.browser.name = "Opera Mini", this.browser.version = null, this.browser.mode = "proxy", this.device.type = "mobile"), (i = /Opera Mini\/(?:att\/)?([0-9.]*)/.exec(n)) && (this.browser.name = "Opera Mini", this.browser.version = new m({ value: i[1], details: -1 }), this.browser.mode = "proxy", this.device.type = "mobile"), "Opera" === this.browser.name && "mobile" === this.device.type && (this.browser.name = "Opera Mobile", n.match(/BER/) && (this.browser.name = "Opera Mini", this.browser.version = null)), n.match("InettvBrowser") && (this.device.type = "television"), (n.match("Opera TV") || n.match("Opera-TV")) && (this.browser.name = "Opera", this.device.type = "television"), n.match("Linux zbov") && (this.browser.name = "Opera Mobile", this.browser.mode = "desktop", this.device.type = "mobile", this.os.name = null, this.os.version = null), n.match("Linux zvav") && (this.browser.name = "Opera Mini", this.browser.version = null, this.browser.mode = "desktop", this.device.type = "mobile", this.os.name = null, this.os.version = null)), n.match("Firefox") && (this.browser.stock = !1, this.browser.name = "Firefox", (i = /Firefox\/([0-9ab.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), "alpha" === this.browser.version.type && (this.browser.channel = "Aurora"), "beta" === this.browser.version.type && (this.browser.channel = "Beta"), n.match("Fennec") && (this.device.type = "mobile"), n.match("Mobile; rv") && (this.device.type = "mobile"), n.match("Tablet; rv") && (this.device.type = "tablet"), "mobile" !== this.device.type && "tablet" !== this.device.type || (this.browser.name = "Firefox Mobile")), n.match("Namoroka") && (this.browser.stock = !1, this.browser.name = "Firefox", (i = /Namoroka\/([0-9ab.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), this.browser.channel = "Namoroka"), n.match("Shiretoko") && (this.browser.stock = !1, this.browser.name = "Firefox", (i = /Shiretoko\/([0-9ab.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), this.browser.channel = "Shiretoko"), n.match("Minefield") && (this.browser.stock = !1, this.browser.name = "Firefox", (i = /Minefield\/([0-9ab.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), this.browser.channel = "Minefield"), n.match("Firebird") && (this.browser.stock = !1, this.browser.name = "Firebird", (i = /Firebird\/([0-9ab.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("SeaMonkey") && (this.browser.stock = !1, this.browser.name = "SeaMonkey", (i = /SeaMonkey\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("Netscape") && (this.browser.stock = !1, this.browser.name = "Netscape", (i = /Netscape[0-9]?\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("[k|K]onqueror/") && (this.browser.name = "Konqueror", (i = /[k|K]onqueror\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), i = /(?:Chrome|CrMo|CriOS)\/([0-9.]*)/.exec(n))
                                        if (this.browser.stock = !1, this.browser.name = "Chrome", this.browser.version = new m({ value: i[1] }), "Android" === this.os.name) switch (i[1].split(".", 3).join(".")) {
                                            case "16.0.912":
                                                this.browser.channel = "Beta";
                                                break;
                                            case "18.0.1025":
                                                this.browser.version.details = 1;
                                                break;
                                            default:
                                                this.browser.channel = "Nightly"
                                        } else switch (i[1].split(".", 3).join(".")) {
                                            case "0.2.149":
                                            case "0.3.154":
                                            case "0.4.154":
                                            case "1.0.154":
                                            case "2.0.172":
                                            case "3.0.195":
                                            case "4.0.249":
                                            case "4.1.249":
                                            case "5.0.375":
                                            case "6.0.472":
                                            case "7.0.517":
                                            case "8.0.552":
                                            case "9.0.597":
                                            case "10.0.648":
                                            case "11.0.696":
                                            case "12.0.742":
                                            case "13.0.782":
                                            case "14.0.835":
                                            case "15.0.874":
                                            case "16.0.912":
                                            case "17.0.963":
                                            case "18.0.1025":
                                            case "19.0.1084":
                                            case "20.0.1132":
                                            case "21.0.1180":
                                                0 === this.browser.version.minor ? this.browser.version.details = 1 : this.browser.version.details = 2;
                                                break;
                                            default:
                                                this.browser.channel = "Nightly"
                                        }
                                    if (n.match("chromeframe") && (this.browser.stock = !1, this.browser.name = "Chrome Frame", (i = /chromeframe\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("Chromium") && (this.browser.stock = !1, this.browser.channel = "", this.browser.name = "Chromium", (i = /Chromium\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("BrowserNG") && (this.browser.name = "Nokia Browser", (i = /BrowserNG\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1], details: 3, builds: !1 }))), n.match("NokiaBrowser") && (this.browser.name = "Nokia Browser", (i = /NokiaBrowser\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1], details: 3 }))), n.match("Maemo[ |_]Browser") && (this.browser.name = "MicroB", (i = /Maemo[ |_]Browser[ |_]([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1], details: 3 }))), n.match("NetFront") && (this.browser.name = "NetFront", this.device.type = "mobile", (i = /NetFront\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), n.match("InettvBrowser") && (this.device.type = "television")), n.match("Silk") && n.match("Silk-Accelerated") && (this.browser.name = "Silk", (i = /Silk\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1], details: 2 })), this.device.manufacturer = "Amazon", this.device.model = "Kindle Fire", this.device.type = "tablet", this.device.identified = !0, "Android" !== this.os.name && (this.os.name = "Android", this.os.version = null)), n.match("Dolfin") && (this.browser.name = "Dolfin", (i = /Dolfin\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("Iris") && (this.browser.name = "Iris", this.device.type = "mobile", this.device.model = null, this.device.manufacturer = null, this.os.name = "Windows Mobile", this.os.version = null, (i = /Iris\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] })), (i = / WM([0-9]) /.exec(n)) ? this.os.version = new m({ value: i[1] + ".0" }) : this.browser.mode = "desktop"), n.match("Jasmine") && (this.browser.name = "Jasmine", (i = /Jasmine\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("Boxee") && (this.browser.name = "Boxee", this.device.type = "television", (i = /Boxee\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), n.match("Espial") && (this.browser.name = "Espial", this.os.name = "", this.os.version = null, "television" !== this.device.type && (this.device.type = "television", this.device.model = null, this.device.manufacturer = null), (i = /Espial\/([0-9.]*)/.exec(n)) && (this.browser.version = new m({ value: i[1] }))), (i = /ANTGalio\/([0-9.]*)/.exec(n)) && (this.browser.name = "ANT Galio", this.browser.version = new m({ value: i[1], details: 3 }), this.device.type = "television"), (i = /NX\/([0-9.]*)/.exec(n)) && (this.browser.name = "NetFront NX", this.browser.version = new m({ value: i[1], details: 2 }), (i = /DTV/i.exec(n)) ? this.device.type = "television" : (i = /mobile/i.exec(n)) ? this.device.type = "mobile" : this.device.type = "desktop", this.os.name = null, this.os.version = null), n.match(/Obigo/i) && (this.browser.name = "Obigo", (i = /Obigo\/([0-9.]*)/i.exec(n)) && (this.browser.version = new m({ value: i[1] })), (i = /Obigo\/([A-Z])([0-9.]*)/i.exec(n)) && (this.browser.name = "Obigo " + i[1], this.browser.version = new m({ value: i[2] })), (i = /Obigo-([A-Z])([0-9.]*)\//i.exec(n)) && (this.browser.name = "Obigo " + i[1], this.browser.version = new m({ value: i[2] }))), n.match("UCWEB") && (this.browser.stock = !1, this.browser.name = "UC Browser", (i = /UCWEB([0-9]*[.][0-9]*)/.exec(n)) && (this.browser.version = new m({ value: i[1], details: 3 })), "Linux" === this.os.name && (this.os.name = ""), this.device.type = "mobile", (i = /^IUC \(U;\s?iOS ([0-9\.]+);/.exec(n)) && (this.os.name = "iOS", this.os.version = new m({ value: i[1] })), i = /^JUC \(Linux; U; ([0-9\.]+)[^;]*; [^;]+; ([^;]*[^\s])\s*; [0-9]+\*[0-9]+\)/.exec(n))) {
                                        var h = e(i[2]);
                                        this.os.name = "Android", this.os.version = new m({ value: i[1] }), void 0 !== l[h] && (this.device.manufacturer = l[h][0], this.device.model = l[h][1], void 0 !== l[h][2] && (this.device.type = l[h][2]), this.device.identified = !0)
                                    }
                                    if (n.match(/\) UC /) && (this.browser.stock = !1, this.browser.name = "UC Browser"), (i = /UCBrowser\/([0-9.]*)/.exec(n)) && (this.browser.stock = !1, this.browser.name = "UC Browser", this.browser.version = new m({ value: i[1], details: 2 })), (i = /Ninesky(?:-android-mobile(?:-cn)?)?\/([0-9.]*)/.exec(n)) && (this.browser.name = "NineSky", this.browser.version = new m({ value: i[1] }), "Android" !== this.os.name && (this.os.name = "Android", this.os.version = null, this.device.manufacturer = null, this.device.model = null)), (i = /Skyfire\/([0-9.]*)/.exec(n)) && (this.browser.name = "Skyfire", this.browser.version = new m({ value: i[1] }), this.device.type = "mobile", this.os.name = "Android", this.os.version = null), (i = /DolphinHDCN\/([0-9.]*)/.exec(n)) && (this.browser.name = "Dolphin", this.browser.version = new m({ value: i[1] }), this.device.type = "mobile", "Android" !== this.os.name && (this.os.name = "Android", this.os.version = null)), (i = /Dolphin\/INT/.exec(n)) && (this.browser.name = "Dolphin", this.device.type = "mobile"), i = /(M?QQBrowser)\/([0-9.]*)/.exec(n)) {
                                        this.browser.name = "QQ Browser";
                                        var S = i[2];
                                        S.match(/^[0-9][0-9]$/) && (S = S[0] + "." + S[1]), this.browser.version = new m({ value: S, details: 2 }), this.browser.channel = "", this.os.name || "QQBrowser" !== i[1] || (this.os.name = "Windows")
                                    }
                                    if (i = /(iBrowser)\/([0-9.]*)/.exec(n)) {
                                        this.browser.name = "iBrowser";
                                        var S = i[2];
                                        S.match(/[0-9][0-9]/) && (S = S[0] + "." + S[1]), this.browser.version = new m({ value: S, details: 2 }), this.browser.channel = ""
                                    }(i = /Puffin\/([0-9.]*)/.exec(n)) && (this.browser.name = "Puffin", this.browser.version = new m({ value: i[1], details: 2 }), this.device.type = "mobile", "Linux" === this.os.name && (this.os.name = null, this.os.version = null)), n.match("360EE") && (this.browser.stock = !1, this.browser.name = "360 Extreme Explorer", this.browser.version = null), (i = /Midori\/([0-9.]*)/.exec(n)) && (this.browser.name = "Midori", this.browser.version = new m({ value: i[1] }), "Linux" !== this.os.name && (this.os.name = "Linux", this.os.version = null), this.device.manufacturer = null, this.device.model = null, this.device.type = "desktop");
                                    for (var y = [{ name: "AdobeAIR", regexp: /AdobeAIR\/([0-9.]*)/ }, { name: "Awesomium", regexp: /Awesomium\/([0-9.]*)/ }, { name: "Canvace", regexp: /Canvace Standalone\/([0-9.]*)/ }, { name: "Ekioh", regexp: /Ekioh\/([0-9.]*)/ }, { name: "JavaFX", regexp: /JavaFX\/([0-9.]*)/ }, { name: "GFXe", regexp: /GFXe\/([0-9.]*)/ }, { name: "LuaKit", regexp: /luakit/ }, { name: "Titanium", regexp: /Titanium\/([0-9.]*)/ }, { name: "OpenWebKitSharp", regexp: /OpenWebKitSharp/ }, { name: "Prism", regexp: /Prism\/([0-9.]*)/ }, { name: "Qt", regexp: /Qt\/([0-9.]*)/ }, { name: "QtEmbedded", regexp: /QtEmbedded/ }, { name: "QtEmbedded", regexp: /QtEmbedded.*Qt\/([0-9.]*)/ }, { name: "RhoSimulator", regexp: /RhoSimulator/ }, { name: "UWebKit", regexp: /UWebKit\/([0-9.]*)/ }, { name: "PhantomJS", regexp: /PhantomJS\/([0-9.]*)/ }, { name: "Google Web Preview", regexp: /Google Web Preview/ }, { name: "Google Earth", regexp: /Google Earth\/([0-9.]*)/ }, { name: "EA Origin", regexp: /Origin\/([0-9.]*)/ }, { name: "SecondLife", regexp: /SecondLife\/([0-9.]*)/ }, { name: "Valve Steam", regexp: /Valve Steam/ }, { name: "Songbird", regexp: /Songbird\/([0-9.]*)/ }, { name: "Thunderbird", regexp: /Thunderbird\/([0-9.]*)/ }, { name: "Abrowser", regexp: /Abrowser\/([0-9.]*)/ }, { name: "arora", regexp: /[Aa]rora\/([0-9.]*)/ }, { name: "Baidu Browser", regexp: /M?BaiduBrowser\/([0-9.]*)/i }, { name: "Camino", regexp: /Camino\/([0-9.]*)/ }, { name: "Canure", regexp: /Canure\/([0-9.]*)/, details: 3 }, { name: "CometBird", regexp: /CometBird\/([0-9.]*)/ }, { name: "Comodo Dragon", regexp: /Comodo_Dragon\/([0-9.]*)/, details: 2 }, { name: "Conkeror", regexp: /[Cc]onkeror\/([0-9.]*)/ }, { name: "CoolNovo", regexp: /(?:CoolNovo|CoolNovoChromePlus)\/([0-9.]*)/, details: 3 }, { name: "ChromePlus", regexp: /ChromePlus(?:\/([0-9.]*))?$/, details: 3 }, { name: "Daedalus", regexp: /Daedalus ([0-9.]*)/, details: 2 }, { name: "Demobrowser", regexp: /demobrowser\/([0-9.]*)/ }, { name: "Dooble", regexp: /Dooble(?:\/([0-9.]*))?/ }, { name: "DWB", regexp: /dwb(?:-hg)?(?:\/([0-9.]*))?/ }, { name: "Epiphany", regexp: /Epiphany\/([0-9.]*)/ }, { name: "FireWeb", regexp: /FireWeb\/([0-9.]*)/ }, { name: "Flock", regexp: /Flock\/([0-9.]*)/, details: 3 }, { name: "Galeon", regexp: /Galeon\/([0-9.]*)/, details: 3 }, { name: "Helium", regexp: /HeliumMobileBrowser\/([0-9.]*)/ }, { name: "iCab", regexp: /iCab\/([0-9.]*)/ }, { name: "Iceape", regexp: /Iceape\/([0-9.]*)/ }, { name: "IceCat", regexp: /IceCat ([0-9.]*)/ }, { name: "Iceweasel", regexp: /Iceweasel\/([0-9.]*)/ }, { name: "InternetSurfboard", regexp: /InternetSurfboard\/([0-9.]*)/ }, { name: "Iron", regexp: /Iron\/([0-9.]*)/, details: 2 }, { name: "Isis", regexp: /BrowserServer/ }, { name: "Jumanji", regexp: /jumanji/ }, { name: "Kazehakase", regexp: /Kazehakase\/([0-9.]*)/ }, { name: "KChrome", regexp: /KChrome\/([0-9.]*)/, details: 3 }, { name: "K-Meleon", regexp: /K-Meleon\/([0-9.]*)/ }, { name: "Leechcraft", regexp: /Leechcraft(?:\/([0-9.]*))?/, details: 2 }, { name: "Lightning", regexp: /Lightning\/([0-9.]*)/ }, { name: "Lunascape", regexp: /Lunascape[\/| ]([0-9.]*)/, details: 3 }, { name: "iLunascape", regexp: /iLunascape\/([0-9.]*)/, details: 3 }, { name: "Maxthon", regexp: /Maxthon[\/ ]([0-9.]*)/, details: 3 }, { name: "MiniBrowser", regexp: /MiniBr?owserM\/([0-9.]*)/ }, { name: "MiniBrowser", regexp: /MiniBrowserMobile\/([0-9.]*)/ }, { name: "MixShark", regexp: /MixShark\/([0-9.]*)/ }, { name: "Motorola WebKit", regexp: /MotorolaWebKit\/([0-9.]*)/, details: 3 }, { name: "NetFront LifeBrowser", regexp: /NetFrontLifeBrowser\/([0-9.]*)/ }, { name: "Netscape Navigator", regexp: /Navigator\/([0-9.]*)/, details: 3 }, { name: "Odyssey", regexp: /OWB\/([0-9.]*)/ }, { name: "OmniWeb", regexp: /OmniWeb/ }, { name: "Orca", regexp: /Orca\/([0-9.]*)/ }, { name: "Origyn", regexp: /Origyn Web Browser/ }, { name: "Palemoon", regexp: /Pale[mM]oon\/([0-9.]*)/ }, { name: "Phantom", regexp: /Phantom\/V([0-9.]*)/ }, { name: "Polaris", regexp: /Polaris\/v?([0-9.]*)/i, details: 2 }, { name: "QtCreator", regexp: /QtCreator\/([0-9.]*)/ }, { name: "QtQmlViewer", regexp: /QtQmlViewer/ }, { name: "QtTestBrowser", regexp: /QtTestBrowser\/([0-9.]*)/ }, { name: "QtWeb", regexp: /QtWeb Internet Browser\/([0-9.]*)/ }, { name: "QupZilla", regexp: /QupZilla\/([0-9.]*)/ }, { name: "Roccat", regexp: /Roccat\/([0-9]\.[0-9.]*)/ }, { name: "Raven for Mac", regexp: /Raven for Mac\/([0-9.]*)/ }, { name: "rekonq", regexp: /rekonq/ }, { name: "RockMelt", regexp: /RockMelt\/([0-9.]*)/, details: 2 }, { name: "Sleipnir", regexp: /Sleipnir\/([0-9.]*)/, details: 3 }, { name: "SMBrowser", regexp: /SMBrowser/ }, { name: "Sogou Explorer", regexp: /SE 2.X MetaSr/ }, { name: "Snowshoe", regexp: /Snowshoe\/([0-9.]*)/, details: 2 }, { name: "Sputnik", regexp: /Sputnik\/([0-9.]*)/i, details: 3 }, { name: "Stainless", regexp: /Stainless\/([0-9.]*)/ }, { name: "SunChrome", regexp: /SunChrome\/([0-9.]*)/ }, { name: "Surf", regexp: /Surf\/([0-9.]*)/ }, { name: "TaoBrowser", regexp: /TaoBrowser\/([0-9.]*)/, details: 2 }, { name: "TaomeeBrowser", regexp: /TaomeeBrowser\/([0-9.]*)/, details: 2 }, { name: "TazWeb", regexp: /TazWeb/ }, { name: "Viera", regexp: /Viera\/([0-9.]*)/ }, { name: "Villanova", regexp: /Villanova\/([0-9.]*)/, details: 3 }, { name: "Wavelink Velocity", regexp: /Wavelink Velocity Browser\/([0-9.]*)/, details: 2 }, { name: "WebPositive", regexp: /WebPositive/ }, { name: "WebRender", regexp: /WebRender/ }, { name: "Wyzo", regexp: /Wyzo\/([0-9.]*)/, details: 3 }, { name: "Zetakey", regexp: /Zetakey Webkit\/([0-9.]*)/ }, { name: "Zetakey", regexp: /Zetakey\/([0-9.]*)/ }], w = 0; w < y.length; w++)(i = y[w].regexp.exec(n)) && (this.browser.name = y[w].name, this.browser.channel = "", this.browser.stock = !1, i[1] ? this.browser.version = new m({ value: i[1], details: y[w].details || null }) : this.browser.version = null);
                                    if ((i = /WebKit\/([0-9.]*)/i.exec(n)) && (this.engine.name = "Webkit", this.engine.version = new m({ value: i[1] })), (i = /Browser\/AppleWebKit([0-9.]*)/i.exec(n)) && (this.engine.name = "Webkit", this.engine.version = new m({ value: i[1] })), (i = /KHTML\/([0-9.]*)/.exec(n)) && (this.engine.name = "KHTML", this.engine.version = new m({ value: i[1] })), /Gecko/.exec(n) && !/like Gecko/i.exec(n) && (this.engine.name = "Gecko", (i = /; rv:([^\)]+)\)/.exec(n)) && (this.engine.version = new m({ value: i[1] }))), (i = /Presto\/([0-9.]*)/.exec(n)) && (this.engine.name = "Presto", this.engine.version = new m({ value: i[1] })), (i = /Trident\/([0-9.]*)/.exec(n)) && (this.engine.name = "Trident", this.engine.version = new m({ value: i[1] }), "Internet Explorer" === this.browser.name && (6 === t(this.engine.version) && parseFloat(this.browser.version) < 10 && (this.browser.version = new m({ value: "10.0" }), this.browser.mode = "compat"), 5 === t(this.engine.version) && parseFloat(this.browser.version) < 9 && (this.browser.version = new m({ value: "9.0" }), this.browser.mode = "compat"), 4 === t(this.engine.version) && parseFloat(this.browser.version) < 8 && (this.browser.version = new m({ value: "8.0" }), this.browser.mode = "compat")), "Windows Phone" === this.os.name && 5 === t(this.engine.version) && parseFloat(this.os.version) < 7.5 && (this.os.version = new m({ value: "7.5" }))), "Android" === this.os.name && this.browser.stock && (this.browser.hidden = !0), "iOS" === this.os.name && "Opera Mini" === this.browser.name && (this.os.version = null), "Midori" === this.browser.name && "Webkit" !== this.engine.name && (this.engine.name = "Webkit", this.engine.version = null), "television" === this.device.type && "Opera" === this.browser.name) {
                                        switch (this.browser.name = "Opera Devices", !0) {
                                            case this.engine.version.is("2.10"):
                                                this.browser.version = new m({ value: 3.2 });
                                                break;
                                            case this.engine.version.is("2.9"):
                                                this.browser.version = new m({ value: 3.1 });
                                                break;
                                            case this.engine.version.is("2.8"):
                                                this.browser.version = new m({ value: 3 });
                                                break;
                                            case this.engine.version.is("2.7"):
                                                this.browser.version = new m({ value: 2.9 });
                                                break;
                                            case this.engine.version.is("2.6"):
                                                this.browser.version = new m({ value: 2.8 });
                                                break;
                                            case this.engine.version.is("2.4"):
                                                this.browser.version = new m({ value: 10.3 });
                                                break;
                                            case this.engine.version.is("2.3"):
                                                this.browser.version = new m({ value: 10 });
                                                break;
                                            case this.engine.version.is("2.2"):
                                                this.browser.version = new m({ value: 9.7 });
                                                break;
                                            case this.engine.version.is("2.1"):
                                                this.browser.version = new m({ value: 9.6 });
                                                break;
                                            default:
                                                this.browser.version = null
                                        }
                                        this.os.name = null, this.os.version = null
                                    }
                                    if (this.options.detectCamouflage) {
                                        if (i = /Mac OS X 10_6_3; ([^;]+); [a-z]{2}-(?:[a-z]{2})?\)/.exec(n)) {
                                            this.browser.name = "", this.browser.version = null, this.browser.mode = "desktop", this.os.name = "Android", this.os.version = null, this.engine.name = "Webkit", this.engine.version = null, this.device.model = i[1], this.device.type = "mobile";
                                            var h = e(this.device.model);
                                            void 0 !== l[h] && (this.device.manufacturer = l[h][0], this.device.model = l[h][1], void 0 !== l[h][2] && (this.device.type = l[h][2]), this.device.identified = !0), this.features.push("foundDevice")
                                        }
                                        if (i = /Linux Ventana; [a-z]{2}-[a-z]{2}; (.+) Build/.exec(n)) {
                                            this.browser.name = "", this.browser.version = null, this.browser.mode = "desktop", this.os.name = "Android", this.os.version = null, this.engine.name = "Webkit", this.engine.version = null, this.device.model = i[1], this.device.type = "mobile";
                                            var h = e(this.device.model);
                                            void 0 !== l[h] && (this.device.manufacturer = l[h][0], this.device.model = l[h][1], void 0 !== l[h][2] && (this.device.type = l[h][2]), this.device.identified = !0), this.features.push("foundDevice")
                                        }
                                        "Safari" === this.browser.name && ("iOS" !== this.os.name && /AppleWebKit\/([0-9]+.[0-9]+)/i.exec(n)[1] !== /Safari\/([0-9]+.[0-9]+)/i.exec(n)[1] && (this.features.push("safariMismatch"), this.camouflage = !0), "iOS" !== this.os.name || n.match(/^Mozilla/) || (this.features.push("noMozillaPrefix"), this.camouflage = !0), /Version\/[0-9\.]+/.exec(n) || (this.features.push("noVersion"), this.camouflage = !0)), "Chrome" === this.browser.name && (/(?:Chrome|CrMo|CriOS)\/([0-9]{1,2}\.[0-9]\.[0-9]{3,4}\.[0-9]+)/.exec(n) || (this.features.push("wrongVersion"), this.camouflage = !0)), this.options.useFeatures && (window.ActiveXObject && (this.features.push("trident"), void 0 !== this.engine.name && "Trident" !== this.engine.name && (this.camouflage = void 0 === this.browser.name || "Maxthon" !== this.browser.name)), window.opera && (this.features.push("presto"), void 0 !== this.engine.name && "Presto" !== this.engine.name && (this.camouflage = !0), "Internet Explorer" === this.browser.name && (this.camouflage = !0)), ("getBoxObjectFor" in document || "mozInnerScreenX" in window) && (this.features.push("gecko"), void 0 !== this.engine.name && "Gecko" !== this.engine.name && (this.camouflage = !0), "Internet Explorer" === this.browser.name && (this.camouflage = !0)), ("WebKitCSSMatrix" in window || "WebKitPoint" in window || "webkitStorageInfo" in window || "webkitURL" in window) && (this.features.push("webkit"), void 0 !== this.engine.name && "Webkit" !== this.engine.name && (this.camouflage = !0), "Internet Explorer" === this.browser.name && (this.camouflage = !0)), "Webkit" === this.engine.name && -1 === {}.toString.toString().indexOf("\n") && (this.features.push("v8"), null !== this.browser && "Safari" === this.browser.name && (this.camouflage = !0)), "iPad" === this.device.model && 0 !== screen.width && 0 !== screen.height && 768 !== screen.width && 1024 !== screen.height && 1024 !== screen.width && 768 !== screen.height && (this.features.push("sizeMismatch"), this.camouflage = !0), "iPhone" !== this.device.model && "iPod" !== this.device.model || 0 !== screen.width && 0 !== screen.height && 320 !== screen.width && 480 !== screen.height && 480 !== screen.width && 320 !== screen.height && (this.features.push("sizeMismatch"), this.camouflage = !0), "iOS" === this.os.name && this.os.version && (this.os.version.isOlder("4.0") && "sandbox" in document.createElement("iframe") && (this.features.push("foundSandbox"), this.camouflage = !0), this.os.version.isOlder("4.2") && "WebSocket" in window && (this.features.push("foundSockets"), this.camouflage = !0), this.os.version.isOlder("5.0") && window.Worker && (this.features.push("foundWorker"), this.camouflage = !0), this.os.version.isNewer("2.1") && !window.applicationCache && (this.features.push("noAppCache"), this.camouflage = !0)), "iOS" !== this.os.name && "Safari" === this.browser.name && this.browser.version && (this.browser.version.isOlder("4.0") && window.applicationCache && (this.features.push("foundAppCache"), this.camouflage = !0), this.browser.version.isOlder("4.1") && window.history && history.pushState && (this.features.push("foundHistory"), this.camouflage = !0), this.browser.version.isOlder("5.1") && document.documentElement.webkitRequestFullScreen && (this.features.push("foundFullscreen"), this.camouflage = !0), this.browser.version.isOlder("5.2") && "FileReader" in window && (this.features.push("foundFileReader"), this.camouflage = !0)))
                                    }
                                }
                            }, p
                        }()
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { if (e.enable && e.enable.length > 0) return e.enable; var t = []; return t = (0, o.isMobile)(navigator.userAgent) ? ["url", "cache", "wx", "html", "ip"] : ["url", "cache", "ip", "html"], e.disable && e.disable.length > 0 && (t = t.filter(function(t) { return -1 === e.disable.indexOf(t) })), t }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.generateScheme = i;
                        var o = n(9)
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { return e && e.__esModule ? e : { default: e } }

                        function o(e) {
                            var t = e.scheme,
                                n = e.config,
                                i = e.finish,
                                o = e.hook,
                                a = !1,
                                r = setTimeout(function() { a = !0, h(new Error("timeout")) }, n.timeout),
                                c = Date.now(),
                                u = -1,
                                l = "",
                                d = null,
                                m = function(e) { o && o.call(null, e) },
                                p = function(e) { return !!(e.latitude && e.longitude && e.geotype) },
                                h = function(e) { clearTimeout(r), m({ scheme: "all", status: !1, duration: Date.now() - c, error: e.message }), i(e) },
                                v = function(e) { clearTimeout(r), m({ scheme: "all", status: !0, duration: Date.now() - c, data: e }), "cache" !== e.source && (0, s.cacheGeo)(e), i(null, e) };
                            ! function e() {
                                if (u++, l = t[u], !(d = f[l])) return h(new Error("Handlers exhausted."));
                                var i = Date.now();
                                d(n, function(t, n) {
                                    if (!a) {
                                        if (t) return m({ scheme: l, status: !1, duration: Date.now() - i, error: t.message }), e();
                                        if (!p(n)) return m({ scheme: l, status: !1, duration: Date.now() - i, error: "invalid result", data: n }), e();
                                        m({ scheme: l, status: !0, duration: Date.now() - i, data: n }), n.source = l, v(n)
                                    }
                                })
                            }()
                        }
                        Object.defineProperty(t, "__esModule", { value: !0 });
                        var a = n(39),
                            r = i(a),
                            s = n(40),
                            c = i(s),
                            u = n(41),
                            l = i(u),
                            d = n(42),
                            m = i(d),
                            p = n(43),
                            h = i(p),
                            f = { url: r.default, cache: c.default, html: l.default, ip: m.default, wx: h.default };
                        t.default = o
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) {
                            var n = new RegExp("[?&]" + t[0] + "=([^&$]+)"),
                                i = new RegExp("[?&]" + t[1] + "=([^&$]+)"),
                                o = new RegExp("[?&]" + t[2] + "=([^&$]+)"),
                                a = n.exec(e),
                                r = i.exec(e),
                                s = o.exec(e);
                            return { latitude: a && a[1], longitude: r && r[1], geotype: s && s[1] }
                        }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(e, t) {
                            var n = location.search,
                                o = e.urlMatchGroup,
                                a = i(n, o);
                            if (!a || !a.latitude || isNaN(a.latitude) || !a.longitude || isNaN(a.longitude)) return t(new Error("No matched params."));
                            a.latitude = Number(a.latitude), a.longitude = Number(a.longitude), (!a.geotype || "wgs84" !== a.geotype && "gcj02" !== a.geotype) && (a.geotype = "wgs84"), t(null, a)
                        }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { var t = [e.latitude, e.longitude, e.geotype]; return o.cookie.setItem(a, t.join(","), 300, "/") }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(e, t) {
                            var n = o.cookie.getItem(a);
                            if (!n) return t(new Error("No cached info."));
                            var i = n.split(","),
                                r = { latitude: i[0], longitude: i[1], geotype: i[2] };
                            if (!r.latitude || !r.longitude || !r.geotype) return t(new Error("Invalid cookie value"));
                            t(null, r)
                        }, t.cacheGeo = i;
                        var o = n(9),
                            a = "webloc_geo"
                    }, function(e, t, n) {
                        "use strict";
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(e, t) {
                            if (!("geolocation" in navigator)) return t(new Error("Browser does not support geolocation."));
                            var n = !1,
                                i = function(e) {
                                    if (!n) {
                                        n = !0;
                                        var i = e.coords;
                                        t(null, { latitude: i.latitude, longitude: i.longitude, altitude: i.altitude || -1, accuracy: i.accuracy || -1, geotype: "wgs84" })
                                    }
                                },
                                o = function(e) { n || (n = !0, t(e)) },
                                a = { enableHighAccuracy: !0, timeout: 5e3, maximumAge: 0 };
                            navigator.geolocation.getCurrentPosition(i, o, a)
                        }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { return !!(e && e.data && e.data.lng && e.data.lat) }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(e, t) {
                            var n = function(e, n) {
                                    if (e) return t(e);
                                    try { n = JSON.parse(n) } catch (e) { return t(e) }
                                    if (!i(n)) return t(new Error("IP location response data is not valid."));
                                    t(null, { latitude: n.data.lat, longitude: n.data.lng, geotype: "wgs84" })
                                },
                                o = location.protocol + "//api.mobile.meituan.com/locate/v2/ip/loc?client_source=mars-webloc",
                                r = { headers: { "X-Default-Location": 1 } };
                            (0, a.default)(o, r, n)
                        };
                        var o = n(22),
                            a = function(e) { return e && e.__esModule ? e : { default: e } }(o)
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = function(e, t) {
                            if (!/MicroMessenger/.test(navigator.userAgent)) return t(new Error("Not in weixin environment."));
                            var i = function(e) { e.ready(function() { e.isApiSupported({ apiName: "getLocation", success: function(n) { n ? e.getLocation({ timeout: 6e3, success: function(e) { console.log(e), t(null, { latitude: e.lat, longitude: e.lng, geotype: "wgs84" }) }, fail: function(e) { console.log(e), t(new Error(JSON.stringify(e))) } }) : t(new Error("api is not supported")) } }) }) };
                            if (window.KNB) i(window.KNB);
                            else { i(n(44)) }
                        }
                    }, function(e, t, n) {
                        var i = "undefined" != typeof window,
                            o = i ? n(45) : { load: function() {}, _ready: function() {} };
                        i && (window.KNB = o);
                        var a = function() {
                            if ("undefined" != typeof window) {
                                var e = n(23);
                                switch (!0) {
                                    case e.isDPApp:
                                        return n(50);
                                    case e.isMTNB:
                                        return n(99);
                                    case e.isHBNB:
                                        return n(100);
                                    case e.isTitans:
                                        return n(209);
                                    case e.isWX:
                                        if ("undefined" != typeof _KNB_IGNORE_WECHAT) return;
                                        return n(212)
                                }
                            }
                        }();
                        o.load(a || {}), o._ready(), e.exports = o
                    }, function(e, t, n) {
                        var i = n(17),
                            o = n(5),
                            a = n(7),
                            r = n(4),
                            s = n(14),
                            c = function() {},
                            u = [],
                            l = {
                                __version__: a,
                                NOTIMPLEMENTED: function(e, t) {
                                    var n = this,
                                        i = t.fail || c;
                                    if (this._isReady) return i({ error: -1, msg: "API [" + e + "] is not implemented" });
                                    this.cache = this.cache || [], this.cache.push(function() { return n[e](t) })
                                },
                                load: function(e) {
                                    var t = this;
                                    o(this, e), e._add = function(e, n) { t[e] = n }
                                },
                                _ready: function() {
                                    function e() {! function e(t) { if (t.length) { var n = t.shift(); "function" == typeof n && n(), e(t) } }(t), u.forEach(function(e) { return e() }) }
                                    this._isReady = !0;
                                    var t = this.cache || [];
                                    if (this.ready && !this.ready.isFromLoader) return this.ready(e);
                                    e()
                                },
                                ready: function(e) { if (this._isReady) return e(); "function" == typeof e && u.push(e) },
                                use: function(e, t) {
                                    var n = this;
                                    this.cache = this.cache || [], this.cache.push(function() { return n.use(e, t) })
                                }
                            };
                        l.ready.isFromLoader = !0, i.forEach(function(e) { l[e] = function(t) { void 0 === t && (t = {}), l.NOTIMPLEMENTED(e, t) } }), l.getUA = r, l.env = n(23), s(l), e.exports = l
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }
                        e.exports = function(e, t, n, a) {
                            t = t || "&", n = n || "=";
                            var r = {};
                            if ("string" != typeof e || 0 === e.length) return r;
                            var s = /\+/g;
                            e = e.split(t);
                            var c = 1e3;
                            a && "number" == typeof a.maxKeys && (c = a.maxKeys);
                            var u = e.length;
                            c > 0 && u > c && (u = c);
                            for (var l = 0; l < u; ++l) {
                                var d, m, p, h, f = e[l].replace(s, "%20"),
                                    v = f.indexOf(n);
                                v >= 0 ? (d = f.substr(0, v), m = f.substr(v + 1)) : (d = f, m = ""), p = decodeURIComponent(d), h = decodeURIComponent(m), i(r, p) ? o(r[p]) ? r[p].push(h) : r[p] = [r[p], h] : r[p] = h
                            }
                            return r
                        };
                        var o = Array.isArray || function(e) { return "[object Array]" === Object.prototype.toString.call(e) }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) { if (e.map) return e.map(t); for (var n = [], i = 0; i < e.length; i++) n.push(t(e[i], i)); return n }
                        var o = function(e) {
                            switch (typeof e) {
                                case "string":
                                    return e;
                                case "boolean":
                                    return e ? "true" : "false";
                                case "number":
                                    return isFinite(e) ? e : "";
                                default:
                                    return ""
                            }
                        };
                        e.exports = function(e, t, n, s) { return t = t || "&", n = n || "=", null === e && (e = void 0), "object" == typeof e ? i(r(e), function(r) { var s = encodeURIComponent(o(r)) + n; return a(e[r]) ? i(e[r], function(e) { return s + encodeURIComponent(o(e)) }).join(t) : s + encodeURIComponent(o(e[r])) }).join(t) : s ? encodeURIComponent(o(s)) + n + encodeURIComponent(o(e)) : "" };
                        var a = Array.isArray || function(e) { return "[object Array]" === Object.prototype.toString.call(e) },
                            r = Object.keys || function(e) { var t = []; for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n); return t }
                    }, function(e, t, n) {
                        function i(e, t) { this._id = e, this._clearFn = t }
                        var o = Function.prototype.apply;
                        t.setTimeout = function() { return new i(o.call(setTimeout, window, arguments), clearTimeout) }, t.setInterval = function() { return new i(o.call(setInterval, window, arguments), clearInterval) }, t.clearTimeout = t.clearInterval = function(e) { e && e.close() }, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() { this._clearFn.call(window, this._id) }, t.enroll = function(e, t) { clearTimeout(e._idleTimeoutId), e._idleTimeout = t }, t.unenroll = function(e) { clearTimeout(e._idleTimeoutId), e._idleTimeout = -1 }, t._unrefActive = t.active = function(e) {
                            clearTimeout(e._idleTimeoutId);
                            var t = e._idleTimeout;
                            t >= 0 && (e._idleTimeoutId = setTimeout(function() { e._onTimeout && e._onTimeout() }, t))
                        }, n(49), t.setImmediate = setImmediate, t.clearImmediate = clearImmediate
                    }, function(e, t, n) {
                        (function(e, t) {
                            ! function(e, n) {
                                "use strict";

                                function i(e) { "function" != typeof e && (e = new Function("" + e)); for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1]; var i = { callback: e, args: t }; return u[c] = i, s(c), c++ }

                                function o(e) { delete u[e] }

                                function a(e) {
                                    var t = e.callback,
                                        i = e.args;
                                    switch (i.length) {
                                        case 0:
                                            t();
                                            break;
                                        case 1:
                                            t(i[0]);
                                            break;
                                        case 2:
                                            t(i[0], i[1]);
                                            break;
                                        case 3:
                                            t(i[0], i[1], i[2]);
                                            break;
                                        default:
                                            t.apply(n, i)
                                    }
                                }

                                function r(e) {
                                    if (l) setTimeout(r, 0, e);
                                    else { var t = u[e]; if (t) { l = !0; try { a(t) } finally { o(e), l = !1 } } }
                                }
                                if (!e.setImmediate) {
                                    var s, c = 1,
                                        u = {},
                                        l = !1,
                                        d = e.document,
                                        m = Object.getPrototypeOf && Object.getPrototypeOf(e);
                                    m = m && m.setTimeout ? m : e, "[object process]" === {}.toString.call(e.process) ? function() { s = function(e) { t.nextTick(function() { r(e) }) } }() : function() {
                                        if (e.postMessage && !e.importScripts) {
                                            var t = !0,
                                                n = e.onmessage;
                                            return e.onmessage = function() { t = !1 }, e.postMessage("", "*"), e.onmessage = n, t
                                        }
                                    }() ? function() {
                                        var t = "setImmediate$" + Math.random() + "$",
                                            n = function(n) { n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && r(+n.data.slice(t.length)) };
                                        e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n), s = function(n) { e.postMessage(t + n, "*") }
                                    }() : e.MessageChannel ? function() {
                                        var e = new MessageChannel;
                                        e.port1.onmessage = function(e) { r(e.data) }, s = function(t) { e.port2.postMessage(t) }
                                    }() : d && "onreadystatechange" in d.createElement("script") ? function() {
                                        var e = d.documentElement;
                                        s = function(t) {
                                            var n = d.createElement("script");
                                            n.onreadystatechange = function() { r(t), n.onreadystatechange = null, e.removeChild(n), n = null }, e.appendChild(n)
                                        }
                                    }() : function() { s = function(e) { setTimeout(r, 0, e) } }(), m.setImmediate = i, m.clearImmediate = o
                                }
                            }("undefined" == typeof self ? void 0 === e ? this : e : self)
                        }).call(t, n(10), n(0))
                    }, function(e, t, n) {
                        var i = n(51),
                            o = n(88),
                            a = n(89),
                            r = n(11),
                            s = n(14),
                            c = n(7),
                            u = n(27),
                            l = n(5),
                            d = n(19),
                            m = n(18),
                            p = n(21),
                            h = n(20),
                            f = {
                                __version__: c,
                                ready: function(e) { i.ready(e) },
                                config: function(e) { i.config(e), e && (e.delay = e.delay || 50), u.config(e) },
                                isApiSupported: function(e) {
                                    var t;
                                    if (t = this[e.apiName] instanceof Function || i.isSupport(e.apiName), navigator.userAgent.indexOf("TitansX") > -1) return u.isApiSupported(e);
                                    e.success(t)
                                },
                                getUserInfo: function(e) {
                                    var t = e.success;
                                    e.success = function(e) { t({ type: "dp", userId: e.userId, uuid: e.dpid, token: e.token }) }, i.getUserInfo(e)
                                },
                                login: function(e) {
                                    var t = e.success;
                                    e.success = function(e) { t({ type: "dp", userId: e.userId, token: e.token }) }, i.login(e)
                                },
                                getFingerprint: function(e) {
                                    var t = e.success;
                                    e.success = function(e) {
                                        var n = "";
                                        try { n = JSON.parse(e.fingerprint).fingerprint } catch (t) { n = e.fingerprint }
                                        t({ fingerprint: n })
                                    }, i.getCX(e)
                                },
                                getCity: function(e) {
                                    var t = e.success;
                                    e.success = function(e) { t({ type: "dp", cityId: e.cityId }) }, i.getCity(e)
                                },
                                getLocationCity: function(e) {
                                    var t = e.success;
                                    e.success = function(e) { t({ type: "dp", cityId: e.locCityId }) }, i.getCity(e)
                                },
                                openWebview: function(e) { e = l({}, e), d(e.url) && (e.url = "dianping://web?" + m.stringify(l({ url: e.url }, e.qs))), i.openScheme(e) },
                                jumpWebview: function(e) { e = l({}, e), d(e.url) && (e.url = "dianping://web?" + m.stringify(l({ url: e.url }, e.qs))), i.jumpToScheme(e) },
                                closeWebview: function(e) { i.closeWindow(e) },
                                share: function(e) {
                                    e = l({}, e), e.feed = e.channel, e.feed instanceof Array || (e.feed = [e.feed]), e.feed && 1 === e.feed.length && (e.shareType = e.feed[0]);
                                    var t = e.success;
                                    e.success = function(n) { e.sharedTo = {}, Object.keys(a).forEach(function(t, i) { e.sharedTo[t] = i === n.channel }), t(e) }, i.share(e)
                                },
                                configShare: function(e) {
                                    var t = this;
                                    e = l({}, e), i.setRRButton({ icon: "H5_Share", handle: function() { e.handle && e.handle(), t.share(e) } })
                                },
                                setNavButtons: function(e) {
                                    e instanceof Array || (e = [e]), e.forEach(function(e) {
                                        var t = "set" + e.position + "Button";
                                        if (delete e.position, "base64" === e.type) try { e.icon = e.icon.split("data:image/png;base64,")[1] } catch (e) { console.log("get base64 icon failed") }
                                        i[t](e)
                                    })
                                },
                                setLLButton: function(e) {
                                    if (e = l({}, e), /^data:image\/png;base64/.test(e.icon)) try { e.icon = e.icon.split("data:image/png;base64,")[1] } catch (e) { console.log("get base64 icon failed") }
                                    i.setLLButton(e)
                                },
                                uploadImage: function(e) {
                                    e = l({}, e);
                                    var t = e.success || function() {};
                                    e.success = function(e) { e.photoInfos = (e.photoInfos || []).map(function(e) { return l({}, e, { picKey: h(e.picKey), originalKey: e.picKey }) }), t(e) }, i.uploadImage(e)
                                },
                                getUA: n(4),
                                use: function(e, t) { return i[e] instanceof Function ? i[e](t) : u.use(e, t) }
                            };
                        ! function() { for (var e in a) f.share[e] = a[e] }(),
                        function(e) {
                            e.forEach(function(e) {
                                if (!f[e])
                                    if ("string" == typeof e) f[e] = i[e];
                                    else {
                                        var t = Object.keys(e)[0];
                                        f[t] = function() { i[e[t]](arguments[0]) }
                                    }
                            })
                        }(o), ["subscribe", "unsubscribe", "publish", "getNetworkType", "remove", "pureUse", "checkAuthorization", "pickContact", "setResult", "getApisVersion", "scanQRCode", "autoLock", "toast", "vibrate", "actionSheet", "setSearchBar"].forEach(function(e) { f[e] = u[e].bind(u) }), f.Semver = p;
                        var v = f.getUA.internal(),
                            g = v.appVersion;
                        p.gte(g, "9.1.2") && (f.lxlog = u.lxlog.bind(u)), p.gte(g, "9.3.0") && (f.shark = u.shark.bind(u)), r("dpapp", f.__version__), s(f), e.exports = f
                    }, function(e, t, n) {
                        "use strict";
                        ! function(t) {
                            var i = n(16),
                                o = n(3),
                                a = n(67);
                            n(68);
                            var r = function(e, t) { i.Semver.gte(o.appVersion, e) && i.patchForType(o.appVersion, t) };
                            r("7.0.0", n(26)), r("7.1.0", n(69)), r("7.2.0", n(70)), r("7.5.0", n(71)), r("7.6.0", n(72)), r("7.8.0", n(73)), r("7.9.1", n(74)), r("7.9.2", n(76)), r("7.9.4", n(77)), r("7.9.6", n(78)), r("8.0.0", n(79)), r("8.0.4", n(80)), r("8.0.6", n(81)), r("8.1.0", n(82)), r("8.1.2", n(83)), r("8.1.4", n(84)), r("8.1.6", n(85)), i.apis = a, i.decorate(), a.forEach(function(e) { i[e] || (i[e] = i._notImplemented) }), i.__version__ = n(86), i.__type__ = n(87), e.exports = i, void 0 !== t && (t.DPApp ? t.DPApp = i.merge(t.DPApp, i) : t.DPApp = i)
                        }(window)
                    }, function(e, t, n) {
                        var i = n(53),
                            o = n(63),
                            a = n(65),
                            r = n(24);
                        i.prototype._mixin(i.prototype, o), i.prototype._mixin(i.prototype, a), i.prototype.all = function(e) { return r.all(e) }, e.exports = i
                    }, function(e, t, n) {
                        function i(e, t) { for (var n in t) e[n] = t[n]; return e }
                        var o = e.exports = function(e) {
                            e = e || {};
                            var t = this;
                            for (var i in e) this[i] = e[i];
                            var o = e.apis || n(54);
                            (e.extraApis || []).forEach(function(e) {-1 === o.indexOf(e) && o.push(e) }), this.apis = o, this.allowBeforeReady = this.allowBeforeReady || ["getRequestId"], o.forEach(function(e) { t[e] || (t[e] = function(n) { t._send(e, n) }) }), this.decorate()
                        };
                        o.prototype = {
                            _cfg: { debug: !1 },
                            _isProduct: !!location.href.match(".dianping.com"),
                            _isReady: !1,
                            config: function(e) { for (var t in e) this._cfg[t] = e[t] },
                            isOldVersion: function() { return !1 },
                            getQuery: function() {
                                var e = location.search.slice(1),
                                    t = {};
                                return e.split("&").forEach(function(e) {
                                    var n = e.split("=");
                                    t[n[0]] = n[1]
                                }), t
                            },
                            patchForType: function(e, t) { this.uaType() == e && (this.extend(t), this.decorate()) },
                            decorate: n(55),
                            Semver: {
                                eq: function(e, t) { return e === t },
                                gt: function(e, t) {
                                    var n = e ? e.split(".") : [],
                                        i = t ? t.split(".") : [];
                                    return [0, 1, 2].forEach(function(e) { n[e] = n[e] || 0, i[e] = i[e] || 0 }), +n[0] != +i[0] ? +n[0] > +i[0] : +n[1] != +i[1] ? +n[1] > +i[1] : +n[2] > +(i[2] || 0)
                                },
                                lt: function(e, t) { return !this.gte(e, t) },
                                gte: function(e, t) { return this.eq(e, t) || this.gt(e, t) },
                                lte: function(e, t) { return this.eq(e, t) || this.lt(e, t) }
                            },
                            _parseUA: function(e) { var t, n, i; return e.match(/iPhone/) ? (t = "iphone", n = e.match(/iPhone\sOS\s([\d_]+)/i)[1].replace(/_/g, ".")) : e.match(/Android/) ? (t = "android", i = e.match(/Android[\s|\/]([\w\.]+)/), n = i && i[1]) : (t = null, n = null), { name: t, version: n } },
                            getTypeFromUA: function(e) { return /dp\/com\.dianping\.(\w+)\//.test(e) ? e.match(/dp\/com\.dianping\.(\w+)\//)[1] : "web" },
                            uaType: function() { return this.getTypeFromUA(navigator.userAgent) },
                            _trace: function(e, t) {
                                if (this.hippoPrefix) {
                                    var n = this._cfg && this._cfg.logFact || .05;
                                    t = t || {}, t = this._mixin(t, { module: this.hippoPrefix + "_" + e }), Math.random() < n && (console.log("_trace", e), window._hip && _hip.push(["mv", t]))
                                }
                            },
                            log: function() {
                                for (var e = [], t = 0; t < arguments.length; t++) "string" == typeof arguments[t] ? e.push(arguments[t]) : void 0 != arguments[t] && e.push(JSON.stringify(arguments[t]));
                                e = e.join(" "), this._cfg && this._cfg.debug ? setTimeout(function() { alert(e) }) : console.log(e)
                            },
                            _mixin: i,
                            extend: function(e) { return this._mixin(this, e) },
                            _notImplemented: function(e) { e && e.fail && e.fail({ errMsg: "ERR_NOT_IMPLEMENTED" }) },
                            isSupport: function(e) { var t = this[e]; return !(!t || "function" != typeof t || t == this._notImplemented || 1 == t._notReady) }
                        }, o.prototype._osUA = o.prototype._parseUA(navigator.userAgent)
                    }, function(e, t) { e.exports = ["getVersion", "getNetworkType", "getContactList", "pickContact", "getRequestId", "getDeviceInfo", "clearStorage", "store", "retrieve", "publish", "subscribe", "unsubscribe", "openScheme", "jumpToScheme", "closeWindow", "sendSMS", "downloadImage", "setBackgroundColor", "setTitle", "setLLButton", "setLRButton", "setRLButton", "setRRButton", "isInstalledApp", "alert", "prompt", "confirm", "actionSheet"] }, function(e, t, n) {
                        var i = n(24);
                        e.exports = function(e) {
                            var t = this,
                                n = this.apis,
                                e = this.allowBeforeReady;
                            n.forEach(function(e) { t[e] || (t[e] = t._notImplemented) }), n.forEach(function(n) {
                                var o = t[n];
                                t[n] && t[n]._decorated || (t[n] = function(a) {
                                    var r = t._mixin({}, a);
                                    t._trace(n + "_call");
                                    var s = r.success,
                                        c = r.fail,
                                        u = function(e) {
                                            if (c) c(e);
                                            else if (t.onerror) t.onerror({ api: n, err: e });
                                            else {
                                                var i = e.errMsg ? e.errMsg : JSON.stringify(e),
                                                    o = new Error(i);
                                                o.name = "DPAppError", console.warn("`DPApp." + n + "` call faild"), t._trace("throw"), console.warn(new Error(o))
                                            }
                                        },
                                        l = +new Date;
                                    return r.success = function(e) { t._trace(n + "_success", { time: +new Date - l }), s && s(e) }, r.fail = function(e) {
                                        var i = {};
                                        i.args = a, i.result = e, t._trace(n + "_fail", { time: +new Date - l, note: JSON.stringify(i) }), u(e)
                                    }, this._isReady || -1 !== e.indexOf(n) || t._isProduct || !t.isOldVersion() ? new i(function(e, n) {
                                        var i = r.success,
                                            a = r.fail,
                                            s = function(t) { i(t), e(t) },
                                            u = function(e) { a(e), c || n(e) };
                                        r.success = s, r.fail = u, o.call(t, r)
                                    }) : void u("use `DPApp.ready(fn)` to wrap api calls")
                                }, t[n]._decorated = !0, t[n]._notReady = o == t._notImplemented)
                            })
                        }
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = n(8), n(57), n(58), n(59), n(60), n(62)
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(8);
                        e.exports = i, i.prototype.done = function(e, t) {
                            (arguments.length ? this.then.apply(this, arguments) : this).then(null, function(e) { setTimeout(function() { throw e }, 0) })
                        }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(8);
                        e.exports = i, i.prototype.finally = function(e) { return this.then(function(t) { return i.resolve(e()).then(function() { return t }) }, function(t) { return i.resolve(e()).then(function() { throw t }) }) }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { var t = new o(o._61); return t._65 = 1, t._55 = e, t }
                        var o = n(8);
                        e.exports = o;
                        var a = i(!0),
                            r = i(!1),
                            s = i(null),
                            c = i(void 0),
                            u = i(0),
                            l = i("");
                        o.resolve = function(e) {
                            if (e instanceof o) return e;
                            if (null === e) return s;
                            if (void 0 === e) return c;
                            if (!0 === e) return a;
                            if (!1 === e) return r;
                            if (0 === e) return u;
                            if ("" === e) return l;
                            if ("object" == typeof e || "function" == typeof e) try { var t = e.then; if ("function" == typeof t) return new o(t.bind(e)) } catch (e) { return new o(function(t, n) { n(e) }) }
                            return i(e)
                        }, o.all = function(e) {
                            var t = Array.prototype.slice.call(e);
                            return new o(function(e, n) {
                                function i(r, s) {
                                    if (s && ("object" == typeof s || "function" == typeof s)) { if (s instanceof o && s.then === o.prototype.then) { for (; 3 === s._65;) s = s._55; return 1 === s._65 ? i(r, s._55) : (2 === s._65 && n(s._55), void s.then(function(e) { i(r, e) }, n)) } var c = s.then; if ("function" == typeof c) { return void new o(c.bind(s)).then(function(e) { i(r, e) }, n) } }
                                    t[r] = s, 0 == --a && e(t)
                                }
                                if (0 === t.length) return e([]);
                                for (var a = t.length, r = 0; r < t.length; r++) i(r, t[r])
                            })
                        }, o.reject = function(e) { return new o(function(t, n) { n(e) }) }, o.race = function(e) { return new o(function(t, n) { e.forEach(function(e) { o.resolve(e).then(t, n) }) }) }, o.prototype.catch = function(e) { return this.then(null, e) }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) { for (var n = [], i = 0; i < t; i++) n.push("a" + i); var o = ["return function (" + n.join(",") + ") {", "var self = this;", "return new Promise(function (rs, rj) {", "var res = fn.call(", ["self"].concat(n).concat([s]).join(","), ");", "if (res &&", '(typeof res === "object" || typeof res === "function") &&', 'typeof res.then === "function"', ") {rs(res);}", "});", "};"].join(""); return Function(["Promise", "fn"], o)(a, e) }

                        function o(e) { for (var t = Math.max(e.length - 1, 3), n = [], i = 0; i < t; i++) n.push("a" + i); var o = ["return function (" + n.join(",") + ") {", "var self = this;", "var args;", "var argLength = arguments.length;", "if (arguments.length > " + t + ") {", "args = new Array(arguments.length + 1);", "for (var i = 0; i < arguments.length; i++) {", "args[i] = arguments[i];", "}", "}", "return new Promise(function (rs, rj) {", "var cb = " + s + ";", "var res;", "switch (argLength) {", n.concat(["extra"]).map(function(e, t) { return "case " + t + ":res = fn.call(" + ["self"].concat(n.slice(0, t)).concat("cb").join(",") + ");break;" }).join(""), "default:", "args[argLength] = cb;", "res = fn.apply(self, args);", "}", "if (res &&", '(typeof res === "object" || typeof res === "function") &&', 'typeof res.then === "function"', ") {rs(res);}", "});", "};"].join(""); return Function(["Promise", "fn"], o)(a, e) }
                        var a = n(8),
                            r = n(61);
                        e.exports = a, a.denodeify = function(e, t) { return "number" == typeof t && t !== 1 / 0 ? i(e, t) : o(e) };
                        var s = "function (err, res) {if (err) { rj(err); } else { rs(res); }}";
                        a.nodeify = function(e) {
                            return function() {
                                var t = Array.prototype.slice.call(arguments),
                                    n = "function" == typeof t[t.length - 1] ? t.pop() : null,
                                    i = this;
                                try { return e.apply(this, arguments).nodeify(n, i) } catch (e) {
                                    if (null === n || void 0 === n) return new a(function(t, n) { n(e) });
                                    r(function() { n.call(i, e) })
                                }
                            }
                        }, a.prototype.nodeify = function(e, t) {
                            if ("function" != typeof e) return this;
                            this.then(function(n) { r(function() { e.call(t, null, n) }) }, function(n) { r(function() { e.call(t, n) }) })
                        }
                    }, function(e, t, n) {
                        "use strict";

                        function i() { if (c.length) throw c.shift() }

                        function o(e) {
                            var t;
                            t = s.length ? s.pop() : new a, t.task = e, r(t)
                        }

                        function a() { this.task = null }
                        var r = n(25),
                            s = [],
                            c = [],
                            u = r.makeRequestCallFromTimer(i);
                        e.exports = o, a.prototype.call = function() { try { this.task.call() } catch (e) { o.onerror ? o.onerror(e) : (c.push(e), u()) } finally { this.task = null, s[s.length] = this } }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(8);
                        e.exports = i, i.enableSynchronous = function() { i.prototype.isPending = function() { return 0 == this.getState() }, i.prototype.isFulfilled = function() { return 1 == this.getState() }, i.prototype.isRejected = function() { return 2 == this.getState() }, i.prototype.getValue = function() { if (3 === this._65) return this._55.getValue(); if (!this.isFulfilled()) throw new Error("Cannot get a value of an unfulfilled promise."); return this._55 }, i.prototype.getReason = function() { if (3 === this._65) return this._55.getReason(); if (!this.isRejected()) throw new Error("Cannot get a rejection reason of a non-rejected promise."); return this._55 }, i.prototype.getState = function() { return 3 === this._65 ? this._55.getState() : -1 === this._65 || -2 === this._65 ? 0 : this._65 } }, i.disableSynchronous = function() { i.prototype.isPending = void 0, i.prototype.isFulfilled = void 0, i.prototype.isRejected = void 0, i.prototype.getValue = void 0, i.prototype.getReason = void 0, i.prototype.getState = void 0 }
                    }, function(e, t, n) {
                        var i, o = {},
                            a = ["appear", "disappear"],
                            r = n(64),
                            s = r(function(e) { DPApp._doSendMessage ? DPApp._doSendMessage(e.method, e.args, e.callback) : DPApp.doSendMessage && DPApp.doSendMessage(e.method, e.args, e.callback) });
                        i = {
                            _dequeueTimeout: null,
                            _messageQueue: s,
                            dequeue: function() {
                                var e = this;
                                setTimeout(function() { DPApp && DPApp.log && DPApp.log("Dequeue"), clearTimeout(this._dequeueTimeout), e._dequeueTimeout = null, s.dequeue() }, 0)
                            },
                            ready: function(e) {
                                var t = this;
                                this._send("ready", { success: function() { t._isReady = !0, e() } })
                            },
                            openScheme: function(e) {
                                var t = e.url,
                                    n = e.extra;
                                n && (t += "?" + this._convertUrlParams(n), delete e.extra, e.url = t), this._send("openScheme", e)
                            },
                            _sendMessage: function(e, t, n) {
                                var i = this;
                                s.push({ method: e, args: t, callback: n }), this._dequeueTimeout = setTimeout(function() { i.dequeue() }, 1e3)
                            },
                            _generateCallbackId: function() {
                                var e = Math.floor(1e3 * Math.random()),
                                    t = +new Date + "";
                                return +(t.substr(t.length - 5, 5) + "" + e)
                            },
                            _generateCallbackName: function(e) { return "DPApp_callback_" + e },
                            _doSendMessage: function(e, t, n) {
                                var i = n && "function" == typeof n;
                                this.log("调用方法", e, t);
                                var o = i ? this._generateCallbackId() : 0;
                                i && (window[this._generateCallbackName(o)] = n), t && "object" == typeof t || (t = {}), t.callbackId = o, t = JSON.stringify(t);
                                var a = "js://_?method=" + e + "&args=" + encodeURIComponent(t) + "&callbackId=" + o;
                                this.log("创建iframe " + e, "callbackId:" + o), this._createIframe(a)
                            },
                            _createNode: function(e, t) {
                                function n() { i.onload = i.onerror = null, i.parentNode && i.parentNode.removeChild(i) }
                                var i = document.createElement(t);
                                i.style.display = "none", i.onload = i.onerror = n, setTimeout(n, 5e3), i.src = e, document.body.appendChild(i)
                            },
                            _createIframe: function(e) { this._createNode(e, "iframe") },
                            _send: function(e, t) {
                                t = t || {};
                                var n = this,
                                    i = t.success,
                                    o = t.fail,
                                    a = t.handle,
                                    r = function(t) { n.log("调用失败 " + e, t), o && o.call(n, t) },
                                    s = function(t) { n.log("调用成功 " + e, t), i && i.call(n, t) },
                                    c = function(t) { n.log("回调 " + e, t), a && a.call(n, t) },
                                    u = i || o || a ? function(e) { var t = e.status; "next" != e.result && delete e.result, "success" == t ? s && s(e) : "action" == t ? c && c(e) : r && r(e) } : null;
                                this._sendMessage(e, t, u)
                            },
                            _convertUrlParams: function(e) { var t = []; for (var n in e) t.push(n + "=" + encodeURIComponent(e[n])); return t.join("&") },
                            _sanitizeAjaxOpts: function(e) {
                                e.method = e.method || "get", e.data = e.data || "";
                                var t = e.url,
                                    n = e.data;
                                if ("get" == e.method) {
                                    var i = [];
                                    for (var o in n) n.hasOwnProperty(o) && (n[o] || 0 === n[o]) && i.push(o + "=" + encodeURIComponent(n[o]));
                                    i.length && (t += -1 == t.indexOf("?") ? "?" : "&", t += i.join("&")), e.url = t, delete e.data
                                }
                                return e
                            },
                            _parseFeed: function(e) { var t; return e ? e.constructor.toString().indexOf("Array") >= 0 ? (t = [0, 0, 0, 0, 0, 0, 0, 0], e.forEach(function(e) { t[7 - e] = 1 }), parseInt(t.join(""), 2)) : void 0 : 255 },
                            _transModel: function(e, t) {
                                function n(e) { var t = function(e) { var t, n, i, o = 0; if (0 == e.length) return o; for (t = 0, i = e.length; t < i; t++) n = e.charCodeAt(t), o = (o << 5) - o + n, o |= 0; return o }(e); return "0x" + (65535 & t ^ t >>> 16).toString(16) }

                                function i(e) { return "[object Array]" == Object.prototype.toString.call(e) }

                                function o(e) { return "[object Object]" == Object.prototype.toString.call(e) }

                                function a(e) {
                                    if (o(e)) {
                                        delete e.__name;
                                        for (var t in e) {
                                            var n;
                                            r[t] && (n = e[r[t]] = e[t], a(n), delete e[t])
                                        }
                                    } else i(e) && e.forEach(function(e) { a(e) });
                                    return e
                                }
                                if (!e) return t;
                                var r = {};
                                return e.forEach(function(e) { r[n(e)] = e }), a(t)
                            },
                            _capital: function(e) { return e.slice(0, 1).toUpperCase() + e.slice(1) },
                            subscribe: function(e) {
                                function t(e) { o[s] && o[s].length && o[s].forEach(function(t) { t && t(e) }) }

                                function n() { i && (r[i] = t, e.success && e.success()) }
                                var i, r = this,
                                    s = e.action,
                                    c = (e.success, e.handle);
                                o[s] ? (e.success && e.success(), o[s].push(c)) : (-1 != a.indexOf(s) ? (i = "on" + r._capital(s), "scroll" == s ? this._send(i, { success: n }) : n()) : this._send("subscribe", { action: s, success: e.success, handle: t }), o[s] = [c])
                            },
                            unsubscribe: function(e) {
                                function t() { s[l] = NOOP }
                                var n = e.action,
                                    i = e.success,
                                    r = e.handle,
                                    s = this,
                                    c = o[n] ? o[n].indexOf(r) : -1;
                                if (-1 != c ? (o[n].splice(c, 1), i && i(), o[n].length || (o[n] = null)) : r || (o[n] = null), !o[n])
                                    if (-1 != a.indexOf(n) && after7_6) {
                                        var u = "off" + s._capital(n),
                                            l = "on" + s._capital(n);
                                        "scroll" == n ? this._send(u, { success: t }) : t()
                                    } else this._send("unsubscribe", { action: n, success: i })
                            },
                            getUA: function() {},
                            callback: function(e, t) {
                                var n = window,
                                    i = this._generateCallbackName(e),
                                    o = window[i];
                                o && (this.log("触发回调 ", "callbackId:" + e), setTimeout(function() { o && o.call(self, t) }), "complete" != t.result && "error" != t.result || (n[i] = null, delete n[i]))
                            }
                        }, e.exports = i
                    }, function(e, t) {
                        e.exports = function(e) {
                            var t = null,
                                n = null,
                                i = {
                                    timeout: null,
                                    running: !1,
                                    tasks: [],
                                    push: function(e, t) {
                                        var n = t || function(e) {};
                                        i.tasks.push({ data: e, callback: n }), setTimeout(function() { i.process() }, 0)
                                    },
                                    dequeue: function() { n ? n() : i.running = !1 },
                                    process: function() {
                                        if (i.tasks.length && !i.running) {
                                            var o = i.tasks.shift();
                                            i.running = !0, n = function() { i.running = !1, o.callback(o.data), i.process() }, t = o.data, e(o.data, n)
                                        }
                                    }
                                };
                            return i
                        }
                    }, function(e, t) {
                        e.exports = {
                            _iOSNetworkType: function(e) {
                                var t, n = { kSCNetworkReachabilityFlagsTransientConnection: 1, kSCNetworkReachabilityFlagsReachable: 2, kSCNetworkReachabilityFlagsConnectionRequired: 4, kSCNetworkReachabilityFlagsConnectionOnTraffic: 8, kSCNetworkReachabilityFlagsInterventionRequired: 16, kSCNetworkReachabilityFlagsConnectionOnDemand: 32, kSCNetworkReachabilityFlagsIsLocalAddress: 65536, kSCNetworkReachabilityFlagsIsDirect: 1 << 17, kSCNetworkReachabilityFlagsIsWWAN: 1 << 18 },
                                    i = +e.type,
                                    o = e.subType;
                                return 0 == (i & n.kSCNetworkReachabilityFlagsReachable) ? "none" : (0 == (i & n.kSCNetworkReachabilityFlagsConnectionRequired) && (t = "wifi"), 0 == (i & n.kSCNetworkReachabilityFlagsConnectionOnDemand) && 0 == (i & n.kSCNetworkReachabilityFlagsConnectionOnTraffic) || 0 == (i & n.kSCNetworkReachabilityFlagsInterventionRequired) && (t = "wifi"), (i & n.kSCNetworkReachabilityFlagsIsWWAN) == n.kSCNetworkReachabilityFlagsIsWWAN && (t = function(e) {
                                    switch (e) {
                                        case "CTRadioAccessTechnologyGPRS":
                                        case "CTRadioAccessTechnologyEdge":
                                        case "CTRadioAccessTechnologyCDMA1x":
                                            return "2g";
                                        case "CTRadioAccessTechnologyLTE":
                                            return "4g";
                                        case "CTRadioAccessTechnologyWCDMA":
                                        case "CTRadioAccessTechnologyHSDPA":
                                        case "CTRadioAccessTechnologyHSUPA":
                                        case "CTRadioAccessTechnologyCDMA1x":
                                        case "CTRadioAccessTechnologyCDMAEVDORev0":
                                        case "CTRadioAccessTechnologyCDMAEVDORevA":
                                        case "CTRadioAccessTechnologyCDMAEVDORevB":
                                        case "CTRadioAccessTechnologyeHRPD":
                                            return "3g"
                                    }
                                }(o)), t)
                            },
                            _androidNetworkType: function(e) {
                                var t = e.type,
                                    n = e.subType;
                                if (0 == t) switch (n) {
                                    case 1:
                                    case 2:
                                    case 4:
                                    case 7:
                                    case 11:
                                        return "2g";
                                    case 3:
                                    case 5:
                                    case 6:
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 12:
                                    case 14:
                                    case 15:
                                        return "3g";
                                    case 13:
                                        return "4g"
                                }
                                return 1 == t ? "wifi" : "none"
                            },
                            getNetworkType: function(e) {
                                var t = this,
                                    n = e.success;
                                this._send("getNetworkType", {
                                    success: function(e) {
                                        var i, o = t._osUA;
                                        switch (o.name) {
                                            case "iphone":
                                                i = this._iOSNetworkType(e);
                                                break;
                                            case "android":
                                                i = this._androidNetworkType(e)
                                        }
                                        n && n({ networkType: i, raw: { type: e.type, subType: e.subType } })
                                    },
                                    fail: e.fail
                                })
                            }
                        }
                    }, function(e, t) { e.exports = function(e, t) { for (var n in t) e[n] = t[n]; return e } }, function(e, t) { e.exports = ["getRequestId", "isInstalledApp", "getNetworkType", "getVersion", "getUserInfo", "login", "updateAccount", "logout", "thirdLogin", "getCityId", "getLocation", "getCity", "setPullDown", "stopPullDown", "openScheme", "jumpToScheme", "closeWindow", "getContactList", "sendSMS", "bindPhone", "ajax", "setSpotlight", "getHealthData", "pickCity", "analyticsTag", "store", "retrieve", "downloadImage", "chooseImage", "previewImage", "uploadImage", "playVoice", "share", "publish", "subscribe", "unsubscribe", "alert", "prompt", "confirm", "actionSheet", "setTitle", "setBackgroundColor", "setNavigationBarHidden", "setScrollEnabled", "setLLButton", "setLRButton", "setRLButton", "setRRButton", "setBouncesEnabled", "setStatusBarStyle", "setBarrageEnabled", "getCX", "pay"] }, function(e, t, n) {
                        "use strict";
                        var i = window.onerror,
                            o = location.protocol + "//catdot.dianping.com/broker-service/api/js";
                        window.onerror = function(e, t, n, a, r) {
                            var s = encodeURIComponent,
                                c = Date.now();
                            (new window.Image).src = o + "?error=" + s(e) + "&v=1&data=" + s(r && r.stack ? r.stack : "") + "&url=" + s(location.href) + "&file=" + s(t) + "&line=" + s(n) + "&col=" + s(a) + "&timestamp=" + c, i && i(e, t, n, a, r)
                        }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { var t = "on" + a._captal(e); return "android" == o.osName && "7.6.0" == o.appVersion && /appear|disappear/.test(e) && (t = e), t }
                        var o = n(3),
                            a = n(16),
                            r = n(26),
                            s = ["setLLButton", "setLRButton", "setRLButton", "setRRButton", "setTitle", "sendSMS", "publish", "closeWindow"],
                            c = {},
                            u = ["appear", "disappear", "scroll"],
                            l = function() {
                                var e = navigator.userAgent,
                                    t = e.match(/dp\/[\w\.\d]+\/([\d\.]+)/),
                                    n = t && t[1],
                                    i = e.match(/dp\/(com\.dianping\.\w+)/),
                                    o = i && i[1],
                                    r = e.match(/adapter\/([\d\.]+)/),
                                    s = r && r[1];
                                return function(e) {
                                    var t = e && e.success,
                                        i = { platform: "dpapp", appName: "dianping", packageId: o, appVersion: n, osName: a._osUA.name, osVersion: a._osUA.version, adapterVersion: s };
                                    return t && t(i), i
                                }
                            }(),
                            d = e.exports = {
                                appVersion: "7.1.0",
                                pay: r.pay,
                                uploadImage: r.uploadImage,
                                getUA: l,
                                ready: function(e) {
                                    var t = this;
                                    this._send("ready", { success: function() { t._isReady = !0, e() } })
                                },
                                login: function(e) {
                                    function t(e) { i.getUserInfo({ success: e }) }
                                    var n, i = this;
                                    t(function(o) {
                                        if (o.token) e.success && e.success(o);
                                        else {
                                            var a = function() { t(function(e) { n = e }), i.unsubscribe({ action: "loginSuccess", handle: a }) };
                                            i.subscribe({ action: "loginSuccess", handle: a });
                                            var r = function() { t(function(t) { t && t.token ? e.success && e.success(t) : e.fail && e.fail(t) }), i.unsubscribe({ action: "appear", handle: r }) };
                                            i.subscribe({ action: "appear", handle: r }), i.openScheme({ url: "dianping://login" })
                                        }
                                    })
                                },
                                updateAccount: function(e) {
                                    e = e || {};
                                    var t = this,
                                        n = document.cookie.match(/dper=\w+/);
                                    if (n && (n = n[0].split("=")[1]), e.dper && (n = e.dper), !n) return e.fail && e.fail("Missing dper");
                                    var i, o = function(e, n) {
                                        function i() { t.getUserInfo({ success: function(t) { t.token ? e && e(t) : o > 5 ? n && n() : (o++, setTimeout(function() { i() }, 100)) } }) }
                                        var o = 0;
                                        i()
                                    };
                                    i = "http" === location.protocol ? "http://m.api.dianping.com/mlogin/convertdper.api" : "https://mapi.dianping.com/mapi/mlogin/convertdper.api", t.ajax({
                                        url: i,
                                        data: { dper: n },
                                        keys: ["Token", "NewToken"],
                                        success: function(n) {
                                            var i = t.getUA();
                                            t.Semver.gte(i.appVersion, "7.5.0") ? t._send("updateAccount", { token: n.Token, newtoken: n.NewToken, success: function() { t.getUserInfo({ success: e.success }) }, fail: e.fail }) : (t._send("loginsuccess", { token: n.Token, newtoken: n.NewToken }), o(e.success, e.fail))
                                        },
                                        fail: e.fail
                                    })
                                },
                                _parseFeed: function(e) { var t; return e ? e.constructor.toString().indexOf("Array") >= 0 ? (t = [0, 0, 0, 0, 0, 0, 0, 0], e.forEach(function(e) { t[7 - e] = 1 }), parseInt(t.join(""), 2)) : void 0 : 255 },
                                share: function(e) { e.feed = this._parseFeed(e.feed), e.url = this._tidyUrlParams(e.url), this._send("share", e) },
                                initShare: function(e) {
                                    var t = this;
                                    this.setRRButton({ icon: "H5_Share", handle: function() { e.handle && e.handle(), t.share({ title: e.title, desc: e.desc, content: e.content, image: e.image, feed: e.feed, url: e.url, success: e.success, fail: e.fail }) } })
                                },
                                subscribe: function(e) {
                                    function t(e) { c[n] && c[n].length && c[n].forEach(function(t) { t && t(e) }) }
                                    var n = e.action,
                                        i = e.handle;
                                    c[n] ? (e.success && e.success(), c[n].push(i)) : (this._send("subscribe", { action: n, success: e.success, handle: t }), c[n] = [i])
                                },
                                unsubscribe: function(e) {
                                    var t = e.action,
                                        n = e.success,
                                        i = e.handle,
                                        o = c[t] ? c[t].indexOf(i) : -1; - 1 != o ? (c[t].splice(o, 1), n && n(), c[t].length || (c[t] = null)) : i || (c[t] = null), c[t] || this._send("unsubscribe", { action: t, success: n })
                                },
                                openScheme: function(e) {
                                    var t = e.url,
                                        n = e.extra;
                                    n && (t += "?" + this._convertUrlParams(n), delete e.extra, e.url = t), this._send("openScheme", e)
                                }
                            };
                        s.forEach(function(e) { d[e] = o.actionMapping(e) }), u.forEach(function(e) { d[i(e)] = function() {} })
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = {
                            appVersion: "7.2.0",
                            jumpToScheme: function(e) {
                                var t = e.url,
                                    n = e.extra;
                                n && (t += "?" + this._convertUrlParams(n), delete e.extra, e.url = t), e.toHome = e.toHome ? 1 : 0, this._send("jumpToScheme", e)
                            },
                            publish: function(e) {
                                var t = this._getBizName(e),
                                    n = ["phoneChanged", "AccountBindChange"];
                                t && (-1 == n.indexOf(e.action) && (e.action = t + ":" + e.action), this._send("publish", e))
                            }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3);
                        e.exports = {
                            appVersion: "7.5.0",
                            store: function(e) {
                                var t = this._getBizName(e);
                                t && (e.key = t + ":" + e.key, this._send("store", e))
                            },
                            retrieve: function(e) { var t = this._getBizName(e); - 1 === e.key.indexOf(":") && (e.key = t + ":" + e.key), this._send("retrieve", e) },
                            setBackgroundColor: i.actionMapping("setBackgroundColor")
                        }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { var t = "on" + a._captal(e); return "android" == o.osName && "7.6.0" == o.appVersion && /appear|disappear/.test(e) && (t = e), t }
                        var o = n(3),
                            a = n(16),
                            r = {},
                            s = ["appear", "disappear", "scroll"];
                        e.exports = {
                            appVersion: "7.6.0",
                            isInstalledApp: o.actionMapping("isInstalledApp"),
                            subscribe: function(e) {
                                function t(e) { r[c] && r[c].length && r[c].forEach(function(t) { t && t(e) }) }

                                function n() { o && (window.DPApp && (window.DPApp[i(c)] = t), e.success && e.success()) }
                                var o, a = this,
                                    c = e.action,
                                    u = e.handle;
                                r[c] ? (e.success && e.success(), r[c].push(u)) : (-1 !== s.indexOf(c) ? (o = "on" + a._captal(c), "scroll" == c ? this._send(o, { success: n }) : n()) : this._send("subscribe", { action: c, success: e.success, handle: t }), r[c] = [u])
                            },
                            unsubscribe: function(e) {
                                function t() { a[l] = function() {} }
                                var n = e.action,
                                    i = e.success,
                                    o = e.handle,
                                    a = this,
                                    c = r[n] ? r[n].indexOf(o) : -1;
                                if (-1 != c ? (r[n].splice(c, 1), i && i(), r[n].length || (r[n] = null)) : o || (r[n] = null), !r[n])
                                    if (-1 !== s.indexOf(n)) {
                                        var u = "off" + a._captal(n),
                                            l = "on" + a._captal(n);
                                        "scroll" == n ? this._send(u, { success: t }) : t()
                                    } else this._send("unsubscribe", { action: n, success: i })
                            }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3),
                            o = ["alert", "confirm", "actionSheet", "prompt", "setPullDown", "stopPullDown", "downloadImage"],
                            a = { appVersion: "7.8.0" };
                        o.forEach(function(e) {
                            var t = i.actionMapping(e);
                            a[e] = t
                        }), a.prompt = function(e) {
                            if (e.placeholder || (e.placeholder = ""), "ios" === i.osName)
                                for (var t = ["title", "placeholder", "okButton", "cancelButton", "success", "fail"], n = Object.keys(e), o = 0; o < n.length; o++) { var a = n[o];~t.indexOf(a) || delete e[a] }
                            this._send("prompt", e)
                        }, e.exports = a
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3),
                            o = n(75),
                            a = n(16);
                        e.exports = {
                            appVersion: "7.9.1",
                            setNavigationBarHidden: i.actionMapping("setNavigationBarHidden"),
                            chooseImage: function(e) { e = e || {}, e.count = !e.count || e.count > 9 || e.count < 1 ? 9 : e.count, this._send("chooseImage", e) },
                            uploadImage: function(e) {
                                var t = e.success,
                                    n = e.fail,
                                    i = e.handle,
                                    r = this.getUA(),
                                    s = this;
                                e.localId || e.localIds ? a.Semver.gte(r.adapterVersion || r.appVersion, "7.9.1") ? e.localIds ? function(e) {
                                    var i = {},
                                        a = [];
                                    o.mapSeries(e, function(e, t) { s._send("uploadPhoto", { localId: e, success: function(n) { i[e] = n.picKey, a.push({ localId: e, picKey: n.picKey }), t(null) }, fail: function(e) { t(e) } }) }, function(e) { e ? n && n(e) : t && t({ picKeys: i, photoInfos: a }) })
                                }(e.localIds) : this._send("uploadPhoto", e) : n({ errMsg: "ERR_NOT_IMPLEMENTED" }) : this._sendMessage("uploadImage", e, function(e) {
                                    if ("fail" == e.status) return void(n && n(e));
                                    i && i(e)
                                })
                            }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        t.mapSeries = function(e, t, n) {
                            function i(s, c) {
                                if (s) return n(s);
                                a++, r.push(c), a !== o ? t(e[a], i) : n(null, r)
                            }
                            var o = e.length,
                                a = 0,
                                r = [];
                            t(e[a], i)
                        }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3);
                        e.exports = { appVersion: "7.9.2", previewImage: i.actionMapping("previewImage") }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3);
                        e.exports = { appVersion: "7.9.4", setSpotlight: function(e) { e.webpageURL && (e.scheme || (e.scheme = "dianping://web?url=" + encodeURIComponent(e.webpageURL)), this._send("setSpotlight", e)) }, playVoice: i.actionMapping("playVoice") }
                    }, function(e, t, n) {
                        "use strict";
                        e.exports = {
                            appVersion: "7.9.6",
                            logout: function(e) {
                                var t;
                                1 === e.type ? t = "dianping://me" : 2 === e.type && (t = "dianping://home"), t && (e.success = function() { this.openScheme({ url: t }) }), this._send("logout", e)
                            },
                            login: function(e) {
                                function t(e) { n.getUserInfo({ success: e }) }
                                var n = this;
                                this.logout({
                                    type: 0,
                                    success: function() {
                                        var i = function() { t(function(t) { t && t.token ? (console.log("login success"), e.success && e.success(t)) : (console.log("login fail"), e.fail && e.fail(t)) }), n.unsubscribe({ action: "appear", handle: i }) };
                                        n.subscribe({ action: "appear", handle: i }), n.openScheme({ url: "dianping://login" })
                                    }
                                })
                            }
                        }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3);
                        e.exports = { appVersion: "8.0.0", setScrollEnabled: i.actionMapping("setScrollEnabled"), setBouncesEnabled: i.actionMapping("setBouncesEnabled"), bindPhone: i.actionMapping("bindPhone"), pay: i.actionMapping("pay") }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3),
                            o = {
                                appVersion: "8.0.4",
                                thirdLogin: function(e) {
                                    var t, n = e.type;
                                    switch (n) {
                                        case 1:
                                            t = location.protocol + "//m.dianping.com/auth/app?ft=15&sso=true";
                                            break;
                                        case 2:
                                            t = location.protocol + "//m.dianping.com/auth/app?ft=6&sso=true&redir=";
                                            break;
                                        case 3:
                                            t = location.protocol + "//m.dianping.com/auth/app?ft=5&ssp=true&redir=";
                                            break;
                                        case 4:
                                            t = location.protocol + "//m.dianping.com/auth/app?ft=2&source=1&sso=true&redir="
                                    }
                                    this.openScheme({ url: "dianping://loginweb?url=" + encodeURIComponent(t) + "&isFromNative=true" })
                                },
                                getCX: function(e) {
                                    var t = e.success;
                                    e.success = function(e) { e.fingerprint && (e.cx = e.fingerprint), t(e) }, this._send("getCX", e)
                                },
                                uploadImage: function(e) {
                                    var t = e.success,
                                        n = e.fail,
                                        i = e.handle;
                                    e.localId || e.localIds ? (e.localId && (e.localIds = [e.localId], delete e.localId), e.success = function(n) {
                                        var i, o = {};
                                        n.ret && (n.ret.forEach(function(t, n) { t.localId = t.localId || e.localIds[n], i = t.localId, o[i] = t.picKey }), n.photoInfos = n.ret, delete n.ret), n.picKeys = o, t(n)
                                    }, this._send("uploadPhoto", e)) : this._sendMessage("uploadImage", e, function(e) {
                                        if ("fail" == e.status) return void(n && n(e));
                                        i && i(e)
                                    })
                                }
                            };
                        "ios" === i.osName && (o.setStatusBarStyle = function(e) { void 0 === e.style && (e.style = 0), this._send("setStatusBarStyle", e) }), e.exports = o
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3);
                        e.exports = { appVersion: "8.0.6", share: function(e) { void 0 !== e.shareType && "android" === i.osName && (e.shareType += 1), e.feed = this._parseFeed(e.feed), e.url = this._tidyUrlParams(e.url), this._send("share", e) } }
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(3),
                            o = { appVersion: "8.1.0" };
                        "ios" === i.osName && (o.getHealthData = function(e) {
                            if (e) {
                                var t = [1],
                                    n = e.quantityType,
                                    i = e.fail;
                                ~t.indexOf(n) ? function(e) {
                                    var t = e.startDate,
                                        n = e.endDate || new Date,
                                        i = e.fail;
                                    if (t = +new Date(t), n = +new Date(n), t < n) return e.startDate = Math.round(t / 1e3), e.endDate = Math.round(n / 1e3), !0;
                                    "function" == typeof i && i("date error")
                                }(e) && this._send("getHealthData", e) : "function" == typeof i && i("type error")
                            }
                        }, o.prompt = function(e) { e.placeholder || (e.placeholder = ""), this._send("prompt", e) }), e.exports = o
                    }, function(e, t, n) {
                        "use strict";
                        n(3);
                        e.exports = { appVersion: "8.1.2", share: function(e) { e.feed = this._parseFeed(e.feed), e.url = this._tidyUrlParams(e.url), this._send("share", e) }, setBarrageEnabled: function(e) { this._send("setBarrageEnabled", e) } }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) { return function(t) { t && t.icon && (t.icon = o(t.icon)), this._send(e, t) } }

                        function o(e) { var t = { H5_Favorite_On: "ic_action_favorite_on_normal", H5_Favorite_Off: "ic_action_favorite_off_normal" }; return /android/i.test(a.osName) ? t[e] || e : e }
                        var a = n(3),
                            r = ["setLLButton", "setLRButton", "setRLButton", "setRRButton"],
                            s = e.exports = {
                                appVersion: "8.1.4",
                                publish: function(e) {
                                    var t = this._getBizName(e),
                                        n = ["phoneChanged", "AccountBindChange"];
                                    /2Native/i.test(e.type) || ~n.indexOf(e.action) ? (delete e.type, this._send("publish", e)) : t && (e.action = t + ":" + e.action, delete e.type, this._send("publish", e))
                                }
                            };
                        r.forEach(function(e) { s[e] = i(e) })
                    }, function(e, t, n) {
                        var i = n(3),
                            o = {
                                appVersion: "8.1.6",
                                pickCity: function(e) {
                                    var t = e && e.type;
                                    void 0 === t || 0 == t || 1 == t ? this._send("pickCity", e) : (console.log("param error"), "function" == typeof e.fail && e.fail())
                                },
                                analyticsTag: function(e) { e && e.channel && e.key && e.value ? ("string" == typeof e.value || (e.value = JSON.stringify(e.value)), this._send("analyticsTag", e)) : (console.log("param error"), "function" == typeof e.fail && e.fail()) }
                            };
                        "ios" === i.osName && (o.setPullDown = function(e) {
                            var t = 0,
                                n = e.success;
                            e.success = function(i) { t++, t > 1 ? e.handle(i) : n(i) }, this._send("setPullDown", e)
                        }, o.getNetworkType = function(e) {
                            var t = e.success;
                            e.success = function(e) { e.networkType = e.type, delete e.type, t(e) }, this._send("getNetworkType", e)
                        }), e.exports = o
                    }, function(e, t) { e.exports = "1.7.0" }, function(e, t) { e.exports = "npm" }, function(e, t) { e.exports = ["config", "isApiSupported", "getFingerprint", "getNetworkType", "getUserInfo", "login", "logout", "getCity", "getLocationCity", "getLocation", "share", "configShare", "openWebview", "closeWebview", "jumpWebview", "setTitle", "setNavButtons", "store", "retrieve", "chooseImage", "uploadImage", "previewImage", "downloadImage", "publish", "subscribe", "unsubscribe", "setNavigationBarHidden", "setBackgroundColor", "setBouncesEnabled", "setStatusBarStyle", "setLLButton", "alert", "confirm", "prompt", "sendSMS", "getContactList", "setPullDown", "stopPullDown", "pickCity"] }, function(e, t) { e.exports = { WECHAT_FRIENDS: 0, WECHAT_TIMELINE: 1, QQ: 2, SMS: 3, WEIBO: 4, QZONE: 5, EMAIL: 6, COPY: 7 } }, function(e, t) {
                        var n = 0,
                            i = function(e, t) { if (!t) return e; var n = []; for (var i in t) t.hasOwnProperty(i) && n.push(i + "=" + t[i]); return ~e.indexOf("?") ? e + n.join("&") : e + "?" + n.join("&") };
                        e.exports = function(e) {
                            if (!e.url) throw new Error("url request!");
                            var t = e.data || {},
                                o = e.onSuc || function() {},
                                a = t.callback = "KNB" + ++n + +new Date,
                                r = document.createElement("script");
                            r.src = i(e.url, t), window[a] = function(e) { delete window[a], r.parentNode.removeChild(r), o(e) }, document.getElementsByTagName("head")[0].appendChild(r)
                        }
                    }, function(e, t, n) {
                        function i(e) { var t = "cb_" + u++ + "_" + (new Date).getTime(); return l[t] = e, t }
                        var o = n(92),
                            a = n(5),
                            r = function() {},
                            s = {
                                getName: function(e) { return "DPApp_callback_" + e },
                                getId: function() {
                                    var e = Math.floor(1e3 * Math.random()),
                                        t = (+new Date).toString();
                                    return +(t.substr(t.length - 5, 5) + "" + e)
                                }
                            },
                            c = function() { return location.href.indexOf("knb_force_titans_debug=1") > -1 },
                            u = 1,
                            l = {},
                            d = {
                                _delay: 1e3,
                                _isDebug: !1,
                                _dequeueTimeout: null,
                                __type__: "npm",
                                __name__: "titansX",
                                queue: void 0,
                                readyQueue: [],
                                _isReadying: !1,
                                config: function(e) { this._isDebug = e.debug, this._isReady = e.ready, this._delay = e.delay || 1e3 },
                                setBridge: function(e) { "function" == typeof e ? (this._bridge = e, this._delay = 0) : (this._bridge = e.name, this._delay = e.delay) },
                                log: function() { for (var e = arguments, t = [], n = 0; n < arguments.length; n++) "string" == typeof e[n] ? t.push(e[n]) : void 0 != e[n] && t.push(JSON.stringify(e[n])); return this._isDebug || c() ? setTimeout(function() { return alert(t.join(" ")) }) : window._KNB_LOG ? window._KNB_LOG(t.join(" ")) : void 0 },
                                ready: function(e) { var t = this; return t._isReady ? e && e() : t._isReadying ? t.readyQueue.push(e) : (t._isReadying = !0, t.log("[Auth   ]: 正在进行鉴权"), void this.callNative("ready", { success: function() { t._isReady = !0, t._isReadying = !1, t.log("鉴权成功"), t.readyQueue.forEach(function(e) { e && e() }), t.readyQueue = [], e && e() }, fail: function(e) { t.log("鉴权失败", e) } })) },
                                callNative: function(e, t) {
                                    function n(t, n) { return function(i) { o.log("[" + t + " ] " + e, i), n && n.call(o, i) } }
                                    void 0 === t && (t = {}), this.log("[Call  ]", e);
                                    var o = this,
                                        r = n("Failed", t.fail),
                                        s = n("Success", t.success),
                                        c = n("Trigger", t.handle);
                                    t = a({ handlerId: i(c) }, t), o.enqueue(e, t, function(e) {
                                        var t = e.status,
                                            n = e.__isFromMTNB ? e.data : e;
                                        return "success" === t || "0" == String(t) ? s(n) : "action" === t ? c(n) : r(e)
                                    })
                                },
                                enqueue: function(e, t, n) {
                                    var i = this;
                                    this.queue = this.queue || o(function(e) {
                                        var t = e.method,
                                            n = e.args,
                                            o = e.callback;
                                        return i.doSendMessage(t, n, o)
                                    }), this.log("[Enqueue]", e), this.queue.push({ method: e, args: t, callback: n }), this._dequeueTimeout = setTimeout(function() { return i.dequeue("Auto") }, i._delay * i.queue.tasks.length)
                                },
                                dequeue: function(e) {
                                    e = e || "Native";
                                    var t = this;
                                    this.log("[Dequeue]", "by", e), setTimeout(function() { t._dequeueTimeout && clearTimeout(t._dequeueTimeout), t._dequeueTimeout = null, t.queue && t.queue.dequeue && t.queue.dequeue() }, 0)
                                },
                                doSendMessage: function(e, t, n) {
                                    void 0 === t && (t = {});
                                    var i = this.createCallback(n);
                                    t = JSON.stringify(t);
                                    var o = "js://_?method=" + e + "&args=" + encodeURIComponent(t) + "&callbackId=" + i;
                                    return this.log("[Send]", e, "with callbackId:", i, "has params: ", t), "function" == typeof this._bridge ? this._bridge(o) : "prompt" === this._bridge ? this.sendByPrompt(o) : void this.sendByIframe(o)
                                },
                                sendByPrompt: function(e) { this.log("[Send By Prompt]", e), window.prompt(e) },
                                sendByIframe: function(e) {
                                    this.log("[Send By iframe]", e);
                                    var t = document.createElement("iframe");
                                    t.style.display = "none";
                                    var n = function() { t.onload = t.onerror = null, t.parentNode && t.parentNode.removeChild(t) };
                                    t.onload = t.onerror = n, setTimeout(n, 3e3), t.src = e, (document.body || document.documentElement).appendChild(t)
                                },
                                createCallback: function(e) { var t, n = 0; return "function" == typeof e && (n = s.getId(), t = s.getName(n), window[t] = e), n },
                                callback: function(e, t, n) {
                                    this.log("[Call Callback]", e);
                                    var i = window,
                                        o = this,
                                        a = s.getName(e),
                                        r = window[a];
                                    if (r) { t && n && (t.__isFromMTNB = !0), setTimeout(function() { return r.call(o, t) }, 0); var c = (t || {}).result; "complete" != c && "error" != c || (i[a] = null, delete i[a]) }
                                }
                            };
                        if (window.MTNB ? console.log("you env has already register MTNB") : window.MTNB = { _handleMessageFromApp: function(e) { return d.log("[MTNB] ", "get message:", e), e.callbackId ? d.callback(e.callbackId, e.data, !0) : (l[e.handlerId] || r)(e.data) } }, window.DPApp && "hippo" !== window.DPApp.__type__) {
                            if ("titansX" === window.DPApp.__name__) d = window.DPApp;
                            else if (window.DPApp && window.DPApp.dequeue) {
                                var m = window.DPApp.dequeue;
                                window.DPApp.dequeue = function() { m.apply(window.DPApp, arguments), d.dequeue.apply(d, arguments) }
                            }
                        } else window.DPApp = d, d.ready();
                        c() && alert("[Titans UA] " + navigator.userAgent), e.exports = d
                    }, function(e, t) {
                        e.exports = function(e) {
                            var t = null;
                            return {
                                timeout: null,
                                running: !1,
                                tasks: [],
                                push: function(e, t) {
                                    var n = t || function() {},
                                        i = this;
                                    this.tasks.push({ data: e, callback: n }), setTimeout(function() { i.process() }, 0)
                                },
                                dequeue: function() { t ? t() : this.running = !1 },
                                process: function() {
                                    var n = this;
                                    if (this.tasks.length && !this.running) {
                                        var i = n.tasks.shift();
                                        n.running = !0, t = function() { n.running = !1, i.callback(i.data), n.process() }, e(i.data, t)
                                    }
                                }
                            }
                        }
                    }, function(e, t, n) {
                        function i(e, t) { var n = this.getBizName(); return e.indexOf(":") > -1 ? e : n ? n + ":" + e : (this.log("bizname not configed"), void t("bizname not config, please call KNB.confg({bizName: YOUR_BIZ_NAME})")) }

                        function o() { return window.TITANS_WEB_VIEW_URI || "dianping://web" }
                        var a = n(94),
                            r = n(95),
                            s = n(4),
                            c = n(5),
                            u = function() {},
                            l = n(96),
                            d = n(97),
                            m = n(18),
                            p = n(19),
                            h = n(20),
                            f = n(21),
                            v = n(98)(location.href);
                        e.exports = [{ message: "checkVersion" }, {
                            message: "getApisVersion",
                            handler: function(e) {
                                var t = e.success;
                                void 0 === t && (t = u);
                                var n = e.apis;
                                void 0 === n && (n = []);
                                var i = e.fail;
                                void 0 === i && (i = u), this.checkVersion({
                                    apis: n,
                                    success: function(e) {
                                        var i = e.infos || e.data.infos || {};
                                        t(n.map(function(e) { return String(i[e]) }))
                                    },
                                    fail: i
                                })
                            }
                        }, { message: "actionSheet" }, { message: "alert" }, { name: "closeWebview", message: "closeWindow" }, { message: "getContactList" }, { name: "getUA", handler: s }, { message: "confirm" }, { message: "getVersion" }, { message: "isInstalledApp" }, { message: "pickContact" }, { message: "prompt" }, {
                            message: "publish",
                            mapper: function(e) {
                                var t = e.type,
                                    n = e.action,
                                    o = e.success;
                                void 0 === o && (o = u);
                                var a = e.fail;
                                void 0 === a && (a = u);
                                var r = e.data,
                                    s = e.info;
                                if ("native" === t) return { action: n, success: o, fail: a, data: s || r };
                                var c = i.call(this, n, a);
                                return c ? { action: c, success: o, fail: a, data: s || r } : void 0
                            }
                        }, {
                            message: "remove",
                            mapper: function(e) {
                                var t = e.type,
                                    n = e.key,
                                    o = e.success;
                                void 0 === o && (o = u);
                                var a = e.fail;
                                if (void 0 === a && (a = u), "native" === t) return { key: n, success: o, fail: a };
                                var r = i.call(this, n, a);
                                return r ? { key: r, success: o, fail: a } : void 0
                            }
                        }, {
                            message: "retrieve",
                            mapper: function(e) {
                                var t = e.type,
                                    n = e.key,
                                    o = e.success;
                                void 0 === o && (o = u);
                                var a = e.fail;
                                if (void 0 === a && (a = u), "native" === t) return { key: n, success: o, fail: a };
                                var r = i.call(this, n, a);
                                return r ? { key: r, success: o, fail: a } : void 0
                            }
                        }, {
                            message: "store",
                            mapper: function(e) {
                                var t = e.type,
                                    n = e.key,
                                    o = e.value,
                                    a = e.success;
                                void 0 === a && (a = u);
                                var r = e.fail;
                                if (void 0 === r && (r = u), "native" === t) return { key: n, value: o, success: a, fail: r };
                                var s = i.call(this, n, r);
                                return s ? { key: s, value: o, success: a, fail: r } : void 0
                            }
                        }, { message: "setLLButton" }, { message: "setLRButton" }, { message: "setRLButton" }, { message: "setRRButton" }, { message: "setTitle" }, { message: "sendSMS" }, { message: "setBackgroundColor" }, { message: "setNavigationBarHidden", os: "android" }, { message: "setBouncesEnabled", os: "ios" }, { message: "setScrollEnabled", os: "ios" }, { message: "setStatusBarStyle", os: "ios", mapper: function(e) { var t = c({}, e); return void 0 === t.style && (t.style = 0), t } }, {
                            name: "setNavButtons",
                            handler: function(e) {
                                var t = this;
                                [].concat(e).forEach(function(e) {
                                    var n = c({}, e);
                                    delete n.position, n.icon = "base64" === e.type ? (e.icon || "").split("data:image/png;base64,")[1] : n.icon, t["set" + e.position + "Button"](n)
                                })
                            }
                        }, { message: "bind" }, { message: "chooseImage" }, { message: "downloadImage" }, { name: "getCity", message: "getCityInfo" }, { message: "getUserInfo", mapper: function(e) { return c({}, e, { success: function(t) { return e.success(c(t, { token: t.token || t.userToken, uuid: t.uuid || v.uuid })) } }) } }, { message: "getFingerprint" }, { message: "getLocation", mapper: function(e) { return e.timeout || (e.timeout = 6e3), e } }, { name: "getLocationCity", message: "getCityInfo", mapper: function(e) { return c({}, e, { success: function(t) { return e.success(c(t, { cityId: t.locCityId })) } }) } }, { message: "getFingerprint", name: "getCX" }, { message: "analyticsTag", version: "8.1.6" }, { name: "jumpWebview", message: "jumpToScheme", mapper: function(e) { return p(e.url) ? c({}, e, { url: o() + "?" + m.stringify(c({ url: e.url }, e.qs)) }) : e } }, { name: "openWebview", message: "openScheme", mapper: function(e) { return p(e.url) ? c({}, e, { url: o() + "?" + m.stringify(c({ url: e.url }, e.qs)) }) : e } }, {
                            name: "configShare",
                            handler: function(e) {
                                var t = this;
                                e = c({}, e);
                                var n = e.handle || u;
                                delete e.handle, this.setRRButton({ icon: "H5_Share", handle: function() { n(), t.share(e) } })
                            }
                        }, { message: "pickCity" }, { message: "analyticsTag" }, { message: "setBarrageEnabled" }, {
                            message: "getHealthData",
                            os: "ios",
                            mapper: function(e) {
                                if (e) {
                                    var t = c({}, e),
                                        n = [1],
                                        i = t.quantityType,
                                        o = t.fail || u,
                                        a = +new Date(t.startDate),
                                        r = +new Date(t.endDate || new Date);
                                    return a > r ? void o("date error") : -1 === n.indexOf(i) ? void o("type error") : (t.startDate = Math.round(a / 1e3), t.endDate = Math.round(r / 1e3), t)
                                }
                            }
                        }, {
                            message: "mapi",
                            name: "ajax",
                            mapper: function(e) {
                                var t = c({}, e),
                                    n = this;
                                t = this.util.sanitizeAjaxOpts(t);
                                var i = t.success || u;
                                return t.success = function(e) {
                                    var o = JSON.parse(e.mapiResult);
                                    o = n.util.transModel(t.keys, o), i(o)
                                }, t
                            }
                        }, { message: "login", mapper: function(e) { var t = e.success || u; return c({}, e, { success: function(e) { t(c({}, e, e.dpid ? { type: "dp" } : {}, { token: e.token || e.userToken })) } }) } }, { message: "logout" }, { message: "pay" }, { message: "playVoice" }, { message: "previewImage" }, { message: "setPullDown" }, { message: "stopPullDown" }, { message: "setNavigationBarHidden", os: "ios" }, {
                            message: "uploadPhoto",
                            name: "uploadImage",
                            mapper: function(e) {
                                var t = c({}, e),
                                    n = t.success || u;
                                return t.bucket ? t.clientId || (t.clientId = t.bucket) : t.bucket = t.clientId = "shaitu", t.success = function(e) {
                                    e.photoInfos = (e.photoInfos || e.ret || []).map(function(e) {
                                        var t = h(e.picKey),
                                            n = h(e.picUrl);
                                        return c({}, e, { picKey: n, originalKey: e.picKey, picUrl: n || (/^https?:\/\//.test(t) ? t : null), originalUrl: e.picKey || e.picUrl })
                                    }), n(e)
                                }, t
                            }
                        }, { message: "vibrate" }, { message: "toast" }, { message: "autoLock" }, { message: "lxlog" }, { message: "Semver", statics: f }, { message: "checkAuthorization" }, { message: "capture" }, { message: "shareImage", statics: { WECHAT_FRIENDS: 0, WECHAT_TIMELINE: 1 } }, { message: "setSearchBar" }, { message: "scanQRCode" }, { message: "setResult", statics: { RESULT_OK: -1, RESULT_CANCELED: 0 } }, { message: "getResult" }, { message: "setImageTitle" }, { message: "shark" }].concat([a, r, l, d])
                    }, function(e, t) {
                        var n = ["appear", "disappear"],
                            i = 0,
                            o = function() { return "sub" + ++i },
                            a = function() {};
                        e.exports = {
                            message: "subscribe",
                            mapper: function(e) {
                                var t = e.action,
                                    i = e.handle;
                                void 0 === i && (i = a);
                                var r = e.success;
                                void 0 === r && (r = a);
                                var s = e.fail;
                                void 0 === s && (s = a), this._eventQueue = this._eventQueue || {}, this._subscriptionMap = this._subscriptionMap || {};
                                var c = o();
                                this._subscriptionMap[c] = { action: t, handle: i };
                                var u = this._eventQueue,
                                    l = t,
                                    d = function(e) {
                                        (u[l] || []).filter(Boolean).forEach(function(t) { return t(e) })
                                    };
                                return u[l] ? (r({ subId: c }), void u[l].push(i)) : (u[l] = [i], -1 !== n.indexOf(l) ? function() { if (l) { window.DPApp && (window.DPApp["on" + function(e) { return e.slice(0, 1).toUpperCase() + e.slice(1) }(l)] = d), r({ subId: c }) } }() : { action: l, success: function() { return r({ subId: c }) }, handle: d, fail: s })
                            }
                        }
                    }, function(e, t) {
                        e.exports = {
                            message: "unsubscribe",
                            mapper: function(e) {
                                var t = this._eventQueue;
                                this._subscriptionMap = this._subscriptionMap || {};
                                var n = e.handle,
                                    i = e.action,
                                    o = e.success || function() {},
                                    a = e.subId,
                                    r = this._subscriptionMap[a];
                                r && (i = r.action, n = r.handle), t[i] = (t[i] || []).filter(function(e) { return e != n }), n || a || (t[i] = []), o()
                            }
                        }
                    }, function(e, t, n) {
                        var i = n(4).internal,
                            o = function() {},
                            a = function(e) {
                                var t, n = { kSCNetworkReachabilityFlagsTransientConnection: 1, kSCNetworkReachabilityFlagsReachable: 2, kSCNetworkReachabilityFlagsConnectionRequired: 4, kSCNetworkReachabilityFlagsConnectionOnTraffic: 8, kSCNetworkReachabilityFlagsInterventionRequired: 16, kSCNetworkReachabilityFlagsConnectionOnDemand: 32, kSCNetworkReachabilityFlagsIsLocalAddress: 65536, kSCNetworkReachabilityFlagsIsDirect: 1 << 17, kSCNetworkReachabilityFlagsIsWWAN: 1 << 18 },
                                    i = +e.type,
                                    o = e.subType;
                                return 0 == (i & n.kSCNetworkReachabilityFlagsReachable) ? "none" : (0 == (i & n.kSCNetworkReachabilityFlagsConnectionRequired) && (t = "wifi"), 0 == (i & n.kSCNetworkReachabilityFlagsConnectionOnDemand) && 0 == (i & n.kSCNetworkReachabilityFlagsConnectionOnTraffic) || 0 == (i & n.kSCNetworkReachabilityFlagsInterventionRequired) && (t = "wifi"), (i & n.kSCNetworkReachabilityFlagsIsWWAN) == n.kSCNetworkReachabilityFlagsIsWWAN && (t = function(e) {
                                    switch (e) {
                                        case "CTRadioAccessTechnologyGPRS":
                                        case "CTRadioAccessTechnologyEdge":
                                        case "CTRadioAccessTechnologyCDMA1x":
                                            return "2g";
                                        case "CTRadioAccessTechnologyLTE":
                                            return "4g";
                                        case "CTRadioAccessTechnologyWCDMA":
                                        case "CTRadioAccessTechnologyHSDPA":
                                        case "CTRadioAccessTechnologyHSUPA":
                                        case "CTRadioAccessTechnologyCDMAEVDORev0":
                                        case "CTRadioAccessTechnologyCDMAEVDORevA":
                                        case "CTRadioAccessTechnologyCDMAEVDORevB":
                                        case "CTRadioAccessTechnologyeHRPD":
                                            return "3g"
                                    }
                                }(o)), t)
                            },
                            r = function(e) {
                                var t = e.type,
                                    n = e.subType;
                                if (0 == t) switch (n) {
                                    case 1:
                                    case 2:
                                    case 4:
                                    case 7:
                                    case 11:
                                        return "2g";
                                    case 3:
                                    case 5:
                                    case 6:
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 12:
                                    case 14:
                                    case 15:
                                        return "3g";
                                    case 13:
                                        return "4g"
                                }
                                return 1 == t ? "wifi" : "none"
                            },
                            s = function(e) {
                                if (/wifi|2g|3g|4g/.test(e.type)) return e.type;
                                switch (i().osName) {
                                    case "ios":
                                        return a(e);
                                    case "android":
                                        return r(e)
                                }
                                return "unknown"
                            };
                        e.exports = {
                            message: "getNetworkType",
                            mapper: function(e) {
                                var t = e.success;
                                void 0 === t && (t = o);
                                var n = e.fail;
                                return void 0 === n && (n = o), { success: function(e) { t({ networkType: e.networkType || s(e) }) }, fail: n }
                            }
                        }
                    }, function(e, t) {
                        function n() {}

                        function i(e) { if (!e) return 0; for (var t = 0, n = 0; n < e.length; n++) t += e[n]; return t }
                        var o = (navigator.userAgent || "").match(/Android/i),
                            a = ["WECHAT_FRIENDS", "WECHAT_TIMELINE", "QQ", "SMS", "WEIBO", "QZONE", "EMAIL", "COPY"];
                        e.exports = {
                            message: "share",
                            statics: function() { return o ? { WECHAT_FRIENDS: 128, WECHAT_TIMELINE: 256, QQ: 512, SMS: 32, WEIBO: 1, QZONE: 2, EMAIL: 0, COPY: 0 } : { WECHAT_FRIENDS: 0, WECHAT_TIMELINE: 1, QQ: 2, SMS: 3, WEIBO: 4, QZONE: 5, EMAIL: 6, COPY: 7 } }(),
                            mapper: function(e) {
                                var t = e.title,
                                    r = e.desc,
                                    s = e.content,
                                    c = e.image,
                                    u = e.url,
                                    l = e.channel,
                                    d = e.success;
                                void 0 === d && (d = n);
                                var m = e.fail;
                                void 0 === m && (m = n);
                                var p = void 0 !== l ? [].concat(l) : 0,
                                    h = this.util.parseFeed(p);
                                u = this.util.tidyUrlParams(u);
                                var f = d;
                                return { title: t, desc: r, content: s, image: c, success: function(e) { void 0 != e.channel && (e.sharedTo = {}, a.forEach(function(t, n) { e.sharedTo[t] = n === e.channel })), f(e) }, shareType: o ? i(p) : h, fail: m, url: this.util.tidyUrlParams(u) }
                            }
                        }
                    }, function(e, t) {
                        function n(e) {
                            var t = e.indexOf("?"),
                                n = e.indexOf("#");
                            if (-1 === t) return {};
                            for (var i = n > -1 ? e.slice(t + 1, n) : e.slice(t + 1), o = {}, a = i.split("&"), r = 0; r < a.length; r++) {
                                var s = a[r].split("=");
                                o[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
                            }
                            return o
                        }
                        e.exports = n
                    }, function(e, t, n) {
                        ! function() {
                            function t() {}

                            function i(e) { return "[object Object]" === Object.prototype.toString.call(e) }

                            function o(e) { return "[object Function]" === Object.prototype.toString.call(e) }

                            function a(e) { return e }

                            function r(e) { if (!e) return 0; for (var t = 0, n = 0; n < e.length; n++) t += e[n]; return t }

                            function s(e) { var t = e.split("."); return 2 === t.length && t.unshift("basic"), { businessName: t[0], moduleName: t[1], methodName: t[2] } }

                            function c(e) { var t = document.cookie.match("(?:;|^)\\s*" + e + "\\s*=\\s*([^;]+)\\s*(?:;|$)"); return t && t[1] }

                            function u(e, t) {
                                try {
                                    var n = new XMLHttpRequest;
                                    n.open("GET", e, !0), n.onreadystatechange = function() {
                                        if (4 == n.readyState) {
                                            n.onreadystatechange = null;
                                            var e = JSON.parse(n.responseText);
                                            0 == e.status && t(e.data)
                                        }
                                    }, n.send()
                                } catch (e) { console.error(e) }
                            }

                            function l(e) {
                                try {
                                    switch (e) {
                                        case "imeituan":
                                            return navigator.userAgent.match(/meituangroup\/?([^ ]+)/i)[1];
                                        case "KNB":
                                            return navigator.userAgent.match(/KNB\/(\S+)/g).map(function(e) { return e.match(/KNB\/([^ ]+)/i)[1] })
                                    }
                                } catch (e) { t() }
                                return "0"
                            }

                            function d(e) {
                                function t(e) { if (!R) try { e.init(), R = !0 } catch (e) { console.log("init failed") } }
                                if (window.WebViewJavascriptBridge) return t(WebViewJavascriptBridge), void e(WebViewJavascriptBridge);
                                document.addEventListener("WebViewJavascriptBridgeReady", function() { t(WebViewJavascriptBridge), e(WebViewJavascriptBridge) }, !1)
                            }

                            function m(e, t) {
                                if (t) {
                                    var n = "cb_" + Q++ + "_" + (new Date).getTime();
                                    z[n] = t, e.callbackId = n
                                }
                                e.fromKNB = !0;
                                var i = JSON.stringify(e);
                                X && _MTNB._handleMessageFromJs(i), V && window.prompt(i), I("Notice", "sending:", e)
                            }

                            function p(e) {
                                var t;
                                if (!e || !i(e)) return I("error", "message is not defined or is not a valid object");
                                I("Notice", "get message:", e), e.callbackId && (t = z[e.callbackId]), e.handlerId && (t = K[e.handlerId], e.data = e.data || { status: 0 });
                                var n = e.data && e.data.status;
                                o(t) && t(e.data) && 0 !== n && o(g.onerror) && g.onerror(0, "test error message", null)
                            }

                            function h(e) { return Z ? new y(function(t) { g.checkVersion({ apis: [e], success: function(n) { t(n.info && 0 != n.info[e]) } }) }) : y.resolve(!1) }

                            function f() { "0" != F && g.reg({ name: "setPullDown", handler: function(e) { d(function(n) { n.callHandler("callNativeMethod", { moduleName: "platform", methodName: "buildUpRefresh", fromKNB: !0, data: { partial: !0 } }, t), n.registerHandler("pullToRefresh", function(t, n) { oe = n, e.handle() }) }) } }) }

                            function v() { "0" != F && g.reg({ name: "stopPullDown", handler: function() { return oe() } }) }
                            var g, T = n(5),
                                b = n(14),
                                S = "undefined" != typeof window ? window : {},
                                y = S.Promise || n(15),
                                w = n(19),
                                C = n(20),
                                E = { env: { token: "5788a4a2488076d81906aa66", sdkVersion: "0.01" }, logs: [] },
                                H = "undefined" != typeof window;
                            if (H) {
                                if (H && window.MTNB) return void(e.exports = window.MTNB);
                                var M = function() {
                                        function e() { n <= 0 && setTimeout(function() { return i(!0) }, 1) }
                                        var n = 0,
                                            i = t,
                                            o = new y(function(e) { return i = e });
                                        return { increase: function() { n++ }, decrease: function() { n--, n < 0 && (n = 0), e() }, tryResolve: e, ready: function(e) { return o.then(e) } }
                                    }(),
                                    G = !1,
                                    A = n(11),
                                    N = n(7),
                                    I = window._MTNB_LOG || function(e, t) { "error" == e && 1 == G ? alert("Error: " + t) : 1 == G && alert("Notice: " + t) },
                                    O = window._MTNB_INIT_CALLBACK || t,
                                    x = function(e, n) {
                                        try {
                                            var i = document.createElement("script"),
                                                o = navigator.userAgent.split(/\s+/),
                                                a = o.length;
                                            E.logs.push({ type: "business", tags: { method: e, nbType: "mtnb-knb", app: (o[a - 2] + o[a - 1] || "").toLowerCase(), path: location.protocol + "//" + location.hostname + location.pathname, ua: navigator.userAgent, msg: n || "" } });
                                            var r = "https://frep.meituan.com/api/collect?token=5788a4a2488076d81906aa66&empty=true&data=" + encodeURIComponent(JSON.stringify(E));
                                            i.setAttribute("src", r), document.body.appendChild(i), E.logs.pop()
                                        } catch (e) { t() }
                                    },
                                    D = Math.random() < .1 ? x : t,
                                    P = location.href.split("?")[1] || "",
                                    L = {};
                                P = P.split("&");
                                for (var _ = 0; _ < P.length; _++) {
                                    var k = P[_].split("=");
                                    L[decodeURIComponent(k[0])] = decodeURIComponent(k[1])
                                }
                                var R = !1,
                                    B = "default",
                                    V = (navigator.userAgent || "").match(/Android/i),
                                    X = (navigator.userAgent || "").match(/(iPhone|iPad|iPod)/i),
                                    U = /meituan/i.test(navigator.userAgent),
                                    W = /movie/i.test(navigator.userAgent),
                                    F = l("imeituan"),
                                    j = l("KNB"),
                                    Z = ("0" == j ? [] : j).some(function(e) { return parseFloat(e) >= 1.1 }),
                                    K = {},
                                    z = {},
                                    Q = 1,
                                    q = [],
                                    Y = {},
                                    J = {},
                                    $ = 0,
                                    ee = navigator.userAgent.indexOf("MTNB") > -1 || navigator.userAgent.indexOf("KNB") > -1,
                                    te = { WECHAT_FRIENDS: 1, WECHAT_TIMELINE: 2, QQ: 4, SMS: 8, WEIBO: 16, QZONE: 32, EMAIL: 64, COPY: 128 },
                                    ne = { WECHAT_FRIENDS: 128, WECHAT_TIMELINE: 256, QQ: 512, SMS: 32, WEIBO: 1, QZONE: 2, EMAIL: 0, COPY: 0 };
                                g = {
                                    _INITED: !1,
                                    callHandler: function(e, t, n) {
                                        [].concat(e.data).filter(Boolean).forEach(function(e) {
                                            if (o(e.handle)) {
                                                var t = "hd_" + Q++ + "_" + (new Date).getTime();
                                                K[t] = function(t) { e.handle((n || a)(t)) }, e.handlerId = t
                                            }
                                        }), m(e, t)
                                    },
                                    apis: {},
                                    _handleMessageFromApp: p,
                                    reg: function(e) {
                                        var t = e.name,
                                            n = e.statics;
                                        e.businessName = e.businessName || "basic", g[t] = function(e) { g.call(t, e) }, Object.keys(n || {}).forEach(function(n) { g[t][n] = e.statics[n] }), g.apis[t] = e, this._add && this._add(t, g[t])
                                    },
                                    call: function(e, n) {
                                        if (0 == g._INITED && ee) return q.push([e, n]);
                                        n = n || {};
                                        var i = g.apis[e],
                                            o = (i && i.mapper || a)(n),
                                            r = "basic";
                                        if (!e || "string" != typeof e) return I("error", "api name is invalid.");
                                        if (!i && e.indexOf(".") > -1 && (i = s(e), r = i.businessName), !i) return I("error", "api name [" + e + "] is not implemented.");
                                        if (i.handler) return i.handler(o);
                                        if (!ee && i.fallback) return i.fallback(o);
                                        if (!ee) return I("error", "api [" + e + "] do not have a fallback.");
                                        var c = { businessName: i.businessName || r, moduleName: i.moduleName, methodName: i.methodName, data: o };
                                        try { D(r + "-" + i.moduleName + "-" + i.methodName) } catch (e) { t() }
                                        if (["basic.webview.open", "basic.webview.close", "basic.webview.setIcon", "basic.webview.setTitle", "basic.webview.setHtmlTitle", "basic.account.login", "basic.account.logout"].indexOf(r + "." + i.moduleName + "." + i.methodName) > -1) return g.callHandler(c, null, i.handlerMapper);
                                        g.callHandler(c, function(e) { return "basic" === r && "core" === c.moduleName && "checkVersion" === c.methodName && "object" == typeof e.info ? (o.success || t)((i.callbackMapper || a)(e)) : 0 != e.status ? (n.fail || t)(e) : void(o.success || t)((i.callbackMapper || a)(e.data)) }, i.handlerMapper)
                                    }
                                }, g.use = g.call, b(g), [{ name: "config", handler: function(e) { void 0 != e.debug && (G = e.debug), void 0 != e.bizname && (B = e.bizname) } }, { name: "ready", handler: function(e) { void 0 === e && (e = t), M.ready(e) } }, {
                                    name: "isApiSupported",
                                    handler: function(e) {
                                        var n = e.apiName,
                                            i = e.success;
                                        void 0 === i && (i = t), M.ready(function() { var e = n.indexOf(".") > -1 ? s(n) : g.apis[n]; return e ? e.handler ? i(!0) : e.fallback && !ee ? i(!0) : Z ? h(e.businessName + "." + e.moduleName + "." + e.methodName).then(i) : void i(!0) : i(!1) })
                                    }
                                }, { name: "getUA", handler: n(4) }, {
                                    name: "share",
                                    moduleName: "share",
                                    methodName: "invoke",
                                    mapper: function(e) { return { url: e.url, title: e.title, pic: e.image, channel: r(e.channel) || -1, content: e.desc, handle: e.success } },
                                    statics: function() { return !ee || V || W ? ne : te }(),
                                    fallback: function(e) {
                                        var t = "imeituan://www.meituan.com/share?channel=" + (e.channel || -1) + "&title=" + encodeURIComponent(e.title) + "&imageURL=" + encodeURIComponent(e.pic) + "&detailURL=" + encodeURIComponent(e.url) + "&content_-1=" + encodeURIComponent(e.content) + "&content_1=" + encodeURIComponent(e.weiboContent);
                                        location.href = t
                                    }
                                }, {
                                    name: "openWebview",
                                    moduleName: "webview",
                                    methodName: "open",
                                    fallback: function(e) {
                                        var t = e.url;
                                        void 0 === t && (t = ""), w(t) && (t = "imeituan://www.meituan.com/web?url=" + encodeURIComponent(t)), location.href = t
                                    }
                                }, { name: "closeWebview", moduleName: "webview", methodName: "close", fallback: function() { window.close() } }, {
                                    name: "jumpWebview",
                                    handler: function(e) {
                                        var n = e.url;
                                        if (void 0 === n && (n = ""), w(n) && (n = "imeituan://www.meituan.com/web?url=" + encodeURIComponent(n)), V) return location.href = n, g.closeWebview();
                                        d(function(e) { e.callHandler("callNativeMethod", { moduleName: "platform", methodName: "closeAndNavigate", fromKNB: !0, data: { url: n } }, t) })
                                    }
                                }, { name: "setTitle", moduleName: "webview", methodName: "setHtmlTitle", fallback: function(e) { document.title = e.title } }, { name: "getLocation", moduleName: "geo", methodName: "getLocation", callbackMapper: function(e) { return { lat: e.latitude, lng: e.longitude } }, fallback: function(e) { navigator.geolocation.getCurrentPosition(function(t) { e.success && e.success({ lat: t.coords.latitude, lng: t.coords.longitude }) }, function(t) { e.fail && e.fail(t) }, { timeout: e.timeout, enableHighAccuracy: !1 }) } }, {
                                    name: "login",
                                    moduleName: "account",
                                    methodName: "login",
                                    mapper: function(e) {
                                        return e.handle = function(n) {
                                            var i = e.success || t,
                                                o = e.fail || t;
                                            return n.userId ? i({ type: "mt", name: n.userName, userId: n.userId, token: n.userToken }) : "0" !== String(n.status) ? o(n) : void i(n.data)
                                        }, e
                                    },
                                    fallback: function() {
                                        if (U) return void(location.href = "imeituan://www.meituan.com/signin?redirectURL=" + encodeURIComponent(location.href));
                                        location.href = "//i.meituan.com/account/login?backurl=" + encodeURIComponent(location.href)
                                    }
                                }, { name: "logout", moduleName: "account", methodName: "logout" }, {
                                    name: "getCity",
                                    handler: function(e) {
                                        var t = parseInt(L.ci);
                                        t || (t = parseInt(c("cityid")) || 0), e.success({ cityId: t, type: "mt" })
                                    }
                                }, { name: "getLocationCity", handler: function(e) { g.getLocation({ timeout: 1e3, success: function(t) { u("//i.meituan.com/locate/latlng/" + t.lat + "," + t.lng + ".json?ndr", function(t) { e.success && e.success({ cityId: t.id, type: "mt" }) }) }, fail: e.fail }) } }, { name: "store", handler: function(e) { var t; try { t = -1 != e.key.indexOf(":") ? e.key : B + ":" + e.key, localStorage[t] = e.value, e.success && e.success() } catch (t) { e.fail && e.fail(t) } } }, {
                                    name: "retrieve",
                                    handler: function(e) {
                                        var n = e.key;
                                        void 0 === n && (n = "");
                                        var i = e.success;
                                        void 0 === i && (i = t);
                                        var o = e.fail;
                                        void 0 === o && (o = t);
                                        var a;
                                        try { a = localStorage[-1 != n.indexOf(":") ? n : B + ":" + n] } catch (e) { return o(e) }
                                        i({ value: a })
                                    }
                                }, { name: "lxlog", businessName: "mtalog", moduleName: "stat", methodName: "log" }, {
                                    name: "getNetworkType",
                                    handler: function(e) {
                                        var n = e.success;
                                        void 0 === n && (n = t), n({ networkType: c("network") })
                                    }
                                }].forEach(g.reg.bind(g)), Z && [{ name: "checkVersion", moduleName: "core", methodName: "checkVersion" }, {
                                    name: "uploadImage",
                                    moduleName: "media",
                                    methodName: "uploadImage",
                                    mapper: function(e) { var t = T({}, e); return e.clientId || (t.clientId = t.bucket), t },
                                    callbackMapper: function(e) {
                                        var t = e.photoInfos;
                                        return void 0 === t && (t = []), {
                                            photoInfos: t.map(function(e) {
                                                var t = e.picKey,
                                                    n = C(e.picKey);
                                                return T(e, { picUrl: n, picKey: n, originalKey: t })
                                            })
                                        }
                                    }
                                }, { name: "previewImage", moduleName: "media", methodName: "previewImage" }, { name: "publish", moduleName: "message", methodName: "publish", mapper: function(e) { return e.info = e.info || e.data, e } }, {
                                    name: "subscribe",
                                    handler: function(e) {
                                        var n = e.action,
                                            i = e.handle;
                                        void 0 === i && (i = t);
                                        var o = e.success;
                                        void 0 === o && (o = t);
                                        var a = e.fail;
                                        if (void 0 === a && (a = t), n) {
                                            var r = n,
                                                s = J[r] || [],
                                                c = "sub_" + ++$;
                                            if (Y[c] = i, s.length) return s.push(c), J[r] = s, o({ subId: c });
                                            s.push(c), J[r] = s;
                                            var u = function(e) {
                                                (J[r] || []).forEach(function(t) { return Y[t](e) })
                                            };
                                            g.use("basic.message.subscribe", { action: r, handle: u, success: function() { return o({ subId: c }) }, fail: a })
                                        }
                                    }
                                }, {
                                    name: "unsubscribe",
                                    handler: function(e) {
                                        var n = e.action,
                                            i = e.subId,
                                            o = e.success;
                                        void 0 === o && (o = t), i ? Y[i] = t : n && (J[n] = []), o()
                                    }
                                }, { name: "setNavigationBarHidden", moduleName: "webview", methodName: "setNavigationBarHidden" }, { name: "setBackgroundColor", moduleName: "webview", methodName: "setBackgroundColor" }, { name: "setBouncesEnabled", moduleName: "webview", methodName: "setBouncesEnabled" }, { name: "setStatusBarStyle", moduleName: "webview", methodName: "setStatusBarStyle" }, { name: "sendSMS", moduleName: "system", methodName: "sendSMS" }, { name: "getContactList", moduleName: "system", methodName: "getContactList" }, { name: "chooseImage", moduleName: "media", methodName: "chooseImage" }].forEach(g.reg.bind(g)), "0" !== F && -1 === F.indexOf("7.0") && g.reg({ name: "chooseImage", moduleName: "media", methodName: "chooseImage" });
                                var ie = { l: null, r: null };
                                g.reg({ name: "setNavButtons", moduleName: "webview", methodName: "setIcon", mapper: function(e) { e = [].concat(e).filter(Boolean); for (var t = 0; t < e.length; t++) { var n = e[t]; "base64" == n.type && (n.url = n.icon), "RL" == n.position && (ie.l = n.disable ? null : n), "RR" == n.position && (ie.r = n.disable ? null : n) } return [ie.l, ie.r].filter(Boolean) } }), g.reg({ name: "configShare", handler: function(e) { return ee && V ? g.setNavButtons({ type: "base64", position: "RR", icon: window._MTNB_DEFAULT_SHARE_ICON || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACB1JREFUeAHtmwlsFUUYgF9vaSGNFIuVRAUEjRrQcGgJKlJQ8UJFSYBgQqKlRxpaQISqgFECctg2pRyNRg1CDcZwGAICjRBIJCGgEY0nKE3opQURbMvR1u+vb19m583ue01ou+DbZDr/Ofv//1z/zL76fJEnEoFIBCIRiETg/xuBqKvF9YKCgh6NjY1TsXdiW1vbkKioqBuBzwOfpN5N2VReXn6MukPPVRGAmTNnTsHRlXh2k4t3bQRlY2Ji4qyioqLTLnI2lucDgPMrcH6uzWp35DiBmLB+/fpf3MX+40aHI9RdMpmZmfNdnG9zsGsgOjuZMr0d+DayZwOQk5NzDz25xGatz3cO2iLK4HHjxsUlJCQkx8TETAQ/pMkNZL0o0WhG1LNTgKG/g558XLG6JjY2NmPNmjU/KLR2cPHixdE1NTVlyGcpPBkhQ0MtjJ4cAXl5eTdg/GOKMz56eorJeZEhAK1paWm52kiQzpVdw/XxZAAuXbqUQW+qth1cu3btfjdPJAjR0dFLNZlHNDwIVV8SxOxGws3qu+nZfSruBDNFbHLo3eIka9E9GQB6v5dloNQ4ck7FneCUlJTz8NTdoaeTrEX3ZABwuM4yUGoCMlDFneD6+voB8AILO3q1TrIW3ZMBwLjvLAOlxpGJ5ASJKs0EX758eYpKJ5DfqrgJ9lQANm/eHMP2l9Pa2vqZZmxfnNFzAptIdnb27RBesRF9vm0aHoQGhksQp4sJOJ7BK4vp7budXk0Qisn1C8n1m1QZnH+gpaXlE2jqWaEafBB5QKMqq8PdHgCMH4DxqzDsGd04B1zWh60E41dqWSzHELQHDbLTcH6TgW4jdVsASHV74ngh1szGgQSbVSA4eIayCl42pZ/Od8PRe5fD0Bw3GYsXYwFdVeNMVG1t7YvMc5mfEyix2rtbcKAcuedw4ov09PQtBGocMqmanAltIxl6A73XTUwTrcMjQC4mmpubx+OAZFmSsCRT/qR8TSKypays7Htg48NKfh8MOaRIHfTg+D4cmEXWZ1u90YtDWHpUSh9dEb1WaHsIWiHD/qjOd8PDDoD/wCGHjUW8yK03tsfHx+evXr36N+vFOJCGkcvQmw4t6J3wfqfMXbdunb76W02019gQz+gZTfDvhSCBOEup6tGjR2VJSYktd2hXCONPkDEmnXnz5vU6e/bsRhx4ysQ30P7BoecJxJcXL16cDb8QXVNWJnLLOMisxLlmQzudTgoZANmb9+7duwtLZB525LmEcA3Fltf7G5Drq02UV+n1Ux1p9ErL6gtQUPuVlZULIdqcx/Az9Oh66v2Uc8CSqk6lflRpQOatyfnD6MxiofpKke020HUEyNzFMtlv1TT0IPizLDay8Nke5F/AuQ0EwrSt1cJbwAL3EbV6YLG10dWIayrMiiyLlur8SfAnTc6L4dA/xbk8gbWnKDk5eTDD/UMvOS82ugaAnnxCc+RtnJSV1/Ghh9/DyZ9UAfAdy5cvD+tIq+p1BRwqAINUI9huPldxE+zv4R0ab6iGewZ1DQBWpiiWthUXF9cruCPIyLGdw8HDuqJ2bLATGaEC0KC8Oyo/P98tAQqIMgrks1XgAf8rgHgMcA0Ahtu+rjQ1NYVMhOht2VlsawftHPOY3wFzXA9DI0aMSMWh8QFp7tmHDRv2wZEjRy4oNBtYV1f3MjozbESfbxR6Vej9qNG7He2yPEA8ZSRUUvLZDm1XXt0ZBdcAiGHc1LxJj0o2GHhwIpAJ8sHib46rt8HUM8GAvAbIcXcdNzsLO/IVV2vjiqEhAyBnAdLhndpUCGkATso0qUBPvs7EGxROk2gtGjt27NrJkye3GPhdQnJdBMUCMY4sbhIOhcwBLIuRlR8uPE2+P4M7grscdHtzrC0luN/47wMt9S6tQ44AyxrrPsA/HfpadEO9HVoeGWOVyuOc8AiBKEL/TpWuwFuZTnPIJE8oNBvot2E0xJGUPrQl22vn3weoVjjdCOHcURzY6nYjhAOx1dXVOcguxvjr1XYFhn4BehGjZgkfQs9bfPTi+fpbAJ4P35Zj+PVaqTv3Rsgy5krUubm5KXwAfYu2MimmrbiGYMxnt9jA5Wl/FllJre8I493td4LoLQlDtl0k7CkQboMdkeNKfAjOFaPzsEmPIByix/vDc5tyQarohX0r3K0BsCzPysqahKMrKbdaNJf62vguoDvIPL+OC8857AwL4CXpfMHp2Wvvy5DuKKOhHyPhHco0lSfOs63KQmh85Nsg0+kwzF6WADovofO+hZvqkHmASakzaSxgp9hNSrR31BGQ1zSaDWX7lEuYFTYiP6rU8CDUcwEQC/nMLft84KEnt5FXNAYIDgDbZ4XKImhDVNwEezIAOGzb68GPm4zXaampqZJEBS5c9XZ0ecG9GoBzqrH0ZGBeq3QdbmhokI8vgZ0NPVs7urzgngwAdlWpxuLIGBV3gpk6upytHZOeJwMQFxcn9waS3lrPaFb5hyzEVMs5wb+FquzdKmKCPRmA0tLSPzB2l2owW1wFBypjOizO+38per+iI2uBd38goRhqBOW3wjh9hOGvdpL8VnglChUZGRknDhw4kCTDXnoeOdV5SZo+JgeYbmxcIQYWDIXmGZAen48xSx0Mkh52sv94UlLSyHBunEwnMYf3dT2ZS9SDw4cPl5V9lOHtjs7T+xP4fcIpg04QydMBEGsJwh6C8DNgOsVtO2z/jxF6flK4zkv7TlEUnqcepkMiPTsFo4L+Zwi6XIZsJFv07PcHTwUzYkwkApEIRCJgReBfWoMhbMkRs88AAAAASUVORK5CYII=", handle: function() { e.handle && e.handle(), g.share(e) } }) : ee && !V ? g.setNavButtons({ type: "share", position: "RR", handle: function() { e.handle && e.handle(), g.share(e) } }) : void d(function(t) { t.callHandler("callNativeMethod", { moduleName: "platform", methodName: "shareCommon", fromKNB: !0, data: { channel: r(e.channel) + "", content: e.content, "content_-1": e.content, content_1: e.weiboContent || e.content, detailURL: e.url, imageURL: e.image, title: e.title } }, function(t) { e.success && e.success(t) }) }) } });
                                var oe = t;
                                if ([{ name: "setPullDown", businessName: "basic", moduleName: "webview", methodName: "setPullDown", fallbackRegFn: f }, { name: "stopPullDown", businessName: "basic", moduleName: "webview", methodName: "stopPullDown", fallbackRegFn: v }, { name: "setSearchBar", businessName: "meituan", moduleName: "webview", methodName: "setSearchBar", fallbackRegFn: function() { g.reg({ name: "setSearchBar", handler: function(e) { d(function(n) { n.callHandler("callNativeMethod", { moduleName: "platform", methodName: "search", fromKNB: !0, data: e }, t) }) } }) } }, { name: "setLLButton", businessName: "basic", moduleName: "webview", methodName: "setLLButton", fallbackRegFn: t }, {
                                        name: "getUserInfo",
                                        businessName: "basic",
                                        moduleName: "account",
                                        methodName: "getUserInfo",
                                        callbackMapper: function(e) { return T(e, { userId: +e.userId || +e.id, token: e.token || L.token, uuid: e.uuid || L.uuid }) },
                                        fallbackRegFn: function() {
                                            g.reg({
                                                name: "getUserInfo",
                                                handler: function(e) {
                                                    var n = e.success;
                                                    void 0 === n && (n = t), n({ type: "mt", userId: L.userid ? parseInt(L.userid) : null, uuid: L.uuid ? L.uuid : null, token: L.token ? L.token : null })
                                                }
                                            })
                                        }
                                    }].forEach(function(e) {
                                        var t = e.name,
                                            n = e.businessName,
                                            i = e.moduleName,
                                            o = e.methodName,
                                            a = e.fallbackRegFn,
                                            r = e.callbackMapper;
                                        M.increase(), h(n + "." + i + "." + o).then(function(e) {
                                            if (M.decrease(), !e) return a();
                                            g.reg({ name: t, businessName: n, moduleName: i, methodName: o, callbackMapper: r })
                                        })
                                    }), g.reg(function() { return ee && "0" !== F && !V ? { name: "getFingerprint", moduleName: "fingerprint", methodName: "getFingerprint" } : { name: "getFingerprint", handler: function(e) { d(function(t) { t.callHandler("conveyFingerPrintInfoHandler", { fromKNB: !0 }, function(t) { e.success && e.success(t) }) }) } } }()), M.tryResolve(), g.__version__ = N, A("mtnb", g.__version__), H && (window.MTNB = g), e.exports = g, ee) {
                                    window.dpMTNBInit = function(e) {
                                        if (!e.nonceStr) return x("mtnb-init-failed", "nonceStr not exist");
                                        g.callHandler({ businessName: "basic", moduleName: "core", methodName: "init", data: { nonceStr: e.nonceStr, ts: parseInt(e.ts) || 0, url: e.url, sign: e.sign } }, function(e) {
                                            if (O(e), e && 0 !== e.status) { var t = JSON.stringify(e); return x("mtnb-init-failed", t), void I("error", t) }
                                            g._INITED = !0;
                                            for (var n = 0; n < q.length; n++) g.call(q[n][0], q[n][1])
                                        })
                                    };
                                    var ae = document.createElement("script");
                                    ae.setAttribute("type", "text/javascript");
                                    var re = location.protocol + "//m.dianping.com/mtnb/api/signature?callback=dpMTNBInit";
                                    ae.setAttribute("src", re), document.getElementsByTagName("head")[0].appendChild(ae)
                                }
                            }
                        }()
                    }, function(e, t, n) {
                        function i() {}

                        function o(e) { return "function" == typeof e }

                        function a(e) { return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") }

                        function r(e) {
                            e = encodeURIComponent(e);
                            var t = null,
                                n = location.search,
                                i = new RegExp("(?:\\?|&)" + a(e) + "=([^&]*)(?:&|$)"),
                                o = n.match(i);
                            return o && o.length > 1 && (t = decodeURIComponent(o[1])), t
                        }

                        function s(e, t) {
                            try {
                                var n = new XMLHttpRequest;
                                n.open("GET", e, !0), n.onreadystatechange = function() {
                                    if (4 == n.readyState) {
                                        n.onreadystatechange = null;
                                        var e = JSON.parse(n.responseText);
                                        0 == e.status && t(e.data)
                                    }
                                }, n.send()
                            } catch (e) { console.error(e) }
                        }
                        var c = n(101),
                            u = n(7),
                            l = n(208);
                        "undefined" != typeof window && void 0 === window.Promise && (window.Promise = n(15));
                        var d = !1,
                            m = null,
                            p = { WECHAT_FRIENDS: "weixinfriends", WECHAT_TIMELINE: "weixin", QQ: "qqclient", SMS: "sms", WEIBO: "sinaweibo", QZONE: "qzone", EMAIL: "email" },
                            h = {},
                            f = { config: !0, isApiSupported: !0, use: !0, getUA: !0, getUserInfo: !0, getFingerprint: !0, getNetworkType: !1, login: !0, logout: !1, getLocation: !0, getCity: !0, getLocationCity: !0, openWebview: !0, jumpWebview: !1, closeWebview: !0, share: !0, configShare: !0, setTitle: !0, setNavButtons: !0, store: !0, retrieve: !0, checkVersion: !1, chooseImage: !1, uploadImage: !1, previewImage: !1, downloadImage: !1, publish: !1, subscribe: !1, unsubscribe: !1, setNavigationBarHidden: !1, setBackgroundColor: !1, setStatusBarStyle: !1, setBouncesEnabled: !1, alert: !0, confirm: !0, prompt: !1, sendSMS: !1, getContactList: !1, setPullDown: !1, stopPullDown: !1 },
                            v = {
                                __version__: u,
                                ready: function(e) { e && e() },
                                config: function(e) { d = Boolean(e.debug), m = e.bizname },
                                isApiSupported: function(e) { e.success(!0 === f[e.apiName]) },
                                use: function(e, t) {
                                    e = e.replace(/^hb\./, "");
                                    try {
                                        var n = l[e],
                                            o = n.params.map(function(e) { return t[e] });
                                        1 === n.params.length && "opts" === n.params[0] && (o = [t]);
                                        var a = c[n.memberof][n.name].apply(null, o);
                                        if ("Promise" !== n.return) return a;
                                        a.then(t.success || i, t.fail || i)
                                    } catch (e) { t.fail && t.fail() }
                                },
                                getUserInfo: function(e) {
                                    Promise.all([c.account.getUser(), null]).then(function(t) {
                                        var n = t[0],
                                            i = t[1];
                                        e.success({ type: "mt", userId: n.userId, token: n.userToken, uuid: i })
                                    }).catch(e.fail || i)
                                },
                                getFingerprint: function(e) { c.pay.getFingerprint().then(function(t) { e.success({ fingerprint: t }) }).catch(e.fail || i) },
                                getNetworkType: function() { d && console.warn("KNB: API `getNetworkType` is not supported currently.") },
                                login: function(e) { c.account.login().then(function(t) { e.success({ type: "mt", userId: t.userId, token: t.userToken }) }).catch(e.fail || i) },
                                logout: function() { d && console.warn("KNB: API `logout` is not supported currently.") },
                                getLocation: function(e) {
                                    var t = r("lat"),
                                        n = r("lng");
                                    t && n ? setTimeout(function() { e.success({ lat: t, lng: n }) }, 0) : setTimeout(e.fail || i, 0)
                                },
                                getCity: function(e) { o(e.success) && c.position.getCity().then(function(t) { e.success({ type: "mt", cityId: t.cityId }) }).catch(e.fail || i) },
                                getLocationCity: function(e) { o(e.success) && v.getLocation({ success: function(t) { s("http://i.meituan.com/locate/latlng/" + t.lat + "," + t.lng + ".json?ndr", function(t) { e.success({ cityId: t.id, type: "mt" }) }) }, fail: e.fail }) },
                                openWebview: function(e) { c.webview.open(e.url) },
                                jumpWebview: function() { d && console.warn("KNB: API `jumpWebview` is not supported currently.") },
                                closeWebview: function() { c.webview.close() },
                                share: function(e) { e.channel && 0 !== e.channel.length || (e.channel = ["all"]), c.share.callLocal(e.channel, { title: e.title, content: e.desc, detailURL: e.url, imageURL: e.image }) },
                                configShare: function(e) { e.channel && 0 !== e.channel.length || (e.channel = ["all"]), c.share.activeNavButton(e.channel, { title: e.title, content: e.desc, detailURL: e.url, imageURL: e.image }) },
                                setTitle: function(e) { c.webview.setTitle(e.title) },
                                setNavButtons: function(e) {
                                    var t = [];
                                    e = [].concat(e), ["RR", "RL"].forEach(function(n) {
                                        var i = e.filter(function(e) { return n === e.position });
                                        if (i.length && (h[n] = i[i.length - 1]), (i = h[n]) && !i.disable) {
                                            var o = { callback: i.handle };
                                            switch (i.type) {
                                                case "base64":
                                                    o.type = "icon", o.icon = i.icon;
                                                    break;
                                                case "text":
                                                    o.type = "text", o.text = i.text, o.color = i.color
                                            }
                                            t.push(o)
                                        }
                                    }), c.webview.setMenus(t)
                                },
                                setLLButton: function(e) {
                                    var t = e.handle;
                                    void 0 === t && (t = i), c.webview.setBackAction(t)
                                },
                                store: function(e) {
                                    var t = m ? m + ":" + e.key : e.key;
                                    c.storage.setItem(t, JSON.stringify(e.value))
                                },
                                retrieve: function(e) {
                                    var t = e.key.split(/:(.*)$/),
                                        n = t.length > 1 ? t[0] : m,
                                        o = t.length > 1 ? t[1] : t[0];
                                    o = n ? n + ":" + o : o, c.storage.getItem(o).then(function(t) { e.success(JSON.parse(t)) }).catch(e.fail || i)
                                },
                                alert: function(e) {
                                    var t = e.message,
                                        n = e.title,
                                        o = e.handle;
                                    void 0 === o && (o = i);
                                    var a = e.button;
                                    c.ui.alert(t, n, [{ label: a, callback: function() { o() } }])
                                },
                                confirm: function(e) {
                                    var t = e.message,
                                        n = e.title,
                                        o = e.okButton,
                                        a = e.cancelButton,
                                        r = e.handle;
                                    void 0 === r && (r = i), c.ui.confirm(t, n, { label: o, callback: function() { r({ ret: !0 }) } }, { label: a, callback: function() { r({ ret: !1 }) } })
                                }
                            };
                        for (var g in p) p.hasOwnProperty(g) && (v.share[g] = p[g]);
                        v.getUA = n(4), n(11)("hbnb", u), e.exports = v
                    }, function(e, t, n) {
                        "use strict";
                        (function(i) { t = e.exports = function() { return t }, "production" !== i.env.NODE_ENV && (t._debug = n(1)), t._invoke = n(2), t.core = n(111), t.account = n(115), t.log = n(120), t.network = n(122), t.pay = n(125), t.position = n(128), t.storage = n(130), t.thirdApps = n(135), t.ui = n(137), t.webview = n(147), t.tower = n(158), t.flight = n(164), t.train = n(173), t.inject = n(186), window.Bridge = n(194), t.travel = n(196), t.env = n(202), t.share = n(204) }).call(t, n(0))
                    }, function(e, t, n) {
                        function i() { return t.colors[l++ % t.colors.length] }

                        function o(e) {
                            function n() {}

                            function o() {
                                var e = o,
                                    n = +new Date,
                                    a = n - (u || n);
                                e.diff = a, e.prev = u, e.curr = n, u = n, null == e.useColors && (e.useColors = t.useColors()), null == e.color && e.useColors && (e.color = i());
                                var r = Array.prototype.slice.call(arguments);
                                r[0] = t.coerce(r[0]), "string" != typeof r[0] && (r = ["%o"].concat(r));
                                var s = 0;
                                r[0] = r[0].replace(/%([a-z%])/g, function(n, i) {
                                    if ("%%" === n) return n;
                                    s++;
                                    var o = t.formatters[i];
                                    if ("function" == typeof o) {
                                        var a = r[s];
                                        n = o.call(e, a), r.splice(s, 1), s--
                                    }
                                    return n
                                }), "function" == typeof t.formatArgs && (r = t.formatArgs.apply(e, r)), (o.log || t.log || console.log.bind(console)).apply(e, r)
                            }
                            n.enabled = !1, o.enabled = !0;
                            var a = t.enabled(e) ? o : n;
                            return a.namespace = e, a
                        }

                        function a(e) { t.save(e); for (var n = (e || "").split(/[\s,]+/), i = n.length, o = 0; o < i; o++) n[o] && (e = n[o].replace(/\*/g, ".*?"), "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$"))) }

                        function r() { t.enable("") }

                        function s(e) {
                            var n, i;
                            for (n = 0, i = t.skips.length; n < i; n++)
                                if (t.skips[n].test(e)) return !1;
                            for (n = 0, i = t.names.length; n < i; n++)
                                if (t.names[n].test(e)) return !0;
                            return !1
                        }

                        function c(e) { return e instanceof Error ? e.stack || e.message : e }
                        t = e.exports = o, t.coerce = c, t.disable = r, t.enable = a, t.enabled = s, t.humanize = n(103), t.names = [], t.skips = [], t.formatters = {};
                        var u, l = 0
                    }, function(e, t) {
                        function n(e) {
                            if (e = "" + e, !(e.length > 1e4)) {
                                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                                if (t) {
                                    var n = parseFloat(t[1]);
                                    switch ((t[2] || "ms").toLowerCase()) {
                                        case "years":
                                        case "year":
                                        case "yrs":
                                        case "yr":
                                        case "y":
                                            return n * l;
                                        case "days":
                                        case "day":
                                        case "d":
                                            return n * u;
                                        case "hours":
                                        case "hour":
                                        case "hrs":
                                        case "hr":
                                        case "h":
                                            return n * c;
                                        case "minutes":
                                        case "minute":
                                        case "mins":
                                        case "min":
                                        case "m":
                                            return n * s;
                                        case "seconds":
                                        case "second":
                                        case "secs":
                                        case "sec":
                                        case "s":
                                            return n * r;
                                        case "milliseconds":
                                        case "millisecond":
                                        case "msecs":
                                        case "msec":
                                        case "ms":
                                            return n
                                    }
                                }
                            }
                        }

                        function i(e) { return e >= u ? Math.round(e / u) + "d" : e >= c ? Math.round(e / c) + "h" : e >= s ? Math.round(e / s) + "m" : e >= r ? Math.round(e / r) + "s" : e + "ms" }

                        function o(e) { return a(e, u, "day") || a(e, c, "hour") || a(e, s, "minute") || a(e, r, "second") || e + " ms" }

                        function a(e, t, n) { if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s" }
                        var r = 1e3,
                            s = 60 * r,
                            c = 60 * s,
                            u = 24 * c,
                            l = 365.25 * u;
                        e.exports = function(e, t) { return t = t || {}, "string" == typeof e ? n(e) : t.long ? o(e) : i(e) }
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i, o;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:invoke:invoke"), o = n(12));
                            var a = n(6),
                                r = n(109),
                                s = n(29),
                                c = n(110),
                                u = function(e, n, u, l) { if ("production" !== t.env.NODE_ENV && (i("module = %s", e), i("method = %s", n), i("parameters = %j", u), i("protocol = %s", l)), "production" === t.env.NODE_ENV && !a.isHBNBWebview && u && u.complete) { var d = u.complete; return void("function" == typeof d && setTimeout(function() { d({ status: 200, message: "not HBNB webview" }) })) } "production" !== t.env.NODE_ENV && (o("string" == typeof e && e), o("string" == typeof n && n)), u = u || {}, l = l || "magpie:"; var m = s(l, e, n, u); "production" !== t.env.NODE_ENV && i("uri = %s", m), r(function() { c(m) }) };
                            e.exports = u
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        (function(e, i) {
                            function o(e, n) { var i = { seen: [], stylize: r }; return arguments.length >= 3 && (i.depth = arguments[2]), arguments.length >= 4 && (i.colors = arguments[3]), f(n) ? i.showHidden = n : n && t._extend(i, n), y(i.showHidden) && (i.showHidden = !1), y(i.depth) && (i.depth = 2), y(i.colors) && (i.colors = !1), y(i.customInspect) && (i.customInspect = !0), i.colors && (i.stylize = a), c(i, e, i.depth) }

                            function a(e, t) { var n = o.styles[t]; return n ? "[" + o.colors[n][0] + "m" + e + "[" + o.colors[n][1] + "m" : e }

                            function r(e, t) { return e }

                            function s(e) { var t = {}; return e.forEach(function(e, n) { t[e] = !0 }), t }

                            function c(e, n, i) {
                                if (e.customInspect && n && M(n.inspect) && n.inspect !== t.inspect && (!n.constructor || n.constructor.prototype !== n)) { var o = n.inspect(i, e); return b(o) || (o = c(e, o, i)), o }
                                var a = u(e, n);
                                if (a) return a;
                                var r = Object.keys(n),
                                    f = s(r);
                                if (e.showHidden && (r = Object.getOwnPropertyNames(n)), H(n) && (r.indexOf("message") >= 0 || r.indexOf("description") >= 0)) return l(n);
                                if (0 === r.length) { if (M(n)) { var v = n.name ? ": " + n.name : ""; return e.stylize("[Function" + v + "]", "special") } if (w(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp"); if (E(n)) return e.stylize(Date.prototype.toString.call(n), "date"); if (H(n)) return l(n) }
                                var g = "",
                                    T = !1,
                                    S = ["{", "}"];
                                if (h(n) && (T = !0, S = ["[", "]"]), M(n)) { g = " [Function" + (n.name ? ": " + n.name : "") + "]" }
                                if (w(n) && (g = " " + RegExp.prototype.toString.call(n)), E(n) && (g = " " + Date.prototype.toUTCString.call(n)), H(n) && (g = " " + l(n)), 0 === r.length && (!T || 0 == n.length)) return S[0] + g + S[1];
                                if (i < 0) return w(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special");
                                e.seen.push(n);
                                var y;
                                return y = T ? d(e, n, i, f, r) : r.map(function(t) { return m(e, n, i, f, t, T) }), e.seen.pop(), p(y, g, S)
                            }

                            function u(e, t) { if (y(t)) return e.stylize("undefined", "undefined"); if (b(t)) { var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'"; return e.stylize(n, "string") } return T(t) ? e.stylize("" + t, "number") : f(t) ? e.stylize("" + t, "boolean") : v(t) ? e.stylize("null", "null") : void 0 }

                            function l(e) { return "[" + Error.prototype.toString.call(e) + "]" }

                            function d(e, t, n, i, o) { for (var a = [], r = 0, s = t.length; r < s; ++r) O(t, String(r)) ? a.push(m(e, t, n, i, String(r), !0)) : a.push(""); return o.forEach(function(o) { o.match(/^\d+$/) || a.push(m(e, t, n, i, o, !0)) }), a }

                            function m(e, t, n, i, o, a) {
                                var r, s, u;
                                if (u = Object.getOwnPropertyDescriptor(t, o) || { value: t[o] }, u.get ? s = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (s = e.stylize("[Setter]", "special")), O(i, o) || (r = "[" + o + "]"), s || (e.seen.indexOf(u.value) < 0 ? (s = v(n) ? c(e, u.value, null) : c(e, u.value, n - 1), s.indexOf("\n") > -1 && (s = a ? s.split("\n").map(function(e) { return "  " + e }).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) { return "   " + e }).join("\n"))) : s = e.stylize("[Circular]", "special")), y(r)) {
                                    if (a && o.match(/^\d+$/)) return s;
                                    r = JSON.stringify("" + o), r.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (r = r.substr(1, r.length - 2), r = e.stylize(r, "name")) : (r = r.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), r = e.stylize(r, "string"))
                                }
                                return r + ": " + s
                            }

                            function p(e, t, n) { var i = 0; return e.reduce(function(e, t) { return i++, t.indexOf("\n") >= 0 && i++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1 }, 0) > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1] }

                            function h(e) { return Array.isArray(e) }

                            function f(e) { return "boolean" == typeof e }

                            function v(e) { return null === e }

                            function g(e) { return null == e }

                            function T(e) { return "number" == typeof e }

                            function b(e) { return "string" == typeof e }

                            function S(e) { return "symbol" == typeof e }

                            function y(e) { return void 0 === e }

                            function w(e) { return C(e) && "[object RegExp]" === A(e) }

                            function C(e) { return "object" == typeof e && null !== e }

                            function E(e) { return C(e) && "[object Date]" === A(e) }

                            function H(e) { return C(e) && ("[object Error]" === A(e) || e instanceof Error) }

                            function M(e) { return "function" == typeof e }

                            function G(e) { return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e }

                            function A(e) { return Object.prototype.toString.call(e) }

                            function N(e) { return e < 10 ? "0" + e.toString(10) : e.toString(10) }

                            function I() {
                                var e = new Date,
                                    t = [N(e.getHours()), N(e.getMinutes()), N(e.getSeconds())].join(":");
                                return [e.getDate(), L[e.getMonth()], t].join(" ")
                            }

                            function O(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }
                            var x = /%[sdj%]/g;
                            t.format = function(e) {
                                if (!b(e)) { for (var t = [], n = 0; n < arguments.length; n++) t.push(o(arguments[n])); return t.join(" ") }
                                for (var n = 1, i = arguments, a = i.length, r = String(e).replace(x, function(e) {
                                        if ("%%" === e) return "%";
                                        if (n >= a) return e;
                                        switch (e) {
                                            case "%s":
                                                return String(i[n++]);
                                            case "%d":
                                                return Number(i[n++]);
                                            case "%j":
                                                try { return JSON.stringify(i[n++]) } catch (e) { return "[Circular]" }
                                            default:
                                                return e
                                        }
                                    }), s = i[n]; n < a; s = i[++n]) v(s) || !C(s) ? r += " " + s : r += " " + o(s);
                                return r
                            }, t.deprecate = function(n, o) {
                                function a() {
                                    if (!r) {
                                        if (i.throwDeprecation) throw new Error(o);
                                        i.traceDeprecation ? console.trace(o) : console.error(o), r = !0
                                    }
                                    return n.apply(this, arguments)
                                }
                                if (y(e.process)) return function() { return t.deprecate(n, o).apply(this, arguments) };
                                if (!0 === i.noDeprecation) return n;
                                var r = !1;
                                return a
                            };
                            var D, P = {};
                            t.debuglog = function(e) {
                                if (y(D) && (D = i.env.NODE_DEBUG || ""), e = e.toUpperCase(), !P[e])
                                    if (new RegExp("\\b" + e + "\\b", "i").test(D)) {
                                        var n = i.pid;
                                        P[e] = function() {
                                            var i = t.format.apply(t, arguments);
                                            console.error("%s %d: %s", e, n, i)
                                        }
                                    } else P[e] = function() {};
                                return P[e]
                            }, t.inspect = o, o.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, o.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" }, t.isArray = h, t.isBoolean = f, t.isNull = v, t.isNullOrUndefined = g, t.isNumber = T, t.isString = b, t.isSymbol = S, t.isUndefined = y, t.isRegExp = w, t.isObject = C, t.isDate = E, t.isError = H, t.isFunction = M, t.isPrimitive = G, t.isBuffer = n(106);
                            var L = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            t.log = function() { console.log("%s - %s", I(), t.format.apply(t, arguments)) }, t.inherits = n(107), t._extend = function(e, t) { if (!t || !C(t)) return e; for (var n = Object.keys(t), i = n.length; i--;) e[n[i]] = t[n[i]]; return e }
                        }).call(t, n(10), n(0))
                    }, function(e, t) { e.exports = function(e) { return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8 } }, function(e, t) {
                        "function" == typeof Object.create ? e.exports = function(e, t) { e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }) } : e.exports = function(e, t) {
                            e.super_ = t;
                            var n = function() {};
                            n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
                        }
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i, o;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:invoke:event"), o = n(12));
                            var a = n(6),
                                r = window,
                                s = document,
                                c = function(e) {
                                    "production" !== t.env.NODE_ENV && (o(e), i('dispatch event "%s"', e));
                                    var n = s.createEvent("Events");
                                    n.initEvent(e), s.dispatchEvent(n)
                                },
                                u = function() { "production" !== t.env.NODE_ENV && (i("add lifecycle event"), o(r.HBNB)), c("HBNB:ready"), a.HBNBReady = !0, r.HBNB.onPageShow = function() { c("HBNB:pageshow") }, r.HBNB.onPageHide = function() { c("HBNB:pagehide") } },
                                l = function() { setTimeout(function e() { r.HBNB ? u() : setTimeout(e, 500) }) },
                                d = function() { if ("production" !== t.env.NODE_ENV && "h5" === a.platform && (r.HBNB = {}, u()), !a.isHBNBWebview) return void("production" !== t.env.NODE_ENV && i("not HBNB webview")); "ios" === a.platform ? r.HBNB ? u() : a.HBNBVersion ? s.addEventListener("_HBNBReady", u) : l() : "android" === a.platform && (a.supportPrompt ? (r.HBNB = {}, u()) : r.HBNB ? u() : l()) };
                            e.exports = d
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:invoke:ready"));
                            var o = n(6),
                                a = [];
                            document.addEventListener("HBNB:ready", function() { "production" !== t.env.NODE_ENV && i("fnQueue length = %s", a.length); for (var e = 0, n = a.length; e < n; ++e) a[e]() });
                            var r = function(e) { "function" == typeof e && (o.HBNBReady ? e() : ("production" !== t.env.NODE_ENV && i("push fn to fnQueue"), a.push(e))) };
                            e.exports = r
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:invoke:send-uri"));
                            var o, a = n(6),
                                r = { alert: function(e) { window.alert(e) }, prompt: function(e) { window.prompt(e) }, HBNB: { android: function(e) { HBNB.sendBridgeMessage(e) }, ios: function(e) { HBNB.postMessage(e) } } };
                            o = "ios" === a.platform ? r.HBNB.ios : "android" === a.platform ? a.supportPrompt ? r.prompt : r.HBNB.android : r.alert, "production" !== t.env.NODE_ENV && i("sendURI = %s", o), e.exports = o
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.HBNBVersion = n(112), t.supportApis = n(113), t.OSVersion = n(114)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:core:HBNBVersion"));
                            var o = n(2);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("called"), new Promise(function(e, n) { o("core", "hbnb_version", { callback: function(o) { "production" !== t.env.NODE_ENV && i("version is %j", o), o && o.version ? e(o.version) : n() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:core:supportApis"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("apis is %j", e), new Promise(function(e, n) { o("core", "support_apis", { callback: function(n) { "production" !== t.env.NODE_ENV && i("status is %j", n), e(n) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:core:OSVersion"));
                            var o = n(2);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("called"), new Promise(function(e, n) { o("core", "os_version", { callback: function(n) { "production" !== t.env.NODE_ENV && i("version is %j", n), e(n) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.login = n(116), t.getUser = n(117), t.mobileLogin = n(118), t.sendMobileLoginCode = n(119)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:account:login"));
                            var o = n(2);
                            e.exports = function() { return new Promise(function(e, n) { o("user", "login", { callback: function(n) { "production" !== t.env.NODE_ENV && i("success, user is %j", n, n), e(n) }, errback: n }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:account:getUser"));
                            var o = n(2);
                            e.exports = function(e, n) { return new Promise(function(e, n) { o("user", "get_user", { callback: function(n) { "production" !== t.env.NODE_ENV && i("user is %j", n, n), e(n) }, errback: n }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:account:mobileLogin"));
                            var o = n(2);
                            e.exports = function(e, n) { return new Promise(function(a, r) { o("user", "mobile_login", { mobile: e, code: n, callback: function(e) { "production" !== t.env.NODE_ENV && i("success, user is %j", e, e), a(e) }, errback: r }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            "production" !== t.env.NODE_ENV && n(1)("hbnb:module:account:sendMobileLoginCode");
                            var i = n(2);
                            e.exports = function(e) { return new Promise(function(t, n) { i("user", "send_mobile_login_code", { mobile: e, callback: function() { t() }, errback: n }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.mge = n(121)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:log:mge"));
                            var o = n(2);
                            e.exports = function(e, n, a, r) {
                                if ("production" !== t.env.NODE_ENV && (i("cid = %s", e), i("act = %s", n), i("val = %s", a), i("lab = %s", r)), "object" == typeof e) {
                                    var s = e;
                                    e = String(s.cid || ""), n = String(s.act || s.action), a = String(s.val || s.value), r = String(s.lab || s.label)
                                }
                                o("log", "mge", { cid: e || "", action: n || "", value: a || "", label: r || "" })
                            }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.request = n(123), t.sendSms = n(124)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i, o;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:network:request"), o = n(12));
                            var a = n(2);
                            e.exports = function(e) {
                                if ("production" !== t.env.NODE_ENV && (i("request opts is %j", e), o(e.url), o(void 0 === e.method || -1 !== ["GET", "POST", "PUT", "DELETE"].indexOf(e.method.toUpperCase())), o(void 0 === e.headers || "object" == typeof e.headers), o(void 0 === e.body || "string" == typeof e.body), o(void 0 === e.followRedirect || "boolean" == typeof e.followRedirect), o(void 0 === e.maxRedirects || "number" == typeof e.maxRedirects), o(void 0 === e.timeout || "number" == typeof e.timeout)), e.headers) {
                                    var n = {},
                                        r = e.headers;
                                    for (var s in r) r.hasOwnProperty(s) && (n[s.toLowerCase()] = r[s]);
                                    e.headers = n
                                }
                                return new Promise(function(n, o) {
                                    a("network", "request", {
                                        url: e.url,
                                        method: e.method ? e.method.toUpperCase() : "GET",
                                        headers: e.headers ? e.headers : {},
                                        body: e.body ? e.body : "",
                                        followRedirect: !(!1 === e.followRedirect),
                                        maxRedirects: e.maxRedirects ? e.maxRedirects : 10,
                                        timeout: e.timeout ? e.timeout : 5e3,
                                        insecure: !!e.insecure && e.insecure,
                                        responseEncoding: e.responseEncoding ? e.responseEncoding : "",
                                        callback: function(e) {
                                            "production" !== t.env.NODE_ENV && i("request success, %j", e, e);
                                            for (var o = {}, a = e.headers, r = 0, s = a.length; r < s; r++) {
                                                var c = a[r],
                                                    u = c.indexOf(";");
                                                if (-1 !== u) {
                                                    var l = c.substr(0, l).trim().toLowerCase(),
                                                        d = c.substr(u + 1).trim();
                                                    o[l] = d
                                                }
                                            }
                                            e.headers = o, n(e)
                                        },
                                        errback: function(e) { "production" !== t.env.NODE_ENV && i("request fail, %j", e), o(e) }
                                    })
                                })
                            }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            "production" !== t.env.NODE_ENV && n(1)("hbnb:module:network:sendSms");
                            var i = n(2);
                            e.exports = function(e, t) { i("device", "send_sms", { recipients: e, text: t }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.payment = n(126), t.getFingerprint = n(127)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:pay:payment"));
                            var o = n(2);
                            e.exports = function(e) {
                                return "production" !== t.env.NODE_ENV && i("payment opts is %j", e), new Promise(function(n, a) {
                                    var r = e.callback;
                                    e.callback = function(e) { "production" !== t.env.NODE_ENV && i("payment return %j", e), n(e), "function" == typeof r && r(e) }, e.errback = function() { a() }, o("pay", "cashier", e)
                                })
                            }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:pay:getFingerprint"));
                            var o = n(2),
                                a = n(6),
                                r = n(13);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("called"), new Promise(function(e, n) { r(a.appVersion, "6.1") >= 0 ? o("pay", "get_fingerprint", { callback: function(o) { "production" !== t.env.NODE_ENV && i("fingerprint return %j", o), o && o.fingerprint ? e(o.fingerprint) : n() } }) : n() }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.getCity = n(129)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:position:getCity"));
                            var o = n(2);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("call get city"), new Promise(function(e, n) { o("position", "get_city", { callback: function(n) { "production" !== t.env.NODE_ENV && i("return city %j", n), e(n) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.getItem = n(131), t.setItem = n(132), t.removeItem = n(133), t.setResult = n(134)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:storage:getItem"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("key is %s", e), new Promise(function(n, a) { o("storage", "get_item", { key: e, callback: function(e) { "production" !== t.env.NODE_ENV && i("value is %j", e), n(e && e.value ? e.value : null) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:storage:setItem"));
                            var o = n(2);
                            e.exports = function(e, n) { "production" !== t.env.NODE_ENV && i("key is %s, value is %s", e, n.toString(), n), o("storage", "set_item", { key: e, value: n.toString() }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:storage:removeItem"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("key is %s", e), o("storage", "remove_item", { key: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:closeAll"));
                            var o = n(2),
                                a = n(6),
                                r = n(13);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("url list %s", e), "android" === a.platform && r(a.appVersion, "6.9") >= 0 && o("inject", "set_result", e) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.installed = n(136)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i, o;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:thirdApps:installed"), o = n(12));
                            var a = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && (i("app is %s", e), o(["alipay"].indexOf(e) >= 0)), new Promise(function(n, o) { a("third_apps", "installed", { appName: e, callback: function(e) { "production" !== t.env.NODE_ENV && i("status is %j", e), n(e && e.installed ? !0 : !1) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.loadingStart = n(138), t.loadingStop = n(139), t.toast = n(140), t.alert = n(141), t.confirm = n(142), t.options = n(143), t.singleSelect = n(144), t.selectDate = n(145), t.autoLock = n(146)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:loadingStart"));
                            var o = n(2);
                            e.exports = function() { "production" !== t.env.NODE_ENV && i("start"), o("ui", "loading_start") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:loadingStop"));
                            var o = n(2);
                            e.exports = function() { "production" !== t.env.NODE_ENV && i("stop"), o("ui", "loading_stop") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:toast"));
                            var o = n(2);
                            e.exports = function(e, n) { "production" !== t.env.NODE_ENV && (i("message is %s", e), i("time is %s", n)), n = n || 3e3, o("ui", "toast", { message: e, time: n }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:alert"));
                            var o = n(2);
                            e.exports = function(e, n, a) { "production" !== t.env.NODE_ENV && (i("message is %j", e), i("title is %j", n), i("button is %j", a)), a || (a = n, n = ""), "[object Object]" === Object.prototype.toString.call(a) && (a = [a]), o("ui", "alert", { message: e, title: n, buttons: a }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:confirm"));
                            var o = n(2);
                            e.exports = function(e, n, a, r) { "production" !== t.env.NODE_ENV && (i("message is %j", e), i("title is %j", n), i("left button is %j", a), i("right button is %j", r)), r || (r = a, a = n, n = ""), o("ui", "alert", { message: e, title: n, buttons: [a, r] }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:options"));
                            var o = n(2);
                            e.exports = function(e, n) { "production" !== t.env.NODE_ENV && (i("menus is %j", e), i("cancel is %j", n)), o("ui", "options", { menus: e, cancel: n }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:singleSelect"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("menus is %j", e), o("ui", "single_select", { menus: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:singleDate"));
                            var o = n(2);
                            e.exports = function(e, n, a) { return "production" !== t.env.NODE_ENV && (i("current is %s", e), i("maxDate is %s", n), i("minDate is %s", a)), new Promise(function(t, i) { o("ui", "select_date", { original: e || "", maxDate: n, minDate: a, callback: function(e) { t(e) }, errback: function(e) { i(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:ui:autoLock"));
                            var o = n(2),
                                a = n(6),
                                r = n(13);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("enable", e), r(a.appVersion, "6.5") >= 0 && o("ui", "auto_lock", { enable: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.open = n(148), t.back = n(149), t.close = n(150), t.closeAll = n(151), t.modal = n(152), t.dismiss = n(153), t.setTitle = n(154), t.setMenus = n(155), t.setComplexTitle = n(156), t.setBackAction = n(157)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:open"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("url is %s", e), o("webview", "open", { url: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:back"));
                            var o = n(2);
                            e.exports = function() { "production" !== t.env.NODE_ENV && i("called"), o("webview", "back") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:close"));
                            var o = n(2);
                            e.exports = function() { "production" !== t.env.NODE_ENV && i("called"), o("webview", "close") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:closeAll"));
                            var o = n(2),
                                a = n(6),
                                r = n(13);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("url list %s", e), "android" === a.platform && r(a.appVersion, "6.5") >= 0 ? o("webview", "close_all", { urls: e }) : o("webview", "close") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:modal"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("url is %s", e), o("webview", "modal", { url: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:dismiss"));
                            var o = n(2);
                            e.exports = function() { "production" !== t.env.NODE_ENV && i("called"), o("webview", "dismiss") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:setTitle"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("title is %s", e), o("webview", "set_title", { title: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:setMenus"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("menus is %j", e), o("webview", "set_navbar_menus", { menus: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i, o;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:setComplexTitle"), o = n(12));
                            var a = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && (i("opts is %j", e), o(e.title)), a("webview", "set_complex_title", e) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:webview:setBackAction"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("callback is %s", e), o("webview", "set_navbar_back", { callback: function() { return e(), !1 } }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.getUuid = n(159), t.commentCallback = n(160), t.comment = n(161), t.shareConfig = n(162), t.checkNickname = n(163)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:tower:getUuid"));
                            var o = n(2);
                            e.exports = function(e, n) { return new Promise(function(e, n) { o("tower", "get_uuid", { callback: function(n) { "production" !== t.env.NODE_ENV && i("uuid is %j", n, n), e(n.UUID) }, errback: n }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:tower:commentCallback"));
                            var o = n(2);
                            e.exports = function(e, n) { return new Promise(function(e, n) { o("tower", "sendTopicCommentSuccess", { callback: function(n) { "production" !== t.env.NODE_ENV && i("comment callback result is %j", n, n), e(n) }, errback: n }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:tower:comment"));
                            var o = n(2);
                            e.exports = function(e) { return new Promise(function(n, a) { o("tower", "comment", { type: e.type || "simple", placeholder: e.placeholder || "", content: e.content || "", limit: e.limit || null, buttonText: e.buttonText, callback: function(e) { "production" !== t.env.NODE_ENV && i("comment result is %j", e), n(e) }, errback: a }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:tower:shareConfig"));
                            var o = n(2);
                            e.exports = function(e, n) { return new Promise(function(a, r) { o("tower", "share_config_" + e, { title: n.title, desc: n.desc, imgUrl: n.imgUrl, link: n.link, callback: function(e) { "production" !== t.env.NODE_ENV && i("share_config result is %j", e), a(e) }, errback: r }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:tower:userCheckNickname"));
                            var o = n(2);
                            e.exports = function() { return new Promise(function(e, n) { o("tower", "user_check_nickname", { callback: function(n) { "production" !== t.env.NODE_ENV && i("check nickname callback result is %j", n), e(n) }, errback: n }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.gotoAppHomepage = n(165), t.getFilter = n(166), t.getLinkman = n(167), t.getExpress = n(168), t.selectCity = n(169), t.selectDate = n(170), t.selectRoundDate = n(171), t.gotoOrderDetail = n(172)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:flight:gotoAppHomepage"));
                            var o = n(2);
                            e.exports = function() { "production" !== t.env.NODE_ENV && i("called"), o("flight", "goto_app_homepage") }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:flight:getFilter"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("opts is %j", e), new Promise(function(t, n) { o("flight", "get_filter", { options: e, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            "production" !== t.env.NODE_ENV && n(1)("hbnb:module:flight:getLinkman");
                            var i = n(2);
                            e.exports = function(e) { return new Promise(function(t, n) { i("flight", "get_linkman", { id: e, is_international: is_international, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            "production" !== t.env.NODE_ENV && n(1)("hbnb:module:flight:getExpress");
                            var i = n(2);
                            e.exports = function(e, t) { return new Promise(function(n, o) { i("flight", "get_express", { siteId: e, id: t, callback: function(e) { n(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:flight:selectCity"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("city is %s", e), e = e || "", new Promise(function(t, n) { o("flight", "select_city", { original: e, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:flight:selectDate"));
                            var o = n(2);
                            e.exports = function(e, n, a, r) { return "production" !== t.env.NODE_ENV && (i("original is %s", r), i("from city %s", e), i("to city %s", n), i("mounths is %s", a)), r = r || "", new Promise(function(t, i) { o("flight", "select_date", { original: r, months: a, fromCity: e, toCity: n, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            "production" !== t.env.NODE_ENV && n(1)("hbnb:module:flight:selectRoundDate");
                            var i = n(2);
                            e.exports = function() { return new Promise(function(e, t) { i("flight", "select_roundDate", { callback: function(t) { e(t) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:flight:gotoOrderDetail"));
                            var o = n(2);
                            e.exports = function(e, n) { "production" !== t.env.NODE_ENV && (i("url is %s", e), i("orderListUrl is %s", n)), o("flight", "goto_order_detail", { url: e, orderListUrl: n }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.gotoOrderDetail = n(174), t.selectDate = n(175), t.selectStation = n(176), t.timeTable = n(177), t.selectDateStudent = n(178), t.selectDateRush = n(179), t.timeRange = n(180), t.gotoOrderList = n(181), t.multiSelect = n(182), t.selectTrains = n(183), t.ringtone = n(184), t.vibrate = n(185)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:gotoOrderDetail"));
                            var o = n(2);
                            e.exports = function(e, n) { "production" !== t.env.NODE_ENV && (i("url is %s", e), i("orderListUrl is %s", n)), o("train", "goto_order_detail", { url: e, orderListUrl: n }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:selectDate"));
                            var o = n(2);
                            e.exports = function(e, n, a) { return "production" !== t.env.NODE_ENV && (i("date is %s", e), i("days is %s", n), i("tips is %s", a)), void 0 === n && (n = 60), void 0 === a && (a = "预售期为60天，60天外不可购买"), new Promise(function(t, i) { o("train", "select_date", { date: e, days: n, tips: a, callback: function(e) { t(e.date) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:selectStation"));
                            var o = n(2);
                            e.exports = function(e, n) { return "production" !== t.env.NODE_ENV && (i("station code is %s", e), i("station type is %s", n)), new Promise(function(t, i) { o("train", "select_station", { stationCode: e, stationType: n, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:timeTable"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("stations is %j", e), o("train", "time_table", { title: "列车时刻表", header: ["", "车站", "到达", "发车", "停留"], rows: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:selectDateStudent"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("opts is %j", e), new Promise(function(t, n) { e.callback = function(e) { t(e.date) }, o("train", "select_date_student", e) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:selectDateRush"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("opts is %j", e), new Promise(function(t, n) { e.callback = function(e) { t(e.date) }, o("train", "select_date_rush", e) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:timeRange"));
                            var o = n(2);
                            e.exports = function(e, n) { return "production" !== t.env.NODE_ENV && (i("start is %s", e), i("end is %s", n)), void 0 === e && (e = 0, n = 24), new Promise(function(t, i) { o("train", "time_range", { start: e, end: n, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:gotoOrderList"));
                            var o = n(2);
                            e.exports = function(e) { "production" !== t.env.NODE_ENV && i("url is %s", e), o("train", "goto_order_list", { url: e }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:multiSelect"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("menus is %j", e), new Promise(function(t, n) { o("train", "multi_select", { menus: e, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:selectTrains"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("menus is %j", e), new Promise(function(t, n) { o("train", "select_trains", { menus: e, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:ringtone"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("duration is %s", e), new Promise(function(t, n) { o("train", "ringtone", { duration: e, callback: function() { t() }, errback: function() { n() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:train:vibrate"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("duration is %s", e), new Promise(function(t, n) { o("train", "vibrate", { duration: e, callback: function() { t() }, errback: function() { n() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.load = n(187), t.loadHTML = n(188), t.close = n(189), t.show = n(190), t.runScript = n(191), t.addStopUrl = n(192), t.callback = n(193)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:load"));
                            var o = n(2);
                            e.exports = function(e, n) { return "production" !== t.env.NODE_ENV && (i("name is %s", e), i("url is %s", n)), new Promise(function(t, i) { o("inject", "load", { name: e, url: n, callback: function() { t() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:loadHTML"));
                            var o = n(2);
                            e.exports = function(e, n, a) { return "production" !== t.env.NODE_ENV && (i("name is %s", e), i("url is %s", n), i("html is %s", a)), new Promise(function(t, i) { o("inject", "load_html", { name: e, baseUrl: n, html: a, callback: function() { t() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:close"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("name is %s", e), new Promise(function(t, n) { o("inject", "close", { name: e, callback: function() { t() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:show"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("name is %s", e), new Promise(function(t, n) { o("inject", "show", { name: e }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:runScript"));
                            var o = n(2);
                            e.exports = function(e, n, a) { return "production" !== t.env.NODE_ENV && (i("name is %s", e), i("script is %s", n), i("param is %s", a)), n = n.toString(), new Promise(function(t, i) { o("inject", "run_script", { name: e, script: n, param: a, callback: function() { t() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:addStopUrl"));
                            var o = n(2);
                            e.exports = function(e, n, a) { return "production" !== t.env.NODE_ENV && (i("name is %s", e), i("pattern is %s", n), i("script is %s", a)), new Promise(function(t, i) { o("inject", "add_stop_url", { name: e, pattern: n, script: a, callback: function() { t() } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:inject:callback"));
                            var o = n(2);
                            e.exports = function(e, n) { "production" !== t.env.NODE_ENV && (i("fnName is %s", e), i("data is %s", n)), o("inject", "callback", { callback: e, param: n }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";

                        function i() {}
                        var o = n(195);
                        i.prototype.pushBack = i.pushBack = o, i.prototype.setTitle = i.setTitle = function(e, t) { o("bridge:", "set_webview_title", { title: e, subtitle: t }) }, e.exports = i
                    }, function(e, t, n) {
                        "use strict";
                        var i = n(6),
                            o = n(29),
                            a = [],
                            r = function() { var e = a.length ? JSON.stringify(a) : ""; if (a = [], e) return e };
                        window.messageQueueFetch = r;
                        var s = function(e, t, n) {
                            n = n || {};
                            var r = e + "//" + t + "?params=" + encodeURIComponent(JSON.stringify(n, o.processParams));
                            if ("android" === i.platform)
                                if (i.supportPrompt) window.prompt(r);
                                else try { window.MeituanHotelWebviewBridge.sendBridgeMessage(r) } catch (e) {} else "ios" === i.platform ? a.push(r) : alert(r)
                        };
                        e.exports = s
                    }, function(e, t, n) {
                        "use strict";
                        t.selectCity = n(197), t.setGdata = n(198), t.getPosDeviceId = n(199), t.printerState = n(200), t.print = n(201)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:travel:selectCity"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("city is %s", e), e = e || "", new Promise(function(t, n) { o("travel", "select_city", { original: e, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:travel:setGdata"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("bigG is %s", e), e = e || "", new Promise(function(t, n) { o("travel", "set_g_data", { gdata: e, callback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:travelmerchant:get_pos_deviceid"));
                            var o = n(2);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("getDeviceId  %s"), new Promise(function(e, t) { o("travelmerchant", "get_pos_deviceid", { callback: function(t) { e(t) }, complete: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            "production" !== t.env.NODE_ENV && n(1)("hbnb:module:travelmerchant:check_printer_state");
                            var i = n(2);
                            e.exports = function() { return t.env.NODE_ENV, new Promise(function(e, t) { i("travelmerchant", "check_printer_state", { callback: function(t) { e(t) }, complete: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:travelmerchant:print"));
                            var o = n(2);
                            e.exports = function(e) { return "production" !== t.env.NODE_ENV && i("content is %s", e), e = e || [], new Promise(function(t, n) { o("travelmerchant", "print", { content: e, callback: function(e) { t(e) }, complete: function(e) { n(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.getPageEnv = n(203)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:env:getPageEnv"));
                            var o = n(2);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("called"), new Promise(function(e, t) { o("env", "get_page_env", { callback: function(t) { e(t) }, errback: function(e) { t(e) } }) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        t.activeNavButton = n(205), t.disableNavButton = n(206), t.callLocal = n(207)
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:share:activeNavButton"));
                            var o = n(2);
                            e.exports = function(e, n, a, r) {
                                return "production" !== t.env.NODE_ENV && (i("param channelParam is %j", e), i("param configParam is %j", n)), new Promise(function(t, i) {
                                    var s, c, u, l = { sinaweibo: 1, qzone: 2, qqweibo: 4, renren: 8, kaixin: 16, sms: 32, email: 64, weixin: 128, weixinfriends: 256, qqclient: 512, all: -1 },
                                        d = {},
                                        m = e || [],
                                        p = n || {},
                                        h = 0;
                                    if (m && "[object Array]" == Object.prototype.toString.call(m)) {
                                        for (var s = 0, f = m.length; s < f; s++) u = m[s], c = l[u.toLowerCase()], h += c, p["content_" + u] && (d["content_" + c] = p["content_" + u]);
                                        p.cid && (d.cid = p.cid), d.channel = h, d.content = p.content, d.detailURL = p.detailURL, d.imageURL = p.imageURL, d.title = p.title, d.callback = function(e) { return e && "COMPLETE" === e.status ? "function" == typeof a && a(e) : "function" == typeof r && r(e), t(e), !1 }, o("share", "enable_nav_share_button", d)
                                    }
                                })
                            }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:share:disableNavButton"));
                            var o = n(2);
                            e.exports = function() { return "production" !== t.env.NODE_ENV && i("called"), new Promise(function(e, t) { o("share", "disable_nav_share_button", {}) }) }
                        }).call(t, n(0))
                    }, function(e, t, n) {
                        "use strict";
                        (function(t) {
                            var i;
                            "production" !== t.env.NODE_ENV && (i = n(1)("hbnb:module:share:callLocal"));
                            var o = n(2);
                            e.exports = function(e, n, a, r) {
                                return "production" !== t.env.NODE_ENV && (i("param channelParam is %j", e), i("param configParam is %j", n)), new Promise(function(t, i) {
                                    var s, c, u, l = { sinaweibo: 1, qzone: 2, qqweibo: 4, renren: 8, kaixin: 16, sms: 32, email: 64, weixin: 128, weixinfriends: 256, qqclient: 512, all: -1 },
                                        d = {},
                                        m = e || [],
                                        p = n || {},
                                        h = 0;
                                    if (m && "[object Array]" == Object.prototype.toString.call(m)) {
                                        for (var s = 0, f = m.length; s < f; s++) u = m[s], c = l[u.toLowerCase()], h += c, p["content_" + u] && (d["content_" + c] = p["content_" + u]);
                                        p.cid && (d.cid = p.cid), d.channel = h, d.content = p.content, d.detailURL = p.detailURL, d.imageURL = p.imageURL, d.title = p.title, d.callback = function(e) { return e && "COMPLETE" === e.status ? "function" == typeof a && a(e) : "function" == typeof r && r(e), t(e), !1 }, o("share", "common_share", d)
                                    }
                                })
                            }
                        }).call(t, n(0))
                    }, function(e, t) { e.exports = { "core.HBNBVersion": { params: [], memberof: "core", name: "HBNBVersion", return: "Promise" }, "core.OS": { params: [], memberof: "core", name: "OS", return: "Promise" }, "core.supportApis": { params: [], memberof: "core", name: "supportApis", return: "Promise" }, "account.getUser": { params: [], memberof: "account", name: "getUser", return: "Promise" }, "account.login": { params: [], memberof: "account", name: "login", return: "Promise" }, "account.mobileLogin": { params: ["mobile", "code"], memberof: "account", name: "mobileLogin", return: "Promise" }, "account.sendMobileLoginCode": { params: ["mobile"], memberof: "account", name: "sendMobileLoginCode", return: "Promise" }, "log.mge": { params: ["cid", "act", "val", "lab"], memberof: "log", name: "mge", return: "Undefined" }, "network.request": { params: ["opts"], memberof: "network", name: "request", return: "Promise" }, "network.sendSms": { params: [], memberof: "network", name: "sendSms" }, "pay.getFingerprint": { params: [], memberof: "pay", name: "getFingerprint", return: "Promise" }, "pay.payment": { params: ["opts"], memberof: "pay", name: "payment", return: "Promise" }, "position.getCity": { params: [], memberof: "position", name: "getCity", return: "Promise" }, "storage.getItem": { params: [], memberof: "storage", name: "getItem", return: "Promise" }, "storage.removeItem": { params: [], memberof: "storage", name: "removeItem", return: "Undefined" }, "storage.setItem": { params: [], memberof: "storage", name: "setItem", return: "Undefined" }, "storage.setResult": { params: ["obj"], memberof: "storage", name: "setResult", return: "Undefined" }, "thirdApps.installed": { params: ["appName"], memberof: "thirdApps", name: "installed", return: "Promise" }, "ui.alert": { params: ["message", "title", "button"], memberof: "ui", name: "alert", return: "Undefined" }, "ui.autoLock": { params: ["enable"], memberof: "ui", name: "autoLock", return: "Undefined" }, "ui.confirm": { params: ["message", "title", "leftButton", "rightButton"], memberof: "ui", name: "confirm", return: "Undefined" }, "ui.loadingStart": { params: [], memberof: "ui", name: "loadingStart", return: "Undefined" }, "ui.loadingStop": { params: [], memberof: "ui", name: "loadingStop", return: "Undefined" }, "ui.options": { params: ["menus", "cancel"], memberof: "ui", name: "options", return: "Undefined" }, "ui.selectDate": { params: ["current", "maxDate", "minDate"], memberof: "ui", name: "selectDate", return: "Promise" }, "ui.singleSelect": { params: ["menus"], memberof: "ui", name: "singleSelect", return: "Undefined" }, "ui.toast": { params: ["message", "time"], memberof: "ui", name: "toast", return: "Undefined" }, "webview.back": { params: [], memberof: "webview", name: "back", return: "Undefined" }, "webview.closeAll": { params: ["urls"], memberof: "webview", name: "closeAll", return: "Undefined" }, "webview.close": { params: [], memberof: "webview", name: "close", return: "Undefined" }, "webview.dismiss": { params: [], memberof: "webview", name: "dismiss" }, "webview.modal": { params: ["url"], memberof: "webview", name: "modal", return: "Undefined" }, "webview.open": { params: ["url"], memberof: "webview", name: "open", return: "Undefined" }, "webview.setBackAction": { params: ["cb"], memberof: "webview", name: "setBackAction", return: "Undefined" }, "webview.setComplexTitle": { params: ["opts"], memberof: "webview", name: "setComplexTitle", return: "Undefined" }, "webview.setMenus": { params: ["menus"], memberof: "webview", name: "setMenus", return: "Undefined" }, "webview.setTitle": { params: ["title"], memberof: "webview", name: "setTitle", return: "Undefined" }, "tower.sendTopicCommentSuccess": { params: [], memberof: "tower", name: "sendTopicCommentSuccess", return: "Promise" }, "tower.comment": { params: ["opts"], memberof: "tower", name: "comment", return: "Promise" }, "tower.getUuid": { params: [], memberof: "tower", name: "getUuid", return: "Promise" }, "tower.shareConfig": { params: ["name", "opts"], memberof: "tower", name: "shareConfig", return: "Promise" }, "tower.checkNickname": { params: [], memberof: "tower", name: "checkNickname", return: "Promise" }, "flight.alipay": { params: ["orderId", "payURL", "returnURL"], memberof: "flight", name: "alipay", return: "Promise" }, "flight.getExpress": { params: ["siteId", "id"], memberof: "flight", name: "getExpress", return: "Promise" }, "flight.getFilter": { params: ["opts"], memberof: "flight", name: "getFilter", return: "Promise" }, "flight.getLinkman": { params: ["id"], memberof: "flight", name: "getLinkman", return: "Promise" }, "flight.getUser": { params: [], memberof: "flight", name: "getUser", return: "Promise" }, "flight.gotoAppHomepage": { params: [], memberof: "flight", name: "gotoAppHomepage", return: "Undefined" }, "flight.gotoOrderDetail": { params: ["url", "orderListUrl"], memberof: "flight", name: "gotoOrderDetail", return: "Undefined" }, "flight.login": { params: [], memberof: "flight", name: "login", return: "Promise" }, "flight.selectCity": { params: ["city"], memberof: "flight", name: "selectCity", return: "Promise" }, "flight.selectDate": { params: ["fromCity", "toCity", "months", "original"], memberof: "flight", name: "selectDate", return: "Promise" }, "flight.selectRoundDate": { params: [], memberof: "flight", name: "selectRoundDate", return: "Promise" }, "train.gotoOrderDetail": { params: ["url", "orderListUrl"], memberof: "train", name: "gotoOrderDetail", return: "Undefined" }, "train.gotoOrderList": { params: ["url"], memberof: "train", name: "gotoOrderList", return: "Undefined" }, "train.multiSelect": { params: ["menus"], memberof: "train", name: "multiSelect", return: "Promise" }, "train.ringtone": { params: ["loop"], memberof: "train", name: "ringtone", return: "Promise" }, "train.selectDateRush": { params: ["opts"], memberof: "train", name: "selectDateRush", return: "Promise" }, "train.selectDateStudent": { params: ["opts"], memberof: "train", name: "selectDateStudent", return: "Promise" }, "train.selectDate": { params: ["date", "days", "tips"], memberof: "train", name: "selectDate", return: "Promise" }, "train.selectStation": { params: ["stationCode", "stationType"], memberof: "train", name: "selectStation", return: "Promise" }, "train.selectTrains": { params: ["menus"], memberof: "train", name: "selectTrains", return: "Promise" }, "train.timeRange": { params: ["start", "end"], memberof: "train", name: "timeRange", return: "Promise" }, "train.timeTable": { params: ["stations"], memberof: "train", name: "timeTable", return: "Undefined" }, "train.vibrate": { params: ["duration"], memberof: "train", name: "vibrate", return: "Promise" }, "inject.addStopUrl": { params: ["name", "pattern", "script"], memberof: "inject", name: "addStopUrl", return: "Promise" }, "inject.callback": { params: ["fnName", "data"], memberof: "inject", name: "callback", return: "Undefined" }, "inject.close": { params: ["name"], memberof: "inject", name: "close", return: "Promise" }, "inject.loadHTML": { params: ["name", "url", "html"], memberof: "inject", name: "loadHTML", return: "Promise" }, "inject.load": { params: ["name", "url"], memberof: "inject", name: "load", return: "Promise" }, "inject.runScript": { params: ["name", "script", "param"], memberof: "inject", name: "runScript", return: "Promise" }, "inject.show": { params: ["name"], memberof: "inject", name: "show", return: "Promise" }, "travel.getPosDeviceId": { params: [], memberof: "travel", name: "getPosDeviceId", return: "Promise" }, "travel.print": { params: ["content"], memberof: "travel", name: "print", return: "Promise" }, "travel.check_printer_state": { params: [], memberof: "travel", name: "check_printer_state", return: "Promise" }, "travel.selectCity": { params: ["city"], memberof: "travel", name: "selectCity", return: "Promise" }, "travel.setGdata": { params: ["bigG"], memberof: "travel", name: "setGdata", return: "Promise" }, "env.getPageEnv": { params: [], memberof: "env", name: "getPageEnv", return: "Promise" }, "share.activeNavButton": { params: ["channel", "conf"], memberof: "share", name: "activeNavButton", return: "Undefined" }, "share.callLocal": { params: ["channel", "conf"], memberof: "share", name: "callLocal", return: "Undefined" }, "share.disableNavButton": { params: [], memberof: "share", name: "disableNavButton", return: "Undefined" } } }, function(e, t, n) {
                        var i = n(27);
                        "dianping" === (0, n(4).internal)().appName && i.loadAPIs({ type: "dp", apis: n(210) }),
                            function() { n(14)(i) }(),
                            function() { n(11)("titans", n(7)) }(), e.exports = i
                    }, function(e, t, n) {
                        var i = n(211);
                        e.exports = [].concat(i)
                    }, function(e, t, n) {
                        function i() {}

                        function o(e) { var t = { H5_Favorite_On: "ic_action_favorite_on_normal", H5_Favorite_Off: "ic_action_favorite_off_normal" }; return /android/i.test(c.osName) ? t[e] || e : e }
                        var a = n(5),
                            r = n(28),
                            s = n(4).internal,
                            c = s(),
                            u = ["setLLButton", "setLRButton", "setRLButton", "setRRButton"],
                            l = u.map(function(e) { return { message: e, version: "9.2.0", mapper: function(e) { return e && e.icon && (e.icon = o(e.icon)), e } } });
                        e.exports = [{
                            version: "9.2.0",
                            message: "login",
                            mapper: function(e) {
                                var t = this,
                                    n = e.success || i;
                                return a({}, e, { success: function() { t.getUserInfo({ success: function(e) { n(a({}, e, { type: "dp", token: e.token || e.userToken, uuid: e.uuid })) } }) } })
                            }
                        }, { version: "9.2.0", message: "share", statics: { WECHAT_FRIENDS: 0, WECHAT_TIMELINE: 1, QQ: 2, SMS: 3, WEIBO: 4, QZONE: 5, EMAIL: 6, COPY: 7 }, mapper: function(e) { return e = a({}, e), e.feed = e.channel, e.feed instanceof Array || (e.feed = [e.feed]), e.feed && 1 === e.feed.length && (e.shareType = e.feed[0]), a(e, { feed: r.parseFeed(e.feed), url: r.tidyUrlParams(e.url) }) } }, {
                            version: "9.2.0",
                            message: "thirdLogin",
                            handler: function(e) {
                                var t, n = e.type;
                                switch (n) {
                                    case 1:
                                        t = location.protocol + "//m.dianping.com/auth/app?ft=15&sso=true";
                                        break;
                                    case 2:
                                        t = location.protocol + "//m.dianping.com/auth/app?ft=6&sso=true&redir=";
                                        break;
                                    case 3:
                                        t = location.protocol + "//m.dianping.com/auth/app?ft=5&ssp=true&redir=";
                                        break;
                                    case 4:
                                        t = location.protocol + "//m.dianping.com/auth/app?ft=2&source=1&sso=true&redir="
                                }
                                this.openWebview({ url: "dianping://loginweb?url=" + encodeURIComponent(t) + "&isFromNative=true" })
                            }
                        }, { version: "9.2.0", message: "setSpotlight", mapper: function(e) { if (e.webpageURL) return e.scheme || (e.scheme = "dianping://web?url=" + encodeURIComponent(e.webpageURL)), e } }, {
                            version: "9.2.0",
                            message: "publish",
                            mapper: function(e) {
                                var t = this.getBizName(),
                                    n = ["phoneChanged", "AccountBindChange"];
                                return /2Native/i.test(e.type) || ~n.indexOf(e.action) ? (delete e.type, e) : t ? (e.action = t + ":" + e.action, delete e.type, e) : void(t || e.fail && e.fail("bizname not config, please call KNB.confg({bizName: YOUR_BIZ_NAME})"))
                            }
                        }].concat(l)
                    }, function(e, t, n) {
                        function i(e) {
                            var t = e.concat(),
                                n = [];
                            return new c(function(e, i) {
                                function o() {
                                    var a = t.shift();
                                    a || e(n), u().uploadImage({ localId: a, success: function(e) { n.push(e), o() }, fail: i })
                                }
                                o()
                            })
                        }
                        var o = n(213),
                            a = n(5),
                            r = function() {},
                            s = "undefined" != typeof window ? window : {},
                            c = s.Promise || n(15),
                            u = function() { return window.wx || function(e) { var t = e.fail; return void 0 === t && (t = r), t({ error: -1, msg: "wx sdk is not loaded" }) } },
                            l = {
                                use: function(e, t) {
                                    if (l[e] && !l[e].NOTIMPLEMENTED) return l[e](t);
                                    u()[e] && u()[e](t)
                                },
                                getUA: n(4),
                                isApiSupported: function(e) {
                                    var t = e.apiName,
                                        n = e.success;
                                    return void 0 === n && (n = r), n(!(!l[t] || l[t].NOTIMPLEMENTED))
                                },
                                previewImage: function(e) { return u().previewImage(e) },
                                chooseImage: function(e) {
                                    var t = e.count,
                                        n = e.success;
                                    void 0 === n && (n = r);
                                    var i = e.fail;
                                    void 0 === i && (i = r), u().chooseImage({ count: t, success: function(e) { n({ photoInfos: e.localIds.map(function(e) { return { localId: e } }) }) }, fail: i })
                                },
                                uploadImage: function(e) {
                                    var t = e.localIds;
                                    void 0 === t && (t = []);
                                    var n = e.success;
                                    void 0 === n && (n = r);
                                    var o = e.fail;
                                    void 0 === o && (o = r), i(t).then(function(e) { n({ photoInfos: e.map(function(e) { return a(e, { picUrl: e.serverId, picKey: e.serverId }) }) }) }).catch(o)
                                },
                                downloadImage: function(e) { return u().downloadImage(e) },
                                getNetworkType: function(e) { return u().getNetworkType(e) },
                                closeWindow: function(e) { return u().closeWindow(e) },
                                share: { WECHAT_FRIENDS: "WCF", WECHAT_TIMELINE: "WCT", QQ: "QQ", QZONE: "QZONE" },
                                configShare: function(e) {
                                    var t = e.title,
                                        n = e.desc;
                                    void 0 === n && (n = "");
                                    var i = e.image;
                                    void 0 === i && (i = "");
                                    var o = e.url;
                                    void 0 === o && (o = "");
                                    var s = e.content;
                                    void 0 === s && (s = "【" + t + "】" + n);
                                    var c = e.channel;
                                    void 0 === c && (c = ["WCF", "WCT", "QQ", "QZONE"]);
                                    var d = e.success;
                                    void 0 === d && (d = r);
                                    var m = e.fail;
                                    void 0 === m && (m = r), c.map(function(e) {
                                        switch (e) {
                                            case l.share.WECHAT_FRIENDS:
                                                return function(e) { return u().onMenuShareAppMessage(e) };
                                            case l.share.QQ:
                                                return function(e) { return u().onMenuShareQQ(e) };
                                            case l.share.QZONE:
                                                return function(e) { return u().onMenuShareQZone(e) };
                                            case l.share.WECHAT_TIMELINE:
                                                return function(e) { return u().onMenuShareTimeline(a(e, { title: s })) }
                                        }
                                    }).filter(Boolean).forEach(function(e) { e({ title: t, desc: n, link: o, imgUrl: i, success: d, fail: m }) })
                                },
                                getLocation: function(e) {
                                    var t = e.fail;
                                    void 0 === t && (t = r);
                                    var n = e.success;
                                    void 0 === n && (n = r), u().getLocation({ fail: t, success: function(e) { n({ lat: e.latitude, lng: e.longitude }) } })
                                }
                            };
                        if (n(17).concat("use").forEach(function(e) {
                                if ("config" !== e) {
                                    var t = l[e],
                                        n = l[e] || function(t) { var n = t.fail; return void 0 === n && (n = r), n({ error: -1, msg: "API [" + e + "] is not implemented" }) };
                                    "function" == typeof n && (l[e] = function(e, t, i) { l.ready(function() { return n(e, t, i) }) }, t || (l[e].NOTIMPLEMENTED = !0), l[e].getSourceCode = function() { return n.toString() })
                                }
                            }), "undefined" != typeof window) {
                            var d = n(7);
                            n(11)("wx", d)
                        }
                        l.ready = o, e.exports = l
                    }, function(e, t) {
                        function n(e) {
                            function t() {
                                var e = function() {
                                    window._MTDPAuth_.state = o[2], window.wx.error(function(e) { window.__KNB_ON_WX_ERROR && window.__KNB_ON_WX_ERROR(e) }), window.wx.ready(function() {
                                        for (; a && a.length;) {
                                            var e = a.shift();
                                            e && e()
                                        }
                                    })
                                };
                                if (u) return window.jsonpWXLoader = function(t) {
                                    var i = { debug: n.config.debug, appId: "wxc72f01f43da0083b", timestamp: t.data.timestamp, signature: t.data.signature, nonceStr: t.data.nonceStr, jsApiList: s };
                                    window.wx.config(i), e()
                                }, r("//" + c + "/weixin/config.json?url=" + encodeURIComponent(location.href) + "&callback=jsonpWXLoader");
                                r("//" + c + "/weixin/config.js" + l, e)
                            }
                            if (window._MTDPAuth_.state === o[2] || window._MTDPAuth_.state === o[3]) return e();
                            var n = i;
                            if (/[\?&]debug:wx($|&)/.test(window.location.search) && (n.config.debug = !0), a.push(e), window._MTDPAuth_.state !== o[1]) {
                                window._MTDPAuth_.state, o[1];
                                var c = function() {
                                        for (var e = n.configHostnameMap, t = 0; t < e.length; t++)
                                            if (e[t].pattern.test(location.hostname)) return e[t].host;
                                        return e[0].host
                                    }(),
                                    u = c.indexOf("i.meituan.com") > -1,
                                    l = "?apis=" + s.join(",") + "&" + Object.keys(n.config).map(function(e) { return encodeURIComponent(e) + "=" + encodeURIComponent(n.config[e]) }).join("&");
                                window.wx ? t() : r(n.url, t)
                            }
                        }
                        var i = { url: "//s0.meituan.net/bs/delivr/0315c86:jsm/lib/weixin/jweixin-1.1.0.js", configHostnameMap: [{ pattern: /dianping.com$/, host: "cps.dianping.com" }, { pattern: /51ping.com$/, host: "tcps.51ping.com" }, { pattern: /.meituan.com|m.maoyan.com$/, host: "i.meituan.com/firework/api" }], config: { debug: !1 }, onError: function(e) { console && console.error && console.error(e) } },
                            o = ["not-auth", "being-auth", "auth-success", "auth-fail"];
                        window._MTDPAuth_ || (window._MTDPAuth_ = { state: o[0], callbackQueue: [] });
                        var a = window._MTDPAuth_.callbackQueue,
                            r = function(e, t) {
                                var n = document.createElement("script");
                                n.src = e, n.onload = t, document.getElementsByTagName("head")[0].appendChild(n)
                            },
                            s = ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"];
                        e.exports = n
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) {
                            var n = r.indexOf(e.geotype),
                                i = location.protocol + "//apimobile.meituan.com/group/v1/city/latlng/" + e.latitude + "," + e.longitude + "?tag=" + n;
                            (0, a.jsonp)(i, function(e) {
                                if (!e || !e.data) return t(new Error("Unable to get city info."));
                                t(null, { type: "meituan", name: e.data.province, id: e.data.id })
                            })
                        }

                        function o(e, t) {
                            var n = r.indexOf(e.geotype) + 1,
                                i = location.protocol + "//mapi.dianping.com/getlocalcityid?lat=" + e.latitude + "&lng=" + e.longitude + "&coordType=" + n;
                            (0, a.jsonp)(i, function(e) {
                                if (!e || 200 !== e.code) return t(new Error("Unable to get city info."));
                                t(null, { type: "dianping", name: e.message.cityname, id: e.message.cityid })
                            })
                        }
                        Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function(e, t, n) { "dianping" === e ? o(t, n) : i(t, n) };
                        var a = n(9),
                            r = ["wgs84", "gcj02"]
                    }])
                });
                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(149).setImmediate, __webpack_require__(149).clearImmediate))

            /***/
        }),

        /***/
        196:
        /***/
            (function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(global, process) {
                (function(global, undefined) {
                    "use strict";

                    if (global.setImmediate) {
                        return;
                    }

                    var nextHandle = 1; // Spec says greater than zero
                    var tasksByHandle = {};
                    var currentlyRunningATask = false;
                    var doc = global.document;
                    var registerImmediate;

                    function setImmediate(callback) {
                        // Callback can either be a function or a string
                        if (typeof callback !== "function") {
                            callback = new Function("" + callback);
                        }
                        // Copy function arguments
                        var args = new Array(arguments.length - 1);
                        for (var i = 0; i < args.length; i++) {
                            args[i] = arguments[i + 1];
                        }
                        // Store and register the task
                        var task = { callback: callback, args: args };
                        tasksByHandle[nextHandle] = task;
                        registerImmediate(nextHandle);
                        return nextHandle++;
                    }

                    function clearImmediate(handle) {
                        delete tasksByHandle[handle];
                    }

                    function run(task) {
                        var callback = task.callback;
                        var args = task.args;
                        switch (args.length) {
                            case 0:
                                callback();
                                break;
                            case 1:
                                callback(args[0]);
                                break;
                            case 2:
                                callback(args[0], args[1]);
                                break;
                            case 3:
                                callback(args[0], args[1], args[2]);
                                break;
                            default:
                                callback.apply(undefined, args);
                                break;
                        }
                    }

                    function runIfPresent(handle) {
                        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                        // So if we're currently running a task, we'll need to delay this invocation.
                        if (currentlyRunningATask) {
                            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                            // "too much recursion" error.
                            setTimeout(runIfPresent, 0, handle);
                        } else {
                            var task = tasksByHandle[handle];
                            if (task) {
                                currentlyRunningATask = true;
                                try {
                                    run(task);
                                } finally {
                                    clearImmediate(handle);
                                    currentlyRunningATask = false;
                                }
                            }
                        }
                    }

                    function installNextTickImplementation() {
                        registerImmediate = function(handle) {
                            process.nextTick(function() { runIfPresent(handle); });
                        };
                    }

                    function canUsePostMessage() {
                        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
                        // where `global.postMessage` means something completely different and can't be used for this purpose.
                        if (global.postMessage && !global.importScripts) {
                            var postMessageIsAsynchronous = true;
                            var oldOnMessage = global.onmessage;
                            global.onmessage = function() {
                                postMessageIsAsynchronous = false;
                            };
                            global.postMessage("", "*");
                            global.onmessage = oldOnMessage;
                            return postMessageIsAsynchronous;
                        }
                    }

                    function installPostMessageImplementation() {
                        // Installs an event handler on `global` for the `message` event: see
                        // * https://developer.mozilla.org/en/DOM/window.postMessage
                        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

                        var messagePrefix = "setImmediate$" + Math.random() + "$";
                        var onGlobalMessage = function(event) {
                            if (event.source === global &&
                                typeof event.data === "string" &&
                                event.data.indexOf(messagePrefix) === 0) {
                                runIfPresent(+event.data.slice(messagePrefix.length));
                            }
                        };

                        if (global.addEventListener) {
                            global.addEventListener("message", onGlobalMessage, false);
                        } else {
                            global.attachEvent("onmessage", onGlobalMessage);
                        }

                        registerImmediate = function(handle) {
                            global.postMessage(messagePrefix + handle, "*");
                        };
                    }

                    function installMessageChannelImplementation() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = function(event) {
                            var handle = event.data;
                            runIfPresent(handle);
                        };

                        registerImmediate = function(handle) {
                            channel.port2.postMessage(handle);
                        };
                    }

                    function installReadyStateChangeImplementation() {
                        var html = doc.documentElement;
                        registerImmediate = function(handle) {
                            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                            var script = doc.createElement("script");
                            script.onreadystatechange = function() {
                                runIfPresent(handle);
                                script.onreadystatechange = null;
                                html.removeChild(script);
                                script = null;
                            };
                            html.appendChild(script);
                        };
                    }

                    function installSetTimeoutImplementation() {
                        registerImmediate = function(handle) {
                            setTimeout(runIfPresent, 0, handle);
                        };
                    }

                    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
                    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

                    // Don't get fooled by e.g. browserify environments.
                    if ({}.toString.call(global.process) === "[object process]") {
                        // For Node.js before 0.9
                        installNextTickImplementation();

                    } else if (canUsePostMessage()) {
                        // For non-IE10 modern browsers
                        installPostMessageImplementation();

                    } else if (global.MessageChannel) {
                        // For web workers, where supported
                        installMessageChannelImplementation();

                    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
                        // For IE 6–8
                        installReadyStateChangeImplementation();

                    } else {
                        // For older browsers
                        installSetTimeoutImplementation();
                    }

                    attachTo.setImmediate = setImmediate;
                    attachTo.clearImmediate = clearImmediate;
                }(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(40), __webpack_require__(5)))

            /***/
        }),

        /***/
        40:
        /***/
            (function(module, exports) {

            var g;

            // This works in non-strict mode
            g = (function() {
                return this;
            })();

            try {
                // This works if eval is allowed (see CSP)
                g = g || Function("return this")() || (1, eval)("this");
            } catch (e) {
                // This works if the window reference is available
                if (typeof window === "object")
                    g = window;
            }

            // g can still be undefined, but nothing to do about it...
            // We return undefined, instead of nothing here, so it's
            // easier to handle this case. if(!global) { ...}

            module.exports = g;


            /***/
        }),

        /***/
        5:
        /***/
            (function(module, exports) {

            // shim for using process in browser
            var process = module.exports = {};

            // cached from whatever global is present so that test runners that stub it
            // don't break things.  But we need to wrap it in a try catch in case it is
            // wrapped in strict mode code which doesn't define any globals.  It's inside a
            // function because try/catches deoptimize in certain engines.

            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }

            function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
            }
            (function() {
                try {
                    if (typeof setTimeout === 'function') {
                        cachedSetTimeout = setTimeout;
                    } else {
                        cachedSetTimeout = defaultSetTimout;
                    }
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    if (typeof clearTimeout === 'function') {
                        cachedClearTimeout = clearTimeout;
                    } else {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            }())

            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }

            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };

            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function(name) { return [] }

            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function() { return '/' };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function() { return 0; };


            /***/
        }),

        /***/
        61:
        /***/
            (function(module, exports, __webpack_require__) {

            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
             * JavaScript Cookie v2.2.0
             * https://github.com/js-cookie/js-cookie
             *
             * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
             * Released under the MIT license
             */
            ;
            (function(factory) {
                var registeredInModuleLoader = false;
                if (true) {
                    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
                        __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                            (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
                            __WEBPACK_AMD_DEFINE_FACTORY__),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    registeredInModuleLoader = true;
                }
                if (true) {
                    module.exports = factory();
                    registeredInModuleLoader = true;
                }
                if (!registeredInModuleLoader) {
                    var OldCookies = window.Cookies;
                    var api = window.Cookies = factory();
                    api.noConflict = function() {
                        window.Cookies = OldCookies;
                        return api;
                    };
                }
            }(function() {
                function extend() {
                    var i = 0;
                    var result = {};
                    for (; i < arguments.length; i++) {
                        var attributes = arguments[i];
                        for (var key in attributes) {
                            result[key] = attributes[key];
                        }
                    }
                    return result;
                }

                function init(converter) {
                    function api(key, value, attributes) {
                        var result;
                        if (typeof document === 'undefined') {
                            return;
                        }

                        // Write

                        if (arguments.length > 1) {
                            attributes = extend({
                                path: '/'
                            }, api.defaults, attributes);

                            if (typeof attributes.expires === 'number') {
                                var expires = new Date();
                                expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                                attributes.expires = expires;
                            }

                            // We're using "expires" because "max-age" is not supported by IE
                            attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                            try {
                                result = JSON.stringify(value);
                                if (/^[\{\[]/.test(result)) {
                                    value = result;
                                }
                            } catch (e) {}

                            if (!converter.write) {
                                value = encodeURIComponent(String(value))
                                    .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                            } else {
                                value = converter.write(value, key);
                            }

                            key = encodeURIComponent(String(key));
                            key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                            key = key.replace(/[\(\)]/g, escape);

                            var stringifiedAttributes = '';

                            for (var attributeName in attributes) {
                                if (!attributes[attributeName]) {
                                    continue;
                                }
                                stringifiedAttributes += '; ' + attributeName;
                                if (attributes[attributeName] === true) {
                                    continue;
                                }
                                stringifiedAttributes += '=' + attributes[attributeName];
                            }
                            return (document.cookie = key + '=' + value + stringifiedAttributes);
                        }

                        // Read

                        if (!key) {
                            result = {};
                        }

                        // To prevent the for loop in the first place assign an empty array
                        // in case there are no cookies at all. Also prevents odd result when
                        // calling "get()"
                        var cookies = document.cookie ? document.cookie.split('; ') : [];
                        var rdecode = /(%[0-9A-Z]{2})+/g;
                        var i = 0;

                        for (; i < cookies.length; i++) {
                            var parts = cookies[i].split('=');
                            var cookie = parts.slice(1).join('=');

                            if (!this.json && cookie.charAt(0) === '"') {
                                cookie = cookie.slice(1, -1);
                            }

                            try {
                                var name = parts[0].replace(rdecode, decodeURIComponent);
                                cookie = converter.read ?
                                    converter.read(cookie, name) : converter(cookie, name) ||
                                    cookie.replace(rdecode, decodeURIComponent);

                                if (this.json) {
                                    try {
                                        cookie = JSON.parse(cookie);
                                    } catch (e) {}
                                }

                                if (key === name) {
                                    result = cookie;
                                    break;
                                }

                                if (!key) {
                                    result[name] = cookie;
                                }
                            } catch (e) {}
                        }

                        return result;
                    }

                    api.set = api;
                    api.get = function(key) {
                        return api.call(api, key);
                    };
                    api.getJSON = function() {
                        return api.apply({
                            json: true
                        }, [].slice.call(arguments));
                    };
                    api.defaults = {};

                    api.remove = function(key, attributes) {
                        api(key, '', extend(attributes, {
                            expires: -1
                        }));
                    };

                    api.withConverter = init;

                    return api;
                }

                return init(function() {});
            }));


            /***/
        }),

        /***/
        8:
        /***/
            (function(module, exports) {

            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

            function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            /**
             *
             * @param url: 图片地址
             * @param suffix: 图片服务参数
             * @param prefix: url协议头 (http 或 https)
             * @returns {string}
             */
            function formatImageUrl(url, suffix, prefix) {
                url = url || '';

                try {
                    url = decodeURIComponent(url);
                } catch (e) {
                    console.error(e);
                    console.error("==================> ".concat(url));
                }

                prefix = prefix ? "".concat(prefix, ":") : '';

                if (suffix) {
                    var offset = url.indexOf('@');

                    if (offset > 0) {
                        suffix = '|' + suffix;
                    } else if (/mss\.sankuai\.com/.test(url)) {
                        suffix = '';
                    } else {
                        suffix = '@' + suffix;
                    }

                    url += suffix;
                }

                return url.replace('/w.h/', '/').replace('http:', prefix || '');
            }

            var poiMap = {
                defults: 'cate',
                1: 'meishi',
                2: 'xiuxianyule',
                20252: 'yundongjianshen',
                3: 'shenghuo',
                20002: 'shangmenfuwu',
                4: 'wanggou',
                20383: 'shishanggou',
                387: 'bendigouwu',
                20: 'jiudian',
                20178: 'jiehun',
                29: 'sheyingxiezhen',
                20375: 'yanhui',
                78: 'lvyou',
                195: 'zhoubianyou',
                20513: 'dujiachuxing',
                99: 'shop',
                20626: 'dianyingquanbu',
                22: 'jiankangliren',
                20007: 'qinzi',
                20285: 'xuexipeixun',
                20179: 'jiazhuang',
                27: 'aiche',
                20274: 'yiliao',
                20691: 'chongwu',
                20966: 'zhenguo'
            };
            var showTypeMap = {
                'entertainment': 'xiuxianyule',
                'food': 'meishi',
                'fitness': 'yundongjianshen',
                'easylife': [{
                    id: 20691,
                    path: 'chongwu'
                }, {
                    id: 3,
                    path: 'shenghuo'
                }],
                'married': 'jiehun',
                'beauty': 'jiankangliren',
                'children': 'qinzi',
                'education': 'xuexipeixun',
                'domestic': 'jiazhuang',
                'car': 'aiche',
                'medicine': 'yiliao'
            };

            function poiFilter(ids) {
                if (ids instanceof Array) {
                    return ids.map(function(id) {
                        return poiMap[id] || poiMap.defults;
                    });
                }

                return poiMap[ids] || poiMap.defults;
            }

            function poiUrl(id) {
                if (id === 99) {
                    return 'maoyan.com/cshop';
                }

                return "www.meituan.com/".concat(poiFilter(id));
            }

            function poiUrlSuper(ids, showType, poiid, key) {
                if (showType) {
                    var path = showType && showTypeMap[showType];

                    if (path) {
                        if (typeof path === 'string') {
                            return "//www.meituan.com/".concat(path, "/").concat(poiid, "/");
                        } else {
                            if (ids && ids.length > 0) {
                                var _loop = function _loop(obj) {
                                    var pathArr = ids.filter(function(id) {
                                        return id == obj.id;
                                    });

                                    if (pathArr.length > 0) {
                                        return {
                                            v: "//www.meituan.com/".concat(obj.path, "/").concat(poiid, "/")
                                        };
                                    }
                                };

                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var obj = _step.value;

                                        var _ret = _loop(obj);

                                        if (_typeof(_ret) === "object") return _ret.v;
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                var id = ids && ids[0];

                if (id === 99) {
                    return "//maoyan.com/cshop/".concat(poiid, "/");
                }

                if (id === 20966) {
                    return "//minsu.meituan.com/go/mt/".concat(poiid, "/?phx_wake_up_type=mtpc_big_search&phx_wake_up_source=").concat(key || '');
                }

                return "//www.meituan.com/".concat(poiFilter(id), "/").concat(poiid, "/");
            }

            function setCi(context, id) {
                if (id !== context.cookies.get('ci')) {
                    context.cookies.set('ci', id, {
                        maxAge: 1000 * 60 * 60 * 24 * 60,
                        domain: '.meituan.com',
                        httpOnly: false
                    });
                }

                var rvct = context.cookies.get('rvct') || '';
                var recentCiList;

                try {
                    recentCiList = decodeURIComponent(rvct).split(',').filter(Boolean);
                } catch (error) {
                    recentCiList = [];
                }

                var index = recentCiList.indexOf("".concat(id));

                if (index !== -1) {
                    // 当前访问的城市在最近访问城市列表中
                    recentCiList.splice(index, 1);
                }

                recentCiList.unshift("".concat(id));

                if (recentCiList.length > 11) {
                    recentCiList.length = 11;
                }

                context.cookies.set('rvct', encodeURIComponent(recentCiList.join(',')), {
                    maxAge: 1000 * 60 * 60 * 24 * 60,
                    domain: '.meituan.com',
                    httpOnly: false
                });
            }

            function scoreToText(score) {
                if (!(score && typeof score === 'number')) {
                    return '';
                }

                switch (true) {
                    case score > 4.5:
                        return '很好';

                    case score > 4.0:
                        return '好';

                    case score > 3.5:
                        return '不错';

                    default:
                        return '一般';
                }
            }

            var ViewGA =
                /*#__PURE__*/
                function() {
                    function ViewGA() {
                        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        _classCallCheck(this, ViewGA);

                        this.content = config.content || document.querySelector('html');
                        this.windowHeight = config.windowHeight || config.content ? this.content.offsetHeight : window.innerHeight;
                        this.top = config.top || config.top === 0 ? 0 : this.content.offsetTop;
                        this.delay = 500;
                        this.percent = (config.percent || 70) / 100;
                        this.viewDots = [];
                        this.bid = config.bid;
                    }

                    _createClass(ViewGA, [{
                        key: "addDots",
                        value: function addDots(dot) {
                            var _this = this;

                            if (dot instanceof Array) {
                                dot.forEach(function(p) {
                                    _this.addDots(p);
                                });
                            } else if (dot && _typeof(dot) === 'object') {
                                this.viewDots.push(dot);
                            }
                        }
                    }, {
                        key: "check",
                        value: function check(top) {
                            var _this2 = this;

                            top = top === undefined ? this.content.scrollTop : top;
                            var bottom = top + this.windowHeight;
                            this.viewDots.forEach(function(dot) {
                                var h = (dot.bottom - dot.top) * _this2.percent;

                                if (!dot.report && dot.bottom - top > h && bottom - dot.top > h) {
                                    if (window.LXAnalytics) {
                                        window.LXAnalytics('moduleView', dot.bid || _this2.bid, dot.lab);
                                        dot.report = true;
                                    }
                                }
                            });
                            this.removeReported();
                        }
                    }, {
                        key: "clearList",
                        value: function clearList() {
                            this.viewDots.length = 0;
                        }
                    }, {
                        key: "removeReported",
                        value: function removeReported() {
                            var _this3 = this;

                            clearTimeout(this.removeFlag);
                            this.removeFlag = setTimeout(function() {
                                _this3.viewDots = _this3.viewDots.filter(function(dot) {
                                    return !dot.report;
                                });
                            }, 1000);
                        }
                    }, {
                        key: "init",
                        value: function init() {
                            var _this4 = this;

                            if (this.content === document.querySelector('html')) {
                                window.addEventListener('scroll', function() {
                                    _this4.check();
                                });
                            } else {
                                this.content.addEventListener('scroll', function() {
                                    _this4.check();
                                });
                            }

                            this.check();
                        }
                    }]);

                    return ViewGA;
                }();

            function htmlEscape(str) {
                if (typeof str === 'string') {
                    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
                }

                return '';
            }

            module.exports = {
                formatImageUrl: formatImageUrl,
                poiMap: poiMap,
                poiFilter: poiFilter,
                setCi: setCi,
                scoreToText: scoreToText,
                ViewGA: ViewGA,
                htmlEscape: htmlEscape,
                poiUrl: poiUrl,
                poiUrlSuper: poiUrlSuper
            };

            /***/
        })

    }, [192]);