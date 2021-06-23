import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from 'src/app/services/login.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';

declare var window;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public window = window;

  public appPages = [
    {
      title: 'Truy cập nhanh',
      url: '/home',
      icon: 'home'
    }/* ,
    {
      title: 'Test',
      url: '/list',
      icon: 'list'
    } */
  ];

//-----LOC0--------//

  public bieughi_n1_collect = [
    {
      title: 'Danh sách thu thập',
      url: 'list-bieughi-n1',
      icon: 'list'
    },
    {
      title: 'Thu thập dữ liệu',
      url: '/add-bieughi-n1',
      icon: 'add-circle'
    }
  ];  

  public appAuthPage=[
    {
      title: 'Đăng nhập',
      url: '/login',
      icon: 'log-in'
    }
  ];

  /* public islogin=false; */  

  ftable={
    mobile_thucdia_nn_giaidoansinhtruong: null,
    mobile_thucdia_nn_giongcaycon: null,
    mobile_thucdia_nn_linhvuc: null,
    mobile_thucdia_nn_loaibenh: null,
    mobile_thucdia_nn_loaicaycon: null,
    mobile_thucdia_nn_giaidoansinhtruong2: null,
    mobile_thucdia_nn_giongcaycon2: null,
    mobile_thucdia_nn_linhvuc2: null,
    mobile_thucdia_nn_loaibenh2: null,
    mobile_thucdia_nn_loaicaycon2: null,
    nguoidung: null
  };  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public login:LoginService,
    public api:ApiService,
    public db: DatabaseService
  ) {
    this.initializeApp();
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //window.islogin=false;
      this.login.checklogin();
      window.syncing_icon='/assets/img/animat-cloudsync.gif';

      // Thêm chức năng gửi log về hệ thống
      let logging_data={
        maso_nguoidung: window.user_info.maso,
        logtime: this.db.date2pgTimestamp(),
        resource: 'mobile'
      };
      console.log(logging_data);
      this.api.logging(logging_data);

      // let bol=this.login.check_token(6, this.api.parsejson(window.token));
      // let bol=this.login.check_token(0, this.api.parsejson(window.token));
      // console.log(bol);

      // Đồng bộ dữ liệu chung
      this.db.sync_phongban();
      this.db.sync_nguoidung();
      // this.db.sync_hanhchinh_xa();
      // this.db.sync_hanhchinh_huyen();

      // Đồng bộ dữ liệu nông nghiệp
      /* this.db.sync_mobile_thucdia_nn_giaidoansinhtruong();
      this.db.sync_mobile_thucdia_nn_giongcaycon();
      this.db.sync_mobile_thucdia_nn_linhvuc();
      this.db.sync_mobile_thucdia_nn_loaibenh();
      this.db.sync_mobile_thucdia_nn_loaicaycon();
      this.db.sync_channuoi_danhsachcoso();
      this.db.sync_diemmohinh(); */

      // Đồng bộ dữ liệu thủy lợi
      /* this.db.sync_congtrinh_cong();
      this.db.sync_satlo(); */
      
      this.db.sync_config();

      // filter các đối tượng
      window.ftable={
        mobile_thucdia_nn_giaidoansinhtruong: null,
        mobile_thucdia_nn_giongcaycon: null,
        mobile_thucdia_nn_linhvuc: null,
        mobile_thucdia_nn_loaibenh: null,
        mobile_thucdia_nn_loaicaycon: null,
        mobile_thucdia_nn_giaidoansinhtruong2: null,
        mobile_thucdia_nn_giongcaycon2: null,
        mobile_thucdia_nn_linhvuc2: null,
        mobile_thucdia_nn_loaibenh2: null,
        mobile_thucdia_nn_loaicaycon2: null,
        nguoidung: null
      };

    });
  }
}
