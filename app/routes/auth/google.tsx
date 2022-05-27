import { authenticator } from "../../services/auth.server";

export const action = async ({ request }) => {
  console.log("REQUEST", request);
  return await authenticator.authenticate("google", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  });
};
