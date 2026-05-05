const isProduction = process.env.NODE_ENV === 'production';

function getCookieBaseOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  };
}

export function setAuthCookie(res, token) {
  res.cookie('mb_token', token, {
    ...getCookieBaseOptions(),
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie('mb_token', getCookieBaseOptions());
}

export function getAuthTokenFromRequest(req) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1];
  }

  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const tokenCookie = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith('mb_token='));

  if (!tokenCookie) {
    return null;
  }

  return decodeURIComponent(tokenCookie.slice('mb_token='.length));
}
