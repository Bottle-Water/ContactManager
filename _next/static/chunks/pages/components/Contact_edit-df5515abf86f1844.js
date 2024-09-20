(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [102],
  {
    5879: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Contact_edit",
        function () {
          return a(5717);
        },
      ]);
    },
    5717: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(5893),
        l = a(7294);
      t.default = () => {
        let [e, t] = (0, l.useState)(""),
          [a, s] = (0, l.useState)(""),
          [i, o] = (0, l.useState)(""),
          c = async () => {
            try {
              let t = await fetch(
                  "http://gerberknights3.xyz/LAMPAPI/UpdateContact.php",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({
                      ID: id,
                      Name: e,
                      Email: a,
                      Phone: i,
                    }),
                  }
                ),
                n = await t.json();
              console.log("response: ", n);
            } catch (e) {
              console.error("Error updating contact:", e);
            }
          };
        return (0, n.jsxs)("div", {
          className: "main-body",
          children: [
            (0, n.jsx)("h2", { children: "Edit Contact" }),
            (0, n.jsxs)("form", {
              className: "ui form",
              children: [
                (0, n.jsxs)("div", {
                  className: "field",
                  children: [
                    (0, n.jsx)("label", { children: "Name" }),
                    (0, n.jsx)("input", {
                      type: "text",
                      name: "name",
                      placeholder: "Name",
                      value: e,
                      onChange: (e) => t(e.target.value),
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  className: "field",
                  children: [
                    (0, n.jsx)("label", { children: "Email" }),
                    (0, n.jsx)("input", {
                      type: "email",
                      name: "email",
                      placeholder: "Email",
                      value: a,
                      onChange: (e) => s(e.target.value),
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  className: "field",
                  children: [
                    (0, n.jsx)("label", { children: "Phone Number" }),
                    (0, n.jsx)("input", {
                      type: "tel",
                      name: "phone",
                      placeholder: "Phone",
                      value: i,
                      onChange: (e) => o(e.target.value),
                    }),
                  ],
                }),
                (0, n.jsx)("button", {
                  type: "submit",
                  className: "ui button blue",
                  onClick: (e) => {
                    e.preventDefault(), c(id);
                  },
                  children: "Update",
                }),
              ],
            }),
          ],
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 5879));
    }),
      (_N_E = e.O());
  },
]);
