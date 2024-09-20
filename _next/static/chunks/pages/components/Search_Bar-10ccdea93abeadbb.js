(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [711],
  {
    7856: function (e, r, t) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Search_Bar",
        function () {
          return t(8954);
        },
      ]);
    },
    8954: function (e, r, t) {
      "use strict";
      t.r(r);
      var n = t(5893),
        o = t(7294);
      r.default = (e) => {
        let { setResults: r, setSearchValue: t } = e,
          [a, s] = (0, o.useState)(""),
          c = (e) => {
            "" === e
              ? r([])
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
                      ? (console.log("Error: ", e.error), r([]))
                      : e.results && e.results.length > 0
                      ? (r(e.results), console.log(e.results))
                      : (console.log("No valid data found"), r([]));
                  })
                  .catch((e) => {
                    console.error("Error Searching Data: ", e);
                  });
          },
          l = (e) => {
            s(e), t(e), c(e);
          };
        return (0, n.jsx)("div", {
          className: "input-wrapper",
          children: (0, n.jsx)("input", {
            className: "search-bar-box",
            placeholder: "Search for a Contact",
            value: a,
            onChange: (e) => l(e.target.value),
          }),
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 7856));
    }),
      (_N_E = e.O());
  },
]);
