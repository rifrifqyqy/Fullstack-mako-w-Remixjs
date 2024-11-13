import { prisma } from "utils/db.server";
import { json, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import bcrypt from "bcryptjs";

type ActionData = {
  error?: string;
};

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  // Validasi input
  if (!username || !password || !passwordConfirmation) {
    return json({ error: "Semua field harus diisi" }, { status: 400 });
  }
  if (password !== passwordConfirmation) {
    return json({ error: "Password tidak cocok" }, { status: 400 });
  }

  try {
    // Periksa apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return json(
        { error: "Username sudah ada, silakan gunakan username lain." },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "user",
      },
    });

    return redirect("/login");
  } catch (error: any) {
    console.error(error);
    return json(
      { error: "Terjadi kesalahan saat membuat akun." },
      { status: 500 },
    );
  }
}

export default function Signup() {
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
      <div>
        <label>
          Confirm Password:{" "}
          <input type="password" name="passwordConfirmation" required />
        </label>
      </div>
      {actionData?.error && <p>{actionData.error}</p>}
      <button type="submit">Sign Up</button>
    </Form>
  );
}
