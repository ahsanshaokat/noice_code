import userRoutes from './userRoutes';
import managerRoutes from './managerRoutes';

const routes = app => {
  userRoutes(app);
  managerRoutes(app);
};

export default routes;
