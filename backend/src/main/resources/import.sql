INSERT INTO roles (role_id,name,deleted,created_at,created_by,last_modified_at,last_modified_by) VALUES('340ddc49-1214-4e00-9a77-2334334b23d3','ROLE_COMPRADOR',false,'2024-11-17','SYSTEM','2024-11-17','SYSTEM');
INSERT INTO roles (role_id,name,deleted,created_at,created_by,last_modified_at,last_modified_by) VALUES('f9c0426d-b39f-4bb6-bd61-ea5814284aef','ROLE_INVERSOR',false,'2024-11-17','SYSTEM','2024-11-17','SYSTEM');
INSERT INTO roles (role_id,name,deleted,created_at,created_by,last_modified_at,last_modified_by) VALUES('1b4c6755-d2ad-4222-ba02-0a5c7f0a8f68','ROLE_ADMIN',false,'2024-11-17','SYSTEM','2024-11-17','SYSTEM');

INSERT INTO users (user_id,email,password,name,lastname,dni,created_at,created_by,last_modified_at,last_modified_by,deleted,is_verified) VALUES ('5244d5da-f08b-44fb-bcc9-3ecb5e561e69','admin@admin.com','$2a$10$xTJqvu37h.m9qviZbBZSA.6JF.o9vf1A./0wuUJaxuFV5FxC0rm1K','Juan','Perez','12345678','2024-11-06','SYSTEM','2024-11-06','SYSTEM',false,true);
INSERT INTO users (user_id,email,password,name,lastname,dni,created_at,created_by,last_modified_at,last_modified_by,deleted,is_verified) VALUES ('e773d697-7486-4e72-9d16-46bb004f4bd5','ktrieldev@gmail.com','$2a$10$xTJqvu37h.m9qviZbBZSA.6JF.o9vf1A./0wuUJaxuFV5FxC0rm1K','Catriel','Escobar','39340469','2024-11-06','SYSTEM','2024-11-06','SYSTEM',false,false);
INSERT INTO user_role (user_id,role_id) VALUES ('5244d5da-f08b-44fb-bcc9-3ecb5e561e69','1b4c6755-d2ad-4222-ba02-0a5c7f0a8f68');
INSERT INTO user_role (user_id,role_id) VALUES ('e773d697-7486-4e72-9d16-46bb004f4bd5','1b4c6755-d2ad-4222-ba02-0a5c7f0a8f68');

INSERT INTO profiles (profile_id,user_id,nationality,country,state,city,road,house_number,date_of_birth,gender,economic_activity,monthly_income,bank_account_cbu,first_name_as_in_dni,last_name_as_in_dni,education_level,mobile_phone,landline_phone,created_at,created_by,last_modified_at,last_modified_by,deleted) VALUES ('a2d2d4f6-d905-4b47-9c28-b1d75fc1b8f3','5244d5da-f08b-44fb-bcc9-3ecb5e561e69','AR','Argentina','Buenos Aires','La Plata','Av. 13','1234','1990-01-01','Male','Software Developer',2500.5,'1234567890123456789012','Juan','Perez','University Degree','+54 9 221 1234567','+54 221 543210','2024-11-17','SYSTEM','2024-11-17','SYSTEM',false);

INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('6e239572-72bd-4d41-ba1c-07ca234d9399',18.45,'PRE_APPROVED',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('80aabb53-faaa-47a3-92dd-7a61861397e9',18.45,'APPROVED',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('8621a7a1-4026-4dc1-9998-ea0d33572ca2',18.45,'PENDING',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('76208e0b-62d9-4e1d-b844-cde29a909de1',18.45,'PENDING',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('9b647c24-a67c-48c7-880e-fcc5a4157ace',18.45,'PENDING',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('ed740a82-12ae-4588-bf37-1a5debac62f2',18.45,'INITIATED',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');
INSERT INTO loans (loan_id,interest_rate,status,term_months,monthly_quota,total_amount,user_id,requested_amount,created_at,created_by,last_modified_at,last_modified_by,deleted,date_accepted) VALUES ('3340d766-a958-4f9d-b2f3-c6ddaa02327c',18.45,'INITIATED',6,2121.70,12732.00,'5244d5da-f08b-44fb-bcc9-3ecb5e561e69',11500.00,'2024-11-17','SYSTEM','2024-11-17','SYSTEM',false,'2024-11-21');


-- HOLDER
-- IDENTITY
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b2', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file1.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b3', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file2.pdf');
-- SALARY
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b4', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file3.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b5', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file4.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b6', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file5.pdf');
-- SERVICE
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b7', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file6.pdf');

/* Holder */
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('2e857b8c-376b-4526-9c7a-4fc07db6c0e1', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'IDENTITY_FRONT', 'HOLDER', NULL, 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b2', '2024-11-01');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('4797a2e9-76f4-4a4d-b612-4c88dd2a7b76', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'IDENTITY_BACK', 'HOLDER', NULL, 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b3', '2024-11-02');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('00f09a3e-e7c6-4b38-815a-69e80ba766a7', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'HOLDER', NULL, 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b4', '2024-11-03');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('9f20abb4-aa10-49ff-b421-0dfc3ccc9ab0', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'HOLDER', NULL, 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b5', '2024-11-03');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('f063d1a9-f0d9-445e-92e7-879db5f0151c', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'HOLDER', NULL, 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b6', '2024-11-03');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('7fd25109-5b2d-44f7-9ad6-f6bfb917c07f', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SERVICE_RECEIPT', 'HOLDER', NULL, 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b7', '2024-11-04');


-- GUARANTOR 1
-- IDENTITY
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b8', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file7.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4b9', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file8.pdf');
-- SERVICE
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4ba', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file9.pdf');
-- SALARY
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('df0c3b2b-3e68-4d24-bef9-5ecbededf4bb', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file10.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('977489f6-8362-48e8-8424-138693f246c6', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file10.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('22ec5127-7d09-48b7-88da-6d9a1e6db19e', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file10.pdf');-- GUARANTOR 1

/* Guarantee 1 */
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('cd60c621-fd27-4f3a-8753-bb6b8f28d833', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'IDENTITY_FRONT', 'GUARANTOR', '1', 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b8', '2024-11-05');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('3c991925-5b36-49f9-965d-68c5369c86a4', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'IDENTITY_BACK', 'GUARANTOR', '1', 'df0c3b2b-3e68-4d24-bef9-5ecbededf4b9', '2024-11-06');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('589bfa61-f53c-4c0c-8b69-fd3da30577e5', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'GUARANTOR', '1', 'df0c3b2b-3e68-4d24-bef9-5ecbededf4ba', '2024-11-07');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('589bfa61-f53c-4c0c-8b69-fd3da30577e4', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'GUARANTOR', '1', 'df0c3b2b-3e68-4d24-bef9-5ecbededf4bb', '2024-11-07');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('589bfa61-f53c-4c0c-8b69-fd3da30577e3', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'GUARANTOR', '1', '977489f6-8362-48e8-8424-138693f246c6', '2024-11-07');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('987a4ba7-b6c7-45e4-91de-87a68ec90bcb', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SERVICE_RECEIPT', 'GUARANTOR', '1', '22ec5127-7d09-48b7-88da-6d9a1e6db19e', '2024-11-08');


-- GUARANTOR 2
-- IDENTITY
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('cee13849-ac87-44dc-be67-4789475fdf0d', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file7.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('ef717a4e-34c6-42e8-bf13-aea5df2bda33', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file8.pdf');
-- SERVICE
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('811d6545-d723-46e1-af2b-c678151e11c1', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file9.pdf');
-- SALARY
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('ec4c9dbc-e6b9-43a0-a264-91c0b2441fcb', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file10.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('bb5bf587-8b52-457d-bed6-39ee24649ed1', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file10.pdf');
INSERT INTO cloud_files (cloud_file_id, public_id, url, original_file_name) VALUES ('5f8a05be-45d2-425a-a126-10ca36f771e7', 'financial-al/dpe5ankou6elu2avjczy', 'https://res.cloudinary.com/dzmzrbuta/image/upload/v1732659972/financial-al/dpe5ankou6elu2avjczy.png', 'file10.pdf');

/* Guarantee 2 */
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('dea53719-b1df-482c-909d-b72642cd2913', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'IDENTITY_FRONT', 'GUARANTOR', '2', 'cee13849-ac87-44dc-be67-4789475fdf0d', '2024-11-09');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('d6c61e4b-9dc8-4bb8-8394-926f7e7aa2b8', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'IDENTITY_BACK', 'GUARANTOR', '2', 'ef717a4e-34c6-42e8-bf13-aea5df2bda33', '2024-11-10');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('589bfa61-f53c-4c0c-8b69-fd3da30577e2', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'GUARANTOR', '2', '811d6545-d723-46e1-af2b-c678151e11c1', '2024-11-07');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('589bfa61-f53c-4c0c-8b69-fd3da30577e1', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'GUARANTOR', '2', 'ec4c9dbc-e6b9-43a0-a264-91c0b2441fcb', '2024-11-07');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('589bfa61-f53c-4c0c-8b69-fd3da30577e6', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SALARY_RECEIPT', 'GUARANTOR', '2', 'bb5bf587-8b52-457d-bed6-39ee24649ed1', '2024-11-07');
INSERT INTO loan_documentations (loan_documentation_id, loan_id, doc_type, user_type, guarantee_id, cloud_file_id, upload_date) VALUES ('ebd4752c-dc38-4afa-8f7d-42f19d96997f', '6e239572-72bd-4d41-ba1c-07ca234d9399', 'SERVICE_RECEIPT', 'GUARANTOR', '2', '5f8a05be-45d2-425a-a126-10ca36f771e7', '2024-11-08');