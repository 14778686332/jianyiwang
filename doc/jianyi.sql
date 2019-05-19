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

 Date: 19/05/2019 13:25:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist`  (
  `sid` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goodsimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goodsong` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goodscanshu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goodsmoney` float(100, 2) NULL DEFAULT NULL,
  `goodsale` int(255) NULL DEFAULT NULL,
  `goodspl` int(255) NULL DEFAULT NULL,
  `changjia` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 52 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES (1, '../img/goodslist/0_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '钙维生素D维生素K软胶囊 1000mg*100粒 （原品液体钙软胶囊）', 118.00, 8943, 796, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (2, '../img/goodslist/1_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '蛋白粉（蛋白质粉）450g', 5153.00, 8653, 453, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (3, '../img/goodslist/2_200x200.jpg', ' ', '维生素B族片 550毫克*100片', 984.00, 12, 456, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (4, '../img/goodslist/3_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '蜂胶软胶囊 60粒', 45.00, 1232, 45, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (5, '../img/goodslist/4_200x200.jpg', ' ', '汤臣倍健 维生素C片100片', 456456.00, 78, 123, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (6, '../img/goodslist/5_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '褪黑素片', 4656.00, 435, 123, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (7, '../img/goodslist/6_200x200.jpg', ' ', '鱼油软胶囊200粒', 45.00, 231, 556, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (8, '../img/goodslist/7_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '鱼油软胶囊 1000mg*100粒', 45.00, 786, 123, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (9, '../img/goodslist/8_200x200.jpg', ' ', '多种维生素片（女士）1000mg*60片', 456.00, 453, 78, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (10, '../img/goodslist/10_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '鱼油软胶囊100粒+汤臣倍健大豆磷脂软胶囊100粒', 4656.00, 45, 453, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (11, '../img/goodslist/11_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '大豆磷脂软胶囊', 456.00, 123, 56, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (12, '../img/goodslist/12_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '大豆磷脂软胶囊1000mg*200粒', 351.00, 678, 78, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (13, '../img/goodslist/13_200x200.jpg', ' ', '锌咀嚼片', 3123.00, 1231, 786, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (14, '../img/goodslist/14_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '清好 清畅胶囊', 788.00, 8638, 43, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (15, '../img/goodslist/15_200x200.jpg', ' ', '胶原软骨素钙片', 65.00, 543, 45, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (16, '../img/goodslist/16_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '维生素C加天然维生素E咀嚼片 60片', 456.00, 868, 455, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (17, '../img/goodslist/17_200x200.jpg', ' ', '牛初乳加钙咀嚼片（汤臣倍健）1.2g*60片', 123.00, 5331, 786, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (18, '../img/goodslist/18_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '天然维生素E软胶囊', 132.00, 389, 12, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (19, '../img/goodslist/19_200x200.jpg', ' ', '钙镁片', 876.00, 435, 23, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (20, '../img/goodslist/20_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '鱼油牛磺酸软胶囊 500mg*90粒', 7887.00, 4521, 231, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (21, '../img/goodslist/21_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '婷好青春胶囊', 46.00, 7849, 453, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (22, '../img/goodslist/22_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '葡萄籽维生素C加E片', 876.00, 4545, 5, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (23, '../img/goodslist/23_200x200.jpg', ' ', '多种维生素矿物质片(男士型)', 786.00, 876, 3, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (24, '../img/goodslist/24_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '钙镁咀嚼片(儿童及青少年)', 486.00, 78, 2, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (25, '../img/goodslist/25_200x200.jpg', ' ', '雄纠纠 益康胶囊', 876.00, 7866, 5, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (26, '../img/goodslist/26_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '维生素A维生素D软胶囊（儿童型）', 67.00, 3, 54, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (27, '../img/goodslist/27_200x200.jpg', ' ', '铁叶酸片 500mg*60片', 876.00, 12, 103, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (28, '../img/goodslist/28_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '大蒜精油软胶囊500mg*200粒', 786.00, 98, 2, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (29, '../img/goodslist/29_200x200.jpg', ' ', '蛋白质粉(小罐) 3罐组合装', 678.00, 123, 996, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (30, '../img/goodslist/30_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '维生素C咀嚼片', 7867.00, 78, 851, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (31, '../img/goodslist/31_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '维生素C片(套装)600mg*100s*2', 6.00, 45, 222, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (32, '../img/goodslist/32_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '维生素B族片两瓶套组 550mg*100片*2', 486.00, 12, 333, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (33, '../img/goodslist/11_200x200.jpg', ' ', '银色多维多种维生素矿物质片（原名：老年多维）1.5g/片 × 60片', 846.00, 78, 444, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (34, '../img/goodslist/12_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '蛋白粉+鱼油卵磷脂套餐', 786.00, 786, 555, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (35, '../img/goodslist/13_200x200.jpg', ' ', '蛋白质粉(小罐)', 456.00, 8768, 4586, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (36, '../img/goodslist/5_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '胶原蛋白维生素C维生素E粉3g*20袋', 87.00, 5, 1245, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (37, '../img/goodslist/5_200x200.jpg', ' ', '牛初乳粉 500mg*60袋', 456.00, 786, 999, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (38, '../img/goodslist/20_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '多种维生素咀嚼片(儿童型)60片', 3454.00, 56, 4444, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (39, '../img/goodslist/21_200x200.jpg', ' ', '蛋白粉450g 两罐组', 453.00, 8, 3333, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (40, '../img/goodslist/22_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '螺旋藻片 600mg*120片', 7.00, 786, 566, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (41, '../img/goodslist/23_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', 'R胶原蛋白天然维生素E片', 98.00, 7, 1112, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (42, '../img/goodslist/24_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '辅酶Q10天然维生素E软胶囊 60粒', 53.00, 9, 2222, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (43, '../img/goodslist/25_200x200.jpg', NULL, '多种维生素咀嚼片(青少年型)', 98.00, 4, 4563, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (44, '../img/goodslist/26_200x200.jpg', ' ', '胶原软骨素钙片90片 两瓶组', 786.00, 6, 65, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (45, '../img/goodslist/27_200x200.jpg', ' ', '蜂胶软胶囊60粒 两瓶组', 9.00, 45, 666, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (46, '../img/goodslist/28_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '褪黑素片 两瓶组', 13.00, 45, 45, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (47, '../img/goodslist/5_200x200.jpg', ' ', '天然维生素E软胶囊套组500mg*60片*2', 78.00, 69, 782, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (48, '../img/goodslist/6_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '蜂胶软胶囊+蛋白质粉(小罐)*2 组合装 60粒+150g*2', 78.00, 754, 777, '广东汤臣倍健生物科技股份有限公司');
INSERT INTO `goodslist` VALUES (49, '../img/goodslist/7_200x200.jpg', ' ', '葡萄籽C加E+养生堂C加E 套装', 4565.00, 27, 456, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (50, '../img/goodslist/8_200x200.jpg', '<span class=\"sgz\"> 加价购</span>', '无限能西洋参胶囊 590mg*30粒', 656.00, 12, 888, '汤臣倍健股份有限公司');
INSERT INTO `goodslist` VALUES (51, '../img/goodslist/10_200x200.jpg', '<span class=\"sgz\"> 赠品</span>', '无限能三七丹参胶囊 450mg*30粒', 455354.00, 2, 1111, '广东汤臣倍健生物科技股份有限公司');

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
