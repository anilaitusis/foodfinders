<?php
//Temporay user home, used just to verify the location api worked
echo "<a href='logout.php'>User Logout</a>";
echo "<br>Welcome";
echo "<br>This is the user home";

echo "<br><br>IP: ". $_COOKIE['ip'];
echo "<br>Country: ". $_COOKIE['country'];
echo "<br>Country code: ". $_COOKIE['country_code'];
echo "<br>State: ". $_COOKIE['state'];
echo "<br>City: ". $_COOKIE['city'];
echo "<br>Zipcode: ". $_COOKIE['zip'];
echo "<br>Latitude: ". $_COOKIE['lat'];
echo "<br>Longitude: ". $_COOKIE['lon'];
?>
