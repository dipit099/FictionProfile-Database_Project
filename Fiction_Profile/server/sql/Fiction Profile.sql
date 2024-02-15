/*
 Navicat Premium Data Transfer

 Source Server         : Fiction Profile Mod
 Source Server Type    : PostgreSQL
 Source Server Version : 150001 (150001)
 Source Host           : aws-0-ap-south-1.pooler.supabase.com:6543
 Source Catalog        : postgres
 Source Schema         : Fiction Profile

 Target Server Type    : PostgreSQL
 Target Server Version : 150001 (150001)
 File Encoding         : 65001

 Date: 15/02/2024 04:50:33
*/


-- ----------------------------
-- Sequence structure for BOOK_book_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."BOOK_book_id_seq";
CREATE SEQUENCE "Fiction Profile"."BOOK_book_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."BOOK_book_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for COMMENT_VOTE_vote_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."COMMENT_VOTE_vote_id_seq";
CREATE SEQUENCE "Fiction Profile"."COMMENT_VOTE_vote_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."COMMENT_VOTE_vote_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for COMMENT_comment_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."COMMENT_comment_id_seq";
CREATE SEQUENCE "Fiction Profile"."COMMENT_comment_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."COMMENT_comment_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for FAVORITE_favorite_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."FAVORITE_favorite_id_seq";
CREATE SEQUENCE "Fiction Profile"."FAVORITE_favorite_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."FAVORITE_favorite_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for FOLLOW_follow_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."FOLLOW_follow_id_seq";
CREATE SEQUENCE "Fiction Profile"."FOLLOW_follow_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."FOLLOW_follow_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for MANGA_GENRE_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."MANGA_GENRE_id_seq";
CREATE SEQUENCE "Fiction Profile"."MANGA_GENRE_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."MANGA_GENRE_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for MEDIA_STATUS_OPTIONS_status_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."MEDIA_STATUS_OPTIONS_status_id_seq";
CREATE SEQUENCE "Fiction Profile"."MEDIA_STATUS_OPTIONS_status_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."MEDIA_STATUS_OPTIONS_status_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for MEDIA_media_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."MEDIA_media_id_seq";
CREATE SEQUENCE "Fiction Profile"."MEDIA_media_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."MEDIA_media_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for PEOPLE_people_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."PEOPLE_people_id_seq";
CREATE SEQUENCE "Fiction Profile"."PEOPLE_people_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."PEOPLE_people_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for POST_VOTE_vote_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."POST_VOTE_vote_id_seq";
CREATE SEQUENCE "Fiction Profile"."POST_VOTE_vote_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."POST_VOTE_vote_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for POST_post_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."POST_post_id_seq";
CREATE SEQUENCE "Fiction Profile"."POST_post_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."POST_post_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for REPORT_CONTENT_content_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."REPORT_CONTENT_content_id_seq";
CREATE SEQUENCE "Fiction Profile"."REPORT_CONTENT_content_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."REPORT_CONTENT_content_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for REPORT_report_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."REPORT_report_id_seq";
CREATE SEQUENCE "Fiction Profile"."REPORT_report_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."REPORT_report_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for REVIEW_VOTE_vote_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."REVIEW_VOTE_vote_id_seq";
CREATE SEQUENCE "Fiction Profile"."REVIEW_VOTE_vote_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."REVIEW_VOTE_vote_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for TV_GENRE_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."TV_GENRE_id_seq";
CREATE SEQUENCE "Fiction Profile"."TV_GENRE_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."TV_GENRE_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for USER_MEDIA_LIST_user_media_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."USER_MEDIA_LIST_user_media_id_seq";
CREATE SEQUENCE "Fiction Profile"."USER_MEDIA_LIST_user_media_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."USER_MEDIA_LIST_user_media_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for USER_REVIEW_review_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "Fiction Profile"."USER_REVIEW_review_id_seq";
CREATE SEQUENCE "Fiction Profile"."USER_REVIEW_review_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "Fiction Profile"."USER_REVIEW_review_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for BOOK
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."BOOK";
CREATE TABLE "Fiction Profile"."BOOK" (
  "isbn" varchar(255) COLLATE "pg_catalog"."default",
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "author" varchar(255) COLLATE "pg_catalog"."default",
  "publish_year" varchar(255) COLLATE "pg_catalog"."default",
  "publisher" varchar(255) COLLATE "pg_catalog"."default",
  "img_s" varchar(255) COLLATE "pg_catalog"."default",
  "img_m" varchar(255) COLLATE "pg_catalog"."default",
  "poster_path" varchar(255) COLLATE "pg_catalog"."default",
  "id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."BOOK_book_id_seq"'::regclass)
)
;
ALTER TABLE "Fiction Profile"."BOOK" OWNER TO "postgres";

-- ----------------------------
-- Table structure for COMMENT
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."COMMENT";
CREATE TABLE "Fiction Profile"."COMMENT" (
  "comment_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."COMMENT_comment_id_seq"'::regclass),
  "user_id" int4,
  "post_id" int4,
  "parent_comment_id" int4,
  "content" text COLLATE "pg_catalog"."default",
  "last_change_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "Fiction Profile"."COMMENT" OWNER TO "postgres";

-- ----------------------------
-- Table structure for COMMENT_VOTE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."COMMENT_VOTE";
CREATE TABLE "Fiction Profile"."COMMENT_VOTE" (
  "vote_id" int4 NOT NULL DEFAULT nextval('"COMMENT_VOTE_vote_id_seq"'::regclass),
  "user_id" int8,
  "comment_id" int8,
  "vote_value" int4,
  "last_change" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "Fiction Profile"."COMMENT_VOTE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for FAVORITE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."FAVORITE";
CREATE TABLE "Fiction Profile"."FAVORITE" (
  "favorite_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."FAVORITE_favorite_id_seq"'::regclass),
  "user_id" int4,
  "media_id" int4
)
;
ALTER TABLE "Fiction Profile"."FAVORITE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for FOLLOW
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."FOLLOW";
CREATE TABLE "Fiction Profile"."FOLLOW" (
  "follow_id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."FOLLOW_follow_id_seq"'::regclass),
  "follower_id" int8,
  "following_id" int8
)
;
ALTER TABLE "Fiction Profile"."FOLLOW" OWNER TO "postgres";

-- ----------------------------
-- Table structure for GENRE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."GENRE";
CREATE TABLE "Fiction Profile"."GENRE" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."GENRE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MANGA
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MANGA";
CREATE TABLE "Fiction Profile"."MANGA" (
  "id" int8 NOT NULL,
  "title" varchar(2000) COLLATE "pg_catalog"."default",
  "type" varchar(255) COLLATE "pg_catalog"."default",
  "vote_average" float8,
  "scored_by" float8,
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "volumes" int4,
  "chapters" int4,
  "published_from" varchar(255) COLLATE "pg_catalog"."default",
  "published_to" varchar(255) COLLATE "pg_catalog"."default",
  "members" int4,
  "favorites" int4,
  "nsfw" bool,
  "genres" varchar(2000) COLLATE "pg_catalog"."default",
  "themes" varchar(2000) COLLATE "pg_catalog"."default",
  "demographics" varchar(2000) COLLATE "pg_catalog"."default",
  "authors" varchar(2000) COLLATE "pg_catalog"."default",
  "serializations" varchar(2000) COLLATE "pg_catalog"."default",
  "overview" varchar(10000) COLLATE "pg_catalog"."default",
  "background" varchar(10000) COLLATE "pg_catalog"."default",
  "poster_path" varchar(2000) COLLATE "pg_catalog"."default",
  "url" varchar(2000) COLLATE "pg_catalog"."default",
  "title_english" varchar(2000) COLLATE "pg_catalog"."default",
  "title_japanese" varchar(2000) COLLATE "pg_catalog"."default",
  "title_synonyms" varchar(2000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."MANGA" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MANGA_GENRE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MANGA_GENRE";
CREATE TABLE "Fiction Profile"."MANGA_GENRE" (
  "id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."MANGA_GENRE_id_seq"'::regclass),
  "manga_id" int8,
  "genre_id" int4
)
;
ALTER TABLE "Fiction Profile"."MANGA_GENRE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MEDIA
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MEDIA";
CREATE TABLE "Fiction Profile"."MEDIA" (
  "type_id" int4 NOT NULL,
  "movie_id" int8,
  "tv_id" int8,
  "book_id" int8,
  "manga_id" int8,
  "media_id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."MEDIA_media_id_seq"'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "poster_path" varchar(255) COLLATE "pg_catalog"."default",
  "rating" float8,
  "vote_count" int4
)
;
ALTER TABLE "Fiction Profile"."MEDIA" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MEDIA_STATUS_OPTIONS
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MEDIA_STATUS_OPTIONS";
CREATE TABLE "Fiction Profile"."MEDIA_STATUS_OPTIONS" (
  "status_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."MEDIA_STATUS_OPTIONS_status_id_seq"'::regclass),
  "status_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "Fiction Profile"."MEDIA_STATUS_OPTIONS" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MEDIA_TYPE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MEDIA_TYPE";
CREATE TABLE "Fiction Profile"."MEDIA_TYPE" (
  "type_id" int4 NOT NULL,
  "type_name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."MEDIA_TYPE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MODERATOR
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MODERATOR";
CREATE TABLE "Fiction Profile"."MODERATOR" (
  "moderator_id" int8 NOT NULL,
  "report_id_list" varchar(50000) COLLATE "pg_catalog"."default",
  "request_id_list" varchar(50000) COLLATE "pg_catalog"."default",
  "announcement_list" varchar(50000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."MODERATOR" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MOVIE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MOVIE";
CREATE TABLE "Fiction Profile"."MOVIE" (
  "id" int8 NOT NULL,
  "title" varchar(10000) COLLATE "pg_catalog"."default",
  "original_title" varchar(10000) COLLATE "pg_catalog"."default",
  "imdb_id" varchar(255) COLLATE "pg_catalog"."default",
  "vote_average" float8,
  "vote_count" float8,
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "release_date" timestamptz(6),
  "revenue" float8,
  "runtime" int4,
  "adult" bool,
  "backdrop_path" varchar(1000) COLLATE "pg_catalog"."default",
  "budget" float8,
  "homepage" varchar(10000) COLLATE "pg_catalog"."default",
  "original_language" varchar(255) COLLATE "pg_catalog"."default",
  "overview" varchar(10000) COLLATE "pg_catalog"."default",
  "popularity" float8,
  "poster_path" varchar(1000) COLLATE "pg_catalog"."default",
  "tagline" varchar(10000) COLLATE "pg_catalog"."default",
  "genres" varchar(1000) COLLATE "pg_catalog"."default",
  "production_companies" varchar(10000) COLLATE "pg_catalog"."default",
  "production_countries" varchar(10000) COLLATE "pg_catalog"."default",
  "spoken_languages" varchar(10000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."MOVIE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for MOVIE_GENRE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."MOVIE_GENRE";
CREATE TABLE "Fiction Profile"."MOVIE_GENRE" (
  "id" int8 NOT NULL,
  "movie_id" int4,
  "genre_id" int4
)
;
ALTER TABLE "Fiction Profile"."MOVIE_GENRE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for PEOPLE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."PEOPLE";
CREATE TABLE "Fiction Profile"."PEOPLE" (
  "role" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "first_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default",
  "gender" varchar(255) COLLATE "pg_catalog"."default",
  "birthdate" timestamp(6),
  "profile_pic_path" varchar(1000) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/fiction-profile-ec84d.appspot.com/o/uploads%2Fdefault.png?alt=media&token=e5478785-411b-4f7d-86e1-9f615adb992a'::character varying,
  "joined_date" timestamp(6),
  "people_id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."PEOPLE_people_id_seq"'::regclass)
)
;
ALTER TABLE "Fiction Profile"."PEOPLE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for POST
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."POST";
CREATE TABLE "Fiction Profile"."POST" (
  "post_id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."POST_post_id_seq"'::regclass),
  "user_id" int8 NOT NULL,
  "content" text COLLATE "pg_catalog"."default",
  "last_edit" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "Fiction Profile"."POST" OWNER TO "postgres";

-- ----------------------------
-- Table structure for POST_VOTE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."POST_VOTE";
CREATE TABLE "Fiction Profile"."POST_VOTE" (
  "vote_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."POST_VOTE_vote_id_seq"'::regclass),
  "user_id" int8,
  "post_id" int8,
  "vote_value" int4,
  "last_change" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "Fiction Profile"."POST_VOTE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for REPORT
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."REPORT";
CREATE TABLE "Fiction Profile"."REPORT" (
  "report_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."REPORT_report_id_seq"'::regclass),
  "user_id" int8,
  "moderator_id" int8,
  "content_type" int4,
  "post_id" int8,
  "comment_id" int8,
  "review_id" int8,
  "report_reason" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "assigned" bool DEFAULT false
)
;
ALTER TABLE "Fiction Profile"."REPORT" OWNER TO "postgres";

-- ----------------------------
-- Table structure for REPORT_CONTENT
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."REPORT_CONTENT";
CREATE TABLE "Fiction Profile"."REPORT_CONTENT" (
  "content_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."REPORT_CONTENT_content_id_seq"'::regclass),
  "content_name" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."REPORT_CONTENT" OWNER TO "postgres";

-- ----------------------------
-- Table structure for REVIEW
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."REVIEW";
CREATE TABLE "Fiction Profile"."REVIEW" (
  "review_id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."USER_REVIEW_review_id_seq"'::regclass),
  "user_id" int8,
  "media_id" int8,
  "comment" text COLLATE "pg_catalog"."default",
  "rating" int4
)
;
ALTER TABLE "Fiction Profile"."REVIEW" OWNER TO "postgres";

-- ----------------------------
-- Table structure for REVIEW_VOTE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."REVIEW_VOTE";
CREATE TABLE "Fiction Profile"."REVIEW_VOTE" (
  "vote_id" int8 NOT NULL DEFAULT nextval('"Fiction Profile"."REVIEW_VOTE_vote_id_seq"'::regclass),
  "user_id" int8,
  "review_id" int8,
  "vote_value" int4,
  "last_change" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;
ALTER TABLE "Fiction Profile"."REVIEW_VOTE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for TVSHOW
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."TVSHOW";
CREATE TABLE "Fiction Profile"."TVSHOW" (
  "id" int8 NOT NULL,
  "title" text COLLATE "pg_catalog"."default",
  "number_of_seasons" text COLLATE "pg_catalog"."default",
  "number_of_episodes" text COLLATE "pg_catalog"."default",
  "original_language" text COLLATE "pg_catalog"."default",
  "vote_count" int8,
  "vote_average" float8,
  "overview" text COLLATE "pg_catalog"."default",
  "adult" bool,
  "backdrop_path" text COLLATE "pg_catalog"."default",
  "first_air_date" text COLLATE "pg_catalog"."default",
  "last_air_date" text COLLATE "pg_catalog"."default",
  "homepage" text COLLATE "pg_catalog"."default",
  "in_production" bool,
  "original_name" text COLLATE "pg_catalog"."default",
  "popularity" text COLLATE "pg_catalog"."default",
  "poster_path" text COLLATE "pg_catalog"."default",
  "type" text COLLATE "pg_catalog"."default",
  "status" text COLLATE "pg_catalog"."default",
  "tagline" text COLLATE "pg_catalog"."default",
  "genres" text COLLATE "pg_catalog"."default",
  "created_by" text COLLATE "pg_catalog"."default",
  "languages" text COLLATE "pg_catalog"."default",
  "networks" text COLLATE "pg_catalog"."default",
  "origin_country" text COLLATE "pg_catalog"."default",
  "spoken_languages" text COLLATE "pg_catalog"."default",
  "production_companies" text COLLATE "pg_catalog"."default",
  "production_countries" text COLLATE "pg_catalog"."default",
  "episode_run_time" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."TVSHOW" OWNER TO "postgres";

-- ----------------------------
-- Table structure for TV_GENRE
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."TV_GENRE";
CREATE TABLE "Fiction Profile"."TV_GENRE" (
  "tv_id" int8,
  "genre_id" int4,
  "id" int8 NOT NULL DEFAULT nextval('"TV_GENRE_id_seq"'::regclass)
)
;
ALTER TABLE "Fiction Profile"."TV_GENRE" OWNER TO "postgres";

-- ----------------------------
-- Table structure for USER
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."USER";
CREATE TABLE "Fiction Profile"."USER" (
  "user_id" int8 NOT NULL,
  "bio" varchar(1000) COLLATE "pg_catalog"."default",
  "favorite_content_id_list" varchar(50000) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "Fiction Profile"."USER" OWNER TO "postgres";

-- ----------------------------
-- Table structure for USER_MEDIA_LIST
-- ----------------------------
DROP TABLE IF EXISTS "Fiction Profile"."USER_MEDIA_LIST";
CREATE TABLE "Fiction Profile"."USER_MEDIA_LIST" (
  "user_media_id" int4 NOT NULL DEFAULT nextval('"Fiction Profile"."USER_MEDIA_LIST_user_media_id_seq"'::regclass),
  "user_id" int4,
  "media_id" int4,
  "status_id" int4
)
;
ALTER TABLE "Fiction Profile"."USER_MEDIA_LIST" OWNER TO "postgres";

-- ----------------------------
-- Function structure for insert_user_or_moderator
-- ----------------------------
DROP FUNCTION IF EXISTS "Fiction Profile"."insert_user_or_moderator"();
CREATE OR REPLACE FUNCTION "Fiction Profile"."insert_user_or_moderator"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
  -- Assuming NEW.people_id is the new people_id generated after insert
  IF NEW.role = 'user' THEN
    INSERT INTO "Fiction Profile"."USER" (user_id) VALUES (NEW.people_id);
  ELSIF NEW.role = 'moderator' THEN
    INSERT INTO "Fiction Profile"."MODERATOR" (moderator_id) VALUES (NEW.people_id);
  END IF;
  RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION "Fiction Profile"."insert_user_or_moderator"() OWNER TO "postgres";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."BOOK_book_id_seq"
OWNED BY "Fiction Profile"."BOOK"."id";
SELECT setval('"Fiction Profile"."BOOK_book_id_seq"', 271379, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."COMMENT_VOTE_vote_id_seq"
OWNED BY "Fiction Profile"."COMMENT_VOTE"."vote_id";
SELECT setval('"Fiction Profile"."COMMENT_VOTE_vote_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."COMMENT_comment_id_seq"
OWNED BY "Fiction Profile"."COMMENT"."comment_id";
SELECT setval('"Fiction Profile"."COMMENT_comment_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."FAVORITE_favorite_id_seq"
OWNED BY "Fiction Profile"."FAVORITE"."favorite_id";
SELECT setval('"Fiction Profile"."FAVORITE_favorite_id_seq"', 111, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."FOLLOW_follow_id_seq"
OWNED BY "Fiction Profile"."FOLLOW"."follow_id";
SELECT setval('"Fiction Profile"."FOLLOW_follow_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."MANGA_GENRE_id_seq"
OWNED BY "Fiction Profile"."MANGA_GENRE"."id";
SELECT setval('"Fiction Profile"."MANGA_GENRE_id_seq"', 75057, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."MEDIA_STATUS_OPTIONS_status_id_seq"
OWNED BY "Fiction Profile"."MEDIA_STATUS_OPTIONS"."status_id";
SELECT setval('"Fiction Profile"."MEDIA_STATUS_OPTIONS_status_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."MEDIA_media_id_seq"
OWNED BY "Fiction Profile"."MEDIA"."media_id";
SELECT setval('"Fiction Profile"."MEDIA_media_id_seq"', 490639, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."PEOPLE_people_id_seq"
OWNED BY "Fiction Profile"."PEOPLE"."people_id";
SELECT setval('"Fiction Profile"."PEOPLE_people_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."POST_VOTE_vote_id_seq"
OWNED BY "Fiction Profile"."POST_VOTE"."vote_id";
SELECT setval('"Fiction Profile"."POST_VOTE_vote_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."POST_post_id_seq"
OWNED BY "Fiction Profile"."POST"."post_id";
SELECT setval('"Fiction Profile"."POST_post_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."REPORT_CONTENT_content_id_seq"
OWNED BY "Fiction Profile"."REPORT_CONTENT"."content_id";
SELECT setval('"Fiction Profile"."REPORT_CONTENT_content_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."REPORT_report_id_seq"
OWNED BY "Fiction Profile"."REPORT"."report_id";
SELECT setval('"Fiction Profile"."REPORT_report_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."REVIEW_VOTE_vote_id_seq"
OWNED BY "Fiction Profile"."REVIEW_VOTE"."vote_id";
SELECT setval('"Fiction Profile"."REVIEW_VOTE_vote_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."TV_GENRE_id_seq"
OWNED BY "Fiction Profile"."TV_GENRE"."id";
SELECT setval('"Fiction Profile"."TV_GENRE_id_seq"', 87664, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."USER_MEDIA_LIST_user_media_id_seq"
OWNED BY "Fiction Profile"."USER_MEDIA_LIST"."user_media_id";
SELECT setval('"Fiction Profile"."USER_MEDIA_LIST_user_media_id_seq"', 15, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "Fiction Profile"."USER_REVIEW_review_id_seq"
OWNED BY "Fiction Profile"."REVIEW"."review_id";
SELECT setval('"Fiction Profile"."USER_REVIEW_review_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table BOOK
-- ----------------------------
ALTER TABLE "Fiction Profile"."BOOK" ADD CONSTRAINT "BOOK_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table COMMENT
-- ----------------------------
ALTER TABLE "Fiction Profile"."COMMENT" ADD CONSTRAINT "COMMENT_pkey" PRIMARY KEY ("comment_id");

-- ----------------------------
-- Primary Key structure for table COMMENT_VOTE
-- ----------------------------
ALTER TABLE "Fiction Profile"."COMMENT_VOTE" ADD CONSTRAINT "COMMENT_VOTE_pkey" PRIMARY KEY ("vote_id");

-- ----------------------------
-- Primary Key structure for table FAVORITE
-- ----------------------------
ALTER TABLE "Fiction Profile"."FAVORITE" ADD CONSTRAINT "FAVORITE_pkey" PRIMARY KEY ("favorite_id");

-- ----------------------------
-- Primary Key structure for table FOLLOW
-- ----------------------------
ALTER TABLE "Fiction Profile"."FOLLOW" ADD CONSTRAINT "FOLLOW_pkey" PRIMARY KEY ("follow_id");

-- ----------------------------
-- Primary Key structure for table GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."GENRE" ADD CONSTRAINT "GENRE_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table MANGA
-- ----------------------------
ALTER TABLE "Fiction Profile"."MANGA" ADD CONSTRAINT "MANGA_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table MANGA_GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."MANGA_GENRE" ADD CONSTRAINT "MANGA_GENRE_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table MEDIA
-- ----------------------------
ALTER TABLE "Fiction Profile"."MEDIA" ADD CONSTRAINT "MEDIA_pkey" PRIMARY KEY ("media_id");

-- ----------------------------
-- Uniques structure for table MEDIA_STATUS_OPTIONS
-- ----------------------------
ALTER TABLE "Fiction Profile"."MEDIA_STATUS_OPTIONS" ADD CONSTRAINT "MEDIA_STATUS_OPTIONS_status_name_key" UNIQUE ("status_name");

-- ----------------------------
-- Primary Key structure for table MEDIA_STATUS_OPTIONS
-- ----------------------------
ALTER TABLE "Fiction Profile"."MEDIA_STATUS_OPTIONS" ADD CONSTRAINT "MEDIA_STATUS_OPTIONS_pkey" PRIMARY KEY ("status_id");

-- ----------------------------
-- Primary Key structure for table MEDIA_TYPE
-- ----------------------------
ALTER TABLE "Fiction Profile"."MEDIA_TYPE" ADD CONSTRAINT "MEDIA_TYPE_pkey" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table MODERATOR
-- ----------------------------
ALTER TABLE "Fiction Profile"."MODERATOR" ADD CONSTRAINT "Moderator_pkey" PRIMARY KEY ("moderator_id");

-- ----------------------------
-- Primary Key structure for table MOVIE
-- ----------------------------
ALTER TABLE "Fiction Profile"."MOVIE" ADD CONSTRAINT "MOVIE_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table MOVIE_GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."MOVIE_GENRE" ADD CONSTRAINT "MOVIE_GENRE_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table PEOPLE
-- ----------------------------
CREATE TRIGGER "after_insert_people" AFTER INSERT ON "Fiction Profile"."PEOPLE"
FOR EACH ROW
EXECUTE PROCEDURE "Fiction Profile"."insert_user_or_moderator"();

-- ----------------------------
-- Primary Key structure for table PEOPLE
-- ----------------------------
ALTER TABLE "Fiction Profile"."PEOPLE" ADD CONSTRAINT "PEOPLE_pkey" PRIMARY KEY ("people_id");

-- ----------------------------
-- Primary Key structure for table POST
-- ----------------------------
ALTER TABLE "Fiction Profile"."POST" ADD CONSTRAINT "POST_pkey" PRIMARY KEY ("post_id");

-- ----------------------------
-- Primary Key structure for table POST_VOTE
-- ----------------------------
ALTER TABLE "Fiction Profile"."POST_VOTE" ADD CONSTRAINT "POST_VOTE_pkey" PRIMARY KEY ("vote_id");

-- ----------------------------
-- Primary Key structure for table REPORT
-- ----------------------------
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_pkey" PRIMARY KEY ("report_id");

-- ----------------------------
-- Primary Key structure for table REPORT_CONTENT
-- ----------------------------
ALTER TABLE "Fiction Profile"."REPORT_CONTENT" ADD CONSTRAINT "REPORT_CONTENT_pkey" PRIMARY KEY ("content_id");

-- ----------------------------
-- Checks structure for table REVIEW
-- ----------------------------
ALTER TABLE "Fiction Profile"."REVIEW" ADD CONSTRAINT "USER_REVIEW_rating_check" CHECK (rating >= 0 AND rating <= 10);

-- ----------------------------
-- Primary Key structure for table REVIEW
-- ----------------------------
ALTER TABLE "Fiction Profile"."REVIEW" ADD CONSTRAINT "USER_REVIEW_pkey" PRIMARY KEY ("review_id");

-- ----------------------------
-- Primary Key structure for table REVIEW_VOTE
-- ----------------------------
ALTER TABLE "Fiction Profile"."REVIEW_VOTE" ADD CONSTRAINT "REVIEW_VOTE_pkey" PRIMARY KEY ("vote_id");

-- ----------------------------
-- Primary Key structure for table TVSHOW
-- ----------------------------
ALTER TABLE "Fiction Profile"."TVSHOW" ADD CONSTRAINT "TV_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table TV_GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."TV_GENRE" ADD CONSTRAINT "TV_GENRE_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table USER
-- ----------------------------
ALTER TABLE "Fiction Profile"."USER" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- ----------------------------
-- Primary Key structure for table USER_MEDIA_LIST
-- ----------------------------
ALTER TABLE "Fiction Profile"."USER_MEDIA_LIST" ADD CONSTRAINT "USER_MEDIA_LIST_pkey" PRIMARY KEY ("user_media_id");

-- ----------------------------
-- Foreign Keys structure for table COMMENT
-- ----------------------------
ALTER TABLE "Fiction Profile"."COMMENT" ADD CONSTRAINT "COMMENT_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Fiction Profile"."COMMENT" ("comment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."COMMENT" ADD CONSTRAINT "COMMENT_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Fiction Profile"."POST" ("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."COMMENT" ADD CONSTRAINT "COMMENT_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table COMMENT_VOTE
-- ----------------------------
ALTER TABLE "Fiction Profile"."COMMENT_VOTE" ADD CONSTRAINT "COMMENT_VOTE_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Fiction Profile"."COMMENT" ("comment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."COMMENT_VOTE" ADD CONSTRAINT "COMMENT_VOTE_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table FAVORITE
-- ----------------------------
ALTER TABLE "Fiction Profile"."FAVORITE" ADD CONSTRAINT "FAVORITE_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Fiction Profile"."MEDIA" ("media_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."FAVORITE" ADD CONSTRAINT "FAVORITE_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table FOLLOW
-- ----------------------------
ALTER TABLE "Fiction Profile"."FOLLOW" ADD CONSTRAINT "FOLLOW_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."FOLLOW" ADD CONSTRAINT "FOLLOW_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table MANGA_GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."MANGA_GENRE" ADD CONSTRAINT "MANGA_GENRE_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Fiction Profile"."GENRE" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."MANGA_GENRE" ADD CONSTRAINT "MANGA_GENRE_manga_id_fkey" FOREIGN KEY ("manga_id") REFERENCES "Fiction Profile"."MANGA" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table MEDIA
-- ----------------------------
ALTER TABLE "Fiction Profile"."MEDIA" ADD CONSTRAINT "book_id" FOREIGN KEY ("book_id") REFERENCES "Fiction Profile"."BOOK" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."MEDIA" ADD CONSTRAINT "manga_id" FOREIGN KEY ("manga_id") REFERENCES "Fiction Profile"."MANGA" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."MEDIA" ADD CONSTRAINT "movie_id" FOREIGN KEY ("movie_id") REFERENCES "Fiction Profile"."MOVIE" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."MEDIA" ADD CONSTRAINT "tv_id" FOREIGN KEY ("tv_id") REFERENCES "Fiction Profile"."TVSHOW" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."MEDIA" ADD CONSTRAINT "type_id" FOREIGN KEY ("type_id") REFERENCES "Fiction Profile"."MEDIA_TYPE" ("type_id") MATCH FULL ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table MODERATOR
-- ----------------------------
ALTER TABLE "Fiction Profile"."MODERATOR" ADD CONSTRAINT "people_id" FOREIGN KEY ("moderator_id") REFERENCES "Fiction Profile"."PEOPLE" ("people_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table MOVIE_GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."MOVIE_GENRE" ADD CONSTRAINT "genre_id" FOREIGN KEY ("genre_id") REFERENCES "Fiction Profile"."GENRE" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."MOVIE_GENRE" ADD CONSTRAINT "movie_id" FOREIGN KEY ("movie_id") REFERENCES "Fiction Profile"."MOVIE" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table POST
-- ----------------------------
ALTER TABLE "Fiction Profile"."POST" ADD CONSTRAINT "POST_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table POST_VOTE
-- ----------------------------
ALTER TABLE "Fiction Profile"."POST_VOTE" ADD CONSTRAINT "POST_VOTE_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Fiction Profile"."POST" ("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."POST_VOTE" ADD CONSTRAINT "POST_VOTE_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table REPORT
-- ----------------------------
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Fiction Profile"."COMMENT" ("comment_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_content_type_fkey" FOREIGN KEY ("content_type") REFERENCES "Fiction Profile"."REPORT_CONTENT" ("content_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_moderator_id_fkey" FOREIGN KEY ("moderator_id") REFERENCES "Fiction Profile"."MODERATOR" ("moderator_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Fiction Profile"."POST" ("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Fiction Profile"."REVIEW" ("review_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REPORT" ADD CONSTRAINT "REPORT_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table REVIEW
-- ----------------------------
ALTER TABLE "Fiction Profile"."REVIEW" ADD CONSTRAINT "USER_REVIEW_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Fiction Profile"."MEDIA" ("media_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REVIEW" ADD CONSTRAINT "USER_REVIEW_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table REVIEW_VOTE
-- ----------------------------
ALTER TABLE "Fiction Profile"."REVIEW_VOTE" ADD CONSTRAINT "REVIEW_VOTE_preview_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Fiction Profile"."REVIEW" ("review_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."REVIEW_VOTE" ADD CONSTRAINT "REVIEW_VOTE_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table TV_GENRE
-- ----------------------------
ALTER TABLE "Fiction Profile"."TV_GENRE" ADD CONSTRAINT "TV_GENRE_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Fiction Profile"."GENRE" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."TV_GENRE" ADD CONSTRAINT "TV_GENRE_tv_id_fkey" FOREIGN KEY ("tv_id") REFERENCES "Fiction Profile"."TVSHOW" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table USER
-- ----------------------------
ALTER TABLE "Fiction Profile"."USER" ADD CONSTRAINT "people_id" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."PEOPLE" ("people_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table USER_MEDIA_LIST
-- ----------------------------
ALTER TABLE "Fiction Profile"."USER_MEDIA_LIST" ADD CONSTRAINT "USER_MEDIA_LIST_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Fiction Profile"."MEDIA" ("media_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."USER_MEDIA_LIST" ADD CONSTRAINT "USER_MEDIA_LIST_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Fiction Profile"."MEDIA_STATUS_OPTIONS" ("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Fiction Profile"."USER_MEDIA_LIST" ADD CONSTRAINT "USER_MEDIA_LIST_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Fiction Profile"."USER" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
