<?php
/**
 * @Author: 卓文理
 * @Date:   2015-07-29 22:02:53
 * @Last Modified by:   卓文理
 * @Last Modified time: 2015-07-29 22:11:02
 */

error_reporting ( E_ALL );

$dir    = '/home/zhuowenli.github.io/';
$handle = popen('cd '.$dir.' && git pull origin master 2>&1','r');
$read   = stream_get_contents($handle);

printf($read);
pclose($handle);