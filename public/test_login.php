<?php
//Used to log the user in 
if(isset($_POST['email'])) {
    echo "email is set: ".$_POST['email']; 
}
else {
    echo "Email is not set!";
}
if(isset($_POST['password'])) {
    echo "<br>password is set: ".$_POST['password']; 
}
else {
    echo "<br>password is not set!";
}
?>
