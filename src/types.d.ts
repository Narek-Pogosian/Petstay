import * as jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  interface UserJwtPayload extends jwt.JwtPayload, TokenUser {}
}

interface TokenUser {
  userId: string;
  name: string;
  email: string;
}
