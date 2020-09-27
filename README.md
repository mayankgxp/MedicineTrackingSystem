# MedicineTrackingSystem

We have three projects in same Same solution (Web + API + API Test Project)

Below are the DB scripts having two tables Medicine and Brand :

CREATE TABLE `MedicineDB`.`Brand` (
  `BrandId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `BrandName` VARCHAR(45) NOT NULL COMMENT ''
  PRIMARY KEY (`BrandId`)  COMMENT '');
  
CREATE TABLE `MedicineDB`.`Medicine` (
  `MedicineId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `Name` VARCHAR(45) NOT NULL COMMENT '',
  `BrandId` INT(11) NOT NULL COMMENT '',
  `Price` VARCHAR(45) NOT NULL COMMENT '',
  `Notes` VARCHAR(45) NULL COMMENT '',
   `ExpiryDate` DATE NOT NULL COMMENT '',
  PRIMARY KEY (`MedicineId`)  COMMENT '')
  CONSTRAINT `fk_Med_Brand`
  FOREIGN KEY (`BrandId`)
  REFERENCES `MedicineDB`.`Brand` (`BrandId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
