import { Component, OnInit } from '@angular/core';
/* DatabaseService */
import { DatabaseService, bieughi_n1 } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';

import { ActivatedRoute, Router } from '@angular/router';
/* Show thong bao */
import { ToastController } from '@ionic/angular';

/* Photo service */
import { PhotoService } from 'src/app/services/photo.service';
import { LoginService } from 'src/app/services/login.service';

import { ModalController } from '@ionic/angular';
import { MapModalPage } from 'src/app/map-modal/map-modal.page';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

declare var window;

@Component({
  selector: 'app-view-bieughi-n1',
  templateUrl: './view-bieughi-n1.page.html',
  styleUrls: ['./view-bieughi-n1.page.scss'],
})
export class ViewBieughiN1Page implements OnInit {

  public window = window;

  bieughi_n1_all: bieughi_n1[] = [];

  bieughi_n1: bieughi_n1=null;
  fid: any;
  tbl_name='bieughi_n1';
  srv_tbl_name='bieughi_n1';
  schema='mobile';
  firstphoto:any;

  ftable={
    phongban: null,
    nguoidung: null,
    hanhchinh_xa: null,
    hanhchinh_xa2: null,
    hanhchinh_huyen: null,
    config: null,
    config2: null,
    config_arr:[]
  };

  hinhanh={
    id: null,
    img: null,
    takedate: null,
    id_congtrinh: null,
    tbl_name: null,
    len: 0
  }
  hinhanh_arr=[];

  dataReturned:any;
  imgarr_len:any;
  first_img:any;
  img_takedate:any;

  locationCoords: any;  

  danhmuc={
    "nhom_arr":[],
    "chuyenmuc_arr":[],
    "mota1_arr":[],
    "mota2_arr":[],
    "thuoctinh_key_arr":[]
  }
  danhmuc2={
    "nhom_arr":[],
    "chuyenmuc_arr":[],
    "mota1_arr":[],
    "mota2_arr":[],
    "thuoctinh_key_arr":[]
  }

  thuoctinh_data={};
  thuoctinh_data_2frm=[];

  // gán '' để mặc định toLowerCase
  thuoctinh_addnew={
    "key":'',
    "value":null
  };

  query:any;


  constructor(private route: ActivatedRoute, public db: DatabaseService, private router: Router, private toast: ToastController,public photoService: PhotoService,private modalController: ModalController,public androidPermissions:AndroidPermissions,public locationAccuracy:LocationAccuracy,public geolocation: Geolocation,public api:ApiService,public login:LoginService) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
  }

  ngOnInit() {
    
    
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        
        // Lấy dữ liệu của riêng record đó
        this.route.paramMap.subscribe(params => {
          this.fid = params.get('maso');
          //this.reloadHinhanh(this.fid,this.tbl_name);
          this.reloadHinhanh(this.fid,'bieughi_n1');
          //get ftable        
          //phongban
          this.db.getfTable('phongban').then(data => {
            this.ftable.phongban=data;
          });



          //load danh mục xong mới load data record đó
          this.db.table_to_arraywhere(this.tbl_name,'maso',this.fid).then(data => {
            this.bieughi_n1 = data.rows.item(0);
            //Cập nhật lại thời gian
            this.bieughi_n1.takedate=this.db.date2pgTimestamp();
            // this.bieughi_n1.maso_nguoidung=this.login.getCookie('maso');
            this.bieughi_n1.maso_nguoidung=window.user_info.maso;
            this.thuoctinh_data=this.api.parsejson(this.bieughi_n1.thuoctinh);
            // this.thuoctinh_data_2frm=this.api.parsejson(this.bieughi_n1.thuoctinh);


            // console.log(this.thuoctinh_data_2frm);

            //config
            this.db.getfTable('config').then(data => {
              this.ftable.config=data;
              // console.log('hahahaha');
              console.log(this.ftable.config);
              // Lấy thuộc tính template
              this.filter_thuoctinh_by_nhom('bieughi_n1');
            });

            // this.danhmuc.thuoctinh_key_arr=Object.keys(this.thuoctinh_data);            
            
            /* // Bỏ key Tên tuyến điều tra, giám sát ra vì thuộc tính đó bắt buộc, tạo field riêng
            this.danhmuc.thuoctinh_key_arr = this.danhmuc.thuoctinh_key_arr.filter(function(item) {
              return item != 'Tên tuyến điều tra, giám sát';
            }); */
          });
        });
      }
    });
    
  }

  ionViewDidEnter() {
    // Lấy dữ liệu của riêng record đó
    this.route.paramMap.subscribe(params => {
      this.fid = params.get('maso');
      //this.reloadHinhanh(this.fid,this.tbl_name);
      this.reloadHinhanh(this.fid,'bieughi_n1');
      //get ftable        
      //phongban
      this.db.getfTable('phongban').then(data => {
        this.ftable.phongban=data;
      });
      //config
      this.db.getfTable('config').then(data => {
        this.ftable.config=data;
        // console.log('hahahaha');
        console.log(this.ftable.config);
        // Lấy thuộc tính template
        this.filter_thuoctinh_by_nhom('bieughi_n1');
      });


      //load danh mục xong mới load data record đó
      this.db.table_to_arraywhere(this.tbl_name,'maso',this.fid).then(data => {
        this.bieughi_n1 = data.rows.item(0);
        //Cập nhật lại thời gian
        this.bieughi_n1.takedate=this.db.date2pgTimestamp();
        // this.bieughi_n1.maso_nguoidung=this.login.getCookie('maso');
        this.bieughi_n1.maso_nguoidung=window.user_info.maso;
        this.thuoctinh_data=this.api.parsejson(this.bieughi_n1.thuoctinh);
        // this.thuoctinh_data_2frm=this.api.parsejson(this.bieughi_n1.thuoctinh);


        /* this.danhmuc.thuoctinh_key_arr=Object.keys(this.thuoctinh_data);
        // Bỏ key Tên tuyến điều tra, giám sát ra vì thuộc tính đó bắt buộc, tạo field riêng
        this.danhmuc.thuoctinh_key_arr = this.danhmuc.thuoctinh_key_arr.filter(function(item) {
          return item != 'Tên tuyến điều tra, giám sát';
        }); */
      });
    });
  }


  filter_thuoctinh_by_nhom(ten:any){
    if(ten){
      this.thuoctinh_data={};
      this.thuoctinh_data_2frm=[];
      this.ftable.config2=this.ftable.config.filter(function(haha:any) {
        // console.log(ten);
        return haha.rows.ten == ten;
      });

      this.thuoctinh_data_2frm=[];
      this.thuoctinh_data_2frm=this.api.parsejson(this.ftable.config2[0].rows.thuoctinh);      
      
      // console.log(this.thuoctinh_data_2frm);

      // Sort thứ tự cột by stt
      this.ftable.config_arr=this.thuoctinh_data_2frm.sort(function(a, b){
        return a.stt - b.stt;
      });
      console.log(this.ftable.config_arr);

    }
  }



  reloadHinhanh(id_congtrinh:any,tbl_name:any){
    this.db.table_to_array_2dk('hinhanh','id_congtrinh',id_congtrinh,'tbl_name',tbl_name).then(data => {
      let len=data.rows.length;
      this.imgarr_len=len;
      if(this.imgarr_len>=1){
        this.first_img=data.rows.item(len-1).img;
        this.img_takedate=data.rows.item(len-1).takedate;
        //alert(this.imgarr_len);

        this.hinhanh.img=data.rows.item(len-1).img;
        this.hinhanh.takedate=data.rows.item(len-1).takedate;
        this.hinhanh.len=len;
      }
    });
  }

  update_table(){
    if (this.bieughi_n1.x == null || this.bieughi_n1.y == null || this.thuoctinh_data['Tên tuyến điều tra, giám sát'] == null) {
      alert('Bạn chưa điền đủ các thông tin bắt buộc!');
    }else{
      // this.bieughi_n1.maso_nguoidung=this.login.getCookie('maso');
      this.bieughi_n1.maso_nguoidung=window.user_info.maso;
      this.bieughi_n1.takedate=this.db.date2pgTimestamp();
      this.bieughi_n1.thuoctinh=this.api.json2str(this.thuoctinh_data);
      // this.bieughi_n1.trangthai=0;
      
      let value=Object.values(this.bieughi_n1);
      let field=Object.keys(this.bieughi_n1);

      this.db.update_table(this.tbl_name,field,value,'maso',this.bieughi_n1.maso).then(async (res) => {
        this.db.loadbieughi_n1();
        let toast = await this.toast.create({
          message: this.thuoctinh_data['Tên tuyến điều tra, giám sát']+' đã được cập nhật',
          duration: 1500
        });
        toast.present();
      });
      this.update_trangthai(0);
    }
    
  }

  update_trangthai(code){
    let field=['trangthai'];
    let value=[code];
    this.db.update_table(this.tbl_name,field,value,'maso',this.bieughi_n1.maso).then(async (res) => {
      this.db.loadbieughi_n1();
      let toast = await this.toast.create({
        message: this.thuoctinh_data['Tên tuyến điều tra, giám sát']+' đã được cập nhật',
        duration: 1500
      });
    });
  }

  delete() {
    /* Xóa hình ảnh */
    let sql='DELETE FROM hinhanh WHERE id_congtrinh='+this.bieughi_n1.maso+' AND tbl_name=\''+this.tbl_name+'\'';
    this.db.runSQL(sql).then(() => {
      /* Xóa độ mặn */
      this.db.delete(this.tbl_name,'maso',this.bieughi_n1.maso).then(() => {
        this.db.loadbieughi_n1();
        // this.router.navigateByUrl('/list-bieughi-n1');
        this.db.go2page('list-bieughi-n1');
      });
    });
  }

  /* Thông tin tọa độ */
  async openModal() {
    /* alert('hahaha'); */
    const modal = await this.modalController.create({
      component: MapModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Bản đồ",
        "gps_lon":this.bieughi_n1.x,
        "gps_lat":this.bieughi_n1.y
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        // console.log(this.dataReturned);
        if(this.dataReturned!== undefined){
          this.bieughi_n1.x=this.dataReturned.gps_lon;
          this.bieughi_n1.y=this.dataReturned.gps_lat;
          console.log(this.dataReturned);
        }
      }
    });
 
    return await modal.present();
  }

  /* Geolocation */
  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
 
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
 
  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;

      this.bieughi_n1.x=resp.coords.longitude;
      this.bieughi_n1.y=resp.coords.latitude;
      this.bieughi_n1['gpsinfo']=this.api.json2str(resp);
      this.bieughi_n1['gpsinfo']=this.api.GPSInfo2Str(resp);
      console.log(this.bieughi_n1['gpsinfo']);
      
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

  postData(){
    this.api.postData(this.bieughi_n1,this.srv_tbl_name,this.schema).then(async (res) => {
      //console.log(res);
      let toast = await this.toast.create({
        message: this.thuoctinh_data['Tên tuyến điều tra, giám sát']+' đã được gửi về hệ thống',
        duration: 1500
      });
      toast.present();
    });

    //Lấy danh sách hình ảnh với id_congtrinh là mã số và tbl_name là bieughi_n1
    //this.fid,'bieughi_n1'
    this.db.table_to_array_2dk('hinhanh','id_congtrinh',this.fid,'tbl_name','bieughi_n1').then(data => {
      let len=data.rows.length;
      //console.log(len);
      //console.log(data.rows.item(1).takedate);
      //this.hinhanh_arr=[];
      for(let i=0;i<len;i++){
        console.log(data.rows.item(i).takedate);
        this.api.postData(data.rows.item(i),'mobile_hinhanh',this.schema).then(async (res) => {
          console.log(res);
          let toast = await this.toast.create({
            message: 'Hình '+i+' đã được gửi về hệ thống',
            duration: 1500
          });
          toast.present();
          this.photoService.deleteHinhanh(data.rows.item(i).id,data.rows.item(i).id_congtrinh,data.rows.item(i).tbl_name);
          this.reloadHinhanh(this.fid,'bieughi_n1');
        });
      }
    });

    //Cập nhật trạng thái đã gửi
    // this.bieughi_n1.trangthai=1;
    // this.bieughi_n1.trangthai=this.bieughi_n1.trangthai*1+1;
    this.update_table();
    this.update_trangthai(1);
    
  }
  
  
  ValuebyClick(value,key,array,scope){
    if(scope=='bieughi_n1'){
      this.bieughi_n1[key]=value;
    }
    if(scope=='thuoctinh_data'){
      this.query=this.thuoctinh_addnew[key]=value;
    }
    
    this.danhmuc2[array]=null;
  }

  /* search_filter(){
    this.notifi=this.bieughi_n1.mota1;
    console.log(this.notifi);
    this.danhmuc2.mota1_arr=this.danhmuc.mota1_arr.filter(item => item.toLowerCase().includes(this.bieughi_n1.mota1.toLowerCase()));
  } */

  search_filter(key,array,scope){
    if(scope=='bieughi_n1'){
      this.query=this.bieughi_n1[key];
    }
    if(scope=='thuoctinh_data'){
      this.query=this.thuoctinh_addnew[key];
    }
    
    // Có biến query thì tiến hành filter
    console.log(this.query);
    if(this.query!=''){
      this.danhmuc2[array]=this.danhmuc[array].filter(item => item.toLowerCase().includes(this.query.toLowerCase()));
    }else{
      this.danhmuc2[array]=[];
    }
    
  }

  search_filter_hanhchinh(ten_huyen:any){
    this.ftable.hanhchinh_xa2=this.ftable.hanhchinh_xa.filter(function(haha:any) {
      console.log(ten_huyen);
      return haha.rows.ten_huyen == ten_huyen;
    });
  }

  addItem(){
    this.thuoctinh_data[this.thuoctinh_addnew.key]=this.thuoctinh_addnew.value;
    this.thuoctinh_addnew.key='';
    this.thuoctinh_addnew.value='';
    this.danhmuc2.thuoctinh_key_arr=[];
  }

  removeItem(key){
    delete this.thuoctinh_data[key];
  }

  checkkey(key:any){
    // if(key!=='Tên cống' || key!=='Xã' || key!=='Huyện'){

    if(key!=='Tên tuyến điều tra, giám sát'){
      if(key!=='bla bla'){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

 

}
