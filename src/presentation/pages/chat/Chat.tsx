import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserInterface } from "../../interfaces/auth";
import { Message, Msg, User } from "./components";
import { MessageInterface } from "../../interfaces/messages";




export const Chat = () => {
  const { serverId } = useParams();

  const [users, setuSers] = useState<UserInterface[]>([
    {
      active: false,
      country: 'mx',
      email: 'correo@correo.com',
      id: "adwawd",
      img: "https://th.bing.com/th/id/R.ccf74d22c13a06fd773af8643dc8277a?rik=%2bazONGeen5L8PQ&pid=ImgRaw&r=0",
      messages: [],
      name: "Andrea",
      roles: ["USER"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      active: false,
      country: 'mx',
      email: 'correo@correo2.com',
      id: "adwawd2",
      img: "https://th.bing.com/th/id/OIP.hBFh-SwqngbQFyUcOkHcDQHaLH?rs=1&pid=ImgDetMain",
      messages: [],
      name: "Carlos",
      roles: ["ADMIN"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [messages, setMessages] = useState<Msg[]>([
    {
      content: 'Hola Mundo',
      createdAt: new Date(),
      id: '1234',
      server: '1234',
      updatedAt: new Date(),
      user: {
        active: false,
        country: 'mx',
        email: 'correo@correo2.com',
        id: "adwawd2",
        img: "https://th.bing.com/th/id/OIP.hBFh-SwqngbQFyUcOkHcDQHaLH?rs=1&pid=ImgDetMain",
        messages: [],
        name: "Carlos",
        roles: ["ADMIN"],
        createdAt: new Date('2024-08-11T02:05:02.708+00:00'),
        updatedAt: new Date(),
      },
      delivered: true,
      myMessage: false,
    },
    {
      content: 'Mi mensaje de prueba',
      createdAt: new Date(),
      id: '12345',
      server: '1234',
      updatedAt: new Date(),
      user:{
        active: false,
        country: 'mx',
        email: 'correo@correo.com',
        id: "adwawd",
        img: "https://th.bing.com/th/id/R.ccf74d22c13a06fd773af8643dc8277a?rik=%2bazONGeen5L8PQ&pid=ImgRaw&r=0",
        messages: [],
        name: "Andrea",
        roles: ["USER"],
        createdAt: new Date('2024-08-11T02:06:00.708+00:00'),
        updatedAt: new Date(),
      },
      delivered: true,
      myMessage: false,
    },
    {
      content: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
      createdAt: new Date(),
      id: '123451',
      server: '1234',
      updatedAt: new Date(),
      user:{
        active: false,
        country: 'mx',
        email: 'correo@correo.com',
        id: "adwawd",
        img: "https://th.bing.com/th/id/OIP.jnPAj3k9hwY4mLikLvCkAgHaHh?rs=1&pid=ImgDetMain",
        messages: [],
        name: "Elver",
        roles: ["USER"],
        createdAt: new Date('2024-08-11T02:06:00.708+00:00'),
        updatedAt: new Date(),
      },
      delivered: true,
      myMessage: false,
    },
    {
      content: 'Este es mi mensaje enviado',
      createdAt: new Date(),
      id: '1234567',
      server: '1234',
      updatedAt: new Date(),
      user:{
        active: false,
        country: 'mx',
        email: 'correo@correo.com',
        id: "adwawd",
        img: "https://i.pinimg.com/originals/04/48/cc/0448cc1b39145982fe89fbdca18f52dd.jpg",
        messages: [],
        name: "Yael",
        roles: ["USER"],
        createdAt: new Date('2024-08-11T02:06:00.708+00:00'),
        updatedAt: new Date(),
      },
      delivered: true,
      myMessage: true,
    },
    {
      content: 'Este es mi mensaje no enviado',
      createdAt: new Date(),
      id: '1234568',
      server: '1234',
      updatedAt: new Date(),
      user:{
        active: false,
        country: 'mx',
        email: 'correo@correo.com',
        id: "adwawd",
        img: "https://i.pinimg.com/originals/04/48/cc/0448cc1b39145982fe89fbdca18f52dd.jpg",
        messages: [],
        name: "Yael",
        roles: ["USER"],
        createdAt: new Date('2024-08-11T02:06:00.708+00:00'),
        updatedAt: new Date(),
      },
      delivered: false,
      myMessage: true,
    },
    {
      content: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
      createdAt: new Date(),
      id: '1234568',
      server: '1234',
      updatedAt: new Date(),
      user:{
        active: false,
        country: 'mx',
        email: 'correo@correo.com',
        id: "adwawd",
        img: "https://i.pinimg.com/originals/04/48/cc/0448cc1b39145982fe89fbdca18f52dd.jpg",
        messages: [],
        name: "Yael",
        roles: ["USER"],
        createdAt: new Date('2024-08-11T02:06:00.708+00:00'),
        updatedAt: new Date(),
      },
      delivered: true,
      myMessage: true,
    },
  ]);


  useEffect(() => {
    //TODO: buscar el servidor con ese ID
  }, []);


  return (
    <main className="min-h-screen flex flex-col">
      <div className='grid grid-cols-5'>
        <div className="col-span-1 bg-gray-300 h-screen overflow-y-auto p-3">
          <h2 className="text-black font-semibold text-2xl mb-6">Users</h2>

          <ul className="space-y-4">
            {users?.map((user) => (
              <User key={user.id} user={user}/>
            ))}
          </ul>
        </div>

        <div className="col-span-3 bg-white flex flex-col">
          <div className="flex-grow overflow-y-auto p-4">
            {
              messages.map( msg => (
                <Message msg={msg}/>
              ))
            }
          </div>

          <form className="flex-shrink-0 px-8 py-4 flex flex-row gap-4 bg-gray-200">
            <input
              type="text"
              placeholder="Write message..."
              className="focus:outline-blue-600 w-full px-4 py-2 font-medium text-base rounded-lg bg-white"
            />
            <button
              className="border-2 border-blue-500 text-white bg-blue-700 font-medium text-center px-2 py-1 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>

        <div className='col-span-1 bg-black'>
          <h2>Tu Configuracion</h2>
        </div>
      </div>
    </main>
  )
}
