const baseUrl = 'https://api.tfl.gov.uk/line/mode/tube/status'

const getlines = async() => {
    try{
        const response = await axios.get(baseUrl);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

const table = document.querySelector(".main__table");
const line = lines()
    .then((review) => {
        renderReviews(review);
      })
    .catch((error) => {
        console.error("Error fetching comments:", error);
      });;

const renderLines = (lines) => {
    table.innerHTML = ""; 
     lines.forEach(line => {
       displayReviews(review);
     });
};