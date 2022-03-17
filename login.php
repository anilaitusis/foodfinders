<?php
//Used to log the user in 
$email_username=$_POST['email'];
$cust_password=$_POST['password'];

include("dbconfig.php");
$con = mysqli_connect($host,$username,$password,$dbname);

$sql = "SELECT user_id, email, username, password, active, last_login FROM 2022S_CPS3961_01.Users where email = '$email_username' or username = '$email_username'";
$result = mysqli_query($con, $sql); //retrieves user info from Users table that match correspond with the email/username they entered

if($result) {
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_array($result)) {
            $user_id = $row['user_id'];
            $c_email = $row['email'];
            $c_username = $row['username'];
            $c_password = $row['password'];
            $c_active = $row['active'];
            $last_login = $row['last_login'];
            if($c_password == $cust_password){  //checks if the password they entered matches the one in the DB
                if($c_active == 0) {    //checks if user is active, if not requests their activation key
                    echo "<form action='activate_user.php' method='post'>
                        <br>Activation key: <input type='text' name='active_key' required='required'>
                        <input type='hidden' name='user_id' value='$user_id'>
                        <input type='submit' value='Submit'>";
                }
                setcookie("user_id",$user_id,time() + 60*60);   //sets $user_id and $c_username as cookies
                setcookie("username",$c_username,time() + 60*60);
                include("update_last_login.php"); //updates the last_login in the User table
                include("update_location.php"); //updates the user location cookies        
                header("Location: http://obi.kean.edu/~veradan/CPS3962/user_home.php"); //brings user to user_home.php once logged in, can bring them to an HTML page if better option
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
