export function getFilenameFromFirebaseURL(url: string) {
  // Decodificar os caracteres especiais no URL
  const decodedUrl = decodeURIComponent(url);

  // Encontrar a posição do último '/' para começar a extração do nome do arquivo
  const lastSlashIndex = decodedUrl.lastIndexOf("/");

  // Se o URL tiver parâmetros (após ?), vamos separá-los
  const queryIndex = decodedUrl.indexOf("?", lastSlashIndex);

  // Se não houver '?', o nome do arquivo é o que vem depois do último '/'
  if (queryIndex === -1) {
    return decodedUrl.substring(lastSlashIndex + 1);
  }

  // Caso contrário, extrai o nome do arquivo até o '?'
  return decodedUrl.substring(lastSlashIndex + 1, queryIndex);
}
