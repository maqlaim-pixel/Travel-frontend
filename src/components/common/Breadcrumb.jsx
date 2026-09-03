import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-navy-500 mb-4 flex-wrap" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 hover:text-sky-600 transition-colors">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={12} className="text-navy-300" />
          {item.href ? (
            <Link to={item.href} className="hover:text-sky-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-navy-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
