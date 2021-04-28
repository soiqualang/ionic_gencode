<?php
// Show lỗi
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

include('func.php');


// database_service('bieughi_n2');
// app_routing_module('bieughi_n2');
app_component('bieughi_n2');
?>