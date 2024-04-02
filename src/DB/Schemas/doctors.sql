CREATE TABLE doctors(
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    speciality VARCHAR(20) NOT NULL,
    birth_date DATE NULL,
    date_entered TIMESTAMP NOT NULL,
    dni VARCHAR(12) NOT NULL PRIMARY KEY
    id SERIAL 
    );
    
INSERT INTO doctors (first_name,last_name, email,zip_code,phone,speciality,birth_date,date_entered) 
    VALUES ('Ernesto','Madrid','ernesto@mail.com','7889','2131646','Orthopedist','1979-10-12',current_timestamp);
