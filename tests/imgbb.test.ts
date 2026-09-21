import { afterEach, describe, expect, test } from "bun:test";
import {
  uploadToImgbb,
  isImgbbConfigured,
  ImgbbUploadError,
} from "@/lib/services/imgbb";

// fetch global mocké : aucun appel réseau pendant les tests.
const realFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = realFetch;
  delete process.env.IMGBB_API_KEY;
});

describe("imgbb", () => {
  test("isImgbbConfigured suit IMGBB_API_KEY (lecture paresseuse)", () => {
    delete process.env.IMGBB_API_KEY;
    expect(isImgbbConfigured()).toBe(false);
    process.env.IMGBB_API_KEY = "cle-test";
    expect(isImgbbConfigured()).toBe(true);
  });

  test("upload : POST multipart avec clé + image, parse url et delete_url", async () => {
    process.env.IMGBB_API_KEY = "cle-test";

    let capturedUrl: string | null = null;
    let capturedForm: FormData | null = null;
    globalThis.fetch = (async (input, init) => {
      capturedUrl = String(input);
      capturedForm = init?.body as FormData;
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            display_url: "https://i.ibb.co/abc/photo.png",
            image: { url: "https://i.ibb.co/abc/photo.png" },
            delete_url: "https://ibb.co/delete-abc",
          },
        }),
        { status: 200 }
      );
    }) as typeof fetch;

    const file = new File([new Uint8Array([0x89, 0x50])], "photo.png", {
      type: "image/png",
    });
    const result = await uploadToImgbb(file);

    expect(capturedUrl).toBe("https://api.imgbb.com/1/upload");
    expect(capturedForm!.get("key")).toBe("cle-test");
    expect((capturedForm!.get("image") as File).name).toBe("photo.png");
    expect(result.url).toBe("https://i.ibb.co/abc/photo.png");
    expect(result.deleteUrl).toBe("https://ibb.co/delete-abc");
  });

  test("erreur imgBB (HTTP 400) → ImgbbUploadError avec le message", async () => {
    process.env.IMGBB_API_KEY = "cle-invalide";
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({
          success: false,
          status_code: 400,
          error: { message: "Invalid API key", code: 100 },
        }),
        { status: 400 }
      )) as typeof fetch;

    const file = new File([new Uint8Array([1])], "x.png", {
      type: "image/png",
    });
    let rejected: unknown = null;
    try {
      await uploadToImgbb(file);
    } catch (error) {
      rejected = error;
    }
    expect(rejected).toBeInstanceOf(ImgbbUploadError);
    expect((rejected as Error).message).toContain("Invalid API key");
  });

  test("sans IMGBB_API_KEY → ImgbbUploadError", async () => {
    delete process.env.IMGBB_API_KEY;
    const file = new File([new Uint8Array([1])], "x.png", {
      type: "image/png",
    });
    await expect(uploadToImgbb(file)).rejects.toBeInstanceOf(ImgbbUploadError);
  });
});
