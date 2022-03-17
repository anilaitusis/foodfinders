<?php
//displays demo accounts, not needed in final product
include"dbconfig.php";
$con = mysqli_connect($host,$username,$password,$dbname);

$sql = "SELECT * FROM 2022S_CPS3961_01.Users where user_id < 10";
$result = mysqli_query($con, $sql);

if($result) {
    if (mysqli_num_rows($result) > 0) {
        echo "Test Logins";
        echo "<TABLE border=1> \n";
        echo "<TR><TH>User ID<TH>Email<TH>Password<TH>Last Login</TH></TR> \n";
	    while($row = mysqli_fetch_array($result)) {		
	    	$user_id = $row["user_id"];
		    $email = $row["email"];
		    $password = $row["password"];
            $last_login = $row["last_login"];
            echo "<TR><TD>$user_id<TD>$email<TD>$password<TD>$last_login</TD></TR>";
	    }
        echo "</TABLE> \n";
	    mysqli_free_result($result);
    }
    else {
        die("No results found");
    }
}
else {
	die("<br>Something wrong with the SQL." . mysqli_error($con));	
}
?>
