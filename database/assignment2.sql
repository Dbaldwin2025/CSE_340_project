INSERT INTO public.account (account_id, account_firstname, 
	account_lastname, account_email, account_password)
VALUES (DEFAULT, 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

DELETE FROM account
WHERE account_id = 1;


UPDATE public.inventory 
SET inv_description = REPLACE(inv_description , 'small interiors', 'a huge interior') 
WHERE inv_model = 'Hummer';
