/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3306
 Source Schema         : jianyi

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 18/05/2019 21:00:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for reguser
-- ----------------------------
DROP TABLE IF EXISTS `reguser`;
CREATE TABLE `reguser`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reguser
-- ----------------------------
INSERT INTO `reguser` VALUES (2, '13123456789', '165468');
INSERT INTO `reguser` VALUES (6, '13686908286', '123123');
INSERT INTO `reguser` VALUES (17, '13213465789', '123123');
INSERT INTO `reguser` VALUES (20, '14778686332', '123123');

SET FOREIGN_KEY_CHECKS = 1;
