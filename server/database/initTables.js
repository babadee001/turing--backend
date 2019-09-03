let queryText = '';
queryText += `
CREATE TABLE IF NOT EXISTS department (
    department_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    PRIMARY KEY (department_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS category (
    category_id INT NOT NULL AUTO_INCREMENT,
    department_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description   VARCHAR(1000),
    PRIMARY KEY (category_id),
    KEY idx_category_department_id (department_id)
  ) ENGINE=MyISAM;
  
  
  CREATE TABLE IF NOT EXISTS product (
    product_id       INT           NOT NULL  AUTO_INCREMENT,
    name             VARCHAR(100)  NOT NULL,
    description      VARCHAR(1000) NOT NULL,
    price            DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
    image            VARCHAR(150),
    image_2          VARCHAR(150),
    thumbnail        VARCHAR(150),
    display          SMALLINT(6)   NOT NULL  DEFAULT '0',
    PRIMARY KEY  (product_id),
    FULLTEXT KEY idx_ft_product_name_description (name, description)
  ) ENGINE=MyISAM;
  
  
  CREATE TABLE IF NOT EXISTS product_category (
    product_id  INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS attribute (
    attribute_id INT          NOT NULL  AUTO_INCREMENT,
    name         VARCHAR(100) NOT NULL, -- E.g. Color, Size
    PRIMARY KEY (attribute_id)
  ) ENGINE=MyISAM;
  
  
  CREATE TABLE IF NOT EXISTS attribute_value (
    attribute_value_id INT          NOT NULL  AUTO_INCREMENT,
    attribute_id       INT          NOT NULL, -- The ID of the attribute
    value              VARCHAR(100) NOT NULL, -- E.g. Yellow
    PRIMARY KEY (attribute_value_id),
    KEY idx_attribute_value_attribute_id (attribute_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS product_attribute (
    product_id         INT NOT NULL,
    attribute_value_id INT NOT NULL,
    PRIMARY KEY (product_id, attribute_value_id)
  ) ENGINE=MyISAM;
  
  
  CREATE TABLE IF NOT EXISTS shopping_cart (
    item_id     INT           NOT NULL  AUTO_INCREMENT,
    cart_id     CHAR(32)      NOT NULL,
    product_id  INT           NOT NULL,
    attributes  VARCHAR(1000) NOT NULL,
    quantity    INT           NOT NULL,
    buy_now     BOOL          NOT NULL  DEFAULT true,
    added_on    DATETIME      NOT NULL,
    PRIMARY KEY (item_id),
    KEY idx_shopping_cart_cart_id (cart_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS orders (
    order_id     INT           NOT NULL  AUTO_INCREMENT,
    total_amount DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
    created_on   DATETIME      NOT NULL,
    shipped_on   DATETIME,
    status       INT           NOT NULL  DEFAULT '0',
    comments     VARCHAR(255),
    customer_id  INT,
    auth_code    VARCHAR(50),
    reference    VARCHAR(50),
    shipping_id  INT,
    tax_id       INT,
    PRIMARY KEY  (order_id),
    KEY idx_orders_customer_id (customer_id),
    KEY idx_orders_shipping_id (shipping_id),
    KEY idx_orders_tax_id (tax_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS order_detail (
    item_id      INT           NOT NULL  AUTO_INCREMENT,
    order_id     INT           NOT NULL,
    product_id   INT           NOT NULL,
    attributes   VARCHAR(1000) NOT NULL,
    product_name VARCHAR(100)  NOT NULL,
    quantity     INT           NOT NULL,
    unit_cost    DECIMAL(10,2) NOT NULL,
    PRIMARY KEY  (item_id),
    KEY idx_order_detail_order_id (order_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS shipping_region (
    shipping_region_id INT          NOT NULL  AUTO_INCREMENT,
    shipping_region    VARCHAR(100) NOT NULL,
    PRIMARY KEY  (shipping_region_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS customer (
    customer_id        INT           NOT NULL AUTO_INCREMENT,
    name               VARCHAR(50)   NOT NULL,
    email              VARCHAR(100)  NOT NULL,
    password           VARCHAR(50)   NOT NULL,
    credit_card        TEXT,
    address_1          VARCHAR(100),
    address_2          VARCHAR(100),
    city               VARCHAR(100),
    region             VARCHAR(100),
    postal_code        VARCHAR(100),
    country            VARCHAR(100),
    shipping_region_id INT           NOT NULL default '1',
    day_phone          varchar(100),
    eve_phone          varchar(100),
    mob_phone          varchar(100),
    PRIMARY KEY  (customer_id),
    UNIQUE KEY idx_customer_email (email),
    KEY idx_customer_shipping_region_id (shipping_region_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS shipping (
    shipping_id        INT            NOT NULL AUTO_INCREMENT,
    shipping_type      VARCHAR(100)   NOT NULL,
    shipping_cost      NUMERIC(10, 2) NOT NULL,
    shipping_region_id INT            NOT NULL,
    PRIMARY KEY (shipping_id),
    KEY idx_shipping_shipping_region_id (shipping_region_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS tax (
    tax_id         INT            NOT NULL  AUTO_INCREMENT,
    tax_type       VARCHAR(100)   NOT NULL,
    tax_percentage NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (tax_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS audit (
    audit_id       INT      NOT NULL AUTO_INCREMENT,
    order_id       INT      NOT NULL,
    created_on     DATETIME NOT NULL,
    message        TEXT     NOT NULL,
    code           INT      NOT NULL,
    PRIMARY KEY (audit_id),
    KEY idx_audit_order_id (order_id)
  ) ENGINE=MyISAM;
  
  CREATE TABLE IF NOT EXISTS review (
    review_id   INT      NOT NULL  AUTO_INCREMENT,
    customer_id INT      NOT NULL,
    product_id  INT      NOT NULL,
    review      TEXT     NOT NULL,
    rating      SMALLINT NOT NULL,
    created_on  DATETIME NOT NULL,
    PRIMARY KEY (review_id),
    KEY idx_review_customer_id (customer_id),
    KEY idx_review_product_id (product_id)
  ) ENGINE=MyISAM;
  
`;
const createTables = queryText;
export default createTables;
