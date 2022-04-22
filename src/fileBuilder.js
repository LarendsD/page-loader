import _ from 'lodash';

function fileNameBuilder(url) {
  const urlNew = new URL(url);
  const urlWithoutProtocol = url.split(`${urlNew.protocol}//`);
  return `${_.kebabCase(urlWithoutProtocol)}.html`;
}

export default fileNameBuilder;
