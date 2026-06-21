const ctx = document.getElementById('trafficChart').getContext('2d');

const labels = [
    '00:00', '', '', '', '04:00', '', '', '', '08:00', '', '', '', 
    '12:00', '', '', '', '16:00', '', '', '', '20:00', '', '', '', ''
];

const dataBlue = [2.8, 3.1, 3.5, 3.3, 4.0, 3.4, 3.7, 4.1, 4.9, 4.7, 4.8, 6.1, 6.1, 7.2, 7.2, 6.1, 6.1, 5.0, 6.1, 7.3, 6.9, 6.1, 6.3, 6.6, 4.8, 4.1, 3.5];
const dataPurple = [1.2, 1.4, 1.7, 1.5, 2.1, 2.0, 2.0, 2.2, 2.1, 2.7, 2.4, 2.4, 3.2, 3.1, 3.8, 3.5, 2.8, 3.0, 2.5, 3.3, 4.1, 3.7, 3.5, 3.2, 3.3, 3.5, 2.3, 2.0, 1.8];

new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Входящий',
                data: dataBlue,
                borderColor: '#0088ff',
                borderWidth: 2,
                pointBackgroundColor: '#0088ff',
                pointRadius: 2.0,
                pointHoverRadius: 3.5,
                fill: true,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(0, 136, 255, 0.4)');
                    gradient.addColorStop(1, 'rgba(0, 136, 255, 0.0)');
                    return gradient;
                },
                tension: 0
            },
            {
                label: 'Исходящий',
                data: dataPurple,
                borderColor: '#a133ff',
                borderWidth: 2,
                pointBackgroundColor: '#a133ff',
                pointRadius: 2.0,
                pointHoverRadius: 3.5,
                fill: true,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(161, 51, 255, 0.4)');
                    gradient.addColorStop(1, 'rgba(161, 51, 255, 0.0)'); 
                    return gradient;
                },
                tension: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
                text: 'Трафик',
                color: '#ffffffab',
                align: 'start',
                font: {
                    size: 16,
                    weight: 'normal'
                },
            },
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#a1a1aa',
                    usePointStyle: true,
                    boxWidth: 6,
                    boxHeight: 6,
                    font: { 
                        size: 14
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(24, 24, 24, 0.6)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#181818',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.04)',
                    drawBorder: false,
                    tickLength: 0
                },
                ticks: {
                    color: '#8a8a8e',
                    maxRotation: 0,
                    autoSkip: false,
                    padding: 5
                }
            },
            y: {
                min: 0,
                max: 8,
                grid: {
                    color: 'rgba(255, 255, 255, 0.04)',
                    drawBorder: false,
                    tickLength: 0
                },
                ticks: {
                    stepSize: 2,
                    color: '#8a8a8e',
                    padding: 5,
                    callback: function(value) {
                        return value + ' GB';
                    }
                }
            }
        }
    }
});