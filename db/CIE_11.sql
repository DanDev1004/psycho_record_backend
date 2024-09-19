INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del neurodesarrollo');
INSERT INTO CATEGORIA VALUES (NULL, 'Esquizofrenia u otros trastornos psicóticos primarios');
INSERT INTO CATEGORIA VALUES (NULL, 'Catatonia');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del estado de ánimo');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos de ansiedad o relacionados con el miedo');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos obsesivo-compulsivos y otros trastornos relacionados');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos específicamente asociados con el estrés');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos disociativos');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del comportamiento alimentario');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastorno de eliminación');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos de distrés corporal o de la experiencia corporal');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos debidos al consumo de sustancias o a comportamientos adictivos');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del control de los impulsos');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos de comportamiento disruptivo y disocial');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos de la personalidad y rasgos relacionados');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del comportamiento sexual');
INSERT INTO CATEGORIA VALUES (NULL, 'Discapacidad intelectual');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del sueño-vigilia');
INSERT INTO CATEGORIA VALUES (NULL, 'Trastornos del movimiento y otras disfunciones neurológicas');
SELECT * FROM CATEGORIA;


-- Trastornos del neurodesarrollo (ID 1)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del desarrollo intelectual', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del espectro autista', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de hiperactividad y déficit de atención', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del aprendizaje', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del desarrollo del lenguaje', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la coordinación del desarrollo', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de movimiento estereotipado', 1);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos especificados del neurodesarrollo', 1);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del neurodesarrollo, sin especificación', 1);

-- Esquizofrenia u otros trastornos psicóticos primarios (ID 2)
INSERT INTO CONDICION VALUES (NULL, 'Esquizofrenia', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno esquizotípico', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno delirante', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno esquizoafectivo', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno psicótico breve', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno psicótico agudo polimorfo', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno psicótico inducido por sustancias', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno psicótico debido a otra condición médica', 2);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos psicóticos primarios especificados', 2);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos psicóticos primarios, sin especificación', 2);

-- Catatonia (ID 3)
INSERT INTO CONDICION VALUES (NULL, 'Catatonia', 3);
INSERT INTO CONDICION VALUES (NULL, 'Catatonia inducida por sustancias', 3);
INSERT INTO CONDICION VALUES (NULL, 'Catatonia debido a otra condición médica', 3);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos catatónicos especificados', 3);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos catatónicos, sin especificación', 3);

-- Trastornos del estado de ánimo (ID 4)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno depresivo mayor', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno depresivo recurrente', 4);
INSERT INTO CONDICION VALUES (NULL, 'Distimia', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno depresivo persistente', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno bipolar tipo I', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno bipolar tipo II', 4);
INSERT INTO CONDICION VALUES (NULL, 'Ciclotimia', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno disfórico premenstrual', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno disruptivo del estado de ánimo', 4);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del estado de ánimo especificados', 4);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del estado de ánimo, sin especificación', 4);

-- Trastornos de ansiedad o relacionados con el miedo (ID 5)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de ansiedad generalizada', 5);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de pánico', 5);
INSERT INTO CONDICION VALUES (NULL, 'Fobia específica', 5);
INSERT INTO CONDICION VALUES (NULL, 'Fobia social', 5);
INSERT INTO CONDICION VALUES (NULL, 'Agorafobia', 5);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de ansiedad por separación', 5);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos de ansiedad especificados', 5);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos de ansiedad, sin especificación', 5);

-- Trastornos obsesivo-compulsivos y otros trastornos relacionados (ID 6)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno obsesivo-compulsivo', 6);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno dismórfico corporal', 6);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de acumulación', 6);
INSERT INTO CONDICION VALUES (NULL, 'Tricotilomanía', 6);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de excoriación', 6);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos obsesivo-compulsivos especificados', 6);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos obsesivo-compulsivos, sin especificación', 6);

-- Trastornos específicamente asociados con el estrés (ID 7)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de estrés postraumático', 7);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de estrés agudo', 7);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de adaptación', 7);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno reactivo de vinculación', 7);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de relación social desinhibida', 7);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos específicamente asociados con el estrés especificados', 7);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos específicamente asociados con el estrés, sin especificación', 7);

-- Trastornos disociativos (ID 8)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de identidad disociativo', 8);
INSERT INTO CONDICION VALUES (NULL, 'Amnesia disociativa', 8);
INSERT INTO CONDICION VALUES (NULL, 'Fuga disociativa', 8);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de despersonalización/desrealización', 8);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno disociativo motor', 8);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno disociativo sensorial', 8);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos disociativos especificados', 8);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos disociativos, sin especificación', 8);

-- Trastornos del comportamiento alimentario (ID 9)
INSERT INTO CONDICION VALUES (NULL, 'Anorexia nerviosa', 9);
INSERT INTO CONDICION VALUES (NULL, 'Bulimia nerviosa', 9);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por atracones', 9);
INSERT INTO CONDICION VALUES (NULL, 'Pica', 9);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de rumiación', 9);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de evitación/restricción de la ingesta de alimentos', 9);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del comportamiento alimentario especificados', 9);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del comportamiento alimentario, sin especificación', 9);

-- Trastorno de eliminación (ID 10)
INSERT INTO CONDICION VALUES (NULL, 'Enuresis', 10);
INSERT INTO CONDICION VALUES (NULL, 'Encopresis', 10);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos de eliminación especificados', 10);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos de eliminación, sin especificación', 10);

-- Trastornos de distrés corporal o de la experiencia corporal (ID 11)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de somatización', 11);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de conversión', 11);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de dolor somatomorfo', 11);
INSERT INTO CONDICION VALUES (NULL, 'Hipocondriasis', 11);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos de distrés corporal especificados', 11);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos de distrés corporal, sin especificación', 11);

-- Trastornos debidos al consumo de sustancias o a comportamientos adictivos (ID 12)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de alcohol', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de cannabis', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de cocaína', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de opioides', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de sedantes o hipnóticos', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de alucinógenos', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de tabaco', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por consumo de solventes inhalables', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno por juego patológico', 12);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos debidos al consumo de sustancias especificados', 12);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos debidos al consumo de sustancias, sin especificación', 12);

-- Trastornos del control de los impulsos (ID 13)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno explosivo intermitente', 13);
INSERT INTO CONDICION VALUES (NULL, 'Cleptomanía', 13);
INSERT INTO CONDICION VALUES (NULL, 'Piromanía', 13);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de juego patológico', 13);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de compras compulsivas', 13);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del control de los impulsos especificados', 13);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del control de los impulsos, sin especificación', 13);

-- Trastornos de comportamiento disruptivo y disocial (ID 14)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno disocial', 14);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno negativista desafiante', 14);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno explosivo intermitente', 14);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del comportamiento disruptivo especificados', 14);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del comportamiento disruptivo, sin especificación', 14);

-- Trastornos de la personalidad y rasgos relacionados (ID 15)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad paranoide', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad esquizoide', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad esquizotípica', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad antisocial', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad límite', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad histriónica', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad narcisista', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad evitativa', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad dependiente', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la personalidad obsesivo-compulsivo', 15);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos de la personalidad especificados', 15);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos de la personalidad, sin especificación', 15);

-- Trastornos del comportamiento sexual (ID 16)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la identidad sexual', 16);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la orientación sexual', 16);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno de la función sexual', 16);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno parafílico', 16);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del comportamiento sexual especificados', 16);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del comportamiento sexual, sin especificación', 16);

-- Discapacidad intelectual (ID 17)
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del desarrollo intelectual leve', 17);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del desarrollo intelectual moderado', 17);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del desarrollo intelectual grave', 17);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del desarrollo intelectual profundo', 17);

-- Trastornos del sueño-vigilia (ID 18)
INSERT INTO CONDICION VALUES (NULL, 'Insomnio', 18);
INSERT INTO CONDICION VALUES (NULL, 'Hipersomnia', 18);
INSERT INTO CONDICION VALUES (NULL, 'Narcolepsia', 18);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del sueño-vigilia por alteración del ritmo circadiano', 18);
INSERT INTO CONDICION VALUES (NULL, 'Parasomnia', 18);
INSERT INTO CONDICION VALUES (NULL, 'Trastorno del sueño relacionado con la respiración', 18);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del sueño-vigilia especificados', 18);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del sueño-vigilia, sin especificación', 18);

-- Trastornos del movimiento y otras disfunciones neurológicas (ID 19)
INSERT INTO CONDICION VALUES (NULL, 'CONDICION de Parkinson', 19);
INSERT INTO CONDICION VALUES (NULL, 'Parkinsonismo', 19);
INSERT INTO CONDICION VALUES (NULL, 'Distonía', 19);
INSERT INTO CONDICION VALUES (NULL, 'Coreas', 19);
INSERT INTO CONDICION VALUES (NULL, 'Ataxias', 19);
INSERT INTO CONDICION VALUES (NULL, 'Temblor', 19);
INSERT INTO CONDICION VALUES (NULL, 'Mioclonías', 19);
INSERT INTO CONDICION VALUES (NULL, 'Tics', 19);
INSERT INTO CONDICION VALUES (NULL, 'Parálisis periódica', 19);
INSERT INTO CONDICION VALUES (NULL, 'Espasmos', 19);
INSERT INTO CONDICION VALUES (NULL, 'Otros trastornos del movimiento especificados', 19);
INSERT INTO CONDICION VALUES (NULL, 'Trastornos del movimiento, sin especificación', 19);

SELECT * FROM CONDICION;
