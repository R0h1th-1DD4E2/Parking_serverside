export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            console.log('Received data:', data);

            // Process the received data
            if (data.type === "Device") {
                const macAddresses = JSON.parse(data.message);
                res.status(200).json({ type: "Device", message: macAddresses });
            } else {
                res.status(200).json({ type: data.type, message: data.message });
            }

        } catch (error) {
            console.error('Error handling data:', error);
            res.status(500).json({ error: 'Failed to process data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
