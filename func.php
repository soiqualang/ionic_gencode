<?php
function database_service($tblname){
$txt = file_get_contents('database.service.ts');
// echo $txt;

$arr1=[];

$loc1='
//-----LOC0--------//

export interface '.$tblname.' {
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

  '.$tblname.'_arr = new BehaviorSubject([]);';

$loc3='
//-----LOC2--------//

    this.load'.$tblname.'();';

$loc4="
//-----LOC3--------//

get".$tblname."(): Observable<".$tblname."[]> {
  return this.".$tblname."_arr.asObservable();
}

load".$tblname."(){
  return this.table_to_array_order('".$tblname."','takedate','ASC').then(data => {
    let ".$tblname."_arr: ".$tblname."[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        ".$tblname."_arr.push(data.rows.item(i));
      }
    }
    this.".$tblname."_arr.next(".$tblname."_arr);
  });
}";

array_push($arr1,$loc1,$loc2,$loc3,$loc4);

// Thêm nội dung
for($i=0;$i<count($arr1);$i++){
    $txt=str_replace("//-----LOC".$i."--------//",$arr1[$i],$txt);
}
echo $txt;
}

function app_routing_module($tblname){
    $txt = file_get_contents('app-routing.module.ts');
    
    $path=str_replace('_','-',$tblname);
    $txt = str_replace("path: 'view-".$path."', loadChildren","path: 'list-".$path."/:maso', loadChildren",$txt);
    echo $txt;
}

function app_component($tblname,$title){

}


?>