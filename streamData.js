import fetch from 'node-fetch';

const streamData = async () => {
  for (let i = 1; i <= 100; i++) {
    const mockData = {
      id: i,
      timestamp: new Date().toISOString(),
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random() * 10,
    };

    try {
      const response = await fetch('http://localhost:3000/gyroscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockData),
      });

      if (response.ok) {
        console.log(`Frame ${i} sent successfully`);
      } else {
        console.error(`Failed to send frame ${i}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error sending frame ${i}:`, error.message);
    }

    // Wait for 0.2 seconds before sending the next frame
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

streamData();