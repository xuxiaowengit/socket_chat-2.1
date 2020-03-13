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
-- 表的结构 `servers`
--

CREATE TABLE IF NOT EXISTS `servers` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '流水号',
  `uuid` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户的唯一标识uuid',
  `sid` varchar(128) COLLATE utf8_unicode_ci NOT NULL COMMENT 'scoket连接的id',
  `nick` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '昵称',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态：0 离线 1在线',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '首次连接时间',
  `ip` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '访问ip',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
