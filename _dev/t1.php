<?php
// Show lỗi
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

function gen_database_service(){
    $txt = file_get_contents('database.service.ts');
    // echo $txt;
    
    $arr1=[];
    
    $loc1='
    //-----LOC0--------//
    
    export interface bieughi_n1 {
      id: number, 
      maso: string,
      x: number,
      y: number,
      maso_nguoidung: string,
      takedate: string,
      trangthai: number,
      thuoctinh: string
    }';
    
    $loc2='
    //-----LOC1--------//
    
    bieughi_n1_arr = new BehaviorSubject([]);';
    
    $loc3='
    //-----LOC2--------//
    
    this.loadbieughi_n1();';
    
    $loc4="
    //-----LOC3--------//
    
    getbieughi_n1(): Observable<bieughi_n1[]> {
      return this.bieughi_n1_arr.asObservable();
    }
    
    loadbieughi_n1(){
      return this.table_to_array_order('bieughi_n1','takedate','ASC').then(data => {
        let bieughi_n1_arr: bieughi_n1[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            bieughi_n1_arr.push(data.rows.item(i));
          }
        }
        this.bieughi_n1_arr.next(bieughi_n1_arr);
      });
    }";
    
    array_push($arr1,$loc1,$loc2,$loc3,$loc4);
    
    // Thêm nội dung
    for($i=0;$i<count($arr1);$i++){
        $txt=str_replace("//-----LOC".$i."--------//",$arr1[$i],$txt);
    }
    echo $txt;
}

gen_database_service();
?>