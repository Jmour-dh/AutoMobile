
CREATE TABLE `avis` (
  `Avis_ID` int(11) NOT NULL,
  `FirstNameVisiter` varchar(255) NOT NULL,
  `LastNameVisiter` varchar(255) NOT NULL,
  `EmailVisiter` varchar(255) NOT NULL,
  `Comment` text DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `DateOfAvis` timestamp NOT NULL DEFAULT current_timestamp(),
  `User_ID` int(11) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE `contact` (
  `Contact_ID` int(11) NOT NULL,
  `FirstNameVisiter` varchar(255) NOT NULL,
  `LastNameVisiter` varchar(255) NOT NULL,
  `EmailVisiter` varchar(255) NOT NULL,
  `Objet` varchar(255) NOT NULL,
  `Message` text DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `DateOfContact` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `experiedtokens` (
  `jwtToken` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `message` (
  `Message_ID` int(11) NOT NULL,
  `FirstNameVisiter` varchar(255) NOT NULL,
  `LastNameVisiter` varchar(255) NOT NULL,
  `EmailVisiter` varchar(255) NOT NULL,
  `Objet` varchar(255) NOT NULL,
  `Message` text DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Moto_ID` int(11) DEFAULT NULL,
  `DateOfMessage` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE `moto` (
  `Moto_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Modele` varchar(255) NOT NULL,
  `Marque` varchar(255) NOT NULL,
  `CreationDate` date NOT NULL,
  `Year` int(11) NOT NULL,
  `Origin` varchar(255) DEFAULT NULL,
  `FirstHand` tinyint(1) DEFAULT NULL,
  `OdometerMileage` int(11) DEFAULT NULL,
  `Energy` varchar(255) DEFAULT NULL,
  `Gearbox` varchar(255) DEFAULT NULL,
  `Color` varchar(255) DEFAULT NULL,
  `NumberOfPlaces` int(11) DEFAULT NULL,
  `FiscalPower` int(11) DEFAULT NULL,
  `Powers` int(11) DEFAULT NULL,
  PRIMARY KEY (`Moto_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `moto_photos` (
  `Photo_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Moto_ID` int(11) NOT NULL,
  `Photo_Path` text NOT NULL,
  PRIMARY KEY (`Photo_ID`),
  KEY `Moto_ID` (`Moto_ID`),
  CONSTRAINT `moto_photos_ibfk_1` FOREIGN KEY (`Moto_ID`) REFERENCES `moto` (`Moto_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



CREATE TABLE `role` (
  `Role_ID` int(11) NOT NULL,
  `Role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



INSERT INTO `role` (`Role_ID`, `Role`) VALUES
(1, 'Admin'),
(3, 'Personal'),
(2, 'User');


CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `EmailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `HashedPassword` varchar(255) NOT NULL,
  `Role_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

