INSERT INTO users (id,name,email,password)
VALUES (1,'Haman','gmail','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2,'Husan','yahoo','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3,'Harmn','twitter','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description,thumbnail_photo_url,
cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,
country,street,city,province,post_code,active)
VALUES 
(1,2,'Hyatt','description','url1','url2',255,50,5,6,'CAnada','MArksam',
'Guelph','Ontario','N1H',true),
(2,3,'Mariott','description','url1','url2',255,50,5,6,'CAnada','MArksam',
'Guelph','Ontario','N1H',true),
(3,3,'Ramada','description','url1','url2',255,50,5,6,'CAnada','MArksam',
'Guelph','Ontario','N1H',true);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2018-09-11', '2018-09-26', 3, 1),
('2018-09-11', '2018-09-26', 3, 2);

INSERT INTO property_reviews (id,property_id,guest_id,reservation_id,rating,message)
VALUES (1, 1, 1, 1,4,'good'),
(2, 3, 1, 2,4,'good'),
(3, 3, 2, 3,4,'good');