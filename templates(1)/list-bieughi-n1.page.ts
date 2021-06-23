import { Component, OnInit } from '@angular/core';
import { DatabaseService, bieughi_n1,hinhanh } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list-bieughi-n1',
  templateUrl: './list-bieughi-n1.page.html',
  styleUrls: ['./list-bieughi-n1.page.scss'],
})
export class ListBieughiN1Page implements OnInit {

  bieughi_n1: bieughi_n1[] = [];
  bieughi_n12: bieughi_n1[] = [];

  hinhanh: hinhanh[] = [];
  query:any;
  notifi:any;

  page = 1;
  maximumPages = 1;

  bieughi_n1_ajax=[];


  constructor(
    public db: DatabaseService,
    public api:ApiService,
    public login:LoginService
  ) {
    // this.loadData();
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getbieughi_n1().subscribe(res => {
          if(!res[0]){
            this.bieughi_n1 = res;
            this.bieughi_n12 = res;
            console.log(res[0]);
          }else{
            this.bieughi_n1 = res;
            this.bieughi_n12 = res;
            console.log(this.bieughi_n1[0]);
            // let t1=this.api.parsejson(this.bieughi_n1[0].thuoctinh);
            // console.log(t1);
            // console.log(t1["Thời gian bắt đầu"]);
          }
          
        });
        this.db.gethinhanh().subscribe(res => {
          this.hinhanh = res;
        });
        this.query='';

        // Reload lại data sau khi cập nhật để hiện cái mới cập nhật ra list
        this.db.loadbieughi_n1();
      }
    });
  }

  /* call function after click back */
  ionViewDidEnter() {
    // Reload lại data sau khi cập nhật để hiện cái mới cập nhật ra list
    this.db.loadbieughi_n1();
    this.query='';
    this.search_filter();
  }

  trangthai_code2text(code:any){
    if(code==0){
      return 'Chưa gửi';
    }else{
      return 'Đã gửi';
    }
  }

  null2string(i:any){
    if(i===null){
      return '';
    }else{
      return i;
    }
  }

  search_filter(){
    // this.notifi=this.query;
    // console.log(this.query);
    this.bieughi_n12=this.bieughi_n1.filter(item => item.thuoctinh.toLowerCase().includes(this.query.toLowerCase()) || this.trangthai_code2text(item.trangthai).toLowerCase().includes(this.query.toLowerCase()));
  }

}