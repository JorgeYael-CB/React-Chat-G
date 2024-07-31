
export const FormMessage = () => {
  return (
    <form className="absolute inset-x-0 bottom-0 mx-4 my-2 flex gap-3 items-center bg-gray-800 p-4 rounded-lg shadow-lg">
      <input
        className='py-2 px-4 font-semibold text-lg bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-full'
        type="text"
        placeholder="Escribe tu mensaje..."
      />
      <i className="fa-solid fa-paper-plane text-blue-500 text-2xl hover:cursor-pointer hover:text-blue-600 transition-colors"></i>
    </form>
  )
}
