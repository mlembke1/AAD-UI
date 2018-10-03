export const reviews = ( state={ 
    allReviews: null,
    postReviewFailed: false,
    files: null
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload }  
        case 'POST_REVIEW_SUCCESS':
          return { ...state, postReviewFailed: false }  
        case 'POST_REVIEW_FAILED':
          return { ...state, postReviewFailed: true }
        case 'FILES_AQUIRED':
          return { ...state, files: [...state.files, action.payload] }
        case 'CLEAR_FILES': 
          return { ...state, files: [] }
    
        default:
          return state
      }
  }