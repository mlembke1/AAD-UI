export const reviews = ( state={ 
    allReviews: null,
    allReviewsLength: null,
    allBlobs: null,
    postReviewFailed: false
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload }  
        case 'BLOBS_AQUIRED':
          return { ...state, allBlobs: action.payload }  
        case 'POST_REVIEW_SUCCESS':
          return { ...state, postReviewFailed: false }  
        case 'POST_REVIEW_FAILED':
          return { ...state, postReviewFailed: true }
        case 'ALL_REVIEWS_LENGTH_AQUIRED' :
          return { ...state, allReviewsLength: action.payload }
    
        default:
          return state
      }
  }