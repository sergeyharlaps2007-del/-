function getData() {
    const data = localStorage.getItem("products"); //достает данные из браузера
    if (data) return JSON.parse(data); //если есть данные возвращает

    //  fakeData должен быть один раз загружен, если нет данных
    localStorage.setItem("products", JSON.stringify(fakeData)); 
    return fakeData;
}

// Берет массив - делает его json - сохраняет
function saveData(data) {
    localStorage.setItem("products", JSON.stringify(data));
}

const tableBody = document.querySelector("#Table tbody"); //ищет получается Table

function renderTable() {
    const data = getData();   //берет и очищает таблицу
    tableBody.innerHTML = "";

    data.forEach((item, index) => {
        const row = document.createElement("tr"); // строку делает 

        row.innerHTML = `
            <td><input type="text" value="${item.name}" readonly></td>
            <td><input type="number" value="${item.year}" readonly></td>
            <td><input type="text" value="${item.country}" readonly></td>
            <td><input type="number" value="${item.length}" readonly></td>
            <td>
                <button class="editBtn">Редактировать</button>
                <button class="deleteBtn">Удалить</button>
            </td>
        `;

        const editBtn = row.querySelector(".editBtn");
        editBtn.addEventListener("click", () => {
            const inputs = row.querySelectorAll("input");     //кнопки
            if (editBtn.textContent === "Редактировать") {
                inputs.forEach(input => input.removeAttribute("readonly"));
                editBtn.textContent = "Сохранить";
            } else {

                
                const data = getData();

                inputs.forEach((input, i) => {
                    const key = ["name","year","country","length"][i];
                    data[index][key] = (key === "year" || key === "length") 
                        ? parseFloat(input.value) 
                        : input.value;
                });

                saveData(data); // сохраняет обновлённые данные

                inputs.forEach(input => input.setAttribute("readonly", true));
                editBtn.textContent = "Редактировать";
            }
        });

        const deleteBtn = row.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
            const data = getData();
            data.splice(index, 1);  //кнопка удалить
            saveData(data);
            renderTable();
        });

        tableBody.appendChild(row);
    });
}

document.getElementById("add").addEventListener("click", () => {
    const data = getData();    //ДОбавляет текст

    //  Добавление новой записи 
    data.push({ name: "", year: 2025, country: "", length: 0 });

    saveData(data);
    renderTable();
});

renderTable();
