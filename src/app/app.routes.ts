import {Routes} from '@angular/router';
import {InitTrackerList} from './feature/init-tracker/init-tracker-list/init-tracker-list';
import {Login} from './feature/user/login/login';
import {Register} from './feature/user/register/register';

export const routes: Routes = [
  {
    path: "",
    component: InitTrackerList,
    title: "Init Tracker"
  },
  {
    path: "login",
    component: Login,
    title: "Login"
  },
  {
    path: "register",
    component: Register,
    title: "Register"
  }
];
