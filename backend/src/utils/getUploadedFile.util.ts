export function getUploadedFile(fileInput: Express.Multer.File[] | undefined): Express.Multer.File | null {
  if (!fileInput || fileInput.length === 0) return null;
  return fileInput[0];
}
