export const apiCall = ({ address }) => {

    const ip= {address};
    const url = `https://freeipapi.com/api/json/${ip}`; // to get specific ip's info
    // const url = `https://freeipapi.com/api/json/`; // to get current request's ip info


    fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
            throw response;
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
    });
  
}
