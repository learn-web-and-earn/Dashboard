import React from "react";
import Navbar from "@/components/custom/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useFirebase } from "@/context/Firebase";

const Dashboard = () => {
  const { allUsers, loading } = useFirebase();

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users Card */}
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Number of registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{allUsers.length}</p>
              </CardContent>
            </Card>

            {/* You can add Payments and Plans cards similarly */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
