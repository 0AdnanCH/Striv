import { z } from 'zod';

export const FileSchema = z.custom<File>((val) => val instanceof File, {
  error: (iss) => { 
    if(iss.input === null || iss.input === undefined) return 'File is required';
    return 'Invalid file type selected';
  },
});

export const FileListSchema = z.custom<FileList>(
  (val) => val instanceof FileList,
  { message: "Invalid file list" }
);