import { TextField } from "@mui/material";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const exerciseType = formData.get("type");

  console.log("RERERERE", exerciseType);

  return redirect(`/exercises`);
};

export default function NewNotePage() {
  return (
    <Form method="post">
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
        name="type"
      />
      <TextField
        disabled
        id="outlined-disabled"
        label="Disabled"
        defaultValue="Hello World"
      />
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Save
      </button>
    </Form>
  );
}
