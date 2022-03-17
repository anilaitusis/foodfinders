<?php
include("dbconfig.php");
$con = mysqli_connect($host,$username,$password,$dbname);

$activation_key = $_POST['active_key'];
$user_id = $_POST['user_id'];

$sql_active = "SELECT activation_key FROM 2022S_CPS3961_01.Activation_keys WHERE $user_id = user_id";
$result_active = mysqli_query($con, $sql_active); 

$activation = 0;

if($result_active) {
    if (mysqli_num_rows($result_active) > 0) {
        while($row = mysqli_fetch_array($result_active)) {
            $user_key = $row['activation_key'];
            if($user_key == $activation_key) {
                $sql_update_active = "UPDATE 2022S_CPS3961_01.Users SET active = 1 WHERE user_id = $user_id";
                $result_update_active = mysqli_query($con, $sql_update_active); 
                if(!$result_update_active) {
                    die("<br>Something wrong with the SQL." . mysqli_error($con));                
                }
                $sql_delete_active = "DELETE FROM 2022S_CPS3961_01.Activation_keys WHERE user_id = $user_id";
                $result_delete_active = mysqli_query($con, $sql_delete_active);
                if(!$result_delete_active ) {
                    die("<br>Something wrong with the SQL." . mysqli_error($con));                
                }
            }
            else {
                die("The activation key you have entered is incorrect");
            }
            header("Location: http://obi.kean.edu/~veradan/CPS3962/user_home.php");
            exit;
        }
    }
}
?>