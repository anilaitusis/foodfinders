<?php
//Used to log the user in 
$email_username=$_POST['email'];
$cust_password=$_POST['password'];

include("dbconfig.php");
$con = mysqli_connect($host,$username,$password,$dbname);

$sql = "SELECT user_id, email, username, password, last_login FROM 2022S_CPS3961_01.Users where email = '$email_username' or username = '$email_username'";
$result = mysqli_query($con, $sql); //retrieves user info from Users table that match correspond with the email/username they entered

if($result) {
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_array($result)) {
            $user_id = $row['user_id'];
            $c_email = $row['email'];
            $c_username = $row['username'];
            $c_password = $row['password'];
            $last_login = $row['last_login'];
            setcookie("user_id",$user_id,time() + 60*60);   //sets $user_id and $c_username as cookies
            if($c_password == $cust_password){  //checks if the password they entered matches the one in the DB
                echo "<br>user_id: ".$user_id;
                echo "<br>email: ".$c_email;
                echo "<br>password: ".$c_password;
                setcookie("username",$c_username,time() + 60*60);
                include("update_last_login.php");
                $sql_online = "UPDATE 2022S_CPS3961_01.Users
                SET is_online = 1
                where user_id = $user_id";
                $result_online = mysqli_query($con, $sql_online);
                if(!$result_online){ 
                    echo "<br>Something wrong with sql_update. " . mysqli_error($con);
		}
	       	$host  = $_SERVER['HTTP_HOST'];
                $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
                $extra = 'user_home.php';
                header("Location: http://$host$uri/$extra");
                exit; 	
            }
            else {
                die("Wrong password");
            }
        }
    }
    else {
        die("Login does not exist");
    }
}
else {
    die("<br>Something wrong with the SQL." . mysqli_error($con));
}
mysqli_close($con);
?>
