CREATE TABLE IF NOT EXISTS "config" ( "id" integer NOT NULL PRIMARY KEY, "ten" text NULL, "thuoctinh" text NULL, "tbl" text NULL );CREATE TABLE IF NOT EXISTS "hinhanh" ( "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "img" text NULL, "takedate" text NULL, "id_congtrinh" text NULL, "tbl_name" text NULL );CREATE TABLE IF NOT EXISTS "nguoidung" ( "id" integer NULL, "username" text NULL, "ten" text NULL, "password" text NULL, "email" text NULL, "tel" text NULL, "ngaysinh" date, "maso_phongban" text NULL, "maso" text NOT NULL PRIMARY KEY );CREATE TABLE IF NOT EXISTS "phongban" ( "id" integer NULL, "maso" text NOT NULL PRIMARY KEY, "ten" text NULL, "donvichuquan" text NULL );CREATE TABLE IF NOT EXISTS "bieughi_n1" ( "id" integer NULL, "maso" text NOT NULL PRIMARY KEY, "x" real, "y" real, "maso_nguoidung" text NULL, "takedate" text NULL, "trangthai" integer NULL, "thuoctinh" text NULL, "gpsinfo" text NULL );CREATE TABLE IF NOT EXISTS "bieughi_n2" ( "id" integer NULL, "maso" text NOT NULL PRIMARY KEY, "x" real, "y" real, "maso_nguoidung" text NULL, "takedate" text NULL, "trangthai" integer NULL, "thuoctinh" text NULL, "gpsinfo" text NULL );