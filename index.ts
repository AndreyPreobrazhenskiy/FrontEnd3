interface Appliance {
    brand: string;
    model: string;
    year: number;
    price: number;
    electric: boolean;
    colors: string[];
    specific: {
        type: string;
        power: number;
    };
}

interface AppliancesData {
    title: string;
    available: boolean;
    appliances: Appliance[];
    statistics: {
        totalModels: number;
        averagePrice: number;
        electricCount: number;
    };
}

function displayData(data: AppliancesData): void {
    const output = document.getElementById('output') as HTMLDivElement;

    let html = `<h2>${data.title}</h2>`;
    html += `<p><strong>Доступно:</strong> ${data.available ? 'Да' : 'Нет'}</p>`;

    html += '<h3>Кухонная техника:</h3><ul>';
    data.appliances.forEach((appliance: Appliance) => {
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

function handleError(error: string): void {
    const output = document.getElementById('output') as HTMLDivElement;
    output.innerHTML = `<div style="color: red;"><strong>Ошибка:</strong> ${error}</div>`;
    console.error('Произошла ошибка:', error);
    alert(`Ошибка: ${error}`);
}

function loadData(
    url: string,
    successCallback: (data: AppliancesData) => void,
    errorCallback: (error: string) => void
): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (xhr.response) {
                successCallback(xhr.response as AppliancesData);
            } else {
                errorCallback('Неверный формат данных');
            }
        } else {
            errorCallback(`HTTP ошибка: ${xhr.status} ${xhr.statusText}`);
        }
    };

    xhr.onerror = () => {
        errorCallback('Ошибка сети при запросе данных');
    };

    xhr.send();
}

function setupEventListeners(): void {
    console.log('Обработчики событий установлены');

    document.getElementById('loadData')?.addEventListener('click', () => {
        loadData('./appliances.json', displayData, handleError);
    });

    document.getElementById('simulateError')?.addEventListener('click', () => {
        const badData = {
            title: "Ошибочные данные",
            appliances: "Это не массив",
            statistics: null
        };

        try {
            displayData(badData as unknown as AppliancesData);
        } catch (e) {
            handleError(`Ошибка обработки данных: ${e instanceof Error ? e.message : String(e)}`);
        }
    });

    document.getElementById('wrongUrl')?.addEventListener('click', () => {
        loadData('./nonexistent.json', displayData, handleError);
    });

    document.getElementById('serverError')?.addEventListener('click', () => {
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
            Object.defineProperty(xhr, 'status', { value: 500 });
            Object.defineProperty(xhr, 'statusText', { value: 'Internal Server Error' });
            xhr.onload?.call(xhr, new ProgressEvent('load'));
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
