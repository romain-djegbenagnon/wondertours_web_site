import { describe, expect, test } from "bun:test";
import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  verifyUserPassword,
} from "@/lib/services/users";
import {
  uploadMedia,
  listMediaFiles,
  deleteMediaFile,
  MediaValidationError,
  ALLOWED_MIME_TYPES,
} from "@/lib/services/media";
import { uniquePrefix } from "./helpers";

describe("users", () => {
  test("CRUD : hash bcrypt, PublicUser sans passwordHash, vérification mot de passe", async () => {
    const email = `${uniquePrefix("user")}@wondertours.bj`;
    const password = "motdepasse123";

    let user = await createUser({
      email,
      password,
      firstName: "Prénom",
      lastName: "Test",
      role: "editor",
    });

    try {
      // Le service ne doit jamais renvoyer passwordHash
      expect("passwordHash" in user).toBe(false);

      // En base, le hash bcrypt est présent
      const raw = await getUserByEmail(email);
      expect(raw?.passwordHash).toMatch(/^\$2b\$/);

      // Vérification mot de passe
      const valid = await verifyUserPassword(email, password);
      expect(valid?.email).toBe(email);
      expect(await verifyUserPassword(email, "mauvais")).toBeNull();

      // PATCH rôle + prénom
      user = await updateUser(user.id, { role: "viewer", firstName: "Modifié" });
      expect(user.role).toBe("viewer");
      expect((await getUserById(user.id))?.firstName).toBe("Modifié");

      // Désactivation : verifyUserPassword refuse
      await updateUser(user.id, { isActive: false });
      expect(await verifyUserPassword(email, password)).toBeNull();
    } finally {
      await deleteUser(user.id);
    }
    expect(await getUserByEmail(email)).toBeNull();
  });

  test("email dupliqué → erreur Prisma unique", async () => {
    const email = `${uniquePrefix("dup")}@wondertours.bj`;
    const u1 = await createUser({
      email,
      password: "motdepasse123",
      firstName: "A",
      lastName: "B",
    });
    try {
      let conflict = false;
      try {
        await createUser({
          email,
          password: "motdepasse123",
          firstName: "C",
          lastName: "D",
        });
      } catch (error) {
        conflict = (error as { code?: string }).code === "P2002";
      }
      expect(conflict).toBe(true);
    } finally {
      await deleteUser(u1.id);
    }
  });
});

describe("media", () => {
  test("upload → liste → suppression (fichier + ligne)", async () => {
    const bytes = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // signature PNG
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR
    ]);
    const file = new File([bytes], "test-upload.png", { type: "image/png" });

    const media = await uploadMedia({
      file,
      altText: "Image de test",
    });
    expect(media.mimeType).toBe("image/png");

    try {
      expect(media.url).toMatch(/^\/uploads\/\d+-test-upload\.png$/);
      expect((await listMediaFiles({ q: "test-upload" })).total).toBe(1);

      // Fichier physique présent
      const fs = await import("node:fs/promises");
      await fs.access(media.storagePath);
    } finally {
      await deleteMediaFile(media.id);
    }

    // Fichier + ligne supprimés
    expect((await listMediaFiles({ q: "test-upload" })).total).toBe(0);
    const fs = await import("node:fs/promises");
    await expect(fs.access(media.storagePath)).rejects.toThrow();
  });

  test("rejette les types non image", async () => {
    const file = new File([new TextEncoder().encode("hello")], "doc.txt", {
      type: "text/plain",
    });
    let rejected = false;
    try {
      await uploadMedia({ file });
    } catch (error) {
      rejected = error instanceof MediaValidationError;
    }
    expect(rejected).toBe(true);
    expect(ALLOWED_MIME_TYPES).toContain("image/png");
  });

  test("rejette les fichiers vides", async () => {
    const file = new File([], "vide.png", { type: "image/png" });
    await expect(uploadMedia({ file })).rejects.toBeInstanceOf(MediaValidationError);
  });
});
