const GitHub = require( 'github-api' );
const minimatch = require( 'minimatch' );

module.exports = {
  run : ( { token, repoPatterns } = {} ) => {
    if ( ! token || ! repoPatterns ) {
      return Promise.reject( new Error( 'Missing required parameter...' ) );
    }

    const gh = new GitHub( { token } );
    const me = gh.getUser();

    return iterateOverNotifications( {
      fetch  : me.listNotifications.bind( me ),
      filter : ( notification ) => {
        return repoPatterns.reduce( ( result, pattern ) => {
          return result || minimatch( notification.repository.full_name, pattern );
        }, false );
      }
    } );
  }
};

function iterateOverNotifications( fns, page = 1, items = [] ) {
  return fns.fetch( { page } ).then( ( { headers, data } ) => {
    const regexResult = headers.link.match( /<.*?page=(\d+?)>;\srel="next"/ );

    items = [ ...items, ...data.filter( fns.filter ) ];

    if ( regexResult ) {
      return iterateOverNotifications( fns, regexResult[ 1 ], items )
    }

    return items;
  } );
}