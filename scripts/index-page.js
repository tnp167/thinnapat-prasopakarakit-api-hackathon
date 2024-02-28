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
const lines = getlines()
    .then((line) => {
        renderLines(line);
      })
    .catch((error) => {
        console.error("Error fetching comments:", error);
      });;

const displayLines = (line) =>{

    const container = document.createElement("div");
    container.classList.add("main__container");

    const name = document.createElement("p");
    name.classList.add("main__name");
    name.innerText = line.name;
    name.classList.add(`main__name--${line.id}`);

    const status = document.createElement("p");
    status.classList.add("main__status");
    status.innerText = line.lineStatuses[0].statusSeverityDescription;
    line.lineStatuses[0].statusSeverity === 10 ?  status.classList.add("main__status--good") :  status.classList.add("main__status--delay")

    container.appendChild(name);
    container.appendChild(status);
    
    table.appendChild(container);
}

const renderLines = (lines) => {
    console.log(lines);
    table.innerHTML = ""; 
     lines.forEach(line => {
       displayLines(line);
     });
};