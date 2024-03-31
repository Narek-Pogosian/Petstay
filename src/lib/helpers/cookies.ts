export function getCookie(cookieName: string) {
  if (typeof window === "undefined") return null;

  const name = cookieName + "=";
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    var c = cookieArray[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return null;
}

export function deleteCookie(cookieName: string) {
  // Set the expiration date to a time in the past
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
