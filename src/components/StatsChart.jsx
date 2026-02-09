import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function StatsChart({ data }) {
  if (!data?.length) return null
  return (
    <div className="chart-wrapper card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Weekly cadence</p>
          <h3>Creation vs completion</h3>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ left: 0, right: 0 }}>
          <defs>
            <linearGradient id="created" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--green-strong)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="var(--green-strong)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" opacity={0.3} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={24} />
          <Tooltip
            contentStyle={{ background: 'var(--panel)', border: '1px solid var(--border)' }}
            labelStyle={{ color: 'var(--text-strong)' }}
          />
          <Area type="monotone" dataKey="created" stroke="var(--accent)" fill="url(#created)" strokeWidth={2} />
          <Area type="monotone" dataKey="completed" stroke="var(--green-strong)" fill="url(#completed)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
