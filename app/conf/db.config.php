<?php
/**
 +------------------------------------------------------------------------------
 * 数据库配置
 +------------------------------------------------------------------------------
 * @version   1.9
 * @author    WangXian
 * @filename db.config.php
 * @creation date 2010-7-12 11:19:22
 * @modified date 2015-07-15 09:17:05
 +------------------------------------------------------------------------------
 */

return array
(
    // default
    'default'=>
    array
    (
        'host'          => '127.0.0.1',
        'user'          => 'user',
        'password'      => '',
        'dbname'        => '',
        'port'          => '',
        'tb_prefix'     => 't_'
    ),

    // master
    'master'=>
    array
    (
        'host'          => '127.0.0.1',
        'user'          => 'user',
        'password'      => '',
        'dbname'        => '',
        'port'          => '',
        'tb_prefix'     => 't_'
    ),

    // salve
    'slave'=>
    array
    (
        'host'          => '',
        'user'          => '',
        'password'      => '',
        'dbname'        => '',
        'port'          => '',
        'tb_prefix'     => 't_'
    )
);


