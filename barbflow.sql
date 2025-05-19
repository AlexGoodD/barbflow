-- USE Barbflow; <- Cambia a tu base de datos y descomenta esta línea

-- Creación de tablas

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `apellido` varchar(60) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `token` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `barberos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `citas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `horaInicio` time DEFAULT NULL,
  `horaFin` time DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  `barberoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`barberoId`) REFERENCES `barberos` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;


CREATE TABLE `citasServicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `citaId` int DEFAULT NULL,
  `servicioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `citaId` (`citaId`),
  KEY `servicioId` (`servicioId`),
  CONSTRAINT `citasservicios_ibfk_3` FOREIGN KEY (`citaId`) REFERENCES `citas` (`id`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `citasservicios_ibfk_4` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;


-- Inserción de datos

-- (La contraseña es: qwer12)

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `telefono`, `admin`, `confirmado`, `token`) VALUES
(9, 'Emmanuel Alejandro', 'Chavarria Buendia', 'alejandro@gmail.com', '$2y$10$EtfPxal6BxhtnrmSPg1spOP0jQ43aAk5kiqAJSJMEq9ExSiE', '1234567890', 0, 1, ''),
(10, 'Alejandro Emmanuel', 'Chavarria Buendia', 'alejandro1@gmail.com', '$2y$10$EtfPxal6BxhtnrmSPg1spOP0jQ43aAk5kiqAJSJMEq9ExSiE', '1234567890', 0, 1, '');


INSERT INTO `servicios` (`id`, `nombre`, `precio`, `duracion`, `descripcion`) VALUES
(1, 'Corte de cabello mujer', 120.00, 45, 'Corte profesional con asesoría de estilo para mujeres.'),
(2, 'Corte de cabello hombre', 80.00, 30, 'Corte clásico o moderno para hombres, incluye limpieza.'),
(3, 'Corte de cabello niño', 60.00, 25, 'Corte para niños con trato especializado y paciencia.'),
(4, 'Peinado mujer', 80.00, 40, 'Peinado elegante o casual para eventos o uso diario.'),
(5, 'Peinado hombre', 60.00, 20, 'Peinado con productos de fijación para un acabado duradero.'),
(6, 'Peinado niño', 60.00, 20, 'Peinado divertido o formal adaptado para niños.'),
(7, 'Corte de barba', 60.00, 20, 'Diseño y arreglo de barba con máquina o navaja.'),
(8, 'Tinte mujer', 300.00, 90, 'Aplicación de tinte completo, incluye lavado y peinado.'),
(9, 'Uñas', 400.00, 60, 'Manicura y aplicación de esmalte o gel a elección.'),
(10, 'Lavado de cabello', 50.00, 15, 'Lavado con masaje capilar relajante y productos nutritivos.'),
(11, 'Tratamiento capilar', 150.00, 50, 'Tratamiento para nutrir y revitalizar el cabello dañado.');

INSERT INTO `citas` (`id`, `fecha`, `horaInicio`, `horaFin`, `usuarioId`) VALUES
(22, '2025-05-03', '10:30:00', '11:15:00', 9);

INSERT INTO `citasServicios` (`id`, `citaId`, `servicioId`) VALUES
(18, 22, 2);

INSERT INTO `barberos` (`id`, `nombre`, `especialidad`) VALUES
(1, 'Carlos Pérez', 'Cortes modernos y clásicos'),
(2, 'Ana López', 'Peinados y tintes'),
(3, 'Luis Gómez', 'Arreglo de barba y tratamientos capilares');


-- Eliminación de tablas

-- Deshabilitar las restricciones de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar las tablas en el orden correcto
DROP TABLE IF EXISTS `citasServicios`;
DROP TABLE IF EXISTS `citas`;
DROP TABLE IF EXISTS `barberos`;
DROP TABLE IF EXISTS `servicios`;
DROP TABLE IF EXISTS `usuarios`;

-- Habilitar nuevamente las restricciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;