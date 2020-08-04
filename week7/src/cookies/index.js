/**
 *
 *  :: cookies.js ::
 *
 *  A complete cookies reader/writer framework with full unicode support.
 *
 * https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 *
 * This framework is released under the GNU Public License, version 3 or later.
 * http://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * Syntaxes:
 *  - docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 *  - docCookies.getItem(name)
 *  - docCookies.removeItem(name[, path], domain)
 *  - docCookies.hasItem(name)
 *  - docCookies.keys()
 *
 */
const cookies = {
  getItem(sKey) {
    return decodeURIComponent(
      document.cookie.replace(
        new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`),
        '$1',
      ),
    ) || null;
  },
  setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false; }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
          break;
        case String:
          sExpires = `; expires=${vEnd}`;
          break;
        case Date:
          sExpires = `; expires=${vEnd.toUTCString()}`;
          break;
        default:
          break;
      }
    }
    document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${(sDomain ? `; domain=${sDomain}` : '')}${(sPath ? `; path=${sPath}` : '')}${(bSecure ? '; secure' : '')}`;
    return true;
  },
  removeItem(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${(sDomain ? `; domain=${sDomain}` : '')}${(sPath ? `; path=${sPath}` : '')}`;
    return true;
  },
  hasItem(sKey) {
    return (new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`)).test(document.cookie);
  },
};

export default cookies;
