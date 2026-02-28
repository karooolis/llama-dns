import { createDnsRecord, updateDnsRecord, deleteDnsRecord } from "../cloudflare";

const ZONE_ID = "test-zone-id";
const API_TOKEN = "test-api-token";
const DOMAIN = "llamadns.org";
const BASE = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`;

describe("cloudflare", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    process.env.CLOUDFLARE_API_TOKEN = API_TOKEN;
    process.env.CLOUDFLARE_ZONE_ID = ZONE_ID;
    process.env.DOMAIN = DOMAIN;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.CLOUDFLARE_API_TOKEN;
    delete process.env.CLOUDFLARE_ZONE_ID;
    delete process.env.DOMAIN;
  });

  describe("createDnsRecord", () => {
    it("sends correct request and returns record ID", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce(
        Response.json({ success: true, result: { id: "rec-123" } }),
      );

      const id = await createDnsRecord("myserver", "A", "1.2.3.4");

      expect(id).toBe("rec-123");
      expect(mockFetch).toHaveBeenCalledWith(BASE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "A",
          name: `myserver.${DOMAIN}`,
          content: "1.2.3.4",
          ttl: 60,
          proxied: false,
        }),
      });
    });

    it("throws on failure", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        Response.json({ success: false, errors: [{ message: "bad request" }] }),
      );

      await expect(createDnsRecord("sub", "A", "1.2.3.4")).rejects.toThrow(
        "Cloudflare create failed: bad request",
      );
    });
  });

  describe("updateDnsRecord", () => {
    it("sends PUT request on success", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce(Response.json({ success: true }));

      await updateDnsRecord("rec-456", "myserver", "A", "5.6.7.8");

      expect(mockFetch).toHaveBeenCalledWith(`${BASE}/rec-456`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "A",
          name: `myserver.${DOMAIN}`,
          content: "5.6.7.8",
          ttl: 60,
          proxied: false,
        }),
      });
    });

    it("throws on failure", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        Response.json({ success: false, errors: [{ message: "not found" }] }),
      );

      await expect(updateDnsRecord("rec-456", "sub", "A", "1.2.3.4")).rejects.toThrow(
        "Cloudflare update failed: not found",
      );
    });
  });

  describe("deleteDnsRecord", () => {
    it("sends DELETE request on success", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }));

      await deleteDnsRecord("rec-789");

      expect(mockFetch).toHaveBeenCalledWith(`${BASE}/rec-789`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
    });

    it("throws on failure", async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        new Response(null, { status: 500, statusText: "Internal Server Error" }),
      );

      await expect(deleteDnsRecord("rec-789")).rejects.toThrow(
        "Cloudflare delete failed: Internal Server Error",
      );
    });
  });
});
