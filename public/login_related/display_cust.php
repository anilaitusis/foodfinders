<?php
include("profiles.php");
echo "Customer login test samples:";
echo "<br><TABLE border=1>";
echo "<TR><TH>Email<TH>Password</TH></TR>";
for($i = 0; $i < $email_ct; $i++) {
    echo "<TR><TD>$emails[$i]<TD>$passwords[$i]</TD></TR>";
}
echo  "</TABLE>";
?>