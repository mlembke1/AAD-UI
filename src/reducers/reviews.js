export const reviews = ( state={ 
    allReviews: null,
    postReviewFailed: false,
    files: []
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload }  
        case 'POST_REVIEW_SUCCESS':
          return { ...state, postReviewFailed: false }  
        case 'POST_REVIEW_FAILED':
          return { ...state, postReviewFailed: true }
        case 'FILES_AQUIRED':
          const reviewIdAlreadyExists = state.files.filter(file => file.review_id == action.payload.review_id).length > 0
          if(reviewIdAlreadyExists){
            const updatedFiles = state.files.map(file => {
              if(file.review_id == action.payload.review_id){
                file = action.payload
              }
              return file
            })
            return { ...state, files: [...updatedFiles] }
          } else {
            return { ...state, files: [...state.files, action.payload] }
          }
        case 'CLEAR_FILES': 
          return { ...state, files: [] }
    
        default:
          return state
      }
  }