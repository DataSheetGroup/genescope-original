--
-- PostgreSQL database dump
--

\restrict MtBFnYoqqcDEBnqYejBBcbaQrdPlAd8oogEL65zwDA3IxOrSYcyqhG3k3eLRfeR

-- Dumped from database version 14.23
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: password_resets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_resets (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(128) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    used boolean NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: password_resets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.password_resets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: password_resets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.password_resets_id_seq OWNED BY public.password_resets.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash bytea NOT NULL,
    full_name character varying(255),
    role character varying(32) NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp without time zone NOT NULL,
    last_login_at timestamp without time zone,
    phone character varying(64),
    organization character varying(255),
    bio text,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: password_resets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_resets ALTER COLUMN id SET DEFAULT nextval('public.password_resets_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_resets (id, user_id, token, expires_at, used, created_at) FROM stdin;
1	1	DeLfjkjAIXi_kvDign9ENJ-DeKrlrBFWS075LF9mxdKziMDj45-oWUOL3pS5Rfx-	2026-07-12 00:08:17.771253	f	2026-07-11 23:08:17.854355
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password_hash, full_name, role, is_active, created_at, last_login_at, phone, organization, bio, updated_at) FROM stdin;
2	hello@partneredcompany.com	\\x243262243132247a47734161445035764355466e56417736356874324f75635133426b5a686a456c4e35416255304a526378564b4b325a4b63557569	Hello	viewer	t	2026-07-12 00:14:41.731774	\N	\N	\N	\N	2026-07-12 00:17:18.229402
3	genescope@partneredcompany.com	\\x243262243132246f6a4f62496832384c6b7a47656650304b424e64664f56394b5a566a53777a6c5251745a556d675276596863364c50506e6c486743	GeneScope	viewer	t	2026-07-12 00:15:33.046295	2026-07-12 00:17:25.60051	+639608462554	FEU TECH	\N	2026-07-12 00:17:25.602001
1	you@datasheetgroup.com	\\x24326224313224714c71622f4d6d38555a3856593930652f366a37774f537746786c62766b774e4464485038714c6a56454158714e4d51577a474e69	Jane Dela Cruz	viewer	t	2026-07-11 21:54:16.895448	2026-07-12 08:28:16.766745	+63 987654321	FEU Institute of Technology	A short Description	2026-07-12 08:28:16.770498
\.


--
-- Name: password_resets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.password_resets_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: password_resets password_resets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_password_resets_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ix_password_resets_token ON public.password_resets USING btree (token);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: password_resets password_resets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict MtBFnYoqqcDEBnqYejBBcbaQrdPlAd8oogEL65zwDA3IxOrSYcyqhG3k3eLRfeR

