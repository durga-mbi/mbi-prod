const namePattern = /^[A-Za-z\s]+$/;
const passwordUppercasePattern = /[A-Z]/;
const passwordSpecialPattern = /[@#$%&*]/;

export function validateAlphabeticName(value: string, fieldLabel: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${fieldLabel} is required.`;
  }

  if (!namePattern.test(trimmedValue)) {
    return `${fieldLabel} must contain only alphabets.`;
  }

  return null;
}

export function validatePasswordRules(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!passwordUppercasePattern.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  if (!passwordSpecialPattern.test(password)) {
    return "Password must include at least one special character (@, #, $, %, &, *).";
  }

  return null;
}