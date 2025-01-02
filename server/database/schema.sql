-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tuneApp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tuneApp` ;

-- -----------------------------------------------------
-- Schema tuneApp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tuneApp` DEFAULT CHARACTER SET utf8 ;
USE `tuneApp` ;

-- -----------------------------------------------------
-- Table `tuneApp`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tuneApp`.`User` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `email` VARCHAR(125) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tuneApp`.`Album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tuneApp`.`Album` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `title` VARCHAR(85) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Album_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Album_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `tuneApp`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tuneApp`.`Track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tuneApp`.`Track` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `title` VARCHAR(85) NOT NULL,
  `album_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Track_Album1_idx` (`album_id` ASC) VISIBLE,
  CONSTRAINT `fk_Track_Album1`
    FOREIGN KEY (`album_id`)
    REFERENCES `tuneApp`.`Album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tuneApp`.`Artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tuneApp`.`Artist` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(125) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tuneApp`.`Artist_has_Track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tuneApp`.`Artist_has_Track` (
  `Artist_id` INT NOT NULL,
  `Track_id` INT NOT NULL,
  PRIMARY KEY (`Artist_id`, `Track_id`),
  INDEX `fk_Artist_has_Track_Track1_idx` (`Track_id` ASC) VISIBLE,
  INDEX `fk_Artist_has_Track_Artist1_idx` (`Artist_id` ASC) VISIBLE,
  CONSTRAINT `fk_Artist_has_Track_Artist1`
    FOREIGN KEY (`Artist_id`)
    REFERENCES `tuneApp`.`Artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Artist_has_Track_Track1`
    FOREIGN KEY (`Track_id`)
    REFERENCES `tuneApp`.`Track` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
