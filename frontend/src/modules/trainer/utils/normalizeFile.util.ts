export const normalizeFile = (v: any): File | null => {
  if (!v) return null;
  if (v instanceof File) return v;
  if (typeof FileList !== 'undefined' && v instanceof FileList) return v.length > 0 ? v[0] : null;
  if (Array.isArray(v) && v.length > 0 && v[0] instanceof File) return v[0];
  return null;
};