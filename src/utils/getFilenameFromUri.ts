export function getFilenameFromURI(uri: string) {
  const withoutPrefix = uri.replace("file://", "");

  const parts = withoutPrefix.split("/");

  return parts[parts.length - 1];
}
