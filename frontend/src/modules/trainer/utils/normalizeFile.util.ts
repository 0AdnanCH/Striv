export const normalizeFile = (file: File | FileList | null | undefined): File | null => {
  if (!file) return null;
  if (file instanceof File) return file;
  if (file instanceof FileList && file.length > 0) return file[0];
  return null;
};