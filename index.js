"use strict";
function displayData(data) {
    const output = document.getElementById('output');
    let html = `<h2>${data.title}</h2>`;
    html += `<p><strong>Доступно:</strong> ${data.available ? 'Да' : 'Нет'}</p>`;
    html += '<h3>Кухонная техника:</h3><ul>';
    data.appliances.forEach((appliance) => {
        html += `
            <li>
                <strong>${appliance.brand} ${appliance.model} (${appliance.year})</strong><br>
                Цена: ₽${appliance.price.toLocaleString()}<br>
                Электрическая: ${appliance.electric ? 'Да' : 'Нет'}<br>
                Тип: ${appliance.specific.type}<br>
                Мощность: ${appliance.specific.power} Вт<br>
                Цвета: ${appliance.colors.join(', ')}
            </li>`;
    });
    html += '</ul>';
    html += '<h3>Статистика:</h3>';
    html += `<p>Всего моделей: ${data.statistics.totalModels}</p>`;
    html += `<p>Средняя цена: ₽${data.statistics.averagePrice.toLocaleString()}</p>`;
    html += `<p>Электроприборов: ${data.statistics.electricCount}</p>`;
    output.innerHTML = html;
    console.log('Данные о технике:', data);
}
function handleError(error) {
    const output = document.getElementById('output');
    output.innerHTML = `<div style="color: red;"><strong>Ошибка:</strong> ${error}</div>`;
    console.error('Произошла ошибка:', error);
    alert(`Ошибка: ${error}`);
}
function loadData(url, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (xhr.response) {
                successCallback(xhr.response);
            }
            else {
                errorCallback('Неверный формат данных');
            }
        }
        else {
            errorCallback(`HTTP ошибка: ${xhr.status} ${xhr.statusText}`);
        }
    };
    xhr.onerror = () => {
        errorCallback('Ошибка сети при запросе данных');
    };
    xhr.send();
}
function setupEventListeners() {
    var _a, _b, _c, _d;
    console.log('Обработчики событий установлены');
    (_a = document.getElementById('loadData')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        loadData('./appliances.json', displayData, handleError);
    });
    (_b = document.getElementById('simulateError')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const badData = {
            title: "Ошибочные данные",
            appliances: "Это не массив",
            statistics: null
        };
        try {
            displayData(badData);
        }
        catch (e) {
            handleError(`Ошибка обработки данных: ${e instanceof Error ? e.message : String(e)}`);
        }
    });
    (_c = document.getElementById('wrongUrl')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        loadData('./nonexistent.json', displayData, handleError);
    });
    (_d = document.getElementById('serverError')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './appliances.json', true);
        xhr.onload = function () {
            if (this.status >= 400) {
                handleError(`Сервер вернул ошибку: ${this.status} ${this.statusText}`);
            }
        };
        xhr.onerror = function () {
            handleError('Ошибка сети при запросе данных');
        };
        setTimeout(() => {
            var _a;
            Object.defineProperty(xhr, 'status', { value: 500 });
            Object.defineProperty(xhr, 'statusText', { value: 'Internal Server Error' });
            (_a = xhr.onload) === null || _a === void 0 ? void 0 : _a.call(xhr, new ProgressEvent('load'));
        }, 500);
    });
}
document.addEventListener('DOMContentLoaded', setupEventListeners);
