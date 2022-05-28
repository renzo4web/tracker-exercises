import {
  Container,
  Typography,
  Grid,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Stack,
} from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { Form, Outlet, useLoaderData, Link } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

export let loader: LoaderFunction = async ({ request, params }: any) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return { user };
};

const BTN_NAV_ROUTE = ["new", "list"];

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const { user } = useLoaderData();

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item lg={6} md={6} sm={12}>
          <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 5 }}>
            <Typography variant="h3" component="h1" textAlign="center">
              Hi {user.displayName}!
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container mt={3} justifyContent="center" spacing={2}>
        <Grid item xs={6} md={3} lg={3}>
          <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 5 }}>
            <Link to="new">
              <Typography textAlign="center">➕</Typography>
              <Typography textAlign="center">Add</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 5 }}>
            <Link to="list">
              <Typography textAlign="center">➕</Typography>
              <Typography textAlign="center">List</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container mt={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 5 }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>

      <p>This is a protected page</p>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
    </Container>
  );
}
