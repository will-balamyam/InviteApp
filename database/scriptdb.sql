-- Tabla para los datos base del evento
CREATE TABLE invitations (
                             id SERIAL PRIMARY KEY,
                             event_code VARCHAR(50) NOT NULL UNIQUE,
                             event_hashtag VARCHAR(255) NOT NULL,
                             event_description TEXT NOT NULL,
                             event_data_parents TEXT NOT NULL,
                             event_data_sponsors TEXT NOT NULL,
                             event_name VARCHAR(255) NOT NULL,
                             event_date TIMESTAMP NOT NULL,
                             event_party_time TIME NOT NULL,
                             event_location_name VARCHAR(255) NOT NULL,
                             event_location_description VARCHAR(255) NOT NULL,
                             event_location_link VARCHAR(255) NOT NULL,
                             event_location_party_name VARCHAR(255) NOT NULL,
                             event_location_party_description VARCHAR(255) NOT NULL,
                             event_location_party_link VARCHAR(255) NOT NULL,
                             gift_table_number VARCHAR(255) NOT NULL,
                             gift_table_link VARCHAR(255) NOT NULL,
                             event_dress_code VARCHAR(255) NOT NULL,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para registrar las familias invitadas
CREATE TABLE families (
                          id SERIAL PRIMARY KEY,
                          family_name VARCHAR(255) NOT NULL,
                          family_code VARCHAR(50) NOT NULL UNIQUE,
                          contact_email VARCHAR(255),
                          contact_phone VARCHAR(50),
                          invitation_id INT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE
);

-- Tabla para controlar la cantidad de accesos por familia
CREATE TABLE family_access (
                               id SERIAL PRIMARY KEY,
                               family_id INT NOT NULL,
                               member_name VARCHAR(255) NOT NULL,
                               confirmed BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               FOREIGN KEY (family_id) REFERENCES families (id) ON DELETE CASCADE
);
-- tabla de imagenes
CREATE TABLE images (
                        id SERIAL PRIMARY KEY,
                        invitation_id INT NOT NULL,
                        image_data BYTEA NOT NULL, -- Datos binarios de la imagen
                        description TEXT,
                        image_type VARCHAR(50),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE
);
