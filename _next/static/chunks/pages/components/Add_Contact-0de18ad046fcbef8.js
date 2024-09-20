(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [708],
  {
    9095: function (e, a, t) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Add_Contact",
        function () {
          return t(5463);
        },
      ]);
    },
    5463: function (e, a, t) {
      "use strict";
      t.r(a);
      var n = t(5893),
        s = t(7294);
      a.default = (e) => {
        let [a, t] = (0, s.useState)(""),
          [l, r] = (0, s.useState)(""),
          [i, d] = (0, s.useState)(""),
          c = async (e) => {
            e.preventDefault();
            let t = localStorage.getItem("userID");
            try {
              let e = await fetch(
                  "http://gerberknights3.xyz/LAMPAPI/addContact.php",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({
                      name: a,
                      email: l,
                      phone: i,
                      userID: t,
                    }),
                  }
                ),
                n = await e.json();
              console.log("Response data:", n);
            } catch (e) {
              console.error("Error adding contact:", e);
            }
          };
        return (0, n.jsx)(n.Fragment, {
          children: (0, n.jsxs)("div", {
            className: "main-body",
            children: [
              (0, n.jsx)("div", {}),
              (0, n.jsx)("h1", {
                className: "ui center aligned header",
                children: "Add Contact",
              }),
              (0, n.jsxs)("form", {
                className: "ui form",
                onSubmit: c,
                children: [
                  (0, n.jsxs)("div", {
                    className: "field",
                    children: [
                      (0, n.jsx)("label", { children: "Name" }),
                      (0, n.jsx)("input", {
                        type: "text",
                        name: "name",
                        placeholder: "Name",
                        value: a,
                        required: !0,
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
                        required: !0,
                        value: l,
                        onChange: (e) => r(e.target.value),
                      }),
                    ],
                  }),
                  (0, n.jsxs)("div", {
                    className: "field",
                    children: [
                      (0, n.jsx)("label", { children: "Phone Number" }),
                      (0, n.jsx)("input", {
                        type: "tel",
                        name: "phoneNumber",
                        placeholder: "Phone Number",
                        value: i,
                        required: !0,
                        onChange: (e) => d(e.target.value),
                      }),
                    ],
                  }),
                  (0, n.jsx)("div", {
                    className: "add-buttons",
                    children: (0, n.jsx)("button", {
                      className: "ui button blue",
                      children: "Add",
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 9095));
    }),
      (_N_E = e.O());
  },
]);
