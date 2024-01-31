import { useLocation, useParams } from 'react-router-dom';

import { AppSelection, getCurrentApp } from '@/lib/app-selection.ts';

type UrlParams = Readonly<{
  app: AppSelection;
  [param: string]: string | undefined;
}>;

function useUrlParams(): UrlParams {
  const params = useParams();
  const location = useLocation();

  const app = getCurrentApp(location.pathname);

  return {
    ...params,
    app, // App is not necessarily in params, but it is always in the URL, so it can be injected here.
  };
}

export default useUrlParams;
