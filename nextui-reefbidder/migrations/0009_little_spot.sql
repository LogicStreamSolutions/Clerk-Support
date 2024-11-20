CREATE TABLE IF NOT EXISTS "user_shipping_addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"address_label" varchar(50),
	"street_address" varchar(255) NOT NULL,
	"street_address_2" varchar(255),
	"city" varchar(100) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"country" varchar(100) DEFAULT 'United States',
	"phone_number" varchar(20),
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN "shipping_cost" numeric(10, 2);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_shipping_addresses" ADD CONSTRAINT "user_shipping_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
