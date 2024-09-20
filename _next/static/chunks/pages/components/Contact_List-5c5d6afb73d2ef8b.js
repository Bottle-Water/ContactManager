(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [328],
  {
    6774: function (e, s, t) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Contact_List",
        function () {
          return t(7197);
        },
      ]);
    },
    1181: function (e, s, t) {
      "use strict";
      t.r(s);
      var r = t(5893),
        a = t(7294);
      s.default = () => {
        let [e, s] = (0, a.useState)([]);
        (0, a.useEffect)(() => {
          t();
        }, []);
        let t = async () => {
            fetch("http://gerberknights3.xyz/LAMPAPI/SearchContacts.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                search: "",
                userId: localStorage.getItem("userID"),
              }),
            })
              .then((e) => e.json())
              .then((e) => {
                e.error
                  ? (console.log("Error: ", e.error), s([]))
                  : e.results && e.results.length > 0
                  ? (s(e.results), console.log(e.results))
                  : (console.log("No valid data found"), s([]));
              })
              .catch((e) => {
                console.error("Error Searching Data: ", e);
              });
          },
          o = async (e) => {
            try {
              let s = await fetch(
                  "http://gerberknights3.xyz/LAMPAPI/DeleteContact.php",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({ ID: e }),
                  }
                ),
                r = await s.json();
              console.log("response: ", r),
                "contact deleted" === r.results && t();
            } catch (e) {
              console.error("Error Deleting contact:", e);
            }
          };
        return (0, r.jsx)("div", {
          className: "item",
          children: e.map((e, s) =>
            (0, r.jsxs)(
              "div",
              {
                className: "contact-list",
                children: [
                  (0, r.jsxs)("div", {
                    className: "info",
                    children: [
                      (0, r.jsxs)("div", { children: ["Name: ", e.Name] }),
                      (0, r.jsxs)("div", { children: ["Email: ", e.Email] }),
                      (0, r.jsxs)("div", { children: ["Phone: ", e.Phone] }),
                    ],
                  }),
                  (0, r.jsx)("i", {
                    className: "trash icon right floated",
                    style: {
                      color: "red",
                      marginTop: "10px",
                      cursor: "pointer",
                    },
                    onClick: () => o(e.ID),
                  }),
                ],
              },
              s
            )
          ),
        });
      };
    },
    7197: function (e, s, t) {
      "use strict";
      t.r(s);
      var r = t(5893),
        a = t(7294),
        o = t(1181),
        n = t(4654),
        c = t(8954);
      s.default = () => {
        let [e, s] = (0, a.useState)([]),
          [t, l] = (0, a.useState)(""),
          i = (e) => {
            "" === e
              ? s([])
              : fetch("http://gerberknights3.xyz/LAMPAPI/SearchContacts.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    search: e,
                    userId: localStorage.getItem("userID"),
                  }),
                })
                  .then((e) => e.json())
                  .then((e) => {
                    e.error
                      ? (console.log("Error: ", e.error), s([]))
                      : e.results && e.results.length > 0
                      ? (s(e.results), console.log(e.results))
                      : (console.log("No valid data found"), s([]));
                  })
                  .catch((e) => {
                    console.error("Error Searching Data: ", e);
                  });
          },
          h = async (e) => {
            try {
              let s = await fetch(
                  "http://gerberknights3.xyz/LAMPAPI/DeleteContact.php",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({ ID: e }),
                  }
                ),
                r = await s.json();
              console.log("response: ", r),
                "contact deleted" === r.results && i(t);
            } catch (e) {
              console.error("Error Deleting contact:", e);
            }
          };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(n.default, {}),
            (0, r.jsxs)("div", {
              className: "search-bar-container",
              children: [
                (0, r.jsx)(c.default, { setResults: s, setSearchValue: l }),
                (0, r.jsx)("div", {
                  className: "results-list",
                  children: e.map((e, s) =>
                    (0, r.jsxs)(
                      "div",
                      {
                        className: "result-item",
                        children: [
                          (0, r.jsxs)("p", { children: ["Name: ", e.Name] }),
                          (0, r.jsxs)("p", { children: ["Email: ", e.Email] }),
                          (0, r.jsxs)("p", { children: ["Phone: ", e.Phone] }),
                          (0, r.jsxs)("p", {
                            children: ["Date Created: ", e.DateCreated],
                          }),
                          (0, r.jsx)("div", {
                            className: "icon-group",
                            children: (0, r.jsx)("i", {
                              className: "trash icon",
                              style: { color: "red", cursor: "pointer" },
                              onClick: () => h(e.ID),
                            }),
                          }),
                        ],
                      },
                      s
                    )
                  ),
                }),
                (0, r.jsx)("div", {
                  className: "contact-header",
                  children: "Contact List",
                }),
                (0, r.jsx)("p", {}),
                (0, r.jsx)("div", {
                  className: "ui celled list",
                  children: (0, r.jsx)(o.default, {}),
                }),
              ],
            }),
          ],
        });
      };
    },
    4654: function (e, s, t) {
      "use strict";
      t.r(s);
      var r = t(5893);
      t(7294),
        (s.default = () =>
          (0, r.jsx)("nav", {
            className: "navbar",
            children: (0, r.jsxs)("div", {
              className: "container",
              children: [
                (0, r.jsx)("div", { className: "logo" }),
                (0, r.jsx)("ul", {
                  children: (0, r.jsx)("li", {
                    children: (0, r.jsx)("p", {
                      href: "/",
                      children: "Sign Out",
                    }),
                  }),
                }),
              ],
            }),
          }));
    },
    8954: function (e, s, t) {
      "use strict";
      t.r(s);
      var r = t(5893),
        a = t(7294);
      s.default = (e) => {
        let { setResults: s, setSearchValue: t } = e,
          [o, n] = (0, a.useState)(""),
          c = (e) => {
            "" === e
              ? s([])
              : fetch("http://gerberknights3.xyz/LAMPAPI/SearchContacts.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    search: e,
                    userId: localStorage.getItem("userID"),
                  }),
                })
                  .then((e) => e.json())
                  .then((e) => {
                    e.error
                      ? (console.log("Error: ", e.error), s([]))
                      : e.results && e.results.length > 0
                      ? (s(e.results), console.log(e.results))
                      : (console.log("No valid data found"), s([]));
                  })
                  .catch((e) => {
                    console.error("Error Searching Data: ", e);
                  });
          },
          l = (e) => {
            n(e), t(e), c(e);
          };
        return (0, r.jsx)("div", {
          className: "input-wrapper",
          children: (0, r.jsx)("input", {
            className: "search-bar-box",
            placeholder: "Search for a Contact",
            value: o,
            onChange: (e) => l(e.target.value),
          }),
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 6774));
    }),
      (_N_E = e.O());
  },
]);
