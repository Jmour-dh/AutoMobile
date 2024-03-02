-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 02 mars 2024 à 22:23
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
  `FirstNameVisiter` varchar(255) DEFAULT NULL,
  `LastNameVisiter` varchar(255) DEFAULT NULL,
  `EmailVisiter` varchar(255) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `DateOfAvis` timestamp NOT NULL DEFAULT current_timestamp(),
  `Service_ID` int(11) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `Contact_ID` int(11) NOT NULL,
  `FirstNameVisiter` varchar(255) DEFAULT NULL,
  `LastNameVisiter` varchar(255) DEFAULT NULL,
  `EmailVisiter` varchar(255) DEFAULT NULL,
  `Objet` varchar(255) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `DateOfContact` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`Contact_ID`, `FirstNameVisiter`, `LastNameVisiter`, `EmailVisiter`, `Objet`, `Message`, `User_ID`, `DateOfContact`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Question', 'Bonjour, j\'aurais une question.', NULL, '2024-02-28 14:12:19'),
(2, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Question', 'Bonjour, j\'aurais une question.', NULL, '2024-02-28 14:12:19'),
(4, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Question', 'Bonjour, j\'aurais une question.', NULL, '2024-02-28 14:12:19'),
(5, 'Jean', 'Dupont', 'jean.dupont@example.com', 'Question', 'Bonjour, j\'aurais une question.', NULL, '2024-02-28 14:12:19'),
(6, NULL, NULL, NULL, 'Question', 'Bonjour, j\'aurais une question.', 1, '2024-02-28 14:12:19'),
(7, NULL, NULL, NULL, 'Question', 'Bonjour, j\'aurais une question.', 2, '2024-02-28 14:12:19'),
(8, NULL, NULL, NULL, 'Question', 'Bonjour, j\'aurais une question.', 3, '2024-02-28 14:12:19'),
(0, NULL, NULL, NULL, 'Question22', 'Bonjour, j\'aurais une question22.', 3, '2024-02-28 18:28:31');

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
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwODkzODk2NiwiZXhwIjoxNzA4OTUzMzY2fQ.r-e5Bf53-r9aQXx-UDwRcfC-hfIMzXNdoZWILdbBeSQ', '2024-02-26 09:17:25'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkwNjc5NTEsImV4cCI6MTcwOTA4MjM1MX0.7x9tLqgw5YKvJTXq-i6zFBW0JwjyG796JqdVCZT01Ts', '2024-02-27 21:08:29'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkwNjgxMzQsImV4cCI6MTcwOTA4MjUzNH0._t_E6zz5bL1eYuHWHmDUPEHQPBgc50Lvt142RK9edqM', '2024-02-27 21:08:58'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkwNjgxNTQsImV4cCI6MTcwOTA4MjU1NH0.OQh-rISB8DWIO5pVaIKWW_0ptWfDnzEKYn5HpJ9v6Bk', '2024-02-27 21:09:15'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkwNjgyMTksImV4cCI6MTcwOTA4MjYxOX0.Zs6qQBwCwsIr9jwxr6AOWmEyOtFwH1DBGQLf0ACASos', '2024-02-27 21:10:20'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkwNjgyMzYsImV4cCI6MTcwOTA4MjYzNn0.I78f4FSt2Vv4JKngMlZJly_JEOdDi9o-G84-phwDyPY', '2024-02-27 21:10:40'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkxMTE2MzMsImV4cCI6MTcwOTEyNjAzM30.GXHgMA-C9F6JfCjEWWXWU1T0tUKWMpj-aJoZDDL7cAE', '2024-02-28 10:07:31'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkxMTc5NDcsImV4cCI6MTcwOTEzMjM0N30.0bFIdYC71oancXQv1Lk3VRXT-NM0b-vcKrghtsrjNQQ', '2024-02-28 11:33:21'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkxMjAwMzIsImV4cCI6MTcwOTEzNDQzMn0.KCCZCx16O7CJ1jV76M-YMnd7rdQBPESi1TynQGj5Xfg', '2024-02-28 11:34:06'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE3MDkxMjAxNDAsImV4cCI6MTcwOTEzNDU0MH0.9iDe5oBY_jwi5JZX-k_E--2ImBj0lmeB7G9WHOGfdQw', '2024-02-28 13:37:23'),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwOTE5NjA3OCwiZXhwIjoxNzA5MjEwNDc4fQ.iwgPTdiAKUc6CdZIhKocITbF-7b4V9Bs9BUZ5_71_T4', '2024-02-29 10:26:25');

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
(27, NULL, NULL, NULL, 'Demande dhia', 'Je suis intéressé par la moto, dhia', 1, NULL, '2024-02-28 18:43:23'),
(29, NULL, NULL, NULL, 'Demande dhia', 'Je suis intéressé par la moto, dhia', 1, NULL, '2024-02-28 18:43:24'),
(30, NULL, NULL, NULL, 'Demande dhia', 'Je suis intéressé par la moto, dhia', 1, NULL, '2024-02-28 18:43:25'),
(31, NULL, NULL, NULL, 'Demande dhia', 'Je suis intéressé par la moto, dhia', 1, NULL, '2024-02-28 18:43:25'),
(32, NULL, NULL, NULL, 'Demande dhia', 'Je suis intéressé par la moto, dhia', 1, NULL, '2024-02-28 18:43:26'),
(33, NULL, NULL, NULL, 'Demande dhia', 'Je suis intéressé par la moto, dhia', 1, NULL, '2024-02-28 19:14:35');

-- --------------------------------------------------------

--
-- Structure de la table `moto`
--

CREATE TABLE `moto` (
  `Moto_ID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
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
  `ImageUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `moto`
--

INSERT INTO `moto` (`Moto_ID`, `Title`, `Modele`, `Marque`, `CreationDate`, `Year`, `Origin`, `FirstHand`, `OdometerMileage`, `Energy`, `Gearbox`, `Color`, `NumberOfPlaces`, `FiscalPower`, `Powers`, `Price`, `ImageUrl`) VALUES
(1, 'Nom du modèle2 Nom de la marque1', 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg'),
(2, 'Nom du modèle2 Nom de la marque1', 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg'),
(3, 'Nom du modèle2 Nom de la marque1', 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg'),
(4, 'Nom du modèle2 Nom de la marque1', 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg, chemin/vers/photo1.jpg'),
(5, 'Nom du modèle2 Nom de la marque1', 'Nom du modèle2', 'Nom de la marque1', '2022-02-23', 2022, 'Origine de la moto', 1, 10000, 'Essence', 'Manuelle', 'Rouge', 2, 7, 150, 3500, 'chemin/vers/photo1.jpg , chemin/vers/photo1.jpg'),
(6, 'aaa', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 25, NULL),
(7, 'szss', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 95, NULL),
(8, 'ssss', 'CB 750', 'HONDA', '0000-00-00', 1993, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 20, NULL),
(9, 'ssss', 'CB 750', 'HONDA', '0000-00-00', 1993, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 20, NULL),
(10, 'ssss', 'CB 750', 'HONDA', '0000-00-00', 1993, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 20, NULL),
(11, 'aaaa', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 80, NULL),
(12, 'new ', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 20, NULL),
(13, 'aaa', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 90, NULL),
(14, 'sss', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 25, NULL),
(15, 'aaaa', 'CB 750', 'HONDA', '0000-00-00', 1973, '', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 90, ', vidange2.jpeg, new img.png'),
(16, 'fdgdfg', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 80, ', BLOG - Monter ses pneus moto.jpg, vidange2.jpeg, new img.png'),
(17, 'hhj', 'CB 750', 'HONDA', '0000-00-00', 1973, 'France', 0, 49000, 'Electrique', 'Automatique', 'gris', 2, 7, 57, 80, 'BLOG - Monter ses pneus moto.jpg,vidange2.jpeg,new img.png,logo.png');

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
  `ImageUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`Service_ID`, `Nom`, `Description`, `Price`, `ImageUrl`) VALUES
(7, 'Produit B', 'Ceci est une description du produit A.', 30, '1709295815447-BLOG - Monter ses pneus moto.jpg'),
(8, 'Produit B', 'Ceci est une description du produit A.', 30, '1709295815447-BLOG - Monter ses pneus moto.jpg'),
(9, 'Produit B', 'Ceci est une description du produit A.', 30, '1709295815447-BLOG - Monter ses pneus moto.jpg'),
(29, 'vidange', 'dice_game', 20, '1709295548029-vidange.jpeg'),
(30, 'vidange', 'dice_game', 95, '1709295815447-BLOG - Monter ses pneus moto.jpg'),
(32, 'pneus', 'fg', 20, '1709299411719-vidange.jpeg'),
(33, 'vidange', 'mysql worckbench', 25, '1709300036789-BLOG - Monter ses pneus moto.jpg'),
(34, 'pneus', 'ttuttyuyu', 17, '1709300417670-vidange.jpeg'),
(35, 'huile', 'changement de huile', 36, '1709316864971-vidange.jpeg'),
(36, 'pneus', 'fg', 23, '1709323825428-BLOG - Monter ses pneus moto.jpg'),
(37, 'dyagnostic', 'fgfg', 21, '1709323952767-diagnostic-d-avant-la-course-233669899.webp'),
(38, 'vidange', 'fg', 80, '1709410124983-IMG_4147.png'),
(39, 'vidange', 'dice_game', 80, '1709410145004-IMG_4147.png'),
(40, 'ju', 'fg', 20, '1709410346051-IMG_4147.png'),
(41, 'vidange', 'dice_game', 20, '1709410409957-vidange.jpeg');

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
(1, 'Dhia Eddine11', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub@gmail.com', '0767243256', 0, '$argon2id$v=19$m=65536,t=5,p=1$pP0zSuIryQnKxEEuQetf4g$Z7a+9Q9Dl9AYau8pcIIf69IOX5zsncaOmwK598Z8rhk', 1, '2024-02-24 09:53:16', '2024-02-29 08:40:52'),
(2, 'Dhia Eddine3', 'Jmour1', '23 rue de Nantes 75019 Paris', 'dhiaeddinejm821@gmail.com', '0767243257', 0, '$argon2id$v=19$m=65536,t=5,p=1$OFV8tDL0SsjkCbton5zglw$1Du/hpBP+/uftJv7K9RZ41OBhrH/D2wvtd3WbiRp1zA', 3, '2024-02-24 10:23:00', '2024-02-28 15:40:43'),
(3, 'Dhia Eddine121', 'Jmour1', '23 rue de Nantes 75019 Paris', 'dhiaeddinejm99@gmail.com', '0767243258', 0, '$argon2id$v=19$m=65536,t=5,p=1$+f4kEr1fn9e0sqwDVaWMqw$NrFezkhS4QbpWezhueTtFl8n1Ur/ZCWkpdWSyzlxu/g', 2, '2024-02-26 20:22:38', '2024-02-27 09:42:08'),
(14, 'Ayoub3', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub3@gmail.com', '0767243231', 0, '$argon2id$v=19$m=65536,t=5,p=1$gOg+BuhUP7z4qUiq1IG71A$hKrVLNMgI8ilTt0mqN8lV8LSQQsToIUMTx3arSwf644', 3, '2024-02-28 18:30:21', '2024-02-28 18:30:21'),
(15, 'Ayoub31', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub31@gmail.com', '0767243232', 0, '$argon2id$v=19$m=65536,t=5,p=1$L1uSoR42ELMgdmfhqOQm3Q$imFq7SHi2eGPcTl8DEbNGXmlkIhY6h10cGDHhN0NwNU', 3, '2024-02-28 19:31:38', '2024-02-28 19:31:38'),
(16, 'Ayoub32', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub32@gmail.com', '0767243233', 0, '$argon2id$v=19$m=65536,t=5,p=1$PxpQ+kHgpbXsI93gxT7WOw$3DhR3yBIbog+J6g8/fGueOmM8XKXU+YSfc5IckX7Kns', 3, '2024-02-28 19:31:55', '2024-02-28 19:31:55'),
(17, 'Ayoub33', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub33@gmail.com', '0767243234', 0, '$argon2id$v=19$m=65536,t=5,p=1$KkUmFAhZwGflo1DRyPBRQw$PNfgD8RdfLBW3/tfIeksCfo5s/r4b1vPj7P27mERmaY', 3, '2024-02-28 19:32:06', '2024-02-28 19:32:06'),
(18, 'Ayoub34', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub34@gmail.com', '0767243235', 0, '$argon2id$v=19$m=65536,t=5,p=1$6PYedU61k0kcvHWQt3j9jQ$UXCDflbG/fQnjmYTmUWmo4XfsylDdWke2czP+WSP600', 3, '2024-02-28 19:32:23', '2024-02-28 19:32:23'),
(20, 'Ayoub351', 'Jmour1', '23 rue de Nantes 75019 Paris', 'ayoub351@gmail.com', '0767243237', 0, '$argon2id$v=19$m=65536,t=5,p=1$5au+sOPI5tV6Tf5xgpGY2A$/2N6bpApanVVik7WCRPFu8HeNieFGiq7bVKXmc9ODXA', 3, '2024-02-28 19:40:55', '2024-02-28 19:40:55'),
(21, 'jmour', 'taher', 'canada', 'taher@gmail.com', '0667243249', 0, '$argon2id$v=19$m=65536,t=5,p=1$yLwsMMgbBmmEHEXUrMYrjg$qhnMJeCdulM/gxo+wqR02eSVWMnEEVTUu1ZcSZGt92A', 3, '2024-02-29 09:08:06', '2024-02-29 09:08:06'),
(22, 'Jmour', 'Dhia Eddine', '23 Rue de Nantes 75019', 'dhia@gmail.com', '0767243249', 0, '$argon2id$v=19$m=65536,t=5,p=1$8doUJUzfCiNVGmRbqyXsdA$eYoLEHuHTzt/lxw7qHURQjFU1RroAoskdLB0IZ7jARI', 3, '2024-02-29 09:16:51', '2024-02-29 13:54:27'),
(23, 'Jmour', 'Dhia eddine', '23 Rue de Nantes', 'dhia1@gmail.com', '0767243245', 0, '$argon2id$v=19$m=65536,t=5,p=1$ZwgvQ49oA0mtIMi3jmQCzA$1ofaqM/d/ng4R01/1usmZZOL2PVPvGPGVe8VbPvV1yo', 2, '2024-02-29 10:27:10', '2024-02-29 14:05:50'),
(24, 'jmourr', 'Dhia Eddine', '23 Rue de Nantes', 'dhiaeddinejm@gmail.com', '0267243249', 0, '$argon2id$v=19$m=65536,t=5,p=1$XW7FduP3+OJ6FJPb004W/w$+Bf77bMKHFyZ+JI4hJgOOpCbhRKHRsl6c8C8gOV+Ivg', 3, '2024-02-29 10:28:35', '2024-02-29 13:54:04'),
(25, 'Chamli', 'Najwa', 'tunisie', 'najwa@gmail.com', '2425252525', 0, '$argon2id$v=19$m=65536,t=5,p=1$6qjCbi3enRo98D1NjAunYw$nblOOCAKhg6yzsfNFIZPmvbC7oTyyqXg2586VAkpWWg', 2, '2024-02-29 11:00:08', '2024-02-29 11:00:08');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`Avis_ID`);

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
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Phone` (`Phone`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `Avis_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `Message_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `moto`
--
ALTER TABLE `moto`
  MODIFY `Moto_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `Service_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`Moto_ID`) REFERENCES `moto` (`Moto_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
