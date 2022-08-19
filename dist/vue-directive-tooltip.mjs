var R = "top", j = "bottom", I = "right", T = "left", Ae = "auto", ve = [R, j, I, T], re = "start", ue = "end", At = "clippingParents", lt = "viewport", le = "popper", $t = "reference", Je = /* @__PURE__ */ ve.reduce(function(t, e) {
  return t.concat([e + "-" + re, e + "-" + ue]);
}, []), ft = /* @__PURE__ */ [].concat(ve, [Ae]).reduce(function(t, e) {
  return t.concat([e, e + "-" + re, e + "-" + ue]);
}, []), Dt = "beforeRead", St = "read", _t = "afterRead", Pt = "beforeMain", Nt = "main", Rt = "afterMain", Tt = "beforeWrite", Lt = "write", Ct = "afterWrite", Te = [Dt, St, _t, Pt, Nt, Rt, Tt, Lt, Ct];
function W(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function k(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Z(t) {
  var e = k(t).Element;
  return t instanceof e || t instanceof Element;
}
function C(t) {
  var e = k(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function je(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = k(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function jt(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var o = e.styles[r] || {}, n = e.attributes[r] || {}, i = e.elements[r];
    !C(i) || !W(i) || (Object.assign(i.style, o), Object.keys(n).forEach(function(f) {
      var s = n[f];
      s === !1 ? i.removeAttribute(f) : i.setAttribute(f, s === !0 ? "" : s);
    }));
  });
}
function It(t) {
  var e = t.state, r = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function() {
    Object.keys(e.elements).forEach(function(o) {
      var n = e.elements[o], i = e.attributes[o] || {}, f = Object.keys(e.styles.hasOwnProperty(o) ? e.styles[o] : r[o]), s = f.reduce(function(a, p) {
        return a[p] = "", a;
      }, {});
      !C(n) || !W(n) || (Object.assign(n.style, s), Object.keys(i).forEach(function(a) {
        n.removeAttribute(a);
      }));
    });
  };
}
const kt = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: jt,
  effect: It,
  requires: ["computeStyles"]
};
function M(t) {
  return t.split("-")[0];
}
var Q = Math.max, Ee = Math.min, oe = Math.round;
function Le() {
  var t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function pt() {
  return !/^((?!chrome|android).)*safari/i.test(Le());
}
function ne(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var o = t.getBoundingClientRect(), n = 1, i = 1;
  e && C(t) && (n = t.offsetWidth > 0 && oe(o.width) / t.offsetWidth || 1, i = t.offsetHeight > 0 && oe(o.height) / t.offsetHeight || 1);
  var f = Z(t) ? k(t) : window, s = f.visualViewport, a = !pt() && r, p = (o.left + (a && s ? s.offsetLeft : 0)) / n, l = (o.top + (a && s ? s.offsetTop : 0)) / i, h = o.width / n, b = o.height / i;
  return {
    width: h,
    height: b,
    top: l,
    right: p + h,
    bottom: l + b,
    left: p,
    x: p,
    y: l
  };
}
function Ie(t) {
  var e = ne(t), r = t.offsetWidth, o = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: o
  };
}
function ct(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && je(r)) {
    var o = e;
    do {
      if (o && t.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function V(t) {
  return k(t).getComputedStyle(t);
}
function Bt(t) {
  return ["table", "td", "th"].indexOf(W(t)) >= 0;
}
function U(t) {
  return ((Z(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function $e(t) {
  return W(t) === "html" ? t : t.assignedSlot || t.parentNode || (je(t) ? t.host : null) || U(t);
}
function Ke(t) {
  return !C(t) || V(t).position === "fixed" ? null : t.offsetParent;
}
function Mt(t) {
  var e = /firefox/i.test(Le()), r = /Trident/i.test(Le());
  if (r && C(t)) {
    var o = V(t);
    if (o.position === "fixed")
      return null;
  }
  var n = $e(t);
  for (je(n) && (n = n.host); C(n) && ["html", "body"].indexOf(W(n)) < 0; ) {
    var i = V(n);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function he(t) {
  for (var e = k(t), r = Ke(t); r && Bt(r) && V(r).position === "static"; )
    r = Ke(r);
  return r && (W(r) === "html" || W(r) === "body" && V(r).position === "static") ? e : r || Mt(t) || e;
}
function ke(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function pe(t, e, r) {
  return Q(t, Ee(e, r));
}
function Vt(t, e, r) {
  var o = pe(t, e, r);
  return o > r ? r : o;
}
function ut() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function dt(t) {
  return Object.assign({}, ut(), t);
}
function vt(t, e) {
  return e.reduce(function(r, o) {
    return r[o] = t, r;
  }, {});
}
var Ht = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, dt(typeof e != "number" ? e : vt(e, ve));
};
function Wt(t) {
  var e, r = t.state, o = t.name, n = t.options, i = r.elements.arrow, f = r.modifiersData.popperOffsets, s = M(r.placement), a = ke(s), p = [T, I].indexOf(s) >= 0, l = p ? "height" : "width";
  if (!(!i || !f)) {
    var h = Ht(n.padding, r), b = Ie(i), c = a === "y" ? R : T, O = a === "y" ? j : I, m = r.rects.reference[l] + r.rects.reference[a] - f[a] - r.rects.popper[l], v = f[a] - r.rects.reference[a], w = he(i), A = w ? a === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, E = m / 2 - v / 2, u = h[c], g = A - b[l] - h[O], d = A / 2 - b[l] / 2 + E, x = pe(u, d, g), $ = a;
    r.modifiersData[o] = (e = {}, e[$] = x, e.centerOffset = x - d, e);
  }
}
function qt(t) {
  var e = t.state, r = t.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o;
  if (n != null && !(typeof n == "string" && (n = e.elements.popper.querySelector(n), !n))) {
    if (process.env.NODE_ENV !== "production" && (C(n) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !ct(e.elements.popper, n)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    e.elements.arrow = n;
  }
}
const Ft = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Wt,
  effect: qt,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ie(t) {
  return t.split("-")[1];
}
var Ut = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Xt(t) {
  var e = t.x, r = t.y, o = window, n = o.devicePixelRatio || 1;
  return {
    x: oe(e * n) / n || 0,
    y: oe(r * n) / n || 0
  };
}
function Qe(t) {
  var e, r = t.popper, o = t.popperRect, n = t.placement, i = t.variation, f = t.offsets, s = t.position, a = t.gpuAcceleration, p = t.adaptive, l = t.roundOffsets, h = t.isFixed, b = f.x, c = b === void 0 ? 0 : b, O = f.y, m = O === void 0 ? 0 : O, v = typeof l == "function" ? l({
    x: c,
    y: m
  }) : {
    x: c,
    y: m
  };
  c = v.x, m = v.y;
  var w = f.hasOwnProperty("x"), A = f.hasOwnProperty("y"), E = T, u = R, g = window;
  if (p) {
    var d = he(r), x = "clientHeight", $ = "clientWidth";
    if (d === k(r) && (d = U(r), V(d).position !== "static" && s === "absolute" && (x = "scrollHeight", $ = "scrollWidth")), d = d, n === R || (n === T || n === I) && i === ue) {
      u = j;
      var D = h && d === g && g.visualViewport ? g.visualViewport.height : d[x];
      m -= D - o.height, m *= a ? 1 : -1;
    }
    if (n === T || (n === R || n === j) && i === ue) {
      E = I;
      var S = h && d === g && g.visualViewport ? g.visualViewport.width : d[$];
      c -= S - o.width, c *= a ? 1 : -1;
    }
  }
  var y = Object.assign({
    position: s
  }, p && Ut), P = l === !0 ? Xt({
    x: c,
    y: m
  }) : {
    x: c,
    y: m
  };
  if (c = P.x, m = P.y, a) {
    var N;
    return Object.assign({}, y, (N = {}, N[u] = A ? "0" : "", N[E] = w ? "0" : "", N.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + c + "px, " + m + "px)" : "translate3d(" + c + "px, " + m + "px, 0)", N));
  }
  return Object.assign({}, y, (e = {}, e[u] = A ? m + "px" : "", e[E] = w ? c + "px" : "", e.transform = "", e));
}
function Yt(t) {
  var e = t.state, r = t.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, i = r.adaptive, f = i === void 0 ? !0 : i, s = r.roundOffsets, a = s === void 0 ? !0 : s;
  if (process.env.NODE_ENV !== "production") {
    var p = V(e.elements.popper).transitionProperty || "";
    f && ["transform", "top", "right", "bottom", "left"].some(function(h) {
      return p.indexOf(h) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var l = {
    placement: M(e.placement),
    variation: ie(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: n,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Qe(Object.assign({}, l, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: f,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Qe(Object.assign({}, l, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const zt = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Yt,
  data: {}
};
var Oe = {
  passive: !0
};
function Gt(t) {
  var e = t.state, r = t.instance, o = t.options, n = o.scroll, i = n === void 0 ? !0 : n, f = o.resize, s = f === void 0 ? !0 : f, a = k(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && p.forEach(function(l) {
    l.addEventListener("scroll", r.update, Oe);
  }), s && a.addEventListener("resize", r.update, Oe), function() {
    i && p.forEach(function(l) {
      l.removeEventListener("scroll", r.update, Oe);
    }), s && a.removeEventListener("resize", r.update, Oe);
  };
}
const Jt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Gt,
  data: {}
};
var Kt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function xe(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Kt[e];
  });
}
var Qt = {
  start: "end",
  end: "start"
};
function Ze(t) {
  return t.replace(/start|end/g, function(e) {
    return Qt[e];
  });
}
function Be(t) {
  var e = k(t), r = e.pageXOffset, o = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function Me(t) {
  return ne(U(t)).left + Be(t).scrollLeft;
}
function Zt(t, e) {
  var r = k(t), o = U(t), n = r.visualViewport, i = o.clientWidth, f = o.clientHeight, s = 0, a = 0;
  if (n) {
    i = n.width, f = n.height;
    var p = pt();
    (p || !p && e === "fixed") && (s = n.offsetLeft, a = n.offsetTop);
  }
  return {
    width: i,
    height: f,
    x: s + Me(t),
    y: a
  };
}
function er(t) {
  var e, r = U(t), o = Be(t), n = (e = t.ownerDocument) == null ? void 0 : e.body, i = Q(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), f = Q(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + Me(t), a = -o.scrollTop;
  return V(n || r).direction === "rtl" && (s += Q(r.clientWidth, n ? n.clientWidth : 0) - i), {
    width: i,
    height: f,
    x: s,
    y: a
  };
}
function Ve(t) {
  var e = V(t), r = e.overflow, o = e.overflowX, n = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + o);
}
function ht(t) {
  return ["html", "body", "#document"].indexOf(W(t)) >= 0 ? t.ownerDocument.body : C(t) && Ve(t) ? t : ht($e(t));
}
function ce(t, e) {
  var r;
  e === void 0 && (e = []);
  var o = ht(t), n = o === ((r = t.ownerDocument) == null ? void 0 : r.body), i = k(o), f = n ? [i].concat(i.visualViewport || [], Ve(o) ? o : []) : o, s = e.concat(f);
  return n ? s : s.concat(ce($e(f)));
}
function Ce(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function tr(t, e) {
  var r = ne(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function et(t, e, r) {
  return e === lt ? Ce(Zt(t, r)) : Z(e) ? tr(e, r) : Ce(er(U(t)));
}
function rr(t) {
  var e = ce($e(t)), r = ["absolute", "fixed"].indexOf(V(t).position) >= 0, o = r && C(t) ? he(t) : t;
  return Z(o) ? e.filter(function(n) {
    return Z(n) && ct(n, o) && W(n) !== "body";
  }) : [];
}
function or(t, e, r, o) {
  var n = e === "clippingParents" ? rr(t) : [].concat(e), i = [].concat(n, [r]), f = i[0], s = i.reduce(function(a, p) {
    var l = et(t, p, o);
    return a.top = Q(l.top, a.top), a.right = Ee(l.right, a.right), a.bottom = Ee(l.bottom, a.bottom), a.left = Q(l.left, a.left), a;
  }, et(t, f, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function mt(t) {
  var e = t.reference, r = t.element, o = t.placement, n = o ? M(o) : null, i = o ? ie(o) : null, f = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, a;
  switch (n) {
    case R:
      a = {
        x: f,
        y: e.y - r.height
      };
      break;
    case j:
      a = {
        x: f,
        y: e.y + e.height
      };
      break;
    case I:
      a = {
        x: e.x + e.width,
        y: s
      };
      break;
    case T:
      a = {
        x: e.x - r.width,
        y: s
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var p = n ? ke(n) : null;
  if (p != null) {
    var l = p === "y" ? "height" : "width";
    switch (i) {
      case re:
        a[p] = a[p] - (e[l] / 2 - r[l] / 2);
        break;
      case ue:
        a[p] = a[p] + (e[l] / 2 - r[l] / 2);
        break;
    }
  }
  return a;
}
function de(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = o === void 0 ? t.placement : o, i = r.strategy, f = i === void 0 ? t.strategy : i, s = r.boundary, a = s === void 0 ? At : s, p = r.rootBoundary, l = p === void 0 ? lt : p, h = r.elementContext, b = h === void 0 ? le : h, c = r.altBoundary, O = c === void 0 ? !1 : c, m = r.padding, v = m === void 0 ? 0 : m, w = dt(typeof v != "number" ? v : vt(v, ve)), A = b === le ? $t : le, E = t.rects.popper, u = t.elements[O ? A : b], g = or(Z(u) ? u : u.contextElement || U(t.elements.popper), a, l, f), d = ne(t.elements.reference), x = mt({
    reference: d,
    element: E,
    strategy: "absolute",
    placement: n
  }), $ = Ce(Object.assign({}, E, x)), D = b === le ? $ : d, S = {
    top: g.top - D.top + w.top,
    bottom: D.bottom - g.bottom + w.bottom,
    left: g.left - D.left + w.left,
    right: D.right - g.right + w.right
  }, y = t.modifiersData.offset;
  if (b === le && y) {
    var P = y[n];
    Object.keys(S).forEach(function(N) {
      var X = [I, j].indexOf(N) >= 0 ? 1 : -1, Y = [R, j].indexOf(N) >= 0 ? "y" : "x";
      S[N] += P[Y] * X;
    });
  }
  return S;
}
function nr(t, e) {
  e === void 0 && (e = {});
  var r = e, o = r.placement, n = r.boundary, i = r.rootBoundary, f = r.padding, s = r.flipVariations, a = r.allowedAutoPlacements, p = a === void 0 ? ft : a, l = ie(o), h = l ? s ? Je : Je.filter(function(O) {
    return ie(O) === l;
  }) : ve, b = h.filter(function(O) {
    return p.indexOf(O) >= 0;
  });
  b.length === 0 && (b = h, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var c = b.reduce(function(O, m) {
    return O[m] = de(t, {
      placement: m,
      boundary: n,
      rootBoundary: i,
      padding: f
    })[M(m)], O;
  }, {});
  return Object.keys(c).sort(function(O, m) {
    return c[O] - c[m];
  });
}
function ir(t) {
  if (M(t) === Ae)
    return [];
  var e = xe(t);
  return [Ze(t), e, Ze(e)];
}
function ar(t) {
  var e = t.state, r = t.options, o = t.name;
  if (!e.modifiersData[o]._skip) {
    for (var n = r.mainAxis, i = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !0 : f, a = r.fallbackPlacements, p = r.padding, l = r.boundary, h = r.rootBoundary, b = r.altBoundary, c = r.flipVariations, O = c === void 0 ? !0 : c, m = r.allowedAutoPlacements, v = e.options.placement, w = M(v), A = w === v, E = a || (A || !O ? [xe(v)] : ir(v)), u = [v].concat(E).reduce(function(ee, q) {
      return ee.concat(M(q) === Ae ? nr(e, {
        placement: q,
        boundary: l,
        rootBoundary: h,
        padding: p,
        flipVariations: O,
        allowedAutoPlacements: m
      }) : q);
    }, []), g = e.rects.reference, d = e.rects.popper, x = /* @__PURE__ */ new Map(), $ = !0, D = u[0], S = 0; S < u.length; S++) {
      var y = u[S], P = M(y), N = ie(y) === re, X = [R, j].indexOf(P) >= 0, Y = X ? "width" : "height", L = de(e, {
        placement: y,
        boundary: l,
        rootBoundary: h,
        altBoundary: b,
        padding: p
      }), B = X ? N ? I : T : N ? j : R;
      g[Y] > d[Y] && (B = xe(B));
      var me = xe(B), z = [];
      if (i && z.push(L[P] <= 0), s && z.push(L[B] <= 0, L[me] <= 0), z.every(function(ee) {
        return ee;
      })) {
        D = y, $ = !1;
        break;
      }
      x.set(y, z);
    }
    if ($)
      for (var ge = O ? 3 : 1, Se = function(q) {
        var se = u.find(function(be) {
          var G = x.get(be);
          if (G)
            return G.slice(0, q).every(function(_e) {
              return _e;
            });
        });
        if (se)
          return D = se, "break";
      }, ae = ge; ae > 0; ae--) {
        var ye = Se(ae);
        if (ye === "break")
          break;
      }
    e.placement !== D && (e.modifiersData[o]._skip = !0, e.placement = D, e.reset = !0);
  }
}
const sr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ar,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function tt(t, e, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - r.y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x
  };
}
function rt(t) {
  return [R, I, j, T].some(function(e) {
    return t[e] >= 0;
  });
}
function lr(t) {
  var e = t.state, r = t.name, o = e.rects.reference, n = e.rects.popper, i = e.modifiersData.preventOverflow, f = de(e, {
    elementContext: "reference"
  }), s = de(e, {
    altBoundary: !0
  }), a = tt(f, o), p = tt(s, n, i), l = rt(a), h = rt(p);
  e.modifiersData[r] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: p,
    isReferenceHidden: l,
    hasPopperEscaped: h
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": h
  });
}
const fr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lr
};
function pr(t, e, r) {
  var o = M(t), n = [T, R].indexOf(o) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, f = i[0], s = i[1];
  return f = f || 0, s = (s || 0) * n, [T, I].indexOf(o) >= 0 ? {
    x: s,
    y: f
  } : {
    x: f,
    y: s
  };
}
function cr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.offset, i = n === void 0 ? [0, 0] : n, f = ft.reduce(function(l, h) {
    return l[h] = pr(h, e.rects, i), l;
  }, {}), s = f[e.placement], a = s.x, p = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += p), e.modifiersData[o] = f;
}
const ur = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: cr
};
function dr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = mt({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const vr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: dr,
  data: {}
};
function hr(t) {
  return t === "x" ? "y" : "x";
}
function mr(t) {
  var e = t.state, r = t.options, o = t.name, n = r.mainAxis, i = n === void 0 ? !0 : n, f = r.altAxis, s = f === void 0 ? !1 : f, a = r.boundary, p = r.rootBoundary, l = r.altBoundary, h = r.padding, b = r.tether, c = b === void 0 ? !0 : b, O = r.tetherOffset, m = O === void 0 ? 0 : O, v = de(e, {
    boundary: a,
    rootBoundary: p,
    padding: h,
    altBoundary: l
  }), w = M(e.placement), A = ie(e.placement), E = !A, u = ke(w), g = hr(u), d = e.modifiersData.popperOffsets, x = e.rects.reference, $ = e.rects.popper, D = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, S = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), y = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, P = {
    x: 0,
    y: 0
  };
  if (!!d) {
    if (i) {
      var N, X = u === "y" ? R : T, Y = u === "y" ? j : I, L = u === "y" ? "height" : "width", B = d[u], me = B + v[X], z = B - v[Y], ge = c ? -$[L] / 2 : 0, Se = A === re ? x[L] : $[L], ae = A === re ? -$[L] : -x[L], ye = e.elements.arrow, ee = c && ye ? Ie(ye) : {
        width: 0,
        height: 0
      }, q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : ut(), se = q[X], be = q[Y], G = pe(0, x[L], ee[L]), _e = E ? x[L] / 2 - ge - G - se - S.mainAxis : Se - G - se - S.mainAxis, yt = E ? -x[L] / 2 + ge + G + be + S.mainAxis : ae + G + be + S.mainAxis, Pe = e.elements.arrow && he(e.elements.arrow), bt = Pe ? u === "y" ? Pe.clientTop || 0 : Pe.clientLeft || 0 : 0, He = (N = y == null ? void 0 : y[u]) != null ? N : 0, wt = B + _e - He - bt, Ot = B + yt - He, We = pe(c ? Ee(me, wt) : me, B, c ? Q(z, Ot) : z);
      d[u] = We, P[u] = We - B;
    }
    if (s) {
      var qe, xt = u === "x" ? R : T, Et = u === "x" ? j : I, J = d[g], we = g === "y" ? "height" : "width", Fe = J + v[xt], Ue = J - v[Et], Ne = [R, T].indexOf(w) !== -1, Xe = (qe = y == null ? void 0 : y[g]) != null ? qe : 0, Ye = Ne ? Fe : J - x[we] - $[we] - Xe + S.altAxis, ze = Ne ? J + x[we] + $[we] - Xe - S.altAxis : Ue, Ge = c && Ne ? Vt(Ye, J, ze) : pe(c ? Ye : Fe, J, c ? ze : Ue);
      d[g] = Ge, P[g] = Ge - J;
    }
    e.modifiersData[o] = P;
  }
}
const gr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: mr,
  requiresIfExists: ["offset"]
};
function yr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function br(t) {
  return t === k(t) || !C(t) ? Be(t) : yr(t);
}
function wr(t) {
  var e = t.getBoundingClientRect(), r = oe(e.width) / t.offsetWidth || 1, o = oe(e.height) / t.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function Or(t, e, r) {
  r === void 0 && (r = !1);
  var o = C(e), n = C(e) && wr(e), i = U(e), f = ne(t, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((W(e) !== "body" || Ve(i)) && (s = br(e)), C(e) ? (a = ne(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : i && (a.x = Me(i))), {
    x: f.left + s.scrollLeft - a.x,
    y: f.top + s.scrollTop - a.y,
    width: f.width,
    height: f.height
  };
}
function xr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function n(i) {
    r.add(i.name);
    var f = [].concat(i.requires || [], i.requiresIfExists || []);
    f.forEach(function(s) {
      if (!r.has(s)) {
        var a = e.get(s);
        a && n(a);
      }
    }), o.push(i);
  }
  return t.forEach(function(i) {
    r.has(i.name) || n(i);
  }), o;
}
function Er(t) {
  var e = xr(t);
  return Te.reduce(function(r, o) {
    return r.concat(e.filter(function(n) {
      return n.phase === o;
    }));
  }, []);
}
function Ar(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function F(t) {
  for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++)
    r[o - 1] = arguments[o];
  return [].concat(r).reduce(function(n, i) {
    return n.replace(/%s/, i);
  }, t);
}
var K = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', $r = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', ot = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Dr(t) {
  t.forEach(function(e) {
    [].concat(Object.keys(e), ot).filter(function(r, o, n) {
      return n.indexOf(r) === o;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof e.name != "string" && console.error(F(K, String(e.name), '"name"', '"string"', '"' + String(e.name) + '"'));
          break;
        case "enabled":
          typeof e.enabled != "boolean" && console.error(F(K, e.name, '"enabled"', '"boolean"', '"' + String(e.enabled) + '"'));
          break;
        case "phase":
          Te.indexOf(e.phase) < 0 && console.error(F(K, e.name, '"phase"', "either " + Te.join(", "), '"' + String(e.phase) + '"'));
          break;
        case "fn":
          typeof e.fn != "function" && console.error(F(K, e.name, '"fn"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "effect":
          e.effect != null && typeof e.effect != "function" && console.error(F(K, e.name, '"effect"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "requires":
          e.requires != null && !Array.isArray(e.requires) && console.error(F(K, e.name, '"requires"', '"array"', '"' + String(e.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(e.requiresIfExists) || console.error(F(K, e.name, '"requiresIfExists"', '"array"', '"' + String(e.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + e.name + '" modifier, valid properties are ' + ot.map(function(o) {
            return '"' + o + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      e.requires && e.requires.forEach(function(o) {
        t.find(function(n) {
          return n.name === o;
        }) == null && console.error(F($r, String(e.name), o, o));
      });
    });
  });
}
function Sr(t, e) {
  var r = /* @__PURE__ */ new Set();
  return t.filter(function(o) {
    var n = e(o);
    if (!r.has(n))
      return r.add(n), !0;
  });
}
function _r(t) {
  var e = t.reduce(function(r, o) {
    var n = r[o.name];
    return r[o.name] = n ? Object.assign({}, n, o, {
      options: Object.assign({}, n.options, o.options),
      data: Object.assign({}, n.data, o.data)
    }) : o, r;
  }, {});
  return Object.keys(e).map(function(r) {
    return e[r];
  });
}
var nt = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Pr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", it = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function at() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Nr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, o = r === void 0 ? [] : r, n = e.defaultOptions, i = n === void 0 ? it : n;
  return function(s, a, p) {
    p === void 0 && (p = i);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, it, i),
      modifiersData: {},
      elements: {
        reference: s,
        popper: a
      },
      attributes: {},
      styles: {}
    }, h = [], b = !1, c = {
      state: l,
      setOptions: function(w) {
        var A = typeof w == "function" ? w(l.options) : w;
        m(), l.options = Object.assign({}, i, l.options, A), l.scrollParents = {
          reference: Z(s) ? ce(s) : s.contextElement ? ce(s.contextElement) : [],
          popper: ce(a)
        };
        var E = Er(_r([].concat(o, l.options.modifiers)));
        if (l.orderedModifiers = E.filter(function(y) {
          return y.enabled;
        }), process.env.NODE_ENV !== "production") {
          var u = Sr([].concat(E, l.options.modifiers), function(y) {
            var P = y.name;
            return P;
          });
          if (Dr(u), M(l.options.placement) === Ae) {
            var g = l.orderedModifiers.find(function(y) {
              var P = y.name;
              return P === "flip";
            });
            g || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var d = V(a), x = d.marginTop, $ = d.marginRight, D = d.marginBottom, S = d.marginLeft;
          [x, $, D, S].some(function(y) {
            return parseFloat(y);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return O(), c.update();
      },
      forceUpdate: function() {
        if (!b) {
          var w = l.elements, A = w.reference, E = w.popper;
          if (!at(A, E)) {
            process.env.NODE_ENV !== "production" && console.error(nt);
            return;
          }
          l.rects = {
            reference: Or(A, he(E), l.options.strategy === "fixed"),
            popper: Ie(E)
          }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(y) {
            return l.modifiersData[y.name] = Object.assign({}, y.data);
          });
          for (var u = 0, g = 0; g < l.orderedModifiers.length; g++) {
            if (process.env.NODE_ENV !== "production" && (u += 1, u > 100)) {
              console.error(Pr);
              break;
            }
            if (l.reset === !0) {
              l.reset = !1, g = -1;
              continue;
            }
            var d = l.orderedModifiers[g], x = d.fn, $ = d.options, D = $ === void 0 ? {} : $, S = d.name;
            typeof x == "function" && (l = x({
              state: l,
              options: D,
              name: S,
              instance: c
            }) || l);
          }
        }
      },
      update: Ar(function() {
        return new Promise(function(v) {
          c.forceUpdate(), v(l);
        });
      }),
      destroy: function() {
        m(), b = !0;
      }
    };
    if (!at(s, a))
      return process.env.NODE_ENV !== "production" && console.error(nt), c;
    c.setOptions(p).then(function(v) {
      !b && p.onFirstUpdate && p.onFirstUpdate(v);
    });
    function O() {
      l.orderedModifiers.forEach(function(v) {
        var w = v.name, A = v.options, E = A === void 0 ? {} : A, u = v.effect;
        if (typeof u == "function") {
          var g = u({
            state: l,
            name: w,
            instance: c,
            options: E
          }), d = function() {
          };
          h.push(g || d);
        }
      });
    }
    function m() {
      h.forEach(function(v) {
        return v();
      }), h = [];
    }
    return c;
  };
}
var Rr = [Jt, vr, zt, kt, ur, sr, gr, Ft, fr], Tr = /* @__PURE__ */ Nr({
  defaultModifiers: Rr
});
const fe = {
  HIDDEN: "vue-tooltip-hidden",
  VISIBLE: "vue-tooltip-visible"
}, Lr = `h-tooltip  ${fe.HIDDEN}`, st = ["top", "left", "right", "bottom", "auto"], Cr = ["start", "end"], Re = {
  ADD: 1,
  REMOVE: 2
}, jr = {
  container: !1,
  delay: 200,
  instance: null,
  fixIosSafari: !1,
  eventsEnabled: !1,
  html: !1,
  modifiers: [
    {
      name: "arrow",
      options: {
        element: ".tooltip-arrow"
      }
    },
    {
      name: "oldOnUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn() {
        this.content(this.tooltip.options.title);
      }
    }
  ],
  placement: "",
  placementPostfix: null,
  removeOnDestroy: !0,
  title: "",
  class: "",
  triggers: ["hover", "focus"],
  offset: 5
}, H = (t, e) => t.indexOf(e) > -1;
class _ {
  constructor(e, r = {}) {
    this._options = {
      ..._._defaults,
      onFirstUpdate: (o) => {
        this.content(o.options.title);
      },
      ..._.filterOptions(r)
    }, this._$el = e, this._$tpl = this._createTooltipElement(this.options), this._$tt = Tr(e, this._$tpl, this._options), this.setupPopper();
  }
  setupPopper() {
    this.disabled = !1, this._visible = !1, this._clearDelay = null, this._$tt.setOptions((e) => ({
      ...e,
      modifiers: [
        ...e.modifiers,
        { name: "eventListeners", enabled: !1 }
      ]
    })), this._setEvents();
  }
  destroy() {
    this._cleanEvents(), this._$tpl && this._$tpl.parentNode && this._$tpl.parentNode.removeChild(this._$tpl);
  }
  get options() {
    return { ...this._options };
  }
  get tooltip() {
    return this._$tt;
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    typeof e == "boolean" && (this._visible = e);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    typeof e == "boolean" && (this._disabled = e);
  }
  show() {
    this.toggle(!0);
  }
  hide() {
    this.toggle(!1);
  }
  toggle(e, r = !0) {
    let o = this._options.delay;
    this.disabled === !0 && (e = !1, o = 0), typeof e != "boolean" && (e = !this._visible), e === !0 && (o = 0), clearTimeout(this._clearDelay), r === !0 && (this._clearDelay = setTimeout(() => {
      this.visible = e, this.visible === !0 && this.disabled !== !0 ? (this._$el.insertAdjacentElement("afterend", this._$tpl), setTimeout(() => {
        this._$tt.setOptions((n) => ({
          ...n,
          modifiers: [
            ...n.modifiers,
            { name: "eventListeners", enabled: !0 }
          ]
        })), this._$tt.update(), this._$tpl.classList.replace(fe.HIDDEN, fe.VISIBLE);
      }, 60)) : (this._$tpl.classList.replace(fe.VISIBLE, fe.HIDDEN), this._$tpl && this._$tpl.parentNode && this._$tpl.parentNode.removeChild(this._$tpl), this._$tt.setOptions((n) => ({
        ...n,
        modifiers: [
          ...n.modifiers,
          { name: "eventListeners", enabled: !1 }
        ]
      })));
    }, o));
  }
  _createTooltipElement(e) {
    let r = document.createElement("div");
    r.setAttribute("id", `tooltip-${Ir()}`), r.setAttribute("class", `${Lr} ${this._options.class}`);
    let o = document.createElement("div");
    o.setAttribute("class", "tooltip-arrow"), o.setAttribute("data-popper-arrow", ""), r.appendChild(o);
    let n = document.createElement("div");
    return n.setAttribute("class", "tooltip-content"), r.appendChild(n), r;
  }
  _events(e = Re.ADD) {
    const r = e === Re.ADD ? "addEventListener" : "removeEventListener";
    if (!Array.isArray(this.options.triggers)) {
      console.error("trigger should be an array", this.options.triggers);
      return;
    }
    let o = (...n) => this._$el[r](...n);
    if (H(this.options.triggers, "manual"))
      o("click", this._onToggle.bind(this), !1);
    else {
      if (this.options.fixIosSafari && _.isIosSafari() && H(this.options.triggers, "hover")) {
        const n = this.options.triggers.indexOf("hover"), i = H(this.options.triggers, "click");
        this._options.triggers[n] = i !== -1 ? "click" : null;
      }
      this.options.triggers.map((n) => {
        switch (n) {
          case "click":
            o("click", (i) => {
              this._onToggle(i);
            }, !1);
            break;
          case "hover":
            o("mouseenter", this._onActivate.bind(this), !1), o("mouseleave", this._onDeactivate.bind(this), !1);
            break;
          case "focus":
            o("focus", this._onActivate.bind(this), !1), o("blur", this._onDeactivate.bind(this), !0);
            break;
        }
      }), (H(this.options.triggers, "hover") || H(this.options.triggers, "focus")) && (this._$tpl[r]("mouseenter", this._onMouseOverTooltip.bind(this), !1), this._$tpl[r]("mouseleave", this._onMouseOutTooltip.bind(this), !1));
    }
  }
  _setEvents() {
    this._events();
  }
  _cleanEvents() {
    this._events(Re.REMOVE);
  }
  _onActivate(e) {
    this.show();
  }
  _onDeactivate(e) {
    this.hide();
  }
  _onToggle(e) {
    e.stopPropagation(), e.preventDefault(), this.toggle();
  }
  _onMouseOverTooltip(e) {
    this.toggle(!0, !1);
  }
  _onMouseOutTooltip(e) {
    this.toggle(!1);
  }
  content(e) {
    console.log(this._$tt);
    const r = this._$tt.state.elements.popper.querySelector(".tooltip-content");
    typeof e == "string" ? (this._$tt.state.options.title = e, r.textContent = e) : kr(e) ? e !== r.children[0] && (r.innerHTML = "", r.appendChild(e)) : console.error("unsupported content type", e);
  }
  set class(e) {
    if (typeof e == "string") {
      const r = this._$tpl.classList.value.replace(this.options.class, e);
      this._options.class = r, this._$tpl.setAttribute("class", r);
    }
  }
  static filterOptions(e) {
    let r = { ...e };
    r.modifiers = [];
    let o = null, n = null;
    r.placement.indexOf("-") > -1 ? ([o, n] = r.placement.split("-"), r.placement = H(st, o) && H(Cr, n) ? r.placement : _._defaults.placement) : r.placement = H(st, r.placement) ? r.placement : _._defaults.placement;
    const i = window.isNaN(e.offset) || e.offset < 0 ? _._defaults.offset : e.offset;
    return r.modifiers.push({
      name: "offset",
      options: {
        offset: [i, i]
      }
    }), r;
  }
  static isIosSafari() {
    return H(navigator.userAgent.toLowerCase(), "mobile") && H(navigator.userAgent.toLowerCase(), "safari") && (navigator.platform.toLowerCase() === "iphone" || navigator.platform.toLowerCase() === "ipad");
  }
  static defaults(e) {
    _._defaults = { ..._._defaults, ...e };
  }
}
_._defaults = { ...jr };
function Ir() {
  return `${Date.now()}-${Math.round(Math.random() * 1e8)}`;
}
function kr(t) {
  return t instanceof window.Element;
}
const te = "vue-tooltip", Br = ["auto", "top", "bottom", "left", "right"], Mr = ["start", "end"], Yr = {
  name: "tooltip",
  config: {},
  install(t, e) {
    t.directive("tooltip", {
      beforeMount(r, o, n) {
        e && _.defaults(e);
      },
      mounted(r, o, n, i) {
        e && _.defaults(e);
        let f = Hr(o, n);
        r.tooltip = new _(r, f), o.modifiers.notrigger && o.value.visible === !0 && r.tooltip.show(), o.value && o.value.visible === !1 && (r.tooltip.disabled = !0);
      },
      updated(r, o, n, i) {
        Vr(o.value, o.oldValue) && Xr(r, o, n);
      },
      unmounted(r, o, n, i) {
        r.tooltip.destroy();
      }
    });
  }
};
function Vr(t, e) {
  let r = !1;
  return typeof t == "string" && t !== e ? r = !0 : De(t) && Object.keys(t).forEach((o) => {
    t[o] !== e[o] && (r = !0);
  }), r;
}
function Hr(t, e) {
  const r = !t.value || isNaN(t.value.delay) ? _._defaults.delay : t.value.delay;
  return t.value.ref && (e.context.$refs[t.value.ref] ? t.value.html = e.context.$refs[t.value.ref] : console.error(`[Tooltip] no REF element [${t.value.ref}]`)), {
    class: Ur(t),
    id: t.value ? t.value.id : null,
    html: t.value ? t.value.html : null,
    placement: Wr(t),
    title: gt(t),
    triggers: qr(t),
    fixIosSafari: t.modifiers.ios || !1,
    offset: t.value && t.value.offset ? t.value.offset : _._defaults.offset,
    delay: r
  };
}
function Wr({ modifiers: t, value: e }) {
  let r = Object.keys(t);
  r.length === 0 && De(e) && typeof e.placement == "string" && (r = e.placement.split("."));
  let o = "bottom", n = null;
  for (let i = 0; i < r.length; i++) {
    const f = r[i];
    Br.indexOf(f) > -1 && (o = f), Mr.indexOf(f) > -1 && (n = f);
  }
  return o && n ? `${o}-${n}` : o;
}
function qr({ modifiers: t }) {
  let e = [];
  return t.notrigger || (t.manual ? e.push("manual") : (t.click && e.push("click"), t.hover && e.push("hover"), t.focus && e.push("focus"), e.length === 0 && e.push("hover", "focus"))), e;
}
function De(t) {
  return typeof t == "object";
}
function Fr(t) {
  return t instanceof window.Element;
}
function Ur({ value: t }) {
  return t === null ? te : De(t) && typeof t.class == "string" ? `${te} ${t.class}` : _._defaults.class ? `${te} ${_._defaults.class}` : te;
}
function gt({ value: t }, e) {
  return t !== null && De(t) ? t.content !== void 0 ? `${t.content}` : t.id && document.getElementById(t.id) ? document.getElementById(t.id) : t.html && document.getElementById(t.html) ? document.getElementById(t.html) : Fr(t.html) ? t.html : t.ref && e && e.context.$refs[t.ref] || "" : `${t}`;
}
function Xr(t, e, r, o) {
  if (typeof e.value == "string")
    t.tooltip.content(e.value);
  else {
    if (e.value && e.value.class && e.value.class.trim() !== t.tooltip.options.class.replace(te, "").trim() && (t.tooltip.class = `${te} ${e.value.class.trim()}`), t.tooltip.content(gt(e, r)), !e.modifiers.notrigger && e.value && typeof e.value.visible == "boolean") {
      t.tooltip.disabled = !e.value.visible;
      return;
    } else
      e.modifiers.notrigger && (t.tooltip.disabled = !1);
    const n = r.data.directives[0];
    n.oldValue.visible !== n.value.visible && (t.tooltip.disabled || t.tooltip.toggle(n.value.visible));
  }
}
export {
  Yr as default
};
