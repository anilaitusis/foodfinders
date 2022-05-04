<?php
$u_id = $_COOKIE["user_id"];
setcookie("user_id",$u_id,time() + 60*60);
?>