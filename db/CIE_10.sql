-- Llenado de la tabla CAT_COND
INSERT INTO CAT_COND (NOMBRE_CAT_COND, ESTADO, createdAt, updatedAt) VALUES 
('Trast. ment. orgánicos, incl. los trast. sintomáticos', 1, NOW(), NOW()),
('Esquizofrenia, trast. esquizotípicos y trast. delirantes', 1, NOW(), NOW()),
('Trast. del humor (afectivos)', 1, NOW(), NOW()),
('Trast. neuróticos, trast. relac. con el estrés y trast. somatomorfos', 1, NOW(), NOW()),
('Síndromes del comp. asociados con alteraciones fisiológicas y factores físicos', 1, NOW(), NOW()),
('Trast. de la personalidad y del comp. en adultos', 1, NOW(), NOW()),
('Retraso mental', 1, NOW(), NOW()),
('Trast. del desarrollo psicológico', 1, NOW(), NOW()),
('Trast. emocionales y del comp. que aparecen habitualmente en la niñez y adolescencia', 1, NOW(), NOW()),
('Trast. mental no especificado', 1, NOW(), NOW());

-- Llenado de la tabla CONDICION
INSERT INTO CONDICION (NOMBRE_CONDICION, ID_CAT_COND, ESTADO, createdAt, updatedAt) VALUES 
-- Trast. ment. orgánicos, incl. los trast. sintomáticos (ID_CAT_COND = 1)
('Demencia en la enf. de Alzheimer', 1, 1, NOW(), NOW()),
('Demencia vascular', 1, 1, NOW(), NOW()),
('Demencia en otras enf. clasificadas en otra parte', 1, 1, NOW(), NOW()),
('Demencia, no especificada', 1, 1, NOW(), NOW()),
('Síndrome amnésico orgánico, no inducido por alcohol o por otras sustancias psicoactivas', 1, 1, NOW(), NOW()),
('Delirio, no inducido por alcohol o por otras sustancias psicoactivas', 1, 1, NOW(), NOW()),
('Otros trast. ment. debidos a lesión y disfunción cerebral, y a enf. física', 1, 1, NOW(), NOW()),
('Trast. de la personalidad y del comp. debidos a enf., lesión o disfunción cerebral', 1, 1, NOW(), NOW()),
('Trast. ment. orgánico o sintomático, no especificado', 1, 1, NOW(), NOW()),
-- Esquizofrenia, trast. esquizotípicos y trast. delirantes (ID_CAT_COND = 2)
('Esquizofrenia', 2, 1, NOW(), NOW()),
('Trast. esquizotípico', 2, 1, NOW(), NOW()),
('Trast. delirantes persistentes', 2, 1, NOW(), NOW()),
('Trast. psicóticos agudos y transitorios', 2, 1, NOW(), NOW()),
('Trast. delirante inducido', 2, 1, NOW(), NOW()),
('Trast. esquizoafectivos', 2, 1, NOW(), NOW()),
('Otros trast. psicóticos de origen no orgánico', 2, 1, NOW(), NOW()),
('Psicosis de origen no orgánico, no especificada', 2, 1, NOW(), NOW()),
-- Trast. del humor (afectivos) (ID_CAT_COND = 3)
('Episodio maníaco', 3, 1, NOW(), NOW()),
('Trast. afectivo bipolar', 3, 1, NOW(), NOW()),
('Episodio depresivo', 3, 1, NOW(), NOW()),
('Trast. depresivo recurrente', 3, 1, NOW(), NOW()),
('Trast. del humor [afectivos] persistentes', 3, 1, NOW(), NOW()),
('Otros trast. del humor [afectivos]', 3, 1, NOW(), NOW()),
('Trast. del humor [afectivo], no especificado', 3, 1, NOW(), NOW()),
-- Trast. neuróticos, trast. relac. con el estrés y trast. somatomorfos (ID_CAT_COND = 4)
('Trast. fóbicos de ansiedad', 4, 1, NOW(), NOW()),
('Otros trast. de ansiedad', 4, 1, NOW(), NOW()),
('Trast. obsesivo-compulsivo', 4, 1, NOW(), NOW()),
('Reacción al estrés grave y trast. de adaptación', 4, 1, NOW(), NOW()),
('Trast. disociativos [de conversión]', 4, 1, NOW(), NOW()),
('Trast. somatomorfos', 4, 1, NOW(), NOW()),
('Otros trast. neuróticos', 4, 1, NOW(), NOW()),
-- Síndromes del comp. asociados con alteraciones fisiológicas y factores físicos (ID_CAT_COND = 5)
('Trast. de la ingestión de alimentos', 5, 1, NOW(), NOW()),
('Trast. no orgánicos del sueño', 5, 1, NOW(), NOW()),
('Disfunción sexual no ocasionada por trast. ni enf. orgánicos', 5, 1, NOW(), NOW()),
('Trast. ment. y del comp. asociados con el puerperio, no clasificados en otra parte', 5, 1, NOW(), NOW()),
('Factores psicológicos y del comp. asociados con trast. o enf. clasificados en otra parte', 5, 1, NOW(), NOW()),
('Abuso de sustancias que no producen dependencia', 5, 1, NOW(), NOW()),
('Síndromes del comp. asociados con alteraciones fisiológicas y factores físicos, no especificados', 5, 1, NOW(), NOW()),
-- Trast. de la personalidad y del comp. en adultos (ID_CAT_COND = 6)
('Trast. específicos de la personalidad', 6, 1, NOW(), NOW()),
('Trast. mixtos y otros trast. de la personalidad', 6, 1, NOW(), NOW()),
('Cambios perdurables de la personalidad, no atribuibles a lesión o a enf. cerebral', 6, 1, NOW(), NOW()),
('Trast. de los hábitos y de los impulsos', 6, 1, NOW(), NOW()),
('Trast. de la identidad de género', 6, 1, NOW(), NOW()),
('Trast. de la preferencia sexual', 6, 1, NOW(), NOW()),
('Trast. psicológicos y del comp. asociados con el desarrollo y con la orientación sexuales', 6, 1, NOW(), NOW()),
('Otros trast. de la personalidad y del comp. en adultos', 6, 1, NOW(), NOW()),
('Trast. de la personalidad y del comp. en adultos, no especificado', 6, 1, NOW(), NOW()),
-- Retraso ment. (ID_CAT_COND = 7)
('Retraso ment. leve', 7, 1, NOW(), NOW()),
('Retraso ment. moderado', 7, 1, NOW(), NOW()),
('Retraso ment. grave', 7, 1, NOW(), NOW()),
('Retraso ment. profundo', 7, 1, NOW(), NOW()),
('Otros tipos de retraso ment.', 7, 1, NOW(), NOW()),
('Retraso ment., no especificado', 7, 1, NOW(), NOW()),
-- Trast. del desarrollo psicológico (ID_CAT_COND = 8)
('Trast. específicos del desarrollo del habla y del lenguaje', 8, 1, NOW(), NOW()),
('Trast. específicos del desarrollo de las habilidades escolares', 8, 1, NOW(), NOW()),
('Trast. específico del desarrollo de la función motriz', 8, 1, NOW(), NOW()),
('Trast. específicos mixtos del desarrollo', 8, 1, NOW(), NOW()),
('Trast. generalizados del desarrollo', 8, 1, NOW(), NOW()),
('Otros trast. del desarrollo psicológico', 8, 1, NOW(), NOW()),
('Trast. del desarrollo psicológico, no especificado', 8, 1, NOW(), NOW()),
-- Trast. emocionales y del comp. que aparecen habitualmente en la niñez y adolescencia (ID_CAT_COND = 9)
('Trast. hipercinéticos', 9, 1, NOW(), NOW()),
('Trast. de la conducta', 9, 1, NOW(), NOW()),
('Trast. mixtos de la conducta y de las emociones', 9, 1, NOW(), NOW()),
('Trast. emocionales de comienzo específico en la niñez', 9, 1, NOW(), NOW()),
('Trast. del comp. social de comienzo específico en la niñez y en la adolescencia', 9, 1, NOW(), NOW()),
('Trast. por tics', 9, 1, NOW(), NOW()),
('Otros trast. emocionales y del comp. que aparecen habitualmente en la niñez y adolescencia', 9, 1, NOW(), NOW()),
-- Trast. ment. no especificado (ID_CAT_COND = 10)
('Trast. ment., no especificado', 10, 1, NOW(), NOW());

-- Consultas para verificar la inserción
SELECT * FROM CAT_COND;
SELECT * FROM CONDICION;
