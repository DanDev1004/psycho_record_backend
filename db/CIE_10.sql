-- Llenado de la tabla CATEGORIA
INSERT INTO CATEGORIA (NOMBRE_CATEGORIA) VALUES 
('Trast. ment. orgánicos, incl. los trast. sintomáticos'),
('Esquizofrenia, trast. esquizotípicos y trast. delirantes'),
('Trast. del humor (afectivos)'),
('Trast. neuróticos, trast. relac. con el estrés y trast. somatomorfos'),
('Síndromes del comp. asociados con alteraciones fisiológicas y factores físicos'),
('Trast. de la personalidad y del comp. en adultos'),
('Retraso mental'),
('Trast. del desarrollo psicológico'),
('Trast. emocionales y del comp. que aparecen habitualmente en la niñez y adolescencia'),
('Trast. mental no especificado');

-- Llenado de la tabla CONDICION
INSERT INTO CONDICION (NOMBRE_CONDICION, ID_CATEGORIA) VALUES 
-- Trast. ment. orgánicos, incl. los trast. sintomáticos (ID_CATEGORIA = 1)
('Demencia en la enf. de Alzheimer', 1),
('Demencia vascular', 1),
('Demencia en otras enf. clasificadas en otra parte', 1),
('Demencia, no especificada', 1),
('Síndrome amnésico orgánico, no inducido por alcohol o por otras sustancias psicoactivas', 1),
('Delirio, no inducido por alcohol o por otras sustancias psicoactivas', 1),
('Otros trast. ment. debidos a lesión y disfunción cerebral, y a enf. física', 1),
('Trast. de la personalidad y del comp. debidos a enf., lesión o disfunción cerebral', 1),
('Trast. ment. orgánico o sintomático, no especificado', 1),
-- Esquizofrenia, trast. esquizotípicos y trast. delirantes (ID_CATEGORIA = 2)
('Esquizofrenia', 2),
('Trast. esquizotípico', 2),
('Trast. delirantes persistentes', 2),
('Trast. psicóticos agudos y transitorios', 2),
('Trast. delirante inducido', 2),
('Trast. esquizoafectivos', 2),
('Otros trast. psicóticos de origen no orgánico', 2),
('Psicosis de origen no orgánico, no especificada', 2),
-- Trast. del humor (afectivos) (ID_CATEGORIA = 3)
('Episodio maníaco', 3),
('Trast. afectivo bipolar', 3),
('Episodio depresivo', 3),
('Trast. depresivo recurrente', 3),
('Trast. del humor [afectivos] persistentes', 3),
('Otros trast. del humor [afectivos]', 3),
('Trast. del humor [afectivo], no especificado', 3),
-- Trast. neuróticos, trast. relac. con el estrés y trast. somatomorfos (ID_CATEGORIA = 4)
('Trast. fóbicos de ansiedad', 4),
('Otros trast. de ansiedad', 4),
('Trast. obsesivo-compulsivo', 4),
('Reacción al estrés grave y trast. de adaptación', 4),
('Trast. disociativos [de conversión]', 4),
('Trast. somatomorfos', 4),
('Otros trast. neuróticos', 4),
-- Síndromes del comp. asociados con alteraciones fisiológicas y factores físicos (ID_CATEGORIA = 5)
('Trast. de la ingestión de alimentos', 5),
('Trast. no orgánicos del sueño', 5),
('Disfunción sexual no ocasionada por trast. ni enf. orgánicos', 5),
('Trast. ment. y del comp. asociados con el puerperio, no clasificados en otra parte', 5),
('Factores psicológicos y del comp. asociados con trast. o enf. clasificados en otra parte', 5),
('Abuso de sustancias que no producen dependencia', 5),
('Síndromes del comp. asociados con alteraciones fisiológicas y factores físicos, no especificados', 5),
-- Trast. de la personalidad y del comp. en adultos (ID_CATEGORIA = 6)
('Trast. específicos de la personalidad', 6),
('Trast. mixtos y otros trast. de la personalidad', 6),
('Cambios perdurables de la personalidad, no atribuibles a lesión o a enf. cerebral', 6),
('Trast. de los hábitos y de los impulsos', 6),
('Trast. de la identidad de género', 6),
('Trast. de la preferencia sexual', 6),
('Trast. psicológicos y del comp. asociados con el desarrollo y con la orientación sexuales', 6),
('Otros trast. de la personalidad y del comp. en adultos', 6),
('Trast. de la personalidad y del comp. en adultos, no especificado', 6),
-- Retraso ment. (ID_CATEGORIA = 7)
('Retraso ment. leve', 7),
('Retraso ment. moderado', 7),
('Retraso ment. grave', 7),
('Retraso ment. profundo', 7),
('Otros tipos de retraso ment.', 7),
('Retraso ment., no especificado', 7),
-- Trast. del desarrollo psicológico (ID_CATEGORIA = 8)
('Trast. específicos del desarrollo del habla y del lenguaje', 8),
('Trast. específicos del desarrollo de las habilidades escolares', 8),
('Trast. específico del desarrollo de la función motriz', 8),
('Trast. específicos mixtos del desarrollo', 8),
('Trast. generalizados del desarrollo', 8),
('Otros trast. del desarrollo psicológico', 8),
('Trast. del desarrollo psicológico, no especificado', 8),
-- Trast. emocionales y del comp. que aparecen habitualmente en la niñez y adolescencia (ID_CATEGORIA = 9)
('Trast. hipercinéticos', 9),
('Trast. de la conducta', 9),
('Trast. mixtos de la conducta y de las emociones', 9),
('Trast. emocionales de comienzo específico en la niñez', 9),
('Trast. del comp. social de comienzo específico en la niñez y en la adolescencia', 9),
('Trast. por tics', 9),
('Otros trast. emocionales y del comp. que aparecen habitualmente en la niñez y en la adolescencia', 9),
-- Trast. ment. no especificado (ID_CATEGORIA = 10)
('Trast. ment., no especificado', 10);

SELECT * FROM CATEGORIA;
SELECT * FROM CONDICION;