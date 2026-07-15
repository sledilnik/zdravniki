/**
 * Runtime configuration.
 *
 * In the container these values are injected by `/env.js` (rendered by Caddy
 * from the pod's environment variables — see the Caddyfile and deploy/chart),
 * so one image can be promoted stage -> prod without a rebuild. During local
 * development and tests `window._env_` is absent and we fall back to the
 * build-time `process.env.REACT_APP_*` values from the `.env*` files.
 *
 * Note: build-time-constant vars (REACT_APP_TITLE / _DESC / _URL /
 * _DEFAULT_LANGUAGE) are the same in every environment and stay baked in via
 * CRA's `%VAR%` / `process.env` substitution — they are intentionally not
 * part of this runtime config.
 */
const runtime =
  typeof window !== 'undefined' && window._env_ ? window._env_ : null;

const read = key => {
  const v = runtime ? runtime[key] : undefined;
  // Fall back to the build-time value when there is no runtime override, or
  // when the placeholder is still unrendered (e.g. `yarn start` serves
  // public/env.js verbatim, without Caddy templating). An intentional empty
  // string from the container (staging) is kept as-is.
  if (v === undefined || (typeof v === 'string' && v.startsWith('{{'))) {
    return process.env[key];
  }
  return v;
};

const env = {
  mode: read('REACT_APP_MODE'),
  contentEndpointBase: read('REACT_APP_CONTENT_ENDPOINT_BASE'),
  googleFormId: read('REACT_APP_GOOGLE_FORM_ID'),
  googleFormInputs: {
    name: read('REACT_APP_GOOGLE_FORM_INPUT_NAME'),
    url: read('REACT_APP_GOOGLE_FORM_INPUT_URL'),
    type: read('REACT_APP_GOOGLE_FORM_INPUT_TYPE'),
    instId: read('REACT_APP_GOOGLE_FORM_INPUT_INSTID'),
    provider: read('REACT_APP_GOOGLE_FORM_INPUT_PROVIDER'),
    address: read('REACT_APP_GOOGLE_FORM_INPUT_ADDRESS'),
    accepts: read('REACT_APP_GOOGLE_FORM_INPUT_ACCEPTS'),
    availability: read('REACT_APP_GOOGLE_FORM_INPUT_AVAILABILITY'),
    website: read('REACT_APP_GOOGLE_FORM_INPUT_WEBSITE'),
    phone: read('REACT_APP_GOOGLE_FORM_INPUT_PHONE'),
    email: read('REACT_APP_GOOGLE_FORM_INPUT_EMAIL'),
    orderform: read('REACT_APP_GOOGLE_FORM_INPUT_ORDERFORM'),
    note: read('REACT_APP_GOOGLE_FORM_INPUT_NOTE'),
  },
};

export default env;
