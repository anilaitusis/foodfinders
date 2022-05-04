<?php
if(isset($_POST['submit_email']))
{
    include("dbconfig.php");
    $con = mysqli_connect($host,$username,$password,$dbname);
    $emailId = $_POST['email'];

    
}
?>