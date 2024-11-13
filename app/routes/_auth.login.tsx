import { prisma } from "utils/db.server";
import { json } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { createSession } from "utils/session.server";
import { useEffect, useState } from "react";

type ActionData = {
  error?: string;
  request?: string;
  state: boolean;
  success?: boolean;
};
export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    console.log("Processing login for user:", username);

    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({ where: { username } });
    console.log("User found:", user);

    if (!user) {
      console.error("User not found");
      return json({ error: "Username atau password salah" }, { status: 400 });
    }

    // Periksa kecocokan password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.error("Password tidak cocok");
      return json({ error: "Username atau password salah" }, { status: 400 });
    }

    // Update lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Buat sesi login
    return createSession(user.id, "/");
  } catch (error) {
    console.error("Error during login:", error);
    return json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}

export default function Login() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  navigation.formData;
  navigation.formMethod;
  navigation.formAction;
  const isSubmitting = navigation.state === "submitting";
  const loadingSubmitting = navigation.state === "loading";

  // modal logic
  useEffect(() => {
    if (actionData?.success) {
      setShowModal(true);
    }
  }, [actionData]);
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
      <button type="submit"> {isSubmitting ? "Logging in..." : "Login"}</button>
      {/* Modal login sukses */}
    </Form>
  );
}
