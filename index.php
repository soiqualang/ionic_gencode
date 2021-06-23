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
// list_page_html('bieughi_n2','Dấu chân voi','Tên tuyến điều tra, giám sát;Thời gian bắt đầu;Tên khu vực điều tra, giám sát;Ghi chú');
// view_page_ts('bieughi_n2');
// view_page_html('bieughi_n2','Dấu chân voi');
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>GenCode 4 IONIC</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h2>GenCode 4 IONIC</h2>
  <form action="/xuly.php">
    <div class="form-group">
      <label for="tbl_name">Tên bảng:</label>
      <input type="text" class="form-control" id="tbl_name" placeholder="bieughi_n2" name="tbl_name">
    </div>
    <div class="form-group">
      <label for="tbl_title">Tiêu đề trang thu thập:</label>
      <input type="text" class="form-control" id="tbl_title" placeholder="Dấu chân voi" name="tbl_title">
    </div>
    <div class="form-group">
      <label for="menu_title">Tên menu thu thập:</label>
      <input type="text" class="form-control" id="menu_title" placeholder="DẤU CHÂN VOI" name="menu_title">
    </div>
    <div class="form-group">
      <label for="attr">Thuộc tính đại diện cho mẫu tin:</label>
      <input type="text" class="form-control" id="attr" placeholder="Tên tuyến điều tra, giám sát" name="attr">
    </div>
    <div class="form-group">
      <label for="attr">Thuộc tính thể hiện ở danh sách (3 thuộc tính, ngăn nhau dấu ;):</label>
      <input type="text" class="form-control" id="attr" placeholder="Tên tuyến điều tra, giám sát;Thời gian bắt đầu;Tên khu vực điều tra, giám sát;Ghi chú" name="attr">
    </div>

    <button type="submit" class="btn btn-default">Submit</button>
    
  </form>
</div>

</body>
</html>
