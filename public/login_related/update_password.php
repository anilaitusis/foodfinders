<?php
if(!isset($_COOKIE['user_id'])) {
    include('set_offline.php');
    die("Please Login");
}
include('update_cookies.php');
echo "<a href='logout.php'>User Logout</a>";
$u_id = $_COOKIE["user_id"];
$old_password = $_POST["old_password"];
$new_password = $_POST["new_password"];
$re_password = $_POST["re_password"];

include"dbconfig.php";
$con = mysqli_connect($host,$username,$password,$dbname);

$sql_get_pass = "select password from 2022S_CPS3961_01.Users where user_id = $u_id";
$result_get_pass =  mysqli_query($con, $sql_get_pass);
if($result_get_pass) {
    if (mysqli_num_rows($result_get_pass) > 0) {
        while($row = mysqli_fetch_array($result_get_pass)) {
            $pass = $row['password'];
        }
    }
}
else {
	die("<br>Something wrong with the SQL." . mysqli_error($con));	
}


$pass_success = '';
if($old_password != $pass) {
    $pass_success = "invalid";
    header("Location: http://obi.kean.edu/~veradan/CPS3962/edit_preferences.php?pass_success=".$pass_success);
    exit();
}
elseif($new_password == $old_password) {
    $pass_success = "not_new";
    header("Location: http://obi.kean.edu/~veradan/CPS3962/edit_preferences.php?pass_success=".$pass_success);
    exit();
}
elseif($new_password != $re_password) {
    $pass_success = "mismatch";
    header("Location: http://obi.kean.edu/~veradan/CPS3962/edit_preferences.php?pass_success=".$pass_success);
    exit(); 
}
else {
    $sql_update_pass = "UPDATE 2022S_CPS3961_01.Users
        SET password = '$new_password'
        where user_id = $u_id";
    $result_update_pass = mysqli_query($con, $sql_update_pass);
    if(!$result_update_pass){ 
        echo "<br>Something wrong with sql_update. " . mysqli_error($con);
    }
    else {
        $pass_success = "success";
        header("Location: http://obi.kean.edu/~veradan/CPS3962/edit_preferences.php?pass_success=".$pass_success);
        exit(); 
    }
}

?>