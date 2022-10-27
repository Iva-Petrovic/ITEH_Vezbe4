<?php
require "../dbBroker.php";
require "../model/prijava.php";
#isset = ako je poslato
if(isset($_POST['predmet']) && isset($_POST['katedra']) #post zahtevi iz modala
&& isset($_POST['sala']) && isset($_POST['datum'])){
        $prijava = new Prijava(null, $_POST['predmet'],$_POST['katedra'],$_POST['sala'],$_POST['datum']);
        $status = Prijava::add($prijava, $conn);
        if ($status){
            echo 'Success'; #ako status uspesno prodje - nije null
        }else{
            echo $status;
            echo 'Failed';
        }
    }

?>