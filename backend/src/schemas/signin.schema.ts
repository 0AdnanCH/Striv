import { z } from "zod";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.constant";

export const signinSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  password: z.string().min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});