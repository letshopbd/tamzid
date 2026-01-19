document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Chart
    const ctx = document.getElementById('mainChart').getContext('2d');

    // Recharts-like simple styling
    const mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Total Baki Given',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    backgroundColor: '#EF4444', // red-500
                    borderRadius: 4, // rounded-t-4px roughly
                    barThickness: 50,
                    borderSkipped: false
                },
                {
                    label: 'Total Collected',
                    data: [8000, 15000, 20000, 18000, 24000, 28000],
                    backgroundColor: '#10B981', // emerald-500
                    borderRadius: 4,
                    barThickness: 50,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        font: {
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    titleColor: '#111827', // gray-900
                    bodyColor: '#111827',
                    titleFont: { family: "'Inter', sans-serif", weight: 'bold' },
                    bodyFont: { family: "'Inter', sans-serif" },
                    padding: 12,
                    cornerRadius: 12,
                    borderColor: '#E5E7EB', // gray-200
                    borderWidth: 1,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '৳ ' + context.parsed.y.toLocaleString();
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB', // gray-200
                        drawBorder: false,
                        tickLength: 0
                    },
                    ticks: {
                        font: { family: "'Inter', sans-serif", size: 12 },
                        color: '#6B7280', // gray-500
                        callback: function (value) {
                            return '৳' + value;
                        },
                        padding: 10
                    },
                    border: { display: false }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { family: "'Inter', sans-serif", size: 12 },
                        color: '#6B7280'
                    },
                    border: { display: false }
                }
            },
            layout: {
                padding: {
                    top: 20
                }
            }
        }
    });

    // 2. Animate Numbers
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');

            const inc = target / 50;

            if (count < target) {
                if (target > 1000) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                } else {
                    counter.innerText = Math.ceil(count + inc);
                }
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
});
