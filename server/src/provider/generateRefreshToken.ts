import { client } from "../prisma/client";
import { getUnixTime, addSeconds } from "date-fns";



class generateRefreshToken{
  async handle(userId: string) {
    const expiresIn = getUnixTime(addSeconds(new Date(), 15));
    
    await client.refreshToken.deleteMany({
      where: {
        userId
      }
    });

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    });

    return generateRefreshToken;
  }
}

export { generateRefreshToken };