export const setAllQuestionsAreAnswered = allQuestionsAreAnswered => dispatch => {
    return allQuestionsAreAnswered ?  dispatch({ type:'ALL_QUESTIONS_ANSWERED' }) : dispatch({ type:'QUESTIONS_NOT_ANSWERED' })
}