import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  
  const subdomain = hostname.includes("localhost")
    ? hostname.split(":")[0].split(".")[0] 
    : hostname.split(".")[0];

  // Check if there is an actual subdomain
  if (subdomain && subdomain !== "www" && subdomain !== "localhost" && subdomain !== (process.env.VERCEL_URL?.split(".")[0] || "")) {
    return NextResponse.rewrite(new URL(`/webshop/${subdomain}${request.nextUrl.pathname}`, request.url));
  }

  // Redirect direct access to /webshop/name to subdomain
  if (request.nextUrl.pathname.startsWith("/webshop/")) {
    const subdomainFromPath = request.nextUrl.pathname.split("/")[2];
    
    const redirectUrl = new URL(request.url);
    redirectUrl.hostname = process.env.VERCEL_URL ? `${subdomainFromPath}.${process.env.VERCEL_URL}` : `${subdomainFromPath}.localhost`;
    redirectUrl.pathname = request.nextUrl.pathname.replace(`/webshop/${subdomainFromPath}`, "");
    
    return NextResponse.redirect(redirectUrl);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
