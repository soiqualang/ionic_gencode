import { Component, OnInit } from '@angular/core';

/* DatabaseService */
import { DatabaseService, bieughi_n1 } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';

import { ToastController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { MapModalPage } from 'src/app/map-modal/map-modal.page';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

/* Photo service */
import { PhotoService } from 'src/app/services/photo.service';
import { LoginService } from 'src/app/services/login.service';

declare var window;

@Component({
  selector: 'app-add-bieughi-n1',
  templateUrl: './add-bieughi-n1.page.html',
  styleUrls: ['./add-bieughi-n1.page.scss'],
})

export class AddBieughiN1Page implements OnInit {

  public window = window;

  bieughi_n1_all: bieughi_n1[] = [];
  bieughi_n1 = {
    thuoctinh: '',
    id: null, 
    x: null,
    y: null,
    maso: null,
    maso_nguoidung: null,
    takedate: null,
    trangthai: null,
    gpsinfo: null
  };

  dataReturned:any;

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

  locationCoords: any;
  fid:any;
  tbl_name='bieughi_n1';
  hinhanh={
    id: null,
    img: null,
    takedate: null,
    id_congtrinh: null,
    tbl_name: null,
    len: 0
  }
  imgarr_len:any;
  first_img:any;
  img_takedate:any;


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

  // gán null để mặc định toLowerCase
  thuoctinh_addnew={
    "key":'',
    "value":null
  };

  query:any;


  constructor(public db: DatabaseService, private toast: ToastController,private modalController: ModalController,public androidPermissions:AndroidPermissions,public locationAccuracy:LocationAccuracy,public geolocation: Geolocation,public photoService: PhotoService,public login:LoginService,public api:ApiService) {
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

        //Tạo mã hash md5
        this.fid=this.db.makefid();
        this.thuoctinh_data={};
        // this.thuoctinh_data["Địa điểm xảy ra"]='';
        this.thuoctinh_data_2frm=[];
        // this.thuoctinh_data_2frm["Địa điểm xảy ra"]='';

        this.bieughi_n1.maso=this.fid;
        // this.bieughi_n1.maso_nguoidung=this.login.getCookie('maso');
        this.bieughi_n1.maso_nguoidung=window.user_info.maso;
        this.bieughi_n1.takedate=this.db.date2pgTimestamp();
        this.bieughi_n1.trangthai=0;


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
        
      }
    });
  }

  /* call function after click back */
  ionViewDidEnter() {
    this.reloadHinhanh(this.fid,'bieughi_n1');
    // this.bieughi_n1.maso_nguoidung=this.login.getCookie('maso');
    this.bieughi_n1.maso_nguoidung=window.user_info.maso;
    this.bieughi_n1.takedate=this.db.date2pgTimestamp();

    // Lấy thuộc tính template
    // this.filter_thuoctinh_by_nhom('bieughi_n1');
  }

  /* Các hàm filter */

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
    if(ten_huyen){
      this.ftable.hanhchinh_xa2=this.ftable.hanhchinh_xa.filter(function(haha:any) {
        console.log(ten_huyen);
        return haha.rows.ten_huyen == ten_huyen;
      });
    }
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

  addItem(){
    this.thuoctinh_data[this.thuoctinh_addnew.key]=this.thuoctinh_addnew.value;
    this.thuoctinh_addnew.key='';
    this.thuoctinh_addnew.value='';
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




  //id_congtrinh chính là mã số công trình
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
        // console.log(data.rows.length);
      }
    });
  }

  insert_table() {
    if (this.bieughi_n1.x == null || this.bieughi_n1.y == null) {
      alert('Bạn chưa điền đủ các thông tin bắt buộc!');
    }else{
      this.bieughi_n1.thuoctinh=this.api.json2str(this.thuoctinh_data);
      let value=Object.values(this.bieughi_n1);
      let field=Object.keys(this.bieughi_n1);
      this.db.insert_table(this.tbl_name,field,value)
      .then(async (res) => {
        //Sau khi insert thi lam rong mang bieughi_n1 de nhan gia tri nguoi dung nhap vao
        this.db.loadbieughi_n1();
        let toast = await this.toast.create({
          message: this.thuoctinh_data['Tên tuyến điều tra, giám sát']+' đã được thêm',
          duration: 1500
        });
        toast.present();
        this.bieughi_n1 = {
          thuoctinh: null,
          id: null, 
          x: null,
          y: null,
          maso: null,
          maso_nguoidung: null,
          takedate: null,
          trangthai: null,
          gpsinfo: null
        };
        this.imgarr_len=0;
        this.first_img=null;
        this.img_takedate=null;
        
        this.ngOnInit();
      });
    }
    
  }

  /* Modal ban do */
  async openModal() {
    const modal = await this.modalController.create({
      component: MapModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Bản đồ",
        "gps_lon":9999,
        "gps_lat":9999
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        if(this.dataReturned!== undefined){
          this.bieughi_n1['x']=this.dataReturned.gps_lon;
          this.bieughi_n1['y']=this.dataReturned.gps_lat;
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

      this.bieughi_n1['x']=resp.coords.longitude;
      this.bieughi_n1['y']=resp.coords.latitude;
      this.bieughi_n1['gpsinfo']=this.api.GPSInfo2Str(resp);
      console.log(this.bieughi_n1['gpsinfo']);
      
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }




}