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

function app_component_ts($tblname){
  $path=str_replace('_','-',$tblname);
  $txt = file_get_contents('app.component.ts');
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
  $txt = file_get_contents('app.component.html');
  $loc0='
<!-- //-----LOC0--------// -->

              <ng-container *ngIf="login.check_permissions(\'mb_trongtrot_dichbenh\',\'xem\')">
                <ion-item-divider>
                  <ion-label color="primary">
                    <b>'.$title.'</b>
                  </ion-label>
                </ion-item-divider>
                <ion-menu-toggle auto-hide="false" *ngFor="let p of '.$tblname.'_collect">
                  <ion-item [routerDirection]="root" [routerLink]="[p.url]">
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
  $txt = file_get_contents('home.page.html');
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




  
?>