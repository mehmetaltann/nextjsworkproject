import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {});

export const config = {
  matcher: [
    "/",
    "/isletmeler",
    "/odemeler",
    "/projeler",
    "/parametreler",
    "/register",
  ],
};
