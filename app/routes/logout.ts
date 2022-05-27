import { authenticator } from "../services/auth.server";

export const action = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
};
