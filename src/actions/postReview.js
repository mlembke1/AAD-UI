export const postReview = (object) => dispatch => {
    const options = {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
        "Content-Type": "application/json"
        },
        credentials: 'include',
        crossDomain: true
    }
    fetch('http://localhost:3000/postReview', options)
        .then(json => {
        console.log('POST_REVIEW RESPONSE ', json)
        if(json.status === 200) {
            return dispatch({ type:'POST_REVIEW_SUCCESS' })
        } else {
            return dispatch({ type:'POST_REVIEW_FAILED' })
        }
    })
    .catch(err => {
        console.log('ERROR WITH POST_REVIEW REQUEST', err)
        return dispatch({ type:'POST_REVIEW_FAILED' })
    })    
  }