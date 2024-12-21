"use client"

export function Footer() {
  return (
    <div className="text-sm text-gray-400 self-start py-[3px]">
      Made for you with ❤️ by <a href="https://github.com/Ilyomix" className="underline">Ilyomix</a> &copy; {new Date().getFullYear()}
    </div>
  )
}
