-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create table
    public.profiles (
        id bigint primary key generated always as identity,
        avatar_url text
    )

create or replace function delete_storage_object(bucket text, object text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
declare
  project_url text := 'https://janbrtgwtomzffqqcmfo.supabase.co';
  service_role_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbmJydGd3dG9temZmcXFjbWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0MTIyODAsImV4cCI6MjAwODk4ODI4MH0.y4_dDCcIsckWGDBMa9c-LYF4j52ZOnu2cXyqZvV8y64'; --  full access needed
  url text := project_url||'/storage/v1/object/'||bucket||'/'||object;
begin
  select
      into status, content
           result.status::int, result.content::text
      FROM extensions.http((
    'DELETE',
    url,
    ARRAY[extensions.http_header('authorization','Bearer '||service_role_key)],
    NULL,
    NULL)::extensions.http_request) as result;
end;
$$;

create or replace function delete_avatar(avatar_url text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('avatars', avatar_url) as result;
end;
$$;

-- 2da parte
CREATE OR REPLACE FUNCTION DELETE_OLD_AVATAR() RETURNS 
TRIGGER LANGUAGE 'PLPGSQL' SECURITY DEFINER AS $$ 
	$$ declare status int;
	content text;
	avatar_name text;
	begin if coalesce(old.avatar_url, '') <> ''
	and (
	    tg_op = 'DELETE'
	    or (
	        old.avatar_url <> coalesce(new.avatar_url, '')
	    )
	) then -- extract avatar name
	avatar_name := old.avatar_url;
	select
	    into status,
	    content result.status,
	    result.content
	from
	    public.delete_avatar(avatar_name) as result;
	if status <> 200 then raise warning 'Could not delete avatar: % %',
	status,
	content;
	end if;
	end if;
	if tg_op = 'DELETE' then return old;
	end if;
	return new;
	end;
	$$;


CREATE TRIGGER BEFORE_PROFILE_CHANGES 
	before_profile_changes before
	update of avatar_url or
	delete
	    on public.profiles for each row
	execute
	    function public.delete_old_avatar();


-- 3ra parte

CREATE OR REPLACE FUNCTION DELETE_OLD_PROFILE() RETURNS 
TRIGGER LANGUAGE 'PLPGSQL' SECURITY DEFINER AS $$ 
	$$ begin delete from public.profiles where id = old.id;
	return old;
	end;
	$$;


CREATE TRIGGER BEFORE_DELETE_USER 
	before_delete_user before
	delete on auth.users for each row
	execute
	    function public.delete_old_profile();



-- -- Habilitar la seguridad a nivel de fila en la tabla
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- -- Crear una función de política que permite la actualización del avatar por el propio usuario
-- CREATE OR REPLACE FUNCTION allow_update_own_avatar()
-- RETURNS BOOLEAN AS $$
--   SELECT true
--   FROM profiles
--   WHERE
--     avatar_url = current_setting('app.current_user_avatar_url', true)::TEXT
--     AND id = current_setting('app.current_user_id', true)::INTEGER;
-- $$ LANGUAGE SQL;

-- -- Crear una política basada en la función definida anteriormente
-- CREATE POLICY update_own_avatar_policy
--   ON profiles
--   FOR UPDATE
--   USING (allow_update_own_avatar());
