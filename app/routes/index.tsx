import { Container, Typography } from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export let loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
  return user;
};

export default function Index() {
  return (
    <Container>
      <Typography variant={"h2"}>Tracker</Typography>
      <p>
        <a href="/login">Please log in</a>
      </p>
    </Container>
  );
}
