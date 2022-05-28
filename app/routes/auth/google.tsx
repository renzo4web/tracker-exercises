import { authenticator } from "../../services/auth.server";

export const action = async ({ request }) => {
  return await authenticator.authenticate("google", request, {
    successRedirect: "/exercises",
    failureRedirect: "/",
  });
};
