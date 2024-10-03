// let myRadarChart;

// function updateChart() {
//     let xInterval = document.getElementById('xInterval').value;
//     let yInterval = document.getElementById('yInterval').value;
//     let xDotSize = document.getElementById('xDotSize').value;
//     let yDotSize = document.getElementById('yDotSize').value;
//     let xDotUnusedSize = document.getElementById('xDotUnusedSize').value;
//     let yDotUnusedSize = document.getElementById('yDotUnusedSize').value;

//     if (myRadarChart) {
//         myRadarChart.destroy(); // 如果已有图表实例，则销毁
//     }

//     let ctx = document.getElementById('myRadarChart').getContext('2d');
//     myRadarChart = new Chart(ctx, {
//         type: 'radar',
//         data: {
//             labels: ['参数1', '参数2', '参数3', '参数4', '参数5', '参数6'],  // 标签名称
//             datasets: [{
//                 label: '能力图',
//                 data: [xInterval, yInterval, xDotSize, yDotSize, xDotUnusedSize, yDotUnusedSize],  // 对应6个参数的值
//                 fill: false,  // 不填充区域
//                 borderColor: 'rgb(0, 51, 255)',  // 折线颜色
//                 borderWidth: 10,  // 折线宽度
//                 pointRadius: 0  // 隐藏点
//             }]
//         },
//         options: {
//             animation: false,
//             scales: {
//                 r: {
//                     angleLines: { display: false },  // 隐藏轴线
//                     grid: { display: false },  // 隐藏网格线
//                     pointLabels: { display: false },  // 隐藏轴标签
//                     ticks: { display: false },  // 隐藏刻度
//                 }
//             },
//             plugins: {
//                 legend: { display: false }  // 隐藏图例
//             }
//         }
//     });
// }

// // 每隔2秒更新一次图表
// setInterval(updateChart, 200);

// // 初始调用，立即绘制一次图表
// updateChart();