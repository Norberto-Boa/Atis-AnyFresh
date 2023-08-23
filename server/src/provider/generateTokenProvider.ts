import { sign } from "jsonwebtoken";

class generateToken{
  async handle(userId: string, name: string) {
    const key : string = process.env.JWT_KEY  ?? "";

    const token = sign({name}, key, {
      subject: userId,
      expiresIn: "1h"
    });

    return token;
  }
}

export { generateToken };