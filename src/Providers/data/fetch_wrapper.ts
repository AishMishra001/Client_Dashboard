import {GraphQLError, GraphQLFormattedError} from "graphql" ; 

type Error = {
  message  : string , 
  statusCode : string ,
}

// customFetch is like a middleware 

const customFetch = async (url : string , options : RequestInit ) =>{

  const accessToken = localStorage.getItem('access_token') ; 

  const headers = options.headers as Record<string , string> ; 
  
  return await fetch(url ,{
    ...options , 
      headers : {
        ...headers , 
         Authorization  :  headers?.Authorization || `Bearer ${accessToken}` , 
         "Content-Type" :  "application/json"  , 
         "Apollo-Require-Preflight" : "true" ,
      }
  } )
} 


const getGraphQLErrors = (body : Record<"errors",GraphQLFormattedError[] |  undefined > ) =>{
    if(!body){
      return{
            message : "unknown error" , 
            statusCode : "INTERNET_SERVER_ERROR"         
      }
    }

    if("errors" in body){
      const errors = body?.errors ; 

      const message = errors?.map((error)=>{
        error?.message
      })?.join("") ; 

      const code = errors?.[0]?.extensions?.code ; 

      return {
        message : message  || JSON.stringify(errors) , 
        statusCode : code || 500  
      }
    }     
    return null ; 
}

const fetchWrapper = async(url: string , options : RequestInit)=>{
  const response = await customFetch(url , options) ; 
  const responseClone = response.clone() ; 
  
  const body = await responseClone.json() ; 

  const error = getGraphQLErrors(body) ; 

  if(error){
    throw error ; 
  }
  return response ; 
}
