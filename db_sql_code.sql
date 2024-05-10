CREATE TYPE public.accout_type AS ENUM
    ('Client', 'Employee', 'Admin');

ALTER TYPE public.accout_type
    OWNER TO cse_340_project;