interface AuthorBioProps {
  name: string
  role?: string
  email?: string
}

export function AuthorBio({ name, role }: AuthorBioProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="flex items-center gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 my-10">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
        {initials}
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm">{name}</p>
        {role && <p className="text-xs text-slate-500">{role}</p>}
      </div>
    </div>
  )
}
