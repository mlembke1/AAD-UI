export const reviews = ( state={ 
    allReviews: null,
    postReviewFailed: false,
    files: [],
    isFetching: false,
    postComplete: false,
    reviewsRequestFinished: false
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload, reviewsRequestFinished: true }  
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
          const reviewIdAlreadyExists = state.files.filter(file => file.review_id == action.payload.response.review_id).length > 0
          if(reviewIdAlreadyExists){
            const updatedFiles = state.files.map(file => {
              if(file.review_id == action.payload.response.review_id){
                file = action.payload.response
              }
              return file
            })
            if(action.payload.lastFileToBeFetched) {
              return { ...state, files: [...updatedFiles], isFetching: false }
            } else {
              return { ...state, files: [...updatedFiles] }
            }
          } else {
            if(action.payload.lastFileToBeFetched) {
              return { ...state, files: [...state.files, action.payload.response], isFetching: false}
            } else {
              return { ...state, files: [...state.files, action.payload.response]}
            }
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