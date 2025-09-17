import React, { useEffect } from "react";
import { useFirebase } from "@/context/Firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/custom/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { user, loading } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#064E3B] border-t-transparent"></div>
        <span className="ml-4 text-lg text-[#064E3B]">Checking authentication...</span>
      </div>
    );
  }

  const plans = [
    { title: "Basic Plan", description: "Perfect for getting started", price: "$9 / month" },
    { title: "Pro Plan", description: "Best for growing teams", price: "$29 / month" },
    { title: "Enterprise Plan", description: "Full features & priority support", price: "$99 / month" },
  ];

  const handleBuyNow = (plan) => {
    navigate("user/payment", { state: plan }); // ✅ pass plan data to payment page
  };

  return (
    <>
      <Navbar />

      <div className="p-10 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#064E3B]">
          Our Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between border border-[#064E3B]/30 shadow-md hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="text-[#064E3B]">{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-2xl font-bold text-[#064E3B] mb-4">
                  {plan.price}
                </p>
                <Button
                  className="w-full bg-[#064E3B] hover:bg-[#046549] text-white"
                  onClick={() => handleBuyNow(plan)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
