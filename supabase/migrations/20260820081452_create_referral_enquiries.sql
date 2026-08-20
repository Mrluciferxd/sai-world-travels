create table public.referral_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  referral_context text not null,
  travel_intent text not null,
  preferred_timing text,
  consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  status text not null default 'new',

  constraint referral_enquiries_full_name_length
    check (
      full_name = btrim(full_name)
      and char_length(full_name) between 2 and 100
    ),
  constraint referral_enquiries_phone_length
    check (
      phone = btrim(phone)
      and char_length(phone) between 7 and 25
      and phone ~ '^[+()0-9][+()0-9 .-]{6,24}$'
    ),
  constraint referral_enquiries_email_length
    check (
      email is null
      or (
        email = btrim(email)
        and char_length(email) between 3 and 254
      )
    ),
  constraint referral_enquiries_referral_context_length
    check (
      referral_context = btrim(referral_context)
      and char_length(referral_context) between 2 and 300
    ),
  constraint referral_enquiries_travel_intent_length
    check (
      travel_intent = btrim(travel_intent)
      and char_length(travel_intent) between 10 and 1500
    ),
  constraint referral_enquiries_preferred_timing_length
    check (
      preferred_timing is null
      or (
        preferred_timing = btrim(preferred_timing)
        and char_length(preferred_timing) between 1 and 100
      )
    ),
  constraint referral_enquiries_status_allowed
    check (status in ('new', 'in_review', 'contacted', 'closed'))
);

alter table public.referral_enquiries enable row level security;

-- Existing Supabase projects can apply default Data API grants to new public
-- tables. Revoke every role first so this migration remains fail-closed under
-- both the old and new project defaults.
revoke all privileges on table public.referral_enquiries
  from public, anon, authenticated, service_role;

-- The server-only enquiry boundary creates records and the internal follow-up
-- workflow reads them. Only the operational status is mutable; PII is not.
grant select, insert on table public.referral_enquiries to service_role;
grant update (status) on table public.referral_enquiries to service_role;
