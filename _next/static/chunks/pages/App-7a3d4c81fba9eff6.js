(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [35],
  {
    3201: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/App",
        function () {
          return a(8836);
        },
      ]);
    },
    8836: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893);
      a(7294), a(5463), a(7197);
      var r = a(7861);
      a(5717),
        a(8850),
        (t.default = function () {
          return (0, s.jsx)(r.default, {});
        });
    },
    5463: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294);
      t.default = (e) => {
        let [t, a] = (0, r.useState)(""),
          [n, l] = (0, r.useState)(""),
          [o, c] = (0, r.useState)(""),
          i = async (e) => {
            e.preventDefault();
            let a = localStorage.getItem("userID");
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
                      name: t,
                      email: n,
                      phone: o,
                      userID: a,
                    }),
                  }
                ),
                s = await e.json();
              console.log("Response data:", s);
            } catch (e) {
              console.error("Error adding contact:", e);
            }
          };
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsxs)("div", {
            className: "main-body",
            children: [
              (0, s.jsx)("div", {}),
              (0, s.jsx)("h1", {
                className: "ui center aligned header",
                children: "Add Contact",
              }),
              (0, s.jsxs)("form", {
                className: "ui form",
                onSubmit: i,
                children: [
                  (0, s.jsxs)("div", {
                    className: "field",
                    children: [
                      (0, s.jsx)("label", { children: "Name" }),
                      (0, s.jsx)("input", {
                        type: "text",
                        name: "name",
                        placeholder: "Name",
                        value: t,
                        required: !0,
                        onChange: (e) => a(e.target.value),
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "field",
                    children: [
                      (0, s.jsx)("label", { children: "Email" }),
                      (0, s.jsx)("input", {
                        type: "email",
                        name: "email",
                        placeholder: "Email",
                        required: !0,
                        value: n,
                        onChange: (e) => l(e.target.value),
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "field",
                    children: [
                      (0, s.jsx)("label", { children: "Phone Number" }),
                      (0, s.jsx)("input", {
                        type: "tel",
                        name: "phoneNumber",
                        placeholder: "Phone Number",
                        value: o,
                        required: !0,
                        onChange: (e) => c(e.target.value),
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: "add-buttons",
                    children: (0, s.jsx)("button", {
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
    1181: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294);
      t.default = () => {
        let [e, t] = (0, r.useState)([]);
        (0, r.useEffect)(() => {
          a();
        }, []);
        let a = async () => {
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
          n = async (e) => {
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
                s = await t.json();
              console.log("response: ", s),
                "contact deleted" === s.results && a();
            } catch (e) {
              console.error("Error Deleting contact:", e);
            }
          };
        return (0, s.jsx)("div", {
          className: "item",
          children: e.map((e, t) =>
            (0, s.jsxs)(
              "div",
              {
                className: "contact-list",
                children: [
                  (0, s.jsxs)("div", {
                    className: "info",
                    children: [
                      (0, s.jsxs)("div", { children: ["Name: ", e.Name] }),
                      (0, s.jsxs)("div", { children: ["Email: ", e.Email] }),
                      (0, s.jsxs)("div", { children: ["Phone: ", e.Phone] }),
                    ],
                  }),
                  (0, s.jsx)("i", {
                    className: "trash icon right floated",
                    style: {
                      color: "red",
                      marginTop: "10px",
                      cursor: "pointer",
                    },
                    onClick: () => n(e.ID),
                  }),
                ],
              },
              t
            )
          ),
        });
      };
    },
    7197: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294),
        n = a(1181),
        l = a(4654),
        o = a(8954);
      t.default = () => {
        let [e, t] = (0, r.useState)([]),
          [a, c] = (0, r.useState)(""),
          i = (e) => {
            "" === e
              ? t([])
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
                      ? (console.log("Error: ", e.error), t([]))
                      : e.results && e.results.length > 0
                      ? (t(e.results), console.log(e.results))
                      : (console.log("No valid data found"), t([]));
                  })
                  .catch((e) => {
                    console.error("Error Searching Data: ", e);
                  });
          },
          d = async (e) => {
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
                s = await t.json();
              console.log("response: ", s),
                "contact deleted" === s.results && i(a);
            } catch (e) {
              console.error("Error Deleting contact:", e);
            }
          };
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(l.default, {}),
            (0, s.jsxs)("div", {
              className: "search-bar-container",
              children: [
                (0, s.jsx)(o.default, { setResults: t, setSearchValue: c }),
                (0, s.jsx)("div", {
                  className: "results-list",
                  children: e.map((e, t) =>
                    (0, s.jsxs)(
                      "div",
                      {
                        className: "result-item",
                        children: [
                          (0, s.jsxs)("p", { children: ["Name: ", e.Name] }),
                          (0, s.jsxs)("p", { children: ["Email: ", e.Email] }),
                          (0, s.jsxs)("p", { children: ["Phone: ", e.Phone] }),
                          (0, s.jsxs)("p", {
                            children: ["Date Created: ", e.DateCreated],
                          }),
                          (0, s.jsx)("div", {
                            className: "icon-group",
                            children: (0, s.jsx)("i", {
                              className: "trash icon",
                              style: { color: "red", cursor: "pointer" },
                              onClick: () => d(e.ID),
                            }),
                          }),
                        ],
                      },
                      t
                    )
                  ),
                }),
                (0, s.jsx)("div", {
                  className: "contact-header",
                  children: "Contact List",
                }),
                (0, s.jsx)("p", {}),
                (0, s.jsx)("div", {
                  className: "ui celled list",
                  children: (0, s.jsx)(n.default, {}),
                }),
              ],
            }),
          ],
        });
      };
    },
    5717: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294);
      t.default = () => {
        let [e, t] = (0, r.useState)(""),
          [a, n] = (0, r.useState)(""),
          [l, o] = (0, r.useState)(""),
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
                      Phone: l,
                    }),
                  }
                ),
                s = await t.json();
              console.log("response: ", s);
            } catch (e) {
              console.error("Error updating contact:", e);
            }
          };
        return (0, s.jsxs)("div", {
          className: "main-body",
          children: [
            (0, s.jsx)("h2", { children: "Edit Contact" }),
            (0, s.jsxs)("form", {
              className: "ui form",
              children: [
                (0, s.jsxs)("div", {
                  className: "field",
                  children: [
                    (0, s.jsx)("label", { children: "Name" }),
                    (0, s.jsx)("input", {
                      type: "text",
                      name: "name",
                      placeholder: "Name",
                      value: e,
                      onChange: (e) => t(e.target.value),
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: "field",
                  children: [
                    (0, s.jsx)("label", { children: "Email" }),
                    (0, s.jsx)("input", {
                      type: "email",
                      name: "email",
                      placeholder: "Email",
                      value: a,
                      onChange: (e) => n(e.target.value),
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: "field",
                  children: [
                    (0, s.jsx)("label", { children: "Phone Number" }),
                    (0, s.jsx)("input", {
                      type: "tel",
                      name: "phone",
                      placeholder: "Phone",
                      value: l,
                      onChange: (e) => o(e.target.value),
                    }),
                  ],
                }),
                (0, s.jsx)("button", {
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
    7861: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294);
      t.default = () => {
        let [e, t] = (0, r.useState)(""),
          [a, n] = (0, r.useState)(""),
          [l, o] = (0, r.useState)(""),
          c = async () => {
            try {
              let t = await fetch(
                  "http://gerberknights3.xyz/LAMPAPI/AccountLogin.php",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({ Login: e, Password: a }),
                  }
                ),
                s = await t.json();
              console.log("response", s),
                s.id > 0
                  ? localStorage.setItem("userID", s.id)
                  : o(s.error || "Invalid Username or Password");
            } catch (e) {
              console.error("Error adding contact:", e),
                o("Invalid Username or Password.");
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
                  e.preventDefault(), c();
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
                          t(e.target.value), o("");
                        },
                      }),
                      (0, s.jsx)("input", {
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                        required: !0,
                        value: a,
                        onChange: (e) => {
                          n(e.target.value), o("");
                        },
                      }),
                    ],
                  }),
                  l &&
                    (0, s.jsx)("p", { style: { color: "red" }, children: l }),
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
    4654: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893);
      a(7294),
        (t.default = () =>
          (0, s.jsx)("nav", {
            className: "navbar",
            children: (0, s.jsxs)("div", {
              className: "container",
              children: [
                (0, s.jsx)("div", { className: "logo" }),
                (0, s.jsx)("ul", {
                  children: (0, s.jsx)("li", {
                    children: (0, s.jsx)("p", {
                      href: "/",
                      children: "Sign Out",
                    }),
                  }),
                }),
              ],
            }),
          }));
    },
    8850: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294);
      t.default = () => {
        let [e, t] = (0, r.useState)(""),
          [a, n] = (0, r.useState)(""),
          [l, o] = (0, r.useState)(""),
          [c, i] = (0, r.useState)(""),
          d = async () => {
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
                    Login: l,
                    Password: c,
                  }),
                }
              );
              if (!t.ok) {
                let e = await t.json();
                throw Error(e.error || "HTTP error! status: ".concat(t.status));
              }
              let s = await t.json();
              console.log("Response:", s);
            } catch (e) {
              console.error("Error adding contact:", e);
            }
          };
        return (0, s.jsx)("div", {
          className: "main-body",
          children: (0, s.jsxs)("form", {
            onSubmit: (e) => {
              e.preventDefault(), d();
            },
            children: [
              (0, s.jsx)("h1", { children: "Register an Account" }),
              (0, s.jsxs)("div", {
                className: "input-box",
                children: [
                  (0, s.jsxs)("div", {
                    className: "name-box",
                    children: [
                      (0, s.jsx)("input", {
                        type: "text",
                        name: "FirstName",
                        placeholder: "Enter First Name",
                        required: !0,
                        value: e,
                        onChange: (e) => t(e.target.value),
                      }),
                      (0, s.jsx)("input", {
                        type: "text",
                        name: "LastName",
                        placeholder: "Enter Last Name",
                        required: !0,
                        value: a,
                        onChange: (e) => n(e.target.value),
                      }),
                    ],
                  }),
                  (0, s.jsx)("input", {
                    type: "text",
                    name: "Login",
                    placeholder: "Enter a Username",
                    required: !0,
                    value: l,
                    onChange: (e) => o(e.target.value),
                  }),
                  (0, s.jsx)("input", {
                    type: "password",
                    name: "password",
                    placeholder: "Enter a Password",
                    required: !0,
                    value: c,
                    onChange: (e) => i(e.target.value),
                  }),
                ],
              }),
              (0, s.jsx)("button", {
                type: "submit",
                className: "btn",
                children: "Register",
              }),
              (0, s.jsx)("div", {
                className: "create-account",
                children: (0, s.jsx)("p", {
                  children: "Already Have an Account?",
                }),
              }),
            ],
          }),
        });
      };
    },
    8954: function (e, t, a) {
      "use strict";
      a.r(t);
      var s = a(5893),
        r = a(7294);
      t.default = (e) => {
        let { setResults: t, setSearchValue: a } = e,
          [n, l] = (0, r.useState)(""),
          o = (e) => {
            "" === e
              ? t([])
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
                      ? (console.log("Error: ", e.error), t([]))
                      : e.results && e.results.length > 0
                      ? (t(e.results), console.log(e.results))
                      : (console.log("No valid data found"), t([]));
                  })
                  .catch((e) => {
                    console.error("Error Searching Data: ", e);
                  });
          },
          c = (e) => {
            l(e), a(e), o(e);
          };
        return (0, s.jsx)("div", {
          className: "input-wrapper",
          children: (0, s.jsx)("input", {
            className: "search-bar-box",
            placeholder: "Search for a Contact",
            value: n,
            onChange: (e) => c(e.target.value),
          }),
        });
      };
    },
  },
  function (e) {
    e.O(0, [888, 774, 179], function () {
      return e((e.s = 3201));
    }),
      (_N_E = e.O());
  },
]);
