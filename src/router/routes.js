const routes = [
  {
    path: "/postauth",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", name: "/login", component: () => import("pages/Login.vue") },
      { path: "register", component: () => import("pages/Register.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/SplashLayout.vue"),
    children: [{ path: "", component: () => import("pages/SpashScreen.vue") }],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AdminPage.vue") },
      { path: "users", component: () => import("pages/AdminUsers.vue") },
      { path: "users/add", component: () => import("pages/AdminAddUser.vue") },
      { path: "users/:id", component: () => import("pages/AdminShowUser.vue") },

      { path: "cursos", component: () => import("pages/AdminCurso.vue") },
      {
        path: "cursos/add",
        component: () => import("pages/AdminAddCurso.vue"),
      },
      {
        path: "cursos/:id",
        component: () => import("pages/AdminShowCurso.vue"),
      },

      {
        path: "matricula",
        component: () => import("pages/AdminMatricula.vue"),
      },
      {
        path: "matricula/add",
        component: () => import("pages/AdminAddMatricula.vue"),
      },
      {
        path: "matricula/:id",
        component: () => import("pages/AdminShowMatricula.vue"),
      },

      {
        path: "profesor",
        component: () => import("pages/AdminProfesorCurso.vue"),
      },
    ],
  },
  {
    path: "/curso",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Curso.vue") },
      { path: ":id", component: () => import("pages/ShowCurso.vue") },
      { path: ":id/add", component: () => import("pages/AddMaterial.vue") },
      { path: ":id/material/:idmaterial", component: () => import("pages/EditMaterial.vue") },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

