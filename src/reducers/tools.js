export const tools = ( state={ 
    allTools: [],
    MEADEDataSets: ['WorldBank', 'FragileState', 'EconomicFreedom', 'GlobalPeace', 'GlobalTerror', 'USAid'],
    AtNDataSets: ["Data sources not publicly shared yet."]
   }, action) => {
      switch(action.type){

        case 'TOOLS_AQUIRED':
          return { ...state, allTools: action.payload }  
  
        default:
          return state
      }
  }