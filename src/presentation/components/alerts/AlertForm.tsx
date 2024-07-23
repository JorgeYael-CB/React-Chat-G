

interface Props {
  error?: boolean;
  message: string;
}

export const AlertForm = ( {error = false, message}: Props ) => {
  return (
    <div
      className={`text-white my-2 rounded-md font-semibold text-center py-1.5 text-sm ${error? 'bg-red-500': 'bg-green-500'}`}
    >
      { message }
    </div>
  )
}
