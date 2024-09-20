(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [653],
  {
    4603: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Register",
        function () {
          return a(8850);
        },
      ]);
    },
    8850: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(5893),
        r = a(7294);
      t.default = () => {
        let [e, t] = (0, r.useState)(""),
          [a, s] = (0, r.useState)(""),
          [o, i] = (0, r.useState)(""),
          [c, u] = (0, r.useState)(""),
          l = async () => {
            try {
              let t = await fetch(
                "http://gerberknights3.xyz/LAMPAPI/AccountCreation.php",
                {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                  },
                  body: JSON.stringify({
                    FirstName: e,
                    LastName: a,
                    Login: o,
                    Password: c,
                  }),
                }
              );
              if (!t.ok) {
                let e = await t.json();
                throw Error(e.error || "HTTP error! status: ".concat(t.status));
              }
              let n = await t.json();
              console.log("Response:", n);
            } catch (e) {
              console.error("Error adding contact:", e);
            }
          };
        return (0, n.jsx)("div", {
          className: "main-body",
          children: (0, n.jsxs)("form", {
            onSubmit: (e) => {
              e.preventDefault(), l();
            },
            children: [
              (0, n.jsx)("h1", { children: "Register an Account" }),
              (0, n.jsxs)("div", {
                className: "input-box",
                children: [
                  (0, n.jsxs)("div", {
                    className: "name-box",
                    children: [
                      (0, n.jsx)("input", {
                        type: "text",
                        name: "FirstName",
                        placeholder: "Enter First Name",
                        required: !0,
                        value: e,
                        onChange: (e) => t(e.target.value),
                      }),
                      (0, n.jsx)("input", {
                        type: "text",
                        name: "LastName",
                        placeholder: "Enter Last Name",
                        required: !0,
                        value: a,
                        onChange: (e) => s(e.target.value),
                      }),
                    ],
                  }),
                  (0, n.jsx)("input", {
                    type: "text",
                    name: "Login",
                    placeholder: "Enter a Username",
                    required: !0,
                    value: o,
                    onChange: (e) => i(e.target.value),
                  }),
                  (0, n.jsx)("input", {
                    type: "password",
                    name: "password",
                    placeholder: "Enter a Password",
                    required: !0,
                    value: c,
                    onChange: (e) => u(e.target.value),
                  }),
                ],
              }),
              (0, n.jsx)("button", {
                type: "submit",
                className: "btn",
                children: "Register",
              }),
              (0, n.jsx)("div", {
                className: "create-account",
                children: (0, n.jsx)("p", {
                  children: "Already Have an Account?",
                }),
              }),
            ],
          }),
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 4603));
    }),
      (_N_E = e.O());
  },
]);
