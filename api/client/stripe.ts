import api from "@/api/axios";
import API_ROUTE from '../endPoints/index';


export async function createPaymentIntent(amount: number) {
  try {
    const res = await api.post(
      API_ROUTE.stripe.createPaymentIntent,
      {
        amount, // smallest unit (1000 = $10)
        platform: "mobile",
      }
    );

    return res.data; // { clientSecret }
  } catch (error: any) {
    console.log(
      "Create Payment Intent Error:",
      error?.response?.data || error
    );
    throw error;
  }
}

