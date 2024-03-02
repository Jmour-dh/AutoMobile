-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 26 fév. 2024 à 20:06
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `automobile`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `Avis_ID` int(11) NOT NULL ,
  `FirstNameVisiter` varchar(255) DEFAULT NULL,
  `LastNameVisiter` varchar(255) DEFAULT NULL,
  `EmailVisiter` varchar(255) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `DateOfAvis` timestamp NOT NULL DEFAULT current_timestamp(),
  `Service_ID` int(11) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`Avis_ID`, `FirstNameVisiter`, `LastNameVisiter`, `EmailVisiter`, `Comment`, `Note`, `DateOfAvis`, `Service_ID`, `User_ID`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Excellent service, très satisfait !', 5, '2024-02-25 10:18:02', 2, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `experiedtokens`
--

CREATE TABLE `experiedtokens` (
  `jwtToken` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `experiedtokens`
--

INSERT INTO `experiedtokens` (`jwtToken`, `createdAt`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsImlhdCI6MTcwODc2ODQzNCwiZXhwIjoxNzA4NzgyODM0fQ.-_-kuAyaQZdS1eKUAiLhQwXWVwoxxnI603pR7P1KOSQ', '2024-02-24 10:06:33'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwODkzODk2NiwiZXhwIjoxNzA4OTUzMzY2fQ.r-e5Bf53-r9aQXx-UDwRcfC-hfIMzXNdoZWILdbBeSQ', '2024-02-26 09:17:25');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `Message_ID` int(11) NOT NULL,
  `FirstNameVisiter` varchar(255) DEFAULT NULL,
  `LastNameVisiter` varchar(255) DEFAULT NULL,
  `EmailVisiter` varchar(255) DEFAULT NULL,
  `Objet` varchar(255) NOT NULL,
  `Message` text DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Moto_ID` int(11) DEFAULT NULL,
  `DateOfMessage` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`Message_ID`, `FirstNameVisiter`, `LastNameVisiter`, `EmailVisiter`, `Objet`, `Message`, `User_ID`, `Moto_ID`, `DateOfMessage`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Demande d\'information', 'Bonjour, je suis intéressé par votre moto. Pouvez-vous me donner plus d\'informations à ce sujet ?', NULL, 5, '2024-02-24 10:02:21'),
(2, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Demande d\'information', 'Bonjour, je suis intéressé par votre moto. Pouvez-vous me donner plus d\'informations à ce sujet ?', NULL, 5, '2024-02-24 10:02:38'),
(3, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Demande d\'information', 'Bonjour, je suis intéressé par votre moto. Pouvez-vous me donner plus d\'informations à ce sujet ?', NULL, 5, '2024-02-24 10:05:03'),
(4, NULL, NULL, NULL, 'Demande d\'information', 'Bonjour, je suis intéressé par votre moto. Pouvez-vous me donner plus d\'informations à ce sujet ?', 1, 5, '2024-02-24 10:10:54'),
(6, NULL, NULL, NULL, 'Demande d\'information', 'Bonjour, je suis intéressé par votre moto. Pouvez-vous me donner plus d\'informations à ce sujet ?', 2, 5, '2024-02-24 13:15:11');

-- --------------------------------------------------------

--
-- Structure de la table `moto`
--

CREATE TABLE `moto` (
  `Moto_ID` int(11) NOT NULL,
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
  `Price` int(11) DEFAULT NULL,
  `Photo1` text DEFAULT NULL,
  `Photo2` text DEFAULT NULL,
  `Photo3` text DEFAULT NULL,
  `Photo4` text DEFAULT NULL,
  `Photo5` text DEFAULT NULL,
  `Photo6` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `moto`
--

INSERT INTO `moto` (`Moto_ID`, `Modele`, `Marque`, `CreationDate`, `Year`, `Origin`, `FirstHand`, `OdometerMileage`, `Energy`, `Gearbox`, `Color`, `NumberOfPlaces`, `FiscalPower`, `Powers`, `Price`, `Photo1`, `Photo2`, `Photo3`, `Photo4`, `Photo5`, `Photo6`) VALUES
(5, 'Nom du modèle1', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, NULL, 'chemin/vers/photo1.jpg', 'chemin/vers/photo2.jpg', 'chemin/vers/photo3.jpg', 'chemin/vers/photo4.jpg', 'chemin/vers/photo5.jpg', 'chemin/vers/photo6.jpg'),
(6, 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg', 'chemin/vers/photo2.jpg', 'chemin/vers/photo3.jpg', 'chemin/vers/photo4.jpg', 'chemin/vers/photo5.jpg', 'chemin/vers/photo6.jpg'),
(7, 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg', 'chemin/vers/photo2.jpg', 'chemin/vers/photo3.jpg', 'chemin/vers/photo4.jpg', 'chemin/vers/photo5.jpg', 'chemin/vers/photo6.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `Role_ID` int(11) NOT NULL,
  `Role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`Role_ID`, `Role`) VALUES
(1, 'Admin'),
(3, 'Personal'),
(2, 'User');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `Service_ID` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`Service_ID`, `Nom`, `Description`, `Price`, `ImageUrl`) VALUES
(2, 'Produit B', 'Ceci est une description du produit A.', 30, 'https://exemple.com/images/produitA.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `EmailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `HashedPassword` varchar(255) NOT NULL,
  `Role_ID` int(11) DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`User_ID`, `FirstName`, `LastName`, `Address`, `Email`, `Phone`, `EmailVerified`, `HashedPassword`, `Role_ID`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 'Dhia Eddine11', 'Jmour1', '23 rue de Nantes 75019 Paris', 'dhiaeddinejm81@gmail.com', '0767243257', 0, '$argon2id$v=19$m=65536,t=5,p=1$pP0zSuIryQnKxEEuQetf4g$Z7a+9Q9Dl9AYau8pcIIf69IOX5zsncaOmwK598Z8rhk', 2, '2024-02-24 09:53:16', '2024-02-24 09:53:16'),
(2, 'Dhia Eddine3', 'Jmour1', '23 rue de Nantes 75019 Paris', 'dhiaeddinejm821@gmail.com', '0767243257', 0, '$argon2id$v=19$m=65536,t=5,p=1$OFV8tDL0SsjkCbton5zglw$1Du/hpBP+/uftJv7K9RZ41OBhrH/D2wvtd3WbiRp1zA', 2, '2024-02-24 10:23:00', '2024-02-24 13:03:51');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--



--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`Message_ID`);

--
-- Index pour la table `moto`
--
ALTER TABLE `moto`
  ADD PRIMARY KEY (`Moto_ID`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`Service_ID`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `Avis_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `Message_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `moto`
--
ALTER TABLE `moto`
  MODIFY `Moto_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `Service_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`Service_ID`) REFERENCES `service` (`Service_ID`),
  ADD CONSTRAINT `avis_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
