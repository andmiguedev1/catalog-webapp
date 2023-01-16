export function getBrowserCookie(key: string) {
   const extractCookie = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
   return extractCookie ? extractCookie.pop() : ""
}