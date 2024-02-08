-- Insert a Movie into USER_MEDIA_LIST
INSERT INTO "USER_MEDIA_LIST" (user_id, media_id, status_id)
SELECT
    your_user_id,
    media.media_id,
    your_status_id
FROM "MEDIA" media
WHERE media.movie_id = your_movie_id;


-- Insert a TV show into USER_MEDIA_LIST
INSERT INTO "USER_MEDIA_LIST" (user_id, media_id, status_id)
SELECT
    user_id,
    media.media_id,
    status_id
FROM "MEDIA" media
WHERE media.tv_id = tv_id;


-- Insert a Manga into USER_MEDIA_LIST
INSERT INTO "USER_MEDIA_LIST" (user_id, media_id, status_id)
SELECT
    your_user_id,
    media.media_id,
    your_status_id
FROM "MEDIA" media
WHERE media.manga_id = your_manga_id;


-- Insert a Book into USER_MEDIA_LIST
INSERT INTO "USER_MEDIA_LIST" (user_id, media_id, status_id)
SELECT
    your_user_id,
    media.media_id,
    your_status_id
FROM "MEDIA" media
WHERE media.book_id = your_book_id;
