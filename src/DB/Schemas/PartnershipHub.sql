CREATE TYPE PartnerType AS ENUM ('isDoctor', 'isClient', 'isProvider');

CREATE TABLE PartnershipHub(
    id VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    partner_type PartnerType NOT NULL,
    domicile VARCHAR(30) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    speciality VARCHAR(50), -- Assuming speciality field length
    CONSTRAINT chk_speciality CHECK (partner_type <> 'isDoctor' OR speciality IS NOT NULL)
);

CREATE OR REPLACE FUNCTION set_default_title()
RETURNS TRIGGER AS $$
BEGIN
    NEW.title := NEW.contact_first_name || ' ' || NEW.contact_last_name;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_default_title_trigger
BEFORE INSERT ON PartnershipHub
FOR EACH ROW
EXECUTE FUNCTION set_default_title();

ALTER TABLE PartnershipHub
ADD COLUMN contact_first_name VARCHAR(20) NOT NULL,
ADD COLUMN contact_last_name VARCHAR(20) NOT NULL,
ADD COLUMN contact_dni VARCHAR(12) NOT NULL,
ADD COLUMN contact_phone VARCHAR(20) NOT NULL,
ADD COLUMN contact_address VARCHAR(100) NOT NULL,
ADD COLUMN date_entered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT chk_doctor_data CHECK (
    (partner_type <> 'isDoctor') OR
    (contact_first_name IS NOT NULL AND contact_last_name IS NOT NULL AND contact_dni IS NOT NULL AND contact_phone IS NOT NULL AND contact_address IS NOT NULL)
);

