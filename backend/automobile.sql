-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 22 fév. 2024 à 15:38
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
  `Avis_ID` int(11) NOT NULL,
  `FirstNameVisiter` varchar(255) NOT NULL,
  `LastNameVisiter` varchar(255) NOT NULL,
  `EmailVisiter` varchar(255) NOT NULL,
  `Comment` text DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `DateOfAvis` timestamp NOT NULL DEFAULT current_timestamp(),
  `User_ID` int(11) DEFAULT NULL,
  `Moto_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

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
  `Powers` varchar(255) DEFAULT NULL,
  `Photos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `Role_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`Avis_ID`),
  ADD KEY `User_Id` (`User_ID`),
  ADD KEY `Moto_Id` (`Moto_ID`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`Contact_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`Message_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Moto_ID` (`Moto_ID`);

--
-- Index pour la table `moto`
--
ALTER TABLE `moto`
  ADD PRIMARY KEY (`Moto_ID`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Role_ID`),
  ADD UNIQUE KEY `Role` (`Role`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Phone` (`Phone`),
  ADD KEY `Role_ID` (`Role_ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `Avis_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `Contact_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `Message_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `moto`
--
ALTER TABLE `moto`
  MODIFY `Moto_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `Role_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `avis_ibfk_2` FOREIGN KEY (`Moto_Id`) REFERENCES `moto` (`Moto_ID`);

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`Moto_ID`) REFERENCES `moto` (`Moto_ID`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `role` (`Role_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
