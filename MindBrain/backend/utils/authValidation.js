const namePattern = /^[A-Za-z]+$/;
const passwordUppercasePattern = /[A-Z]/;
const passwordSpecialPattern = /[@#$%&*]/;

export const isValidFullName = (name) => {
  const trimmedName = name?.trim();
  if (!trimmedName) return false;

  const nameParts = trimmedName.split(/\s+/);
  return nameParts.every((part) => namePattern.test(part));
};

export const getPasswordValidationError = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (!passwordUppercasePattern.test(password)) {
    return 'Password must include at least one uppercase letter';
  }

  if (!passwordSpecialPattern.test(password)) {
    return 'Password must include at least one special character (@, #, $, %, &, *)';
  }

  return null;
};
