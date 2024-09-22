-- Inserción en la tabla Alumno
INSERT INTO ALUMNO (NOMBRES,APELLIDOS,DNI,SEXO,TELEFONO,ID_RELIGION,ID_EC,ID_AREA_PE,DIR_NAC,FECH_NAC,DOMICILIO,CICLO,TURNO,createdAt,updatedAt) VALUES
('Carlos', 'Perez', '12345678', 'M', '987654321', 1, 1, 1, 'Av. Siempre Viva 742', '2003-01-15', 'Calle Falsa 123', 1, 'M', NOW(), NOW()),
('Ana', 'Gomez', '87654321', 'F', '912345678', 2, 2, 2, 'Jr. Los Olivos 456', '2001-02-20', 'Jr. Los Laureles 789', 1, 'M', NOW(), NOW()),
('Luis', 'Ramirez', '11223344', 'M', '923456789', 3, 1, 3, 'Calle Las Flores 789', '2005-03-10', 'Av. Los Pinos 321', 2, 'T', NOW(), NOW()),
('Maria', 'Lopez', '44332211', 'F', '934567890', 1, 3, 1, 'Av. Los Girasoles 123', '2004-04-05', 'Calle Los Tulipanes 654', 2, 'M', NOW(), NOW()),
('Jose', 'Martinez', '55667788', 'M', '945678901', 2, 2, 2, 'Jr. Las Magnolias 987', '2002-05-25', 'Av. Las Rosas 432', 3, 'T', NOW(), NOW()),
('Lucia', 'Sanchez', '66778899', 'F', '956789012', 3, 1, 3, 'Calle Las Amapolas 654', '2003-06-15', 'Jr. Las Azucenas 987', 2, 'M', NOW(), NOW()),
('Pedro', 'Gonzalez', '77889900', 'M', '967890123', 1, 3, 1, 'Av. Las Orquídeas 321', '2000-07-30', 'Calle Las Lilas 741', 3, 'T', NOW(), NOW()),
('Rosa', 'Hernandez', '88990011', 'F', '978901234', 2, 2, 2, 'Jr. Las Violetas 654', '2001-08-10', 'Av. Las Gardenias 852', 2, 'M', NOW(), NOW()),
('Jorge', 'Diaz', '99001122', 'M', '989012345', 3, 1, 3, 'Calle Los Claveles 987', '2004-09-15', 'Jr. Los Crisantemos 963', 1, 'T', NOW(), NOW()),
('Elena', 'Morales', '10101010', 'F', '900123456', 1, 3, 1, 'Av. Las Dalias 654', '2005-10-25', 'Calle Los Narcisos 159', 1, 'M', NOW(), NOW()),
('Manuel', 'Torres', '20202020', 'M', '911234567', 2, 2, 2, 'Jr. Las Palmeras 321', '2002-11-05', 'Av. Las Hortensias 753', 2, 'T', NOW(), NOW()),
('Clara', 'Vargas', '30303030', 'F', '922345678', 3, 1, 3, 'Calle Las Margaritas 123', '2003-12-15', 'Jr. Las Camelias 951', 2, 'M', NOW(), NOW()),
('Juan', 'Rojas', '40404040', 'M', '933456789', 1, 3, 1, 'Av. Los Jazmines 654', '2001-01-20', 'Calle Las Begonias 357', 3, 'T', NOW(), NOW()),
('Sofia', 'Castro', '50505050', 'F', '944567890', 2, 2, 2, 'Jr. Las Acacias 987', '2004-02-25', 'Av. Los Geranios 753', 1, 'M', NOW(), NOW()),
('Alberto', 'Flores', '60606060', 'M', '955678901', 3, 1, 3, 'Calle Los Sauces 321', '2000-03-30', 'Jr. Los Robles 159', 3, 'T', NOW(), NOW()),
('Laura', 'Rios', '70707070', 'F', '966789012', 1, 3, 1, 'Av. Los Eucaliptos 654', '2005-04-10', 'Calle Los Nogales 753', 1, 'M', NOW(), NOW()),
('Raul', 'Mendoza', '80808080', 'M', '977890123', 2, 2, 2, 'Jr. Los Cedros 987', '2003-05-20', 'Av. Los Laureles 951', 2, 'T', NOW(), NOW()),
('Marta', 'Peña', '90909090', 'F', '988901234', 3, 1, 3, 'Calle Los Olmos 321', '2002-06-25', 'Jr. Los Pinos 357', 2, 'M', NOW(), NOW()),
('Gustavo', 'Ortega', '11111111', 'M', '999012345', 1, 3, 1, 'Av. Los Álamos 654', '2001-07-30', 'Calle Los Álamos 753', 3, 'T', NOW(), NOW()),
('Andrea', 'Nuñez', '22222222', 'F', '900123456', 2, 2, 2, 'Jr. Las Casuarinas 987', '2004-08-10', 'Av. Los Cipreses 951', 1, 'M', NOW(), NOW());

select * from ALUMNO;
