
-- Insertar en la tabla area_pe
INSERT INTO AREA_PE (NOMBRE_AREA_PE, createdAt, updatedAt) VALUES
('Electrónica industrial', NOW(), NOW()),
('Enfermería Técnica', NOW(), NOW()),
('Industrias alimentarias', NOW(), NOW()),
('Producción agropecuaria', NOW(), NOW()),
('Contabilidad', NOW(), NOW()),
('Electrotécnica industrial', NOW(), NOW()),
('Construcción civil', NOW(), NOW()),
('Arquitectura de plataforma', NOW(), NOW()),
('Servicios de Tecnologías de la información', NOW(), NOW());
select * from AREA_PE;


-- Insertar en la tabla estado_civil
INSERT INTO ESTADO_CIVIL (NOMBRE_EC, createdAt, updatedAt) VALUES
('Soltero', NOW(), NOW()),
('Casado', NOW(), NOW()),
('Viudo', NOW(), NOW()),
('Divorciado', NOW(), NOW());
select * from ESTADO_CIVIL;



-- Insertar en la tabla religion
INSERT INTO RELIGION (NOMBRE_RELIGION, createdAt, updatedAt) VALUES
('Budismo', NOW(), NOW()),
('Hinduismo', NOW(), NOW()),
('Catolicismo', NOW(), NOW()),
('Cristianismo', NOW(), NOW()),
('Judaísmo', NOW(), NOW()),
('Islamismo', NOW(), NOW()),
('Ateísmo', NOW(), NOW()),
('Agnosticismo', NOW(), NOW()),
('Testigos de Jehová', NOW(), NOW()),
('Iglesia Ortodoxa', NOW(), NOW()),
('Sijismo', NOW(), NOW()),
('Shintoísmo', NOW(), NOW()),
('Taoísmo', NOW(), NOW()),
('Zoroastrismo', NOW(), NOW()),
('Bahaísmo', NOW(), NOW()),
('Jainismo', NOW(), NOW()),
('Confucianismo', NOW(), NOW()),
('Espiritismo', NOW(), NOW()),
('Mormonismo', NOW(), NOW()),
('Otros', NOW(), NOW());
select * from RELIGION;
