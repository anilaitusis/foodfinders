<?php
//deletes user's cookies that are used to verify they are logged in
if (isset($_COOKIE['user_id'])) {
    echo"You have successfully logged out!<br>";
    setcookie("user_id",'',time() - 60);
    setcookie("ip", $ip, time() - 60);
    setcookie("country", $country, time() - 60);
    setcookie("country_code", $country_code, time() - 60);
    setcookie("zip", $zip, time() - 60);
    setcookie("lat", $lat, time() - 60);
    setcookie("lon", $lon, time() - 60);
    setcookie("city", $city, time() - 60);
    setcookie("state", $state, time() - 60);
}
else {
    die("Not able to logout");
}
echo "<br><a href='index.html'>Return to project homepage</a>"; //brings them back to login page
?>
