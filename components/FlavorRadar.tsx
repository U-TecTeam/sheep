'use client';

import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface Props {
  data: {
    acid: number;
    body: number;
    sweet: number;
    bitter: number;
    aroma: number;
  };
}

export const FlavorRadar = ({ data }: Props) => {
  const chartData = [
    { subject: '酸度 (Acid)', A: data.acid, fullMark: 10 },
    { subject: '醇厚度 (Body)', A: data.body, fullMark: 10 },
    { subject: '甜感 (Sweet)', A: data.sweet, fullMark: 10 },
    { subject: '苦感 (Bitter)', A: data.bitter, fullMark: 10 },
    { subject: '香气 (Aroma)', A: data.aroma, fullMark: 10 },
  ];

  return (
    <div className="w-full h-[300px] bg-gray-50 rounded-3xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }} />
          <Radar
            name="Flavor"
            dataKey="A"
            stroke="#000000"
            fill="#000000"
            fillOpacity={0.1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
