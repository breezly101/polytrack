var Ammo = (() => {
    var t = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0;
    return "undefined" != typeof __filename && (t = t || __filename),
        function (e = {}) {
            var n, o, _;
            n || (n = void 0 !== e ? e : {}), n.ready = new Promise((function (t, e) {
                o = t, _ = e
            }));
            var i, r, p, s = Object.assign({}, n),
                c = "object" == typeof window,
                a = "function" == typeof importScripts,
                l = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
                u = "";
            if (l) {
                var b = require("fs"),
                    m = require("path");
                u = a ? m.dirname(u) + "/" : __dirname + "/", i = (t, e) => (t = t.startsWith("file://") ? new URL(t) : m.normalize(t), b.readFileSync(t, e ? void 0 : "utf8")), p = t => ((t = i(t, !0)).buffer || (t = new Uint8Array(t)), t), r = (t, e, n) => {
                    t = t.startsWith("file://") ? new URL(t) : m.normalize(t), b.readFile(t, (function (t, o) {
                        t ? n(t) : e(o.buffer)
                    }))
                }, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), n.inspect = function () {
                    return "[Emscripten Module object]"
                }
            } else(c || a) && (a ? u = self.location.href : "undefined" != typeof document && document.currentScript && (u = document.currentScript.src), t && (u = t), u = 0 !== u.indexOf("blob:") ? u.substr(0, u.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", i = t => {
                var e = new XMLHttpRequest;
                return e.open("GET", t, !1), e.send(null), e.responseText
            }, a && (p = t => {
                var e = new XMLHttpRequest;
                return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response)
            }), r = (t, e, n) => {
                var o = new XMLHttpRequest;
                o.open("GET", t, !0), o.responseType = "arraybuffer", o.onload = () => {
                    200 == o.status || 0 == o.status && o.response ? e(o.response) : n()
                }, o.onerror = n, o.send(null)
            });
            n.print || console.log.bind(console);
            var y, d = n.printErr || console.warn.bind(console);
            Object.assign(n, s), s = null, n.wasmBinary && (y = n.wasmBinary);
            n.noExitRuntime;
            "object" != typeof WebAssembly && x("no native wasm support detected");
            var f = !1,
                h = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

            function B(t, e) {
                if (t) {
                    var n = k,
                        o = t + e;
                    for (e = t; n[e] && !(e >= o);) ++e;
                    if (16 < e - t && n.buffer && h) t = h.decode(n.subarray(t, e));
                    else {
                        for (o = ""; t < e;) {
                            var _ = n[t++];
                            if (128 & _) {
                                var i = 63 & n[t++];
                                if (192 == (224 & _)) o += String.fromCharCode((31 & _) << 6 | i);
                                else {
                                    var r = 63 & n[t++];
                                    65536 > (_ = 224 == (240 & _) ? (15 & _) << 12 | i << 6 | r : (7 & _) << 18 | i << 12 | r << 6 | 63 & n[t++]) ? o += String.fromCharCode(_) : (_ -= 65536, o += String.fromCharCode(55296 | _ >> 10, 56320 | 1023 & _))
                                }
                            } else o += String.fromCharCode(_)
                        }
                        t = o
                    }
                } else t = "";
                return t
            }
            var g, k, C, S, j, v, I = [],
                R = [],
                D = [],
                P = !1;

            function T() {
                var t = n.preRun.shift();
                I.unshift(t)
            }
            var O, W = 0,
                A = null,
                M = null;

            function x(t) {
                throw n.onAbort && n.onAbort(t), d(t = "Aborted(" + t + ")"), f = !0, t = new WebAssembly.RuntimeError(t + ". Build with -sASSERTIONS for more info."), _(t), t
            }

            function F(t) {
                return t.startsWith("data:application/octet-stream;base64,")
            }
            if (!F(O = "lib/ammo.wasm.wasm")) {
                var L = O;
                O = n.locateFile ? n.locateFile(L, u) : u + L
            }

            function G(t) {
                try {
                    if (t == O && y) return new Uint8Array(y);
                    if (p) return p(t);
                    throw "both async and sync fetching of the wasm failed"
                } catch (t) {
                    x(t)
                }
            }

            function w(t, e, n) {
                return function (t) {
                    if (!y && (c || a)) {
                        if ("function" == typeof fetch && !t.startsWith("file://")) return fetch(t, {
                            credentials: "same-origin"
                        }).then((function (e) {
                            if (!e.ok) throw "failed to load wasm binary file at '" + t + "'";
                            return e.arrayBuffer()
                        })).catch((function () {
                            return G(t)
                        }));
                        if (r) return new Promise((function (e, n) {
                            r(t, (function (t) {
                                e(new Uint8Array(t))
                            }), n)
                        }))
                    }
                    return Promise.resolve().then((function () {
                        return G(t)
                    }))
                }(t).then((function (t) {
                    return WebAssembly.instantiate(t, e)
                })).then((function (t) {
                    return t
                })).then(n, (function (t) {
                    d("failed to asynchronously prepare wasm: " + t), x(t)
                }))
            }
            var H = {
                27338: (t, e, o, _) => {
                    if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("drawLine")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.";
                    t.drawLine(e, o, _)
                },
                27558: (t, e, o, _, i, r) => {
                    if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("drawContactPoint")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.";
                    t.drawContactPoint(e, o, _, i, r)
                },
                27808: (t, e) => {
                    if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("reportErrorWarning")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.";
                    t.reportErrorWarning(e)
                },
                28052: (t, e, o) => {
                    if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("draw3dText")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.";
                    t.draw3dText(e, o)
                },
                28275: (t, e) => {
                    if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("setDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.";
                    t.setDebugMode(e)
                },
                28501: t => {
                    if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("getDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.";
                    return t.getDebugMode()
                },
                28732: (t, e) => {
                    if (!(t = n.getCache(n.MotionState)[t]).hasOwnProperty("getWorldTransform")) throw "a JSImplementation must implement all functions, you forgot MotionState::getWorldTransform.";
                    t.getWorldTransform(e)
                },
                28973: (t, e) => {
                    if (!(t = n.getCache(n.MotionState)[t]).hasOwnProperty("setWorldTransform")) throw "a JSImplementation must implement all functions, you forgot MotionState::setWorldTransform.";
                    t.setWorldTransform(e)
                },
                29214: (t, e, o, _, i, r, p, s) => {
                    if (!(t = n.getCache(n.ConcreteContactResultCallback)[t]).hasOwnProperty("addSingleResult")) throw "a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.";
                    return t.addSingleResult(e, o, _, i, r, p, s)
                }
            };

            function V(t) {
                for (; 0 < t.length;) t.shift()(n)
            }
            var E = [];

            function N(t, e, n) {
                var o;
                for (E.length = 0, n >>= 2; o = k[e++];) n += 105 != o & n, E.push(105 == o ? C[n] : j[n++ >> 1]), ++n;
                return H[t].apply(null, E)
            }
            var U = [],
                z = void 0,
                q = [],
                K = {
                    b: function () {
                        x("")
                    },
                    f: function (t, e, n) {
                        return N(t, e, n)
                    },
                    a: function (t, e, n) {
                        return N(t, e, n)
                    },
                    d: function () {
                        return Date.now()
                    },
                    e: function (t, e, n) {
                        k.copyWithin(t, e, e + n)
                    },
                    c: function () {
                        x("OOM")
                    }
                };
            ! function () {
                function t(t) {
                    t = t.exports, n.asm = t;
                    var e = n.asm.g.buffer;
                    return n.HEAP8 = g = new Int8Array(e), n.HEAP16 = new Int16Array(e), n.HEAP32 = C = new Int32Array(e), n.HEAPU8 = k = new Uint8Array(e), n.HEAPU16 = new Uint16Array(e), n.HEAPU32 = new Uint32Array(e), n.HEAPF32 = S = new Float32Array(e), n.HEAPF64 = j = new Float64Array(e), v = n.asm.iB, R.unshift(n.asm.h), W--, n.monitorRunDependencies && n.monitorRunDependencies(W), 0 == W && (null !== A && (clearInterval(A), A = null), M && (e = M, M = null, e())), t
                }
                var e = {
                    a: K
                };
                if (W++, n.monitorRunDependencies && n.monitorRunDependencies(W), n.instantiateWasm) try {
                    return n.instantiateWasm(e, t)
                } catch (t) {
                    d("Module.instantiateWasm callback failed with error: " + t), _(t)
                }(function (t, e) {
                    var n = O;
                    return y || "function" != typeof WebAssembly.instantiateStreaming || F(n) || n.startsWith("file://") || l || "function" != typeof fetch ? w(n, t, e) : fetch(self.jkdfgnjkndfg+n, {
                        credentials: "same-origin"
                    }).then((function (o) {
                        return WebAssembly.instantiateStreaming(o, t).then(e, (function (o) {
                            return d("wasm streaming compile failed: " + o), d("falling back to ArrayBuffer instantiation"), w(n, t, e)
                        }))
                    }))
                })(e, (function (e) {
                    t(e.instance)
                })).catch(_)
            }();
            var Q, X = n._emscripten_bind_btCollisionShape_setLocalScaling_1 = function () {
                    return (X = n._emscripten_bind_btCollisionShape_setLocalScaling_1 = n.asm.i).apply(null, arguments)
                },
                Z = n._emscripten_bind_btCollisionShape_getLocalScaling_0 = function () {
                    return (Z = n._emscripten_bind_btCollisionShape_getLocalScaling_0 = n.asm.j).apply(null, arguments)
                },
                Y = n._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function () {
                    return (Y = n._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = n.asm.k).apply(null, arguments)
                },
                J = n._emscripten_bind_btCollisionShape_setMargin_1 = function () {
                    return (J = n._emscripten_bind_btCollisionShape_setMargin_1 = n.asm.l).apply(null, arguments)
                },
                $ = n._emscripten_bind_btCollisionShape_getMargin_0 = function () {
                    return ($ = n._emscripten_bind_btCollisionShape_getMargin_0 = n.asm.m).apply(null, arguments)
                },
                tt = n._emscripten_bind_btCollisionShape___destroy___0 = function () {
                    return (tt = n._emscripten_bind_btCollisionShape___destroy___0 = n.asm.n).apply(null, arguments)
                },
                et = n._emscripten_bind_btCollisionWorld_getDispatcher_0 = function () {
                    return (et = n._emscripten_bind_btCollisionWorld_getDispatcher_0 = n.asm.o).apply(null, arguments)
                },
                nt = n._emscripten_bind_btCollisionWorld_rayTest_3 = function () {
                    return (nt = n._emscripten_bind_btCollisionWorld_rayTest_3 = n.asm.p).apply(null, arguments)
                },
                ot = n._emscripten_bind_btCollisionWorld_getPairCache_0 = function () {
                    return (ot = n._emscripten_bind_btCollisionWorld_getPairCache_0 = n.asm.q).apply(null, arguments)
                },
                _t = n._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = function () {
                    return (_t = n._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = n.asm.r).apply(null, arguments)
                },
                it = n._emscripten_bind_btCollisionWorld_addCollisionObject_1 = function () {
                    return (it = n._emscripten_bind_btCollisionWorld_addCollisionObject_1 = n.asm.s).apply(null, arguments)
                },
                rt = n._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function () {
                    return (rt = n._emscripten_bind_btCollisionWorld_addCollisionObject_2 = n.asm.t).apply(null, arguments)
                },
                pt = n._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function () {
                    return (pt = n._emscripten_bind_btCollisionWorld_addCollisionObject_3 = n.asm.u).apply(null, arguments)
                },
                st = n._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function () {
                    return (st = n._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = n.asm.v).apply(null, arguments)
                },
                ct = n._emscripten_bind_btCollisionWorld_getBroadphase_0 = function () {
                    return (ct = n._emscripten_bind_btCollisionWorld_getBroadphase_0 = n.asm.w).apply(null, arguments)
                },
                at = n._emscripten_bind_btCollisionWorld_convexSweepTest_5 = function () {
                    return (at = n._emscripten_bind_btCollisionWorld_convexSweepTest_5 = n.asm.x).apply(null, arguments)
                },
                lt = n._emscripten_bind_btCollisionWorld_contactPairTest_3 = function () {
                    return (lt = n._emscripten_bind_btCollisionWorld_contactPairTest_3 = n.asm.y).apply(null, arguments)
                },
                ut = n._emscripten_bind_btCollisionWorld_contactTest_2 = function () {
                    return (ut = n._emscripten_bind_btCollisionWorld_contactTest_2 = n.asm.z).apply(null, arguments)
                },
                bt = n._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function () {
                    return (bt = n._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = n.asm.A).apply(null, arguments)
                },
                mt = n._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = function () {
                    return (mt = n._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = n.asm.B).apply(null, arguments)
                },
                yt = n._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function () {
                    return (yt = n._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = n.asm.C).apply(null, arguments)
                },
                dt = n._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function () {
                    return (dt = n._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = n.asm.D).apply(null, arguments)
                },
                ft = n._emscripten_bind_btCollisionWorld_debugDrawObject_3 = function () {
                    return (ft = n._emscripten_bind_btCollisionWorld_debugDrawObject_3 = n.asm.E).apply(null, arguments)
                },
                ht = n._emscripten_bind_btCollisionWorld___destroy___0 = function () {
                    return (ht = n._emscripten_bind_btCollisionWorld___destroy___0 = n.asm.F).apply(null, arguments)
                },
                Bt = n._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = function () {
                    return (Bt = n._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = n.asm.G).apply(null, arguments)
                },
                gt = n._emscripten_bind_btCollisionObject_getCollisionShape_0 = function () {
                    return (gt = n._emscripten_bind_btCollisionObject_getCollisionShape_0 = n.asm.H).apply(null, arguments)
                },
                kt = n._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function () {
                    return (kt = n._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = n.asm.I).apply(null, arguments)
                },
                Ct = n._emscripten_bind_btCollisionObject_setActivationState_1 = function () {
                    return (Ct = n._emscripten_bind_btCollisionObject_setActivationState_1 = n.asm.J).apply(null, arguments)
                },
                St = n._emscripten_bind_btCollisionObject_forceActivationState_1 = function () {
                    return (St = n._emscripten_bind_btCollisionObject_forceActivationState_1 = n.asm.K).apply(null, arguments)
                },
                jt = n._emscripten_bind_btCollisionObject_activate_0 = function () {
                    return (jt = n._emscripten_bind_btCollisionObject_activate_0 = n.asm.L).apply(null, arguments)
                },
                vt = n._emscripten_bind_btCollisionObject_activate_1 = function () {
                    return (vt = n._emscripten_bind_btCollisionObject_activate_1 = n.asm.M).apply(null, arguments)
                },
                It = n._emscripten_bind_btCollisionObject_isActive_0 = function () {
                    return (It = n._emscripten_bind_btCollisionObject_isActive_0 = n.asm.N).apply(null, arguments)
                },
                Rt = n._emscripten_bind_btCollisionObject_isKinematicObject_0 = function () {
                    return (Rt = n._emscripten_bind_btCollisionObject_isKinematicObject_0 = n.asm.O).apply(null, arguments)
                },
                Dt = n._emscripten_bind_btCollisionObject_isStaticObject_0 = function () {
                    return (Dt = n._emscripten_bind_btCollisionObject_isStaticObject_0 = n.asm.P).apply(null, arguments)
                },
                Pt = n._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function () {
                    return (Pt = n._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = n.asm.Q).apply(null, arguments)
                },
                Tt = n._emscripten_bind_btCollisionObject_getRestitution_0 = function () {
                    return (Tt = n._emscripten_bind_btCollisionObject_getRestitution_0 = n.asm.R).apply(null, arguments)
                },
                Ot = n._emscripten_bind_btCollisionObject_getFriction_0 = function () {
                    return (Ot = n._emscripten_bind_btCollisionObject_getFriction_0 = n.asm.S).apply(null, arguments)
                },
                Wt = n._emscripten_bind_btCollisionObject_getRollingFriction_0 = function () {
                    return (Wt = n._emscripten_bind_btCollisionObject_getRollingFriction_0 = n.asm.T).apply(null, arguments)
                },
                At = n._emscripten_bind_btCollisionObject_setRestitution_1 = function () {
                    return (At = n._emscripten_bind_btCollisionObject_setRestitution_1 = n.asm.U).apply(null, arguments)
                },
                Mt = n._emscripten_bind_btCollisionObject_setFriction_1 = function () {
                    return (Mt = n._emscripten_bind_btCollisionObject_setFriction_1 = n.asm.V).apply(null, arguments)
                },
                xt = n._emscripten_bind_btCollisionObject_setRollingFriction_1 = function () {
                    return (xt = n._emscripten_bind_btCollisionObject_setRollingFriction_1 = n.asm.W).apply(null, arguments)
                },
                Ft = n._emscripten_bind_btCollisionObject_getWorldTransform_0 = function () {
                    return (Ft = n._emscripten_bind_btCollisionObject_getWorldTransform_0 = n.asm.X).apply(null, arguments)
                },
                Lt = n._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function () {
                    return (Lt = n._emscripten_bind_btCollisionObject_getCollisionFlags_0 = n.asm.Y).apply(null, arguments)
                },
                Gt = n._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function () {
                    return (Gt = n._emscripten_bind_btCollisionObject_setCollisionFlags_1 = n.asm.Z).apply(null, arguments)
                },
                wt = n._emscripten_bind_btCollisionObject_setWorldTransform_1 = function () {
                    return (wt = n._emscripten_bind_btCollisionObject_setWorldTransform_1 = n.asm._).apply(null, arguments)
                },
                Ht = n._emscripten_bind_btCollisionObject_setCollisionShape_1 = function () {
                    return (Ht = n._emscripten_bind_btCollisionObject_setCollisionShape_1 = n.asm.$).apply(null, arguments)
                },
                Vt = n._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = function () {
                    return (Vt = n._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = n.asm.aa).apply(null, arguments)
                },
                Et = n._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function () {
                    return (Et = n._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = n.asm.ba).apply(null, arguments)
                },
                Nt = n._emscripten_bind_btCollisionObject_getUserIndex_0 = function () {
                    return (Nt = n._emscripten_bind_btCollisionObject_getUserIndex_0 = n.asm.ca).apply(null, arguments)
                },
                Ut = n._emscripten_bind_btCollisionObject_setUserIndex_1 = function () {
                    return (Ut = n._emscripten_bind_btCollisionObject_setUserIndex_1 = n.asm.da).apply(null, arguments)
                },
                zt = n._emscripten_bind_btCollisionObject_getUserPointer_0 = function () {
                    return (zt = n._emscripten_bind_btCollisionObject_getUserPointer_0 = n.asm.ea).apply(null, arguments)
                },
                qt = n._emscripten_bind_btCollisionObject_setUserPointer_1 = function () {
                    return (qt = n._emscripten_bind_btCollisionObject_setUserPointer_1 = n.asm.fa).apply(null, arguments)
                },
                Kt = n._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = function () {
                    return (Kt = n._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = n.asm.ga).apply(null, arguments)
                },
                Qt = n._emscripten_bind_btCollisionObject___destroy___0 = function () {
                    return (Qt = n._emscripten_bind_btCollisionObject___destroy___0 = n.asm.ha).apply(null, arguments)
                },
                Xt = n._emscripten_bind_btConcaveShape_setLocalScaling_1 = function () {
                    return (Xt = n._emscripten_bind_btConcaveShape_setLocalScaling_1 = n.asm.ia).apply(null, arguments)
                },
                Zt = n._emscripten_bind_btConcaveShape_getLocalScaling_0 = function () {
                    return (Zt = n._emscripten_bind_btConcaveShape_getLocalScaling_0 = n.asm.ja).apply(null, arguments)
                },
                Yt = n._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = function () {
                    return (Yt = n._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = n.asm.ka).apply(null, arguments)
                },
                Jt = n._emscripten_bind_btConcaveShape___destroy___0 = function () {
                    return (Jt = n._emscripten_bind_btConcaveShape___destroy___0 = n.asm.la).apply(null, arguments)
                },
                $t = n._emscripten_bind_btCollisionAlgorithm___destroy___0 = function () {
                    return ($t = n._emscripten_bind_btCollisionAlgorithm___destroy___0 = n.asm.ma).apply(null, arguments)
                },
                te = n._emscripten_bind_btTypedConstraint_enableFeedback_1 = function () {
                    return (te = n._emscripten_bind_btTypedConstraint_enableFeedback_1 = n.asm.na).apply(null, arguments)
                },
                ee = n._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (ee = n._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = n.asm.oa).apply(null, arguments)
                },
                ne = n._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (ne = n._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = n.asm.pa).apply(null, arguments)
                },
                oe = n._emscripten_bind_btTypedConstraint_getParam_2 = function () {
                    return (oe = n._emscripten_bind_btTypedConstraint_getParam_2 = n.asm.qa).apply(null, arguments)
                },
                _e = n._emscripten_bind_btTypedConstraint_setParam_3 = function () {
                    return (_e = n._emscripten_bind_btTypedConstraint_setParam_3 = n.asm.ra).apply(null, arguments)
                },
                ie = n._emscripten_bind_btTypedConstraint___destroy___0 = function () {
                    return (ie = n._emscripten_bind_btTypedConstraint___destroy___0 = n.asm.sa).apply(null, arguments)
                },
                re = n._emscripten_bind_btDynamicsWorld_addAction_1 = function () {
                    return (re = n._emscripten_bind_btDynamicsWorld_addAction_1 = n.asm.ta).apply(null, arguments)
                },
                pe = n._emscripten_bind_btDynamicsWorld_removeAction_1 = function () {
                    return (pe = n._emscripten_bind_btDynamicsWorld_removeAction_1 = n.asm.ua).apply(null, arguments)
                },
                se = n._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function () {
                    return (se = n._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = n.asm.va).apply(null, arguments)
                },
                ce = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = function () {
                    return (ce = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = n.asm.wa).apply(null, arguments)
                },
                ae = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = function () {
                    return (ae = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = n.asm.xa).apply(null, arguments)
                },
                le = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = function () {
                    return (le = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = n.asm.ya).apply(null, arguments)
                },
                ue = n._emscripten_bind_btDynamicsWorld_getDispatcher_0 = function () {
                    return (ue = n._emscripten_bind_btDynamicsWorld_getDispatcher_0 = n.asm.za).apply(null, arguments)
                },
                be = n._emscripten_bind_btDynamicsWorld_rayTest_3 = function () {
                    return (be = n._emscripten_bind_btDynamicsWorld_rayTest_3 = n.asm.Aa).apply(null, arguments)
                },
                me = n._emscripten_bind_btDynamicsWorld_getPairCache_0 = function () {
                    return (me = n._emscripten_bind_btDynamicsWorld_getPairCache_0 = n.asm.Ba).apply(null, arguments)
                },
                ye = n._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function () {
                    return (ye = n._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = n.asm.Ca).apply(null, arguments)
                },
                de = n._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = function () {
                    return (de = n._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = n.asm.Da).apply(null, arguments)
                },
                fe = n._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = function () {
                    return (fe = n._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = n.asm.Ea).apply(null, arguments)
                },
                he = n._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function () {
                    return (he = n._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = n.asm.Fa).apply(null, arguments)
                },
                Be = n._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = function () {
                    return (Be = n._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = n.asm.Ga).apply(null, arguments)
                },
                ge = n._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function () {
                    return (ge = n._emscripten_bind_btDynamicsWorld_getBroadphase_0 = n.asm.Ha).apply(null, arguments)
                },
                ke = n._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function () {
                    return (ke = n._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = n.asm.Ia).apply(null, arguments)
                },
                Ce = n._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function () {
                    return (Ce = n._emscripten_bind_btDynamicsWorld_contactPairTest_3 = n.asm.Ja).apply(null, arguments)
                },
                Se = n._emscripten_bind_btDynamicsWorld_contactTest_2 = function () {
                    return (Se = n._emscripten_bind_btDynamicsWorld_contactTest_2 = n.asm.Ka).apply(null, arguments)
                },
                je = n._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function () {
                    return (je = n._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = n.asm.La).apply(null, arguments)
                },
                ve = n._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function () {
                    return (ve = n._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = n.asm.Ma).apply(null, arguments)
                },
                Ie = n._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function () {
                    return (Ie = n._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = n.asm.Na).apply(null, arguments)
                },
                Re = n._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function () {
                    return (Re = n._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = n.asm.Oa).apply(null, arguments)
                },
                De = n._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = function () {
                    return (De = n._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = n.asm.Pa).apply(null, arguments)
                },
                Pe = n._emscripten_bind_btDynamicsWorld___destroy___0 = function () {
                    return (Pe = n._emscripten_bind_btDynamicsWorld___destroy___0 = n.asm.Qa).apply(null, arguments)
                },
                Te = n._emscripten_bind_btIDebugDraw_drawLine_3 = function () {
                    return (Te = n._emscripten_bind_btIDebugDraw_drawLine_3 = n.asm.Ra).apply(null, arguments)
                },
                Oe = n._emscripten_bind_btIDebugDraw_drawContactPoint_5 = function () {
                    return (Oe = n._emscripten_bind_btIDebugDraw_drawContactPoint_5 = n.asm.Sa).apply(null, arguments)
                },
                We = n._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = function () {
                    return (We = n._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = n.asm.Ta).apply(null, arguments)
                },
                Ae = n._emscripten_bind_btIDebugDraw_draw3dText_2 = function () {
                    return (Ae = n._emscripten_bind_btIDebugDraw_draw3dText_2 = n.asm.Ua).apply(null, arguments)
                },
                Me = n._emscripten_bind_btIDebugDraw_setDebugMode_1 = function () {
                    return (Me = n._emscripten_bind_btIDebugDraw_setDebugMode_1 = n.asm.Va).apply(null, arguments)
                },
                xe = n._emscripten_bind_btIDebugDraw_getDebugMode_0 = function () {
                    return (xe = n._emscripten_bind_btIDebugDraw_getDebugMode_0 = n.asm.Wa).apply(null, arguments)
                },
                Fe = n._emscripten_bind_btIDebugDraw___destroy___0 = function () {
                    return (Fe = n._emscripten_bind_btIDebugDraw___destroy___0 = n.asm.Xa).apply(null, arguments)
                },
                Le = n._emscripten_bind_btVector3_btVector3_0 = function () {
                    return (Le = n._emscripten_bind_btVector3_btVector3_0 = n.asm.Ya).apply(null, arguments)
                },
                Ge = n._emscripten_bind_btVector3_btVector3_3 = function () {
                    return (Ge = n._emscripten_bind_btVector3_btVector3_3 = n.asm.Za).apply(null, arguments)
                },
                we = n._emscripten_bind_btVector3_length_0 = function () {
                    return (we = n._emscripten_bind_btVector3_length_0 = n.asm._a).apply(null, arguments)
                },
                He = n._emscripten_bind_btVector3_x_0 = function () {
                    return (He = n._emscripten_bind_btVector3_x_0 = n.asm.$a).apply(null, arguments)
                },
                Ve = n._emscripten_bind_btVector3_y_0 = function () {
                    return (Ve = n._emscripten_bind_btVector3_y_0 = n.asm.ab).apply(null, arguments)
                },
                Ee = n._emscripten_bind_btVector3_z_0 = function () {
                    return (Ee = n._emscripten_bind_btVector3_z_0 = n.asm.bb).apply(null, arguments)
                },
                Ne = n._emscripten_bind_btVector3_setX_1 = function () {
                    return (Ne = n._emscripten_bind_btVector3_setX_1 = n.asm.cb).apply(null, arguments)
                },
                Ue = n._emscripten_bind_btVector3_setY_1 = function () {
                    return (Ue = n._emscripten_bind_btVector3_setY_1 = n.asm.db).apply(null, arguments)
                },
                ze = n._emscripten_bind_btVector3_setZ_1 = function () {
                    return (ze = n._emscripten_bind_btVector3_setZ_1 = n.asm.eb).apply(null, arguments)
                },
                qe = n._emscripten_bind_btVector3_setValue_3 = function () {
                    return (qe = n._emscripten_bind_btVector3_setValue_3 = n.asm.fb).apply(null, arguments)
                },
                Ke = n._emscripten_bind_btVector3_normalize_0 = function () {
                    return (Ke = n._emscripten_bind_btVector3_normalize_0 = n.asm.gb).apply(null, arguments)
                },
                Qe = n._emscripten_bind_btVector3_rotate_2 = function () {
                    return (Qe = n._emscripten_bind_btVector3_rotate_2 = n.asm.hb).apply(null, arguments)
                },
                Xe = n._emscripten_bind_btVector3_dot_1 = function () {
                    return (Xe = n._emscripten_bind_btVector3_dot_1 = n.asm.ib).apply(null, arguments)
                },
                Ze = n._emscripten_bind_btVector3_op_mul_1 = function () {
                    return (Ze = n._emscripten_bind_btVector3_op_mul_1 = n.asm.jb).apply(null, arguments)
                },
                Ye = n._emscripten_bind_btVector3_op_add_1 = function () {
                    return (Ye = n._emscripten_bind_btVector3_op_add_1 = n.asm.kb).apply(null, arguments)
                },
                Je = n._emscripten_bind_btVector3_op_sub_1 = function () {
                    return (Je = n._emscripten_bind_btVector3_op_sub_1 = n.asm.lb).apply(null, arguments)
                },
                $e = n._emscripten_bind_btVector3___destroy___0 = function () {
                    return ($e = n._emscripten_bind_btVector3___destroy___0 = n.asm.mb).apply(null, arguments)
                },
                tn = n._emscripten_bind_btQuadWord_x_0 = function () {
                    return (tn = n._emscripten_bind_btQuadWord_x_0 = n.asm.nb).apply(null, arguments)
                },
                en = n._emscripten_bind_btQuadWord_y_0 = function () {
                    return (en = n._emscripten_bind_btQuadWord_y_0 = n.asm.ob).apply(null, arguments)
                },
                nn = n._emscripten_bind_btQuadWord_z_0 = function () {
                    return (nn = n._emscripten_bind_btQuadWord_z_0 = n.asm.pb).apply(null, arguments)
                },
                on = n._emscripten_bind_btQuadWord_w_0 = function () {
                    return (on = n._emscripten_bind_btQuadWord_w_0 = n.asm.qb).apply(null, arguments)
                },
                _n = n._emscripten_bind_btQuadWord_setX_1 = function () {
                    return (_n = n._emscripten_bind_btQuadWord_setX_1 = n.asm.rb).apply(null, arguments)
                },
                rn = n._emscripten_bind_btQuadWord_setY_1 = function () {
                    return (rn = n._emscripten_bind_btQuadWord_setY_1 = n.asm.sb).apply(null, arguments)
                },
                pn = n._emscripten_bind_btQuadWord_setZ_1 = function () {
                    return (pn = n._emscripten_bind_btQuadWord_setZ_1 = n.asm.tb).apply(null, arguments)
                },
                sn = n._emscripten_bind_btQuadWord_setW_1 = function () {
                    return (sn = n._emscripten_bind_btQuadWord_setW_1 = n.asm.ub).apply(null, arguments)
                },
                cn = n._emscripten_bind_btQuadWord___destroy___0 = function () {
                    return (cn = n._emscripten_bind_btQuadWord___destroy___0 = n.asm.vb).apply(null, arguments)
                },
                an = n._emscripten_bind_btMotionState_getWorldTransform_1 = function () {
                    return (an = n._emscripten_bind_btMotionState_getWorldTransform_1 = n.asm.wb).apply(null, arguments)
                },
                ln = n._emscripten_bind_btMotionState_setWorldTransform_1 = function () {
                    return (ln = n._emscripten_bind_btMotionState_setWorldTransform_1 = n.asm.xb).apply(null, arguments)
                },
                un = n._emscripten_bind_btMotionState___destroy___0 = function () {
                    return (un = n._emscripten_bind_btMotionState___destroy___0 = n.asm.yb).apply(null, arguments)
                },
                bn = n._emscripten_bind_RayResultCallback_hasHit_0 = function () {
                    return (bn = n._emscripten_bind_RayResultCallback_hasHit_0 = n.asm.zb).apply(null, arguments)
                },
                mn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = function () {
                    return (mn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = n.asm.Ab).apply(null, arguments)
                },
                yn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function () {
                    return (yn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = n.asm.Bb).apply(null, arguments)
                },
                dn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = function () {
                    return (dn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = n.asm.Cb).apply(null, arguments)
                },
                fn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function () {
                    return (fn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = n.asm.Db).apply(null, arguments)
                },
                hn = n._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function () {
                    return (hn = n._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = n.asm.Eb).apply(null, arguments)
                },
                Bn = n._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = function () {
                    return (Bn = n._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = n.asm.Fb).apply(null, arguments)
                },
                gn = n._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function () {
                    return (gn = n._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = n.asm.Gb).apply(null, arguments)
                },
                kn = n._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function () {
                    return (kn = n._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = n.asm.Hb).apply(null, arguments)
                },
                Cn = n._emscripten_bind_RayResultCallback_get_m_flags_0 = function () {
                    return (Cn = n._emscripten_bind_RayResultCallback_get_m_flags_0 = n.asm.Ib).apply(null, arguments)
                },
                Sn = n._emscripten_bind_RayResultCallback_set_m_flags_1 = function () {
                    return (Sn = n._emscripten_bind_RayResultCallback_set_m_flags_1 = n.asm.Jb).apply(null, arguments)
                },
                jn = n._emscripten_bind_RayResultCallback___destroy___0 = function () {
                    return (jn = n._emscripten_bind_RayResultCallback___destroy___0 = n.asm.Kb).apply(null, arguments)
                },
                vn = n._emscripten_bind_ContactResultCallback_addSingleResult_7 = function () {
                    return (vn = n._emscripten_bind_ContactResultCallback_addSingleResult_7 = n.asm.Lb).apply(null, arguments)
                },
                In = n._emscripten_bind_ContactResultCallback___destroy___0 = function () {
                    return (In = n._emscripten_bind_ContactResultCallback___destroy___0 = n.asm.Mb).apply(null, arguments)
                },
                Rn = n._emscripten_bind_ConvexResultCallback_hasHit_0 = function () {
                    return (Rn = n._emscripten_bind_ConvexResultCallback_hasHit_0 = n.asm.Nb).apply(null, arguments)
                },
                Dn = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
                    return (Dn = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = n.asm.Ob).apply(null, arguments)
                },
                Pn = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
                    return (Pn = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = n.asm.Pb).apply(null, arguments)
                },
                Tn = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function () {
                    return (Tn = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = n.asm.Qb).apply(null, arguments)
                },
                On = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = function () {
                    return (On = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = n.asm.Rb).apply(null, arguments)
                },
                Wn = n._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = function () {
                    return (Wn = n._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = n.asm.Sb).apply(null, arguments)
                },
                An = n._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function () {
                    return (An = n._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = n.asm.Tb).apply(null, arguments)
                },
                Mn = n._emscripten_bind_ConvexResultCallback___destroy___0 = function () {
                    return (Mn = n._emscripten_bind_ConvexResultCallback___destroy___0 = n.asm.Ub).apply(null, arguments)
                },
                xn = n._emscripten_bind_btConvexShape_setLocalScaling_1 = function () {
                    return (xn = n._emscripten_bind_btConvexShape_setLocalScaling_1 = n.asm.Vb).apply(null, arguments)
                },
                Fn = n._emscripten_bind_btConvexShape_getLocalScaling_0 = function () {
                    return (Fn = n._emscripten_bind_btConvexShape_getLocalScaling_0 = n.asm.Wb).apply(null, arguments)
                },
                Ln = n._emscripten_bind_btConvexShape_calculateLocalInertia_2 = function () {
                    return (Ln = n._emscripten_bind_btConvexShape_calculateLocalInertia_2 = n.asm.Xb).apply(null, arguments)
                },
                Gn = n._emscripten_bind_btConvexShape_setMargin_1 = function () {
                    return (Gn = n._emscripten_bind_btConvexShape_setMargin_1 = n.asm.Yb).apply(null, arguments)
                },
                wn = n._emscripten_bind_btConvexShape_getMargin_0 = function () {
                    return (wn = n._emscripten_bind_btConvexShape_getMargin_0 = n.asm.Zb).apply(null, arguments)
                },
                Hn = n._emscripten_bind_btConvexShape___destroy___0 = function () {
                    return (Hn = n._emscripten_bind_btConvexShape___destroy___0 = n.asm._b).apply(null, arguments)
                },
                Vn = n._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = function () {
                    return (Vn = n._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = n.asm.$b).apply(null, arguments)
                },
                En = n._emscripten_bind_btCapsuleShape_setMargin_1 = function () {
                    return (En = n._emscripten_bind_btCapsuleShape_setMargin_1 = n.asm.ac).apply(null, arguments)
                },
                Nn = n._emscripten_bind_btCapsuleShape_getMargin_0 = function () {
                    return (Nn = n._emscripten_bind_btCapsuleShape_getMargin_0 = n.asm.bc).apply(null, arguments)
                },
                Un = n._emscripten_bind_btCapsuleShape_getUpAxis_0 = function () {
                    return (Un = n._emscripten_bind_btCapsuleShape_getUpAxis_0 = n.asm.cc).apply(null, arguments)
                },
                zn = n._emscripten_bind_btCapsuleShape_getRadius_0 = function () {
                    return (zn = n._emscripten_bind_btCapsuleShape_getRadius_0 = n.asm.dc).apply(null, arguments)
                },
                qn = n._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function () {
                    return (qn = n._emscripten_bind_btCapsuleShape_getHalfHeight_0 = n.asm.ec).apply(null, arguments)
                },
                Kn = n._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function () {
                    return (Kn = n._emscripten_bind_btCapsuleShape_setLocalScaling_1 = n.asm.fc).apply(null, arguments)
                },
                Qn = n._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function () {
                    return (Qn = n._emscripten_bind_btCapsuleShape_getLocalScaling_0 = n.asm.gc).apply(null, arguments)
                },
                Xn = n._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = function () {
                    return (Xn = n._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = n.asm.hc).apply(null, arguments)
                },
                Zn = n._emscripten_bind_btCapsuleShape___destroy___0 = function () {
                    return (Zn = n._emscripten_bind_btCapsuleShape___destroy___0 = n.asm.ic).apply(null, arguments)
                },
                Yn = n._emscripten_bind_btCylinderShape_btCylinderShape_1 = function () {
                    return (Yn = n._emscripten_bind_btCylinderShape_btCylinderShape_1 = n.asm.jc).apply(null, arguments)
                },
                Jn = n._emscripten_bind_btCylinderShape_setMargin_1 = function () {
                    return (Jn = n._emscripten_bind_btCylinderShape_setMargin_1 = n.asm.kc).apply(null, arguments)
                },
                $n = n._emscripten_bind_btCylinderShape_getMargin_0 = function () {
                    return ($n = n._emscripten_bind_btCylinderShape_getMargin_0 = n.asm.lc).apply(null, arguments)
                },
                to = n._emscripten_bind_btCylinderShape_setLocalScaling_1 = function () {
                    return (to = n._emscripten_bind_btCylinderShape_setLocalScaling_1 = n.asm.mc).apply(null, arguments)
                },
                eo = n._emscripten_bind_btCylinderShape_getLocalScaling_0 = function () {
                    return (eo = n._emscripten_bind_btCylinderShape_getLocalScaling_0 = n.asm.nc).apply(null, arguments)
                },
                no = n._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function () {
                    return (no = n._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = n.asm.oc).apply(null, arguments)
                },
                oo = n._emscripten_bind_btCylinderShape___destroy___0 = function () {
                    return (oo = n._emscripten_bind_btCylinderShape___destroy___0 = n.asm.pc).apply(null, arguments)
                },
                _o = n._emscripten_bind_btConeShape_btConeShape_2 = function () {
                    return (_o = n._emscripten_bind_btConeShape_btConeShape_2 = n.asm.qc).apply(null, arguments)
                },
                io = n._emscripten_bind_btConeShape_setLocalScaling_1 = function () {
                    return (io = n._emscripten_bind_btConeShape_setLocalScaling_1 = n.asm.rc).apply(null, arguments)
                },
                ro = n._emscripten_bind_btConeShape_getLocalScaling_0 = function () {
                    return (ro = n._emscripten_bind_btConeShape_getLocalScaling_0 = n.asm.sc).apply(null, arguments)
                },
                po = n._emscripten_bind_btConeShape_calculateLocalInertia_2 = function () {
                    return (po = n._emscripten_bind_btConeShape_calculateLocalInertia_2 = n.asm.tc).apply(null, arguments)
                },
                so = n._emscripten_bind_btConeShape___destroy___0 = function () {
                    return (so = n._emscripten_bind_btConeShape___destroy___0 = n.asm.uc).apply(null, arguments)
                },
                co = n._emscripten_bind_btStridingMeshInterface_setScaling_1 = function () {
                    return (co = n._emscripten_bind_btStridingMeshInterface_setScaling_1 = n.asm.vc).apply(null, arguments)
                },
                ao = n._emscripten_bind_btStridingMeshInterface___destroy___0 = function () {
                    return (ao = n._emscripten_bind_btStridingMeshInterface___destroy___0 = n.asm.wc).apply(null, arguments)
                },
                lo = n._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function () {
                    return (lo = n._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = n.asm.xc).apply(null, arguments)
                },
                uo = n._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function () {
                    return (uo = n._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = n.asm.yc).apply(null, arguments)
                },
                bo = n._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function () {
                    return (bo = n._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = n.asm.zc).apply(null, arguments)
                },
                mo = n._emscripten_bind_btTriangleMeshShape___destroy___0 = function () {
                    return (mo = n._emscripten_bind_btTriangleMeshShape___destroy___0 = n.asm.Ac).apply(null, arguments)
                },
                yo = n._emscripten_bind_btPrimitiveManagerBase_is_trimesh_0 = function () {
                    return (yo = n._emscripten_bind_btPrimitiveManagerBase_is_trimesh_0 = n.asm.Bc).apply(null, arguments)
                },
                fo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_count_0 = function () {
                    return (fo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_count_0 = n.asm.Cc).apply(null, arguments)
                },
                ho = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_box_2 = function () {
                    return (ho = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_box_2 = n.asm.Dc).apply(null, arguments)
                },
                Bo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_triangle_2 = function () {
                    return (Bo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_triangle_2 = n.asm.Ec).apply(null, arguments)
                },
                go = n._emscripten_bind_btPrimitiveManagerBase___destroy___0 = function () {
                    return (go = n._emscripten_bind_btPrimitiveManagerBase___destroy___0 = n.asm.Fc).apply(null, arguments)
                },
                ko = n._emscripten_bind_btGImpactShapeInterface_updateBound_0 = function () {
                    return (ko = n._emscripten_bind_btGImpactShapeInterface_updateBound_0 = n.asm.Gc).apply(null, arguments)
                },
                Co = n._emscripten_bind_btGImpactShapeInterface_postUpdate_0 = function () {
                    return (Co = n._emscripten_bind_btGImpactShapeInterface_postUpdate_0 = n.asm.Hc).apply(null, arguments)
                },
                So = n._emscripten_bind_btGImpactShapeInterface_getShapeType_0 = function () {
                    return (So = n._emscripten_bind_btGImpactShapeInterface_getShapeType_0 = n.asm.Ic).apply(null, arguments)
                },
                jo = n._emscripten_bind_btGImpactShapeInterface_getName_0 = function () {
                    return (jo = n._emscripten_bind_btGImpactShapeInterface_getName_0 = n.asm.Jc).apply(null, arguments)
                },
                vo = n._emscripten_bind_btGImpactShapeInterface_getGImpactShapeType_0 = function () {
                    return (vo = n._emscripten_bind_btGImpactShapeInterface_getGImpactShapeType_0 = n.asm.Kc).apply(null, arguments)
                },
                Io = n._emscripten_bind_btGImpactShapeInterface_getPrimitiveManager_0 = function () {
                    return (Io = n._emscripten_bind_btGImpactShapeInterface_getPrimitiveManager_0 = n.asm.Lc).apply(null, arguments)
                },
                Ro = n._emscripten_bind_btGImpactShapeInterface_getNumChildShapes_0 = function () {
                    return (Ro = n._emscripten_bind_btGImpactShapeInterface_getNumChildShapes_0 = n.asm.Mc).apply(null, arguments)
                },
                Do = n._emscripten_bind_btGImpactShapeInterface_childrenHasTransform_0 = function () {
                    return (Do = n._emscripten_bind_btGImpactShapeInterface_childrenHasTransform_0 = n.asm.Nc).apply(null, arguments)
                },
                Po = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTriangles_0 = function () {
                    return (Po = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTriangles_0 = n.asm.Oc).apply(null, arguments)
                },
                To = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTetrahedrons_0 = function () {
                    return (To = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTetrahedrons_0 = n.asm.Pc).apply(null, arguments)
                },
                Oo = n._emscripten_bind_btGImpactShapeInterface_getBulletTriangle_2 = function () {
                    return (Oo = n._emscripten_bind_btGImpactShapeInterface_getBulletTriangle_2 = n.asm.Qc).apply(null, arguments)
                },
                Wo = n._emscripten_bind_btGImpactShapeInterface_getBulletTetrahedron_2 = function () {
                    return (Wo = n._emscripten_bind_btGImpactShapeInterface_getBulletTetrahedron_2 = n.asm.Rc).apply(null, arguments)
                },
                Ao = n._emscripten_bind_btGImpactShapeInterface_getChildShape_1 = function () {
                    return (Ao = n._emscripten_bind_btGImpactShapeInterface_getChildShape_1 = n.asm.Sc).apply(null, arguments)
                },
                Mo = n._emscripten_bind_btGImpactShapeInterface_getChildTransform_1 = function () {
                    return (Mo = n._emscripten_bind_btGImpactShapeInterface_getChildTransform_1 = n.asm.Tc).apply(null, arguments)
                },
                xo = n._emscripten_bind_btGImpactShapeInterface_setChildTransform_2 = function () {
                    return (xo = n._emscripten_bind_btGImpactShapeInterface_setChildTransform_2 = n.asm.Uc).apply(null, arguments)
                },
                Fo = n._emscripten_bind_btGImpactShapeInterface_setLocalScaling_1 = function () {
                    return (Fo = n._emscripten_bind_btGImpactShapeInterface_setLocalScaling_1 = n.asm.Vc).apply(null, arguments)
                },
                Lo = n._emscripten_bind_btGImpactShapeInterface_getLocalScaling_0 = function () {
                    return (Lo = n._emscripten_bind_btGImpactShapeInterface_getLocalScaling_0 = n.asm.Wc).apply(null, arguments)
                },
                Go = n._emscripten_bind_btGImpactShapeInterface_calculateLocalInertia_2 = function () {
                    return (Go = n._emscripten_bind_btGImpactShapeInterface_calculateLocalInertia_2 = n.asm.Xc).apply(null, arguments)
                },
                wo = n._emscripten_bind_btGImpactShapeInterface___destroy___0 = function () {
                    return (wo = n._emscripten_bind_btGImpactShapeInterface___destroy___0 = n.asm.Yc).apply(null, arguments)
                },
                Ho = n._emscripten_bind_btActivatingCollisionAlgorithm___destroy___0 = function () {
                    return (Ho = n._emscripten_bind_btActivatingCollisionAlgorithm___destroy___0 = n.asm.Zc).apply(null, arguments)
                },
                Vo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = function () {
                    return (Vo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = n.asm._c).apply(null, arguments)
                },
                Eo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = function () {
                    return (Eo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = n.asm.$c).apply(null, arguments)
                },
                No = n._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = function () {
                    return (No = n._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = n.asm.ad).apply(null, arguments)
                },
                Uo = n._emscripten_bind_btDispatcher_getNumManifolds_0 = function () {
                    return (Uo = n._emscripten_bind_btDispatcher_getNumManifolds_0 = n.asm.bd).apply(null, arguments)
                },
                zo = n._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = function () {
                    return (zo = n._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = n.asm.cd).apply(null, arguments)
                },
                qo = n._emscripten_bind_btDispatcher___destroy___0 = function () {
                    return (qo = n._emscripten_bind_btDispatcher___destroy___0 = n.asm.dd).apply(null, arguments)
                },
                Ko = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = function () {
                    return (Ko = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = n.asm.ed).apply(null, arguments)
                },
                Qo = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function () {
                    return (Qo = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = n.asm.fd).apply(null, arguments)
                },
                Xo = n._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = function () {
                    return (Xo = n._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = n.asm.gd).apply(null, arguments)
                },
                Zo = n._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function () {
                    return (Zo = n._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = n.asm.hd).apply(null, arguments)
                },
                Yo = n._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = function () {
                    return (Yo = n._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = n.asm.id).apply(null, arguments)
                },
                Jo = n._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function () {
                    return (Jo = n._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = n.asm.jd).apply(null, arguments)
                },
                $o = n._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function () {
                    return ($o = n._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = n.asm.kd).apply(null, arguments)
                },
                t_ = n._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function () {
                    return (t_ = n._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = n.asm.ld).apply(null, arguments)
                },
                e_ = n._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (e_ = n._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = n.asm.md).apply(null, arguments)
                },
                n_ = n._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (n_ = n._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = n.asm.nd).apply(null, arguments)
                },
                o_ = n._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function () {
                    return (o_ = n._emscripten_bind_btGeneric6DofConstraint_getParam_2 = n.asm.od).apply(null, arguments)
                },
                __ = n._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function () {
                    return (__ = n._emscripten_bind_btGeneric6DofConstraint_setParam_3 = n.asm.pd).apply(null, arguments)
                },
                i_ = n._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function () {
                    return (i_ = n._emscripten_bind_btGeneric6DofConstraint___destroy___0 = n.asm.qd).apply(null, arguments)
                },
                r_ = n._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = function () {
                    return (r_ = n._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = n.asm.rd).apply(null, arguments)
                },
                p_ = n._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function () {
                    return (p_ = n._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = n.asm.sd).apply(null, arguments)
                },
                s_ = n._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = function () {
                    return (s_ = n._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = n.asm.td).apply(null, arguments)
                },
                c_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = function () {
                    return (c_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = n.asm.ud).apply(null, arguments)
                },
                a_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function () {
                    return (a_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = n.asm.vd).apply(null, arguments)
                },
                l_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function () {
                    return (l_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = n.asm.wd).apply(null, arguments)
                },
                u_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = function () {
                    return (u_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = n.asm.xd).apply(null, arguments)
                },
                b_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function () {
                    return (b_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = n.asm.yd).apply(null, arguments)
                },
                m_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function () {
                    return (m_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = n.asm.zd).apply(null, arguments)
                },
                y_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = function () {
                    return (y_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = n.asm.Ad).apply(null, arguments)
                },
                d_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function () {
                    return (d_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = n.asm.Bd).apply(null, arguments)
                },
                f_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function () {
                    return (f_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = n.asm.Cd).apply(null, arguments)
                },
                h_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = function () {
                    return (h_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = n.asm.Dd).apply(null, arguments)
                },
                B_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function () {
                    return (B_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = n.asm.Ed).apply(null, arguments)
                },
                g_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function () {
                    return (g_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = n.asm.Fd).apply(null, arguments)
                },
                k_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = function () {
                    return (k_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = n.asm.Gd).apply(null, arguments)
                },
                C_ = n._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function () {
                    return (C_ = n._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = n.asm.Hd).apply(null, arguments)
                },
                S_ = n._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function () {
                    return (S_ = n._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = n.asm.Id).apply(null, arguments)
                },
                j_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function () {
                    return (j_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = n.asm.Jd).apply(null, arguments)
                },
                v_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function () {
                    return (v_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = n.asm.Kd).apply(null, arguments)
                },
                I_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function () {
                    return (I_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = n.asm.Ld).apply(null, arguments)
                },
                R_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = function () {
                    return (R_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = n.asm.Md).apply(null, arguments)
                },
                D_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = function () {
                    return (D_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = n.asm.Nd).apply(null, arguments)
                },
                P_ = n._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function () {
                    return (P_ = n._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = n.asm.Od).apply(null, arguments)
                },
                T_ = n._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function () {
                    return (T_ = n._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = n.asm.Pd).apply(null, arguments)
                },
                O_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = function () {
                    return (O_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = n.asm.Qd).apply(null, arguments)
                },
                W_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function () {
                    return (W_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = n.asm.Rd).apply(null, arguments)
                },
                A_ = n._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function () {
                    return (A_ = n._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = n.asm.Sd).apply(null, arguments)
                },
                M_ = n._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function () {
                    return (M_ = n._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = n.asm.Td).apply(null, arguments)
                },
                x_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function () {
                    return (x_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = n.asm.Ud).apply(null, arguments)
                },
                F_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function () {
                    return (F_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = n.asm.Vd).apply(null, arguments)
                },
                L_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function () {
                    return (L_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = n.asm.Wd).apply(null, arguments)
                },
                G_ = n._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = function () {
                    return (G_ = n._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = n.asm.Xd).apply(null, arguments)
                },
                w_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = function () {
                    return (w_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = n.asm.Yd).apply(null, arguments)
                },
                H_ = n._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function () {
                    return (H_ = n._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = n.asm.Zd).apply(null, arguments)
                },
                V_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = function () {
                    return (V_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = n.asm._d).apply(null, arguments)
                },
                E_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = function () {
                    return (E_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = n.asm.$d).apply(null, arguments)
                },
                N_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = function () {
                    return (N_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = n.asm.ae).apply(null, arguments)
                },
                U_ = n._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function () {
                    return (U_ = n._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = n.asm.be).apply(null, arguments)
                },
                z_ = n._emscripten_bind_btVehicleRaycaster_castRay_3 = function () {
                    return (z_ = n._emscripten_bind_btVehicleRaycaster_castRay_3 = n.asm.ce).apply(null, arguments)
                },
                q_ = n._emscripten_bind_btVehicleRaycaster___destroy___0 = function () {
                    return (q_ = n._emscripten_bind_btVehicleRaycaster___destroy___0 = n.asm.de).apply(null, arguments)
                },
                K_ = n._emscripten_bind_btActionInterface_updateAction_2 = function () {
                    return (K_ = n._emscripten_bind_btActionInterface_updateAction_2 = n.asm.ee).apply(null, arguments)
                },
                Q_ = n._emscripten_bind_btActionInterface___destroy___0 = function () {
                    return (Q_ = n._emscripten_bind_btActionInterface___destroy___0 = n.asm.fe).apply(null, arguments)
                },
                X_ = n._emscripten_bind_btGhostObject_btGhostObject_0 = function () {
                    return (X_ = n._emscripten_bind_btGhostObject_btGhostObject_0 = n.asm.ge).apply(null, arguments)
                },
                Z_ = n._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function () {
                    return (Z_ = n._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = n.asm.he).apply(null, arguments)
                },
                Y_ = n._emscripten_bind_btGhostObject_getOverlappingObject_1 = function () {
                    return (Y_ = n._emscripten_bind_btGhostObject_getOverlappingObject_1 = n.asm.ie).apply(null, arguments)
                },
                J_ = n._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function () {
                    return (J_ = n._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = n.asm.je).apply(null, arguments)
                },
                $_ = n._emscripten_bind_btGhostObject_getCollisionShape_0 = function () {
                    return ($_ = n._emscripten_bind_btGhostObject_getCollisionShape_0 = n.asm.ke).apply(null, arguments)
                },
                ti = n._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function () {
                    return (ti = n._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = n.asm.le).apply(null, arguments)
                },
                ei = n._emscripten_bind_btGhostObject_setActivationState_1 = function () {
                    return (ei = n._emscripten_bind_btGhostObject_setActivationState_1 = n.asm.me).apply(null, arguments)
                },
                ni = n._emscripten_bind_btGhostObject_forceActivationState_1 = function () {
                    return (ni = n._emscripten_bind_btGhostObject_forceActivationState_1 = n.asm.ne).apply(null, arguments)
                },
                oi = n._emscripten_bind_btGhostObject_activate_0 = function () {
                    return (oi = n._emscripten_bind_btGhostObject_activate_0 = n.asm.oe).apply(null, arguments)
                },
                _i = n._emscripten_bind_btGhostObject_activate_1 = function () {
                    return (_i = n._emscripten_bind_btGhostObject_activate_1 = n.asm.pe).apply(null, arguments)
                },
                ii = n._emscripten_bind_btGhostObject_isActive_0 = function () {
                    return (ii = n._emscripten_bind_btGhostObject_isActive_0 = n.asm.qe).apply(null, arguments)
                },
                ri = n._emscripten_bind_btGhostObject_isKinematicObject_0 = function () {
                    return (ri = n._emscripten_bind_btGhostObject_isKinematicObject_0 = n.asm.re).apply(null, arguments)
                },
                pi = n._emscripten_bind_btGhostObject_isStaticObject_0 = function () {
                    return (pi = n._emscripten_bind_btGhostObject_isStaticObject_0 = n.asm.se).apply(null, arguments)
                },
                si = n._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = function () {
                    return (si = n._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = n.asm.te).apply(null, arguments)
                },
                ci = n._emscripten_bind_btGhostObject_getRestitution_0 = function () {
                    return (ci = n._emscripten_bind_btGhostObject_getRestitution_0 = n.asm.ue).apply(null, arguments)
                },
                ai = n._emscripten_bind_btGhostObject_getFriction_0 = function () {
                    return (ai = n._emscripten_bind_btGhostObject_getFriction_0 = n.asm.ve).apply(null, arguments)
                },
                li = n._emscripten_bind_btGhostObject_getRollingFriction_0 = function () {
                    return (li = n._emscripten_bind_btGhostObject_getRollingFriction_0 = n.asm.we).apply(null, arguments)
                },
                ui = n._emscripten_bind_btGhostObject_setRestitution_1 = function () {
                    return (ui = n._emscripten_bind_btGhostObject_setRestitution_1 = n.asm.xe).apply(null, arguments)
                },
                bi = n._emscripten_bind_btGhostObject_setFriction_1 = function () {
                    return (bi = n._emscripten_bind_btGhostObject_setFriction_1 = n.asm.ye).apply(null, arguments)
                },
                mi = n._emscripten_bind_btGhostObject_setRollingFriction_1 = function () {
                    return (mi = n._emscripten_bind_btGhostObject_setRollingFriction_1 = n.asm.ze).apply(null, arguments)
                },
                yi = n._emscripten_bind_btGhostObject_getWorldTransform_0 = function () {
                    return (yi = n._emscripten_bind_btGhostObject_getWorldTransform_0 = n.asm.Ae).apply(null, arguments)
                },
                di = n._emscripten_bind_btGhostObject_getCollisionFlags_0 = function () {
                    return (di = n._emscripten_bind_btGhostObject_getCollisionFlags_0 = n.asm.Be).apply(null, arguments)
                },
                fi = n._emscripten_bind_btGhostObject_setCollisionFlags_1 = function () {
                    return (fi = n._emscripten_bind_btGhostObject_setCollisionFlags_1 = n.asm.Ce).apply(null, arguments)
                },
                hi = n._emscripten_bind_btGhostObject_setWorldTransform_1 = function () {
                    return (hi = n._emscripten_bind_btGhostObject_setWorldTransform_1 = n.asm.De).apply(null, arguments)
                },
                Bi = n._emscripten_bind_btGhostObject_setCollisionShape_1 = function () {
                    return (Bi = n._emscripten_bind_btGhostObject_setCollisionShape_1 = n.asm.Ee).apply(null, arguments)
                },
                gi = n._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function () {
                    return (gi = n._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = n.asm.Fe).apply(null, arguments)
                },
                ki = n._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function () {
                    return (ki = n._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = n.asm.Ge).apply(null, arguments)
                },
                Ci = n._emscripten_bind_btGhostObject_getUserIndex_0 = function () {
                    return (Ci = n._emscripten_bind_btGhostObject_getUserIndex_0 = n.asm.He).apply(null, arguments)
                },
                Si = n._emscripten_bind_btGhostObject_setUserIndex_1 = function () {
                    return (Si = n._emscripten_bind_btGhostObject_setUserIndex_1 = n.asm.Ie).apply(null, arguments)
                },
                ji = n._emscripten_bind_btGhostObject_getUserPointer_0 = function () {
                    return (ji = n._emscripten_bind_btGhostObject_getUserPointer_0 = n.asm.Je).apply(null, arguments)
                },
                vi = n._emscripten_bind_btGhostObject_setUserPointer_1 = function () {
                    return (vi = n._emscripten_bind_btGhostObject_setUserPointer_1 = n.asm.Ke).apply(null, arguments)
                },
                Ii = n._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = function () {
                    return (Ii = n._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = n.asm.Le).apply(null, arguments)
                },
                Ri = n._emscripten_bind_btGhostObject___destroy___0 = function () {
                    return (Ri = n._emscripten_bind_btGhostObject___destroy___0 = n.asm.Me).apply(null, arguments)
                },
                Di = n._emscripten_bind_btSoftBodySolver___destroy___0 = function () {
                    return (Di = n._emscripten_bind_btSoftBodySolver___destroy___0 = n.asm.Ne).apply(null, arguments)
                },
                Pi = n._emscripten_bind_VoidPtr___destroy___0 = function () {
                    return (Pi = n._emscripten_bind_VoidPtr___destroy___0 = n.asm.Oe).apply(null, arguments)
                },
                Ti = n._emscripten_bind_DebugDrawer_DebugDrawer_0 = function () {
                    return (Ti = n._emscripten_bind_DebugDrawer_DebugDrawer_0 = n.asm.Pe).apply(null, arguments)
                },
                Oi = n._emscripten_bind_DebugDrawer_drawLine_3 = function () {
                    return (Oi = n._emscripten_bind_DebugDrawer_drawLine_3 = n.asm.Qe).apply(null, arguments)
                },
                Wi = n._emscripten_bind_DebugDrawer_drawContactPoint_5 = function () {
                    return (Wi = n._emscripten_bind_DebugDrawer_drawContactPoint_5 = n.asm.Re).apply(null, arguments)
                },
                Ai = n._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function () {
                    return (Ai = n._emscripten_bind_DebugDrawer_reportErrorWarning_1 = n.asm.Se).apply(null, arguments)
                },
                Mi = n._emscripten_bind_DebugDrawer_draw3dText_2 = function () {
                    return (Mi = n._emscripten_bind_DebugDrawer_draw3dText_2 = n.asm.Te).apply(null, arguments)
                },
                xi = n._emscripten_bind_DebugDrawer_setDebugMode_1 = function () {
                    return (xi = n._emscripten_bind_DebugDrawer_setDebugMode_1 = n.asm.Ue).apply(null, arguments)
                },
                Fi = n._emscripten_bind_DebugDrawer_getDebugMode_0 = function () {
                    return (Fi = n._emscripten_bind_DebugDrawer_getDebugMode_0 = n.asm.Ve).apply(null, arguments)
                },
                Li = n._emscripten_bind_DebugDrawer___destroy___0 = function () {
                    return (Li = n._emscripten_bind_DebugDrawer___destroy___0 = n.asm.We).apply(null, arguments)
                },
                Gi = n._emscripten_bind_btVector4_btVector4_0 = function () {
                    return (Gi = n._emscripten_bind_btVector4_btVector4_0 = n.asm.Xe).apply(null, arguments)
                },
                wi = n._emscripten_bind_btVector4_btVector4_4 = function () {
                    return (wi = n._emscripten_bind_btVector4_btVector4_4 = n.asm.Ye).apply(null, arguments)
                },
                Hi = n._emscripten_bind_btVector4_w_0 = function () {
                    return (Hi = n._emscripten_bind_btVector4_w_0 = n.asm.Ze).apply(null, arguments)
                },
                Vi = n._emscripten_bind_btVector4_setValue_4 = function () {
                    return (Vi = n._emscripten_bind_btVector4_setValue_4 = n.asm._e).apply(null, arguments)
                },
                Ei = n._emscripten_bind_btVector4_length_0 = function () {
                    return (Ei = n._emscripten_bind_btVector4_length_0 = n.asm.$e).apply(null, arguments)
                },
                Ni = n._emscripten_bind_btVector4_x_0 = function () {
                    return (Ni = n._emscripten_bind_btVector4_x_0 = n.asm.af).apply(null, arguments)
                },
                Ui = n._emscripten_bind_btVector4_y_0 = function () {
                    return (Ui = n._emscripten_bind_btVector4_y_0 = n.asm.bf).apply(null, arguments)
                },
                zi = n._emscripten_bind_btVector4_z_0 = function () {
                    return (zi = n._emscripten_bind_btVector4_z_0 = n.asm.cf).apply(null, arguments)
                },
                qi = n._emscripten_bind_btVector4_setX_1 = function () {
                    return (qi = n._emscripten_bind_btVector4_setX_1 = n.asm.df).apply(null, arguments)
                },
                Ki = n._emscripten_bind_btVector4_setY_1 = function () {
                    return (Ki = n._emscripten_bind_btVector4_setY_1 = n.asm.ef).apply(null, arguments)
                },
                Qi = n._emscripten_bind_btVector4_setZ_1 = function () {
                    return (Qi = n._emscripten_bind_btVector4_setZ_1 = n.asm.ff).apply(null, arguments)
                },
                Xi = n._emscripten_bind_btVector4_normalize_0 = function () {
                    return (Xi = n._emscripten_bind_btVector4_normalize_0 = n.asm.gf).apply(null, arguments)
                },
                Zi = n._emscripten_bind_btVector4_rotate_2 = function () {
                    return (Zi = n._emscripten_bind_btVector4_rotate_2 = n.asm.hf).apply(null, arguments)
                },
                Yi = n._emscripten_bind_btVector4_dot_1 = function () {
                    return (Yi = n._emscripten_bind_btVector4_dot_1 = n.asm.jf).apply(null, arguments)
                },
                Ji = n._emscripten_bind_btVector4_op_mul_1 = function () {
                    return (Ji = n._emscripten_bind_btVector4_op_mul_1 = n.asm.kf).apply(null, arguments)
                },
                $i = n._emscripten_bind_btVector4_op_add_1 = function () {
                    return ($i = n._emscripten_bind_btVector4_op_add_1 = n.asm.lf).apply(null, arguments)
                },
                tr = n._emscripten_bind_btVector4_op_sub_1 = function () {
                    return (tr = n._emscripten_bind_btVector4_op_sub_1 = n.asm.mf).apply(null, arguments)
                },
                er = n._emscripten_bind_btVector4___destroy___0 = function () {
                    return (er = n._emscripten_bind_btVector4___destroy___0 = n.asm.nf).apply(null, arguments)
                },
                nr = n._emscripten_bind_btQuaternion_btQuaternion_4 = function () {
                    return (nr = n._emscripten_bind_btQuaternion_btQuaternion_4 = n.asm.of).apply(null, arguments)
                },
                or = n._emscripten_bind_btQuaternion_setValue_4 = function () {
                    return (or = n._emscripten_bind_btQuaternion_setValue_4 = n.asm.pf).apply(null, arguments)
                },
                _r = n._emscripten_bind_btQuaternion_setEulerZYX_3 = function () {
                    return (_r = n._emscripten_bind_btQuaternion_setEulerZYX_3 = n.asm.qf).apply(null, arguments)
                },
                ir = n._emscripten_bind_btQuaternion_setRotation_2 = function () {
                    return (ir = n._emscripten_bind_btQuaternion_setRotation_2 = n.asm.rf).apply(null, arguments)
                },
                rr = n._emscripten_bind_btQuaternion_normalize_0 = function () {
                    return (rr = n._emscripten_bind_btQuaternion_normalize_0 = n.asm.sf).apply(null, arguments)
                },
                pr = n._emscripten_bind_btQuaternion_length2_0 = function () {
                    return (pr = n._emscripten_bind_btQuaternion_length2_0 = n.asm.tf).apply(null, arguments)
                },
                sr = n._emscripten_bind_btQuaternion_length_0 = function () {
                    return (sr = n._emscripten_bind_btQuaternion_length_0 = n.asm.uf).apply(null, arguments)
                },
                cr = n._emscripten_bind_btQuaternion_dot_1 = function () {
                    return (cr = n._emscripten_bind_btQuaternion_dot_1 = n.asm.vf).apply(null, arguments)
                },
                ar = n._emscripten_bind_btQuaternion_normalized_0 = function () {
                    return (ar = n._emscripten_bind_btQuaternion_normalized_0 = n.asm.wf).apply(null, arguments)
                },
                lr = n._emscripten_bind_btQuaternion_getAxis_0 = function () {
                    return (lr = n._emscripten_bind_btQuaternion_getAxis_0 = n.asm.xf).apply(null, arguments)
                },
                ur = n._emscripten_bind_btQuaternion_inverse_0 = function () {
                    return (ur = n._emscripten_bind_btQuaternion_inverse_0 = n.asm.yf).apply(null, arguments)
                },
                br = n._emscripten_bind_btQuaternion_getAngle_0 = function () {
                    return (br = n._emscripten_bind_btQuaternion_getAngle_0 = n.asm.zf).apply(null, arguments)
                },
                mr = n._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function () {
                    return (mr = n._emscripten_bind_btQuaternion_getAngleShortestPath_0 = n.asm.Af).apply(null, arguments)
                },
                yr = n._emscripten_bind_btQuaternion_angle_1 = function () {
                    return (yr = n._emscripten_bind_btQuaternion_angle_1 = n.asm.Bf).apply(null, arguments)
                },
                dr = n._emscripten_bind_btQuaternion_angleShortestPath_1 = function () {
                    return (dr = n._emscripten_bind_btQuaternion_angleShortestPath_1 = n.asm.Cf).apply(null, arguments)
                },
                fr = n._emscripten_bind_btQuaternion_op_add_1 = function () {
                    return (fr = n._emscripten_bind_btQuaternion_op_add_1 = n.asm.Df).apply(null, arguments)
                },
                hr = n._emscripten_bind_btQuaternion_op_sub_1 = function () {
                    return (hr = n._emscripten_bind_btQuaternion_op_sub_1 = n.asm.Ef).apply(null, arguments)
                },
                Br = n._emscripten_bind_btQuaternion_op_mul_1 = function () {
                    return (Br = n._emscripten_bind_btQuaternion_op_mul_1 = n.asm.Ff).apply(null, arguments)
                },
                gr = n._emscripten_bind_btQuaternion_op_mulq_1 = function () {
                    return (gr = n._emscripten_bind_btQuaternion_op_mulq_1 = n.asm.Gf).apply(null, arguments)
                },
                kr = n._emscripten_bind_btQuaternion_op_div_1 = function () {
                    return (kr = n._emscripten_bind_btQuaternion_op_div_1 = n.asm.Hf).apply(null, arguments)
                },
                Cr = n._emscripten_bind_btQuaternion_x_0 = function () {
                    return (Cr = n._emscripten_bind_btQuaternion_x_0 = n.asm.If).apply(null, arguments)
                },
                Sr = n._emscripten_bind_btQuaternion_y_0 = function () {
                    return (Sr = n._emscripten_bind_btQuaternion_y_0 = n.asm.Jf).apply(null, arguments)
                },
                jr = n._emscripten_bind_btQuaternion_z_0 = function () {
                    return (jr = n._emscripten_bind_btQuaternion_z_0 = n.asm.Kf).apply(null, arguments)
                },
                vr = n._emscripten_bind_btQuaternion_w_0 = function () {
                    return (vr = n._emscripten_bind_btQuaternion_w_0 = n.asm.Lf).apply(null, arguments)
                },
                Ir = n._emscripten_bind_btQuaternion_setX_1 = function () {
                    return (Ir = n._emscripten_bind_btQuaternion_setX_1 = n.asm.Mf).apply(null, arguments)
                },
                Rr = n._emscripten_bind_btQuaternion_setY_1 = function () {
                    return (Rr = n._emscripten_bind_btQuaternion_setY_1 = n.asm.Nf).apply(null, arguments)
                },
                Dr = n._emscripten_bind_btQuaternion_setZ_1 = function () {
                    return (Dr = n._emscripten_bind_btQuaternion_setZ_1 = n.asm.Of).apply(null, arguments)
                },
                Pr = n._emscripten_bind_btQuaternion_setW_1 = function () {
                    return (Pr = n._emscripten_bind_btQuaternion_setW_1 = n.asm.Pf).apply(null, arguments)
                },
                Tr = n._emscripten_bind_btQuaternion___destroy___0 = function () {
                    return (Tr = n._emscripten_bind_btQuaternion___destroy___0 = n.asm.Qf).apply(null, arguments)
                },
                Or = n._emscripten_bind_btMatrix3x3_setEulerZYX_3 = function () {
                    return (Or = n._emscripten_bind_btMatrix3x3_setEulerZYX_3 = n.asm.Rf).apply(null, arguments)
                },
                Wr = n._emscripten_bind_btMatrix3x3_getRotation_1 = function () {
                    return (Wr = n._emscripten_bind_btMatrix3x3_getRotation_1 = n.asm.Sf).apply(null, arguments)
                },
                Ar = n._emscripten_bind_btMatrix3x3_getRow_1 = function () {
                    return (Ar = n._emscripten_bind_btMatrix3x3_getRow_1 = n.asm.Tf).apply(null, arguments)
                },
                Mr = n._emscripten_bind_btMatrix3x3___destroy___0 = function () {
                    return (Mr = n._emscripten_bind_btMatrix3x3___destroy___0 = n.asm.Uf).apply(null, arguments)
                },
                xr = n._emscripten_bind_btTransform_btTransform_0 = function () {
                    return (xr = n._emscripten_bind_btTransform_btTransform_0 = n.asm.Vf).apply(null, arguments)
                },
                Fr = n._emscripten_bind_btTransform_btTransform_2 = function () {
                    return (Fr = n._emscripten_bind_btTransform_btTransform_2 = n.asm.Wf).apply(null, arguments)
                },
                Lr = n._emscripten_bind_btTransform_setIdentity_0 = function () {
                    return (Lr = n._emscripten_bind_btTransform_setIdentity_0 = n.asm.Xf).apply(null, arguments)
                },
                Gr = n._emscripten_bind_btTransform_setOrigin_1 = function () {
                    return (Gr = n._emscripten_bind_btTransform_setOrigin_1 = n.asm.Yf).apply(null, arguments)
                },
                wr = n._emscripten_bind_btTransform_setRotation_1 = function () {
                    return (wr = n._emscripten_bind_btTransform_setRotation_1 = n.asm.Zf).apply(null, arguments)
                },
                Hr = n._emscripten_bind_btTransform_getOrigin_0 = function () {
                    return (Hr = n._emscripten_bind_btTransform_getOrigin_0 = n.asm._f).apply(null, arguments)
                },
                Vr = n._emscripten_bind_btTransform_getRotation_0 = function () {
                    return (Vr = n._emscripten_bind_btTransform_getRotation_0 = n.asm.$f).apply(null, arguments)
                },
                Er = n._emscripten_bind_btTransform_getBasis_0 = function () {
                    return (Er = n._emscripten_bind_btTransform_getBasis_0 = n.asm.ag).apply(null, arguments)
                },
                Nr = n._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function () {
                    return (Nr = n._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = n.asm.bg).apply(null, arguments)
                },
                Ur = n._emscripten_bind_btTransform_inverse_0 = function () {
                    return (Ur = n._emscripten_bind_btTransform_inverse_0 = n.asm.cg).apply(null, arguments)
                },
                zr = n._emscripten_bind_btTransform_op_mul_1 = function () {
                    return (zr = n._emscripten_bind_btTransform_op_mul_1 = n.asm.dg).apply(null, arguments)
                },
                qr = n._emscripten_bind_btTransform___destroy___0 = function () {
                    return (qr = n._emscripten_bind_btTransform___destroy___0 = n.asm.eg).apply(null, arguments)
                },
                Kr = n._emscripten_bind_MotionState_MotionState_0 = function () {
                    return (Kr = n._emscripten_bind_MotionState_MotionState_0 = n.asm.fg).apply(null, arguments)
                },
                Qr = n._emscripten_bind_MotionState_getWorldTransform_1 = function () {
                    return (Qr = n._emscripten_bind_MotionState_getWorldTransform_1 = n.asm.gg).apply(null, arguments)
                },
                Xr = n._emscripten_bind_MotionState_setWorldTransform_1 = function () {
                    return (Xr = n._emscripten_bind_MotionState_setWorldTransform_1 = n.asm.hg).apply(null, arguments)
                },
                Zr = n._emscripten_bind_MotionState___destroy___0 = function () {
                    return (Zr = n._emscripten_bind_MotionState___destroy___0 = n.asm.ig).apply(null, arguments)
                },
                Yr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function () {
                    return (Yr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = n.asm.jg).apply(null, arguments)
                },
                Jr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function () {
                    return (Jr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = n.asm.kg).apply(null, arguments)
                },
                $r = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function () {
                    return ($r = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = n.asm.lg).apply(null, arguments)
                },
                tp = n._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function () {
                    return (tp = n._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = n.asm.mg).apply(null, arguments)
                },
                ep = n._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function () {
                    return (ep = n._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = n.asm.ng).apply(null, arguments)
                },
                np = n._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function () {
                    return (np = n._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = n.asm.og).apply(null, arguments)
                },
                op = n._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function () {
                    return (op = n._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = n.asm.pg).apply(null, arguments)
                },
                _p = n._emscripten_bind_btDefaultMotionState___destroy___0 = function () {
                    return (_p = n._emscripten_bind_btDefaultMotionState___destroy___0 = n.asm.qg).apply(null, arguments)
                },
                ip = n._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = function () {
                    return (ip = n._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = n.asm.rg).apply(null, arguments)
                },
                rp = n._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = function () {
                    return (rp = n._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = n.asm.sg).apply(null, arguments)
                },
                pp = n._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = function () {
                    return (pp = n._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = n.asm.tg).apply(null, arguments)
                },
                sp = n._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function () {
                    return (sp = n._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = n.asm.ug).apply(null, arguments)
                },
                cp = n._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function () {
                    return (cp = n._emscripten_bind_ClosestRayResultCallback_hasHit_0 = n.asm.vg).apply(null, arguments)
                },
                ap = n._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function () {
                    return (ap = n._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = n.asm.wg).apply(null, arguments)
                },
                lp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function () {
                    return (lp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = n.asm.xg).apply(null, arguments)
                },
                up = n._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = function () {
                    return (up = n._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = n.asm.yg).apply(null, arguments)
                },
                bp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = function () {
                    return (bp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = n.asm.zg).apply(null, arguments)
                },
                mp = n._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function () {
                    return (mp = n._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = n.asm.Ag).apply(null, arguments)
                },
                yp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function () {
                    return (yp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = n.asm.Bg).apply(null, arguments)
                },
                dp = n._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function () {
                    return (dp = n._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = n.asm.Cg).apply(null, arguments)
                },
                fp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function () {
                    return (fp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = n.asm.Dg).apply(null, arguments)
                },
                hp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = function () {
                    return (hp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = n.asm.Eg).apply(null, arguments)
                },
                Bp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = function () {
                    return (Bp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = n.asm.Fg).apply(null, arguments)
                },
                gp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function () {
                    return (gp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = n.asm.Gg).apply(null, arguments)
                },
                kp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function () {
                    return (kp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = n.asm.Hg).apply(null, arguments)
                },
                Cp = n._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function () {
                    return (Cp = n._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = n.asm.Ig).apply(null, arguments)
                },
                Sp = n._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function () {
                    return (Sp = n._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = n.asm.Jg).apply(null, arguments)
                },
                jp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function () {
                    return (jp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = n.asm.Kg).apply(null, arguments)
                },
                vp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function () {
                    return (vp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = n.asm.Lg).apply(null, arguments)
                },
                Ip = n._emscripten_bind_ClosestRayResultCallback_get_m_flags_0 = function () {
                    return (Ip = n._emscripten_bind_ClosestRayResultCallback_get_m_flags_0 = n.asm.Mg).apply(null, arguments)
                },
                Rp = n._emscripten_bind_ClosestRayResultCallback_set_m_flags_1 = function () {
                    return (Rp = n._emscripten_bind_ClosestRayResultCallback_set_m_flags_1 = n.asm.Ng).apply(null, arguments)
                },
                Dp = n._emscripten_bind_ClosestRayResultCallback___destroy___0 = function () {
                    return (Dp = n._emscripten_bind_ClosestRayResultCallback___destroy___0 = n.asm.Og).apply(null, arguments)
                },
                Pp = n._emscripten_bind_btConstCollisionObjectArray_size_0 = function () {
                    return (Pp = n._emscripten_bind_btConstCollisionObjectArray_size_0 = n.asm.Pg).apply(null, arguments)
                },
                Tp = n._emscripten_bind_btConstCollisionObjectArray_at_1 = function () {
                    return (Tp = n._emscripten_bind_btConstCollisionObjectArray_at_1 = n.asm.Qg).apply(null, arguments)
                },
                Op = n._emscripten_bind_btConstCollisionObjectArray___destroy___0 = function () {
                    return (Op = n._emscripten_bind_btConstCollisionObjectArray___destroy___0 = n.asm.Rg).apply(null, arguments)
                },
                Wp = n._emscripten_bind_btScalarArray_size_0 = function () {
                    return (Wp = n._emscripten_bind_btScalarArray_size_0 = n.asm.Sg).apply(null, arguments)
                },
                Ap = n._emscripten_bind_btScalarArray_at_1 = function () {
                    return (Ap = n._emscripten_bind_btScalarArray_at_1 = n.asm.Tg).apply(null, arguments)
                },
                Mp = n._emscripten_bind_btScalarArray___destroy___0 = function () {
                    return (Mp = n._emscripten_bind_btScalarArray___destroy___0 = n.asm.Ug).apply(null, arguments)
                },
                xp = n._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = function () {
                    return (xp = n._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = n.asm.Vg).apply(null, arguments)
                },
                Fp = n._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = function () {
                    return (Fp = n._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = n.asm.Wg).apply(null, arguments)
                },
                Lp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = function () {
                    return (Lp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = n.asm.Xg).apply(null, arguments)
                },
                Gp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = function () {
                    return (Gp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = n.asm.Yg).apply(null, arguments)
                },
                wp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = function () {
                    return (wp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = n.asm.Zg).apply(null, arguments)
                },
                Hp = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = function () {
                    return (Hp = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = n.asm._g).apply(null, arguments)
                },
                Vp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = function () {
                    return (Vp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = n.asm.$g).apply(null, arguments)
                },
                Ep = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = function () {
                    return (Ep = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = n.asm.ah).apply(null, arguments)
                },
                Np = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = function () {
                    return (Np = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = n.asm.bh).apply(null, arguments)
                },
                Up = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = function () {
                    return (Up = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = n.asm.ch).apply(null, arguments)
                },
                zp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = function () {
                    return (zp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = n.asm.dh).apply(null, arguments)
                },
                qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = function () {
                    return (qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = n.asm.eh).apply(null, arguments)
                },
                Kp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = function () {
                    return (Kp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = n.asm.fh).apply(null, arguments)
                },
                Qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = function () {
                    return (Qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = n.asm.gh).apply(null, arguments)
                },
                Xp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = function () {
                    return (Xp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = n.asm.hh).apply(null, arguments)
                },
                Zp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = function () {
                    return (Zp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = n.asm.ih).apply(null, arguments)
                },
                Yp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = function () {
                    return (Yp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = n.asm.jh).apply(null, arguments)
                },
                Jp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = function () {
                    return (Jp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = n.asm.kh).apply(null, arguments)
                },
                $p = n._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = function () {
                    return ($p = n._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = n.asm.lh).apply(null, arguments)
                },
                ts = n._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = function () {
                    return (ts = n._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = n.asm.mh).apply(null, arguments)
                },
                es = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = function () {
                    return (es = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = n.asm.nh).apply(null, arguments)
                },
                ns = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = function () {
                    return (ns = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = n.asm.oh).apply(null, arguments)
                },
                os = n._emscripten_bind_AllHitsRayResultCallback_get_m_flags_0 = function () {
                    return (os = n._emscripten_bind_AllHitsRayResultCallback_get_m_flags_0 = n.asm.ph).apply(null, arguments)
                },
                _s = n._emscripten_bind_AllHitsRayResultCallback_set_m_flags_1 = function () {
                    return (_s = n._emscripten_bind_AllHitsRayResultCallback_set_m_flags_1 = n.asm.qh).apply(null, arguments)
                },
                is = n._emscripten_bind_AllHitsRayResultCallback___destroy___0 = function () {
                    return (is = n._emscripten_bind_AllHitsRayResultCallback___destroy___0 = n.asm.rh).apply(null, arguments)
                },
                rs = n._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function () {
                    return (rs = n._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = n.asm.sh).apply(null, arguments)
                },
                ps = n._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function () {
                    return (ps = n._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = n.asm.th).apply(null, arguments)
                },
                ss = n._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = function () {
                    return (ss = n._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = n.asm.uh).apply(null, arguments)
                },
                cs = n._emscripten_bind_btManifoldPoint_getDistance_0 = function () {
                    return (cs = n._emscripten_bind_btManifoldPoint_getDistance_0 = n.asm.vh).apply(null, arguments)
                },
                as = n._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function () {
                    return (as = n._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = n.asm.wh).apply(null, arguments)
                },
                ls = n._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function () {
                    return (ls = n._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = n.asm.xh).apply(null, arguments)
                },
                us = n._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = function () {
                    return (us = n._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = n.asm.yh).apply(null, arguments)
                },
                bs = n._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function () {
                    return (bs = n._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = n.asm.zh).apply(null, arguments)
                },
                ms = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function () {
                    return (ms = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = n.asm.Ah).apply(null, arguments)
                },
                ys = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = function () {
                    return (ys = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = n.asm.Bh).apply(null, arguments)
                },
                ds = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function () {
                    return (ds = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = n.asm.Ch).apply(null, arguments)
                },
                fs = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function () {
                    return (fs = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = n.asm.Dh).apply(null, arguments)
                },
                hs = n._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function () {
                    return (hs = n._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = n.asm.Eh).apply(null, arguments)
                },
                Bs = n._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function () {
                    return (Bs = n._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = n.asm.Fh).apply(null, arguments)
                },
                gs = n._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function () {
                    return (gs = n._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = n.asm.Gh).apply(null, arguments)
                },
                ks = n._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function () {
                    return (ks = n._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = n.asm.Hh).apply(null, arguments)
                },
                Cs = n._emscripten_bind_btManifoldPoint___destroy___0 = function () {
                    return (Cs = n._emscripten_bind_btManifoldPoint___destroy___0 = n.asm.Ih).apply(null, arguments)
                },
                Ss = n._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = function () {
                    return (Ss = n._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = n.asm.Jh).apply(null, arguments)
                },
                js = n._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = function () {
                    return (js = n._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = n.asm.Kh).apply(null, arguments)
                },
                vs = n._emscripten_bind_ConcreteContactResultCallback___destroy___0 = function () {
                    return (vs = n._emscripten_bind_ConcreteContactResultCallback___destroy___0 = n.asm.Lh).apply(null, arguments)
                },
                Is = n._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function () {
                    return (Is = n._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = n.asm.Mh).apply(null, arguments)
                },
                Rs = n._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function () {
                    return (Rs = n._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = n.asm.Nh).apply(null, arguments)
                },
                Ds = n._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function () {
                    return (Ds = n._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = n.asm.Oh).apply(null, arguments)
                },
                Ps = n._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function () {
                    return (Ps = n._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = n.asm.Ph).apply(null, arguments)
                },
                Ts = n._emscripten_bind_LocalShapeInfo___destroy___0 = function () {
                    return (Ts = n._emscripten_bind_LocalShapeInfo___destroy___0 = n.asm.Qh).apply(null, arguments)
                },
                Os = n._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function () {
                    return (Os = n._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = n.asm.Rh).apply(null, arguments)
                },
                Ws = n._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function () {
                    return (Ws = n._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = n.asm.Sh).apply(null, arguments)
                },
                As = n._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function () {
                    return (As = n._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = n.asm.Th).apply(null, arguments)
                },
                Ms = n._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = function () {
                    return (Ms = n._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = n.asm.Uh).apply(null, arguments)
                },
                xs = n._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function () {
                    return (xs = n._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = n.asm.Vh).apply(null, arguments)
                },
                Fs = n._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function () {
                    return (Fs = n._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = n.asm.Wh).apply(null, arguments)
                },
                Ls = n._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function () {
                    return (Ls = n._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = n.asm.Xh).apply(null, arguments)
                },
                Gs = n._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = function () {
                    return (Gs = n._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = n.asm.Yh).apply(null, arguments)
                },
                ws = n._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function () {
                    return (ws = n._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = n.asm.Zh).apply(null, arguments)
                },
                Hs = n._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function () {
                    return (Hs = n._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = n.asm._h).apply(null, arguments)
                },
                Vs = n._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function () {
                    return (Vs = n._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = n.asm.$h).apply(null, arguments)
                },
                Es = n._emscripten_bind_LocalConvexResult___destroy___0 = function () {
                    return (Es = n._emscripten_bind_LocalConvexResult___destroy___0 = n.asm.ai).apply(null, arguments)
                },
                Ns = n._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = function () {
                    return (Ns = n._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = n.asm.bi).apply(null, arguments)
                },
                Us = n._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function () {
                    return (Us = n._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = n.asm.ci).apply(null, arguments)
                },
                zs = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = function () {
                    return (zs = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = n.asm.di).apply(null, arguments)
                },
                qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = function () {
                    return (qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = n.asm.ei).apply(null, arguments)
                },
                Ks = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function () {
                    return (Ks = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = n.asm.fi).apply(null, arguments)
                },
                Qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = function () {
                    return (Qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = n.asm.gi).apply(null, arguments)
                },
                Xs = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function () {
                    return (Xs = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = n.asm.hi).apply(null, arguments)
                },
                Zs = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function () {
                    return (Zs = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = n.asm.ii).apply(null, arguments)
                },
                Ys = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function () {
                    return (Ys = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = n.asm.ji).apply(null, arguments)
                },
                Js = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function () {
                    return (Js = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = n.asm.ki).apply(null, arguments)
                },
                $s = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function () {
                    return ($s = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = n.asm.li).apply(null, arguments)
                },
                tc = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function () {
                    return (tc = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = n.asm.mi).apply(null, arguments)
                },
                ec = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
                    return (ec = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = n.asm.ni).apply(null, arguments)
                },
                nc = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
                    return (nc = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = n.asm.oi).apply(null, arguments)
                },
                oc = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function () {
                    return (oc = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = n.asm.pi).apply(null, arguments)
                },
                _c = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function () {
                    return (_c = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = n.asm.qi).apply(null, arguments)
                },
                ic = n._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = function () {
                    return (ic = n._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = n.asm.ri).apply(null, arguments)
                },
                rc = n._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function () {
                    return (rc = n._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = n.asm.si).apply(null, arguments)
                },
                pc = n._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function () {
                    return (pc = n._emscripten_bind_ClosestConvexResultCallback___destroy___0 = n.asm.ti).apply(null, arguments)
                },
                sc = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function () {
                    return (sc = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = n.asm.ui).apply(null, arguments)
                },
                cc = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = function () {
                    return (cc = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = n.asm.vi).apply(null, arguments)
                },
                ac = n._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function () {
                    return (ac = n._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = n.asm.wi).apply(null, arguments)
                },
                lc = n._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function () {
                    return (lc = n._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = n.asm.xi).apply(null, arguments)
                },
                uc = n._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function () {
                    return (uc = n._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = n.asm.yi).apply(null, arguments)
                },
                bc = n._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function () {
                    return (bc = n._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = n.asm.zi).apply(null, arguments)
                },
                mc = n._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function () {
                    return (mc = n._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = n.asm.Ai).apply(null, arguments)
                },
                yc = n._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function () {
                    return (yc = n._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = n.asm.Bi).apply(null, arguments)
                },
                dc = n._emscripten_bind_btBoxShape_btBoxShape_1 = function () {
                    return (dc = n._emscripten_bind_btBoxShape_btBoxShape_1 = n.asm.Ci).apply(null, arguments)
                },
                fc = n._emscripten_bind_btBoxShape_setMargin_1 = function () {
                    return (fc = n._emscripten_bind_btBoxShape_setMargin_1 = n.asm.Di).apply(null, arguments)
                },
                hc = n._emscripten_bind_btBoxShape_getMargin_0 = function () {
                    return (hc = n._emscripten_bind_btBoxShape_getMargin_0 = n.asm.Ei).apply(null, arguments)
                },
                Bc = n._emscripten_bind_btBoxShape_setLocalScaling_1 = function () {
                    return (Bc = n._emscripten_bind_btBoxShape_setLocalScaling_1 = n.asm.Fi).apply(null, arguments)
                },
                gc = n._emscripten_bind_btBoxShape_getLocalScaling_0 = function () {
                    return (gc = n._emscripten_bind_btBoxShape_getLocalScaling_0 = n.asm.Gi).apply(null, arguments)
                },
                kc = n._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function () {
                    return (kc = n._emscripten_bind_btBoxShape_calculateLocalInertia_2 = n.asm.Hi).apply(null, arguments)
                },
                Cc = n._emscripten_bind_btBoxShape___destroy___0 = function () {
                    return (Cc = n._emscripten_bind_btBoxShape___destroy___0 = n.asm.Ii).apply(null, arguments)
                },
                Sc = n._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = function () {
                    return (Sc = n._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = n.asm.Ji).apply(null, arguments)
                },
                jc = n._emscripten_bind_btCapsuleShapeX_setMargin_1 = function () {
                    return (jc = n._emscripten_bind_btCapsuleShapeX_setMargin_1 = n.asm.Ki).apply(null, arguments)
                },
                vc = n._emscripten_bind_btCapsuleShapeX_getMargin_0 = function () {
                    return (vc = n._emscripten_bind_btCapsuleShapeX_getMargin_0 = n.asm.Li).apply(null, arguments)
                },
                Ic = n._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = function () {
                    return (Ic = n._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = n.asm.Mi).apply(null, arguments)
                },
                Rc = n._emscripten_bind_btCapsuleShapeX_getRadius_0 = function () {
                    return (Rc = n._emscripten_bind_btCapsuleShapeX_getRadius_0 = n.asm.Ni).apply(null, arguments)
                },
                Dc = n._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function () {
                    return (Dc = n._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = n.asm.Oi).apply(null, arguments)
                },
                Pc = n._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function () {
                    return (Pc = n._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = n.asm.Pi).apply(null, arguments)
                },
                Tc = n._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function () {
                    return (Tc = n._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = n.asm.Qi).apply(null, arguments)
                },
                Oc = n._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = function () {
                    return (Oc = n._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = n.asm.Ri).apply(null, arguments)
                },
                Wc = n._emscripten_bind_btCapsuleShapeX___destroy___0 = function () {
                    return (Wc = n._emscripten_bind_btCapsuleShapeX___destroy___0 = n.asm.Si).apply(null, arguments)
                },
                Ac = n._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = function () {
                    return (Ac = n._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = n.asm.Ti).apply(null, arguments)
                },
                Mc = n._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function () {
                    return (Mc = n._emscripten_bind_btCapsuleShapeZ_setMargin_1 = n.asm.Ui).apply(null, arguments)
                },
                xc = n._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function () {
                    return (xc = n._emscripten_bind_btCapsuleShapeZ_getMargin_0 = n.asm.Vi).apply(null, arguments)
                },
                Fc = n._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = function () {
                    return (Fc = n._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = n.asm.Wi).apply(null, arguments)
                },
                Lc = n._emscripten_bind_btCapsuleShapeZ_getRadius_0 = function () {
                    return (Lc = n._emscripten_bind_btCapsuleShapeZ_getRadius_0 = n.asm.Xi).apply(null, arguments)
                },
                Gc = n._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function () {
                    return (Gc = n._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = n.asm.Yi).apply(null, arguments)
                },
                wc = n._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function () {
                    return (wc = n._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = n.asm.Zi).apply(null, arguments)
                },
                Hc = n._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function () {
                    return (Hc = n._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = n.asm._i).apply(null, arguments)
                },
                Vc = n._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = function () {
                    return (Vc = n._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = n.asm.$i).apply(null, arguments)
                },
                Ec = n._emscripten_bind_btCapsuleShapeZ___destroy___0 = function () {
                    return (Ec = n._emscripten_bind_btCapsuleShapeZ___destroy___0 = n.asm.aj).apply(null, arguments)
                },
                Nc = n._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function () {
                    return (Nc = n._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = n.asm.bj).apply(null, arguments)
                },
                Uc = n._emscripten_bind_btCylinderShapeX_setMargin_1 = function () {
                    return (Uc = n._emscripten_bind_btCylinderShapeX_setMargin_1 = n.asm.cj).apply(null, arguments)
                },
                zc = n._emscripten_bind_btCylinderShapeX_getMargin_0 = function () {
                    return (zc = n._emscripten_bind_btCylinderShapeX_getMargin_0 = n.asm.dj).apply(null, arguments)
                },
                qc = n._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = function () {
                    return (qc = n._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = n.asm.ej).apply(null, arguments)
                },
                Kc = n._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = function () {
                    return (Kc = n._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = n.asm.fj).apply(null, arguments)
                },
                Qc = n._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function () {
                    return (Qc = n._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = n.asm.gj).apply(null, arguments)
                },
                Xc = n._emscripten_bind_btCylinderShapeX___destroy___0 = function () {
                    return (Xc = n._emscripten_bind_btCylinderShapeX___destroy___0 = n.asm.hj).apply(null, arguments)
                },
                Zc = n._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = function () {
                    return (Zc = n._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = n.asm.ij).apply(null, arguments)
                },
                Yc = n._emscripten_bind_btCylinderShapeZ_setMargin_1 = function () {
                    return (Yc = n._emscripten_bind_btCylinderShapeZ_setMargin_1 = n.asm.jj).apply(null, arguments)
                },
                Jc = n._emscripten_bind_btCylinderShapeZ_getMargin_0 = function () {
                    return (Jc = n._emscripten_bind_btCylinderShapeZ_getMargin_0 = n.asm.kj).apply(null, arguments)
                },
                $c = n._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function () {
                    return ($c = n._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = n.asm.lj).apply(null, arguments)
                },
                ta = n._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = function () {
                    return (ta = n._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = n.asm.mj).apply(null, arguments)
                },
                ea = n._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function () {
                    return (ea = n._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = n.asm.nj).apply(null, arguments)
                },
                na = n._emscripten_bind_btCylinderShapeZ___destroy___0 = function () {
                    return (na = n._emscripten_bind_btCylinderShapeZ___destroy___0 = n.asm.oj).apply(null, arguments)
                },
                oa = n._emscripten_bind_btSphereShape_btSphereShape_1 = function () {
                    return (oa = n._emscripten_bind_btSphereShape_btSphereShape_1 = n.asm.pj).apply(null, arguments)
                },
                _a = n._emscripten_bind_btSphereShape_setMargin_1 = function () {
                    return (_a = n._emscripten_bind_btSphereShape_setMargin_1 = n.asm.qj).apply(null, arguments)
                },
                ia = n._emscripten_bind_btSphereShape_getMargin_0 = function () {
                    return (ia = n._emscripten_bind_btSphereShape_getMargin_0 = n.asm.rj).apply(null, arguments)
                },
                ra = n._emscripten_bind_btSphereShape_setLocalScaling_1 = function () {
                    return (ra = n._emscripten_bind_btSphereShape_setLocalScaling_1 = n.asm.sj).apply(null, arguments)
                },
                pa = n._emscripten_bind_btSphereShape_getLocalScaling_0 = function () {
                    return (pa = n._emscripten_bind_btSphereShape_getLocalScaling_0 = n.asm.tj).apply(null, arguments)
                },
                sa = n._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function () {
                    return (sa = n._emscripten_bind_btSphereShape_calculateLocalInertia_2 = n.asm.uj).apply(null, arguments)
                },
                ca = n._emscripten_bind_btSphereShape___destroy___0 = function () {
                    return (ca = n._emscripten_bind_btSphereShape___destroy___0 = n.asm.vj).apply(null, arguments)
                },
                aa = n._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = function () {
                    return (aa = n._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = n.asm.wj).apply(null, arguments)
                },
                la = n._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = function () {
                    return (la = n._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = n.asm.xj).apply(null, arguments)
                },
                ua = n._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = function () {
                    return (ua = n._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = n.asm.yj).apply(null, arguments)
                },
                ba = n._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = function () {
                    return (ba = n._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = n.asm.zj).apply(null, arguments)
                },
                ma = n._emscripten_bind_btMultiSphereShape___destroy___0 = function () {
                    return (ma = n._emscripten_bind_btMultiSphereShape___destroy___0 = n.asm.Aj).apply(null, arguments)
                },
                ya = n._emscripten_bind_btConeShapeX_btConeShapeX_2 = function () {
                    return (ya = n._emscripten_bind_btConeShapeX_btConeShapeX_2 = n.asm.Bj).apply(null, arguments)
                },
                da = n._emscripten_bind_btConeShapeX_setLocalScaling_1 = function () {
                    return (da = n._emscripten_bind_btConeShapeX_setLocalScaling_1 = n.asm.Cj).apply(null, arguments)
                },
                fa = n._emscripten_bind_btConeShapeX_getLocalScaling_0 = function () {
                    return (fa = n._emscripten_bind_btConeShapeX_getLocalScaling_0 = n.asm.Dj).apply(null, arguments)
                },
                ha = n._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function () {
                    return (ha = n._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = n.asm.Ej).apply(null, arguments)
                },
                Ba = n._emscripten_bind_btConeShapeX___destroy___0 = function () {
                    return (Ba = n._emscripten_bind_btConeShapeX___destroy___0 = n.asm.Fj).apply(null, arguments)
                },
                ga = n._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function () {
                    return (ga = n._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = n.asm.Gj).apply(null, arguments)
                },
                ka = n._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function () {
                    return (ka = n._emscripten_bind_btConeShapeZ_setLocalScaling_1 = n.asm.Hj).apply(null, arguments)
                },
                Ca = n._emscripten_bind_btConeShapeZ_getLocalScaling_0 = function () {
                    return (Ca = n._emscripten_bind_btConeShapeZ_getLocalScaling_0 = n.asm.Ij).apply(null, arguments)
                },
                Sa = n._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function () {
                    return (Sa = n._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = n.asm.Jj).apply(null, arguments)
                },
                ja = n._emscripten_bind_btConeShapeZ___destroy___0 = function () {
                    return (ja = n._emscripten_bind_btConeShapeZ___destroy___0 = n.asm.Kj).apply(null, arguments)
                },
                va = n._emscripten_bind_btIntArray_size_0 = function () {
                    return (va = n._emscripten_bind_btIntArray_size_0 = n.asm.Lj).apply(null, arguments)
                },
                Ia = n._emscripten_bind_btIntArray_at_1 = function () {
                    return (Ia = n._emscripten_bind_btIntArray_at_1 = n.asm.Mj).apply(null, arguments)
                },
                Ra = n._emscripten_bind_btIntArray___destroy___0 = function () {
                    return (Ra = n._emscripten_bind_btIntArray___destroy___0 = n.asm.Nj).apply(null, arguments)
                },
                Da = n._emscripten_bind_btFace_get_m_indices_0 = function () {
                    return (Da = n._emscripten_bind_btFace_get_m_indices_0 = n.asm.Oj).apply(null, arguments)
                },
                Pa = n._emscripten_bind_btFace_set_m_indices_1 = function () {
                    return (Pa = n._emscripten_bind_btFace_set_m_indices_1 = n.asm.Pj).apply(null, arguments)
                },
                Ta = n._emscripten_bind_btFace_get_m_plane_1 = function () {
                    return (Ta = n._emscripten_bind_btFace_get_m_plane_1 = n.asm.Qj).apply(null, arguments)
                },
                Oa = n._emscripten_bind_btFace_set_m_plane_2 = function () {
                    return (Oa = n._emscripten_bind_btFace_set_m_plane_2 = n.asm.Rj).apply(null, arguments)
                },
                Wa = n._emscripten_bind_btFace___destroy___0 = function () {
                    return (Wa = n._emscripten_bind_btFace___destroy___0 = n.asm.Sj).apply(null, arguments)
                },
                Aa = n._emscripten_bind_btVector3Array_size_0 = function () {
                    return (Aa = n._emscripten_bind_btVector3Array_size_0 = n.asm.Tj).apply(null, arguments)
                },
                Ma = n._emscripten_bind_btVector3Array_at_1 = function () {
                    return (Ma = n._emscripten_bind_btVector3Array_at_1 = n.asm.Uj).apply(null, arguments)
                },
                xa = n._emscripten_bind_btVector3Array___destroy___0 = function () {
                    return (xa = n._emscripten_bind_btVector3Array___destroy___0 = n.asm.Vj).apply(null, arguments)
                },
                Fa = n._emscripten_bind_btFaceArray_size_0 = function () {
                    return (Fa = n._emscripten_bind_btFaceArray_size_0 = n.asm.Wj).apply(null, arguments)
                },
                La = n._emscripten_bind_btFaceArray_at_1 = function () {
                    return (La = n._emscripten_bind_btFaceArray_at_1 = n.asm.Xj).apply(null, arguments)
                },
                Ga = n._emscripten_bind_btFaceArray___destroy___0 = function () {
                    return (Ga = n._emscripten_bind_btFaceArray___destroy___0 = n.asm.Yj).apply(null, arguments)
                },
                wa = n._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function () {
                    return (wa = n._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = n.asm.Zj).apply(null, arguments)
                },
                Ha = n._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = function () {
                    return (Ha = n._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = n.asm._j).apply(null, arguments)
                },
                Va = n._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function () {
                    return (Va = n._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = n.asm.$j).apply(null, arguments)
                },
                Ea = n._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = function () {
                    return (Ea = n._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = n.asm.ak).apply(null, arguments)
                },
                Na = n._emscripten_bind_btConvexPolyhedron___destroy___0 = function () {
                    return (Na = n._emscripten_bind_btConvexPolyhedron___destroy___0 = n.asm.bk).apply(null, arguments)
                },
                Ua = n._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = function () {
                    return (Ua = n._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = n.asm.ck).apply(null, arguments)
                },
                za = n._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function () {
                    return (za = n._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = n.asm.dk).apply(null, arguments)
                },
                qa = n._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = function () {
                    return (qa = n._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = n.asm.ek).apply(null, arguments)
                },
                Ka = n._emscripten_bind_btConvexHullShape_addPoint_1 = function () {
                    return (Ka = n._emscripten_bind_btConvexHullShape_addPoint_1 = n.asm.fk).apply(null, arguments)
                },
                Qa = n._emscripten_bind_btConvexHullShape_addPoint_2 = function () {
                    return (Qa = n._emscripten_bind_btConvexHullShape_addPoint_2 = n.asm.gk).apply(null, arguments)
                },
                Xa = n._emscripten_bind_btConvexHullShape_setMargin_1 = function () {
                    return (Xa = n._emscripten_bind_btConvexHullShape_setMargin_1 = n.asm.hk).apply(null, arguments)
                },
                Za = n._emscripten_bind_btConvexHullShape_getMargin_0 = function () {
                    return (Za = n._emscripten_bind_btConvexHullShape_getMargin_0 = n.asm.ik).apply(null, arguments)
                },
                Ya = n._emscripten_bind_btConvexHullShape_getNumVertices_0 = function () {
                    return (Ya = n._emscripten_bind_btConvexHullShape_getNumVertices_0 = n.asm.jk).apply(null, arguments)
                },
                Ja = n._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function () {
                    return (Ja = n._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = n.asm.kk).apply(null, arguments)
                },
                $a = n._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function () {
                    return ($a = n._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = n.asm.lk).apply(null, arguments)
                },
                tl = n._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function () {
                    return (tl = n._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = n.asm.mk).apply(null, arguments)
                },
                el = n._emscripten_bind_btConvexHullShape_setLocalScaling_1 = function () {
                    return (el = n._emscripten_bind_btConvexHullShape_setLocalScaling_1 = n.asm.nk).apply(null, arguments)
                },
                nl = n._emscripten_bind_btConvexHullShape_getLocalScaling_0 = function () {
                    return (nl = n._emscripten_bind_btConvexHullShape_getLocalScaling_0 = n.asm.ok).apply(null, arguments)
                },
                ol = n._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function () {
                    return (ol = n._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = n.asm.pk).apply(null, arguments)
                },
                _l = n._emscripten_bind_btConvexHullShape___destroy___0 = function () {
                    return (_l = n._emscripten_bind_btConvexHullShape___destroy___0 = n.asm.qk).apply(null, arguments)
                },
                il = n._emscripten_bind_btShapeHull_btShapeHull_1 = function () {
                    return (il = n._emscripten_bind_btShapeHull_btShapeHull_1 = n.asm.rk).apply(null, arguments)
                },
                rl = n._emscripten_bind_btShapeHull_buildHull_1 = function () {
                    return (rl = n._emscripten_bind_btShapeHull_buildHull_1 = n.asm.sk).apply(null, arguments)
                },
                pl = n._emscripten_bind_btShapeHull_numVertices_0 = function () {
                    return (pl = n._emscripten_bind_btShapeHull_numVertices_0 = n.asm.tk).apply(null, arguments)
                },
                sl = n._emscripten_bind_btShapeHull_getVertexPointer_0 = function () {
                    return (sl = n._emscripten_bind_btShapeHull_getVertexPointer_0 = n.asm.uk).apply(null, arguments)
                },
                cl = n._emscripten_bind_btShapeHull___destroy___0 = function () {
                    return (cl = n._emscripten_bind_btShapeHull___destroy___0 = n.asm.vk).apply(null, arguments)
                },
                al = n._emscripten_bind_btCompoundShape_btCompoundShape_0 = function () {
                    return (al = n._emscripten_bind_btCompoundShape_btCompoundShape_0 = n.asm.wk).apply(null, arguments)
                },
                ll = n._emscripten_bind_btCompoundShape_btCompoundShape_1 = function () {
                    return (ll = n._emscripten_bind_btCompoundShape_btCompoundShape_1 = n.asm.xk).apply(null, arguments)
                },
                ul = n._emscripten_bind_btCompoundShape_addChildShape_2 = function () {
                    return (ul = n._emscripten_bind_btCompoundShape_addChildShape_2 = n.asm.yk).apply(null, arguments)
                },
                bl = n._emscripten_bind_btCompoundShape_removeChildShape_1 = function () {
                    return (bl = n._emscripten_bind_btCompoundShape_removeChildShape_1 = n.asm.zk).apply(null, arguments)
                },
                ml = n._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function () {
                    return (ml = n._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = n.asm.Ak).apply(null, arguments)
                },
                yl = n._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function () {
                    return (yl = n._emscripten_bind_btCompoundShape_getNumChildShapes_0 = n.asm.Bk).apply(null, arguments)
                },
                dl = n._emscripten_bind_btCompoundShape_getChildShape_1 = function () {
                    return (dl = n._emscripten_bind_btCompoundShape_getChildShape_1 = n.asm.Ck).apply(null, arguments)
                },
                fl = n._emscripten_bind_btCompoundShape_updateChildTransform_2 = function () {
                    return (fl = n._emscripten_bind_btCompoundShape_updateChildTransform_2 = n.asm.Dk).apply(null, arguments)
                },
                hl = n._emscripten_bind_btCompoundShape_updateChildTransform_3 = function () {
                    return (hl = n._emscripten_bind_btCompoundShape_updateChildTransform_3 = n.asm.Ek).apply(null, arguments)
                },
                Bl = n._emscripten_bind_btCompoundShape_setMargin_1 = function () {
                    return (Bl = n._emscripten_bind_btCompoundShape_setMargin_1 = n.asm.Fk).apply(null, arguments)
                },
                gl = n._emscripten_bind_btCompoundShape_getMargin_0 = function () {
                    return (gl = n._emscripten_bind_btCompoundShape_getMargin_0 = n.asm.Gk).apply(null, arguments)
                },
                kl = n._emscripten_bind_btCompoundShape_setLocalScaling_1 = function () {
                    return (kl = n._emscripten_bind_btCompoundShape_setLocalScaling_1 = n.asm.Hk).apply(null, arguments)
                },
                Cl = n._emscripten_bind_btCompoundShape_getLocalScaling_0 = function () {
                    return (Cl = n._emscripten_bind_btCompoundShape_getLocalScaling_0 = n.asm.Ik).apply(null, arguments)
                },
                Sl = n._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function () {
                    return (Sl = n._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = n.asm.Jk).apply(null, arguments)
                },
                jl = n._emscripten_bind_btCompoundShape___destroy___0 = function () {
                    return (jl = n._emscripten_bind_btCompoundShape___destroy___0 = n.asm.Kk).apply(null, arguments)
                },
                vl = n._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = function () {
                    return (vl = n._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = n.asm.Lk).apply(null, arguments)
                },
                Il = n._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = function () {
                    return (Il = n._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = n.asm.Mk).apply(null, arguments)
                },
                Rl = n._emscripten_bind_btIndexedMesh___destroy___0 = function () {
                    return (Rl = n._emscripten_bind_btIndexedMesh___destroy___0 = n.asm.Nk).apply(null, arguments)
                },
                Dl = n._emscripten_bind_btIndexedMeshArray_size_0 = function () {
                    return (Dl = n._emscripten_bind_btIndexedMeshArray_size_0 = n.asm.Ok).apply(null, arguments)
                },
                Pl = n._emscripten_bind_btIndexedMeshArray_at_1 = function () {
                    return (Pl = n._emscripten_bind_btIndexedMeshArray_at_1 = n.asm.Pk).apply(null, arguments)
                },
                Tl = n._emscripten_bind_btIndexedMeshArray___destroy___0 = function () {
                    return (Tl = n._emscripten_bind_btIndexedMeshArray___destroy___0 = n.asm.Qk).apply(null, arguments)
                },
                Ol = n._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = function () {
                    return (Ol = n._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = n.asm.Rk).apply(null, arguments)
                },
                Wl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function () {
                    return (Wl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = n.asm.Sk).apply(null, arguments)
                },
                Al = n._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function () {
                    return (Al = n._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = n.asm.Tk).apply(null, arguments)
                },
                Ml = n._emscripten_bind_btTriangleMesh_addTriangle_3 = function () {
                    return (Ml = n._emscripten_bind_btTriangleMesh_addTriangle_3 = n.asm.Uk).apply(null, arguments)
                },
                xl = n._emscripten_bind_btTriangleMesh_addTriangle_4 = function () {
                    return (xl = n._emscripten_bind_btTriangleMesh_addTriangle_4 = n.asm.Vk).apply(null, arguments)
                },
                Fl = n._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = function () {
                    return (Fl = n._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = n.asm.Wk).apply(null, arguments)
                },
                Ll = n._emscripten_bind_btTriangleMesh_addIndex_1 = function () {
                    return (Ll = n._emscripten_bind_btTriangleMesh_addIndex_1 = n.asm.Xk).apply(null, arguments)
                },
                Gl = n._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = function () {
                    return (Gl = n._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = n.asm.Yk).apply(null, arguments)
                },
                wl = n._emscripten_bind_btTriangleMesh_setScaling_1 = function () {
                    return (wl = n._emscripten_bind_btTriangleMesh_setScaling_1 = n.asm.Zk).apply(null, arguments)
                },
                Hl = n._emscripten_bind_btTriangleMesh___destroy___0 = function () {
                    return (Hl = n._emscripten_bind_btTriangleMesh___destroy___0 = n.asm._k).apply(null, arguments)
                },
                Vl = n._emscripten_bind_btEmptyShape_btEmptyShape_0 = function () {
                    return (Vl = n._emscripten_bind_btEmptyShape_btEmptyShape_0 = n.asm.$k).apply(null, arguments)
                },
                El = n._emscripten_bind_btEmptyShape_setLocalScaling_1 = function () {
                    return (El = n._emscripten_bind_btEmptyShape_setLocalScaling_1 = n.asm.al).apply(null, arguments)
                },
                Nl = n._emscripten_bind_btEmptyShape_getLocalScaling_0 = function () {
                    return (Nl = n._emscripten_bind_btEmptyShape_getLocalScaling_0 = n.asm.bl).apply(null, arguments)
                },
                Ul = n._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = function () {
                    return (Ul = n._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = n.asm.cl).apply(null, arguments)
                },
                zl = n._emscripten_bind_btEmptyShape___destroy___0 = function () {
                    return (zl = n._emscripten_bind_btEmptyShape___destroy___0 = n.asm.dl).apply(null, arguments)
                },
                ql = n._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function () {
                    return (ql = n._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = n.asm.el).apply(null, arguments)
                },
                Kl = n._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = function () {
                    return (Kl = n._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = n.asm.fl).apply(null, arguments)
                },
                Ql = n._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function () {
                    return (Ql = n._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = n.asm.gl).apply(null, arguments)
                },
                Xl = n._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = function () {
                    return (Xl = n._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = n.asm.hl).apply(null, arguments)
                },
                Zl = n._emscripten_bind_btStaticPlaneShape___destroy___0 = function () {
                    return (Zl = n._emscripten_bind_btStaticPlaneShape___destroy___0 = n.asm.il).apply(null, arguments)
                },
                Yl = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function () {
                    return (Yl = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = n.asm.jl).apply(null, arguments)
                },
                Jl = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function () {
                    return (Jl = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = n.asm.kl).apply(null, arguments)
                },
                $l = n._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function () {
                    return ($l = n._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = n.asm.ll).apply(null, arguments)
                },
                tu = n._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function () {
                    return (tu = n._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = n.asm.ml).apply(null, arguments)
                },
                eu = n._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = function () {
                    return (eu = n._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = n.asm.nl).apply(null, arguments)
                },
                nu = n._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function () {
                    return (nu = n._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = n.asm.ol).apply(null, arguments)
                },
                ou = n._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function () {
                    return (ou = n._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = n.asm.pl).apply(null, arguments)
                },
                _u = n._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function () {
                    return (_u = n._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = n.asm.ql).apply(null, arguments)
                },
                iu = n._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function () {
                    return (iu = n._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = n.asm.rl).apply(null, arguments)
                },
                ru = n._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function () {
                    return (ru = n._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = n.asm.sl).apply(null, arguments)
                },
                pu = n._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function () {
                    return (pu = n._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = n.asm.tl).apply(null, arguments)
                },
                su = n._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function () {
                    return (su = n._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = n.asm.ul).apply(null, arguments)
                },
                cu = n._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = function () {
                    return (cu = n._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = n.asm.vl).apply(null, arguments)
                },
                au = n._emscripten_bind_btAABB_btAABB_4 = function () {
                    return (au = n._emscripten_bind_btAABB_btAABB_4 = n.asm.wl).apply(null, arguments)
                },
                lu = n._emscripten_bind_btAABB_invalidate_0 = function () {
                    return (lu = n._emscripten_bind_btAABB_invalidate_0 = n.asm.xl).apply(null, arguments)
                },
                uu = n._emscripten_bind_btAABB_increment_margin_1 = function () {
                    return (uu = n._emscripten_bind_btAABB_increment_margin_1 = n.asm.yl).apply(null, arguments)
                },
                bu = n._emscripten_bind_btAABB_copy_with_margin_2 = function () {
                    return (bu = n._emscripten_bind_btAABB_copy_with_margin_2 = n.asm.zl).apply(null, arguments)
                },
                mu = n._emscripten_bind_btAABB___destroy___0 = function () {
                    return (mu = n._emscripten_bind_btAABB___destroy___0 = n.asm.Al).apply(null, arguments)
                },
                yu = n._emscripten_bind_btPrimitiveTriangle_btPrimitiveTriangle_0 = function () {
                    return (yu = n._emscripten_bind_btPrimitiveTriangle_btPrimitiveTriangle_0 = n.asm.Bl).apply(null, arguments)
                },
                du = n._emscripten_bind_btPrimitiveTriangle___destroy___0 = function () {
                    return (du = n._emscripten_bind_btPrimitiveTriangle___destroy___0 = n.asm.Cl).apply(null, arguments)
                },
                fu = n._emscripten_bind_btTriangleShapeEx_btTriangleShapeEx_3 = function () {
                    return (fu = n._emscripten_bind_btTriangleShapeEx_btTriangleShapeEx_3 = n.asm.Dl).apply(null, arguments)
                },
                hu = n._emscripten_bind_btTriangleShapeEx_getAabb_3 = function () {
                    return (hu = n._emscripten_bind_btTriangleShapeEx_getAabb_3 = n.asm.El).apply(null, arguments)
                },
                Bu = n._emscripten_bind_btTriangleShapeEx_applyTransform_1 = function () {
                    return (Bu = n._emscripten_bind_btTriangleShapeEx_applyTransform_1 = n.asm.Fl).apply(null, arguments)
                },
                gu = n._emscripten_bind_btTriangleShapeEx_buildTriPlane_1 = function () {
                    return (gu = n._emscripten_bind_btTriangleShapeEx_buildTriPlane_1 = n.asm.Gl).apply(null, arguments)
                },
                ku = n._emscripten_bind_btTriangleShapeEx___destroy___0 = function () {
                    return (ku = n._emscripten_bind_btTriangleShapeEx___destroy___0 = n.asm.Hl).apply(null, arguments)
                },
                Cu = n._emscripten_bind_btTetrahedronShapeEx_btTetrahedronShapeEx_0 = function () {
                    return (Cu = n._emscripten_bind_btTetrahedronShapeEx_btTetrahedronShapeEx_0 = n.asm.Il).apply(null, arguments)
                },
                Su = n._emscripten_bind_btTetrahedronShapeEx_setVertices_4 = function () {
                    return (Su = n._emscripten_bind_btTetrahedronShapeEx_setVertices_4 = n.asm.Jl).apply(null, arguments)
                },
                ju = n._emscripten_bind_btTetrahedronShapeEx___destroy___0 = function () {
                    return (ju = n._emscripten_bind_btTetrahedronShapeEx___destroy___0 = n.asm.Kl).apply(null, arguments)
                },
                vu = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_count_0 = function () {
                    return (vu = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_count_0 = n.asm.Ll).apply(null, arguments)
                },
                Iu = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_box_2 = function () {
                    return (Iu = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_box_2 = n.asm.Ml).apply(null, arguments)
                },
                Ru = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_triangle_2 = function () {
                    return (Ru = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_triangle_2 = n.asm.Nl).apply(null, arguments)
                },
                Du = n._emscripten_bind_CompoundPrimitiveManager_is_trimesh_0 = function () {
                    return (Du = n._emscripten_bind_CompoundPrimitiveManager_is_trimesh_0 = n.asm.Ol).apply(null, arguments)
                },
                Pu = n._emscripten_bind_CompoundPrimitiveManager_get_m_compoundShape_0 = function () {
                    return (Pu = n._emscripten_bind_CompoundPrimitiveManager_get_m_compoundShape_0 = n.asm.Pl).apply(null, arguments)
                },
                Tu = n._emscripten_bind_CompoundPrimitiveManager_set_m_compoundShape_1 = function () {
                    return (Tu = n._emscripten_bind_CompoundPrimitiveManager_set_m_compoundShape_1 = n.asm.Ql).apply(null, arguments)
                },
                Ou = n._emscripten_bind_CompoundPrimitiveManager___destroy___0 = function () {
                    return (Ou = n._emscripten_bind_CompoundPrimitiveManager___destroy___0 = n.asm.Rl).apply(null, arguments)
                },
                Wu = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_0 = function () {
                    return (Wu = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_0 = n.asm.Sl).apply(null, arguments)
                },
                Au = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_1 = function () {
                    return (Au = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_1 = n.asm.Tl).apply(null, arguments)
                },
                Mu = n._emscripten_bind_btGImpactCompoundShape_childrenHasTransform_0 = function () {
                    return (Mu = n._emscripten_bind_btGImpactCompoundShape_childrenHasTransform_0 = n.asm.Ul).apply(null, arguments)
                },
                xu = n._emscripten_bind_btGImpactCompoundShape_getPrimitiveManager_0 = function () {
                    return (xu = n._emscripten_bind_btGImpactCompoundShape_getPrimitiveManager_0 = n.asm.Vl).apply(null, arguments)
                },
                Fu = n._emscripten_bind_btGImpactCompoundShape_getCompoundPrimitiveManager_0 = function () {
                    return (Fu = n._emscripten_bind_btGImpactCompoundShape_getCompoundPrimitiveManager_0 = n.asm.Wl).apply(null, arguments)
                },
                Lu = n._emscripten_bind_btGImpactCompoundShape_getNumChildShapes_0 = function () {
                    return (Lu = n._emscripten_bind_btGImpactCompoundShape_getNumChildShapes_0 = n.asm.Xl).apply(null, arguments)
                },
                Gu = n._emscripten_bind_btGImpactCompoundShape_addChildShape_2 = function () {
                    return (Gu = n._emscripten_bind_btGImpactCompoundShape_addChildShape_2 = n.asm.Yl).apply(null, arguments)
                },
                wu = n._emscripten_bind_btGImpactCompoundShape_getChildShape_1 = function () {
                    return (wu = n._emscripten_bind_btGImpactCompoundShape_getChildShape_1 = n.asm.Zl).apply(null, arguments)
                },
                Hu = n._emscripten_bind_btGImpactCompoundShape_getChildAabb_4 = function () {
                    return (Hu = n._emscripten_bind_btGImpactCompoundShape_getChildAabb_4 = n.asm._l).apply(null, arguments)
                },
                Vu = n._emscripten_bind_btGImpactCompoundShape_getChildTransform_1 = function () {
                    return (Vu = n._emscripten_bind_btGImpactCompoundShape_getChildTransform_1 = n.asm.$l).apply(null, arguments)
                },
                Eu = n._emscripten_bind_btGImpactCompoundShape_setChildTransform_2 = function () {
                    return (Eu = n._emscripten_bind_btGImpactCompoundShape_setChildTransform_2 = n.asm.am).apply(null, arguments)
                },
                Nu = n._emscripten_bind_btGImpactCompoundShape_calculateLocalInertia_2 = function () {
                    return (Nu = n._emscripten_bind_btGImpactCompoundShape_calculateLocalInertia_2 = n.asm.bm).apply(null, arguments)
                },
                Uu = n._emscripten_bind_btGImpactCompoundShape_getName_0 = function () {
                    return (Uu = n._emscripten_bind_btGImpactCompoundShape_getName_0 = n.asm.cm).apply(null, arguments)
                },
                zu = n._emscripten_bind_btGImpactCompoundShape_getGImpactShapeType_0 = function () {
                    return (zu = n._emscripten_bind_btGImpactCompoundShape_getGImpactShapeType_0 = n.asm.dm).apply(null, arguments)
                },
                qu = n._emscripten_bind_btGImpactCompoundShape_setLocalScaling_1 = function () {
                    return (qu = n._emscripten_bind_btGImpactCompoundShape_setLocalScaling_1 = n.asm.em).apply(null, arguments)
                },
                Ku = n._emscripten_bind_btGImpactCompoundShape_getLocalScaling_0 = function () {
                    return (Ku = n._emscripten_bind_btGImpactCompoundShape_getLocalScaling_0 = n.asm.fm).apply(null, arguments)
                },
                Qu = n._emscripten_bind_btGImpactCompoundShape_updateBound_0 = function () {
                    return (Qu = n._emscripten_bind_btGImpactCompoundShape_updateBound_0 = n.asm.gm).apply(null, arguments)
                },
                Xu = n._emscripten_bind_btGImpactCompoundShape_postUpdate_0 = function () {
                    return (Xu = n._emscripten_bind_btGImpactCompoundShape_postUpdate_0 = n.asm.hm).apply(null, arguments)
                },
                Zu = n._emscripten_bind_btGImpactCompoundShape_getShapeType_0 = function () {
                    return (Zu = n._emscripten_bind_btGImpactCompoundShape_getShapeType_0 = n.asm.im).apply(null, arguments)
                },
                Yu = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTriangles_0 = function () {
                    return (Yu = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTriangles_0 = n.asm.jm).apply(null, arguments)
                },
                Ju = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTetrahedrons_0 = function () {
                    return (Ju = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTetrahedrons_0 = n.asm.km).apply(null, arguments)
                },
                $u = n._emscripten_bind_btGImpactCompoundShape_getBulletTriangle_2 = function () {
                    return ($u = n._emscripten_bind_btGImpactCompoundShape_getBulletTriangle_2 = n.asm.lm).apply(null, arguments)
                },
                tb = n._emscripten_bind_btGImpactCompoundShape_getBulletTetrahedron_2 = function () {
                    return (tb = n._emscripten_bind_btGImpactCompoundShape_getBulletTetrahedron_2 = n.asm.mm).apply(null, arguments)
                },
                eb = n._emscripten_bind_btGImpactCompoundShape___destroy___0 = function () {
                    return (eb = n._emscripten_bind_btGImpactCompoundShape___destroy___0 = n.asm.nm).apply(null, arguments)
                },
                nb = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_0 = function () {
                    return (nb = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_0 = n.asm.om).apply(null, arguments)
                },
                ob = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_1 = function () {
                    return (ob = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_1 = n.asm.pm).apply(null, arguments)
                },
                _b = n._emscripten_bind_TrimeshPrimitiveManager_lock_0 = function () {
                    return (_b = n._emscripten_bind_TrimeshPrimitiveManager_lock_0 = n.asm.qm).apply(null, arguments)
                },
                ib = n._emscripten_bind_TrimeshPrimitiveManager_unlock_0 = function () {
                    return (ib = n._emscripten_bind_TrimeshPrimitiveManager_unlock_0 = n.asm.rm).apply(null, arguments)
                },
                rb = n._emscripten_bind_TrimeshPrimitiveManager_is_trimesh_0 = function () {
                    return (rb = n._emscripten_bind_TrimeshPrimitiveManager_is_trimesh_0 = n.asm.sm).apply(null, arguments)
                },
                pb = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_count_0 = function () {
                    return (pb = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_count_0 = n.asm.tm).apply(null, arguments)
                },
                sb = n._emscripten_bind_TrimeshPrimitiveManager_get_indices_4 = function () {
                    return (sb = n._emscripten_bind_TrimeshPrimitiveManager_get_indices_4 = n.asm.um).apply(null, arguments)
                },
                cb = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_2 = function () {
                    return (cb = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_2 = n.asm.vm).apply(null, arguments)
                },
                ab = n._emscripten_bind_TrimeshPrimitiveManager_get_bullet_triangle_2 = function () {
                    return (ab = n._emscripten_bind_TrimeshPrimitiveManager_get_bullet_triangle_2 = n.asm.wm).apply(null, arguments)
                },
                lb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_margin_0 = function () {
                    return (lb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_margin_0 = n.asm.xm).apply(null, arguments)
                },
                ub = n._emscripten_bind_TrimeshPrimitiveManager_set_m_margin_1 = function () {
                    return (ub = n._emscripten_bind_TrimeshPrimitiveManager_set_m_margin_1 = n.asm.ym).apply(null, arguments)
                },
                bb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_meshInterface_0 = function () {
                    return (bb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_meshInterface_0 = n.asm.zm).apply(null, arguments)
                },
                mb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_meshInterface_1 = function () {
                    return (mb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_meshInterface_1 = n.asm.Am).apply(null, arguments)
                },
                yb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_part_0 = function () {
                    return (yb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_part_0 = n.asm.Bm).apply(null, arguments)
                },
                db = n._emscripten_bind_TrimeshPrimitiveManager_set_m_part_1 = function () {
                    return (db = n._emscripten_bind_TrimeshPrimitiveManager_set_m_part_1 = n.asm.Cm).apply(null, arguments)
                },
                fb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_lock_count_0 = function () {
                    return (fb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_lock_count_0 = n.asm.Dm).apply(null, arguments)
                },
                hb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_lock_count_1 = function () {
                    return (hb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_lock_count_1 = n.asm.Em).apply(null, arguments)
                },
                Bb = n._emscripten_bind_TrimeshPrimitiveManager_get_numverts_0 = function () {
                    return (Bb = n._emscripten_bind_TrimeshPrimitiveManager_get_numverts_0 = n.asm.Fm).apply(null, arguments)
                },
                gb = n._emscripten_bind_TrimeshPrimitiveManager_set_numverts_1 = function () {
                    return (gb = n._emscripten_bind_TrimeshPrimitiveManager_set_numverts_1 = n.asm.Gm).apply(null, arguments)
                },
                kb = n._emscripten_bind_TrimeshPrimitiveManager_get_type_0 = function () {
                    return (kb = n._emscripten_bind_TrimeshPrimitiveManager_get_type_0 = n.asm.Hm).apply(null, arguments)
                },
                Cb = n._emscripten_bind_TrimeshPrimitiveManager_set_type_1 = function () {
                    return (Cb = n._emscripten_bind_TrimeshPrimitiveManager_set_type_1 = n.asm.Im).apply(null, arguments)
                },
                Sb = n._emscripten_bind_TrimeshPrimitiveManager_get_stride_0 = function () {
                    return (Sb = n._emscripten_bind_TrimeshPrimitiveManager_get_stride_0 = n.asm.Jm).apply(null, arguments)
                },
                jb = n._emscripten_bind_TrimeshPrimitiveManager_set_stride_1 = function () {
                    return (jb = n._emscripten_bind_TrimeshPrimitiveManager_set_stride_1 = n.asm.Km).apply(null, arguments)
                },
                vb = n._emscripten_bind_TrimeshPrimitiveManager_get_indexstride_0 = function () {
                    return (vb = n._emscripten_bind_TrimeshPrimitiveManager_get_indexstride_0 = n.asm.Lm).apply(null, arguments)
                },
                Ib = n._emscripten_bind_TrimeshPrimitiveManager_set_indexstride_1 = function () {
                    return (Ib = n._emscripten_bind_TrimeshPrimitiveManager_set_indexstride_1 = n.asm.Mm).apply(null, arguments)
                },
                Rb = n._emscripten_bind_TrimeshPrimitiveManager_get_numfaces_0 = function () {
                    return (Rb = n._emscripten_bind_TrimeshPrimitiveManager_get_numfaces_0 = n.asm.Nm).apply(null, arguments)
                },
                Db = n._emscripten_bind_TrimeshPrimitiveManager_set_numfaces_1 = function () {
                    return (Db = n._emscripten_bind_TrimeshPrimitiveManager_set_numfaces_1 = n.asm.Om).apply(null, arguments)
                },
                Pb = n._emscripten_bind_TrimeshPrimitiveManager_get_indicestype_0 = function () {
                    return (Pb = n._emscripten_bind_TrimeshPrimitiveManager_get_indicestype_0 = n.asm.Pm).apply(null, arguments)
                },
                Tb = n._emscripten_bind_TrimeshPrimitiveManager_set_indicestype_1 = function () {
                    return (Tb = n._emscripten_bind_TrimeshPrimitiveManager_set_indicestype_1 = n.asm.Qm).apply(null, arguments)
                },
                Ob = n._emscripten_bind_TrimeshPrimitiveManager___destroy___0 = function () {
                    return (Ob = n._emscripten_bind_TrimeshPrimitiveManager___destroy___0 = n.asm.Rm).apply(null, arguments)
                },
                Wb = n._emscripten_bind_btGImpactMeshShapePart_btGImpactMeshShapePart_2 = function () {
                    return (Wb = n._emscripten_bind_btGImpactMeshShapePart_btGImpactMeshShapePart_2 = n.asm.Sm).apply(null, arguments)
                },
                Ab = n._emscripten_bind_btGImpactMeshShapePart_getTrimeshPrimitiveManager_0 = function () {
                    return (Ab = n._emscripten_bind_btGImpactMeshShapePart_getTrimeshPrimitiveManager_0 = n.asm.Tm).apply(null, arguments)
                },
                Mb = n._emscripten_bind_btGImpactMeshShapePart_getVertexCount_0 = function () {
                    return (Mb = n._emscripten_bind_btGImpactMeshShapePart_getVertexCount_0 = n.asm.Um).apply(null, arguments)
                },
                xb = n._emscripten_bind_btGImpactMeshShapePart_getVertex_2 = function () {
                    return (xb = n._emscripten_bind_btGImpactMeshShapePart_getVertex_2 = n.asm.Vm).apply(null, arguments)
                },
                Fb = n._emscripten_bind_btGImpactMeshShapePart_getPart_0 = function () {
                    return (Fb = n._emscripten_bind_btGImpactMeshShapePart_getPart_0 = n.asm.Wm).apply(null, arguments)
                },
                Lb = n._emscripten_bind_btGImpactMeshShapePart_setLocalScaling_1 = function () {
                    return (Lb = n._emscripten_bind_btGImpactMeshShapePart_setLocalScaling_1 = n.asm.Xm).apply(null, arguments)
                },
                Gb = n._emscripten_bind_btGImpactMeshShapePart_getLocalScaling_0 = function () {
                    return (Gb = n._emscripten_bind_btGImpactMeshShapePart_getLocalScaling_0 = n.asm.Ym).apply(null, arguments)
                },
                wb = n._emscripten_bind_btGImpactMeshShapePart_updateBound_0 = function () {
                    return (wb = n._emscripten_bind_btGImpactMeshShapePart_updateBound_0 = n.asm.Zm).apply(null, arguments)
                },
                Hb = n._emscripten_bind_btGImpactMeshShapePart_postUpdate_0 = function () {
                    return (Hb = n._emscripten_bind_btGImpactMeshShapePart_postUpdate_0 = n.asm._m).apply(null, arguments)
                },
                Vb = n._emscripten_bind_btGImpactMeshShapePart_getShapeType_0 = function () {
                    return (Vb = n._emscripten_bind_btGImpactMeshShapePart_getShapeType_0 = n.asm.$m).apply(null, arguments)
                },
                Eb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTriangles_0 = function () {
                    return (Eb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTriangles_0 = n.asm.an).apply(null, arguments)
                },
                Nb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTetrahedrons_0 = function () {
                    return (Nb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTetrahedrons_0 = n.asm.bn).apply(null, arguments)
                },
                Ub = n._emscripten_bind_btGImpactMeshShapePart_getBulletTriangle_2 = function () {
                    return (Ub = n._emscripten_bind_btGImpactMeshShapePart_getBulletTriangle_2 = n.asm.cn).apply(null, arguments)
                },
                zb = n._emscripten_bind_btGImpactMeshShapePart_getBulletTetrahedron_2 = function () {
                    return (zb = n._emscripten_bind_btGImpactMeshShapePart_getBulletTetrahedron_2 = n.asm.dn).apply(null, arguments)
                },
                qb = n._emscripten_bind_btGImpactMeshShapePart___destroy___0 = function () {
                    return (qb = n._emscripten_bind_btGImpactMeshShapePart___destroy___0 = n.asm.en).apply(null, arguments)
                },
                Kb = n._emscripten_bind_btGImpactMeshShape_btGImpactMeshShape_1 = function () {
                    return (Kb = n._emscripten_bind_btGImpactMeshShape_btGImpactMeshShape_1 = n.asm.fn).apply(null, arguments)
                },
                Qb = n._emscripten_bind_btGImpactMeshShape_getMeshInterface_0 = function () {
                    return (Qb = n._emscripten_bind_btGImpactMeshShape_getMeshInterface_0 = n.asm.gn).apply(null, arguments)
                },
                Xb = n._emscripten_bind_btGImpactMeshShape_getMeshPartCount_0 = function () {
                    return (Xb = n._emscripten_bind_btGImpactMeshShape_getMeshPartCount_0 = n.asm.hn).apply(null, arguments)
                },
                Zb = n._emscripten_bind_btGImpactMeshShape_getMeshPart_1 = function () {
                    return (Zb = n._emscripten_bind_btGImpactMeshShape_getMeshPart_1 = n.asm.jn).apply(null, arguments)
                },
                Yb = n._emscripten_bind_btGImpactMeshShape_calculateSerializeBufferSize_0 = function () {
                    return (Yb = n._emscripten_bind_btGImpactMeshShape_calculateSerializeBufferSize_0 = n.asm.kn).apply(null, arguments)
                },
                Jb = n._emscripten_bind_btGImpactMeshShape_setLocalScaling_1 = function () {
                    return (Jb = n._emscripten_bind_btGImpactMeshShape_setLocalScaling_1 = n.asm.ln).apply(null, arguments)
                },
                $b = n._emscripten_bind_btGImpactMeshShape_getLocalScaling_0 = function () {
                    return ($b = n._emscripten_bind_btGImpactMeshShape_getLocalScaling_0 = n.asm.mn).apply(null, arguments)
                },
                tm = n._emscripten_bind_btGImpactMeshShape_updateBound_0 = function () {
                    return (tm = n._emscripten_bind_btGImpactMeshShape_updateBound_0 = n.asm.nn).apply(null, arguments)
                },
                em = n._emscripten_bind_btGImpactMeshShape_postUpdate_0 = function () {
                    return (em = n._emscripten_bind_btGImpactMeshShape_postUpdate_0 = n.asm.on).apply(null, arguments)
                },
                nm = n._emscripten_bind_btGImpactMeshShape_getShapeType_0 = function () {
                    return (nm = n._emscripten_bind_btGImpactMeshShape_getShapeType_0 = n.asm.pn).apply(null, arguments)
                },
                om = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTriangles_0 = function () {
                    return (om = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTriangles_0 = n.asm.qn).apply(null, arguments)
                },
                _m = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTetrahedrons_0 = function () {
                    return (_m = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTetrahedrons_0 = n.asm.rn).apply(null, arguments)
                },
                im = n._emscripten_bind_btGImpactMeshShape_getBulletTriangle_2 = function () {
                    return (im = n._emscripten_bind_btGImpactMeshShape_getBulletTriangle_2 = n.asm.sn).apply(null, arguments)
                },
                rm = n._emscripten_bind_btGImpactMeshShape_getBulletTetrahedron_2 = function () {
                    return (rm = n._emscripten_bind_btGImpactMeshShape_getBulletTetrahedron_2 = n.asm.tn).apply(null, arguments)
                },
                pm = n._emscripten_bind_btGImpactMeshShape___destroy___0 = function () {
                    return (pm = n._emscripten_bind_btGImpactMeshShape___destroy___0 = n.asm.un).apply(null, arguments)
                },
                sm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_0 = function () {
                    return (sm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_0 = n.asm.vn).apply(null, arguments)
                },
                cm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_2 = function () {
                    return (cm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_2 = n.asm.wn).apply(null, arguments)
                },
                am = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_dispatcher1_0 = function () {
                    return (am = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_dispatcher1_0 = n.asm.xn).apply(null, arguments)
                },
                lm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_dispatcher1_1 = function () {
                    return (lm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_dispatcher1_1 = n.asm.yn).apply(null, arguments)
                },
                um = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_manifold_0 = function () {
                    return (um = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_manifold_0 = n.asm.zn).apply(null, arguments)
                },
                bm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_manifold_1 = function () {
                    return (bm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_manifold_1 = n.asm.An).apply(null, arguments)
                },
                mm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo___destroy___0 = function () {
                    return (mm = n._emscripten_bind_btCollisionAlgorithmConstructionInfo___destroy___0 = n.asm.Bn).apply(null, arguments)
                },
                ym = n._emscripten_bind_btGImpactCollisionAlgorithm_btGImpactCollisionAlgorithm_3 = function () {
                    return (ym = n._emscripten_bind_btGImpactCollisionAlgorithm_btGImpactCollisionAlgorithm_3 = n.asm.Cn).apply(null, arguments)
                },
                dm = n._emscripten_bind_btGImpactCollisionAlgorithm_registerAlgorithm_1 = function () {
                    return (dm = n._emscripten_bind_btGImpactCollisionAlgorithm_registerAlgorithm_1 = n.asm.Dn).apply(null, arguments)
                },
                fm = n._emscripten_bind_btGImpactCollisionAlgorithm___destroy___0 = function () {
                    return (fm = n._emscripten_bind_btGImpactCollisionAlgorithm___destroy___0 = n.asm.En).apply(null, arguments)
                },
                hm = n._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = function () {
                    return (hm = n._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = n.asm.Fn).apply(null, arguments)
                },
                Bm = n._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function () {
                    return (Bm = n._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = n.asm.Gn).apply(null, arguments)
                },
                gm = n._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = function () {
                    return (gm = n._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = n.asm.Hn).apply(null, arguments)
                },
                km = n._emscripten_bind_btPersistentManifold_getBody0_0 = function () {
                    return (km = n._emscripten_bind_btPersistentManifold_getBody0_0 = n.asm.In).apply(null, arguments)
                },
                Cm = n._emscripten_bind_btPersistentManifold_getBody1_0 = function () {
                    return (Cm = n._emscripten_bind_btPersistentManifold_getBody1_0 = n.asm.Jn).apply(null, arguments)
                },
                Sm = n._emscripten_bind_btPersistentManifold_getNumContacts_0 = function () {
                    return (Sm = n._emscripten_bind_btPersistentManifold_getNumContacts_0 = n.asm.Kn).apply(null, arguments)
                },
                jm = n._emscripten_bind_btPersistentManifold_getContactPoint_1 = function () {
                    return (jm = n._emscripten_bind_btPersistentManifold_getContactPoint_1 = n.asm.Ln).apply(null, arguments)
                },
                vm = n._emscripten_bind_btPersistentManifold___destroy___0 = function () {
                    return (vm = n._emscripten_bind_btPersistentManifold___destroy___0 = n.asm.Mn).apply(null, arguments)
                },
                Im = n._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = function () {
                    return (Im = n._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = n.asm.Nn).apply(null, arguments)
                },
                Rm = n._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = function () {
                    return (Rm = n._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = n.asm.On).apply(null, arguments)
                },
                Dm = n._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function () {
                    return (Dm = n._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = n.asm.Pn).apply(null, arguments)
                },
                Pm = n._emscripten_bind_btCollisionDispatcher___destroy___0 = function () {
                    return (Pm = n._emscripten_bind_btCollisionDispatcher___destroy___0 = n.asm.Qn).apply(null, arguments)
                },
                Tm = n._emscripten_bind_btOverlappingPairCallback___destroy___0 = function () {
                    return (Tm = n._emscripten_bind_btOverlappingPairCallback___destroy___0 = n.asm.Rn).apply(null, arguments)
                },
                Om = n._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = function () {
                    return (Om = n._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = n.asm.Sn).apply(null, arguments)
                },
                Wm = n._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = function () {
                    return (Wm = n._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = n.asm.Tn).apply(null, arguments)
                },
                Am = n._emscripten_bind_btOverlappingPairCache___destroy___0 = function () {
                    return (Am = n._emscripten_bind_btOverlappingPairCache___destroy___0 = n.asm.Un).apply(null, arguments)
                },
                Mm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = function () {
                    return (Mm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = n.asm.Vn).apply(null, arguments)
                },
                xm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function () {
                    return (xm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = n.asm.Wn).apply(null, arguments)
                },
                Fm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = function () {
                    return (Fm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = n.asm.Xn).apply(null, arguments)
                },
                Lm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function () {
                    return (Lm = n._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = n.asm.Yn).apply(null, arguments)
                },
                Gm = n._emscripten_bind_btAxisSweep3___destroy___0 = function () {
                    return (Gm = n._emscripten_bind_btAxisSweep3___destroy___0 = n.asm.Zn).apply(null, arguments)
                },
                wm = n._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = function () {
                    return (wm = n._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = n.asm._n).apply(null, arguments)
                },
                Hm = n._emscripten_bind_btBroadphaseInterface___destroy___0 = function () {
                    return (Hm = n._emscripten_bind_btBroadphaseInterface___destroy___0 = n.asm.$n).apply(null, arguments)
                },
                Vm = n._emscripten_bind_btCollisionConfiguration___destroy___0 = function () {
                    return (Vm = n._emscripten_bind_btCollisionConfiguration___destroy___0 = n.asm.ao).apply(null, arguments)
                },
                Em = n._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function () {
                    return (Em = n._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = n.asm.bo).apply(null, arguments)
                },
                Nm = n._emscripten_bind_btDbvtBroadphase___destroy___0 = function () {
                    return (Nm = n._emscripten_bind_btDbvtBroadphase___destroy___0 = n.asm.co).apply(null, arguments)
                },
                Um = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function () {
                    return (Um = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = n.asm.eo).apply(null, arguments)
                },
                zm = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = function () {
                    return (zm = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = n.asm.fo).apply(null, arguments)
                },
                qm = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function () {
                    return (qm = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = n.asm.go).apply(null, arguments)
                },
                Km = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function () {
                    return (Km = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = n.asm.ho).apply(null, arguments)
                },
                Qm = n._emscripten_bind_btBroadphaseProxy___destroy___0 = function () {
                    return (Qm = n._emscripten_bind_btBroadphaseProxy___destroy___0 = n.asm.io).apply(null, arguments)
                },
                Xm = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = function () {
                    return (Xm = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = n.asm.jo).apply(null, arguments)
                },
                Zm = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = function () {
                    return (Zm = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = n.asm.ko).apply(null, arguments)
                },
                Ym = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = function () {
                    return (Ym = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = n.asm.lo).apply(null, arguments)
                },
                Jm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function () {
                    return (Jm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = n.asm.mo).apply(null, arguments)
                },
                $m = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function () {
                    return ($m = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = n.asm.no).apply(null, arguments)
                },
                ty = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function () {
                    return (ty = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = n.asm.oo).apply(null, arguments)
                },
                ey = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = function () {
                    return (ey = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = n.asm.po).apply(null, arguments)
                },
                ny = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = function () {
                    return (ny = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = n.asm.qo).apply(null, arguments)
                },
                oy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function () {
                    return (oy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = n.asm.ro).apply(null, arguments)
                },
                _y = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function () {
                    return (_y = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = n.asm.so).apply(null, arguments)
                },
                iy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = function () {
                    return (iy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = n.asm.to).apply(null, arguments)
                },
                ry = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function () {
                    return (ry = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = n.asm.uo).apply(null, arguments)
                },
                py = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = function () {
                    return (py = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = n.asm.vo).apply(null, arguments)
                },
                sy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = function () {
                    return (sy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = n.asm.wo).apply(null, arguments)
                },
                cy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = function () {
                    return (cy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = n.asm.xo).apply(null, arguments)
                },
                ay = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = function () {
                    return (ay = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = n.asm.yo).apply(null, arguments)
                },
                ly = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = function () {
                    return (ly = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = n.asm.zo).apply(null, arguments)
                },
                uy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = function () {
                    return (uy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = n.asm.Ao).apply(null, arguments)
                },
                by = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = function () {
                    return (by = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = n.asm.Bo).apply(null, arguments)
                },
                my = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = function () {
                    return (my = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = n.asm.Co).apply(null, arguments)
                },
                yy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = function () {
                    return (yy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = n.asm.Do).apply(null, arguments)
                },
                dy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = function () {
                    return (dy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = n.asm.Eo).apply(null, arguments)
                },
                fy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = function () {
                    return (fy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = n.asm.Fo).apply(null, arguments)
                },
                hy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = function () {
                    return (hy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = n.asm.Go).apply(null, arguments)
                },
                By = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = function () {
                    return (By = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = n.asm.Ho).apply(null, arguments)
                },
                gy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = function () {
                    return (gy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = n.asm.Io).apply(null, arguments)
                },
                ky = n._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function () {
                    return (ky = n._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = n.asm.Jo).apply(null, arguments)
                },
                Cy = n._emscripten_bind_btRigidBody_btRigidBody_1 = function () {
                    return (Cy = n._emscripten_bind_btRigidBody_btRigidBody_1 = n.asm.Ko).apply(null, arguments)
                },
                Sy = n._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function () {
                    return (Sy = n._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = n.asm.Lo).apply(null, arguments)
                },
                jy = n._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function () {
                    return (jy = n._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = n.asm.Mo).apply(null, arguments)
                },
                vy = n._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function () {
                    return (vy = n._emscripten_bind_btRigidBody_setSleepingThresholds_2 = n.asm.No).apply(null, arguments)
                },
                Iy = n._emscripten_bind_btRigidBody_getLinearDamping_0 = function () {
                    return (Iy = n._emscripten_bind_btRigidBody_getLinearDamping_0 = n.asm.Oo).apply(null, arguments)
                },
                Ry = n._emscripten_bind_btRigidBody_getAngularDamping_0 = function () {
                    return (Ry = n._emscripten_bind_btRigidBody_getAngularDamping_0 = n.asm.Po).apply(null, arguments)
                },
                Dy = n._emscripten_bind_btRigidBody_setDamping_2 = function () {
                    return (Dy = n._emscripten_bind_btRigidBody_setDamping_2 = n.asm.Qo).apply(null, arguments)
                },
                Py = n._emscripten_bind_btRigidBody_setMassProps_2 = function () {
                    return (Py = n._emscripten_bind_btRigidBody_setMassProps_2 = n.asm.Ro).apply(null, arguments)
                },
                Ty = n._emscripten_bind_btRigidBody_getLinearFactor_0 = function () {
                    return (Ty = n._emscripten_bind_btRigidBody_getLinearFactor_0 = n.asm.So).apply(null, arguments)
                },
                Oy = n._emscripten_bind_btRigidBody_setLinearFactor_1 = function () {
                    return (Oy = n._emscripten_bind_btRigidBody_setLinearFactor_1 = n.asm.To).apply(null, arguments)
                },
                Wy = n._emscripten_bind_btRigidBody_applyTorque_1 = function () {
                    return (Wy = n._emscripten_bind_btRigidBody_applyTorque_1 = n.asm.Uo).apply(null, arguments)
                },
                Ay = n._emscripten_bind_btRigidBody_applyLocalTorque_1 = function () {
                    return (Ay = n._emscripten_bind_btRigidBody_applyLocalTorque_1 = n.asm.Vo).apply(null, arguments)
                },
                My = n._emscripten_bind_btRigidBody_applyForce_2 = function () {
                    return (My = n._emscripten_bind_btRigidBody_applyForce_2 = n.asm.Wo).apply(null, arguments)
                },
                xy = n._emscripten_bind_btRigidBody_applyCentralForce_1 = function () {
                    return (xy = n._emscripten_bind_btRigidBody_applyCentralForce_1 = n.asm.Xo).apply(null, arguments)
                },
                Fy = n._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = function () {
                    return (Fy = n._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = n.asm.Yo).apply(null, arguments)
                },
                Ly = n._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function () {
                    return (Ly = n._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = n.asm.Zo).apply(null, arguments)
                },
                Gy = n._emscripten_bind_btRigidBody_applyImpulse_2 = function () {
                    return (Gy = n._emscripten_bind_btRigidBody_applyImpulse_2 = n.asm._o).apply(null, arguments)
                },
                wy = n._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function () {
                    return (wy = n._emscripten_bind_btRigidBody_applyCentralImpulse_1 = n.asm.$o).apply(null, arguments)
                },
                Hy = n._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function () {
                    return (Hy = n._emscripten_bind_btRigidBody_updateInertiaTensor_0 = n.asm.ap).apply(null, arguments)
                },
                Vy = n._emscripten_bind_btRigidBody_getLinearVelocity_0 = function () {
                    return (Vy = n._emscripten_bind_btRigidBody_getLinearVelocity_0 = n.asm.bp).apply(null, arguments)
                },
                Ey = n._emscripten_bind_btRigidBody_getAngularVelocity_0 = function () {
                    return (Ey = n._emscripten_bind_btRigidBody_getAngularVelocity_0 = n.asm.cp).apply(null, arguments)
                },
                Ny = n._emscripten_bind_btRigidBody_setLinearVelocity_1 = function () {
                    return (Ny = n._emscripten_bind_btRigidBody_setLinearVelocity_1 = n.asm.dp).apply(null, arguments)
                },
                Uy = n._emscripten_bind_btRigidBody_setAngularVelocity_1 = function () {
                    return (Uy = n._emscripten_bind_btRigidBody_setAngularVelocity_1 = n.asm.ep).apply(null, arguments)
                },
                zy = n._emscripten_bind_btRigidBody_getMotionState_0 = function () {
                    return (zy = n._emscripten_bind_btRigidBody_getMotionState_0 = n.asm.fp).apply(null, arguments)
                },
                qy = n._emscripten_bind_btRigidBody_setMotionState_1 = function () {
                    return (qy = n._emscripten_bind_btRigidBody_setMotionState_1 = n.asm.gp).apply(null, arguments)
                },
                Ky = n._emscripten_bind_btRigidBody_getAngularFactor_0 = function () {
                    return (Ky = n._emscripten_bind_btRigidBody_getAngularFactor_0 = n.asm.hp).apply(null, arguments)
                },
                Qy = n._emscripten_bind_btRigidBody_setAngularFactor_1 = function () {
                    return (Qy = n._emscripten_bind_btRigidBody_setAngularFactor_1 = n.asm.ip).apply(null, arguments)
                },
                Xy = n._emscripten_bind_btRigidBody_upcast_1 = function () {
                    return (Xy = n._emscripten_bind_btRigidBody_upcast_1 = n.asm.jp).apply(null, arguments)
                },
                Zy = n._emscripten_bind_btRigidBody_getAabb_2 = function () {
                    return (Zy = n._emscripten_bind_btRigidBody_getAabb_2 = n.asm.kp).apply(null, arguments)
                },
                Yy = n._emscripten_bind_btRigidBody_applyGravity_0 = function () {
                    return (Yy = n._emscripten_bind_btRigidBody_applyGravity_0 = n.asm.lp).apply(null, arguments)
                },
                Jy = n._emscripten_bind_btRigidBody_getGravity_0 = function () {
                    return (Jy = n._emscripten_bind_btRigidBody_getGravity_0 = n.asm.mp).apply(null, arguments)
                },
                $y = n._emscripten_bind_btRigidBody_setGravity_1 = function () {
                    return ($y = n._emscripten_bind_btRigidBody_setGravity_1 = n.asm.np).apply(null, arguments)
                },
                td = n._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function () {
                    return (td = n._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = n.asm.op).apply(null, arguments)
                },
                ed = n._emscripten_bind_btRigidBody_clearForces_0 = function () {
                    return (ed = n._emscripten_bind_btRigidBody_clearForces_0 = n.asm.pp).apply(null, arguments)
                },
                nd = n._emscripten_bind_btRigidBody_setFlags_1 = function () {
                    return (nd = n._emscripten_bind_btRigidBody_setFlags_1 = n.asm.qp).apply(null, arguments)
                },
                od = n._emscripten_bind_btRigidBody_getFlags_0 = function () {
                    return (od = n._emscripten_bind_btRigidBody_getFlags_0 = n.asm.rp).apply(null, arguments)
                },
                _d = n._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function () {
                    return (_d = n._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = n.asm.sp).apply(null, arguments)
                },
                id = n._emscripten_bind_btRigidBody_getCollisionShape_0 = function () {
                    return (id = n._emscripten_bind_btRigidBody_getCollisionShape_0 = n.asm.tp).apply(null, arguments)
                },
                rd = n._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = function () {
                    return (rd = n._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = n.asm.up).apply(null, arguments)
                },
                pd = n._emscripten_bind_btRigidBody_setActivationState_1 = function () {
                    return (pd = n._emscripten_bind_btRigidBody_setActivationState_1 = n.asm.vp).apply(null, arguments)
                },
                sd = n._emscripten_bind_btRigidBody_forceActivationState_1 = function () {
                    return (sd = n._emscripten_bind_btRigidBody_forceActivationState_1 = n.asm.wp).apply(null, arguments)
                },
                cd = n._emscripten_bind_btRigidBody_activate_0 = function () {
                    return (cd = n._emscripten_bind_btRigidBody_activate_0 = n.asm.xp).apply(null, arguments)
                },
                ad = n._emscripten_bind_btRigidBody_activate_1 = function () {
                    return (ad = n._emscripten_bind_btRigidBody_activate_1 = n.asm.yp).apply(null, arguments)
                },
                ld = n._emscripten_bind_btRigidBody_isActive_0 = function () {
                    return (ld = n._emscripten_bind_btRigidBody_isActive_0 = n.asm.zp).apply(null, arguments)
                },
                ud = n._emscripten_bind_btRigidBody_isKinematicObject_0 = function () {
                    return (ud = n._emscripten_bind_btRigidBody_isKinematicObject_0 = n.asm.Ap).apply(null, arguments)
                },
                bd = n._emscripten_bind_btRigidBody_isStaticObject_0 = function () {
                    return (bd = n._emscripten_bind_btRigidBody_isStaticObject_0 = n.asm.Bp).apply(null, arguments)
                },
                md = n._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function () {
                    return (md = n._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = n.asm.Cp).apply(null, arguments)
                },
                yd = n._emscripten_bind_btRigidBody_getRestitution_0 = function () {
                    return (yd = n._emscripten_bind_btRigidBody_getRestitution_0 = n.asm.Dp).apply(null, arguments)
                },
                dd = n._emscripten_bind_btRigidBody_getFriction_0 = function () {
                    return (dd = n._emscripten_bind_btRigidBody_getFriction_0 = n.asm.Ep).apply(null, arguments)
                },
                fd = n._emscripten_bind_btRigidBody_getRollingFriction_0 = function () {
                    return (fd = n._emscripten_bind_btRigidBody_getRollingFriction_0 = n.asm.Fp).apply(null, arguments)
                },
                hd = n._emscripten_bind_btRigidBody_setRestitution_1 = function () {
                    return (hd = n._emscripten_bind_btRigidBody_setRestitution_1 = n.asm.Gp).apply(null, arguments)
                },
                Bd = n._emscripten_bind_btRigidBody_setFriction_1 = function () {
                    return (Bd = n._emscripten_bind_btRigidBody_setFriction_1 = n.asm.Hp).apply(null, arguments)
                },
                gd = n._emscripten_bind_btRigidBody_setRollingFriction_1 = function () {
                    return (gd = n._emscripten_bind_btRigidBody_setRollingFriction_1 = n.asm.Ip).apply(null, arguments)
                },
                kd = n._emscripten_bind_btRigidBody_getWorldTransform_0 = function () {
                    return (kd = n._emscripten_bind_btRigidBody_getWorldTransform_0 = n.asm.Jp).apply(null, arguments)
                },
                Cd = n._emscripten_bind_btRigidBody_getCollisionFlags_0 = function () {
                    return (Cd = n._emscripten_bind_btRigidBody_getCollisionFlags_0 = n.asm.Kp).apply(null, arguments)
                },
                Sd = n._emscripten_bind_btRigidBody_setCollisionFlags_1 = function () {
                    return (Sd = n._emscripten_bind_btRigidBody_setCollisionFlags_1 = n.asm.Lp).apply(null, arguments)
                },
                jd = n._emscripten_bind_btRigidBody_setWorldTransform_1 = function () {
                    return (jd = n._emscripten_bind_btRigidBody_setWorldTransform_1 = n.asm.Mp).apply(null, arguments)
                },
                vd = n._emscripten_bind_btRigidBody_setCollisionShape_1 = function () {
                    return (vd = n._emscripten_bind_btRigidBody_setCollisionShape_1 = n.asm.Np).apply(null, arguments)
                },
                Id = n._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function () {
                    return (Id = n._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = n.asm.Op).apply(null, arguments)
                },
                Rd = n._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function () {
                    return (Rd = n._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = n.asm.Pp).apply(null, arguments)
                },
                Dd = n._emscripten_bind_btRigidBody_getUserIndex_0 = function () {
                    return (Dd = n._emscripten_bind_btRigidBody_getUserIndex_0 = n.asm.Qp).apply(null, arguments)
                },
                Pd = n._emscripten_bind_btRigidBody_setUserIndex_1 = function () {
                    return (Pd = n._emscripten_bind_btRigidBody_setUserIndex_1 = n.asm.Rp).apply(null, arguments)
                },
                Td = n._emscripten_bind_btRigidBody_getUserPointer_0 = function () {
                    return (Td = n._emscripten_bind_btRigidBody_getUserPointer_0 = n.asm.Sp).apply(null, arguments)
                },
                Od = n._emscripten_bind_btRigidBody_setUserPointer_1 = function () {
                    return (Od = n._emscripten_bind_btRigidBody_setUserPointer_1 = n.asm.Tp).apply(null, arguments)
                },
                Wd = n._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = function () {
                    return (Wd = n._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = n.asm.Up).apply(null, arguments)
                },
                Ad = n._emscripten_bind_btRigidBody___destroy___0 = function () {
                    return (Ad = n._emscripten_bind_btRigidBody___destroy___0 = n.asm.Vp).apply(null, arguments)
                },
                Md = n._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function () {
                    return (Md = n._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = n.asm.Wp).apply(null, arguments)
                },
                xd = n._emscripten_bind_btConstraintSetting_get_m_tau_0 = function () {
                    return (xd = n._emscripten_bind_btConstraintSetting_get_m_tau_0 = n.asm.Xp).apply(null, arguments)
                },
                Fd = n._emscripten_bind_btConstraintSetting_set_m_tau_1 = function () {
                    return (Fd = n._emscripten_bind_btConstraintSetting_set_m_tau_1 = n.asm.Yp).apply(null, arguments)
                },
                Ld = n._emscripten_bind_btConstraintSetting_get_m_damping_0 = function () {
                    return (Ld = n._emscripten_bind_btConstraintSetting_get_m_damping_0 = n.asm.Zp).apply(null, arguments)
                },
                Gd = n._emscripten_bind_btConstraintSetting_set_m_damping_1 = function () {
                    return (Gd = n._emscripten_bind_btConstraintSetting_set_m_damping_1 = n.asm._p).apply(null, arguments)
                },
                wd = n._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function () {
                    return (wd = n._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = n.asm.$p).apply(null, arguments)
                },
                Hd = n._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function () {
                    return (Hd = n._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = n.asm.aq).apply(null, arguments)
                },
                Vd = n._emscripten_bind_btConstraintSetting___destroy___0 = function () {
                    return (Vd = n._emscripten_bind_btConstraintSetting___destroy___0 = n.asm.bq).apply(null, arguments)
                },
                Ed = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function () {
                    return (Ed = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = n.asm.cq).apply(null, arguments)
                },
                Nd = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function () {
                    return (Nd = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = n.asm.dq).apply(null, arguments)
                },
                Ud = n._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = function () {
                    return (Ud = n._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = n.asm.eq).apply(null, arguments)
                },
                zd = n._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function () {
                    return (zd = n._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = n.asm.fq).apply(null, arguments)
                },
                qd = n._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function () {
                    return (qd = n._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = n.asm.gq).apply(null, arguments)
                },
                Kd = n._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = function () {
                    return (Kd = n._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = n.asm.hq).apply(null, arguments)
                },
                Qd = n._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function () {
                    return (Qd = n._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = n.asm.iq).apply(null, arguments)
                },
                Xd = n._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (Xd = n._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = n.asm.jq).apply(null, arguments)
                },
                Zd = n._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (Zd = n._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = n.asm.kq).apply(null, arguments)
                },
                Yd = n._emscripten_bind_btPoint2PointConstraint_getParam_2 = function () {
                    return (Yd = n._emscripten_bind_btPoint2PointConstraint_getParam_2 = n.asm.lq).apply(null, arguments)
                },
                Jd = n._emscripten_bind_btPoint2PointConstraint_setParam_3 = function () {
                    return (Jd = n._emscripten_bind_btPoint2PointConstraint_setParam_3 = n.asm.mq).apply(null, arguments)
                },
                $d = n._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = function () {
                    return ($d = n._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = n.asm.nq).apply(null, arguments)
                },
                tf = n._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function () {
                    return (tf = n._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = n.asm.oq).apply(null, arguments)
                },
                ef = n._emscripten_bind_btPoint2PointConstraint___destroy___0 = function () {
                    return (ef = n._emscripten_bind_btPoint2PointConstraint___destroy___0 = n.asm.pq).apply(null, arguments)
                },
                nf = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = function () {
                    return (nf = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = n.asm.qq).apply(null, arguments)
                },
                of = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = function () {
                    return (of = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = n.asm.rq).apply(null, arguments)
                },
                _f = n._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function () {
                    return (_f = n._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = n.asm.sq).apply(null, arguments)
                },
                rf = n._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function () {
                    return (rf = n._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = n.asm.tq).apply(null, arguments)
                },
                pf = n._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function () {
                    return (pf = n._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = n.asm.uq).apply(null, arguments)
                },
                sf = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = function () {
                    return (sf = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = n.asm.vq).apply(null, arguments)
                },
                cf = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = function () {
                    return (cf = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = n.asm.wq).apply(null, arguments)
                },
                af = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = function () {
                    return (af = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = n.asm.xq).apply(null, arguments)
                },
                lf = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = function () {
                    return (lf = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = n.asm.yq).apply(null, arguments)
                },
                uf = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function () {
                    return (uf = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = n.asm.zq).apply(null, arguments)
                },
                bf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function () {
                    return (bf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = n.asm.Aq).apply(null, arguments)
                },
                mf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function () {
                    return (mf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = n.asm.Bq).apply(null, arguments)
                },
                yf = n._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function () {
                    return (yf = n._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = n.asm.Cq).apply(null, arguments)
                },
                df = n._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function () {
                    return (df = n._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = n.asm.Dq).apply(null, arguments)
                },
                ff = n._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (ff = n._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = n.asm.Eq).apply(null, arguments)
                },
                hf = n._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (hf = n._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = n.asm.Fq).apply(null, arguments)
                },
                Bf = n._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = function () {
                    return (Bf = n._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = n.asm.Gq).apply(null, arguments)
                },
                gf = n._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function () {
                    return (gf = n._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = n.asm.Hq).apply(null, arguments)
                },
                kf = n._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function () {
                    return (kf = n._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = n.asm.Iq).apply(null, arguments)
                },
                Cf = n._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = function () {
                    return (Cf = n._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = n.asm.Jq).apply(null, arguments)
                },
                Sf = n._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function () {
                    return (Sf = n._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = n.asm.Kq).apply(null, arguments)
                },
                jf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function () {
                    return (jf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = n.asm.Lq).apply(null, arguments)
                },
                vf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = function () {
                    return (vf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = n.asm.Mq).apply(null, arguments)
                },
                If = n._emscripten_bind_btConeTwistConstraint_setLimit_2 = function () {
                    return (If = n._emscripten_bind_btConeTwistConstraint_setLimit_2 = n.asm.Nq).apply(null, arguments)
                },
                Rf = n._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function () {
                    return (Rf = n._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = n.asm.Oq).apply(null, arguments)
                },
                Df = n._emscripten_bind_btConeTwistConstraint_setDamping_1 = function () {
                    return (Df = n._emscripten_bind_btConeTwistConstraint_setDamping_1 = n.asm.Pq).apply(null, arguments)
                },
                Pf = n._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function () {
                    return (Pf = n._emscripten_bind_btConeTwistConstraint_enableMotor_1 = n.asm.Qq).apply(null, arguments)
                },
                Tf = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = function () {
                    return (Tf = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = n.asm.Rq).apply(null, arguments)
                },
                Of = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = function () {
                    return (Of = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = n.asm.Sq).apply(null, arguments)
                },
                Wf = n._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function () {
                    return (Wf = n._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = n.asm.Tq).apply(null, arguments)
                },
                Af = n._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function () {
                    return (Af = n._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = n.asm.Uq).apply(null, arguments)
                },
                Mf = n._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = function () {
                    return (Mf = n._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = n.asm.Vq).apply(null, arguments)
                },
                xf = n._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (xf = n._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = n.asm.Wq).apply(null, arguments)
                },
                Ff = n._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (Ff = n._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = n.asm.Xq).apply(null, arguments)
                },
                Lf = n._emscripten_bind_btConeTwistConstraint_getParam_2 = function () {
                    return (Lf = n._emscripten_bind_btConeTwistConstraint_getParam_2 = n.asm.Yq).apply(null, arguments)
                },
                Gf = n._emscripten_bind_btConeTwistConstraint_setParam_3 = function () {
                    return (Gf = n._emscripten_bind_btConeTwistConstraint_setParam_3 = n.asm.Zq).apply(null, arguments)
                },
                wf = n._emscripten_bind_btConeTwistConstraint___destroy___0 = function () {
                    return (wf = n._emscripten_bind_btConeTwistConstraint___destroy___0 = n.asm._q).apply(null, arguments)
                },
                Hf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = function () {
                    return (Hf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = n.asm.$q).apply(null, arguments)
                },
                Vf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = function () {
                    return (Vf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = n.asm.ar).apply(null, arguments)
                },
                Ef = n._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function () {
                    return (Ef = n._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = n.asm.br).apply(null, arguments)
                },
                Nf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function () {
                    return (Nf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = n.asm.cr).apply(null, arguments)
                },
                Uf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function () {
                    return (Uf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = n.asm.dr).apply(null, arguments)
                },
                zf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = function () {
                    return (zf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = n.asm.er).apply(null, arguments)
                },
                qf = n._emscripten_bind_btHingeConstraint_getHingeAngle_0 = function () {
                    return (qf = n._emscripten_bind_btHingeConstraint_getHingeAngle_0 = n.asm.fr).apply(null, arguments)
                },
                Kf = n._emscripten_bind_btHingeConstraint_setLimit_4 = function () {
                    return (Kf = n._emscripten_bind_btHingeConstraint_setLimit_4 = n.asm.gr).apply(null, arguments)
                },
                Qf = n._emscripten_bind_btHingeConstraint_setLimit_5 = function () {
                    return (Qf = n._emscripten_bind_btHingeConstraint_setLimit_5 = n.asm.hr).apply(null, arguments)
                },
                Xf = n._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = function () {
                    return (Xf = n._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = n.asm.ir).apply(null, arguments)
                },
                Zf = n._emscripten_bind_btHingeConstraint_setAngularOnly_1 = function () {
                    return (Zf = n._emscripten_bind_btHingeConstraint_setAngularOnly_1 = n.asm.jr).apply(null, arguments)
                },
                Yf = n._emscripten_bind_btHingeConstraint_enableMotor_1 = function () {
                    return (Yf = n._emscripten_bind_btHingeConstraint_enableMotor_1 = n.asm.kr).apply(null, arguments)
                },
                Jf = n._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = function () {
                    return (Jf = n._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = n.asm.lr).apply(null, arguments)
                },
                $f = n._emscripten_bind_btHingeConstraint_setMotorTarget_2 = function () {
                    return ($f = n._emscripten_bind_btHingeConstraint_setMotorTarget_2 = n.asm.mr).apply(null, arguments)
                },
                th = n._emscripten_bind_btHingeConstraint_enableFeedback_1 = function () {
                    return (th = n._emscripten_bind_btHingeConstraint_enableFeedback_1 = n.asm.nr).apply(null, arguments)
                },
                eh = n._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (eh = n._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = n.asm.or).apply(null, arguments)
                },
                nh = n._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (nh = n._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = n.asm.pr).apply(null, arguments)
                },
                oh = n._emscripten_bind_btHingeConstraint_getParam_2 = function () {
                    return (oh = n._emscripten_bind_btHingeConstraint_getParam_2 = n.asm.qr).apply(null, arguments)
                },
                _h = n._emscripten_bind_btHingeConstraint_setParam_3 = function () {
                    return (_h = n._emscripten_bind_btHingeConstraint_setParam_3 = n.asm.rr).apply(null, arguments)
                },
                ih = n._emscripten_bind_btHingeConstraint___destroy___0 = function () {
                    return (ih = n._emscripten_bind_btHingeConstraint___destroy___0 = n.asm.sr).apply(null, arguments)
                },
                rh = n._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = function () {
                    return (rh = n._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = n.asm.tr).apply(null, arguments)
                },
                ph = n._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = function () {
                    return (ph = n._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = n.asm.ur).apply(null, arguments)
                },
                sh = n._emscripten_bind_btSliderConstraint_getLinearPos_0 = function () {
                    return (sh = n._emscripten_bind_btSliderConstraint_getLinearPos_0 = n.asm.vr).apply(null, arguments)
                },
                ch = n._emscripten_bind_btSliderConstraint_getAngularPos_0 = function () {
                    return (ch = n._emscripten_bind_btSliderConstraint_getAngularPos_0 = n.asm.wr).apply(null, arguments)
                },
                ah = n._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function () {
                    return (ah = n._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = n.asm.xr).apply(null, arguments)
                },
                lh = n._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = function () {
                    return (lh = n._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = n.asm.yr).apply(null, arguments)
                },
                uh = n._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function () {
                    return (uh = n._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = n.asm.zr).apply(null, arguments)
                },
                bh = n._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function () {
                    return (bh = n._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = n.asm.Ar).apply(null, arguments)
                },
                mh = n._emscripten_bind_btSliderConstraint_setPoweredLinMotor_1 = function () {
                    return (mh = n._emscripten_bind_btSliderConstraint_setPoweredLinMotor_1 = n.asm.Br).apply(null, arguments)
                },
                yh = n._emscripten_bind_btSliderConstraint_setMaxLinMotorForce_1 = function () {
                    return (yh = n._emscripten_bind_btSliderConstraint_setMaxLinMotorForce_1 = n.asm.Cr).apply(null, arguments)
                },
                dh = n._emscripten_bind_btSliderConstraint_setTargetLinMotorVelocity_1 = function () {
                    return (dh = n._emscripten_bind_btSliderConstraint_setTargetLinMotorVelocity_1 = n.asm.Dr).apply(null, arguments)
                },
                fh = n._emscripten_bind_btSliderConstraint_enableFeedback_1 = function () {
                    return (fh = n._emscripten_bind_btSliderConstraint_enableFeedback_1 = n.asm.Er).apply(null, arguments)
                },
                hh = n._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (hh = n._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = n.asm.Fr).apply(null, arguments)
                },
                Bh = n._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (Bh = n._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = n.asm.Gr).apply(null, arguments)
                },
                gh = n._emscripten_bind_btSliderConstraint_getParam_2 = function () {
                    return (gh = n._emscripten_bind_btSliderConstraint_getParam_2 = n.asm.Hr).apply(null, arguments)
                },
                kh = n._emscripten_bind_btSliderConstraint_setParam_3 = function () {
                    return (kh = n._emscripten_bind_btSliderConstraint_setParam_3 = n.asm.Ir).apply(null, arguments)
                },
                Ch = n._emscripten_bind_btSliderConstraint___destroy___0 = function () {
                    return (Ch = n._emscripten_bind_btSliderConstraint___destroy___0 = n.asm.Jr).apply(null, arguments)
                },
                Sh = n._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function () {
                    return (Sh = n._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = n.asm.Kr).apply(null, arguments)
                },
                jh = n._emscripten_bind_btFixedConstraint_enableFeedback_1 = function () {
                    return (jh = n._emscripten_bind_btFixedConstraint_enableFeedback_1 = n.asm.Lr).apply(null, arguments)
                },
                vh = n._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function () {
                    return (vh = n._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = n.asm.Mr).apply(null, arguments)
                },
                Ih = n._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = function () {
                    return (Ih = n._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = n.asm.Nr).apply(null, arguments)
                },
                Rh = n._emscripten_bind_btFixedConstraint_getParam_2 = function () {
                    return (Rh = n._emscripten_bind_btFixedConstraint_getParam_2 = n.asm.Or).apply(null, arguments)
                },
                Dh = n._emscripten_bind_btFixedConstraint_setParam_3 = function () {
                    return (Dh = n._emscripten_bind_btFixedConstraint_setParam_3 = n.asm.Pr).apply(null, arguments)
                },
                Ph = n._emscripten_bind_btFixedConstraint___destroy___0 = function () {
                    return (Ph = n._emscripten_bind_btFixedConstraint___destroy___0 = n.asm.Qr).apply(null, arguments)
                },
                Th = n._emscripten_bind_btConstraintSolver___destroy___0 = function () {
                    return (Th = n._emscripten_bind_btConstraintSolver___destroy___0 = n.asm.Rr).apply(null, arguments)
                },
                Oh = n._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function () {
                    return (Oh = n._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = n.asm.Sr).apply(null, arguments)
                },
                Wh = n._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = function () {
                    return (Wh = n._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = n.asm.Tr).apply(null, arguments)
                },
                Ah = n._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function () {
                    return (Ah = n._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = n.asm.Ur).apply(null, arguments)
                },
                Mh = n._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function () {
                    return (Mh = n._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = n.asm.Vr).apply(null, arguments)
                },
                xh = n._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function () {
                    return (xh = n._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = n.asm.Wr).apply(null, arguments)
                },
                Fh = n._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function () {
                    return (Fh = n._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = n.asm.Xr).apply(null, arguments)
                },
                Lh = n._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function () {
                    return (Lh = n._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = n.asm.Yr).apply(null, arguments)
                },
                Gh = n._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function () {
                    return (Gh = n._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = n.asm.Zr).apply(null, arguments)
                },
                wh = n._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function () {
                    return (wh = n._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = n.asm._r).apply(null, arguments)
                },
                Hh = n._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function () {
                    return (Hh = n._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = n.asm.$r).apply(null, arguments)
                },
                Vh = n._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function () {
                    return (Vh = n._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = n.asm.as).apply(null, arguments)
                },
                Eh = n._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function () {
                    return (Eh = n._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = n.asm.bs).apply(null, arguments)
                },
                Nh = n._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function () {
                    return (Nh = n._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = n.asm.cs).apply(null, arguments)
                },
                Uh = n._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function () {
                    return (Uh = n._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = n.asm.ds).apply(null, arguments)
                },
                zh = n._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function () {
                    return (zh = n._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = n.asm.es).apply(null, arguments)
                },
                qh = n._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function () {
                    return (qh = n._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = n.asm.fs).apply(null, arguments)
                },
                Kh = n._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = function () {
                    return (Kh = n._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = n.asm.gs).apply(null, arguments)
                },
                Qh = n._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function () {
                    return (Qh = n._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = n.asm.hs).apply(null, arguments)
                },
                Xh = n._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = function () {
                    return (Xh = n._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = n.asm.is).apply(null, arguments)
                },
                Zh = n._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = function () {
                    return (Zh = n._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = n.asm.js).apply(null, arguments)
                },
                Yh = n._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = function () {
                    return (Yh = n._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = n.asm.ks).apply(null, arguments)
                },
                Jh = n._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = function () {
                    return (Jh = n._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = n.asm.ls).apply(null, arguments)
                },
                $h = n._emscripten_bind_btDispatcherInfo___destroy___0 = function () {
                    return ($h = n._emscripten_bind_btDispatcherInfo___destroy___0 = n.asm.ms).apply(null, arguments)
                },
                tB = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function () {
                    return (tB = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = n.asm.ns).apply(null, arguments)
                },
                eB = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function () {
                    return (eB = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = n.asm.os).apply(null, arguments)
                },
                nB = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = function () {
                    return (nB = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = n.asm.ps).apply(null, arguments)
                },
                oB = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = function () {
                    return (oB = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = n.asm.qs).apply(null, arguments)
                },
                _B = n._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = function () {
                    return (_B = n._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = n.asm.rs).apply(null, arguments)
                },
                iB = n._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function () {
                    return (iB = n._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = n.asm.ss).apply(null, arguments)
                },
                rB = n._emscripten_bind_btContactSolverInfo___destroy___0 = function () {
                    return (rB = n._emscripten_bind_btContactSolverInfo___destroy___0 = n.asm.ts).apply(null, arguments)
                },
                pB = n._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = function () {
                    return (pB = n._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = n.asm.us).apply(null, arguments)
                },
                sB = n._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = function () {
                    return (sB = n._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = n.asm.vs).apply(null, arguments)
                },
                cB = n._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = function () {
                    return (cB = n._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = n.asm.ws).apply(null, arguments)
                },
                aB = n._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = function () {
                    return (aB = n._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = n.asm.xs).apply(null, arguments)
                },
                lB = n._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = function () {
                    return (lB = n._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = n.asm.ys).apply(null, arguments)
                },
                uB = n._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = function () {
                    return (uB = n._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = n.asm.zs).apply(null, arguments)
                },
                bB = n._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = function () {
                    return (bB = n._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = n.asm.As).apply(null, arguments)
                },
                mB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = function () {
                    return (mB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = n.asm.Bs).apply(null, arguments)
                },
                yB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = function () {
                    return (yB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = n.asm.Cs).apply(null, arguments)
                },
                dB = n._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = function () {
                    return (dB = n._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = n.asm.Ds).apply(null, arguments)
                },
                fB = n._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = function () {
                    return (fB = n._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = n.asm.Es).apply(null, arguments)
                },
                hB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = function () {
                    return (hB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = n.asm.Fs).apply(null, arguments)
                },
                BB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = function () {
                    return (BB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = n.asm.Gs).apply(null, arguments)
                },
                gB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = function () {
                    return (gB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = n.asm.Hs).apply(null, arguments)
                },
                kB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = function () {
                    return (kB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = n.asm.Is).apply(null, arguments)
                },
                CB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = function () {
                    return (CB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = n.asm.Js).apply(null, arguments)
                },
                SB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = function () {
                    return (SB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = n.asm.Ks).apply(null, arguments)
                },
                jB = n._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = function () {
                    return (jB = n._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = n.asm.Ls).apply(null, arguments)
                },
                vB = n._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = function () {
                    return (vB = n._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = n.asm.Ms).apply(null, arguments)
                },
                IB = n._emscripten_bind_btVehicleRaycasterResult___destroy___0 = function () {
                    return (IB = n._emscripten_bind_btVehicleRaycasterResult___destroy___0 = n.asm.Ns).apply(null, arguments)
                },
                RB = n._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = function () {
                    return (RB = n._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = n.asm.Os).apply(null, arguments)
                },
                DB = n._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = function () {
                    return (DB = n._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = n.asm.Ps).apply(null, arguments)
                },
                PB = n._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = function () {
                    return (PB = n._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = n.asm.Qs).apply(null, arguments)
                },
                TB = n._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = function () {
                    return (TB = n._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = n.asm.Rs).apply(null, arguments)
                },
                OB = n._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = function () {
                    return (OB = n._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = n.asm.Ss).apply(null, arguments)
                },
                WB = n._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = function () {
                    return (WB = n._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = n.asm.Ts).apply(null, arguments)
                },
                AB = n._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = function () {
                    return (AB = n._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = n.asm.Us).apply(null, arguments)
                },
                MB = n._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = function () {
                    return (MB = n._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = n.asm.Vs).apply(null, arguments)
                },
                xB = n._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = function () {
                    return (xB = n._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = n.asm.Ws).apply(null, arguments)
                },
                FB = n._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = function () {
                    return (FB = n._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = n.asm.Xs).apply(null, arguments)
                },
                LB = n._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = function () {
                    return (LB = n._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = n.asm.Ys).apply(null, arguments)
                },
                GB = n._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = function () {
                    return (GB = n._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = n.asm.Zs).apply(null, arguments)
                },
                wB = n._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = function () {
                    return (wB = n._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = n.asm._s).apply(null, arguments)
                },
                HB = n._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = function () {
                    return (HB = n._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = n.asm.$s).apply(null, arguments)
                },
                VB = n._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = function () {
                    return (VB = n._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = n.asm.at).apply(null, arguments)
                },
                EB = n._emscripten_bind_RaycastInfo_get_m_isInContact_0 = function () {
                    return (EB = n._emscripten_bind_RaycastInfo_get_m_isInContact_0 = n.asm.bt).apply(null, arguments)
                },
                NB = n._emscripten_bind_RaycastInfo_set_m_isInContact_1 = function () {
                    return (NB = n._emscripten_bind_RaycastInfo_set_m_isInContact_1 = n.asm.ct).apply(null, arguments)
                },
                UB = n._emscripten_bind_RaycastInfo_get_m_groundObject_0 = function () {
                    return (UB = n._emscripten_bind_RaycastInfo_get_m_groundObject_0 = n.asm.dt).apply(null, arguments)
                },
                zB = n._emscripten_bind_RaycastInfo_set_m_groundObject_1 = function () {
                    return (zB = n._emscripten_bind_RaycastInfo_set_m_groundObject_1 = n.asm.et).apply(null, arguments)
                },
                qB = n._emscripten_bind_RaycastInfo___destroy___0 = function () {
                    return (qB = n._emscripten_bind_RaycastInfo___destroy___0 = n.asm.ft).apply(null, arguments)
                },
                KB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = function () {
                    return (KB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = n.asm.gt).apply(null, arguments)
                },
                QB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = function () {
                    return (QB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = n.asm.ht).apply(null, arguments)
                },
                XB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = function () {
                    return (XB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = n.asm.it).apply(null, arguments)
                },
                ZB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = function () {
                    return (ZB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = n.asm.jt).apply(null, arguments)
                },
                YB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = function () {
                    return (YB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = n.asm.kt).apply(null, arguments)
                },
                JB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = function () {
                    return (JB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = n.asm.lt).apply(null, arguments)
                },
                $B = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = function () {
                    return ($B = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = n.asm.mt).apply(null, arguments)
                },
                tg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = function () {
                    return (tg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = n.asm.nt).apply(null, arguments)
                },
                eg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = function () {
                    return (eg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = n.asm.ot).apply(null, arguments)
                },
                ng = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = function () {
                    return (ng = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = n.asm.pt).apply(null, arguments)
                },
                og = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = function () {
                    return (og = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = n.asm.qt).apply(null, arguments)
                },
                _g = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = function () {
                    return (_g = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = n.asm.rt).apply(null, arguments)
                },
                ig = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = function () {
                    return (ig = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = n.asm.st).apply(null, arguments)
                },
                rg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = function () {
                    return (rg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = n.asm.tt).apply(null, arguments)
                },
                pg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = function () {
                    return (pg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = n.asm.ut).apply(null, arguments)
                },
                sg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = function () {
                    return (sg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = n.asm.vt).apply(null, arguments)
                },
                cg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = function () {
                    return (cg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = n.asm.wt).apply(null, arguments)
                },
                ag = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = function () {
                    return (ag = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = n.asm.xt).apply(null, arguments)
                },
                lg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = function () {
                    return (lg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = n.asm.yt).apply(null, arguments)
                },
                ug = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = function () {
                    return (ug = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = n.asm.zt).apply(null, arguments)
                },
                bg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = function () {
                    return (bg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = n.asm.At).apply(null, arguments)
                },
                mg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = function () {
                    return (mg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = n.asm.Bt).apply(null, arguments)
                },
                yg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = function () {
                    return (yg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = n.asm.Ct).apply(null, arguments)
                },
                dg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = function () {
                    return (dg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = n.asm.Dt).apply(null, arguments)
                },
                fg = n._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = function () {
                    return (fg = n._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = n.asm.Et).apply(null, arguments)
                },
                hg = n._emscripten_bind_btWheelInfo_btWheelInfo_1 = function () {
                    return (hg = n._emscripten_bind_btWheelInfo_btWheelInfo_1 = n.asm.Ft).apply(null, arguments)
                },
                Bg = n._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = function () {
                    return (Bg = n._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = n.asm.Gt).apply(null, arguments)
                },
                gg = n._emscripten_bind_btWheelInfo_updateWheel_2 = function () {
                    return (gg = n._emscripten_bind_btWheelInfo_updateWheel_2 = n.asm.Ht).apply(null, arguments)
                },
                kg = n._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = function () {
                    return (kg = n._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = n.asm.It).apply(null, arguments)
                },
                Cg = n._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = function () {
                    return (Cg = n._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = n.asm.Jt).apply(null, arguments)
                },
                Sg = n._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = function () {
                    return (Sg = n._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = n.asm.Kt).apply(null, arguments)
                },
                jg = n._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = function () {
                    return (jg = n._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = n.asm.Lt).apply(null, arguments)
                },
                vg = n._emscripten_bind_btWheelInfo_get_m_engineForce_0 = function () {
                    return (vg = n._emscripten_bind_btWheelInfo_get_m_engineForce_0 = n.asm.Mt).apply(null, arguments)
                },
                Ig = n._emscripten_bind_btWheelInfo_set_m_engineForce_1 = function () {
                    return (Ig = n._emscripten_bind_btWheelInfo_set_m_engineForce_1 = n.asm.Nt).apply(null, arguments)
                },
                Rg = n._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = function () {
                    return (Rg = n._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = n.asm.Ot).apply(null, arguments)
                },
                Dg = n._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = function () {
                    return (Dg = n._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = n.asm.Pt).apply(null, arguments)
                },
                Pg = n._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = function () {
                    return (Pg = n._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = n.asm.Qt).apply(null, arguments)
                },
                Tg = n._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = function () {
                    return (Tg = n._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = n.asm.Rt).apply(null, arguments)
                },
                Og = n._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = function () {
                    return (Og = n._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = n.asm.St).apply(null, arguments)
                },
                Wg = n._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = function () {
                    return (Wg = n._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = n.asm.Tt).apply(null, arguments)
                },
                Ag = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = function () {
                    return (Ag = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = n.asm.Ut).apply(null, arguments)
                },
                Mg = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = function () {
                    return (Mg = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = n.asm.Vt).apply(null, arguments)
                },
                xg = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = function () {
                    return (xg = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = n.asm.Wt).apply(null, arguments)
                },
                Fg = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = function () {
                    return (Fg = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = n.asm.Xt).apply(null, arguments)
                },
                Lg = n._emscripten_bind_btWheelInfo_get_m_steering_0 = function () {
                    return (Lg = n._emscripten_bind_btWheelInfo_get_m_steering_0 = n.asm.Yt).apply(null, arguments)
                },
                Gg = n._emscripten_bind_btWheelInfo_set_m_steering_1 = function () {
                    return (Gg = n._emscripten_bind_btWheelInfo_set_m_steering_1 = n.asm.Zt).apply(null, arguments)
                },
                wg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = function () {
                    return (wg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = n.asm._t).apply(null, arguments)
                },
                Hg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = function () {
                    return (Hg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = n.asm.$t).apply(null, arguments)
                },
                Vg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = function () {
                    return (Vg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = n.asm.au).apply(null, arguments)
                },
                Eg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = function () {
                    return (Eg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = n.asm.bu).apply(null, arguments)
                },
                Ng = n._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = function () {
                    return (Ng = n._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = n.asm.cu).apply(null, arguments)
                },
                Ug = n._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = function () {
                    return (Ug = n._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = n.asm.du).apply(null, arguments)
                },
                zg = n._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = function () {
                    return (zg = n._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = n.asm.eu).apply(null, arguments)
                },
                qg = n._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = function () {
                    return (qg = n._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = n.asm.fu).apply(null, arguments)
                },
                Kg = n._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = function () {
                    return (Kg = n._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = n.asm.gu).apply(null, arguments)
                },
                Qg = n._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = function () {
                    return (Qg = n._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = n.asm.hu).apply(null, arguments)
                },
                Xg = n._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = function () {
                    return (Xg = n._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = n.asm.iu).apply(null, arguments)
                },
                Zg = n._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = function () {
                    return (Zg = n._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = n.asm.ju).apply(null, arguments)
                },
                Yg = n._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = function () {
                    return (Yg = n._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = n.asm.ku).apply(null, arguments)
                },
                Jg = n._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = function () {
                    return (Jg = n._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = n.asm.lu).apply(null, arguments)
                },
                $g = n._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = function () {
                    return ($g = n._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = n.asm.mu).apply(null, arguments)
                },
                tk = n._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = function () {
                    return (tk = n._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = n.asm.nu).apply(null, arguments)
                },
                ek = n._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = function () {
                    return (ek = n._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = n.asm.ou).apply(null, arguments)
                },
                nk = n._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = function () {
                    return (nk = n._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = n.asm.pu).apply(null, arguments)
                },
                ok = n._emscripten_bind_btWheelInfo_get_m_rotation_0 = function () {
                    return (ok = n._emscripten_bind_btWheelInfo_get_m_rotation_0 = n.asm.qu).apply(null, arguments)
                },
                _k = n._emscripten_bind_btWheelInfo_set_m_rotation_1 = function () {
                    return (_k = n._emscripten_bind_btWheelInfo_set_m_rotation_1 = n.asm.ru).apply(null, arguments)
                },
                ik = n._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = function () {
                    return (ik = n._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = n.asm.su).apply(null, arguments)
                },
                rk = n._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = function () {
                    return (rk = n._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = n.asm.tu).apply(null, arguments)
                },
                pk = n._emscripten_bind_btWheelInfo_get_m_brake_0 = function () {
                    return (pk = n._emscripten_bind_btWheelInfo_get_m_brake_0 = n.asm.uu).apply(null, arguments)
                },
                sk = n._emscripten_bind_btWheelInfo_set_m_brake_1 = function () {
                    return (sk = n._emscripten_bind_btWheelInfo_set_m_brake_1 = n.asm.vu).apply(null, arguments)
                },
                ck = n._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = function () {
                    return (ck = n._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = n.asm.wu).apply(null, arguments)
                },
                ak = n._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = function () {
                    return (ak = n._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = n.asm.xu).apply(null, arguments)
                },
                lk = n._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = function () {
                    return (lk = n._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = n.asm.yu).apply(null, arguments)
                },
                uk = n._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = function () {
                    return (uk = n._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = n.asm.zu).apply(null, arguments)
                },
                bk = n._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = function () {
                    return (bk = n._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = n.asm.Au).apply(null, arguments)
                },
                mk = n._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = function () {
                    return (mk = n._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = n.asm.Bu).apply(null, arguments)
                },
                yk = n._emscripten_bind_btWheelInfo___destroy___0 = function () {
                    return (yk = n._emscripten_bind_btWheelInfo___destroy___0 = n.asm.Cu).apply(null, arguments)
                },
                dk = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = function () {
                    return (dk = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = n.asm.Du).apply(null, arguments)
                },
                fk = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = function () {
                    return (fk = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = n.asm.Eu).apply(null, arguments)
                },
                hk = n._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function () {
                    return (hk = n._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = n.asm.Fu).apply(null, arguments)
                },
                Bk = n._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = function () {
                    return (Bk = n._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = n.asm.Gu).apply(null, arguments)
                },
                gk = n._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = function () {
                    return (gk = n._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = n.asm.Hu).apply(null, arguments)
                },
                kk = n._emscripten_bind_btKinematicCharacterController_warp_1 = function () {
                    return (kk = n._emscripten_bind_btKinematicCharacterController_warp_1 = n.asm.Iu).apply(null, arguments)
                },
                Ck = n._emscripten_bind_btKinematicCharacterController_preStep_1 = function () {
                    return (Ck = n._emscripten_bind_btKinematicCharacterController_preStep_1 = n.asm.Ju).apply(null, arguments)
                },
                Sk = n._emscripten_bind_btKinematicCharacterController_playerStep_2 = function () {
                    return (Sk = n._emscripten_bind_btKinematicCharacterController_playerStep_2 = n.asm.Ku).apply(null, arguments)
                },
                jk = n._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = function () {
                    return (jk = n._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = n.asm.Lu).apply(null, arguments)
                },
                vk = n._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function () {
                    return (vk = n._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = n.asm.Mu).apply(null, arguments)
                },
                Ik = n._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function () {
                    return (Ik = n._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = n.asm.Nu).apply(null, arguments)
                },
                Rk = n._emscripten_bind_btKinematicCharacterController_canJump_0 = function () {
                    return (Rk = n._emscripten_bind_btKinematicCharacterController_canJump_0 = n.asm.Ou).apply(null, arguments)
                },
                Dk = n._emscripten_bind_btKinematicCharacterController_jump_0 = function () {
                    return (Dk = n._emscripten_bind_btKinematicCharacterController_jump_0 = n.asm.Pu).apply(null, arguments)
                },
                Pk = n._emscripten_bind_btKinematicCharacterController_setGravity_1 = function () {
                    return (Pk = n._emscripten_bind_btKinematicCharacterController_setGravity_1 = n.asm.Qu).apply(null, arguments)
                },
                Tk = n._emscripten_bind_btKinematicCharacterController_getGravity_0 = function () {
                    return (Tk = n._emscripten_bind_btKinematicCharacterController_getGravity_0 = n.asm.Ru).apply(null, arguments)
                },
                Ok = n._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function () {
                    return (Ok = n._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = n.asm.Su).apply(null, arguments)
                },
                Wk = n._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function () {
                    return (Wk = n._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = n.asm.Tu).apply(null, arguments)
                },
                Ak = n._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function () {
                    return (Ak = n._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = n.asm.Uu).apply(null, arguments)
                },
                Mk = n._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function () {
                    return (Mk = n._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = n.asm.Vu).apply(null, arguments)
                },
                xk = n._emscripten_bind_btKinematicCharacterController_onGround_0 = function () {
                    return (xk = n._emscripten_bind_btKinematicCharacterController_onGround_0 = n.asm.Wu).apply(null, arguments)
                },
                Fk = n._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function () {
                    return (Fk = n._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = n.asm.Xu).apply(null, arguments)
                },
                Lk = n._emscripten_bind_btKinematicCharacterController_updateAction_2 = function () {
                    return (Lk = n._emscripten_bind_btKinematicCharacterController_updateAction_2 = n.asm.Yu).apply(null, arguments)
                },
                Gk = n._emscripten_bind_btKinematicCharacterController___destroy___0 = function () {
                    return (Gk = n._emscripten_bind_btKinematicCharacterController___destroy___0 = n.asm.Zu).apply(null, arguments)
                },
                wk = n._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = function () {
                    return (wk = n._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = n.asm._u).apply(null, arguments)
                },
                Hk = n._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = function () {
                    return (Hk = n._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = n.asm.$u).apply(null, arguments)
                },
                Vk = n._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = function () {
                    return (Vk = n._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = n.asm.av).apply(null, arguments)
                },
                Ek = n._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = function () {
                    return (Ek = n._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = n.asm.bv).apply(null, arguments)
                },
                Nk = n._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = function () {
                    return (Nk = n._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = n.asm.cv).apply(null, arguments)
                },
                Uk = n._emscripten_bind_btRaycastVehicle_addWheel_7 = function () {
                    return (Uk = n._emscripten_bind_btRaycastVehicle_addWheel_7 = n.asm.dv).apply(null, arguments)
                },
                zk = n._emscripten_bind_btRaycastVehicle_getNumWheels_0 = function () {
                    return (zk = n._emscripten_bind_btRaycastVehicle_getNumWheels_0 = n.asm.ev).apply(null, arguments)
                },
                qk = n._emscripten_bind_btRaycastVehicle_getRigidBody_0 = function () {
                    return (qk = n._emscripten_bind_btRaycastVehicle_getRigidBody_0 = n.asm.fv).apply(null, arguments)
                },
                Kk = n._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = function () {
                    return (Kk = n._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = n.asm.gv).apply(null, arguments)
                },
                Qk = n._emscripten_bind_btRaycastVehicle_setBrake_2 = function () {
                    return (Qk = n._emscripten_bind_btRaycastVehicle_setBrake_2 = n.asm.hv).apply(null, arguments)
                },
                Xk = n._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = function () {
                    return (Xk = n._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = n.asm.iv).apply(null, arguments)
                },
                Zk = n._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = function () {
                    return (Zk = n._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = n.asm.jv).apply(null, arguments)
                },
                Yk = n._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = function () {
                    return (Yk = n._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = n.asm.kv).apply(null, arguments)
                },
                Jk = n._emscripten_bind_btRaycastVehicle_rayCast_1 = function () {
                    return (Jk = n._emscripten_bind_btRaycastVehicle_rayCast_1 = n.asm.lv).apply(null, arguments)
                },
                $k = n._emscripten_bind_btRaycastVehicle_updateVehicle_1 = function () {
                    return ($k = n._emscripten_bind_btRaycastVehicle_updateVehicle_1 = n.asm.mv).apply(null, arguments)
                },
                tC = n._emscripten_bind_btRaycastVehicle_resetSuspension_0 = function () {
                    return (tC = n._emscripten_bind_btRaycastVehicle_resetSuspension_0 = n.asm.nv).apply(null, arguments)
                },
                eC = n._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = function () {
                    return (eC = n._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = n.asm.ov).apply(null, arguments)
                },
                nC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = function () {
                    return (nC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = n.asm.pv).apply(null, arguments)
                },
                oC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = function () {
                    return (oC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = n.asm.qv).apply(null, arguments)
                },
                _C = n._emscripten_bind_btRaycastVehicle_setPitchControl_1 = function () {
                    return (_C = n._emscripten_bind_btRaycastVehicle_setPitchControl_1 = n.asm.rv).apply(null, arguments)
                },
                iC = n._emscripten_bind_btRaycastVehicle_updateSuspension_1 = function () {
                    return (iC = n._emscripten_bind_btRaycastVehicle_updateSuspension_1 = n.asm.sv).apply(null, arguments)
                },
                rC = n._emscripten_bind_btRaycastVehicle_updateFriction_1 = function () {
                    return (rC = n._emscripten_bind_btRaycastVehicle_updateFriction_1 = n.asm.tv).apply(null, arguments)
                },
                pC = n._emscripten_bind_btRaycastVehicle_getRightAxis_0 = function () {
                    return (pC = n._emscripten_bind_btRaycastVehicle_getRightAxis_0 = n.asm.uv).apply(null, arguments)
                },
                sC = n._emscripten_bind_btRaycastVehicle_getUpAxis_0 = function () {
                    return (sC = n._emscripten_bind_btRaycastVehicle_getUpAxis_0 = n.asm.vv).apply(null, arguments)
                },
                cC = n._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = function () {
                    return (cC = n._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = n.asm.wv).apply(null, arguments)
                },
                aC = n._emscripten_bind_btRaycastVehicle_getForwardVector_0 = function () {
                    return (aC = n._emscripten_bind_btRaycastVehicle_getForwardVector_0 = n.asm.xv).apply(null, arguments)
                },
                lC = n._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = function () {
                    return (lC = n._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = n.asm.yv).apply(null, arguments)
                },
                uC = n._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = function () {
                    return (uC = n._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = n.asm.zv).apply(null, arguments)
                },
                bC = n._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = function () {
                    return (bC = n._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = n.asm.Av).apply(null, arguments)
                },
                mC = n._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = function () {
                    return (mC = n._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = n.asm.Bv).apply(null, arguments)
                },
                yC = n._emscripten_bind_btRaycastVehicle_updateAction_2 = function () {
                    return (yC = n._emscripten_bind_btRaycastVehicle_updateAction_2 = n.asm.Cv).apply(null, arguments)
                },
                dC = n._emscripten_bind_btRaycastVehicle___destroy___0 = function () {
                    return (dC = n._emscripten_bind_btRaycastVehicle___destroy___0 = n.asm.Dv).apply(null, arguments)
                },
                fC = n._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = function () {
                    return (fC = n._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = n.asm.Ev).apply(null, arguments)
                },
                hC = n._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function () {
                    return (hC = n._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = n.asm.Fv).apply(null, arguments)
                },
                BC = n._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = function () {
                    return (BC = n._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = n.asm.Gv).apply(null, arguments)
                },
                gC = n._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = function () {
                    return (gC = n._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = n.asm.Hv).apply(null, arguments)
                },
                kC = n._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function () {
                    return (kC = n._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = n.asm.Iv).apply(null, arguments)
                },
                CC = n._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function () {
                    return (CC = n._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = n.asm.Jv).apply(null, arguments)
                },
                SC = n._emscripten_bind_btPairCachingGhostObject_activate_0 = function () {
                    return (SC = n._emscripten_bind_btPairCachingGhostObject_activate_0 = n.asm.Kv).apply(null, arguments)
                },
                jC = n._emscripten_bind_btPairCachingGhostObject_activate_1 = function () {
                    return (jC = n._emscripten_bind_btPairCachingGhostObject_activate_1 = n.asm.Lv).apply(null, arguments)
                },
                vC = n._emscripten_bind_btPairCachingGhostObject_isActive_0 = function () {
                    return (vC = n._emscripten_bind_btPairCachingGhostObject_isActive_0 = n.asm.Mv).apply(null, arguments)
                },
                IC = n._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function () {
                    return (IC = n._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = n.asm.Nv).apply(null, arguments)
                },
                RC = n._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function () {
                    return (RC = n._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = n.asm.Ov).apply(null, arguments)
                },
                DC = n._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function () {
                    return (DC = n._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = n.asm.Pv).apply(null, arguments)
                },
                PC = n._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = function () {
                    return (PC = n._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = n.asm.Qv).apply(null, arguments)
                },
                TC = n._emscripten_bind_btPairCachingGhostObject_getFriction_0 = function () {
                    return (TC = n._emscripten_bind_btPairCachingGhostObject_getFriction_0 = n.asm.Rv).apply(null, arguments)
                },
                OC = n._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = function () {
                    return (OC = n._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = n.asm.Sv).apply(null, arguments)
                },
                WC = n._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function () {
                    return (WC = n._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = n.asm.Tv).apply(null, arguments)
                },
                AC = n._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function () {
                    return (AC = n._emscripten_bind_btPairCachingGhostObject_setFriction_1 = n.asm.Uv).apply(null, arguments)
                },
                MC = n._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function () {
                    return (MC = n._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = n.asm.Vv).apply(null, arguments)
                },
                xC = n._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function () {
                    return (xC = n._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = n.asm.Wv).apply(null, arguments)
                },
                FC = n._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function () {
                    return (FC = n._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = n.asm.Xv).apply(null, arguments)
                },
                LC = n._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function () {
                    return (LC = n._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = n.asm.Yv).apply(null, arguments)
                },
                GC = n._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = function () {
                    return (GC = n._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = n.asm.Zv).apply(null, arguments)
                },
                wC = n._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = function () {
                    return (wC = n._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = n.asm._v).apply(null, arguments)
                },
                HC = n._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function () {
                    return (HC = n._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = n.asm.$v).apply(null, arguments)
                },
                VC = n._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = function () {
                    return (VC = n._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = n.asm.aw).apply(null, arguments)
                },
                EC = n._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function () {
                    return (EC = n._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = n.asm.bw).apply(null, arguments)
                },
                NC = n._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function () {
                    return (NC = n._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = n.asm.cw).apply(null, arguments)
                },
                UC = n._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = function () {
                    return (UC = n._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = n.asm.dw).apply(null, arguments)
                },
                zC = n._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = function () {
                    return (zC = n._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = n.asm.ew).apply(null, arguments)
                },
                qC = n._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = function () {
                    return (qC = n._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = n.asm.fw).apply(null, arguments)
                },
                KC = n._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function () {
                    return (KC = n._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = n.asm.gw).apply(null, arguments)
                },
                QC = n._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function () {
                    return (QC = n._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = n.asm.hw).apply(null, arguments)
                },
                XC = n._emscripten_bind_btPairCachingGhostObject___destroy___0 = function () {
                    return (XC = n._emscripten_bind_btPairCachingGhostObject___destroy___0 = n.asm.iw).apply(null, arguments)
                },
                ZC = n._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = function () {
                    return (ZC = n._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = n.asm.jw).apply(null, arguments)
                },
                YC = n._emscripten_bind_btGhostPairCallback___destroy___0 = function () {
                    return (YC = n._emscripten_bind_btGhostPairCallback___destroy___0 = n.asm.kw).apply(null, arguments)
                },
                JC = n._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = function () {
                    return (JC = n._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = n.asm.lw).apply(null, arguments)
                },
                $C = n._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = function () {
                    return ($C = n._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = n.asm.mw).apply(null, arguments)
                },
                tS = n._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = function () {
                    return (tS = n._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = n.asm.nw).apply(null, arguments)
                },
                eS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = function () {
                    return (eS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = n.asm.ow).apply(null, arguments)
                },
                nS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = function () {
                    return (nS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = n.asm.pw).apply(null, arguments)
                },
                oS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = function () {
                    return (oS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = n.asm.qw).apply(null, arguments)
                },
                _S = n._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = function () {
                    return (_S = n._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = n.asm.rw).apply(null, arguments)
                },
                iS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = function () {
                    return (iS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = n.asm.sw).apply(null, arguments)
                },
                rS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = function () {
                    return (rS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = n.asm.tw).apply(null, arguments)
                },
                pS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = function () {
                    return (pS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = n.asm.uw).apply(null, arguments)
                },
                sS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = function () {
                    return (sS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = n.asm.vw).apply(null, arguments)
                },
                cS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = function () {
                    return (cS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = n.asm.ww).apply(null, arguments)
                },
                aS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = function () {
                    return (aS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = n.asm.xw).apply(null, arguments)
                },
                lS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = function () {
                    return (lS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = n.asm.yw).apply(null, arguments)
                },
                uS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = function () {
                    return (uS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = n.asm.zw).apply(null, arguments)
                },
                bS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = function () {
                    return (bS = n._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = n.asm.Aw).apply(null, arguments)
                },
                mS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = function () {
                    return (mS = n._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = n.asm.Bw).apply(null, arguments)
                },
                yS = n._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = function () {
                    return (yS = n._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = n.asm.Cw).apply(null, arguments)
                },
                dS = n._emscripten_bind_Face_get_m_n_1 = function () {
                    return (dS = n._emscripten_bind_Face_get_m_n_1 = n.asm.Dw).apply(null, arguments)
                },
                fS = n._emscripten_bind_Face_set_m_n_2 = function () {
                    return (fS = n._emscripten_bind_Face_set_m_n_2 = n.asm.Ew).apply(null, arguments)
                },
                hS = n._emscripten_bind_Face_get_m_normal_0 = function () {
                    return (hS = n._emscripten_bind_Face_get_m_normal_0 = n.asm.Fw).apply(null, arguments)
                },
                BS = n._emscripten_bind_Face_set_m_normal_1 = function () {
                    return (BS = n._emscripten_bind_Face_set_m_normal_1 = n.asm.Gw).apply(null, arguments)
                },
                gS = n._emscripten_bind_Face_get_m_ra_0 = function () {
                    return (gS = n._emscripten_bind_Face_get_m_ra_0 = n.asm.Hw).apply(null, arguments)
                },
                kS = n._emscripten_bind_Face_set_m_ra_1 = function () {
                    return (kS = n._emscripten_bind_Face_set_m_ra_1 = n.asm.Iw).apply(null, arguments)
                },
                CS = n._emscripten_bind_Face___destroy___0 = function () {
                    return (CS = n._emscripten_bind_Face___destroy___0 = n.asm.Jw).apply(null, arguments)
                },
                SS = n._emscripten_bind_tFaceArray_size_0 = function () {
                    return (SS = n._emscripten_bind_tFaceArray_size_0 = n.asm.Kw).apply(null, arguments)
                },
                jS = n._emscripten_bind_tFaceArray_at_1 = function () {
                    return (jS = n._emscripten_bind_tFaceArray_at_1 = n.asm.Lw).apply(null, arguments)
                },
                vS = n._emscripten_bind_tFaceArray___destroy___0 = function () {
                    return (vS = n._emscripten_bind_tFaceArray___destroy___0 = n.asm.Mw).apply(null, arguments)
                },
                IS = n._emscripten_bind_Node_get_m_x_0 = function () {
                    return (IS = n._emscripten_bind_Node_get_m_x_0 = n.asm.Nw).apply(null, arguments)
                },
                RS = n._emscripten_bind_Node_set_m_x_1 = function () {
                    return (RS = n._emscripten_bind_Node_set_m_x_1 = n.asm.Ow).apply(null, arguments)
                },
                DS = n._emscripten_bind_Node_get_m_q_0 = function () {
                    return (DS = n._emscripten_bind_Node_get_m_q_0 = n.asm.Pw).apply(null, arguments)
                },
                PS = n._emscripten_bind_Node_set_m_q_1 = function () {
                    return (PS = n._emscripten_bind_Node_set_m_q_1 = n.asm.Qw).apply(null, arguments)
                },
                TS = n._emscripten_bind_Node_get_m_v_0 = function () {
                    return (TS = n._emscripten_bind_Node_get_m_v_0 = n.asm.Rw).apply(null, arguments)
                },
                OS = n._emscripten_bind_Node_set_m_v_1 = function () {
                    return (OS = n._emscripten_bind_Node_set_m_v_1 = n.asm.Sw).apply(null, arguments)
                },
                WS = n._emscripten_bind_Node_get_m_f_0 = function () {
                    return (WS = n._emscripten_bind_Node_get_m_f_0 = n.asm.Tw).apply(null, arguments)
                },
                AS = n._emscripten_bind_Node_set_m_f_1 = function () {
                    return (AS = n._emscripten_bind_Node_set_m_f_1 = n.asm.Uw).apply(null, arguments)
                },
                MS = n._emscripten_bind_Node_get_m_n_0 = function () {
                    return (MS = n._emscripten_bind_Node_get_m_n_0 = n.asm.Vw).apply(null, arguments)
                },
                xS = n._emscripten_bind_Node_set_m_n_1 = function () {
                    return (xS = n._emscripten_bind_Node_set_m_n_1 = n.asm.Ww).apply(null, arguments)
                },
                FS = n._emscripten_bind_Node_get_m_im_0 = function () {
                    return (FS = n._emscripten_bind_Node_get_m_im_0 = n.asm.Xw).apply(null, arguments)
                },
                LS = n._emscripten_bind_Node_set_m_im_1 = function () {
                    return (LS = n._emscripten_bind_Node_set_m_im_1 = n.asm.Yw).apply(null, arguments)
                },
                GS = n._emscripten_bind_Node_get_m_area_0 = function () {
                    return (GS = n._emscripten_bind_Node_get_m_area_0 = n.asm.Zw).apply(null, arguments)
                },
                wS = n._emscripten_bind_Node_set_m_area_1 = function () {
                    return (wS = n._emscripten_bind_Node_set_m_area_1 = n.asm._w).apply(null, arguments)
                },
                HS = n._emscripten_bind_Node___destroy___0 = function () {
                    return (HS = n._emscripten_bind_Node___destroy___0 = n.asm.$w).apply(null, arguments)
                },
                VS = n._emscripten_bind_tNodeArray_size_0 = function () {
                    return (VS = n._emscripten_bind_tNodeArray_size_0 = n.asm.ax).apply(null, arguments)
                },
                ES = n._emscripten_bind_tNodeArray_at_1 = function () {
                    return (ES = n._emscripten_bind_tNodeArray_at_1 = n.asm.bx).apply(null, arguments)
                },
                NS = n._emscripten_bind_tNodeArray___destroy___0 = function () {
                    return (NS = n._emscripten_bind_tNodeArray___destroy___0 = n.asm.cx).apply(null, arguments)
                },
                US = n._emscripten_bind_Material_get_m_kLST_0 = function () {
                    return (US = n._emscripten_bind_Material_get_m_kLST_0 = n.asm.dx).apply(null, arguments)
                },
                zS = n._emscripten_bind_Material_set_m_kLST_1 = function () {
                    return (zS = n._emscripten_bind_Material_set_m_kLST_1 = n.asm.ex).apply(null, arguments)
                },
                qS = n._emscripten_bind_Material_get_m_kAST_0 = function () {
                    return (qS = n._emscripten_bind_Material_get_m_kAST_0 = n.asm.fx).apply(null, arguments)
                },
                KS = n._emscripten_bind_Material_set_m_kAST_1 = function () {
                    return (KS = n._emscripten_bind_Material_set_m_kAST_1 = n.asm.gx).apply(null, arguments)
                },
                QS = n._emscripten_bind_Material_get_m_kVST_0 = function () {
                    return (QS = n._emscripten_bind_Material_get_m_kVST_0 = n.asm.hx).apply(null, arguments)
                },
                XS = n._emscripten_bind_Material_set_m_kVST_1 = function () {
                    return (XS = n._emscripten_bind_Material_set_m_kVST_1 = n.asm.ix).apply(null, arguments)
                },
                ZS = n._emscripten_bind_Material_get_m_flags_0 = function () {
                    return (ZS = n._emscripten_bind_Material_get_m_flags_0 = n.asm.jx).apply(null, arguments)
                },
                YS = n._emscripten_bind_Material_set_m_flags_1 = function () {
                    return (YS = n._emscripten_bind_Material_set_m_flags_1 = n.asm.kx).apply(null, arguments)
                },
                JS = n._emscripten_bind_Material___destroy___0 = function () {
                    return (JS = n._emscripten_bind_Material___destroy___0 = n.asm.lx).apply(null, arguments)
                },
                $S = n._emscripten_bind_tMaterialArray_size_0 = function () {
                    return ($S = n._emscripten_bind_tMaterialArray_size_0 = n.asm.mx).apply(null, arguments)
                },
                tj = n._emscripten_bind_tMaterialArray_at_1 = function () {
                    return (tj = n._emscripten_bind_tMaterialArray_at_1 = n.asm.nx).apply(null, arguments)
                },
                ej = n._emscripten_bind_tMaterialArray___destroy___0 = function () {
                    return (ej = n._emscripten_bind_tMaterialArray___destroy___0 = n.asm.ox).apply(null, arguments)
                },
                nj = n._emscripten_bind_Anchor_get_m_node_0 = function () {
                    return (nj = n._emscripten_bind_Anchor_get_m_node_0 = n.asm.px).apply(null, arguments)
                },
                oj = n._emscripten_bind_Anchor_set_m_node_1 = function () {
                    return (oj = n._emscripten_bind_Anchor_set_m_node_1 = n.asm.qx).apply(null, arguments)
                },
                _j = n._emscripten_bind_Anchor_get_m_local_0 = function () {
                    return (_j = n._emscripten_bind_Anchor_get_m_local_0 = n.asm.rx).apply(null, arguments)
                },
                ij = n._emscripten_bind_Anchor_set_m_local_1 = function () {
                    return (ij = n._emscripten_bind_Anchor_set_m_local_1 = n.asm.sx).apply(null, arguments)
                },
                rj = n._emscripten_bind_Anchor_get_m_body_0 = function () {
                    return (rj = n._emscripten_bind_Anchor_get_m_body_0 = n.asm.tx).apply(null, arguments)
                },
                pj = n._emscripten_bind_Anchor_set_m_body_1 = function () {
                    return (pj = n._emscripten_bind_Anchor_set_m_body_1 = n.asm.ux).apply(null, arguments)
                },
                sj = n._emscripten_bind_Anchor_get_m_influence_0 = function () {
                    return (sj = n._emscripten_bind_Anchor_get_m_influence_0 = n.asm.vx).apply(null, arguments)
                },
                cj = n._emscripten_bind_Anchor_set_m_influence_1 = function () {
                    return (cj = n._emscripten_bind_Anchor_set_m_influence_1 = n.asm.wx).apply(null, arguments)
                },
                aj = n._emscripten_bind_Anchor_get_m_c0_0 = function () {
                    return (aj = n._emscripten_bind_Anchor_get_m_c0_0 = n.asm.xx).apply(null, arguments)
                },
                lj = n._emscripten_bind_Anchor_set_m_c0_1 = function () {
                    return (lj = n._emscripten_bind_Anchor_set_m_c0_1 = n.asm.yx).apply(null, arguments)
                },
                uj = n._emscripten_bind_Anchor_get_m_c1_0 = function () {
                    return (uj = n._emscripten_bind_Anchor_get_m_c1_0 = n.asm.zx).apply(null, arguments)
                },
                bj = n._emscripten_bind_Anchor_set_m_c1_1 = function () {
                    return (bj = n._emscripten_bind_Anchor_set_m_c1_1 = n.asm.Ax).apply(null, arguments)
                },
                mj = n._emscripten_bind_Anchor_get_m_c2_0 = function () {
                    return (mj = n._emscripten_bind_Anchor_get_m_c2_0 = n.asm.Bx).apply(null, arguments)
                },
                yj = n._emscripten_bind_Anchor_set_m_c2_1 = function () {
                    return (yj = n._emscripten_bind_Anchor_set_m_c2_1 = n.asm.Cx).apply(null, arguments)
                },
                dj = n._emscripten_bind_Anchor___destroy___0 = function () {
                    return (dj = n._emscripten_bind_Anchor___destroy___0 = n.asm.Dx).apply(null, arguments)
                },
                fj = n._emscripten_bind_tAnchorArray_size_0 = function () {
                    return (fj = n._emscripten_bind_tAnchorArray_size_0 = n.asm.Ex).apply(null, arguments)
                },
                hj = n._emscripten_bind_tAnchorArray_at_1 = function () {
                    return (hj = n._emscripten_bind_tAnchorArray_at_1 = n.asm.Fx).apply(null, arguments)
                },
                Bj = n._emscripten_bind_tAnchorArray_clear_0 = function () {
                    return (Bj = n._emscripten_bind_tAnchorArray_clear_0 = n.asm.Gx).apply(null, arguments)
                },
                gj = n._emscripten_bind_tAnchorArray_push_back_1 = function () {
                    return (gj = n._emscripten_bind_tAnchorArray_push_back_1 = n.asm.Hx).apply(null, arguments)
                },
                kj = n._emscripten_bind_tAnchorArray_pop_back_0 = function () {
                    return (kj = n._emscripten_bind_tAnchorArray_pop_back_0 = n.asm.Ix).apply(null, arguments)
                },
                Cj = n._emscripten_bind_tAnchorArray___destroy___0 = function () {
                    return (Cj = n._emscripten_bind_tAnchorArray___destroy___0 = n.asm.Jx).apply(null, arguments)
                },
                Sj = n._emscripten_bind_Config_get_kVCF_0 = function () {
                    return (Sj = n._emscripten_bind_Config_get_kVCF_0 = n.asm.Kx).apply(null, arguments)
                },
                jj = n._emscripten_bind_Config_set_kVCF_1 = function () {
                    return (jj = n._emscripten_bind_Config_set_kVCF_1 = n.asm.Lx).apply(null, arguments)
                },
                vj = n._emscripten_bind_Config_get_kDP_0 = function () {
                    return (vj = n._emscripten_bind_Config_get_kDP_0 = n.asm.Mx).apply(null, arguments)
                },
                Ij = n._emscripten_bind_Config_set_kDP_1 = function () {
                    return (Ij = n._emscripten_bind_Config_set_kDP_1 = n.asm.Nx).apply(null, arguments)
                },
                Rj = n._emscripten_bind_Config_get_kDG_0 = function () {
                    return (Rj = n._emscripten_bind_Config_get_kDG_0 = n.asm.Ox).apply(null, arguments)
                },
                Dj = n._emscripten_bind_Config_set_kDG_1 = function () {
                    return (Dj = n._emscripten_bind_Config_set_kDG_1 = n.asm.Px).apply(null, arguments)
                },
                Pj = n._emscripten_bind_Config_get_kLF_0 = function () {
                    return (Pj = n._emscripten_bind_Config_get_kLF_0 = n.asm.Qx).apply(null, arguments)
                },
                Tj = n._emscripten_bind_Config_set_kLF_1 = function () {
                    return (Tj = n._emscripten_bind_Config_set_kLF_1 = n.asm.Rx).apply(null, arguments)
                },
                Oj = n._emscripten_bind_Config_get_kPR_0 = function () {
                    return (Oj = n._emscripten_bind_Config_get_kPR_0 = n.asm.Sx).apply(null, arguments)
                },
                Wj = n._emscripten_bind_Config_set_kPR_1 = function () {
                    return (Wj = n._emscripten_bind_Config_set_kPR_1 = n.asm.Tx).apply(null, arguments)
                },
                Aj = n._emscripten_bind_Config_get_kVC_0 = function () {
                    return (Aj = n._emscripten_bind_Config_get_kVC_0 = n.asm.Ux).apply(null, arguments)
                },
                Mj = n._emscripten_bind_Config_set_kVC_1 = function () {
                    return (Mj = n._emscripten_bind_Config_set_kVC_1 = n.asm.Vx).apply(null, arguments)
                },
                xj = n._emscripten_bind_Config_get_kDF_0 = function () {
                    return (xj = n._emscripten_bind_Config_get_kDF_0 = n.asm.Wx).apply(null, arguments)
                },
                Fj = n._emscripten_bind_Config_set_kDF_1 = function () {
                    return (Fj = n._emscripten_bind_Config_set_kDF_1 = n.asm.Xx).apply(null, arguments)
                },
                Lj = n._emscripten_bind_Config_get_kMT_0 = function () {
                    return (Lj = n._emscripten_bind_Config_get_kMT_0 = n.asm.Yx).apply(null, arguments)
                },
                Gj = n._emscripten_bind_Config_set_kMT_1 = function () {
                    return (Gj = n._emscripten_bind_Config_set_kMT_1 = n.asm.Zx).apply(null, arguments)
                },
                wj = n._emscripten_bind_Config_get_kCHR_0 = function () {
                    return (wj = n._emscripten_bind_Config_get_kCHR_0 = n.asm._x).apply(null, arguments)
                },
                Hj = n._emscripten_bind_Config_set_kCHR_1 = function () {
                    return (Hj = n._emscripten_bind_Config_set_kCHR_1 = n.asm.$x).apply(null, arguments)
                },
                Vj = n._emscripten_bind_Config_get_kKHR_0 = function () {
                    return (Vj = n._emscripten_bind_Config_get_kKHR_0 = n.asm.ay).apply(null, arguments)
                },
                Ej = n._emscripten_bind_Config_set_kKHR_1 = function () {
                    return (Ej = n._emscripten_bind_Config_set_kKHR_1 = n.asm.by).apply(null, arguments)
                },
                Nj = n._emscripten_bind_Config_get_kSHR_0 = function () {
                    return (Nj = n._emscripten_bind_Config_get_kSHR_0 = n.asm.cy).apply(null, arguments)
                },
                Uj = n._emscripten_bind_Config_set_kSHR_1 = function () {
                    return (Uj = n._emscripten_bind_Config_set_kSHR_1 = n.asm.dy).apply(null, arguments)
                },
                zj = n._emscripten_bind_Config_get_kAHR_0 = function () {
                    return (zj = n._emscripten_bind_Config_get_kAHR_0 = n.asm.ey).apply(null, arguments)
                },
                qj = n._emscripten_bind_Config_set_kAHR_1 = function () {
                    return (qj = n._emscripten_bind_Config_set_kAHR_1 = n.asm.fy).apply(null, arguments)
                },
                Kj = n._emscripten_bind_Config_get_kSRHR_CL_0 = function () {
                    return (Kj = n._emscripten_bind_Config_get_kSRHR_CL_0 = n.asm.gy).apply(null, arguments)
                },
                Qj = n._emscripten_bind_Config_set_kSRHR_CL_1 = function () {
                    return (Qj = n._emscripten_bind_Config_set_kSRHR_CL_1 = n.asm.hy).apply(null, arguments)
                },
                Xj = n._emscripten_bind_Config_get_kSKHR_CL_0 = function () {
                    return (Xj = n._emscripten_bind_Config_get_kSKHR_CL_0 = n.asm.iy).apply(null, arguments)
                },
                Zj = n._emscripten_bind_Config_set_kSKHR_CL_1 = function () {
                    return (Zj = n._emscripten_bind_Config_set_kSKHR_CL_1 = n.asm.jy).apply(null, arguments)
                },
                Yj = n._emscripten_bind_Config_get_kSSHR_CL_0 = function () {
                    return (Yj = n._emscripten_bind_Config_get_kSSHR_CL_0 = n.asm.ky).apply(null, arguments)
                },
                Jj = n._emscripten_bind_Config_set_kSSHR_CL_1 = function () {
                    return (Jj = n._emscripten_bind_Config_set_kSSHR_CL_1 = n.asm.ly).apply(null, arguments)
                },
                $j = n._emscripten_bind_Config_get_kSR_SPLT_CL_0 = function () {
                    return ($j = n._emscripten_bind_Config_get_kSR_SPLT_CL_0 = n.asm.my).apply(null, arguments)
                },
                tv = n._emscripten_bind_Config_set_kSR_SPLT_CL_1 = function () {
                    return (tv = n._emscripten_bind_Config_set_kSR_SPLT_CL_1 = n.asm.ny).apply(null, arguments)
                },
                ev = n._emscripten_bind_Config_get_kSK_SPLT_CL_0 = function () {
                    return (ev = n._emscripten_bind_Config_get_kSK_SPLT_CL_0 = n.asm.oy).apply(null, arguments)
                },
                nv = n._emscripten_bind_Config_set_kSK_SPLT_CL_1 = function () {
                    return (nv = n._emscripten_bind_Config_set_kSK_SPLT_CL_1 = n.asm.py).apply(null, arguments)
                },
                ov = n._emscripten_bind_Config_get_kSS_SPLT_CL_0 = function () {
                    return (ov = n._emscripten_bind_Config_get_kSS_SPLT_CL_0 = n.asm.qy).apply(null, arguments)
                },
                _v = n._emscripten_bind_Config_set_kSS_SPLT_CL_1 = function () {
                    return (_v = n._emscripten_bind_Config_set_kSS_SPLT_CL_1 = n.asm.ry).apply(null, arguments)
                },
                iv = n._emscripten_bind_Config_get_maxvolume_0 = function () {
                    return (iv = n._emscripten_bind_Config_get_maxvolume_0 = n.asm.sy).apply(null, arguments)
                },
                rv = n._emscripten_bind_Config_set_maxvolume_1 = function () {
                    return (rv = n._emscripten_bind_Config_set_maxvolume_1 = n.asm.ty).apply(null, arguments)
                },
                pv = n._emscripten_bind_Config_get_timescale_0 = function () {
                    return (pv = n._emscripten_bind_Config_get_timescale_0 = n.asm.uy).apply(null, arguments)
                },
                sv = n._emscripten_bind_Config_set_timescale_1 = function () {
                    return (sv = n._emscripten_bind_Config_set_timescale_1 = n.asm.vy).apply(null, arguments)
                },
                cv = n._emscripten_bind_Config_get_viterations_0 = function () {
                    return (cv = n._emscripten_bind_Config_get_viterations_0 = n.asm.wy).apply(null, arguments)
                },
                av = n._emscripten_bind_Config_set_viterations_1 = function () {
                    return (av = n._emscripten_bind_Config_set_viterations_1 = n.asm.xy).apply(null, arguments)
                },
                lv = n._emscripten_bind_Config_get_piterations_0 = function () {
                    return (lv = n._emscripten_bind_Config_get_piterations_0 = n.asm.yy).apply(null, arguments)
                },
                uv = n._emscripten_bind_Config_set_piterations_1 = function () {
                    return (uv = n._emscripten_bind_Config_set_piterations_1 = n.asm.zy).apply(null, arguments)
                },
                bv = n._emscripten_bind_Config_get_diterations_0 = function () {
                    return (bv = n._emscripten_bind_Config_get_diterations_0 = n.asm.Ay).apply(null, arguments)
                },
                mv = n._emscripten_bind_Config_set_diterations_1 = function () {
                    return (mv = n._emscripten_bind_Config_set_diterations_1 = n.asm.By).apply(null, arguments)
                },
                yv = n._emscripten_bind_Config_get_citerations_0 = function () {
                    return (yv = n._emscripten_bind_Config_get_citerations_0 = n.asm.Cy).apply(null, arguments)
                },
                dv = n._emscripten_bind_Config_set_citerations_1 = function () {
                    return (dv = n._emscripten_bind_Config_set_citerations_1 = n.asm.Dy).apply(null, arguments)
                },
                fv = n._emscripten_bind_Config_get_collisions_0 = function () {
                    return (fv = n._emscripten_bind_Config_get_collisions_0 = n.asm.Ey).apply(null, arguments)
                },
                hv = n._emscripten_bind_Config_set_collisions_1 = function () {
                    return (hv = n._emscripten_bind_Config_set_collisions_1 = n.asm.Fy).apply(null, arguments)
                },
                Bv = n._emscripten_bind_Config___destroy___0 = function () {
                    return (Bv = n._emscripten_bind_Config___destroy___0 = n.asm.Gy).apply(null, arguments)
                },
                gv = n._emscripten_bind_btSoftBody_btSoftBody_4 = function () {
                    return (gv = n._emscripten_bind_btSoftBody_btSoftBody_4 = n.asm.Hy).apply(null, arguments)
                },
                kv = n._emscripten_bind_btSoftBody_checkLink_2 = function () {
                    return (kv = n._emscripten_bind_btSoftBody_checkLink_2 = n.asm.Iy).apply(null, arguments)
                },
                Cv = n._emscripten_bind_btSoftBody_checkFace_3 = function () {
                    return (Cv = n._emscripten_bind_btSoftBody_checkFace_3 = n.asm.Jy).apply(null, arguments)
                },
                Sv = n._emscripten_bind_btSoftBody_appendMaterial_0 = function () {
                    return (Sv = n._emscripten_bind_btSoftBody_appendMaterial_0 = n.asm.Ky).apply(null, arguments)
                },
                jv = n._emscripten_bind_btSoftBody_appendNode_2 = function () {
                    return (jv = n._emscripten_bind_btSoftBody_appendNode_2 = n.asm.Ly).apply(null, arguments)
                },
                vv = n._emscripten_bind_btSoftBody_appendLink_4 = function () {
                    return (vv = n._emscripten_bind_btSoftBody_appendLink_4 = n.asm.My).apply(null, arguments)
                },
                Iv = n._emscripten_bind_btSoftBody_appendFace_4 = function () {
                    return (Iv = n._emscripten_bind_btSoftBody_appendFace_4 = n.asm.Ny).apply(null, arguments)
                },
                Rv = n._emscripten_bind_btSoftBody_appendTetra_5 = function () {
                    return (Rv = n._emscripten_bind_btSoftBody_appendTetra_5 = n.asm.Oy).apply(null, arguments)
                },
                Dv = n._emscripten_bind_btSoftBody_appendAnchor_4 = function () {
                    return (Dv = n._emscripten_bind_btSoftBody_appendAnchor_4 = n.asm.Py).apply(null, arguments)
                },
                Pv = n._emscripten_bind_btSoftBody_addForce_1 = function () {
                    return (Pv = n._emscripten_bind_btSoftBody_addForce_1 = n.asm.Qy).apply(null, arguments)
                },
                Tv = n._emscripten_bind_btSoftBody_addForce_2 = function () {
                    return (Tv = n._emscripten_bind_btSoftBody_addForce_2 = n.asm.Ry).apply(null, arguments)
                },
                Ov = n._emscripten_bind_btSoftBody_addAeroForceToNode_2 = function () {
                    return (Ov = n._emscripten_bind_btSoftBody_addAeroForceToNode_2 = n.asm.Sy).apply(null, arguments)
                },
                Wv = n._emscripten_bind_btSoftBody_getTotalMass_0 = function () {
                    return (Wv = n._emscripten_bind_btSoftBody_getTotalMass_0 = n.asm.Ty).apply(null, arguments)
                },
                Av = n._emscripten_bind_btSoftBody_setTotalMass_2 = function () {
                    return (Av = n._emscripten_bind_btSoftBody_setTotalMass_2 = n.asm.Uy).apply(null, arguments)
                },
                Mv = n._emscripten_bind_btSoftBody_setMass_2 = function () {
                    return (Mv = n._emscripten_bind_btSoftBody_setMass_2 = n.asm.Vy).apply(null, arguments)
                },
                xv = n._emscripten_bind_btSoftBody_transform_1 = function () {
                    return (xv = n._emscripten_bind_btSoftBody_transform_1 = n.asm.Wy).apply(null, arguments)
                },
                Fv = n._emscripten_bind_btSoftBody_translate_1 = function () {
                    return (Fv = n._emscripten_bind_btSoftBody_translate_1 = n.asm.Xy).apply(null, arguments)
                },
                Lv = n._emscripten_bind_btSoftBody_rotate_1 = function () {
                    return (Lv = n._emscripten_bind_btSoftBody_rotate_1 = n.asm.Yy).apply(null, arguments)
                },
                Gv = n._emscripten_bind_btSoftBody_scale_1 = function () {
                    return (Gv = n._emscripten_bind_btSoftBody_scale_1 = n.asm.Zy).apply(null, arguments)
                },
                wv = n._emscripten_bind_btSoftBody_generateClusters_1 = function () {
                    return (wv = n._emscripten_bind_btSoftBody_generateClusters_1 = n.asm._y).apply(null, arguments)
                },
                Hv = n._emscripten_bind_btSoftBody_generateClusters_2 = function () {
                    return (Hv = n._emscripten_bind_btSoftBody_generateClusters_2 = n.asm.$y).apply(null, arguments)
                },
                Vv = n._emscripten_bind_btSoftBody_generateBendingConstraints_2 = function () {
                    return (Vv = n._emscripten_bind_btSoftBody_generateBendingConstraints_2 = n.asm.az).apply(null, arguments)
                },
                Ev = n._emscripten_bind_btSoftBody_upcast_1 = function () {
                    return (Ev = n._emscripten_bind_btSoftBody_upcast_1 = n.asm.bz).apply(null, arguments)
                },
                Nv = n._emscripten_bind_btSoftBody_getRestLengthScale_0 = function () {
                    return (Nv = n._emscripten_bind_btSoftBody_getRestLengthScale_0 = n.asm.cz).apply(null, arguments)
                },
                Uv = n._emscripten_bind_btSoftBody_setRestLengthScale_1 = function () {
                    return (Uv = n._emscripten_bind_btSoftBody_setRestLengthScale_1 = n.asm.dz).apply(null, arguments)
                },
                zv = n._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = function () {
                    return (zv = n._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = n.asm.ez).apply(null, arguments)
                },
                qv = n._emscripten_bind_btSoftBody_getCollisionShape_0 = function () {
                    return (qv = n._emscripten_bind_btSoftBody_getCollisionShape_0 = n.asm.fz).apply(null, arguments)
                },
                Kv = n._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = function () {
                    return (Kv = n._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = n.asm.gz).apply(null, arguments)
                },
                Qv = n._emscripten_bind_btSoftBody_setActivationState_1 = function () {
                    return (Qv = n._emscripten_bind_btSoftBody_setActivationState_1 = n.asm.hz).apply(null, arguments)
                },
                Xv = n._emscripten_bind_btSoftBody_forceActivationState_1 = function () {
                    return (Xv = n._emscripten_bind_btSoftBody_forceActivationState_1 = n.asm.iz).apply(null, arguments)
                },
                Zv = n._emscripten_bind_btSoftBody_activate_0 = function () {
                    return (Zv = n._emscripten_bind_btSoftBody_activate_0 = n.asm.jz).apply(null, arguments)
                },
                Yv = n._emscripten_bind_btSoftBody_activate_1 = function () {
                    return (Yv = n._emscripten_bind_btSoftBody_activate_1 = n.asm.kz).apply(null, arguments)
                },
                Jv = n._emscripten_bind_btSoftBody_isActive_0 = function () {
                    return (Jv = n._emscripten_bind_btSoftBody_isActive_0 = n.asm.lz).apply(null, arguments)
                },
                $v = n._emscripten_bind_btSoftBody_isKinematicObject_0 = function () {
                    return ($v = n._emscripten_bind_btSoftBody_isKinematicObject_0 = n.asm.mz).apply(null, arguments)
                },
                tI = n._emscripten_bind_btSoftBody_isStaticObject_0 = function () {
                    return (tI = n._emscripten_bind_btSoftBody_isStaticObject_0 = n.asm.nz).apply(null, arguments)
                },
                eI = n._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = function () {
                    return (eI = n._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = n.asm.oz).apply(null, arguments)
                },
                nI = n._emscripten_bind_btSoftBody_getRestitution_0 = function () {
                    return (nI = n._emscripten_bind_btSoftBody_getRestitution_0 = n.asm.pz).apply(null, arguments)
                },
                oI = n._emscripten_bind_btSoftBody_getFriction_0 = function () {
                    return (oI = n._emscripten_bind_btSoftBody_getFriction_0 = n.asm.qz).apply(null, arguments)
                },
                _I = n._emscripten_bind_btSoftBody_getRollingFriction_0 = function () {
                    return (_I = n._emscripten_bind_btSoftBody_getRollingFriction_0 = n.asm.rz).apply(null, arguments)
                },
                iI = n._emscripten_bind_btSoftBody_setRestitution_1 = function () {
                    return (iI = n._emscripten_bind_btSoftBody_setRestitution_1 = n.asm.sz).apply(null, arguments)
                },
                rI = n._emscripten_bind_btSoftBody_setFriction_1 = function () {
                    return (rI = n._emscripten_bind_btSoftBody_setFriction_1 = n.asm.tz).apply(null, arguments)
                },
                pI = n._emscripten_bind_btSoftBody_setRollingFriction_1 = function () {
                    return (pI = n._emscripten_bind_btSoftBody_setRollingFriction_1 = n.asm.uz).apply(null, arguments)
                },
                sI = n._emscripten_bind_btSoftBody_getWorldTransform_0 = function () {
                    return (sI = n._emscripten_bind_btSoftBody_getWorldTransform_0 = n.asm.vz).apply(null, arguments)
                },
                cI = n._emscripten_bind_btSoftBody_getCollisionFlags_0 = function () {
                    return (cI = n._emscripten_bind_btSoftBody_getCollisionFlags_0 = n.asm.wz).apply(null, arguments)
                },
                aI = n._emscripten_bind_btSoftBody_setCollisionFlags_1 = function () {
                    return (aI = n._emscripten_bind_btSoftBody_setCollisionFlags_1 = n.asm.xz).apply(null, arguments)
                },
                lI = n._emscripten_bind_btSoftBody_setWorldTransform_1 = function () {
                    return (lI = n._emscripten_bind_btSoftBody_setWorldTransform_1 = n.asm.yz).apply(null, arguments)
                },
                uI = n._emscripten_bind_btSoftBody_setCollisionShape_1 = function () {
                    return (uI = n._emscripten_bind_btSoftBody_setCollisionShape_1 = n.asm.zz).apply(null, arguments)
                },
                bI = n._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = function () {
                    return (bI = n._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = n.asm.Az).apply(null, arguments)
                },
                mI = n._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = function () {
                    return (mI = n._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = n.asm.Bz).apply(null, arguments)
                },
                yI = n._emscripten_bind_btSoftBody_getUserIndex_0 = function () {
                    return (yI = n._emscripten_bind_btSoftBody_getUserIndex_0 = n.asm.Cz).apply(null, arguments)
                },
                dI = n._emscripten_bind_btSoftBody_setUserIndex_1 = function () {
                    return (dI = n._emscripten_bind_btSoftBody_setUserIndex_1 = n.asm.Dz).apply(null, arguments)
                },
                fI = n._emscripten_bind_btSoftBody_getUserPointer_0 = function () {
                    return (fI = n._emscripten_bind_btSoftBody_getUserPointer_0 = n.asm.Ez).apply(null, arguments)
                },
                hI = n._emscripten_bind_btSoftBody_setUserPointer_1 = function () {
                    return (hI = n._emscripten_bind_btSoftBody_setUserPointer_1 = n.asm.Fz).apply(null, arguments)
                },
                BI = n._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = function () {
                    return (BI = n._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = n.asm.Gz).apply(null, arguments)
                },
                gI = n._emscripten_bind_btSoftBody_get_m_cfg_0 = function () {
                    return (gI = n._emscripten_bind_btSoftBody_get_m_cfg_0 = n.asm.Hz).apply(null, arguments)
                },
                kI = n._emscripten_bind_btSoftBody_set_m_cfg_1 = function () {
                    return (kI = n._emscripten_bind_btSoftBody_set_m_cfg_1 = n.asm.Iz).apply(null, arguments)
                },
                CI = n._emscripten_bind_btSoftBody_get_m_nodes_0 = function () {
                    return (CI = n._emscripten_bind_btSoftBody_get_m_nodes_0 = n.asm.Jz).apply(null, arguments)
                },
                SI = n._emscripten_bind_btSoftBody_set_m_nodes_1 = function () {
                    return (SI = n._emscripten_bind_btSoftBody_set_m_nodes_1 = n.asm.Kz).apply(null, arguments)
                },
                jI = n._emscripten_bind_btSoftBody_get_m_faces_0 = function () {
                    return (jI = n._emscripten_bind_btSoftBody_get_m_faces_0 = n.asm.Lz).apply(null, arguments)
                },
                vI = n._emscripten_bind_btSoftBody_set_m_faces_1 = function () {
                    return (vI = n._emscripten_bind_btSoftBody_set_m_faces_1 = n.asm.Mz).apply(null, arguments)
                },
                II = n._emscripten_bind_btSoftBody_get_m_materials_0 = function () {
                    return (II = n._emscripten_bind_btSoftBody_get_m_materials_0 = n.asm.Nz).apply(null, arguments)
                },
                RI = n._emscripten_bind_btSoftBody_set_m_materials_1 = function () {
                    return (RI = n._emscripten_bind_btSoftBody_set_m_materials_1 = n.asm.Oz).apply(null, arguments)
                },
                DI = n._emscripten_bind_btSoftBody_get_m_anchors_0 = function () {
                    return (DI = n._emscripten_bind_btSoftBody_get_m_anchors_0 = n.asm.Pz).apply(null, arguments)
                },
                PI = n._emscripten_bind_btSoftBody_set_m_anchors_1 = function () {
                    return (PI = n._emscripten_bind_btSoftBody_set_m_anchors_1 = n.asm.Qz).apply(null, arguments)
                },
                TI = n._emscripten_bind_btSoftBody___destroy___0 = function () {
                    return (TI = n._emscripten_bind_btSoftBody___destroy___0 = n.asm.Rz).apply(null, arguments)
                },
                OI = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = function () {
                    return (OI = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = n.asm.Sz).apply(null, arguments)
                },
                WI = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 = function () {
                    return (WI = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 = n.asm.Tz).apply(null, arguments)
                },
                AI = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = function () {
                    return (AI = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = n.asm.Uz).apply(null, arguments)
                },
                MI = n._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = function () {
                    return (MI = n._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = n.asm.Vz).apply(null, arguments)
                },
                xI = n._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = function () {
                    return (xI = n._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = n.asm.Wz).apply(null, arguments)
                },
                FI = n._emscripten_bind_btSoftBodyArray_size_0 = function () {
                    return (FI = n._emscripten_bind_btSoftBodyArray_size_0 = n.asm.Xz).apply(null, arguments)
                },
                LI = n._emscripten_bind_btSoftBodyArray_at_1 = function () {
                    return (LI = n._emscripten_bind_btSoftBodyArray_at_1 = n.asm.Yz).apply(null, arguments)
                },
                GI = n._emscripten_bind_btSoftBodyArray___destroy___0 = function () {
                    return (GI = n._emscripten_bind_btSoftBodyArray___destroy___0 = n.asm.Zz).apply(null, arguments)
                },
                wI = n._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = function () {
                    return (wI = n._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = n.asm._z).apply(null, arguments)
                },
                HI = n._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = function () {
                    return (HI = n._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = n.asm.$z).apply(null, arguments)
                },
                VI = n._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = function () {
                    return (VI = n._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = n.asm.aA).apply(null, arguments)
                },
                EI = n._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = function () {
                    return (EI = n._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = n.asm.bA).apply(null, arguments)
                },
                NI = n._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = function () {
                    return (NI = n._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = n.asm.cA).apply(null, arguments)
                },
                UI = n._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = function () {
                    return (UI = n._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = n.asm.dA).apply(null, arguments)
                },
                zI = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = function () {
                    return (zI = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = n.asm.eA).apply(null, arguments)
                },
                qI = n._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = function () {
                    return (qI = n._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = n.asm.fA).apply(null, arguments)
                },
                KI = n._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = function () {
                    return (KI = n._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = n.asm.gA).apply(null, arguments)
                },
                QI = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = function () {
                    return (QI = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = n.asm.hA).apply(null, arguments)
                },
                XI = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = function () {
                    return (XI = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = n.asm.iA).apply(null, arguments)
                },
                ZI = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = function () {
                    return (ZI = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = n.asm.jA).apply(null, arguments)
                },
                YI = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = function () {
                    return (YI = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = n.asm.kA).apply(null, arguments)
                },
                JI = n._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = function () {
                    return (JI = n._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = n.asm.lA).apply(null, arguments)
                },
                $I = n._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = function () {
                    return ($I = n._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = n.asm.mA).apply(null, arguments)
                },
                tR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = function () {
                    return (tR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = n.asm.nA).apply(null, arguments)
                },
                eR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = function () {
                    return (eR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = n.asm.oA).apply(null, arguments)
                },
                nR = n._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = function () {
                    return (nR = n._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = n.asm.pA).apply(null, arguments)
                },
                oR = n._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = function () {
                    return (oR = n._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = n.asm.qA).apply(null, arguments)
                },
                _R = n._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = function () {
                    return (_R = n._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = n.asm.rA).apply(null, arguments)
                },
                iR = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = function () {
                    return (iR = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = n.asm.sA).apply(null, arguments)
                },
                rR = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = function () {
                    return (rR = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = n.asm.tA).apply(null, arguments)
                },
                pR = n._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = function () {
                    return (pR = n._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = n.asm.uA).apply(null, arguments)
                },
                sR = n._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = function () {
                    return (sR = n._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = n.asm.vA).apply(null, arguments)
                },
                cR = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = function () {
                    return (cR = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = n.asm.wA).apply(null, arguments)
                },
                aR = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = function () {
                    return (aR = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = n.asm.xA).apply(null, arguments)
                },
                lR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = function () {
                    return (lR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = n.asm.yA).apply(null, arguments)
                },
                uR = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = function () {
                    return (uR = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = n.asm.zA).apply(null, arguments)
                },
                bR = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = function () {
                    return (bR = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = n.asm.AA).apply(null, arguments)
                },
                mR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = function () {
                    return (mR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = n.asm.BA).apply(null, arguments)
                },
                yR = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = function () {
                    return (yR = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = n.asm.CA).apply(null, arguments)
                },
                dR = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = function () {
                    return (dR = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = n.asm.DA).apply(null, arguments)
                },
                fR = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = function () {
                    return (fR = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = n.asm.EA).apply(null, arguments)
                },
                hR = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = function () {
                    return (hR = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = n.asm.FA).apply(null, arguments)
                },
                BR = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = function () {
                    return (BR = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = n.asm.GA).apply(null, arguments)
                },
                gR = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = function () {
                    return (gR = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = n.asm.HA).apply(null, arguments)
                },
                kR = n._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = function () {
                    return (kR = n._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = n.asm.IA).apply(null, arguments)
                },
                CR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = function () {
                    return (CR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = n.asm.JA).apply(null, arguments)
                },
                SR = n._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = function () {
                    return (SR = n._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = n.asm.KA).apply(null, arguments)
                },
                jR = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = function () {
                    return (jR = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = n.asm.LA).apply(null, arguments)
                },
                vR = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = function () {
                    return (vR = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = n.asm.MA).apply(null, arguments)
                },
                IR = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = function () {
                    return (IR = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = n.asm.NA).apply(null, arguments)
                },
                RR = n._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = function () {
                    return (RR = n._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = n.asm.OA).apply(null, arguments)
                },
                DR = n._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = function () {
                    return (DR = n._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = n.asm.PA).apply(null, arguments)
                },
                PR = n._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = function () {
                    return (PR = n._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = n.asm.QA).apply(null, arguments)
                },
                TR = n._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = function () {
                    return (TR = n._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = n.asm.RA).apply(null, arguments)
                },
                OR = n._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = function () {
                    return (OR = n._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = n.asm.SA).apply(null, arguments)
                },
                WR = n._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = function () {
                    return (WR = n._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = n.asm.TA).apply(null, arguments)
                },
                AR = n._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = function () {
                    return (AR = n._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = n.asm.UA).apply(null, arguments)
                },
                MR = n._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = function () {
                    return (MR = n._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = n.asm.VA).apply(null, arguments)
                },
                xR = n._emscripten_bind_btSoftBodyHelpers___destroy___0 = function () {
                    return (xR = n._emscripten_bind_btSoftBodyHelpers___destroy___0 = n.asm.WA).apply(null, arguments)
                },
                FR = n._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function () {
                    return (FR = n._emscripten_enum_PHY_ScalarType_PHY_FLOAT = n.asm.XA).apply(null, arguments)
                },
                LR = n._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function () {
                    return (LR = n._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = n.asm.YA).apply(null, arguments)
                },
                GR = n._emscripten_enum_PHY_ScalarType_PHY_INTEGER = function () {
                    return (GR = n._emscripten_enum_PHY_ScalarType_PHY_INTEGER = n.asm.ZA).apply(null, arguments)
                },
                wR = n._emscripten_enum_PHY_ScalarType_PHY_SHORT = function () {
                    return (wR = n._emscripten_enum_PHY_ScalarType_PHY_SHORT = n.asm._A).apply(null, arguments)
                },
                HR = n._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function () {
                    return (HR = n._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = n.asm.$A).apply(null, arguments)
                },
                VR = n._emscripten_enum_PHY_ScalarType_PHY_UCHAR = function () {
                    return (VR = n._emscripten_enum_PHY_ScalarType_PHY_UCHAR = n.asm.aB).apply(null, arguments)
                },
                ER = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_COMPOUND_SHAPE = function () {
                    return (ER = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_COMPOUND_SHAPE = n.asm.bB).apply(null, arguments)
                },
                NR = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE_PART = function () {
                    return (NR = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE_PART = n.asm.cB).apply(null, arguments)
                },
                UR = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE = function () {
                    return (UR = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE = n.asm.dB).apply(null, arguments)
                },
                zR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function () {
                    return (zR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = n.asm.eB).apply(null, arguments)
                },
                qR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function () {
                    return (qR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = n.asm.fB).apply(null, arguments)
                },
                KR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = function () {
                    return (KR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = n.asm.gB).apply(null, arguments)
                },
                QR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = function () {
                    return (QR = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = n.asm.hB).apply(null, arguments)
                };

            function XR() {
                function t() {
                    if (!Q && (Q = !0, n.calledRun = !0, !f)) {
                        if (P = !0, V(R), o(n), n.onRuntimeInitialized && n.onRuntimeInitialized(), n.postRun)
                            for ("function" == typeof n.postRun && (n.postRun = [n.postRun]); n.postRun.length;) {
                                var t = n.postRun.shift();
                                D.unshift(t)
                            }
                        V(D)
                    }
                }
                if (!(0 < W)) {
                    if (n.preRun)
                        for ("function" == typeof n.preRun && (n.preRun = [n.preRun]); n.preRun.length;) T();
                    V(I), 0 < W || (n.setStatus ? (n.setStatus("Running..."), setTimeout((function () {
                        setTimeout((function () {
                            n.setStatus("")
                        }), 1), t()
                    }), 1)) : t())
                }
            }
            if (n._malloc = function () {
                    return (n._malloc = n.asm.jB).apply(null, arguments)
                }, n.___start_em_js = 27240, n.___stop_em_js = 27338, n.UTF8ToString = B, n.addFunction = function (t, e) {
                    if (!z) {
                        z = new WeakMap;
                        var n = v.length;
                        if (z)
                            for (var o = 0; o < 0 + n; o++) {
                                var _ = o,
                                    i = U[_];
                                i || (_ >= U.length && (U.length = _ + 1), U[_] = i = v.get(_)), (_ = i) && z.set(_, o)
                            }
                    }
                    if (n = z.get(t) || 0) return n;
                    if (q.length) n = q.pop();
                    else {
                        try {
                            v.grow(1)
                        } catch (t) {
                            if (!(t instanceof RangeError)) throw t;
                            throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
                        }
                        n = v.length - 1
                    }
                    try {
                        o = n, v.set(o, t), U[o] = v.get(o)
                    } catch (p) {
                        if (!(p instanceof TypeError)) throw p;
                        if ("function" == typeof WebAssembly.Function) {
                            o = WebAssembly.Function, _ = {
                                i: "i32",
                                j: "i32",
                                f: "f32",
                                d: "f64",
                                p: "i32"
                            }, i = {
                                parameters: [],
                                results: "v" == e[0] ? [] : [_[e[0]]]
                            };
                            for (var r = 1; r < e.length; ++r) i.parameters.push(_[e[r]]), "j" === e[r] && i.parameters.push("i32");
                            e = new o(i, t)
                        } else {
                            for (o = [1], _ = e.slice(0, 1), e = e.slice(1), i = {
                                    i: 127,
                                    p: 127,
                                    j: 126,
                                    f: 125,
                                    d: 124
                                }, o.push(96), 128 > (r = e.length) ? o.push(r) : o.push(r % 128 | 128, r >> 7), r = 0; r < e.length; ++r) o.push(i[e[r]]);
                            "v" == _ ? o.push(0) : o.push(1, i[_]), e = [0, 97, 115, 109, 1, 0, 0, 0, 1], 128 > (_ = o.length) ? e.push(_) : e.push(_ % 128 | 128, _ >> 7), e.push.apply(e, o), e.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0), e = new WebAssembly.Module(new Uint8Array(e)), e = new WebAssembly.Instance(e, {
                                e: {
                                    f: t
                                }
                            }).exports.f
                        }
                        o = n, v.set(o, e), U[o] = v.get(o)
                    }
                    return z.set(t, n), n
                }, M = function t() {
                    Q || XR(), Q || (M = t)
                }, n.preInit)
                for ("function" == typeof n.preInit && (n.preInit = [n.preInit]); 0 < n.preInit.length;) n.preInit.pop()();

            function ZR() {}

            function YR(t) {
                return (t || ZR).mB
            }

            function JR(t, e) {
                var n = YR(e),
                    o = n[t];
                return o || ((o = Object.create((e || ZR).prototype)).kB = t, n[t] = o)
            }
            XR(), ZR.prototype = Object.create(ZR.prototype), ZR.prototype.constructor = ZR, ZR.prototype.lB = ZR, ZR.mB = {}, n.WrapperObject = ZR, n.getCache = YR, n.wrapPointer = JR, n.castObject = function (t, e) {
                return JR(t.kB, e)
            }, n.NULL = JR(0), n.destroy = function (t) {
                if (!t.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
                t.__destroy__(), delete YR(t.lB)[t.kB]
            }, n.compare = function (t, e) {
                return t.kB === e.kB
            }, n.getPointer = function (t) {
                return t.kB
            }, n.getClass = function (t) {
                return t.lB
            };
            var $R = 0,
                tD = 0,
                eD = 0,
                nD = [],
                oD = 0;

            function _D() {
                if (oD) {
                    for (var t = 0; t < nD.length; t++) n._free(nD[t]);
                    nD.length = 0, n._free($R), $R = 0, tD += oD, oD = 0
                }
                $R || (tD += 128, ($R = n._malloc(tD)) || x()), eD = 0
            }

            function iD(t, e) {
                return $R || x(), t = t.length * e.BYTES_PER_ELEMENT, eD + (t = t + 7 & -8) >= tD ? (0 < t || x(), oD += t, e = n._malloc(t), nD.push(e)) : (e = $R + eD, eD += t), e
            }

            function rD(t, e, n) {
                switch (n >>>= 0, e.BYTES_PER_ELEMENT) {
                    case 2:
                        n >>>= 1;
                        break;
                    case 4:
                        n >>>= 2;
                        break;
                    case 8:
                        n >>>= 3
                }
                for (var o = 0; o < t.length; o++) e[n + o] = t[o]
            }

            function pD(t) {
                if ("string" == typeof t) {
                    for (var e = 0, n = 0; n < t.length; ++n) {
                        var o = t.charCodeAt(n);
                        127 >= o ? e++ : 2047 >= o ? e += 2 : 55296 <= o && 57343 >= o ? (e += 4, ++n) : e += 3
                    }
                    if (n = 0, 0 < (o = (e = Array(e + 1)).length)) {
                        o = n + o - 1;
                        for (var _ = 0; _ < t.length; ++_) {
                            var i = t.charCodeAt(_);
                            if (55296 <= i && 57343 >= i) i = 65536 + ((1023 & i) << 10) | 1023 & t.charCodeAt(++_);
                            if (127 >= i) {
                                if (n >= o) break;
                                e[n++] = i
                            } else {
                                if (2047 >= i) {
                                    if (n + 1 >= o) break;
                                    e[n++] = 192 | i >> 6
                                } else {
                                    if (65535 >= i) {
                                        if (n + 2 >= o) break;
                                        e[n++] = 224 | i >> 12
                                    } else {
                                        if (n + 3 >= o) break;
                                        e[n++] = 240 | i >> 18, e[n++] = 128 | i >> 12 & 63
                                    }
                                    e[n++] = 128 | i >> 6 & 63
                                }
                                e[n++] = 128 | 63 & i
                            }
                        }
                        e[n] = 0
                    }
                    return t = iD(e, g), rD(e, g, t), t
                }
                return t
            }

            function sD(t) {
                if ("object" == typeof t) {
                    var e = iD(t, S);
                    return rD(t, S, e), e
                }
                return t
            }

            function cD() {
                throw "cannot construct a btCollisionShape, no constructor in IDL"
            }

            function aD() {
                throw "cannot construct a btCollisionWorld, no constructor in IDL"
            }

            function lD() {
                throw "cannot construct a btCollisionObject, no constructor in IDL"
            }

            function uD() {
                throw "cannot construct a btConcaveShape, no constructor in IDL"
            }

            function bD() {
                throw "cannot construct a btCollisionAlgorithm, no constructor in IDL"
            }

            function mD() {
                throw "cannot construct a btTypedConstraint, no constructor in IDL"
            }

            function yD() {
                throw "cannot construct a btDynamicsWorld, no constructor in IDL"
            }

            function dD() {
                throw "cannot construct a btIDebugDraw, no constructor in IDL"
            }

            function fD(t, e, n) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), this.kB = void 0 === t ? Le() : void 0 === e ? _emscripten_bind_btVector3_btVector3_1(t) : void 0 === n ? _emscripten_bind_btVector3_btVector3_2(t, e) : Ge(t, e, n), YR(fD)[this.kB] = this
            }

            function hD() {
                throw "cannot construct a btQuadWord, no constructor in IDL"
            }

            function BD() {
                throw "cannot construct a btMotionState, no constructor in IDL"
            }

            function gD() {
                throw "cannot construct a RayResultCallback, no constructor in IDL"
            }

            function kD() {
                throw "cannot construct a ContactResultCallback, no constructor in IDL"
            }

            function CD() {
                throw "cannot construct a ConvexResultCallback, no constructor in IDL"
            }

            function SD() {
                throw "cannot construct a btConvexShape, no constructor in IDL"
            }

            function jD(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = Vn(t, e), YR(jD)[this.kB] = this
            }

            function vD(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = Yn(t), YR(vD)[this.kB] = this
            }

            function ID(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = _o(t, e), YR(ID)[this.kB] = this
            }

            function RD() {
                throw "cannot construct a btStridingMeshInterface, no constructor in IDL"
            }

            function DD() {
                throw "cannot construct a btTriangleMeshShape, no constructor in IDL"
            }

            function PD() {
                throw "cannot construct a btPrimitiveManagerBase, no constructor in IDL"
            }

            function TD() {
                throw "cannot construct a btGImpactShapeInterface, no constructor in IDL"
            }

            function OD() {
                throw "cannot construct a btActivatingCollisionAlgorithm, no constructor in IDL"
            }

            function WD(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = void 0 === t ? Vo() : Eo(t), YR(WD)[this.kB] = this
            }

            function AD() {
                throw "cannot construct a btDispatcher, no constructor in IDL"
            }

            function MD(t, e, n, o, _) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), this.kB = void 0 === o ? Ko(t, e, n) : void 0 === _ ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(t, e, n, o) : Qo(t, e, n, o, _), YR(MD)[this.kB] = this
            }

            function xD(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = r_(t, e, n, o), YR(xD)[this.kB] = this
            }

            function FD() {
                throw "cannot construct a btVehicleRaycaster, no constructor in IDL"
            }

            function LD() {
                throw "cannot construct a btActionInterface, no constructor in IDL"
            }

            function GD() {
                this.kB = X_(), YR(GD)[this.kB] = this
            }

            function wD() {
                throw "cannot construct a btSoftBodySolver, no constructor in IDL"
            }

            function HD() {
                throw "cannot construct a VoidPtr, no constructor in IDL"
            }

            function VD() {
                this.kB = Ti(), YR(VD)[this.kB] = this
            }

            function ED(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = void 0 === t ? Gi() : void 0 === e ? _emscripten_bind_btVector4_btVector4_1(t) : void 0 === n ? _emscripten_bind_btVector4_btVector4_2(t, e) : void 0 === o ? _emscripten_bind_btVector4_btVector4_3(t, e, n) : wi(t, e, n, o), YR(ED)[this.kB] = this
            }

            function ND(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = nr(t, e, n, o), YR(ND)[this.kB] = this
            }

            function UD() {
                throw "cannot construct a btMatrix3x3, no constructor in IDL"
            }

            function zD(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = void 0 === t ? xr() : void 0 === e ? _emscripten_bind_btTransform_btTransform_1(t) : Fr(t, e), YR(zD)[this.kB] = this
            }

            function qD() {
                this.kB = Kr(), YR(qD)[this.kB] = this
            }

            function KD(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = void 0 === t ? Yr() : void 0 === e ? Jr(t) : $r(t, e), YR(KD)[this.kB] = this
            }

            function QD() {
                throw "cannot construct a btCollisionObjectWrapper, no constructor in IDL"
            }

            function XD(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = sp(t, e), YR(XD)[this.kB] = this
            }

            function ZD() {
                throw "cannot construct a btConstCollisionObjectArray, no constructor in IDL"
            }

            function YD() {
                throw "cannot construct a btScalarArray, no constructor in IDL"
            }

            function JD(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = xp(t, e), YR(JD)[this.kB] = this
            }

            function $D() {
                throw "cannot construct a btManifoldPoint, no constructor in IDL"
            }

            function tP() {
                this.kB = Ss(), YR(tP)[this.kB] = this
            }

            function eP() {
                throw "cannot construct a LocalShapeInfo, no constructor in IDL"
            }

            function nP(t, e, n, o, _) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), this.kB = Os(t, e, n, o, _), YR(nP)[this.kB] = this
            }

            function oP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = Ns(t, e), YR(oP)[this.kB] = this
            }

            function _P(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = void 0 === e ? sc(t) : cc(t, e), YR(_P)[this.kB] = this
            }

            function iP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = dc(t), YR(iP)[this.kB] = this
            }

            function rP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = Sc(t, e), YR(rP)[this.kB] = this
            }

            function pP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = Ac(t, e), YR(pP)[this.kB] = this
            }

            function sP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = Nc(t), YR(sP)[this.kB] = this
            }

            function cP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = Zc(t), YR(cP)[this.kB] = this
            }

            function aP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = oa(t), YR(aP)[this.kB] = this
            }

            function lP(t, e, n) {
                _D(), t && "object" == typeof t && (t = t.kB), "object" == typeof e && (e = sD(e)), n && "object" == typeof n && (n = n.kB), this.kB = aa(t, e, n), YR(lP)[this.kB] = this
            }

            function uP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = ya(t, e), YR(uP)[this.kB] = this
            }

            function bP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = ga(t, e), YR(bP)[this.kB] = this
            }

            function mP() {
                throw "cannot construct a btIntArray, no constructor in IDL"
            }

            function yP() {
                throw "cannot construct a btFace, no constructor in IDL"
            }

            function dP() {
                throw "cannot construct a btVector3Array, no constructor in IDL"
            }

            function fP() {
                throw "cannot construct a btFaceArray, no constructor in IDL"
            }

            function hP() {
                throw "cannot construct a btConvexPolyhedron, no constructor in IDL"
            }

            function BP(t, e) {
                _D(), "object" == typeof t && (t = sD(t)), e && "object" == typeof e && (e = e.kB), this.kB = void 0 === t ? Ua() : void 0 === e ? za(t) : qa(t, e), YR(BP)[this.kB] = this
            }

            function gP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = il(t), YR(gP)[this.kB] = this
            }

            function kP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = void 0 === t ? al() : ll(t), YR(kP)[this.kB] = this
            }

            function CP() {
                throw "cannot construct a btIndexedMesh, no constructor in IDL"
            }

            function SP() {
                throw "cannot construct a btIndexedMeshArray, no constructor in IDL"
            }

            function jP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = void 0 === t ? Ol() : void 0 === e ? Wl(t) : Al(t, e), YR(jP)[this.kB] = this
            }

            function vP() {
                this.kB = Vl(), YR(vP)[this.kB] = this
            }

            function IP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = ql(t, e), YR(IP)[this.kB] = this
            }

            function RP(t, e, n) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), this.kB = void 0 === n ? Yl(t, e) : Jl(t, e, n), YR(RP)[this.kB] = this
            }

            function DP(t, e, n, o, _, i, r, p, s) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), p && "object" == typeof p && (p = p.kB), s && "object" == typeof s && (s = s.kB), this.kB = ou(t, e, n, o, _, i, r, p, s), YR(DP)[this.kB] = this
            }

            function PP(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = au(t, e, n, o), YR(PP)[this.kB] = this
            }

            function TP() {
                this.kB = yu(), YR(TP)[this.kB] = this
            }

            function OP(t, e, n) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), this.kB = fu(t, e, n), YR(OP)[this.kB] = this
            }

            function WP() {
                this.kB = Cu(), YR(WP)[this.kB] = this
            }

            function AP() {
                throw "cannot construct a CompoundPrimitiveManager, no constructor in IDL"
            }

            function MP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = void 0 === t ? Wu() : Au(t), YR(MP)[this.kB] = this
            }

            function xP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = void 0 === t ? nb() : ob(t), YR(xP)[this.kB] = this
            }

            function FP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = Wb(t, e), YR(FP)[this.kB] = this
            }

            function LP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = Kb(t), YR(LP)[this.kB] = this
            }

            function GP(t, e) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), this.kB = void 0 === t ? sm() : void 0 === e ? _emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_1(t) : cm(t, e), YR(GP)[this.kB] = this
            }

            function wP(t, e, n) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), this.kB = ym(t, e, n), YR(wP)[this.kB] = this
            }

            function HP() {
                this.kB = hm(), YR(HP)[this.kB] = this
            }

            function VP() {
                this.kB = gm(), YR(VP)[this.kB] = this
            }

            function EP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = Im(t), YR(EP)[this.kB] = this
            }

            function NP() {
                throw "cannot construct a btOverlappingPairCallback, no constructor in IDL"
            }

            function UP() {
                throw "cannot construct a btOverlappingPairCache, no constructor in IDL"
            }

            function zP(t, e, n, o, _) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), this.kB = void 0 === n ? Mm(t, e) : void 0 === o ? xm(t, e, n) : void 0 === _ ? Fm(t, e, n, o) : Lm(t, e, n, o, _), YR(zP)[this.kB] = this
            }

            function qP() {
                throw "cannot construct a btBroadphaseInterface, no constructor in IDL"
            }

            function KP() {
                throw "cannot construct a btCollisionConfiguration, no constructor in IDL"
            }

            function QP() {
                this.kB = Em(), YR(QP)[this.kB] = this
            }

            function XP() {
                throw "cannot construct a btBroadphaseProxy, no constructor in IDL"
            }

            function ZP(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = void 0 === o ? Xm(t, e, n) : Zm(t, e, n, o), YR(ZP)[this.kB] = this
            }

            function YP(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = Cy(t), YR(YP)[this.kB] = this
            }

            function JP() {
                this.kB = Md(), YR(JP)[this.kB] = this
            }

            function $P(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = void 0 === n ? Ed(t, e) : void 0 === o ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(t, e, n) : Nd(t, e, n, o), YR($P)[this.kB] = this
            }

            function tT(t, e, n, o, _) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), this.kB = void 0 === o ? nf(t, e, n) : void 0 === _ ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(t, e, n, o) : of(t, e, n, o, _), YR(tT)[this.kB] = this
            }

            function eT() {
                this.kB = Cf(), YR(eT)[this.kB] = this
            }

            function nT(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = void 0 === n ? jf(t, e) : void 0 === o ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(t, e, n) : vf(t, e, n, o), YR(nT)[this.kB] = this
            }

            function oT(t, e, n, o, _, i, r) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), this.kB = void 0 === n ? Hf(t, e) : void 0 === o ? Vf(t, e, n) : void 0 === _ ? Ef(t, e, n, o) : void 0 === i ? Nf(t, e, n, o, _) : void 0 === r ? Uf(t, e, n, o, _, i) : zf(t, e, n, o, _, i, r), YR(oT)[this.kB] = this
            }

            function _T(t, e, n, o, _) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), this.kB = void 0 === o ? rh(t, e, n) : void 0 === _ ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(t, e, n, o) : ph(t, e, n, o, _), YR(_T)[this.kB] = this
            }

            function iT(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = Sh(t, e, n, o), YR(iT)[this.kB] = this
            }

            function rT() {
                throw "cannot construct a btConstraintSolver, no constructor in IDL"
            }

            function pT() {
                throw "cannot construct a btDispatcherInfo, no constructor in IDL"
            }

            function sT() {
                throw "cannot construct a btContactSolverInfo, no constructor in IDL"
            }

            function cT() {
                this.kB = pB(), YR(cT)[this.kB] = this
            }

            function aT() {
                throw "cannot construct a btVehicleRaycasterResult, no constructor in IDL"
            }

            function lT(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = RB(t), YR(lT)[this.kB] = this
            }

            function uT() {
                throw "cannot construct a RaycastInfo, no constructor in IDL"
            }

            function bT() {
                throw "cannot construct a btWheelInfoConstructionInfo, no constructor in IDL"
            }

            function mT(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = hg(t), YR(mT)[this.kB] = this
            }

            function yT(t, e, n, o) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), this.kB = void 0 === o ? dk(t, e, n) : fk(t, e, n, o), YR(yT)[this.kB] = this
            }

            function dT(t, e, n) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), this.kB = wk(t, e, n), YR(dT)[this.kB] = this
            }

            function fT() {
                this.kB = fC(), YR(fT)[this.kB] = this
            }

            function hT() {
                this.kB = ZC(), YR(hT)[this.kB] = this
            }

            function BT() {
                this.kB = JC(), YR(BT)[this.kB] = this
            }

            function gT() {
                throw "cannot construct a Face, no constructor in IDL"
            }

            function kT() {
                throw "cannot construct a tFaceArray, no constructor in IDL"
            }

            function CT() {
                throw "cannot construct a Node, no constructor in IDL"
            }

            function ST() {
                throw "cannot construct a tNodeArray, no constructor in IDL"
            }

            function jT() {
                throw "cannot construct a Material, no constructor in IDL"
            }

            function vT() {
                throw "cannot construct a tMaterialArray, no constructor in IDL"
            }

            function IT() {
                throw "cannot construct a Anchor, no constructor in IDL"
            }

            function RT() {
                throw "cannot construct a tAnchorArray, no constructor in IDL"
            }

            function DT() {
                throw "cannot construct a Config, no constructor in IDL"
            }

            function PT(t, e, n, o) {
                _D(), t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), "object" == typeof o && (o = sD(o)), this.kB = gv(t, e, n, o), YR(PT)[this.kB] = this
            }

            function TT(t) {
                t && "object" == typeof t && (t = t.kB), this.kB = void 0 === t ? OI() : WI(t), YR(TT)[this.kB] = this
            }

            function OT() {
                this.kB = MI(), YR(OT)[this.kB] = this
            }

            function WT() {
                throw "cannot construct a btSoftBodyArray, no constructor in IDL"
            }

            function AT(t, e, n, o, _) {
                t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), this.kB = wI(t, e, n, o, _), YR(AT)[this.kB] = this
            }

            function MT() {
                this.kB = DR(), YR(MT)[this.kB] = this
            }
            return cD.prototype = Object.create(ZR.prototype), cD.prototype.constructor = cD, cD.prototype.lB = cD, cD.mB = {}, n.btCollisionShape = cD, cD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), X(e, t)
                }, cD.prototype.getLocalScaling = function () {
                    return JR(Z(this.kB), fD)
                }, cD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Y(n, t, e)
                }, cD.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), J(e, t)
                }, cD.prototype.getMargin = function () {
                    return $(this.kB)
                }, cD.prototype.__destroy__ = function () {
                    tt(this.kB)
                }, aD.prototype = Object.create(ZR.prototype), aD.prototype.constructor = aD, aD.prototype.lB = aD, aD.mB = {}, n.btCollisionWorld = aD, aD.prototype.getDispatcher = function () {
                    return JR(et(this.kB), AD)
                }, aD.prototype.rayTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), nt(o, t, e, n)
                }, aD.prototype.getPairCache = function () {
                    return JR(ot(this.kB), UP)
                }, aD.prototype.getDispatchInfo = function () {
                    return JR(_t(this.kB), pT)
                }, aD.prototype.addCollisionObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? it(o, t) : void 0 === n ? rt(o, t, e) : pt(o, t, e, n)
                }, aD.prototype.removeCollisionObject = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), st(e, t)
                }, aD.prototype.getBroadphase = function () {
                    return JR(ct(this.kB), qP)
                }, aD.prototype.convexSweepTest = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), at(i, t, e, n, o, _)
                }, aD.prototype.contactPairTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), lt(o, t, e, n)
                }, aD.prototype.contactTest = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ut(n, t, e)
                }, aD.prototype.updateSingleAabb = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bt(e, t)
                }, aD.prototype.setDebugDrawer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mt(e, t)
                }, aD.prototype.getDebugDrawer = function () {
                    return JR(yt(this.kB), dD)
                }, aD.prototype.debugDrawWorld = function () {
                    dt(this.kB)
                }, aD.prototype.debugDrawObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), ft(o, t, e, n)
                }, aD.prototype.__destroy__ = function () {
                    ht(this.kB)
                }, lD.prototype = Object.create(ZR.prototype), lD.prototype.constructor = lD, lD.prototype.lB = lD, lD.mB = {}, n.btCollisionObject = lD, lD.prototype.setAnisotropicFriction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Bt(n, t, e)
                }, lD.prototype.getCollisionShape = function () {
                    return JR(gt(this.kB), cD)
                }, lD.prototype.setContactProcessingThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kt(e, t)
                }, lD.prototype.setActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ct(e, t)
                }, lD.prototype.forceActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), St(e, t)
                }, lD.prototype.activate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), void 0 === t ? jt(e) : vt(e, t)
                }, lD.prototype.isActive = function () {
                    return !!It(this.kB)
                }, lD.prototype.isKinematicObject = function () {
                    return !!Rt(this.kB)
                }, lD.prototype.isStaticObject = function () {
                    return !!Dt(this.kB)
                }, lD.prototype.isStaticOrKinematicObject = function () {
                    return !!Pt(this.kB)
                }, lD.prototype.getRestitution = function () {
                    return Tt(this.kB)
                }, lD.prototype.getFriction = function () {
                    return Ot(this.kB)
                }, lD.prototype.getRollingFriction = function () {
                    return Wt(this.kB)
                }, lD.prototype.setRestitution = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), At(e, t)
                }, lD.prototype.setFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mt(e, t)
                }, lD.prototype.setRollingFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xt(e, t)
                }, lD.prototype.getWorldTransform = function () {
                    return JR(Ft(this.kB), zD)
                }, lD.prototype.getCollisionFlags = function () {
                    return Lt(this.kB)
                }, lD.prototype.setCollisionFlags = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gt(e, t)
                }, lD.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wt(e, t)
                }, lD.prototype.setCollisionShape = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ht(e, t)
                }, lD.prototype.setCcdMotionThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Vt(e, t)
                }, lD.prototype.setCcdSweptSphereRadius = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Et(e, t)
                }, lD.prototype.getUserIndex = function () {
                    return Nt(this.kB)
                }, lD.prototype.setUserIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ut(e, t)
                }, lD.prototype.getUserPointer = function () {
                    return JR(zt(this.kB), HD)
                }, lD.prototype.setUserPointer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qt(e, t)
                }, lD.prototype.getBroadphaseHandle = function () {
                    return JR(Kt(this.kB), XP)
                }, lD.prototype.__destroy__ = function () {
                    Qt(this.kB)
                }, uD.prototype = Object.create(cD.prototype), uD.prototype.constructor = uD, uD.prototype.lB = uD, uD.mB = {}, n.btConcaveShape = uD, uD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Xt(e, t)
                }, uD.prototype.getLocalScaling = function () {
                    return JR(Zt(this.kB), fD)
                }, uD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Yt(n, t, e)
                }, uD.prototype.__destroy__ = function () {
                    Jt(this.kB)
                }, bD.prototype = Object.create(ZR.prototype), bD.prototype.constructor = bD, bD.prototype.lB = bD, bD.mB = {}, n.btCollisionAlgorithm = bD, bD.prototype.__destroy__ = function () {
                    $t(this.kB)
                }, mD.prototype = Object.create(ZR.prototype), mD.prototype.constructor = mD, mD.prototype.lB = mD, mD.mB = {}, n.btTypedConstraint = mD, mD.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), te(e, t)
                }, mD.prototype.getBreakingImpulseThreshold = function () {
                    return ee(this.kB)
                }, mD.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ne(e, t)
                }, mD.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), oe(n, t, e)
                }, mD.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), _e(o, t, e, n)
                }, mD.prototype.__destroy__ = function () {
                    ie(this.kB)
                }, yD.prototype = Object.create(aD.prototype), yD.prototype.constructor = yD, yD.prototype.lB = yD, yD.mB = {}, n.btDynamicsWorld = yD, yD.prototype.addAction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), re(e, t)
                }, yD.prototype.removeAction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), pe(e, t)
                }, yD.prototype.getSolverInfo = function () {
                    return JR(se(this.kB), sT)
                }, yD.prototype.setInternalTickCallback = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? ce(o, t) : void 0 === n ? ae(o, t, e) : le(o, t, e, n)
                }, yD.prototype.getDispatcher = function () {
                    return JR(ue(this.kB), AD)
                }, yD.prototype.rayTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), be(o, t, e, n)
                }, yD.prototype.getPairCache = function () {
                    return JR(me(this.kB), UP)
                }, yD.prototype.getDispatchInfo = function () {
                    return JR(ye(this.kB), pT)
                }, yD.prototype.addCollisionObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? de(o, t) : void 0 === n ? fe(o, t, e) : he(o, t, e, n)
                }, yD.prototype.removeCollisionObject = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Be(e, t)
                }, yD.prototype.getBroadphase = function () {
                    return JR(ge(this.kB), qP)
                }, yD.prototype.convexSweepTest = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), ke(i, t, e, n, o, _)
                }, yD.prototype.contactPairTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Ce(o, t, e, n)
                }, yD.prototype.contactTest = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Se(n, t, e)
                }, yD.prototype.updateSingleAabb = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), je(e, t)
                }, yD.prototype.setDebugDrawer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ve(e, t)
                }, yD.prototype.getDebugDrawer = function () {
                    return JR(Ie(this.kB), dD)
                }, yD.prototype.debugDrawWorld = function () {
                    Re(this.kB)
                }, yD.prototype.debugDrawObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), De(o, t, e, n)
                }, yD.prototype.__destroy__ = function () {
                    Pe(this.kB)
                }, dD.prototype = Object.create(ZR.prototype), dD.prototype.constructor = dD, dD.prototype.lB = dD, dD.mB = {}, n.btIDebugDraw = dD, dD.prototype.drawLine = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Te(o, t, e, n)
                }, dD.prototype.drawContactPoint = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), Oe(i, t, e, n, o, _)
                }, dD.prototype.reportErrorWarning = function (t) {
                    var e = this.kB;
                    _D(), t = t && "object" == typeof t ? t.kB : pD(t), We(e, t)
                }, dD.prototype.draw3dText = function (t, e) {
                    var n = this.kB;
                    _D(), t && "object" == typeof t && (t = t.kB), e = e && "object" == typeof e ? e.kB : pD(e), Ae(n, t, e)
                }, dD.prototype.setDebugMode = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Me(e, t)
                }, dD.prototype.getDebugMode = function () {
                    return xe(this.kB)
                }, dD.prototype.__destroy__ = function () {
                    Fe(this.kB)
                }, fD.prototype = Object.create(ZR.prototype), fD.prototype.constructor = fD, fD.prototype.lB = fD, fD.mB = {}, n.btVector3 = fD, fD.prototype.length = fD.prototype.length = function () {
                    return we(this.kB)
                }, fD.prototype.x = fD.prototype.x = function () {
                    return He(this.kB)
                }, fD.prototype.y = fD.prototype.y = function () {
                    return Ve(this.kB)
                }, fD.prototype.z = fD.prototype.z = function () {
                    return Ee(this.kB)
                }, fD.prototype.setX = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ne(e, t)
                }, fD.prototype.setY = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ue(e, t)
                }, fD.prototype.setZ = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ze(e, t)
                }, fD.prototype.setValue = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), qe(o, t, e, n)
                }, fD.prototype.normalize = fD.prototype.normalize = function () {
                    Ke(this.kB)
                }, fD.prototype.rotate = fD.prototype.rotate = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), JR(Qe(n, t, e), fD)
                }, fD.prototype.dot = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), Xe(e, t)
                }, fD.prototype.op_mul = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ze(e, t), fD)
                }, fD.prototype.op_add = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ye(e, t), fD)
                }, fD.prototype.op_sub = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Je(e, t), fD)
                }, fD.prototype.__destroy__ = function () {
                    $e(this.kB)
                }, hD.prototype = Object.create(ZR.prototype), hD.prototype.constructor = hD, hD.prototype.lB = hD, hD.mB = {}, n.btQuadWord = hD, hD.prototype.x = hD.prototype.x = function () {
                    return tn(this.kB)
                }, hD.prototype.y = hD.prototype.y = function () {
                    return en(this.kB)
                }, hD.prototype.z = hD.prototype.z = function () {
                    return nn(this.kB)
                }, hD.prototype.w = hD.prototype.w = function () {
                    return on(this.kB)
                }, hD.prototype.setX = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _n(e, t)
                }, hD.prototype.setY = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rn(e, t)
                }, hD.prototype.setZ = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), pn(e, t)
                }, hD.prototype.setW = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sn(e, t)
                }, hD.prototype.__destroy__ = function () {
                    cn(this.kB)
                }, BD.prototype = Object.create(ZR.prototype), BD.prototype.constructor = BD, BD.prototype.lB = BD, BD.mB = {}, n.btMotionState = BD, BD.prototype.getWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), an(e, t)
                }, BD.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ln(e, t)
                }, BD.prototype.__destroy__ = function () {
                    un(this.kB)
                }, gD.prototype = Object.create(ZR.prototype), gD.prototype.constructor = gD, gD.prototype.lB = gD, gD.mB = {}, n.RayResultCallback = gD, gD.prototype.hasHit = function () {
                    return !!bn(this.kB)
                }, gD.prototype.get_m_collisionFilterGroup = gD.prototype.nB = function () {
                    return mn(this.kB)
                }, gD.prototype.set_m_collisionFilterGroup = gD.prototype.pB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), yn(e, t)
                }, Object.defineProperty(gD.prototype, "m_collisionFilterGroup", {
                    get: gD.prototype.nB,
                    set: gD.prototype.pB
                }), gD.prototype.get_m_collisionFilterMask = gD.prototype.oB = function () {
                    return dn(this.kB)
                }, gD.prototype.set_m_collisionFilterMask = gD.prototype.qB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fn(e, t)
                }, Object.defineProperty(gD.prototype, "m_collisionFilterMask", {
                    get: gD.prototype.oB,
                    set: gD.prototype.qB
                }), gD.prototype.get_m_closestHitFraction = gD.prototype.rB = function () {
                    return hn(this.kB)
                }, gD.prototype.set_m_closestHitFraction = gD.prototype.sB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bn(e, t)
                }, Object.defineProperty(gD.prototype, "m_closestHitFraction", {
                    get: gD.prototype.rB,
                    set: gD.prototype.sB
                }), gD.prototype.get_m_collisionObject = gD.prototype.vB = function () {
                    return JR(gn(this.kB), lD)
                }, gD.prototype.set_m_collisionObject = gD.prototype.CB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kn(e, t)
                }, Object.defineProperty(gD.prototype, "m_collisionObject", {
                    get: gD.prototype.vB,
                    set: gD.prototype.CB
                }), gD.prototype.get_m_flags = gD.prototype.tB = function () {
                    return Cn(this.kB)
                }, gD.prototype.set_m_flags = gD.prototype.uB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Sn(e, t)
                }, Object.defineProperty(gD.prototype, "m_flags", {
                    get: gD.prototype.tB,
                    set: gD.prototype.uB
                }), gD.prototype.__destroy__ = function () {
                    jn(this.kB)
                }, kD.prototype = Object.create(ZR.prototype), kD.prototype.constructor = kD, kD.prototype.lB = kD, kD.mB = {}, n.ContactResultCallback = kD, kD.prototype.addSingleResult = function (t, e, n, o, _, i, r) {
                    var p = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), vn(p, t, e, n, o, _, i, r)
                }, kD.prototype.__destroy__ = function () {
                    In(this.kB)
                }, CD.prototype = Object.create(ZR.prototype), CD.prototype.constructor = CD, CD.prototype.lB = CD, CD.mB = {}, n.ConvexResultCallback = CD, CD.prototype.hasHit = function () {
                    return !!Rn(this.kB)
                }, CD.prototype.get_m_collisionFilterGroup = CD.prototype.nB = function () {
                    return Dn(this.kB)
                }, CD.prototype.set_m_collisionFilterGroup = CD.prototype.pB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pn(e, t)
                }, Object.defineProperty(CD.prototype, "m_collisionFilterGroup", {
                    get: CD.prototype.nB,
                    set: CD.prototype.pB
                }), CD.prototype.get_m_collisionFilterMask = CD.prototype.oB = function () {
                    return Tn(this.kB)
                }, CD.prototype.set_m_collisionFilterMask = CD.prototype.qB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), On(e, t)
                }, Object.defineProperty(CD.prototype, "m_collisionFilterMask", {
                    get: CD.prototype.oB,
                    set: CD.prototype.qB
                }), CD.prototype.get_m_closestHitFraction = CD.prototype.rB = function () {
                    return Wn(this.kB)
                }, CD.prototype.set_m_closestHitFraction = CD.prototype.sB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), An(e, t)
                }, Object.defineProperty(CD.prototype, "m_closestHitFraction", {
                    get: CD.prototype.rB,
                    set: CD.prototype.sB
                }), CD.prototype.__destroy__ = function () {
                    Mn(this.kB)
                }, SD.prototype = Object.create(cD.prototype), SD.prototype.constructor = SD, SD.prototype.lB = SD, SD.mB = {}, n.btConvexShape = SD, SD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xn(e, t)
                }, SD.prototype.getLocalScaling = function () {
                    return JR(Fn(this.kB), fD)
                }, SD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Ln(n, t, e)
                }, SD.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gn(e, t)
                }, SD.prototype.getMargin = function () {
                    return wn(this.kB)
                }, SD.prototype.__destroy__ = function () {
                    Hn(this.kB)
                }, jD.prototype = Object.create(cD.prototype), jD.prototype.constructor = jD, jD.prototype.lB = jD, jD.mB = {}, n.btCapsuleShape = jD, jD.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), En(e, t)
                }, jD.prototype.getMargin = function () {
                    return Nn(this.kB)
                }, jD.prototype.getUpAxis = function () {
                    return Un(this.kB)
                }, jD.prototype.getRadius = function () {
                    return zn(this.kB)
                }, jD.prototype.getHalfHeight = function () {
                    return qn(this.kB)
                }, jD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Kn(e, t)
                }, jD.prototype.getLocalScaling = function () {
                    return JR(Qn(this.kB), fD)
                }, jD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Xn(n, t, e)
                }, jD.prototype.__destroy__ = function () {
                    Zn(this.kB)
                }, vD.prototype = Object.create(cD.prototype), vD.prototype.constructor = vD, vD.prototype.lB = vD, vD.mB = {}, n.btCylinderShape = vD, vD.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jn(e, t)
                }, vD.prototype.getMargin = function () {
                    return $n(this.kB)
                }, vD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), to(e, t)
                }, vD.prototype.getLocalScaling = function () {
                    return JR(eo(this.kB), fD)
                }, vD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), no(n, t, e)
                }, vD.prototype.__destroy__ = function () {
                    oo(this.kB)
                }, ID.prototype = Object.create(cD.prototype), ID.prototype.constructor = ID, ID.prototype.lB = ID, ID.mB = {}, n.btConeShape = ID, ID.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), io(e, t)
                }, ID.prototype.getLocalScaling = function () {
                    return JR(ro(this.kB), fD)
                }, ID.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), po(n, t, e)
                }, ID.prototype.__destroy__ = function () {
                    so(this.kB)
                }, RD.prototype = Object.create(ZR.prototype), RD.prototype.constructor = RD, RD.prototype.lB = RD, RD.mB = {}, n.btStridingMeshInterface = RD, RD.prototype.setScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), co(e, t)
                }, RD.prototype.__destroy__ = function () {
                    ao(this.kB)
                }, DD.prototype = Object.create(uD.prototype), DD.prototype.constructor = DD, DD.prototype.lB = DD, DD.mB = {}, n.btTriangleMeshShape = DD, DD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lo(e, t)
                }, DD.prototype.getLocalScaling = function () {
                    return JR(uo(this.kB), fD)
                }, DD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), bo(n, t, e)
                }, DD.prototype.__destroy__ = function () {
                    mo(this.kB)
                }, PD.prototype = Object.create(ZR.prototype), PD.prototype.constructor = PD, PD.prototype.lB = PD, PD.mB = {}, n.btPrimitiveManagerBase = PD, PD.prototype.is_trimesh = function () {
                    return !!yo(this.kB)
                }, PD.prototype.get_primitive_count = function () {
                    return fo(this.kB)
                }, PD.prototype.get_primitive_box = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ho(n, t, e)
                }, PD.prototype.get_primitive_triangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Bo(n, t, e)
                }, PD.prototype.__destroy__ = function () {
                    go(this.kB)
                }, TD.prototype = Object.create(uD.prototype), TD.prototype.constructor = TD, TD.prototype.lB = TD, TD.mB = {}, n.btGImpactShapeInterface = TD, TD.prototype.updateBound = function () {
                    ko(this.kB)
                }, TD.prototype.postUpdate = function () {
                    Co(this.kB)
                }, TD.prototype.getShapeType = function () {
                    return So(this.kB)
                }, TD.prototype.getName = function () {
                    return B(jo(this.kB))
                }, TD.prototype.getGImpactShapeType = function () {
                    return vo(this.kB)
                }, TD.prototype.getPrimitiveManager = function () {
                    return JR(Io(this.kB), PD)
                }, TD.prototype.getNumChildShapes = function () {
                    return Ro(this.kB)
                }, TD.prototype.childrenHasTransform = function () {
                    return !!Do(this.kB)
                }, TD.prototype.needsRetrieveTriangles = function () {
                    return !!Po(this.kB)
                }, TD.prototype.needsRetrieveTetrahedrons = function () {
                    return !!To(this.kB)
                }, TD.prototype.getBulletTriangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Oo(n, t, e)
                }, TD.prototype.getBulletTetrahedron = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Wo(n, t, e)
                }, TD.prototype.getChildShape = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ao(e, t), cD)
                }, TD.prototype.getChildTransform = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Mo(e, t), zD)
                }, TD.prototype.setChildTransform = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), xo(n, t, e)
                }, TD.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fo(e, t)
                }, TD.prototype.getLocalScaling = function () {
                    return JR(Lo(this.kB), fD)
                }, TD.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Go(n, t, e)
                }, TD.prototype.__destroy__ = function () {
                    wo(this.kB)
                }, OD.prototype = Object.create(bD.prototype), OD.prototype.constructor = OD, OD.prototype.lB = OD, OD.mB = {}, n.btActivatingCollisionAlgorithm = OD, OD.prototype.__destroy__ = function () {
                    Ho(this.kB)
                }, WD.prototype = Object.create(ZR.prototype), WD.prototype.constructor = WD, WD.prototype.lB = WD, WD.mB = {}, n.btDefaultCollisionConfiguration = WD, WD.prototype.__destroy__ = function () {
                    No(this.kB)
                }, AD.prototype = Object.create(ZR.prototype), AD.prototype.constructor = AD, AD.prototype.lB = AD, AD.mB = {}, n.btDispatcher = AD, AD.prototype.getNumManifolds = function () {
                    return Uo(this.kB)
                }, AD.prototype.getManifoldByIndexInternal = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(zo(e, t), VP)
                }, AD.prototype.__destroy__ = function () {
                    qo(this.kB)
                }, MD.prototype = Object.create(mD.prototype), MD.prototype.constructor = MD, MD.prototype.lB = MD, MD.mB = {}, n.btGeneric6DofConstraint = MD, MD.prototype.setLinearLowerLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Xo(e, t)
                }, MD.prototype.setLinearUpperLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zo(e, t)
                }, MD.prototype.setAngularLowerLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Yo(e, t)
                }, MD.prototype.setAngularUpperLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jo(e, t)
                }, MD.prototype.getFrameOffsetA = function () {
                    return JR($o(this.kB), zD)
                }, MD.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), t_(e, t)
                }, MD.prototype.getBreakingImpulseThreshold = function () {
                    return e_(this.kB)
                }, MD.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), n_(e, t)
                }, MD.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), o_(n, t, e)
                }, MD.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), __(o, t, e, n)
                }, MD.prototype.__destroy__ = function () {
                    i_(this.kB)
                }, xD.prototype = Object.create(yD.prototype), xD.prototype.constructor = xD, xD.prototype.lB = xD, xD.mB = {}, n.btDiscreteDynamicsWorld = xD, xD.prototype.setGravity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), p_(e, t)
                }, xD.prototype.getGravity = function () {
                    return JR(s_(this.kB), fD)
                }, xD.prototype.addRigidBody = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? c_(o, t) : void 0 === n ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(o, t, e) : a_(o, t, e, n)
                }, xD.prototype.removeRigidBody = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), l_(e, t)
                }, xD.prototype.addConstraint = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === e ? u_(n, t) : b_(n, t, e)
                }, xD.prototype.removeConstraint = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), m_(e, t)
                }, xD.prototype.stepSimulation = function (t, e, n) {
                    var o = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? y_(o, t) : void 0 === n ? d_(o, t, e) : f_(o, t, e, n)
                }, xD.prototype.setContactAddedCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), h_(e, t)
                }, xD.prototype.setContactProcessedCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), B_(e, t)
                }, xD.prototype.setContactDestroyedCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), g_(e, t)
                }, xD.prototype.getDispatcher = function () {
                    return JR(k_(this.kB), AD)
                }, xD.prototype.rayTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), C_(o, t, e, n)
                }, xD.prototype.getPairCache = function () {
                    return JR(S_(this.kB), UP)
                }, xD.prototype.getDispatchInfo = function () {
                    return JR(j_(this.kB), pT)
                }, xD.prototype.addCollisionObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? v_(o, t) : void 0 === n ? I_(o, t, e) : R_(o, t, e, n)
                }, xD.prototype.removeCollisionObject = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), D_(e, t)
                }, xD.prototype.getBroadphase = function () {
                    return JR(P_(this.kB), qP)
                }, xD.prototype.convexSweepTest = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), T_(i, t, e, n, o, _)
                }, xD.prototype.contactPairTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), O_(o, t, e, n)
                }, xD.prototype.contactTest = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), W_(n, t, e)
                }, xD.prototype.updateSingleAabb = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), A_(e, t)
                }, xD.prototype.setDebugDrawer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), M_(e, t)
                }, xD.prototype.getDebugDrawer = function () {
                    return JR(x_(this.kB), dD)
                }, xD.prototype.debugDrawWorld = function () {
                    F_(this.kB)
                }, xD.prototype.debugDrawObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), L_(o, t, e, n)
                }, xD.prototype.addAction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), G_(e, t)
                }, xD.prototype.removeAction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), w_(e, t)
                }, xD.prototype.getSolverInfo = function () {
                    return JR(H_(this.kB), sT)
                }, xD.prototype.setInternalTickCallback = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? V_(o, t) : void 0 === n ? E_(o, t, e) : N_(o, t, e, n)
                }, xD.prototype.__destroy__ = function () {
                    U_(this.kB)
                }, FD.prototype = Object.create(ZR.prototype), FD.prototype.constructor = FD, FD.prototype.lB = FD, FD.mB = {}, n.btVehicleRaycaster = FD, FD.prototype.castRay = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), z_(o, t, e, n)
                }, FD.prototype.__destroy__ = function () {
                    q_(this.kB)
                }, LD.prototype = Object.create(ZR.prototype), LD.prototype.constructor = LD, LD.prototype.lB = LD, LD.mB = {}, n.btActionInterface = LD, LD.prototype.updateAction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), K_(n, t, e)
                }, LD.prototype.__destroy__ = function () {
                    Q_(this.kB)
                }, GD.prototype = Object.create(lD.prototype), GD.prototype.constructor = GD, GD.prototype.lB = GD, GD.mB = {}, n.btGhostObject = GD, GD.prototype.getNumOverlappingObjects = function () {
                    return Z_(this.kB)
                }, GD.prototype.getOverlappingObject = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Y_(e, t), lD)
                }, GD.prototype.setAnisotropicFriction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), J_(n, t, e)
                }, GD.prototype.getCollisionShape = function () {
                    return JR($_(this.kB), cD)
                }, GD.prototype.setContactProcessingThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ti(e, t)
                }, GD.prototype.setActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ei(e, t)
                }, GD.prototype.forceActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ni(e, t)
                }, GD.prototype.activate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), void 0 === t ? oi(e) : _i(e, t)
                }, GD.prototype.isActive = function () {
                    return !!ii(this.kB)
                }, GD.prototype.isKinematicObject = function () {
                    return !!ri(this.kB)
                }, GD.prototype.isStaticObject = function () {
                    return !!pi(this.kB)
                }, GD.prototype.isStaticOrKinematicObject = function () {
                    return !!si(this.kB)
                }, GD.prototype.getRestitution = function () {
                    return ci(this.kB)
                }, GD.prototype.getFriction = function () {
                    return ai(this.kB)
                }, GD.prototype.getRollingFriction = function () {
                    return li(this.kB)
                }, GD.prototype.setRestitution = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ui(e, t)
                }, GD.prototype.setFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bi(e, t)
                }, GD.prototype.setRollingFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mi(e, t)
                }, GD.prototype.getWorldTransform = function () {
                    return JR(yi(this.kB), zD)
                }, GD.prototype.getCollisionFlags = function () {
                    return di(this.kB)
                }, GD.prototype.setCollisionFlags = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fi(e, t)
                }, GD.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hi(e, t)
                }, GD.prototype.setCollisionShape = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bi(e, t)
                }, GD.prototype.setCcdMotionThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gi(e, t)
                }, GD.prototype.setCcdSweptSphereRadius = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ki(e, t)
                }, GD.prototype.getUserIndex = function () {
                    return Ci(this.kB)
                }, GD.prototype.setUserIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Si(e, t)
                }, GD.prototype.getUserPointer = function () {
                    return JR(ji(this.kB), HD)
                }, GD.prototype.setUserPointer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), vi(e, t)
                }, GD.prototype.getBroadphaseHandle = function () {
                    return JR(Ii(this.kB), XP)
                }, GD.prototype.__destroy__ = function () {
                    Ri(this.kB)
                }, wD.prototype = Object.create(ZR.prototype), wD.prototype.constructor = wD, wD.prototype.lB = wD, wD.mB = {}, n.btSoftBodySolver = wD, wD.prototype.__destroy__ = function () {
                    Di(this.kB)
                }, HD.prototype = Object.create(ZR.prototype), HD.prototype.constructor = HD, HD.prototype.lB = HD, HD.mB = {}, n.VoidPtr = HD, HD.prototype.__destroy__ = function () {
                    Pi(this.kB)
                }, VD.prototype = Object.create(dD.prototype), VD.prototype.constructor = VD, VD.prototype.lB = VD, VD.mB = {}, n.DebugDrawer = VD, VD.prototype.drawLine = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Oi(o, t, e, n)
                }, VD.prototype.drawContactPoint = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), Wi(i, t, e, n, o, _)
                }, VD.prototype.reportErrorWarning = function (t) {
                    var e = this.kB;
                    _D(), t = t && "object" == typeof t ? t.kB : pD(t), Ai(e, t)
                }, VD.prototype.draw3dText = function (t, e) {
                    var n = this.kB;
                    _D(), t && "object" == typeof t && (t = t.kB), e = e && "object" == typeof e ? e.kB : pD(e), Mi(n, t, e)
                }, VD.prototype.setDebugMode = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xi(e, t)
                }, VD.prototype.getDebugMode = function () {
                    return Fi(this.kB)
                }, VD.prototype.__destroy__ = function () {
                    Li(this.kB)
                }, ED.prototype = Object.create(fD.prototype), ED.prototype.constructor = ED, ED.prototype.lB = ED, ED.mB = {}, n.btVector4 = ED, ED.prototype.w = ED.prototype.w = function () {
                    return Hi(this.kB)
                }, ED.prototype.setValue = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), Vi(_, t, e, n, o)
                }, ED.prototype.length = ED.prototype.length = function () {
                    return Ei(this.kB)
                }, ED.prototype.x = ED.prototype.x = function () {
                    return Ni(this.kB)
                }, ED.prototype.y = ED.prototype.y = function () {
                    return Ui(this.kB)
                }, ED.prototype.z = ED.prototype.z = function () {
                    return zi(this.kB)
                }, ED.prototype.setX = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qi(e, t)
                }, ED.prototype.setY = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ki(e, t)
                }, ED.prototype.setZ = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qi(e, t)
                }, ED.prototype.normalize = ED.prototype.normalize = function () {
                    Xi(this.kB)
                }, ED.prototype.rotate = ED.prototype.rotate = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), JR(Zi(n, t, e), fD)
                }, ED.prototype.dot = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), Yi(e, t)
                }, ED.prototype.op_mul = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ji(e, t), fD)
                }, ED.prototype.op_add = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR($i(e, t), fD)
                }, ED.prototype.op_sub = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(tr(e, t), fD)
                }, ED.prototype.__destroy__ = function () {
                    er(this.kB)
                }, ND.prototype = Object.create(hD.prototype), ND.prototype.constructor = ND, ND.prototype.lB = ND, ND.mB = {}, n.btQuaternion = ND, ND.prototype.setValue = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), or(_, t, e, n, o)
                }, ND.prototype.setEulerZYX = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), _r(o, t, e, n)
                }, ND.prototype.setRotation = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ir(n, t, e)
                }, ND.prototype.normalize = ND.prototype.normalize = function () {
                    rr(this.kB)
                }, ND.prototype.length2 = function () {
                    return pr(this.kB)
                }, ND.prototype.length = ND.prototype.length = function () {
                    return sr(this.kB)
                }, ND.prototype.dot = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), cr(e, t)
                }, ND.prototype.normalized = function () {
                    return JR(ar(this.kB), ND)
                }, ND.prototype.getAxis = function () {
                    return JR(lr(this.kB), fD)
                }, ND.prototype.inverse = ND.prototype.inverse = function () {
                    return JR(ur(this.kB), ND)
                }, ND.prototype.getAngle = function () {
                    return br(this.kB)
                }, ND.prototype.getAngleShortestPath = function () {
                    return mr(this.kB)
                }, ND.prototype.angle = ND.prototype.angle = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), yr(e, t)
                }, ND.prototype.angleShortestPath = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), dr(e, t)
                }, ND.prototype.op_add = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(fr(e, t), ND)
                }, ND.prototype.op_sub = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(hr(e, t), ND)
                }, ND.prototype.op_mul = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Br(e, t), ND)
                }, ND.prototype.op_mulq = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(gr(e, t), ND)
                }, ND.prototype.op_div = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(kr(e, t), ND)
                }, ND.prototype.x = ND.prototype.x = function () {
                    return Cr(this.kB)
                }, ND.prototype.y = ND.prototype.y = function () {
                    return Sr(this.kB)
                }, ND.prototype.z = ND.prototype.z = function () {
                    return jr(this.kB)
                }, ND.prototype.w = ND.prototype.w = function () {
                    return vr(this.kB)
                }, ND.prototype.setX = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ir(e, t)
                }, ND.prototype.setY = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Rr(e, t)
                }, ND.prototype.setZ = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Dr(e, t)
                }, ND.prototype.setW = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pr(e, t)
                }, ND.prototype.__destroy__ = function () {
                    Tr(this.kB)
                }, UD.prototype = Object.create(ZR.prototype), UD.prototype.constructor = UD, UD.prototype.lB = UD, UD.mB = {}, n.btMatrix3x3 = UD, UD.prototype.setEulerZYX = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Or(o, t, e, n)
                }, UD.prototype.getRotation = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Wr(e, t)
                }, UD.prototype.getRow = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ar(e, t), fD)
                }, UD.prototype.__destroy__ = function () {
                    Mr(this.kB)
                }, zD.prototype = Object.create(ZR.prototype), zD.prototype.constructor = zD, zD.prototype.lB = zD, zD.mB = {}, n.btTransform = zD, zD.prototype.setIdentity = function () {
                    Lr(this.kB)
                }, zD.prototype.setOrigin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gr(e, t)
                }, zD.prototype.setRotation = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wr(e, t)
                }, zD.prototype.getOrigin = function () {
                    return JR(Hr(this.kB), fD)
                }, zD.prototype.getRotation = function () {
                    return JR(Vr(this.kB), ND)
                }, zD.prototype.getBasis = function () {
                    return JR(Er(this.kB), UD)
                }, zD.prototype.setFromOpenGLMatrix = function (t) {
                    var e = this.kB;
                    _D(), "object" == typeof t && (t = sD(t)), Nr(e, t)
                }, zD.prototype.inverse = zD.prototype.inverse = function () {
                    return JR(Ur(this.kB), zD)
                }, zD.prototype.op_mul = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(zr(e, t), zD)
                }, zD.prototype.__destroy__ = function () {
                    qr(this.kB)
                }, qD.prototype = Object.create(BD.prototype), qD.prototype.constructor = qD, qD.prototype.lB = qD, qD.mB = {}, n.MotionState = qD, qD.prototype.getWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qr(e, t)
                }, qD.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Xr(e, t)
                }, qD.prototype.__destroy__ = function () {
                    Zr(this.kB)
                }, KD.prototype = Object.create(BD.prototype), KD.prototype.constructor = KD, KD.prototype.lB = KD, KD.mB = {}, n.btDefaultMotionState = KD, KD.prototype.getWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tp(e, t)
                }, KD.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ep(e, t)
                }, KD.prototype.get_m_graphicsWorldTrans = KD.prototype.lD = function () {
                    return JR(np(this.kB), zD)
                }, KD.prototype.set_m_graphicsWorldTrans = KD.prototype.cG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), op(e, t)
                }, Object.defineProperty(KD.prototype, "m_graphicsWorldTrans", {
                    get: KD.prototype.lD,
                    set: KD.prototype.cG
                }), KD.prototype.__destroy__ = function () {
                    _p(this.kB)
                }, QD.prototype = Object.create(ZR.prototype), QD.prototype.constructor = QD, QD.prototype.lB = QD, QD.mB = {}, n.btCollisionObjectWrapper = QD, QD.prototype.getWorldTransform = function () {
                    return JR(ip(this.kB), zD)
                }, QD.prototype.getCollisionObject = function () {
                    return JR(rp(this.kB), lD)
                }, QD.prototype.getCollisionShape = function () {
                    return JR(pp(this.kB), cD)
                }, XD.prototype = Object.create(gD.prototype), XD.prototype.constructor = XD, XD.prototype.lB = XD, XD.mB = {}, n.ClosestRayResultCallback = XD, XD.prototype.hasHit = function () {
                    return !!cp(this.kB)
                }, XD.prototype.get_m_rayFromWorld = XD.prototype.NB = function () {
                    return JR(ap(this.kB), fD)
                }, XD.prototype.set_m_rayFromWorld = XD.prototype.XB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lp(e, t)
                }, Object.defineProperty(XD.prototype, "m_rayFromWorld", {
                    get: XD.prototype.NB,
                    set: XD.prototype.XB
                }), XD.prototype.get_m_rayToWorld = XD.prototype.OB = function () {
                    return JR(up(this.kB), fD)
                }, XD.prototype.set_m_rayToWorld = XD.prototype.YB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bp(e, t)
                }, Object.defineProperty(XD.prototype, "m_rayToWorld", {
                    get: XD.prototype.OB,
                    set: XD.prototype.YB
                }), XD.prototype.get_m_hitNormalWorld = XD.prototype.xB = function () {
                    return JR(mp(this.kB), fD)
                }, XD.prototype.set_m_hitNormalWorld = XD.prototype.EB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), yp(e, t)
                }, Object.defineProperty(XD.prototype, "m_hitNormalWorld", {
                    get: XD.prototype.xB,
                    set: XD.prototype.EB
                }), XD.prototype.get_m_hitPointWorld = XD.prototype.yB = function () {
                    return JR(dp(this.kB), fD)
                }, XD.prototype.set_m_hitPointWorld = XD.prototype.FB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fp(e, t)
                }, Object.defineProperty(XD.prototype, "m_hitPointWorld", {
                    get: XD.prototype.yB,
                    set: XD.prototype.FB
                }), XD.prototype.get_m_collisionFilterGroup = XD.prototype.nB = function () {
                    return hp(this.kB)
                }, XD.prototype.set_m_collisionFilterGroup = XD.prototype.pB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bp(e, t)
                }, Object.defineProperty(XD.prototype, "m_collisionFilterGroup", {
                    get: XD.prototype.nB,
                    set: XD.prototype.pB
                }), XD.prototype.get_m_collisionFilterMask = XD.prototype.oB = function () {
                    return gp(this.kB)
                }, XD.prototype.set_m_collisionFilterMask = XD.prototype.qB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kp(e, t)
                }, Object.defineProperty(XD.prototype, "m_collisionFilterMask", {
                    get: XD.prototype.oB,
                    set: XD.prototype.qB
                }), XD.prototype.get_m_closestHitFraction = XD.prototype.rB = function () {
                    return Cp(this.kB)
                }, XD.prototype.set_m_closestHitFraction = XD.prototype.sB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Sp(e, t)
                }, Object.defineProperty(XD.prototype, "m_closestHitFraction", {
                    get: XD.prototype.rB,
                    set: XD.prototype.sB
                }), XD.prototype.get_m_collisionObject = XD.prototype.vB = function () {
                    return JR(jp(this.kB), lD)
                }, XD.prototype.set_m_collisionObject = XD.prototype.CB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), vp(e, t)
                }, Object.defineProperty(XD.prototype, "m_collisionObject", {
                    get: XD.prototype.vB,
                    set: XD.prototype.CB
                }), XD.prototype.get_m_flags = XD.prototype.tB = function () {
                    return Ip(this.kB)
                }, XD.prototype.set_m_flags = XD.prototype.uB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Rp(e, t)
                }, Object.defineProperty(XD.prototype, "m_flags", {
                    get: XD.prototype.tB,
                    set: XD.prototype.uB
                }), XD.prototype.__destroy__ = function () {
                    Dp(this.kB)
                }, ZD.prototype = Object.create(ZR.prototype), ZD.prototype.constructor = ZD, ZD.prototype.lB = ZD, ZD.mB = {}, n.btConstCollisionObjectArray = ZD, ZD.prototype.size = ZD.prototype.size = function () {
                    return Pp(this.kB)
                }, ZD.prototype.at = ZD.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Tp(e, t), lD)
                }, ZD.prototype.__destroy__ = function () {
                    Op(this.kB)
                }, YD.prototype = Object.create(ZR.prototype), YD.prototype.constructor = YD, YD.prototype.lB = YD, YD.mB = {}, n.btScalarArray = YD, YD.prototype.size = YD.prototype.size = function () {
                    return Wp(this.kB)
                }, YD.prototype.at = YD.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), Ap(e, t)
                }, YD.prototype.__destroy__ = function () {
                    Mp(this.kB)
                }, JD.prototype = Object.create(gD.prototype), JD.prototype.constructor = JD, JD.prototype.lB = JD, JD.mB = {}, n.AllHitsRayResultCallback = JD, JD.prototype.hasHit = function () {
                    return !!Fp(this.kB)
                }, JD.prototype.get_m_collisionObjects = JD.prototype.UC = function () {
                    return JR(Lp(this.kB), ZD)
                }, JD.prototype.set_m_collisionObjects = JD.prototype.LF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gp(e, t)
                }, Object.defineProperty(JD.prototype, "m_collisionObjects", {
                    get: JD.prototype.UC,
                    set: JD.prototype.LF
                }), JD.prototype.get_m_rayFromWorld = JD.prototype.NB = function () {
                    return JR(wp(this.kB), fD)
                }, JD.prototype.set_m_rayFromWorld = JD.prototype.XB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Hp(e, t)
                }, Object.defineProperty(JD.prototype, "m_rayFromWorld", {
                    get: JD.prototype.NB,
                    set: JD.prototype.XB
                }), JD.prototype.get_m_rayToWorld = JD.prototype.OB = function () {
                    return JR(Vp(this.kB), fD)
                }, JD.prototype.set_m_rayToWorld = JD.prototype.YB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ep(e, t)
                }, Object.defineProperty(JD.prototype, "m_rayToWorld", {
                    get: JD.prototype.OB,
                    set: JD.prototype.YB
                }), JD.prototype.get_m_hitNormalWorld = JD.prototype.xB = function () {
                    return JR(Np(this.kB), dP)
                }, JD.prototype.set_m_hitNormalWorld = JD.prototype.EB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Up(e, t)
                }, Object.defineProperty(JD.prototype, "m_hitNormalWorld", {
                    get: JD.prototype.xB,
                    set: JD.prototype.EB
                }), JD.prototype.get_m_hitPointWorld = JD.prototype.yB = function () {
                    return JR(zp(this.kB), dP)
                }, JD.prototype.set_m_hitPointWorld = JD.prototype.FB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qp(e, t)
                }, Object.defineProperty(JD.prototype, "m_hitPointWorld", {
                    get: JD.prototype.yB,
                    set: JD.prototype.FB
                }), JD.prototype.get_m_hitFractions = JD.prototype.qD = function () {
                    return JR(Kp(this.kB), YD)
                }, JD.prototype.set_m_hitFractions = JD.prototype.hG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qp(e, t)
                }, Object.defineProperty(JD.prototype, "m_hitFractions", {
                    get: JD.prototype.qD,
                    set: JD.prototype.hG
                }), JD.prototype.get_m_collisionFilterGroup = JD.prototype.nB = function () {
                    return Xp(this.kB)
                }, JD.prototype.set_m_collisionFilterGroup = JD.prototype.pB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zp(e, t)
                }, Object.defineProperty(JD.prototype, "m_collisionFilterGroup", {
                    get: JD.prototype.nB,
                    set: JD.prototype.pB
                }), JD.prototype.get_m_collisionFilterMask = JD.prototype.oB = function () {
                    return Yp(this.kB)
                }, JD.prototype.set_m_collisionFilterMask = JD.prototype.qB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jp(e, t)
                }, Object.defineProperty(JD.prototype, "m_collisionFilterMask", {
                    get: JD.prototype.oB,
                    set: JD.prototype.qB
                }), JD.prototype.get_m_closestHitFraction = JD.prototype.rB = function () {
                    return $p(this.kB)
                }, JD.prototype.set_m_closestHitFraction = JD.prototype.sB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ts(e, t)
                }, Object.defineProperty(JD.prototype, "m_closestHitFraction", {
                    get: JD.prototype.rB,
                    set: JD.prototype.sB
                }), JD.prototype.get_m_collisionObject = JD.prototype.vB = function () {
                    return JR(es(this.kB), lD)
                }, JD.prototype.set_m_collisionObject = JD.prototype.CB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ns(e, t)
                }, Object.defineProperty(JD.prototype, "m_collisionObject", {
                    get: JD.prototype.vB,
                    set: JD.prototype.CB
                }), JD.prototype.get_m_flags = JD.prototype.tB = function () {
                    return os(this.kB)
                }, JD.prototype.set_m_flags = JD.prototype.uB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _s(e, t)
                }, Object.defineProperty(JD.prototype, "m_flags", {
                    get: JD.prototype.tB,
                    set: JD.prototype.uB
                }), JD.prototype.__destroy__ = function () {
                    is(this.kB)
                }, $D.prototype = Object.create(ZR.prototype), $D.prototype.constructor = $D, $D.prototype.lB = $D, $D.mB = {}, n.btManifoldPoint = $D, $D.prototype.getPositionWorldOnA = function () {
                    return JR(rs(this.kB), fD)
                }, $D.prototype.getPositionWorldOnB = function () {
                    return JR(ps(this.kB), fD)
                }, $D.prototype.getAppliedImpulse = function () {
                    return ss(this.kB)
                }, $D.prototype.getDistance = function () {
                    return cs(this.kB)
                }, $D.prototype.get_m_localPointA = $D.prototype.GD = function () {
                    return JR(as(this.kB), fD)
                }, $D.prototype.set_m_localPointA = $D.prototype.xG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ls(e, t)
                }, Object.defineProperty($D.prototype, "m_localPointA", {
                    get: $D.prototype.GD,
                    set: $D.prototype.xG
                }), $D.prototype.get_m_localPointB = $D.prototype.HD = function () {
                    return JR(us(this.kB), fD)
                }, $D.prototype.set_m_localPointB = $D.prototype.yG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bs(e, t)
                }, Object.defineProperty($D.prototype, "m_localPointB", {
                    get: $D.prototype.HD,
                    set: $D.prototype.yG
                }), $D.prototype.get_m_positionWorldOnB = $D.prototype.YD = function () {
                    return JR(ms(this.kB), fD)
                }, $D.prototype.set_m_positionWorldOnB = $D.prototype.PG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ys(e, t)
                }, Object.defineProperty($D.prototype, "m_positionWorldOnB", {
                    get: $D.prototype.YD,
                    set: $D.prototype.PG
                }), $D.prototype.get_m_positionWorldOnA = $D.prototype.XD = function () {
                    return JR(ds(this.kB), fD)
                }, $D.prototype.set_m_positionWorldOnA = $D.prototype.OG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fs(e, t)
                }, Object.defineProperty($D.prototype, "m_positionWorldOnA", {
                    get: $D.prototype.XD,
                    set: $D.prototype.OG
                }), $D.prototype.get_m_normalWorldOnB = $D.prototype.SD = function () {
                    return JR(hs(this.kB), fD)
                }, $D.prototype.set_m_normalWorldOnB = $D.prototype.JG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bs(e, t)
                }, Object.defineProperty($D.prototype, "m_normalWorldOnB", {
                    get: $D.prototype.SD,
                    set: $D.prototype.JG
                }), $D.prototype.get_m_userPersistentData = $D.prototype.zE = function () {
                    return gs(this.kB)
                }, $D.prototype.set_m_userPersistentData = $D.prototype.rH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ks(e, t)
                }, Object.defineProperty($D.prototype, "m_userPersistentData", {
                    get: $D.prototype.zE,
                    set: $D.prototype.rH
                }), $D.prototype.__destroy__ = function () {
                    Cs(this.kB)
                }, tP.prototype = Object.create(kD.prototype), tP.prototype.constructor = tP, tP.prototype.lB = tP, tP.mB = {}, n.ConcreteContactResultCallback = tP, tP.prototype.addSingleResult = function (t, e, n, o, _, i, r) {
                    var p = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), js(p, t, e, n, o, _, i, r)
                }, tP.prototype.__destroy__ = function () {
                    vs(this.kB)
                }, eP.prototype = Object.create(ZR.prototype), eP.prototype.constructor = eP, eP.prototype.lB = eP, eP.mB = {}, n.LocalShapeInfo = eP, eP.prototype.get_m_shapePart = eP.prototype.gE = function () {
                    return Is(this.kB)
                }, eP.prototype.set_m_shapePart = eP.prototype.ZG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Rs(e, t)
                }, Object.defineProperty(eP.prototype, "m_shapePart", {
                    get: eP.prototype.gE,
                    set: eP.prototype.ZG
                }), eP.prototype.get_m_triangleIndex = eP.prototype.vE = function () {
                    return Ds(this.kB)
                }, eP.prototype.set_m_triangleIndex = eP.prototype.nH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ps(e, t)
                }, Object.defineProperty(eP.prototype, "m_triangleIndex", {
                    get: eP.prototype.vE,
                    set: eP.prototype.nH
                }), eP.prototype.__destroy__ = function () {
                    Ts(this.kB)
                }, nP.prototype = Object.create(ZR.prototype), nP.prototype.constructor = nP, nP.prototype.lB = nP, nP.mB = {}, n.LocalConvexResult = nP, nP.prototype.get_m_hitCollisionObject = nP.prototype.LB = function () {
                    return JR(Ws(this.kB), lD)
                }, nP.prototype.set_m_hitCollisionObject = nP.prototype.VB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), As(e, t)
                }, Object.defineProperty(nP.prototype, "m_hitCollisionObject", {
                    get: nP.prototype.LB,
                    set: nP.prototype.VB
                }), nP.prototype.get_m_localShapeInfo = nP.prototype.ID = function () {
                    return JR(Ms(this.kB), eP)
                }, nP.prototype.set_m_localShapeInfo = nP.prototype.zG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xs(e, t)
                }, Object.defineProperty(nP.prototype, "m_localShapeInfo", {
                    get: nP.prototype.ID,
                    set: nP.prototype.zG
                }), nP.prototype.get_m_hitNormalLocal = nP.prototype.sD = function () {
                    return JR(Fs(this.kB), fD)
                }, nP.prototype.set_m_hitNormalLocal = nP.prototype.jG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ls(e, t)
                }, Object.defineProperty(nP.prototype, "m_hitNormalLocal", {
                    get: nP.prototype.sD,
                    set: nP.prototype.jG
                }), nP.prototype.get_m_hitPointLocal = nP.prototype.uD = function () {
                    return JR(Gs(this.kB), fD)
                }, nP.prototype.set_m_hitPointLocal = nP.prototype.lG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ws(e, t)
                }, Object.defineProperty(nP.prototype, "m_hitPointLocal", {
                    get: nP.prototype.uD,
                    set: nP.prototype.lG
                }), nP.prototype.get_m_hitFraction = nP.prototype.pD = function () {
                    return Hs(this.kB)
                }, nP.prototype.set_m_hitFraction = nP.prototype.gG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Vs(e, t)
                }, Object.defineProperty(nP.prototype, "m_hitFraction", {
                    get: nP.prototype.pD,
                    set: nP.prototype.gG
                }), nP.prototype.__destroy__ = function () {
                    Es(this.kB)
                }, oP.prototype = Object.create(CD.prototype), oP.prototype.constructor = oP, oP.prototype.lB = oP, oP.mB = {}, n.ClosestConvexResultCallback = oP, oP.prototype.hasHit = function () {
                    return !!Us(this.kB)
                }, oP.prototype.get_m_hitCollisionObject = oP.prototype.LB = function () {
                    return JR(zs(this.kB), lD)
                }, oP.prototype.set_m_hitCollisionObject = oP.prototype.VB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qs(e, t)
                }, Object.defineProperty(oP.prototype, "m_hitCollisionObject", {
                    get: oP.prototype.LB,
                    set: oP.prototype.VB
                }), oP.prototype.get_m_convexFromWorld = oP.prototype.ZC = function () {
                    return JR(Ks(this.kB), fD)
                }, oP.prototype.set_m_convexFromWorld = oP.prototype.QF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qs(e, t)
                }, Object.defineProperty(oP.prototype, "m_convexFromWorld", {
                    get: oP.prototype.ZC,
                    set: oP.prototype.QF
                }), oP.prototype.get_m_convexToWorld = oP.prototype.$C = function () {
                    return JR(Xs(this.kB), fD)
                }, oP.prototype.set_m_convexToWorld = oP.prototype.RF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zs(e, t)
                }, Object.defineProperty(oP.prototype, "m_convexToWorld", {
                    get: oP.prototype.$C,
                    set: oP.prototype.RF
                }), oP.prototype.get_m_hitNormalWorld = oP.prototype.xB = function () {
                    return JR(Ys(this.kB), fD)
                }, oP.prototype.set_m_hitNormalWorld = oP.prototype.EB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Js(e, t)
                }, Object.defineProperty(oP.prototype, "m_hitNormalWorld", {
                    get: oP.prototype.xB,
                    set: oP.prototype.EB
                }), oP.prototype.get_m_hitPointWorld = oP.prototype.yB = function () {
                    return JR($s(this.kB), fD)
                }, oP.prototype.set_m_hitPointWorld = oP.prototype.FB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tc(e, t)
                }, Object.defineProperty(oP.prototype, "m_hitPointWorld", {
                    get: oP.prototype.yB,
                    set: oP.prototype.FB
                }), oP.prototype.get_m_collisionFilterGroup = oP.prototype.nB = function () {
                    return ec(this.kB)
                }, oP.prototype.set_m_collisionFilterGroup = oP.prototype.pB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nc(e, t)
                }, Object.defineProperty(oP.prototype, "m_collisionFilterGroup", {
                    get: oP.prototype.nB,
                    set: oP.prototype.pB
                }), oP.prototype.get_m_collisionFilterMask = oP.prototype.oB = function () {
                    return oc(this.kB)
                }, oP.prototype.set_m_collisionFilterMask = oP.prototype.qB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _c(e, t)
                }, Object.defineProperty(oP.prototype, "m_collisionFilterMask", {
                    get: oP.prototype.oB,
                    set: oP.prototype.qB
                }), oP.prototype.get_m_closestHitFraction = oP.prototype.rB = function () {
                    return ic(this.kB)
                }, oP.prototype.set_m_closestHitFraction = oP.prototype.sB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rc(e, t)
                }, Object.defineProperty(oP.prototype, "m_closestHitFraction", {
                    get: oP.prototype.rB,
                    set: oP.prototype.sB
                }), oP.prototype.__destroy__ = function () {
                    pc(this.kB)
                }, _P.prototype = Object.create(SD.prototype), _P.prototype.constructor = _P, _P.prototype.lB = _P, _P.mB = {}, n.btConvexTriangleMeshShape = _P, _P.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ac(e, t)
                }, _P.prototype.getLocalScaling = function () {
                    return JR(lc(this.kB), fD)
                }, _P.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), uc(n, t, e)
                }, _P.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bc(e, t)
                }, _P.prototype.getMargin = function () {
                    return mc(this.kB)
                }, _P.prototype.__destroy__ = function () {
                    yc(this.kB)
                }, iP.prototype = Object.create(cD.prototype), iP.prototype.constructor = iP, iP.prototype.lB = iP, iP.mB = {}, n.btBoxShape = iP, iP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fc(e, t)
                }, iP.prototype.getMargin = function () {
                    return hc(this.kB)
                }, iP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bc(e, t)
                }, iP.prototype.getLocalScaling = function () {
                    return JR(gc(this.kB), fD)
                }, iP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), kc(n, t, e)
                }, iP.prototype.__destroy__ = function () {
                    Cc(this.kB)
                }, rP.prototype = Object.create(jD.prototype), rP.prototype.constructor = rP, rP.prototype.lB = rP, rP.mB = {}, n.btCapsuleShapeX = rP, rP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jc(e, t)
                }, rP.prototype.getMargin = function () {
                    return vc(this.kB)
                }, rP.prototype.getUpAxis = function () {
                    return Ic(this.kB)
                }, rP.prototype.getRadius = function () {
                    return Rc(this.kB)
                }, rP.prototype.getHalfHeight = function () {
                    return Dc(this.kB)
                }, rP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pc(e, t)
                }, rP.prototype.getLocalScaling = function () {
                    return JR(Tc(this.kB), fD)
                }, rP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Oc(n, t, e)
                }, rP.prototype.__destroy__ = function () {
                    Wc(this.kB)
                }, pP.prototype = Object.create(jD.prototype), pP.prototype.constructor = pP, pP.prototype.lB = pP, pP.mB = {}, n.btCapsuleShapeZ = pP, pP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mc(e, t)
                }, pP.prototype.getMargin = function () {
                    return xc(this.kB)
                }, pP.prototype.getUpAxis = function () {
                    return Fc(this.kB)
                }, pP.prototype.getRadius = function () {
                    return Lc(this.kB)
                }, pP.prototype.getHalfHeight = function () {
                    return Gc(this.kB)
                }, pP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wc(e, t)
                }, pP.prototype.getLocalScaling = function () {
                    return JR(Hc(this.kB), fD)
                }, pP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Vc(n, t, e)
                }, pP.prototype.__destroy__ = function () {
                    Ec(this.kB)
                }, sP.prototype = Object.create(vD.prototype), sP.prototype.constructor = sP, sP.prototype.lB = sP, sP.mB = {}, n.btCylinderShapeX = sP, sP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Uc(e, t)
                }, sP.prototype.getMargin = function () {
                    return zc(this.kB)
                }, sP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qc(e, t)
                }, sP.prototype.getLocalScaling = function () {
                    return JR(Kc(this.kB), fD)
                }, sP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Qc(n, t, e)
                }, sP.prototype.__destroy__ = function () {
                    Xc(this.kB)
                }, cP.prototype = Object.create(vD.prototype), cP.prototype.constructor = cP, cP.prototype.lB = cP, cP.mB = {}, n.btCylinderShapeZ = cP, cP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Yc(e, t)
                }, cP.prototype.getMargin = function () {
                    return Jc(this.kB)
                }, cP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), $c(e, t)
                }, cP.prototype.getLocalScaling = function () {
                    return JR(ta(this.kB), fD)
                }, cP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ea(n, t, e)
                }, cP.prototype.__destroy__ = function () {
                    na(this.kB)
                }, aP.prototype = Object.create(cD.prototype), aP.prototype.constructor = aP, aP.prototype.lB = aP, aP.mB = {}, n.btSphereShape = aP, aP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _a(e, t)
                }, aP.prototype.getMargin = function () {
                    return ia(this.kB)
                }, aP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ra(e, t)
                }, aP.prototype.getLocalScaling = function () {
                    return JR(pa(this.kB), fD)
                }, aP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), sa(n, t, e)
                }, aP.prototype.__destroy__ = function () {
                    ca(this.kB)
                }, lP.prototype = Object.create(cD.prototype), lP.prototype.constructor = lP, lP.prototype.lB = lP, lP.mB = {}, n.btMultiSphereShape = lP, lP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), la(e, t)
                }, lP.prototype.getLocalScaling = function () {
                    return JR(ua(this.kB), fD)
                }, lP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ba(n, t, e)
                }, lP.prototype.__destroy__ = function () {
                    ma(this.kB)
                }, uP.prototype = Object.create(ID.prototype), uP.prototype.constructor = uP, uP.prototype.lB = uP, uP.mB = {}, n.btConeShapeX = uP, uP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), da(e, t)
                }, uP.prototype.getLocalScaling = function () {
                    return JR(fa(this.kB), fD)
                }, uP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ha(n, t, e)
                }, uP.prototype.__destroy__ = function () {
                    Ba(this.kB)
                }, bP.prototype = Object.create(ID.prototype), bP.prototype.constructor = bP, bP.prototype.lB = bP, bP.mB = {}, n.btConeShapeZ = bP, bP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ka(e, t)
                }, bP.prototype.getLocalScaling = function () {
                    return JR(Ca(this.kB), fD)
                }, bP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Sa(n, t, e)
                }, bP.prototype.__destroy__ = function () {
                    ja(this.kB)
                }, mP.prototype = Object.create(ZR.prototype), mP.prototype.constructor = mP, mP.prototype.lB = mP, mP.mB = {}, n.btIntArray = mP, mP.prototype.size = mP.prototype.size = function () {
                    return va(this.kB)
                }, mP.prototype.at = mP.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), Ia(e, t)
                }, mP.prototype.__destroy__ = function () {
                    Ra(this.kB)
                }, yP.prototype = Object.create(ZR.prototype), yP.prototype.constructor = yP, yP.prototype.lB = yP, yP.mB = {}, n.btFace = yP, yP.prototype.get_m_indices = yP.prototype.xD = function () {
                    return JR(Da(this.kB), mP)
                }, yP.prototype.set_m_indices = yP.prototype.oG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pa(e, t)
                }, Object.defineProperty(yP.prototype, "m_indices", {
                    get: yP.prototype.xD,
                    set: yP.prototype.oG
                }), yP.prototype.get_m_plane = yP.prototype.WD = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), Ta(e, t)
                }, yP.prototype.set_m_plane = yP.prototype.NG = function (t, e) {
                    var n = this.kB;
                    _D(), t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Oa(n, t, e)
                }, Object.defineProperty(yP.prototype, "m_plane", {
                    get: yP.prototype.WD,
                    set: yP.prototype.NG
                }), yP.prototype.__destroy__ = function () {
                    Wa(this.kB)
                }, dP.prototype = Object.create(ZR.prototype), dP.prototype.constructor = dP, dP.prototype.lB = dP, dP.mB = {}, n.btVector3Array = dP, dP.prototype.size = dP.prototype.size = function () {
                    return Aa(this.kB)
                }, dP.prototype.at = dP.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ma(e, t), fD)
                }, dP.prototype.__destroy__ = function () {
                    xa(this.kB)
                }, fP.prototype = Object.create(ZR.prototype), fP.prototype.constructor = fP, fP.prototype.lB = fP, fP.mB = {}, n.btFaceArray = fP, fP.prototype.size = fP.prototype.size = function () {
                    return Fa(this.kB)
                }, fP.prototype.at = fP.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(La(e, t), yP)
                }, fP.prototype.__destroy__ = function () {
                    Ga(this.kB)
                }, hP.prototype = Object.create(ZR.prototype), hP.prototype.constructor = hP, hP.prototype.lB = hP, hP.mB = {}, n.btConvexPolyhedron = hP, hP.prototype.get_m_vertices = hP.prototype.BE = function () {
                    return JR(wa(this.kB), dP)
                }, hP.prototype.set_m_vertices = hP.prototype.tH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ha(e, t)
                }, Object.defineProperty(hP.prototype, "m_vertices", {
                    get: hP.prototype.BE,
                    set: hP.prototype.tH
                }), hP.prototype.get_m_faces = hP.prototype.KB = function () {
                    return JR(Va(this.kB), fP)
                }, hP.prototype.set_m_faces = hP.prototype.UB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ea(e, t)
                }, Object.defineProperty(hP.prototype, "m_faces", {
                    get: hP.prototype.KB,
                    set: hP.prototype.UB
                }), hP.prototype.__destroy__ = function () {
                    Na(this.kB)
                }, BP.prototype = Object.create(cD.prototype), BP.prototype.constructor = BP, BP.prototype.lB = BP, BP.mB = {}, n.btConvexHullShape = BP, BP.prototype.addPoint = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === e ? Ka(n, t) : Qa(n, t, e)
                }, BP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Xa(e, t)
                }, BP.prototype.getMargin = function () {
                    return Za(this.kB)
                }, BP.prototype.getNumVertices = function () {
                    return Ya(this.kB)
                }, BP.prototype.initializePolyhedralFeatures = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), !!Ja(e, t)
                }, BP.prototype.recalcLocalAabb = function () {
                    $a(this.kB)
                }, BP.prototype.getConvexPolyhedron = function () {
                    return JR(tl(this.kB), hP)
                }, BP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), el(e, t)
                }, BP.prototype.getLocalScaling = function () {
                    return JR(nl(this.kB), fD)
                }, BP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ol(n, t, e)
                }, BP.prototype.__destroy__ = function () {
                    _l(this.kB)
                }, gP.prototype = Object.create(ZR.prototype), gP.prototype.constructor = gP, gP.prototype.lB = gP, gP.mB = {}, n.btShapeHull = gP, gP.prototype.buildHull = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), !!rl(e, t)
                }, gP.prototype.numVertices = function () {
                    return pl(this.kB)
                }, gP.prototype.getVertexPointer = function () {
                    return JR(sl(this.kB), fD)
                }, gP.prototype.__destroy__ = function () {
                    cl(this.kB)
                }, kP.prototype = Object.create(cD.prototype), kP.prototype.constructor = kP, kP.prototype.lB = kP, kP.mB = {}, n.btCompoundShape = kP, kP.prototype.addChildShape = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ul(n, t, e)
                }, kP.prototype.removeChildShape = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bl(e, t)
                }, kP.prototype.removeChildShapeByIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ml(e, t)
                }, kP.prototype.getNumChildShapes = function () {
                    return yl(this.kB)
                }, kP.prototype.getChildShape = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(dl(e, t), cD)
                }, kP.prototype.updateChildTransform = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === n ? fl(o, t, e) : hl(o, t, e, n)
                }, kP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bl(e, t)
                }, kP.prototype.getMargin = function () {
                    return gl(this.kB)
                }, kP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kl(e, t)
                }, kP.prototype.getLocalScaling = function () {
                    return JR(Cl(this.kB), fD)
                }, kP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Sl(n, t, e)
                }, kP.prototype.__destroy__ = function () {
                    jl(this.kB)
                }, CP.prototype = Object.create(ZR.prototype), CP.prototype.constructor = CP, CP.prototype.lB = CP, CP.mB = {}, n.btIndexedMesh = CP, CP.prototype.get_m_numTriangles = CP.prototype.UD = function () {
                    return vl(this.kB)
                }, CP.prototype.set_m_numTriangles = CP.prototype.LG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Il(e, t)
                }, Object.defineProperty(CP.prototype, "m_numTriangles", {
                    get: CP.prototype.UD,
                    set: CP.prototype.LG
                }), CP.prototype.__destroy__ = function () {
                    Rl(this.kB)
                }, SP.prototype = Object.create(ZR.prototype), SP.prototype.constructor = SP, SP.prototype.lB = SP, SP.mB = {}, n.btIndexedMeshArray = SP, SP.prototype.size = SP.prototype.size = function () {
                    return Dl(this.kB)
                }, SP.prototype.at = SP.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Pl(e, t), CP)
                }, SP.prototype.__destroy__ = function () {
                    Tl(this.kB)
                }, jP.prototype = Object.create(RD.prototype), jP.prototype.constructor = jP, jP.prototype.lB = jP, jP.mB = {}, n.btTriangleMesh = jP, jP.prototype.addTriangle = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), void 0 === o ? Ml(_, t, e, n) : xl(_, t, e, n, o)
                }, jP.prototype.findOrAddVertex = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Fl(n, t, e)
                }, jP.prototype.addIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ll(e, t)
                }, jP.prototype.getIndexedMeshArray = function () {
                    return JR(Gl(this.kB), SP)
                }, jP.prototype.setScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wl(e, t)
                }, jP.prototype.__destroy__ = function () {
                    Hl(this.kB)
                }, vP.prototype = Object.create(uD.prototype), vP.prototype.constructor = vP, vP.prototype.lB = vP, vP.mB = {}, n.btEmptyShape = vP, vP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), El(e, t)
                }, vP.prototype.getLocalScaling = function () {
                    return JR(Nl(this.kB), fD)
                }, vP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Ul(n, t, e)
                }, vP.prototype.__destroy__ = function () {
                    zl(this.kB)
                }, IP.prototype = Object.create(uD.prototype), IP.prototype.constructor = IP, IP.prototype.lB = IP, IP.mB = {}, n.btStaticPlaneShape = IP, IP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Kl(e, t)
                }, IP.prototype.getLocalScaling = function () {
                    return JR(Ql(this.kB), fD)
                }, IP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Xl(n, t, e)
                }, IP.prototype.__destroy__ = function () {
                    Zl(this.kB)
                }, RP.prototype = Object.create(DD.prototype), RP.prototype.constructor = RP, RP.prototype.lB = RP, RP.mB = {}, n.btBvhTriangleMeshShape = RP, RP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), $l(e, t)
                }, RP.prototype.getLocalScaling = function () {
                    return JR(tu(this.kB), fD)
                }, RP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), eu(n, t, e)
                }, RP.prototype.__destroy__ = function () {
                    nu(this.kB)
                }, DP.prototype = Object.create(uD.prototype), DP.prototype.constructor = DP, DP.prototype.lB = DP, DP.mB = {}, n.btHeightfieldTerrainShape = DP, DP.prototype.setMargin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _u(e, t)
                }, DP.prototype.getMargin = function () {
                    return iu(this.kB)
                }, DP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ru(e, t)
                }, DP.prototype.getLocalScaling = function () {
                    return JR(pu(this.kB), fD)
                }, DP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), su(n, t, e)
                }, DP.prototype.__destroy__ = function () {
                    cu(this.kB)
                }, PP.prototype = Object.create(ZR.prototype), PP.prototype.constructor = PP, PP.prototype.lB = PP, PP.mB = {}, n.btAABB = PP, PP.prototype.invalidate = function () {
                    lu(this.kB)
                }, PP.prototype.increment_margin = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uu(e, t)
                }, PP.prototype.copy_with_margin = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), bu(n, t, e)
                }, PP.prototype.__destroy__ = function () {
                    mu(this.kB)
                }, TP.prototype = Object.create(ZR.prototype), TP.prototype.constructor = TP, TP.prototype.lB = TP, TP.mB = {}, n.btPrimitiveTriangle = TP, TP.prototype.__destroy__ = function () {
                    du(this.kB)
                }, OP.prototype = Object.create(ZR.prototype), OP.prototype.constructor = OP, OP.prototype.lB = OP, OP.mB = {}, n.btTriangleShapeEx = OP, OP.prototype.getAabb = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), hu(o, t, e, n)
                }, OP.prototype.applyTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bu(e, t)
                }, OP.prototype.buildTriPlane = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gu(e, t)
                }, OP.prototype.__destroy__ = function () {
                    ku(this.kB)
                }, WP.prototype = Object.create(ZR.prototype), WP.prototype.constructor = WP, WP.prototype.lB = WP, WP.mB = {}, n.btTetrahedronShapeEx = WP, WP.prototype.setVertices = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), Su(_, t, e, n, o)
                }, WP.prototype.__destroy__ = function () {
                    ju(this.kB)
                }, AP.prototype = Object.create(PD.prototype), AP.prototype.constructor = AP, AP.prototype.lB = AP, AP.mB = {}, n.CompoundPrimitiveManager = AP, AP.prototype.get_primitive_count = function () {
                    return vu(this.kB)
                }, AP.prototype.get_primitive_box = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Iu(n, t, e)
                }, AP.prototype.get_primitive_triangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Ru(n, t, e)
                }, AP.prototype.is_trimesh = function () {
                    return !!Du(this.kB)
                }, AP.prototype.get_m_compoundShape = AP.prototype.VC = function () {
                    return JR(Pu(this.kB), MP)
                }, AP.prototype.set_m_compoundShape = AP.prototype.MF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Tu(e, t)
                }, Object.defineProperty(AP.prototype, "m_compoundShape", {
                    get: AP.prototype.VC,
                    set: AP.prototype.MF
                }), AP.prototype.__destroy__ = function () {
                    Ou(this.kB)
                }, MP.prototype = Object.create(TD.prototype), MP.prototype.constructor = MP, MP.prototype.lB = MP, MP.mB = {}, n.btGImpactCompoundShape = MP, MP.prototype.childrenHasTransform = function () {
                    return !!Mu(this.kB)
                }, MP.prototype.getPrimitiveManager = function () {
                    return JR(xu(this.kB), PD)
                }, MP.prototype.getCompoundPrimitiveManager = function () {
                    return JR(Fu(this.kB), AP)
                }, MP.prototype.getNumChildShapes = function () {
                    return Lu(this.kB)
                }, MP.prototype.addChildShape = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Gu(n, t, e)
                }, MP.prototype.getChildShape = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(wu(e, t), cD)
                }, MP.prototype.getChildAabb = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), Hu(_, t, e, n, o)
                }, MP.prototype.getChildTransform = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Vu(e, t), zD)
                }, MP.prototype.setChildTransform = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Eu(n, t, e)
                }, MP.prototype.calculateLocalInertia = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Nu(n, t, e)
                }, MP.prototype.getName = function () {
                    return B(Uu(this.kB))
                }, MP.prototype.getGImpactShapeType = function () {
                    return zu(this.kB)
                }, MP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qu(e, t)
                }, MP.prototype.getLocalScaling = function () {
                    return JR(Ku(this.kB), fD)
                }, MP.prototype.updateBound = function () {
                    Qu(this.kB)
                }, MP.prototype.postUpdate = function () {
                    Xu(this.kB)
                }, MP.prototype.getShapeType = function () {
                    return Zu(this.kB)
                }, MP.prototype.needsRetrieveTriangles = function () {
                    return !!Yu(this.kB)
                }, MP.prototype.needsRetrieveTetrahedrons = function () {
                    return !!Ju(this.kB)
                }, MP.prototype.getBulletTriangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), $u(n, t, e)
                }, MP.prototype.getBulletTetrahedron = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), tb(n, t, e)
                }, MP.prototype.__destroy__ = function () {
                    eb(this.kB)
                }, xP.prototype = Object.create(PD.prototype), xP.prototype.constructor = xP, xP.prototype.lB = xP, xP.mB = {}, n.TrimeshPrimitiveManager = xP, xP.prototype.lock = xP.prototype.lock = function () {
                    _b(this.kB)
                }, xP.prototype.unlock = xP.prototype.unlock = function () {
                    ib(this.kB)
                }, xP.prototype.is_trimesh = function () {
                    return !!rb(this.kB)
                }, xP.prototype.get_vertex_count = function () {
                    return pb(this.kB)
                }, xP.prototype.get_indices = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), sb(_, t, e, n, o)
                }, xP.prototype.get_vertex = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), cb(n, t, e)
                }, xP.prototype.get_bullet_triangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), ab(n, t, e)
                }, xP.prototype.get_m_margin = xP.prototype.LD = function () {
                    return lb(this.kB)
                }, xP.prototype.set_m_margin = xP.prototype.CG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ub(e, t)
                }, Object.defineProperty(xP.prototype, "m_margin", {
                    get: xP.prototype.LD,
                    set: xP.prototype.CG
                }), xP.prototype.get_m_meshInterface = xP.prototype.OD = function () {
                    return JR(bb(this.kB), RD)
                }, xP.prototype.set_m_meshInterface = xP.prototype.FG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mb(e, t)
                }, Object.defineProperty(xP.prototype, "m_meshInterface", {
                    get: xP.prototype.OD,
                    set: xP.prototype.FG
                }), xP.prototype.get_m_part = xP.prototype.VD = function () {
                    return yb(this.kB)
                }, xP.prototype.set_m_part = xP.prototype.MG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), db(e, t)
                }, Object.defineProperty(xP.prototype, "m_part", {
                    get: xP.prototype.VD,
                    set: xP.prototype.MG
                }), xP.prototype.get_m_lock_count = xP.prototype.JD = function () {
                    return fb(this.kB)
                }, xP.prototype.set_m_lock_count = xP.prototype.AG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hb(e, t)
                }, Object.defineProperty(xP.prototype, "m_lock_count", {
                    get: xP.prototype.JD,
                    set: xP.prototype.AG
                }), xP.prototype.get_numverts = xP.prototype.LE = function () {
                    return Bb(this.kB)
                }, xP.prototype.set_numverts = xP.prototype.DH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gb(e, t)
                }, Object.defineProperty(xP.prototype, "numverts", {
                    get: xP.prototype.LE,
                    set: xP.prototype.DH
                }), xP.prototype.get_type = xP.prototype.PE = function () {
                    return kb(this.kB)
                }, xP.prototype.set_type = xP.prototype.HH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Cb(e, t)
                }, Object.defineProperty(xP.prototype, "type", {
                    get: xP.prototype.PE,
                    set: xP.prototype.HH
                }), xP.prototype.get_stride = xP.prototype.NE = function () {
                    return Sb(this.kB)
                }, xP.prototype.set_stride = xP.prototype.FH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jb(e, t)
                }, Object.defineProperty(xP.prototype, "stride", {
                    get: xP.prototype.NE,
                    set: xP.prototype.FH
                }), xP.prototype.get_indexstride = xP.prototype.gC = function () {
                    return vb(this.kB)
                }, xP.prototype.set_indexstride = xP.prototype.YE = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ib(e, t)
                }, Object.defineProperty(xP.prototype, "indexstride", {
                    get: xP.prototype.gC,
                    set: xP.prototype.YE
                }), xP.prototype.get_numfaces = xP.prototype.KE = function () {
                    return Rb(this.kB)
                }, xP.prototype.set_numfaces = xP.prototype.CH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Db(e, t)
                }, Object.defineProperty(xP.prototype, "numfaces", {
                    get: xP.prototype.KE,
                    set: xP.prototype.CH
                }), xP.prototype.get_indicestype = xP.prototype.hC = function () {
                    return Pb(this.kB)
                }, xP.prototype.set_indicestype = xP.prototype.ZE = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Tb(e, t)
                }, Object.defineProperty(xP.prototype, "indicestype", {
                    get: xP.prototype.hC,
                    set: xP.prototype.ZE
                }), xP.prototype.__destroy__ = function () {
                    Ob(this.kB)
                }, FP.prototype = Object.create(TD.prototype), FP.prototype.constructor = FP, FP.prototype.lB = FP, FP.mB = {}, n.btGImpactMeshShapePart = FP, FP.prototype.getTrimeshPrimitiveManager = function () {
                    return JR(Ab(this.kB), xP)
                }, FP.prototype.getVertexCount = function () {
                    return Mb(this.kB)
                }, FP.prototype.getVertex = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), xb(n, t, e)
                }, FP.prototype.getPart = function () {
                    return Fb(this.kB)
                }, FP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Lb(e, t)
                }, FP.prototype.getLocalScaling = function () {
                    return JR(Gb(this.kB), fD)
                }, FP.prototype.updateBound = function () {
                    wb(this.kB)
                }, FP.prototype.postUpdate = function () {
                    Hb(this.kB)
                }, FP.prototype.getShapeType = function () {
                    return Vb(this.kB)
                }, FP.prototype.needsRetrieveTriangles = function () {
                    return !!Eb(this.kB)
                }, FP.prototype.needsRetrieveTetrahedrons = function () {
                    return !!Nb(this.kB)
                }, FP.prototype.getBulletTriangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Ub(n, t, e)
                }, FP.prototype.getBulletTetrahedron = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), zb(n, t, e)
                }, FP.prototype.__destroy__ = function () {
                    qb(this.kB)
                }, LP.prototype = Object.create(TD.prototype), LP.prototype.constructor = LP, LP.prototype.lB = LP, LP.mB = {}, n.btGImpactMeshShape = LP, LP.prototype.getMeshInterface = function () {
                    return JR(Qb(this.kB), RD)
                }, LP.prototype.getMeshPartCount = function () {
                    return Xb(this.kB)
                }, LP.prototype.getMeshPart = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Zb(e, t), FP)
                }, LP.prototype.calculateSerializeBufferSize = function () {
                    return Yb(this.kB)
                }, LP.prototype.setLocalScaling = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jb(e, t)
                }, LP.prototype.getLocalScaling = function () {
                    return JR($b(this.kB), fD)
                }, LP.prototype.updateBound = function () {
                    tm(this.kB)
                }, LP.prototype.postUpdate = function () {
                    em(this.kB)
                }, LP.prototype.getShapeType = function () {
                    return nm(this.kB)
                }, LP.prototype.needsRetrieveTriangles = function () {
                    return !!om(this.kB)
                }, LP.prototype.needsRetrieveTetrahedrons = function () {
                    return !!_m(this.kB)
                }, LP.prototype.getBulletTriangle = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), im(n, t, e)
                }, LP.prototype.getBulletTetrahedron = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), rm(n, t, e)
                }, LP.prototype.__destroy__ = function () {
                    pm(this.kB)
                }, GP.prototype = Object.create(ZR.prototype), GP.prototype.constructor = GP, GP.prototype.lB = GP, GP.mB = {}, n.btCollisionAlgorithmConstructionInfo = GP, GP.prototype.get_m_dispatcher1 = GP.prototype.eD = function () {
                    return JR(am(this.kB), AD)
                }, GP.prototype.set_m_dispatcher1 = GP.prototype.WF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lm(e, t)
                }, Object.defineProperty(GP.prototype, "m_dispatcher1", {
                    get: GP.prototype.eD,
                    set: GP.prototype.WF
                }), GP.prototype.get_m_manifold = GP.prototype.KD = function () {
                    return JR(um(this.kB), VP)
                }, GP.prototype.set_m_manifold = GP.prototype.BG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bm(e, t)
                }, Object.defineProperty(GP.prototype, "m_manifold", {
                    get: GP.prototype.KD,
                    set: GP.prototype.BG
                }), GP.prototype.__destroy__ = function () {
                    mm(this.kB)
                }, wP.prototype = Object.create(OD.prototype), wP.prototype.constructor = wP, wP.prototype.lB = wP, wP.mB = {}, n.btGImpactCollisionAlgorithm = wP, wP.prototype.registerAlgorithm = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), dm(e, t)
                }, wP.prototype.__destroy__ = function () {
                    fm(this.kB)
                }, HP.prototype = Object.create(ZR.prototype), HP.prototype.constructor = HP, HP.prototype.lB = HP, HP.mB = {}, n.btDefaultCollisionConstructionInfo = HP, HP.prototype.__destroy__ = function () {
                    Bm(this.kB)
                }, VP.prototype = Object.create(ZR.prototype), VP.prototype.constructor = VP, VP.prototype.lB = VP, VP.mB = {}, n.btPersistentManifold = VP, VP.prototype.getBody0 = function () {
                    return JR(km(this.kB), lD)
                }, VP.prototype.getBody1 = function () {
                    return JR(Cm(this.kB), lD)
                }, VP.prototype.getNumContacts = function () {
                    return Sm(this.kB)
                }, VP.prototype.getContactPoint = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(jm(e, t), $D)
                }, VP.prototype.__destroy__ = function () {
                    vm(this.kB)
                }, EP.prototype = Object.create(AD.prototype), EP.prototype.constructor = EP, EP.prototype.lB = EP, EP.mB = {}, n.btCollisionDispatcher = EP, EP.prototype.getNumManifolds = function () {
                    return Rm(this.kB)
                }, EP.prototype.getManifoldByIndexInternal = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Dm(e, t), VP)
                }, EP.prototype.__destroy__ = function () {
                    Pm(this.kB)
                }, NP.prototype = Object.create(ZR.prototype), NP.prototype.constructor = NP, NP.prototype.lB = NP, NP.mB = {}, n.btOverlappingPairCallback = NP, NP.prototype.__destroy__ = function () {
                    Tm(this.kB)
                }, UP.prototype = Object.create(ZR.prototype), UP.prototype.constructor = UP, UP.prototype.lB = UP, UP.mB = {}, n.btOverlappingPairCache = UP, UP.prototype.setInternalGhostPairCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Om(e, t)
                }, UP.prototype.getNumOverlappingPairs = function () {
                    return Wm(this.kB)
                }, UP.prototype.__destroy__ = function () {
                    Am(this.kB)
                }, zP.prototype = Object.create(ZR.prototype), zP.prototype.constructor = zP, zP.prototype.lB = zP, zP.mB = {}, n.btAxisSweep3 = zP, zP.prototype.__destroy__ = function () {
                    Gm(this.kB)
                }, qP.prototype = Object.create(ZR.prototype), qP.prototype.constructor = qP, qP.prototype.lB = qP, qP.mB = {}, n.btBroadphaseInterface = qP, qP.prototype.getOverlappingPairCache = function () {
                    return JR(wm(this.kB), UP)
                }, qP.prototype.__destroy__ = function () {
                    Hm(this.kB)
                }, KP.prototype = Object.create(ZR.prototype), KP.prototype.constructor = KP, KP.prototype.lB = KP, KP.mB = {}, n.btCollisionConfiguration = KP, KP.prototype.__destroy__ = function () {
                    Vm(this.kB)
                }, QP.prototype = Object.create(ZR.prototype), QP.prototype.constructor = QP, QP.prototype.lB = QP, QP.mB = {}, n.btDbvtBroadphase = QP, QP.prototype.__destroy__ = function () {
                    Nm(this.kB)
                }, XP.prototype = Object.create(ZR.prototype), XP.prototype.constructor = XP, XP.prototype.lB = XP, XP.mB = {}, n.btBroadphaseProxy = XP, XP.prototype.get_m_collisionFilterGroup = XP.prototype.nB = function () {
                    return Um(this.kB)
                }, XP.prototype.set_m_collisionFilterGroup = XP.prototype.pB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), zm(e, t)
                }, Object.defineProperty(XP.prototype, "m_collisionFilterGroup", {
                    get: XP.prototype.nB,
                    set: XP.prototype.pB
                }), XP.prototype.get_m_collisionFilterMask = XP.prototype.oB = function () {
                    return qm(this.kB)
                }, XP.prototype.set_m_collisionFilterMask = XP.prototype.qB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Km(e, t)
                }, Object.defineProperty(XP.prototype, "m_collisionFilterMask", {
                    get: XP.prototype.oB,
                    set: XP.prototype.qB
                }), XP.prototype.__destroy__ = function () {
                    Qm(this.kB)
                }, ZP.prototype = Object.create(ZR.prototype), ZP.prototype.constructor = ZP, ZP.prototype.lB = ZP, ZP.mB = {}, n.btRigidBodyConstructionInfo = ZP, ZP.prototype.get_m_linearDamping = ZP.prototype.DD = function () {
                    return Ym(this.kB)
                }, ZP.prototype.set_m_linearDamping = ZP.prototype.uG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jm(e, t)
                }, Object.defineProperty(ZP.prototype, "m_linearDamping", {
                    get: ZP.prototype.DD,
                    set: ZP.prototype.uG
                }), ZP.prototype.get_m_angularDamping = ZP.prototype.HC = function () {
                    return $m(this.kB)
                }, ZP.prototype.set_m_angularDamping = ZP.prototype.yF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ty(e, t)
                }, Object.defineProperty(ZP.prototype, "m_angularDamping", {
                    get: ZP.prototype.HC,
                    set: ZP.prototype.yF
                }), ZP.prototype.get_m_friction = ZP.prototype.kD = function () {
                    return ey(this.kB)
                }, ZP.prototype.set_m_friction = ZP.prototype.bG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ny(e, t)
                }, Object.defineProperty(ZP.prototype, "m_friction", {
                    get: ZP.prototype.kD,
                    set: ZP.prototype.bG
                }), ZP.prototype.get_m_rollingFriction = ZP.prototype.dE = function () {
                    return oy(this.kB)
                }, ZP.prototype.set_m_rollingFriction = ZP.prototype.WG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _y(e, t)
                }, Object.defineProperty(ZP.prototype, "m_rollingFriction", {
                    get: ZP.prototype.dE,
                    set: ZP.prototype.WG
                }), ZP.prototype.get_m_restitution = ZP.prototype.bE = function () {
                    return iy(this.kB)
                }, ZP.prototype.set_m_restitution = ZP.prototype.UG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ry(e, t)
                }, Object.defineProperty(ZP.prototype, "m_restitution", {
                    get: ZP.prototype.bE,
                    set: ZP.prototype.UG
                }), ZP.prototype.get_m_linearSleepingThreshold = ZP.prototype.ED = function () {
                    return py(this.kB)
                }, ZP.prototype.set_m_linearSleepingThreshold = ZP.prototype.vG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sy(e, t)
                }, Object.defineProperty(ZP.prototype, "m_linearSleepingThreshold", {
                    get: ZP.prototype.ED,
                    set: ZP.prototype.vG
                }), ZP.prototype.get_m_angularSleepingThreshold = ZP.prototype.IC = function () {
                    return cy(this.kB)
                }, ZP.prototype.set_m_angularSleepingThreshold = ZP.prototype.zF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ay(e, t)
                }, Object.defineProperty(ZP.prototype, "m_angularSleepingThreshold", {
                    get: ZP.prototype.IC,
                    set: ZP.prototype.zF
                }), ZP.prototype.get_m_additionalDamping = ZP.prototype.CC = function () {
                    return !!ly(this.kB)
                }, ZP.prototype.set_m_additionalDamping = ZP.prototype.tF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uy(e, t)
                }, Object.defineProperty(ZP.prototype, "m_additionalDamping", {
                    get: ZP.prototype.CC,
                    set: ZP.prototype.tF
                }), ZP.prototype.get_m_additionalDampingFactor = ZP.prototype.DC = function () {
                    return by(this.kB)
                }, ZP.prototype.set_m_additionalDampingFactor = ZP.prototype.uF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), my(e, t)
                }, Object.defineProperty(ZP.prototype, "m_additionalDampingFactor", {
                    get: ZP.prototype.DC,
                    set: ZP.prototype.uF
                }), ZP.prototype.get_m_additionalLinearDampingThresholdSqr = ZP.prototype.EC = function () {
                    return yy(this.kB)
                }, ZP.prototype.set_m_additionalLinearDampingThresholdSqr = ZP.prototype.vF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), dy(e, t)
                }, Object.defineProperty(ZP.prototype, "m_additionalLinearDampingThresholdSqr", {
                    get: ZP.prototype.EC,
                    set: ZP.prototype.vF
                }), ZP.prototype.get_m_additionalAngularDampingThresholdSqr = ZP.prototype.BC = function () {
                    return fy(this.kB)
                }, ZP.prototype.set_m_additionalAngularDampingThresholdSqr = ZP.prototype.sF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hy(e, t)
                }, Object.defineProperty(ZP.prototype, "m_additionalAngularDampingThresholdSqr", {
                    get: ZP.prototype.BC,
                    set: ZP.prototype.sF
                }), ZP.prototype.get_m_additionalAngularDampingFactor = ZP.prototype.AC = function () {
                    return By(this.kB)
                }, ZP.prototype.set_m_additionalAngularDampingFactor = ZP.prototype.rF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gy(e, t)
                }, Object.defineProperty(ZP.prototype, "m_additionalAngularDampingFactor", {
                    get: ZP.prototype.AC,
                    set: ZP.prototype.rF
                }), ZP.prototype.__destroy__ = function () {
                    ky(this.kB)
                }, YP.prototype = Object.create(lD.prototype), YP.prototype.constructor = YP, YP.prototype.lB = YP, YP.mB = {}, n.btRigidBody = YP, YP.prototype.getCenterOfMassTransform = function () {
                    return JR(Sy(this.kB), zD)
                }, YP.prototype.setCenterOfMassTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jy(e, t)
                }, YP.prototype.setSleepingThresholds = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), vy(n, t, e)
                }, YP.prototype.getLinearDamping = function () {
                    return Iy(this.kB)
                }, YP.prototype.getAngularDamping = function () {
                    return Ry(this.kB)
                }, YP.prototype.setDamping = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Dy(n, t, e)
                }, YP.prototype.setMassProps = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Py(n, t, e)
                }, YP.prototype.getLinearFactor = function () {
                    return JR(Ty(this.kB), fD)
                }, YP.prototype.setLinearFactor = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Oy(e, t)
                }, YP.prototype.applyTorque = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Wy(e, t)
                }, YP.prototype.applyLocalTorque = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ay(e, t)
                }, YP.prototype.applyForce = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), My(n, t, e)
                }, YP.prototype.applyCentralForce = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xy(e, t)
                }, YP.prototype.applyCentralLocalForce = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fy(e, t)
                }, YP.prototype.applyTorqueImpulse = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ly(e, t)
                }, YP.prototype.applyImpulse = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Gy(n, t, e)
                }, YP.prototype.applyCentralImpulse = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wy(e, t)
                }, YP.prototype.updateInertiaTensor = function () {
                    Hy(this.kB)
                }, YP.prototype.getLinearVelocity = function () {
                    return JR(Vy(this.kB), fD)
                }, YP.prototype.getAngularVelocity = function () {
                    return JR(Ey(this.kB), fD)
                }, YP.prototype.setLinearVelocity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ny(e, t)
                }, YP.prototype.setAngularVelocity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Uy(e, t)
                }, YP.prototype.getMotionState = function () {
                    return JR(zy(this.kB), BD)
                }, YP.prototype.setMotionState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qy(e, t)
                }, YP.prototype.getAngularFactor = function () {
                    return JR(Ky(this.kB), fD)
                }, YP.prototype.setAngularFactor = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qy(e, t)
                }, YP.prototype.upcast = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Xy(e, t), YP)
                }, YP.prototype.getAabb = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Zy(n, t, e)
                }, YP.prototype.applyGravity = function () {
                    Yy(this.kB)
                }, YP.prototype.getGravity = function () {
                    return JR(Jy(this.kB), fD)
                }, YP.prototype.setGravity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), $y(e, t)
                }, YP.prototype.getBroadphaseProxy = function () {
                    return JR(td(this.kB), XP)
                }, YP.prototype.clearForces = function () {
                    ed(this.kB)
                }, YP.prototype.setFlags = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nd(e, t)
                }, YP.prototype.getFlags = function () {
                    return od(this.kB)
                }, YP.prototype.setAnisotropicFriction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), _d(n, t, e)
                }, YP.prototype.getCollisionShape = function () {
                    return JR(id(this.kB), cD)
                }, YP.prototype.setContactProcessingThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rd(e, t)
                }, YP.prototype.setActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), pd(e, t)
                }, YP.prototype.forceActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sd(e, t)
                }, YP.prototype.activate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), void 0 === t ? cd(e) : ad(e, t)
                }, YP.prototype.isActive = function () {
                    return !!ld(this.kB)
                }, YP.prototype.isKinematicObject = function () {
                    return !!ud(this.kB)
                }, YP.prototype.isStaticObject = function () {
                    return !!bd(this.kB)
                }, YP.prototype.isStaticOrKinematicObject = function () {
                    return !!md(this.kB)
                }, YP.prototype.getRestitution = function () {
                    return yd(this.kB)
                }, YP.prototype.getFriction = function () {
                    return dd(this.kB)
                }, YP.prototype.getRollingFriction = function () {
                    return fd(this.kB)
                }, YP.prototype.setRestitution = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hd(e, t)
                }, YP.prototype.setFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bd(e, t)
                }, YP.prototype.setRollingFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gd(e, t)
                }, YP.prototype.getWorldTransform = function () {
                    return JR(kd(this.kB), zD)
                }, YP.prototype.getCollisionFlags = function () {
                    return Cd(this.kB)
                }, YP.prototype.setCollisionFlags = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Sd(e, t)
                }, YP.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jd(e, t)
                }, YP.prototype.setCollisionShape = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), vd(e, t)
                }, YP.prototype.setCcdMotionThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Id(e, t)
                }, YP.prototype.setCcdSweptSphereRadius = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Rd(e, t)
                }, YP.prototype.getUserIndex = function () {
                    return Dd(this.kB)
                }, YP.prototype.setUserIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pd(e, t)
                }, YP.prototype.getUserPointer = function () {
                    return JR(Td(this.kB), HD)
                }, YP.prototype.setUserPointer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Od(e, t)
                }, YP.prototype.getBroadphaseHandle = function () {
                    return JR(Wd(this.kB), XP)
                }, YP.prototype.__destroy__ = function () {
                    Ad(this.kB)
                }, JP.prototype = Object.create(ZR.prototype), JP.prototype.constructor = JP, JP.prototype.lB = JP, JP.mB = {}, n.btConstraintSetting = JP, JP.prototype.get_m_tau = JP.prototype.sE = function () {
                    return xd(this.kB)
                }, JP.prototype.set_m_tau = JP.prototype.kH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fd(e, t)
                }, Object.defineProperty(JP.prototype, "m_tau", {
                    get: JP.prototype.sE,
                    set: JP.prototype.kH
                }), JP.prototype.get_m_damping = JP.prototype.aD = function () {
                    return Ld(this.kB)
                }, JP.prototype.set_m_damping = JP.prototype.SF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gd(e, t)
                }, Object.defineProperty(JP.prototype, "m_damping", {
                    get: JP.prototype.aD,
                    set: JP.prototype.SF
                }), JP.prototype.get_m_impulseClamp = JP.prototype.wD = function () {
                    return wd(this.kB)
                }, JP.prototype.set_m_impulseClamp = JP.prototype.nG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Hd(e, t)
                }, Object.defineProperty(JP.prototype, "m_impulseClamp", {
                    get: JP.prototype.wD,
                    set: JP.prototype.nG
                }), JP.prototype.__destroy__ = function () {
                    Vd(this.kB)
                }, $P.prototype = Object.create(mD.prototype), $P.prototype.constructor = $P, $P.prototype.lB = $P, $P.mB = {}, n.btPoint2PointConstraint = $P, $P.prototype.setPivotA = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ud(e, t)
                }, $P.prototype.setPivotB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), zd(e, t)
                }, $P.prototype.getPivotInA = function () {
                    return JR(qd(this.kB), fD)
                }, $P.prototype.getPivotInB = function () {
                    return JR(Kd(this.kB), fD)
                }, $P.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qd(e, t)
                }, $P.prototype.getBreakingImpulseThreshold = function () {
                    return Xd(this.kB)
                }, $P.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zd(e, t)
                }, $P.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Yd(n, t, e)
                }, $P.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Jd(o, t, e, n)
                }, $P.prototype.get_m_setting = $P.prototype.fE = function () {
                    return JR($d(this.kB), JP)
                }, $P.prototype.set_m_setting = $P.prototype.YG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tf(e, t)
                }, Object.defineProperty($P.prototype, "m_setting", {
                    get: $P.prototype.fE,
                    set: $P.prototype.YG
                }), $P.prototype.__destroy__ = function () {
                    ef(this.kB)
                }, tT.prototype = Object.create(MD.prototype), tT.prototype.constructor = tT, tT.prototype.lB = tT, tT.mB = {}, n.btGeneric6DofSpringConstraint = tT, tT.prototype.enableSpring = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), _f(n, t, e)
                }, tT.prototype.setStiffness = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), rf(n, t, e)
                }, tT.prototype.setDamping = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), pf(n, t, e)
                }, tT.prototype.setEquilibriumPoint = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === t ? sf(n) : void 0 === e ? cf(n, t) : af(n, t, e)
                }, tT.prototype.setLinearLowerLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lf(e, t)
                }, tT.prototype.setLinearUpperLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uf(e, t)
                }, tT.prototype.setAngularLowerLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bf(e, t)
                }, tT.prototype.setAngularUpperLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mf(e, t)
                }, tT.prototype.getFrameOffsetA = function () {
                    return JR(yf(this.kB), zD)
                }, tT.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), df(e, t)
                }, tT.prototype.getBreakingImpulseThreshold = function () {
                    return ff(this.kB)
                }, tT.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hf(e, t)
                }, tT.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Bf(n, t, e)
                }, tT.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), gf(o, t, e, n)
                }, tT.prototype.__destroy__ = function () {
                    kf(this.kB)
                }, eT.prototype = Object.create(ZR.prototype), eT.prototype.constructor = eT, eT.prototype.lB = eT, eT.mB = {}, n.btSequentialImpulseConstraintSolver = eT, eT.prototype.__destroy__ = function () {
                    Sf(this.kB)
                }, nT.prototype = Object.create(mD.prototype), nT.prototype.constructor = nT, nT.prototype.lB = nT, nT.mB = {}, n.btConeTwistConstraint = nT, nT.prototype.setLimit = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), If(n, t, e)
                }, nT.prototype.setAngularOnly = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Rf(e, t)
                }, nT.prototype.setDamping = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Df(e, t)
                }, nT.prototype.enableMotor = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pf(e, t)
                }, nT.prototype.setMaxMotorImpulse = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Tf(e, t)
                }, nT.prototype.setMaxMotorImpulseNormalized = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Of(e, t)
                }, nT.prototype.setMotorTarget = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Wf(e, t)
                }, nT.prototype.setMotorTargetInConstraintSpace = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Af(e, t)
                }, nT.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mf(e, t)
                }, nT.prototype.getBreakingImpulseThreshold = function () {
                    return xf(this.kB)
                }, nT.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ff(e, t)
                }, nT.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Lf(n, t, e)
                }, nT.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Gf(o, t, e, n)
                }, nT.prototype.__destroy__ = function () {
                    wf(this.kB)
                }, oT.prototype = Object.create(mD.prototype), oT.prototype.constructor = oT, oT.prototype.lB = oT, oT.mB = {}, n.btHingeConstraint = oT, oT.prototype.getHingeAngle = function () {
                    return qf(this.kB)
                }, oT.prototype.setLimit = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), void 0 === _ ? Kf(i, t, e, n, o) : Qf(i, t, e, n, o, _)
                }, oT.prototype.enableAngularMotor = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Xf(o, t, e, n)
                }, oT.prototype.setAngularOnly = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zf(e, t)
                }, oT.prototype.enableMotor = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Yf(e, t)
                }, oT.prototype.setMaxMotorImpulse = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jf(e, t)
                }, oT.prototype.setMotorTarget = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), $f(n, t, e)
                }, oT.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), th(e, t)
                }, oT.prototype.getBreakingImpulseThreshold = function () {
                    return eh(this.kB)
                }, oT.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nh(e, t)
                }, oT.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), oh(n, t, e)
                }, oT.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), _h(o, t, e, n)
                }, oT.prototype.__destroy__ = function () {
                    ih(this.kB)
                }, _T.prototype = Object.create(mD.prototype), _T.prototype.constructor = _T, _T.prototype.lB = _T, _T.mB = {}, n.btSliderConstraint = _T, _T.prototype.getLinearPos = function () {
                    return sh(this.kB)
                }, _T.prototype.getAngularPos = function () {
                    return ch(this.kB)
                }, _T.prototype.setLowerLinLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ah(e, t)
                }, _T.prototype.setUpperLinLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lh(e, t)
                }, _T.prototype.setLowerAngLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uh(e, t)
                }, _T.prototype.setUpperAngLimit = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bh(e, t)
                }, _T.prototype.setPoweredLinMotor = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mh(e, t)
                }, _T.prototype.setMaxLinMotorForce = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), yh(e, t)
                }, _T.prototype.setTargetLinMotorVelocity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), dh(e, t)
                }, _T.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fh(e, t)
                }, _T.prototype.getBreakingImpulseThreshold = function () {
                    return hh(this.kB)
                }, _T.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bh(e, t)
                }, _T.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), gh(n, t, e)
                }, _T.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), kh(o, t, e, n)
                }, _T.prototype.__destroy__ = function () {
                    Ch(this.kB)
                }, iT.prototype = Object.create(mD.prototype), iT.prototype.constructor = iT, iT.prototype.lB = iT, iT.mB = {}, n.btFixedConstraint = iT, iT.prototype.enableFeedback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jh(e, t)
                }, iT.prototype.getBreakingImpulseThreshold = function () {
                    return vh(this.kB)
                }, iT.prototype.setBreakingImpulseThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ih(e, t)
                }, iT.prototype.getParam = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Rh(n, t, e)
                }, iT.prototype.setParam = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Dh(o, t, e, n)
                }, iT.prototype.__destroy__ = function () {
                    Ph(this.kB)
                }, rT.prototype = Object.create(ZR.prototype), rT.prototype.constructor = rT, rT.prototype.lB = rT, rT.mB = {}, n.btConstraintSolver = rT, rT.prototype.__destroy__ = function () {
                    Th(this.kB)
                }, pT.prototype = Object.create(ZR.prototype), pT.prototype.constructor = pT, pT.prototype.lB = pT, pT.mB = {}, n.btDispatcherInfo = pT, pT.prototype.get_m_timeStep = pT.prototype.uE = function () {
                    return Oh(this.kB)
                }, pT.prototype.set_m_timeStep = pT.prototype.mH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Wh(e, t)
                }, Object.defineProperty(pT.prototype, "m_timeStep", {
                    get: pT.prototype.uE,
                    set: pT.prototype.mH
                }), pT.prototype.get_m_stepCount = pT.prototype.lE = function () {
                    return Ah(this.kB)
                }, pT.prototype.set_m_stepCount = pT.prototype.dH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mh(e, t)
                }, Object.defineProperty(pT.prototype, "m_stepCount", {
                    get: pT.prototype.lE,
                    set: pT.prototype.dH
                }), pT.prototype.get_m_dispatchFunc = pT.prototype.cD = function () {
                    return xh(this.kB)
                }, pT.prototype.set_m_dispatchFunc = pT.prototype.UF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fh(e, t)
                }, Object.defineProperty(pT.prototype, "m_dispatchFunc", {
                    get: pT.prototype.cD,
                    set: pT.prototype.UF
                }), pT.prototype.get_m_timeOfImpact = pT.prototype.tE = function () {
                    return Lh(this.kB)
                }, pT.prototype.set_m_timeOfImpact = pT.prototype.lH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gh(e, t)
                }, Object.defineProperty(pT.prototype, "m_timeOfImpact", {
                    get: pT.prototype.tE,
                    set: pT.prototype.lH
                }), pT.prototype.get_m_useContinuous = pT.prototype.wE = function () {
                    return !!wh(this.kB)
                }, pT.prototype.set_m_useContinuous = pT.prototype.oH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Hh(e, t)
                }, Object.defineProperty(pT.prototype, "m_useContinuous", {
                    get: pT.prototype.wE,
                    set: pT.prototype.oH
                }), pT.prototype.get_m_enableSatConvex = pT.prototype.hD = function () {
                    return !!Vh(this.kB)
                }, pT.prototype.set_m_enableSatConvex = pT.prototype.ZF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Eh(e, t)
                }, Object.defineProperty(pT.prototype, "m_enableSatConvex", {
                    get: pT.prototype.hD,
                    set: pT.prototype.ZF
                }), pT.prototype.get_m_enableSPU = pT.prototype.gD = function () {
                    return !!Nh(this.kB)
                }, pT.prototype.set_m_enableSPU = pT.prototype.YF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Uh(e, t)
                }, Object.defineProperty(pT.prototype, "m_enableSPU", {
                    get: pT.prototype.gD,
                    set: pT.prototype.YF
                }), pT.prototype.get_m_useEpa = pT.prototype.yE = function () {
                    return !!zh(this.kB)
                }, pT.prototype.set_m_useEpa = pT.prototype.qH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qh(e, t)
                }, Object.defineProperty(pT.prototype, "m_useEpa", {
                    get: pT.prototype.yE,
                    set: pT.prototype.qH
                }), pT.prototype.get_m_allowedCcdPenetration = pT.prototype.FC = function () {
                    return Kh(this.kB)
                }, pT.prototype.set_m_allowedCcdPenetration = pT.prototype.wF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qh(e, t)
                }, Object.defineProperty(pT.prototype, "m_allowedCcdPenetration", {
                    get: pT.prototype.FC,
                    set: pT.prototype.wF
                }), pT.prototype.get_m_useConvexConservativeDistanceUtil = pT.prototype.xE = function () {
                    return !!Xh(this.kB)
                }, pT.prototype.set_m_useConvexConservativeDistanceUtil = pT.prototype.pH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zh(e, t)
                }, Object.defineProperty(pT.prototype, "m_useConvexConservativeDistanceUtil", {
                    get: pT.prototype.xE,
                    set: pT.prototype.pH
                }), pT.prototype.get_m_convexConservativeDistanceThreshold = pT.prototype.YC = function () {
                    return Yh(this.kB)
                }, pT.prototype.set_m_convexConservativeDistanceThreshold = pT.prototype.PF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jh(e, t)
                }, Object.defineProperty(pT.prototype, "m_convexConservativeDistanceThreshold", {
                    get: pT.prototype.YC,
                    set: pT.prototype.PF
                }), pT.prototype.__destroy__ = function () {
                    $h(this.kB)
                }, sT.prototype = Object.create(ZR.prototype), sT.prototype.constructor = sT, sT.prototype.lB = sT, sT.mB = {}, n.btContactSolverInfo = sT, sT.prototype.get_m_splitImpulse = sT.prototype.iE = function () {
                    return !!tB(this.kB)
                }, sT.prototype.set_m_splitImpulse = sT.prototype.aH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), eB(e, t)
                }, Object.defineProperty(sT.prototype, "m_splitImpulse", {
                    get: sT.prototype.iE,
                    set: sT.prototype.aH
                }), sT.prototype.get_m_splitImpulsePenetrationThreshold = sT.prototype.jE = function () {
                    return nB(this.kB)
                }, sT.prototype.set_m_splitImpulsePenetrationThreshold = sT.prototype.bH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), oB(e, t)
                }, Object.defineProperty(sT.prototype, "m_splitImpulsePenetrationThreshold", {
                    get: sT.prototype.jE,
                    set: sT.prototype.bH
                }), sT.prototype.get_m_numIterations = sT.prototype.TD = function () {
                    return _B(this.kB)
                }, sT.prototype.set_m_numIterations = sT.prototype.KG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), iB(e, t)
                }, Object.defineProperty(sT.prototype, "m_numIterations", {
                    get: sT.prototype.TD,
                    set: sT.prototype.KG
                }), sT.prototype.__destroy__ = function () {
                    rB(this.kB)
                }, cT.prototype = Object.create(ZR.prototype), cT.prototype.constructor = cT, cT.prototype.lB = cT, cT.mB = {}, n.btVehicleTuning = cT, cT.prototype.get_m_suspensionStiffness = cT.prototype.BB = function () {
                    return sB(this.kB)
                }, cT.prototype.set_m_suspensionStiffness = cT.prototype.IB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), cB(e, t)
                }, Object.defineProperty(cT.prototype, "m_suspensionStiffness", {
                    get: cT.prototype.BB,
                    set: cT.prototype.IB
                }), cT.prototype.get_m_suspensionCompression = cT.prototype.mE = function () {
                    return aB(this.kB)
                }, cT.prototype.set_m_suspensionCompression = cT.prototype.eH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lB(e, t)
                }, Object.defineProperty(cT.prototype, "m_suspensionCompression", {
                    get: cT.prototype.mE,
                    set: cT.prototype.eH
                }), cT.prototype.get_m_suspensionDamping = cT.prototype.nE = function () {
                    return uB(this.kB)
                }, cT.prototype.set_m_suspensionDamping = cT.prototype.fH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bB(e, t)
                }, Object.defineProperty(cT.prototype, "m_suspensionDamping", {
                    get: cT.prototype.nE,
                    set: cT.prototype.fH
                }), cT.prototype.get_m_maxSuspensionTravelCm = cT.prototype.AB = function () {
                    return mB(this.kB)
                }, cT.prototype.set_m_maxSuspensionTravelCm = cT.prototype.HB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), yB(e, t)
                }, Object.defineProperty(cT.prototype, "m_maxSuspensionTravelCm", {
                    get: cT.prototype.AB,
                    set: cT.prototype.HB
                }), cT.prototype.get_m_frictionSlip = cT.prototype.wB = function () {
                    return dB(this.kB)
                }, cT.prototype.set_m_frictionSlip = cT.prototype.DB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), fB(e, t)
                }, Object.defineProperty(cT.prototype, "m_frictionSlip", {
                    get: cT.prototype.wB,
                    set: cT.prototype.DB
                }), cT.prototype.get_m_maxSuspensionForce = cT.prototype.zB = function () {
                    return hB(this.kB)
                }, cT.prototype.set_m_maxSuspensionForce = cT.prototype.GB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), BB(e, t)
                }, Object.defineProperty(cT.prototype, "m_maxSuspensionForce", {
                    get: cT.prototype.zB,
                    set: cT.prototype.GB
                }), aT.prototype = Object.create(ZR.prototype), aT.prototype.constructor = aT, aT.prototype.lB = aT, aT.mB = {}, n.btVehicleRaycasterResult = aT, aT.prototype.get_m_hitPointInWorld = aT.prototype.tD = function () {
                    return JR(gB(this.kB), fD)
                }, aT.prototype.set_m_hitPointInWorld = aT.prototype.kG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kB(e, t)
                }, Object.defineProperty(aT.prototype, "m_hitPointInWorld", {
                    get: aT.prototype.tD,
                    set: aT.prototype.kG
                }), aT.prototype.get_m_hitNormalInWorld = aT.prototype.rD = function () {
                    return JR(CB(this.kB), fD)
                }, aT.prototype.set_m_hitNormalInWorld = aT.prototype.iG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), SB(e, t)
                }, Object.defineProperty(aT.prototype, "m_hitNormalInWorld", {
                    get: aT.prototype.rD,
                    set: aT.prototype.iG
                }), aT.prototype.get_m_distFraction = aT.prototype.fD = function () {
                    return jB(this.kB)
                }, aT.prototype.set_m_distFraction = aT.prototype.XF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), vB(e, t)
                }, Object.defineProperty(aT.prototype, "m_distFraction", {
                    get: aT.prototype.fD,
                    set: aT.prototype.XF
                }), aT.prototype.__destroy__ = function () {
                    IB(this.kB)
                }, lT.prototype = Object.create(FD.prototype), lT.prototype.constructor = lT, lT.prototype.lB = lT, lT.mB = {}, n.btDefaultVehicleRaycaster = lT, lT.prototype.castRay = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), DB(o, t, e, n)
                }, lT.prototype.__destroy__ = function () {
                    PB(this.kB)
                }, uT.prototype = Object.create(ZR.prototype), uT.prototype.constructor = uT, uT.prototype.lB = uT, uT.mB = {}, n.RaycastInfo = uT, uT.prototype.get_m_contactNormalWS = uT.prototype.WC = function () {
                    return JR(TB(this.kB), fD)
                }, uT.prototype.set_m_contactNormalWS = uT.prototype.NF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), OB(e, t)
                }, Object.defineProperty(uT.prototype, "m_contactNormalWS", {
                    get: uT.prototype.WC,
                    set: uT.prototype.NF
                }), uT.prototype.get_m_contactPointWS = uT.prototype.XC = function () {
                    return JR(WB(this.kB), fD)
                }, uT.prototype.set_m_contactPointWS = uT.prototype.OF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), AB(e, t)
                }, Object.defineProperty(uT.prototype, "m_contactPointWS", {
                    get: uT.prototype.XC,
                    set: uT.prototype.OF
                }), uT.prototype.get_m_suspensionLength = uT.prototype.oE = function () {
                    return MB(this.kB)
                }, uT.prototype.set_m_suspensionLength = uT.prototype.gH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xB(e, t)
                }, Object.defineProperty(uT.prototype, "m_suspensionLength", {
                    get: uT.prototype.oE,
                    set: uT.prototype.gH
                }), uT.prototype.get_m_hardPointWS = uT.prototype.oD = function () {
                    return JR(FB(this.kB), fD)
                }, uT.prototype.set_m_hardPointWS = uT.prototype.fG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), LB(e, t)
                }, Object.defineProperty(uT.prototype, "m_hardPointWS", {
                    get: uT.prototype.oD,
                    set: uT.prototype.fG
                }), uT.prototype.get_m_wheelDirectionWS = uT.prototype.DE = function () {
                    return JR(GB(this.kB), fD)
                }, uT.prototype.set_m_wheelDirectionWS = uT.prototype.vH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wB(e, t)
                }, Object.defineProperty(uT.prototype, "m_wheelDirectionWS", {
                    get: uT.prototype.DE,
                    set: uT.prototype.vH
                }), uT.prototype.get_m_wheelAxleWS = uT.prototype.CE = function () {
                    return JR(HB(this.kB), fD)
                }, uT.prototype.set_m_wheelAxleWS = uT.prototype.uH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), VB(e, t)
                }, Object.defineProperty(uT.prototype, "m_wheelAxleWS", {
                    get: uT.prototype.CE,
                    set: uT.prototype.uH
                }), uT.prototype.get_m_isInContact = uT.prototype.zD = function () {
                    return !!EB(this.kB)
                }, uT.prototype.set_m_isInContact = uT.prototype.qG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), NB(e, t)
                }, Object.defineProperty(uT.prototype, "m_isInContact", {
                    get: uT.prototype.zD,
                    set: uT.prototype.qG
                }), uT.prototype.get_m_groundObject = uT.prototype.nD = function () {
                    return UB(this.kB)
                }, uT.prototype.set_m_groundObject = uT.prototype.eG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), zB(e, t)
                }, Object.defineProperty(uT.prototype, "m_groundObject", {
                    get: uT.prototype.nD,
                    set: uT.prototype.eG
                }), uT.prototype.__destroy__ = function () {
                    qB(this.kB)
                }, bT.prototype = Object.create(ZR.prototype), bT.prototype.constructor = bT, bT.prototype.lB = bT, bT.mB = {}, n.btWheelInfoConstructionInfo = bT, bT.prototype.get_m_chassisConnectionCS = bT.prototype.RC = function () {
                    return JR(KB(this.kB), fD)
                }, bT.prototype.set_m_chassisConnectionCS = bT.prototype.IF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), QB(e, t)
                }, Object.defineProperty(bT.prototype, "m_chassisConnectionCS", {
                    get: bT.prototype.RC,
                    set: bT.prototype.IF
                }), bT.prototype.get_m_wheelDirectionCS = bT.prototype.QB = function () {
                    return JR(XB(this.kB), fD)
                }, bT.prototype.set_m_wheelDirectionCS = bT.prototype.$B = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ZB(e, t)
                }, Object.defineProperty(bT.prototype, "m_wheelDirectionCS", {
                    get: bT.prototype.QB,
                    set: bT.prototype.$B
                }), bT.prototype.get_m_wheelAxleCS = bT.prototype.PB = function () {
                    return JR(YB(this.kB), fD)
                }, bT.prototype.set_m_wheelAxleCS = bT.prototype.ZB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), JB(e, t)
                }, Object.defineProperty(bT.prototype, "m_wheelAxleCS", {
                    get: bT.prototype.PB,
                    set: bT.prototype.ZB
                }), bT.prototype.get_m_suspensionRestLength = bT.prototype.qE = function () {
                    return $B(this.kB)
                }, bT.prototype.set_m_suspensionRestLength = bT.prototype.iH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tg(e, t)
                }, Object.defineProperty(bT.prototype, "m_suspensionRestLength", {
                    get: bT.prototype.qE,
                    set: bT.prototype.iH
                }), bT.prototype.get_m_maxSuspensionTravelCm = bT.prototype.AB = function () {
                    return eg(this.kB)
                }, bT.prototype.set_m_maxSuspensionTravelCm = bT.prototype.HB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ng(e, t)
                }, Object.defineProperty(bT.prototype, "m_maxSuspensionTravelCm", {
                    get: bT.prototype.AB,
                    set: bT.prototype.HB
                }), bT.prototype.get_m_wheelRadius = bT.prototype.EE = function () {
                    return og(this.kB)
                }, bT.prototype.set_m_wheelRadius = bT.prototype.wH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _g(e, t)
                }, Object.defineProperty(bT.prototype, "m_wheelRadius", {
                    get: bT.prototype.EE,
                    set: bT.prototype.wH
                }), bT.prototype.get_m_suspensionStiffness = bT.prototype.BB = function () {
                    return ig(this.kB)
                }, bT.prototype.set_m_suspensionStiffness = bT.prototype.IB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rg(e, t)
                }, Object.defineProperty(bT.prototype, "m_suspensionStiffness", {
                    get: bT.prototype.BB,
                    set: bT.prototype.IB
                }), bT.prototype.get_m_wheelsDampingCompression = bT.prototype.RB = function () {
                    return pg(this.kB)
                }, bT.prototype.set_m_wheelsDampingCompression = bT.prototype.aC = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sg(e, t)
                }, Object.defineProperty(bT.prototype, "m_wheelsDampingCompression", {
                    get: bT.prototype.RB,
                    set: bT.prototype.aC
                }), bT.prototype.get_m_wheelsDampingRelaxation = bT.prototype.SB = function () {
                    return cg(this.kB)
                }, bT.prototype.set_m_wheelsDampingRelaxation = bT.prototype.bC = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ag(e, t)
                }, Object.defineProperty(bT.prototype, "m_wheelsDampingRelaxation", {
                    get: bT.prototype.SB,
                    set: bT.prototype.bC
                }), bT.prototype.get_m_frictionSlip = bT.prototype.wB = function () {
                    return lg(this.kB)
                }, bT.prototype.set_m_frictionSlip = bT.prototype.DB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ug(e, t)
                }, Object.defineProperty(bT.prototype, "m_frictionSlip", {
                    get: bT.prototype.wB,
                    set: bT.prototype.DB
                }), bT.prototype.get_m_maxSuspensionForce = bT.prototype.zB = function () {
                    return bg(this.kB)
                }, bT.prototype.set_m_maxSuspensionForce = bT.prototype.GB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mg(e, t)
                }, Object.defineProperty(bT.prototype, "m_maxSuspensionForce", {
                    get: bT.prototype.zB,
                    set: bT.prototype.GB
                }), bT.prototype.get_m_bIsFrontWheel = bT.prototype.JB = function () {
                    return !!yg(this.kB)
                }, bT.prototype.set_m_bIsFrontWheel = bT.prototype.TB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), dg(e, t)
                }, Object.defineProperty(bT.prototype, "m_bIsFrontWheel", {
                    get: bT.prototype.JB,
                    set: bT.prototype.TB
                }), bT.prototype.__destroy__ = function () {
                    fg(this.kB)
                }, mT.prototype = Object.create(ZR.prototype), mT.prototype.constructor = mT, mT.prototype.lB = mT, mT.mB = {}, n.btWheelInfo = mT, mT.prototype.getSuspensionRestLength = function () {
                    return Bg(this.kB)
                }, mT.prototype.updateWheel = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), gg(n, t, e)
                }, mT.prototype.get_m_suspensionStiffness = mT.prototype.BB = function () {
                    return kg(this.kB)
                }, mT.prototype.set_m_suspensionStiffness = mT.prototype.IB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Cg(e, t)
                }, Object.defineProperty(mT.prototype, "m_suspensionStiffness", {
                    get: mT.prototype.BB,
                    set: mT.prototype.IB
                }), mT.prototype.get_m_frictionSlip = mT.prototype.wB = function () {
                    return Sg(this.kB)
                }, mT.prototype.set_m_frictionSlip = mT.prototype.DB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jg(e, t)
                }, Object.defineProperty(mT.prototype, "m_frictionSlip", {
                    get: mT.prototype.wB,
                    set: mT.prototype.DB
                }), mT.prototype.get_m_engineForce = mT.prototype.iD = function () {
                    return vg(this.kB)
                }, mT.prototype.set_m_engineForce = mT.prototype.$F = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ig(e, t)
                }, Object.defineProperty(mT.prototype, "m_engineForce", {
                    get: mT.prototype.iD,
                    set: mT.prototype.$F
                }), mT.prototype.get_m_rollInfluence = mT.prototype.cE = function () {
                    return Rg(this.kB)
                }, mT.prototype.set_m_rollInfluence = mT.prototype.VG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Dg(e, t)
                }, Object.defineProperty(mT.prototype, "m_rollInfluence", {
                    get: mT.prototype.cE,
                    set: mT.prototype.VG
                }), mT.prototype.get_m_suspensionRestLength1 = mT.prototype.rE = function () {
                    return Pg(this.kB)
                }, mT.prototype.set_m_suspensionRestLength1 = mT.prototype.jH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Tg(e, t)
                }, Object.defineProperty(mT.prototype, "m_suspensionRestLength1", {
                    get: mT.prototype.rE,
                    set: mT.prototype.jH
                }), mT.prototype.get_m_wheelsRadius = mT.prototype.FE = function () {
                    return Og(this.kB)
                }, mT.prototype.set_m_wheelsRadius = mT.prototype.xH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Wg(e, t)
                }, Object.defineProperty(mT.prototype, "m_wheelsRadius", {
                    get: mT.prototype.FE,
                    set: mT.prototype.xH
                }), mT.prototype.get_m_wheelsDampingCompression = mT.prototype.RB = function () {
                    return Ag(this.kB)
                }, mT.prototype.set_m_wheelsDampingCompression = mT.prototype.aC = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mg(e, t)
                }, Object.defineProperty(mT.prototype, "m_wheelsDampingCompression", {
                    get: mT.prototype.RB,
                    set: mT.prototype.aC
                }), mT.prototype.get_m_wheelsDampingRelaxation = mT.prototype.SB = function () {
                    return xg(this.kB)
                }, mT.prototype.set_m_wheelsDampingRelaxation = mT.prototype.bC = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fg(e, t)
                }, Object.defineProperty(mT.prototype, "m_wheelsDampingRelaxation", {
                    get: mT.prototype.SB,
                    set: mT.prototype.bC
                }), mT.prototype.get_m_steering = mT.prototype.kE = function () {
                    return Lg(this.kB)
                }, mT.prototype.set_m_steering = mT.prototype.cH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gg(e, t)
                }, Object.defineProperty(mT.prototype, "m_steering", {
                    get: mT.prototype.kE,
                    set: mT.prototype.cH
                }), mT.prototype.get_m_maxSuspensionForce = mT.prototype.zB = function () {
                    return wg(this.kB)
                }, mT.prototype.set_m_maxSuspensionForce = mT.prototype.GB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Hg(e, t)
                }, Object.defineProperty(mT.prototype, "m_maxSuspensionForce", {
                    get: mT.prototype.zB,
                    set: mT.prototype.GB
                }), mT.prototype.get_m_maxSuspensionTravelCm = mT.prototype.AB = function () {
                    return Vg(this.kB)
                }, mT.prototype.set_m_maxSuspensionTravelCm = mT.prototype.HB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Eg(e, t)
                }, Object.defineProperty(mT.prototype, "m_maxSuspensionTravelCm", {
                    get: mT.prototype.AB,
                    set: mT.prototype.HB
                }), mT.prototype.get_m_wheelsSuspensionForce = mT.prototype.GE = function () {
                    return Ng(this.kB)
                }, mT.prototype.set_m_wheelsSuspensionForce = mT.prototype.yH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ug(e, t)
                }, Object.defineProperty(mT.prototype, "m_wheelsSuspensionForce", {
                    get: mT.prototype.GE,
                    set: mT.prototype.yH
                }), mT.prototype.get_m_bIsFrontWheel = mT.prototype.JB = function () {
                    return !!zg(this.kB)
                }, mT.prototype.set_m_bIsFrontWheel = mT.prototype.TB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qg(e, t)
                }, Object.defineProperty(mT.prototype, "m_bIsFrontWheel", {
                    get: mT.prototype.JB,
                    set: mT.prototype.TB
                }), mT.prototype.get_m_raycastInfo = mT.prototype.aE = function () {
                    return JR(Kg(this.kB), uT)
                }, mT.prototype.set_m_raycastInfo = mT.prototype.TG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qg(e, t)
                }, Object.defineProperty(mT.prototype, "m_raycastInfo", {
                    get: mT.prototype.aE,
                    set: mT.prototype.TG
                }), mT.prototype.get_m_chassisConnectionPointCS = mT.prototype.SC = function () {
                    return JR(Xg(this.kB), fD)
                }, mT.prototype.set_m_chassisConnectionPointCS = mT.prototype.JF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zg(e, t)
                }, Object.defineProperty(mT.prototype, "m_chassisConnectionPointCS", {
                    get: mT.prototype.SC,
                    set: mT.prototype.JF
                }), mT.prototype.get_m_worldTransform = mT.prototype.HE = function () {
                    return JR(Yg(this.kB), zD)
                }, mT.prototype.set_m_worldTransform = mT.prototype.zH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jg(e, t)
                }, Object.defineProperty(mT.prototype, "m_worldTransform", {
                    get: mT.prototype.HE,
                    set: mT.prototype.zH
                }), mT.prototype.get_m_wheelDirectionCS = mT.prototype.QB = function () {
                    return JR($g(this.kB), fD)
                }, mT.prototype.set_m_wheelDirectionCS = mT.prototype.$B = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tk(e, t)
                }, Object.defineProperty(mT.prototype, "m_wheelDirectionCS", {
                    get: mT.prototype.QB,
                    set: mT.prototype.$B
                }), mT.prototype.get_m_wheelAxleCS = mT.prototype.PB = function () {
                    return JR(ek(this.kB), fD)
                }, mT.prototype.set_m_wheelAxleCS = mT.prototype.ZB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nk(e, t)
                }, Object.defineProperty(mT.prototype, "m_wheelAxleCS", {
                    get: mT.prototype.PB,
                    set: mT.prototype.ZB
                }), mT.prototype.get_m_rotation = mT.prototype.eE = function () {
                    return ok(this.kB)
                }, mT.prototype.set_m_rotation = mT.prototype.XG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _k(e, t)
                }, Object.defineProperty(mT.prototype, "m_rotation", {
                    get: mT.prototype.eE,
                    set: mT.prototype.XG
                }), mT.prototype.get_m_deltaRotation = mT.prototype.bD = function () {
                    return ik(this.kB)
                }, mT.prototype.set_m_deltaRotation = mT.prototype.TF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rk(e, t)
                }, Object.defineProperty(mT.prototype, "m_deltaRotation", {
                    get: mT.prototype.bD,
                    set: mT.prototype.TF
                }), mT.prototype.get_m_brake = mT.prototype.LC = function () {
                    return pk(this.kB)
                }, mT.prototype.set_m_brake = mT.prototype.CF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sk(e, t)
                }, Object.defineProperty(mT.prototype, "m_brake", {
                    get: mT.prototype.LC,
                    set: mT.prototype.CF
                }), mT.prototype.get_m_clippedInvContactDotSuspension = mT.prototype.TC = function () {
                    return ck(this.kB)
                }, mT.prototype.set_m_clippedInvContactDotSuspension = mT.prototype.KF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ak(e, t)
                }, Object.defineProperty(mT.prototype, "m_clippedInvContactDotSuspension", {
                    get: mT.prototype.TC,
                    set: mT.prototype.KF
                }), mT.prototype.get_m_suspensionRelativeVelocity = mT.prototype.pE = function () {
                    return lk(this.kB)
                }, mT.prototype.set_m_suspensionRelativeVelocity = mT.prototype.hH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uk(e, t)
                }, Object.defineProperty(mT.prototype, "m_suspensionRelativeVelocity", {
                    get: mT.prototype.pE,
                    set: mT.prototype.hH
                }), mT.prototype.get_m_skidInfo = mT.prototype.hE = function () {
                    return bk(this.kB)
                }, mT.prototype.set_m_skidInfo = mT.prototype.$G = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mk(e, t)
                }, Object.defineProperty(mT.prototype, "m_skidInfo", {
                    get: mT.prototype.hE,
                    set: mT.prototype.$G
                }), mT.prototype.__destroy__ = function () {
                    yk(this.kB)
                }, yT.prototype = Object.create(LD.prototype), yT.prototype.constructor = yT, yT.prototype.lB = yT, yT.mB = {}, n.btKinematicCharacterController = yT, yT.prototype.setUpAxis = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hk(e, t)
                }, yT.prototype.setWalkDirection = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Bk(e, t)
                }, yT.prototype.setVelocityForTimeInterval = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), gk(n, t, e)
                }, yT.prototype.warp = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kk(e, t)
                }, yT.prototype.preStep = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ck(e, t)
                }, yT.prototype.playerStep = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Sk(n, t, e)
                }, yT.prototype.setFallSpeed = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jk(e, t)
                }, yT.prototype.setJumpSpeed = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), vk(e, t)
                }, yT.prototype.setMaxJumpHeight = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ik(e, t)
                }, yT.prototype.canJump = function () {
                    return !!Rk(this.kB)
                }, yT.prototype.jump = function () {
                    Dk(this.kB)
                }, yT.prototype.setGravity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Pk(e, t)
                }, yT.prototype.getGravity = function () {
                    return Tk(this.kB)
                }, yT.prototype.setMaxSlope = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ok(e, t)
                }, yT.prototype.getMaxSlope = function () {
                    return Wk(this.kB)
                }, yT.prototype.getGhostObject = function () {
                    return JR(Ak(this.kB), fT)
                }, yT.prototype.setUseGhostSweepTest = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mk(e, t)
                }, yT.prototype.onGround = function () {
                    return !!xk(this.kB)
                }, yT.prototype.setUpInterpolate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fk(e, t)
                }, yT.prototype.updateAction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Lk(n, t, e)
                }, yT.prototype.__destroy__ = function () {
                    Gk(this.kB)
                }, dT.prototype = Object.create(LD.prototype), dT.prototype.constructor = dT, dT.prototype.lB = dT, dT.mB = {}, n.btRaycastVehicle = dT, dT.prototype.applyEngineForce = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Hk(n, t, e)
                }, dT.prototype.setSteeringValue = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Vk(n, t, e)
                }, dT.prototype.getWheelTransformWS = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ek(e, t), zD)
                }, dT.prototype.updateWheelTransform = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Nk(n, t, e)
                }, dT.prototype.addWheel = function (t, e, n, o, _, i, r) {
                    var p = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), JR(Uk(p, t, e, n, o, _, i, r), mT)
                }, dT.prototype.getNumWheels = function () {
                    return zk(this.kB)
                }, dT.prototype.getRigidBody = function () {
                    return JR(qk(this.kB), YP)
                }, dT.prototype.getWheelInfo = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Kk(e, t), mT)
                }, dT.prototype.setBrake = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Qk(n, t, e)
                }, dT.prototype.setCoordinateSystem = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), Xk(o, t, e, n)
                }, dT.prototype.getCurrentSpeedKmHour = function () {
                    return Zk(this.kB)
                }, dT.prototype.getChassisWorldTransform = function () {
                    return JR(Yk(this.kB), zD)
                }, dT.prototype.rayCast = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), Jk(e, t)
                }, dT.prototype.updateVehicle = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), $k(e, t)
                }, dT.prototype.resetSuspension = function () {
                    tC(this.kB)
                }, dT.prototype.getSteeringValue = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), eC(e, t)
                }, dT.prototype.updateWheelTransformsWS = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === e ? nC(n, t) : oC(n, t, e)
                }, dT.prototype.setPitchControl = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _C(e, t)
                }, dT.prototype.updateSuspension = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), iC(e, t)
                }, dT.prototype.updateFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rC(e, t)
                }, dT.prototype.getRightAxis = function () {
                    return pC(this.kB)
                }, dT.prototype.getUpAxis = function () {
                    return sC(this.kB)
                }, dT.prototype.getForwardAxis = function () {
                    return cC(this.kB)
                }, dT.prototype.getForwardVector = function () {
                    return JR(aC(this.kB), fD)
                }, dT.prototype.getUserConstraintType = function () {
                    return lC(this.kB)
                }, dT.prototype.setUserConstraintType = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uC(e, t)
                }, dT.prototype.setUserConstraintId = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bC(e, t)
                }, dT.prototype.getUserConstraintId = function () {
                    return mC(this.kB)
                }, dT.prototype.updateAction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), yC(n, t, e)
                }, dT.prototype.__destroy__ = function () {
                    dC(this.kB)
                }, fT.prototype = Object.create(GD.prototype), fT.prototype.constructor = fT, fT.prototype.lB = fT, fT.mB = {}, n.btPairCachingGhostObject = fT, fT.prototype.setAnisotropicFriction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), hC(n, t, e)
                }, fT.prototype.getCollisionShape = function () {
                    return JR(BC(this.kB), cD)
                }, fT.prototype.setContactProcessingThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gC(e, t)
                }, fT.prototype.setActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kC(e, t)
                }, fT.prototype.forceActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), CC(e, t)
                }, fT.prototype.activate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), void 0 === t ? SC(e) : jC(e, t)
                }, fT.prototype.isActive = function () {
                    return !!vC(this.kB)
                }, fT.prototype.isKinematicObject = function () {
                    return !!IC(this.kB)
                }, fT.prototype.isStaticObject = function () {
                    return !!RC(this.kB)
                }, fT.prototype.isStaticOrKinematicObject = function () {
                    return !!DC(this.kB)
                }, fT.prototype.getRestitution = function () {
                    return PC(this.kB)
                }, fT.prototype.getFriction = function () {
                    return TC(this.kB)
                }, fT.prototype.getRollingFriction = function () {
                    return OC(this.kB)
                }, fT.prototype.setRestitution = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), WC(e, t)
                }, fT.prototype.setFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), AC(e, t)
                }, fT.prototype.setRollingFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), MC(e, t)
                }, fT.prototype.getWorldTransform = function () {
                    return JR(xC(this.kB), zD)
                }, fT.prototype.getCollisionFlags = function () {
                    return FC(this.kB)
                }, fT.prototype.setCollisionFlags = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), LC(e, t)
                }, fT.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), GC(e, t)
                }, fT.prototype.setCollisionShape = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wC(e, t)
                }, fT.prototype.setCcdMotionThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), HC(e, t)
                }, fT.prototype.setCcdSweptSphereRadius = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), VC(e, t)
                }, fT.prototype.getUserIndex = function () {
                    return EC(this.kB)
                }, fT.prototype.setUserIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), NC(e, t)
                }, fT.prototype.getUserPointer = function () {
                    return JR(UC(this.kB), HD)
                }, fT.prototype.setUserPointer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), zC(e, t)
                }, fT.prototype.getBroadphaseHandle = function () {
                    return JR(qC(this.kB), XP)
                }, fT.prototype.getNumOverlappingObjects = function () {
                    return KC(this.kB)
                }, fT.prototype.getOverlappingObject = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(QC(e, t), lD)
                }, fT.prototype.__destroy__ = function () {
                    XC(this.kB)
                }, hT.prototype = Object.create(ZR.prototype), hT.prototype.constructor = hT, hT.prototype.lB = hT, hT.mB = {}, n.btGhostPairCallback = hT, hT.prototype.__destroy__ = function () {
                    YC(this.kB)
                }, BT.prototype = Object.create(ZR.prototype), BT.prototype.constructor = BT, BT.prototype.lB = BT, BT.mB = {}, n.btSoftBodyWorldInfo = BT, BT.prototype.get_air_density = BT.prototype.cC = function () {
                    return $C(this.kB)
                }, BT.prototype.set_air_density = BT.prototype.UE = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tS(e, t)
                }, Object.defineProperty(BT.prototype, "air_density", {
                    get: BT.prototype.cC,
                    set: BT.prototype.UE
                }), BT.prototype.get_water_density = BT.prototype.RE = function () {
                    return eS(this.kB)
                }, BT.prototype.set_water_density = BT.prototype.JH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nS(e, t)
                }, Object.defineProperty(BT.prototype, "water_density", {
                    get: BT.prototype.RE,
                    set: BT.prototype.JH
                }), BT.prototype.get_water_offset = BT.prototype.TE = function () {
                    return oS(this.kB)
                }, BT.prototype.set_water_offset = BT.prototype.LH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _S(e, t)
                }, Object.defineProperty(BT.prototype, "water_offset", {
                    get: BT.prototype.TE,
                    set: BT.prototype.LH
                }), BT.prototype.get_m_maxDisplacement = BT.prototype.ND = function () {
                    return iS(this.kB)
                }, BT.prototype.set_m_maxDisplacement = BT.prototype.EG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rS(e, t)
                }, Object.defineProperty(BT.prototype, "m_maxDisplacement", {
                    get: BT.prototype.ND,
                    set: BT.prototype.EG
                }), BT.prototype.get_water_normal = BT.prototype.SE = function () {
                    return JR(pS(this.kB), fD)
                }, BT.prototype.set_water_normal = BT.prototype.KH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sS(e, t)
                }, Object.defineProperty(BT.prototype, "water_normal", {
                    get: BT.prototype.SE,
                    set: BT.prototype.KH
                }), BT.prototype.get_m_broadphase = BT.prototype.MC = function () {
                    return JR(cS(this.kB), qP)
                }, BT.prototype.set_m_broadphase = BT.prototype.DF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), aS(e, t)
                }, Object.defineProperty(BT.prototype, "m_broadphase", {
                    get: BT.prototype.MC,
                    set: BT.prototype.DF
                }), BT.prototype.get_m_dispatcher = BT.prototype.dD = function () {
                    return JR(lS(this.kB), AD)
                }, BT.prototype.set_m_dispatcher = BT.prototype.VF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uS(e, t)
                }, Object.defineProperty(BT.prototype, "m_dispatcher", {
                    get: BT.prototype.dD,
                    set: BT.prototype.VF
                }), BT.prototype.get_m_gravity = BT.prototype.mD = function () {
                    return JR(bS(this.kB), fD)
                }, BT.prototype.set_m_gravity = BT.prototype.dG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mS(e, t)
                }, Object.defineProperty(BT.prototype, "m_gravity", {
                    get: BT.prototype.mD,
                    set: BT.prototype.dG
                }), BT.prototype.__destroy__ = function () {
                    yS(this.kB)
                }, gT.prototype = Object.create(ZR.prototype), gT.prototype.constructor = gT, gT.prototype.lB = gT, gT.mB = {}, n.Face = gT, gT.prototype.get_m_n = gT.prototype.MB = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(dS(e, t), CT)
                }, gT.prototype.set_m_n = gT.prototype.WB = function (t, e) {
                    var n = this.kB;
                    _D(), t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), fS(n, t, e)
                }, Object.defineProperty(gT.prototype, "m_n", {
                    get: gT.prototype.MB,
                    set: gT.prototype.WB
                }), gT.prototype.get_m_normal = gT.prototype.RD = function () {
                    return JR(hS(this.kB), fD)
                }, gT.prototype.set_m_normal = gT.prototype.IG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), BS(e, t)
                }, Object.defineProperty(gT.prototype, "m_normal", {
                    get: gT.prototype.RD,
                    set: gT.prototype.IG
                }), gT.prototype.get_m_ra = gT.prototype.$D = function () {
                    return gS(this.kB)
                }, gT.prototype.set_m_ra = gT.prototype.SG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kS(e, t)
                }, Object.defineProperty(gT.prototype, "m_ra", {
                    get: gT.prototype.$D,
                    set: gT.prototype.SG
                }), gT.prototype.__destroy__ = function () {
                    CS(this.kB)
                }, kT.prototype = Object.create(ZR.prototype), kT.prototype.constructor = kT, kT.prototype.lB = kT, kT.mB = {}, n.tFaceArray = kT, kT.prototype.size = kT.prototype.size = function () {
                    return SS(this.kB)
                }, kT.prototype.at = kT.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(jS(e, t), gT)
                }, kT.prototype.__destroy__ = function () {
                    vS(this.kB)
                }, CT.prototype = Object.create(ZR.prototype), CT.prototype.constructor = CT, CT.prototype.lB = CT, CT.mB = {}, n.Node = CT, CT.prototype.get_m_x = CT.prototype.IE = function () {
                    return JR(IS(this.kB), fD)
                }, CT.prototype.set_m_x = CT.prototype.AH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), RS(e, t)
                }, Object.defineProperty(CT.prototype, "m_x", {
                    get: CT.prototype.IE,
                    set: CT.prototype.AH
                }), CT.prototype.get_m_q = CT.prototype.ZD = function () {
                    return JR(DS(this.kB), fD)
                }, CT.prototype.set_m_q = CT.prototype.QG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), PS(e, t)
                }, Object.defineProperty(CT.prototype, "m_q", {
                    get: CT.prototype.ZD,
                    set: CT.prototype.QG
                }), CT.prototype.get_m_v = CT.prototype.AE = function () {
                    return JR(TS(this.kB), fD)
                }, CT.prototype.set_m_v = CT.prototype.sH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), OS(e, t)
                }, Object.defineProperty(CT.prototype, "m_v", {
                    get: CT.prototype.AE,
                    set: CT.prototype.sH
                }), CT.prototype.get_m_f = CT.prototype.jD = function () {
                    return JR(WS(this.kB), fD)
                }, CT.prototype.set_m_f = CT.prototype.aG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), AS(e, t)
                }, Object.defineProperty(CT.prototype, "m_f", {
                    get: CT.prototype.jD,
                    set: CT.prototype.aG
                }), CT.prototype.get_m_n = CT.prototype.MB = function () {
                    return JR(MS(this.kB), fD)
                }, CT.prototype.set_m_n = CT.prototype.WB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xS(e, t)
                }, Object.defineProperty(CT.prototype, "m_n", {
                    get: CT.prototype.MB,
                    set: CT.prototype.WB
                }), CT.prototype.get_m_im = CT.prototype.vD = function () {
                    return FS(this.kB)
                }, CT.prototype.set_m_im = CT.prototype.mG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), LS(e, t)
                }, Object.defineProperty(CT.prototype, "m_im", {
                    get: CT.prototype.vD,
                    set: CT.prototype.mG
                }), CT.prototype.get_m_area = CT.prototype.JC = function () {
                    return GS(this.kB)
                }, CT.prototype.set_m_area = CT.prototype.AF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), wS(e, t)
                }, Object.defineProperty(CT.prototype, "m_area", {
                    get: CT.prototype.JC,
                    set: CT.prototype.AF
                }), CT.prototype.__destroy__ = function () {
                    HS(this.kB)
                }, ST.prototype = Object.create(ZR.prototype), ST.prototype.constructor = ST, ST.prototype.lB = ST, ST.mB = {}, n.tNodeArray = ST, ST.prototype.size = ST.prototype.size = function () {
                    return VS(this.kB)
                }, ST.prototype.at = ST.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(ES(e, t), CT)
                }, ST.prototype.__destroy__ = function () {
                    NS(this.kB)
                }, jT.prototype = Object.create(ZR.prototype), jT.prototype.constructor = jT, jT.prototype.lB = jT, jT.mB = {}, n.Material = jT, jT.prototype.get_m_kLST = jT.prototype.BD = function () {
                    return US(this.kB)
                }, jT.prototype.set_m_kLST = jT.prototype.sG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), zS(e, t)
                }, Object.defineProperty(jT.prototype, "m_kLST", {
                    get: jT.prototype.BD,
                    set: jT.prototype.sG
                }), jT.prototype.get_m_kAST = jT.prototype.AD = function () {
                    return qS(this.kB)
                }, jT.prototype.set_m_kAST = jT.prototype.rG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), KS(e, t)
                }, Object.defineProperty(jT.prototype, "m_kAST", {
                    get: jT.prototype.AD,
                    set: jT.prototype.rG
                }), jT.prototype.get_m_kVST = jT.prototype.CD = function () {
                    return QS(this.kB)
                }, jT.prototype.set_m_kVST = jT.prototype.tG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), XS(e, t)
                }, Object.defineProperty(jT.prototype, "m_kVST", {
                    get: jT.prototype.CD,
                    set: jT.prototype.tG
                }), jT.prototype.get_m_flags = jT.prototype.tB = function () {
                    return ZS(this.kB)
                }, jT.prototype.set_m_flags = jT.prototype.uB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), YS(e, t)
                }, Object.defineProperty(jT.prototype, "m_flags", {
                    get: jT.prototype.tB,
                    set: jT.prototype.uB
                }), jT.prototype.__destroy__ = function () {
                    JS(this.kB)
                }, vT.prototype = Object.create(ZR.prototype), vT.prototype.constructor = vT, vT.prototype.lB = vT, vT.mB = {}, n.tMaterialArray = vT, vT.prototype.size = vT.prototype.size = function () {
                    return $S(this.kB)
                }, vT.prototype.at = vT.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(tj(e, t), jT)
                }, vT.prototype.__destroy__ = function () {
                    ej(this.kB)
                }, IT.prototype = Object.create(ZR.prototype), IT.prototype.constructor = IT, IT.prototype.lB = IT, IT.mB = {}, n.Anchor = IT, IT.prototype.get_m_node = IT.prototype.PD = function () {
                    return JR(nj(this.kB), CT)
                }, IT.prototype.set_m_node = IT.prototype.GG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), oj(e, t)
                }, Object.defineProperty(IT.prototype, "m_node", {
                    get: IT.prototype.PD,
                    set: IT.prototype.GG
                }), IT.prototype.get_m_local = IT.prototype.FD = function () {
                    return JR(_j(this.kB), fD)
                }, IT.prototype.set_m_local = IT.prototype.wG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), ij(e, t)
                }, Object.defineProperty(IT.prototype, "m_local", {
                    get: IT.prototype.FD,
                    set: IT.prototype.wG
                }), IT.prototype.get_m_body = IT.prototype.KC = function () {
                    return JR(rj(this.kB), YP)
                }, IT.prototype.set_m_body = IT.prototype.BF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), pj(e, t)
                }, Object.defineProperty(IT.prototype, "m_body", {
                    get: IT.prototype.KC,
                    set: IT.prototype.BF
                }), IT.prototype.get_m_influence = IT.prototype.yD = function () {
                    return sj(this.kB)
                }, IT.prototype.set_m_influence = IT.prototype.pG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), cj(e, t)
                }, Object.defineProperty(IT.prototype, "m_influence", {
                    get: IT.prototype.yD,
                    set: IT.prototype.pG
                }), IT.prototype.get_m_c0 = IT.prototype.NC = function () {
                    return JR(aj(this.kB), UD)
                }, IT.prototype.set_m_c0 = IT.prototype.EF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lj(e, t)
                }, Object.defineProperty(IT.prototype, "m_c0", {
                    get: IT.prototype.NC,
                    set: IT.prototype.EF
                }), IT.prototype.get_m_c1 = IT.prototype.OC = function () {
                    return JR(uj(this.kB), fD)
                }, IT.prototype.set_m_c1 = IT.prototype.FF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bj(e, t)
                }, Object.defineProperty(IT.prototype, "m_c1", {
                    get: IT.prototype.OC,
                    set: IT.prototype.FF
                }), IT.prototype.get_m_c2 = IT.prototype.PC = function () {
                    return mj(this.kB)
                }, IT.prototype.set_m_c2 = IT.prototype.GF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), yj(e, t)
                }, Object.defineProperty(IT.prototype, "m_c2", {
                    get: IT.prototype.PC,
                    set: IT.prototype.GF
                }), IT.prototype.__destroy__ = function () {
                    dj(this.kB)
                }, RT.prototype = Object.create(ZR.prototype), RT.prototype.constructor = RT, RT.prototype.lB = RT, RT.mB = {}, n.tAnchorArray = RT, RT.prototype.size = RT.prototype.size = function () {
                    return fj(this.kB)
                }, RT.prototype.at = RT.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(hj(e, t), IT)
                }, RT.prototype.clear = RT.prototype.clear = function () {
                    Bj(this.kB)
                }, RT.prototype.push_back = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gj(e, t)
                }, RT.prototype.pop_back = function () {
                    kj(this.kB)
                }, RT.prototype.__destroy__ = function () {
                    Cj(this.kB)
                }, DT.prototype = Object.create(ZR.prototype), DT.prototype.constructor = DT, DT.prototype.lB = DT, DT.mB = {}, n.Config = DT, DT.prototype.get_kVCF = DT.prototype.zC = function () {
                    return Sj(this.kB)
                }, DT.prototype.set_kVCF = DT.prototype.qF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), jj(e, t)
                }, Object.defineProperty(DT.prototype, "kVCF", {
                    get: DT.prototype.zC,
                    set: DT.prototype.qF
                }), DT.prototype.get_kDP = DT.prototype.mC = function () {
                    return vj(this.kB)
                }, DT.prototype.set_kDP = DT.prototype.dF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ij(e, t)
                }, Object.defineProperty(DT.prototype, "kDP", {
                    get: DT.prototype.mC,
                    set: DT.prototype.dF
                }), DT.prototype.get_kDG = DT.prototype.lC = function () {
                    return Rj(this.kB)
                }, DT.prototype.set_kDG = DT.prototype.cF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Dj(e, t)
                }, Object.defineProperty(DT.prototype, "kDG", {
                    get: DT.prototype.lC,
                    set: DT.prototype.cF
                }), DT.prototype.get_kLF = DT.prototype.oC = function () {
                    return Pj(this.kB)
                }, DT.prototype.set_kLF = DT.prototype.fF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Tj(e, t)
                }, Object.defineProperty(DT.prototype, "kLF", {
                    get: DT.prototype.oC,
                    set: DT.prototype.fF
                }), DT.prototype.get_kPR = DT.prototype.qC = function () {
                    return Oj(this.kB)
                }, DT.prototype.set_kPR = DT.prototype.hF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Wj(e, t)
                }, Object.defineProperty(DT.prototype, "kPR", {
                    get: DT.prototype.qC,
                    set: DT.prototype.hF
                }), DT.prototype.get_kVC = DT.prototype.yC = function () {
                    return Aj(this.kB)
                }, DT.prototype.set_kVC = DT.prototype.pF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Mj(e, t)
                }, Object.defineProperty(DT.prototype, "kVC", {
                    get: DT.prototype.yC,
                    set: DT.prototype.pF
                }), DT.prototype.get_kDF = DT.prototype.kC = function () {
                    return xj(this.kB)
                }, DT.prototype.set_kDF = DT.prototype.bF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fj(e, t)
                }, Object.defineProperty(DT.prototype, "kDF", {
                    get: DT.prototype.kC,
                    set: DT.prototype.bF
                }), DT.prototype.get_kMT = DT.prototype.pC = function () {
                    return Lj(this.kB)
                }, DT.prototype.set_kMT = DT.prototype.gF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gj(e, t)
                }, Object.defineProperty(DT.prototype, "kMT", {
                    get: DT.prototype.pC,
                    set: DT.prototype.gF
                }), DT.prototype.get_kCHR = DT.prototype.jC = function () {
                    return wj(this.kB)
                }, DT.prototype.set_kCHR = DT.prototype.aF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Hj(e, t)
                }, Object.defineProperty(DT.prototype, "kCHR", {
                    get: DT.prototype.jC,
                    set: DT.prototype.aF
                }), DT.prototype.get_kKHR = DT.prototype.nC = function () {
                    return Vj(this.kB)
                }, DT.prototype.set_kKHR = DT.prototype.eF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Ej(e, t)
                }, Object.defineProperty(DT.prototype, "kKHR", {
                    get: DT.prototype.nC,
                    set: DT.prototype.eF
                }), DT.prototype.get_kSHR = DT.prototype.rC = function () {
                    return Nj(this.kB)
                }, DT.prototype.set_kSHR = DT.prototype.iF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Uj(e, t)
                }, Object.defineProperty(DT.prototype, "kSHR", {
                    get: DT.prototype.rC,
                    set: DT.prototype.iF
                }), DT.prototype.get_kAHR = DT.prototype.iC = function () {
                    return zj(this.kB)
                }, DT.prototype.set_kAHR = DT.prototype.$E = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), qj(e, t)
                }, Object.defineProperty(DT.prototype, "kAHR", {
                    get: DT.prototype.iC,
                    set: DT.prototype.$E
                }), DT.prototype.get_kSRHR_CL = DT.prototype.uC = function () {
                    return Kj(this.kB)
                }, DT.prototype.set_kSRHR_CL = DT.prototype.lF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qj(e, t)
                }, Object.defineProperty(DT.prototype, "kSRHR_CL", {
                    get: DT.prototype.uC,
                    set: DT.prototype.lF
                }), DT.prototype.get_kSKHR_CL = DT.prototype.sC = function () {
                    return Xj(this.kB)
                }, DT.prototype.set_kSKHR_CL = DT.prototype.jF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Zj(e, t)
                }, Object.defineProperty(DT.prototype, "kSKHR_CL", {
                    get: DT.prototype.sC,
                    set: DT.prototype.jF
                }), DT.prototype.get_kSSHR_CL = DT.prototype.wC = function () {
                    return Yj(this.kB)
                }, DT.prototype.set_kSSHR_CL = DT.prototype.nF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Jj(e, t)
                }, Object.defineProperty(DT.prototype, "kSSHR_CL", {
                    get: DT.prototype.wC,
                    set: DT.prototype.nF
                }), DT.prototype.get_kSR_SPLT_CL = DT.prototype.vC = function () {
                    return $j(this.kB)
                }, DT.prototype.set_kSR_SPLT_CL = DT.prototype.mF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), tv(e, t)
                }, Object.defineProperty(DT.prototype, "kSR_SPLT_CL", {
                    get: DT.prototype.vC,
                    set: DT.prototype.mF
                }), DT.prototype.get_kSK_SPLT_CL = DT.prototype.tC = function () {
                    return ev(this.kB)
                }, DT.prototype.set_kSK_SPLT_CL = DT.prototype.kF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nv(e, t)
                }, Object.defineProperty(DT.prototype, "kSK_SPLT_CL", {
                    get: DT.prototype.tC,
                    set: DT.prototype.kF
                }), DT.prototype.get_kSS_SPLT_CL = DT.prototype.xC = function () {
                    return ov(this.kB)
                }, DT.prototype.set_kSS_SPLT_CL = DT.prototype.oF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), _v(e, t)
                }, Object.defineProperty(DT.prototype, "kSS_SPLT_CL", {
                    get: DT.prototype.xC,
                    set: DT.prototype.oF
                }), DT.prototype.get_maxvolume = DT.prototype.JE = function () {
                    return iv(this.kB)
                }, DT.prototype.set_maxvolume = DT.prototype.BH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rv(e, t)
                }, Object.defineProperty(DT.prototype, "maxvolume", {
                    get: DT.prototype.JE,
                    set: DT.prototype.BH
                }), DT.prototype.get_timescale = DT.prototype.OE = function () {
                    return pv(this.kB)
                }, DT.prototype.set_timescale = DT.prototype.GH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), sv(e, t)
                }, Object.defineProperty(DT.prototype, "timescale", {
                    get: DT.prototype.OE,
                    set: DT.prototype.GH
                }), DT.prototype.get_viterations = DT.prototype.QE = function () {
                    return cv(this.kB)
                }, DT.prototype.set_viterations = DT.prototype.IH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), av(e, t)
                }, Object.defineProperty(DT.prototype, "viterations", {
                    get: DT.prototype.QE,
                    set: DT.prototype.IH
                }), DT.prototype.get_piterations = DT.prototype.ME = function () {
                    return lv(this.kB)
                }, DT.prototype.set_piterations = DT.prototype.EH = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uv(e, t)
                }, Object.defineProperty(DT.prototype, "piterations", {
                    get: DT.prototype.ME,
                    set: DT.prototype.EH
                }), DT.prototype.get_diterations = DT.prototype.fC = function () {
                    return bv(this.kB)
                }, DT.prototype.set_diterations = DT.prototype.XE = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mv(e, t)
                }, Object.defineProperty(DT.prototype, "diterations", {
                    get: DT.prototype.fC,
                    set: DT.prototype.XE
                }), DT.prototype.get_citerations = DT.prototype.dC = function () {
                    return yv(this.kB)
                }, DT.prototype.set_citerations = DT.prototype.VE = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), dv(e, t)
                }, Object.defineProperty(DT.prototype, "citerations", {
                    get: DT.prototype.dC,
                    set: DT.prototype.VE
                }), DT.prototype.get_collisions = DT.prototype.eC = function () {
                    return fv(this.kB)
                }, DT.prototype.set_collisions = DT.prototype.WE = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hv(e, t)
                }, Object.defineProperty(DT.prototype, "collisions", {
                    get: DT.prototype.eC,
                    set: DT.prototype.WE
                }), DT.prototype.__destroy__ = function () {
                    Bv(this.kB)
                }, PT.prototype = Object.create(lD.prototype), PT.prototype.constructor = PT, PT.prototype.lB = PT, PT.mB = {}, n.btSoftBody = PT, PT.prototype.checkLink = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), !!kv(n, t, e)
                }, PT.prototype.checkFace = function (t, e, n) {
                    var o = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), !!Cv(o, t, e, n)
                }, PT.prototype.appendMaterial = function () {
                    return JR(Sv(this.kB), jT)
                }, PT.prototype.appendNode = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), jv(n, t, e)
                }, PT.prototype.appendLink = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), vv(_, t, e, n, o)
                }, PT.prototype.appendFace = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), Iv(_, t, e, n, o)
                }, PT.prototype.appendTetra = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), Rv(i, t, e, n, o, _)
                }, PT.prototype.appendAnchor = function (t, e, n, o) {
                    var _ = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), Dv(_, t, e, n, o)
                }, PT.prototype.addForce = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === e ? Pv(n, t) : Tv(n, t, e)
                }, PT.prototype.addAeroForceToNode = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Ov(n, t, e)
                }, PT.prototype.getTotalMass = function () {
                    return Wv(this.kB)
                }, PT.prototype.setTotalMass = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Av(n, t, e)
                }, PT.prototype.setMass = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Mv(n, t, e)
                }, PT.prototype.transform = PT.prototype.transform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), xv(e, t)
                }, PT.prototype.translate = PT.prototype.translate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Fv(e, t)
                }, PT.prototype.rotate = PT.prototype.rotate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Lv(e, t)
                }, PT.prototype.scale = PT.prototype.scale = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Gv(e, t)
                }, PT.prototype.generateClusters = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === e ? wv(n, t) : Hv(n, t, e)
                }, PT.prototype.generateBendingConstraints = function (t, e) {
                    var n = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), Vv(n, t, e)
                }, PT.prototype.upcast = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(Ev(e, t), PT)
                }, PT.prototype.getRestLengthScale = function () {
                    return Nv(this.kB)
                }, PT.prototype.setRestLengthScale = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Uv(e, t)
                }, PT.prototype.setAnisotropicFriction = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), zv(n, t, e)
                }, PT.prototype.getCollisionShape = function () {
                    return JR(qv(this.kB), cD)
                }, PT.prototype.setContactProcessingThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Kv(e, t)
                }, PT.prototype.setActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Qv(e, t)
                }, PT.prototype.forceActivationState = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), Xv(e, t)
                }, PT.prototype.activate = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), void 0 === t ? Zv(e) : Yv(e, t)
                }, PT.prototype.isActive = function () {
                    return !!Jv(this.kB)
                }, PT.prototype.isKinematicObject = function () {
                    return !!$v(this.kB)
                }, PT.prototype.isStaticObject = function () {
                    return !!tI(this.kB)
                }, PT.prototype.isStaticOrKinematicObject = function () {
                    return !!eI(this.kB)
                }, PT.prototype.getRestitution = function () {
                    return nI(this.kB)
                }, PT.prototype.getFriction = function () {
                    return oI(this.kB)
                }, PT.prototype.getRollingFriction = function () {
                    return _I(this.kB)
                }, PT.prototype.setRestitution = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), iI(e, t)
                }, PT.prototype.setFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), rI(e, t)
                }, PT.prototype.setRollingFriction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), pI(e, t)
                }, PT.prototype.getWorldTransform = function () {
                    return JR(sI(this.kB), zD)
                }, PT.prototype.getCollisionFlags = function () {
                    return cI(this.kB)
                }, PT.prototype.setCollisionFlags = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), aI(e, t)
                }, PT.prototype.setWorldTransform = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lI(e, t)
                }, PT.prototype.setCollisionShape = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), uI(e, t)
                }, PT.prototype.setCcdMotionThreshold = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), bI(e, t)
                }, PT.prototype.setCcdSweptSphereRadius = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mI(e, t)
                }, PT.prototype.getUserIndex = function () {
                    return yI(this.kB)
                }, PT.prototype.setUserIndex = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), dI(e, t)
                }, PT.prototype.getUserPointer = function () {
                    return JR(fI(this.kB), HD)
                }, PT.prototype.setUserPointer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hI(e, t)
                }, PT.prototype.getBroadphaseHandle = function () {
                    return JR(BI(this.kB), XP)
                }, PT.prototype.get_m_cfg = PT.prototype.QC = function () {
                    return JR(gI(this.kB), DT)
                }, PT.prototype.set_m_cfg = PT.prototype.HF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kI(e, t)
                }, Object.defineProperty(PT.prototype, "m_cfg", {
                    get: PT.prototype.QC,
                    set: PT.prototype.HF
                }), PT.prototype.get_m_nodes = PT.prototype.QD = function () {
                    return JR(CI(this.kB), ST)
                }, PT.prototype.set_m_nodes = PT.prototype.HG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), SI(e, t)
                }, Object.defineProperty(PT.prototype, "m_nodes", {
                    get: PT.prototype.QD,
                    set: PT.prototype.HG
                }), PT.prototype.get_m_faces = PT.prototype.KB = function () {
                    return JR(jI(this.kB), kT)
                }, PT.prototype.set_m_faces = PT.prototype.UB = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), vI(e, t)
                }, Object.defineProperty(PT.prototype, "m_faces", {
                    get: PT.prototype.KB,
                    set: PT.prototype.UB
                }), PT.prototype.get_m_materials = PT.prototype.MD = function () {
                    return JR(II(this.kB), vT)
                }, PT.prototype.set_m_materials = PT.prototype.DG = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), RI(e, t)
                }, Object.defineProperty(PT.prototype, "m_materials", {
                    get: PT.prototype.MD,
                    set: PT.prototype.DG
                }), PT.prototype.get_m_anchors = PT.prototype.GC = function () {
                    return JR(DI(this.kB), RT)
                }, PT.prototype.set_m_anchors = PT.prototype.xF = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), PI(e, t)
                }, Object.defineProperty(PT.prototype, "m_anchors", {
                    get: PT.prototype.GC,
                    set: PT.prototype.xF
                }), PT.prototype.__destroy__ = function () {
                    TI(this.kB)
                }, TT.prototype = Object.create(WD.prototype), TT.prototype.constructor = TT, TT.prototype.lB = TT, TT.mB = {}, n.btSoftBodyRigidBodyCollisionConfiguration = TT, TT.prototype.__destroy__ = function () {
                    AI(this.kB)
                }, OT.prototype = Object.create(wD.prototype), OT.prototype.constructor = OT, OT.prototype.lB = OT, OT.mB = {}, n.btDefaultSoftBodySolver = OT, OT.prototype.__destroy__ = function () {
                    xI(this.kB)
                }, WT.prototype = Object.create(ZR.prototype), WT.prototype.constructor = WT, WT.prototype.lB = WT, WT.mB = {}, n.btSoftBodyArray = WT, WT.prototype.size = WT.prototype.size = function () {
                    return FI(this.kB)
                }, WT.prototype.at = WT.prototype.at = function (t) {
                    var e = this.kB;
                    return t && "object" == typeof t && (t = t.kB), JR(LI(e, t), PT)
                }, WT.prototype.__destroy__ = function () {
                    GI(this.kB)
                }, AT.prototype = Object.create(xD.prototype), AT.prototype.constructor = AT, AT.prototype.lB = AT, AT.mB = {}, n.btSoftRigidDynamicsWorld = AT, AT.prototype.addSoftBody = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), HI(o, t, e, n)
                }, AT.prototype.removeSoftBody = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), VI(e, t)
                }, AT.prototype.removeCollisionObject = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), EI(e, t)
                }, AT.prototype.getWorldInfo = function () {
                    return JR(NI(this.kB), BT)
                }, AT.prototype.getSoftBodyArray = function () {
                    return JR(UI(this.kB), WT)
                }, AT.prototype.getDispatcher = function () {
                    return JR(zI(this.kB), AD)
                }, AT.prototype.rayTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), qI(o, t, e, n)
                }, AT.prototype.getPairCache = function () {
                    return JR(KI(this.kB), UP)
                }, AT.prototype.getDispatchInfo = function () {
                    return JR(QI(this.kB), pT)
                }, AT.prototype.addCollisionObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? XI(o, t) : void 0 === n ? ZI(o, t, e) : YI(o, t, e, n)
                }, AT.prototype.getBroadphase = function () {
                    return JR(JI(this.kB), qP)
                }, AT.prototype.convexSweepTest = function (t, e, n, o, _) {
                    var i = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), $I(i, t, e, n, o, _)
                }, AT.prototype.contactPairTest = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), tR(o, t, e, n)
                }, AT.prototype.contactTest = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), eR(n, t, e)
                }, AT.prototype.updateSingleAabb = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), nR(e, t)
                }, AT.prototype.setDebugDrawer = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), oR(e, t)
                }, AT.prototype.getDebugDrawer = function () {
                    return JR(_R(this.kB), dD)
                }, AT.prototype.debugDrawWorld = function () {
                    iR(this.kB)
                }, AT.prototype.debugDrawObject = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), rR(o, t, e, n)
                }, AT.prototype.setGravity = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), pR(e, t)
                }, AT.prototype.getGravity = function () {
                    return JR(sR(this.kB), fD)
                }, AT.prototype.addRigidBody = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? cR(o, t) : void 0 === n ? _emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_2(o, t, e) : aR(o, t, e, n)
                }, AT.prototype.removeRigidBody = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), lR(e, t)
                }, AT.prototype.addConstraint = function (t, e) {
                    var n = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), void 0 === e ? uR(n, t) : bR(n, t, e)
                }, AT.prototype.removeConstraint = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), mR(e, t)
                }, AT.prototype.stepSimulation = function (t, e, n) {
                    var o = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? yR(o, t) : void 0 === n ? dR(o, t, e) : fR(o, t, e, n)
                }, AT.prototype.setContactAddedCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), hR(e, t)
                }, AT.prototype.setContactProcessedCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), BR(e, t)
                }, AT.prototype.setContactDestroyedCallback = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), gR(e, t)
                }, AT.prototype.addAction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), kR(e, t)
                }, AT.prototype.removeAction = function (t) {
                    var e = this.kB;
                    t && "object" == typeof t && (t = t.kB), CR(e, t)
                }, AT.prototype.getSolverInfo = function () {
                    return JR(SR(this.kB), sT)
                }, AT.prototype.setInternalTickCallback = function (t, e, n) {
                    var o = this.kB;
                    t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), void 0 === e ? jR(o, t) : void 0 === n ? vR(o, t, e) : IR(o, t, e, n)
                }, AT.prototype.__destroy__ = function () {
                    RR(this.kB)
                }, MT.prototype = Object.create(ZR.prototype), MT.prototype.constructor = MT, MT.prototype.lB = MT, MT.mB = {}, n.btSoftBodyHelpers = MT, MT.prototype.CreateRope = function (t, e, n, o, _) {
                    var i = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), JR(PR(i, t, e, n, o, _), PT)
                }, MT.prototype.CreatePatch = function (t, e, n, o, _, i, r, p, s) {
                    var c = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), p && "object" == typeof p && (p = p.kB), s && "object" == typeof s && (s = s.kB), JR(TR(c, t, e, n, o, _, i, r, p, s), PT)
                }, MT.prototype.CreatePatchUV = function (t, e, n, o, _, i, r, p, s, c) {
                    var a = this.kB;
                    return _D(), t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), i && "object" == typeof i && (i = i.kB), r && "object" == typeof r && (r = r.kB), p && "object" == typeof p && (p = p.kB), s && "object" == typeof s && (s = s.kB), "object" == typeof c && (c = sD(c)), JR(OR(a, t, e, n, o, _, i, r, p, s, c), PT)
                }, MT.prototype.CreateEllipsoid = function (t, e, n, o) {
                    var _ = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), JR(WR(_, t, e, n, o), PT)
                }, MT.prototype.CreateFromTriMesh = function (t, e, n, o, _) {
                    var i = this.kB;
                    if (_D(), t && "object" == typeof t && (t = t.kB), "object" == typeof e && (e = sD(e)), "object" == typeof n && "object" == typeof n) {
                        var r = iD(n, C);
                        rD(n, C, r), n = r
                    }
                    return o && "object" == typeof o && (o = o.kB), _ && "object" == typeof _ && (_ = _.kB), JR(AR(i, t, e, n, o, _), PT)
                }, MT.prototype.CreateFromConvexHull = function (t, e, n, o) {
                    var _ = this.kB;
                    return t && "object" == typeof t && (t = t.kB), e && "object" == typeof e && (e = e.kB), n && "object" == typeof n && (n = n.kB), o && "object" == typeof o && (o = o.kB), JR(MR(_, t, e, n, o), PT)
                }, MT.prototype.__destroy__ = function () {
                    xR(this.kB)
                },
                function () {
                    function t() {
                        n.PHY_FLOAT = FR(), n.PHY_DOUBLE = LR(), n.PHY_INTEGER = GR(), n.PHY_SHORT = wR(), n.PHY_FIXEDPOINT88 = HR(), n.PHY_UCHAR = VR(), n.CONST_GIMPACT_COMPOUND_SHAPE = ER(), n.CONST_GIMPACT_TRIMESH_SHAPE_PART = NR(), n.CONST_GIMPACT_TRIMESH_SHAPE = UR(), n.BT_CONSTRAINT_ERP = zR(), n.BT_CONSTRAINT_STOP_ERP = qR(), n.BT_CONSTRAINT_CFM = KR(), n.BT_CONSTRAINT_STOP_CFM = QR()
                    }
                    P ? t() : R.unshift(t)
                }(), n.CONTACT_ADDED_CALLBACK_SIGNATURE = "iiiiiiii", n.CONTACT_DESTROYED_CALLBACK_SIGNATURE = "ii", n.CONTACT_PROCESSED_CALLBACK_SIGNATURE = "iiii", n.INTERNAL_TICK_CALLBACK_SIGNATURE = "vif", this.Ammo = n, e.ready
        }
})();
"object" == typeof exports && "object" == typeof module ? module.exports = Ammo : "function" == typeof define && define.amd ? define([], (function () {
    return Ammo
})) : "object" == typeof exports && (exports.Ammo = Ammo);