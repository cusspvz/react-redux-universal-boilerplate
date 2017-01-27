import { locales } from 'src/locales'

function getLangFromHeaders ( req ) {
  var languagesRaw = req.headers['accept-language'] || 'NONE';
  var lparts = languagesRaw.split(',');
  var languages = [];

  for( var x=0; x<lparts.length; x++){
    var unLangParts=lparts[x].split(';');
    languages.push(unLangParts[0]);
  }

  return languages;
}

function getLangFromCookie(req, cookieName){
  if(cookieName && req.session && req.session[cookieName]){
    return req.session[cookieName];
  }else{
    if(cookieName in req.cookies){
      return req.cookies[cookieName].toString();
    }else{
      return '';
    }
  }
}

export default ( req, res, next ) => {
  function satisfied ( locale ) {
    if ( locales.indexOf( locale ) !== -1 ) {
      req.locale =
      res.locale =
        locale

      return true
    }
  }

  // Check if we have a cookie set
  const cookieLocale = getLangFromCookie( req, 'lc' )
  if ( satisfied( cookieLocale ) ) {
    return next()
  }

  const accepteds = getLangFromHeaders( req )

  for ( let accepted of accepteds ) {
    if ( satisfied( accepted ) ) {
      return next()
    }

    if ( accepted.match( '-' ) && satisfied( accepted.split('-')[0] ) ) {
      return next()
    }
  }

  // do next in case we aren't satisfied with the language
  // And set it to english
  satisfied( 'en' )
  next()
}
