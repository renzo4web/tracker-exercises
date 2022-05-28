import { authenticator } from "../../services/auth.server";

export const loader = ({ request }) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/exercises",
    failureRedirect: "/",
  });
};
