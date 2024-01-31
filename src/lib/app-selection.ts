export enum AppSelection {
  Admin = 'admin',
  Business = 'business',
  Consumer = 'consumer',
}

export function getCurrentApp(urlPath: string): AppSelection {
  const app =
    urlPath
      .replace(import.meta.env.VITE_ROOT_PATH, '')
      .split('/')
      .filter(Boolean)[0] || '';

  if (isValidApp(app)) {
    return app;
  } else {
    throw new Error(`Invalid app: ${app} in path: ${urlPath}`);
  }
}

export function isValidApp(app: string): app is AppSelection {
  return Object.values(AppSelection).includes(app as AppSelection);
}
