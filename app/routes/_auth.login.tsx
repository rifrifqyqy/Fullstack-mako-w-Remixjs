import { prisma } from "utils/db.server";
import { json, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { createSession } from "utils/session.server";

type ActionData = {
  error?: string;
  request?: string;
};
export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Cari user berdasarkan username
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return json({ error: "Username atau password salah" }, { status: 400 });
  }

  // Update `lastLogin`
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  // Buat sesi login
  return createSession(user.id, "/");
}

export default function Login() {
  const actionData = useActionData<ActionData>();

  return (
    <Form method="post">
      <div>
        <label>
          Username: <input type="text" name="username" required />
        </label>
      </div>
      <div>
        <label>
          Password: <input type="password" name="password" required />
        </label>
      </div>
      {actionData?.error && <p>{actionData.error}</p>}
      <button type="submit">Login</button>
    </Form>
  );
}
