(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [255],
  {
    6860: function (e, t, s) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Contact_Info",
        function () {
          return s(1181);
        },
      ]);
    },
    1181: function (e, t, s) {
      "use strict";
      s.r(t);
      var o = s(5893),
        n = s(7294);
      t.default = () => {
        let [e, t] = (0, n.useState)([]);
        (0, n.useEffect)(() => {
          s();
        }, []);
        let s = async () => {
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
                  ? (console.log("Error: ", e.error), t([]))
                  : e.results && e.results.length > 0
                  ? (t(e.results), console.log(e.results))
                  : (console.log("No valid data found"), t([]));
              })
              .catch((e) => {
                console.error("Error Searching Data: ", e);
              });
          },
          r = async (e) => {
            try {
              let t = await fetch(
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
                o = await t.json();
              console.log("response: ", o),
                "contact deleted" === o.results && s();
            } catch (e) {
              console.error("Error Deleting contact:", e);
            }
          };
        return (0, o.jsx)("div", {
          className: "item",
          children: e.map((e, t) =>
            (0, o.jsxs)(
              "div",
              {
                className: "contact-list",
                children: [
                  (0, o.jsxs)("div", {
                    className: "info",
                    children: [
                      (0, o.jsxs)("div", { children: ["Name: ", e.Name] }),
                      (0, o.jsxs)("div", { children: ["Email: ", e.Email] }),
                      (0, o.jsxs)("div", { children: ["Phone: ", e.Phone] }),
                    ],
                  }),
                  (0, o.jsx)("i", {
                    className: "trash icon right floated",
                    style: {
                      color: "red",
                      marginTop: "10px",
                      cursor: "pointer",
                    },
                    onClick: () => r(e.ID),
                  }),
                ],
              },
              t
            )
          ),
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 6860));
    }),
      (_N_E = e.O());
  },
]);
