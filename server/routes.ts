import { UserController } from "./controller/UserController";
import { DayController } from "./controller/DayController";

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
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
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





];
