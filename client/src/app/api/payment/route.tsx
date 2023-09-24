
// handle Payment of user
export const razPayment = async (amt: number) => {
    try {
        const response = await fetch("http://localhost:3001/api/payment/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amt
            })
        })
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

// verify razorpay payment
export const verifyPayment = async (res: any) => {
    try {
        const response = await fetch("http://localhost:3001/api/payment/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                res
            })
        })
        const data = response.json();
        return data;
    } catch (error) {
        return error;
    }
}
