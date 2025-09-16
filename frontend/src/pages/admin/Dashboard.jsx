import Navbar from '@/components/custom/Navbar';
import React, { useEffect, useState } from 'react';
import { useFirebase } from '@/context/Firebase';
import { getDatabase, ref, get, child } from "firebase/database";

const Dashboard = () => {
  const { app } = useFirebase(); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ new loading state

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db);

      try {
        const snapshot = await get(child(dbRef, "users"));
        if (snapshot.exists()) {
          const data = snapshot.val();

          const userList = Object.keys(data).map((uid) => ({
            uid,
            userData: data[uid].userData || {},
            devices: data[uid].devices || {},
          }));

          setUsers(userList);
          console.log("✅ All users with userData:", userList);
        } else {
          console.log("No users found");
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      } finally {
        setLoading(false); // ✅ stop loading after fetch
      }
    };

    fetchUsers();
  }, [app]);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>

        <div className="bg-white shadow rounded-lg p-4 min-h-[100px] flex items-center justify-center">
          {loading ? (
            // ✅ Show loader while fetching
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
              <span>Loading users...</span>
            </div>
          ) : users.length > 0 ? (
            <ul className="space-y-4 w-full">
              {users.map((user) => (
                <li
                  key={user.uid}
                  className="border-b pb-3 last:border-none"
                >
                  <p className="font-semibold">UID: {user.uid}</p>

                  {/* ✅ Show userData */}
                  {Object.keys(user.userData).length > 0 ? (
                    <div className="ml-4 mt-2 space-y-1">
                      {Object.entries(user.userData).map(([key, value]) => (
                        <p key={key} className="text-sm text-gray-700">
                          <span className="font-medium">{key}:</span> {String(value)}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No userData available</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
