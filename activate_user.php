<?php
//Used on users's first login to confirm their email
include("dbconfig.php");
$con = mysqli_connect($host,$username,$password,$dbname);

$activation_key = $_POST['active_key'];
$user_id = $_POST['user_id'];

$sql_active = "SELECT activation_key FROM 2022S_CPS3961_01.Activation_keys WHERE $user_id = user_id";
$result_active = mysqli_query($con, $sql_active); 

if($result_active) {
    if (mysqli_num_rows($result_active) > 0) {
        while($row = mysqli_fetch_array($result_active)) {
            $user_key = $row['activation_key'];
            if($user_key == $activation_key) {      //checks if the key the user entered matches the one in database corresponds with thier user_id
                $sql_update_active = "UPDATE 2022S_CPS3961_01.Users SET active = 1 WHERE user_id = $user_id";   //changes the active value in DB to 1 instead of 0
                $result_update_active = mysqli_query($con, $sql_update_active); 
                if(!$result_update_active) {
                    die("<br>Something wrong with the SQL." . mysqli_error($con));                
                }
                $sql_delete_active = "DELETE FROM 2022S_CPS3961_01.Activation_keys WHERE user_id = $user_id"; //deleted the user from the Activation_keys table so their acct won't be deleted
                $result_delete_active = mysqli_query($con, $sql_delete_active);
                if(!$result_delete_active ) {
                    die("<br>Something wrong with the SQL." . mysqli_error($con));                
                }
            }
            else {
                die("The activation key you have entered is incorrect");
            }
            setcookie("user_id",$user_id,time() + 60*60);   
            setcookie("username",$c_username,time() + 60*60);
            include("update_last_login.php");
            include("update_location.php"); //updates user location cookies
            header("Location: http://obi.kean.edu/~veradan/CPS3962/user_home.php"); //brings user to user_home.php once logged in, can bring them to an HTML page if better option
        }
    }
}
?>
