export const tools = ( state={ 
    allTools: null
   }, action) => {
      switch(action.type){

        case 'TOOLS_AQUIRED':
          return { ...state, allTools: action.payload }  
  
        default:
          return state
      }
  }