// Função para extrair metadados pelo nome da propriedade
function getMetaDataByProperty(propertyName) {
  const metaTags = document.getElementsByTagName('meta');

  for (let i = 0; i < metaTags.length; i++) {
    const metaTag = metaTags[i];
    const property = metaTag.getAttribute('property');
    if (property === propertyName) {
      return metaTag.getAttribute('content');
    }
  }
  return null;
}

