<?php
if(!isset($_COOKIE['user_id'])) {
    include('set_offline.php');
    die("Please Login");
}
echo "<a href='logout.php'>User Logout</a>";
echo "<br><br>a href='user_home.php'>Go Home</a>";
include('update_cookies.php');
$u_id = $_COOKIE['user_id'];

include"dbconfig.php";
$con = mysqli_connect($host,$username,$password,$dbname);

$sql_rating = "SELECT French, Chinese, Japanese, Italian, Greek, Spanish, Mediterranean,Lebanese, Moroccan, Turkish, 
    Thai, Indian, Korean, Cajun, American, Mexican, Caribbean,German, Russian, Hungarian FROM 2022S_CPS3961_01.Cuisine_pref
    WHERE user_id = $u_id";
$result_rating = mysqli_query($con, $sql_rating);
$first_pref = 0;
$ratings = array();
if($result_rating) {
    if (mysqli_num_rows($result_rating) > 0) {
        while($row = mysqli_fetch_array($result_rating)) {
            $ratings[] = $row['French'];
            $ratings[] = $row['Chinese'];
            $ratings[] = $row['Japanese'];
            $ratings[] = $row['Italian'];
            $ratings[] = $row['Greek'];
            $ratings[] = $row['Spanish'];
            $ratings[] = $row['Mediterranean'];
            $ratings[] = $row['Lebanese'];
            $ratings[] = $row['Moroccan'];
            $ratings[] = $row['Turkish'];
            $ratings[] = $row['Thai'];
            $ratings[] = $row['Indian'];
            $ratings[] = $row['Korean'];
            $ratings[] = $row['Cajun'];
            $ratings[] = $row['American'];
            $ratings[] = $row['Mexican'];
            $ratings[] = $row['Caribbean'];
            $ratings[] = $row['German'];
            $ratings[] = $row['Russian'];
            $ratings[] = $row['Hungarian']; 
        }
    }
    else {
        $first_pref = 1;
    }
}
else {
	die("<br>Something wrong with the SQL." . mysqli_error($con));	
}

$sql_cuisine = "SELECT cuisine_type FROM 2022S_CPS3961_01.Cuisine_list";
$result_cuisine = mysqli_query($con, $sql_cuisine);

echo "<br>Please give each type of Cuisine a rating from 0 to 3
    <br><b>0:</b> Not interested in this type of Cuisine
    <br><b>1:</b> Somewhat interested in trying this type of Cuisine
    <br><b>2:</b> More interested in trying this type of Cuisine
    <br><b>3:</b> Very interested in tying this type of Cuisine";

if($_GET){
    if(isset($_GET['update_success'])) {
        if($_GET['update_success'] == 'success') {
            echo '<br><b>Your preferences have been updated</b>';
        }
        elseif($_GET['update_success'] == 'invalid') {
            echo '<br><b style="color:red">Please enter a number between 0 and 3</b>';
        }    
    } 
}

if($result_cuisine) {
    if (mysqli_num_rows($result_cuisine) > 0) {
        echo "<TABLE border=1> \n";
        echo "<form action='update_rating.php' method='post'>";
        echo "<TR><TH>Cusine Type<TH>Your Rating</TH></TR> \n";
        $i = 0;
	    while($row = mysqli_fetch_array($result_cuisine)) {		
	    	$cuisine_type = $row["cuisine_type"];
            if($first_pref == 1) {
                echo "<TR><TD>$cuisine_type<TD>
                <input type='text' value='0' name='cuis_rating[]'>
                </TD></TR>";  
            }
            else {
                echo "<TR><TD>$cuisine_type<TD>
                <input type='text' value='$ratings[$i]' name='cuis_rating[]'> 
                </TD></TR>";
            }
            $i++;
	    }
        echo "</TABLE> \n";
	    mysqli_free_result($result_cuisine);
    }
    else {
        die("No results found");
    }
}
else {
	die("<br>Something wrong with the SQL." . mysqli_error($con));	
}
echo "<input type='submit' value='Update Prefrences'>";
echo "</form>";

echo "<br><br><b>Update Password</b>";
echo "<form action = 'update_password.php' method = 'post'>";
echo "Current password: <input type = 'password' name='old_password' required>";
echo "<br>New password: <input type = 'password' name='new_password' required>";
echo "<br>Reenter new password: <input type = 'password'  name='re_password' required>";
echo "<br><input type='submit' value='Update Password'>";
echo "</form>";

if($_GET){
    if(isset($_GET['pass_success'])) {
        if($_GET['pass_success'] == 'success') {
            echo '<b>Your password has been updated</b><br>';
        }
        elseif($_GET['pass_success'] == 'invalid') {
            echo '<b style="color:red">The password you have entered for your current password is incorrect</b><br>';
        }
        elseif($_GET['pass_success'] == 'not_new') {
            echo '<b style="color:red">Your new password cannot match your current password</b><br>';
        }
        elseif($_GET['pass_success'] == 'mismatch') {
            echo '<b style="color:red">The passwords you have entered do not match</b><br>';
        }
    }
}

echo "<br><b>Set default location</b>";
echo "<form action = 'set_location.php' method = 'post'>";
echo "Address: <input type = 'text' name ='address'>";
echo "<br>City/town: <input type = 'text' name = 'city'>";
echo "<br>*Zipcode: <input type = 'text' name = 'zip' required>";
echo "<br><input type='submit' value='Set Location'>";
echo "</form>";

echo "<br><b>Delete Account</b>";
echo "<form action = 'delete_profile.php' method = 'post'>";
echo "Email/username: <input type = 'text' name = 'username'>";
echo "<br>Password: <input type = 'text' name = 'password'>";
echo "<br><input type='submit' value='Delete Profile'>";
echo "</form>";

?>