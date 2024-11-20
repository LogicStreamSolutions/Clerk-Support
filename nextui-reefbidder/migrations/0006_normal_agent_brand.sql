ALTER TABLE "sellers" ADD COLUMN "sales" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "purchases" integer DEFAULT 0 NOT NULL;