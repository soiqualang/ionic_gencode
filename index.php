<?php
// Show lỗi
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

include('func.php');


// database_service('bieughi_n2');
// app_routing_module('bieughi_n2');
// app_component_ts('bieughi_n2');
// app_component_html('bieughi_n2','DẤU CHÂN VOI');
// home_page_html('bieughi_n2','Dấu chân voi');
// update_sql('bieughi_n2');
// add_page_ts('bieughi_n2','Tên tuyến điều tra, giám sát');
// add_page_html('bieughi_n2','Dấu chân voi');
// list_page_ts('bieughi_n2');
// list_page_html('bieughi_n2','Dấu chân voi','Tên tuyến điều tra, giám sát','Thời gian bắt đầu','Tên khu vực điều tra, giám sát','Ghi chú');
view_page_ts('bieughi_n2');
?>