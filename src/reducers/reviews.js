export const reviews = ( state={ 
    allReviews: null,
    postReviewFailed: false,
    files: [],
    postComplete: false,
    updateComplete: false,
    deleteComplete: false,
    removeFileComplete: false,
    reviewsRequestFinished: false
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload, reviewsRequestFinished: true }  
        case 'POST_COMPLETE_FALSE':
          return { ...state, postComplete: false }  
        case 'UPDATE_COMPLETE_FALSE':
          return { ...state, updateComplete: false }  
        case 'DELETE_COMPLETE_FALSE':
          return { ...state, deleteComplete: false }  
        case 'REMOVE_FILE_COMPLETE_FALSE':
          return { ...state, removeFileComplete: false }  
        case 'POST_REVIEW_SUCCESS':
          return { ...state, postReviewFailed: false,  postComplete: true }  
        case 'POST_REVIEW_FAILED':
          return { ...state, postReviewFailed: true }
        case 'UPDATE_REVIEW_SUCCESS':
          return { ...state, updateComplete: true }
        case 'DELETE_REVIEW_SUCCESS':
          return { ...state, deleteComplete: true }
        case 'FILES_AQUIRED':
          const reviewIdAlreadyExists = state.files.filter(file => file.review_id == action.payload.response.review_id).length > 0
          if(reviewIdAlreadyExists){
            const updatedFiles = state.files.map(file => {
              if(file.review_id == action.payload.response.review_id){
                file = action.payload.response
              }
              return file
            })
              return { ...state, files: [...updatedFiles]}
          } else {
              return { ...state, files: [...state.files, action.payload.response]}
          }
        case 'CLEAR_FILES': 
          return { ...state, files: [] }
        case 'REMOVE_FILE_SUCCESS': 
          return { ...state, files: state.files.filter(file => file.review_id != action.payload.reviewId), removeFileComplete: true }
    
        default:
          return state
      }
  }