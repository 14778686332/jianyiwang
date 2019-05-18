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

 Date: 18/05/2019 21:00:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for usercart
-- ----------------------------
DROP TABLE IF EXISTS `usercart`;
CREATE TABLE `usercart`  (
  `did` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `dimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单Img',
  `dgoodsname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单的商品名称',
  `huohao` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品货号',
  `guige` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品规格',
  `changjia` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生产厂家',
  `dmoney` float(100, 0) NULL DEFAULT NULL COMMENT '健一价格',
  `counts` int(255) NULL DEFAULT NULL COMMENT '数量',
  PRIMARY KEY (`did`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usercart
-- ----------------------------
INSERT INTO `usercart` VALUES (35, '14778686332', 'http://localhost:1234/jianyi2/src/img/goodslist/6_200x200.jpg', '鱼油软胶囊200粒', '7', '鱼油软胶囊200粒', '汤臣倍健股份有限公司', 45, 3);

SET FOREIGN_KEY_CHECKS = 1;
