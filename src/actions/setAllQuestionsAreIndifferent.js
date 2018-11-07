export const setAllQuestionsAreIndifferent = allQuestionsAreIndifferent => dispatch => {
    return allQuestionsAreIndifferent ?  dispatch({ type:'ALL_QUESTIONS_INDIFFERENT' }) : dispatch({ type:'QUESTIONS_NOT_INDIFFERENT' })
}