import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import List from '../pages/List';
import Details from '../pages/Details';

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<List />} />
          <Route path="detail/:id" element={<Details />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>Page not found!</p>
            </main>
          }
        />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
