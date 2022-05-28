import { Avatar, Box, Grid, Typography } from "@mui/material";
import { deepOrange, indigo } from "@mui/material/colors";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { firestore } from "../../server/firebase/firebase-admin.server";
import { authenticator } from "../../services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const currentUser = await authenticator.isAuthenticated(request);

  let list;

  try {
    const snapshot = await firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("exercises")
      .get();

    list = snapshot.docs.map((doc) => doc.data());

    return list;
  } catch (e) {
    console.info(e);
  } finally {
    return list ?? [];
  }
};

export default function ListRoute() {
  const data = useLoaderData();

  return (
    <>
      {!!data?.length &&
        data.map(({ type, duration }, i) => (
          <Grid
            container
            sx={{ width: "100%", m: 2 }}
            spacing={2}
            key={`${type}-${duration}-${i}`}
            alignItems="center"
          >
            <Grid lg={2} sm={2} item>
              <Avatar
                sx={{
                  bgcolor: indigo[50],
                  fontSize: 25,
                }}
              >
                🚴
              </Avatar>
            </Grid>
            <Grid lg={6} xs={6} item>
              <Typography textAlign="center">{duration ?? 0} min</Typography>
            </Grid>

            <Grid lg={3} xs={3} item>
              <Typography textAlign="center">2/2/2022</Typography>
            </Grid>
          </Grid>
        ))}
    </>
  );
}
