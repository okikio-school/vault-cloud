ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId";--> statement-breakpoint
ALTER TABLE "follows" DROP CONSTRAINT "follows_follower_id_entity_id_type";--> statement-breakpoint
ALTER TABLE "postassets" DROP CONSTRAINT "postassets_post_id_assetid";--> statement-breakpoint
ALTER TABLE "postreads" DROP CONSTRAINT "postreads_post_id_post_version_user_id";--> statement-breakpoint
ALTER TABLE "rolepermissions" DROP CONSTRAINT "rolepermissions_permission_id_role_id";--> statement-breakpoint
ALTER TABLE "tagstoposts" DROP CONSTRAINT "tagstoposts_tag_id_post_id";--> statement-breakpoint
ALTER TABLE "userroles" DROP CONSTRAINT "userroles_user_id_role_id";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_identifier_token";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_entity_id_type_pk" PRIMARY KEY("follower_id","entity_id","type");--> statement-breakpoint
ALTER TABLE "postassets" ADD CONSTRAINT "postassets_post_id_assetid_pk" PRIMARY KEY("post_id","assetid");--> statement-breakpoint
ALTER TABLE "postreads" ADD CONSTRAINT "postreads_post_id_post_version_user_id_pk" PRIMARY KEY("post_id","post_version","user_id");--> statement-breakpoint
ALTER TABLE "rolepermissions" ADD CONSTRAINT "rolepermissions_permission_id_role_id_pk" PRIMARY KEY("permission_id","role_id");--> statement-breakpoint
ALTER TABLE "tagstoposts" ADD CONSTRAINT "tagstoposts_tag_id_post_id_pk" PRIMARY KEY("tag_id","post_id");--> statement-breakpoint
ALTER TABLE "userroles" ADD CONSTRAINT "userroles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "license" text NOT NULL;