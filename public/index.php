<?php
/*
/------------------------------------------------------------------------------
/
/ ePHP is free software: you can redistribute it and/or modify
/ it under the terms of the GNU Lesser General Public License as published by
/ the Free Software Foundation, either version 3 of the License, or
/ (at your option) any later version.

/ ePHP is distributed in the hope that it will be useful,
/ but WITHOUT ANY WARRANTY; without even the implied warranty of
/ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/ GNU Lesser General Public License for more details.
/
/ You should have received a copy of the GNU Lesser General Public License
/ along with ePHP.  If not, see <http://www.gnu.org/licenses/>.
/
/------------------------------------------------------------------------------
/ @version  4.2
/ @author   WangXian
/ @package  ePHP
/ @link	 http://github.com/wangxian/ePHP/
/ @E-mail   wo#wangxian.me
/ @creation date 2010-10-17 18:09:17
/ @modified date 2015-07-15 08:50:00
/------------------------------------------------------------------------------
*/

// 判断当前的运行环境
switch ($_SERVER['SERVER_NAME'])
{
    // 本地环境，域名列表
    case 'localhost':
    case 'seed.ephp.io':
        $run_env = 'local';
        break;

    // 开发环境，域名列表
    case 'api.dev.domain.com':
        $run_env = 'dev';
        break;

    // 预上线，域名列表
    case 'api.pre.domain.com':
        $run_env = 'pre';
        break;

    // 正式环境，默认
    default:
        $run_env = 'prod';
        break;
}
// 运行环境
define('RUN_ENV', $run_env);

// 时区设置。 建议在php.ini设置，如果虚拟主机的时区设置不对，可取消注释。
// date_default_timezone_set("PRC");

// 项目路径
define("APP_PATH", realpath('../app'));

// framework路径
define('FW_PATH', '../ePHP');

// 加载框架入口
include FW_PATH . '/ePHP.php';

// 系统实例化及调度开始
$app = new app();

// 运行程序
$app->run();

