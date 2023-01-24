!(function (t) {
  "use strict";
  function e(t) {
    return new RegExp("(^|\\s+)" + t + "(\\s+|$)");
  }
  var a, s, r;
  function n(t, e) {
    (a(t, e) ? r : s)(t, e);
  }
  "classList" in document.documentElement
    ? ((a = function (t, e) {
        return t.classList.contains(e);
      }),
      (s = function (t, e) {
        t.classList.add(e);
      }),
      (r = function (t, e) {
        t.classList.remove(e);
      }))
    : ((a = function (t, a) {
        return e(a).test(t.className);
      }),
      (s = function (t, e) {
        a(t, e) || (t.className = t.className + " " + e);
      }),
      (r = function (t, a) {
        t.className = t.className.replace(e(a), " ");
      }));
  var i = {
    hasClass: a,
    addClass: s,
    removeClass: r,
    toggleClass: n,
    has: a,
    add: s,
    remove: r,
    toggle: n,
  };
  "function" == typeof define && define.amd
    ? define(i)
    : "object" == typeof exports
    ? (module.exports = i)
    : (t.classie = i);
})(window),
  (function (t) {
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll("[data-toggle~=nav]").forEach(function (t) {
        for (var e = t.getElementsByTagName("li"), a = 0; a < e.length; a++)
          (classie.hasClass(e[a], "active") ||
            "true" === e[a].getAttribute("data-active")) &&
            (e[a].setAttribute("data-active", "true"),
            classie.addClass(e[a], "active"));
        t.addEventListener("click", function (e) {
          var a = e.target;
          if (
            (console.log(e.target.parentNode),
            "LI" == e.target.parentNode.tagName && (a = e.target.parentNode),
            "true" !== a.getAttribute("data-active"))
          ) {
            for (var s = t.getElementsByTagName("li"), r = 0; r < s.length; r++)
              classie.removeClass(s[r], "active"),
                s[r].setAttribute("data-active", "false");
            classie.addClass(a, "active"),
              a.setAttribute("data-active", "true");
          }
        });
      }),
        document.querySelectorAll("[data-toggle~=tabs]").forEach(function (t) {
          for (
            var e = t.getElementsByClassName("mg-tabs--item"), a = 0;
            a < e.length;
            a++
          )
            if (
              classie.hasClass(e[a], "active") ||
              "true" === e[a].getAttribute("data-active")
            ) {
              e[a].setAttribute("data-active", "true"),
                classie.addClass(e[a], "active");
              var s = e[a].getAttribute("data-target");
              s && (document.getElementById(s).style.display = "block");
            }
          t.addEventListener("click", function (e) {
            var a = e.target;
            if (
              classie.hasClass(e.target.parentNode, "mg-tabs--item") &&
              ((a = e.target.parentNode),
              e.stopPropagation(),
              e.preventDefault(),
              "true" !== a.getAttribute("data-active"))
            ) {
              for (
                var s = t.getElementsByClassName("mg-tabs--item"), r = 0;
                r < s.length;
                r++
              ) {
                classie.removeClass(s[r], "active"),
                  s[r].setAttribute("data-active", "false");
                var n = s[r].getAttribute("data-target");
                n && (document.getElementById(n).style.display = "none");
              }
              classie.addClass(a, "active"),
                a.setAttribute("data-active", "true");
              var i = a.getAttribute("data-target");
              i && (document.getElementById(i).style.display = "block");
            }
          });
        });
      var e = null;
      function a() {
        e &&
          (e.setAttribute("aria-expanded", "false"),
          e.setAttribute("aria-hidden", "true"),
          e.parentNode.classList.remove("opened"),
          (e = !1));
      }
      document
        .querySelectorAll("[data-toggle~=dropdown]")
        .forEach(function (t) {
          t.setAttribute("aria-haspopup", "true"),
            t.setAttribute("aria-expanded", "false");
          var s = t.parentNode.querySelector(".mg-dropdown--content");
          s.setAttribute("aria-hidden", "true"),
            (t.onclick = function (r) {
              if (
                (r.preventDefault(),
                r.stopPropagation(),
                "true" === t.getAttribute("aria-expanded"))
              )
                return (
                  t.setAttribute("aria-expanded", "false"),
                  s.setAttribute("aria-hidden", "true"),
                  t.parentNode.classList.remove("opened"),
                  void (e = !1)
                );
              return (
                a.call(),
                t.setAttribute("aria-expanded", "true"),
                s.setAttribute("aria-hidden", "false"),
                t.parentNode.classList.add("opened"),
                s.children[0].focus(),
                void (e = t)
              );
            });
        }),
        document.querySelectorAll("[data-toggle~=modal]").forEach(function (t) {
          function e() {
            classie.has(t), classie.remove(a, "mg-show");
          }
          var a = document.querySelector("#" + t.getAttribute("data-target")),
            s = a.querySelector("[data-action=close]");
          t.addEventListener("click", function (t) {
            classie.add(a, "mg-show");
          }),
            s.addEventListener("click", function (t) {
              t.stopPropagation(), e();
            });
        }),
        (t.onclick = function (t) {
          classie.hasClass(t.target, "mg-dropdown") ||
            classie.hasClass(t.target, "mg-dropdown--button") ||
            classie.hasClass(t.target, "mg-dropdown--content") ||
            a.call();
        }),
        t.addEventListener("load", function () {
          document.querySelector("body").classList.add("loaded");
        });
    });
  })(window);
