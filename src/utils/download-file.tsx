export const downloadFile = async function (file: BlobPart, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([file]));
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  a.parentNode?.removeChild(a);
};
