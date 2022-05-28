import { Container, Typography, Grid, Box } from "@mui/material";
import type { LoaderFunction } from "@remix-run/node";
import { Form, Outlet, useLoaderData, Link } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

export let loader: LoaderFunction = async ({ request, params }: any) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return { user };
};

export default function Dashboard() {
  const { user } = useLoaderData();

  return (
    <Container maxWidth="sm">
      <Grid container mt={3} alignItems="center" justifyContent="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ border: "1px dashed grey", borderRadius: 5 }}>
            <Typography variant="h3" component="h1" textAlign="center">
              Hi {user.displayName}!
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container mt={3} justifyContent="center" spacing={2}>
        <Grid item xs={6} md={6} lg={6}>
          <Box sx={{ border: "1px dashed grey", borderRadius: 5 }}>
            <Link to="new">
              <Typography textAlign="center">➕</Typography>
              <Typography textAlign="center">Add</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              backgroundColor: "#000",
              p: 0,
              border: "1px dashed grey",
              borderRadius: 5,
            }}
          >
            <Link to="list">
              <Typography sx={{ color: "#fff" }} textAlign="center">
                ➕
              </Typography>
              <Typography sx={{ color: "#fff" }} textAlign="center">
                List
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container direction="column" spacing={2} mt={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 5 }}>
            <Outlet />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 5 }}>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
