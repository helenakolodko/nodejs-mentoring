-- Table: public.users

-- DROP TABLE public.users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE public.users
(
    id uuid NOT NULL,
    login character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    is_deleted boolean NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

CREATE TABLE public.groups
(
    id uuid NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    permissions character varying[] COLLATE pg_catalog."default",
    CONSTRAINT groups_pkey PRIMARY KEY (id)
)

CREATE TABLE public.user_groups
(
    user_id uuid REFERENCES public.users NOT NULL ON DELETE CASCADE,
    group_id uuid NOT NULL REFERENCES public.groups ON DELETE CASCADE,
    CONSTRAINT user_group_pkey PRIMARY KEY (user_id, group_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;
ALTER TABLE public.groups
    OWNER to postgres;
	
INSERT INTO users (id, login, password, age, is_deleted) VALUES (uuid_generate_v4(),'BruceS', 'password1', 45, false);
INSERT INTO users (id, login, password, age, is_deleted) VALUES (uuid_generate_v4(), 'RobertP', 'password2', 57, false);
INSERT INTO users (id, login, password, age, is_deleted) VALUES (uuid_generate_v4(),'SFender ', 'password3', 23, false);             
INSERT INTO users (id, login, password, age, is_deleted) VALUES (uuid_generate_v4(), 'DavidG', 'password4', 12, false);
INSERT INTO users (id, login, password, age, is_deleted) VALUES (uuid_generate_v4(), 'JBonham', 'password5', 32, false);


INSERT INTO public.groups(id, name, permissions) VALUES (uuid_generate_v4(), 'test', ARRAY['READ', 'WRITE']);
INSERT INTO public.groups(id, name, permissions) VALUES (uuid_generate_v4(), 'test1', ARRAY['READ']);