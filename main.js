let dailyButton = document.getElementById("daily");
let weeklyButton = document.getElementById("weekly");
let monthlyButton = document.getElementById("monthly");
let sections = Array.from(document.getElementsByTagName("section"));
let sectionTitles = Array.from(document.getElementsByClassName("info-header"));
let current = Array.from(document.querySelectorAll(".current span"));
let previous = Array.from(document.querySelectorAll(".previous span"));
let buttons = Array.from(document.querySelectorAll(".days li"));

let changeData = async () => {
    const url = "./data.json";
    const req = fetch(url);
    const response = await req;
    const json = await response.json();
    let activeTime = document.querySelector(".active button").innerText.toLowerCase();

    sections.forEach((_, index) => {
        let data = json[index].timeframes;
        current[index].innerText = data[activeTime].current;
        previous[index].innerText = data[activeTime].previous;
    });
};

let removeActiveClass = () => buttons.forEach(button => button.classList.remove("active"));

changeData();

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        // Remove Every Active Class
        removeActiveClass();
        event.currentTarget.classList.add("active");
        changeData();
    });
});
