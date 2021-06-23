import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

/* SQLite */
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

/* import { DapHientrangPointService  } from 'src/app/services/dap-hientrang-point.service'; */

//-----LOC0--------//

export interface dap_hientrang_point {
  id: number,
  ten_dap: string,
  ma_loai: string,
  x: number,
  y: number,
  wkt: string
}

export interface v_cong_hientrang_point {
  id:number, 
  maso:string,
  ten:string,
  maso_donviquanly:string,
  maso_hethongthuyloi:string,
  maso_loaicong:string,
  chieungang_khaudo:number,
  chieucao_khaudo:number,
  duongkinh_khaudo:number,
  soluong_cuacong:number, 
  chieurong_cuacong:number,
  chieucao_cuacong:number,
  caotrinh_daycong:number,
  maso_vatlieucuacong:string,
  maso_hinhthucvanhanh:string,
  maso_loaimay:string,
  nam_xaydung:number, 
  dientich_khuquanly:number,
  dientich_nhaquanly:number,
  nhiemvu_tuoi:number,
  nhiemvu_tieu:number,
  nhiemvu_nganman:number,
  congsuat_tuoi:number,
  congsuat_tieu:number,
  ghichu:string,
  maso_xa:number, 
  maso_huyen:number, 
  last_updated:string, 
  maso_nguoidung:string, 
  x:number, 
  y:number
}



export interface thucdia_mucnuoc {
  id: number,
  maso: string,
  maso_nguoidung: string,
  giatri: number,
  ghichu: string,
  takedate: string,
  x: number,
  y: number,
  trangthai: number
}

export interface thucdia_satlo {
  id: number,
  maso: string,
  maso_nguoidung: string,
  giatri: number,
  ghichu: string,
  takedate: string,
  x: number,
  y: number,
  trangthai: number
}

export interface mobile_thucdia_nn_data {
  id: number, 
  maso: string, 
  maso_nguoidung: string, 
  ghichu: string,
  takedate: string,
  x: number,
  y: number,
  trangthai: number,
  maso_linhvuc: string,
  maso_loaicaycon: string,
  maso_giongcaycon: string,
  maso_giaidoansinhtruong: string,
  maso_loaibenh: string
}
export interface view_mobile_thucdia_nn_data {
  id: number, 
  maso: string, 
  maso_nguoidung: string, 
  ghichu: string,
  takedate: string,
  x: number,
  y: number,
  trangthai: number,
  maso_linhvuc: string,
  maso_loaicaycon: string,
  maso_giongcaycon: string,
  maso_giaidoansinhtruong: string,
  maso_loaibenh: string
}

export interface channuoi_hogiadinh {
  idhgd: number, 
  nhom: string, 
  chuyenmuc: string, 
  fdate: string,
  tdate: string,
  editby: string,
  edittime: string,
  isvalid: number,
  mota1: string,
  mota2: string,
  mota3: string,
  id: number,
  thuoctinh: string,
  x: number,
  y: number,
  maso: string
}

export interface channuoi_danhsachcoso {
  nhom: string, 
  chuyenmuc: string,
  mota1: string,
  mota2: string,
  id: number,
  thuoctinh: string,
  x: number,
  y: number,
  maso: string,
  takedate: string,
  maso_nguoidung: string,
  trangthai: number
}

export interface thucdia_dap {
  id: number,
  maso: string,
  maso_nguoidung: string,
  ten: string,
  ghichu: string,
  takedate: string,
  x: number,
  y: number,
  trangthai: number
}

export interface diemmohinh{
  id: number,
  maso: string,
  nhom: string,
  chuyenmuc: string,
  x: number,
  y: number,
  thuoctinh: string,
  maso_nguoidung: string,
  takedate: string,
  trangthai: number
}

// Thủy lợi
export interface congtrinh_cong {
  nhom: string, 
  chuyenmuc: string, 
  thuoctinh: string,
  mota1: string,
  mota2: string,
  id: number, 
  x: number,
  y: number,
  maso: string,
  maso_nguoidung: string,
  takedate: string,
  trangthai: number
}

export interface satlo {
  nhom: string, 
  chuyenmuc: string, 
  thuoctinh: string,
  mota1: string,
  mota2: string,
  id: number, 
  x: number,
  y: number,
  maso: string,
  maso_nguoidung: string,
  takedate: string,
  trangthai: number
}

export interface thucdia_doman {
  id: number,
  maso: string,
  maso_nguoidung: string,
  giatri: number,
  ghichu: string,
  takedate: string,
  x: number,
  y: number,
  trangthai: number
}

export interface diem_thiethai {
  thuoctinh: string,
  id: number, 
  x: number,
  y: number,
  maso: string,
  maso_nguoidung: string,
  takedate: string,
  trangthai: number
}



export interface hinhanh {
  id: number,
  img: string,
  takedate: string,
  id_congtrinh: number,
  tbl_name: string
}

@Injectable({
  providedIn: 'root'
})

/* Wait until the platform is ready
Create the database file, which will also open it if it already exists
Fill the Database with our initial SQL data */

export class DatabaseService {

  public database: SQLiteObject;
  public database_name:string = "baria_vungtau_v1.2.1.db";
  public dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //-----LOC1--------//

  congtrinh_dap_arr = new BehaviorSubject([]);
  v_cong_hientrang_point_arr = new BehaviorSubject([]);
  thucdia_doman_arr = new BehaviorSubject([]);
  thucdia_mucnuoc_arr = new BehaviorSubject([]);
  thucdia_satlo_arr = new BehaviorSubject([]);
  diem_thiethai_arr = new BehaviorSubject([]);

  mobile_thucdia_nn_data_arr = new BehaviorSubject([]);
  view_mobile_thucdia_nn_data_arr = new BehaviorSubject([]);
  view_mobile_thucdia_channuoi_data_arr = new BehaviorSubject([]);
  view_mobile_thucdia_thuysan_data_arr = new BehaviorSubject([]);
  view_mobile_thucdia_trongtrot_data_arr = new BehaviorSubject([]);
  channuoi_hogiadinh_arr = new BehaviorSubject([]);
  channuoi_danhsachcoso_arr = new BehaviorSubject([]);
  diemmohinh_arr = new BehaviorSubject([]);

  // thủy lợi
  congtrinh_cong_arr = new BehaviorSubject([]);
  satlo_arr = new BehaviorSubject([]);
  thucdia_dap_arr = new BehaviorSubject([]);
  

  hinhanh_arr = new BehaviorSubject([]);

  serv_URL='https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/';

  constructor(public plt: Platform, public sqlite: SQLite, public http: HttpClient,private route: ActivatedRoute,private router: Router, public api:ApiService) {
    this.plt.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
  }

  createDB() {
    let options = { name: this.database_name, location: 'default', createFromLocation: 1 };
    this.sqlite.create(options)
      .then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }
  
  seedDatabase() {
    this.http.get('assets/sql/db_v2_min.sql', { responseType: 'text'})
    .subscribe(sql => {
      //this.processQuery(sql.split(';\n'));
      this.processQuery(sql.split(';'));
    });
  }

  /* 
  https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=cong_thongso_loaicong&schema=congtrinh 
  https://github.com/soiqualang/appthucdia/blob/master/app/js2/syn.js
  */
  synDatabase(schema:any,tblname:any){
    return new Promise(resolve => {
      this.http.post<any[]>(this.serv_URL+'syn.php'+'?tblname='+tblname+'&schema='+schema,{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
          //console.log('hahahah');
          res.forEach(function(item:any){ 
            let field=(Object.keys(item));
            let value=(Object.values(item));
            //console.log(field,value);
            //this.insert_or_ignore_table(tblname,field,value);
          });
          resolve(res);
        })
    });
  }

  t1_syn(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        this.delete_all('v_cong_hientrang_point_m');

        let field=["id","maso","ten","maso_donviquanly","maso_hethongthuyloi","maso_loaicong","chieungang_khaudo","chieucao_khaudo","duongkinh_khaudo","soluong_cuacong","chieurong_cuacong","chieucao_cuacong","caotrinh_daycong","maso_vatlieucuacong","maso_hinhthucvanhanh","maso_loaimay","nam_xaydung","dientich_khuquanly","dientich_nhaquanly","nhiemvu_tuoi","nhiemvu_tieu","nhiemvu_nganman","congsuat_tuoi","congsuat_tieu","ghichu","maso_xa","maso_huyen","last_updated","maso_nguoidung","x","y"];

        let value=[14,"CCD_14","Cống Cây Da","CTTL_TRAM_1","HTTL_03","LOAI_2",5,null,null,2,5.6,5.7,-3.2,"VATLIEU_1","HINHTHUC_2","LOAIMAY_04",1991,5937,74.7,8060,8060,8060,null,null,"5",29035,834,null,null,106.503581203976,10.1278666594275];

        //this.insert_or_ignore_table('v_cong_hientrang_point_m',field,value);

        res.forEach(function(item:any){
          let field=Object.keys(item);
          let value=Object.values(item);
          //console.log(field,value);
          this.insert_table('v_cong_hientrang_point_m',field,value);
        });

        resolve(res);
      })
    });
  }

  //https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=v_cong_hientrang_point_m&schema=mobile
  sync_v_cong_hientrang_point_m(){
    return new Promise(resolve => {
      //this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=v_cong_hientrang_point_m&schema=mobile',{
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=mobile_cong_hientrang_table_m&schema=public',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //Không xóa dữ liệu đã thu thập trong máy
        //this.delete_all('v_cong_hientrang_point_m');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          let maso_donviquanly=res[i].maso_donviquanly;
          let maso_hethongthuyloi=res[i].maso_hethongthuyloi;
          let maso_loaicong=res[i].maso_loaicong;
          let chieungang_khaudo=res[i].chieungang_khaudo;
          let chieucao_khaudo=res[i].chieucao_khaudo;
          let duongkinh_khaudo=res[i].duongkinh_khaudo;
          let soluong_cuacong=res[i].soluong_cuacong;
          let chieurong_cuacong=res[i].chieurong_cuacong;
          let chieucao_cuacong=res[i].chieucao_cuacong;
          let caotrinh_daycong=res[i].caotrinh_daycong;
          let maso_vatlieucuacong=res[i].maso_vatlieucuacong;
          let maso_hinhthucvanhanh=res[i].maso_hinhthucvanhanh;
          let maso_loaimay=res[i].maso_loaimay;
          let nam_xaydung=res[i].nam_xaydung;
          let dientich_khuquanly=res[i].dientich_khuquanly;
          let dientich_nhaquanly=res[i].dientich_nhaquanly;
          let nhiemvu_tuoi=res[i].nhiemvu_tuoi;
          let nhiemvu_tieu=res[i].nhiemvu_tieu;
          let nhiemvu_nganman=res[i].nhiemvu_nganman;
          let congsuat_tuoi=res[i].congsuat_tuoi;
          let congsuat_tieu=res[i].congsuat_tieu;
          let ghichu=res[i].ghichu;
          let maso_xa=res[i].maso_xa;
          let maso_huyen=res[i].maso_huyen;
          let last_updated=res[i].last_updated;
          let maso_nguoidung=res[i].maso_nguoidung;
          let x=res[i].x;
          let y=res[i].y;
          this.database.executeSql('INSERT or IGNORE INTO v_cong_hientrang_point_m (id,maso,ten,maso_donviquanly,maso_hethongthuyloi,maso_loaicong,chieungang_khaudo,chieucao_khaudo,duongkinh_khaudo,soluong_cuacong,chieurong_cuacong,chieucao_cuacong,caotrinh_daycong,maso_vatlieucuacong,maso_hinhthucvanhanh,maso_loaimay,nam_xaydung,dientich_khuquanly,dientich_nhaquanly,nhiemvu_tuoi,nhiemvu_tieu,nhiemvu_nganman,congsuat_tuoi,congsuat_tieu,ghichu,maso_xa,maso_huyen,last_updated,maso_nguoidung,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id,maso,ten,maso_donviquanly,maso_hethongthuyloi,maso_loaicong,chieungang_khaudo,chieucao_khaudo,duongkinh_khaudo,soluong_cuacong,chieurong_cuacong,chieucao_cuacong,caotrinh_daycong,maso_vatlieucuacong,maso_hinhthucvanhanh,maso_loaimay,nam_xaydung,dientich_khuquanly,dientich_nhaquanly,nhiemvu_tuoi,nhiemvu_tieu,nhiemvu_nganman,congsuat_tuoi,congsuat_tieu,ghichu,maso_xa,maso_huyen,last_updated,maso_nguoidung,x,y]);
          
          //console.log('we insert ' + ten);
      }

        /* res.forEach(function(item:any){ 
          let field=(Object.keys(item));
          let value=(Object.values(item));
          //console.log(field,value);
          this.insert_or_ignore_table('v_cong_hientrang_point_m',field,value);
        }); */
        })
    });
  }

  sync_cong_thongso_hethongthuyloi(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=cong_thongso_hethongthuyloi&schema=congtrinh',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('cong_thongso_hethongthuyloi');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT INTO cong_thongso_hethongthuyloi (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_cong_thongso_loaicong(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=cong_thongso_loaicong&schema=congtrinh',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('cong_thongso_loaicong');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT INTO cong_thongso_loaicong (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_cong_thongso_vatlieucuacong(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=cong_thongso_vatlieucuacong&schema=congtrinh',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('cong_thongso_vatlieucuacong');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT INTO cong_thongso_vatlieucuacong (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_cong_thongso_hinhthucvanhanh(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=cong_thongso_hinhthucvanhanh&schema=congtrinh',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('cong_thongso_hinhthucvanhanh');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT INTO cong_thongso_hinhthucvanhanh (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_cong_thongso_loaimay(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=cong_thongso_loaimay&schema=congtrinh',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('cong_thongso_loaimay');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT INTO cong_thongso_loaimay (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_nguoidung(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=nguoidung&schema=quantri',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('nguoidung');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT INTO nguoidung (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_phongban(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=phongban&schema=quantri',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('phongban');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          //console.log('we insert ' + ten);
          //this.database.executeSql('INSERT or IGNORE INTO phongban (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
          this.database.executeSql('INSERT INTO phongban (id,maso,ten) VALUES (?,?,?)',[id,maso,ten]);
        }
      })
    });
  }

  sync_hanhchinh_xa(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=hanhchinh_xa&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('hanhchinh_xa');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          let maso_tinh=res[i].maso_tinh;
          let maso_huyen=res[i].maso_huyen;
          let ten_huyen=res[i].ten_huyen;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO hanhchinh_xa (id,maso,ten,maso_tinh,maso_huyen,ten_huyen) VALUES (?,?,?,?,?,?)',[id,maso,ten,maso_tinh,maso_huyen,ten_huyen]);
        }
      })
    });
  }

  sync_hanhchinh_huyen(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=hanhchinh_huyen&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('hanhchinh_huyen');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let ten=res[i].ten;
          let maso_tinh=res[i].maso_tinh;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO hanhchinh_huyen (id,maso,ten,maso_tinh) VALUES (?,?,?,?)',[id,maso,ten,maso_tinh]);
        }
      })
    });
  }

  sync_config(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=config&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        this.delete_all('config');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let ten=res[i].ten;
          let thuoctinh=this.api.json2str(res[i].thuoctinh);
          let tbl=res[i].tbl;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO config (id,ten,thuoctinh,tbl) VALUES (?,?,?,?)',[id,ten,thuoctinh,tbl]);
        }
      })
    });
  }

  //Dịch bệnh nông nghiệp

  sync_mobile_thucdia_nn_giaidoansinhtruong(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=mobile_thucdia_nn_giaidoansinhtruong&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('mobile_thucdia_nn_giaidoansinhtruong');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let ten=res[i].ten;
          let mota=res[i].mota;
          let idloaicaycon=res[i].idloaicaycon;
          let idlinhvuc=res[i].idlinhvuc;
          let maso=res[i].maso;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO mobile_thucdia_nn_giaidoansinhtruong (id,ten,mota,idloaicaycon,idlinhvuc,maso) VALUES (?,?,?,?,?,?)',[id,ten,mota,idloaicaycon,idlinhvuc,maso]);
        }
      })
    });
  }

  sync_mobile_thucdia_nn_giongcaycon(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=mobile_thucdia_nn_giongcaycon&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('mobile_thucdia_nn_giongcaycon');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let ten=res[i].ten;
          let idloaicaycon=res[i].idloaicaycon;
          let idlinhvuc=res[i].idlinhvuc;
          let mota=res[i].mota;
          let maso=res[i].maso;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO mobile_thucdia_nn_giongcaycon (id,ten,idloaicaycon,idlinhvuc,mota,maso) VALUES (?,?,?,?,?,?)',[id,ten,idloaicaycon,idlinhvuc,mota,maso]);
        }
      })
    });
  }

  sync_mobile_thucdia_nn_linhvuc(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=mobile_thucdia_nn_linhvuc&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('mobile_thucdia_nn_linhvuc');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let ten=res[i].ten;
          let mota=res[i].mota;
          let maso=res[i].maso;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO mobile_thucdia_nn_linhvuc (id,ten,mota,maso) VALUES (?,?,?,?)',[id,ten,mota,maso]);
        }
      })
    });
  }

  sync_mobile_thucdia_nn_loaibenh(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=mobile_thucdia_nn_loaibenh&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('mobile_thucdia_nn_loaibenh');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let ten=res[i].ten;
          let mota=res[i].mota;
          let idloaicaycon=res[i].idloaicaycon;
          let idlinhvuc=res[i].idlinhvuc;
          let idgiongcaycon=res[i].idgiongcaycon;
          let maso=res[i].maso;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO mobile_thucdia_nn_loaibenh (id,ten,mota,idloaicaycon,idlinhvuc,idgiongcaycon,maso) VALUES (?,?,?,?,?,?,?)',[id,ten,mota,idloaicaycon,idlinhvuc,idgiongcaycon,maso]);
        }
      })
    });
  }

  sync_mobile_thucdia_nn_loaicaycon(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=mobile_thucdia_nn_loaicaycon&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('mobile_thucdia_nn_loaicaycon');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let ten=res[i].ten;
          let idlinhvuc=res[i].idlinhvuc;
          let mota=res[i].mota;
          let maso=res[i].maso;
          //console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO mobile_thucdia_nn_loaicaycon (id,ten,idlinhvuc,mota,maso) VALUES (?,?,?,?,?)',[id,ten,idlinhvuc,mota,maso]);
        }
      })
    });
  }

  sync_channuoi_danhsachcoso(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=danhsachcoso_sync&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('channuoi_danhsachcoso');
        for(var i = 0; i < len; i++) {
          let nhom=res[i].nhom;
          let chuyenmuc=res[i].chuyenmuc;
          let mota1=res[i].mota1;
          let mota2=res[i].mota2;
          let id=res[i].id;
          // let thuoctinh=res[i].thuoctinh;
          let thuoctinh=this.api.json2str(res[i].thuoctinh);
          // console.log(i+'/ '+thuoctinh["Tên cơ sở"]);
          // console.log(i+'/ '+JSON.stringify(thuoctinh));
          let x=res[i].x;
          let y=res[i].y;
          let maso=res[i].maso;
          let takedate=res[i].takedate;
          let maso_nguoidung=res[i].maso_nguoidung;
          let trangthai=res[i].trangthai;
          //console.log('we insert ' + ten);

          // Thêm những record chưa có từ server
          let query='INSERT or IGNORE INTO channuoi_danhsachcoso (nhom,chuyenmuc,mota1,mota2,id,thuoctinh,maso,takedate,maso_nguoidung,trangthai,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
          this.database.executeSql(query,[nhom,chuyenmuc,mota1,mota2,id,thuoctinh,maso,takedate,maso_nguoidung,trangthai,x,y]);

          // Update những record trạng thái đã gửi
          // query='update channuoi_danhsachcoso set nhom=?, chuyenmuc=?, mota1=?, mota2=?, thuoctinh=?, id=?, takedate=?, maso_nguoidung=?, trangthai=?, x=?, y=? where maso=? and trangthai!=0;';
          // this.database.executeSql(query,[nhom,chuyenmuc,mota1,mota2,thuoctinh,id,takedate,maso_nguoidung,trangthai,x,y,maso]);
        }
      })
    });
  }

  sync_diemmohinh(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/appmobile_nongnghiep_baria_vungtau_services/syn.php?tblname=diemmohinh_sync&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('channuoi_danhsachcoso');
        for(var i = 0; i < len; i++) {
          let id=res[i].id;
          let maso=res[i].maso;
          let nhom=res[i].nhom;
          let chuyenmuc=res[i].chuyenmuc;
          let x=res[i].x;
          let y=res[i].y;
          let thuoctinh=this.api.json2str(res[i].thuoctinh);
          let maso_nguoidung=res[i].maso_nguoidung;
          let takedate=res[i].last_updated;
          let trangthai=res[i].trangthai;
          // console.log(i+'/ '+thuoctinh["Tên cơ sở"]);
          // console.log(i+'/ '+JSON.stringify(thuoctinh));
          //console.log('we insert ' + ten);

          // Thêm những record chưa có từ server
          let query='INSERT or IGNORE INTO diemmohinh (id,maso,nhom,chuyenmuc,x,y,thuoctinh,maso_nguoidung,takedate,trangthai) VALUES (?,?,?,?,?,?,?,?,?,?)';
          this.database.executeSql(query,[id,maso,nhom,chuyenmuc,x,y,thuoctinh,maso_nguoidung,takedate,trangthai]);

          // Update những record trạng thái đã gửi
          // query='update channuoi_danhsachcoso set nhom=?, chuyenmuc=?, mota1=?, mota2=?, thuoctinh=?, id=?, takedate=?, maso_nguoidung=?, trangthai=?, x=?, y=? where maso=? and trangthai!=0;';
          // this.database.executeSql(query,[nhom,chuyenmuc,mota1,mota2,thuoctinh,id,takedate,maso_nguoidung,trangthai,x,y,maso]);
        }
      })
    });
  }

  // Đồng bộ dữ liệu thủy lợi
  sync_congtrinh_cong(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/thuyloi_haugiang_mobile_services/syn.php?tblname=congtrinh_cong_sync&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('congtrinh_cong');
        for(var i = 0; i < len; i++) {
          let nhom=res[i].nhom;
          let chuyenmuc=res[i].chuyenmuc;
          let thuoctinh=this.api.json2str(res[i].thuoctinh);
          let mota1=res[i].mota1;
          let mota2=res[i].mota2;
          let id=res[i].id;
          let maso=res[i].maso;
          let x=res[i].x;
          let y=res[i].y;
          let trangthai=res[i].trangthai;
          let takedate=res[i].takedate;
          let maso_nguoidung=res[i].maso_nguoidung;
          //console.log('we insert ' + ten);

          // Thêm những record chưa có từ server
          let query='INSERT or IGNORE INTO congtrinh_cong (nhom,chuyenmuc,thuoctinh,mota1,mota2,id,maso,takedate,maso_nguoidung,trangthai,x,y) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
          this.database.executeSql(query,[nhom,chuyenmuc,thuoctinh,mota1,mota2,id,maso,takedate,maso_nguoidung,trangthai,x,y]);
        }
      })
    });
  }

  sync_satlo(){
    return new Promise(resolve => {
      this.http.post<any[]>('https://api.dothanhlong.org/thuyloi_haugiang_mobile_services/syn.php?tblname=satlo_sync&schema=mobile',{
        headers: { 'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).subscribe(res => {
        let len=res.length;
        //this.delete_all('satlo');
        for(var i = 0; i < len; i++) {
          let loai=res[i].loai;
          let thuoctinh=this.api.json2str(res[i].thuoctinh);
          let mota1=res[i].mota1;
          let id=res[i].id;
          let maso=res[i].maso;
          let x=res[i].x;
          let y=res[i].y;
          let trangthai=res[i].trangthai;
          let takedate=res[i].takedate;
          let maso_nguoidung=res[i].maso_nguoidung;
          //console.log('we insert ' + ten);

          // Thêm những record chưa có từ server
          let query='INSERT or IGNORE INTO satlo (loai,thuoctinh,mota1,id,maso,takedate,maso_nguoidung,trangthai,x,y) VALUES (?,?,?,?,?,?,?,?,?,?)';
          this.database.executeSql(query,[loai,thuoctinh,mota1,id,maso,takedate,maso_nguoidung,trangthai,x,y]);
        }
      })
    });
  }



  processQuery(queries:any) {
    for(let i=0;i<queries.length;i++){
      if(queries[i].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
        this.runSQL(queries[i]);
      }
    }
    //console.log(queries[1]);
    //this.getTable('select ten_vi from vn_tinh');
    // this.loaddap_hientrang_point();
    this.loadhinhanh();

    //-----LOC2--------//

    // this.loadv_cong_hientrang_point();
    // this.loadthucdia_mucnuoc();
    // this.loadthucdia_satlo();
    this.loadmobile_thucdia_nn_data();
    this.loadview_mobile_thucdia_nn_data('Chăn nuôi');
    this.loadview_mobile_thucdia_nn_data('Thủy sản');
    this.loadview_mobile_thucdia_nn_data('Cây trồng');
    this.loadchannuoi_hogiadinh();
    this.loadchannuoi_danhsachcoso();
    // this.loadthucdia_dap();
    this.loaddiemmohinh();

    // Thủy lợi
    this.loadcongtrinh_cong();
    this.loadsatlo();
    this.loadthucdia_doman();
    this.loaddiem_thiethai();

    this.dbReady.next(true);
  }

  runSQL(sql:string){
    return this.database.executeSql(sql, [])
      .then((res) => {
        //lert("query ok");
        //console.log('query ok');
        return res;
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

 
  getDatabaseState() {
    return this.dbReady.asObservable();
  } 
  
  test1(){
    console.log('hahahahahaha');
    return;
  }
  
  checknumerric(num){
    if(!isNaN(num)){
      return num;
    }else if(num==null){
      return 'null';
    }else if(num==''){
      return 'null';
    }else{
      return "'"+num+"'";
    }
  }

//-----LOC3--------//

  /* 
  dap_hientrang_point 
  */

  getdap_hientrang_point(): Observable<dap_hientrang_point[]> {
    return this.congtrinh_dap_arr.asObservable();
  }

  loaddap_hientrang_point(){
    return this.table_to_array_order('dap_hientrang_point','ten_dap','ASC').then(data => {
      let congtrinh_dap_arr: dap_hientrang_point[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          congtrinh_dap_arr.push(data.rows.item(i));
        }
      }
      this.congtrinh_dap_arr.next(congtrinh_dap_arr);
    });
  }

  /* 
  v_cong_hientrang_point 
  */
  
  getv_cong_hientrang_point(): Observable<v_cong_hientrang_point[]> {
  return this.v_cong_hientrang_point_arr.asObservable();
  }

  loadv_cong_hientrang_point(){
    return this.table_to_array_order('v_cong_hientrang_point_m','ten','ASC').then(data => {
      let v_cong_hientrang_point_arr: v_cong_hientrang_point[] = [];
      //alert(data.rows.length);
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          v_cong_hientrang_point_arr.push(data.rows.item(i));
        }
      }
      this.v_cong_hientrang_point_arr.next(v_cong_hientrang_point_arr);
    });
  }

  /* 
  thucdia_doman 
  */

getthucdia_doman(): Observable<thucdia_doman[]> {
  return this.thucdia_doman_arr.asObservable();
}

getthucdia_mucnuoc(): Observable<thucdia_mucnuoc[]> {
  return this.thucdia_mucnuoc_arr.asObservable();
}

getthucdia_satlo(): Observable<thucdia_satlo[]> {
  return this.thucdia_satlo_arr.asObservable();
}

getmobile_thucdia_nn_data(): Observable<mobile_thucdia_nn_data[]> {
  return this.mobile_thucdia_nn_data_arr.asObservable();
}

getview_mobile_thucdia_nn_data(linhvuc:any): Observable<view_mobile_thucdia_nn_data[]> {
  if(linhvuc=='Chăn nuôi'){
    return this.view_mobile_thucdia_channuoi_data_arr.asObservable();
  }else if(linhvuc=='Thủy sản'){
    return this.view_mobile_thucdia_thuysan_data_arr.asObservable();
  }else{
    // Cây trồng
    return this.view_mobile_thucdia_trongtrot_data_arr.asObservable();
  }
  // return this.view_mobile_thucdia_nn_data_arr.asObservable();
}

getchannuoi_hogiadinh(): Observable<channuoi_hogiadinh[]> {
  return this.channuoi_hogiadinh_arr.asObservable();
}
getchannuoi_danhsachcoso(): Observable<channuoi_danhsachcoso[]> {
  return this.channuoi_danhsachcoso_arr.asObservable();
}
getdiemmohinh(): Observable<diemmohinh[]> {
  return this.diemmohinh_arr.asObservable();
}


//thủy lợi
getcongtrinh_cong(): Observable<congtrinh_cong[]> {
  return this.congtrinh_cong_arr.asObservable();
}
getsatlo(): Observable<satlo[]> {
  return this.satlo_arr.asObservable();
}
getthucdia_dap(): Observable<thucdia_dap[]> {
  return this.thucdia_dap_arr.asObservable();
}
getdiem_thiethai(): Observable<diem_thiethai[]> {
  return this.diem_thiethai_arr.asObservable();
}




loadthucdia_doman(){
  return this.table_to_array_order('thucdia_doman','ghichu','ASC').then(data => {
    let thucdia_doman_arr: thucdia_doman[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        thucdia_doman_arr.push(data.rows.item(i));
      }
    }
    this.thucdia_doman_arr.next(thucdia_doman_arr);
  });
}

loadthucdia_mucnuoc(){
  return this.table_to_array_order('thucdia_mucnuoc','ghichu','ASC').then(data => {
    let thucdia_mucnuoc_arr: thucdia_mucnuoc[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        thucdia_mucnuoc_arr.push(data.rows.item(i));
      }
    }
    this.thucdia_mucnuoc_arr.next(thucdia_mucnuoc_arr);
  });
}

loadthucdia_satlo(){
  return this.table_to_array_order('thucdia_satlo','ghichu','ASC').then(data => {
    let thucdia_satlo_arr: thucdia_satlo[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        thucdia_satlo_arr.push(data.rows.item(i));
      }
    }
    this.thucdia_satlo_arr.next(thucdia_satlo_arr);
  });
}

loadmobile_thucdia_nn_data(){
  return this.table_to_array_order('mobile_thucdia_nn_data','ghichu','ASC').then(data => {
    let mobile_thucdia_nn_data_arr: mobile_thucdia_nn_data[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        mobile_thucdia_nn_data_arr.push(data.rows.item(i));
      }
    }
    this.mobile_thucdia_nn_data_arr.next(mobile_thucdia_nn_data_arr);
  });
}

loadview_mobile_thucdia_nn_data(linhvuc:any){

  if(linhvuc=='Chăn nuôi'){
    return this.table_to_arraywhere('view_mobile_thucdia_nn_data','linhvuc','Chăn nuôi').then(data => {
      let view_mobile_thucdia_channuoi_data_arr: view_mobile_thucdia_nn_data[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          view_mobile_thucdia_channuoi_data_arr.push(data.rows.item(i));
        }
      }
      this.view_mobile_thucdia_channuoi_data_arr.next(view_mobile_thucdia_channuoi_data_arr);
    });
  }else if(linhvuc=='Thủy sản'){
    return this.table_to_arraywhere('view_mobile_thucdia_nn_data','linhvuc','Thủy sản').then(data => {
      let view_mobile_thucdia_thuysan_data_arr: view_mobile_thucdia_nn_data[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          view_mobile_thucdia_thuysan_data_arr.push(data.rows.item(i));
        }
      }
      this.view_mobile_thucdia_thuysan_data_arr.next(view_mobile_thucdia_thuysan_data_arr);
    });
  }else{
    // Cây trồng
    // return this.table_to_array_order('view_mobile_thucdia_nn_data','ghichu','ASC').then(data => {
    return this.table_to_arraywhere('view_mobile_thucdia_nn_data','linhvuc','Cây trồng').then(data => {
      let view_mobile_thucdia_trongtrot_data_arr: view_mobile_thucdia_nn_data[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          view_mobile_thucdia_trongtrot_data_arr.push(data.rows.item(i));
        }
      }
      this.view_mobile_thucdia_trongtrot_data_arr.next(view_mobile_thucdia_trongtrot_data_arr);
    });
  }

  
}

loadchannuoi_hogiadinh(){
  return this.table_to_array_order('channuoi_hogiadinh','thuoctinh','ASC').then(data => {
    let channuoi_hogiadinh_arr: channuoi_hogiadinh[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        channuoi_hogiadinh_arr.push(data.rows.item(i));
      }
    }
    this.channuoi_hogiadinh_arr.next(channuoi_hogiadinh_arr);
  });
}

loadchannuoi_danhsachcoso(){
  return this.table_to_array_order('channuoi_danhsachcoso','thuoctinh','ASC').then(data => {
    let channuoi_danhsachcoso_arr: channuoi_danhsachcoso[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        channuoi_danhsachcoso_arr.push(data.rows.item(i));
      }
    }
    this.channuoi_danhsachcoso_arr.next(channuoi_danhsachcoso_arr);
  });
}

loaddiemmohinh(){
  return this.table_to_array_order('diemmohinh','id','ASC').then(data => {
    let diemmohinh_arr: diemmohinh[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        diemmohinh_arr.push(data.rows.item(i));
      }
    }
    this.diemmohinh_arr.next(diemmohinh_arr);
  });
}


// Thủy lợi
/* loadthucdia_dap(){
  return this.table_to_array_order('thucdia_dap','ghichu','ASC').then(data => {
    let thucdia_dap_arr: thucdia_dap[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        thucdia_dap_arr.push(data.rows.item(i));
      }
    }
    this.thucdia_dap_arr.next(thucdia_dap_arr);
  });
} */
loadsatlo(){
  return this.table_to_array_order('satlo','takedate','ASC').then(data => {
    let satlo_arr: satlo[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        satlo_arr.push(data.rows.item(i));
      }
    }
    this.satlo_arr.next(satlo_arr);
  });
}
loadcongtrinh_cong(){
  return this.table_to_array_order('congtrinh_cong','takedate','ASC').then(data => {
    let congtrinh_cong_arr: congtrinh_cong[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        congtrinh_cong_arr.push(data.rows.item(i));
      }
    }
    this.congtrinh_cong_arr.next(congtrinh_cong_arr);
  });
}
loaddiem_thiethai(){
  return this.table_to_array_order('diem_thiethai','takedate','ASC').then(data => {
    let diem_thiethai_arr: diem_thiethai[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        diem_thiethai_arr.push(data.rows.item(i));
      }
    }
    this.diem_thiethai_arr.next(diem_thiethai_arr);
  });
}

  /* Hinh anh */
  gethinhanh(): Observable<hinhanh[]> {
    return this.hinhanh_arr.asObservable();
  }

  loadhinhanh(){
    return this.table_to_array1('hinhanh').then(data => {
      let hinhanh_arr: hinhanh[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          hinhanh_arr.push(data.rows.item(i));
        }
      }
      this.hinhanh_arr.next(hinhanh_arr);
    });
  }

  table_to_array1(table){
    return this.database.executeSql('SELECT * FROM '+table, []).then(data => {
      return data;
    });
  }

  table_to_array_order(table,orcol='id',opt='ASC'){
    return this.database.executeSql('SELECT * FROM '+table+' ORDER BY '+orcol+' '+opt+'', []).then(data => {
      return data;
    });
  }

  table_to_arraywhere(table,colum,value){
    /* let sql="SELECT * from "+table+" where "+colum+" = '"+value+"' order by id desc";
    console.log(sql);
    return Promise.resolve(this.runSQL(sql)); */
    let sql='SELECT * FROM '+table+' WHERE '+colum+' = ?';
    return this.database.executeSql(sql, [value]).then(data => {
      /* return {
        id: data.rows.item(0).id,
        ten_dap: data.rows.item(0).ten_dap, 
        ma_loai: data.rows.item(0).ma_loai, 
        x: data.rows.item(0).x, 
        y: data.rows.item(0).y, 
        wkt: data.rows.item(0).wkt
      } */
      return data;
    });
  }

  table_to_array_2dk(table,col1,val1,col2,val2){
    /* let sql="SELECT * from "+table+" where "+colum+" = '"+value+"' order by id desc";
    console.log(sql);
    return Promise.resolve(this.runSQL(sql)); */
    let sql='SELECT * FROM "'+table+'" WHERE "'+col1+'" = ? AND "'+col2+'" = ?';
    return this.database.executeSql(sql, [val1,val2]).then(data => {
      /* return {
        id: data.rows.item(0).id,
        ten_dap: data.rows.item(0).ten_dap, 
        ma_loai: data.rows.item(0).ma_loai, 
        x: data.rows.item(0).x, 
        y: data.rows.item(0).y, 
        wkt: data.rows.item(0).wkt
      } */
      return data;
    });
  }

  getElement(table,element,where,id){
    let sql='SELECT "'+element+'" FROM "'+table+'" WHERE "'+where+'" = ?';
    return this.database.executeSql(sql, [id]).then(data => {
      return data;
    });
  }

  update_table(table,field,value,dk1,gt_dk1){
    let strupdate="";
    let i=0;
    for(i; i<field.length-1; i++){
      strupdate+=field[i]+"="+this.checknumerric(value[i])+", ";
    }
    strupdate+=field[i]+"="+this.checknumerric(value[i]);
    let sql_add_news="UPDATE "+table+" SET "+strupdate+" WHERE "+dk1+"='"+gt_dk1+"'";
    /* console.log(sql_add_news); */
    return Promise.resolve(this.runSQL(sql_add_news));
  }

  insert_table(table,field,value){
    let strfield="";
    let strvalue="";
    let i=0;
    for(i; i<field.length-1; i++)
    {
      strfield+=field[i]+", ";
      strvalue+="'"+value[i]+"', ";
      
    }
    strfield+=field[i];
    strvalue+="'"+value[i]+"'";
    let sql_add_news="INSERT INTO "+table+"("+strfield+") VALUES ("+strvalue+")";
    //console.log(sql_add_news);
    return Promise.resolve(this.runSQL(sql_add_news));
  }

  insert_or_ignore_table(table,field,value){
    let strfield="";
    let strvalue="";
    let i=0;
    for(i; i<field.length-1; i++)
    {
      strfield+=field[i]+", ";
      strvalue+="'"+value[i]+"', ";
      
    }
    strfield+=field[i];
    strvalue+="'"+value[i]+"'";
    let sql_add_news="INSERT or IGNORE INTO "+table+"("+strfield+") VALUES ("+strvalue+")";
    console.log(sql_add_news);
    return Promise.resolve(this.runSQL(sql_add_news));
  }

  delete(table,where,id) {
    return this.database.executeSql('DELETE FROM '+table+' WHERE '+where+' = ?', [id]).then(_ => {
    });
  }

  delete_all(table:any) {
    return this.database.executeSql('DELETE FROM '+table, []).then(_ => {
    });
  }

  makefid(){
    let ran_num=Math.random().toString();
    let cur_date=new Date().toISOString();
    let hash=Md5.hashStr(ran_num+cur_date);
    //alert(hash);
    return hash;
  }

  go2page(page) {
    this.router.navigateByUrl('/'+page);
  }

  date2pgTimestamp(){
    let date = new Date();
    //let dateString = new Date(date.getTime() + (date.getTimezoneOffset() * 60000 )).toISOString();
    let dateString = date.toISOString();
    return dateString;
  }

  getTime(datetime:any){
    let date1=new Date(datetime);
    //let dateString = new Date(date1.getTime() + (date1.getTimezoneOffset() * 60000 ));
    return date1.toLocaleTimeString(); //"4:01:53 AM"
    //date1.toLocaleDateString('en-GB') //"11/12/2019"
    //date1.toLocaleDateString('zh-Hans-CN') //"2019/12/11"
  }
  getDate(datetime:any){
    let date1=new Date(datetime);
    //let dateString = new Date(date1.getTime() - (date1.getTimezoneOffset() * 60000 ));
    //date1.toLocaleTimeString(); //"4:01:53 AM"
    return date1.toLocaleDateString('en-GB') //"11/12/2019"
    //date1.toLocaleDateString('zh-Hans-CN') //"2019/12/11"
  }

  async getfTable(tblname:any){
    const data = await this.table_to_array1(tblname);
    let len = data.rows.length;
    //console.log(len);
    let dataobj = [];
    for (let i = 0; i < len; i++) {
      dataobj.unshift({
        rows: data.rows.item(i)
      });
    }
    return dataobj;
  }
}