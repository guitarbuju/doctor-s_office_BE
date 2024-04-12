

CREATE TABLE services (
    id SERIAL,
    title VARCHAR(30) NOT NULL,
    contractor_id  VARCHAR(30) NOT NULL,
    contractor_name  VARCHAR(30) NOT NULL,
    service_type ????,
    uom VARCHAR(30) NOT NULL,
    unit_price INTEGER,
)