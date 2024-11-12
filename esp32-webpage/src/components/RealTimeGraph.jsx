import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function RealTimeGraph() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Distancia (mm)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  const chartRef = useRef(null);
  const wsRef = useRef(null);

  // Función para establecer conexión WebSocket
  const connectWebSocket = () => {
    wsRef.current = new WebSocket('ws://192.168.132.246/ws');

    wsRef.current.onopen = () => {
      console.log('Conectado al WebSocket');
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const timestamp = message.time;
      const distance = message.distance;

      setChartData((prevData) => {
        const newLabels = [...prevData.labels, timestamp];
        const newDatasetData = [...prevData.datasets[0].data, distance];

        // Limita el gráfico a 20 puntos
        if (newLabels.length > 20) {
          newLabels.shift();
          newDatasetData.shift();
        }

        return {
          ...prevData,
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newDatasetData,
            },
          ],
        };
      });
    };

    // Reintentar la conexión en caso de desconexión
    wsRef.current.onclose = () => {
      console.log('Desconectado del WebSocket. Intentando reconectar...');
      setTimeout(connectWebSocket, 1000); // Intentar reconectar cada segundo
    };

    wsRef.current.onerror = (error) => {
      console.error('Error en el WebSocket:', error);
      wsRef.current.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    // Cierra el WebSocket cuando el componente se desmonte
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Gráfica en Tiempo Real</h1>
      <Line
        data={chartData}
        ref={chartRef}
        options={{
          responsive: true,
          scales: {
            x: {
              display: true,
              title: { display: true, text: 'Tiempo (ms)' },
            },
            y: {
              display: true,
              title: { display: true, text: 'Distancia (mm)' },
            },
          },
        }}
      />
    </div>
  );
}

export default RealTimeGraph;