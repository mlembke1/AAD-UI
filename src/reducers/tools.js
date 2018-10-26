export const tools = ( state={ 
    allTools: [
      {
        id: 1,
        name: 'SORTOE',
        url: 'https://sortoe.supermicro5.opswerx.org/',
        description: "SORTOE is a tool intended to save decision makers and operators time by aggregating stability data about countries and operating environments in one place with an easy to use interface. The tool provides users access to open source data gathered from many sources and processed using peer reviewed analytical methods with an intuitive interface for quickly understanding the stability trends in a country and the ability to drill down and see economic and social indicators.",
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
       id: 2,
       name: 'ATN',
       url: 'www.google.com',
       description: "Lorem Ispum Attack the Network Lorem Ispum Keep Attacking Lorem Ispum Network Lorem Ispum Attack.",
       created_at: new Date('2016-06-29 14:26:16 UTC'),
       updated_at: new Date('2016-06-29 14:26:16 UTC')
     },
     {
      id: 3,
      name: 'SOF4D',
      url: 'www.google.com',
      description: "SOF4D Info Lorem SOF4D Info Ispum Lorem SOF4D Info SOF4D Info Ispum SOF4D Info Lorem Ispum",
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    }
    ]
   }, action) => {
      switch(action.type){

        // case 'TOOLS_AQUIRED':
        //   return { ...state, allTools: action.payload }  
  
        default:
          return state
      }
  }