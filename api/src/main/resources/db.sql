CREATE TABLE Item(
	item_id INT NOT NULL AUTO_INCREMENT,
	price DECIMAL(10,2) NOT NULL,
	description VARCHAR(255) DEFAULT '',
	PRIMARY KEY(item_id)
);

CREATE TABLE Category(
	cate_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	parent_id INT DEFAULT 0,
	PRIMARY KEY(cate_id),
	CONSTRAINT fk_cate FOREIGN KEY(parent_id) REFERENCES Category (cate_id) 
);

CREATE TABLE Inventory(
	id INT NOT NULL AUTO_INCREMENT,
	item_id INT NOT NULL,
	cate_id INT NOT NULL,
	quantity INT NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT fk_inven_item FOREIGN KEY(item_id) REFERENCES Item(item_id) ON DELETE CASCADE,
	CONSTRAINT fk_inven_cate FOREIGN KEY(cate_id) REFERENCES Category(cate_id)
);

INSERT INTO Item (price, description, item_name) VALUES(13.22, 'Frist Item inserted', "First");
INSERT INTO Item (price, description, item_name) VALUES(165.11, 'Second Item inserted', "Second");
INSERT INTO Item (price, description, item_name) VALUES(15, 'Third Item inserted', "Third");
INSERT INTO Item (price, description, item_name) VALUES(19.1, 'Forth Item inserted', "Forth");
INSERT INTO Item (price, description, item_name) VALUES(2019.06, 'Fifth Item inserted', "Fifth");
INSERT INTO Item (price, description, item_name) VALUES(2, 'Sixth Item inserted', "Sixth");
INSERT INTO Item (price, description, item_name) VALUES(0.58, 'Seventh Item inserted', "Seventh");
INSERT INTO Item (price, description, item_name) VALUES(189.11, 'Eighth Item inserted', "Eighth");
INSERT INTO Item (price, description, item_name) VALUES(195, 'Ninth Item inserted', "Ninth");
INSERT INTO Item (price, description, item_name) VALUES(2019.05, 'Tenth Item inserted', "Tenth");



INSERT INTO Category (name, parent_id) VALUES('Category 1', null); 
INSERT INTO Category (name, parent_id) VALUES('Category 2', null);
INSERT INTO Category (name, parent_id) VALUES('Category 3', null);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 2-1', 2);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 2-2', 2);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 2-3', 2);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 3-1', 3);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 3-2', 3);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 2-2-1', 5);
INSERT INTO Category (name, parent_id) VALUES('SubCategory 2-2-1-1', 9);

INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (1, 1, 3);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (2, 1, 10);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (3, 2, 2);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (4, 4, 55);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (5, 5, 12);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (6, 7, 3);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (7, 7, 6);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (8, 4, 999);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (9, 5, 15);
INSERT INTO Inventory (item_id, cate_id, quantity) VALUES (10, 10, 6);
