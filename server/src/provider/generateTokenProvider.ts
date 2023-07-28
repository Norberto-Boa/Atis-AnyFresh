import { sign } from "jsonwebtoken";
import { client } from "../prisma/client";
import { generateRefreshToken } from "./generateRefreshToken";


class generateToken{
  async handle(userId: string, name: string){
    const token = sign({name}, "Mena", {
      subject: userId,
      expiresIn: "1h"
    });

    return token;
  }
}

export { generateToken };