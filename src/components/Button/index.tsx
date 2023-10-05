export const Button = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`px-5 py-2 text-base font-medium text-white transition duration-300 ease-in-out rounded-md hover:bg-opacity-80 hover:shadow-signUp
        ${text === 'Logout' ?
            'bg-red'
            :
            'bg-primary'
          }`}
      >
        {text}
      </button>
    </>
  )
}