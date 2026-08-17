export const listFrom = (payload, keys = ['posts', 'categories']) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
    if (Array.isArray(payload?.data?.[key])) return payload.data[key];
  }
  return Array.isArray(payload?.data) ? payload.data : [];
};

export const totalFrom = (payload, list) =>
  payload?.total ?? payload?.count ?? payload?.pagination?.total ?? payload?.pagination?.totalItems ??
  payload?.data?.total ?? payload?.data?.pagination?.total ?? payload?.data?.pagination?.totalItems ?? list.length;

export const entityFrom = (payload, key) => payload?.[key] || payload?.data?.[key] || payload?.data || payload;

export const formatDate = (value) => value ? new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value)) : '—';
