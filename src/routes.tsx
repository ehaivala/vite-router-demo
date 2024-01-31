import { FunctionComponent, ReactNode } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import NotFound from '@/404.tsx';
import App from '@/App.tsx';
import { isValidApp } from '@/lib/app-selection.ts';

const ROOT_PATH = import.meta.env.VITE_ROOT_PATH;

type FSRoutes = Record<string, { default: FunctionComponent }>;

const PAGE_ROUTES: FSRoutes = import.meta.glob('/src/pages/**/[a-z[]*.tsx', { eager: true });
const pageRoutes = Object.keys(PAGE_ROUTES).map((page) => {
  // Format filepath to react-router compatible dynamic route path
  // Example: /src/pages/[app]/product/[productId].tsx -> /:app/product/:productId
  const path = page
    .replace(/\/src\/pages|index.tsx|]|\.tsx$/g, '')
    .replace(/\[/g, ':')
    .replace(/\/$/, '');

  return { path, component: PAGE_ROUTES[page]!.default };
});

function AppBoundary({ render }: { render: () => ReactNode }) {
  const { pathname } = useLocation();

  const app = pathname.replace(ROOT_PATH, '').split('/').filter(Boolean)[0] || '';
  const validApp = isValidApp(app);

  if (validApp) {
    return render();
  } else if (app === '') {
    return <Navigate to={import.meta.env.VITE_DEFAULT_APP} />;
  } else {
    // If app is invalid, render 404 component that catches unhandled dynamic routes
    return <NotFound />;
  }
}

export function AppRoutes() {
  console.log(pageRoutes);

  return (
    <Routes>
      <Route element={<App />}>
        <Route path={ROOT_PATH} element={<AppBoundary render={() => <Outlet />} />}>
          {pageRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={`${ROOT_PATH}${path}`} element={<AppBoundary render={() => <Component />} />} />
          ))}
          <Route key="not-found" path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
