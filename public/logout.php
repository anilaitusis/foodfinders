<?php
//deletes user's cookies that are used to verify they are logged in
if (isset($_COOKIE['user_id'])) {
    echo"You have successfully logged out!<br>";
    setcookie("user_id",'',time() - 60);
    setcookie("ip", '', time() - 60);
    setcookie("country", '', time() - 60);
    setcookie("zip", '', time() - 60);
    setcookie("lat", '', time() - 60);
    setcookie("lon", '', time() - 60);
    setcookie("city", '', time() - 60);
    setcookie("state", '', time() - 60);
}
else {
    die("Not able to logout");
}
echo "<br><a href='index.html'>Return to project homepage</a>";
?>
