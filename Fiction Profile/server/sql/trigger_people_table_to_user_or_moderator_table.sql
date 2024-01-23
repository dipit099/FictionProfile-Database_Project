--- Create or replace the trigger function
CREATE OR REPLACE FUNCTION "Fiction Profile".insert_user_or_moderator_after_people()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role = 'user' THEN
        INSERT INTO "Fiction Profile"."USER" (user_id)
        VALUES (NEW.people_id);
    ELSIF NEW.role = 'moderator' THEN
        INSERT INTO "Fiction Profile"."MODERATOR" (moderator_id)
        VALUES (NEW.people_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_insert_user_or_moderator
AFTER INSERT ON "Fiction Profile"."PEOPLE"
FOR EACH ROW
EXECUTE FUNCTION "Fiction Profile".insert_user_or_moderator_after_people();


-- Temporarily disable the trigger
ALTER TABLE "Fiction Profile"."PEOPLE" DISABLE TRIGGER trigger_insert_user;

-- Drop the trigger
DROP TRIGGER IF EXISTS trigger_insert_user ON "Fiction Profile"."PEOPLE";

-- Drop the function
DROP FUNCTION IF EXISTS "Fiction Profile".insert_user_after_people();

-- Re-enable the trigger
ALTER TABLE "Fiction Profile"."PEOPLE" ENABLE TRIGGER trigger_insert_user;