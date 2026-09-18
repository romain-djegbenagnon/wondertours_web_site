import { NextResponse } from "next/server";
import { z } from "zod";
import { handleRoute, parseBody } from "@/lib/api/utils";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { markUserLoggedIn, verifyUserPassword } from "@/lib/services/users";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(100),
});

export async function POST(request: Request) {
  return handleRoute(async () => {
    const [body, errorResponse] = await parseBody(request, loginSchema);
    if (errorResponse) return errorResponse;

    const user = await verifyUserPassword(body.email, body.password);
    if (!user) {
      // Message générique : ne pas révéler si l'email existe.
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`.trim(),
    });
    await markUserLoggedIn(user.id);

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}`.trim(), role: user.role },
    });
    setSessionCookie(response.headers, token);
    return response;
  });
}
