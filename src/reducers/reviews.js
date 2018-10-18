export const reviews = ( state={ 
    allReviews: null,
    postReviewFailed: false,
    files: [],
    isFetching: false,
    postComplete: false
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload }  
        case 'POST_COMPLETE_FALSE':
          return { ...state, postComplete: false }  
        case 'POST_REVIEW_SUCCESS':
          return { ...state, postReviewFailed: false,  postComplete: true }  
        case 'POST_REVIEW_FAILED':
          return { ...state, postReviewFailed: true }
        case 'SET_IS_FETCHING':
          return { ...state, isFetching: true }
        case 'SET_IS_FETCHING_FALSE': 
          return { ...state, isFetching: false }
        case 'FILES_AQUIRED':
          const reviewIdAlreadyExists = state.files.filter(file => file.review_id == action.payload.review_id).length > 0
          if(reviewIdAlreadyExists){
            const updatedFiles = state.files.map(file => {
              if(file.review_id == action.payload.review_id){
                file = action.payload
              }
              return file
            })
            return { ...state, files: [...updatedFiles], isFetching: false }
          } else {
            return { ...state, files: [...state.files, action.payload], isFetching: false }
          }
        case 'CLEAR_FILES': 
          return { ...state, files: [] }
        case 'FILE_DOES_NOT_EXIST': 
          return { ...state, isFetching: false }
        case 'REMOVE_FILE': 
          return { ...state, files: state.files.filter(file => file.review_id != action.payload.reviewId) }
    
        default:
          return state
      }
  }