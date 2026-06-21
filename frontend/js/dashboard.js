const trafficChart = document.getElementById('trafficChart').getContext('2d');
const proxyDoughnutChart = document.getElementById('proxyDoughnutChart').getContext('2d');

const trafficLabels = [
    '00:00', '', '', '', '04:00', '', '', '', '08:00', '', '', '', 
    '12:00', '', '', '', '16:00', '', '', '', '20:00', '', '', '', ''
];
const proxyLabels = [
    'Онлайн', 'Офлайн'
];

const incomingTraffic = [2.8, 3.1, 3.5, 3.3, 4.0, 3.4, 3.7, 4.1, 4.9, 4.7, 4.8, 6.1, 6.1, 7.2, 7.2, 6.1, 6.1, 5.0, 6.1, 7.3, 6.9, 6.1, 6.3, 6.6, 4.8, 4.1, 3.5];
const outgoingTraffic = [1.2, 1.4, 1.7, 1.5, 2.1, 2.0, 2.0, 2.2, 2.1, 2.7, 2.4, 2.4, 3.2, 3.1, 3.8, 3.5, 2.8, 3.0, 2.5, 3.3, 4.1, 3.7, 3.5, 3.2, 3.3, 3.5, 2.3, 2.0, 1.8];

new Chart(trafficChart, {
    type: 'line',
    data: {
        labels: trafficLabels,
        datasets: [{
            label: 'Входящий',
            data: incomingTraffic,
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
                gradient.addColorStop(0, '#0088ff66');
                gradient.addColorStop(1, '#0088ff00');
                return gradient;
            },
            tension: 0
        }, 
        {
            label: 'Исходящий',
            data: outgoingTraffic,
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
                gradient.addColorStop(0, '#a133ff66');
                gradient.addColorStop(1, '#a133ff00'); 
                return gradient;
            },
            tension: 0
        }]
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
                backgroundColor: '#18181899',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#181818',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let value = context.parsed.y;
                        let label = context.dataset.label;

                        return ` ${label}: ${value}`;
                    },

                    labelColor: function(context) {
                        const currentBg = context.dataset.pointBackgroundColor;
                        const finalBg = Array.isArray(currentBg) ? currentBg[context.dataIndex] : currentBg;

                        return {
                            borderColor: finalBg,
                            backgroundColor: finalBg,
                            borderWidth: 3,
                            borderRadius: 2
                        };
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#FFFFFF0A',
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
                    color: '#ffffff0a',
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

const centerText = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx } = chart;

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = 'xx-large Inter, system-ui, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('5', x, y - 12);

        ctx.font = '14px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#ffffffab';
        ctx.fillText('Всего', x, y + 12)
    }
}

new Chart(proxyDoughnutChart, {
    type: 'doughnut',
    data: {
        labels: proxyLabels,
        datasets: [{
            label: 'Процент',
            data: [80, 20],
            backgroundColor: [
                '#1bc067',
                '#ff5252'
            ],
            hoverBackgroundColor: [
                '#1bc067',
                '#ff5252'
            ],
            cutout: '70%',
            borderWidth: 0
        }]
    },
    plugins: [centerText],
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
                text: 'Прокси',
                color: '#ffffffab',
                align: 'start',
                font: {
                    size: 16,
                    weight: 'normal'
                },
            },
            legend: {
                position: 'right',
                align: 'center',
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
                backgroundColor: '#18181899',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#181818',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let value = context.formattedValue;
                        let label = context.dataset.label;

                        return ` ${label}: ${value}%`;
                    },

                    labelColor: function(context) {
                        const currentBg = context.dataset.backgroundColor;
                        const finalBg = Array.isArray(currentBg) ? currentBg[context.dataIndex] : currentBg;
                        
                        return {
                            borderColor: finalBg,
                            backgroundColor: finalBg,
                            borderWidth: 3,
                            borderRadius: 2
                        };
                    }
                }
            }
        }
    }
});