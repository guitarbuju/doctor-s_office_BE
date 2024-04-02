

CREATE TABLE patients(
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    birth_date DATE NULL,
    date_entered TIMESTAMP NOT NULL,
    id SERIAL PRIMARY KEY
    );
    
    INSERT INTO patients (first_name,last_name, email,zip_code,phone,birth_date,date_entered) 
    VALUES ('Jose','Perez','jose@mail.com','1234','789456','1975-07-24',current_timestamp),
    
