import {
  Grid,
  InputLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import UnstyledButtonsSimple from "../../../components/CustomButton";
import { firestore } from "../../server/firebase/firebase-admin.server";
import { authenticator } from "../../services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const currentUser = await authenticator.isAuthenticated(request);
  const formData = await request.formData();
  const exerciseType = formData.get("type");
  const duration = formData.get("duration");
  const age = formData.get("age");

  console.log("age", age);

  try {
    await firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("exercises")
      .add({
        type: exerciseType,
        duration,
      });
  } catch (e) {
    console.info(e);
  }

  return redirect(`/`);
};

export default function NewExerciseRoute() {
  return (
    <Form method="post">
      <Grid container spacing={2} alignItems="center" direction="column">
        <Grid item>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select value={"🏃"} label="Type" name="type">
            <MenuItem value="🏃">🏃</MenuItem>
            <MenuItem value="🏋️">🏋️</MenuItem>
            <MenuItem value="🧘">🧘</MenuItem>
            <MenuItem value="🤸">🤸</MenuItem>
            <MenuItem value="🚵">🚵</MenuItem>
            <MenuItem value="🚴">🚴</MenuItem>
          </Select>

          <TextField
            required
            id="outlined-required"
            label="Duration in Min"
            name="duration"
            type="number"
          />
        </Grid>

        <Grid item lg={12}>
          <UnstyledButtonsSimple type="submit">Save</UnstyledButtonsSimple>
        </Grid>
      </Grid>
    </Form>
  );
}
