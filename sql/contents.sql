-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2020 年 03 月 12 日 12:21
-- 服务器版本: 5.5.47
-- PHP 版本: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `socket_chat`
--

-- --------------------------------------------------------

--
-- 表的结构 `contents`
--

CREATE TABLE IF NOT EXISTS `contents` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '流水号',
  `content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '消息内容',
  `to_user` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '消息接收者',
  `from_user` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '消息发送者',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '消息时间',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态 0未删除 , 1已删除',
  `type` int(2) NOT NULL COMMENT '消息的内容类型：0 文本 1图片 2 语音',
  `from_type` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '发送者的类型 server , client',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
