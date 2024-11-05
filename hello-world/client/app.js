async function fetchGreeting(){
    const response = await fetch('http://localhost:9000/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            query:'query{greeting}',
        })
    })
    // GET THE OBJECT RETURNED IN THE BODY WHICH CONTAINS THE GRAPHQL RESPONSE
    const {data} = await response.json();
    
    return data.greeting;
}

// CALL fetchGreeting
fetchGreeting()
    .then(greeting => {document.getElementById('greeting').textContent = greeting;        
    });