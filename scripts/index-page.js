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
        const intervalId = setInterval(() =>  renderLines(line), 5000);
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

    const popup = document.createElement("div");
    popup.classList.add("main__popup");
    status.appendChild(popup);

    line.lineStatuses[0].statusSeverity === 10 ?  status.classList.add("main__status--good") :  status.classList.add("main__status--delay")
    
    if(line.lineStatuses[0].statusSeverity !== 10){
        status.addEventListener("mouseover", showPopup);
        status.addEventListener("mouseout", hidePopup);
    }
    else{
        status.removeEventListener("mouseover", showPopup);
        status.removeEventListener("mouseover", hidePopup);
    }

    function showPopup(){
        const hover = document.querySelector(".main__popup");
        hover.classList.add("main__popup--active");
        hover.innerText = line.lineStatuses[0].reason;
    }

    function hidePopup(){
        const hover = document.querySelector(".main__popup");
        hover.classList.remove("main__popup--active");
    }


    container.appendChild(name);
    container.appendChild(status);
    
    table.appendChild(container);

}

const renderLines = (lines) => {
    console.log(lines);
    table.innerHTML = ""; 
    const update = document.createElement("h3");
    update.classList.add("main__update");
    update.innerText = `Last updated: ${new Date()}`;
    table.appendChild(update);

     lines.forEach(line => {
       displayLines(line);
     });
};
