export const reviews = ( state={ 
    allReviews: null,
    allPublicReviews: null,
    postReviewFailed: false,
    files: [],
    postComplete: false,
    updateComplete: false,
    deleteComplete: false,
    removeFileComplete: false,
    reviewsRequestFinished: false,
    publicReviewsRequestFinished: false,
    allQuestionsAreIndifferent: true,
    sortoeQuestions:  [
      {
          questionID: 1,
          tool: 'MEADE/SORT-OE',
          question: "Here is question one. What do you think?",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 2,
          tool: 'MEADE/SORT-OE',
          question: "Here is question two. What do you think?",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 3,
          tool: 'MEADE/SORT-OE',
          question: "Here is question three. What do you think?",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 4,
          tool: 'MEADE/SORT-OE',
          question: "Here is question four. What do you think?",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 5,
          tool: 'MEADE/SORT-OE',
          question: "Here is question five. What do you think?",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
  ]
   }, action) => {
      switch(action.type){
        case 'REVIEWS_AQUIRED':
          return { ...state, allReviews: action.payload, reviewsRequestFinished: true }  
        case 'PUBLIC_REVIEWS_AQUIRED':
          return { ...state, allPublicReviews: action.payload, publicReviewsRequestFinished: true }  
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
        case 'ALL_QUESTIONS_INDIFFERENT': 
          return { ...state, allQuestionsAreIndifferent: true }
        case 'QUESTIONS_NOT_INDIFFERENT': 
          return { ...state, allQuestionsAreIndifferent: false }
    
        default:
          return state
      }
  }