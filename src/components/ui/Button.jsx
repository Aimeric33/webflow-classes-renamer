export default function Button({ children }) {
    return (
        <a href="/renamer" className="inline-block bg-white text-black text-sm font-medium rounded-sm py-2 px-4 ring-2 ring-transparent transition-shadow duration-500 ease-out hover:ring-gray-400">
            {children}
        </a>
    )
}