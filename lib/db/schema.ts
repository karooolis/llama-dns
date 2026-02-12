import { pgTable, text, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

// ── Auth.js tables ──────────────────────────────────────────────────────────

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

// ── Application tables ──────────────────────────────────────────────────────

export const domains = pgTable("domain", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ipv4: text("ipv4"),
  ipv6: text("ipv6"),
  cloudflareRecordIdA: text("cloudflareRecordIdA"),
  cloudflareRecordIdAAAA: text("cloudflareRecordIdAAAA"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const apiTokens = pgTable("apiToken", {
  token: text("token")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});
