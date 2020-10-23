import { UserController } from "./controller/UserController";
import { DayController } from "./controller/DayController";
import { FacultyController } from "./controller/FacultyController";
import { MinorController } from './controller/MinorController';

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
},  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
    },

    {
    method: "get",
    route: "/days",
    controller: DayController,
    action: "all"
}, {
    method: "get",
    route: "/days/:id",
    controller: DayController,
    action: "one"
}, {
    method: "post",
    route: "/days",
    controller: DayController,
    action: "save"
}, {
    method: "delete",
    route: "/days/:id",
    controller: DayController,
    action: "remove"
    },

    {
    method: "get",
    route: "/faculties",
    controller: FacultyController,
    action: "all"
}, {
    method: "get",
    route: "/faculties/:id",
    controller: FacultyController,
    action: "one"
}, {
    method: "post",
    route: "/faculties",
    controller: FacultyController,
    action: "save"
}, {
    method: "delete",
    route: "/faculties/:id",
    controller: FacultyController,
    action: "remove"
    },

     {
    method: "get",
    route: "/minors",
    controller: MinorController,
    action: "all"
}, {
    method: "get",
    route: "/minors/:id",
    controller: MinorController,
    action: "one"
}, {
    method: "post",
    route: "/minors",
    controller: MinorController,
    action: "save"
}, {
    method: "delete",
    route: "/minors/:id",
    controller: MinorController,
    action: "remove"
    },





];
