<?php
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$usrname = $_POST['usrname'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$user_password = $_POST['password'];
$re_password = $_POST['re_password'];

include("dbconfig.php");
$con = mysqli_connect($host,$username,$password,$dbname);

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {    //checks if email is Kean email, not needed but can remove later
    $netID = explode('@', $email);
    $domain = array_pop($netID);
    $domain = strtolower($domain);
    if ($domain != 'kean.edu') {
        die("Please register using a '@kean.edu' email \n");
    }
}

if ($user_password != $re_password) {   //verifys thats passwords match
    echo "Your Passwords do not match please go back and enter matching passwords \n";
    echo "<br><a href='create_profile.html'>Go Back</a> \n";
    die();
}
echo "Welcome $fname \n"; //not needed, can remove later

$sql_dupe_email = "SELECT count(*)exist from 2022S_CPS3961_01.Users where email = '$email'";
$result_dupe_email = mysqli_query($con, $sql_dupe_email);

if($result_dupe_email) {    //checks if the email is already in the DB
    if (mysqli_num_rows($result_dupe_email) > 0) {
        while($row = mysqli_fetch_array($result_dupe_email)) {
            $exists = $row["exist"];
            if($exists == 1) {
                die("<br><b>That email already has a account regisered!</b>");
            }
        }
    }
}
else {
    die("Something wrong with your SQL" . mysqli_error($con));
}

$sql_dupe_username = "SELECT count(*)exist from 2022S_CPS3961_01.Users where username = '$usrname'";
$result_dupe_username = mysqli_query($con, $sql_dupe_username);

if($result_dupe_username) { //checks if username is already taken 
    if (mysqli_num_rows($result_dupe_username) > 0) {
        while($row = mysqli_fetch_array($result_dupe_username)) {
            $exists = $row["exist"];
            if($exists == 1) {
                die("<br><b>That username already exists!</b>");
            }
        }
    }
}
else {
    die("Something wrong with your SQL" . mysqli_error($con));
}

$sql_insert_users = "insert into 2022S_CPS3961_01.Users (email, username, password, date_created) 
    values('$email', '$usrname', '$user_password', current_timestamp())";
$result_insert_users = mysqli_query($con, $sql_insert_users); //inserts user info into Users table

if(!$result_insert_users) {
   die("Unable to insert user into db");    //Will remove later, not needed
}

$sql_get_info = "SELECT user_id, date_created from 2022S_CPS3961_01.Users where email = '$email'";
$result_get_info = mysqli_query($con, $sql_get_info); //retrieves user_id and date_created to use

if($result_get_info) {
    if (mysqli_num_rows($result_get_info) > 0) {
        while($row = mysqli_fetch_array($result_get_info)) {
            $user_id = $row["user_id"];
            $date_created = $row["date_created"];
        }
    }
}
else {
    die("Something wrong with your SQL" . mysqli_error($con));
}

$sql_insert_user_profile = "insert into 2022S_CPS3961_01.User_profile 
    values('$user_id', '$fname', '$lname', '$dob', '$gender')";
$result_insert_user_profile = mysqli_query($con, $sql_insert_user_profile); //inserts user info into User_profile table

if(!$result_insert_user_profile) {
    echo "<br>Unable to insert $usrname in to User_profile table";
}

$date_created_str = strtotime($date_created);
$exp_date = strtotime("+7 day", $date_created_str);
$exp_date_str = date('M d, Y', $exp_date);

$key = substr(md5(microtime()),rand(0,26),6); //generates random key
$sql_insert_activation = "insert into 2022S_CPS3961_01.Activation_keys
    values('$user_id', '$key', DATE_ADD(NOW(), INTERVAL 7 DAY))";
$result_insert_activation = mysqli_query($con, $sql_insert_activation); //inserts key and expiration date into Activation_keys table

if(!$result_insert_activation) {
    echo "<br>Unable to insert $usrname's activation key into Activation_keys table";
}

$email_msg = "Your activation key is: \r\n $key \r\n If not activated by $exp_date_str your account will be deleted.";  
$from = "Dan from Resturant Randomizer<veradan@kean.edu>\n";    //This can be changed later to something better, and we can maybe make a support email
$headers = 'From: ' . $from . "\r\n";
$email_subject = "Resturant Randomizer Activation Key";

mail($email, $email_subject, $email_msg, $headers); //emails user their activation key
?>
