export enum AppSelection {
  Admin = 'admin',
  Business = 'business',
  Consumer = 'consumer',
}

export function getCurrentApp(urlPath: string): AppSelection {
  const app = urlPath.split('/').filter(Boolean)[0] || '';

  if (isValidApp(app)) {
    return app;
  } else {
    throw new Error(`Invalid app: ${app} in path: ${urlPath}`);
  }
}

export function isValidApp(app: string): app is AppSelection {
  return Object.values(AppSelection).includes(app as AppSelection);
}
