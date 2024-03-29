! function (t) {
    "use strict";
    var e = t.HTMLCanvasElement && t.HTMLCanvasElement.prototype,
        o = t.Blob && function () {
            try {
                return Boolean(new Blob)
            } catch (t) {
                return !1
            }
        }(),
        n = o && t.Uint8Array && function () {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (t) {
                return !1
            }
        }(),
        r = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder,
        a = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
        i = (o || r) && t.atob && t.ArrayBuffer && t.Uint8Array && function (t) {
            var e, i, l, u, b, c, d, B, f;
            if (e = t.match(a), !e) throw new Error("invalid data URI");
            for (i = e[2] ? e[1] : "text/plain" + (e[3] || ";charset=US-ASCII"), l = !!e[4], u = t.slice(e[0].length), b = l ? atob(u) : decodeURIComponent(u), c = new ArrayBuffer(b.length), d = new Uint8Array(c), B = 0; B < b.length; B += 1) d[B] = b.charCodeAt(B);
            return o ? new Blob([n ? d : c], {
                type: i
            }) : (f = new r, f.append(c), f.getBlob(i))
        };
    t.HTMLCanvasElement && !e.toBlob && (e.mozGetAsFile ? e.toBlob = function (t, o, n) {
        t(n && e.toDataURL && i ? i(this.toDataURL(o, n)) : this.mozGetAsFile("blob", o))
    } : e.toDataURL && i && (e.toBlob = function (t, e, o) {
        t(i(this.toDataURL(e, o)))
    })), "function" == typeof define && define.amd ? define(function () {
        return i
    }) : "object" == typeof module && module.exports ? module.exports = i : t.dataURLtoBlob = i
}(window);
var saveAs = saveAs || function (e) {
    "use strict";
    if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
        var t = e.document,
            n = function () {
                return e.URL || e.webkitURL || e
            },
            o = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            r = "download" in o,
            i = function (e) {
                var t = new MouseEvent("click");
                e.dispatchEvent(t)
            },
            a = e.webkitRequestFileSystem,
            c = e.requestFileSystem || a || e.mozRequestFileSystem,
            u = function (t) {
                (e.setImmediate || e.setTimeout)(function () {
                    throw t
                }, 0)
            },
            f = "application/octet-stream",
            s = 0,
            d = 500,
            l = function (t) {
                var o = function () {
                    "string" == typeof t ? n().revokeObjectURL(t) : t.remove()
                };
                e.chrome ? o() : setTimeout(o, d)
            },
            v = function (e, t, n) {
                t = [].concat(t);
                for (var o = t.length; o--;) {
                    var r = e["on" + t[o]];
                    if ("function" == typeof r) try {
                        r.call(e, n || e)
                    } catch (i) {
                        u(i)
                    }
                }
            },
            p = function (e) {
                return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["ï»¿", e], {
                    type: e.type
                }) : e
            },
            w = function (t, u, d) {
                d || (t = p(t));
                var w, y, m, S = this,
                    h = t.type,
                    O = !1,
                    R = function () {
                        v(S, "writestart progress write writeend".split(" "))
                    },
                    b = function () {
                        if ((O || !w) && (w = n().createObjectURL(t)), y) y.location.href = w;
                        else {
                            var o = e.open(w, "_blank");
                            void 0 == o && "undefined" != typeof safari && (e.location.href = w)
                        }
                        S.readyState = S.DONE, R(), l(w)
                    },
                    g = function (e) {
                        return function () {
                            return S.readyState !== S.DONE ? e.apply(this, arguments) : void 0
                        }
                    },
                    E = {
                        create: !0,
                        exclusive: !1
                    };
                return S.readyState = S.INIT, u || (u = "download"), r ? (w = n().createObjectURL(t), o.href = w, o.download = u, void setTimeout(function () {
                    i(o), R(), l(w), S.readyState = S.DONE
                })) : (e.chrome && h && h !== f && (m = t.slice || t.webkitSlice, t = m.call(t, 0, t.size, f), O = !0), a && "download" !== u && (u += ".download"), (h === f || a) && (y = e), c ? (s += t.size, void c(e.TEMPORARY, s, g(function (e) {
                    e.root.getDirectory("saved", E, g(function (e) {
                        var n = function () {
                            e.getFile(u, E, g(function (e) {
                                e.createWriter(g(function (n) {
                                    n.onwriteend = function (t) {
                                        y.location.href = e.toURL(), S.readyState = S.DONE, v(S, "writeend", t), l(e)
                                    }, n.onerror = function () {
                                        var e = n.error;
                                        e.code !== e.ABORT_ERR && b()
                                    }, "writestart progress write abort".split(" ").forEach(function (e) {
                                        n["on" + e] = S["on" + e]
                                    }), n.write(t), S.abort = function () {
                                        n.abort(), S.readyState = S.DONE
                                    }, S.readyState = S.WRITING
                                }), b)
                            }), b)
                        };
                        e.getFile(u, {
                            create: !1
                        }, g(function (e) {
                            e.remove(), n()
                        }), g(function (e) {
                            e.code === e.NOT_FOUND_ERR ? n() : b()
                        }))
                    }), b)
                }), b)) : void b())
            },
            y = w.prototype,
            m = function (e, t, n) {
                return new w(e, t, n)
            };
        return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (e, t, n) {
            return n || (e = p(e)), navigator.msSaveOrOpenBlob(e, t || "download")
        } : (y.abort = function () {
            var e = this;
            e.readyState = e.DONE, v(e, "abort")
        }, y.readyState = y.INIT = 0, y.WRITING = 1, y.DONE = 2, y.error = y.onwritestart = y.onprogress = y.onwrite = y.onabort = y.onerror = y.onwriteend = null, m)
    }
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null != define.amd && define([], function () {
    return saveAs
});
var module = {};
function executelimits(input) {
    if (parseInt(input.value) < parseInt(input.min)) {
        input.value = input.min;
    }
    if (parseInt(input.value) > parseInt(input.max)) {
        input.value = input.max;
    }
}
(function (s, t, a, r, b, l, i, o) {
    var llll1, arrayMult, I0OlI, OIOIl, O00IO, IIO0O, IOI10, I1O0O, hasProp, lOI1O, editor, bind;
    this.lII10 = function () {
        function e() {
            this.O0lII = [], this.ships_by_code = []
        }
        return e.prototype.clear = function () {
            return this.O0lII = [], this.ships_by_code = []
        }, e.prototype.add = function (e) {
            return this.O0lII.push(e), this.ships_by_code[100 * e.level + e.model] = e
        }, e.prototype.getDefaultShip = function () {
            return this.O0lII[0]
        }, e.prototype.lI1Ol = function () {
            return this.O0lII[Math.floor(Math.random() * this.O0lII.length)]
        }, e
    }(), llll1 = new this.lII10, llll1.add({
        name: "Fly",
        level: 1,
        model: 1,
        size: 1.05,
        specs: {
            shield: {
                capacity: [75, 100],
                reload: [2, 3]
            },
            generator: {
                capacity: [40, 60],
                reload: [10, 15]
            },
            ship: {
                mass: 60,
                speed: [125, 145],
                rotation: [110, 130],
                acceleration: [100, 120]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-65, -60, -50, -20, 10, 30, 55, 75, 60]
                },
                width: [0, 8, 10, 30, 25, 30, 18, 15, 0],
                height: [0, 6, 8, 12, 20, 20, 18, 15, 0],
                propeller: !0,
                texture: [4, 63, 10, 1, 1, 1, 12, 17]
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: -0,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-15, 0, 20, 30, 60]
                },
                width: [0, 13, 17, 10, 5],
                height: [0, 18, 25, 18, 5],
                propeller: !1,
                texture: [7, 9, 9, 4, 4]
            },
            cannon: {
                section_segments: 6,
                offset: {
                    x: 0,
                    y: -15,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-40, -50, -20, 0, 20, 30],
                    z: [0, 0, 0, 0, 0, 20]
                },
                width: [0, 5, 8, 11, 7, 0],
                height: [0, 5, 8, 11, 10, 0],
                angle: 0,
                laser: {
                    damage: [5, 6],
                    rate: 4,
                    type: 1,
                    speed: [160, 180],
                    number: 1,
                    error: 2.5
                },
                propeller: !1,
                texture: [3, 3, 10, 3]
            }
        },
        wings: {
            main: {
                length: [60, 20],
                width: [100, 50, 40],
                angle: [-10, 10],
                position: [0, 20, 10],
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 10,
                    z: 5
                },
                bump: {
                    position: 30,
                    size: 20
                },
                texture: [11, 63]
            }
        }
    }), llll1.add({
        name: "Delta-Fighter",
        level: 2,
        model: 1,
        size: 1.3,
        specs: {
            shield: {
                capacity: [100, 150],
                reload: [3, 4]
            },
            generator: {
                capacity: [50, 80],
                reload: [15, 25]
            },
            ship: {
                mass: 80,
                speed: [110, 135],
                rotation: [80, 100],
                acceleration: [110, 120]
            }
        },
        bodies: {
            cockpit: {
                angle: 0,
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 12
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-20, -10, 0, 10, 20],
                    z: [-7, -3, 0, 5, 3]
                },
                width: [3, 12, 18, 16, 3],
                height: [3, 6, 8, 6, 3],
                texture: [9]
            },
            cockpit2: {
                angle: 0,
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -10,
                    z: 12
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [-10, 0, 10, 40],
                    z: [0, 0, 5, 3]
                },
                width: [5, 18, 16, 3],
                height: [5, 12, 10, 5],
                texture: [9, 2, 11]
            },
            propulsor: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 35,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [0, 10, 20, 30, 40, 30],
                    z: [0, 0, 0, 0, 0]
                },
                width: [5, 15, 10, 10, 10, 0],
                height: [15, 15, 15, 15, 10, 0],
                texture: [63, 63, 4, 5, 12],
                propeller: !0
            },
            bumps: {
                section_segments: 8,
                offset: {
                    x: 40,
                    y: 40,
                    z: 5
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-40, -10, 0, 10, 40, 45],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 8, 12, 5, 0],
                height: [0, 25, 28, 22, 15, 0],
                texture: [63]
            },
            gunsupport: {
                section_segments: 8,
                offset: {
                    x: 30,
                    y: -40,
                    z: 5
                },
                position: {
                    x: [-30, -20, -10, 0, 0, 0],
                    y: [-20, -15, -5, 10, 40, 55],
                    z: [-20, -20, -10, 0, 0, 0]
                },
                width: [3, 5, 8, 4, 5, 0],
                height: [3, 5, 8, 12, 15, 0],
                texture: 63
            },
            gun: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -60,
                    z: -15
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [-20, -10, 5, 10],
                    z: [0, 0, 0, 0]
                },
                width: [3, 7, 8, 3],
                height: [3, 7, 8, 3],
                texture: [6, 4, 5],
                laser: {
                    damage: [3, 5],
                    rate: 3,
                    type: 1,
                    speed: [100, 120],
                    number: 3,
                    angle: 15,
                    error: 0
                }
            }
        },
        wings: {
            main: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: -25,
                    z: 5
                },
                length: [100],
                width: [120, 30, 40],
                angle: [0, 20],
                position: [30, 90, 85],
                texture: 11,
                bump: {
                    position: 30,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "Trident",
        level: 2,
        model: 2,
        size: 1.2,
        specs: {
            shield: {
                capacity: [125, 175],
                reload: [3, 5]
            },
            generator: {
                capacity: [50, 80],
                reload: [15, 20]
            },
            ship: {
                mass: 100,
                speed: [110, 135],
                rotation: [70, 85],
                acceleration: [90, 110]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-100, -50, 0, 30, 70, 100, 90],
                    z: [0, 0, 0, 0, 0, 0, 0]
                },
                width: [1, 25, 15, 30, 30, 20, 10],
                height: [1, 20, 20, 30, 30, 10, 0],
                texture: [1, 1, 10, 2, 3],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -40,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -10, 0, 30, 40]
                },
                width: [0, 10, 10, 10, 0],
                height: [0, 10, 15, 12, 0],
                texture: [9],
                propeller: !1
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 50,
                    y: 40,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -45, -20, 0, 20, 50, 55]
                },
                width: [0, 5, 10, 10, 15, 10, 0],
                height: [0, 5, 15, 15, 10, 5, 0],
                angle: 0,
                laser: {
                    damage: [4, 8],
                    rate: 2.5,
                    type: 1,
                    speed: [100, 120],
                    number: 1,
                    angle: 0,
                    error: 0
                },
                propeller: !1,
                texture: [4, 4, 10, 4, 63, 4]
            }
        },
        wings: {
            main: {
                offset: {
                    x: 0,
                    y: 60,
                    z: 0
                },
                length: [80, 30],
                width: [70, 50, 60],
                texture: [4, 63],
                angle: [0, 0],
                position: [10, -20, -50],
                bump: {
                    position: -10,
                    size: 15
                }
            },
            winglets: {
                length: [30, 20],
                width: [10, 30, 0],
                angle: [50, 20],
                position: [90, 80, 50],
                texture: [63],
                bump: {
                    position: 10,
                    size: 30
                }
            }
        }
    }), llll1.add({
        name: "Pulse-Fighter",
        level: 3,
        model: 1,
        size: 1.3,
        specs: {
            shield: {
                capacity: [150, 200],
                reload: [3, 5]
            },
            generator: {
                capacity: [60, 90],
                reload: [20, 30]
            },
            ship: {
                mass: 120,
                speed: [105, 120],
                rotation: [60, 80],
                acceleration: [80, 100]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -75, -50, 0, 50, 105, 90]
                },
                width: [0, 15, 25, 30, 35, 20, 0],
                height: [0, 10, 15, 25, 25, 20, 0],
                propeller: !0,
                texture: [63, 1, 1, 10, 2, 12]
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: -20,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -10, 10, 30, 60]
                },
                width: [0, 10, 15, 10, 5],
                height: [0, 18, 25, 18, 5],
                propeller: !1,
                texture: 9
            },
            cannon: {
                section_segments: 6,
                offset: {
                    x: 0,
                    y: -40,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-40, -50, -20, 0, 20, 50]
                },
                width: [0, 5, 10, 10, 15, 0],
                height: [0, 5, 15, 15, 10, 0],
                angle: 0,
                laser: {
                    damage: [15, 30],
                    rate: 1,
                    type: 2,
                    speed: [150, 175],
                    number: 1,
                    error: 0
                },
                propeller: !1,
                texture: 3
            },
            deco: {
                section_segments: 8,
                offset: {
                    x: 50,
                    y: 50,
                    z: -10
                },
                position: {
                    x: [0, 0, 5, 5, 0, 0, 0],
                    y: [-52, -50, -20, 0, 20, 40, 42]
                },
                width: [0, 5, 10, 10, 5, 5, 0],
                height: [0, 5, 10, 15, 10, 5, 0],
                angle: 0,
                laser: {
                    damage: [3, 6],
                    rate: 3,
                    type: 1,
                    speed: [100, 150],
                    number: 1,
                    error: 0
                },
                propeller: !1,
                texture: 4
            }
        },
        wings: {
            main: {
                length: [80, 20],
                width: [120, 50, 40],
                angle: [-10, 20],
                position: [30, 50, 30],
                doubleside: !0,
                bump: {
                    position: 30,
                    size: 10
                },
                texture: [11, 63]
            },
            winglets: {
                length: [40],
                width: [40, 20, 30],
                angle: [10, -10],
                position: [-40, -60, -55],
                bump: {
                    position: 0,
                    size: 30
                },
                texture: 63
            },
            stab: {
                length: [40, 10],
                width: [50, 20, 20],
                angle: [40, 30],
                position: [70, 75, 80],
                doubleside: !0,
                texture: 63,
                bump: {
                    position: 0,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "Side-Fighter",
        level: 3,
        model: 2,
        size: 1.5,
        next: [403, 404],
        specs: {
            shield: {
                capacity: [125, 175],
                reload: [2, 4]
            },
            generator: {
                capacity: [75, 125],
                reload: [20, 35]
            },
            ship: {
                mass: 90,
                speed: [100, 120],
                rotation: [50, 70],
                acceleration: [100, 130]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -22, -15, 0, 15, 22, 40, 30],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [5, 10, 25, 30, 25, 17, 15, 0],
                height: [5, 10, 25, 30, 25, 17, 15, 0],
                texture: [5, 63, 63, 63, 63, 12, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, -8, 0]
                },
                width: [0, 10, 10],
                height: [0, 10, 10],
                texture: [9],
                propeller: !1,
                laser: {
                    damage: [4, 6],
                    rate: 10,
                    type: 1,
                    speed: [150, 240],
                    number: 1,
                    error: 20
                }
            }
        },
        wings: {
            wings1: {
                doubleside: !0,
                offset: {
                    x: 60,
                    y: 0,
                    z: -80
                },
                length: [0, 50, 50, 50],
                width: [0, 0, 100, 100, 0],
                angle: [95, 90, 90, 95],
                position: [0, 0, 0, 0, 0],
                texture: [7],
                bump: {
                    position: 0,
                    size: 8
                }
            },
            join: {
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                length: [61],
                width: [10, 6],
                angle: [0],
                position: [0, 0, 0, 50],
                texture: [8],
                bump: {
                    position: 10,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "Shadow X-1",
        level: 3,
        model: 3,
        size: .8,
        zoom: .8,
        specs: {
            shield: {
                capacity: [90, 130],
                reload: [3, 6]
            },
            generator: {
                capacity: [50, 80],
                reload: [12, 16]
            },
            ship: {
                mass: 70,
                speed: [120, 155],
                rotation: [35, 60],
                acceleration: [130, 150]
            }
        },
        bodies: {
            main: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -98, -95, -70, -40, 0, 40, 70, 80, 90, 100]
                },
                width: [0, 10, 20, 30, 40, 20, 20, 40, 40, 40, 20, 0],
                height: [0, 4, 4, 20, 20, 10, 10, 15, 15, 15, 10, 10],
                texture: [12, 5, 63, 4, 4, 63, 4, 4, 5]
            },
            back: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [90, 95, 100, 105, 90]
                },
                width: [10, 15, 18, 19, 2],
                height: [3, 5, 7, 8, 2],
                texture: [63],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -25,
                    z: 15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-45, -40, -25, 0, 5],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 15, 13, 0],
                height: [0, 10, 15, 5, 0],
                texture: [9]
            },
            laser: {
                section_segments: 10,
                offset: {
                    x: 70,
                    y: 10,
                    z: -20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 70, 60]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                texture: [3, 4, 10, 3],
                propeller: !0,
                laser: {
                    damage: [3, 4],
                    rate: 6,
                    type: 1,
                    speed: [180, 210],
                    number: 1
                }
            }
        },
        wings: {
            top: {
                offset: {
                    x: 0,
                    y: 50,
                    z: 5
                },
                length: [30],
                width: [70, 30],
                angle: [90],
                position: [0, 50],
                texture: [4],
                bump: {
                    position: 10,
                    size: 15
                }
            },
            side_joins: {
                offset: {
                    x: 0,
                    y: 30,
                    z: -3
                },
                length: [100],
                width: [100, 40],
                angle: [0],
                position: [-50, 50],
                texture: [4],
                bump: {
                    position: 10,
                    size: 10
                }
            }
        }
    }), llll1.add({
        name: "Y-Defender",
        level: 3,
        model: 4,
        size: 1.5,
        specs: {
            shield: {
                capacity: [175, 225],
                reload: [4, 6]
            },
            generator: {
                capacity: [50, 80],
                reload: [18, 25]
            },
            ship: {
                mass: 200,
                speed: [80, 100],
                rotation: [40, 60],
                acceleration: [70, 80]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -95, -50, -40, -20, -10, 30, 70, 65],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 20, 25, 10, 10, 20, 15, 20, 0],
                height: [0, 10, 20, 15, 15, 20, 25, 15, 0],
                texture: [1, 2, 2, 63, 2, 10, 2, 12],
                laser: {
                    damage: [20, 40],
                    rate: 2,
                    type: 1,
                    speed: [130, 170],
                    number: 1,
                    recoil: 75,
                    error: 0
                }
            },
            propulsors: {
                section_segments: 8,
                offset: {
                    x: 50,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -25, 20, 25, 40, 50, 60, 100, 90],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 20, 15, 5, 25, 20, 15, 15, 0],
                height: [0, 20, 15, 5, 25, 20, 20, 10, 0],
                texture: [63, 63, 63, 2, 2, 3, 4, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -70,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -10, 0, 10, 20]
                },
                width: [0, 10, 10, 10, 0],
                height: [0, 10, 15, 12, 0],
                texture: [9],
                propeller: !1
            }
        },
        wings: {
            join: {
                offset: {
                    x: 14,
                    y: 0,
                    z: 0
                },
                length: [25],
                width: [20, 10],
                angle: [0],
                position: [0, 0, 0, 50],
                texture: [63],
                bump: {
                    position: 10,
                    size: 40
                }
            },
            join2: {
                offset: {
                    x: 14,
                    y: 50,
                    z: 0
                },
                length: [25],
                width: [20, 10],
                angle: [0],
                position: [0, 0, 0, 50],
                texture: [3],
                bump: {
                    position: 10,
                    size: 40
                }
            },
            winglets: {
                offset: {
                    x: 5,
                    y: 40,
                    z: 10
                },
                length: [10, 20],
                width: [15, 30, 50],
                angle: [60, -20],
                position: [0, 5, 60],
                texture: [63],
                bump: {
                    position: 10,
                    size: 60
                }
            }
        }
    }), llll1.add({
        name: "Vanguard",
        level: 4,
        model: 1,
        size: 1.2,
        specs: {
            shield: {
                capacity: [140, 190],
                reload: [3, 4]
            },
            generator: {
                capacity: [80, 140],
                reload: [25, 35]
            },
            ship: {
                mass: 200,
                speed: [75, 90],
                rotation: [90, 120],
                acceleration: [60, 80]
            }
        },
        bodies: {
            main: {
                section_segments: 11,
                offset: {
                    x: 0,
                    y: -47,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [0, 6, 12, 48, 77, 110, 137, 141],
                    z: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 22, 24, 35, 37, 34, 23, 0],
                height: [0, 22, 24, 35, 37, 34, 23, 0],
                texture: [9, 3, 2, 8, 3, 2, 3]
            },
            engines: {
                section_segments: 12,
                offset: {
                    x: 28,
                    y: -27,
                    z: -10
                },
                position: {
                    x: [25, -2, -4, -2, 0, 0],
                    y: [0, 40, 74, 98, 108, 105],
                    z: [18, 10, 0, 0, 0, 0]
                },
                width: [9, 10, 9, 14, 11, 0],
                height: [2, 10, 9, 14, 11, 0],
                texture: [3, 3, 3, 3, 17],
                propeller: !0
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: -30,
                    z: 15
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [0, 40, 66, 84, 89],
                    z: [-8, -2, -1, 1, 20]
                },
                width: [20, 30, 30, 23, 0],
                height: [20, 30, 30, 23, 0],
                texture: [9],
                propeller: !1
            },
            cannons: {
                section_segments: 8,
                offset: {
                    x: 18,
                    y: -183,
                    z: 8
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [5, 0, 23, 27, 62, 62, 97, 102, 163],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 5, 7, 7, 4, 4, 7, 7],
                height: [0, 5, 5, 7, 7, 4, 4, 7, 7],
                texture: [12, 13, 4, 8, 4, 4, 3, 8],
                propeller: !1,
                laser: {
                    damage: [18, 25],
                    rate: 3,
                    type: 2,
                    speed: [170, 200],
                    recoil: 70,
                    number: 1,
                    error: 0
                }
            }
        },
        wings: {
            outer: {
                offset: {
                    x: 37,
                    y: -115,
                    z: 15
                },
                length: [0, 12, 12, 22, 4, 38],
                width: [165, 235, 246, 232, 167, 122, 35],
                angle: [-15, -15, -15, -8, -8, -8],
                position: [20, 54, 54, 47, 79, 100, 101],
                texture: [4, 3, 4, 4, 1, 8],
                doubleside: !0,
                bump: {
                    position: 30,
                    size: 4
                }
            },
            inner: {
                offset: {
                    x: -37,
                    y: -115,
                    z: 15
                },
                length: [12],
                width: [165, 112],
                angle: [0],
                position: [20, 0],
                texture: [63, 63],
                doubleside: !0,
                bump: {
                    position: 30,
                    size: 4
                }
            },
            winglet: {
                offset: {
                    x: 104,
                    y: -13,
                    z: 55
                },
                length: [45, 15, 15, 45],
                width: [25, 70, 35, 70, 25],
                angle: [-70, -70, -110, -110],
                position: [0, 0, 0, 0, 0],
                texture: [63],
                doubleside: !0,
                bump: {
                    position: 0,
                    size: 5
                }
            }
        }
    }), llll1.add({
        name: "Mercury",
        level: 4,
        model: 2,
        size: 1.3,
        specs: {
            shield: {
                capacity: [150, 200],
                reload: [3, 5]
            },
            generator: {
                capacity: [100, 150],
                reload: [30, 50]
            },
            ship: {
                mass: 200,
                speed: [85, 105],
                rotation: [60, 90],
                acceleration: [60, 80]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-45, -50, -40, -30, 0, 50, 100, 90]
                },
                width: [1, 5, 15, 20, 30, 35, 20, 0],
                height: [1, 5, 10, 15, 25, 15, 10, 0],
                texture: [1, 4, 3, 63, 11, 10, 12],
                propeller: !0,
                laser: {
                    damage: [20, 40],
                    rate: 1,
                    type: 2,
                    speed: [170, 200],
                    number: 1,
                    error: 0
                }
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 20,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-40, -20, 0, 20, 50]
                },
                width: [0, 10, 15, 10, 0],
                height: [0, 18, 25, 18, 0],
                texture: [4, 9, 4, 4],
                propeller: !1
            },
            deco: {
                section_segments: 8,
                offset: {
                    x: 70,
                    y: 0,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 10, -5, 0, 0, 0],
                    y: [-115, -80, -100, -30, 0, 30, 100, 90]
                },
                width: [1, 5, 10, 15, 15, 20, 10, 0],
                height: [1, 5, 15, 20, 35, 30, 10, 0],
                texture: [6, 6, 4, 63, 63, 4, 12],
                angle: 0,
                propeller: !0
            },
            wingends: {
                section_segments: 8,
                offset: {
                    x: 115,
                    y: 25,
                    z: -5
                },
                position: {
                    x: [0, 2, 4, 2, 0, 0],
                    y: [-20, -10, 0, 10, 20, 15]
                },
                width: [2, 3, 6, 3, 4, 0],
                height: [5, 15, 22, 17, 5, 0],
                texture: [4, 4, 4, 4, 6],
                propeller: !0,
                angle: 2,
                laser: {
                    damage: [3, 5],
                    rate: 4,
                    type: 1,
                    speed: [150, 180],
                    number: 1,
                    error: 0
                }
            }
        },
        wings: {
            main: {
                length: [80, 40],
                width: [40, 30, 20],
                angle: [-10, 20],
                position: [30, 50, 30],
                texture: [11, 11],
                bump: {
                    position: 30,
                    size: 10
                }
            },
            font: {
                length: [80, 30],
                width: [20, 15],
                angle: [-10, 20],
                position: [-20, -40],
                texture: [63],
                bump: {
                    position: 30,
                    size: 10
                }
            }
        }
    }), llll1.add({
        name: "X-Warrior",
        level: 4,
        model: 3,
        size: 1.6,
        specs: {
            shield: {
                capacity: [150, 200],
                reload: [3, 5]
            },
            generator: {
                capacity: [90, 150],
                reload: [35, 55]
            },
            ship: {
                mass: 250,
                speed: [75, 100],
                rotation: [50, 90],
                acceleration: [90, 110]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -99, -50, 0, 10, 30, 50, 80, 100, 90],
                    z: [-10, -10, -5, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 30, 35, 25, 30, 50, 50, 20, 0],
                height: [0, 5, 20, 20, 20, 20, 20, 20, 10, 0],
                texture: [4, 2, 10, 2, 63, 11, 4, 63, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 5
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -20, 0, 30, 40]
                },
                width: [0, 10, 15, 10, 0],
                height: [0, 18, 25, 18, 0],
                texture: 9,
                propeller: !1
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 30,
                    y: -70,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-30, -20, 0, 20, 30]
                },
                width: [3, 5, 5, 5, 3],
                height: [3, 5, 15, 15, 3],
                texture: [6, 4, 4, 6],
                angle: 0,
                laser: {
                    damage: [5, 8],
                    rate: 3,
                    type: 1,
                    speed: [120, 180],
                    number: 1,
                    error: 0
                }
            },
            wingendtop: {
                section_segments: 12,
                offset: {
                    x: 105,
                    y: 50,
                    z: 40
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-65, -70, -20, 0, 20, 30, 5]
                },
                width: [0, 2, 3, 7, 7, 5, 0],
                height: [0, 2, 3, 7, 7, 5, 0],
                texture: [12, 63, 63, 11, 63, 12],
                angle: 0
            },
            wingendbottom: {
                section_segments: 12,
                offset: {
                    x: 105,
                    y: 50,
                    z: -40
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-65, -70, -20, 0, 20, 30, 25]
                },
                width: [0, 2, 3, 7, 7, 5, 0],
                height: [0, 2, 3, 7, 7, 5, 0],
                texture: [12, 63, 63, 11, 63, 12],
                angle: 0,
                laser: {
                    damage: [3, 5],
                    rate: 2.5,
                    type: 1,
                    speed: [100, 160],
                    number: 1,
                    error: 0
                }
            },
            propellers: {
                section_segments: 12,
                offset: {
                    x: 40,
                    y: 60,
                    z: 0
                },
                position: {
                    x: [0, 0, 5, 3, 5, 0, 0],
                    y: [-35, -40, -30, 0, 40, 50, 40]
                },
                width: [0, 5, 10, 10, 15, 10, 0],
                height: [0, 5, 25, 30, 25, 5, 0],
                texture: 4,
                angle: 0,
                propeller: !0
            }
        },
        wings: {
            xwing1: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 70,
                    z: 0
                },
                length: [80, 35],
                width: [50, 40, 30],
                angle: [20, 20],
                position: [0, -10, -20],
                texture: [1, 10],
                bump: {
                    position: 10,
                    size: 20
                }
            },
            xwing2: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 70,
                    z: 0
                },
                length: [80, 35],
                width: [50, 40, 30],
                angle: [-20, -20],
                position: [0, -10, -20],
                texture: [1, 1],
                bump: {
                    position: 10,
                    size: 20
                }
            },
            winglets2: {
                offset: {
                    x: 30,
                    y: -40,
                    z: 0
                },
                length: [20, 10],
                width: [30, 20, 5],
                angle: [-10, 20],
                position: [0, 0, 0],
                texture: 63,
                bump: {
                    position: 30,
                    size: 10
                }
            }
        }
    }), llll1.add({
        name: "Side-Interceptor",
        level: 4,
        model: 4,
        size: 1.6,
        specs: {
            shield: {
                capacity: [175, 225],
                reload: [3, 6]
            },
            generator: {
                capacity: [100, 150],
                reload: [30, 40]
            },
            ship: {
                mass: 120,
                speed: [80, 110],
                rotation: [50, 100],
                acceleration: [110, 140]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -22, -15, 0, 15, 22, 30, 20],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [5, 10, 25, 30, 25, 10, 15, 0],
                height: [5, 10, 25, 30, 25, 10, 15, 0],
                texture: [1, 3, 63, 63, 3, 4, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, -8, 0]
                },
                width: [0, 10, 10],
                height: [0, 10, 10],
                texture: [5, 9, 5],
                propeller: !1
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 60,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-25, -30, -20, 0, 20, 30, 20]
                },
                width: [0, 3, 5, 5, 5, 3, 0],
                height: [0, 3, 5, 5, 5, 3, 0],
                texture: [12, 6, 63, 63, 6, 12],
                angle: 0,
                laser: {
                    damage: [5, 7],
                    rate: 5,
                    type: 1,
                    speed: [100, 200],
                    number: 1,
                    error: 5
                }
            }
        },
        wings: {
            wings1: {
                doubleside: !0,
                offset: {
                    x: 60,
                    y: 20,
                    z: 0
                },
                length: [-20, -10, -40],
                width: [50, 50, 130, 30],
                angle: [280, 315, 315],
                position: [0, 0, -50, 0],
                texture: 4,
                bump: {
                    position: 10,
                    size: -10
                }
            },
            wings2: {
                doubleside: !0,
                offset: {
                    x: 60,
                    y: 20,
                    z: 0
                },
                length: [20, 10, 40],
                width: [50, 50, 130, 30],
                angle: [-100, -135, -135],
                position: [0, 0, -50, 0],
                texture: 4,
                bump: {
                    position: 10,
                    size: 10
                }
            },
            join: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                length: [61],
                width: [10, 6],
                angle: [0],
                position: [0, 0, 0, 50],
                texture: 63,
                bump: {
                    position: 10,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "Pioneer",
        level: 4,
        model: 5,
        size: 1.6,
        specs: {
            shield: {
                capacity: [175, 230],
                reload: [4, 7]
            },
            generator: {
                capacity: [50, 100],
                reload: [25, 30]
            },
            ship: {
                mass: 250,
                speed: [90, 120],
                rotation: [40, 80],
                acceleration: [50, 100]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -60, -10, 0, 20, 50, 80, 100, 90],
                    z: [-10, -5, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [5, 50, 50, 30, 40, 50, 50, 20, 0],
                height: [5, 20, 20, 20, 30, 30, 20, 10, 0],
                texture: [2, 10, 2, 4, 11, 11, 63, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -40,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -20, 0, 30, 40]
                },
                width: [0, 10, 15, 10, 0],
                height: [0, 18, 25, 18, 0],
                texture: [9],
                propeller: !1
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 30,
                    y: -70,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-30, -20, 0, 20, 30]
                },
                width: [3, 5, 5, 5, 3],
                height: [3, 5, 15, 15, 3],
                texture: [6, 4, 4, 6],
                angle: 0,
                laser: {
                    damage: [6, 11],
                    rate: 3,
                    type: 1,
                    speed: [100, 140],
                    number: 1,
                    error: 0
                }
            },
            shield: {
                section_segments: 12,
                offset: {
                    x: 60,
                    y: -40,
                    z: 0
                },
                position: {
                    x: [0, 5, 3, 5, 0, 0],
                    y: [-30, -20, 0, 20, 30, 20]
                },
                width: [5, 10, 10, 10, 5, 0],
                height: [5, 25, 30, 25, 5, 0],
                propeller: !0,
                texture: 4,
                angle: 0
            },
            shield2: {
                section_segments: 12,
                offset: {
                    x: 60,
                    y: 60,
                    z: 0
                },
                position: {
                    x: [0, 5, 3, 5, 0, 0],
                    y: [-30, -20, 0, 20, 30, 20]
                },
                width: [5, 10, 10, 10, 5, 0],
                height: [5, 25, 30, 25, 5, 0],
                propeller: !0,
                texture: 4,
                angle: 0
            }
        }
    }), llll1.add({
        name: "Crusader",
        level: 4,
        model: 6,
        size: 1.6,
        specs: {
            shield: {
                capacity: [250, 300],
                reload: [5, 7]
            },
            generator: {
                capacity: [50, 90],
                reload: [20, 35]
            },
            ship: {
                mass: 250,
                speed: [75, 100],
                rotation: [40, 70],
                acceleration: [80, 100]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -99, -90, -30, 30, 100, 80],
                    z: [0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 15, 40, 25, 20, 0],
                height: [0, 5, 15, 40, 50, 20, 0],
                texture: [6, 63, 1, 8, 63, 12]
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -50,
                    z: 30
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-30, -10, 0, 10, 20],
                    z: [-13, -3, 0, 5, 3]
                },
                width: [3, 13, 15, 9, 3],
                height: [3, 6, 8, 6, 3],
                texture: [9]
            },
            main_propulsor: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0],
                    y: [50],
                    z: [0]
                },
                width: [25],
                height: [0],
                propeller: !0
            },
            side_propulsors: {
                section_segments: 8,
                offset: {
                    x: 60,
                    y: 20,
                    z: 0
                },
                position: {
                    x: [-30, -10, 0, 0, 0],
                    y: [-40, -20, 0, 20, 70],
                    z: [0, 0, 0, 0, 0]
                },
                width: [5, 5, 10, 20, 10],
                height: [5, 5, 10, 10, 10],
                texture: [63],
                propeller: !0
            },
            lasers: {
                section_segments: 8,
                offset: {
                    x: 45,
                    y: -20,
                    z: -5
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-40, -20, -30, 20, 70],
                    z: [0, 0, 0, 0, 0]
                },
                width: [0, 5, 8, 12, 1],
                height: [0, 3, 5, 12, 1],
                texture: [6, 6, 10],
                laser: {
                    damage: [6, 9],
                    rate: 3,
                    type: 1,
                    speed: [130, 160],
                    number: 1,
                    error: 0
                }
            }
        },
        wings: {
            main: {
                offset: {
                    x: 20,
                    y: -25,
                    z: 5
                },
                length: [100, 15],
                width: [120, 30, 40],
                angle: [0, 40],
                position: [30, 90, 85],
                texture: [11, 63],
                bump: {
                    position: 0,
                    size: 20
                }
            },
            tail: {
                offset: {
                    x: 0,
                    y: 75,
                    z: 20
                },
                length: [30, 40],
                width: [30, 20, 25],
                angle: [10, -30],
                position: [0, 0, -30],
                texture: [63],
                bump: {
                    position: 0,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "U-Sniper",
        level: 5,
        model: 1,
        size: 1.8,
        specs: {
            shield: {
                capacity: [200, 300],
                reload: [4, 6]
            },
            generator: {
                capacity: [80, 160],
                reload: [40, 60]
            },
            ship: {
                mass: 200,
                speed: [70, 90],
                rotation: [50, 70],
                acceleration: [60, 110]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [0, -10, 40, 100, 90, 100]
                },
                width: [0, 10, 23, 10, 0],
                height: [0, 5, 23, 10, 0],
                texture: [12, 1, 10, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 30
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [20, 40, 80],
                    z: [-4, 0, -6]
                },
                width: [5, 10, 5],
                height: [0, 8, 0],
                texture: [9]
            },
            uwings: {
                section_segments: 8,
                offset: {
                    x: 50,
                    y: -20,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-90, -100, 40, 80, 90, 100]
                },
                width: [0, 10, 25, 20, 0],
                height: [0, 5, 25, 20, 0],
                texture: [12, 2, 3, 4]
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 70,
                    y: 20,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-60, -70, -20, 0, 20, 50, 45]
                },
                width: [0, 5, 6, 10, 15, 5, 0],
                height: [0, 5, 5, 10, 10, 5, 0],
                angle: 0,
                laser: {
                    damage: [40, 60],
                    rate: 2,
                    type: 2,
                    speed: [190, 240],
                    recoil: 200,
                    number: 1,
                    error: 0
                },
                propeller: !1,
                texture: [4, 4, 10, 4, 63, 4]
            },
            side_propulsors: {
                section_segments: 10,
                offset: {
                    x: 30,
                    y: 30,
                    z: 5
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [0, 10, 13, 25, 30, 40, 60, 50]
                },
                width: [0, 5, 10, 10, 10, 5, 5, 10, 5, 0],
                height: [0, 5, 10, 10, 10, 5, 5, 10, 5, 0],
                propeller: !0,
                texture: [5, 2, 11, 2, 63, 11, 12]
            }
        }
    }), llll1.add({
        name: "FuryStar",
        level: 5,
        model: 2,
        size: 1.5,
        specs: {
            shield: {
                capacity: [200, 275],
                reload: [6, 7]
            },
            generator: {
                capacity: [100, 150],
                reload: [30, 40]
            },
            ship: {
                mass: 200,
                speed: [70, 100],
                rotation: [120, 180],
                acceleration: [150, 180]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 5
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -45, 0, 10, 15, 35, 55, 40]
                },
                width: [0, 20, 25, 17, 25, 20, 15, 0],
                height: [0, 15, 15, 15, 20, 20, 15, 0],
                texture: [1, 4, 63, 4, 2, 12, 17],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -43,
                    z: 5
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, -4, 10],
                    z: [-5, 0, 0]
                },
                width: [1, 18, 20],
                height: [1, 15, 10],
                texture: [9]
            },
            missiles: {
                section_segments: 12,
                offset: {
                    x: 35,
                    y: -5,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-30, -23, 0, 23, 30],
                    z: [0, 0, 0, 0, 0]
                },
                width: [0, 5, 5, 5, 0],
                height: [0, 5, 5, 5, 0],
                texture: [6, 4, 4, 10],
                angle: 0,
                laser: {
                    damage: [1, 2],
                    rate: 4,
                    type: 1,
                    speed: [100, 125],
                    number: 1,
                    error: 0
                }
            },
            cannon: {
                section_segments: 6,
                offset: {
                    x: 15,
                    y: -10,
                    z: -15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-40, -50, -20, 0, 20, 30],
                    z: [0, 0, 0, 0, 0, 20]
                },
                width: [0, 5, 8, 11, 7, 0],
                height: [0, 5, 8, 11, 10, 0],
                angle: 0,
                laser: {
                    damage: [12, 18],
                    rate: 2,
                    type: 1,
                    speed: [200, 250],
                    number: 1,
                    error: 0
                },
                propeller: !1,
                texture: [3, 3, 10, 3]
            },
            top_propulsors: {
                section_segments: 10,
                offset: {
                    x: 75,
                    y: 45,
                    z: 40
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 80, 70],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                propeller: !0,
                texture: [4, 4, 2, 2, 5, 63, 5, 63, 17]
            },
            bottom_propulsors: {
                section_segments: 10,
                offset: {
                    x: 100,
                    y: 0,
                    z: -40
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 80, 70],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                propeller: !0,
                texture: [4, 4, 2, 2, 5, 63, 5, 4, 17]
            }
        },
        wings: {
            rooftop: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: -20,
                    z: 20
                },
                length: [20, 15, 25, 25, 5],
                width: [50, 40, 35, 35, 35, 30],
                angle: [0, -20, 30, 30, 30],
                position: [0, 10, 20, 50, 80, 100],
                texture: [8, 63, 3, 3],
                bump: {
                    position: -40,
                    size: 5
                }
            },
            bottom: {
                doubleside: !0,
                offset: {
                    x: 10,
                    y: -20,
                    z: 0
                },
                length: [30, 30, 30],
                width: [60, 50, 50, 50],
                angle: [-27, -27, -27],
                position: [0, 10, 30, 40],
                texture: [1],
                bump: {
                    position: -40,
                    size: 5
                }
            },
            topwinglets: {
                doubleside: !0,
                offset: {
                    x: 80,
                    y: 87,
                    z: 45
                },
                length: [20],
                width: [40, 30],
                angle: [60],
                position: [0, 50],
                texture: [63],
                bump: {
                    position: 10,
                    size: 10
                }
            },
            bottomwinglets: {
                doubleside: !0,
                offset: {
                    x: 100,
                    y: 50,
                    z: -45
                },
                length: [20],
                width: [40, 30],
                angle: [-60],
                position: [0, 50],
                texture: [4],
                bump: {
                    position: 10,
                    size: 10
                }
            }
        }
    }), arrayMult = function (e, t) {
        return e.map(function (e) {
            return e * t
        })
    }, llll1.add({
        name: "T-Warrior",
        level: 5,
        model: 3,
        size: 1.6,
        specs: {
            shield: {
                capacity: [225, 325],
                reload: [4, 7]
            },
            generator: {
                capacity: [80, 140],
                reload: [35, 50]
            },
            ship: {
                mass: 250,
                speed: [80, 90],
                rotation: [50, 80],
                acceleration: [90, 120]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-95, -100, -98, -70, 0, 90, 91]
                },
                width: [0, 5, 6, 20, 30, 20, 3],
                height: [0, 2, 4, 20, 30, 25, 3],
                texture: [12, 5, 63, 1, 10, 12]
            },
            cannon: {
                section_segments: 6,
                offset: {
                    x: 0,
                    y: -45,
                    z: -15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-40, -50, -20, 0, 20, 30],
                    z: [0, 0, 0, 0, 0, 20]
                },
                width: [0, 5, 8, 11, 7, 0],
                height: [0, 5, 8, 11, 10, 0],
                angle: 0,
                laser: {
                    damage: [4, 6],
                    rate: 3,
                    type: 1,
                    speed: [130, 160],
                    number: 5,
                    angle: 30,
                    error: 0
                },
                propeller: !1,
                texture: [3, 3, 10, 3]
            },
            back: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0],
                    y: [90, 95, 95]
                },
                width: [15, 18, 2],
                height: [18, 23, 2],
                texture: [63]
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-50, -40, -25, 0, 5],
                    z: [0, 0, 0, 0, 9, 9]
                },
                width: [0, 10, 15, 10, 0],
                height: [0, 10, 15, 16, 0],
                texture: [9]
            },
            top_propulsor: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 30,
                    z: 60
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 100, 90]
                },
                width: [0, 15, 20, 20, 20, 15, 15, 20, 10, 0],
                height: [0, 15, 20, 20, 20, 15, 15, 20, 10, 0],
                texture: [4, 63, 1, 1, 1, 63, 1, 1, 12],
                propeller: !0
            },
            side_propulsors: {
                section_segments: 10,
                offset: {
                    x: 80,
                    y: 30,
                    z: -30
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 100, 90]
                },
                width: [0, 15, 20, 20, 20, 15, 15, 20, 10, 0],
                height: [0, 15, 20, 20, 20, 15, 15, 20, 10, 0],
                texture: [4, 63, 1, 1, 1, 63, 1, 1, 12],
                propeller: !0
            }
        },
        wings: {
            top_join: {
                offset: {
                    x: 0,
                    y: 50,
                    z: 0
                },
                length: [60],
                width: [70, 30],
                angle: [90],
                position: [0, 0, 0, 50],
                texture: [11],
                bump: {
                    position: 10,
                    size: 20
                }
            },
            side_joins: {
                offset: {
                    x: 0,
                    y: 50,
                    z: 0
                },
                length: [80],
                width: [70, 30],
                angle: [-20],
                position: [0, 0, 0, 50],
                texture: [11],
                bump: {
                    position: 10,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "Aetos",
        level: 5,
        model: 4,
        size: 1.5,
        specs: {
            shield: {
                capacity: [200, 300],
                reload: [5, 7]
            },
            generator: {
                capacity: [80, 140],
                reload: [35, 45]
            },
            ship: {
                mass: 175,
                speed: [90, 100],
                rotation: [70, 90],
                acceleration: [110, 130]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -99, -98, -50, 0, 100, 80]
                },
                width: [0, 5, 6, 17, 28, 20, 0],
                height: [0, 2, 4, 15, 25, 25, 0],
                texture: [4, 6, 10, 10, 11, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -60,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, 0, 20, 30, 40]
                },
                width: [0, 5, 10, 10, 0],
                height: [0, 5, 10, 12, 0],
                texture: [9]
            },
            lasers: {
                section_segments: 8,
                offset: {
                    x: 81,
                    y: -15,
                    z: -30
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [25, 70, 10, 80, 90],
                    z: [0, 0, 0, 0, 0]
                },
                width: [5, 0, 0, 5, 0],
                height: [5, 5, 0, 5, 0],
                texture: [63, 63, 6],
                angle: 2,
                laser: {
                    damage: [5, 8],
                    rate: 5,
                    type: 1,
                    speed: [120, 180],
                    number: 1,
                    angle: 0,
                    error: 0
                }
            }
        },
        wings: {
            top: {
                doubleside: !0,
                offset: {
                    x: 15,
                    y: 40,
                    z: 0
                },
                length: [50],
                width: [70, 30],
                angle: [70],
                position: [0, 30],
                texture: [63],
                bump: {
                    position: 10,
                    size: 10
                }
            },
            main: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 25,
                    z: 15
                },
                length: [90, 40],
                width: [70, 50, 30],
                angle: [-30, -40],
                position: [30, 20, -20],
                texture: [8, 63],
                bump: {
                    position: 10,
                    size: 10
                }
            }
        }
    }), llll1.add({
        name: "Shadow X-2",
        level: 5,
        model: 5,
        size: 1.1,
        specs: {
            shield: {
                capacity: [150, 220],
                reload: [5, 7]
            },
            generator: {
                capacity: [80, 145],
                reload: [19, 29]
            },
            ship: {
                mass: 125,
                speed: [110, 140],
                rotation: [35, 48],
                acceleration: [140, 160]
            }
        },
        bodies: {
            main: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -98, -95, -70, -40, 0, 40, 70, 80, 90, 100]
                },
                width: [0, 5, 10, 20, 30, 20, 20, 30, 30, 30, 20, 0],
                height: [0, 4, 4, 20, 20, 10, 10, 15, 15, 15, 10, 10],
                texture: [12, 5, 63, 4, 4, 3, 4, 4, 5]
            },
            back: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [90, 95, 100, 105, 90]
                },
                width: [10, 15, 18, 19, 2],
                height: [3, 5, 7, 8, 2],
                texture: [63],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -25,
                    z: 12
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-45, -40, -25, 0, 5],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 15, 5, 0],
                height: [0, 10, 15, 5, 0],
                texture: [9]
            },
            laser: {
                section_segments: 10,
                offset: {
                    x: 50,
                    y: 10,
                    z: -13
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -25, 0, 10, 20, 25, 30, 40, 70, 60]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                texture: [6, 4, 10, 3, 4, 3, 2],
                propeller: !0,
                laser: {
                    damage: [5, 7],
                    rate: 5,
                    type: 1,
                    speed: [160, 190],
                    number: 1
                }
            }
        },
        wings: {
            top: {
                doubleside: !0,
                offset: {
                    x: 10,
                    y: 60,
                    z: 5
                },
                length: [30],
                width: [50, 30],
                angle: [60],
                position: [0, 50],
                texture: [3],
                bump: {
                    position: 10,
                    size: 10
                }
            },
            side: {
                doubleside: !0,
                offset: {
                    x: 10,
                    y: 70,
                    z: 5
                },
                length: [30],
                width: [40, 20],
                angle: [-13],
                position: [0, 60],
                texture: [63],
                bump: {
                    position: 10,
                    size: 10
                }
            },
            wings: {
                offset: {
                    x: 0,
                    y: 35,
                    z: 0
                },
                length: [80],
                width: [100, 70],
                angle: [0],
                position: [-80, 50],
                texture: [4],
                bump: {
                    position: 10,
                    size: 15
                }
            }
        }
    }), llll1.add({
        name: "Howler",
        level: 5,
        model: 6,
        size: 1.2,
        zoom: 1,
        specs: {
            shield: {
                capacity: [275, 340],
                reload: [5, 7]
            },
            generator: {
                capacity: [80, 110],
                reload: [35, 50]
            },
            ship: {
                mass: 225,
                speed: [85, 98],
                rotation: [70, 95],
                acceleration: [90, 120]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-145, -135, -125, -130, -100, -55, 5, 60, 85, 120, 118],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 5, 8, 20, 30, 35, 35, 30, 22, 0],
                height: [0, 5, 5, 8, 15, 20, 33, 30, 30, 22, 0],
                texture: [17, 4, 13, 3, 2, 1, 10, 31, 12, 17],
                propeller: !0,
                laser: {
                    damage: [2.5, 4],
                    rate: 6,
                    speed: [160, 210],
                    number: 2,
                    recoil: 0,
                    type: 1
                }
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -80,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: arrayMult([-10, -8, 15, 30], 2),
                    z: [-4, -4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: arrayMult([0, 3, 8, 6], 2),
                height: arrayMult([0, 2, 8, 6], 2),
                texture: [2, 9, 31]
            },
            front1: {
                section_segments: 8,
                offset: {
                    x: 22,
                    y: -125,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, -5],
                    y: arrayMult([-15, -8, -3, -5, 15, 40], 1.5),
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: arrayMult([0, 3, 3, 4, 8, 6], 1.5),
                height: arrayMult([0, 3, 3, 4, 8, 6], 1.5),
                texture: [17, 4, 3],
                laser: {
                    damage: [9, 15],
                    rate: 1,
                    speed: [150, 200],
                    number: 1,
                    recoil: 25,
                    type: 2
                }
            },
            front2: {
                section_segments: 10,
                offset: {
                    x: 32,
                    y: -95,
                    z: 0
                },
                position: {
                    x: [-4, -4, 0, -1],
                    y: arrayMult([0, -8, 15, 40], 1.5),
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: arrayMult([0, 5, 8, 6], 1.5),
                height: arrayMult([0, 8, 12, 10], 1.5),
                texture: [13, 2, 63],
                angle: 0
            },
            propulsors: {
                section_segments: 8,
                offset: {
                    x: 40,
                    y: 30,
                    z: -5
                },
                position: {
                    x: [-12, -12, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -100, -60, 20, 50, 48],
                    z: [5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: arrayMult([0, 3, 10, 20, 12, 0], 1.2),
                height: arrayMult([0, 3, 13, 20, 12, 0], 1.2),
                texture: [4, 31, 10, 13, 17],
                propeller: !0
            },
            uwing: {
                section_segments: [0, 60, 120, 180],
                offset: {
                    x: -20,
                    y: -30,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-65, -70, 40, 80, 110],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 25, 25, 0],
                height: [0, 10, 25, 25, 20],
                texture: [4]
            }
        },
        wings: {
            main: {
                doubleside: !0,
                offset: {
                    x: 20,
                    y: -20,
                    z: 5
                },
                length: [89, 0],
                width: [130, 60],
                angle: [-12, -12],
                position: [0, 80, 80],
                texture: 18,
                bump: {
                    position: 20,
                    size: 5
                }
            },
            sides: {
                doubleside: !0,
                offset: {
                    x: 20,
                    y: -20,
                    z: 10
                },
                length: [84, -3, 5, 12, -5],
                width: [25, 25, 140, 140, 50, 50],
                angle: [-12, 5, 5, 5, 5],
                position: [40, 85, 55, 55, 70, 70],
                texture: [63, 4, 63, 4, 17],
                bump: {
                    position: 35,
                    size: 15
                }
            }
        }
    }), llll1.add({
        name: "Bat-Defender",
        level: 5,
        model: 7,
        size: 1.8,
        specs: {
            shield: {
                capacity: [300, 400],
                reload: [7, 10]
            },
            generator: {
                capacity: [70, 100],
                reload: [25, 35]
            },
            ship: {
                mass: 350,
                speed: [70, 90],
                rotation: [40, 70],
                acceleration: [90, 100]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-99, -100, -97, -45, -40, -25, -23, 15, 20, 55, 50]
                },
                width: [0, 5, 5, 30, 17, 27, 25, 25, 27, 15, 5],
                height: [0, 2, 2, 25, 27, 27, 25, 25, 27, 20, 0],
                texture: [6, 5, 1, 4, 6, 4, 63, 6, 2, 12]
            },
            propulsors: {
                section_segments: 8,
                offset: {
                    x: 30,
                    y: -20,
                    z: 0
                },
                position: {
                    x: [-5, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [30, 55, 60, 80, 95, 100, 90, 95]
                },
                width: [12, 14, 14, 10, 12, 10, 0],
                height: [5, 14, 14, 10, 12, 10, 0],
                texture: [2, 6, 4, 11, 6, 12],
                propeller: !0
            },
            lasers: {
                section_segments: 8,
                offset: {
                    x: 70,
                    y: -40,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [25, 90, 10, 50, 60]
                },
                width: [5, 5, 0, 10, 5],
                height: [5, 1, 0, 0, 5],
                texture: [63, 6],
                angle: 3,
                laser: {
                    damage: [10, 15],
                    rate: 2.5,
                    type: 1,
                    speed: [150, 200],
                    number: 1,
                    error: 0
                },
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -45,
                    z: 8
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-50, -40, -25, 0, 5],
                    z: [-10, -5, 0, 0, 0]
                },
                width: [0, 5, 10, 10, 0],
                height: [0, 10, 15, 16, 0],
                texture: [9]
            }
        },
        wings: {
            wings: {
                offset: {
                    x: 20,
                    y: 0,
                    z: 0
                },
                length: [35, 15, 20, 15],
                width: [100, 50, 50, 40, 45],
                angle: [-10, 20, 0, 0],
                position: [0, 0, 10, 30, 0],
                texture: [11, 4],
                bump: {
                    position: -20,
                    size: 15
                }
            },
            side: {
                doubleside: !0,
                offset: {
                    x: 105,
                    y: 30,
                    z: -30
                },
                length: [30, 10, 30],
                width: [40, 60, 60, 40],
                angle: [90, 110, 110, 90],
                position: [0, -30, -30, 0],
                texture: [63],
                bump: {
                    position: 0,
                    size: 15
                }
            }
        }
    }), llll1.add({
        name: "Advanced-Fighter",
        level: 6,
        model: 1,
        size: 2,
        specs: {
            shield: {
                capacity: [200, 350],
                reload: [4, 6]
            },
            generator: {
                capacity: [120, 200],
                reload: [50, 60]
            },
            ship: {
                mass: 400,
                speed: [70, 80],
                rotation: [30, 50],
                acceleration: [70, 100]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-100, -80, -90, -50, 0, 50, 100, 90]
                },
                width: [0, 5, 15, 25, 40, 25, 20, 0],
                height: [0, 5, 10, 30, 25, 20, 10, 0],
                propeller: !0,
                texture: [4, 4, 1, 1, 10, 1, 1],
                laser: {
                    damage: [90, 150],
                    rate: 1,
                    type: 2,
                    speed: [180, 240],
                    number: 1,
                    recoil: 150,
                    error: 0
                }
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: -35,
                    z: 33
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -20, 10, 30, 40],
                    z: [0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 12, 15, 10, 0],
                height: [0, 12, 18, 12, 0],
                propeller: !1,
                texture: [7, 9, 9, 7]
            },
            side_propellers: {
                section_segments: 10,
                offset: {
                    x: 30,
                    y: 30,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-50, -20, 0, 20, 80, 70]
                },
                width: [15, 20, 10, 25, 10, 0],
                height: [10, 15, 15, 10, 5, 0],
                angle: 0,
                propeller: !0,
                texture: [3, 63, 4, 10, 3]
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 70,
                    y: 50,
                    z: -30
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -45, -20, 0, 20, 50, 55]
                },
                width: [0, 5, 10, 10, 15, 10, 0],
                height: [0, 5, 15, 15, 10, 5, 0],
                angle: 0,
                propeller: !1,
                texture: [4, 4, 10, 4, 63, 4],
                laser: {
                    damage: [6, 12],
                    rate: 3,
                    type: 1,
                    speed: [100, 150],
                    number: 1,
                    error: 0
                }
            },
            cannons2: {
                section_segments: 12,
                offset: {
                    x: 95,
                    y: 50,
                    z: -40
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [-50, -20, 40, 50]
                },
                width: [2, 5, 5, 2],
                height: [2, 15, 15, 2],
                angle: 0,
                propeller: !1,
                texture: 6,
                laser: {
                    damage: [4, 10],
                    rate: 3,
                    type: 1,
                    speed: [100, 150],
                    number: 1,
                    error: 0
                }
            }
        },
        wings: {
            main: {
                length: [100, 30, 20],
                width: [100, 50, 40, 30],
                angle: [-25, 20, 25],
                position: [30, 70, 50, 50],
                bump: {
                    position: -20,
                    size: 20
                },
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                texture: [11, 11, 63],
                doubleside: !0
            },
            winglets: {
                length: [40],
                width: [40, 20, 30],
                angle: [10, -10],
                position: [-50, -70, -65],
                bump: {
                    position: 0,
                    size: 30
                },
                texture: 63
            }
        }
    }), llll1.add({
        name: "Scorpion",
        level: 6,
        model: 2,
        size: 2,
        specs: {
            shield: {
                capacity: [225, 400],
                reload: [5, 7]
            },
            generator: {
                capacity: [80, 175],
                reload: [38, 50]
            },
            ship: {
                mass: 450,
                speed: [75, 90],
                rotation: [50, 70],
                acceleration: [80, 100]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -40, -30, 0, 50, 100, 120, 110],
                    z: [-10, -5, 0, 0, 0, 0, 20, 20]
                },
                width: [0, 12, 20, 15, 25, 10, 5],
                height: [0, 10, 15, 25, 15, 10, 5],
                texture: [1, 4, 63, 11, 11, 4],
                propeller: !1
            },
            tail: {
                section_segments: 14,
                offset: {
                    x: 0,
                    y: 70,
                    z: 50
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-70, -25, -10, 20, 40, 50],
                    z: [0, 0, 0, 0, -10, -20]
                },
                width: [0, 5, 35, 25, 5, 5],
                height: [0, 5, 25, 20, 5, 5],
                texture: [6, 4, 63, 10, 4],
                laser: {
                    damage: [50, 100],
                    rate: .9,
                    type: 2,
                    speed: [170, 230],
                    number: 1,
                    angle: 0,
                    error: 0,
                    recoil: 100
                }
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 13,
                    y: -44,
                    z: 12
                },
                position: {
                    x: [-5, 0, 0, 0, 0],
                    y: [-15, -5, 0, 5, 15],
                    z: [0, 0, 0, 1, 0]
                },
                width: [0, 8, 10, 8, 0],
                height: [0, 5, 5, 5, 0],
                texture: [6, 5],
                propeller: !1
            },
            deco: {
                section_segments: 8,
                offset: {
                    x: 70,
                    y: 0,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 10, -5, 0, 0, 0],
                    y: [-115, -80, -100, -60, -30, -10, 20, 0]
                },
                width: [1, 5, 10, 15, 15, 20, 10, 0],
                height: [1, 5, 15, 20, 35, 30, 10, 0],
                texture: [6, 6, 1, 1, 11, 2, 12],
                laser: {
                    damage: [2, 3],
                    rate: 1.8,
                    type: 1,
                    speed: [130, 170],
                    number: 2,
                    angle: 5,
                    error: 0
                },
                propeller: !0
            },
            wingends: {
                section_segments: 8,
                offset: {
                    x: 105,
                    y: -80,
                    z: -10
                },
                position: {
                    x: [0, 2, 4, 2, 0],
                    y: [-20, -10, 0, 10, 20]
                },
                width: [2, 3, 6, 3, 2],
                height: [5, 15, 22, 17, 5],
                texture: 4,
                angle: 0,
                propeller: !1
            }
        },
        wings: {
            main: {
                length: [80, 30],
                width: [40, 30, 20],
                angle: [-10, 20],
                position: [30, -50, -80],
                texture: 63,
                bump: {
                    position: 30,
                    size: 10
                }
            },
            font: {
                length: [80, 30],
                width: [20, 15],
                angle: [-10, 20],
                position: [-20, -40],
                texture: 4,
                bump: {
                    position: 30,
                    size: 10
                }
            }
        }
    }), llll1.add({
        name: "Marauder",
        level: 6,
        model: 3,
        size: 1.4,
        specs: {
            shield: {
                capacity: [210, 350],
                reload: [8, 11]
            },
            generator: {
                capacity: [85, 160],
                reload: [25, 40]
            },
            ship: {
                mass: 250,
                speed: [70, 110],
                rotation: [60, 80],
                acceleration: [80, 120]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-65, -75, -55, -40, 0, 30, 60, 80, 90, 80],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 6, 18, 23, 30, 25, 25, 30, 35, 0],
                height: [0, 5, 10, 12, 12, 20, 15, 15, 15, 0],
                texture: [6, 4, 1, 10, 1, 1, 11, 12, 17],
                propeller: !0,
                laser: {
                    damage: [10, 16],
                    rate: 10,
                    type: 1,
                    speed: [170, 200],
                    recoil: 0,
                    number: 1,
                    error: 0
                }
            },
            cockpit: {
                section_segments: [40, 90, 180, 270, 320],
                offset: {
                    x: 0,
                    y: -85,
                    z: 22
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [15, 35, 60, 95, 125],
                    z: [-1, -2, -1, -1, 3]
                },
                width: [5, 12, 14, 15, 5],
                height: [0, 12, 15, 15, 0],
                texture: [8.98, 8.98, 4]
            },
            outriggers: {
                section_segments: 10,
                offset: {
                    x: 25,
                    y: 0,
                    z: -10
                },
                position: {
                    x: [-5, -5, 8, -5, 0, 0, 0, 0, 0, 0],
                    y: [-100, -125, -45, 0, 30, 40, 70, 80, 100, 90],
                    z: [10, 10, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 6, 10, 10, 15, 15, 15, 15, 10, 0],
                height: [0, 10, 20, 25, 25, 25, 25, 25, 20, 0],
                texture: [13, 4, 4, 63, 4, 18, 4, 13, 17],
                laser: {
                    damage: [4, 8],
                    rate: 3,
                    type: 1,
                    speed: [110, 140],
                    recoil: 0,
                    number: 1,
                    error: 0
                },
                propeller: !0
            },
            intake: {
                section_segments: 12,
                offset: {
                    x: 25,
                    y: -5,
                    z: 10
                },
                position: {
                    x: [0, 0, 5, 0, -3, 0, 0, 0, 0, 0],
                    y: [-10, -30, -5, 35, 60, 70, 85, 100, 85],
                    z: [0, -6, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 10, 10, 15, 10, 10, 5, 0],
                height: [0, 15, 15, 20, 20, 15, 15, 5, 0],
                texture: [6, 4, 63, 4, 63, 18, 4, 17]
            }
        },
        wings: {
            main: {
                length: [20, 70, 35],
                width: [50, 55, 40, 20],
                angle: [0, -20, 0],
                position: [20, 20, 70, 25],
                texture: [3, 18, 63],
                doubleside: !0,
                bump: {
                    position: 30,
                    size: 15
                },
                offset: {
                    x: 0,
                    y: 0,
                    z: 13
                }
            },
            spoiler: {
                length: [20, 45, 0, 5],
                width: [40, 40, 20, 30, 0],
                angle: [0, 20, 90, 90],
                position: [60, 60, 80, 80, 90],
                texture: [10, 11, 63],
                doubleside: !0,
                bump: {
                    position: 30,
                    size: 18
                },
                offset: {
                    x: 0,
                    y: 0,
                    z: 30
                }
            },
            font: {
                length: [37],
                width: [40, 15],
                angle: [-10],
                position: [0, -45],
                texture: [63],
                doubleside: !0,
                bump: {
                    position: 30,
                    size: 10
                },
                offset: {
                    x: 35,
                    y: -20,
                    z: 10
                }
            },
            shields: {
                doubleside: !0,
                offset: {
                    x: 12,
                    y: 60,
                    z: -15
                },
                length: [0, 15, 45, 20],
                width: [30, 30, 65, 65, 30, 30],
                angle: [30, 30, 90, 150],
                position: [10, 10, 0, 0, 10],
                texture: [4],
                bump: {
                    position: 0,
                    size: 4
                }
            }
        }
    }), llll1.add({
        name: "Condor",
        level: 6,
        model: 4,
        size: 1.5,
        specs: {
            shield: {
                capacity: [225, 400],
                reload: [7, 10]
            },
            generator: {
                capacity: [70, 130],
                reload: [30, 48]
            },
            ship: {
                mass: 200,
                speed: [75, 105],
                rotation: [50, 70],
                acceleration: [80, 120]
            }
        },
        bodies: {
            main: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-110, -95, -100, -100, -45, -40, -25, -23, 15, 20, 55, 80, 100, 90],
                    z: [-10, -9, -8, -7, -6, -4, -2, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 2, 5, 10, 25, 27, 27, 25, 25, 27, 40, 35, 30, 0],
                height: [0, 2, 5, 10, 25, 27, 27, 25, 25, 27, 20, 15, 10, 0],
                texture: [6, 2, 3, 10, 5, 63, 5, 2, 5, 3, 63, 11, 4],
                propeller: !0,
                laser: {
                    damage: [30, 60],
                    rate: 2,
                    type: 2,
                    speed: [150, 200],
                    number: 1,
                    angle: 0,
                    error: 0
                }
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 75,
                    y: 30,
                    z: -25
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -45, -20, 0, 20, 50, 55]
                },
                width: [0, 5, 10, 10, 10, 10, 0],
                height: [0, 5, 15, 15, 10, 5, 0],
                angle: 0,
                laser: {
                    damage: [3, 6],
                    rate: 4,
                    type: 1,
                    speed: [100, 130],
                    number: 1,
                    angle: 0,
                    error: 0
                },
                propeller: !1,
                texture: [6, 4, 10, 4, 63, 4]
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: -60,
                    z: 8
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [-25, -8, 20, 65]
                },
                width: [0, 10, 10, 0],
                height: [0, 12, 15, 5],
                texture: [9]
            }
        },
        wings: {
            back: {
                offset: {
                    x: 0,
                    y: 25,
                    z: 10
                },
                length: [90, 40],
                width: [70, 50, 30],
                angle: [-30, 40],
                position: [0, 20, 0],
                texture: [11, 63],
                doubleside: !0,
                bump: {
                    position: 10,
                    size: 20
                }
            },
            front: {
                offset: {
                    x: 0,
                    y: 55,
                    z: 10
                },
                length: [90, 40],
                width: [70, 50, 30],
                angle: [-30, -40],
                position: [-60, -20, -20],
                texture: [11, 63],
                doubleside: !0,
                bump: {
                    position: 10,
                    size: 10
                }
            }
        }
    }), llll1.add({
        name: "A-Speedster",
        level: 6,
        model: 5,
        size: 1.5,
        specs: {
            shield: {
                capacity: [200, 300],
                reload: [6, 8]
            },
            generator: {
                capacity: [80, 140],
                reload: [30, 45]
            },
            ship: {
                mass: 175,
                speed: [90, 115],
                rotation: [60, 80],
                acceleration: [90, 140]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-100, -95, 0, 0, 70, 65],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 40, 20, 20, 0],
                height: [0, 5, 30, 30, 15, 0],
                texture: [6, 11, 5, 63, 12],
                propeller: !0,
                laser: {
                    damage: [38, 84],
                    rate: 1,
                    type: 2,
                    speed: [175, 230],
                    recoil: 50,
                    number: 1,
                    error: 0
                }
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -60,
                    z: 15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-20, 0, 20, 40, 50],
                    z: [-7, -5, 0, 0, 0]
                },
                width: [0, 10, 10, 10, 0],
                height: [0, 10, 15, 12, 0],
                texture: [9]
            },
            side_propulsors: {
                section_segments: 10,
                offset: {
                    x: 50,
                    y: 25,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 80, 70]
                },
                width: [0, 15, 20, 20, 20, 15, 15, 20, 10, 0],
                height: [0, 15, 20, 20, 20, 15, 15, 20, 10, 0],
                propeller: !0,
                texture: [4, 4, 2, 2, 5, 63, 5, 4, 12]
            },
            cannons: {
                section_segments: 12,
                offset: {
                    x: 30,
                    y: 40,
                    z: 45
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -45, -20, 0, 20, 30, 40]
                },
                width: [0, 5, 7, 10, 3, 5, 0],
                height: [0, 5, 7, 8, 3, 5, 0],
                angle: -10,
                laser: {
                    damage: [8, 12],
                    rate: 2,
                    type: 1,
                    speed: [100, 130],
                    number: 1,
                    angle: -10,
                    error: 0
                },
                propeller: !1,
                texture: [6, 4, 10, 4, 63, 4]
            }
        },
        wings: {
            join: {
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                length: [40, 0],
                width: [10, 20],
                angle: [-1],
                position: [0, 30],
                texture: [63],
                bump: {
                    position: 0,
                    size: 25
                }
            },
            winglets: {
                offset: {
                    x: 0,
                    y: -40,
                    z: 10
                },
                doubleside: !0,
                length: [45, 10],
                width: [5, 20, 30],
                angle: [50, -10],
                position: [90, 80, 50],
                texture: [4],
                bump: {
                    position: 10,
                    size: 30
                }
            }
        }
    }), llll1.add({
        name: "Rock-Tower",
        level: 6,
        model: 6,
        size: 2.1,
        specs: {
            shield: {
                capacity: [300, 500],
                reload: [8, 11]
            },
            generator: {
                capacity: [75, 115],
                reload: [35, 45]
            },
            ship: {
                mass: 450,
                speed: [75, 90],
                rotation: [50, 70],
                acceleration: [80, 90]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -85, -70, -60, -20, -25, 40, 85, 70],
                    z: [-10, -8, -5, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 40, 45, 10, 12, 30, 30, 20, 0],
                height: [0, 10, 12, 8, 12, 10, 25, 20, 0],
                texture: [4, 63, 4, 4, 4, 11, 10, 12],
                propeller: !0
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 30,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -20, 0, 10, 20, 30],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 15, 15, 10, 5],
                height: [0, 10, 15, 15, 10, 5],
                texture: 9,
                propeller: !1
            },
            dimeds_banhammer: {
                section_segments: 6,
                offset: {
                    x: 25,
                    y: -70,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-20, -10, -20, 0, 10, 12],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 0, 5, 7, 6, 0],
                height: [0, 0, 5, 7, 6, 0],
                texture: [6, 6, 6, 10, 12],
                angle: 0,
                laser: {
                    damage: [4, 6],
                    rate: 8,
                    type: 1,
                    speed: [150, 230],
                    number: 1,
                    error: 5
                }
            },
            propulsors: {
                section_segments: 8,
                offset: {
                    x: 30,
                    y: 50,
                    z: 0
                },
                position: {
                    x: [0, 0, 5, 5, 0, 0, 0],
                    y: [-45, -50, -20, 0, 20, 50, 40],
                    z: [0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 10, 15, 15, 15, 10, 0],
                height: [0, 15, 20, 25, 20, 10, 0],
                texture: [11, 2, 3, 4, 5, 12],
                angle: 0,
                propeller: !0
            }
        },
        wings: {
            main: {
                length: [55, 15],
                width: [60, 40, 30],
                angle: [-10, 20],
                position: [30, 40, 30],
                texture: 63,
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 20,
                    z: -5
                },
                bump: {
                    position: 30,
                    size: 20
                }
            },
            finalizer_fins: {
                length: [20],
                width: [20, 10],
                angle: [-70],
                position: [-42, -30],
                texture: 63,
                doubleside: !0,
                offset: {
                    x: 35,
                    y: -35,
                    z: 0
                },
                bump: {
                    position: 0,
                    size: 30
                }
            }
        }
    }), llll1.add({
        name: "Barracuda",
        level: 6,
        model: 7,
        size: 2.4,
        specs: {
            shield: {
                capacity: [300, 400],
                reload: [8, 12]
            },
            generator: {
                capacity: [100, 150],
                reload: [8, 14]
            },
            ship: {
                mass: 675,
                speed: [70, 90],
                rotation: [30, 45],
                acceleration: [130, 150],
                dash: {
                    rate: 2,
                    burst_speed: [160, 200],
                    speed: [120, 150],
                    acceleration: [70, 70],
                    initial_energy: [50, 75],
                    energy: [20, 30]
                }
            }
        },
        bodies: {
            body: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -100, -60, -10, 0, 20, 50, 80, 100, 90],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 20, 25, 35, 40, 40, 35, 30, 0],
                height: [0, 5, 40, 45, 40, 60, 70, 60, 30, 0],
                texture: [10, 2, 10, 2, 3, 13, 13, 63, 12],
                propeller: !0
            },
            front: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -20,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-90, -85, -70, -60, -20]
                },
                width: [0, 40, 45, 10, 12],
                height: [0, 15, 18, 8, 12],
                texture: [8, 63, 4, 4, 4],
                propeller: !0
            },
            propeller: {
                section_segments: 10,
                offset: {
                    x: 40,
                    y: 40,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 70, 60]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 20, 15, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 18, 8, 0],
                texture: [4, 4, 10, 3, 3, 63, 4, 63, 12],
                propeller: !0
            },
            sides: {
                section_segments: 6,
                angle: 90,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-80, -75, -60, -50, -10, 10, 50, 60, 75, 80],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 30, 35, 10, 12, 12, 10, 35, 30, 0],
                height: [0, 10, 12, 8, 12, 12, 8, 12, 10, 0],
                texture: [4, 63, 4, 4, 4, 4, 4, 63, 4]
            },
            cockpit: {
                section_segments: 12,
                offset: {
                    x: 0,
                    y: -20,
                    z: 30
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -20, 0, 10, 30, 50]
                },
                width: [0, 12, 18, 20, 15, 0],
                height: [0, 20, 22, 24, 20, 0],
                texture: [9]
            }
        },
        wings: {
            top: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 20,
                    z: 15
                },
                length: [70],
                width: [70, 30],
                angle: [90],
                position: [0, 30],
                texture: [63],
                bump: {
                    position: 10,
                    size: 30
                }
            },
            top2: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 51,
                    z: 5
                },
                length: [70],
                width: [50, 20],
                angle: [90],
                position: [0, 60],
                texture: [63],
                bump: {
                    position: 10,
                    size: 30
                }
            }
        }
    }), llll1.add({
        name: "O-Defender",
        level: 6,
        model: 8,
        size: 2.2,
        specs: {
            shield: {
                capacity: [400, 550],
                reload: [10, 13]
            },
            generator: {
                capacity: [70, 100],
                reload: [25, 40]
            },
            ship: {
                mass: 500,
                speed: [70, 80],
                rotation: [30, 40],
                acceleration: [60, 80]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [-90, -88, 0, 90, 91]
                },
                width: [5, 6, 25, 10, 20],
                height: [2, 10, 40, 20, 20],
                texture: [63, 1, 10],
                propeller: !0,
                laser: {
                    damage: [35, 60],
                    rate: 2,
                    type: 2,
                    speed: [130, 180],
                    number: 1,
                    angle: 0,
                    error: 0
                }
            },
            side: {
                section_segments: 10,
                offset: {
                    x: 50,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [-40, -5, 15, 25, 20, 0, -50],
                    y: [-100, -70, -40, -10, 20, 50, 90]
                },
                width: [5, 20, 20, 20, 20, 20, 5],
                height: [15, 25, 30, 30, 30, 25, 0],
                texture: [0, 1, 2, 3, 4, 63]
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -60,
                    z: 18
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, 0, 20, 30, 40]
                },
                width: [0, 5, 10, 10, 0],
                height: [0, 5, 10, 12, 0],
                texture: [9]
            },
            top_propulsor: {
                section_segments: 15,
                offset: {
                    x: 0,
                    y: 0,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [80, 95, 100, 90]
                },
                width: [5, 20, 10, 0],
                height: [5, 15, 5, 0],
                propeller: !0,
                texture: [1, 63, 12]
            },
            bottom_propulsor: {
                section_segments: 15,
                offset: {
                    x: 0,
                    y: 0,
                    z: -10
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [80, 95, 100, 90]
                },
                width: [5, 20, 10, 0],
                height: [5, 15, 5, 0],
                propeller: !0,
                texture: [1, 63, 12]
            }
        },
        wings: {
            join: {
                offset: {
                    x: 0,
                    y: 20,
                    z: 0
                },
                length: [80, 0],
                width: [130, 50],
                angle: [-1],
                position: [0, -30],
                texture: [8],
                bump: {
                    position: -20,
                    size: 15
                }
            }
        }
    }), llll1.add({
        name: "Odyssey",
        level: 7,
        model: 1,
        size: 4,
        specs: {
            shield: {
                capacity: [750, 750],
                reload: [15, 15]
            },
            generator: {
                capacity: [330, 330],
                reload: [150, 150]
            },
            ship: {
                mass: 700,
                speed: [45, 45],
                rotation: [20, 20],
                acceleration: [150, 150]
            }
        },
        tori: {
            circle: {
                segments: 20,
                radius: 95,
                section_segments: 12,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0],
                    y: [0],
                    z: [0]
                },
                width: [20],
                height: [8],
                texture: [63, 63, 4, 10, 4, 4, 10, 4, 63, 63, 63, 63, 3, 10, 3, 3, 10, 3, 63]
            }
        },
        bodies: {
            main: {
                section_segments: 20,
                offset: {
                    x: 0,
                    y: -10,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-130, -130, -85, -70, -60, -20, -25, 40, 40, 100, 90]
                },
                width: [0, 20, 40, 45, 10, 12, 30, 30, 40, 30, 0],
                height: [0, 20, 25, 25, 10, 12, 25, 25, 20, 10, 0],
                texture: [4, 15, 63, 4, 4, 4, 11, 10, 4, 12]
            },
            laser1: {
                section_segments: 12,
                offset: {
                    x: 110,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-25, -30, -20, 0, 20, 30, 20]
                },
                width: [0, 3, 5, 5, 5, 3, 0],
                height: [0, 3, 5, 5, 5, 3, 0],
                texture: [12, 6, 63, 63, 6, 12],
                laser: {
                    damage: [20, 20],
                    rate: 3,
                    type: 1,
                    speed: [200, 200],
                    number: 1,
                    error: 0
                }
            },
            laser2: {
                section_segments: 12,
                offset: {
                    x: 110,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-25, -30, -20, 0, 20, 30, 20]
                },
                width: [0, 3, 5, 5, 5, 3, 0],
                height: [0, 3, 5, 5, 5, 3, 0],
                texture: [12, 6, 63, 63, 6, 12],
                angle: 180,
                laser: {
                    damage: [20, 20],
                    rate: 3,
                    type: 1,
                    speed: [200, 200],
                    number: 1,
                    error: 0
                }
            },
            cannon: {
                section_segments: 6,
                offset: {
                    x: 0,
                    y: -115,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0],
                    y: [-25, -30, -20, 0]
                },
                width: [0, 15, 9, 7],
                height: [0, 10, 9, 7],
                texture: [6, 6, 6, 10],
                laser: {
                    damage: [250, 250],
                    rate: 1,
                    type: 1,
                    speed: [100, 100],
                    number: 1,
                    error: 0,
                    recoil: 300
                }
            },
            cockpit: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -10, 0, 10, 30]
                },
                width: [0, 12, 15, 10, 0],
                height: [0, 20, 22, 18, 0],
                texture: [9]
            },
            bumpers: {
                section_segments: 8,
                offset: {
                    x: 85,
                    y: 20,
                    z: 0
                },
                position: {
                    x: [-5, 0, 5, 10, 5, 0, -5],
                    y: [-85, -80, -40, 0, 20, 50, 55]
                },
                width: [0, 10, 15, 15, 15, 5, 0],
                height: [0, 20, 35, 35, 25, 15, 0],
                texture: [11, 2, 63, 4, 3],
                angle: 0
            },
            toppropulsors: {
                section_segments: 10,
                offset: {
                    x: 17,
                    y: 50,
                    z: 15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 50, 40]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                texture: [3, 4, 10, 3, 3, 63, 4],
                propeller: !0
            },
            bottompropulsors: {
                section_segments: 10,
                offset: {
                    x: 17,
                    y: 50,
                    z: -15
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-20, -15, 0, 10, 20, 25, 30, 40, 50, 40]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                texture: [3, 4, 10, 3, 3, 63, 4],
                propeller: !0
            }
        },
        wings: {
            topjoin: {
                offset: {
                    x: 0,
                    y: -3,
                    z: 0
                },
                doubleside: !0,
                length: [100],
                width: [20, 20],
                angle: [25],
                position: [0, 0, 0, 50],
                texture: [1],
                bump: {
                    position: 10,
                    size: 30
                }
            },
            bottomjoin: {
                offset: {
                    x: 0,
                    y: -3,
                    z: 0
                },
                doubleside: !0,
                length: [100],
                width: [20, 20],
                angle: [-25],
                position: [0, 0, 0, 50],
                texture: [1],
                bump: {
                    position: -10,
                    size: 30
                }
            }
        }
    }), llll1.add({
        name: "Shadow X-3",
        level: 7,
        model: 2,
        size: 2.5,
        specs: {
            shield: {
                capacity: [400, 400],
                reload: [12, 12]
            },
            generator: {
                capacity: [225, 225],
                reload: [50, 50]
            },
            ship: {
                mass: 300,
                speed: [130, 130],
                rotation: [35, 35],
                acceleration: [90, 90]
            }
        },
        bodies: {
            main: {
                section_segments: 20,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-130, -128, -115, -70, -40, 0, 40, 70, 80, 90, 100]
                },
                width: [0, 5, 10, 20, 20, 20, 20, 30, 30, 30, 20, 0],
                height: [0, 5, 10, 30, 20, 10, 10, 15, 15, 15, 10, 10],
                texture: [12, 3, 15, 4, 63, 63, 4, 4, 5],
                laser: {
                    damage: [200, 200],
                    rate: 1,
                    type: 1,
                    speed: [200, 200],
                    number: 1,
                    error: 0,
                    recoil: 500
                }
            },
            air: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [0, -80, -30, -10, 10, 30, 50]
                },
                width: [0, 25, 35, 30, 30, 32, 20],
                height: [0, 15, 10, 10, 10, 10, 10, 15, 15, 15, 10, 10],
                texture: [4, 3, 2, 2, 2, 3]
            },
            back: {
                section_segments: 10,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0],
                    y: [90, 95, 100, 105, 90]
                },
                width: [10, 15, 18, 22, 2],
                height: [3, 5, 7, 8, 2],
                texture: [63],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: -30,
                    z: 18
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-65, -25, 0, 25, 60, 90, 100],
                    z: [0, 0, 0, 0, -10, -8, -10]
                },
                width: [0, 10, 15, 10, 20, 15, 10],
                height: [0, 15, 20, 10, 10, 10, 10],
                texture: [9, 9, 9, 10, 63, 3]
            },
            laser: {
                section_segments: 10,
                offset: {
                    x: 90,
                    y: 10,
                    z: -19
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -25, 0, 10, 20, 25, 30, 40, 70, 60]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 10, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                texture: [6, 4, 10, 3, 4, 3, 2],
                propeller: !0,
                laser: {
                    damage: [7, 7],
                    rate: 3,
                    type: 1,
                    speed: [150, 150],
                    number: 1
                }
            },
            laser2: {
                section_segments: 10,
                offset: {
                    x: 50,
                    y: -20,
                    z: -20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -25, 0, 10, 20, 25, 30, 40, 70, 60]
                },
                width: [0, 10, 15, 15, 15, 10, 10, 15, 12, 0],
                height: [0, 10, 15, 15, 15, 10, 10, 15, 5, 0],
                texture: [6, 4, 10, 3, 4, 3, 2],
                propeller: !0,
                laser: {
                    damage: [7, 7],
                    rate: 4,
                    type: 1,
                    speed: [150, 150],
                    number: 1
                }
            }
        },
        wings: {
            wings: {
                offset: {
                    x: 10,
                    y: 0,
                    z: 0
                },
                length: [35, 15, 30, 25],
                width: [100, 50, 60, 30, 45],
                angle: [-10, 20, 0, 0],
                position: [0, 0, 10, 30, -10],
                texture: [4],
                bump: {
                    position: -20,
                    size: 15
                }
            }
        }
    }), llll1.add({
        name: "Bastion",
        level: 7,
        model: 3,
        size: 4,
        specs: {
            shield: {
                capacity: [400, 400],
                reload: [20, 20]
            },
            generator: {
                capacity: [500, 500],
                reload: [100, 100]
            },
            ship: {
                mass: 350,
                speed: [80, 80],
                rotation: [15, 15],
                acceleration: [125, 125]
            }
        },
        bodies: {
            main: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 50,
                    z: 10
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-40, -50, -20, 0, 20, 40, 25],
                    z: [0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 5, 22, 18, 16, 15, 0],
                height: [0, 2, 12, 16, 16, 15, 0],
                texture: [10, 1, 1, 10, 8, 17],
                propeller: !0
            },
            thrusters: {
                section_segments: 8,
                offset: {
                    x: 40,
                    y: 43,
                    z: -24
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-25, -20, 0, 20, 40, 30],
                    z: [0, 0, 0, 0, 0, 0]
                },
                width: [0, 8, 12, 8, 8, 0],
                height: [0, 12, 12, 8, 8, 0],
                texture: [63, 2, 2, 2, 17],
                propeller: !0
            },
            cockpit: {
                section_segments: 8,
                offset: {
                    x: 0,
                    y: 30,
                    z: 20
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-15, -10, 0, 11, 35],
                    z: [-5, -3, -1, 0, 0]
                },
                width: [0, 5, 10, 10, 0],
                height: [0, 3, 5, 7, 0],
                texture: [9]
            },
            cannon1: {
                section_segments: 4,
                offset: {
                    x: 10,
                    y: -80,
                    z: 1
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, 0, 20, 30, 40],
                    z: [0, 0, 0, 0, 0]
                },
                width: [0, 2, 4, 7, 3],
                height: [0, 1, 3, 6, 0],
                texture: [17, 4],
                laser: {
                    damage: [6, 6],
                    rate: 5,
                    type: 1,
                    speed: [200, 200],
                    number: 1
                }
            },
            cannon2: {
                section_segments: 4,
                offset: {
                    x: 42,
                    y: -129,
                    z: 8
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, 0, 20, 30, 40],
                    z: [0, 0, 0, 0, 0]
                },
                width: [0, 2, 4, 7, 3],
                height: [0, 1, 3, 6, 0],
                texture: [17, 4],
                angle: 3,
                laser: {
                    damage: [8, 8],
                    rate: 4,
                    type: 1,
                    speed: [180, 180],
                    number: 1
                }
            },
            cannon3: {
                section_segments: 4,
                offset: {
                    x: 75,
                    y: -105,
                    z: -8
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-10, 0, 20, 30, 40],
                    z: [0, 0, 0, 0, 0]
                },
                width: [0, 2, 4, 7, 3],
                height: [0, 1, 3, 6, 0],
                texture: [17, 4],
                angle: 5,
                laser: {
                    damage: [20, 20],
                    rate: 1.5,
                    type: 1,
                    speed: [160, 160],
                    number: 1
                }
            }
        },
        wings: {
            main1: {
                doubleside: !0,
                offset: {
                    x: 9,
                    y: 15,
                    z: 0
                },
                length: [0, 15, 0, 7],
                width: [0, 160, 70, 30, 30],
                angle: [0, 20, 0, -10],
                position: [30, -20, 30, 30, 30],
                texture: [13, 63, 13, 8],
                bump: {
                    position: 35,
                    size: 5
                }
            },
            main2: {
                doubleside: !0,
                offset: {
                    x: 30,
                    y: 15,
                    z: 0
                },
                length: [0, 15, 0, 20],
                width: [0, 80, 90, 200, 30],
                angle: [30, 30, 30, 30],
                position: [30, 30, 10, -45, 30],
                texture: [13, 3, 13, 4],
                bump: {
                    position: 35,
                    size: 7
                }
            },
            main3: {
                doubleside: !0,
                offset: {
                    x: 0,
                    y: 25,
                    z: -7
                },
                length: [45, 35, 0, 20],
                width: [40, 40, 40, 200, 40],
                angle: [-20, 20, -20, -5],
                position: [20, 30, 0, -30, 10],
                texture: [0, 8, 13, 63],
                bump: {
                    position: 35,
                    size: 20
                }
            }
        }
    }), llll1.add({
        name: "Aries",
        level: 7,
        model: 4,
        size: 4.5,
        specs: {
            shield: {
                capacity: [800, 800],
                reload: [17, 17]
            },
            generator: {
                capacity: [350, 350],
                reload: [175, 175]
            },
            ship: {
                mass: 800,
                speed: [40, 40],
                rotation: [20, 20],
                acceleration: [150, 150]
            }
        },
        bodies: {
            arm: {
                section_segments: 6,
                angle: 0,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -85, -70, -60, -10, 10, 60, 70, 85, 90, 85],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 20, 25, 10, 12, 12, 15, 20, 20, 15, 0],
                height: [0, 10, 12, 8, 12, 12, 8, 12, 10, 5, 0],
                texture: [4, 63, 4, 4, 4, 4, 4, 63, 3],
                propeller: !0
            },
            arm45: {
                section_segments: 6,
                angle: 45,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -85, -70, -60, -10, 10, 60, 70, 85, 90],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 20, 25, 10, 12, 12, 10, 25, 20, 0],
                height: [0, 10, 12, 8, 12, 12, 8, 12, 10, 0],
                texture: [4, 63, 4, 4, 4, 4, 4, 63, 4]
            },
            arm90: {
                section_segments: 6,
                angle: 90,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -85, -70, -60, -10, 10, 60, 70, 85, 90],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 20, 25, 10, 12, 12, 10, 25, 20, 0],
                height: [0, 10, 12, 8, 12, 12, 8, 12, 10, 0],
                texture: [4, 63, 4, 4, 4, 4, 4, 63, 4]
            },
            arm135: {
                section_segments: 6,
                angle: -45,
                offset: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-90, -85, -70, -60, -10, 10, 60, 70, 85, 90],
                    z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                width: [0, 20, 25, 10, 12, 12, 10, 25, 20, 0],
                height: [0, 10, 12, 8, 12, 12, 8, 12, 10, 0],
                texture: [4, 63, 4, 4, 4, 4, 4, 63, 4]
            },
            cockpit: {
                section_segments: 20,
                offset: {
                    x: 0,
                    y: -10,
                    z: 8
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    y: [-50, -35, -25, -15, 0, 15, 25, 35, 70]
                },
                width: [0, 15, 20, 25, 20, 10, 15, 15, 0],
                height: [0, 10, 13, 15, 15, 15, 12, 10, 0],
                texture: [6, 15, 15, 1, 4, 3, 3, 15]
            },
            topcockpit: {
                section_segments: 16,
                offset: {
                    x: 0,
                    y: -23,
                    z: 7
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0, 0],
                    y: [-30, -10, 0, 10, 30]
                },
                width: [0, 12, 15, 10, 0],
                height: [0, 20, 22, 18, 0],
                texture: [9]
            },
            cannon: {
                section_segments: 6,
                offset: {
                    x: 0,
                    y: -63,
                    z: 0
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-25, -30, -20, 0, 10, 12]
                },
                width: [0, 10, 8, 7, 6, 0],
                height: [0, 5, 5, 7, 6, 0],
                texture: [6, 6, 6, 10, 12],
                laser: {
                    damage: [150, 150],
                    rate: .7,
                    type: 1,
                    speed: [110, 110],
                    number: 1,
                    error: 0
                }
            },
            sidecannons: {
                section_segments: 6,
                offset: {
                    x: 45,
                    y: -45,
                    z: 7
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-0, -30, -20, 0, 10, 12],
                    z: [0, 0, 0, 0, -5, -10]
                },
                width: [0, 3, 5, 7, 6, 0],
                height: [0, 3, 5, 7, 6, 0],
                texture: [6, 6, 15, 4, 4],
                angle: -45,
                laser: {
                    damage: [15, 15],
                    rate: 4,
                    type: 1,
                    speed: [200, 200],
                    number: 1,
                    error: 0
                }
            },
            backsidecannons: {
                section_segments: 6,
                offset: {
                    x: 45,
                    y: 45,
                    z: 7
                },
                position: {
                    x: [0, 0, 0, 0, 0, 0],
                    y: [-0, -30, -20, 0, 10, 12],
                    z: [0, 0, 0, 0, -5, -10]
                },
                width: [0, 3, 5, 7, 6, 0],
                height: [0, 3, 5, 7, 6, 0],
                texture: [6, 6, 15, 4, 4],
                angle: 225,
                laser: {
                    damage: [15, 15],
                    rate: 4,
                    type: 1,
                    speed: [200, 200],
                    number: 1,
                    error: 0
                }
            }
        },
        wings: {
            side_joins: {
                offset: {
                    x: 0,
                    y: 0,
                    z: 5
                },
                length: [40, 30],
                width: [50, 30, 0],
                angle: [30, -10],
                position: [0, 0, 50],
                texture: [1, 11],
                bump: {
                    position: 10,
                    size: 20
                }
            }
        }
    }), this.IOl01 = function () {
        function e() { }
        return e.Ol1IO = function (e, t, i, s) {
            var o, l, n, r, a, h, p, c;
            switch (null == s && (s = []), r = Math.floor(6 * e), l = 6 * e - r, a = i * (1 - t), h = i * (1 - l * t), c = i * (1 - (1 - l) * t), r % 6) {
                case 0:
                    p = i, n = c, o = a;
                    break;
                case 1:
                    p = h, n = i, o = a;
                    break;
                case 2:
                    p = a, n = i, o = c;
                    break;
                case 3:
                    p = a, n = h, o = i;
                    break;
                case 4:
                    p = c, n = a, o = i;
                    break;
                case 5:
                    p = i, n = a, o = h
            }
            return s[0] = 255 * p | 0, s[1] = 255 * n | 0, s[2] = 255 * o | 0, s
        }, e.hsvToRgbHex = function (e, t, i) {
            var s, o, l, n, r, a, h, p;
            switch (n = Math.floor(6 * e), o = 6 * e - n, r = i * (1 - t), a = i * (1 - o * t), p = i * (1 - (1 - o) * t), n % 6) {
                case 0:
                    h = i, l = p, s = r;
                    break;
                case 1:
                    h = a, l = i, s = r;
                    break;
                case 2:
                    h = r, l = i, s = p;
                    break;
                case 3:
                    h = r, l = a, s = i;
                    break;
                case 4:
                    h = p, l = r, s = i;
                    break;
                case 5:
                    h = i, l = r, s = a
            }
            return (255 * h | 0) << 16 | (255 * l | 0) << 8 | 255 * s | 0
        }, e
    }(), I0OlI = function () {
        function e(e) {
            this.seed = null != e ? e : Math.random(), this.seed < 1 && (this.seed *= 1 << 30), this.a = 13971, this.b = 12345, this.size = 1 << 30, this.I01O0 = this.size - 1, this.O0IO1 = 1 / this.size, this.O0O0l(), this.O0O0l(), this.O0O0l()
        }
        return e.prototype.next = function () {
            return this.seed = this.seed * this.a + this.b & this.I01O0, this.seed * this.O0IO1
        }, e.prototype.I1lOl = function (e, t) {
            return null != t ? Math.floor(Math.pow(this.next(), t) * e) : Math.floor(this.next() * e)
        }, e.prototype.O0O0l = function () {
            return this.seed = this.seed * this.a + this.b & this.I01O0
        }, e.prototype.feed = function (e) {
            return this.seed = this.seed * this.a * e + this.b & this.I01O0
        }, e
    }(), module.exports = I0OlI, this.ShipTexture = function () {
        function e(e) {
            var t, i, s, o, l, n, r, a;
            for (this.size = null != e ? e : 1024, this.canvas = document.createElement("canvas"), this.canvas.width = this.size, this.canvas.height = this.size / 2, this.O0I1I = 8, this.blocksize = this.size / this.O0I1I, i = this.canvas.getContext("2d"), i.fillStyle = "#FFF", i.fillRect(0, 0, this.size, this.size), this.IllI0 = 0, r = ["#FFF", "#CCC", "#999", "#666", "#333", "#000", "#FDA", "#456"], o = 0, l = r.length; o < l; o++) t = r[o], this.createTexture(function (e) {
                return e.fillStyle = t, e.fillRect(-.2, -.2, 1.4, 1.4)
            });
            for (this.createTexture(function (e) {
                return e.fillStyle = "#666", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#CCC", e.fillRect(.1, .1, .3, .8), e.fillRect(.6, .1, .3, .8), e.fillStyle = "#333", e.fillRect(.15, .15, .2, .7), e.fillRect(.65, .15, .2, .7)
            }), this.createTexture(function (e) {
                var t, i;
                for (e.fillStyle = "#DDD", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#000", e.fillRect(.05, .05, .4, .9), e.fillRect(.55, .05, .4, .9), e.fillStyle = "#345", e.fillRect(.06, .06, .38, .88), e.fillRect(.56, .06, .38, .88), t = i = 0; i <= 10; t = i += 1) e.beginPath(), e.fillStyle = "#333", e.arc(1, .1 * t, .0125, 0, 180 * THREE.Math.DEG2RAD * 2, !0), e.fill(), e.beginPath(), e.arc(.5, .1 * t, .0125, 0, 180 * THREE.Math.DEG2RAD * 2, !0), e.fill(), e.beginPath(), e.arc(0, .1 * t, .0125, 0, 180 * THREE.Math.DEG2RAD * 2, !0), e.fill(), e.beginPath(), e.arc(.1 * t, 0, .0125, 0, 180 * THREE.Math.DEG2RAD * 2, !0), e.fill(), e.beginPath(), e.arc(.1 * t, 1, .0125, 0, 180 * THREE.Math.DEG2RAD * 2, !0), e.fill()
            }), this.createTexture(function (e) {
                e.fillStyle = "#CCC", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#111", e.fillRect(.1, .1, .2, .76), e.fillRect(.7, .1, .2, .76)
            }), this.createTexture(function (e) {
                var t, i;
                for (e.fillStyle = "#CCC", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#222", e.fillRect(0, 0, 1, .1), e.fillRect(0, .9, 1, .1), e.fillStyle = "#FFF", e.fillRect(0, 0, 1, .08), e.fillRect(0, .92, 1, .08), e.fillStyle = "#222", t = i = .2; i <= .8; t = i += .3) e.fillRect(t - .01, 0, .02, .1), e.fillRect(t - .01, .9, .02, .1);
                return e.strokeStyle = "#333", e.lineWidth = .05, e.strokeRect(.1, .25, .8, .5), e.fillStyle = "#222", e.fillRect(.4, 0, .2, .1), e.fillRect(.8, 0, .2, .1), e.fillRect(0, 0, .2, .1), e.fillRect(.4, .8, .2, .1), e.fillRect(.8, .8, .2, .1), e.fillRect(0, .8, .2, .1)
            }), this.createTexture(function (e) {
                var t, i, s;
                for (e.fillStyle = "#CCC", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#222", e.fillRect(0, -.1, 1, .15), s = [], t = i = 0; i <= 1; t = i += .1) s.push(e.fillRect(t - .025, -.1, .05, 1.2));
                return s
            }), this.createTexture(function (e) {
                var t, i, s;
                for (e.fillStyle = "#333", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#FFF", s = [], t = i = 0; i <= 1; t = i += .1) s.push(e.fillRect(t - .01, -.1, .02, 1.2));
                return s
            }), this.createTexture(function (e) {
                var t, i, s, o, l, n, r, a, h, p, c;
                for (e.fillStyle = "#051245", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#93C5D8", e.save(), p = s = .25; s <= .75; p = s += .5)
                    for (c = o = .25; o <= .75; c = o += .5) t = e.createRadialGradient(p, c, 0, p, c, .5), t.addColorStop(0, "rgba(47,89,158,1)"), t.addColorStop(.75, "rgba(47,89,158,0)"), e.fillStyle = t, e.fillRect(-.2, -.2, 1.4, 1.4);
                for (e.restore(), i = l = 0; l <= 1; i = l += .2) e.fillRect(i - .01, -.1, .01, 1.2);
                for (i = n = -.2; n <= 1.4; i = n += .05) e.fillRect(-.1, i - .1, 1.2, .001);
                for (e.fillStyle = "rgba(60,60,70,.8)", p = r = 0; r <= 1; p = r += .5) e.fillRect(-.2, p - .02, 1.4, .04), e.fillRect(p - .02, -.2, .04, 1.4);
                for (e.globalCompositeOperation = "xor", e.fillStyle = "#333", h = [], p = a = 0; a <= 1; p = a += .5) h.push(function () {
                    var t, i;
                    for (t = [], c = i = 0; i <= 1; c = i += .5) e.beginPath(), e.moveTo(p - .1, c), e.lineTo(p, c - .1), e.lineTo(p + .1, c), e.lineTo(p, c + .1), e.closePath(), t.push(e.fill());
                    return t
                }());
                return h
            }), this.createTexture(function (e) {
                var t, i, s, o, l;
                for (e.save(), e.fillStyle = "#000", e.fillRect(-.2, -.2, 1.4, 1.4), e.rotate(180 * THREE.Math.DEG2RAD / 4), e.fillStyle = "#333", e.fillRect(-.2, -.2, 2, .4), e.fillStyle = "#444", e.fillRect(-.2, -.6, 2, .4), e.fillRect(-.2, .2, 2, .4), e.fillStyle = "#333", e.fillRect(-.2, -1, 2, .4), e.fillRect(-.2, .6, 2, .4), e.rotate(180 * THREE.Math.DEG2RAD / 2), e.fillStyle = "rgba(0,0,30,.3)", e.fillRect(-.9, -.9, 2, .4), e.fillStyle = "rgba(0,0,30,.2)", e.fillRect(-.9, -.5, 2, .4), e.fillRect(-.9, -1.3, 2, .4), e.fillStyle = "rgba(0,0,30,.3)", e.fillRect(-.9, -.1, 2, .4), e.fillRect(-.9, -1.7, 2, .4), e.restore(), s = [], o = t = -.2; t <= 1.4; o = t += .01) s.push(function () {
                    var t, s;
                    for (s = [], l = t = -.2; t <= 1.4; l = t += .01) i = Math.floor(80 * Math.random()), e.fillStyle = "rgba(" + i + "," + i + "," + i + ",.1)", s.push(e.fillRect(o, l, .01, .01));
                    return s
                }());
                return s
            }), this.createTexture(function (e) {
                var t, i, s, o;
                for (e.fillStyle = "#AAA", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#000", i = [], s = t = 0; t <= 1; s = t += .1) i.push(function () {
                    var t, i;
                    for (i = [], o = t = 0; t <= 1; o = t += .1) i.push(e.fillRect(s - .05, o - .05, .07, .07));
                    return i
                }());
                return i
            }), this.createTexture(function (e) {
                return e.fillStyle = "#111", e.fillRect(-.2, -.2, 1.4, 1.4)
            }), this.createTexture(function (e) {
                var t, i;
                for (e.fillStyle = "#333", e.fillRect(-.2, -.2, 1.4, 1.4), e.fillStyle = "#CCC", e.fillRect(0, 0, 1, .1), e.fillRect(0, .9, 1, .1), e.fillStyle = "#000", e.fillRect(0, 0, 1, .08), e.fillRect(0, .92, 1, .08), e.fillStyle = "#CCC", t = i = .2; i <= .8; t = i += .3) e.fillRect(t - .01, 0, .02, .1), e.fillRect(t - .01, .9, .02, .1);
                return e.strokeStyle = "#BBB", e.lineWidth = .05, e.strokeRect(.1, .25, .8, .5), e.fillStyle = "#CCC", e.fillRect(.4, 0, .2, .1), e.fillRect(.8, 0, .2, .1), e.fillRect(0, 0, .2, .1), e.fillRect(.4, .8, .2, .1), e.fillRect(.8, .8, .2, .1), e.fillRect(0, .8, .2, .1)
            }), i = this.canvas.getContext("2d"), i.fillStyle = "hsl(0,70%,50%)", i.fillRect(this.size - 2 * this.blocksize, 3 * this.blocksize, this.blocksize, this.blocksize), s = n = 0, a = this.blocksize - 1; n <= a; s = n += 1) i.fillStyle = "hsl(" + Math.floor(s / this.blocksize * 360) + ",70%,50%)", i.fillRect(this.size - this.blocksize + s, 3 * this.blocksize, 1, this.blocksize)
        }
        return e.prototype.createTexture = function (e) {
            var t, i, s;
            return t = this.canvas.getContext("2d"), t.save(), i = this.IllI0 % this.O0I1I, s = Math.floor(this.IllI0 / this.O0I1I), t.translate(i * this.blocksize, s * this.blocksize), t.scale(this.blocksize, this.blocksize), t.beginPath(), t.rect(0, 0, 1, 1), t.clip(), t.translate(.1, .1), t.scale(.8, .8), e(t), t.restore(), this.IllI0++
        }, e
    }(), this.ShipEmissiveTexture = function () {
        function e(e, t) {
            var i, s, o, l, n;
            for (this.size = null != e ? e : 1024, null == t && (t = !1), this.canvas = document.createElement("canvas"), this.canvas.width = this.size, this.canvas.height = this.size / 2, this.O0I1I = 8, this.blocksize = this.size / this.O0I1I, s = this.canvas.getContext("2d"), s.fillStyle = "#000", s.fillRect(0, 0, this.size, this.size), this.IllI0 = 0, n = ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "000"], o = 0, l = n.length; o < l; o++) i = n[o], this.createTexture(function (e) {
                var t, s, o, l, n, r;
                for (e.fillStyle = i, n = [.4, .55], r = [], l = 0, o = n.length; l < o; l += .05) t = n[l], r.push(function () {
                    var i, o, l, n;
                    for (l = [.4, .55], n = [], o = 0, i = l.length; o < i; o += .05) s = l[o], n.push(e.fillRect(t + .0125, s + .0125, .025, .025));
                    return n
                }());
                return r
            });
            this.createTexture(function (e) { }), this.createTexture(function (e) { }), this.createTexture(function (e) {
                return function (t) {
                    var i, s, o, l;
                    for (o = new I0OlI(0), l = [], i = s = 0; s <= 8; i = s += 1) e.createLight(t, .16, .16 + .08 * i, .04, .04, o.next() > .1), e.createLight(t, .24, .16 + .08 * i, .04, .04, o.next() > .1), e.createLight(t, .76, .16 + .08 * i, .04, .04, o.next() > .1), l.push(e.createLight(t, .84, .16 + .08 * i, .04, .04, o.next() > .1));
                    return l
                }
            }(this)), this.createTexture(function (e) {
                return function (t) {
                    t.fillStyle = "#FFF", e.createLight(t, .5, .05, .1, .05), e.createLight(t, .9, .05, .1, .05), e.createLight(t, .1, .05, .1, .05), e.createLight(t, .5, .85, .1, .05), e.createLight(t, .9, .85, .1, .05), e.createLight(t, .1, .85, .1, .05)
                }
            }(this)), this.createTexture(function (e) { }), this.createTexture(function (e) { }), this.createTexture(function (e) { }), this.createTexture(function (e) { }), this.createTexture(function (e) {
                return function (t) {
                    var i, s, o, l;
                    for (t.fillStyle = "#FFF", s = [], o = i = 0; i <= 1; o = i += .1) s.push(function () {
                        var e, i;
                        for (i = [], l = e = 0; e <= 1; l = e += .1) Math.random() < .4 ? i.push(this.createLight(t, o - .025, l - .025, .06, .06, Math.random() > .3)) : i.push(void 0);
                        return i
                    }.call(e));
                    return s
                }
            }(this)), this.createTexture(function (e) {
                return function (e) {
                    var t, i, s, o;
                    for (t = e.createLinearGradient(0, 0, 0, 1), t.addColorStop(0, "#000"), t.addColorStop(.6, "#FFF"), e.fillStyle = t, e.fillRect(-.1, -.1, 1.2, 1.2), e.fillStyle = "#FFF", o = [], i = s = 0; s <= 1; i = s += .2) e.fillRect(i - .05, .15, .1, .1), o.push(e.fillRect(i - .05, .35, .1, .1));
                    return o
                }
            }()), this.createTexture(function (e) {
                return function (t) {
                    t.fillStyle = "#FFF", e.createLight(t, .3, .05, .1, .05), e.createLight(t, .7, .05, .1, .05), e.createLight(t, .1, .05, .1, .05), e.createLight(t, .7, .85, .1, .05), e.createLight(t, .9, .85, .1, .05), e.createLight(t, .1, .85, .1, .05)
                }
            }(this)), t && (s = this.canvas.getContext("2d"), s.fillStyle = "#888", s.fillRect(this.size - this.blocksize, 3 * this.blocksize, this.blocksize, this.blocksize))
        }
        return e.prototype.createLight = function (e, t, i, s, o, l) {
            var n, r;
            return null == l && (l = !0), e.fillStyle = l ? "#FFF" : "#444", e.fillRect(t - s / 2, i - o / 2, s, o), n = e.createRadialGradient(t, i, 0, t, i, Math.max(s, o)), n.addColorStop(0, l ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.3)"), n.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = n, r = Math.max(s, o), e.fillRect(t - r, i - r, 2 * r, 2 * r)
        }, e.prototype.createTexture = function (e, t) {
            var i, s, o;
            return null != t && (this.IllI0 = t), i = this.canvas.getContext("2d"), i.save(), s = this.IllI0 % this.O0I1I, o = Math.floor(this.IllI0 / this.O0I1I), i.translate(s * this.blocksize, o * this.blocksize), i.scale(this.blocksize, this.blocksize), i.beginPath(), i.rect(0, 0, 1, 1), i.clip(), i.translate(.1, .1), i.scale(.8, .8), e(i), i.restore(), this.IllI0++
        }, e
    }(), this.ShipShieldTexture = function () {
        function e(e) {
            var t;
            for (this.size = null != e ? e : 1024, this.canvas = document.createElement("canvas"), this.canvas.width = this.size, this.canvas.height = this.size / 2, this.O0I1I = 8, this.blocksize = this.size / this.O0I1I, this.IllI0 = 0, t = 0; t <= 29; t += 1) this.createTexture(function (e) {
                var t, i, s, o, l;
                for (e.fillStyle = "#FFF", e.fillRect(-.2, -.2, 1.4, 1.4), l = [], s = o = 0; o <= 1; s = o += 1) l.push(function () {
                    var o, l;
                    for (l = [], i = o = 0; o <= 1; i = o += 1) t = e.createRadialGradient(.25 + .5 * s, .25 + .5 * i, 0, .25 + .5 * s, .25 + .5 * i, .5), t.addColorStop(0, "#000"), t.addColorStop(.1, "#000"), t.addColorStop(1, "#FFF"), e.fillStyle = t, l.push(e.fillRect(.25 + .5 * s - .225, .25 + .5 * i - .225, .45, .45));
                    return l
                }());
                return l
            });
            this.createTexture(function (e) {
                return e.fillStyle = "#888", e.fillRect(-.2, -.2, 1.4, 1.4)
            }), this.createTexture(function (e) {
                return e.fillStyle = "#888", e.fillRect(-.2, -.2, 1.4, 1.4)
            })
        }
        return e.prototype.createTexture = function (e, t) {
            var i, s, o;
            return null != t && (this.IllI0 = t), i = this.canvas.getContext("2d"), i.save(), s = this.IllI0 % this.O0I1I, o = Math.floor(this.IllI0 / this.O0I1I), i.translate(s * this.blocksize, o * this.blocksize), i.scale(this.blocksize, this.blocksize), i.beginPath(), i.rect(0, 0, 1, 1), i.clip(), i.translate(.1, .1), i.scale(.8, .8), e(i), i.restore(), this.IllI0++
        }, e
    }(), IOI10 = new THREE.Texture((new this.ShipTexture).canvas), IOI10.needsUpdate = !0, O00IO = new THREE.Texture((new this.ShipEmissiveTexture).canvas), O00IO.wrapS = O00IO.wrapT = THREE.RepeatWrapping, O00IO.needsUpdate = !0, OIOIl = new THREE.Texture(new this.ShipEmissiveTexture(null, !0).canvas), OIOIl.wrapS = OIOIl.wrapT = THREE.RepeatWrapping, OIOIl.needsUpdate = !0, IIO0O = new THREE.Texture((new ShipShieldTexture).canvas),
        IIO0O.minFilter = THREE.LinearFilter, IIO0O.needsUpdate = !0, hasProp = {}.hasOwnProperty, this.l0O11 = function () {
            function e(e, t, i, s) {
                var o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b, I, w, O, z, R, v, T, H, M, _, S, V, D, k, F, C, L, A, G, P, U, B, q, j, N, W;
                if (this.data = e, this.hue = null != t ? t : 0, this.finish = null != i ? i : "zinc", this.options = s, null == this.options && (this.options = {
                    shield: !0,
                    propulsion: !0,
                    I1O01: !0
                }), this.hue = Math.max(.01, Math.min(.99, this.hue)), this.geometry = new THREE.Geometry, this.geometry.faceVertexUvs[0] = [], this.quads = [], this.I1l0I = !1, null != this.data.bodies) {
                    M = this.data.bodies;
                    for (m in M) hasProp.call(M, m) && (l = M[m], this.l000I(l))
                }
                if (null != this.data.tori) {
                    _ = this.data.tori;
                    for (m in _) hasProp.call(_, m) && (l = _[m], this.buildTorus(l))
                }
                if (this.data.wings) {
                    V = this.data.wings;
                    for (m in V) hasProp.call(V, m) && (q = V[m], this.I0O1l(q))
                }
                if (null != this.data.scale && 1 !== this.data.scale)
                    for (P = this.data.scale, D = this.geometry.vertices, f = 0, y = D.length; f < y; f++) B = D[f], B.x *= P, B.y *= P, B.z *= P;
                for (this.geometry.computeBoundingSphere(), this.geometry.computeBoundingBox(), this.geometry.computeFaceNormals(), k = this.quads, g = 0, x = k.length; g < x; g++) H = k[g], a = H[0], h = H[1], a.normal.lengthSq() > 0 && h.normal.lengthSq() > 0 && (a.normal.add(h.normal), a.normal.normalize(), h.normal = a.normal);
                for (F = this.geometry.faces, w = 0, E = F.length; w < E; w++) r = F[w], r.vertexNormals[0] = r.normal, r.vertexNormals[1] = r.normal, r.vertexNormals[2] = r.normal;
                if (this.lI001 = new THREE.Group, this.lI001.rotation.order = "ZYX", this.O000I = this.l0lOl(), this.mesh = new THREE.Mesh(this.geometry, this.O000I), this.lOO11 = 0, this.options.propulsion) {
                    var emHue = document.getElementById('emhue').value;
                    var emSaturation = document.getElementById('emsaturation').value;
                    var emLightness = document.getElementById('emLightness').value;
                    T = new THREE.Geometry,
                        n = (this.finish !== "default" && this.finish !== "Adjustable")
                            ? IOl01.Ol1IO(this.hue, 0.5, 1)
                            : (this.finish === "Adjustable")
                                ? `hsl(${emHue}, ${emSaturation}%, ${emLightness}%)`
                                : IOl01.Ol1IO(this.hue, 1, 1),
                        this.OII1l = new THREE.MeshBasicMaterial({
                            color: this.finish !== "Adjustable" ? new THREE.Color(n[0] / 255, n[1] / 255, n[2] / 255) : n,
                            opacity: 1,
                            map: I1O0O,
                            transparent: !0,
                            depthWrite: !1,
                            side: THREE.DoubleSide,
                            blending: THREE.AdditiveBlending
                        }), C = this.data.bodies;
                    for (m in C)
                        if (hasProp.call(C, m) && (l = C[m], l.propeller)) {
                            for (v = 0, W = -200, c = O = 0, L = l.width.length - 1; O <= L; c = O += 1) l.position.y[c] > W && (W = l.position.y[c], v = c);
                            for (j = .01 * l.width[v] * 2, p = .01 * l.height[v] * 2, I = 5 * j, W = .01 * (l.position.y[v] + l.offset.y) + I / 4, N = .01 * (l.position.x[v] + l.offset.x), z = 6, c = R = 0, A = z - 1; R <= A; c = R += 1) o = (c + .5) / z * (180 * THREE.Math.DEG2RAD), u = T.vertices.length, T.vertices.push(new THREE.Vector3(W - I / 2, N - j / 2 * Math.cos(o), .01 * l.offset.z - p / 2 * Math.sin(o))), T.vertices.push(new THREE.Vector3(W + I / 2, N - j / 2 * Math.cos(o), .01 * l.offset.z - p / 2 * Math.sin(o))), T.vertices.push(new THREE.Vector3(W + I / 2, N + j / 2 * Math.cos(o), .01 * l.offset.z + p / 2 * Math.sin(o))), T.vertices.push(new THREE.Vector3(W - I / 2, N + j / 2 * Math.cos(o), .01 * l.offset.z + p / 2 * Math.sin(o))), T.faces.push(new THREE.Face3(u, u + 1, u + 2)), T.faces.push(new THREE.Face3(u + 2, u + 3, u)), T.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]), T.faceVertexUvs[0].push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
                            if (0 !== l.offset.x)
                                for (N = -N, c = U = 0, G = z - 1; U <= G; c = U += 1) o = (c + .5) / z * (180 * THREE.Math.DEG2RAD), u = T.vertices.length, T.vertices.push(new THREE.Vector3(W - I / 2, N - j / 2 * Math.cos(o), .01 * l.offset.z - p / 2 * Math.sin(o))), T.vertices.push(new THREE.Vector3(W + I / 2, N - j / 2 * Math.cos(o), .01 * l.offset.z - p / 2 * Math.sin(o))), T.vertices.push(new THREE.Vector3(W + I / 2, N + j / 2 * Math.cos(o), .01 * l.offset.z + p / 2 * Math.sin(o))), T.vertices.push(new THREE.Vector3(W - I / 2, N + j / 2 * Math.cos(o), .01 * l.offset.z + p / 2 * Math.sin(o))), T.faces.push(new THREE.Face3(u, u + 1, u + 2)), T.faces.push(new THREE.Face3(u + 2, u + 3, u)), T.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]), T.faceVertexUvs[0].push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)])
                        }
                    if (null != this.data.scale && 1 !== this.data.scale)
                        for (P = this.data.scale, S = T.vertices, d = 0, b = S.length; d < b; d++) B = S[d], B.x *= P, B.y *= P, B.z *= P;
                    T.verticesNeedUpdate = !0, T.l1OlO = !0, T.computeBoundingSphere(), this.OlO1O = T, this.OO1Ol = new THREE.Mesh(T, this.OII1l)
                }
                this.lI001.add(this.mesh), this.options.propulsion && this.lI001.add(this.OO1Ol), this.lI001.scale.set(2 * this.data.size, 2 * this.data.size, 2 * this.data.size), this.options.shield && (this.shield_mat = new THREE.MeshBasicMaterial({
                    map: IIO0O,
                    color: 0,
                    blending: THREE.AdditiveBlending,
                    transparent: !0,
                    side: THREE.DoubleSide
                }), this.shield_mesh = new THREE.Mesh(this.geometry, this.shield_mat), this.shield_mesh.scale.set(1.2, 1.2, 1.2), this.lI001.add(this.shield_mesh), this.shield_mesh.visible = !1), this.options.I1O01 && "undefined" != typeof OlOl0 && null !== OlOl0 && (this.I1O01 = new OlOl0(Math.floor(360 * this.hue))), this.l0OOl = 0, this.OIl1l = 0, this.II1O1 = new lOI1O
            }
            return e.prototype.dispose = function () {
                if (this.geometry.dispose(), this.quads = [], this.O000I.dispose(), this.options.propulsion && this.OII1l.dispose(), this.options.propulsion) return this.OlO1O.dispose()
            }, e.prototype.bump = function (e) {
                return this.bumpframe = e, this.bumping = !0
            }, e.prototype.propstep = function (e) {
                if (this.options.propulsion) return this.lOO11 = e ? Math.max(.02, Math.min(1, 1.1 * this.lOO11)) : .94 * this.lOO11, this.OO1Ol.visible = this.lOO11 > .01, this.OII1l.opacity = n = (this.finish !== "default" && this.finish !== "Adjustable") ? (.5 + .5 * Math.random()) : (1 + 1 * Math.random()) * this.lOO11
            }, e.prototype.l0lOl = function (e) {
                var t, i, s;
                let a = document.getElementById('customizeMaterial');
                switch (null == e && (e = 10), this.built_material = this.finish, this.finish) {
                    case "Adjustable":
                        this.buildAdjustableMaterial();
                        a.style.transform = "scale(1)";
                        break;
                    case "zinc":
                        this.buildZincMaterial();
                        a.style.transform = "scale(0)";
                        break;
                    case "alloy":
                        this.buildAlloyMaterial();
                        break;
                    case "gold":
                        this.buildGoldMaterial();
                        break;
                    case "titanium":
                        this.buildTitaniumMaterial();
                        break;
                    case "carbon":
                        this.buildCarbonMaterial();
                        break;
                    case "Electric-Blue":
                        this.buildX27Material();
                        break;
                    // case "Diamond":
                    //     this.buildDiamondMaterial();
                    //     break;
                    // case "Copper":
                    //     this.buildCopperMaterial();
                    //     break;
                    case "FullColor":
                        this.buildFullColorMaterial();
                        break;
                    default:
                        this.buildDefaultMaterial()
                }
                return this.base_color = this.material.color.getHex(), s = this.base_color >> 16 & 255, i = this.base_color >> 8 & 255, t = 255 & this.base_color, this.dark_color = Math.floor(s / 2) << 16 | Math.floor(i / 2) << 8 | Math.floor(t / 2), this.material;
            },
                e.prototype.buildDefaultMaterial = function (e) {
                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        bumpScale: .1,
                        emissiveMap: O00IO,
                        specular: `hsl(200, 100%, 20%)`,
                        color: `hsl(200, 100%, 12%)`,
                        emissive: IOl01.hsvToRgbHex(this.hue, 1, 1),
                        opacity: 1,
                        shininess: 40
                    })
                },
                e.prototype.buildAdjustableMaterial = function (e) {
                    var specHue = document.getElementById('Spechue').value;
                    var specSaturation = document.getElementById('Specsaturation').value;
                    var specLightness = document.getElementById('SpecLightness').value;

                    var matHue = document.getElementById('Mathue').value;
                    var matSaturation = document.getElementById('Matsaturation').value;
                    var matLightness = document.getElementById('MatLightness').value;

                    var emHue = document.getElementById('emhue').value;
                    var emSaturation = document.getElementById('emsaturation').value;
                    var emLightness = document.getElementById('emLightness').value;

                    var opacity = document.getElementById('opacity').value;
                    var shininess = document.getElementById('shininess').value;

                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        bumpScale: .1,
                        emissiveMap: O00IO,
                        specular: `hsl(${specHue}, ${specSaturation}%, ${specLightness}%)`,
                        color: `hsl(${matHue}, ${matSaturation}%, ${matLightness}%)`,
                        emissive: `hsl(${emHue}, ${emSaturation}%, ${emLightness}%)`,
                        opacity: opacity / 100,
                        shininess: shininess
                    })
                },
                e.prototype.buildZincMaterial = function (e) {
                    return null == e && (e = 10), this.material = new THREE.MeshLambertMaterial({
                        map: IOI10,
                        color: 16777215,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: O00IO
                    })
                }, e.prototype.buildX27Material = function () {
                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        specular: 4243711,
                        shininess: 30,
                        bumpScale: .1,
                        color: 5275808,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: O00IO
                    })
                }, e.prototype.buildAlloyMaterial = function () {
                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        specular: 8413264,
                        shininess: 30,
                        bumpScale: .1,
                        color: 10531008,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: O00IO
                    })
                }, e.prototype.buildTitaniumMaterial = function () {
                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        specular: 6316128,
                        shininess: 20,
                        bumpScale: .1,
                        color: 6316128,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: O00IO
                    })
                }, e.prototype.buildCarbonMaterial = function () {
                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specular: 6316128,
                        shininess: 5,
                        bumpScale: .1,
                        color: 1052688,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: OIOIl
                    })
                }, e.prototype.buildFullColorMaterial = function () {
                    var e;
                    return e = IOl01.hsvToRgbHex(this.hue, 1, 1), this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        specular: 12632256,
                        shininess: 50,
                        bumpScale: .1,
                        color: e,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: O00IO
                    })
                }, e.prototype.buildGoldMaterial = function () {
                    return this.material = new THREE.MeshPhongMaterial({
                        map: IOI10,
                        bumpMap: IOI10,
                        specularMap: IOI10,
                        specular: 10506256,
                        shininess: 50,
                        bumpScale: .1,
                        color: 8413232,
                        emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                        emissiveMap: O00IO
                    })
                },
                // e.prototype.buildCopperMaterial = function () {
                //     return this.material = new THREE.MeshPhongMaterial({
                //         map: IOI10,
                //         bumpMap: IOI10,
                //         specularMap: IOI10,
                //         specular: 11554864,
                //         shininess: 15,
                //         bumpScale: .1,
                //         color: 10514512,
                //         emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                //         emissiveMap: O00IO
                //     })
                // },
                // e.prototype.buildDiamondMaterial = function () {
                //     return this.material = new THREE.MeshPhongMaterial({
                //         map: IOI10,
                //         bumpMap: IOI10,
                //         specular: 16777215,
                //         opacity: .5,
                //         shininess: 50,
                //         side: THREE.DoubleSide,
                //         bumpScale: .1,
                //         transparent: !0,
                //         color: 8421504,
                //         emissive: IOl01.hsvToRgbHex(this.hue, .5, 1),
                //         emissiveMap: O00IO
                //     })
                // },
                e.prototype.OlII1 = function (e) {
                    var t, i;
                    if (this.built_material !== this.finish && (this.l0lOl(this.hue), this.mesh.material = this.material), this.options.shield && (this.shield_mesh.visible = !1), this.material.color.setHex(this.base_color), this.invulnerable ? Date.now() % 500 < 250 ? (this.material.emissive.setHex(IOl01.hsvToRgbHex(this.hue, .5, .5)), this.material.color.setHex(this.dark_color), this.options.shield && (this.shield_mat.color.setHex(IOl01.hsvToRgbHex(this.hue, .5, 1)), this.shield_mesh.visible = !0)) : (this.material.emissive.set(IOl01.hsvToRgbHex(this.hue, .5, 1)), this.material.color.setHex(this.base_color), this.options.shield && this.shield_mat.color.setHex(0)) : this.l0OOl > 0 && (this.OIl1l = Math.random() < this.l0OOl ? 1 : 0, this.options.shield && (this.shield_mesh.visible = !0), 1 === this.OIl1l ? (this.material.emissive.setHex(IOl01.hsvToRgbHex(this.hue, .5, .5)), this.material.color.setHex(this.dark_color), this.options.shield && this.shield_mat.color.setHex(IOl01.hsvToRgbHex(this.hue, .5, 1))) : (this.material.emissive.set(IOl01.hsvToRgbHex(this.hue, .5, 1)), this.material.color.setHex(this.base_color), this.options.shield && this.shield_mat.color.setHex(0)), this.l0OOl *= .95, this.l0OOl < .1 && (this.l0OOl = 0, this.options.shield && (this.shield_mesh.visible = !1), this.material.color.setHex(this.base_color), this.material.emissive.set(IOl01.hsvToRgbHex(this.hue, .5, 1)))), this.bumping && (e > this.bumpframe + 30 ? (this.bumping = !1, this.lI001.scale.set(2 * this.data.size, 2 * this.data.size, 2 * this.data.size)) : (i = Math.max(0, e - this.bumpframe) / 30, t = 1.5 - Math.cos(Math.pow(i, .5) * (180 * THREE.Math.DEG2RAD) * 2), this.lI001.scale.set(2 * this.data.size * t, 2 * this.data.size * t, 2 * this.data.size * t))), this.last_frame = e, this.bump_shield && this.options.shield) return e > this.bump_shield_frame + 30 ? (this.bump_shield = !1, this.shield_mesh.scale.set(1.2, 1.2, 1.2)) : (i = Math.max(0, e - this.bump_shield_frame) / 30, t = 1.2 - .1 * Math.cos(Math.pow(i, .5) * (180 * THREE.Math.DEG2RAD) * 2), this.shield_mesh.scale.set(t, t, t), this.shield_mat.color.setHex(IOl01.hsvToRgbHex(this.hue, .5, Math.pow(1 - i, .25))), this.shield_mesh.visible = !0)
                }, e.prototype.bumpShield = function () {
                    if (null != this.last_frame && !this.bump_shield) return this.bump_shield_frame = this.last_frame, this.bump_shield = !0
                }, e.prototype.getTextureIndex = function (e, t) {
                    return null == e ? 0 : "number" == typeof e ? e : e[t] || e[e.length - 1]
                }, e.prototype.addQuad = function (e, t, i, s, o, l, n, r, a, h, p, c) {
                    return this.geometry.faces.push(new THREE.Face3(e, t, i)), this.geometry.faces.push(new THREE.Face3(s, e, i)), this.quads.push([this.geometry.faces[this.geometry.faces.length - 2], this.geometry.faces[this.geometry.faces.length - 1]]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(o, l), new THREE.Vector2(n, r), new THREE.Vector2(a, h)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(p, c), new THREE.Vector2(o, l), new THREE.Vector2(a, h)])
                }, e.prototype.l000I = function (e, t) {
                    var i, s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b, I, w, O, z, R, v, T, H, M, _, S, V, D, k, F, C, L, A;
                    if (null == t && (t = 0), 0 === t) return this.l000I(e, 1), void (0 !== e.offset.x && this.l000I(e, -1));
                    for (i = e.angle || 0, r = Math.cos(i / 180 * (180 * THREE.Math.DEG2RAD) * t), v = Math.sin(i / 180 * (180 * THREE.Math.DEG2RAD) * t), D = this.geometry.vertices.length, d = Math.min(e.position.x.length, e.position.y.length, e.width.length, e.height.length) - 1, f = 8, u = g = 0, b = f - 1; 0 <= b ? g <= b : g >= b; u = 0 <= b ? ++g : --g) o = u / f * (180 * THREE.Math.DEG2RAD) * 2;
                    if (null != e.section_segments && ("number" == typeof e.section_segments ? (f = e.section_segments, o = function () {
                        var e, t, i;
                        for (i = [], u = e = 0, t = f - 1; 0 <= t ? e <= t : e >= t; u = 0 <= t ? ++e : --e) i.push(u / f * (180 * THREE.Math.DEG2RAD) * 2);
                        return i
                    }()) : (f = e.section_segments.length, o = function () {
                        var t, i, s;
                        for (s = [], u = t = 0, i = f - 1; 0 <= i ? t <= i : t >= i; u = 0 <= i ? ++t : --t) s.push(e.section_segments[u] / 180 * (180 * THREE.Math.DEG2RAD));
                        return s
                    }())), null == e.position.z)
                        for (e.position.z = [], u = m = 1, I = e.position.y.length; 1 <= I ? m <= I : m >= I; u = 1 <= I ? ++m : --m) e.position.z.push(0);
                    for (c = y = 0, w = d; y <= w; c = y += 1)
                        for (C = .01 * e.position.y[c], u = x = 0, O = f - 1; x <= O; u = x += 1) s = o[u] + 180 * THREE.Math.DEG2RAD / 2, k = (.01 * e.position.x[c] + Math.cos(s) * e.width[c] * .01) * t, A = Math.sin(s) * e.height[c] * .01 * t + .01 * e.offset.z + .01 * e.position.z[c], F = r * k + v * C, L = r * C - v * k, L += .01 * e.offset.y, F += .01 * e.offset.x * t, e.vertical ? this.geometry.vertices.push(new THREE.Vector3(-A, F, L)) : this.geometry.vertices.push(new THREE.Vector3(L, F, A));
                    for (c = E = 0, z = d - 1; E <= z; c = E += 1)
                        for (n = .25 * (e.width[c] + e.width[c + 1] + e.height[c] + e.height[c + 1]) * 6.28, l = Math.abs(e.position.y[c] - e.position.y[c + 1]), H = 1, l > 0 && n / l > 4 && f % 8 == 0 ? H = 4 : l > 0 && n / l > 2 && f % 4 == 0 && (H = 2), u = V = 0, R = f - 1; V <= R; u = V += 1) u < f / 2 ? (this.geometry.faces.push(new THREE.Face3(D + (c + 1) * f + u, D + c * f + u, D + c * f + (u + 1) % f)), this.geometry.faces.push(new THREE.Face3(D + (c + 1) * f + (u + 1) % f, D + (c + 1) * f + u, D + c * f + (u + 1) % f)), this.quads.push([this.geometry.faces[this.geometry.faces.length - 2], this.geometry.faces[this.geometry.faces.length - 1]])) : (this.geometry.faces.push(new THREE.Face3(D + (c + 1) * f + u, D + c * f + u, D + (c + 1) * f + (u + 1) % f)), this.geometry.faces.push(new THREE.Face3(D + c * f + u, D + c * f + (u + 1) % f, D + (c + 1) * f + (u + 1) % f)), this.quads.push([this.geometry.faces[this.geometry.faces.length - 2], this.geometry.faces[this.geometry.faces.length - 1]])), a = (o[u] - o[0] + 180 * THREE.Math.DEG2RAD / 2) / (180 * THREE.Math.DEG2RAD) * H % 1, p = o[(u + 1) % o.length] - o[u], p < 0 && (p += 180 * THREE.Math.DEG2RAD * 2), h = a + p / (180 * THREE.Math.DEG2RAD) * H, T = this.getTextureIndex(e.texture, c), 15 === T && (T = 13), 63 === T && (T = 31), M = T % 8 * .125, _ = .25 * (3 - Math.floor(T / 8) + .1), a = M + .125 * (.1 + .8 * a), h = M + .125 * (.1 + .8 * h), S = _ + .2, 31 === T && (M += .125 * this.hue, a = M, h = M), u < f / 2 ? (this.geometry.faceVertexUvs[0].push([new THREE.Vector2(a, _), new THREE.Vector2(a, S), new THREE.Vector2(h, S)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(h, _), new THREE.Vector2(a, _), new THREE.Vector2(h, S)])) : (this.geometry.faceVertexUvs[0].push([new THREE.Vector2(a, _), new THREE.Vector2(a, S), new THREE.Vector2(h, _)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(a, S), new THREE.Vector2(h, S), new THREE.Vector2(h, _)]))
                }, e.prototype.buildTorus = function (e) {
                    var t, i, s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b, I, w, O, z, R, v, T, H, M, _, S, V, D, k, F, C, L, A;
                    if ("number" == typeof (O = e.segments)) g = O, z = function () {
                        var e, t, i;
                        for (i = [], h = e = 0, t = g; 0 <= t ? e <= t : e >= t; h = 0 <= t ? ++e : --e) i.push(h / g * (180 * THREE.Math.DEG2RAD) * 2);
                        return i
                    }();
                    else
                        for (z = [], h = c = 0, y = O.length - 1; 0 <= y ? c <= y : c >= y; h = 0 <= y ? ++c : --c) z[h] = O[h] / 180 * (180 * THREE.Math.DEG2RAD);
                    for (_ = this.geometry.vertices.length, a = z.length - 1, p = 8, h = d = 0, x = p - 1; 0 <= x ? d <= x : d >= x; h = 0 <= x ? ++d : --d) s = h / p * (180 * THREE.Math.DEG2RAD) * 2;
                    for (null != e.section_segments && ("number" == typeof e.section_segments ? (p = e.section_segments, s = function () {
                        var e, t, i;
                        for (i = [], h = e = 0, t = p - 1; 0 <= t ? e <= t : e >= t; h = 0 <= t ? ++e : --e) i.push(h / p * (180 * THREE.Math.DEG2RAD) * 2);
                        return i
                    }()) : (p = e.section_segments.length, s = function () {
                        var t, i, s;
                        for (s = [], h = t = 0, i = p - 1; 0 <= i ? t <= i : t >= i; h = 0 <= i ? ++t : --t) s.push(e.section_segments[h] / 180 * (180 * THREE.Math.DEG2RAD));
                        return s
                    }())); e.position.x.length < a + 1;) e.position.x.push(e.position.x[e.position.x.length - 1]);
                    for (; e.position.y.length < a + 1;) e.position.y.push(e.position.y[e.position.y.length - 1]);
                    for (; e.position.z.length < a + 1;) e.position.z.push(e.position.z[e.position.z.length - 1]);
                    for (; e.width.length < a + 1;) e.width.push(e.width[e.width.length - 1]);
                    for (; e.height.length < a + 1;) e.height.push(e.height[e.height.length - 1]);
                    for (r = u = 0, E = a; u <= E; r = u += 1)
                        for (t = z[r], S = Math.cos(t), V = Math.sin(t), h = f = 0, b = p - 1; f <= b; h = f += 1) i = s[h], D = .01 * (e.offset.x + e.position.x[r] + Math.cos(i) * e.height[r] + e.radius), F = .01 * (e.offset.y + e.position.y[r] + Math.sin(i) * e.width[r]), L = 0, k = S * D + V * L, A = S * L - V * D + .01 * e.offset.z, C = F, this.geometry.vertices.push(new THREE.Vector3(C, k, A));
                    for (r = m = 0, I = a - 1; m <= I; r = m += 1)
                        for (h = M = 0, w = p - 1; M <= w; h = M += 1) this.geometry.faces.push(new THREE.Face3(_ + (r + 1) * p + h, _ + r * p + h, _ + r * p + (h + 1) % p)), this.geometry.faces.push(new THREE.Face3(_ + (r + 1) * p + (h + 1) % p, _ + (r + 1) * p + h, _ + r * p + (h + 1) % p)), this.quads.push([this.geometry.faces[this.geometry.faces.length - 2], this.geometry.faces[this.geometry.faces.length - 1]]), o = (s[h] - s[0]) / (180 * THREE.Math.DEG2RAD) % 1, n = s[(h + 1) % s.length] - s[h], n < 0 && (n += 180 * THREE.Math.DEG2RAD * 2), l = o + n / (180 * THREE.Math.DEG2RAD), R = this.getTextureIndex(e.texture, r), 15 === R && (R = 13), 63 === R && (R = 31), v = R % 8 * .125, T = .25 * (3 - Math.floor(R / 8) + .1), o = v + .125 * (o + .1) * .8, l = v + .125 * (l + .1) * .8, H = T + .2, 31 === R && (v += .125 * this.hue, o = v, l = v), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(o, T), new THREE.Vector2(o, H), new THREE.Vector2(l, H)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(l, T), new THREE.Vector2(o, T), new THREE.Vector2(l, H)])
                }, e.prototype.I0O1l = function (e) {
                    var t, i, s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b, I, w, O, z, R, v, T;
                    for (R = this.geometry.vertices.length, p = Math.min(e.length.length, e.width.length - 1, e.angle.length, e.position.length - 1), null == e.offset && (e.offset = {
                        x: 0,
                        y: 0,
                        z: 0
                    }), v = 0, T = 0, o = l = 0, d = p; l <= d; o = l += 1) c = .01 * e.position[o], y = .01 * e.width[o], this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c - y / 2, .01 * e.offset.x + v, .01 * e.offset.z + T)), o < p && (t = Math.cos(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), m = Math.sin(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), 0 === o && (t = 1, m = 0), s = .01 * e.bump.size * y * t, i = .01 * -e.bump.size * y * m, this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c + y * e.bump.position * .01, .01 * e.offset.x + v + i, .01 * e.offset.z + T + s)), this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c + y * e.bump.position * .01, .01 * e.offset.x + v - i, .01 * e.offset.z + T - s))), this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c + y / 2, .01 * e.offset.x + v, .01 * e.offset.z + T)), null != e.length[o] && (t = Math.cos(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), m = Math.sin(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), r = .01 * e.length[o], v += r * t, T += r * m);
                    for (o = n = 0, u = p - 1; n <= u; o = n += 1) x = this.getTextureIndex(e.texture, o), 15 === x && (x = 13), 63 === x && (x = 31), E = x % 8 * .125, b = E + .0125, I = b + .1, w = .25 * (3 - Math.floor(x / 8) + .1), O = w + .2, z = w + (O - w) * (.5 + .01 * e.bump.position), 31 === x && (b = E + .125 * this.hue, I = b), o < p - 1 ? (this.geometry.faces.push(new THREE.Face3(R + 4 * o, R + 4 * o + 1, R + 4 * o + 4)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 4, R + 4 * o + 1, R + 4 * o + 5)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 1, R + 4 * o + 3, R + 4 * o + 5)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 5, R + 4 * o + 3, R + 4 * o + 7)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, w), new THREE.Vector2(b, z), new THREE.Vector2(I, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(I, w), new THREE.Vector2(b, z), new THREE.Vector2(I, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(b, O), new THREE.Vector2(I, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(I, z), new THREE.Vector2(b, O), new THREE.Vector2(I, O)]), e.doubleside && (this.geometry.faces.push(new THREE.Face3(R + 4 * o, R + 4 * o + 4, R + 4 * o + 2)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 4, R + 4 * o + 6, R + 4 * o + 2)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 2, R + 4 * o + 6, R + 4 * o + 3)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 6, R + 4 * o + 7, R + 4 * o + 3)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, w), new THREE.Vector2(I, w), new THREE.Vector2(b, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(I, w), new THREE.Vector2(I, z), new THREE.Vector2(b, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, z), new THREE.Vector2(b, O)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(I, z), new THREE.Vector2(I, O), new THREE.Vector2(b, O)]))) : (this.geometry.faces.push(new THREE.Face3(R + 4 * o, R + 4 * o + 1, R + 4 * o + 4)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 4, R + 4 * o + 1, R + 4 * o + 5)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 1, R + 4 * o + 3, R + 4 * o + 5)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, w), new THREE.Vector2(b, z), new THREE.Vector2(I, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(I, w), new THREE.Vector2(b, z), new THREE.Vector2(I, O)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(b, O), new THREE.Vector2(I, O)]), e.doubleside && (this.geometry.faces.push(new THREE.Face3(R + 4 * o, R + 4 * o + 4, R + 4 * o + 2)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 4, R + 4 * o + 5, R + 4 * o + 2)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 2, R + 4 * o + 5, R + 4 * o + 3)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, w), new THREE.Vector2(I, w), new THREE.Vector2(b, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(I, w), new THREE.Vector2(I, O), new THREE.Vector2(b, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, O), new THREE.Vector2(b, O)])));
                    for (R = this.geometry.vertices.length, v = 0, T = 0, o = a = 0, f = p; a <= f; o = a += 1) c = .01 * e.position[o], y = .01 * e.width[o], this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c - y / 2, .01 * -e.offset.x + v, .01 * e.offset.z + T)), o < p && (t = Math.cos(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), m = Math.sin(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), 0 === o && (t = 1, m = 0), s = .01 * e.bump.size * y * t, i = .01 * e.bump.size * y * m, this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c + y * e.bump.position * .01, .01 * -e.offset.x + v + i, .01 * e.offset.z + T + s)), this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c + y * e.bump.position * .01, .01 * -e.offset.x + v - i, .01 * e.offset.z + T - s))), this.geometry.vertices.push(new THREE.Vector3(.01 * e.offset.y + c + y / 2, .01 * -e.offset.x + v, .01 * e.offset.z + T)), null != e.length[o] && (t = Math.cos(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), m = Math.sin(e.angle[o] * (180 * THREE.Math.DEG2RAD) / 180), r = .01 * e.length[o], v -= r * t, T += r * m);
                    for (o = h = 0, g = p - 1; h <= g; o = h += 1) x = this.getTextureIndex(e.texture, o), 15 === x && (x = 13), 63 === x && (x = 31), E = x % 8 * .125, b = E + .0125, I = b + .1, w = .25 * (3 - Math.floor(x / 8) + .1), O = w + .2, z = w + (O - w) * (.5 + .01 * e.bump.position), 31 === x && (b = E + .125 * this.hue, I = b), o < p - 1 ? (this.geometry.faces.push(new THREE.Face3(R + 4 * o + 1, R + 4 * o, R + 4 * o + 4)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 1, R + 4 * o + 4, R + 4 * o + 5)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 3, R + 4 * o + 1, R + 4 * o + 5)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 3, R + 4 * o + 5, R + 4 * o + 7)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(b, w), new THREE.Vector2(I, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, w), new THREE.Vector2(I, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, O), new THREE.Vector2(b, z), new THREE.Vector2(I, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, O), new THREE.Vector2(I, z), new THREE.Vector2(I, O)]), e.doubleside && (this.geometry.faces.push(new THREE.Face3(R + 4 * o + 2, R + 4 * o + 4, R + 4 * o)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 2, R + 4 * o + 6, R + 4 * o + 4)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 3, R + 4 * o + 6, R + 4 * o + 2)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 3, R + 4 * o + 7, R + 4 * o + 6)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, w), new THREE.Vector2(b, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, z), new THREE.Vector2(I, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, O), new THREE.Vector2(I, z), new THREE.Vector2(b, z)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, O), new THREE.Vector2(I, O), new THREE.Vector2(I, z)]))) : (this.geometry.faces.push(new THREE.Face3(R + 4 * o + 1, R + 4 * o, R + 4 * o + 4)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 1, R + 4 * o + 4, R + 4 * o + 5)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 3, R + 4 * o + 1, R + 4 * o + 5)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(b, w), new THREE.Vector2(I, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, w), new THREE.Vector2(I, O)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, O), new THREE.Vector2(b, z), new THREE.Vector2(I, O)]), e.doubleside && (this.geometry.faces.push(new THREE.Face3(R + 4 * o + 2, R + 4 * o + 4, R + 4 * o)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 2, R + 4 * o + 5, R + 4 * o + 4)), this.geometry.faces.push(new THREE.Face3(R + 4 * o + 3, R + 4 * o + 5, R + 4 * o + 2)), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, w), new THREE.Vector2(b, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, z), new THREE.Vector2(I, O), new THREE.Vector2(I, w)]), this.geometry.faceVertexUvs[0].push([new THREE.Vector2(b, O), new THREE.Vector2(I, O), new THREE.Vector2(b, z)])))
                }, e.prototype.computeBounds = function () {
                    var e, t, i, s, o, l, n, r;
                    for (o = 0, i = 0, l = 0, s = 0, n = this.geometry.vertices, e = 0, t = n.length; e < t; e++) r = n[e], o = Math.min(o, r.x), l = Math.min(l, r.y), i = Math.max(i, r.x), s = Math.max(s, r.y);
                    return this.bounds = {
                        minx: o,
                        maxx: i,
                        miny: l,
                        maxy: s,
                        width: i - o,
                        height: s - l,
                        cx: (o + i) / 2,
                        cy: (l + s) / 2
                    }
                }, e.prototype.shapePoint = function (e, t, i) {
                    var s, o, l;
                    return l = i.length, s = Math.atan2(t, -e), s = Math.round((s + 180 * THREE.Math.DEG2RAD * 2) / (180 * THREE.Math.DEG2RAD * 2) * l) % l, o = Math.sqrt(e * e + t * t), i[s] = Math.max(i[s], o)
                }, e.prototype.lIlO0 = function (e) {
                    var t, i, s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x;
                    for (null == e && (e = 50), u = [], s = l = 0, p = e - 1; 0 <= p ? l <= p : l >= p; s = 0 <= p ? ++l : --l) u[s] = 0;
                    for (c = this.geometry.faces, n = 0, r = c.length; n < r; n++)
                        for (i = c[n], f = this.geometry.vertices[i.a], g = this.geometry.vertices[i.b], m = this.geometry.vertices[i.c], s = a = 0; a <= 99; s = a += 1) t = s / 100, y = f.x * t + g.x * (1 - t), x = f.y * t + g.y * (1 - t), this.shapePoint(y, x, u), y = m.x * t + g.x * (1 - t), x = m.y * t + g.y * (1 - t), this.shapePoint(y, x, u), y = m.x * t + f.x * (1 - t), x = m.y * t + f.y * (1 - t), this.shapePoint(y, x, u);
                    for (s = h = 0, d = u.length - 1; h <= d; s = h += 1) u[s] *= 2 * this.data.size;
                    for (o in u) u[o] = parseFloat(u[o].toFixed(3));
                    return u
                }, e.prototype.O0I01 = function (t) {
                    var i, s, o, l, n, r, a;
                    return null == t && (t = 128), a = new THREE.Scene, i = new THREE.OrthographicCamera(0, t, 0, t, 1, 3e3), this.material.emissive.setHex(16777215), this.material.emissiveMap = IIO0O, this.material.side = THREE.DoubleSide, this.material.color.setHex(0), this.OII1l.opacity = 0, a.add(this.lI001), this.lI001.position.set(t / 2, t / 2, -1e3), this.computeBounds(), r = .9 * Math.min(t / this.bounds.width, t / this.bounds.height), o = r * this.bounds.cy, l = r * this.bounds.cx, this.lI001.position.set(t / 2 - o, t / 2 - l, -1e3), n = r, this.lI001.scale.set(n, n, n), this.lI001.rotation.z = 180 * THREE.Math.DEG2RAD / 2, e.OlOlI || (e.OlOlI = new THREE.WebGLRenderer({
                        antialias: !0,
                        alpha: !0
                    })), e.OlOlI.setSize(t, t), e.OlOlI.render(a, i), s = document.createElement("canvas"), s.width = t, s.height = t, s.getContext("2d").drawImage(e.OlOlI.domElement, 0, 0), s
                }, e.prototype.get3DImage = function (t, i) {
                    var s, o, l, n, r;
                    return null == t && (t = 128), null == i && (i = 0), r = new THREE.Scene, s = new THREE.OrthographicCamera(0, t, 0, t, 1, 3e3), this.OII1l.opacity = 1, this.finish = "alloy", this.l0lOl(), this.mesh.material = this.material, r.add(this.lI001), l = new THREE.DirectionalLight, l.position.set(2, -1, 1), r.add(l), this.lI001.position.set(t / 2, t / 2, -1e3), n = .25 * t, this.lI001.scale.set(-n, n, n), this.lI001.rotation.z = 180 * THREE.Math.DEG2RAD / 2 + i, this.lI001.rotation.x = 180 * THREE.Math.DEG2RAD / 4, this.lI001.rotation.order = "XYZ", e.OlOlI || (e.OlOlI = new THREE.WebGLRenderer({
                        antialias: !0,
                        alpha: !0
                    })), e.OlOlI.setSize(t, t), e.OlOlI.render(r, s), o = document.createElement("canvas"), o.width = t, o.height = t, o.getContext("2d").drawImage(e.OlOlI.domElement, 0, 0), o
                }, e.prototype.getIcon = function (t) {
                    var i, s, o, l, n, r, a;
                    return null == t && (t = 64), a = new THREE.Scene, i = new THREE.OrthographicCamera(0, t, 0, t, 1, 3e3), this.material = new THREE.MeshBasicMaterial({
                        color: 16777215,
                        side: THREE.DoubleSide
                    }), this.mesh.material = this.material, this.OII1l.opacity = 0, a.add(this.lI001), this.computeBounds(), r = .9 * Math.min(t / this.bounds.width, t / this.bounds.height), o = r * this.bounds.cy, l = r * this.bounds.cx, this.lI001.position.set(t / 2 - o, t / 2 - l, -1e3), n = r, this.lI001.scale.set(n, n, n), this.lI001.rotation.z = 180 * THREE.Math.DEG2RAD / 2, e.OlOlI || (e.OlOlI = new THREE.WebGLRenderer({
                        antialias: !0,
                        alpha: !0
                    })), e.OlOlI.setSize(t, t), e.OlOlI.render(a, i), s = document.createElement("canvas"), s.width = t, s.height = t, s.getContext("2d").drawImage(e.OlOlI.domElement, 0, 0), s
                }, e.prototype.getHorizontalThumbnail = function (t, i) {
                    var s, o, l, n, r, a, h, p, c, d, u, f, g, m;
                    for (null == t && (t = 128), null == i && (i = 0), f = new THREE.Scene, s = new THREE.OrthographicCamera(0, 2 * t, 0, t, 1, 3e3), this.OII1l.opacity = .5, f.add(this.lI001), this.lI001.position.set(t, t / 2, -1e3), u = .4 * t, this.lI001.scale.set(u, -u, u), c = new THREE.DirectionalLight(16777215), c.position.set(1, -.5, 3), f.add(c), this.lI001.rotation.z = 180 * THREE.Math.DEG2RAD, e.OlOlI || (e.OlOlI = new THREE.WebGLRenderer({
                        antialias: !0,
                        alpha: !0
                    })), e.OlOlI.setSize(2 * t, t), e.OlOlI.render(f, s), o = document.createElement("canvas"), o.width = 2 * t, o.height = t, o.getContext("2d").drawImage(e.OlOlI.domElement, 0, 0), l = o.getContext("2d"), l.translate(t, t / 2), l.rotate(-180 * THREE.Math.DEG2RAD / 2), l.translate(0, t / 2), l.scale(t / 15, t / 15), m = OllIl.getShape(parseInt(i)), r = 0, h = m.length; r < h; r++) {
                        for (g = m[r], l.beginPath(), n = l.createRadialGradient(0, 0, 0, 0, 0, 2), n.addColorStop(0, "hsl(" + Math.floor(360 * this.hue) + ",100%,100%)"), n.addColorStop(1, "hsl(" + Math.floor(360 * this.hue) + ",80%,40%)"), l.fillStyle = n, a = 0, p = g.length; a < p; a++) d = g[a], l.lineTo(d[1], d[0]);
                        l.closePath(), l.fill()
                    }
                    return o
                }, e.prototype.getThumbnail = function (t, i) {
                    var s, o, l, n, r, a, h, p, c, d, u, f, g, m;
                    for (null == t && (t = 128), null == i && (i = 0), f = new THREE.Scene, s = new THREE.OrthographicCamera(0, t, 0, t, 1, 3e3), this.OII1l.opacity = .5, f.add(this.lI001), this.lI001.position.set(t / 2, t / 2, -1e3), u = .4 * t, this.lI001.scale.set(u, -u, u), c = new THREE.PointLight(16777215, 1, 0), c.position.set(.3 * t, .3 * t, t - 1e3), f.add(c), this.lI001.rotation.z = 180 * THREE.Math.DEG2RAD / 2, e.OlOlI || (e.OlOlI = new THREE.WebGLRenderer({
                        antialias: !0,
                        alpha: !0
                    })), e.OlOlI.setSize(t, t), e.OlOlI.render(f, s), o = document.createElement("canvas"), o.width = t, o.height = t, o.getContext("2d").drawImage(e.OlOlI.domElement, 0, 0), l = o.getContext("2d"), l.translate(t / 2, t / 8), l.scale(t / 20, t / 20), m = OllIl.getShape(parseInt(i)), r = 0, h = m.length; r < h; r++) {
                        for (g = m[r], l.beginPath(), n = l.createRadialGradient(0, 0, 0, 0, 0, 2), n.addColorStop(0, "hsl(" + Math.floor(360 * this.hue) + ",100%,100%)"), n.addColorStop(1, "hsl(" + Math.floor(360 * this.hue) + ",80%,40%)"), l.fillStyle = n, a = 0, p = g.length; a < p; a++) d = g[a], l.lineTo(d[1], d[0]);
                        l.closePath(), l.fill()
                    }
                    return o
                }, e.exportThumbnail = function (t, i, s, o, l) {
                    var n;
                    return null == t && (t = 101), null == i && (i = 0), null == s && (s = "zinc"), null == o && (o = 0), null == l && (l = 128), n = new e(llll1.ships_by_code[t], i / 360, s), n.getThumbnail(l, o)
                }, e.exportHorizontalThumbnail = function (t, i, s, o, l) {
                    var n;
                    return null == t && (t = 101), null == i && (i = 0), null == s && (s = "zinc"), null == o && (o = 0), null == l && (l = 128), n = new e(llll1.ships_by_code[t], i / 360, s), n.getHorizontalThumbnail(l, o)
                }, e.icons_buffer = [], e.getShipIcon = function (t) {
                    var i, s;
                    return null == e.icons_buffer[t] && null != (s = llll1.ships_by_code[t]) && (i = new e(s, 0), e.icons_buffer[t] = i.getIcon(), i.dispose()), e.icons_buffer[t]
                }, e
        }(), this.I0lll = function () {
            var e, t, i, s;
            return e = document.createElement("canvas"), e.width = 64, e.height = 64, t = e.getContext("2d"), t.clearRect(0, 0, e.width, e.height), t.save(), t.translate(e.width / 2, .75 * e.height), t.scale(e.width / 2, .75 * -e.height), i = t.createRadialGradient(0, 0, 0, 0, 0, 1), i.addColorStop(0, "rgba(255,255,255,1)"), i.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = i, t.fillRect(-1, -1, 2, 2), i = t.createLinearGradient(0, -1, 0, 1), i.addColorStop(0, "rgba(255,255,255,1)"), i.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = i, t.globalCompositeOperation = "destination-in", t.fillRect(-1, -1, 2, 2), t.restore(), s = new THREE.Texture(e), s.needsUpdate = !0, s
        }, I1O0O = this.I0lll(), lOI1O = function () {
            function e(e) {
                var t, i, s, o;
                for (this.seed = e,
                    this.table = [670, 243, 963, 607, 432, 29, 624, 809, 254, 752, 691, 904, 275, 984, 586, 94, 1014, 614, 252, 178, 488, 954, 55, 836, 186, 858, 719, 562, 685, 898, 167, 844, 639, 505, 85, 386, 520, 988, 561, 889, 91, 329, 900, 847, 334, 531, 168, 57, 789, 529, 259, 323, 313, 72, 153, 606, 694, 442, 547, 922, 242, 983, 965, 876, 39, 728, 383, 109, 343, 810, 815, 144, 457, 434, 221, 279, 328, 136, 674, 556, 502, 896, 582, 250, 665, 370, 926, 912, 118, 543, 365, 467, 311, 700, 15, 297, 609, 731, 476, 634, 715, 777, 62, 1007, 525, 942, 310, 627, 630, 448, 437, 822, 300, 339, 924, 583, 92, 800, 698, 312, 542, 740, 271, 778, 895, 447, 175, 957, 17, 481, 347, 283, 366, 277, 843, 966, 927, 535, 503, 234, 746, 712, 1010, 544, 671, 295, 978, 729, 997, 287, 621, 782, 160, 433, 537, 121, 413, 304, 98, 657, 498, 946, 319, 595, 191, 341, 554, 523, 274, 209, 435, 644, 947, 979, 397, 261, 681, 786, 1006, 565, 472, 180, 318, 126, 874, 693, 526, 276, 340, 808, 884, 409, 486, 962, 960, 772, 901, 690, 359, 837, 129, 363, 509, 616, 88, 382, 730, 513, 623, 999, 504, 48, 4, 384, 281, 560, 417, 99, 773, 956, 943, 496, 558, 218, 170, 471, 536, 138, 19, 266, 6, 868, 845, 16, 985, 866, 601, 445, 458, 894, 950, 349, 1017, 125, 495, 723, 446, 647, 834, 880, 272, 475, 483, 227, 357, 750, 851, 139, 406, 336, 158, 284, 482, 324, 991, 632, 587, 663, 74, 256, 541, 120, 801, 831, 46, 522, 589, 1, 571, 368, 137, 761, 885, 968, 982, 948, 785, 391, 840, 932, 829, 117, 641, 466, 367, 688, 733, 229, 735, 14, 205, 31, 316, 333, 183, 521, 795, 58, 1021, 282, 794, 939, 40, 394, 793, 1002, 763, 212, 484, 133, 260, 465, 396, 769, 518, 955, 497, 377, 145, 508, 514, 224, 196, 454, 176, 975, 865, 1005, 1023, 986, 596, 426, 893, 551, 90, 130, 873, 22, 709, 686, 436, 236, 661, 579, 764, 362, 141, 112, 970, 987, 12, 317, 369, 26, 344, 66, 803, 493, 716, 9, 637, 945, 225, 703, 78, 346, 751, 123, 1009, 1016, 27, 52, 864, 902, 921, 292, 314, 599, 799, 263, 626, 338, 953, 491, 892, 353, 692, 917, 540, 882, 677, 744, 633, 821, 327, 60, 1020, 928, 788, 360, 414, 430, 462, 824, 820, 727, 398, 342, 273, 726, 981, 84, 82, 206, 388, 720, 806, 652, 550, 238, 159, 134, 732, 897, 500, 881, 805, 814, 701, 717, 566, 7, 211, 604, 816, 56, 658, 107, 61, 374, 320, 501, 13, 642, 863, 791, 438, 348, 97, 214, 86, 305, 875, 656, 24, 364, 767, 156, 879, 590, 734, 920, 655, 577, 83, 584, 660, 38, 100, 299, 580, 990, 636, 944, 463, 766, 996, 714, 8, 515, 87, 198, 280, 444, 131, 404, 108, 278, 487, 223, 598, 410, 395, 199, 268, 989, 75, 195, 760, 916, 977, 421, 11, 1e3, 813, 216, 817, 823, 164, 668, 739, 572, 30, 707, 798, 291, 564, 77, 456, 478, 68, 643, 615, 172, 841, 672, 919, 1012, 613, 385, 980, 711, 771, 682, 232, 765, 143, 620, 631, 861, 468, 622, 201, 325, 424, 189, 608, 403, 775, 646, 673, 1013, 400, 859, 838, 345, 210, 860, 65, 63, 34, 755, 161, 479, 235, 783, 460, 826, 507, 854, 839, 666, 802, 441, 114, 443, 738, 770, 929, 857, 907, 741, 935, 949, 322, 995, 217, 667, 269, 184, 650, 1018, 506, 290, 787, 459, 721, 828, 567, 222, 494, 142, 743, 405, 76, 722, 588, 147, 899, 270, 695, 597, 337, 155, 569, 679, 853, 450, 21, 517, 197, 371, 257, 380, 244, 553, 952, 381, 827, 524, 877, 702, 306, 600, 1011, 431, 781, 594, 387, 1019, 411, 533, 659, 177, 725, 930, 933, 832, 41, 2, 687, 1008, 439, 307, 891, 871, 415, 651, 308, 298, 811, 0, 194, 592, 241, 918, 18, 973, 110, 654, 967, 490, 683, 914, 128, 992, 964, 122, 230, 149, 289, 392, 416, 852, 936, 262, 102, 938, 511, 255, 510, 165, 105, 419, 958, 294, 379, 49, 699, 330, 593, 539, 710, 106, 79, 440, 200, 704, 961, 326, 321, 759, 193, 890, 44, 549, 913, 776, 909, 552, 972, 132, 429, 748, 532, 115, 888, 635, 842, 649, 747, 807, 887, 856, 784, 148, 530, 116, 157, 372, 754, 28, 581, 67, 187, 202, 818, 181, 45, 959, 146, 124, 994, 872, 675, 706, 253, 247, 625, 570, 152, 423, 185, 361, 849, 971, 546, 412, 830, 1022, 188, 850, 140, 220, 451, 219, 768, 1015, 455, 780, 976, 449, 969, 848, 293, 249, 59, 390, 512, 538, 578, 906, 819, 862, 974, 33, 911, 135, 908, 248, 401, 951, 527, 169, 676, 640, 1003, 591, 103, 37, 285, 684, 104, 163, 753, 1004, 934, 645, 470, 774, 20, 489, 228, 461, 492, 469, 998, 296, 233, 869, 605, 315, 36, 5, 425, 878, 617, 886, 23, 355, 993, 93, 473, 555, 474, 464, 937, 925, 1001, 611, 35, 812, 174, 53, 286, 680, 267, 428, 335, 883, 653, 69, 718, 585, 749, 150, 408, 393, 915, 576, 664, 629, 756, 402, 638, 602, 245, 43, 545, 213, 303, 192, 70, 453, 910, 407, 742, 111, 548, 835, 452, 575, 903, 619, 376, 154, 302, 151, 804, 867, 574, 563, 239, 648, 179, 855, 378, 618, 264, 669, 427, 354, 399, 265, 50, 796, 166, 923, 825, 697, 534, 54, 173, 870, 792, 162, 713, 246, 89, 51, 350, 705, 251, 557, 237, 240, 736, 689, 203, 519, 73, 81, 628, 288, 331, 204, 528, 480, 389, 32, 418, 573, 757, 358, 215, 226, 42, 779, 231, 171, 190, 612, 301, 762, 708, 420, 846, 208, 485, 351, 790, 737, 10, 258, 309, 797, 127, 516, 559, 499, 352, 71, 758, 25, 568, 113, 3, 610, 101, 375, 96, 603, 745, 64, 80, 477, 332, 833, 940, 373, 905, 422, 182, 356, 941, 47, 119, 662, 931, 696, 95, 724, 678, 207], s = this.table.length, t = i = 0, o = s - 1; 0 <= o ? i <= o : i >= o; t = 0 <= o ? ++i : --i) this.table.push(this.table[t]);
                this.seed < 1 && (this.seed *= 1 << 30), this.size = 1024, this.normalize = 1 / 1023, this.I01O0 = 1023, this.IOI1I = this.seed & this.I01O0, this.O11Il = this.seed >> 10 & this.I01O0, this.O1l11 = this.seed >> 20 & this.I01O0, this.c2d = [], this.lI0I1 = Math.cos(.3), this.lOOIO = Math.sin(.3)
            }
            return e.prototype.lOOI0 = function (e, t, i) {
                var s;
                return s = (-2 * i + 3) * i * i, e * (1 - s) + t * s
            }, e.prototype.ll0OI = function (e, t, i) {
                return e * (1 - i) + t * i
            }, e.prototype.noise1d = function (e) {
                var t, i, s, o;
                return o = Math.floor(e), t = e - o, o &= this.I01O0, i = this.table[this.IOI1I + this.table[o]], s = this.table[this.IOI1I + this.table[o + 1]], this.lOOI0(i, s, t) * this.normalize
            }, e.prototype.lO1OO = function (e, t) {
                var i, s, o, l, n, r, a, h;
                return a = Math.floor(e), h = Math.floor(t), i = e - a, s = t - h, a &= this.I01O0, h &= this.I01O0, o = this.table[this.IOI1I + this.table[a + this.table[h + this.O11Il]]], l = this.table[this.IOI1I + this.table[a + 1 + this.table[h + this.O11Il]]], n = this.table[this.IOI1I + this.table[a + this.table[h + 1 + this.O11Il]]], r = this.table[this.IOI1I + this.table[a + 1 + this.table[h + 1 + this.O11Il]]], this.lOOI0(this.lOOI0(o, l, i), this.lOOI0(n, r, i), s) * this.normalize
            }, e.prototype.OI0lI = function (e, t, i) {
                var s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x;
                return m = Math.floor(e), y = Math.floor(t), x = Math.floor(i), s = e - m, o = t - y, l = i - x, m &= this.I01O0, y &= this.I01O0, x &= this.I01O0, n = this.table[this.IOI1I + this.table[m + this.table[y + this.table[this.O11Il + this.table[x + this.O1l11]]]]], r = this.table[this.IOI1I + this.table[m + 1 + this.table[y + this.table[this.O11Il + this.table[x + this.O1l11]]]]], a = this.table[this.IOI1I + this.table[m + this.table[y + 1 + this.table[this.O11Il + this.table[x + this.O1l11]]]]], h = this.table[this.IOI1I + this.table[m + 1 + this.table[y + 1 + this.table[this.O11Il + this.table[x + this.O1l11]]]]], p = this.table[this.IOI1I + this.table[m + this.table[y + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], c = this.table[this.IOI1I + this.table[m + 1 + this.table[y + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], d = this.table[this.IOI1I + this.table[m + this.table[y + 1 + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], u = this.table[this.IOI1I + this.table[m + 1 + this.table[y + 1 + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], f = this.lOOI0(this.lOOI0(n, r, s), this.lOOI0(a, h, s), o), g = this.lOOI0(this.lOOI0(p, c, s), this.lOOI0(d, u, s), o), this.lOOI0(f, g, l) * this.normalize
            }, e.prototype.lI101 = function (e, t, i) {
                var s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x;
                return m = Math.floor(e), y = Math.floor(t), x = Math.floor(i), s = e - m, o = t - y, l = i - x, m &= this.I01O0, y &= this.I01O0, x &= this.I01O0, n = this.table[this.IOI1I + this.table[m + this.table[y + this.table[this.O11Il + this.table[x + this.O1l11]]]]], r = this.table[this.IOI1I + this.table[m + 1 + this.table[y + this.table[this.O11Il + this.table[x + this.O1l11]]]]], a = this.table[this.IOI1I + this.table[m + this.table[y + 1 + this.table[this.O11Il + this.table[x + this.O1l11]]]]], h = this.table[this.IOI1I + this.table[m + 1 + this.table[y + 1 + this.table[this.O11Il + this.table[x + this.O1l11]]]]], p = this.table[this.IOI1I + this.table[m + this.table[y + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], c = this.table[this.IOI1I + this.table[m + 1 + this.table[y + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], d = this.table[this.IOI1I + this.table[m + this.table[y + 1 + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], u = this.table[this.IOI1I + this.table[m + 1 + this.table[y + 1 + this.table[this.O11Il + this.table[x + 1 + this.O1l11]]]]], f = this.ll0OI(this.ll0OI(n, r, s), this.ll0OI(a, h, s), o), g = this.ll0OI(this.ll0OI(p, c, s), this.ll0OI(d, u, s), o), this.ll0OI(f, g, l) * this.normalize
            }, e.prototype.OO00I = function (e, t, i) { }, e.prototype.basic1d = function (e, t, i, s) {
                var o, l, n, r, a;
                for (null == t && (t = 5), null == i && (i = .5), null == s && (s = 1.9), a = 0, o = 1, n = 0, l = 1, r = t; l <= r; l += 1) a += this.noise1d(e) * o, n += o, o *= i, e *= s;
                return a / n
            }, e.prototype.IO1ll = function (e, t, i, s, o, l, n) {
                var r, a, h, p, c, d, u;
                for (null == i && (i = 5), null == s && (s = .5), null == o && (o = 1.9), null == l && (l = this.lI0I1), null == n && (n = this.lOOIO), u = 0, r = 1, h = 0, a = 1, d = i; a <= d; a += 1) u += this.lO1OO(e, t) * r, h += r, r *= s, p = o * (e * l + t * n), c = o * (t * l - e * n), e = p, t = c;
                return u / h
            }, e.prototype.II0lI = function (e, t, i, s, o, l, n, r) {
                var a, h, p, c, d, u, f;
                for (null == s && (s = 5), null == o && (o = .5), null == l && (l = 1.9), null == n && (n = this.lI0I1), null == r && (r = this.lOOIO), f = 0, a = 1, p = 0, h = 1, u = s; h <= u; h += 1) f += this.OI0lI(e, t, i) * a, p += a, a *= o, c = l * (e * n + t * r), d = l * (t * n - e * r), e = c, t = d, i *= l;
                return f / p
            }, e.prototype.periodicBasic1d = function (e, t, i, s, o) {
                var l, n, r, a;
                return null == i && (i = 5), null == s && (s = .5), null == o && (o = 1.9), n = Math.floor(e / t), l = e / t - n, r = this.basic1d(l * t, i, s, o), a = this.basic1d(l * t + t, i, s, o), this.lOOI0(r, a, 1 - l)
            }, e.prototype.Ol1O0 = function (e, t, i, s, o, l, n, r) {
                var a, h, p, c, d, u, f, g;
                return null == s && (s = 5), null == o && (o = .5), null == l && (l = 1.9), null == n && (n = this.lI0I1), null == r && (r = this.lOOIO), p = Math.floor(e / i), c = Math.floor(t / i), a = e / i - p, h = t / i - c, d = this.IO1ll(a * i, h * i, s, o, l, n, r), u = this.IO1ll(a * i + i, h * i, s, o, l, n, r), f = this.IO1ll(a * i, h * i + i, s, o, l, n, r), g = this.IO1ll(a * i + i, h * i + i, s, o, l, n, r), this.lOOI0(this.lOOI0(d, u, 1 - a), this.lOOI0(f, g, 1 - a), 1 - h)
            }, e.prototype.turbulence2d = function (e, t, i, s, o, l, n) {
                var r, a, h, p, c, d, u;
                for (null == i && (i = 5), null == s && (s = .5), null == o && (o = 1.9), null == l && (l = this.lI0I1), null == n && (n = this.lOOIO), u = 0, r = 1, h = 0, a = 1, d = i; a <= d; a += 1) u += 2 * (.5 - Math.abs(.5 - this.lO1OO(e, t))) * r, h += r, r *= s, p = o * (e * l + t * n), c = o * (t * l - e * n), e = p, t = c;
                return u / h
            }, e.prototype.turbulence3d = function (e, t, i, s, o, l, n, r) {
                var a, h, p, c, d, u, f, g;
                for (null == s && (s = 5), null == o && (o = .5), null == l && (l = 1.9), null == n && (n = this.lI0I1), null == r && (r = this.lOOIO), g = 0, a = 1, p = 0, h = 1, f = s; h <= f; h += 1) g += 2 * (.5 - Math.abs(.5 - this.lO1OO(e, t, i))) * a, p += a, a *= o, c = l * (e * n + t * r), d = l * (t * n - e * r), u = l * i, e = c, t = d, i = u;
                return g / p
            }, e.prototype.periodicTurbulence2d = function (e, t, i, s, o, l, n, r) {
                var a, h, p, c, d, u, f, g;
                return null == s && (s = 5), null == o && (o = .5), null == l && (l = 1.9), null == n && (n = this.lI0I1), null == r && (r = this.lOOIO), p = Math.floor(e / i), c = Math.floor(t / i), a = e / i - p, h = t / i - c, d = this.turbulence2d(a * i, h * i, s, o, l, n, r), u = this.turbulence2d(a * i + i, h * i, s, o, l, n, r), f = this.turbulence2d(a * i, h * i + i, s, o, l, n, r), g = this.turbulence2d(a * i + i, h * i + i, s, o, l, n, r), this.lOOI0(this.lOOI0(d, u, 1 - a), this.lOOI0(f, g, 1 - a), 1 - h)
            }, e.prototype.IOOOO = function (e, t, i, s, o, l, n) {
                var r, a, h, p, c, d, u, f, g;
                for (null == i && (i = 5), null == s && (s = .5), null == o && (o = 1.9), null == l && (l = this.lI0I1), null == n && (n = this.lOOIO), f = 0, r = 1, a = 1, p = 0, h = 1, u = i; h <= u; h += 1) g = 2 * this.lO1OO(e, t), g > 1 && (g = 2 - g), g = Math.pow(g, 2), f += r * a * g, r = g, p += a, a *= s, c = o * (e * l + t * n), d = o * (t * l - e * n), e = c, t = d;
                return f / p
            }, e.prototype.lIl00 = function (e, t, i, s, o, l, n, r) {
                var a, h, p, c, d, u, f, g, m, y, x;
                for (null == s && (s = 5), null == o && (o = .5), null == l && (l = 1.9), null == n && (n = this.lI0I1), null == r && (r = this.lOOIO), y = 0, a = 1, h = 1, d = 0, p = 1, m = s; p <= m; p += 1) x = 2 * this.OI0lI(e, t, i), x > 1 && (x = 2 - x), x = Math.pow(x, 2), y += a * h * x, a = x, d += h, h *= o, u = e * n + t * r, f = t * n - e * r, c = f * n + i * r, g = i * n - f * r, e = l * u, t = l * c, i = l * g;
                return y / d
            }, e.prototype.lO101 = function (e, t, i) {
                var s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b, I, w, O, z, R, v, T, H, M;
                for (v = Math.floor(e), H = Math.floor(t), s = e - v, o = t - H, l = 100, n = 0, r = 0, a = 100, h = 0, p = 0, b = w = 0; w <= 2; b = w += 1)
                    for (I = O = 0; O <= 2; I = O += 1) T = (v - 1 + b) % i, M = (H - 1 + I) % i, z = -1 + b + this.table[this.IOI1I + this.table[T + this.table[this.O11Il + M]]] * this.normalize * .8 + .1, R = -1 + I + this.table[this.IOI1I + this.table[T + this.table[this.O11Il + this.table[M + 1]]]] * this.normalize * .8 + .1, f = s - z, y = o - R, c = f * f + y * y, c < l ? (a = l, h = n, p = r, l = c, n = z, r = R) : c < a && (a = c, h = z, p = R);
                return g = s - n, x = o - r, d = Math.sqrt(g * g + x * x), m = s - h, E = o - p, u = Math.sqrt(m * m + E * E), Math.min(d, u) / Math.max(d, u)
            }, e.prototype.Il0Ol = function (e, t, i) {
                var s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b;
                for (y = Math.floor(e), E = Math.floor(t), s = e - y, o = t - E, l = 100, 0, 0, n = 0, p = d = 0; d <= 2; p = d += 1)
                    for (c = u = 0; u <= 2; c = u += 1) x = (y - 1 + p) % i, b = (E - 1 + c) % i, f = -1 + p + this.table[this.IOI1I + this.table[x + this.table[this.O11Il + b]]] * this.normalize * .8 + .1, g = -1 + c + this.table[this.IOI1I + this.table[x + this.table[this.O11Il + this.table[b + 1]]]] * this.normalize * .8 + .1, m = this.table[this.IOI1I + this.table[x + this.table[this.O11Il + this.table[b + 17]]]], a = s - f, h = o - g, (r = a * a + h * h) < l && (l = r, f, g, n = m);
                return n * this.normalize
            }, e.prototype.l0lI1 = function (e, t, i, s) {
                var o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b, I, w, O, z, R, v, T, H, M, _, S, V, D, k, F, C, L, A, G, P, U;
                for (null == s && (s = 100), C = Math.floor(e), A = Math.floor(t), P = Math.floor(i), o = e - C, l = t - A, n = i - P, r = 100, a = 0, h = 0, p = 0, c = 100, d = 0, u = 0, f = 0, T = _ = 0; _ <= 2; T = _ += 1)
                    for (H = S = 0; S <= 2; H = S += 1) {
                        for (M = V = 0; V <= 2; M = V += 1) L = (C - 1 + T) % s & this.I01O0, G = (A - 1 + H) % s & this.I01O0, U = (P - 1 + M) % s & this.I01O0, D = -1 + T + this.table[this.IOI1I + this.table[L + this.table[this.O11Il + this.table[U + G]]]] * this.normalize, k = -1 + H + this.table[this.IOI1I + this.table[L + this.table[this.O11Il + this.table[this.table[G + U] + 1]]]] * this.normalize, F = -1 + M + this.table[this.IOI1I + this.table[L + this.table[this.O11Il + this.table[this.table[G + U] + 37]]]] * this.normalize;
                        x = o - D, I = l - k, z = n - F, g = x * x + I * I + z * z, g < r ? (c = r, d = a, u = h, f = p, r = g, a = D, h = k, p = F) : g < c && (c = g, d = D, u = k, f = F)
                    }
                return E = o - a, w = l - h, R = n - p, m = Math.sqrt(E * E + w * w + R * R), b = o - d, O = l - u, v = n - f, y = Math.sqrt(b * b + O * O + v * v), Math.min(m, y) / Math.max(m, y)
            }, e.ll110 = function (e) {
                var t, i, s, o, l, n;
                for (l = [], t = s = 0, o = e - 1; 0 <= o ? s <= o : s >= o; t = 0 <= o ? ++s : --s) l[t] = t;
                for (n = []; ;) {
                    if (0 === l.length) break;
                    i = Math.floor(Math.random() * l.length), n.push(l.splice(i, 1)[0])
                }
                return n
            }, e
        }(), module.exports = lOI1O, this.OlIOO = function () {
            function e(t) {
                var i, s, o, l;
                if (this.OO111 = t, this.key = localStorage.getItem("ECPKey"), null != this.key && this.key.length > 11 && (this.key = this.key.substring(this.key.length - 11, this.key.length)), this.verified = localStorage.getItem("ECPVerified"), this.custom = {
                    badge: localStorage.getItem("badge") || "star",
                    finish: localStorage.getItem("finish") || "alloy",
                    laser: localStorage.getItem("laser") || "1"
                }, "halloween" === this.custom.badge && (this.custom.badge = "seasonal", localStorage.setItem("badge", "seasonal")), "fullcolor" === this.custom.finish && (this.custom.finish = "alloy"), this.additional_badges = [], null != localStorage.getItem("additional_badges")) {
                    try {
                        this.additional_badges = JSON.parse(localStorage.getItem("additional_badges"))
                    } catch (e) {
                        e
                    }
                    for (l = this.additional_badges, s = 0, o = l.length; s < o; s++) i = l[s], e.options.badge[i.name] || (e.options.badge[i.url] = i.name)
                }
                this.key || "yes" !== this.verified || this.I10OI("no")
            }
            return e.prototype.OIIIl = function () {
                var e;
                return e = "xxxxx-xxxxx".replace(/x/g, function () {
                    return (16 * Math.random() | 0).toString(16)
                }), this.I0O11(e)
            }, e.prototype.I0O11 = function (e) {
                if (e !== this.key) return this.key = e, null != this.key && this.key.length > 11 && (this.key = this.key.substring(this.key.length - 11, this.key.length)), this.verified = "no", localStorage.setItem("ECPKey", this.key), localStorage.setItem("ECPVerified", "no")
            }, e.prototype.I0lII = function (e) {
                return /([0-9a-f]{5})-([0-9a-f]{5})/.test(e)
            }, e.prototype.I10OI = function (e) {
                return this.verified = e, localStorage.setItem("ECPVerified", this.verified)
            }, e.prototype.removeKey = function () {
                return localStorage.removeItem("ECPKey"), localStorage.removeItem("ECPVerified"), this.OO111.ll1II.reloadGame()
            }, e.prototype.I110O = function () {
                return "yes" === this.verified
            }, e.prototype.lIOll = function (e, t, i) {
                var s, o, l, n;
                if (this.OO111.ll1II.is_steam ? t && (null != e && this.I0O11(e), this.I10OI("yes"), this.verified = "yes") : e === this.key && this.I10OI(t ? "yes" : "no"), t && null != i) {
                    for (n = [], o = 0, l = i.length; o < l; o++) s = i[o], n.push(this.installCustomBadge(s.name, s.url));
                    return n
                }
            }, e.prototype.verify = function (e) {
                return this.OOO0O = new l0l11(this, function (t) {
                    return function (i, s) {
                        return t.region = s, t.verifyServer(i, e)
                    }
                }(this))
            }, e.prototype.verifyServer = function (e, t) {
                var i;
                return i = WSS.create(e), i.onmessage = function (e) {
                    return function (s) {
                        var o, l, n, r;
                        if (s = JSON.parse(s.data), e.I10OI(s.verified), e.additional_badges = [], localStorage.setItem("additional_badges", JSON.stringify(e.additional_badges)), e.I110O() && null != s.custom_badges)
                            for (r = s.custom_badges, l = 0, n = r.length; l < n; l++) o = r[l], e.installCustomBadge(o.name, o.url);
                        return t(e.I110O()), i.close()
                    }
                }(this), i.onopen = function (e) {
                    return function () {
                        return i.send(JSON.stringify({
                            name: "verify_key",
                            data: {
                                key: e.key
                            }
                        }))
                    }
                }(this)
            }, e.prototype.installCustomBadge = function (t, i) {
                var s, o, l, n;
                for (n = this.additional_badges, o = 0, l = n.length; o < l; o++)
                    if (s = n[o], s.url === i) return;
                return this.additional_badges.push({
                    name: t,
                    url: i
                }), localStorage.setItem("additional_badges", JSON.stringify(this.additional_badges)), e.options.badge[i] = t
            }, e.options = {
                badge: {
                    star: "Star",
                    reddit: "Reddit",
                    pirate: "Pirate",
                    csf: "Centauri Space Force",
                    pmf: "Proxima Mining Front",
                    nwac: "New World Army Citizens",
                    unge: "United Nations Green Eagles",
                    halo: "Halo Corsairs",
                    youtube: "Youtube",
                    twitch: "Twitch",
                    invader: "Invader",
                    empire: "Galactic Empire",
                    alliance: "Rebel Alliance",
                    sdf: "Soloist Defence Force",
                    paw: "Paw",
                    gamepedia: "Gamepedia",
                    discord: "Discord",
                    medic: "Medic",
                    blank: "Blank",
                    seasonal: "Seasonal"
                },
                finish: {
                    zinc: "Zinc",
                    alloy: "Alloy",
                    gold: "Gold",
                    titanium: "Titanium",
                    carbon: "Carbon"
                },
                laser: {
                    0: "Single",
                    1: "Double",
                    2: "Lightning",
                    3: "Digital"
                }
            }, e
        }(), bind = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }, this.showcase = function () {
            function showcase() {
                this.loadShip = bind(this.loadShip, this);
                var e, t, i, s;
                for (this.levels = [], this.editor = ace.edit("editor"), this.editor.$blockScrolling = Infinity, this.editor.setTheme("ace/theme/monokai"), this.editor.getSession().setMode("ace/mode/coffee"), this.editor.session.setOptions({
                    tabSize: 2,
                    useSoftTabs: !0
                }), this.update_time = 0, this.editor.getSession().on("change", function (e) {
                    return function () {
                        return e.update_time = Date.now() + 100
                    }
                }(this)), this.width = 1e3, this.height = 1e3, this.lIl1l = new THREE.Scene, this.OI1I0 = new THREE.PerspectiveCamera(20, this.width / this.height, 1, 1e3), this.OI1I0.position.y = -20, this.OI1I0.position.z = 20, this.OI1I0.lookAt(new THREE.Vector3(0, 0, 0)), this.OI1I0.updateProjectionMatrix(), this.II101 = new THREE.DirectionalLight(16777215), this.II101.position.set(1, -1, 4), this.lIl1l.add(this.II101), this.OlOlI = new THREE.WebGLRenderer({
                    antialias: !0,
                    transparent: !0,
                    alpha: !0
                }), this.OlOlI.setSize(this.width, this.height, !1), this.rotation = 0, document.getElementById("insiderenderpanel").appendChild(this.OlOlI.domElement), this.rotate_x = 45, this.rotate_y = 0, this.zoom = 1, this.OlOlI.setClearColor(new THREE.Color(16777215), 0), this.OlOlI.domElement.addEventListener("mousedown", function (e) {
                    return function (t) {
                        return e.mouseDown(t)
                    }
                }(this)), this.OlOlI.domElement.addEventListener("mousemove", function (e) {
                    return function (t) {
                        return e.mouseMove(t)
                    }
                }(this)), this.OlOlI.domElement.addEventListener("mousewheel", function (e) {
                    return function (t) {
                        return e.mouseWheel(t)
                    }
                }(this)), document.addEventListener("mouseup", function (e) {
                    return function (t) {
                        return e.mouseUp(t)
                    }
                }(this)), this.dragging = !1, this.O0111(), this.material_index = 0, this.materials = ["default", "Adjustable", "zinc", "alloy", "carbon", "titanium", "gold", "Electric-Blue", /*"Copper", "Diamond", */"FullColor"], this.model_index = 0, this.hue = 0, i = llll1.O0lII, e = 0, t = i.length; e < t; e++) s = i[e], null == this.levels[s.level] && (this.levels[s.level] = []), this.levels[s.level].push(100 * s.level + s.model);
                if (localStorage.getItem("code") && this.editor.setValue(localStorage.getItem("code"), -1), document.getElementById("exportPNG").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.export();
                    }
                }(this)), document.getElementById("Customize").addEventListener("mouseover", function () {
                    return function (t) {
                        var customize = document.querySelector("#Customize");
                        var isDragging = false;
                        var offsetX, offsetY;

                        customize.addEventListener("mousedown", function (event) {
                            if (!event.target.summary && !event.target.classList.contains("hue") && !event.target.classList.contains("saturation") && !event.target.classList.contains("lightness") && event.target.id !== "opacity" && event.target.id !== "shininess" && event.target.id !== "aply" && event.target.id !== "close") {
                                isDragging = true;
                                offsetX = event.clientX - customize.getBoundingClientRect().left;
                                offsetY = event.clientY - customize.getBoundingClientRect().top;
                            }
                        });

                        document.addEventListener("mousemove", function (event) {
                            if (!isDragging) return;

                            requestAnimationFrame(function () {
                                var newX = event.clientX - offsetX;
                                var newY = event.clientY - offsetY;

                                customize.style.left = newX + "px";
                                customize.style.top = newY + "px";
                            });
                        });

                        document.addEventListener("mouseup", function () {
                            isDragging = false;
                        });
                    }
                }(this)), document.getElementById("insiderenderpanel").addEventListener("mouseover", function () {
                    return function (t) {
                        var isGrabbing = false;
                        function toggleCursor() {
                            var insiderenderpanel = document.getElementById("insiderenderpanel");
                            if (insiderenderpanel) {
                                insiderenderpanel.style.cursor = isGrabbing ? "grabbing" : "grab";
                            }
                        }
                        var insiderenderpanel = document.getElementById("insiderenderpanel");
                        if (insiderenderpanel) {
                            insiderenderpanel.addEventListener("mousedown", function () {
                                isGrabbing = true;
                                toggleCursor();
                            });

                            window.addEventListener("mouseup", function () {
                                isGrabbing = false;
                                toggleCursor();
                            });
                        }
                    }
                }(this)), document.getElementById("move").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.setRotation(true);
                    }
                }(this)), document.getElementById("rotate").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.setRotation(false);
                    }
                }(this)), document.getElementById("aply").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.editorContentsChanged();
                    }
                }(this)), document.getElementById("changeMaterial").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.changeMaterial();
                    }
                }(this)), document.getElementById("customizeMaterial").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.customizeMaterial();
                    }
                }(this)), document.getElementById("close").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.customizeMaterial();
                    }
                }(this)), document.getElementById("changeHue").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.changeHue();
                    }
                }(this)), document.getElementById("loadModel").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.loadModel();
                    }
                }(this)), document.getElementById("closeModal").addEventListener("click", function (e) {
                    return function (t) {
                        return e.closeModal(t);
                    }
                }(this)), document.getElementById("copyPNG").addEventListener("click", function (e) {
                    return function (t) {
                        return t.preventDefault(), e.getImage();
                    }
                }(this)), document.getElementById("loadbackground").addEventListener("change", function (e) {
                    return function (t) {
                        return e.updateBackgroundImage(t);
                    }
                }(this)), document.getElementById("loadShip").addEventListener("change", this.loadShip, !1), null === localStorage.getItem("acceptedDisclaimer")) return;
            }
            return showcase.prototype.closeModal = function (e) {
                return e && e.preventDefault(), document.querySelector(".overlay").style.transform = "translateX(100%) scale(0)", document.querySelector(".overlay>div").style.transform = "translateX(100%) scale(0)"
            }, showcase.prototype.loadShip = function (e) {
                var t, i;
                return i = e.target.files[0], i.type.match("plain") ? (t = new FileReader, t.addEventListener("load", function (e) {
                    return function (t) {
                        var i;
                        return i = t.target, e.editor.setValue(i.result)
                    }
                }(this)), t.readAsText(i)) : alert("Wrong file type")
            }, showcase.prototype.updateBackgroundImage = function (e) {
                const fileInput = event.target;
                const file = fileInput.files[0];
                if (file) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        const imageURL = e.target.result;
                        document.documentElement.style.setProperty('--background-image', `url(${imageURL})`);
                    };

                    reader.readAsDataURL(file);
                }
            }, showcase.prototype.mouseDown = function (e) {
                return this.dragging = !0, this.Oll0l = e.clientX, this.ll0OO = e.clientY, this.rotate_start_x = this.rotate_x, this.rotate_start_y = this.rotate_y
            }, showcase.prototype.getCameraRatio = function (e) {
                let ratio = 150;
                let size = window.getComputedStyle(document.querySelector("#insiderenderpanel>canvas"));
                this.camera_ratio = {
                    x: parseFloat(size.width) / window.innerWidth / this.zoom / ratio,
                    y: parseFloat(size.height) / window.innerHeight / this.zoom / ratio,
                }
            }, showcase.prototype.mouseMove = function (e) {
                if (this.dragging) return window.isRotating ? (!this.camera && (this.camera = Object.values(this).find(v => v && String(v.type).includes("Camera"))), this.getCameraRatio(this), this.camera.position.x -= e.movementX * this.camera_ratio.x, this.camera.position.y += e.movementY * this.camera_ratio.y) : (this.rotate_x = this.rotate_start_x + .01 * (e.clientX - this.Oll0l), this.rotate_y = this.rotate_start_y + .01 * (e.clientY - this.ll0OO))
            }, showcase.prototype.setRotation = function (e) {
                e = !!e;
                window.isRotating = e;
                var rotateIcons = document.querySelector("#rotate .icons");
                var moveIcons = document.querySelector("#move .icons");

                if (!e) {
                    rotateIcons.classList.add("selected");
                    moveIcons.classList.remove("selected");
                } else {
                    rotateIcons.classList.remove("selected");
                    moveIcons.classList.add("selected");
                }
            }, showcase.prototype.mouseUp = function (e) {
                return this.dragging = !1;
            }, showcase.prototype.mouseWheel = function (e) {
                var t;
                return t = e.wheelDelta || -e.detail, t < 0 ? this.zoom *= .99 : t > 0 ? this.zoom /= .99 : void 0
            }, showcase.prototype.editorContentsChanged = function () {
                var a, code, context, i, j, k, l, max, ref, ref1, shape, shipdata, src;
                if (src = this.editor.getValue(), code = CoffeeScript.compile(src), shipdata = eval(code)) {
                    for (null != this.ship && this.lIl1l.remove(this.ship.lI001), this.ship = new l0O11(shipdata, this.hue, this.materials[this.material_index]), this.lIl1l.add(this.ship.lI001), this.ship.OlII1(0), localStorage.setItem("code", src), shape = this.ship.lIlO0(50), context = document.getElementById("shapecanvas").getContext("2d"), context.clearRect(0, 0, 150, 150), context.save(), context.translate(75, 75), max = 0, i = j = 0, ref = shape.length - 1; j <= ref; i = j += 1) max = Math.max(Math.abs(shape[i]), max);
                    for (context.scale(50 / max, 50 / max), context.beginPath(), i = k = 0, ref1 = shape.length - 1; k <= ref1; i = k += 1) l = shape[i], a = i / shape.length * 2 * (180 * THREE.Math.DEG2RAD), context.lineTo(l * Math.cos(a), l * Math.sin(a));
                    return context.closePath(), context.fillStyle = "rgba(255,255,255,.5)", context.fill(), context.strokeStyle = "rgba(255,255,255,.5)", context.lineWidth = .25 / max, context.stroke(), context.restore()
                }
            }, showcase.prototype.changeMaterial = function () {
                return this.material_index = (this.material_index + 1) % this.materials.length, this.editorContentsChanged();
            }, showcase.prototype.customizeMaterial = function () {
                var c = document.querySelector("#Customize");
                var i = document.querySelector("#customizeMaterial .icons");
                c.style.transform = c.style.transform === "scale(0)" ? "scale(1)" : "scale(0)";
                if (c.style.transform === "scale(0)") {
                    i.classList.remove("selected");
                } else {
                    i.classList.add("selected");
                }
            }, showcase.prototype.changeHue = function () {
                return this.hue = (this.hue + 1 / 20) % 1, this.editorContentsChanged();
            }, showcase.prototype.loadModel = function () {
                var e, t, i, s, o, l, n, r, a, h, p, c, d, u, f;
                for (n = document.querySelector(".overlay"), l = document.querySelector("#shipLoader"), e = n.querySelector(".content"), d = n.querySelector(".title"), h = n.querySelector("table"), n.style.transform = "translateX(0%) scale(1)", l.style.transform = "translateX(0%) scale(1)", e.style.height = l.offsetHeight - d.offsetHeight + "px", h.style.height = l.offsetHeight - d.offsetHeight + "px", window.addEventListener("resize", function () {
                    return e.style.height = l.offsetHeight - d.offsetHeight + "px", h.style.height = l.offsetHeight - d.offsetHeight + "px"
                }), u = h.querySelector("thead tr"), f = h.querySelector("tbody tr"), u.innerHTML = "", f.innerHTML = "", o = 1, p = document.createElement("td"), c = document.createElement("td"), c.innerText = "Tier " + o, u.appendChild(c), r = llll1.O0lII, t = function (e) {
                    return function (t) {
                        var i, s, o;
                        return s = document.createElement("div"), s.innerHTML = t.name, o = document.createElement("div"), o.classList.add("shipgroup"), o.setAttribute("data-code", 100 * t.level + t.model), i = l0O11.getShipIcon(100 * t.level + t.model), o.appendChild(i), o.appendChild(s), o.addEventListener("click", function (i) {
                            var s;
                            var sc = document.querySelector('.shipgroup:hover canvas');
                            sc.style.transform = "rotate(0deg) translateY(-200%)";
                            setTimeout(() => { e.closeModal(); }, 400);
                            setTimeout(() => { sc.style.transform = ""; }, 550);
                            return s = JSON.stringify(t), s = js2coffee.build("model = " + s).code, s = s.replace(/\s+(?=[^[\]]*\])/g, ",").replace(/\[,/g, "[").replace(/,\]/g, "]"), s = s.replace(/'(\w+)':/g, "$1:"), e.editor.setValue("return " + s, -1)
                        }), o.addEventListener("mouseover", function (i) {
                            var s, o, l, n, r, a, p, c, d, u, f, g;
                            for (c = document.querySelectorAll("[data-code]"), o = 0, l = c.length; o < l; o++) f = c[o], f.classList.remove("highlighted");
                            if (r = t.level, p = t.model, null == e.levels[r + 1]) return [];
                            for (g = (p - 1) / Math.max(1, e.levels[r].length - 1), g = Math.round(g * (e.levels[r + 1].length - 2)), d = [e.levels[r + 1][g]], g < e.levels[r + 1].length - 1 && d.push(e.levels[r + 1][g + 1]), u = [], a = 0, n = d.length; a < n; a++) s = d[a], u.push(h.querySelector("[data-code='" + s + "']").classList.add("highlighted"));
                            return u
                        }), o.addEventListener("mouseout", function (e) {
                            var t, i, s, o, l;
                            for (s = document.querySelectorAll("[data-code]"), o = [], t = 0, i = s.length; t < i; t++) l = s[t], o.push(l.classList.remove("highlighted"));
                            return o
                        }), p.appendChild(o)
                    }
                }(this), i = 0, s = r.length; i < s; i++) a = r[i], a.level > o && (o = a.level, c = document.createElement("td"), c.innerText = "Tier " + o, u.appendChild(c), f.appendChild(p), p = document.createElement("td")), t(a);
                return f.appendChild(p)
            }, showcase.prototype.O0111 = function () {
                if (this.update_time > 0 && Date.now() > this.update_time) try {
                    this.update_time = 0, this.editorContentsChanged();
                } catch (e) {
                    e
                }
                requestAnimationFrame(function (e) {
                    return function () {
                        return e.O0111()
                    }
                }(this)), null != this.ship && (this.ship.lI001.rotation.z = this.rotate_x), null != this.ship && (this.ship.lI001.rotation.y = -this.rotate_y), this.ship && this.ship.lI001.scale.set(this.zoom, this.zoom, this.zoom), null != this.ship && this.ship.propstep(!0), this.must_export && (this.ship.OII1l.opacity = 1, this.ship.OII1l.blending = THREE.NormalBlending), this.OlOlI.render(this.lIl1l, this.OI1I0), this.must_export && (this.must_export = !1, this.exportImpl()), this.ship
            }, showcase.prototype.getImage = function () {
                window.copy_image = function () { return true; };
                window.copyImage = async function () {
                    const response = await fetch(document.querySelector("#insiderenderpanel > canvas").toDataURL());
                    const imgBlob = await response.blob();
                    await navigator.clipboard.write([new ClipboardItem({ [imgBlob.type]: imgBlob })]);
                };
                const originalMakeScreenshot = window.makeScreenshot;
                window.makeScreenshot = function () {
                    if (window.copy_image()) {
                        window.copyImage();
                    } else {
                        originalMakeScreenshot();
                    }
                };
                document.querySelector("#exportPNG").click();
            }, showcase.prototype.export = function () {
                return this.must_export = !0
            }, showcase.prototype.exportImpl = function () {
                return makeScreenshot();
            },
                showcase
        }(), window.makeScreenshot = function () {
            var e, t, i;
            return e = editor.OlOlI.domElement, i = document.createElement("canvas"), i.width = e.width, i.height = e.height, t = i.getContext("2d"), t.drawImage(e, 0, 0), i.toBlob(function (e) {
                return saveAs(e, "image.png")
            }, "image/png", 1)
        }, editor = new this.showcase, hasProp = {}.hasOwnProperty, this.Compiler = function () {
            function e(e) {
                var t, i, s, o;
                for (null == e && (e = llll1), s = e.O0lII, t = 0, i = s.length; t < i; t++) o = s[t], this.log(o)
            }
            return e.prototype.log = function (e) {
                var t, i, s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b;
                m = new l0O11(e).lIlO0(), c = e.name, h = [], u = e.bodies;
                for (a in u)
                    if (hasProp.call(u, a) && (i = u[a], i.laser)) {
                        for (E = 200, l = 0, o = n = 0, f = i.position.y.length - 1; n <= f; o = n += 1) E > i.position.y[o] && (E = i.position.y[o], l = o);
                        parseFloat(i.angle || 0), t = parseFloat(i.angle || 0) / 360 * (180 * THREE.Math.DEG2RAD) * 2, s = Math.cos(t), g = Math.sin(t), x = i.position.x[l], b = i.position.y[l], y = i.offset.x + x * s + b * g, E = i.offset.y + b * s - x * g, h.push({
                            x: (.01 * y * e.size * 2).toFixed(3),
                            y: (.01 * E * e.size * 2).toFixed(3),
                            z: parseFloat((.01 * i.offset.z * e.size * 2).toFixed(3)),
                            angle: parseFloat((i.angle || 0).toFixed(3)),
                            damage: i.laser.damage,
                            rate: i.laser.rate,
                            type: i.laser.type,
                            speed: i.laser.speed,
                            number: i.laser.number,
                            spread: null != i.laser.angle ? i.laser.angle : 0,
                            error: null != i.laser.error ? i.laser.error : 0,
                            recoil: i.laser.recoil || 0
                        }), 0 !== i.offset.x && h.push({
                            x: (.01 * -y * e.size * 2).toFixed(3),
                            y: (.01 * E * e.size * 2).toFixed(3),
                            z: parseFloat((.01 * i.offset.z * e.size * 2).toFixed(3)),
                            angle: -parseFloat((i.angle || 0).toFixed(3)),
                            damage: i.laser.damage,
                            rate: i.laser.rate,
                            type: i.laser.type,
                            speed: i.laser.speed,
                            number: i.laser.number || 1,
                            spread: null != i.laser.angle ? i.laser.angle : 0,
                            error: null != i.laser.error ? i.laser.error : 0,
                            recoil: i.laser.recoil || 0
                        })
                    }
                for (document.body.innerHTML += "l1I1I.add<br/>", document.body.innerHTML += '&nbsp;&nbsp;name: "' + c + '"<br/>', document.body.innerHTML += "&nbsp;&nbsp;level: " + e.level + "<br/>", document.body.innerHTML += "&nbsp;&nbsp;model: " + e.model + "<br/>", null != e.next && (document.body.innerHTML += "&nbsp;&nbsp;next: [" + e.next + "]<br/>"), document.body.innerHTML += "&nbsp;&nbsp;code: " + (100 * e.level + e.model) + "<br/>", document.body.innerHTML += "&nbsp;&nbsp;specs: " + JSON.stringify(e.specs) + "<br/>", document.body.innerHTML += "&nbsp;&nbsp;shape: " + JSON.stringify(m) + "<br/>", document.body.innerHTML += "&nbsp;&nbsp;I0OOI: 0.15<br/>", document.body.innerHTML += "&nbsp;&nbsp;O10lI: 0.4<br/>", document.body.innerHTML += "&nbsp;&nbsp;l0I00: 0.98<br/>", document.body.innerHTML += "&nbsp;&nbsp;lasers: " + JSON.stringify(h) + "<br/>", d = 0, r = 0, p = m.length; r < p; r++) g = m[r], d = parseFloat(Math.max(g, d).toFixed(3));
                return document.body.innerHTML += "&nbsp;&nbsp;radius: " + d + "<br/>", document.body.innerHTML += "<br/>"
            }, e.compileShip = function (e) {
                var t, i, s, o, l, n, r, a, h, p, c, d, u, f, g, m, y, x, E, b;
                m = new l0O11(e).lIlO0(), c = e.name, h = [], u = e.bodies;
                for (a in u)
                    if (hasProp.call(u, a) && (i = u[a], i.laser)) {
                        for (E = 200, l = 0, o = n = 0, f = i.position.y.length - 1; n <= f; o = n += 1) E > i.position.y[o] && (E = i.position.y[o], l = o);
                        parseFloat(i.angle || 0), t = parseFloat(i.angle || 0) / 360 * (180 * THREE.Math.DEG2RAD) * 2, s = Math.cos(t), g = Math.sin(t), x = i.position.x[l], b = i.position.y[l], y = i.offset.x + x * s + b * g, E = i.offset.y + b * s - x * g, h.push({
                            x: parseFloat((.01 * y * e.size * 2).toFixed(3)),
                            y: parseFloat((.01 * E * e.size * 2).toFixed(3)),
                            z: parseFloat((.01 * i.offset.z * e.size * 2).toFixed(3)),
                            angle: parseFloat((i.angle || 0).toFixed(3)),
                            damage: i.laser.damage,
                            rate: i.laser.rate,
                            type: i.laser.type,
                            speed: i.laser.speed,
                            number: i.laser.number,
                            spread: null != i.laser.angle ? i.laser.angle : 0,
                            error: null != i.laser.error ? i.laser.error : 0,
                            recoil: i.laser.recoil || 0
                        }), 0 !== i.offset.x && h.push({
                            x: parseFloat((.01 * -y * e.size * 2).toFixed(3)),
                            y: parseFloat((.01 * E * e.size * 2).toFixed(3)),
                            z: parseFloat((.01 * i.offset.z * e.size * 2).toFixed(3)),
                            angle: -parseFloat((i.angle || 0).toFixed(3)),
                            damage: i.laser.damage,
                            rate: i.laser.rate,
                            type: i.laser.type,
                            speed: i.laser.speed,
                            number: i.laser.number || 1,
                            spread: null != i.laser.angle ? i.laser.angle : 0,
                            error: null != i.laser.error ? i.laser.error : 0,
                            recoil: i.laser.recoil || 0
                        })
                    }
                for (d = 0, r = 0, p = m.length; r < p; r++) g = m[r], d = parseFloat(Math.max(g, d).toFixed(3));
                return {
                    name: c,
                    level: e.level,
                    model: e.model,
                    code: 100 * e.level + e.model,
                    specs: e.specs,
                    shape: m,
                    lasers: h,
                    radius: d,
                    next: null != e.next ? e.next : void 0
                }
            }, e
        }();
})();