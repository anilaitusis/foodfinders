<?php
//updates user location cookies
$ip = $_SERVER['REMOTE_ADDR'];  //retrieves user IP
setcookie("ip", $ip, time() + 60*60);

$geo_url = 'https://freegeoip.app/json/' . $ip; //retrieves user location inforamtion using their ip
$geo_file = file_get_contents($geo_url);
$geo_arr = json_decode($geo_file, true);
$country = $geo_arr['country_name'];
setcookie("country", $country, time() + 60*60);
$country_code = $geo_arr['country_code'];
setcookie("country_code", $country_code, time() + 60*60);
$zip = $geo_arr['zip_code'];
setcookie("zip", $zip, time() + 60*60);
$lat = $geo_arr['latitude'];
setcookie("lat", $lat, time() + 60*60);
$lon = $geo_arr['longitude'];
setcookie("lon", $lon, time() + 60*60);
$city = $geo_arr['city'];
setcookie("city", $city, time() + 60*60);
$state = $geo_arr['region_name'];
setcookie("state", $state, time() + 60*60);
?>
