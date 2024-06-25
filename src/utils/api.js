// MODULES
import axios from 'axios';

// CONFIG
import config from '../config';

export const axios_instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function profile_get(version = 1) {
  const url = config.url_server + '/v' + version + '/profile';

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    delete res.code;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function profile_edit(body, version = 1) {
  const url = config.url_server + '/v' + version + '/profile';

  try {
    const res = await axios_instance.put(url, body);
    res.code = undefined;
    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function signup(body, version = 1) {
  const url = config.url_server + '/v' + version + '/signup';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function signin(body, version = 1) {
  const url = config.url_server + '/v' + version + '/signin';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function email_verify(token, version = 1) {
  const url = config.url_server + '/v' + version + '/email-verify/' + token;

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function email_change(body, version = 1) {
  const url = config.url_server + '/v' + version + '/email-change';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function signout(version = 1) {
  const url = config.url_server + '/v' + version + '/signout';

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'object') {
      return { ...err.response.data, code: err.code };
    }

    return { message: err.response.data, code: err.code };
  }
}

export async function password_reset(body, token, version = 1) {
  const url = config.url_server + '/v' + version + '/password-reset/' + token;

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function password_change(body, version = 1) {
  const url = config.url_server + '/v' + version + '/password-change';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function email_send_password_reset_link(body, version = 1) {
  const url =
    config.url_server + '/v' + version + '/email-send-password-reset-link';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

export async function email_send_verification_link(body, version = 1) {
  const url =
    config.url_server + '/v' + version + '/email-send-verification-link';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (!err.response) {
      return { code: err.code };
    }

    if (typeof err.response.data === 'string') {
      return { message: err.response.data, code: err.code };
    }

    return { ...err.response.data, code: err.code };
  }
}

const exports = {
  axios_instance,
  profile_get,
  profile_edit,
  signup,
  signin,
  signout,
  email_verify,
  email_change,
  password_reset,
  password_change,
  email_send_password_reset_link,
  email_send_verification_link,
};

Object.freeze(exports);

export default exports;
