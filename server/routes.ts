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
    route: "/faculty",
    controller: FacultyController,
    action: "all"
}, {
    method: "get",
    route: "/faculty/:id",
    controller: FacultyController,
    action: "one"
}, {
    method: "post",
    route: "/faculty",
    controller: FacultyController,
    action: "save"
}, {
    method: "delete",
    route: "/faculty/:id",
    controller: FacultyController,
    action: "remove"
    },

     {
    method: "get",
    route: "/minor",
    controller: MinorController,
    action: "all"
}, {
    method: "get",
    route: "/minor/:id",
    controller: MinorController,
    action: "one"
}, {
    method: "post",
    route: "/minor",
    controller: MinorController,
    action: "save"
}, {
    method: "delete",
    route: "/minor/:id",
    controller: MinorController,
    action: "remove"
    },





];
