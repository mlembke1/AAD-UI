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
    lastReviewID: null,
    getAnswersComplete: false,
    selectedStatsToolName: null,
    OFFquestions:  [
      {
          questionID: 1,
          question: "Proficient in Network and Graph Analytics with Link Analysis.",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 2,
          question: "Provides Geospatial Analytics",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 3,
          question: "Provides Graphical Statistical Analytics",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 4,
          question: "Provides Pattern Recognition through Predictive Analytics.",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
      {
          questionID: 5,
          question: "This tool supports numerous data-sets and is customizable.",
          answers: ["Strongly Disagree", "Disagree", "Indifferent", "Agree", "Strongly Agree"],
          type: "radio"
      },
  ],
  sortoeAnswerInputs: {
      question1Answer: "Indifferent",
      question2Answer: "Indifferent",
      question3Answer: "Indifferent",
      question4Answer: "Indifferent",
      question5Answer: "Indifferent"
  }
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
        case 'SET_SORTOE_ANSWER_INPUTS': 
          return { ...state, sortoeAnswerInputs: action.payload }
        case 'LAST_REVIEW_ID_AQUIRED':
          return { ...state, lastReviewID: action.payload }
        case 'ANSWERS_AQUIRED': 
          return { ...state, allAnswers: action.payload.totals, getAnswersComplete: true, selectedStatsToolName: action.payload.tool_name }
        default:
          return state
      }
  }