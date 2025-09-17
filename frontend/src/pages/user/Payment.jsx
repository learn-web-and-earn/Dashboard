// pages/user/Payment.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state;

  if (!plan) {
    navigate("/");
    return null;
  }

  // Extract numeric price (e.g., "$29" -> 29)
  const price = plan.price.replace(/[^0-9.]/g, "");

  return (
    <>
      <div className="p-10 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#064E3B]">
          Complete Your Payment
        </h2>

        <Card className="shadow-md border border-[#064E3B]/30">
          <CardHeader>
            <CardTitle className="text-lg text-[#064E3B]">
              Selected Plan: {plan.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-xl font-semibold text-[#064E3B]">
              Price: {plan.price}
            </p>

            {/* ✅ PayPal Checkout Button */}
            <div className="flex flex-col items-center space-y-4">
              <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "pill" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: plan.title,
                        amount: { value: price },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  const payerName = details.payer.name.given_name;

                  toast.success(`✅ Payment successful! Thank you, ${payerName}`);
                  navigate("/user/profile"); // redirect after success
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  toast.error("❌ Payment failed. Please try again.");
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Payment;
