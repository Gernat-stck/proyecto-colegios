"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

// Función para generar datos diarios para el último mes
const generateDailyData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  const courses = [
    "React Básico",
    "Node.js Avanzado",
    "Python para Data Science",
    "Diseño UX/UI",
    "Machine Learning",
  ];

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dataPoint: DataPoint = {
      name: date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
    };
    courses.forEach((course) => {
      dataPoint[course] = Math.floor(Math.random() * 10) + 1; // 1-10 inscripciones por día
    });
    data.push(dataPoint);
  }
  return data;
};

// Datos de ejemplo para otros intervalos de tiempo
const monthlyData: DataPoint[] = [
  {
    name: "Ene",
    "React Básico": 20,
    "Node.js Avanzado": 15,
    "Python para Data Science": 25,
    "Diseño UX/UI": 18,
    "Machine Learning": 12,
  },
  {
    name: "Feb",
    "React Básico": 40,
    "Node.js Avanzado": 30,
    "Python para Data Science": 45,
    "Diseño UX/UI": 35,
    "Machine Learning": 28,
  },
  {
    name: "Mar",
    "React Básico": 65,
    "Node.js Avanzado": 45,
    "Python para Data Science": 80,
    "Diseño UX/UI": 60,
    "Machine Learning": 48,
  },
  {
    name: "Abr",
    "React Básico": 90,
    "Node.js Avanzado": 60,
    "Python para Data Science": 110,
    "Diseño UX/UI": 75,
    "Machine Learning": 62,
  },
  {
    name: "May",
    "React Básico": 120,
    "Node.js Avanzado": 80,
    "Python para Data Science": 150,
    "Diseño UX/UI": 90,
    "Machine Learning": 70,
  },
  {
    name: "Jun",
    "React Básico": 150,
    "Node.js Avanzado": 100,
    "Python para Data Science": 180,
    "Diseño UX/UI": 110,
    "Machine Learning": 85,
  },
  {
    name: "Jul",
    "React Básico": 180,
    "Node.js Avanzado": 120,
    "Python para Data Science": 210,
    "Diseño UX/UI": 130,
    "Machine Learning": 100,
  },
  {
    name: "Ago",
    "React Básico": 210,
    "Node.js Avanzado": 140,
    "Python para Data Science": 240,
    "Diseño UX/UI": 150,
    "Machine Learning": 115,
  },
  {
    name: "Sep",
    "React Básico": 240,
    "Node.js Avanzado": 160,
    "Python para Data Science": 270,
    "Diseño UX/UI": 170,
    "Machine Learning": 130,
  },
  {
    name: "Oct",
    "React Básico": 270,
    "Node.js Avanzado": 180,
    "Python para Data Science": 300,
    "Diseño UX/UI": 190,
    "Machine Learning": 145,
  },
  {
    name: "Nov",
    "React Básico": 300,
    "Node.js Avanzado": 200,
    "Python para Data Science": 330,
    "Diseño UX/UI": 210,
    "Machine Learning": 160,
  },
  {
    name: "Dic",
    "React Básico": 330,
    "Node.js Avanzado": 220,
    "Python para Data Science": 360,
    "Diseño UX/UI": 230,
    "Machine Learning": 175,
  },
];

const getRandomColor = (): string => `hsl(${Math.random() * 360}, 70%, 50%)`;

export function CourseEnrollmentChart() {
  const [timeInterval, setTimeInterval] = useState<string>("1m");
  const courses: string[] = Object.keys(monthlyData[0]).filter((key) => key !== "name");
  const colors = useMemo<{ [key: string]: string }>(
    () =>
      courses.reduce(
        (acc, course) => ({ ...acc, [course]: getRandomColor() }),
        {}
      ),
    []
  );

  const dailyData = useMemo<DataPoint[]>(() => generateDailyData(), []);

  const filterDataByInterval = (interval: string): DataPoint[] => {
    switch (interval) {
      case "1m":
        return dailyData;
      case "3m":
        return monthlyData.slice(-3);
      case "6m":
        return monthlyData.slice(-6);
      case "1y":
        return monthlyData;
      default:
        return monthlyData;
    }
  };

  const data = filterDataByInterval(timeInterval);

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Inscripciones por Curso</CardTitle>
        <Select
          value={timeInterval}
          onValueChange={(value) => setTimeInterval(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un intervalo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Último mes</SelectItem>
            <SelectItem value="3m">Últimos 3 meses</SelectItem>
            <SelectItem value="6m">Últimos 6 meses</SelectItem>
            <SelectItem value="1y">Último año</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              interval={timeInterval === "1m" ? 6 : "preserveEnd"}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {courses.map((course) => (
              <Line
                key={course}
                type="monotone"
                dataKey={course}
                stroke={colors[course]}
                dot={timeInterval === "1m" ? false : { r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
