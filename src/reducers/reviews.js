export const reviews = ( state={ 
    allReviews: null,
    postReviewFailed: false
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload }  
        case 'POST_REVIEW_SUCCESS':
          return { ...state, postReviewFailed: false }  
          case 'POST_REVIEW_FAILED':
          return { ...state, postReviewFailed: true }
    
        default:
          return state
      }
  }