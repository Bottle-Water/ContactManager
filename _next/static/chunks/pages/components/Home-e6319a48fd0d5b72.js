(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [219],
  {
    3577: function (e, n, t) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/components/Home",
        function () {
          return t(7861);
        },
      ]);
    },
    7861: function (e, n, t) {
      "use strict";
      t.r(n);
      var s = t(5893),
        r = t(7294);
      n.default = () => {
        let [e, n] = (0, r.useState)(""),
          [t, a] = (0, r.useState)(""),
          [o, c] = (0, r.useState)(""),
          i = async () => {
            try {
              let n = await fetch(
                  "http://gerberknights3.xyz/LAMPAPI/AccountLogin.php",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({ Login: e, Password: t }),
                  }
                ),
                s = await n.json();
              console.log("response", s),
                s.id > 0
                  ? localStorage.setItem("userID", s.id)
                  : c(s.error || "Invalid Username or Password");
            } catch (e) {
              console.error("Error adding contact:", e),
                c("Invalid Username or Password.");
            }
          };
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsxs)("div", {
            className: "main-body",
            children: [
              (0, s.jsx)("div", {
                className: "welcome-text",
                children: (0, s.jsx)("h1", {
                  children: "Welcome to the UCF Contact Manager",
                }),
              }),
              (0, s.jsxs)("form", {
                onSubmit: (e) => {
                  e.preventDefault(), i();
                },
                children: [
                  (0, s.jsx)("h1", { children: "Login" }),
                  (0, s.jsxs)("div", {
                    className: "input-box",
                    children: [
                      (0, s.jsx)("input", {
                        type: "text",
                        name: "Login",
                        placeholder: "Username",
                        required: !0,
                        value: e,
                        onChange: (e) => {
                          n(e.target.value), c("");
                        },
                      }),
                      (0, s.jsx)("input", {
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                        required: !0,
                        value: t,
                        onChange: (e) => {
                          a(e.target.value), c("");
                        },
                      }),
                    ],
                  }),
                  o &&
                    (0, s.jsx)("p", { style: { color: "red" }, children: o }),
                  (0, s.jsx)("button", {
                    type: "submit",
                    className: "btn",
                    children: "Login",
                  }),
                  (0, s.jsx)("div", { className: "create-account" }),
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
      return e((e.s = 3577));
    }),
      (_N_E = e.O());
  },
]);
