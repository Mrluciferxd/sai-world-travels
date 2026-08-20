begin;

select plan(21);

select has_table(
  'public',
  'referral_enquiries',
  'public.referral_enquiries exists'
);

select is(
  (
    select array_agg(attribute.attname::text order by attribute.attnum)
    from pg_catalog.pg_attribute as attribute
    where attribute.attrelid = 'public.referral_enquiries'::regclass
      and attribute.attnum > 0
      and not attribute.attisdropped
  ),
  array[
    'id',
    'full_name',
    'phone',
    'email',
    'referral_context',
    'travel_intent',
    'preferred_timing',
    'consent_at',
    'created_at',
    'status'
  ]::text[],
  'the enquiry table contains only the approved minimal fields'
);

select col_is_pk(
  'public',
  'referral_enquiries',
  'id',
  'id is the primary key'
);

select is(
  (
    select array_agg(column_name::text order by ordinal_position)
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'referral_enquiries'
      and is_nullable = 'YES'
  ),
  array['email', 'preferred_timing']::text[],
  'only email and preferred timing are optional'
);

select is(
  (
    select data_type::text
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'referral_enquiries'
      and column_name = 'consent_at'
  ),
  'timestamp with time zone',
  'consent_at is timezone-aware'
);

select is(
  (
    select data_type::text
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'referral_enquiries'
      and column_name = 'created_at'
  ),
  'timestamp with time zone',
  'created_at is timezone-aware'
);

select is(
  (
    select array_agg(constraint_row.conname::text order by constraint_row.conname)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.contype = 'c'
  ),
  array[
    'referral_enquiries_email_length',
    'referral_enquiries_full_name_length',
    'referral_enquiries_phone_length',
    'referral_enquiries_preferred_timing_length',
    'referral_enquiries_referral_context_length',
    'referral_enquiries_status_allowed',
    'referral_enquiries_travel_intent_length'
  ]::text[],
  'bounded text and status constraints are installed'
);

select matches(
  (
    select pg_get_constraintdef(constraint_row.oid)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.conname = 'referral_enquiries_full_name_length'
  ),
  'char_length\(full_name\) >= 2.*char_length\(full_name\) <= 100',
  'full name accepts only 2 to 100 characters'
);

select matches(
  (
    select pg_get_constraintdef(constraint_row.oid)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.conname = 'referral_enquiries_phone_length'
  ),
  'char_length\(phone\) >= 7.*char_length\(phone\) <= 25',
  'phone accepts only 7 to 25 characters'
);

select matches(
  (
    select pg_get_constraintdef(constraint_row.oid)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.conname = 'referral_enquiries_referral_context_length'
  ),
  'char_length\(referral_context\) >= 2.*char_length\(referral_context\) <= 300',
  'referral context accepts only 2 to 300 characters'
);

select matches(
  (
    select pg_get_constraintdef(constraint_row.oid)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.conname = 'referral_enquiries_travel_intent_length'
  ),
  'char_length\(travel_intent\) >= 10.*char_length\(travel_intent\) <= 1500',
  'travel intent accepts only 10 to 1500 characters'
);

select matches(
  (
    select pg_get_constraintdef(constraint_row.oid)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.conname = 'referral_enquiries_preferred_timing_length'
  ),
  'char_length\(preferred_timing\) >= 1.*char_length\(preferred_timing\) <= 100',
  'preferred timing is optional and capped at 100 characters'
);

select matches(
  (
    select pg_get_constraintdef(constraint_row.oid)
    from pg_catalog.pg_constraint as constraint_row
    where constraint_row.conrelid = 'public.referral_enquiries'::regclass
      and constraint_row.conname = 'referral_enquiries_status_allowed'
  ),
  '''new''::text.*''in_review''::text.*''contacted''::text.*''closed''::text',
  'status is limited to the four internal workflow states'
);

select ok(
  (
    select relation.relrowsecurity
    from pg_catalog.pg_class as relation
    where relation.oid = 'public.referral_enquiries'::regclass
  ),
  'row level security is enabled'
);

select is(
  (
    select count(*)::integer
    from pg_catalog.pg_policy as policy
    where policy.polrelid = 'public.referral_enquiries'::regclass
  ),
  0,
  'no row-level policies expose enquiries'
);

select is(
  coalesce(
    (
      select array_agg(privilege_type::text order by privilege_type)
      from information_schema.table_privileges
      where table_schema = 'public'
        and table_name = 'referral_enquiries'
        and grantee = 'PUBLIC'
    ),
    array[]::text[]
  ),
  array[]::text[],
  'PUBLIC has no table privileges'
);

select is(
  coalesce(
    (
      select array_agg(privilege_type::text order by privilege_type)
      from information_schema.table_privileges
      where table_schema = 'public'
        and table_name = 'referral_enquiries'
        and grantee = 'anon'
    ),
    array[]::text[]
  ),
  array[]::text[],
  'anon has no table privileges'
);

select is(
  coalesce(
    (
      select array_agg(privilege_type::text order by privilege_type)
      from information_schema.table_privileges
      where table_schema = 'public'
        and table_name = 'referral_enquiries'
        and grantee = 'authenticated'
    ),
    array[]::text[]
  ),
  array[]::text[],
  'authenticated has no table privileges'
);

select is(
  coalesce(
    (
      select array_agg(privilege_type::text order by privilege_type)
      from information_schema.table_privileges
      where table_schema = 'public'
        and table_name = 'referral_enquiries'
        and grantee = 'service_role'
    ),
    array[]::text[]
  ),
  array['INSERT', 'SELECT']::text[],
  'service_role has only table-level INSERT and SELECT'
);

select is(
  coalesce(
    (
      select array_agg(column_name::text order by column_name)
      from information_schema.column_privileges
      where table_schema = 'public'
        and table_name = 'referral_enquiries'
        and grantee = 'service_role'
        and privilege_type = 'UPDATE'
    ),
    array[]::text[]
  ),
  array['status']::text[],
  'service_role can update only status'
);

select is(
  (
    select count(*)::integer
    from pg_catalog.pg_trigger as trigger_row
    where trigger_row.tgrelid = 'public.referral_enquiries'::regclass
      and not trigger_row.tgisinternal
  ),
  0,
  'the table has no user-defined triggers'
);

select * from finish();

rollback;
