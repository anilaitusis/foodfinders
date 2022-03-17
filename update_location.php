<?php
$ip = $_SERVER['REMOTE_ADDR'];
//$ip = getRealIpAddr();
/*
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}
*/
setcookie("ip", $ip, time() + 60*60);

$geo_url = 'https://freegeoip.app/json/' . $ip;
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
/*
//https://itman.in/en/how-to-get-client-ip-address-in-php/#:~:text=%24_SERVER%5B'REMOTE_ADDR'%5D,this%20value%20is%20easily%20spoofed.
function getRealIpAddr() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {  //check ip from share internet 
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {   //to check ip is pass from proxy
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
*/

?>