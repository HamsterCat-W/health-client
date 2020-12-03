import Vue from "vue";
import VueRouter from "vue-router";

//admin

const AdminRouter = () => import("@/components/admin/admin/AdminRouter");

const CustomerRouter = () =>
  import("@/components/admin/customer/CustomerRouter");

//healthResource

const EnergyAnalyse = () =>
  import("@/components/healthResource/energyAnalyse/EnergyAnalyse");

const FoodRecommend = () =>
  import("@/components/healthResource/foodRecommend/FoodRecommend");

const MyCondition = () =>
  import("@/components/healthResource/myCondition/MyCondition");

const MyDiary = () => import("@/components/healthResource/myDiary/MyDiary");

//login

const Login = () => import("@/components/login/login/Login");
const Register = () => import("@/components/login/register/Register");

//userManage

const NormalUser = () =>
  import("@/components/userManage/normalUser/NormalUser");

const SuperUser = () => import("@/components/userManage/superUser/SuperUser");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminRouter,
    redirect: "/admin/superUser",
    children: [
      {
        path: "normalUser",
        name: "admin_normalUser",
        component: NormalUser,
      },
      {
        path: "superUser",
        name: "admin_superUser",
        component: SuperUser,
      },
      {
        path: "energyAnalyse",
        name: "admin_energy_analyse",
        component: EnergyAnalyse,
      },
      {
        path: "foodRecommend",
        name: "admin_food_recommend",
        component: FoodRecommend,
      },
      {
        path: "myCondition",
        name: "admin_health_state",
        component: MyCondition,
      },
      {
        path: "myDiary",
        name: "admin_health_diary",
        component: MyDiary,
      },
    ],
  },
  {
    path: "/customer",
    name: "customer",
    component: CustomerRouter,
    redirect: "/customer/myCondition",
    children: [
      {
        path: "energyAnalyse",
        name: "customer_energy_analyse",
        component: EnergyAnalyse,
      },
      {
        path: "foodRecommend",
        name: "customer_food_recommend",
        component: FoodRecommend,
      },
      {
        path: "myCondition",
        name: "customer_health_state",
        component: MyCondition,
      },
      {
        path: "myDiary",
        name: "customer_health_diary",
        component: MyDiary,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
