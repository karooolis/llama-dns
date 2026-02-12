const API_BASE = "https://api.cloudflare.com/client/v4";

function headers() {
  return {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

function zoneUrl() {
  return `${API_BASE}/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`;
}

interface CfResult {
  success: boolean;
  result?: { id: string };
  errors?: { message: string }[];
}

export async function createDnsRecord(
  subdomain: string,
  type: "A" | "AAAA",
  content: string
): Promise<string> {
  const res = await fetch(zoneUrl(), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      type,
      name: `${subdomain}.${process.env.DOMAIN}`,
      content,
      ttl: 60,
      proxied: false,
    }),
  });
  const data: CfResult = await res.json();
  if (!data.success || !data.result) {
    throw new Error(
      `Cloudflare create failed: ${data.errors?.[0]?.message ?? res.statusText}`
    );
  }
  return data.result.id;
}

export async function updateDnsRecord(
  recordId: string,
  subdomain: string,
  type: "A" | "AAAA",
  content: string
): Promise<void> {
  const res = await fetch(`${zoneUrl()}/${recordId}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      type,
      name: `${subdomain}.${process.env.DOMAIN}`,
      content,
      ttl: 60,
      proxied: false,
    }),
  });
  const data: CfResult = await res.json();
  if (!data.success) {
    throw new Error(
      `Cloudflare update failed: ${data.errors?.[0]?.message ?? res.statusText}`
    );
  }
}

export async function deleteDnsRecord(recordId: string): Promise<void> {
  const res = await fetch(`${zoneUrl()}/${recordId}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error(`Cloudflare delete failed: ${res.statusText}`);
  }
}
