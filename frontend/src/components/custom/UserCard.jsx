import React from "react";

const UserCard = ({ user }) => {
  return (
    <li className="border-b pb-3 last:border-none">
      <p className="font-semibold">UID: {user.uid}</p>

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
  );
};

export default UserCard;
