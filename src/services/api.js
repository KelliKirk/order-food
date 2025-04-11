const API_URL = 'http://localhost:3002';

export async function fetchMeals() {
  try {
    const response = await fetch(`${API_URL}/meals`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
}

export async function submitOrder(orderData) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}