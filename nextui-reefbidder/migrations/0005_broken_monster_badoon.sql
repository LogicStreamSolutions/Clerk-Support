ALTER TABLE "sellers" ADD COLUMN "average_review_score" numeric(3, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "average_review_score" numeric(3, 2) DEFAULT '0';