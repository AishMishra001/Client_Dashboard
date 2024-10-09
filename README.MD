# Making of React Dashboard 

src/Providers/index.tsx :

exporting client from GraphQLClient(api,{
    fetch : ()=>{

    }
    })

src/Providers/fetch-wrapper.js : 

  const customFetch = ()=>{

  }

  const getGraphQLErrors = () =>{

  }

  const fetchWrapper = (url , options)=>{
    const response = await customfetch(url , options ) ; 
    const body = response.json() ; 

    const error = getGraphQLErrors(body) ; 

    if(error){
        throw error ; 
    }

    return  body ;  
  }







## Learnings : 

1. **WebSocket** : WebSocket is a communication protocol that provides full-duplex, bidirectional communication channels over a single TCP connection. Here are the key points about WebSocket:

***Real-time communication***: It allows real-time data transfer between a client (typically a web browser) and a server.

***Persistent connection***: Unlike HTTP, which is stateless, WebSocket maintains an open connection, reducing overhead for multiple requests.

***Bidirectional***: Both the client and server can send messages to each other at any time, without waiting for a request.

***Efficiency***: It's more efficient than polling or long-polling techniques for real-time updates.

***Wide support***: Most modern web browsers and server technologies support WebSocket.
Use cases: Commonly used in applications requiring live updates like chat systems, gaming, financial tickers, and collaborative tools.