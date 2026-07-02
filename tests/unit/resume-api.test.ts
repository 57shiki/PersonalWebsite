import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { env } from "cloudflare:workers";
import { GET } from "../../src/pages/api/resume";

// The mock env is a plain mutable object; the handler only touches
// env.RESUME_BUCKET.get, so we stub a minimal R2-bucket-shaped binding.
const mockEnv = env as unknown as Record<string, unknown>;

function callGET() {
  return GET({} as Parameters<typeof GET>[0]);
}

// The handler streams resume.pdf straight out of the R2 bucket, returning 404
// when the object is missing. These tests cover both branches and the headers.
describe("GET /api/resume (R2 stream)", () => {
  let mockGet: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGet = vi.fn();
    mockEnv.RESUME_BUCKET = { get: mockGet };
  });

  afterEach(() => {
    delete mockEnv.RESUME_BUCKET;
    vi.restoreAllMocks();
  });

  it("requests resume.pdf from the bucket", async () => {
    mockGet.mockResolvedValue({ body: "%PDF-1.4" });
    await callGET();
    expect(mockGet).toHaveBeenCalledWith("resume.pdf");
  });

  it("returns 200 with the object body and PDF headers when present", async () => {
    mockGet.mockResolvedValue({ body: "%PDF-1.4 fake" });
    const res = await callGET();

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toBe(
      'inline; filename="resume.pdf"',
    );
    expect(res.headers.get("Cache-Control")).toBe("public, max-age=3600");
    expect(await res.text()).toBe("%PDF-1.4 fake");
  });

  it("returns 404 when the object is missing", async () => {
    mockGet.mockResolvedValue(null);
    const res = await callGET();

    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Not Found");
  });
});
