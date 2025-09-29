export function validateEmail(email: string): string {
  const emailRegexp = new RegExp('^[\\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

  if(email === '')
    return '';

  if(!emailRegexp.test(email))
    return 'Not a valid email address';
  return '';
}
