

interface Props {
  error?: boolean;
  message: string;
  className?: string;
}

export const AlertForm = ( {error = false, message, className}: Props ) => {
  return (
    <div
      className={`${className} text-white my-2 rounded-md font-semibold text-center py-1.5 text-sm ${error? 'bg-red-500': 'bg-green-500'}`}
    >
      { message }
    </div>
  )
}
