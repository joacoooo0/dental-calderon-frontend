"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardData } from "../../service/dashboard";
import { isAuthenticated } from "../../lib/auth";

interface DashboardData {
  message: string;
  user: {
    id_admin: number;
    userAdmin: string;
  };
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    getDashboardData()
      .then((res) => setData(res))
      .catch((err) => console.error("Error cargando dashboard:", err));
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Dashboard;
