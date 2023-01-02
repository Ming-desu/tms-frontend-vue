import LoginView from "../views/auth/LoginView.vue";
import ForgotPasswordView from "../views/forgotPassword/ForgotPasswordView.vue";
import ResetPasswordView from "../views/forgotPassword/ResetPasswordView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPasswordView,
  },
  {
    path: "/reset-password/:uuid",
    name: "ResetPassword",
    component: ResetPasswordView,
  },
];

export default routes;
