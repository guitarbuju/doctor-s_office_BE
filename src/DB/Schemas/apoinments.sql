

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    appointment_timestamp TIMESTAMP NOT NULL,
    patient_dni VARCHAR(12) NOT NULL,
    doctor_dni VARCHAR(12) NOT NULL,
    CONSTRAINT fk_patient FOREIGN KEY (patient_dni) REFERENCES patients (dni),
    CONSTRAINT fk_doctor FOREIGN KEY (doctor_dni) REFERENCES doctors (dni)
);
