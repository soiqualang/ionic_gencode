<?php
function database_service($tblname){
$txt = file_get_contents('templates/database.service.ts');
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
  thuoctinh: string,
  gpsinfo: string
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
    $txt = file_get_contents('templates/app-routing.module.ts');
    
    $path=str_replace('_','-',$tblname);
    $txt = str_replace("path: 'view-".$path."', loadChildren","path: 'list-".$path."/:maso', loadChildren",$txt);
    echo $txt;
}

function app_component_ts($tblname){
  $path=str_replace('_','-',$tblname);
  $txt = file_get_contents('templates/app.component.ts');
  $loc0="
//-----LOC0--------//

  public ".$tblname."_collect = [
    {
      title: 'Danh sách thu thập',
      url: 'list-".$path."',
      icon: 'list'
    },
    {
      title: 'Thu thập dữ liệu',
      url: '/add-".$path."',
      icon: 'add-circle'
    }
  ];";

  $txt=str_replace("//-----LOC0--------//",$loc0,$txt);
  echo $txt;
}

function app_component_html($tblname,$title){
  $txt = file_get_contents('templates/app.component.html');
  $loc0='
<!-- //-----LOC0--------// -->

              <ng-container *ngIf="login.check_permissions(\'mb_trongtrot_dichbenh\',\'xem\')">
                <ion-item-divider>
                  <ion-label color="primary">
                    <b>'.$title.'</b>
                  </ion-label>
                </ion-item-divider>
                <ion-menu-toggle auto-hide="false" *ngFor="let p of '.$tblname.'_collect">
                  <ion-item [routerDirection]="\'root\'" [routerLink]="[p.url]">
                    <ion-icon slot="start" [name]="p.icon"></ion-icon>
                    <ion-label>
                      {{p.title}}
                    </ion-label>
                  </ion-item>
                </ion-menu-toggle>
              </ng-container>';

  $txt=str_replace("<!-- //-----LOC0--------// -->",$loc0,$txt);
  echo $txt;
}

function home_page_html($tblname,$title){
  $txt = file_get_contents('templates/home.page.html');
  $path=str_replace('_','-',$tblname);

  $loc0='
<!-- //-----LOC0--------// -->

      <ion-card-header>
        <ion-card-title>'.$title.'</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item button (click)="db.go2page(\'list-'.$path.'\')">
        <ion-icon name="list" slot="start"></ion-icon>
        <ion-label>Số liệu đã thu thập</ion-label>
        <ion-button fill="outline" slot="end">Xem</ion-button>
        </ion-item>
        <ion-item button (click)="db.go2page(\'add-'.$path.'\')">
        <ion-icon name="add-circle" slot="start"></ion-icon>
        <ion-label>Thêm số liệu</ion-label>
        <ion-button fill="outline" slot="end">Thêm</ion-button>
        </ion-item>
      </ion-card-content>';

  $txt=str_replace("<!-- //-----LOC0--------// -->",$loc0,$txt);
  echo $txt;
}

function update_sql($tblname){
  $txt = file_get_contents('templates/db_v2_min.sql');
  $newtbl='CREATE TABLE IF NOT EXISTS "'.$tblname.'" ( "id" integer NULL, "maso" text NOT NULL PRIMARY KEY, "x" real, "y" real, "maso_nguoidung" text NULL, "takedate" text NULL, "trangthai" integer NULL, "thuoctinh" text NULL );';

  echo $txt.$newtbl;
}

function add_page_ts($tblname,$attr1){
  $txt = file_get_contents('templates/add-bieughi-n1.page.ts');
  $path=str_replace('_','-',$tblname);
  $upcase=str_replace('_',' ',$tblname);
  $upcase=ucwords($upcase);
  $upcase=str_replace(' ','',$upcase);

  // @Component
  $txt = str_replace('bieughi-n1',$path,$txt);

  // bieughi_n1
  $txt = str_replace('bieughi_n1',$tblname,$txt);

  // AddBieughiN1Page
  $txt = str_replace('AddBieughiN1Page','Add'.$upcase.'Page',$txt);

  // Tên hiện trong thông báo insert
  $txt = str_replace('Tên tuyến điều tra, giám sát',$attr1,$txt);

  echo $txt;
}

function add_page_html($tblname,$title){
  $txt = file_get_contents('templates/add-bieughi-n1.page.html');
  $path=str_replace('_','-',$tblname);
  $upcase=str_replace('_',' ',$tblname);
  $upcase=ucwords($upcase);
  $upcase=str_replace(' ','',$upcase);

  // <ion-title>Số lượng voi</ion-title>
  $txt = str_replace('Số lượng voi',$title,$txt);

  // bieughi_n1
  $txt = str_replace('bieughi_n1',$tblname,$txt);

  echo $txt;
}

function list_page_ts($tblname){
  $txt = file_get_contents('templates/list-bieughi-n1.page.ts');
  $path=str_replace('_','-',$tblname);
  $upcase=str_replace('_',' ',$tblname);
  $upcase=ucwords($upcase);
  $upcase=str_replace(' ','',$upcase);

  // @Component
  $txt = str_replace('bieughi-n1',$path,$txt);

  // bieughi_n1
  $txt = str_replace('bieughi_n1',$tblname,$txt);

  // AddBieughiN1Page
  $txt = str_replace('ListBieughiN1Page','List'.$upcase.'Page',$txt);

  echo $txt;
}

function list_page_html($tblname,$title,$attr){
  $txt = file_get_contents('templates/list-bieughi-n1.page.html');
  $path=str_replace('_','-',$tblname);
  $upcase=str_replace('_',' ',$tblname);
  $upcase=ucwords($upcase);
  $upcase=str_replace(' ','',$upcase);

  $attr_arr=explode(";",$attr);

  // <ion-title>Số lượng voi</ion-title>
  $txt = str_replace('Số lượng voi',$title,$txt);

  // bieughi_n1
  $txt = str_replace('bieughi_n1',$tblname,$txt);

  // bieughi-n1
  $txt = str_replace('bieughi-n1',$path,$txt);

  $txt = str_replace('Tên tuyến điều tra, giám sát',$attr_arr[0],$txt);
  $txt = str_replace('Thời gian bắt đầu',$attr_arr[1],$txt);
  $txt = str_replace('Tên khu vực điều tra, giám sát',$attr_arr[2],$txt);
  $txt = str_replace('Ghi chú',$attr_arr[3],$txt);

  echo $txt;
}

function view_page_ts($tblname){
  $txt = file_get_contents('templates/view-bieughi-n1.page.ts');
  $path=str_replace('_','-',$tblname);
  $upcase=str_replace('_',' ',$tblname);
  $upcase=ucwords($upcase);
  $upcase=str_replace(' ','',$upcase);

  // @Component
  $txt = str_replace('bieughi-n1',$path,$txt);

  // bieughi_n1
  $txt = str_replace('bieughi_n1',$tblname,$txt);

  // AddBieughiN1Page
  $txt = str_replace('ViewBieughiN1Page','View'.$upcase.'Page',$txt);

  echo $txt;
}

function view_page_html($tblname,$title){
  $txt = file_get_contents('templates/view-bieughi-n1.page.html');
  $path=str_replace('_','-',$tblname);
  $upcase=str_replace('_',' ',$tblname);
  $upcase=ucwords($upcase);
  $upcase=str_replace(' ','',$upcase);

  // Chi tiết điểm thu thập
  $txt = str_replace('Chi tiết điểm thu thập',$title,$txt);

  // bieughi_n1
  $txt = str_replace('bieughi_n1',$tblname,$txt);

  // bieughi-n1
  $txt = str_replace('bieughi-n1',$path,$txt);

  echo $txt;
}

  
?>