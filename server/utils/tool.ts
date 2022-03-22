export const isDev = () =>
  'KOA_IS_DEV' in process.env && process.env.KOA_IS_DEV === 'true';
