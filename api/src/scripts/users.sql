-- Table: public.users

-- DROP TABLE public.users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE public.users
(
    id uuid NOT NULL,
    login character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;
	
INSERT INTO users (id, login, password, age, "isDeleted") VALUES (uuid_generate_v4(),'BruceS', 'password1', 45, false);
INSERT INTO users (id, login, password, age, "isDeleted") VALUES (uuid_generate_v4(), 'RobertP', 'password2', 57, false);
INSERT INTO users (id, login, password, age, "isDeleted") VALUES (uuid_generate_v4(),'SFender ', 'password3', 23, false);             
INSERT INTO users (id, login, password, age, "isDeleted") VALUES (uuid_generate_v4(), 'DavidG', 'password4', 12, false);
INSERT INTO users (id, login, password, age, "isDeleted") VALUES (uuid_generate_v4(), 'JBonham', 'password5', 32, false);
