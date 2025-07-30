// Language fallback middleware for Mintlify
export default function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Language prefixes
  const languages = ['cn', 'jp', 'ko'];
  
  // Check if this is a language-specific path
  for (const lang of languages) {
    if (path.startsWith(`/${lang}/`)) {
      // For missing translated pages, we'll let the 404 page handle the fallback
      // This middleware can be extended to do server-side checks if needed
      return;
    }
  }
}