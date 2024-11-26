INSERT INTO roles (role_id,name,deleted,created_at,created_by,last_modified_at,last_modified_by) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3','ROLE_COMPRADOR',false,'2024-11-17','SYSTEM','2024-11-17','SYSTEM');
INSERT INTO roles (role_id,name,deleted,created_at,created_by,last_modified_at,last_modified_by) VALUES('f9c0426d-b39f-4bb6-bd61-ea5814284aef','ROLE_INVERSOR',false,'2024-11-17','SYSTEM','2024-11-17','SYSTEM');
INSERT INTO roles (role_id,name,deleted,created_at,created_by,last_modified_at,last_modified_by) VALUES('1b4c6755-d2ad-4222-ba02-0a5c7f0a8f68','ROLE_ADMIN',false,'2024-11-17','SYSTEM','2024-11-17','SYSTEM');

INSERT INTO users (user_id,email,password,name,lastname,dni,created_at,created_by,last_modified_at,last_modified_by,deleted,is_verified) VALUES ('5244d5da-f08b-44fb-bcc9-3ecb5e561e69','admin@admin.com','$2a$10$xTJqvu37h.m9qviZbBZSA.6JF.o9vf1A./0wuUJaxuFV5FxC0rm1K','ADMIN','ADMIN','12345678','2024-11-06','SYSTEM','2024-11-06','SYSTEM',false,true);
INSERT INTO users (user_id,email,password,name,lastname,dni,created_at,created_by,last_modified_at,last_modified_by,deleted,is_verified) VALUES ('e773d697-7486-4e72-9d16-46bb004f4bd5','ktrieldev@gmail.com','$2a$10$xTJqvu37h.m9qviZbBZSA.6JF.o9vf1A./0wuUJaxuFV5FxC0rm1K','Catriel','Escobar','39340469','2024-11-06','SYSTEM','2024-11-06','SYSTEM',false,false);
INSERT INTO user_role (user_id,role_id) VALUES ('5244d5da-f08b-44fb-bcc9-3ecb5e561e69','1b4c6755-d2ad-4222-ba02-0a5c7f0a8f68');
INSERT INTO user_role (user_id,role_id) VALUES ('e773d697-7486-4e72-9d16-46bb004f4bd5','1b4c6755-d2ad-4222-ba02-0a5c7f0a8f68');

INSERT INTO loans (loan_id,interest_rate,status,term_months,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('6e239572-72bd-4d41-ba1c-07ca234d9399',18.45,'PRE_APPROVED',6,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
