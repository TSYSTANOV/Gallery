

export const getData = () =>{
    return fetch('data.json').then(response => response.json())
    .then(response=> response)
}