import { useParams } from "react-router-dom"


export const Chat = () => {
  const { serverId } = useParams();


  return (
    <>
      <h2>{serverId}</h2>
    </>
  )
}
