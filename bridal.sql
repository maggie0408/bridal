SET NAMES UTF8;
DROP DATABASE IF EXISTS bridal;
CREATE DATABASE bridal CHARSET=UTF8;
USE bridal;


/**品类CATEGORY**/
CREATE TABLE category(
  id INT PRIMARY KEY AUTO_INCREMENT,
  ctg_name VARCHAR(32)
);

/**产品PRODUCT**/
CREATE TABLE products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  cid INT,                    #所属类目
  title VARCHAR(128),         #主标题
  subtitle VARCHAR(128),      #副标题
  pCode VARCHAR(32),           #型号
  oldPrice DECIMAL(7,2),
  newPrice DECIMAL(7,2),
  color VARCHAR(32),          #颜色
  size VARCHAR(32),           #尺寸
  description VARCHAR(1024),  #产品详细说明
  FOREIGN KEY (cid) REFERENCES category(id)
);

/**商品主题THEME**/
CREATE TABLE theme(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,             #商品编号
  FOREIGN KEY (pid) REFERENCES products(id)
);


/**商品图片PRODUCT_PIC**/
CREATE TABLE product_pic(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,             #商品编号
  sm_pic VARCHAR(128),        #小图片路径
  md_pic VARCHAR(128),        #中图片路径
  lg_pic VARCHAR(128),         #大图片路径
  FOREIGN KEY (pid) REFERENCES products(id)
);



/**用户信息USER**/
CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128),        #头像图片路径
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男 2-保密
);


/**购物车CART_ITEM**/
CREATE TABLE cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  uid INT,
  count INT,
  FOREIGN KEY (pid) REFERENCES products(id),
  FOREIGN KEY (uid) REFERENCES users(id)
);


/**收件人信息USER_RECEIVER**/
CREATE TABLE user_receiver(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,                    #用户编号
  receiver_name VARCHAR(16),  #接收人姓名
  address VARCHAR(128),       #详细地址
  county VARCHAR(16),         #县
  city VARCHAR(16),           #市
  province VARCHAR(16),       #省
  country VARCHAR(16),
  postcode VARCHAR(16),
  cellphone VARCHAR(16),
  tag VARCHAR(16),            #标签名
  is_default BOOLEAN,          #是否为当前用户的默认收货地址
  FOREIGN KEY (uid) REFERENCES users(id)
);

/**订单详情**/
CREATE TABLE order_detail(
  id INT PRIMARY KEY AUTO_INCREMENT,
  addrId INT,
  status VARCHAR(128),
  order_time VARCHAR(64),
  pay_time VARCHAR(64),
  deliver_time VARCHAR(64),
  received_time VARCHAR(64),
  FOREIGN KEY (addrId) REFERENCES user_receiver(id)
);


/**订单信息ORDER_INFO**/
CREATE TABLE orders(
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_dt_id INT,
  count INT,
  FOREIGN KEY (order_dt_id) REFERENCES order_detail(id)
);



/****首页轮播广告商品****/
CREATE TABLE index_carousel(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  href VARCHAR(128)
);


/****首页商品****/
/*
  CREATE TABLE xz_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),
  details VARCHAR(128),
  pic VARCHAR(128),
  price DECIMAL(10,2),
  href VARCHAR(128),
  seq_recommended TINYINT,
  seq_new_arrival TINYINT,
  seq_top_sale TINYINT
);
*/

/*******************/
/******数据导入******/
/*******************/
/**商品品类导入**/
INSERT INTO category VALUES
(1,'Brides'),
(2,'Bridesmaids'),
(3,'Dresses'),
(4,'Accessories'),
(5,'Gifts & Decorations'),
(6,'Shoes'),
(7,'Prom');

/**商品**/
INSERT INTO products VALUES
/*id, cid*/
(NULL,'1','Allover Embroidered Lace Y-Neck Wedding Dress','GALINA','WG3928','499.00','449.00','white','0','Embroidered, nature-inspired motifs give this A-line wedding dress a unique and modern feel. Linear lace trim at the Y-neck and waist add extra detail.'),
(NULL,'1','Allover Embroidered Lace Y-Neck Wedding Dress','GALINA','WG3928','499.00','449.00','ivory','2','Embroidered, nature-inspired motifs give this A-line wedding dress a unique and modern feel. Linear lace trim at the Y-neck and waist add extra detail.'),
(NULL,'1','Lace High-Neck Halter Sheath Wedding Dress','MELISSA SWEET','MS251192','958.00','799.00','champagne','0','This high-neck halter wedding dress is a fresh silhouette featuring vintage-inspired details. Linear lace paired with soutache ribbon appliques give this dress a one-of-a-kind heirloom look. The gown is finished with a low illusion-lace back and scalloped trim.'),
(NULL,'1','Lace High-Neck Halter Sheath Wedding Dress','MELISSA SWEET','MS251192','958.00','799.00','white','0','This high-neck halter wedding dress is a fresh silhouette featuring vintage-inspired details. Linear lace paired with soutache ribbon appliques give this dress a one-of-a-kind heirloom look. The gown is finished with a low illusion-lace back and scalloped trim.'),
(NULL,'1','Black Lace Wedding Dress with Tiered Horsehair','WHITE BY VERA WANG','VW351431','1398.00','1398.00','nude','0','This White by Vera Wang strapless wedding dress catches the eye with an airy ball gown skirt, featuring light layers of chantilly lace, sheer organza, and tulle. Linear bands of horsehair grace the skirt, and the bodice is adorned with organically placed lace appliques. The daring ebony color of this gown is softened by nude lining, making it perfect for the modern and fashion-forward bride.'),
(NULL,'1','Long Sleeve Off-the-Shoulder Trumpet Wedding Dress',"JJ's BRIDAL COLLECTION",'WG3943','649.00','599.00','white','0','The beauty is in the details of this long sleeve lace and tulle mermaid dress. The off-the-shoulder neckline dips into a flattering V while clear sequins provide subtle sparkle.'),
(NULL,'1','Long Sleeve Off-the-Shoulder Trumpet Wedding Dress',"JJ's BRIDAL COLLECTION",'WG3943','649.00','599.00','ivory','0','The beauty is in the details of this long sleeve lace and tulle mermaid dress. The off-the-shoulder neckline dips into a flattering V while clear sequins provide subtle sparkle.'),
(NULL,'1','Layered Tulle One-Shoulder A-Line Wedding Dress',"WHITE BY VERA WANG",'VW351432','1398.00','898.00','white','0','This one-shoulder wedding dress from White by Vera Wang is adorned with 1,020 hand-cut and hand-placed floral appliques. The tulle skirt features airy layers of sequins and 3D flowers. Grosgrain ribbons at the waist and shoulder elevate this dreamy look.'),
(NULL,'1','Allover Lace Spaghetti Strap A-Line Wedding Dress',"GALINA",'WG3915','499.00','449.00','cashmere','0','Burnout lace forms a subtle chevron pattern on this A-line wedding dress with double spaghetti straps. The handcrafted removable flower sash, attached to a grosgrain ribbon, feels fresh and romantic.');

/**商品图片**/
INSERT INTO product_pic VALUES
/*id,  pid*/

(NULL,'9','img/products/sm/1-6-1.jpeg','img/products/md/1-6-1.jpeg','img/products/lg/1-6-1.jpeg'),
(NULL,'9','img/products/sm/1-6-2.jpeg','img/products/md/1-6-2.jpeg','img/products/lg/1-6-2.jpeg'),
(NULL,'9','img/products/sm/1-6-3.jpeg','img/products/md/1-6-3.jpeg','img/products/lg/1-6-3.jpeg'),
(NULL,'8','img/products/sm/1-5-1.jpeg','img/products/md/1-5-1.jpeg','img/products/lg/1-5-1.jpeg'),
(NULL,'8','img/products/sm/1-5-2.jpeg','img/products/md/1-5-2.jpeg','img/products/lg/1-5-2.jpeg'),
(NULL,'8','img/products/sm/1-5-3.jpeg','img/products/md/1-5-3.jpeg','img/products/lg/1-5-3.jpeg'),
(NULL,'7','img/products/sm/1-4-1.jpeg','img/products/md/1-4-1.jpeg','img/products/lg/1-4-1.jpeg'),
(NULL,'7','img/products/sm/1-4-2.jpeg','img/products/md/1-4-2.jpeg','img/products/lg/1-4-2.jpeg'),
(NULL,'7','img/products/sm/1-4-3.jpeg','img/products/md/1-4-3.jpeg','img/products/lg/1-4-3.jpeg'),
(NULL,'6','img/products/sm/1-4-1.jpeg','img/products/md/1-4-1.jpeg','img/products/lg/1-4-1.jpeg'),
(NULL,'6','img/products/sm/1-4-2.jpeg','img/products/md/1-4-2.jpeg','img/products/lg/1-4-2.jpeg'),
(NULL,'6','img/products/sm/1-4-3.jpeg','img/products/md/1-4-3.jpeg','img/products/lg/1-4-3.jpeg'),
(NULL,'5','img/products/sm/1-3-1.jpeg','img/products/md/1-3-1.jpeg','img/products/lg/1-3-1.jpeg'),
(NULL,'5','img/products/sm/1-3-2.jpeg','img/products/md/1-3-2.jpeg','img/products/lg/1-3-2.jpeg'),
(NULL,'5','img/products/sm/1-3-3.jpeg','img/products/md/1-3-3.jpeg','img/products/lg/1-3-3.jpeg'),
(NULL,'5','img/products/sm/1-3-4.jpeg','img/products/md/1-3-4.jpeg','img/products/lg/1-3-4.jpeg'),
(NULL,'4','img/products/sm/1-2-1.jpeg','img/products/md/1-2-1.jpeg','img/products/lg/1-2-1.jpeg'),
(NULL,'4','img/products/sm/1-2-2.jpeg','img/products/md/1-2-2.jpeg','img/products/lg/1-2-2.jpeg'),
(NULL,'4','img/products/sm/1-2-3.jpeg','img/products/md/1-2-3.jpeg','img/products/lg/1-2-3.jpeg'),
(NULL,'4','img/products/sm/1-2-4.jpeg','img/products/md/1-2-4.jpeg','img/products/lg/1-2-4.jpeg'),
(NULL,'4','img/products/sm/1-2-6.jpeg','img/products/md/1-2-6.jpeg','img/products/lg/1-2-6.jpeg'),
(NULL,'3','img/products/sm/1-2-1.jpeg','img/products/md/1-2-1.jpeg','img/products/lg/1-2-1.jpeg'),
(NULL,'3','img/products/sm/1-2-2.jpeg','img/products/md/1-2-2.jpeg','img/products/lg/1-2-2.jpeg'),
(NULL,'3','img/products/sm/1-2-3.jpeg','img/products/md/1-2-3.jpeg','img/products/lg/1-2-3.jpeg'),
(NULL,'3','img/products/sm/1-2-4.jpeg','img/products/md/1-2-4.jpeg','img/products/lg/1-2-4.jpeg'),
(NULL,'3','img/products/sm/1-2-5.jpeg','img/products/md/1-2-5.jpeg','img/products/lg/1-2-5.jpeg'),
(NULL,'2','img/products/sm/1-1-1.jpeg','img/products/md/1-1-1.jpeg','img/products/lg/1-1-1.jpeg'),
(NULL,'2','img/products/sm/1-1-2.jpeg','img/products/md/1-1-2.jpeg','img/products/lg/1-1-2.jpeg'),
(NULL,'2','img/products/sm/1-1-3.jpeg','img/products/md/1-1-3.jpeg','img/products/lg/1-1-3.jpeg'),
(NULL,'2','img/products/sm/1-1-4.jpeg','img/products/md/1-1-4.jpeg','img/products/lg/1-1-4.jpeg'),
(NULL,'2','img/products/sm/1-1-5.jpeg','img/products/md/1-1-5.jpeg','img/products/lg/1-1-5.jpeg'),
(NULL,'1','img/products/sm/1-1-1.jpeg','img/products/md/1-1-1.jpeg','img/products/lg/1-1-1.jpeg'),
(NULL,'1','img/products/sm/1-1-2.jpeg','img/products/md/1-1-2.jpeg','img/products/lg/1-1-2.jpeg'),
(NULL,'1','img/products/sm/1-1-3.jpeg','img/products/md/1-1-3.jpeg','img/products/lg/1-1-3.jpeg'),
(NULL,'1','img/products/sm/1-1-4.jpeg','img/products/md/1-1-4.jpeg','img/products/lg/1-1-4.jpeg'),
(NULL,'1','img/products/sm/1-1-5.jpeg','img/products/md/1-1-5.jpeg','img/products/lg/1-1-5.jpeg');


/**用户信息**/
INSERT INTO users VALUES
(NULL,'dingding','123456','ding@qq.com','13501234567','','丁伟','1'),
(NULL,'dangdang','123456','dang@qq.com','13501234568','','林当','1'),
(NULL,'doudou','123456','dou@qq.com','13501234569','','窦志强','1'),
(NULL,'yaya','123456','ya@qq.com','13501234560','','秦小雅','0');
/****首页轮播广告商品****/
/*
INSERT INTO xz_index_carousel VALUES
(NULL, 'img/index/banner1.png','轮播广告商品1','product_details.html?lid=28'),
(NULL, 'img/index/banner2.png','轮播广告商品2','product_details.html?lid=19'),
(NULL, 'img/index/banner3.png','轮播广告商品3','lookforward.html'),
(NULL, 'img/index/banner4.png','轮播广告商品4','lookforward.html');
*/
/****首页商品****/
/*
INSERT INTO xz_index_product VALUES
(NULL, 'Apple MacBook Air系列', '酷睿双核i5处理器|256GB SSD|8GB内存|英特尔HD显卡620含共享显卡内存', 'img/index/study_computer_img1.png', 6988, 'product_details.html?lid=1', 1, 1, 1),
(NULL, '小米Air 金属超轻薄', '酷睿双核i5处理器|512GB SSD|2GB内存|英特尔HD独立显卡', 'img/index/study_computer_img2.png', 3488, 'product_details.html?lid=5', 2, 2, 2),
(NULL, '联想E480C 轻薄系列', '酷睿双核i7处理器|256GB SSD|4GB内存|英特尔HD显卡680M', 'img/index/study_computer_img3.png', 5399, 'product_details.html?lid=9', 3, 3, 3),
(NULL, '华硕RX310 金属超极本', '酷睿双核i5处理器|512GB SSD|4GB内存|英特尔HD游戏级显卡', 'img/index/study_computer_img4.png', 4966, 'product_details.html?lid=13', 4, 4, 4),
(NULL, '联想小新700 电竞版游戏本', '酷睿双核i7处理器|1TGB SSD|8GB内存|英特尔HD显卡620含共享显卡内存', 'img/index/study_computer_img5.png', 6299, 'product_details.html?lid=17', 5, 5, 5),
(NULL, '戴尔灵越燃7000 轻薄窄边', '酷睿双核i5处理器|512GB SSD|2GB内存|英特尔HD显卡', 'img/index/study_computer_img3.png', 5199, 'product_details.html?lid=19', 6, 6, 6),
(NULL, '神州战神Z7M 高性价比游戏本', '酷睿双核i7处理器|1TGB SSD|8GB内存|英特尔HD游戏机独立显卡', 'img/index/study_computer_img4.png', 5799, 'product_details.html?lid=38', 0, 0, 0);
*/
