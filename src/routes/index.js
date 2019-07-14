import { Router } from "express";

const router = new Router();

import loginRoutes from "./login"

const applyRoutes = ( router, routesConfig ) => {
  routesConfig.forEach(( routeConfig ) => {
    const {
      url,
      method,
      callback,
    } = routeConfig;

    router[method](url, callback)
  });

  return router
};

const routes = [
  ...loginRoutes,
];

const configuredRouter = applyRoutes(router, routes);

export default configuredRouter;
