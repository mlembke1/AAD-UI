export const tools = ( state={ 
    allTools: [],
    sortoeDataSets: ['WorldBank', 'FragileState', 'EconomicFreedom', 'GlobalPeace', 'GlobalTerror', 'USAid']
   }, action) => {
      switch(action.type){

        case 'TOOLS_AQUIRED':
          return { ...state, allTools: action.payload }  
  
        default:
          return state
      }
  }