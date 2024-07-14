"use client"; // Add this line at the top

import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);

export default function ChartComponent({ data, gradientFrom, gradientTo }: { data: any, gradientFrom: any, gradientTo: any }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext('2d');
      const gradient = ctx?.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient?.addColorStop(0, gradientFrom);
      gradient?.addColorStop(1, gradientTo);

      const updatedData = {
        ...data,
        datasets: data?.datasets?.map((dataset: any) => ({
          ...dataset,
          backgroundColor: gradient,
        })),
      };

      if (ctx) {
        const chartInstance = new Chart(ctx, {
          type: 'bar',
          data: updatedData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#FFFFFF', // Change this to your desired text color
                },
              },
              x: {
                ticks: {
                  color: '#FFFFFF', // Change this to your desired text color
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: '#FFFFFF', // Change this to your desired text color
                },
              },
              tooltip: {
                titleColor: '#FFFFFF', // Change this to your desired text color
                bodyColor: '#FFFFFF', // Change this to your desired text color
                footerColor: '#FFFFFF', // Change this to your desired text color
              },
            },
          },
        });

        return () => {
          chartInstance.destroy();
        };
      }
    }
  }, [data, gradientFrom, gradientTo]);

  return <canvas ref={chartRef}></canvas>;
}
