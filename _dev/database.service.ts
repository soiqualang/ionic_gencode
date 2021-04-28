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

export interface bieughi_n1 {
  id: number, 
  maso: string,
  x: number,
  y: number,
  maso_nguoidung: string,
  takedate: string,
  trangthai: number,
  thuoctinh: string
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
  public database_name:string = "elephant_tracking_v1.0.db";
  public dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  //-----LOC1--------//

  bieughi_n1_arr = new BehaviorSubject([]);
  hinhanh_arr = new BehaviorSubject([]);

  serv_URL='url';

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

  sync_nguoidung(){
    return new Promise(resolve => {
      this.http.post<any[]>('url',{
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
      this.http.post<any[]>('url',{
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

  sync_config(){
    return new Promise(resolve => {
      this.http.post<any[]>('url',{
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
          // console.log('we insert ' + ten);
          this.database.executeSql('INSERT or IGNORE INTO config (id,ten,thuoctinh,tbl) VALUES (?,?,?,?)',[id,ten,thuoctinh,tbl]);
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

    this.loadbieughi_n1();

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